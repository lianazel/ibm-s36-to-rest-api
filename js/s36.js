/**
 * s36.js — primitives d'interprétation des enregistrements S/36.
 *
 * Deux fonctions pures qui alimentent les démonstrations du site :
 * l'extraction positionnelle (les champs S/36 se définissent par positions,
 * pas par séparateurs) et les décimales implicites (les montants sont stockés
 * sans séparateur décimal). Aucune I/O : tout est calcul sur chaîne.
 */

/**
 * Extrait un champ positionnel d'un enregistrement S/36.
 *
 * Les positions sont 1-basées et incluses, comme dans les descriptions de
 * fichiers S/36 (NOMCLI 1-30 se lit « colonnes 1 à 30 comprises »).
 *
 * @param {string} record Enregistrement complet (longueur fixe).
 * @param {number} start  Position de début (1-basée, incluse).
 * @param {number} end    Position de fin (1-basée, incluse).
 * @returns {string} Le champ, sans les espaces de bourrage de droite.
 * @throws {RangeError} Bornes incohérentes ou enregistrement trop court.
 */
export function extractField(record, start, end) {
  if (start < 1) {
    throw new RangeError(`start must be >= 1 (got ${start})`);
  }
  if (end < start) {
    throw new RangeError(`end (${end}) must be >= start (${start})`);
  }
  if (record.length < end) {
    throw new RangeError(
      `record too short: length ${record.length}, field ends at ${end}`,
    );
  }
  // Trim droit uniquement : le bourrage S/36 est à droite, et des espaces
  // en tête de champ seraient une donnée, pas du bourrage.
  return record.slice(start - 1, end).replace(/ +$/, "");
}

/**
 * Un champ numérique S/36 ne tient que des chiffres, et rien d'autre.
 *
 * Écrit UNE FOIS et partagé : le site laisse le lecteur réécrire les
 * commandes, et deux gardes voisines qui n'auraient pas la même rigueur
 * laisseraient passer d'un côté ce qu'elles refusent de l'autre. Mesuré le
 * 23 août 2026 : `Number("")` vaut 0, `Number("1e3")` vaut 1000, `Number("0x10")`
 * vaut 16, et aucune de ces formes ne tient dans un champ positionnel de
 * chiffres. C'est le test de `parseImplicitDecimal`, sorti de son ventre pour
 * que le numéro de commande soit gardé par la même règle que le montant.
 *
 * @param {unknown} raw La valeur telle que le lecteur l'a tapée.
 * @returns {boolean} Vrai si le fichier pourrait la stocker.
 */
export function isDigitsOnly(raw) {
  return typeof raw === "string" && /^[0-9]+$/.test(raw);
}

/**
 * Interprète un montant S/36 à décimales implicites : "000012550" → 125.5.
 *
 * Les fichiers S/36 stockent les montants sans séparateur décimal ; le nombre
 * de décimales est une convention portée par la description du champ.
 *
 * Honnêteté de périmètre : les nombres signés « overpunch » du S/36 (signe
 * porté par le dernier caractère, ex. "12345N") ne sont PAS gérés — hors
 * périmètre du site, qui ne montre que des montants positifs.
 *
 * @param {string} raw      Chiffres uniquement, sans séparateur.
 * @param {number} decimals Nombre de décimales implicites (défaut : 2).
 * @returns {number} La valeur interprétée.
 * @throws {TypeError}  Si `raw` contient autre chose que des chiffres.
 * @throws {RangeError} Si `decimals < 0` ou `raw` vide.
 */
export function parseImplicitDecimal(raw, decimals = 2) {
  if (decimals < 0) {
    throw new RangeError(`decimals must be >= 0 (got ${decimals})`);
  }
  if (raw === "") {
    throw new RangeError("raw must not be empty");
  }
  if (!isDigitsOnly(raw)) {
    throw new TypeError(`raw must contain only digits (got "${raw}")`);
  }
  return Number(raw) / 10 ** decimals;
}

/**
 * L'inverse : 125.5 → "12550". Ce que devient une borne avant de partir au
 * fichier, qui ne connaît pas le séparateur décimal.
 *
 * Elle vit ici, contre la règle qu'elle renverse, et nulle part ailleurs : un
 * second calcul écrit dans le module du langage aurait pu dériver de celui-ci
 * sans que rien ne le dise.
 *
 * Rend une CHAÎNE de chiffres, non bourrée à gauche : c'est la forme que
 * `parseImplicitDecimal` consomme, ce qui rend l'aller-retour vérifiable au
 * sens strict. Le bourrage à neuf positions appartient à l'enregistrement, pas
 * à la valeur.
 *
 * @param {number} value    Valeur interprétée (125.5).
 * @param {number} decimals Nombre de décimales implicites (défaut : 2).
 * @returns {string} Les chiffres, séparateur retiré.
 * @throws {TypeError}  Si `value` n'est pas un nombre fini.
 * @throws {RangeError} Si `decimals < 0` ou si `value` est négative.
 */
export function formatImplicitDecimal(value, decimals = 2) {
  if (decimals < 0) {
    throw new RangeError(`decimals must be >= 0 (got ${decimals})`);
  }
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`value must be a finite number (got ${typeof value})`);
  }
  // Même périmètre que la fonction inverse : les montants du site sont positifs,
  // et le signe « overpunch » du S/36 n'est géré ni dans un sens ni dans l'autre.
  if (value < 0) {
    throw new RangeError(`value must be >= 0 (got ${value})`);
  }
  // Arrondi et non multiplication nue : `1.1 * 100` vaut 110.00000000000001 en
  // flottant binaire. Une borne fausse d'un centième trahirait la démonstration
  // qu'elle sert — la requête affichée ne trouverait pas ce que la page montre.
  const scaled = Math.round(value * 10 ** decimals);
  // Au delà de l'entier sûr, `String` bascule en notation scientifique :
  // `formatImplicitDecimal(1e21)` rendait "1e+23", que `parseImplicitDecimal`
  // refuse — la fonction se contredisait sur sa propre sortie, et la page
  // affichait « 1e21 devient 1e+23, les décimales implicites du fichier »,
  // affirmation fausse sur le stockage. Mesuré par le `reviewer` le 23 août 2026.
  // Elle refuse plutôt que de rendre une chaîne qu'elle promet en chiffres.
  if (scaled > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(
      `value scaled by 10^${decimals} exceeds the safe integer range (got ${scaled})`,
    );
  }
  return String(scaled);
}

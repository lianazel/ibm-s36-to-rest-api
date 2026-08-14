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
  if (!/^[0-9]+$/.test(raw)) {
    throw new TypeError(`raw must contain only digits (got "${raw}")`);
  }
  return Number(raw) / 10 ** decimals;
}

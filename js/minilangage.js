/**
 * minilangage.js — le mini-langage de filtre : reconnaisseur, jointure, filtrage
 * et fabrication de la classe.
 *
 * Ce que ce module promet, exactement : les fonctions exportées sont pures et
 * déterministes pour un modèle donné. Aucune ne lit le DOM, aucune ne lit le
 * dictionnaire, aucune ne connaît « fr » ni « en ». Elles ne promettent rien
 * d'un modèle mal formé : `buildModel` exige neuf noms et lève sinon.
 *
 * La couture qui rend cela possible — le modèle passé en paramètre plutôt que
 * lu d'un import — est ajoutée pour la testabilité, et elle élargit la surface
 * publique du module : chaque fonction exportée est désormais un contrat.
 *
 * Le câblage DOM, en fin de fichier, est la seule partie qui connaisse la
 * langue ; il est inerte hors navigateur (pas de DOM sous Vitest).
 */
import { formatImplicitDecimal, parseImplicitDecimal } from "./s36.js";

/* ------------------------------------------------------------------ MODÈLE */

/**
 * Les neuf propriétés exposées, côté physique seulement.
 *
 * Aucun nom de propriété ici : le site traduit son code (`ColonneS36` devient
 * `S36Column`), et seuls les noms physiques de colonnes ne bougent jamais.
 * Les noms de propriétés viennent du dictionnaire, par `buildModel`.
 *
 * `key` est un identifiant interne stable, dérivé de la colonne. `MTTCDE` en
 * porte deux : la même colonne est exposée deux fois, brute puis interprétée,
 * et c'est le couple que le site veut montrer.
 */
export const PHYSICAL_MODEL = Object.freeze([
  { key: "NOMCLI", column: "NOMCLI", file: "CDEMST", type: "texte" },
  { key: "PRECLI", column: "PRECLI", file: "CDEMST", type: "texte" },
  { key: "LIZEPO", column: "LIZEPO", file: "CMLIV", type: "texte" },
  { key: "LIBLIV", column: "LIBLIV", file: "MODLIV", type: "texte" },
  { key: "NUMCDE", column: "NUMCDE", file: "CDEMST", type: "entier" },
  { key: "DATCDE", column: "DATCDE", file: "CDEMST", type: "date" },
  { key: "MTTCDE_BRUT", column: "MTTCDE", file: "CDEMST", type: "texte" },
  { key: "MTTCDE", column: "MTTCDE", file: "CDEMST", type: "décimal" },
  { key: "VILCLI", column: "VILCLI", file: "CLIMST", type: "texte" },
].map(Object.freeze));

/**
 * Assemble le modèle complet : le physique, plus les neuf noms de propriétés
 * de la langue courante.
 *
 * @param {string[]} names Neuf noms, dans l'ordre de `PHYSICAL_MODEL`.
 * @returns {ReadonlyArray<object>} Le modèle, gelé.
 * @throws {RangeError} Si le compte n'est pas neuf.
 * @throws {TypeError}  Si un nom n'est pas une chaîne non vide.
 */
export function buildModel(names) {
  if (!Array.isArray(names) || names.length !== PHYSICAL_MODEL.length) {
    throw new RangeError(
      `names must hold ${PHYSICAL_MODEL.length} entries (got ${Array.isArray(names) ? names.length : typeof names})`,
    );
  }
  return Object.freeze(
    PHYSICAL_MODEL.map((entry, index) => {
      const name = names[index];
      if (typeof name !== "string" || name.trim() === "") {
        throw new TypeError(`names[${index}] must be a non-empty string`);
      }
      return Object.freeze({ ...entry, property: name });
    }),
  );
}

/* ------------------------------------------------------------------- DÉCOR */

/* Le décor est du contenu, pas de la donnée d'exécution : il vit ici, en
   littéral, et le site le montre en entier. Aucune donnée réelle — grossiste
   fictif du `CLAUDE.md`, noms de colonnes d'au plus six caractères, montants à
   décimales implicites, et pas la moindre clé technique. */

/** CDEMST — les commandes. Toujours visibles. */
export const CDEMST = Object.freeze([
  { NOMCLI: "DURAND", PRECLI: "CLAIRE", NUMCDE: "104207", DATCDE: "20260112", MTTCDE: "000012550" },
  { NOMCLI: "DURAND", PRECLI: "MARC", NUMCDE: "104219", DATCDE: "20260118", MTTCDE: "000340000" },
  { NOMCLI: "DUBOIS", PRECLI: "ALICE", NUMCDE: "104231", DATCDE: "20260203", MTTCDE: "000008990" },
  { NOMCLI: "MARTIN", PRECLI: "PAUL", NUMCDE: "104244", DATCDE: "20260211", MTTCDE: "001250000" },
  { NOMCLI: "LEROY", PRECLI: "SOPHIE", NUMCDE: "104258", DATCDE: "20260304", MTTCDE: "000067425" },
  { NOMCLI: "BERNARD", PRECLI: "ALINE", NUMCDE: "104263", DATCDE: "20260319", MTTCDE: "000199900" },
  { NOMCLI: "MOREAU", PRECLI: "JULIEN", NUMCDE: "104277", DATCDE: "20260402", MTTCDE: "000045000" },
  { NOMCLI: "DUCHEMIN", PRECLI: "ALBERTE", NUMCDE: "104281", DATCDE: "20260415", MTTCDE: "000731050" },
  { NOMCLI: "FOURNIER", PRECLI: "LOUISE", NUMCDE: "104296", DATCDE: "20260428", MTTCDE: "000023400" },
  { NOMCLI: "MERCIER", PRECLI: "ANTOINE", NUMCDE: "104302", DATCDE: "20260506", MTTCDE: "000512000" },
  { NOMCLI: "GARNIER", PRECLI: "CAMILLE", NUMCDE: "104318", DATCDE: "20260519", MTTCDE: "000004750" },
  { NOMCLI: "MARCHAND", PRECLI: "HUGO", NUMCDE: "104327", DATCDE: "20260602", MTTCDE: "000088300" },
  { NOMCLI: "LAMBERT", PRECLI: "THERESE", NUMCDE: "104333", DATCDE: "20260615", MTTCDE: "000156780" },
  { NOMCLI: "ROLLAND", PRECLI: "GILLES", NUMCDE: "104341", DATCDE: "20260703", MTTCDE: "000297500" },
  { NOMCLI: "PETIT", PRECLI: "MARIE", NUMCDE: "104355", DATCDE: "20260718", MTTCDE: "000011200" },
  { NOMCLI: "GIRAUD", PRECLI: "PIERRE", NUMCDE: "104362", DATCDE: "20260805", MTTCDE: "000940000" },
  { NOMCLI: "DURAND", PRECLI: "CLAIRE", NUMCDE: "104378", DATCDE: "20260819", MTTCDE: "000064300" },
  { NOMCLI: "MARTIN", PRECLI: "PAUL", NUMCDE: "104384", DATCDE: "20260902", MTTCDE: "000375900" },
].map(Object.freeze));

/** CLIMST — les clients. Deux d'entre eux n'ont passé aucune commande. */
export const CLIMST = Object.freeze([
  { NOMCLI: "DURAND", PRECLI: "CLAIRE", VILCLI: "LYON" },
  { NOMCLI: "DURAND", PRECLI: "MARC", VILCLI: "PARIS" },
  { NOMCLI: "DUBOIS", PRECLI: "ALICE", VILCLI: "NANTES" },
  { NOMCLI: "DUCHEMIN", PRECLI: "ALBERTE", VILCLI: "ROUEN" },
  { NOMCLI: "MARTIN", PRECLI: "PAUL", VILCLI: "LILLE" },
  { NOMCLI: "LEROY", PRECLI: "SOPHIE", VILCLI: "DIJON" },
  { NOMCLI: "BERNARD", PRECLI: "ALINE", VILCLI: "LYON" },
  { NOMCLI: "MOREAU", PRECLI: "JULIEN", VILCLI: "TOURS" },
  { NOMCLI: "FOURNIER", PRECLI: "LOUISE", VILCLI: "LYON" },
  { NOMCLI: "MERCIER", PRECLI: "ANTOINE", VILCLI: "PARIS" },
  { NOMCLI: "GARNIER", PRECLI: "CAMILLE", VILCLI: "NANTES" },
  { NOMCLI: "MARCHAND", PRECLI: "HUGO", VILCLI: "LILLE" },
  { NOMCLI: "LAMBERT", PRECLI: "THERESE", VILCLI: "RENNES" },
  { NOMCLI: "ROLLAND", PRECLI: "GILLES", VILCLI: "PARIS" },
  { NOMCLI: "PETIT", PRECLI: "MARIE", VILCLI: "ANGERS" },
  { NOMCLI: "GIRAUD", PRECLI: "PIERRE", VILCLI: "TOURS" },
  { NOMCLI: "NOEL", PRECLI: "SYLVIE", VILCLI: "RENNES" },
  { NOMCLI: "VASSEUR", PRECLI: "OLIVIER", VILCLI: "ANGERS" },
].map(Object.freeze));

/** CMLIV — le mode de livraison par client. Même ordre que CLIMST. */
export const CMLIV = Object.freeze([
  { NOMCLI: "DURAND", PRECLI: "CLAIRE", LIZEPO: "EXP" },
  { NOMCLI: "DURAND", PRECLI: "MARC", LIZEPO: "STD" },
  { NOMCLI: "DUBOIS", PRECLI: "ALICE", LIZEPO: "RET" },
  { NOMCLI: "DUCHEMIN", PRECLI: "ALBERTE", LIZEPO: "EXP" },
  { NOMCLI: "MARTIN", PRECLI: "PAUL", LIZEPO: "EXP" },
  { NOMCLI: "LEROY", PRECLI: "SOPHIE", LIZEPO: "MES" },
  { NOMCLI: "BERNARD", PRECLI: "ALINE", LIZEPO: "STD" },
  { NOMCLI: "MOREAU", PRECLI: "JULIEN", LIZEPO: "RET" },
  { NOMCLI: "FOURNIER", PRECLI: "LOUISE", LIZEPO: "REL" },
  { NOMCLI: "MERCIER", PRECLI: "ANTOINE", LIZEPO: "PAL" },
  { NOMCLI: "GARNIER", PRECLI: "CAMILLE", LIZEPO: "REL" },
  { NOMCLI: "MARCHAND", PRECLI: "HUGO", LIZEPO: "PAL" },
  { NOMCLI: "LAMBERT", PRECLI: "THERESE", LIZEPO: "MES" },
  { NOMCLI: "ROLLAND", PRECLI: "GILLES", LIZEPO: "STD" },
  { NOMCLI: "PETIT", PRECLI: "MARIE", LIZEPO: "REL" },
  { NOMCLI: "GIRAUD", PRECLI: "PIERRE", LIZEPO: "EXP" },
  { NOMCLI: "NOEL", PRECLI: "SYLVIE", LIZEPO: "RET" },
  { NOMCLI: "VASSEUR", PRECLI: "OLIVIER", LIZEPO: "MES" },
].map(Object.freeze));

/**
 * MODLIV — le référentiel des modes. Six codes.
 *
 * Le libellé n'est pas ici : il est traduit, et ce module ignore la langue.
 * `joinFiles` le reçoit en paramètre, comme les noms de propriétés.
 */
export const MODLIV_CODES = Object.freeze(["EXP", "STD", "RET", "MES", "REL", "PAL"]);

/* ----------------------------------------------------------- RECONNAISSEUR */

/**
 * Les six opérateurs, énumérés. Il n'y en a pas un septième, et c'est la thèse.
 *
 * Écrits comme une table close plutôt que comme une classe de caractères : une
 * classe « large » en français devient « n'importe quoi » en expression
 * régulière (leçon du 16 août 2026).
 */
export const OPERATORS = Object.freeze({
  "==": "egal",
  "[=": "commencePar",
  "=]": "finitPar",
  "[]": "contient",
  "><": "comprisEntre",
  "=>": "superieurOuEgal",
});

/**
 * Opérateurs connus et refusés exprès. La négation ramènerait presque tout un
 * fichier de texte : elle est nommée pour être refusée, pas ignorée.
 */
export const FORBIDDEN_OPERATORS = Object.freeze(["!="]);

/**
 * Ce que chaque type accepte. Table close : ce qui n'y figure pas est refusé.
 *
 * Ce qu'elle EXCLUT, et c'est le point : « commence par », « finit par » et
 * « contient » ne s'appliquent à aucun type numérique — un « commence par » sur
 * un montant interprété n'a pas de sens ; et « compris entre » comme
 * « supérieur ou égal » ne s'appliquent à aucun texte, faute d'ordre défini.
 */
export const OPERATORS_BY_TYPE = Object.freeze({
  texte: Object.freeze(["==", "[=", "=]", "[]"]),
  entier: Object.freeze(["==", "><", "=>"]),
  date: Object.freeze(["==", "><", "=>"]),
  décimal: Object.freeze(["==", "><", "=>"]),
});

/** Le « contient » exige deux caractères, et lui seul. Voir `MIN_LENGTH_NOTE`. */
export const MIN_LENGTH_OPERATORS = Object.freeze(["[]"]);

/* Pourquoi « contient » seulement : `ex.finitPar.aide` invite le lecteur à
   essayer « T », une seule lettre, avec « finit par ». Étendre le minimum aux
   trois opérateurs de texte ferait refuser une invitation écrite dans une
   valeur gelée du prompt. Le catalogue des refus ne nomme que « contient ». */
export const MIN_LENGTH_NOTE = 2;

/**
 * Gabarit d'une séquence : `<colonne:opérateur:valeur/>`.
 *
 * Découpe sur les DEUX PREMIERS deux-points seulement : la valeur peut en
 * contenir, comme elle peut contenir un point-virgule, une apostrophe ou une
 * espace. Elle est une donnée, et une donnée n'a pas à être bien élevée.
 */
const SEQUENCE = /^<([^:]*):([^:]*):(.*)\/>$/;

/** Refus : une forme close, `{ ok: false, refusal: { code, params } }`. */
function refuse(code, params = {}) {
  return { ok: false, refusal: { code, params } };
}

/**
 * Reconnaît une expression. Il ne comprend pas, il reconnaît : tout ce qui ne
 * tombe pas dans la forme close est refusé avec son motif.
 *
 * Une expression vide n'est pas un refus : c'est l'absence de condition, et
 * elle laisse passer toutes les lignes. C'est l'état de la page au chargement.
 *
 * @param {string} text  Ce que le lecteur a tapé.
 * @param {ReadonlyArray<object>} model Modèle assemblé par `buildModel`.
 * @returns {{ok: true, link: string|null, conditions: Array}|{ok: false, refusal: object}}
 */
export function recognise(text, model) {
  const raw = typeof text === "string" ? text.trim() : "";
  if (raw === "") {
    return { ok: true, link: null, conditions: [] };
  }

  // Contrôlé avant tout découpage : une expression qui mêle les deux liaisons
  // est refusée en entier, plutôt que de perdre sa fin en silence.
  const hasAnd = raw.includes("&&");
  const hasOr = raw.includes("||");
  if (hasAnd && hasOr) {
    return refuse("liaison");
  }

  const link = hasOr ? "||" : hasAnd ? "&&" : null;
  const parts = link === null ? [raw] : raw.split(link);
  const conditions = [];

  for (const part of parts) {
    const piece = part.trim();
    const match = SEQUENCE.exec(piece);
    // Opérateur vide : c'est le piège de la position (« l'opérateur à la fin »).
    // Il tombe dans « forme » et non dans « opérateur hors liste », parce que
    // seul le message de forme montre un exemple et nomme cette position.
    if (match === null || match[2] === "") {
      return refuse("forme");
    }

    const [, columnName, operator, value] = match;
    const entry = model.find((candidate) => candidate.property === columnName);
    if (entry === undefined) {
      return refuse("colonne", { nom: columnName });
    }
    if (FORBIDDEN_OPERATORS.includes(operator)) {
      return refuse("interdit", { op: operator });
    }
    if (!Object.hasOwn(OPERATORS, operator)) {
      return refuse("operateur", { op: operator, colonne: entry.property });
    }
    if (!OPERATORS_BY_TYPE[entry.type].includes(operator)) {
      return refuse("type", {
        operateur: operator,
        colonne: entry.property,
        type: entry.type,
        types: typesAccepting(operator),
      });
    }
    if (value.trim() === "") {
      return refuse("valeurVide");
    }
    if (operator === "><") {
      const bounds = value.split(";");
      if (bounds.length !== 2 || bounds.some((bound) => bound.trim() === "")) {
        return refuse("bornes", { colonne: entry.property });
      }
      conditions.push({ entry, operator, bounds: bounds.map((b) => b.trim()) });
      continue;
    }
    if (MIN_LENGTH_OPERATORS.includes(operator) && value.trim().length < MIN_LENGTH_NOTE) {
      return refuse("tropCourt", { operateur: operator });
    }
    conditions.push({ entry, operator, value: value.trim() });
  }

  return { ok: true, link, conditions };
}

/** Les types qui acceptent un opérateur donné, dans l'ordre de la table. */
function typesAccepting(operator) {
  return Object.keys(OPERATORS_BY_TYPE).filter((type) =>
    OPERATORS_BY_TYPE[type].includes(operator),
  );
}

/* ---------------------------------------------------------------- JOINTURE */

/**
 * Deux lignes désignent le même client si le nom ET le prénom concordent.
 *
 * La comparaison ignore la casse, comme `matches` le fait déjà pour le filtre.
 * Tant que le décor était figé en majuscules, rien ne mordait ; dès que le
 * lecteur édite, « durand » aurait cassé la jointure de DURAND sans que rien
 * dans la page ne l'explique. Ce qui casse un lien, c'est un AUTRE NOM, pas une
 * autre écriture du même nom — sinon la démonstration enseignerait la casse là
 * où elle veut enseigner la jointure par les valeurs.
 */
function sameCustomer(left, right) {
  return left.NOMCLI.toUpperCase() === right.NOMCLI.toUpperCase()
    && left.PRECLI.toUpperCase() === right.PRECLI.toUpperCase();
}

/**
 * Joint les quatre fichiers par les valeurs du métier, sans le moindre
 * identifiant : commandes ↔ clients et commandes ↔ mode sur nom plus prénom,
 * puis mode ↔ référentiel sur `LIZEPO` = `CODLIV`.
 *
 * Une jointure qui ne trouve rien rend `null`, et `null` ne satisfait aucun
 * test — c'est ce comportement que l'incrément suivant rendra visible.
 *
 * @param {Record<string, string>} labels Libellé de chaque code de MODLIV,
 *   dans la langue courante. Ce module ne les traduit pas, il les reçoit.
 * @param {ReadonlyArray<object>} orders Les commandes à joindre. Le décor gelé
 *   par défaut ; la copie que le lecteur édite quand il a ouvert les données.
 *   Sans ce paramètre, la rupture de jointure ne serait pas de la logique pure
 *   testable : le décor est figé au niveau du module.
 * @returns {Array<object>} Les commandes, enrichies, clés physiques.
 */
export function joinFiles(labels = {}, orders = CDEMST) {
  return orders.map((order) => {
    const customer = CLIMST.find((row) => sameCustomer(row, order)) ?? null;
    const mode = CMLIV.find((row) => sameCustomer(row, order)) ?? null;
    const code = mode === null ? null : mode.LIZEPO;
    // Le lecteur édite les commandes : ces deux champs peuvent porter ce qu'il
    // a tapé, y compris ce qu'un enregistrement S/36 n'aurait jamais pu tenir.
    // `parseImplicitDecimal` LÈVE sur autre chose que des chiffres — sans cette
    // garde, une lettre dans un montant arrêtait la page entière. Une valeur
    // que le fichier ne pourrait pas stocker rend `null`, comme une jointure
    // qui ne trouve rien : la page ne corrige jamais à la place du lecteur.
    const amount = /^[0-9]+$/.test(order.MTTCDE) ? parseImplicitDecimal(order.MTTCDE) : null;
    const number = Number(order.NUMCDE);
    return {
      NOMCLI: order.NOMCLI,
      PRECLI: order.PRECLI,
      NUMCDE: Number.isNaN(number) ? null : number,
      DATCDE: order.DATCDE,
      MTTCDE_BRUT: order.MTTCDE,
      MTTCDE: amount,
      VILCLI: customer === null ? null : customer.VILCLI,
      LIZEPO: code,
      // Les codes sont en majuscules dans les fichiers, les clés du
      // dictionnaire en minuscules : la correspondance se fait ici, une fois.
      LIBLIV: code === null ? null : (labels[code.toLowerCase()] ?? null),
    };
  });
}

/**
 * Les commandes qui ne retrouvent plus leur client.
 *
 * Une jointure sans correspondance rend `null` : c'est le signe, et le seul.
 * `hidden` porte celles qui sont EN PLUS sorties du résultat filtré — sans
 * cette distinction, le lecteur qui casse un nom sous un filtre qui teste ce
 * même nom voit la ligne disparaître et cherche un `null` qui n'a nulle part
 * où s'afficher. Il en conclurait que la démonstration ment.
 *
 * L'appartenance se mesure par identité d'objet, jamais par numéro : le lecteur
 * peut aussi éditer le numéro, et deux commandes peuvent en porter le même.
 *
 * @param {Array<object>} rows Toutes les lignes jointes.
 * @param {Array<object>} kept Celles que le filtre en cours retient.
 */
export function findOrphans(rows, kept) {
  const orphans = rows.filter((row) => row.VILCLI === null || row.LIZEPO === null);
  const shown = new Set(kept);
  return { orphans, hidden: orphans.filter((row) => !shown.has(row)) };
}

/* --------------------------------------------------------------- FILTRAGE */

/**
 * Compare une valeur de ligne à une valeur tapée.
 *
 * La valeur tapée est COMPARÉE, jamais assemblée ni évaluée : aucune
 * concaténation, aucune construction de requête, aucun `eval`. C'est pourquoi
 * une tentative d'injection passe le reconnaisseur sans rien casser — elle est
 * un nom de client qui n'existe pas.
 *
 * Les comparaisons de texte ignorent la casse : le lecteur qui tape « dur »
 * cherche la même chose que celui qui tape « DUR », et le décor est en
 * majuscules parce que les fichiers S/36 l'étaient, pas pour piéger la saisie.
 */
function matches(condition, row) {
  const actual = row[condition.entry.key];
  // Une jointure sans correspondance rend null, et null ne satisfait aucun test.
  if (actual === null || actual === undefined) {
    return false;
  }
  const numeric = condition.entry.type !== "texte";

  if (condition.operator === "><") {
    const [low, high] = condition.bounds.map(Number);
    const value = Number(actual);
    if (Number.isNaN(low) || Number.isNaN(high) || Number.isNaN(value)) {
      return false;
    }
    return value >= low && value <= high;
  }

  if (condition.operator === "=>") {
    const bound = Number(condition.value);
    const value = Number(actual);
    return !Number.isNaN(bound) && !Number.isNaN(value) && value >= bound;
  }

  if (condition.operator === "==") {
    if (numeric) {
      const wanted = Number(condition.value);
      return !Number.isNaN(wanted) && Number(actual) === wanted;
    }
    return String(actual).toUpperCase() === condition.value.toUpperCase();
  }

  const haystack = String(actual).toUpperCase();
  const needle = condition.value.toUpperCase();
  if (condition.operator === "[=") return haystack.startsWith(needle);
  if (condition.operator === "=]") return haystack.endsWith(needle);
  return haystack.includes(needle);
}

/**
 * Filtre les lignes jointes par une expression.
 *
 * Le retour PORTE LA LECTURE — `link` et `conditions` — et pas seulement les
 * lignes. Sans elle, l'appelant qui veut aussi montrer la requête devrait
 * reconnaître une seconde fois la même chaîne, et deux lectures d'un même texte
 * sont deux occasions de diverger : la requête est partie sans sa clause
 * `where` pendant que le JSON, lui, filtrait (mesuré au DOM d'essai, 23 août
 * 2026). Le chemin de refus rendait déjà la lecture telle quelle ; les deux
 * chemins sont désormais de la même forme.
 *
 * @returns {{ok: true, link: string|null, conditions: Array, rows: Array,
 *   total: number}|{ok: false, refusal: object}}
 */
export function filterRows(text, model, rows) {
  const read = recognise(text, model);
  if (!read.ok) {
    return read;
  }
  if (read.conditions.length === 0) {
    return { ...read, rows: [...rows], total: rows.length };
  }
  const keep = read.link === "||"
    ? (row) => read.conditions.some((condition) => matches(condition, row))
    : (row) => read.conditions.every((condition) => matches(condition, row));
  return { ...read, rows: rows.filter(keep), total: rows.length };
}

/* -------------------------------------------------------- JSON ET REQUÊTE */

/* AVERTISSEMENT DE PÉRIMÈTRE, et la revue doit pouvoir le vérifier : aucune
   requête n'est ÉMISE ni EXÉCUTÉE nulle part dans ce fichier. Les deux textes
   fabriqués ci-dessous sont des CHAÎNES D'ILLUSTRATION, posées dans la page par
   `textContent`. Il n'y a ni base, ni pilote, ni appel réseau dans ce projet.
   La requête « naïve » est une concaténation délibérée : elle existe pour
   MONTRER la faille que la règle « zéro concaténation SQL » interdit d'écrire
   pour de vrai. La montrer désarmée est le seul usage qu'en fait ce site. */

/**
 * Le JSON que l'API renverrait : les propriétés cochées, les lignes retenues.
 *
 * `JSON.stringify` fait exactement ce que le contrat demande — guillemets sur
 * les textes, rien sur les nombres, `null` nu, pas de virgule finale — et le
 * refaire à la main n'ajouterait que des façons de se tromper.
 *
 * Les deux vides ne disent pas la même chose et ne se confondent pas :
 * `null` quand AUCUNE COLONNE n'est choisie (il n'y a rien à renvoyer), `"[]"`
 * quand des colonnes le sont mais qu'aucune ligne ne passe le filtre.
 *
 * @param {Array<object>} rows Les lignes retenues, clés physiques.
 * @param {ReadonlyArray<object>} entries Les entrées cochées, ordre du modèle.
 * @returns {string|null}
 */
export function renderJson(rows, entries) {
  if (entries.length === 0) {
    return null;
  }
  const objects = rows.map((row) =>
    Object.fromEntries(entries.map((entry) => [entry.property, row[entry.key] ?? null])),
  );
  return JSON.stringify(objects, null, 2);
}

/** Toute requête part des commandes. */
const BASE_FILE = "CDEMST";

/**
 * Les jointures, écrites une fois, par les valeurs du métier et rien d'autre.
 *
 * `MODLIV` ne se rejoint qu'À TRAVERS `CMLIV` : le code du mode vit chez le
 * client, le libellé au référentiel. C'est la même donnée sous deux noms —
 * `LIZEPO` et `CODLIV` — et c'est l'argument central du site.
 */
const JOIN_CLAUSES = Object.freeze({
  CLIMST: "join CLIMST on CLIMST.NOMCLI = CDEMST.NOMCLI and CLIMST.PRECLI = CDEMST.PRECLI",
  CMLIV: "join CMLIV on CMLIV.NOMCLI = CDEMST.NOMCLI and CMLIV.PRECLI = CDEMST.PRECLI",
  MODLIV: "join MODLIV on MODLIV.CODLIV = CMLIV.LIZEPO",
});

/** Ordre fixe : la requête ne change pas de forme selon l'ordre des cases. */
const JOIN_ORDER = Object.freeze(["CLIMST", "CMLIV", "MODLIV"]);

/** L'opérateur SQL de chacun. `><` a sa propre forme, à deux paramètres. */
const SQL_OPERATORS = Object.freeze({
  "==": "=",
  "[=": "like",
  "=]": "like",
  "[]": "like",
  "=>": ">=",
});

/**
 * Les fichiers qu'il faut joindre : ceux qu'une colonne cochée OU filtrée
 * exige, jamais plus. Une requête ne traîne pas un fichier dont personne ne lit
 * la moindre colonne.
 */
function requiredFiles(entries, conditions) {
  const wanted = new Set();
  for (const entry of [...entries, ...conditions.map((condition) => condition.entry)]) {
    if (entry.file === BASE_FILE) {
      continue;
    }
    wanted.add(entry.file);
    if (entry.file === "MODLIV") {
      wanted.add("CMLIV");
    }
  }
  return JOIN_ORDER.filter((file) => wanted.has(file));
}

/**
 * Les colonnes du `select`, DÉDOUBLONNÉES sur le couple fichier + colonne.
 *
 * `montantBrut` et `montantCommande` sortent tous deux de `CDEMST.MTTCDE` : le
 * `select` la lit UNE FOIS. Sans cela la requête afficherait la même colonne
 * deux fois, ce qu'aucune API n'écrirait. Le JSON, lui, garde les deux
 * propriétés : c'est le modèle qui les distingue, pas la requête.
 */
function selectColumns(entries) {
  const seen = new Set();
  const columns = [];
  for (const entry of entries) {
    const qualified = `${entry.file}.${entry.column}`;
    if (seen.has(qualified)) {
      continue;
    }
    seen.add(qualified);
    columns.push(qualified);
  }
  return columns;
}

/**
 * Le motif d'un `like`. La valeur porte son joker : c'est ELLE qui voyage, et
 * le lecteur doit voir ce qui voyage vraiment, pas une version allégée.
 */
function likePattern(operator, value) {
  if (operator === "[=") return `${value}%`;
  if (operator === "=]") return `%${value}`;
  return `%${value}%`;
}

/**
 * La traduction d'une borne décimale, ou son absence.
 *
 * Le fichier stocke `000012550` pour 125,50 : `125` part donc en `12500`. Sans
 * cette traduction, la requête affichée ne trouverait pas ce que le simulateur
 * montre, et la page mentirait sur son propre mécanisme. Seul le type `décimal`
 * est concerné : un texte ou un entier part tel quel.
 *
 * Une valeur qui n'est pas un nombre passe INTACTE — le reconnaisseur ne
 * valide pas la numéricité d'une borne, et traduire « abc » afficherait un
 * `NaN` là où le lecteur attend sa propre saisie.
 */
function translateBound(entry, value) {
  if (entry.type !== "décimal") {
    return null;
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return null;
  }
  return { avant: value, apres: formatImplicitDecimal(numeric) };
}

/**
 * Ce qu'une valeur devient à côté de la requête, en paramètre.
 *
 * Un texte s'affiche entre guillemets DROITS : c'est de la délimitation, pas du
 * SQL — elle rend visibles les espaces et les apostrophes que la valeur porte.
 * Une borne numérique s'affiche nue : un paramètre est typé, un nombre n'est
 * pas un texte.
 */
function toParameter(entry, operator, value) {
  const raw = entry.type === "texte" && operator !== "==" ? likePattern(operator, value) : value;
  if (entry.type === "texte") {
    return { property: entry.property, display: `"${raw}"`, translated: null };
  }
  const translated = translateBound(entry, raw);
  return {
    property: entry.property,
    display: translated === null ? raw : translated.apres,
    translated,
  };
}

/** La même valeur, mais COLLÉE dans le texte. C'est tout le défaut, montré. */
function toLiteral(entry, operator, value) {
  const raw = entry.type === "texte" && operator !== "==" ? likePattern(operator, value) : value;
  if (entry.type === "texte") {
    return `'${raw}'`;
  }
  const translated = translateBound(entry, raw);
  return translated === null ? raw : translated.apres;
}

/**
 * Le squelette commun aux deux textes : mêmes colonnes, mêmes jointures, même
 * `where`. Seule la façon dont la valeur y entre change — et c'est précisément
 * ce que le vis-à-vis donne à voir.
 */
function composeQuery(read, entries, literal) {
  const conditions = read.conditions ?? [];
  const lines = [`select ${selectColumns(entries).join(", ")}`, `  from ${BASE_FILE}`];
  for (const file of requiredFiles(entries, conditions)) {
    lines.push(`  ${JOIN_CLAUSES[file]}`);
  }
  const params = [];
  const glue = read.link === "||" ? "or" : "and";
  conditions.forEach((condition, index) => {
    const column = `${condition.entry.file}.${condition.entry.column}`;
    const values = condition.operator === "><" ? condition.bounds : [condition.value];
    const marks = values.map((value) => {
      if (literal) {
        return toLiteral(condition.entry, condition.operator, value);
      }
      params.push(toParameter(condition.entry, condition.operator, value));
      return "?";
    });
    const fragment = condition.operator === "><"
      ? `${column} between ${marks[0]} and ${marks[1]}`
      : `${column} ${SQL_OPERATORS[condition.operator]} ${marks[0]}`;
    // Une condition par ligne : la requête reste lisible sur un téléphone, et
    // les mots-clés se calent les uns sous les autres comme on les écrit.
    lines.push(index === 0 ? ` where ${fragment}` : `${glue.padStart(6)} ${fragment}`);
  });
  return { sql: lines.join("\n"), params };
}

/**
 * La requête paramétrée, et les valeurs qui voyagent à côté d'elle.
 *
 * @param {{link: string|null, conditions: Array}} read Une lecture RÉUSSIE.
 * @param {ReadonlyArray<object>} entries Les entrées cochées.
 * @returns {{sql: string|null, params: Array}} `sql` vaut `null` sans colonne
 *   cochée : il n'y a alors pas de requête (arbitrage du chef de projet,
 *   session 19), et l'appelant affiche le texte d'absence.
 */
export function buildParameterisedQuery(read, entries) {
  if (entries.length === 0) {
    return { sql: null, params: [] };
  }
  return composeQuery(read, entries, false);
}

/**
 * La requête qu'une API naïve aurait fabriquée en collant les textes bout à
 * bout, valeur comprise.
 *
 * Elle n'apparaît QUE si une valeur porte une apostrophe : sur une demande
 * ordinaire, la page reste sobre. Sans colonne cochée il n'y a pas de requête,
 * donc pas de version naïve non plus, apostrophe ou pas.
 *
 * @returns {string|null}
 */
export function buildNaiveQuery(read, entries) {
  if (entries.length === 0) {
    return null;
  }
  const conditions = read.conditions ?? [];
  const carries = conditions.some((condition) =>
    (condition.operator === "><" ? condition.bounds : [condition.value]).some((value) =>
      value.includes("'"),
    ),
  );
  if (!carries) {
    return null;
  }
  return composeQuery(read, entries, true).sql;
}

/* ----------------------------------------------------------------- CLASSE */

/**
 * Empreinte FNV-1a 32 bits, rendue en quatre caractères hexadécimaux.
 *
 * Pure et déterministe, sans dépendance : ce n'est pas une empreinte
 * cryptographique et elle n'en a pas l'usage — elle sert à ce que deux
 * sélections différentes portent deux noms différents, sous les yeux du lecteur.
 */
function fingerprint(text) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0").slice(0, 4);
}

/**
 * Le nom de la classe fabriquée. Personne ne l'a écrit : il se dérive des
 * colonnes choisies.
 *
 * L'empreinte porte sur les identifiants PHYSIQUES : une même sélection donne
 * le même suffixe en français et en anglais, seul le préfixe se traduit. C'est
 * la thèse du site en miniature.
 */
export function className(prefix, entries) {
  return `${prefix}_${fingerprint(entries.map((entry) => entry.key).join("|"))}`;
}

/**
 * Rend la classe en C#, dans le registre des extraits de la section 3.
 *
 * La traduction vers le fichier est sur sa propre ligne, au-dessus de chaque
 * déclaration, et nomme la colonne et son fichier : en bout de ligne, le nom de
 * colonne sort du cadre sur téléphone (arbitrage du 21 août 2026).
 */
export function renderClass({ prefix, entries, comment, empty }) {
  if (entries.length === 0) {
    return `// ${comment}\npublic class ${prefix}\n{\n    // ${empty}\n}`;
  }
  const body = entries
    .map((entry) => `    // ${entry.column} (${entry.file})\n    public ${csharpType(entry.type)} ${entry.property} { get; set; }`)
    .join("\n\n");
  return `// ${comment}\npublic class ${className(prefix, entries)}\n{\n${body}\n}`;
}

/** Le type C# d'une propriété. Table close, comme tout le reste. */
function csharpType(type) {
  if (type === "entier") return "int";
  if (type === "décimal") return "decimal";
  return "string";
}

/* --------------------------------------------------------------- EXEMPLES */

/**
 * Les treize exemples. Chacun porte ses parties, jamais son texte : le nom de
 * colonne vient du modèle de la langue courante, donc l'anglophone lit
 * `<customerLastName:[=:DUR/>` sans qu'une seule valeur soit dupliquée.
 *
 * `tone` : « gris » passe, « rouge » tente une demande interdite. La tentative
 * d'injection est rouge et vient en dernier — elle est la plus forte, et elle
 * ne se fait pas refuser : elle ne trouve rien.
 *
 * Les parties sont `[indice de propriété | littéral, opérateur, valeur]`.
 */
export const EXAMPLES = Object.freeze([
  { key: "commencePar", tone: "gris", parts: [[0, "[=", "DUR"]] },
  { key: "finitPar", tone: "gris", parts: [[0, "=]", "IER"]] },
  { key: "contient", tone: "gris", parts: [[0, "[]", "AR"]] },
  { key: "deuxConditions", tone: "gris", parts: [[0, "[=", "DUR"], [2, "==", "EXP"]] },
  { key: "jointure", tone: "gris", parts: [[0, "[=", "DUR"], [8, "==", "LYON"]] },
  { key: "comprisEntre", tone: "gris", parts: [[7, "><", "1000;4000"]] },
  { key: "depuisDate", tone: "gris", parts: [[5, "=>", "20260701"]] },
  // Le nom de colonne inventé reste tel quel dans les deux langues : c'est une
  // chaîne tapée par un appelant, pas un texte du site.
  { key: "colonneInconnue", tone: "rouge", parts: [["motDePasse", "==", "toto"]] },
  { key: "operateurInconnu", tone: "rouge", parts: [[0, "~~", "DUR"]] },
  { key: "valeurCourte", tone: "rouge", parts: [[0, "[]", "A"]] },
  { key: "negation", tone: "rouge", parts: [[0, "!=", "ZZ"]] },
  { key: "etOu", tone: "rouge", parts: [[0, "[=", "DUR"], [8, "==", "LYON"], [0, "[=", "MAR"]], links: ["&&", "||"] },
  { key: "injection", tone: "rouge", parts: [[0, "==", "D' OR '1'='1"]] },
].map(Object.freeze));

/** Écrit l'expression d'un exemple dans la langue du modèle reçu. */
export function exampleExpression(example, model) {
  const sequences = example.parts.map(([column, operator, value]) => {
    const name = typeof column === "number" ? model[column].property : column;
    return `<${name}:${operator}:${value}/>`;
  });
  const links = example.links ?? sequences.slice(1).map(() => "&&");
  return sequences.reduce(
    (text, sequence, index) => (index === 0 ? sequence : `${text} ${links[index - 1]} ${sequence}`),
    "",
  );
}

/** Les quatre propriétés cochées au départ : nom, numéro, montant, mode. */
export const DEFAULT_SELECTION = Object.freeze([0, 4, 7, 2]);

/**
 * La sélection de départ, dans l'ordre du modèle.
 *
 * `DEFAULT_SELECTION` énumère les quatre colonnes dans l'ordre où le contrat
 * les nomme, pas dans celui du modèle. Servie telle quelle, elle donnait à la
 * classe un nom qui dépendait du CHEMIN du lecteur : les mêmes quatre colonnes
 * rendaient `b0ff` au chargement et `4b8e` après une case cochée puis décochée,
 * parce que le tri n'entrait en jeu qu'au premier basculement. La page enseigne
 * que le nom se dérive des colonnes choisies ; il se dérivait de l'ordre des
 * gestes. Trouvé sur iPhone 14 le 22 août 2026, par l'œil du chef de projet.
 */
export function initialSelection() {
  return [...DEFAULT_SELECTION].sort((left, right) => left - right);
}

/**
 * Réécrit une expression d'un modèle vers l'autre, propriété par propriété.
 *
 * Sans elle, basculer la langue ferait refuser le filtre déjà tapé : le lecteur
 * verrait « colonne hors de la liste exposée » sur une demande qu'il venait de
 * voir passer. Le mini-langage est bilingue comme le reste du code ; il l'est
 * donc aussi pour ce qui est déjà à l'écran.
 *
 * Limite dite plutôt que masquée : la réécriture porte sur ce qui suit un
 * chevron ouvrant, donc une valeur qui contiendrait elle-même un `<` suivi d'un
 * nom de propriété et d'un deux-points serait réécrite aussi. Aucun exemple
 * livré n'est dans ce cas.
 */
export function translateExpression(text, fromModel, toModel) {
  return String(text).replace(/<([^:<]*):/g, (whole, name) => {
    const index = fromModel.findIndex((entry) => entry.property === name);
    return index === -1 ? whole : `<${toModel[index].property}:`;
  });
}

/* ------------------------------------------------- CÂBLAGE (hors logique) */

/** Remplace `{nom}` par sa valeur. Le texte reste du texte : jamais de HTML. */
function fill(template, params) {
  return String(template).replace(/\{(\w+)\}/g, (whole, name) =>
    Object.hasOwn(params, name) ? String(params[name]) : whole,
  );
}

/**
 * Monte le simulateur. Seule fonction de ce module qui connaisse la langue,
 * et elle ne la connaît que par le dictionnaire qu'on lui passe.
 *
 * Appelée par l'amorçage de `js/i18n.js` : la page ne porte pas de troisième
 * balise `<script>`, et ce module n'importe rien de `i18n.js` — pas de cycle.
 *
 * @param {{dict: object, root: Document}} deps
 */
export function mountMiniLanguage({ dict, root }) {
  const zone = root.getElementById("mini-simulateur");
  if (zone === null) {
    return;
  }

  const field = root.getElementById("mini-filtre");
  const status = root.getElementById("mini-statut");
  const columns = root.getElementById("mini-colonnes");
  const examples = root.getElementById("mini-exemples");
  const help = root.getElementById("mini-aide");
  const code = root.getElementById("mini-classe");
  const jsonBox = root.getElementById("mini-json");
  const sqlBox = root.getElementById("mini-sql");
  const naiveBox = root.getElementById("mini-naive");
  const naiveBlock = root.getElementById("mini-naive-bloc");
  const parametreePhrase = root.getElementById("mini-phrase-parametree");
  const valuesBlock = root.getElementById("mini-valeurs-bloc");
  const valuesIntro = root.getElementById("mini-valeurs-intro");
  const valuesList = root.getElementById("mini-valeurs");
  const editButton = root.getElementById("mini-edition");
  const editNote = root.getElementById("mini-edition-note");
  const joinBox = root.getElementById("mini-jointure");
  const bodies = {
    CDEMST: root.getElementById("mini-cdemst"),
    CLIMST: root.getElementById("mini-climst"),
    CMLIV: root.getElementById("mini-cmliv"),
    MODLIV: root.getElementById("mini-modliv"),
  };

  /** Les cases cochées, par indice de propriété. */
  let selection = initialSelection();
  /**
   * Les commandes telles que le lecteur les a laissées.
   *
   * Une COPIE : le décor reste gelé, et seules les commandes s'éditent. Les
   * trois autres fichiers ne bougent pas, et c'est voulu — `CLIMST` continue de
   * montrer la graphie d'origine, si bien que le lecteur répare en lisant
   * l'autre fichier. C'est la jointure par les valeurs enseignée par le geste
   * même de la réparation.
   */
  const orders = CDEMST.map((order) => ({ ...order }));
  /** Les données sont-elles ouvertes à l'écriture ? Le bouton en décide. */
  let editing = false;
  /**
   * Le dernier exemple retenu par un clic : il survit au survol.
   *
   * L'EXEMPLE est retenu, jamais son texte : c'est ce qui permet de vérifier à
   * chaque rendu qu'il décrit encore ce que le champ contient, et de retrouver
   * son explication dans la langue courante après un basculement.
   */
  let heldExample = null;

  const texts = () => dict[root.documentElement.lang]?.section4 ?? dict.fr.section4;

  const currentModel = () => {
    const table = texts().modele;
    return buildModel(PHYSICAL_MODEL.map((entry) => table[entry.key]));
  };

  /** Une cellule, avec sa teinte de lien s'il y a lieu. */
  const cell = (text, tint) => {
    const td = root.createElement("td");
    td.textContent = text;
    if (tint) {
      td.className = tint;
    }
    return td;
  };

  /**
   * La largeur d'une colonne, en caractères, d'après la donnée la plus longue :
   * le tableau garde son gabarit quand il s'ouvre à l'écriture, au lieu de
   * s'élargir sous le doigt au moment précis où le lecteur vise une cellule.
   */
  const widthOf = (fieldName) =>
    Math.max(...orders.map((order) => String(order[fieldName]).length));

  /** Une cellule de commande : texte au repos, champ de saisie une fois ouverte. */
  const orderCell = (order, fieldName, tint) => {
    const td = root.createElement("td");
    if (tint) {
      td.className = tint;
    }
    if (!editing) {
      td.textContent = order[fieldName];
      return td;
    }
    const input = root.createElement("input");
    input.type = "text";
    input.value = order[fieldName];
    input.size = widthOf(fieldName);
    // Les quatre mêmes coupures que le champ du filtre (`index.html`) : sur
    // téléphone, le clavier corrige et met en capitale de son propre chef, et
    // il réparerait sous le doigt la rupture que le lecteur cherche à
    // provoquer. Mesuré sur iPhone 14 le 21 août 2026.
    input.autocomplete = "off";
    input.spellcheck = false;
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("autocorrect", "off");
    // Nom accessible physique, donc jamais traduit : la colonne du fichier et
    // le numéro de la commande suffisent à situer la cellule.
    input.setAttribute("aria-label", `${fieldName} ${order.NUMCDE}`);
    input.addEventListener("input", () => {
      // La valeur est prise TELLE QUE TAPÉE : la page ne corrige jamais à la
      // place du lecteur. C'est la jointure qui tolère la casse, pas la saisie
      // qui se fait redresser.
      order[fieldName] = input.value;
      render();
    });
    td.append(input);
    return td;
  };

  const fillTables = () => {
    const labels = texts().modes;
    if (bodies.CDEMST !== null) {
      bodies.CDEMST.replaceChildren();
      for (const order of orders) {
        const tr = root.createElement("tr");
        tr.append(
          orderCell(order, "NOMCLI", "lien-valeurs"),
          orderCell(order, "PRECLI", "lien-valeurs"),
          orderCell(order, "NUMCDE", ""),
          orderCell(order, "DATCDE", ""),
          orderCell(order, "MTTCDE", ""),
        );
        bodies.CDEMST.append(tr);
      }
    }
    const rows = [
      [bodies.CLIMST, CLIMST.map((row) => [
        [row.NOMCLI, "lien-valeurs"], [row.PRECLI, "lien-valeurs"], [row.VILCLI, ""],
      ])],
      [bodies.CMLIV, CMLIV.map((row) => [
        [row.NOMCLI, "lien-valeurs"], [row.PRECLI, "lien-valeurs"], [row.LIZEPO, "lien-code"],
      ])],
      [bodies.MODLIV, MODLIV_CODES.map((codeValue) => [
        [codeValue, "lien-code"], [labels[codeValue.toLowerCase()], ""],
      ])],
    ];
    for (const [body, lines] of rows) {
      if (body === null) continue;
      body.replaceChildren();
      for (const line of lines) {
        const tr = root.createElement("tr");
        for (const [text, tint] of line) {
          tr.append(cell(text, tint));
        }
        body.append(tr);
      }
    }
  };

  const buildColumns = () => {
    const model = currentModel();
    columns.replaceChildren();
    model.forEach((entry, index) => {
      const item = root.createElement("li");
      const label = root.createElement("label");
      const box = root.createElement("input");
      box.type = "checkbox";
      box.checked = selection.includes(index);
      box.addEventListener("change", () => {
        const kept = new Set(selection);
        if (box.checked) {
          kept.add(index);
        } else {
          kept.delete(index);
        }
        // Triée : l'ordre des propriétés de la classe suit le modèle, jamais
        // l'ordre dans lequel le lecteur a coché ses cases.
        selection = [...kept].sort((left, right) => left - right);
        render();
      });
      const name = root.createElement("code");
      name.textContent = entry.property;
      // Le pont de noms, posé LÀ OÙ LE LECTEUR COCHE. Il vivait déjà en tête de
      // section et dans les commentaires de la classe, mais loin et implicite :
      // pour `codeModeLivraison` face à `LIZEPO`, personne ne peut deviner.
      // Ces rappels NE SE TRADUISENT PAS : les noms physiques sont la moitié du
      // pont qui ne bouge jamais. `montantBrut` et `montantCommande` affichent
      // donc tous deux « MTTCDE · CDEMST », et c'est voulu : le couple se voit
      // à l'endroit même où on le coche, avant que la requête ne le dédoublonne.
      const origin = root.createElement("small");
      origin.className = "origine";
      origin.textContent = `${entry.column} · ${entry.file}`;
      const stack = root.createElement("span");
      stack.className = "colonne-texte";
      stack.append(name, origin);
      label.append(box, stack);
      item.append(label);
      columns.append(item);
    });
  };

  const buildExamples = () => {
    const model = currentModel();
    const labels = texts().ex;
    examples.replaceChildren();
    for (const example of EXAMPLES) {
      const item = root.createElement("li");
      const button = root.createElement("button");
      button.type = "button";
      button.className = `exemple ${example.tone}`;
      button.textContent = labels[example.key].nom;
      const explain = () => showHelp(labels[example.key].aide);
      button.addEventListener("mouseenter", explain);
      button.addEventListener("focus", explain);
      button.addEventListener("mouseleave", restoreHelp);
      button.addEventListener("blur", restoreHelp);
      button.addEventListener("click", () => {
        heldExample = example;
        field.value = exampleExpression(example, model);
        showHelp(labels[example.key].aide);
        render();
      });
      item.append(button);
      examples.append(item);
    }
  };

  /** Le survol montre sans engager ; le clic retient. Une seule surface. */
  const showHelp = (text) => {
    help.textContent = text;
  };
  const restoreHelp = () => {
    help.textContent = heldExample === null
      ? texts().exemples.repos
      : texts().ex[heldExample.key].aide;
  };

  const render = () => {
    const model = currentModel();

    // Une explication ne survit pas à un champ qui la contredit : le lecteur
    // avait sous les yeux « 3 commandes sur 18 » pendant que la page refusait
    // sa demande (mesuré sur iPhone 14, 22 août 2026).
    //
    // La comparaison porte sur l'expression de l'exemple DANS LA LANGUE
    // COURANTE, jamais sur la chaîne mémorisée au clic : le basculement de
    // langue réécrit le champ, et comparer à la chaîne d'origine effacerait
    // l'explication d'un exemple qui est pourtant toujours celui affiché.
    if (heldExample !== null && field.value !== exampleExpression(heldExample, model)) {
      heldExample = null;
      restoreHelp();
    }
    const rows = joinFiles(texts().modes, orders);
    const result = filterRows(field.value, model, rows);

    // Le texte entre élément par élément, par `textContent` seul : un motif de
    // refus cite ce que le lecteur vient de taper, et cette chaîne ne doit
    // jamais avoir la moindre chance d'être lue comme du balisage. C'est cette
    // pose, et non l'encodage des chevrons, qui rend l'injection impossible.
    status.replaceChildren();
    if (result.ok) {
      const found = result.rows.length;
      const template = found === 0
        ? texts().compte.aucune
        : found === 1
          ? texts().compte.une
          : texts().compte.plusieurs;
      const line = root.createElement("span");
      line.textContent = fill(template, { n: found, total: result.total });
      status.append(line);
      status.className = "statut";
    } else {
      const refusal = texts().refus[result.refusal.code];
      const params = { ...result.refusal.params };
      if (Object.hasOwn(params, "type")) {
        params.type = texts().types[params.type] ?? params.type;
      }
      if (Object.hasOwn(params, "types")) {
        params.types = params.types.map((type) => texts().types[type] ?? type).join(", ");
      }
      const title = root.createElement("strong");
      title.textContent = fill(refusal.quoi, params);
      const why = root.createElement("span");
      why.textContent = fill(refusal.pourquoi, params);
      // L'espace entre les deux est un noeud de texte à lui seul : la mise en
      // page les met sur deux lignes, mais le texte brut de la région les
      // souderait sans lui (mesuré au navigateur le 22 août 2026).
      status.append(title, root.createTextNode(" "), why);
      status.className = "statut refuse";
    }

    const chosen = selection.map((index) => model[index]);
    code.textContent = renderClass({
      prefix: texts().classe.prefixe,
      entries: chosen,
      comment: texts().classe.commentaire,
      empty: texts().classe.vide,
    });

    /* ---- Les quatre zones du second sous-incrément, AU MÊME RENDU. Elles ne
       se rafraîchissent jamais à part : une zone qui a son propre rendu finit
       par montrer un état que les autres ont déjà quitté. */

    const refused = !result.ok;
    const query = refused ? { sql: null, params: [] } : buildParameterisedQuery(result, chosen);
    const naive = refused ? null : buildNaiveQuery(result, chosen);

    // Une demande refusée ne part pas au serveur, et la page le montre au lieu
    // de garder un état périmé.
    jsonBox.textContent = refused
      ? texts().refusRien
      : (renderJson(result.rows, chosen) ?? texts().json.vide);

    // Sans colonne cochée il n'y a pas de requête : les deux cadres disent la
    // même absence. Ni vis-à-vis ni bloc de valeurs alors — ce bloc accompagne
    // une requête, et aucune valeur ne voyage puisque rien ne part (arbitrage
    // du chef de projet, session 19).
    sqlBox.textContent = refused ? texts().refusRien : (query.sql ?? texts().json.vide);

    naiveBlock.hidden = naive === null;
    parametreePhrase.hidden = naive === null;
    if (naive !== null) {
      naiveBox.textContent = naive;
    }

    valuesBlock.hidden = refused || query.sql === null;
    valuesList.replaceChildren();
    if (!valuesBlock.hidden) {
      valuesIntro.textContent = query.params.length > 0
        ? texts().valeurs.intro
        : texts().valeurs.aucune;
      for (const parameter of query.params) {
        const item = root.createElement("li");
        const shown = root.createElement("code");
        shown.textContent = parameter.display;
        item.append(shown);
        if (parameter.translated !== null) {
          const note = root.createElement("small");
          note.className = "borne";
          note.textContent = fill(texts().valeurs.borne, parameter.translated);
          item.append(note);
        }
        valuesList.append(item);
      }
    }

    // Information, jamais erreur : casser n'est pas une faute, c'est la
    // démonstration. Le texte entre élément par élément, `textContent` seul.
    const broken = findOrphans(rows, result.ok ? result.rows : rows);
    joinBox.replaceChildren();
    if (broken.orphans.length > 0) {
      const jointure = texts().edition.jointure;
      const title = root.createElement("strong");
      title.textContent = broken.orphans.length === 1
        ? jointure.une
        : fill(jointure.plusieurs, { n: broken.orphans.length });
      const body = root.createElement("span");
      body.textContent = fill(jointure.corps, { liste: nameList(broken.orphans) });
      joinBox.append(title, root.createTextNode(" "), body);
      if (broken.hidden.length > 0) {
        const note = root.createElement("span");
        note.textContent = fill(
          broken.hidden.length === 1 ? jointure.filtreUne : jointure.filtrePlusieurs,
          { liste: nameList(broken.hidden) },
        );
        joinBox.append(root.createTextNode(" "), note);
      }
    }
  };

  /**
   * « 104207 DURAND CLAIRE ». Le numéro tombe s'il n'est plus lisible : le
   * lecteur peut aussi éditer cette colonne, et « NaN » ne nomme rien.
   */
  const nameList = (list) =>
    list
      .map((row) => [row.NUMCDE, row.NOMCLI, row.PRECLI].filter((part) => part !== null).join(" "))
      .join(", ");

  /** La langue du dernier rendu : elle sert à réécrire le filtre déjà tapé. */
  let renderedLang = root.documentElement.lang;

  const rebuild = () => {
    const lang = root.documentElement.lang;
    if (lang !== renderedLang && field.value.trim() !== "") {
      const before = buildModel(
        PHYSICAL_MODEL.map((entry) => (dict[renderedLang] ?? dict.fr).section4.modele[entry.key]),
      );
      field.value = translateExpression(field.value, before, currentModel());
    }
    renderedLang = lang;
    fillTables();
    buildColumns();
    buildExamples();
    restoreHelp();
    render();
  };

  field.addEventListener("input", render);

  // Le tableau se refait — les cellules changent de nature — puis tout se
  // rejoue. Une modification, elle, ne refait PAS le tableau : le champ en
  // cours de frappe perdrait le curseur à chaque touche.
  editButton.addEventListener("click", () => {
    editing = !editing;
    editButton.setAttribute("aria-pressed", String(editing));
    editNote.hidden = !editing;
    fillTables();
    render();
  });

  // La bascule de langue vient de réécrire tous les textes marqués `data-i18n` ;
  // ce qui est fabriqué ici ne l'est pas, et se refait donc à la même occasion.
  root.addEventListener("i18n:applied", rebuild);
  rebuild();
}

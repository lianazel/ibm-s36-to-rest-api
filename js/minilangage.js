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
import { formatImplicitDecimal, isDigitsOnly, parseImplicitDecimal } from "./s36.js";

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

    // UN MEMBRE VIDE N'EST PAS RATÉ, IL EST INACHEVÉ (avenant 5). C'est l'état
    // que les boutons `&&` et `||` de cet incrément produisent EUX-MÊMES : la
    // page écrit la liaison pour le lecteur, il envoie avant d'avoir écrit la
    // suite, et lui reprocher sa « forme » reviendrait à traiter comme ratée
    // une phrase qu'elle vient elle-même d'ouvrir.
    if (piece === "") {
      return refuse("inacheve");
    }

    const match = SEQUENCE.exec(piece);
    if (match === null) {
      return refuse("forme", { faute: shapeFault(piece) });
    }

    // LES ESPACES AUTOUR DU NOM ET DE L'OPÉRATEUR SONT ABSORBÉES, JAMAIS CELLES
    // DE LA VALEUR (avenant 5). Même arbitrage que le retour chariot : on
    // absorbe là où l'espace n'a aucun sens, on la garde là où elle en a un.
    // Aucun des neuf noms exposés ne porte d'espace, et les six opérateurs sont
    // deux caractères de ponctuation ; une valeur, elle, est une donnée, et une
    // donnée a le droit de commencer ou de finir par une espace.
    //
    // Sans cela, une espace posée par le clavier de l'appareil — pas par le
    // doigt — faisait reprocher au lecteur un nom qui est, à l'œil, exactement
    // celui de la liste. Une faute INVISIBLE, pire que celle de casse.
    const columnName = match[1].trim();
    const operator = match[2].trim();
    const value = match[3];

    // Un nom effacé a son refus propre : le message montrait deux guillemets
    // autour de rien. C'est le voisin immédiat du geste qui a fondé l'avenant —
    // un caractère de moins, et le lecteur tombait ici.
    //
    // Il passe AVANT le piège de l'opérateur : les deux fautes se lisent de
    // gauche à droite, et le nom vient en premier. Choix de l'exécutant,
    // l'avenant étant muet sur l'ordre entre ces deux-là.
    if (columnName === "") {
      return refuse("colonneVide");
    }

    // Le piège de la position (« l'opérateur à la fin »). Le `trim` ci-dessus
    // passe AVANT ce test, et l'ordre est imposé : sinon un opérateur réduit à
    // une espace échapperait au piège et tomberait en « opérateur hors liste »,
    // ce qui ne nomme pas sa faute.
    if (operator === "") {
      return refuse("forme", { faute: "operateurFin" });
    }

    // Apparié à la casse près (avenant 4) : le champ garde la graphie du
    // lecteur, mais tout ce qui suit repart de `entry.property`, donc la
    // graphie CANONIQUE paraît dans le refus, la classe, le JSON et le SQL. La
    // page enseigne l'orthographe exacte sans corriger sous le doigt.
    const found = findPropertyIndex(model, columnName);
    if (found === -1) {
      return refuse("colonne", { nom: columnName });
    }
    const entry = model[found];
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
    //
    // LE MÊME PRÉDICAT pour les deux champs. `Number()` seul était trop
    // accueillant : il rendait 0 sur une cellule vidée, 1000 sur « 1e3 », 16 sur
    // « 0x10 » — aucune de ces formes ne tient dans un champ de chiffres, et le
    // message de rupture aurait nommé « 0 DURAND CLAIRE ». Deux gardes voisines
    // doivent avoir la même rigueur, sans quoi l'une dément l'autre.
    const amount = isDigitsOnly(order.MTTCDE)
      ? parseImplicitDecimal(order.MTTCDE, IMPLICIT_DECIMALS)
      : null;
    return {
      NOMCLI: order.NOMCLI,
      PRECLI: order.PRECLI,
      NUMCDE: isDigitsOnly(order.NUMCDE) ? Number(order.NUMCDE) : null,
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

/** Les décimales implicites des montants du décor. Même valeur qu'au fichier. */
const IMPLICIT_DECIMALS = 2;

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
  // Hors de l'entier sûr, `formatImplicitDecimal` REFUSE plutôt que de rendre
  // une notation scientifique. Le champ étant libre, le lecteur peut y écrire
  // 1e21 : la borne passe alors intacte, comme une borne non numérique, plutôt
  // que d'arrêter la page sur une exception.
  if (numeric * 10 ** IMPLICIT_DECIMALS > Number.MAX_SAFE_INTEGER) {
    return null;
  }
  return { avant: value, apres: formatImplicitDecimal(numeric, IMPLICIT_DECIMALS) };
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

/**
 * La même valeur, mais COLLÉE dans le texte. C'est tout le défaut, montré.
 *
 * ⚠ Cette fonction fabrique une concaténation SQL, délibérément. Elle n'existe
 * que pour MONTRER la faille, et rien de ce qu'elle rend n'est exécuté nulle
 * part : ni base, ni pilote, ni réseau dans ce projet. Ne pas la reprendre
 * ailleurs sans cette phrase.
 */
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
 * ⚠ C'EST LA FONCTION QUI COLLE UNE VALEUR DANS UN TEXTE SQL. Elle est le
 * contre-exemple du site, jamais un modèle : la chaîne qu'elle rend n'est
 * ÉMISE ni EXÉCUTÉE nulle part, il n'y a ni base, ni pilote, ni appel réseau
 * dans ce projet. La règle permanente « zéro concaténation SQL » n'a pas
 * d'autre garde ici que cet avertissement — il est répété à la fonction plutôt
 * que laissé en tête de section, parce qu'un copier-coller n'emporte pas
 * l'en-tête d'un fichier.
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

/**
 * Les six propriétés cochées au départ : nom, numéro, montant, mode, puis la
 * ville et le libellé du mode.
 *
 * Les deux dernières sont entrées le 23 août 2026, et le motif est mesuré : le
 * message de rupture annonce que LES TROIS propriétés jointes rendent `null`,
 * or `villeClient` et `libelleModeLivraison` étaient décochées au chargement.
 * Le lecteur qui cassait une jointure lisait donc une affirmation qu'il ne
 * pouvait vérifier qu'au tiers, et devait pour le reste cocher deux cases dont
 * rien ne lui disait qu'elles manquaient. La page MONTRE au lieu de reformuler
 * sa promesse à la baisse (arbitrage du chef de projet, session 19).
 */
export const DEFAULT_SELECTION = Object.freeze([0, 4, 7, 2, 8, 3]);

/**
 * La sélection de départ, dans l'ordre du modèle.
 *
 * `DEFAULT_SELECTION` énumère les colonnes dans l'ordre où le contrat les
 * nomme, pas dans celui du modèle. Servie telle quelle, elle donnait à la
 * classe un nom qui dépendait du CHEMIN du lecteur : les mêmes colonnes
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
    const index = findPropertyIndex(fromModel, name);
    return index === -1 ? whole : `<${toModel[index].property}:`;
  });
}

/**
 * Retire les retours à la ligne d'un texte LU — jamais du champ lui-même.
 *
 * Le champ est une zone repliée : le lecteur y coupe ses lignes pour lire une
 * expression de 83 caractères qu'aucune largeur disponible ne montre d'un seul
 * trait (37 caractères en portrait, 66 en paysage, plafond de 42 rem compris).
 * Ce découpage est une MISE EN PAGE, pas une faute de langue — le retour
 * chariot n'est pas un caractère de ce mini-langage. On l'ignore donc à la
 * lecture, et la page ne réécrit rien sous le doigt du lecteur.
 *
 * Retiré, et non remplacé par une espace : dans ce langage une espace COMPTE,
 * et des valeurs en portent (`D' OR '1'='1`). La remplacer donnerait au retour
 * chariot un sens qu'il n'a pas — `<nomClient:[=⏎:DUR/>` se lirait alors sur un
 * opérateur `[= ` que rien à l'écran ne distingue de `[=`, et `DU⏎RAND` sur une
 * valeur `DU RAND` qui ne trouve rien.
 */
export function stripLineBreaks(text) {
  return String(text).replace(/\r\n?|\n/g, "");
}

/**
 * Le curseur est-il posé là où une insertion de structure est légitime ?
 *
 * LA RÈGLE « travailler sur le texte à gauche du curseur » EST INCOMPLÈTE SANS
 * CETTE GARDE. Mesuré : curseur au milieu d'un nom, le bouton `&&` produisait
 * `<nomClient:[=:DUR/> <codemodeliv/> && raison:[]:AR/>` — il coupait
 * l'expression en deux. Une moitié de correctif aurait été pire que le défaut.
 *
 * Deux situations seulement sont légitimes :
 *  - le curseur est **en fin de champ**, ce qui est le cas courant, et le
 *    comportement y est alors identique à celui d'avant l'avenant 6 ;
 *  - il est **à une frontière de séquence** : le texte de gauche est vide, ou
 *    il finit par `/>`.
 */
export function caretAllowsStructure(text, caret) {
  const value = String(text);
  const position = Math.max(0, Math.min(Number(caret) || 0, value.length));
  // En fin de champ : rien à couper derrière, tout est permis.
  if (value.slice(position).trim() === "") {
    return true;
  }
  const left = value.slice(0, position).trimEnd();
  return left === "" || left.endsWith("/>");
}

/**
 * Laquelle des cinq fautes de forme ce membre porte-t-il ?
 *
 * Le refus « forme » récitait la règle et laissait le lecteur chercher : sur un
 * champ replié en trois lignes, repérer un chevron absent est un travail d'œil
 * que le message ne lui épargnait pas (passe iPhone 14 du 26 août 2026).
 *
 * LE CATALOGUE EST CLOS ET ORDONNÉ, et l'ordre dit LE GESTE SUIVANT, pas la
 * liste de tout ce qui manque : un membre qui a perdu son chevron ET sa
 * fermeture est nommé par sa PREMIÈRE faute ; le refus d'après nommera la
 * seconde. C'est la ligne gravée au fil appliquée au message — on accompagne
 * une phrase en train de s'écrire, on ne dresse pas son procès-verbal.
 *
 * `operateurFin` n'est pas rendu ici : il se constate quand le gabarit TIENT et
 * que l'opérateur est vide, donc après appariement. Les cinq fautes sont bien
 * toutes servies, mais par deux chemins.
 *
 * Le cinquième cas, `generique`, n'est atteint que par un membre portant un
 * retour à la ligne — le `.` de `SEQUENCE` ne traverse pas la ligne. Un
 * catalogue de refus qui laisse un trou n'est pas un catalogue.
 */
export function shapeFault(text) {
  const piece = String(text).trim();
  if (!piece.startsWith("<")) {
    return "ouvrant";
  }
  if (!piece.endsWith("/>")) {
    return "fermant";
  }
  if ((piece.match(/:/g) ?? []).length < 2) {
    return "deuxPoints";
  }
  return "generique";
}

/**
 * L'indice d'une propriété du modèle, appariée À LA CASSE PRÈS.
 *
 * Les valeurs toléraient déjà la casse — `DURAND`, `durand` et `DuRaNd`
 * trouvent les mêmes lignes —, les noms de colonnes non, et la page ne le
 * disait nulle part. Le lecteur tapait `codeModelivraison` et lisait « hors de
 * la liste exposée » d'une propriété qui y est, à une majuscule près (passe
 * iPhone 14 du 26 août 2026). Sur un clavier mobile où le champ coupe la mise
 * en capitale automatique, chaque majuscule d'un nom en camelCase est un geste
 * délibéré : la page punissait ce qu'elle rend coûteux.
 *
 * Ce qu'elle n'affaiblit pas : un nom réellement absent du modèle est toujours
 * refusé, et c'est la thèse de la section — l'appelant ne choisit pas ce qu'il
 * interroge.
 *
 * UN SEUL PORTEUR, DEUX APPELANTS : `recognise` et `translateExpression`
 * portaient la même comparaison stricte, à deux endroits. Corriger le premier
 * seul aurait fait accepter un nom en bas de casse puis le laisser SANS
 * TRADUCTION à la bascule de langue, donc refuser une seconde plus tard ce qui
 * venait de passer. Même remède que `hasPendingLink`, et pour la même raison :
 * une règle écrite deux fois finit par diverger, et c'est la copie oubliée qui
 * mord.
 */
export function findPropertyIndex(model, name) {
  const cible = String(name).toLowerCase();
  return model.findIndex((entry) => entry.property.toLowerCase() === cible);
}

/**
 * Une liaison attend-elle sa séquence ?
 *
 * UN SEUL PORTEUR pour une règle qui en avait trois implicites. La même notion
 * était écrite trois fois — dans `closeSequence`, dans `appendLink`, et nulle
 * part dans le clic d'un exemple. C'est justement l'endroit qui l'ignorait qui
 * a mordu : le lecteur composait `<…/> ||` au doigt, cliquait un exemple pour
 * remplir le second membre, et perdait tout (passe iPhone 14 du 26 août 2026).
 *
 * Ses trois appelants s'accordent désormais par construction : on ne ferme pas
 * une liaison, on n'en empile pas une seconde, et un exemple cliqué complète au
 * lieu d'effacer.
 */
export function hasPendingLink(text) {
  const tail = String(text).trimEnd();
  return tail.endsWith("&&") || tail.endsWith("||");
}

/**
 * Ce que le clic d'un exemple pose dans le champ.
 *
 * Il AJOUTE quand une liaison attend — le lecteur a posé cette intention de son
 * doigt en appuyant sur `&&` ou `||` —, il REMPLACE sinon. Sans liaison en
 * attente, ajouter exigerait d'inventer un `&&` que personne n'a demandé :
 * ce serait deviner l'intention du lecteur, ce que la ligne gravée au fil
 * interdit. Ici la page ne devine rien, elle lit.
 */
export function applyExample(text, expression) {
  return hasPendingLink(text)
    ? `${String(text).trimEnd()} ${expression}`
    : String(expression);
}

/**
 * Ferme la séquence en cours par `/>`, et ne vérifie rien d'autre.
 *
 * Sur clavier iOS, `/` et `>` vivent sur deux pages de symboles différentes :
 * fermer une séquence à la main coûte huit changements de page (mesuré sur
 * iPhone 14, le 22 août 2026). Ce bouton COMPLÈTE ce que le lecteur n'a pas
 * fini d'écrire ; il ne répare jamais ce qu'il a fini et raté.
 * `<villeClient:===:l` devient donc `<villeClient:===:l/>`, que le
 * reconnaisseur refuse toujours sur son opérateur — et c'est le refus qui
 * enseigne. Un bouton qui redresserait `===` en `==` volerait au lecteur
 * l'erreur qui allait lui apprendre quelque chose.
 */
export function closeSequence(text) {
  const value = String(text);
  const tail = value.trimEnd();
  // Rien à fermer dans trois cas : champ vide, séquence déjà close, et liaison
  // en attente de sa séquence — sans ce dernier, `<a:b:c/> && ` donnerait
  // `<a:b:c/> &&/>`, atteignable dès que le lecteur appuie sur `/>` après un
  // bouton de liaison.
  if (tail === "" || tail.endsWith("/>") || hasPendingLink(value)) {
    return value;
  }
  return `${tail}/>`;
}

/**
 * Ferme la séquence en cours, puis enchaîne sur `&&` ou `||`.
 *
 * Le scénario est celui du chef de projet : le lecteur tape sa séquence,
 * appuie sur `/>` pour la terminer, puis enchaîne. Le `&` est l'un des huit
 * caractères qui vivent hors de la page des lettres du clavier iOS ; sans ce
 * bouton, fermer ne supprimait que le premier obstacle des deux.
 *
 * L'espace finale est voulue : le lecteur enchaîne sans avoir à la poser.
 */
export function appendLink(text, link) {
  const value = String(text);
  const tail = value.trimEnd();
  // Inchangé sur champ vide et sur liaison déjà en attente : deux liaisons de
  // suite ne veulent rien dire, et le bouton n'a alors rien à compléter.
  if (tail === "" || hasPendingLink(value)) {
    return value;
  }
  // `trimEnd` sur le résultat : `closeSequence` absorbe déjà les espaces de fin
  // quand elle ferme, et l'omettre donnerait deux espaces sur une séquence
  // DÉJÀ close suivie d'une espace — `<a:b:c/> ` deviendrait `<a:b:c/>  && `.
  return `${closeSequence(value).trimEnd()} ${link} `;
}

/**
 * Le lecteur a-t-il modifié les commandes ?
 *
 * Sert à rendre FALSIFIABLE une explication gelée : `ex.jointure.aide` affirme
 * « 2 commandes ici » pendant que le statut peut en compter une, parce que le
 * lecteur vient de casser une jointure. La page ne réécrit pas l'aide — c'est
 * une valeur gelée — elle ajoute une réserve, et cette fonction en décide.
 *
 * Comparaison à l'octet près : celui qui retape DURAND à l'identique n'a rien
 * modifié. La casse compte donc (`durand` est une modification), et c'est
 * voulu : ce détecteur ne juge pas la jointure — qui, elle, tolère la casse —
 * il constate que la donnée affichée n'est plus celle d'origine.
 */
export function hasEdits(orders, origin = CDEMST) {
  return orders.some((order, index) => {
    const source = origin[index];
    if (source === undefined) {
      return true;
    }
    return Object.keys(source).some((name) => String(order[name]) !== String(source[name]));
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
  const closeButton = root.getElementById("mini-fermer");
  const andButton = root.getElementById("mini-et");
  const orButton = root.getElementById("mini-ou");
  const sendButton = root.getElementById("mini-envoyer");
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

  /** Les treize boutons d'exemple, dans l'ordre du modèle : `render()` y pose le marquage. */
  let exampleButtons = [];
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
  /**
   * L'exemple SURVOLÉ, distinct de celui qui est retenu.
   *
   * Il est ici, et non dans une peinture à part, parce que la surface
   * d'explication est peinte par `render()` comme tout le reste : le survol
   * change un ÉTAT, il ne repeint rien lui-même (avenant 1 — un seul peintre).
   */
  let hovered = null;
  /**
   * La dernière demande LUE, jamais le contenu du champ.
   *
   * C'est la coupure en deux zones : le lecteur écrit dans le champ, et rien ne
   * répond tant qu'il n'a pas envoyé. La page explique une API REST, où une
   * demande part et où la réponse arrive APRÈS ; réécrire le JSON à chaque
   * touche faisait précéder la demande par sa réponse, et faisait défiler des
   * refus pour une demande que le lecteur n'avait pas fini d'écrire.
   *
   * `null` TANT QUE RIEN N'A ÉTÉ ENVOYÉ, et c'est distinct de la chaîne vide :
   * celle-ci est une demande sans condition, mais ENVOYÉE. La distinction porte
   * tout l'état d'arrivée — afficher « 18 lignes trouvées sur 18 » avant le
   * premier envoi, c'est répondre à une question que personne n'a posée, soit
   * exactement la réponse-avant-la-demande que cette coupure existe pour
   * retirer (passe iPhone 14 du chef de projet, 26 août 2026).
   *
   * Le premier envoi lui donne sa valeur, et `null` ne revient JAMAIS — y
   * compris quand le lecteur vide le champ et renvoie.
   */
  let sent = null;

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
    exampleButtons = EXAMPLES.map((example) => {
      const item = root.createElement("li");
      const button = root.createElement("button");
      button.type = "button";
      button.className = `exemple ${example.tone}`;
      // Le nom est posé DEUX fois : une fois visible, une fois en attribut. La
      // feuille s'en sert pour réserver dès le repos la largeur que le bouton
      // aura une fois marqué en gras, sans quoi le marquage pousse les voisins
      // (4 px mesurés au navigateur le 25 août 2026).
      const nom = labels[example.key].nom;
      button.dataset.nom = nom;
      const label = root.createElement("span");
      label.className = "nom";
      label.textContent = nom;
      button.append(label);
      // Le survol montre sans engager ; le clic retient. Ni l'un ni l'autre ne
      // peint : ils posent un état, et `render()` peint (avenant 1).
      const enter = () => {
        hovered = example;
        render();
      };
      const leave = () => {
        hovered = null;
        render();
      };
      button.addEventListener("mouseenter", enter);
      button.addEventListener("focus", enter);
      button.addEventListener("mouseleave", leave);
      button.addEventListener("blur", leave);
      button.addEventListener("click", () => {
        // Cliquer ÉCRIT la demande, il ne l'envoie pas : le résultat doit
        // rester la découverte du lecteur. L'ancien résultat demeure affiché —
        // un avant-après enseigne mieux qu'un vide qui se remplit, et un écran
        // qui se vide au moment où l'on vient d'agir se lit comme une panne.
        //
        // Et il COMPLÈTE au lieu d'effacer quand une liaison attend : le
        // lecteur qui a composé `<…/> ||` au doigt puis clique un exemple
        // remplit son second membre, il ne perd pas son travail.
        const expression = exampleExpression(example, model);
        // Quand l'exemple s'ajoute, le champ ne porte plus l'exemple SEUL :
        // aucun exemple n'est donc retenu, et ni l'explication ni le marquage
        // ne peuvent prétendre décrire ce qui est écrit.
        heldExample = hasPendingLink(field.value) ? null : example;
        field.value = applyExample(field.value, expression);
        render();
      });
      item.append(button);
      examples.append(item);
      return button;
    });
  };

  /**
   * La surface d'explication, peinte depuis l'ÉTAT et jamais depuis un
   * événement : le survol l'emporte sur l'exemple retenu, et le texte de repos
   * ne paraît que si aucun des deux n'est là.
   *
   * Le texte entre élément par élément, `textContent` seul.
   */
  const paintHelp = () => {
    const subject = hovered ?? heldExample;
    help.replaceChildren();
    if (subject === null) {
      help.textContent = texts().exemples.repos;
      return;
    }
    const labels = texts().ex;
    // Le nom repris en tête : treize boutons se ressemblent, et l'aide seule ne
    // dit pas lequel le lecteur vient de toucher.
    const name = root.createElement("strong");
    name.textContent = labels[subject.key].nom;
    const aide = root.createElement("span");
    aide.textContent = labels[subject.key].aide;
    help.append(name, root.createTextNode(" "), aide);
    // L'explication devient FALSIFIABLE dès que le lecteur édite : l'aide de la
    // jointure affirme « 2 commandes ici » pendant que le statut peut en
    // compter une. La valeur gelée n'est pas réécrite — une réserve s'ajoute.
    // Jamais sur le texte de repos : il n'affirme aucun compte.
    if (hasEdits(orders)) {
      const reserve = root.createElement("span");
      reserve.className = "reserve";
      reserve.textContent = texts().exemples.donneesModifiees;
      help.append(root.createTextNode(" "), reserve);
    }
  };

  const render = () => {
    const model = currentModel();

    /* ---- UN SEUL PEINTRE, DEUX SOURCES (avenant 1, 25 août 2026).
       `render()` peint les deux zones : celle où l'on ÉCRIT se lit sur `typed`,
       celle qui RÉPOND se lit sur `sent`. Un second peintre de la même zone est
       exactement la façon dont une zone finit par montrer un état que l'autre a
       déjà quitté — défaut mesuré deux fois sur ce projet.

       `stripLineBreaks` n'a que DEUX sites d'appel : ici, et à l'envoi. Le
       champ, lui, n'est JAMAIS réaffecté depuis l'une ni l'autre : le retrait
       vit dans la lecture, et ce que le lecteur a tapé reste à l'écran. */
    const typed = stripLineBreaks(field.value);

    // Une explication ne survit pas à un champ qui la contredit : le lecteur
    // avait sous les yeux « 3 commandes sur 18 » pendant que la page refusait
    // sa demande (mesuré sur iPhone 14, 22 août 2026).
    //
    // La comparaison porte sur l'expression de l'exemple DANS LA LANGUE
    // COURANTE, jamais sur la chaîne mémorisée au clic : le basculement de
    // langue réécrit le champ, et comparer à la chaîne d'origine effacerait
    // l'explication d'un exemple qui est pourtant toujours celui affiché.
    // La comparaison porte sur `typed`, jamais sur `sent` : l'explication décrit
    // ce qui est ÉCRIT, pas ce qui a été envoyé — la comparer à `sent`
    // effacerait l'explication à l'instant même où le lecteur clique l'exemple.
    // Et elle porte sur le texte SANS retours à la ligne, pour qu'une coupure
    // de ligne ne fasse pas tomber l'aide d'un exemple qu'il est en train de
    // lire.
    if (heldExample !== null && typed !== exampleExpression(heldExample, model)) {
      heldExample = null;
    }
    paintHelp();

    // Les quatre boutons se dérivent du CHAMP : ils s'allument quand ils ont
    // quelque chose à compléter. Celui d'envoi s'allume quand ce qui est écrit
    // n'est plus ce qui est affiché — c'est le SEUL signal d'état périmé de la
    // page, et le lecteur sait donc toujours si la réponse qu'il voit
    // correspond à la demande qu'il lit.
    // L'INERTIE SUIT LE CURSEUR, PAS LE CHAMP ENTIER (avenant 6). Mesuré : un
    // champ finissant par `&&` éteignait le bouton `&&`, alors qu'au curseur
    // posé entre deux membres l'insertion est parfaitement légitime. Sans ce
    // point, le bouton serait mort là où le geste est bon — et une moitié de
    // correctif serait pire que le défaut.
    const caret = caretPosition();
    const beforeCaret = field.value.slice(0, caret);
    const placeable = caretAllowsStructure(field.value, caret);
    closeButton.disabled = !placeable || closeSequence(beforeCaret) === beforeCaret;
    andButton.disabled = !placeable || appendLink(beforeCaret, "&&") === beforeCaret;
    orButton.disabled = !placeable || appendLink(beforeCaret, "||") === beforeCaret;
    // `sent ?? ""` : à l'arrivée, champ vide et rien d'envoyé, le bouton dort —
    // il n'y a effectivement rien à envoyer.
    sendButton.disabled = typed === (sent ?? "");

    // Le marquage, DÉRIVÉ de `heldExample` : aucun second état, donc un seul
    // bouton marqué par construction, et le marquage tombe au même rendu que
    // l'explication.
    exampleButtons.forEach((button, index) => {
      const held = heldExample !== null && EXAMPLES[index].key === heldExample.key;
      button.classList.toggle("retenu", held);
      if (held) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    const rows = joinFiles(texts().modes, orders);
    // LA ZONE DE RÉPONSE lit `sent`, et elle seule.
    //
    // `sent ?? ""` sert à garder tout le calcul en aval valide avant le premier
    // envoi — la jointure et l'extinction de teinte doivent continuer de
    // répondre au doigt qui édite une commande, qui est resté immédiat. Ce que
    // l'attente change, ce sont les trois SURFACES de réponse, plus bas.
    const awaiting = sent === null;
    const result = filterRows(sent ?? "", model, rows);

    // Le texte entre élément par élément, par `textContent` seul : un motif de
    // refus cite ce que le lecteur vient de taper, et cette chaîne ne doit
    // jamais avoir la moindre chance d'être lue comme du balisage. C'est cette
    // pose, et non l'encodage des chevrons, qui rend l'injection impossible.
    status.replaceChildren();
    if (awaiting) {
      // Aucune demande n'est partie : la page n'a rien à répondre, et elle le
      // dit au lieu d'afficher un compte que personne n'a demandé.
      const line = root.createElement("span");
      line.textContent = texts().champ.attente;
      status.append(line);
      status.className = "statut attente";
    } else if (result.ok) {
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
      // Même chemin que `type` juste au-dessus : un code de faute se résout en
      // phrase par le dictionnaire, et rien de neuf n'est inventé pour lui.
      if (Object.hasOwn(params, "faute")) {
        params.faute = texts().refus.forme.fautes[params.faute] ?? params.faute;
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
    //
    // Le cadre est fait pour du code, qui ne se replie pas : une PHRASE posée
    // dedans sortait du champ sur téléphone, et le lecteur lisait « rien ne
    // part au serv » avant de devoir défiler de côté (relevé sur iPhone 14 le
    // 23 août 2026). La classe `prose` rend le repli à ce qui est de la prose,
    // et à elle seule : le JSON et le SQL gardent leur défilement.
    // `putCode` et non `code` : le cadre de la classe s'appelle déjà `code`
    // dans cette fonction, et une locale du même nom l'aurait masqué. Le nom
    // court a coûté une page blanche, verte aux 282 tests, le 23 août 2026.
    const putMessage = (box, texte) => {
      box.textContent = texte;
      box.className = "prose";
    };
    const putCode = (box, texte) => {
      box.textContent = texte;
      box.className = "";
    };

    const json = refused ? null : renderJson(result.rows, chosen);
    if (awaiting) {
      putMessage(jsonBox, texts().champ.attente);
    } else if (refused) {
      putMessage(jsonBox, texts().refusRien);
    } else if (json === null) {
      putMessage(jsonBox, texts().json.vide);
    } else {
      putCode(jsonBox, json);
    }

    // Sans colonne cochée il n'y a pas de requête : les deux cadres disent la
    // même absence. Ni vis-à-vis ni bloc de valeurs alors — ce bloc accompagne
    // une requête, et aucune valeur ne voyage puisque rien ne part (arbitrage
    // du chef de projet, session 19).
    if (awaiting) {
      putMessage(sqlBox, texts().champ.attente);
    } else if (refused) {
      putMessage(sqlBox, texts().refusRien);
    } else if (query.sql === null) {
      putMessage(sqlBox, texts().json.vide);
    } else {
      putCode(sqlBox, query.sql);
    }

    naiveBlock.hidden = awaiting || naive === null;
    parametreePhrase.hidden = awaiting || naive === null;
    if (naive !== null) {
      naiveBox.textContent = naive;
    }

    valuesBlock.hidden = awaiting || refused || query.sql === null;
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

    // L'EXTINCTION DE TEINTE. La cellule teintée dit « ce lien tient » ; quand
    // il cède, elle s'éteint. C'est l'absence qui parle, jamais le rouge :
    // casser n'est pas une faute, c'est la démonstration.
    //
    // C'est le seul accusé de réception qui arrive LÀ OÙ LE DOIGT TRAVAILLE.
    // Le message complet vit sous les dix-huit lignes du tableau, soit 618 px
    // plus bas ; sur un iPhone 14, la cellule éditée et son message ne tiennent
    // sur AUCUN écran (portée 813 px mesurée le 23 août 2026, bande utile 694 px
    // au mieux). Sans ce signal, le lecteur fait le geste et ne voit rien.
    //
    // La bascule se fait par `className`, sur les cellules et jamais sur la
    // ligne : le tableau n'est pas reconstruit, donc les champs de saisie
    // gardent leur curseur au milieu d'une frappe.
    if (bodies.CDEMST !== null) {
      const orphans = new Set(broken.orphans);
      [...bodies.CDEMST.children].forEach((line, index) => {
        const severed = orphans.has(rows[index]);
        for (const td of line.children) {
          if (!td.className.startsWith("lien-valeurs")) {
            continue;
          }
          td.className = severed ? "lien-valeurs lien-eteint" : "lien-valeurs";
        }
      });
    }

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
    if (lang !== renderedLang) {
      const before = buildModel(
        PHYSICAL_MODEL.map((entry) => (dict[renderedLang] ?? dict.fr).section4.modele[entry.key]),
      );
      const after = currentModel();
      if (field.value.trim() !== "") {
        field.value = translateExpression(field.value, before, after);
      }
      // LA DEMANDE ENVOYÉE SE TRADUIT AUSSI, et les deux zones parlent donc la
      // même langue. Sans cette ligne, la coupure en deux zones laissait la
      // réponse sur l'expression d'AVANT la bascule : le champ montrait
      // `customerCity` pendant que le statut refusait en citant `villeClient`,
      // un nom de colonne que rien à l'écran ne portait plus.
      //
      // C'est la troisième zone dont l'état pouvait dater, et elle ne se voyait
      // qu'à la bascule de langue : ni la frappe, ni l'envoi, ni une case
      // cochée ne l'atteignaient. Trouvée à la revue indépendante.
      //
      // LIMITE DITE PLUTÔT QUE MASQUÉE. Les deux traductions ne restent
      // d'accord que tant que le retrait des retours à la ligne et la
      // réécriture de langue COMMUTENT — `sent` a déjà perdu ses retours
      // chariot à l'envoi, le champ non. Elles cessent de commuter dès qu'une
      // coupure tombe DANS LE JETON `<nom:`, c'est-à-dire n'importe où entre le
      // chevron et le premier deux-points, bornes comprises :
      // `translateExpression` capture par /<([^:<]*):/ et ne reconnaît plus le
      // nom. Mesuré le 26 août 2026 sur six positions — trois cassent (juste
      // après le chevron, dans le nom, juste avant les deux-points), trois
      // commutent (dans l'opérateur, dans la valeur, entre deux séquences). Le
      // champ garde alors son nom français quand `sent` prend l'anglais, et
      // « Envoyer » se rallume à tort. La réponse servie reste juste dans tous
      // les cas — seul le signal d'état périmé ment, et il ment dans le sens
      // prudent.
      if (sent.trim() !== "") {
        sent = translateExpression(sent, before, after);
      }
    }
    renderedLang = lang;
    fillTables();
    buildColumns();
    buildExamples();
    render();
  };

  // L'écouteur APPELLE le peintre, il ne peint rien lui-même : l'état des
  // quatre boutons, la chute de `heldExample` et le retrait du marquage vivent
  // dans `render()` (avenant 1). Recalculer dix-huit lignes à chaque touche ne
  // coûte rien ; un second peintre coûterait la garantie.
  field.addEventListener("input", render);

  // Le curseur bouge sans qu'aucune touche ne soit frappée — un appui dans le
  // texte, une flèche, une sélection. L'inertie des trois boutons en dépend
  // désormais, donc le peintre doit repasser. C'est le même peintre : l'écouteur
  // appelle `render()`, il ne repeint rien lui-même.
  root.addEventListener("selectionchange", () => {
    if (root.activeElement === field) {
      render();
    }
  });

  /**
   * Les trois boutons de structure COMPLÈTENT le champ, puis rendent la main.
   *
   * Ils n'envoient rien : la zone de réponse relit `sent`, qui n'a pas bougé —
   * c'est pourquoi appeler `render()` ici est sans risque. Et `||` reste offert
   * même quand l'expression porte déjà des `&&` : mêler les deux liaisons est
   * refusé par le reconnaisseur, et ce refus est une LEÇON de la page. Une
   * rangée qui empêcherait le mélange volerait au lecteur ce qu'il vient voir.
   */
  /**
   * Où le curseur se trouve, du point de vue des boutons de structure.
   *
   * Hors édition, il vaut LA FIN DU CHAMP : c'est le comportement d'avant
   * l'avenant 6, et il ne doit pas changer parce que le lecteur a cliqué
   * ailleurs. La conscience du curseur ne vaut que pendant qu'il écrit.
   */
  const caretPosition = () =>
    (root.activeElement === field ? field.selectionStart : null) ?? field.value.length;

  /**
   * Les trois boutons travaillent sur le texte À GAUCHE DU CURSEUR et insèrent
   * là, au lieu d'ajouter en fin de champ.
   *
   * Le lecteur qui remplace un `||` par un `&&` pose son curseur entre deux
   * membres et appuie : la liaison doit aller LÀ, pas à la fin (mesuré sur
   * iPhone 14 le 27 août 2026). Curseur en fin — le cas courant — le résultat
   * est identique à celui d'avant, et un test l'exige.
   */
  const completeWith = (rewrite) => () => {
    const position = caretPosition();
    const left = field.value.slice(0, position);
    const right = field.value.slice(position);
    const rewritten = rewrite(left);
    field.value = rewritten + right;
    render();
    field.focus();
    // Le curseur suit son insertion : sans cela il repartirait en fin de champ
    // et le lecteur perdrait l'endroit où il travaillait.
    field.setSelectionRange(rewritten.length, rewritten.length);
  };
  closeButton.addEventListener("click", completeWith(closeSequence));
  andButton.addEventListener("click", completeWith((text) => appendLink(text, "&&")));
  orButton.addEventListener("click", completeWith((text) => appendLink(text, "||")));

  // L'ENVOI — le second et dernier site d'appel de `stripLineBreaks`. Le
  // lecteur a coupé ses lignes où il voulait ; la page reconstruit l'expression
  // au moment de la LIRE, et ne touche jamais au champ.
  /**
   * Combien de temps le retour d'appui survit au relâchement, en millisecondes.
   *
   * PAS un `:active` seul : sur un iPhone, LE POUCE COUVRE LE BOUTON pendant
   * l'appui, donc la couleur doit survivre au relâchement le temps que l'œil la
   * voie (réserve du chef de projet, 26 août 2026).
   *
   * 200 ms est un JUGEMENT DE CONCEPTION, non mesuré : c'est un point de
   * départ, et la valeur se juge à la passe d'appareil, jamais au fichier.
   */
  const RETOUR_APPUI_MS = 200;
  let retourAppui = null;

  // Le sens plein/contour NE BOUGE PAS — plein veut toujours dire « il reste
  // quelque chose à envoyer ». Ce qui s'ajoute est le retour du geste : sans
  // lui, appuyer faisait PÂLIR le bouton, qui devient inerte au même instant,
  // et cela se lisait comme une extinction plutôt que comme un envoi réussi.
  sendButton.addEventListener("click", () => {
    sent = stripLineBreaks(field.value);
    render();
    sendButton.classList.add("envoi");
    root.defaultView.clearTimeout(retourAppui);
    retourAppui = root.defaultView.setTimeout(() => {
      sendButton.classList.remove("envoi");
    }, RETOUR_APPUI_MS);
  });


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

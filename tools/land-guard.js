/**
 * land-guard.js — pré-garde de revue de `/land`.
 *
 * Ce qu'elle ferme : le `reviewer` n'ayant tourné qu'en session 2, quatre
 * incréments ont atterri sans revue indépendante — l'artefact de revue portait
 * encore « EVOL socle-du-site » à la session 6, et aucune garde ne le vérifiait.
 *
 * Pourquoi elle lit du JSON et plus de la prose : un artefact lu par une machine
 * s'écrit pour la machine. La version précédente analysait le compte rendu
 * humain du `reviewer` ; il a fallu quatre passes de revue pour qu'elle morde,
 * chacune fermant un coin lexical et en ouvrant un autre.
 *
 * Hors du site : aucun lien avec `js/`, aucune dépendance, rien de servi par
 * GitHub Pages. Les fonctions exportées sont **pures** — aucune ne lit de
 * fichier. La lecture appartient au point d'entrée en ligne de commande, en bas
 * de ce fichier, sans quoi les chemins d'échec seraient improuvables sans abîmer
 * le dépôt (leçon du 10 août 2026).
 */
import { readFileSync } from "node:fs";

/*
 * CONTRAT — `twaim.review/1`
 *
 * Le `reviewer` écrit `.pipeline/review.json` ; la garde en lit trois champs.
 * Ce commentaire et `REVIEW_CONTRACT` ci-dessous décrivent le même objet, à la
 * virgule près. Forme du document :
 *
 * {
 *   "contract": "twaim.review/1",
 *   "increment": "CHORE revue-structuree",
 *   "commit": "0123456789abcdef0123456789abcdef01234567",
 *   "base": "1f741c7…(40 hex)",
 *   "reviewed_at": "2026-08-17T10:00:00Z",
 *   "tests": { "passed": 90, "total": 90 },
 *   "verdict": "SHIP",
 *   "reservations": [
 *     {
 *       "pillar": "P3",
 *       "severity": "WARN",
 *       "file": "tools/land-guard.js",
 *       "line": 42,
 *       "finding": "phrase courte : ce qui a été constaté",
 *       "expected": "phrase courte : la correction attendue"
 *     }
 *   ],
 *   "overrule": null,
 *   "rd": []
 * }
 *
 * Règles, dans l'ordre où le validateur les applique :
 *
 *  1. JSON strict (`JSON.parse` réussit) et racine = objet. Sinon : refus
 *     « review.json illisible : <message de l'analyseur, tronqué à 60> ».
 *  2. `contract` vaut exactement « twaim.review/1 ». Sinon : refus « contrat
 *     inconnu : <trouvé> ». Ce champ permettra un `twaim.review/2` sans casser
 *     la garde.
 *  3. `increment` : chaîne non vide, **égale caractère pour caractère** au nom
 *     lu par `incrementFromStatus` dans `.pipeline/STATUS.md`. Aucune
 *     normalisation, aucune casse repliée, aucune décoration à retirer — c'est
 *     tout l'objet du contrat. Sinon : refus « review.json ne porte pas
 *     l'incrément courant : <trouvé> vs <attendu> ».
 *  4. `commit` : 40 caractères hexadécimaux **minuscules**, égaux au SHA complet
 *     de la pointe de la branche atterrie. Sinon : refus « review.json ne relit
 *     pas le commit à atterrir : <trouvé> vs <attendu> ». C'est ce champ qui
 *     donne la **fraîcheur** : un commit ajouté après une revue SHIP fait
 *     refuser, donc repasse par une lecture.
 *  5. `verdict` : « SHIP », « NEEDS_WORK » ou « BLOCK » (souligné, majuscules).
 *     Autre valeur : refus « verdict hors contrat : <trouvé> ». Seul « SHIP »
 *     autorise l'atterrissage : refus « verdict du reviewer : <trouvé> ».
 *  6. `reservations` : tableau (vide autorisé). Chaque élément porte **tous** les
 *     champs `pillar` (P1..P6, ARCHI, UX), `severity` (FAIL|WARN), `file`
 *     (chaîne), `line` (entier ≥ 1 ou null), `finding` et `expected` (chaînes non
 *     vides). Élément incomplet ou mal typé : refus « réserve n°<i> hors
 *     contrat : <champ fautif> ».
 *  7. Cohérence : « SHIP » avec au moins une réserve « FAIL » → refus « verdict
 *     SHIP incohérent avec <n> réserve(s) FAIL » : un document qui dit « bon » et
 *     « bloquant » ne décide rien. « NEEDS_WORK »/« BLOCK » sans aucune réserve →
 *     refus « verdict <v> sans réserve : rien à corriger, donc rien à refuser ».
 *  8. `base` (40 hex), `reviewed_at` (ISO 8601), `tests` ({passed, total}
 *     entiers, passed ≤ total) sont **obligatoires et vérifiés dans leur forme**,
 *     mais la garde ne les compare à rien : ils servent au compte rendu humain et
 *     au journal.
 *  9. `overrule` : `null`, ou { by, reason (non vide), at (ISO) }. Un « BLOCK »
 *     overrulé par le chef de projet ne se contourne pas : le `reviewer` réémet
 *     le document avec « SHIP » et `overrule` renseigné, et la garde ne lit
 *     toujours que `verdict`. `overrule` renseigné avec un verdict autre que
 *     « SHIP » : refus « overrule sans effet : verdict <v> ».
 * 10. `rd` : tableau (vide autorisé) de { format: A|B|C, title }. Propositions
 *     R&D du pilier P6 — proposées, jamais exécutées. Non lu par la garde.
 *
 * Les trois champs qui **décident** sont `increment`, `commit`, `verdict`. Le
 * reste est vérifié dans sa forme parce qu'un document à moitié conforme n'est
 * pas un contrat.
 */
export const REVIEW_CONTRACT = Object.freeze({
  id: "twaim.review/1",
  /** Champs de la racine, dans l'ordre où ils sont vérifiés. */
  fields: Object.freeze({
    contract: { kind: "string", equals: "twaim.review/1" },
    increment: { kind: "string", nonEmpty: true },
    commit: { kind: "sha40" },
    base: { kind: "sha40" },
    reviewed_at: { kind: "iso8601" },
    tests: { kind: "tests" },
    verdict: { kind: "string", oneOf: ["SHIP", "NEEDS_WORK", "BLOCK"] },
    reservations: { kind: "array" },
    overrule: { kind: "nullable-object" },
    rd: { kind: "array" },
  }),
  /** Champs d'une réserve — tous obligatoires. */
  reservation: Object.freeze({
    pillar: { kind: "string", oneOf: ["P1", "P2", "P3", "P4", "P5", "P6", "ARCHI", "UX"] },
    severity: { kind: "string", oneOf: ["FAIL", "WARN"] },
    file: { kind: "string", nonEmpty: true },
    line: { kind: "positive-int-or-null" },
    finding: { kind: "string", nonEmpty: true },
    expected: { kind: "string", nonEmpty: true },
  }),
  overrule: Object.freeze({
    by: { kind: "string", nonEmpty: true },
    reason: { kind: "string", nonEmpty: true },
    at: { kind: "iso8601" },
  }),
  rd: Object.freeze({
    format: { kind: "string", oneOf: ["A", "B", "C"] },
    title: { kind: "string", nonEmpty: true },
  }),
  /** Le seul verdict qui autorise un atterrissage. */
  verdictThatLands: "SHIP",
});

/** Un motif de refus cite ce qu'il a trouvé ; il ne recopie pas le document. */
const QUOTE_MAX = 60;

/** Séparateur des champs de `.pipeline/STATUS.md` (U+2014, pas un trait d'union). */
const EM_DASH = "—";

/** 40 hexadécimaux **minuscules** : une comparaison tolérante rouvrirait la porte de la normalisation. */
const SHA40 = /^[0-9a-f]{40}$/;

/** Forme ISO 8601 ; la garde ne compare aucune date, elle en vérifie la forme. */
const ISO_8601 = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/;

function quote(value) {
  const flat = String(value).replace(/\s+/g, " ").trim();
  return flat.length > QUOTE_MAX ? `${flat.slice(0, QUOTE_MAX)}…` : flat;
}

function lines(text) {
  return text.split(/\r?\n/);
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Un champ satisfait-il sa description du contrat ?
 *
 * Le validateur **lit** `REVIEW_CONTRACT` au lieu de redire ses règles : deux
 * porteurs pour une même règle, c'est la garantie qu'un des deux mente un jour.
 * Rend `null` si le champ est conforme, ou la raison de son refus.
 */
function checkField(value, spec) {
  switch (spec.kind) {
    case "string":
      if (typeof value !== "string") return "attendu une chaîne";
      if (spec.nonEmpty && value.trim() === "") return "chaîne vide";
      if (spec.equals !== undefined && value !== spec.equals) return `attendu « ${spec.equals} »`;
      if (spec.oneOf !== undefined && !spec.oneOf.includes(value)) return `attendu ${spec.oneOf.join(" | ")}`;
      return null;
    case "sha40":
      if (typeof value !== "string") return "attendu une chaîne";
      if (!SHA40.test(value)) return "attendu 40 hexadécimaux minuscules";
      return null;
    case "iso8601":
      if (typeof value !== "string") return "attendu une chaîne";
      if (!ISO_8601.test(value)) return "attendu un horodatage ISO 8601";
      return null;
    case "tests":
      if (!isPlainObject(value)) return "attendu un objet { passed, total }";
      if (!Number.isInteger(value.passed) || !Number.isInteger(value.total)) return "passed et total doivent être entiers";
      if (value.passed < 0 || value.total < 0) return "compteurs négatifs";
      if (value.passed > value.total) return `passed (${value.passed}) dépasse total (${value.total})`;
      return null;
    case "array":
      if (!Array.isArray(value)) return "attendu un tableau";
      return null;
    case "nullable-object":
      if (value !== null && !isPlainObject(value)) return "attendu null ou un objet";
      return null;
    case "positive-int-or-null":
      if (value === null) return null;
      if (!Number.isInteger(value) || value < 1) return "attendu un entier ≥ 1 ou null";
      return null;
    default:
      // Un `kind` inconnu est un défaut du contrat lui-même : refuser, jamais
      // laisser passer un champ que personne ne sait vérifier.
      return `type de contrat inconnu : ${spec.kind}`;
  }
}

/** Vérifie un sous-objet (réserve, overrule, rd) contre sa table de champs. */
function checkShape(value, table, label) {
  if (!isPlainObject(value)) return `${label} : attendu un objet`;
  for (const [name, spec] of Object.entries(table)) {
    if (!(name in value)) return `${label} : ${name}`;
    const wrong = checkField(value[name], spec);
    if (wrong) return `${label} : ${name} (${wrong})`;
  }
  return null;
}

/**
 * Règles 1 et 2 : le document est-il du JSON, et connaissons-nous son contrat ?
 *
 * @param {string} text contenu de `.pipeline/review.json`
 * @returns {{ok: boolean, review: object|null, reason: string}}
 */
export function parseReview(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return { ok: false, review: null, reason: "review.json illisible : fichier vide" };
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return { ok: false, review: null, reason: `review.json illisible : ${quote(error.message)}` };
  }
  if (!isPlainObject(parsed)) {
    return { ok: false, review: null, reason: "review.json illisible : la racine n'est pas un objet" };
  }
  if (parsed.contract !== REVIEW_CONTRACT.id) {
    const found = parsed.contract === undefined ? "absent" : quote(parsed.contract);
    return { ok: false, review: null, reason: `contrat inconnu : ${found}` };
  }
  return { ok: true, review: parsed, reason: "" };
}

/**
 * Règles 5, 6, 7, 8, 9, 10 : la **forme** du document, sans juger l'incrément ni
 * le commit.
 *
 * C'est cette fonction seule que le `reviewer` peut appeler (`--shape`) quand il
 * revoit depuis `/ship`, avant que `STATUS.md` ne porte un `READY`.
 *
 * @param {object} review document déjà analysé par `parseReview`
 * @returns {{ok: boolean, reason: string}}
 */
export function validateReviewShape(review) {
  if (!isPlainObject(review)) return { ok: false, reason: "review absent" };

  for (const [name, spec] of Object.entries(REVIEW_CONTRACT.fields)) {
    if (!(name in review)) {
      return { ok: false, reason: `champ ${name} hors contrat : absent` };
    }
    const wrong = checkField(review[name], spec);
    if (wrong) {
      return { ok: false, reason: `champ ${name} hors contrat : ${wrong}` };
    }
  }

  for (const [index, reservation] of review.reservations.entries()) {
    const wrong = checkShape(reservation, REVIEW_CONTRACT.reservation, `réserve n°${index + 1} hors contrat`);
    if (wrong) return { ok: false, reason: wrong };
  }

  for (const [index, proposal] of review.rd.entries()) {
    const wrong = checkShape(proposal, REVIEW_CONTRACT.rd, `rd n°${index + 1} hors contrat`);
    if (wrong) return { ok: false, reason: wrong };
  }

  // Règle 7 — cohérence interne. Un document qui se contredit ne décide rien, et
  // le laisser passer reviendrait à faire trancher la garde à sa place.
  const failures = review.reservations.filter((reservation) => reservation.severity === "FAIL").length;
  if (review.verdict === REVIEW_CONTRACT.verdictThatLands && failures > 0) {
    return { ok: false, reason: `verdict SHIP incohérent avec ${failures} réserve(s) FAIL` };
  }
  if (review.verdict !== REVIEW_CONTRACT.verdictThatLands && review.reservations.length === 0) {
    return { ok: false, reason: `verdict ${review.verdict} sans réserve : rien à corriger, donc rien à refuser` };
  }

  if (review.overrule !== null) {
    const wrong = checkShape(review.overrule, REVIEW_CONTRACT.overrule, "overrule hors contrat");
    if (wrong) return { ok: false, reason: wrong };
    if (review.verdict !== REVIEW_CONTRACT.verdictThatLands) {
      return { ok: false, reason: `overrule sans effet : verdict ${review.verdict}` };
    }
  }

  return { ok: true, reason: "" };
}

/**
 * Règles 3, 4, 5 dans cet ordre : ce document autorise-t-il **cet** atterrissage ?
 *
 * Suppose la forme déjà validée. L'ordre est signifiant : un `SHIP` rendu sur un
 * autre incrément, ou sur un commit antérieur, est le défaut historique — il
 * doit être attrapé avant que le verdict ne soit lu.
 *
 * @param {object} review document conforme
 * @param {{increment: string, commit: string}} target incrément et SHA que `/land` atterrit
 * @returns {{ok: boolean, reason: string}}
 */
export function reviewAuthorizes(review, target) {
  if (!isPlainObject(review)) return { ok: false, reason: "review absent" };
  const { increment, commit } = isPlainObject(target) ? target : {};

  if (review.increment !== increment) {
    return {
      ok: false,
      reason: `review.json ne porte pas l'incrément courant : ${quote(review.increment)} vs ${quote(increment)}`,
    };
  }
  if (!SHA40.test(String(review.commit)) || review.commit !== commit) {
    return {
      ok: false,
      reason: `review.json ne relit pas le commit à atterrir : ${quote(review.commit)} vs ${quote(commit)}`,
    };
  }
  if (review.verdict !== REVIEW_CONTRACT.verdictThatLands) {
    return { ok: false, reason: `verdict du reviewer : ${quote(review.verdict)}` };
  }
  return { ok: true, reason: "" };
}

/**
 * Extrait de `.pipeline/STATUS.md` le nom de l'incrément que `/land` s'apprête à
 * faire atterrir.
 *
 * Le préfixe `READY` est exigé : mesuré le 15 août 2026 sur un `STATUS.md` en
 * phase `CLOSED`, le segment entre les deux séparateurs vaut « session 7 :
 * langue dans l adresse… » — un libellé de session. Sans cette exigence, la
 * garde comparerait la revue à un nom qui n'a jamais désigné un incrément, et le
 * refus obtenu ne prouverait rien.
 *
 * @param {string} statusText contenu de `.pipeline/STATUS.md`
 * @returns {{ok: boolean, name: string, reason: string}}
 */
export function incrementFromStatus(statusText) {
  if (typeof statusText !== "string" || statusText.trim() === "") {
    return { ok: false, name: "", reason: "STATUS.md absent ou vide" };
  }

  const first = lines(statusText).map((line) => line.trim()).find((line) => line !== "") ?? "";
  if (!/^ready\b/.test(first.toLowerCase())) {
    return { ok: false, name: "", reason: `STATUS.md n'est pas en phase READY : ${quote(first)}` };
  }

  const fields = first.split(EM_DASH);
  if (fields.length < 3) {
    return { ok: false, name: "", reason: `ligne READY malformée, incrément illisible : ${quote(first)}` };
  }

  const name = fields[1].trim();
  if (name === "") {
    return { ok: false, name: "", reason: `nom d'incrément vide dans STATUS.md : ${quote(first)}` };
  }

  return { ok: true, name, reason: "" };
}

/**
 * La seule fonction que `/land` appelle : enchaîne les quatre contrôles et
 * s'arrête au premier refus.
 *
 * @param {string} reviewText contenu de `.pipeline/review.json`
 * @param {string} statusText contenu de `.pipeline/STATUS.md`
 * @param {string} branchCommit SHA complet de la pointe de la branche atterrie
 * @returns {{ok: boolean, reason: string}} `reason` est vide si et seulement si `ok`
 */
export function landGuard(reviewText, statusText, branchCommit) {
  const parsed = parseReview(reviewText);
  if (!parsed.ok) return { ok: false, reason: parsed.reason };

  const shape = validateReviewShape(parsed.review);
  if (!shape.ok) return shape;

  const status = incrementFromStatus(statusText);
  if (!status.ok) return { ok: false, reason: status.reason };

  return reviewAuthorizes(parsed.review, { increment: status.name, commit: branchCommit });
}

/*
 * Point d'entrée en ligne de commande — une seule commande, trois lecteurs : le
 * `reviewer` (qui vérifie son propre document avant de le rendre), la pré-garde
 * de `/land`, et le test à blanc sur l'état réel du dépôt.
 *
 *   node tools/land-guard.js <review.json> <STATUS.md> <sha>
 *   node tools/land-guard.js --shape <review.json>
 *
 * Imprime `OK` ou `REFUS — <reason>`, sort en 0 ou 1.
 */
function readOrNull(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

function runCli(argv) {
  const verdict = (ok, reason) => {
    console.log(ok ? "OK" : `REFUS — ${reason}`);
    return ok ? 0 : 1;
  };

  if (argv[0] === "--shape") {
    if (argv.length !== 2) return verdict(false, "usage : node tools/land-guard.js --shape <review.json>");
    const text = readOrNull(argv[1]);
    if (text === null) return verdict(false, `${argv[1]} introuvable`);
    const parsed = parseReview(text);
    if (!parsed.ok) return verdict(false, parsed.reason);
    const shape = validateReviewShape(parsed.review);
    return verdict(shape.ok, shape.reason);
  }

  if (argv.length !== 3) {
    return verdict(false, "usage : node tools/land-guard.js <review.json> <STATUS.md> <sha>");
  }
  const [reviewPath, statusPath, sha] = argv;
  const reviewText = readOrNull(reviewPath);
  if (reviewText === null) return verdict(false, `${reviewPath} introuvable`);
  const statusText = readOrNull(statusPath);
  if (statusText === null) return verdict(false, `${statusPath} introuvable`);

  const result = landGuard(reviewText, statusText, sha);
  return verdict(result.ok, result.reason);
}

// Exécuté seulement en lancement direct : sous Vitest, `process.argv[1]` est le
// lanceur de tests, jamais ce fichier.
if (typeof process !== "undefined" && typeof process.argv[1] === "string" && process.argv[1].endsWith("land-guard.js")) {
  process.exit(runCli(process.argv.slice(2)));
}

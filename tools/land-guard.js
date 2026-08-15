/**
 * land-guard.js — règle de fraîcheur de la revue, lue par la pré-garde de `/land`
 * et par `tests/land-guard.test.js`, et par rien d'autre.
 *
 * Ce qu'elle ferme : le `reviewer` n'ayant tourné qu'en session 2, quatre
 * incréments ont atterri sans revue indépendante — `.pipeline/review.md` portait
 * encore « EVOL socle-du-site » à la session 6, et aucune garde ne le vérifiait.
 * La revue vivait dans `/ship`, commande facultative ; une porte facultative
 * n'est pas une porte.
 *
 * Hors du site : aucun lien avec `js/`, aucune dépendance, rien de servi par
 * GitHub Pages. Les fonctions sont **pures** et ne lisent aucun fichier — la
 * lecture des artefacts reste à l'appelant, sans quoi leurs chemins d'échec
 * seraient improuvables sans abîmer le dépôt.
 */

/** L'incrément se nomme dans l'en-tête de la revue, pas au détour du corps. */
const HEADER_LINES = 10;

/** Un motif de refus cite ce qu'il a trouvé ; il ne recopie pas la revue entière. */
const QUOTE_MAX = 60;

/** Séparateur des champs de `.pipeline/STATUS.md` (U+2014, pas un trait d'union). */
const EM_DASH = "—";

/**
 * Retire la décoration Markdown pour comparer du sens, pas de la mise en forme.
 *
 * Mesuré sur les artefacts réels : `.claude/agents/reviewer.md` prescrit à
 * l'agent la forme `**VERDICT : SHIP | NEEDS WORK | BLOCK**`, et la revue de la
 * session 7 écrit `## VERDICT : **NEEDS WORK**` ; son en-tête nomme l'incrément
 * ``**Incrément** : CHORE `lang-dans-adresse` ``. Une comparaison littérale
 * refuserait donc toute revue authentique — une garde qui refuse tout le monde
 * se fait désarmer, elle ne protège personne.
 *
 * Ce qui est retiré : l'emphase (accent grave, astérisque) où qu'elle soit, et
 * la décoration de bord gauche (titre, citation, puce). Le trait d'union et le
 * souligné sont **conservés** : ils appartiennent aux noms d'incrément
 * (`lang-dans-adresse`), les retirer confondrait deux incréments distincts.
 */
function stripDecoration(line) {
  return line
    .replace(/[`*]/g, "")
    .replace(/^[\s#>+-]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Comparaison de sens : décoration retirée, casse repliée. */
function normalize(line) {
  return stripDecoration(line).toLowerCase();
}

function quote(text) {
  const flat = stripDecoration(String(text));
  return flat.length > QUOTE_MAX ? `${flat.slice(0, QUOTE_MAX)}…` : flat;
}

function lines(text) {
  return text.split(/\r?\n/);
}

/**
 * La revue en main atteste-t-elle CET incrément, avec le verdict qui autorise
 * l'atterrissage ?
 *
 * L'ordre des règles est signifiant : une revue vide ne peut pas « porter le
 * mauvais incrément », et un `SHIP` rendu sur la revue d'un **autre** incrément
 * est le défaut historique — la règle 2 doit l'attraper avant que la règle 3 ne
 * le déclare bon.
 *
 * @param {string} reviewText contenu de `.pipeline/review.md`
 * @param {string} incrementName nom d'incrément attendu, tel qu'il figure dans `.pipeline/STATUS.md`
 * @returns {{ok: boolean, reason: string}} `reason` est vide si et seulement si `ok`
 */
export function reviewIsFreshFor(reviewText, incrementName) {
  if (typeof reviewText !== "string" || reviewText.trim() === "") {
    return { ok: false, reason: "review.md absent ou vide" };
  }
  if (typeof incrementName !== "string" || incrementName.trim() === "") {
    return { ok: false, reason: "nom d'incrément attendu absent : la garde ne sait pas ce qu'elle vérifie" };
  }

  const all = lines(reviewText);
  const header = all.slice(0, HEADER_LINES);
  const expected = normalize(incrementName);

  if (!header.some((line) => normalize(line).includes(expected))) {
    const found = header.find((line) => line.trim() !== "") ?? "";
    return {
      ok: false,
      reason: `review.md ne porte pas l'incrément courant : ${quote(found)} vs ${quote(incrementName)}`,
    };
  }

  // Le verdict est une LIGNE, jamais un mot croisé dans le corps : `SHIP` doit
  // suivre le deux-points, seul. `NEEDS WORK`, `BLOCK`, `NEEDS SHIP` et
  // `SHIP — sous réserve` sont donc des refus, comme la ligne de gabarit
  // `VERDICT : SHIP | NEEDS WORK | BLOCK` de `reviewer.md`.
  const verdictLine = all.find((line) => /^verdict\s*:/.test(normalize(line)));
  if (verdictLine === undefined || !/^verdict\s*:\s*ship$/.test(normalize(verdictLine))) {
    return {
      ok: false,
      reason: `verdict du reviewer absent ou différent de SHIP : ${verdictLine === undefined ? "absent" : quote(verdictLine)}`,
    };
  }

  return { ok: true, reason: "" };
}

/**
 * Extrait de `.pipeline/STATUS.md` le nom de l'incrément que `/land` s'apprête à
 * faire atterrir.
 *
 * Le préfixe `READY` est exigé : mesuré sur l'état `CLOSED` du 15 août 2026, le
 * segment entre les deux séparateurs vaut « session 7 : langue dans l adresse… »
 * — un libellé de session. Sans cette exigence, la garde comparerait la revue à
 * un nom qui n'a jamais désigné un incrément, et le refus obtenu ne prouverait
 * rien.
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

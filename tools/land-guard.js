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
 * le marqueur de titre en bord gauche. Le trait d'union et le souligné sont
 * **conservés** : ils appartiennent aux noms d'incrément (`lang-dans-adresse`),
 * les retirer confondrait deux incréments distincts.
 *
 * Ce qui n'est **plus** retiré, depuis la 2ᵉ passe de revue : le marqueur de
 * citation (`>`) et ceux de diff. Les retirer faisait d'une ligne *citée* une
 * ligne de verdict — `> VERDICT : SHIP` ou `+VERDICT : SHIP` valaient décision.
 * Une citation n'est pas une décision.
 *
 * La **puce** Markdown, elle, est bien retirée — mais l'espace qui la suit est
 * obligatoire, et c'est tout l'écart : `- VERDICT : SHIP` est une puce (la forme
 * que `.claude/agents/reviewer.md:24` donne en exemple à l'agent), `+VERDICT`
 * est une ligne de diff. Confondre les deux a coûté une passe de revue : à ne
 * pas voir la puce, la garde rendait le verdict **invisible**, donc incapable de
 * refuser.
 */
function stripDecoration(line) {
  return line
    .replace(/[`*]/g, "")
    .replace(/^\s+/, "")
    .replace(/^#+\s*/, "")
    .replace(/^[-+] +/, "")
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
 * Toutes les lignes de verdict d'une revue, blocs de code exclus.
 *
 * **Toutes**, et pas la première : la revue la plus susceptible de citer une
 * ligne de verdict est celle de cette porte-là. Mesuré sur le module avant
 * correction — un `VERDICT : SHIP` cité en exemple, suivi du vrai
 * `VERDICT : NEEDS WORK`, faisait passer l'atterrissage. Le `reviewer` a dû
 * préfixer ses propres citations pour ne pas voir sa revue lue à l'envers.
 *
 * Blocs de code exclus pour la même raison : un exemple encadré de ``` est une
 * illustration, jamais une décision. L'appariement des délimiteurs est vérifié
 * en amont par `fencesBalanced` : sans lui, une clôture manquante faisait
 * ignorer la fin du document — et j'avais écrit, sans le mesurer, que le refus
 * qui en découlait était « du bon côté ». C'était faux : un `SHIP` de synthèse
 * lu avant la rupture suffisait à faire atterrir la revue qui le refusait.
 */
function verdictLines(all) {
  const found = [];
  let insideFence = false;
  for (const line of all) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (!insideFence && /^verdict\s*:/.test(normalize(line))) {
      found.push(line);
    }
  }
  return found;
}

/**
 * Les délimiteurs de bloc de code sont-ils appariés ?
 *
 * Un document impair n'est pas analysable de façon sûre : tout ce qui suit la
 * rupture est lu comme du code et disparaît de l'analyse, verdict compris. On
 * refuse, plutôt que de rendre une décision sur un texte à moitié vu.
 */
function fencesBalanced(all) {
  return all.filter((line) => /^\s*(```|~~~)/.test(line)).length % 2 === 0;
}

/**
 * Le nom d'incrément déclaré par l'en-tête de la revue, ou `null`.
 *
 * **Une ligne étiquetée**, pas une occurrence quelconque : chercher le nom
 * n'importe où dans l'en-tête acceptait une revue d'un *autre* incrément qui se
 * contentait de mentionner le nôtre au fil d'une phrase — le défaut historique
 * du projet, déguisé en mention. L'étiquette est reconnue largement
 * (« Incrément », « Incrément revu »…), la **valeur** est comparée strictement.
 */
function declaredIncrement(header) {
  for (const line of header) {
    const match = /^incr[ée]ment[^:]*:\s*(.+)$/.exec(normalize(line));
    if (match) return match[1].trim();
  }
  return null;
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

  const declared = declaredIncrement(header);
  if (declared === null) {
    const found = header.find((line) => line.trim() !== "") ?? "";
    return {
      ok: false,
      reason: `review.md ne porte pas l'incrément courant : aucune ligne « Incrément : » dans l'en-tête (${quote(found)}) vs ${quote(incrementName)}`,
    };
  }
  // La valeur déclarée doit COMMENCER par le nom attendu, et s'y arrêter : un
  // commentaire qui suit est admis (« CHORE x (rembourse la dette [P6]) »), une
  // suite collée ne l'est pas — sans cette frontière, « CHORE x-v2 » passait
  // pour « CHORE x ».
  if (!declared.startsWith(expected) || /[\p{L}\p{N}_-]/u.test(declared.charAt(expected.length))) {
    return {
      ok: false,
      reason: `review.md ne porte pas l'incrément courant : ${quote(declared)} vs ${quote(incrementName)}`,
    };
  }

  // Le verdict est une LIGNE, jamais un mot croisé dans le corps : `SHIP` doit
  // suivre le deux-points, seul. `NEEDS WORK`, `BLOCK`, `NEEDS SHIP` et
  // `SHIP — sous réserve` sont donc des refus, comme la ligne de gabarit
  // `VERDICT : SHIP | NEEDS WORK | BLOCK` de `reviewer.md`.
  //
  // L'unanimité est exigée, et elle échoue FERMÉ : dès qu'une ligne de verdict
  // dit autre chose que SHIP, l'atterrissage est refusé, quelle que soit sa
  // place dans le document. Retenir la première ligne laissait une revue de
  // refus passer derrière un SHIP cité en exemple.
  if (!fencesBalanced(all)) {
    return {
      ok: false,
      reason: "blocs de code non appariés : la revue n'est pas analysable de façon sûre, la fin du document serait ignorée",
    };
  }

  const verdicts = verdictLines(all);
  if (verdicts.length === 0) {
    return { ok: false, reason: "verdict du reviewer absent ou différent de SHIP : absent" };
  }
  const dissenting = verdicts.find((line) => !/^verdict\s*:\s*ship$/.test(normalize(line)));
  if (dissenting !== undefined) {
    return {
      ok: false,
      reason: `verdict du reviewer absent ou différent de SHIP : ${quote(dissenting)}`,
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

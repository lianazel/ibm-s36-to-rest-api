/**
 * land-guard.test.js — porte de la pré-garde de revue de `/land`.
 *
 * Ce qu'elle ferme : quatre incréments ont atterri avec un compte rendu de revue
 * périmé, personne ne l'ayant vérifié. La règle vit dans `tools/land-guard.js`,
 * et ce fichier atteste qu'elle mord — pas seulement le jour où on l'écrit.
 *
 * Un témoin committé **par chemin capable de refuser** (règle du 14 août 2026 :
 * une preuve jetée protège le jour où on la fait, un témoin committé protège
 * encore). Chaque `reason` est vérifié par un **motif court** : le message peut
 * évoluer, le chemin de refus non.
 *
 * Les documents sont construits en table, jamais lus depuis `.pipeline/` : ce
 * dossier est gitignoré, une porte qui s'y appuierait mesurerait un artefact
 * absent chez quiconque clone le dépôt.
 */
import { describe, expect, it } from "vitest";
import {
  incrementFromStatus,
  landGuard,
  parseReview,
  reviewAuthorizes,
  validateReviewShape,
} from "../tools/land-guard.js";

const INCREMENT = "CHORE revue-structuree";
const SHA = "0123456789abcdef0123456789abcdef01234567";
const SHA_PREV = "fedcba9876543210fedcba9876543210fedcba98";
const READY = `READY — ${INCREMENT} — 2026-08-17T10:00:00Z — chore/revue-structuree — tests 124/124`;

/** Document conforme ; chaque cas n'en altère que ce qu'il mesure. */
function doc(overrides = {}) {
  return {
    contract: "twaim.review/1",
    increment: INCREMENT,
    commit: SHA,
    base: SHA_PREV,
    reviewed_at: "2026-08-17T10:00:00Z",
    tests: { passed: 124, total: 124 },
    verdict: "SHIP",
    reservations: [],
    overrule: null,
    rd: [],
    ...overrides,
  };
}

function reservation(overrides = {}) {
  return {
    pillar: "P3",
    severity: "WARN",
    file: "tools/land-guard.js",
    line: 42,
    finding: "ce qui a été constaté",
    expected: "la correction attendue",
    ...overrides,
  };
}

const OVERRULE = { by: "chef de projet", reason: "motif écrit", at: "2026-08-17T10:00:00Z" };

/** Document privé d'un champ obligatoire — un cas par champ. */
function sans(field) {
  const document = doc();
  delete document[field];
  return document;
}

const texte = (document) => JSON.stringify(document);

/**
 * Table unique : chaque cas nomme le fait qu'il défend et porte sa propre
 * invocation. Un cas dont on ne sait pas dire ce qu'il protège ne protège rien.
 */
const CAS = [
  // ---- parseReview : règles 1 et 2 -------------------------------------------
  {
    fait: "parseReview — un fichier vide n'est pas une revue",
    run: () => parseReview(""),
    ok: false,
    motif: /illisible/,
  },
  {
    fait: "parseReview — du JSON invalide est refusé, et le motif cite l'analyseur",
    run: () => parseReview('{ "verdict": SHIP }'),
    ok: false,
    motif: /illisible/,
  },
  {
    fait: "parseReview — une racine tableau n'est pas un document de revue",
    run: () => parseReview("[]"),
    ok: false,
    motif: /racine n'est pas un objet/,
  },
  {
    fait: "parseReview — sans champ `contract`, on ne sait pas quelles règles appliquer",
    run: () => parseReview(texte(sans("contract"))),
    ok: false,
    motif: /contrat inconnu/,
  },
  {
    fait: "parseReview — un contrat futur (`twaim.review/2`) est refusé, pas deviné",
    run: () => parseReview(texte(doc({ contract: "twaim.review/2" }))),
    ok: false,
    motif: /contrat inconnu/,
  },
  {
    fait: "parseReview — un document conforme est accepté et rendu",
    run: () => parseReview(texte(doc())),
    ok: true,
  },

  // ---- validateReviewShape : un champ obligatoire absent, un cas par champ ----
  ...["increment", "commit", "base", "reviewed_at", "tests", "verdict", "reservations", "overrule", "rd"].map((field) => ({
    fait: `validateReviewShape — champ obligatoire absent : \`${field}\``,
    run: () => validateReviewShape(sans(field)),
    ok: false,
    motif: new RegExp(`champ ${field} hors contrat`),
  })),
  {
    fait: "validateReviewShape — `ship` en minuscules n'est pas `SHIP` : le contrat n'est pas une suggestion",
    run: () => validateReviewShape(doc({ verdict: "ship" })),
    ok: false,
    motif: /verdict hors contrat/,
  },
  {
    fait: "validateReviewShape — `NEEDS WORK` avec une espace n'est pas `NEEDS_WORK`",
    run: () => validateReviewShape(doc({ verdict: "NEEDS WORK", reservations: [reservation()] })),
    ok: false,
    motif: /verdict hors contrat/,
  },
  {
    fait: "validateReviewShape — une réserve sans `line` est incomplète (le champ vaut `null`, il ne s'omet pas)",
    run: () => {
      const incomplete = reservation();
      delete incomplete.line;
      return validateReviewShape(doc({ reservations: [incomplete] }));
    },
    ok: false,
    motif: /réserve n°1/,
  },
  {
    fait: "validateReviewShape — `line: null` est admis : une réserve peut ne viser aucune ligne",
    run: () => validateReviewShape(doc({ reservations: [reservation({ line: null })] })),
    ok: true,
  },
  {
    fait: "validateReviewShape — `severity: MAJOR` n'existe pas au contrat",
    run: () => validateReviewShape(doc({ reservations: [reservation({ severity: "MAJOR" })] })),
    ok: false,
    motif: /réserve n°1/,
  },
  {
    fait: "validateReviewShape — `pillar: P9` n'existe pas : les piliers sont énumérés",
    run: () => validateReviewShape(doc({ reservations: [reservation({ pillar: "P9" })] })),
    ok: false,
    motif: /réserve n°1/,
  },
  {
    fait: "validateReviewShape — la deuxième réserve fautive est nommée par son rang",
    run: () => validateReviewShape(doc({ reservations: [reservation(), reservation({ finding: "" })] })),
    ok: false,
    motif: /réserve n°2/,
  },
  {
    fait: "validateReviewShape — SHIP avec une réserve FAIL ne décide rien",
    run: () => validateReviewShape(doc({ reservations: [reservation({ severity: "FAIL" })] })),
    ok: false,
    motif: /incohérent/,
  },
  {
    fait: "validateReviewShape — NEEDS_WORK sans réserve : rien à corriger, donc rien à refuser",
    run: () => validateReviewShape(doc({ verdict: "NEEDS_WORK" })),
    ok: false,
    motif: /sans réserve/,
  },
  {
    fait: "validateReviewShape — BLOCK sans réserve est refusé pour la même raison",
    run: () => validateReviewShape(doc({ verdict: "BLOCK" })),
    ok: false,
    motif: /sans réserve/,
  },
  {
    fait: "validateReviewShape — un overrule sur un verdict BLOCK est sans effet : le reviewer réémet, il ne commente pas",
    run: () => validateReviewShape(doc({ verdict: "BLOCK", reservations: [reservation({ severity: "FAIL" })], overrule: OVERRULE })),
    ok: false,
    motif: /overrule sans effet/,
  },
  {
    fait: "validateReviewShape — un overrule sans motif écrit n'est pas un overrule",
    run: () => validateReviewShape(doc({ overrule: { ...OVERRULE, reason: "" } })),
    ok: false,
    motif: /overrule hors contrat/,
  },
  {
    fait: "validateReviewShape — `tests.passed` ne peut pas dépasser `tests.total`",
    run: () => validateReviewShape(doc({ tests: { passed: 125, total: 124 } })),
    ok: false,
    motif: /champ tests hors contrat/,
  },
  {
    fait: "validateReviewShape — un `commit` de 39 hexadécimaux n'est pas un SHA",
    run: () => validateReviewShape(doc({ commit: SHA.slice(0, 39) })),
    ok: false,
    motif: /champ commit hors contrat/,
  },
  {
    fait: "validateReviewShape — `reviewed_at` doit avoir la forme d'un horodatage ISO 8601",
    run: () => validateReviewShape(doc({ reviewed_at: "hier soir" })),
    ok: false,
    motif: /champ reviewed_at hors contrat/,
  },
  {
    fait: "validateReviewShape — une proposition R&D hors format A/B/C est refusée",
    run: () => validateReviewShape(doc({ rd: [{ format: "D", title: "piste" }] })),
    ok: false,
    motif: /rd n°1/,
  },
  {
    fait: "validateReviewShape — un document conforme portant deux réserves WARN est accepté",
    run: () => validateReviewShape(doc({ reservations: [reservation(), reservation({ pillar: "P4", line: null })] })),
    ok: true,
  },
  {
    fait: "validateReviewShape — appelée sans document, elle refuse au lieu de supposer",
    run: () => validateReviewShape(null),
    ok: false,
    motif: /review absent/,
  },

  // ---- reviewAuthorizes : règles 3, 4, 5 dans cet ordre -----------------------
  {
    fait: "reviewAuthorizes — un accent d'écart et ce n'est plus le même incrément : aucune normalisation",
    run: () => reviewAuthorizes(doc({ increment: "CHORE revue-structurée" }), { increment: INCREMENT, commit: SHA }),
    ok: false,
    motif: /ne porte pas l'incrément/,
  },
  {
    fait: "reviewAuthorizes — une revue rendue sur le commit précédent ne relit pas ce qui atterrit",
    run: () => reviewAuthorizes(doc({ commit: SHA_PREV }), { increment: INCREMENT, commit: SHA }),
    ok: false,
    motif: /ne relit pas le commit/,
  },
  {
    fait: "reviewAuthorizes — un SHA en majuscules est refusé : le contrat dit minuscules",
    run: () => reviewAuthorizes(doc({ commit: SHA.toUpperCase() }), { increment: INCREMENT, commit: SHA }),
    ok: false,
    motif: /ne relit pas le commit/,
  },
  {
    fait: "reviewAuthorizes — NEEDS_WORK n'atterrit jamais",
    run: () => reviewAuthorizes(doc({ verdict: "NEEDS_WORK", reservations: [reservation()] }), { increment: INCREMENT, commit: SHA }),
    ok: false,
    motif: /verdict du reviewer/,
  },
  {
    fait: "reviewAuthorizes — BLOCK n'atterrit jamais (veto P5, overrulable par réémission)",
    run: () => reviewAuthorizes(doc({ verdict: "BLOCK", reservations: [reservation({ severity: "FAIL" })] }), { increment: INCREMENT, commit: SHA }),
    ok: false,
    motif: /verdict du reviewer/,
  },
  {
    fait: "reviewAuthorizes — bon incrément, bon commit, SHIP : l'atterrissage est autorisé",
    run: () => reviewAuthorizes(doc(), { increment: INCREMENT, commit: SHA }),
    ok: true,
  },
  {
    fait: "reviewAuthorizes — un SHIP réémis avec overrule renseigné autorise aussi",
    run: () => reviewAuthorizes(doc({ overrule: OVERRULE }), { increment: INCREMENT, commit: SHA }),
    ok: true,
  },

  // ---- landGuard : l'enchaînement, et l'ordre des contrôles -------------------
  {
    fait: "landGuard — un STATUS.md en CLOSED refuse avant toute lecture du verdict",
    run: () => landGuard(texte(doc()), "CLOSED — session 8 : incrément précédent", SHA),
    ok: false,
    motif: /pas en phase READY/,
  },
  {
    fait: "landGuard — LE CAS HISTORIQUE : une revue conforme portant l'incrément PRÉCÉDENT",
    run: () => landGuard(texte(doc({ increment: "CHORE lang-dans-adresse" })), READY, SHA),
    ok: false,
    motif: /ne porte pas l'incrément courant/,
  },
  {
    fait: "landGuard — un document illisible est refusé par le premier contrôle, pas par le dernier",
    run: () => landGuard("pas du JSON", READY, SHA),
    ok: false,
    motif: /illisible/,
  },
  {
    fait: "landGuard — chaîne complète conforme : OK",
    run: () => landGuard(texte(doc()), READY, SHA),
    ok: true,
  },
];

describe("land-guard — aucun atterrissage sans review.json frais, conforme et SHIP", () => {
  /**
   * Garde de non-vacuité : une table vidée par accident rendrait cette porte
   * verte et muette. Le plancher de 35 est celui du prompt qui l'a commandée.
   */
  it("la table compte au moins 35 cas", () => {
    expect(CAS.length).toBeGreaterThanOrEqual(35);
  });

  for (const cas of CAS) {
    it(cas.fait, () => {
      const { ok, reason } = cas.run();
      expect(ok).toBe(cas.ok);
      if (cas.ok) {
        expect(reason).toBe("");
      } else {
        expect(reason).toMatch(cas.motif);
      }
    });
  }

  it("parseReview rend l'objet analysé quand le document est conforme", () => {
    const { ok, review } = parseReview(texte(doc({ increment: "CHORE x" })));
    expect(ok).toBe(true);
    expect(review.increment).toBe("CHORE x");
  });
});

describe("incrementFromStatus — le nom comparé vient de STATUS.md, pas d'une supposition", () => {
  it("rend l'incrément d'une ligne READY", () => {
    expect(incrementFromStatus(READY)).toEqual({ ok: true, name: INCREMENT, reason: "" });
  });

  it("refuse une ligne CLOSED, dont le second champ est un libellé de session et non un incrément", () => {
    // Ligne réellement mesurée sur le dépôt le 15 août 2026, phase CLOSED.
    const status = "CLOSED — session 7 : langue dans l adresse (?lang=fr|en), dette [W13] inscrite — merge 1e17bc1";
    const { ok, reason } = incrementFromStatus(status);
    expect(ok).toBe(false);
    expect(reason).toMatch(/pas en phase READY/);
  });

  it("refuse une phase LANDING : un /land coupé se reprend, il ne se rejoue pas à l'aveugle", () => {
    const { ok, reason } = incrementFromStatus("LANDING — CHORE x — 2026-08-17T10:00:00Z — chore/x");
    expect(ok).toBe(false);
    expect(reason).toMatch(/pas en phase READY/);
  });

  it("refuse un STATUS.md vide", () => {
    expect(incrementFromStatus("").ok).toBe(false);
  });

  it("refuse une ligne READY amputée de son second séparateur", () => {
    const { ok, reason } = incrementFromStatus(`READY — ${INCREMENT}`);
    expect(ok).toBe(false);
    expect(reason).toMatch(/malformée/);
  });

  it("refuse un nom d'incrément vide entre les deux séparateurs", () => {
    const { ok, reason } = incrementFromStatus("READY —  — 2026-08-17T10:00:00Z — chore/x — tests 1/1");
    expect(ok).toBe(false);
    expect(reason).toMatch(/vide/);
  });
});

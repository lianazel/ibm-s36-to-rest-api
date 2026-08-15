/**
 * land-guard.test.js — porte de la pré-garde de revue de `/land`.
 *
 * Ce qu'elle ferme : quatre incréments ont atterri avec un `review.md` périmé,
 * personne ne l'ayant vérifié. La règle vit désormais dans `tools/land-guard.js`,
 * et ce fichier atteste qu'elle mord — pas seulement le jour où on l'écrit.
 *
 * Les cas sont **écrits en table**, jamais lus depuis `.pipeline/` : ce dossier
 * est gitignoré, une porte qui s'y appuierait mesurerait un artefact absent chez
 * quiconque cloche le dépôt, et son chemin d'échec exigerait d'abîmer un fichier
 * réel pour être prouvé.
 */
import { describe, expect, it } from "vitest";
import { incrementFromStatus, reviewIsFreshFor } from "../tools/land-guard.js";

const INCREMENT = "CHORE lang-dans-adresse";

/** En-tête minimal conforme : l'incrément se nomme dans les 10 premières lignes. */
function reviewHeaded(name, body) {
  return [`# REVUE — ${name}`, "", `**Incrément** : ${name}`, "", "---", "", body].join("\n");
}

/**
 * Table de cas de `reviewIsFreshFor`. Chaque entrée nomme le fait qu'elle
 * défend : un cas dont on ne sait pas dire ce qu'il protège ne protège rien.
 */
const CASES = [
  {
    fait: "une revue absente ne prouve rien — c'est l'état du dépôt quand personne n'a lancé le reviewer",
    review: "",
    attendu: INCREMENT,
    ok: false,
    motif: /absent ou vide/,
  },
  {
    fait: "une lecture ratée rend autre chose qu'une chaîne, et ce n'est pas une revue non plus",
    review: null,
    attendu: INCREMENT,
    ok: false,
    motif: /absent ou vide/,
  },
  {
    fait: "LE défaut historique — la revue de l'incrément précédent, avec son verdict SHIP bien réel",
    review: reviewHeaded("CHORE menu-hamburger", "VERDICT : SHIP"),
    attendu: INCREMENT,
    ok: false,
    motif: /ne porte pas l'incrément/,
  },
  {
    fait: "NEEDS WORK est un refus : la revue a parlé, elle n'a pas autorisé l'atterrissage",
    review: reviewHeaded(INCREMENT, "VERDICT : NEEDS WORK"),
    attendu: INCREMENT,
    ok: false,
    motif: /différent de SHIP/,
  },
  {
    fait: "BLOCK est un veto (P5) ; il s'overrule par une revue mise à jour, jamais par un contournement",
    review: reviewHeaded(INCREMENT, "VERDICT : BLOCK"),
    attendu: INCREMENT,
    ok: false,
    motif: /différent de SHIP/,
  },
  {
    fait: "le cas nominal : bon incrément, verdict SHIP sur sa ligne",
    review: reviewHeaded(INCREMENT, "VERDICT : SHIP"),
    attendu: INCREMENT,
    ok: true,
  },
  {
    fait: "la casse ne décide de rien — aucun incrément ne se distingue d'un autre par elle",
    review: reviewHeaded(INCREMENT, "verdict: ship"),
    attendu: INCREMENT,
    ok: true,
  },
  {
    fait: "le verdict est une LIGNE : le mot SHIP au fil du texte n'est pas une décision",
    review: reviewHeaded(INCREMENT, "Rien ne s'oppose au SHIP de cet incrément, à mon sens."),
    attendu: INCREMENT,
    ok: false,
    motif: /absent/,
  },
  {
    // Témoin de F1+F2 : la forme réellement produite par l'agent. `reviewer.md`
    // prescrit `**VERDICT : SHIP | NEEDS WORK | BLOCK**`, et la revue de la
    // session 7 écrit `## VERDICT : **NEEDS WORK**` avec un en-tête à accents
    // graves. Sans ce cas, une comparaison littérale reviendrait en douce et
    // refuserait toute revue authentique — cette porte-ci rougirait la première.
    fait: "la décoration Markdown réelle du reviewer passe : titre, gras, accents graves autour du slug",
    review: ["# REVUE — CHORE langue dans l'adresse", "", "**Incrément** : CHORE `lang-dans-adresse`", "", "---", "", "## VERDICT : **SHIP**"].join("\n"),
    attendu: INCREMENT,
    ok: true,
  },
  {
    fait: "SHIP précédé de NEEDS n'est pas SHIP : le mot doit suivre le deux-points, seul",
    review: reviewHeaded(INCREMENT, "VERDICT : NEEDS SHIP"),
    attendu: INCREMENT,
    ok: false,
    motif: /différent de SHIP/,
  },
  {
    fait: "un SHIP assorti d'une réserve n'est pas un SHIP : rien ne suit le mot sur la ligne",
    review: reviewHeaded(INCREMENT, "VERDICT : SHIP — sous réserve du point 3"),
    attendu: INCREMENT,
    ok: false,
    motif: /différent de SHIP/,
  },
  {
    fait: "l'incrément se nomme dans l'en-tête : cité 15 lignes plus bas, il ne dit pas de quoi parle la revue",
    review: ["# REVUE", ...Array(12).fill(""), `**Incrément** : ${INCREMENT}`, "", "VERDICT : SHIP"].join("\n"),
    attendu: INCREMENT,
    ok: false,
    motif: /ne porte pas l'incrément/,
  },
  {
    fait: "sans nom attendu, la garde ne sait pas ce qu'elle vérifie — elle refuse au lieu de tout accepter",
    review: reviewHeaded(INCREMENT, "VERDICT : SHIP"),
    attendu: "",
    ok: false,
    motif: /ne sait pas ce qu'elle vérifie/,
  },
  {
    fait: "la ligne de gabarit de reviewer.md énumère les verdicts possibles ; elle n'en rend aucun",
    review: reviewHeaded(INCREMENT, "**VERDICT : SHIP | NEEDS WORK | BLOCK**"),
    attendu: INCREMENT,
    ok: false,
    motif: /différent de SHIP/,
  },
];

describe("reviewIsFreshFor — aucun atterrissage sans revue fraîche du reviewer", () => {
  /**
   * Garde de non-vacuité : une table vidée par accident rendrait cette porte
   * verte et muette. Le plancher de 7 est celui du prompt qui l'a commandée.
   */
  it("la table compte au moins 7 cas", () => {
    expect(CASES.length).toBeGreaterThanOrEqual(7);
  });

  for (const cas of CASES) {
    it(cas.fait, () => {
      const { ok, reason } = reviewIsFreshFor(cas.review, cas.attendu);
      expect(ok).toBe(cas.ok);
      if (cas.ok) {
        expect(reason).toBe("");
      } else {
        expect(reason).toMatch(cas.motif);
      }
    });
  }
});

describe("incrementFromStatus — le nom comparé vient de STATUS.md, pas d'une supposition", () => {
  it("rend l'incrément d'une ligne READY", () => {
    const status = "READY — CHORE garde-revue-land — 2026-08-15T22:00:00Z — chore/garde-revue-land — tests 82/82";
    expect(incrementFromStatus(status)).toEqual({ ok: true, name: "CHORE garde-revue-land", reason: "" });
  });

  it("refuse une ligne CLOSED, dont le second champ est un libellé de session et non un incrément", () => {
    // Ligne réellement mesurée sur le dépôt le 15 août 2026, phase CLOSED.
    const status = "CLOSED — session 7 : langue dans l adresse (?lang=fr|en), dette [W13] inscrite — merge 1e17bc1";
    const { ok, reason } = incrementFromStatus(status);
    expect(ok).toBe(false);
    expect(reason).toMatch(/pas en phase READY/);
  });

  it("refuse une phase LANDING : un /land coupé se reprend, il ne se rejoue pas à l'aveugle", () => {
    const { ok, reason } = incrementFromStatus("LANDING — CHORE x — 2026-08-15T22:00:00Z — chore/x");
    expect(ok).toBe(false);
    expect(reason).toMatch(/pas en phase READY/);
  });

  it("refuse un STATUS.md vide", () => {
    expect(incrementFromStatus("").ok).toBe(false);
  });

  it("refuse une ligne READY amputée de son second séparateur", () => {
    const { ok, reason } = incrementFromStatus("READY — CHORE garde-revue-land");
    expect(ok).toBe(false);
    expect(reason).toMatch(/malformée/);
  });

  it("refuse un nom d'incrément vide entre les deux séparateurs", () => {
    const { ok, reason } = incrementFromStatus("READY —  — 2026-08-15T22:00:00Z — chore/x — tests 1/1");
    expect(ok).toBe(false);
    expect(reason).toMatch(/vide/);
  });
});

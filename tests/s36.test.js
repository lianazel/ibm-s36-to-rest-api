/**
 * s36.test.js — suite Vitest du module js/s36.js.
 *
 * L'enregistrement d'essai reproduit la forme d'un CLIMST du cas fictif
 * (140 caractères, champs positionnels, bourrage à droite) sans recopier
 * aucune donnée réelle : tout est construit dans le test.
 */
import { describe, expect, it } from "vitest";
import { extractField, parseImplicitDecimal } from "../js/s36.js";

// Enregistrement CLIMST fictif de 140 caractères, construit champ par champ :
// NOMCLI en 1-30, zone intermédiaire neutre en 31-110, CDPCLI en 111-115,
// reste de l'enregistrement en 116-140.
const NOMCLI = "DURAND ET FILS".padEnd(30, " ");
const MIDDLE = "".padEnd(80, " ");
const CDPCLI = "75011";
const TAIL = "".padEnd(25, " ");
const CLIMST_RECORD = NOMCLI + MIDDLE + CDPCLI + TAIL;

describe("parseImplicitDecimal", () => {
  it("interprète deux décimales implicites : 000012550 → 125.5", () => {
    expect(parseImplicitDecimal("000012550")).toBe(125.5);
  });

  it("interprète un montant nul : 000000000 → 0", () => {
    expect(parseImplicitDecimal("000000000")).toBe(0);
  });

  it("accepte zéro décimale : (12345, 0) → 12345", () => {
    expect(parseImplicitDecimal("12345", 0)).toBe(12345);
  });

  it("rejette les non-chiffres par TypeError", () => {
    expect(() => parseImplicitDecimal("12A45")).toThrow(TypeError);
  });

  it("rejette la chaîne vide par RangeError", () => {
    expect(() => parseImplicitDecimal("")).toThrow(RangeError);
  });

  it("rejette un nombre de décimales négatif par RangeError", () => {
    expect(() => parseImplicitDecimal("12345", -1)).toThrow(RangeError);
  });
});

describe("extractField", () => {
  it("l'enregistrement d'essai a bien la longueur CLIMST (140)", () => {
    expect(CLIMST_RECORD).toHaveLength(140);
  });

  it("extrait NOMCLI (1-30) sans le bourrage de droite", () => {
    expect(extractField(CLIMST_RECORD, 1, 30)).toBe("DURAND ET FILS");
  });

  it("extrait CDPCLI (111-115)", () => {
    expect(extractField(CLIMST_RECORD, 111, 115)).toBe("75011");
  });

  it("rejette un enregistrement trop court par RangeError", () => {
    expect(() => extractField("TROP COURT", 1, 30)).toThrow(RangeError);
  });

  it("rejette start < 1 par RangeError (les positions S/36 sont 1-basées)", () => {
    expect(() => extractField(CLIMST_RECORD, 0, 30)).toThrow(RangeError);
  });

  it("rejette end < start par RangeError", () => {
    expect(() => extractField(CLIMST_RECORD, 30, 1)).toThrow(RangeError);
  });

  it("invariant : la longueur du résultat est toujours ≤ end - start + 1", () => {
    // Le trim droit peut raccourcir le champ, jamais l'allonger.
    const spans = [
      [1, 30],
      [31, 110],
      [111, 115],
      [116, 140],
      [1, 140],
      [5, 5],
    ];
    for (const [start, end] of spans) {
      const field = extractField(CLIMST_RECORD, start, end);
      expect(field.length).toBeLessThanOrEqual(end - start + 1);
    }
  });
});

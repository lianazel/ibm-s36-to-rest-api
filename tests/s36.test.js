/**
 * s36.test.js — suite Vitest du module js/s36.js.
 *
 * L'enregistrement d'essai reproduit la forme d'un CLIMST du cas fictif
 * (140 caractères, champs positionnels, bourrage à droite) sans recopier
 * aucune donnée réelle : tout est construit dans le test.
 */
import { describe, expect, it } from "vitest";
import { extractField, formatImplicitDecimal, parseImplicitDecimal } from "../js/s36.js";

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

describe("formatImplicitDecimal : la borne qui part au fichier", () => {
  it("125 devient 12500, la valeur que le fichier stocke vraiment", () => {
    // Le cas du prompt, mot pour mot : sans cette traduction la requête
    // affichée chercherait 125 là où le fichier écrit 12500, et la page
    // mentirait sur son propre mécanisme.
    expect(formatImplicitDecimal(125)).toBe("12500");
  });

  it("rend une chaîne de chiffres, jamais un nombre", () => {
    // C'est la forme que `parseImplicitDecimal` consomme : les deux fonctions
    // se referment l'une sur l'autre au lieu de se croiser.
    expect(typeof formatImplicitDecimal(125)).toBe("string");
    expect(formatImplicitDecimal(125)).toMatch(/^[0-9]+$/);
  });

  it("l'aller-retour rend la valeur de départ", () => {
    for (const value of [0, 1, 125.5, 3400, 12507.89, 9400]) {
      expect(parseImplicitDecimal(formatImplicitDecimal(value))).toBe(value);
    }
  });

  it("l'aller-retour dans l'autre sens rend la chaîne de départ, bourrage retiré", () => {
    // Le bourrage à neuf positions appartient à l'enregistrement, pas à la
    // valeur : "000012550" et "12550" portent le même montant.
    for (const raw of ["000012550", "001250000", "000004750"]) {
      expect(formatImplicitDecimal(parseImplicitDecimal(raw))).toBe(String(Number(raw)));
    }
  });

  it("n'accumule pas l'erreur du flottant binaire", () => {
    // 1.1 * 100 vaut 110.00000000000001 : une multiplication nue aurait rendu
    // "110.00000000000001", et la borne affichée aurait été fausse.
    expect(formatImplicitDecimal(1.1)).toBe("110");
    expect(formatImplicitDecimal(8.29)).toBe("829");
    expect(formatImplicitDecimal(1671.05)).toBe("167105");
  });

  it("le nombre de décimales se choisit, comme à l'aller", () => {
    expect(formatImplicitDecimal(125, 0)).toBe("125");
    expect(formatImplicitDecimal(125, 3)).toBe("125000");
  });

  it("refuse ce qu'elle ne sait pas représenter", () => {
    expect(() => formatImplicitDecimal("125")).toThrow(TypeError);
    expect(() => formatImplicitDecimal(Number.NaN)).toThrow(TypeError);
    expect(() => formatImplicitDecimal(Number.POSITIVE_INFINITY)).toThrow(TypeError);
    // Même périmètre que la fonction inverse : le signe « overpunch » du S/36
    // n'est géré ni dans un sens ni dans l'autre.
    expect(() => formatImplicitDecimal(-125)).toThrow(RangeError);
    expect(() => formatImplicitDecimal(125, -1)).toThrow(RangeError);
  });
});

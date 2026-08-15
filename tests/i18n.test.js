/**
 * i18n.test.js — porte de parité du dictionnaire bilingue (CLAUDE.md).
 *
 * La parité FR/EN est structurelle et récursive : mêmes clés exactement,
 * dans les deux sens. Le test porte sa propre garde de non-vacuité : une
 * porte qui compare deux ensembles vides est aveugle, elle doit échouer.
 */
import { describe, expect, it } from "vitest";
import { dict, resolveInitialLang, resolveLang } from "../js/i18n.js";

/** Aplati un dictionnaire en liste triée de clés pointées ("footer.notice"). */
function collectKeys(node, prefix = "") {
  const keys = [];
  for (const [name, value] of Object.entries(node)) {
    const path = prefix === "" ? name : `${prefix}.${name}`;
    if (typeof value === "object" && value !== null) {
      keys.push(...collectKeys(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

/** Feuilles (clé pointée, valeur) d'un dictionnaire. */
function collectLeaves(node, prefix = "") {
  const leaves = [];
  for (const [name, value] of Object.entries(node)) {
    const path = prefix === "" ? name : `${prefix}.${name}`;
    if (typeof value === "object" && value !== null) {
      leaves.push(...collectLeaves(value, path));
    } else {
      leaves.push([path, value]);
    }
  }
  return leaves;
}

describe("parité du dictionnaire FR/EN", () => {
  it("porte non vide : au moins 10 clés de chaque côté", () => {
    // Deux ensembles vides seraient « à parité » sans rien prouver.
    expect(collectKeys(dict.fr).length, "porte de parité AVEUGLE").toBeGreaterThanOrEqual(10);
    expect(collectKeys(dict.en).length, "porte de parité AVEUGLE").toBeGreaterThanOrEqual(10);
  });

  it("mêmes clés exactement, récursivement, dans les deux sens", () => {
    expect(collectKeys(dict.fr)).toEqual(collectKeys(dict.en));
  });

  it("aucune valeur vide, aucune valeur laissée égale à sa clé", () => {
    for (const lang of ["fr", "en"]) {
      for (const [path, value] of collectLeaves(dict[lang])) {
        expect(typeof value, `${lang}.${path} n'est pas une chaîne`).toBe("string");
        expect(value.trim(), `${lang}.${path} est vide`).not.toBe("");
        expect(value, `${lang}.${path} vaut sa propre clé`).not.toBe(path);
      }
    }
  });
});

describe("resolveInitialLang — adresse valide > préférence mémorisée > navigateur", () => {
  /**
   * La table EST la spécification : chaque ligne dit ce qu'elle prouve.
   * Les trois derniers cas gardent le comportement d'avant l'incrément —
   * sans paramètre, rien ne doit avoir bougé.
   */
  const CAS = [
    { search: "?lang=en", stored: "fr", nav: "fr-FR", attendu: "en", prouve: "l'adresse bat la préférence et le navigateur" },
    { search: "?lang=fr", stored: "en", nav: "en-US", attendu: "fr", prouve: "idem, dans l'autre sens" },
    { search: "?from=portfolio&lang=en", stored: null, nav: "fr", attendu: "en", prouve: "l'ordre des paramètres n'importe pas" },
    { search: "?lang=EN", stored: "fr", nav: "fr", attendu: "fr", prouve: "casse stricte : ignoré, la préférence gagne" },
    { search: "?lang=fr-FR", stored: null, nav: "en", attendu: "en", prouve: "pas de préfixe : un code, pas une locale" },
    { search: "?lang=de", stored: null, nav: "fr", attendu: "fr", prouve: "hors liste : ignoré" },
    { search: "?lang=", stored: "en", nav: "fr", attendu: "en", prouve: "valeur vide : ignorée" },
    { search: "", stored: "en", nav: "fr-CA", attendu: "en", prouve: "sans paramètre : la préférence, comme avant" },
    { search: "", stored: null, nav: "fr-CA", attendu: "fr", prouve: "sans paramètre ni préférence : le navigateur" },
    { search: "", stored: "xx", nav: "de", attendu: "en", prouve: "préférence invalide ignorée, navigateur → défaut en" },
  ];

  it("porte non vide : la table couvre au moins les dix cas arbitrés", () => {
    // Une table vidée par accident ne lèverait aucun test : la suite passerait
    // au vert sans avoir rien mesuré.
    expect(CAS.length, "table de cas AVEUGLE").toBeGreaterThanOrEqual(10);
  });

  for (const { search, stored, nav, attendu, prouve } of CAS) {
    it(`search=${JSON.stringify(search)} stored=${JSON.stringify(stored)} nav=${JSON.stringify(nav)} → ${attendu} — ${prouve}`, () => {
      expect(resolveInitialLang(search, stored, nav)).toBe(attendu);
    });
  }
});

describe("resolveLang", () => {
  it("le français et ses variantes régionales donnent fr", () => {
    expect(resolveLang("fr")).toBe("fr");
    expect(resolveLang("fr-FR")).toBe("fr");
    expect(resolveLang("fr-CA")).toBe("fr");
  });

  it("tout le reste donne en, y compris l'absence de valeur", () => {
    expect(resolveLang("en-US")).toBe("en");
    expect(resolveLang("de")).toBe("en");
    expect(resolveLang("")).toBe("en");
    expect(resolveLang(undefined)).toBe("en");
  });
});

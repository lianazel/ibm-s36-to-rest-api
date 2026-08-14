/**
 * i18n.test.js — porte de parité du dictionnaire bilingue (CLAUDE.md).
 *
 * La parité FR/EN est structurelle et récursive : mêmes clés exactement,
 * dans les deux sens. Le test porte sa propre garde de non-vacuité : une
 * porte qui compare deux ensembles vides est aveugle, elle doit échouer.
 */
import { describe, expect, it } from "vitest";
import { dict, resolveLang } from "../js/i18n.js";

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

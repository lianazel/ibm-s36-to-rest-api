/**
 * menu.test.js — les deux fonctions pures du menu (`js/menu.js`).
 *
 * Le câblage au DOM n'est pas testé ici (pas d'environnement DOM dans ce
 * projet) : il est vérifié à la main, dans un navigateur, et consigné dans
 * `.pipeline/test-results.md`. Ce qui est testé, c'est ce qui décide —
 * ce que l'état du menu annonce à l'accessibilité, et la seule lecture faite
 * de la chaîne de requête.
 *
 * Les libellés viennent du dictionnaire réel, pas de constantes locales : une
 * clé renommée ou disparue fait rougir ce fichier, et pas seulement l'écran.
 */
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";
import { menuAria, showPortfolioLink } from "../js/menu.js";

describe("menuAria — ce que l'état du menu annonce", () => {
  it("fermé, le bouton propose d'ouvrir (FR)", () => {
    expect(menuAria(false, dict.fr.menu)).toEqual({
      expanded: "false",
      label: "Ouvrir le menu",
    });
  });

  it("ouvert, le bouton propose de fermer (FR)", () => {
    expect(menuAria(true, dict.fr.menu)).toEqual({
      expanded: "true",
      label: "Fermer le menu",
    });
  });

  it("fermé, le bouton propose d'ouvrir (EN)", () => {
    expect(menuAria(false, dict.en.menu)).toEqual({
      expanded: "false",
      label: "Open menu",
    });
  });

  it("ouvert, le bouton propose de fermer (EN)", () => {
    expect(menuAria(true, dict.en.menu)).toEqual({
      expanded: "true",
      label: "Close menu",
    });
  });

  it("`aria-expanded` est une chaîne : l'attribut ARIA n'accepte rien d'autre", () => {
    // Un booléen posé par setAttribute donnerait "true"/"false" par coercition,
    // mais le contrat de la fonction ne doit pas dépendre de cette politesse.
    expect(typeof menuAria(false, dict.fr.menu).expanded).toBe("string");
    expect(typeof menuAria(true, dict.fr.menu).expanded).toBe("string");
  });
});

describe("showPortfolioLink — révélé sur preuve, jamais par défaut", () => {
  it("la valeur exacte attendue, et elle seule, révèle le lien", () => {
    expect(showPortfolioLink("?from=portfolio")).toBe(true);
  });

  it("l'ordre des paramètres n'entre pas en ligne de compte", () => {
    expect(showPortfolioLink("?from=portfolio&x=1")).toBe(true);
    expect(showPortfolioLink("?x=1&from=portfolio")).toBe(true);
  });

  it("le « ? » de tête est facultatif : location.search le porte, pas un test", () => {
    expect(showPortfolioLink("from=portfolio")).toBe(true);
  });

  it("aucune chaîne de requête : rien n'est révélé", () => {
    expect(showPortfolioLink("")).toBe(false);
  });

  it("la casse est stricte — « Portfolio » n'est pas « portfolio »", () => {
    expect(showPortfolioLink("?from=Portfolio")).toBe(false);
  });

  it("aucune correspondance partielle ni par préfixe", () => {
    expect(showPortfolioLink("?from=portfolio2")).toBe(false);
    expect(showPortfolioLink("?from=portfol")).toBe(false);
  });

  it("un autre paramètre ne vaut pas preuve", () => {
    expect(showPortfolioLink("?lang=en")).toBe(false);
  });

  it("paramètre répété : la première occurrence tranche, sans ambiguïté", () => {
    // Atteste ce que fait `URLSearchParams.get`, ne prescrit pas d'adresse.
    expect(showPortfolioLink("?from=portfolio&from=autre")).toBe(true);
    expect(showPortfolioLink("?from=autre&from=portfolio")).toBe(false);
  });
});

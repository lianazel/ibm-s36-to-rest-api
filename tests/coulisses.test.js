/**
 * coulisses.test.js — porte de concordance entre une citation publiée et son
 * fichier source.
 *
 * Ce qu'elle ferme : le chapitre « La méthode » cite un artefact réel du dépôt,
 * la garde que le prompt du 27 août 2026 porte depuis ce jour-là. Une citation
 * recopiée vit en deux porteurs que rien ne tient d'accord. Le jour où quelqu'un
 * réécrit cette garde dans le prompt, cette porte rougit tant que le site n'a pas
 * suivi.
 *
 * La valeur anglaise est la valeur française, et c'est le sujet : le harnais
 * s'écrit en français, un artefact se cite et ne se traduit pas. Même choix que
 * `section5.dialogue.consigne`. Comparer l'anglais à une traduction rendrait cette
 * porte rouge à la naissance.
 *
 * Ce qu'elle NE fait PAS : elle ne juge pas la prose autour de la citation, elle
 * ne vérifie pas que le fichier source veut toujours dire la même chose (une
 * phrase identique peut avoir changé de rôle), elle ne regarde pas le rendu, et
 * elle ne joint aucun réseau. Elle garde une concordance de chaînes dans le dépôt,
 * rien d'autre.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";

/**
 * Table des sources — porteur unique. La clé sert à trois choses à la fois : lire
 * la valeur dans le dictionnaire, nommer le fichier qui la porte, et nommer la
 * clé fautive dans le message d'échec. Rien n'est réécrit ailleurs.
 *
 * @type {Record<string, string>}
 */
const SOURCES = {
  "section5.arret.citation": "prompts/v0.1/EVOL_annexe-s36_v1.md",
};

/**
 * Plancher de cécité. Le fichier source est un prompt de plusieurs milliers de
 * caractères : sous cent, la lecture a échoué et la porte doit lever. Sans ce
 * plancher, une source vide passerait au vert — une chaîne quelconque est
 * « contenue » dans le vide aussi mal qu'on veut, et surtout le vide est contenu
 * dans n'importe quel texte.
 */
const MIN_SOURCE_CHARS = 100;

/** Résolu depuis l'emplacement du test, jamais depuis le répertoire courant. */
function sourcePath(key) {
  return fileURLToPath(new URL(`../${SOURCES[key]}`, import.meta.url));
}

/**
 * Source injectable (paramètre par défaut) : sans cette couture, le chemin
 * d'échec de la garde de cécité serait improuvable sans vider un fichier du
 * dépôt. Le témoin la joue en mémoire.
 */
function readSource(key, contents = null) {
  return contents ?? readFileSync(sourcePath(key), "utf8");
}

/**
 * Descend un chemin de clé pointé dans un dictionnaire, sans le réécrire.
 * `resolve(dict.fr, "section5.arret.citation")` rend la valeur, ou `undefined`.
 */
function resolve(tree, key) {
  return key.split(".").reduce((node, part) => node?.[part], tree);
}

/**
 * Les fichiers du dépôt sont écrits à largeur fixe : une citation peut y être
 * coupée par un retour à la ligne. On ramène donc toute suite de blancs à une
 * espace simple, des deux côtés — et rien d'autre. Ni la casse, ni la ponctuation,
 * ni les apostrophes ne sont touchées : la source et le dictionnaire écrivent tous
 * deux l'apostrophe droite, et `ARRÊTE-TOI` est cité en capitales à dessein.
 */
function normalizeSpace(value) {
  return value.replace(/\s+/g, " ").trim();
}

/** Garde de cécité, partagée par la porte et par son témoin. */
function assertNotBlind(key, value, contents) {
  expect(
    normalizeSpace(value ?? ""),
    `porte AVEUGLE : ${key} est vide ou introuvable dans le dictionnaire`,
  ).not.toBe("");
  expect(
    contents.length,
    `porte AVEUGLE : la source de ${key} rend moins de ${MIN_SOURCE_CHARS} caractères — lecture cassée, pas citation absente`,
  ).toBeGreaterThanOrEqual(MIN_SOURCE_CHARS);
}

/**
 * La règle de la porte, en un seul endroit : la garde d'abord, la comparaison
 * ensuite, et un message qui nomme la clé fautive. Le témoin 4 l'appelle avec une
 * valeur écartée — c'est ce qui prouve que le message existe pour de vrai.
 */
function assertQuotedFromSource(key, value, contents) {
  assertNotBlind(key, value, contents);
  // `toContain` sur un fichier entier imprime le fichier entier au rouge : trente
  // kilo-octets de diff pour un caractère d'écart, et la clé fautive noyée dedans.
  // On assère donc un booléen, et le message porte seul ce qu'il faut lire — la
  // clé, son fichier source, et la chaîne publiée qui ne s'y trouve plus.
  expect(
    normalizeSpace(contents).includes(normalizeSpace(value)),
    `${key} ne se lit plus mot pour mot dans ${SOURCES[key]} — publié : « ${normalizeSpace(value)} »`,
  ).toBe(true);
}

const KEY = "section5.arret.citation";

describe("citation du chapitre « La méthode » — concordance avec son fichier source", () => {
  it("la valeur française se lit mot pour mot dans son fichier source", () => {
    assertQuotedFromSource(KEY, resolve(dict.fr, KEY), readSource(KEY));
  });

  it("la valeur anglaise est exactement la française — un artefact ne se traduit pas", () => {
    expect(resolve(dict.en, KEY)).toBe(resolve(dict.fr, KEY));
  });
});

describe("vivacité de la porte — chaque chemin bloquant porte son témoin", () => {
  it("garde de cécité : une source vide la fait lever, jamais passer au vert", () => {
    expect(() => assertQuotedFromSource(KEY, resolve(dict.fr, KEY), readSource(KEY, ""))).toThrow(
      /porte AVEUGLE/,
    );
  });

  it("garde de cécité : une valeur de dictionnaire vide la fait lever aussi", () => {
    expect(() => assertQuotedFromSource(KEY, "", readSource(KEY))).toThrow(/porte AVEUGLE/);
  });

  it("un caractère d'écart est vu, et le message nomme la clé fautive", () => {
    const drifted = `${resolve(dict.fr, KEY)}.`;
    expect(drifted).not.toBe(resolve(dict.fr, KEY));
    expect(() => assertQuotedFromSource(KEY, drifted, readSource(KEY))).toThrow(
      /section5\.arret\.citation/,
    );
  });

  it("la normalisation ne touche que les blancs, jamais la casse ni la ponctuation", () => {
    expect(normalizeSpace("a  \n  b")).toBe("a b");
    expect(normalizeSpace("ARRÊTE-TOI et signale.")).toBe("ARRÊTE-TOI et signale.");
  });
});

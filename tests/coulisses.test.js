/**
 * coulisses.test.js — porte de concordance entre les citations publiées et leurs
 * fichiers sources.
 *
 * Ce qu'elle ferme : le chapitre « La méthode » cite trois artefacts réels du
 * dépôt — la garde d'un prompt gelé, un refus du relecteur inscrit au journal, le
 * titre d'une leçon du registre. Une citation recopiée vit en deux porteurs que
 * rien ne tient d'accord. Le jour où quelqu'un réécrit l'un de ces artefacts à sa
 * source, cette porte rougit tant que le site n'a pas suivi, et son message dit
 * laquelle des trois a dérivé.
 *
 * La valeur anglaise est la valeur française, et c'est le sujet : le harnais
 * s'écrit en français, un artefact se cite et ne se traduit pas. Même choix que
 * `section5.dialogue.consigne`. Comparer l'anglais à une traduction rendrait cette
 * porte rouge à la naissance.
 *
 * Deux des trois sources — le journal et le registre des leçons — s'allongent à
 * chaque atterrissage. C'est sans effet ici : la porte cherche une chaîne, elle ne
 * compte rien.
 *
 * Ce qu'elle NE fait PAS : elle ne juge pas la prose autour des citations, elle ne
 * vérifie pas que les fichiers sources veulent toujours dire la même chose (une
 * phrase identique peut avoir changé de rôle), elle ne regarde pas le rendu, et
 * elle ne joint aucun réseau. Elle lit trois fichiers du dépôt et n'en écrit aucun.
 * Elle garde une concordance de chaînes, rien d'autre.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";

/**
 * Table des sources — porteur unique. La clé sert à trois choses à la fois : lire
 * la valeur dans le dictionnaire, nommer le fichier qui la porte, et nommer la
 * clé fautive dans le message d'échec. Rien n'est réécrit ailleurs : c'est le
 * seul endroit du fichier où une chaîne de clé est écrite en toutes lettres,
 * commentaires compris. Les tests et les témoins les prennent d'ici.
 *
 * @type {Record<string, string>}
 */
const SOURCES = {
  "section5.arret.citation": "prompts/v0.1/EVOL_annexe-s36_v1.md",
  "section5.machine.citation": "tasks/JOURNAL_v0.1.md",
  "section5.humain.citation": "tasks/lessons.md",
};

/**
 * Plancher de cécité. Les fichiers sources sont des documents de plusieurs
 * milliers de caractères : sous cent, la lecture a échoué et la porte doit lever.
 * Sans ce plancher, une source vide passerait au vert — une chaîne quelconque est
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
 * dépôt. Les témoins la jouent en mémoire.
 */
function readSource(key, contents = null) {
  return contents ?? readFileSync(sourcePath(key), "utf8");
}

/**
 * Descend un chemin de clé pointé dans un dictionnaire, sans le réécrire. Rend la
 * valeur, ou `undefined` si le chemin ne mène nulle part. L'appel type est
 * `resolve(dict.fr, key)`, la clé venant toujours de la table ci-dessus.
 */
function resolve(tree, key) {
  return key.split(".").reduce((node, part) => node?.[part], tree);
}

/**
 * Les fichiers du dépôt sont écrits à largeur fixe : une citation peut y être
 * coupée par un retour à la ligne — c'est le cas de celle du journal. On ramène
 * donc toute suite de blancs à une espace simple, des deux côtés — et rien
 * d'autre. Ni la casse, ni la ponctuation, ni les apostrophes ne sont touchées :
 * les sources et le dictionnaire écrivent tous l'apostrophe droite, et
 * `ARRÊTE-TOI` est cité en capitales à dessein.
 */
function normalizeSpace(value) {
  return value.replace(/\s+/g, " ").trim();
}

/** Garde de cécité, partagée par la porte et par ses témoins. */
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
 * ensuite, et un message qui nomme la clé fautive. Le témoin d'écart l'appelle
 * avec une valeur écartée — c'est ce qui prouve que le message existe pour de vrai.
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

const KEYS = Object.keys(SOURCES);

/**
 * Les témoins tournent sur une seule clé : ils éprouvent les chemins de la règle,
 * pas les données. Prise de la table, jamais retapée.
 */
const [WITNESS_KEY] = KEYS;

describe("citations du chapitre « La méthode » — concordance avec leur fichier source", () => {
  // Un test par clé et par règle : le rouge doit dire laquelle des trois a dérivé
  // sans qu'on ouvre ce fichier.
  for (const key of KEYS) {
    it(`${key} — la valeur française se lit mot pour mot dans son fichier source`, () => {
      assertQuotedFromSource(key, resolve(dict.fr, key), readSource(key));
    });

    it(`${key} — la valeur anglaise est exactement la française, un artefact ne se traduit pas`, () => {
      expect(resolve(dict.en, key)).toBe(resolve(dict.fr, key));
    });
  }
});

describe("vivacité de la porte — chaque chemin bloquant porte son témoin", () => {
  it("garde de cécité : une source vide la fait lever, jamais passer au vert", () => {
    expect(() =>
      assertQuotedFromSource(WITNESS_KEY, resolve(dict.fr, WITNESS_KEY), readSource(WITNESS_KEY, "")),
    ).toThrow(/porte AVEUGLE/);
  });

  it("garde de cécité : une valeur de dictionnaire vide la fait lever aussi", () => {
    expect(() => assertQuotedFromSource(WITNESS_KEY, "", readSource(WITNESS_KEY))).toThrow(
      /porte AVEUGLE/,
    );
  });

  it("un caractère d'écart est vu, et le message nomme la clé fautive", () => {
    const drifted = `${resolve(dict.fr, WITNESS_KEY)}.`;
    expect(drifted).not.toBe(resolve(dict.fr, WITNESS_KEY));
    // Le discriminant est le motif propre à l'échec de comparaison. Assérer sur le
    // seul nom de la clé ne prouverait rien : les deux messages d'aveuglement le
    // portent aussi, et ce témoin resterait vert alors que la comparaison ne
    // tournerait plus. Le nom de la clé se vérifie donc en plus, pas à la place.
    expect(() => assertQuotedFromSource(WITNESS_KEY, drifted, readSource(WITNESS_KEY))).toThrow(
      /ne se lit plus mot pour mot/,
    );
    expect(() => assertQuotedFromSource(WITNESS_KEY, drifted, readSource(WITNESS_KEY))).toThrow(
      WITNESS_KEY,
    );
  });

  it("la normalisation ne touche que les blancs, jamais la casse ni la ponctuation", () => {
    expect(normalizeSpace("a  \n  b")).toBe("a b");
    expect(normalizeSpace("ARRÊTE-TOI et signale.")).toBe("ARRÊTE-TOI et signale.");
  });
});

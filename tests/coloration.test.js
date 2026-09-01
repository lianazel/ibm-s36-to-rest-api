/**
 * coloration.test.js — suite Vitest du module js/coloration.js.
 *
 * Les sources testées ne sont pas des échantillons écrits pour la circonstance :
 * ce sont les six valeurs réelles du dictionnaire (trois extraits × deux
 * langues), lues à la source. Les comptes attendus en ont été dérivés
 * mécaniquement le 1er septembre 2026 par la règle de découpage elle-même —
 * si une valeur `source` change, ces comptes deviennent faux et la porte
 * rougit. C'est l'effet voulu : la coloration suit le texte, elle ne le devine pas.
 *
 * Aucun DOM ici. `paintTokens` et `mountColoration` exigent un document, donc
 * une devDependency d'environnement et le prompt qui l'introduit ([W13]) : le
 * câblage est vérifié au navigateur, pas par cette suite.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { KEYWORDS, tokenizeCSharp } from "../js/coloration.js";
import { dict } from "../js/i18n.js";

/** Résolu depuis l'emplacement du test, jamais depuis le répertoire courant. */
const HTML_PATH = fileURLToPath(new URL("../index.html", import.meta.url));

/**
 * Les trois extraits C# de la section 3, chacun avec les comptes attendus.
 * Identiques en FR et en EN : les deux versions d'un extrait ne diffèrent que
 * par la langue de leurs commentaires et de leurs chaînes, jamais par le code.
 */
const EXTRAITS = [
  {
    nom: "code1",
    lire: (table) => table.section3.modele.code1.source,
    attendus: { c: 3, s: 6, k: 36, t: 16 },
  },
  {
    nom: "code2",
    lire: (table) => table.section3.modele.code2.source,
    attendus: { c: 1, s: 0, k: 12, t: 10 },
  },
  {
    nom: "code3",
    lire: (table) => table.section3.renversement.code3.source,
    attendus: { c: 8, s: 0, k: 29, t: 23 },
  },
];

const LANGUES = ["fr", "en"];

/** Les six sources réelles, aplaties en cas de test. */
const SOURCES = EXTRAITS.flatMap((extrait) =>
  LANGUES.map((lang) => ({
    ...extrait,
    lang,
    source: extrait.lire(dict[lang]),
  })),
);

/** Compte les jetons d'un type. Les `x` ne se comptent jamais : leur découpage est libre. */
const compter = (tokens, type) => tokens.filter((token) => token.type === type).length;

describe("tokenizeCSharp — invariant de conservation", () => {
  // La coloration n'ajoute, ne retire, ne réordonne rien : ce que le lecteur
  // copie depuis la page est ce que porte le dictionnaire. Tout le reste de la
  // suite ne vaut que si celui-ci tient.
  it.each(SOURCES)("$nom $lang : la concaténation des jetons est la source", ({ source }) => {
    const tokens = tokenizeCSharp(source);
    expect(tokens.map((token) => token.text).join("")).toBe(source);
  });

  it("un texte vide ne rend aucun jeton", () => {
    expect(tokenizeCSharp("")).toEqual([]);
  });
});

describe("tokenizeCSharp — comptes dérivés du dictionnaire", () => {
  it.each(SOURCES)("$nom $lang : commentaires, chaînes, mots-clés, PascalCase", ({ source, attendus }) => {
    const tokens = tokenizeCSharp(source);
    expect({
      c: compter(tokens, "c"),
      s: compter(tokens, "s"),
      k: compter(tokens, "k"),
      t: compter(tokens, "t"),
    }).toEqual(attendus);
  });
});

describe("tokenizeCSharp — forme des jetons", () => {
  it.each(SOURCES)("$nom $lang : chaque type tient sa promesse", ({ source }) => {
    const tokens = tokenizeCSharp(source);

    for (const token of tokens.filter((t) => t.type === "c")) {
      expect(token.text.startsWith("//")).toBe(true);
      // Un commentaire s'arrête à la fin de sa ligne : sans cela il avalerait
      // tout le reste de l'extrait, et les comptes ne le diraient pas.
      expect(token.text).not.toContain("\n");
    }

    for (const token of tokens.filter((t) => t.type === "s")) {
      expect(token.text.startsWith('"')).toBe(true);
      expect(token.text.endsWith('"')).toBe(true);
      expect(token.text.length).toBeGreaterThanOrEqual(2);
    }

    for (const token of tokens.filter((t) => t.type === "k")) {
      expect(KEYWORDS.has(token.text)).toBe(true);
    }

    for (const token of tokens.filter((t) => t.type === "t")) {
      expect(token.text).toMatch(/^[A-Z][A-Za-z0-9_]*$/);
    }

    // Ni mot-clé ni type ne peut porter d'espace ou de ponctuation : ce qui
    // sépare deux identifiants appartient toujours aux `x`.
    for (const token of tokens.filter((t) => t.type === "k" || t.type === "t")) {
      expect(token.text).toMatch(/^[A-Za-z0-9_]+$/);
    }
  });

  it("KEYWORDS est l'ensemble fermé attendu", () => {
    // Le compte est la garde : un mot ajouté déplacerait des jetons de « x »
    // vers « k » et périmerait les comptes ci-dessus sans que rien ne le dise.
    expect(KEYWORDS.size).toBe(41);
    expect(KEYWORDS.has("public")).toBe(true);
    expect(KEYWORDS.has("Dictionary")).toBe(false);
  });
});

describe("tokenizeCSharp — les deux pièges de priorité", () => {
  // L'ordre des alternatives de l'expression EST la règle : ces deux cas
  // seraient faux si l'un des deux délimiteurs était traité à part.
  it("un guillemet dans un commentaire reste dans le commentaire", () => {
    expect(tokenizeCSharp('// a "b" c')).toEqual([{ type: "c", text: '// a "b" c' }]);
  });

  it("un // dans une chaîne reste dans la chaîne", () => {
    const tokens = tokenizeCSharp('x = "http://a"; // y');
    expect(tokens.filter((token) => token.type !== "x")).toEqual([
      { type: "s", text: '"http://a"' },
      { type: "c", text: "// y" },
    ]);
  });
});

describe("tokenizeCSharp — preuve de morsure", () => {
  // Une porte se prouve par sa morsure, et dans la suite qui la porte : sans
  // ce cas, des comptes justes ne diraient pas que la règle regarde le texte.
  it("retirer les guillemets d'un nom S/36 déplace un jeton de chaîne vers PascalCase", () => {
    const source = dict.fr.section3.modele.code1.source;
    expect(source.match(/"NOMCLI"/g)).toHaveLength(1);

    const mordu = source.replace(/"NOMCLI"/g, "NOMCLI");
    const tokens = tokenizeCSharp(mordu);

    expect(compter(tokens, "s")).toBe(5);
    expect(compter(tokens, "t")).toBe(17);
    expect(tokens.map((token) => token.text).join("")).toBe(mordu);
  });
});

describe("index.html — les extraits marqués", () => {
  const html = readFileSync(HTML_PATH, "utf8");

  it("porte exactement trois data-code=\"csharp\"", () => {
    expect(html.match(/data-code="csharp"/g)).toHaveLength(3);
  });

  it("chaque marque est sur un <code> dont la clé se termine par .source", () => {
    const marques = [...html.matchAll(/<code\s+([^>]*data-code="csharp"[^>]*)>/g)];
    expect(marques).toHaveLength(3);

    for (const [, attributs] of marques) {
      const cle = /data-i18n="([^"]+)"/.exec(attributs);
      expect(cle).not.toBeNull();
      expect(cle[1].endsWith(".source")).toBe(true);
    }
  });

  it("charge le module de coloration", () => {
    expect(html).toContain('<script type="module" src="js/coloration.js"></script>');
  });
});

/**
 * partage.test.js — porte de concordance de la carte de partage (Open Graph, Twitter).
 *
 * Ce qu'elle ferme : les balises `og:*` et `twitter:*` du `<head>` recopient le
 * titre et la description anglais du dictionnaire. Une chaîne recopiée vit en
 * deux porteurs que rien ne tient d'accord — c'est la famille de [W62]. Le jour
 * où quelqu'un améliore `dict.en.meta.description` sans toucher au `<head>`,
 * cette porte rougit jusqu'à ce que la carte ait suivi.
 *
 * Côté EN seulement, et c'est le sujet : la carte est en anglais parce que les
 * robots qui la relèvent ne lancent pas le JavaScript. La bascule FR/EN ne les
 * atteint jamais, et une balise « bilingue » n'existe pas. Comparer au français
 * rendrait cette porte rouge à la naissance.
 *
 * Ce qu'elle NE fait PAS : elle ne regarde pas l'image (ni ses dimensions, ni
 * son poids, ni son contenu — seulement qu'un fichier existe à l'adresse
 * annoncée), elle ne joint aucun réseau, et elle ne dit rien de ce que LinkedIn
 * ou X afficheront réellement. Elle garde une concordance de chaînes dans le
 * dépôt, rien d'autre. Le rendu se vérifie après publication, à la main.
 */
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";

/** Résolus depuis l'emplacement du test, jamais depuis le répertoire courant. */
const HTML_PATH = fileURLToPath(new URL("../index.html", import.meta.url));
const IMAGE_PATH = fileURLToPath(new URL("../assets/og-card.png", import.meta.url));

/** Adresse publiée du site — celle que les robots suivront. */
const SITE_URL = "https://lianazel.github.io/ibm-s36-to-rest-api/";
const CARD_URL = "https://lianazel.github.io/ibm-s36-to-rest-api/assets/og-card.png";

/**
 * Plancher de cécité. Le `<head>` porte neuf balises de partage : cinq `og:`
 * et quatre `twitter:`. Sous neuf, l'extraction n'a pas vu la carte entière et
 * la porte doit rougir — un relevé cassé qui rend zéro passerait sinon au vert,
 * puisque toutes les assertions porteraient sur du vide.
 */
const MIN_TAGS = 9;

/**
 * Source injectable (paramètre par défaut) : sans cette couture, le chemin
 * d'échec de la garde de non-vacuité serait improuvable sans déplacer un
 * fichier du dépôt.
 */
function readHtml(path = HTML_PATH) {
  return readFileSync(path, "utf8");
}

/**
 * Le robot lit le DOM : le balisage laissé en commentaire n'existe pas pour
 * lui, et le bloc de la carte est justement précédé d'un commentaire.
 */
function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

/**
 * Les `content` sont écrits sans entité aujourd'hui. Le jour où une esperluette
 * entre dans le titre ou la description, le HTML portera `&amp;` là où le
 * dictionnaire porte `&` : sans ce décodage, la porte rougirait sur une carte
 * pourtant juste. Les cinq entités que HTML impose d'échapper suffisent.
 */
function decodeEntities(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * Relève les balises de partage d'un document, sans parseur tiers.
 *
 * `og:*` porte `property` et `twitter:*` porte `name` : ce n'est pas une
 * inconsistance du `<head>`, c'est la forme que ces deux conventions imposent.
 * Les trois formes de guillemets d'attribut admises par HTML sont couvertes, et
 * l'ordre des attributs n'est pas supposé — `content` peut précéder la clé.
 *
 * @returns {Record<string, string>} clé de balise → contenu
 */
function collectMeta(html) {
  // Construits à chaque appel : un littéral /g partagé garderait son `lastIndex`.
  const metaPattern = /<meta\b([^>]*)>/gi;
  const attrPattern = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  const tags = {};

  for (const meta of html.matchAll(metaPattern)) {
    const attributes = {};
    for (const attr of meta[1].matchAll(attrPattern)) {
      attributes[attr[1].toLowerCase()] = attr[2] ?? attr[3] ?? attr[4];
    }

    const key = attributes.property ?? attributes.name;
    if (key === undefined) continue;
    if (!key.startsWith("og:") && !key.startsWith("twitter:")) continue;

    tags[key] = decodeEntities(attributes.content ?? "");
  }
  return tags;
}

/** Garde de cécité, partagée par la porte et par son témoin. */
function assertNotBlind(tags) {
  expect(
    Object.keys(tags).length,
    "porte AVEUGLE : relevé vide ou HTML introuvable — la carte n'a pas été lue",
  ).toBeGreaterThanOrEqual(MIN_TAGS);
}

const pageTags = collectMeta(stripComments(readHtml()));

describe("carte de partage — concordance avec le dictionnaire anglais", () => {
  it("porte non vide : le <head> porte au moins neuf balises de partage", () => {
    assertNotBlind(pageTags);
  });

  it("og:title est exactement dict.en.site.title", () => {
    expect(pageTags["og:title"]).toBe(dict.en.site.title);
  });

  it("og:description est exactement dict.en.meta.description", () => {
    expect(pageTags["og:description"]).toBe(dict.en.meta.description);
  });

  it("les balises twitter reprennent exactement les og correspondantes", () => {
    expect(pageTags["twitter:title"]).toBe(pageTags["og:title"]);
    expect(pageTags["twitter:description"]).toBe(pageTags["og:description"]);
  });

  it("og:image et twitter:image désignent la même carte, à l'adresse publiée", () => {
    expect(pageTags["og:image"]).toBe(CARD_URL);
    expect(pageTags["twitter:image"]).toBe(pageTags["og:image"]);
  });

  it("le fichier que cette adresse désigne existe dans le dépôt", () => {
    // Une carte qui pointe un fichier absent s'affiche en carré gris, et rien
    // dans le HTML ne le dirait : seul le dépôt peut répondre.
    expect(existsSync(IMAGE_PATH), "assets/og-card.png est absent du dépôt").toBe(true);
  });

  it("og:url est l'adresse du site et og:type vaut website", () => {
    expect(pageTags["og:url"]).toBe(SITE_URL);
    expect(pageTags["og:type"]).toBe("website");
  });

  it("twitter:card demande la grande vignette", () => {
    expect(pageTags["twitter:card"]).toBe("summary_large_image");
  });
});

describe("vivacité de la porte — chaque chemin bloquant porte son témoin", () => {
  it("garde de cécité : un relevé vide la fait lever, jamais passer au vert", () => {
    const blind = collectMeta("<!doctype html><html><head></head><body></body></html>");
    expect(Object.keys(blind)).toHaveLength(0);
    expect(() => assertNotBlind(blind)).toThrow(/porte AVEUGLE/);
  });

  it("un titre écarté du dictionnaire est vu, et la balise fautive est nommée", () => {
    const drifted = collectMeta('<meta property="og:title" content="From S/36 files to a REST APO">');
    expect(drifted["og:title"]).not.toBe(dict.en.site.title);
    expect(() => expect(drifted["og:title"]).toBe(dict.en.site.title)).toThrow();
  });

  it("le balisage commenté n'est pas relevé — le robot ne le voit pas non plus", () => {
    const commented = stripComments('<!-- <meta property="og:title" content="fantôme"> -->');
    expect(collectMeta(commented)).toEqual({});
  });

  it("les trois formes de guillemets et l'ordre libre des attributs sont couverts", () => {
    const variants = collectMeta(
      '<meta content="a" property="og:type">' +
        "<meta property='og:url' content='b'>" +
        "<meta name=twitter:card content=c>",
    );
    expect(variants).toEqual({ "og:type": "a", "og:url": "b", "twitter:card": "c" });
  });

  it("une entité HTML est décodée avant comparaison", () => {
    const escaped = collectMeta('<meta property="og:title" content="S/36 &amp; IBM i">');
    expect(escaped["og:title"]).toBe("S/36 & IBM i");
  });
});

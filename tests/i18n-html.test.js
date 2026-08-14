/**
 * i18n-html.test.js — porte de résolution HTML → dictionnaire (dette W2).
 *
 * Ce qu'elle ferme : une faute de frappe dans un `data-i18n` d'`index.html`
 * produisait un élément vide à l'écran, sans qu'aucun test ne rougisse.
 *
 * Côté FR seulement : la porte de parité (`tests/i18n.test.js`, test « mêmes clés
 * exactement, récursivement, dans les deux sens ») garantit déjà que FR et EN
 * portent les mêmes clés — une clé qui résout dans `dict.fr` résout dans
 * `dict.en`, ou cette porte-là est rouge la première.
 *
 * La porte ATTESTE ce que fait `applyI18n` (`js/i18n.js`), elle ne prescrit
 * aucune forme de HTML : chaque règle ci-dessous cite le fait du code dont elle
 * découle. Si la résolution évolue là-bas, elle évolue ici — sans quoi la porte
 * mesurerait une sémantique morte.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";

/** Résolu depuis l'emplacement du test, jamais depuis le répertoire courant. */
const HTML_PATH = fileURLToPath(new URL("../index.html", import.meta.url));

/**
 * Plancher de cécité. `index.html` porte 23 références au 14 août 2026
 * (21 `data-i18n` + 2 `data-i18n-attr`), comptées hors commentaires HTML.
 * Sous 10, l'extraction n'a rien vu de crédible et la porte doit rougir.
 */
const MIN_REFS = 10;

/**
 * Source injectable (paramètre par défaut) : sans cette couture, le chemin
 * d'échec de la garde de non-vacuité serait improuvable sans déplacer un
 * fichier du dépôt. Un fichier absent échoue plus tôt, à la lecture, avec une
 * erreur qui nomme le chemin réellement lu.
 */
function readHtml(path = HTML_PATH) {
  return readFileSync(path, "utf8");
}

/**
 * `applyI18n` interroge le DOM (`querySelectorAll`) : le balisage laissé en
 * commentaire n'existe pas pour lui. Le signaler reviendrait à rapporter un
 * défaut qui ne peut pas se produire, et à interdire un exemple commenté.
 */
function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

/**
 * Relève les références i18n d'un document, sans parseur tiers.
 *
 * Les trois formes de guillemets d'attribut admises par HTML sont couvertes —
 * double, simple, et sans guillemets. Un contrôle qui n'en connaîtrait qu'une
 * laisserait passer les autres en silence, et son vert serait un angle mort.
 *
 * @returns {{attribute: "data-i18n"|"data-i18n-attr", raw: string}[]}
 */
function collectRefs(html) {
  // Construit à chaque appel : un littéral /g partagé garderait son `lastIndex`.
  const pattern = /data-i18n(-attr)?\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  const refs = [];
  for (const match of html.matchAll(pattern)) {
    refs.push({
      attribute: match[1] ? "data-i18n-attr" : "data-i18n",
      raw: match[2] ?? match[3] ?? match[4],
    });
  }
  return refs;
}

/**
 * Descente d'une clé pointée — copie conforme de `lookup` (`js/i18n.js`),
 * que le module n'exporte pas.
 */
function lookup(table, path) {
  return path
    .split(".")
    .reduce((node, part) => (node === undefined ? undefined : node[part]), table);
}

/**
 * Références qu'`applyI18n` laisserait sans effet — donc un élément vide à
 * l'écran, sans la moindre erreur. Chaque message nomme la clé fautive ET
 * l'attribut où elle apparaît.
 */
function findOrphans(html, table) {
  const problems = [];
  for (const { attribute, raw } of collectRefs(html)) {
    let key = raw;

    if (attribute === "data-i18n-attr") {
      // `const [attr, path] = ….split(":")` : le code ne lit que les deux
      // premiers segments — une seule paire est honorée, jamais plusieurs.
      // Un segment surnuméraire est inerte mais inoffensif : non signalé, la
      // porte atteste l'effet du code et ne légifère pas sur sa syntaxe.
      const [attr, path] = raw.split(":");
      // `attr && path ? … : undefined` : sans l'un des deux, rien n'est posé.
      if (!attr || !path) {
        problems.push(
          `${attribute}="${raw}" : paire « attribut:clé » incomplète, applyI18n ne pose rien`,
        );
        continue;
      }
      key = path;
    }

    const value = lookup(table, key);
    // `if (typeof text === "string")` : tout le reste n'écrit rien.
    if (value === undefined) {
      problems.push(`${attribute}="${raw}" : clé « ${key} » absente du dictionnaire`);
    } else if (typeof value !== "string") {
      problems.push(`${attribute}="${raw}" : clé « ${key} » désigne un groupe, pas un texte`);
    } else if (value.trim() === "") {
      problems.push(`${attribute}="${raw}" : clé « ${key} » résout sur une valeur vide`);
    }
  }
  return problems;
}

/** Garde de cécité, partagée par la porte et par son témoin. */
function assertNotBlind(refs) {
  expect(
    refs.length,
    "porte AVEUGLE : extraction vide ou HTML introuvable",
  ).toBeGreaterThanOrEqual(MIN_REFS);
}

const pageHtml = stripComments(readHtml());
const pageRefs = collectRefs(pageHtml);

describe("résolution HTML → dictionnaire (dette W2)", () => {
  it("porte non vide : index.html porte au moins 10 références i18n", () => {
    assertNotBlind(pageRefs);
  });

  it("chaque clé data-i18n / data-i18n-attr d'index.html résout dans dict.fr", () => {
    expect(findOrphans(pageHtml, dict.fr)).toEqual([]);
  });
});

describe("vivacité de la porte — chaque chemin bloquant porte son témoin", () => {
  it("garde de cécité : une extraction vide la fait lever, jamais passer au vert", () => {
    const blind = collectRefs("<!doctype html><html><body></body></html>");
    expect(blind).toHaveLength(0);
    expect(() => assertNotBlind(blind)).toThrow(/porte AVEUGLE/);
  });

  it("clé inexistante : signalée, nommée, avec l'attribut où elle apparaît", () => {
    const problems = findOrphans('<h2 data-i18n="section1.titre"></h2>', dict.fr);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('data-i18n="section1.titre"');
    expect(problems[0]).toContain("absente du dictionnaire");
  });

  it("clé désignant un groupe : signalée — applyI18n n'écrit que des chaînes", () => {
    const problems = findOrphans('<p data-i18n="nav"></p>', dict.fr);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("désigne un groupe");
  });

  it("valeur vide : signalée — l'élément resterait vide à l'écran", () => {
    // Table injectée : le dictionnaire réel n'a aucune valeur vide, la porte de
    // parité l'interdit déjà. Le chemin serait sinon sans cible où mordre.
    const problems = findOrphans('<p data-i18n="vide.ici"></p>', { vide: { ici: "   " } });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("résout sur une valeur vide");
  });

  it("data-i18n-attr incomplet : signalé, séparateur manquant comme chemin vide", () => {
    for (const raw of ["content", "content:"]) {
      const problems = findOrphans(`<meta data-i18n-attr="${raw}">`, dict.fr);
      expect(problems, raw).toHaveLength(1);
      expect(problems[0], raw).toContain("incomplète");
    }
  });
});

describe("couverture de l'extraction", () => {
  it("relève les trois formes de guillemets d'attribut", () => {
    const refs = collectRefs(
      `<p data-i18n="site.title"></p><p data-i18n='nav.decor'></p><p data-i18n=footer.notice></p>`,
    );
    expect(refs.map((ref) => ref.raw)).toEqual(["site.title", "nav.decor", "footer.notice"]);
  });

  it("ne confond pas data-i18n-attr avec data-i18n", () => {
    expect(collectRefs('<nav data-i18n-attr="aria-label:nav.aria"></nav>')).toEqual([
      { attribute: "data-i18n-attr", raw: "aria-label:nav.aria" },
    ]);
  });

  it("ignore le balisage en commentaire : le DOM ne le voit pas non plus", () => {
    const commented = '<!-- exemple : <p data-i18n="cle.inexistante"></p> -->';
    expect(collectRefs(stripComments(commented))).toEqual([]);
  });
});

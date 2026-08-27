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

/* ------------------------------------------------------- WCAG 2.5.3 « Label
   in Name » (niveau A) — relevé par la cinquième revue, tranché par le chef de
   projet le 27 août 2026. */

/**
 * Les entités des trois attributs et étiquettes en jeu, et elles seules.
 *
 * Un décodeur général serait une seconde implémentation du navigateur ; ici on
 * a besoin de trois entités, et les nommer rend la porte lisible. Si une
 * quatrième entre dans ces boutons, l'assertion rougit plutôt que de se
 * taire — c'est le bon sens de l'échec.
 */
function decodeEntities(text) {
  return text
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

/** Les boutons à signe : étiquette visible, nom accessible statique, clé i18n. */
function collectSignButtons(html) {
  const buttons = [...html.matchAll(/<button\b[^>]*class="signe"[^>]*>([\s\S]*?)<\/button>/g)];
  return buttons.map(([whole, inner]) => ({
    visible: decodeEntities(inner.trim()),
    ariaLabel: decodeEntities((whole.match(/aria-label="([^"]*)"/) ?? [, ""])[1]),
    key: (whole.match(/data-i18n-attr="aria-label:([^"]*)"/) ?? [, ""])[1],
  }));
}

describe("WCAG 2.5.3 « Label in Name » : les boutons à signe s'atteignent à la voix", () => {
  // Les trois boutons affichent `/>`, `&&`, `||` et portaient un nom accessible
  // ENTIÈREMENT DISJOINT de ce texte. Un utilisateur de commande vocale dit ce
  // qu'il voit : il ne pouvait atteindre aucun des trois. Le quatrième bouton
  // (« Envoyer ») ne pose pas la question — son libellé visible EST son nom.
  //
  // La porte tient les DEUX domiciles du nom : l'attribut statique d'`index.html`
  // (ce que lit un lecteur d'écran avant que `applyI18n` ne passe) et la valeur
  // du dictionnaire dans les deux langues (ce qu'il lit après). Une correction
  // qui n'aurait touché qu'un des deux laisserait la faute vivante la moitié du
  // temps, et c'est exactement la forme de défaut que cet incrément a livrée
  // trois fois.
  const boutons = collectSignButtons(stripComments(readHtml()));

  it("porte non vide : les trois boutons à signe sont bien relevés", () => {
    expect(boutons).toHaveLength(3);
    expect(boutons.map((bouton) => bouton.visible)).toEqual(["/>", "&&", "||"]);
    for (const { key } of boutons) {
      expect(key).not.toBe("");
    }
  });

  it("le nom accessible STATIQUE commence par l'étiquette visible", () => {
    for (const { visible, ariaLabel } of boutons) {
      expect(ariaLabel, visible).not.toBe("");
      expect(ariaLabel.startsWith(visible), `${visible} → « ${ariaLabel} »`).toBe(true);
    }
  });

  it.each(["fr", "en"])("le nom accessible TRADUIT commence par l'étiquette visible (%s)", (lang) => {
    for (const { visible, key } of boutons) {
      const valeur = key.split(".").reduce((noeud, part) => noeud?.[part], dict[lang]);
      expect(typeof valeur, `${lang}.${key}`).toBe("string");
      expect(valeur.startsWith(visible), `${lang}.${key} → « ${valeur} »`).toBe(true);
    }
  });

  it("le décodage d'entités couvre ce que ces boutons portent réellement", () => {
    // Sans ce témoin, un décodeur muet rendrait la comparaison vraie par
    // accident : `&amp;&amp;` ne commence par rien de ce qu'on croit lire.
    expect(decodeEntities("/&gt;")).toBe("/>");
    expect(decodeEntities("&amp;&amp;")).toBe("&&");
    expect(decodeEntities("&lt;a&gt;")).toBe("<a>");
  });
});

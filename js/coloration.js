/**
 * coloration.js — coloration des extraits C# de la section 3.
 *
 * Pourquoi un module et pas des balises dans le dictionnaire : `applyI18n`
 * (`js/i18n.js`) écrit les valeurs par `textContent`, jamais par `innerHTML` —
 * une balise placée dans une valeur s'afficherait en clair. La coloration se
 * pose donc APRÈS l'écriture du texte, par un découpage en jetons rejoué à
 * chaque `i18n:applied`, comme `js/menu.js` et `js/minilangage.js` se
 * resynchronisent déjà.
 *
 * Pourquoi pas une bibliothèque (highlight.js, Prism, Shiki) : le site tient à
 * zéro dépendance d'exécution — celle-là s'exécuterait chez le lecteur.
 *
 * Simplification assumée par rapport à Visual Studio : type et membre portent
 * UNE seule couleur. `Dictionary`, `Name` et `GetType` se colorent pareil ;
 * l'éditeur, lui, les distingue. Le découpage ne lit pas de sémantique C#, il
 * lit des formes.
 */

/**
 * Mots-clés reconnus — ensemble FERMÉ et volontairement court.
 *
 * Il ne vise pas la complétude du langage : il couvre ce que les trois extraits
 * emploient. En ajouter un déplacerait des jetons de `"x"` vers `"k"` et
 * périmerait les comptes attendus de `tests/coloration.test.js`, qui sont
 * dérivés du dictionnaire — c'est voulu : la porte doit voir la modification.
 */
export const KEYWORDS = new Set([
  "public", "private", "protected", "internal", "static", "sealed", "abstract",
  "class", "interface", "struct", "enum", "string", "int", "long", "bool",
  "object", "dynamic", "void", "var", "new", "foreach", "for", "in", "if",
  "else", "return", "get", "set", "null", "true", "false", "using",
  "namespace", "this", "is", "as", "out", "ref", "override", "readonly",
  "typeof",
]);

/**
 * Une seule expression, balayée de gauche à droite, première occurrence gagnante.
 *
 * L'ordre des alternatives EST la règle de priorité : un `"` rencontré dans un
 * commentaire reste dans le commentaire (le commentaire a commencé avant), et
 * un `//` rencontré dans une chaîne reste dans la chaîne. Rien de cela n'est
 * recodé à la main — l'alternance suffit, et c'est ce que vérifient les deux
 * cas-pièges de la suite de tests.
 */
const TOKEN = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*")|([A-Za-z_][A-Za-z0-9_]*)/g;

/**
 * Découpe une source C# en jetons colorables.
 *
 * Fonction pure : aucun accès au DOM, aucun état conservé d'un appel à l'autre.
 * INVARIANT ABSOLU, gardé par la suite de tests : la concaténation des `text`,
 * dans l'ordre, est égale à `source`, caractère pour caractère. La coloration
 * n'ajoute, ne retire, ne réordonne rien — ce qui se copie depuis la page est
 * exactement ce que porte le dictionnaire.
 *
 * @param {string} source Code C# à découper.
 * @returns {{type: string, text: string}[]} Jetons dans l'ordre du texte, où
 *   `type` vaut `"c"` (commentaire), `"s"` (chaîne), `"k"` (mot-clé),
 *   `"t"` (PascalCase, type ou membre) ou `"x"` (tout le reste, non coloré).
 */
export function tokenizeCSharp(source) {
  const tokens = [];
  let last = 0;
  let match;

  // Une expression globale porte un curseur (`lastIndex`) qui survit à l'appel :
  // le remettre à zéro à l'entrée est ce qui rend la fonction pure.
  TOKEN.lastIndex = 0;

  while ((match = TOKEN.exec(source)) !== null) {
    // Ce qui sépare deux occurrences n'est pas colorable : ponctuation, espaces,
    // chiffres. Son découpage est libre, aucun test ne compte les `"x"`.
    if (match.index > last) {
      tokens.push({ type: "x", text: source.slice(last, match.index) });
    }

    let type;
    if (match[1] !== undefined) {
      type = "c";
    } else if (match[2] !== undefined) {
      type = "s";
    } else if (KEYWORDS.has(match[3])) {
      type = "k";
    } else {
      // La majuscule initiale est le seul indice disponible sans analyse
      // sémantique : un identifiant en camelCase reste en encre.
      type = /^[A-Z]/.test(match[3]) ? "t" : "x";
    }

    tokens.push({ type, text: match[0] });
    last = match.index + match[0].length;
  }

  if (last < source.length) {
    tokens.push({ type: "x", text: source.slice(last) });
  }

  return tokens;
}

/**
 * Peint des jetons dans un élément, par nœuds DOM et jamais par `innerHTML`.
 *
 * Le texte des jetons vient du dictionnaire, mais il traverse ici un chemin qui
 * ne l'interprète jamais comme du balisage : `createTextNode` pose du texte, un
 * point. C'est la même garantie que celle d'`applyI18n`, tenue au même endroit.
 *
 * @param {Element} codeElement Élément à repeindre (son contenu est remplacé).
 * @param {{type: string, text: string}[]} tokens Jetons issus de `tokenizeCSharp`.
 */
export function paintTokens(codeElement, tokens) {
  codeElement.textContent = "";
  for (const token of tokens) {
    if (token.type === "x") {
      codeElement.append(document.createTextNode(token.text));
      continue;
    }
    const span = document.createElement("span");
    span.className = `cs-${token.type}`;
    span.append(document.createTextNode(token.text));
    codeElement.append(span);
  }
}

/**
 * Câble la coloration sur les extraits marqués `data-code="csharp"`.
 *
 * Deux moments, et le second est ce qui rend la coloration durable : la
 * peinture initiale, puis une repeinture à chaque `i18n:applied` — car
 * `applyI18n` vient alors de réécrire `textContent` à plat, effaçant les
 * `span` posés ici. Le texte relu est donc toujours celui de la langue
 * courante ; l'invariant de conservation garantit que le relire ne le déforme pas.
 *
 * @param {Document|Element} root Racine de recherche des extraits.
 */
export function mountColoration(root = document) {
  const blocks = [...root.querySelectorAll('code[data-code="csharp"]')];
  if (blocks.length === 0) return;

  const paintAll = () => {
    for (const block of blocks) {
      paintTokens(block, tokenizeCSharp(block.textContent));
    }
  };

  document.addEventListener("i18n:applied", paintAll);
  paintAll();
}

/* ---- Câblage navigateur (inerte sous Vitest : pas de DOM en node).
   L'amorçage d'`i18n.js` a déjà eu lieu quand ce module s'évalue — le premier
   `i18n:applied` est passé, et la première peinture se fait ici. Même
   précédent que le câblage de `js/menu.js`. */
if (typeof document !== "undefined") mountColoration();

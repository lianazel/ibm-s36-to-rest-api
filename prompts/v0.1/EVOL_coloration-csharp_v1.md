# EVOL — Coloration des trois extraits C# de la section 3, sans dépendance

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_coloration-csharp_v1.md` · **Ligne du fil** : ligne « Coloration C# » (voir ÉTAPE 0)
**Taille** : petit incrément de mise en scène avec **un module neuf** (`js/coloration.js`, une fonction
pure et son câblage), **une suite de tests neuve**, quatre règles CSS et quatre jetons, un attribut sur
trois éléments d'`index.html`. **Aucune dépendance**, aucune valeur du dictionnaire modifiée.

**Troisième de trois prompts** issus de la maquette du 1er septembre 2026 (session 25). Il passe
**après** `EVOL_habillage_v1` (les cadres sont déjà sur fond doux `#f4f4f4` : c'est sur ce fond que les
contrastes ci-dessous sont mesurés).

> **Palette arrêtée par le chef de projet le 1er septembre 2026 — « VS brun ».** Une seule variante
> est écrite à l'ÉTAPE 4 ; les variantes « maison » et « VS clair intégral » sont retirées du prompt et
> ne se réintroduisent pas. **Le motif de l'arbitrage, mesuré le jour même** : la chaîne de Visual
> Studio *clair* est `#a31515`, teinte 35,9° ; le rouge de refus du mini-langage est `#a2191f`,
> teinte 32,5° — **3,4° d'écart, ΔE CIE76 5,5** : une couleur, deux sens sur la même page. La chaîne
> de Visual Studio *sombre* est `#d69d85` (teinte 49,0°, échantillonnée au pixel sur une capture
> d'éditeur), mais elle ne rend que **2,12:1** sur `#f4f4f4`. La valeur retenue, `#8b4513`, garde la
> teinte du brun sombre (57,2°) à une clarté qui tient sur fond clair : **6,45:1**, et **ΔE 28,0**
> avec le rouge de refus. Le dev .Net reconnaît sa palette ; le lecteur IBM i ne voit pas deux fois
> la même couleur pour deux sens différents.
>
> **Le sombre est refusé pour les cadres de code**, arbitrage du même jour : `--color-bg-ia-dark`
> (`#262626`) est posé par l'incrément « Habillage » (0.1.24) comme **seul sombre du site**, et c'est
> ce qui rend le registre IA visible. Mesuré : la palette VS sombre native passerait AA sur ce fond
> (`#569cd6` 5,13:1, `#4ec9b0` 7,43:1, `#d69d85` 6,50:1, `#6a9955` 4,54:1) — ce n'est donc pas la
> lisibilité qui tranche, c'est le contrat : un deuxième sombre dépense le signal du premier.

## Satellites consultés

`CLAUDE.md` (« Stack » : zéro dépendance d'exécution ; « Style du produit » : Plex Mono pour le code,
registre API ; « Conventions » : code en anglais, commentaires en français) · `SECURITY_METHOD` §3.3
(la raison de ne **pas** prendre une bibliothèque de coloration) · `UX_METHOD` (contraste AA).

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_coloration-csharp_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre : `CLAUDE.md` et `tasks/ROADMAP.md` (ligne « Coloration C# » du fil). **Pourquoi un module
et pas des balises dans le dictionnaire** : `applyI18n` écrit les valeurs par `textContent`
(`grep -o 'innerHTML' js/i18n.js | wc -l` = 0, et c'est une règle du site) — une balise dans une valeur
s'afficherait en clair. La coloration se pose donc **après** l'écriture du texte, par un découpage en
jetons rejoué à chaque `i18n:applied`, comme `js/menu.js` et `js/minilangage.js` se resynchronisent déjà.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 1er septembre 2026 sur `main` à `32f4e04` (0.1.22) ; les valeurs du dictionnaire
qui servent ici n'ont pas de raison d'avoir bougé depuis, **vérifie-le** (point 6).

1. `git checkout main`. Version **0.1.24** au manifeste (les deux prompts précédents sont atterris ;
   sinon ARRÊTE-TOI). `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 26` (mesuré le 1er septembre 2026 : l'habillage a cloturé en session 26, non 25 — le prompt le disait avant que `12 ter` n'atterrisse).
3. Le fil porte la ligne : `grep -c 'Coloration C#' tasks/ROADMAP.md` ≥ 1.
4. `npm test` vert sur `main` (**356/356**). `ls tests` : six fichiers, aucun `coloration.test.js`.
5. `ls js` : `i18n.js`, `menu.js`, `minilangage.js`, `s36.js` — aucun `coloration.js`.
   `grep -c 'coloration' index.html css/styles.css js/i18n.js` = **0** sur les trois.
6. Les trois extraits, leurs clés et leur forme : `grep -n 'code1.source\|code2.source\|code3.source' index.html`
   imprime **trois** lignes, chacune `<pre tabindex="0" role="region" aria-labelledby="codeN-legende"><code data-i18n="…"></code></pre>`,
   sans autre attribut sur `code`. Et `grep -o 'data-code=' index.html | wc -l` = **0**.
   Les six valeurs `source` (trois clés × deux langues) ont, **découpées par la règle de l'ÉTAPE 2**,
   ces comptes de jetons — dérivés **mécaniquement** le 1er septembre 2026 sur le texte réel du
   dictionnaire, identiques en FR et en EN :
   `code1` : commentaires **3**, chaînes **6**, mots-clés **36**, PascalCase **16** ;
   `code2` : **1**, **0**, **12**, **10** ; `code3` : **8**, **0**, **29**, **23**.
   Ces comptes sont les attendus de la suite de tests (ÉTAPE 5) ; si le dictionnaire a changé, ils
   sont faux : ARRÊTE-TOI et signale plutôt que d'ajuster les tests.
7. Les cadres sont sur fond doux : `grep -A10 '^\.extrait pre {' css/styles.css | grep -c 'background: var(--color-bg-soft)'` = **1**.
8. `grep -o '<script' index.html | wc -l` = **2** (`i18n.js`, `menu.js`, modules).
9. La police : Plex Mono existe en **400 et 700** (`grep -c 'IBMPlexMono-Bold' css/styles.css` = 1),
   et **aucune italique** n'existe dans la fonderie — la palette retenue ne joue que sur la couleur :
   aucune règle `.cs-*` ne demandera ni graisse ni italique.

## Contexte et périmètre

Demande du chef de projet du 1er septembre 2026 : « pour le code C#, est-il possible de récupérer la
colorisation de Visual Studio ? ». Oui, à trois conditions posées par le site : **zéro dépendance**
(pas de bibliothèque de coloration, même en devDependency : elle s'exécuterait chez le lecteur),
**aucun HTML dans le dictionnaire**, et **contraste AA** sur le fond des cadres.

**Ce que la coloration couvre** : les **trois** extraits C# de la section 3 (`code1`, `code2`,
`code3`), dans les deux langues. **Rien d'autre** — ni le JSON ni les requêtes SQL du mini-langage
(ils ont leur propre rendu, `js/minilangage.js`), ni les tableaux de l'annexe.

**Quatre classes de jetons, et la règle de découpage qui fait foi** (ÉTAPE 2) : commentaire (`//`
jusqu'à la fin de ligne), chaîne (`"…"`), mot-clé (liste fermée), PascalCase (type **ou membre** —
une seule couleur pour `Dictionary`, `Name`, `GetType` : c'est une simplification assumée par rapport
à Visual Studio, qui distingue les deux ; la dire dans le commentaire du module). Tout le reste reste
en encre.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/coloration-csharp`. `.pipeline/spec.md`. Puis le premier commit ci-dessus.

## ÉTAPE 2 — Livrable A : `js/coloration.js`

Module ES, code en anglais, commentaires en français, même en-tête de fichier que `js/s36.js`.

**A1 — `tokenizeCSharp(source)`**, fonction **pure**, exportée. Elle rend un tableau de
`{ type, text }` où `type` ∈ `"c"` (commentaire), `"s"` (chaîne), `"k"` (mot-clé), `"t"` (PascalCase),
`"x"` (le reste). **Invariant absolu** : la concaténation des `text`, dans l'ordre, **est égale** à
`source`, caractère pour caractère — la coloration n'ajoute, ne retire, ne réordonne rien.

Règle de découpage, **une seule expression**, balayage de gauche à droite, la première occurrence
l'emporte :

```js
const TOKEN = /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*")|([A-Za-z_][A-Za-z0-9_]*)/g;
```

- groupe 1 → `"c"` ; groupe 2 → `"s"` ; groupe 3 : si le mot est dans `KEYWORDS` → `"k"`, sinon s'il
  commence par une majuscule → `"t"`, sinon `"x"` ; ce qui sépare deux occurrences → `"x"`.
- `KEYWORDS`, exporté, **exactement** cet ensemble et pas un mot de plus (les comptes du point 6 en
  dépendent) : `public private protected internal static sealed abstract class interface struct enum
  string int long bool object dynamic void var new foreach for in if else return get set null true
  false using namespace this is as out ref override readonly typeof`.
- Un `"` dans un commentaire reste dans le commentaire (le commentaire commence avant) ; un `//` dans
  une chaîne reste dans la chaîne. C'est ce que donne l'alternance ; ne le recode pas à la main.

**A2 — `paintTokens(codeElement, tokens)`**, exportée. Vide l'élément (`textContent = ""`), puis, pour
chaque jeton : un nœud texte (`createTextNode`) pour `"x"`, un `<span class="cs-<type>">` portant un
nœud texte pour les quatre autres. **Jamais `innerHTML`** (preuve 6).

**A3 — `mountColoration(root = document)`**, exportée. Pour chaque `code[data-code="csharp"]` de
`root` : peindre **maintenant** depuis `textContent` (le premier `i18n:applied` est déjà passé quand ce
module s'évalue, même précédent que `js/menu.js`), puis, sur chaque `i18n:applied` du `document`,
relire `textContent` (qu'`applyI18n` vient de réécrire à plat) et repeindre.

**A4 — amorçage** : en fin de module, `if (typeof document !== "undefined") mountColoration();` —
inerte sous Vitest, comme l'amorçage de `js/i18n.js`. Le câblage lui-même n'est gardé par aucune
porte ([W13], même famille) : le dire dans `changes.md`.

## ÉTAPE 3 — Livrable B : `index.html`

- Sur les trois `code` des extraits `code1`, `code2`, `code3` : ajouter `data-code="csharp"`. Rien sur
  les quatre `code` du mini-langage.
- Dans `<head>`, après `js/menu.js` : `<script type="module" src="js/coloration.js"></script>`. La CSP
  du document (`default-src 'self'`) l'autorise ; ne la modifie pas.

## ÉTAPE 4 — Livrable C : jetons et règles CSS — **UNE variante, choisie par le chef de projet**

Dans `:root`, après les jetons de l'habillage, quatre jetons avec leur contraste **sur `#f4f4f4`**
(le fond des cadres), mesurés le 1er septembre 2026 — tu les remesures (preuve 8). Puis quatre règles
après `.extrait pre`.

### La palette — « VS brun » (variante unique, arrêtée le 1er septembre 2026)

```css
  --code-motcle: #0000ff;       /* mot-clé — VS clair ; 7,81:1 sur #f4f4f4 */
  --code-type: #0e6e8c;         /* type ou membre — VS clair #2b91af recalé (3,31:1 → 5,26:1) */
  --code-chaine: #8b4513;       /* chaîne — la teinte du brun de VS sombre (#d69d85, 49,0°) descendue à 57,2°/6,45:1 pour fond clair ; ΔE 28,0 avec le rouge de refus #a2191f, là où le rouge de VS clair #a31515 n'était qu'à ΔE 5,5 */
  --code-commentaire: #0a7a0a;  /* commentaire — VS clair #008000 recalé (4,67:1 → 5,02:1) */
```
```css
.cs-k { color: var(--code-motcle); }
.cs-t { color: var(--code-type); }
.cs-s { color: var(--code-chaine); }
.cs-c { color: var(--code-commentaire); }
```

Un commentaire de bloc au-dessus des règles nomme la variante (« VS brun ») et la date de
l'arbitrage (1er septembre 2026). **Aucune autre variante dans la feuille** (preuve 5) : ni
`font-weight` sur `.cs-k`, ni `var(--color-s36)` sur `.cs-s`.

## ÉTAPE 5 — Livrable D : `tests/coloration.test.js`

Vitest, même en-tête que `tests/s36.test.js`. Importe `tokenizeCSharp`, `KEYWORDS` depuis
`../js/coloration.js` et `dict` depuis `../js/i18n.js`. **Aucun DOM** : `paintTokens` et
`mountColoration` ne sont pas testés ici (ils exigent un document — [W13]).

1. **Invariant de conservation**, sur les **six** sources réelles (`dict.fr|en.section3.modele.code1.source`,
   `…code2.source`, `dict.fr|en.section3.renversement.code3.source`) : `tokens.map(t => t.text).join("") === source`.
2. **Comptes attendus**, par source, sur les types `c`, `s`, `k`, `t` (les `x` ne se comptent pas :
   leur découpage est libre) — exactement les comptes du prérequis 6, pour FR **et** EN.
3. **Forme des jetons** : tout `c` commence par `//` et ne contient pas `\n` ; tout `s` commence et
   finit par `"` ; tout `k` est dans `KEYWORDS` ; tout `t` vérifie `/^[A-Z][A-Za-z0-9_]*$/` ; aucun `k`
   ni `t` ne contient autre chose que `[A-Za-z0-9_]`.
4. **Les deux pièges** : `tokenizeCSharp('// a "b" c')` rend un seul jeton `c` ;
   `tokenizeCSharp('x = "http://a"; // y')` rend une chaîne `"http://a"` puis un commentaire `// y`.
5. **Vivacité** (leçon du 14 août 2026 : une porte se prouve par sa morsure, ici *dans* la suite) : sur
   une copie de `code1` FR où `"NOMCLI"` est remplacé par `NOMCLI` (sans guillemets), le compte des
   chaînes vaut **5** et celui des PascalCase **17** — la porte voit la différence.
6. **Structure** : `index.html` porte exactement **3** `data-code="csharp"`, tous sur un `<code`
   dont le `data-i18n` se termine par `.source` — lecture du fichier comme le fait
   `tests/i18n-html.test.js` (réutilise sa façon de lire, pas son extracteur).

## ÉTAPE 6 — Livrable E : le fil

**Aucun geste sur `tasks/ROADMAP.md`.** Aucune dette n'est remboursée ici ; l'état de la ligne est le
geste manuel du chef de projet ([W24]). Ne renumérote rien.

## ÉTAPE 7 — Preuves

1. `ls js tests` : `js/coloration.js` et `tests/coloration.test.js` existent.
2. `grep -o 'data-code="csharp"' index.html | wc -l` = **3** · `grep -o '<script' index.html | wc -l` = **3**.
3. `grep -c 'export function tokenizeCSharp\|export function paintTokens\|export function mountColoration\|export const KEYWORDS' js/coloration.js` = **4**.
4. `grep -c '^  --code-' css/styles.css` = **4** · `grep -c '^\.cs-' css/styles.css` = **4**.
5. **Une seule variante** : `grep -c '#0000ff' css/styles.css` = **1** · `grep -c '#8b4513' css/styles.css` = **1** ·
   `grep -c '#a31515' css/styles.css` = **0** (le rouge de VS clair n'entre pas) ·
   `grep -c 'font-weight: 700' css/styles.css` = **2** (inchangé — base mesurée le 1er septembre 2026).
6. `grep -o 'innerHTML' js/coloration.js js/i18n.js | wc -l` = **0**.
7. `npm test` : **356 + N** tests verts, `N` ≥ 6 (le nombre exact est celui de ta suite ; écris-le dans
   `test-results.md`). **Aucun** test existant modifié : `git diff --stat tests/` ne montre que
   `tests/coloration.test.js`.
8. Contrastes remesurés (script de l'habillage, preuve 9) pour les paires de la variante retenue, sur
   `#f4f4f4` : ±0,05 des valeurs écrites. Écris ce que tu mesures.
9. `git diff --stat` ne touche que `js/coloration.js`, `tests/coloration.test.js`, `index.html`,
   `css/styles.css` (plus le prompt). `js/i18n.js` **intouché**.
10. **Vérification au navigateur** : les trois extraits sont colorés au chargement, **restent colorés
    après une bascule de langue** (FR → EN → FR), et le texte sélectionné-copié d'un extrait est
    identique à la valeur du dictionnaire (l'invariant, vu à l'écran). Les quatre cadres du
    mini-langage ne sont **pas** touchés. Note-le dans `changes.md`.

## ÉTAPE 8 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis : `feat(solution): les trois extraits C# sont colorés par un découpage en jetons maison, sans dépendance, rejoué à chaque bascule de langue`
- **Délègue la revue au subagent `reviewer`.** `SHIP` avec des `WARN` : n'y touche pas, écris READY.
  `NEEDS_WORK` : corrige, commite, relance sur le nouveau commit ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL coloration-csharp — <ISO> — feat/coloration-csharp — tests <X/X>`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `js/coloration.js` : fonction pure conforme à la règle de découpage, `KEYWORDS` exact, peinture sans
   `innerHTML`, câblage sur `i18n:applied` avec peinture initiale.
2. Trois `data-code="csharp"`, un `<script type="module">` de plus, CSP intacte.
3. Une seule variante de palette, jetons commentés avec contraste remesuré, quatre règles `.cs-*`.
4. Suite neuve : conservation, comptes, forme, pièges, morsure, structure — verte ; suite existante
   intouchée.
5. `js/i18n.js` et `tasks/ROADMAP.md` intouchés ; aucune valeur du dictionnaire modifiée.
6. Câblage vu au navigateur, y compris après bascule de langue.
7. `review.json` en SHIP pour ce commit ; READY en dernier.

## Hors périmètre — à ne pas traiter, dette par dette

- **Les extraits du mini-langage** (classe C# générée, JSON, deux requêtes SQL) : ils ont leur rendu
  dans `js/minilangage.js`. L'asymétrie qui en résulte — mesurée sur la maquette du 1er septembre
  2026 : 61, 23 et 60 `span` sur les trois extraits de la section 3, **0** sur `#mini-classe` — est
  **assumée par arbitrage du chef de projet du même jour**, et non subie : la section 3 est le coin
  du développeur .Net, qui reconnaît sa palette ; la section 4 montre à tout lecteur une classe
  **fabriquée sous ses yeux**, et le texte brut dit qu'elle sort de la machine, pas d'un éditeur.
  Colorer la classe générée resterait un incrément à inscrire.
- **La distinction type / membre** de Visual Studio : simplification assumée, dite au commentaire.
- **Une bibliothèque de coloration** (highlight.js, Prism, Shiki…) : non, même en devDependency.
- **Toute retouche des valeurs `source`** du dictionnaire ([W21] : gabarits à la colonne 1) : intouchées.
- **La casse des propriétés C#** (arbitrage en attente, « Décisions actées ») : rien ici.
- **[W20]/`GetType()` sans garde** : la prose de la section 3 s'en charge déjà.
- **Une porte DOM pour `paintTokens`** : exige un environnement DOM, donc une devDependency et son
  prompt (`SECURITY_METHOD` §3.3, piste R&D de [W32]).
- **Les dettes des lignes 13 et 14**, **l'écart `CDEMST`**, **l'état de la ligne au fil**.

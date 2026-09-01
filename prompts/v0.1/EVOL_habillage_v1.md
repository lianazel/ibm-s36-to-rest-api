# EVOL — Habillage : les trois registres rendus visibles, sans excès

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_habillage_v1.md` · **Ligne du fil** : ligne « Habillage » (voir ÉTAPE 0)
**Taille** : incrément de mise en scène, moyen. **Six jetons** de couleur, une quinzaine de règles CSS,
**onze clés par langue** (six chapeaux, cinq pour le bloc à deux voix), six `p` et une `figure` dans
`index.html`. **Aucun script, aucune image, aucune dépendance.** Rembourse **[W18]** et **[W45]**.

**Deuxième de trois prompts** issus de la maquette d'habillage validée par le chef de projet le
1er septembre 2026 (session 25, `../Etude_Technique/MAQUETTE_habillage_v1.html`, hors dépôt — tout
ce qui en est nécessaire est reproduit ici). Il passe **après** `EVOL_deploiement-et-referentiel_v1`
(le chapeau de la section 3 dit « prototype testé en réel » : le bloc qui le prouve doit être atterri)
et **avant** `EVOL_coloration-csharp_v1`.

## Satellites consultés

`CLAUDE.md` (« Style du produit » — le contrat de design, dont ce prompt construit le **troisième
registre**, jamais construit depuis la session 5 ; « Anonymisation » ; « Conventions ») ·
`STYLE_METHOD` (S-3 : rien ne range le S/36 au passé) · `UX_METHOD` (mobile-first ; contraste AA
partout ; §4 capacités par media query) · `VISION_METHOD` (la validation visuelle reste au chef de projet).

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_habillage_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre : `CLAUDE.md` (« Style du produit ») et `tasks/ROADMAP.md` (ligne « Habillage » du fil,
dettes [W18] et [W45]). La ligne 13 « Mise en scène » du fil **n'est pas** cet incrément : elle est
un **remboursement** de dettes nommées ; celui-ci est une **création** bornée par la maquette. Ce
qui n'est pas écrit ici n'entre pas, même si c'est « à côté » — voir « Hors périmètre ».

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 1er septembre 2026 sur `main` à `32f4e04` (0.1.22), **avant** l'atterrissage du
prompt précédent. Les comptages marqués **(base)** se **remesurent** à cette étape et se notent dans
`.pipeline/spec.md` : les preuves de l'ÉTAPE 7 sont écrites en **écart** par rapport à eux, pas en
valeur absolue — c'est la leçon du 1er septembre 2026 ([W40]) appliquée d'avance.

1. `git checkout main`. Version **0.1.23** au manifeste (le prompt précédent est atterri ; si tu lis
   0.1.22, il ne l'est pas : ARRÊTE-TOI). `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 25`.
3. Le fil porte la ligne et les deux dettes : `grep -c 'Habillage' tasks/ROADMAP.md` ≥ 1 ·
   `grep -c '\[W45\]' tasks/ROADMAP.md` ≥ 1. Si 0 : ARRÊTE-TOI.
4. `npm test` vert sur `main` (**356/356**).
5. Le prompt précédent a bien livré ses points d'ancrage :
   `grep -o 'data-i18n="section3.deploiement' index.html | wc -l` = **2** ·
   `grep -o 'data-i18n="section5.prive' index.html | wc -l` = **1**.
6. Rien de ce que cet incrément écrit n'existe : `grep -c 'chapeau' js/i18n.js index.html css/styles.css`
   = **0** sur les trois · `grep -c 'dialogue' js/i18n.js index.html css/styles.css` = **0** sur les trois ·
   `grep -c 'color-ia' css/styles.css` = **0** · `grep -c '#262626' css/styles.css` = **0** ·
   `grep -c '\.disclaimer' css/styles.css` = **0** ([W18] : la classe est posée dans `index.html`,
   `grep -o 'class="disclaimer"' index.html | wc -l` = **1**, et aucune règle ne la cible).
7. `#mini-filtre` ne déclare pas son fond ([W45]) : la règle `#mini-filtre {` de `css/styles.css` ne
   contient ni `background` ni `color:` — vérifie par lecture du bloc.
8. Jetons : `grep -c '^  --color-' css/styles.css` = **8**. Section : la règle `section {` porte
   `border-bottom: 1px solid var(--color-line)` et `padding: calc(var(--space) * 2) 0`.
9. **(base)** occurrences dans `index.html` : `data-i18n="` (attendu **233** si le prompt précédent a
   livré ce qu'il prescrit) · `id="` (attendu **62**) · `<figure` · `<pre` (attendu **7**) ·
   `role="region"` (attendus **15** et **17**, mesurés sur `32f4e04` — le prompt précédent n'en ajoute
   aucun) ; et dans `css/styles.css` : `grep -c 'background: var(--color-ink)'` (attendu **2**,
   le bouton « Envoyer » actif et sa trace d'appui). Note les six valeurs lues.
10. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0** — les valeurs du dictionnaire sont du texte. Le
    bloc à deux voix se construit donc en HTML statique avec des `span` à clés, jamais en HTML dans
    une valeur.
11. La fonderie couvre le point médian « · » (U+00B7) que les chapeaux emploient — **mesuré le
    1er septembre 2026 en décodant le `cmap` des quatre sous-ensembles Plex (`fontTools` + `brotli`)** :
    présent dans les quatre. Si tu disposes de `fontTools`, rejoue :
    `python3 -c "from fontTools.ttLib import TTFont;import glob;[print(f, 0xB7 in TTFont(f).getBestCmap()) for f in glob.glob('assets/fonts/*.woff2')]"`
    → quatre `True`. Sinon, note dans `changes.md` que la mesure est reprise du prompt, non rejouée.

## Contexte et périmètre

Le chef de projet trouve le site « trop austère » et veut le rendre « un peu plus beau, sans excès ».
Diagnostic posé le 1er septembre 2026 sur la page publiée : le contrat de design promet **trois
registres** ; le bleu S/36 et le vert API n'apparaissent qu'aux dessins de la section 3, à mi-page,
et le **registre IA n'existe pas** (`css/styles.css` définit `--color-s36` et `--color-api`, aucun
jeton IA, aucun fond sombre). L'austérité n'est pas un défaut de goût, c'est un contrat non tenu.

La maquette validée fait **six choses, et rien d'autre** :

- **A.** Un **chapeau de registre** au-dessus de chaque titre de section : une ligne en Plex Mono
  espacé, précédée d'un court filet à la couleur du registre. *(Capitalisée à l'origine ; la
  capitalisation est retirée par l'avenant 1 — elle rendait « IBM i » en « IBM I ».)* Le registre est une
  **information** du contrat (dans quel âge le lecteur se trouve), pas un décor.
- **B.** L'**accroche** en bandeau : fond bleu très clair (celui des tableaux de l'annexe), filet gauche
  épais bleu S/36 — le motif des cadres de code, repris. Largeur : celle de la colonne de lecture.
- **C.** Le **rythme vertical** : les filets gris entre sections disparaissent, remplacés par de
  l'espace et le chapeau ; les `h2` de `main` grandissent.
- **D.** Les **cadres de code** sur le fond doux existant (`--color-bg-soft`) au lieu de blanc sur blanc.
- **E.** Le **registre IA**, construit tel que le contrat le décrit : en section 5, un bloc à deux
  voix — consigne du chef de projet en Plex Sans sur clair, trace de l'agent en Plex Mono sur bloc
  sombre, **seul usage du sombre autorisé**. Contenu : **artefacts réels et committés** du dépôt,
  cités mot pour mot. Trois jetons neufs et leur ligne de contraste au commentaire — sans elle on
  reproduit la dette `--color-line` de la session 22.
- **F.** Le **pied de page** : un filet haut, la mention de marques en plus petit — ce qui donne
  enfin une règle à `.disclaimer` ([W18]). Et le champ « Filtre » déclare son fond ([W45]).

**Ce que le contrat interdit et que ce prompt n'écrit donc pas** : mode sombre, dégradés, images,
iconographie, arrondis, toute esthétique rétro. Le sombre n'existe **qu'à un endroit** : le bloc de
l'agent (preuve 10).

**Arbitrages du chef de projet, 1er septembre 2026, tous inscrits au fil :** le texte des six
chapeaux (« R&D » sur le mini-langage : le troisième niveau de la ligne 8 rendu visible ; « prototype
testé en réel » sur la section 3, porté par le bloc « Déploiement » ; « IBM S/36 · RPG II » sur
l'annexe, valable dans les deux langues) ; le chapeau **nomme, il ne plaide pas** — la formule longue
« prototype opérationnel car testé en réel » (58 caractères) passait sur deux lignes à 390 px, la
courte (41) tient sur une (326 px mesurés).

**À valider par le chef de projet avant le gel — les deux artefacts cités par le bloc IA** (§E3).
Ils sont proposés, pas arbitrés. Si le gel intervient sans autre mot, ils valent.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/habillage`. `.pipeline/spec.md` (avec les cinq **(base)** relevées). Puis le premier commit.

## ÉTAPE 2 — Livrable A : les jetons

Dans `css/styles.css`, bloc `:root`, **après** `--color-api` et avant `--font-sans`, six jetons, chacun
avec sa ligne de contraste au commentaire. Valeurs **mesurées le 1er septembre 2026, formule WCAG** ;
tu les **remesures** (preuve 9) et tu écris ce que tu mesures, pas ce que tu lis ici.

```css
  --color-ia: #6929c4;           /* violet — registre IA ; 7,74:1 sur blanc, 7,02:1 sur --color-bg-ia-soft */
  --color-bg-ia-soft: #f6f2ff;   /* consigne du chef de projet ; #161616 16,43:1, #6929c4 7,02:1 */
  --color-bg-ia-dark: #262626;   /* trace de l'agent — SEUL usage du sombre (contrat) ; #f4f4f4 13,76:1, #c6c6c6 8,86:1, #d4bbff 8,90:1 */
  --color-ink-on-dark: #f4f4f4;  /* encre sur le bloc sombre ; 13,76:1 */
  --color-ia-on-dark: #d4bbff;   /* étiquette de voix sur le bloc sombre ; 8,90:1 */
  --color-bg-s36-soft: #edf5ff;  /* bandeau d'accroche ; #161616 16,46:1 — même teinte que les tableaux de l'annexe, qui gardent leur littéral */
```

Le commentaire d'en-tête du bloc de jetons (« Deux gris de fond, et non un seul… ») reste ; ajoute
en dessous, en une phrase : *le registre IA a un fond sombre et un seul, celui de la trace de l'agent
(contrat, « seul usage du sombre autorisé ») ; rien d'autre ne le réemploie.*

## ÉTAPE 3 — Livrable B : les six chapeaux (dictionnaire + HTML + CSS)

**B1 — dictionnaire.** Une clé `chapeau` par groupe de section, **en tête du groupe, avant `title`**,
dans les deux langues :

| Clé | FR | EN |
|---|---|---|
| `section1.chapeau` | `S/36 · IBM i` | `S/36 · IBM i` |
| `section2.chapeau` | `S/36 · IBM i` | `S/36 · IBM i` |
| `section3.chapeau` | `API REST · .Net · prototype testé en réel` | `REST API · .Net · prototype tested for real` |
| `section4.chapeau` | `API REST · .Net · R&D` | `REST API · .Net · R&D` |
| `section5.chapeau` | `IA · Harnais TWAIM` | `AI · TWAIM harness` |
| `annexe.chapeau` | `IBM S/36 · RPG II` | `IBM S/36 · RPG II` |

Le séparateur est le **point médian** U+00B7, encadré d'espaces ordinaires. Trois valeurs sont
**identiques dans les deux langues** (`section1`, `section2`, `annexe`) : duplication **voulue et
déclarée au fil** ([W25]), un commentaire d'une ligne au-dessus de chacune côté EN le dit.

**B2 — HTML.** Dans chacune des six sections de `main`, **immédiatement avant le `h2`** :

```html
      <p class="chapeau" data-i18n="section1.chapeau"></p>
```

(et `section2`, `section3`, `section4`, `section5`, `annexe`). Dans `#decor`, le chapeau vient donc
**après** `p.tagline` et avant le `h2`. Un `p`, pas un `span` dans le `h2` : le nom accessible des
sections (`aria-labelledby` → `h2`) ne doit pas changer. La section `about` du panneau **n'a pas** de
chapeau.

**B3 — CSS.** Une règle par section pour le registre, puis le chapeau :

```css
/* ---- Les trois registres, portés par la couleur de leur chapeau. Le registre
   est une information du contrat (« Style du produit »), pas un décor. */
#decor, #probleme, #annexe   { --registre: var(--color-s36); }
#solution, #mini-langage     { --registre: var(--color-api); }
#methode                     { --registre: var(--color-ia); }

.chapeau {
  width: fit-content;
  margin: 0 0 0.75rem;
  padding-top: 0.6rem;
  border-top: 3px solid var(--registre);
  color: var(--registre);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Contraste des chapeaux : leur couleur est celle du jeton de registre sur fond blanc — 5,00:1 (S/36),
5,02:1 (API), 7,74:1 (IA), déjà au commentaire des jetons ; AA texte, tous trois.

## ÉTAPE 4 — Livrable C : accroche, rythme, cadres, pied de page, champ

Dans `css/styles.css`, **modifications de règles existantes** (ne crée pas de doublon : modifie la
règle en place, et garde son commentaire s'il en a un) :

- `section` : retirer `border-bottom: 1px solid var(--color-line)` ; `padding` →
  `calc(var(--space) * 3) 0 calc(var(--space) * 2)`. Ajouter juste après :
  `#decor { padding-top: var(--space); }` (le bandeau ne doit pas flotter sous l'en-tête).
- `h1, h2` reste. Ajouter `main h2 { margin: 0 0 var(--space); font-size: 1.75rem; letter-spacing: -0.01em; text-wrap: balance; }`
  — **`main h2`**, pas `h2` : le titre d'« À propos » dans le panneau ne bouge pas.
- `main h3 { margin-top: calc(var(--space) * 2); font-size: 1.125rem; }` et
  `main h3 + .sous-titre { margin-top: calc(var(--space) / -1.5); }` (le sous-titre reste collé à son titre).
- `.tagline` → 
  ```css
  .tagline {
    margin: 0 0 calc(var(--space) * 2);
    padding: calc(var(--space) * 1.5) calc(var(--space) * 1.25);
    border-left: 4px solid var(--color-s36);
    background: var(--color-bg-s36-soft);
    font-size: clamp(1.375rem, 1.15rem + 1vw, 1.625rem);
    font-weight: 600;
    line-height: 1.3;
    text-wrap: balance;
  }
  ```
- `.extrait pre` : `border: 1px solid transparent` (à la place de `var(--color-line)`), le
  `border-left` vert reste, ajouter `background: var(--color-bg-soft)`.
- `.site-footer` : ajouter `margin-top: calc(var(--space) * 2); border-top: 1px solid var(--color-line);`.
- Ajouter `.disclaimer { font-size: 0.8125rem; }` juste après `.site-footer` — **[W18] remboursée** :
  la classe posée en session 13 a enfin une règle. Commentaire d'une ligne qui le dit.
- `#mini-filtre` : ajouter `background: var(--color-bg); color: var(--color-ink);` — **[W45]
  remboursée**. Commentaire : *sans fond déclaré, le champ suit le `color-scheme` de l'hôte et devient
  noir sous un thème sombre (vu le 1er septembre 2026 dans la maquette hébergée ; le site publié le
  rendait blanc parce qu'il ne déclare pas de `color-scheme`).*

Rien d'autre dans la feuille ne change : pas `.boite`, pas `.dessin`, pas `.fichier`, pas le
simulateur, pas le panneau (preuve 11).

## ÉTAPE 5 — Livrable D : le registre IA en section 5

**E1 — les cinq clés**, groupe `dialogue` dans `section5`, **après `prive`** et avant `depot`, ordre
`legende`, `voix1`, `consigne`, `voix2`, `trace` :

- `section5.dialogue.legende`
  FR : `Deux voix du harnais, telles qu'elles vivent dans le dépôt : la consigne du chef de projet, puis la trace laissée par l'agent. Citées mot pour mot, en français.`
  EN : `Two voices of the harness, as they live in the repository: the project lead's instruction, then the trace the agent left. Quoted word for word, in French.`
- `section5.dialogue.voix1` — FR : `Chef de projet · prompts/v0.1` · EN : `Project lead · prompts/v0.1`
- `section5.dialogue.consigne` — **identique dans les deux langues**, citation exacte du prompt de
  l'incrément 12 (`prompts/v0.1/EVOL_limites-modele-dynamique_v1.md`, section « Contexte et
  périmètre », première phrase, graisse retirée) :
  `Demande du chef de projet du 30 août 2026, sur le site publié en 0.1.21 : la section 3 montre le modèle dynamique et s'arrête sur « il restait une étape » ; elle ne dit nulle part ce que le modèle ne sait pas faire.`
  **Vérifie la citation à la source** (preuve 6) : si le fichier dit autre chose, c'est le fichier qui
  a raison — corrige la valeur et signale-le dans `changes.md`.
- `section5.dialogue.voix2` — FR : `Claude Code · git log` · EN : `Claude Code · git log`
- `section5.dialogue.trace` — **identique dans les deux langues**, **deux lignes** séparées par `\n`,
  chacune au format `<sha court> <sujet>` tel que `git log --format='%h %s'` l'imprime :
  ligne 1 : le premier commit de la branche de l'incrément 12, dont le sujet est
  `docs(prompt): prompts/v0.1/EVOL_limites-modele-dynamique_v1.md` ;
  ligne 2 : le commit de fusion `e616623`.
  Tu **lis** ces deux lignes dans le dépôt (`git log --all --format='%h %s' --grep='docs(prompt): prompts/v0.1/EVOL_limites-modele-dynamique_v1.md'`
  et `git log -1 --format='%h %s' e616623`) et tu les recopies **telles quelles**. Si le premier
  grep rend zéro ou plusieurs lignes : ARRÊTE-TOI et signale — le contenu doit être un artefact réel,
  pas une reconstitution.

**Arbitrage inscrit** : ces citations portent des chiffres (une date, deux versions, deux sha). La
règle de la ligne 11 (« aucun chiffre publié » en section 5) vise les **comptes** que rien ne
remettrait à jour ; un artefact cité mot pour mot est daté **par nature**, et la légende le dit. Aucun
compte (tests, prompts, leçons) n'entre dans le bloc : `356/356` n'y figure pas.

**E2 — HTML.** Dans `<section id="methode">`, **après** `<p data-i18n="section5.prive"></p>` et
**avant** le commentaire `<!-- Le dépôt d'abord … -->` :

```html
      <figure class="dialogue">
        <figcaption id="dialogue-legende" data-i18n="section5.dialogue.legende"></figcaption>
        <p class="consigne">
          <span class="voix" data-i18n="section5.dialogue.voix1"></span>
          <span data-i18n="section5.dialogue.consigne"></span>
        </p>
        <pre class="agent" tabindex="0" role="region" aria-labelledby="dialogue-legende"><code><span class="voix" data-i18n="section5.dialogue.voix2"></span><span data-i18n="section5.dialogue.trace"></span></code></pre>
      </figure>
```

Le `pre` suit le motif des extraits ([W19] : `tabindex="0" role="region" aria-labelledby`) parce qu'il
défile horizontalement sur petit écran. Pas d'espace ni de retour à la ligne entre `<pre>`, `<code>`
et le premier `span` : dans un `pre`, ils s'afficheraient.

**E3 — CSS**, après les règles des extraits :

```css
/* ---- Registre IA (contrat, « le dialogue à deux voix ») : consigne du chef de
   projet en Plex Sans sur clair, trace de l'agent en Plex Mono sur bloc sombre —
   le SEUL usage du sombre du site. Contenu : artefacts réels et committés, cités. */
.dialogue { margin: calc(var(--space) * 1.5) 0; }
.dialogue figcaption {
  margin-bottom: calc(var(--space) / 2);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}
.dialogue .consigne,
.dialogue .agent { border-left: 3px solid var(--color-ia); }
.dialogue .consigne {
  margin: 0;
  padding: var(--space);
  background: var(--color-bg-ia-soft);
}
.dialogue .agent {
  margin: 0;
  padding: var(--space);
  overflow-x: auto;
  background: var(--color-bg-ia-dark);
  color: var(--color-ink-on-dark);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
}
.dialogue .voix {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-ia);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.dialogue .agent .voix { color: var(--color-ia-on-dark); }
```

## ÉTAPE 6 — Livrable E : le fil

Dans `tasks/ROADMAP.md`, **deux gestes et pas un de plus** : en tête des entrées **[W18]** et
**[W45]** (après `- **[W18]**` / `- **[W45]**`), la mention `**Remboursée le <date> par l'incrément
« Habillage »**` avec, pour [W18], « `.disclaimer` porte une règle » et, pour [W45], « `#mini-filtre`
déclare fond et encre ». Énoncés d'origine conservés en dessous. **Ne touche pas à l'état de la
ligne** (« à venir », [W24]). Ne renumérote rien.

## ÉTAPE 7 — Preuves

Lance chaque commande. Les preuves en **écart** se calculent sur les **(base)** notées à l'ÉTAPE 0.

1. `grep -o 'class="chapeau"' index.html | wc -l` = **6** · `grep -c 'chapeau:' js/i18n.js` = **12**
   (six par langue) · `grep -c 'dialogue: {' js/i18n.js` = **2**.
2. Ordre : `grep -n 'class="chapeau"\|<h2 id=' index.html` imprime **treize** lignes : le `h2`
   d'« À propos » seul (aucun chapeau avant lui), puis six paires *chapeau puis h2*, chaque chapeau
   une ligne avant son `h2`. `grep -c 'about.chapeau' index.html js/i18n.js` = **0** sur les deux.
3. `data-i18n="` = **(base) + 11** · `id="` = **(base) + 1** (`dialogue-legende`) · `<figure` =
   **(base) + 1** · `<pre` = **(base) + 1** · `role="region"` = **(base) + 1**.
4. `grep -c '^  --color-' css/styles.css` = **14** (8 + 6). `grep -c '#262626' css/styles.css` = **1**
   (le jeton, et lui seul).
5. `grep -c 'border-bottom: 1px solid var(--color-line)' css/styles.css` = **1** (l'en-tête ; la
   section ne l'a plus) · `grep -c '^\.disclaimer' css/styles.css` = **1** · `grep -c '^main h2' css/styles.css` = **1**
   · `grep -c '^h2 {\|^h2,' css/styles.css` = **1**, **inchangé** (la règle `h1,` / `h2 {` existante ;
   aucune règle `h2` nue ajoutée — la tienne est `main h2`).
6. La citation est exacte : `grep -c "elle ne dit nulle part \*\*ce que le" prompts/v0.1/EVOL_limites-modele-dynamique_v1.md` = **1**
   (la source, avec sa graisse), et
   `node -e "import('./js/i18n.js').then(m=>{const c=m.dict.fr.section5.dialogue.consigne;console.log(c===m.dict.en.section5.dialogue.consigne, c.endsWith('ce que le modèle ne sait pas faire.'), c.includes('**'))})"`
   imprime `true true false`.
7. La trace est un artefact réel : `node -e "import('./js/i18n.js').then(m=>console.log(m.dict.fr.section5.dialogue.trace))"`
   imprime deux lignes ; la première, passée à `git log --all --format='%h %s' | grep -Fx -- "<ligne 1>"`,
   rend **1** ; la seconde de même. FR et EN identiques (compare comme en 6).
8. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0**. `grep -o ' je ' js/i18n.js | wc -l` = **7**, inchangé.
9. Contrastes **remesurés** (formule WCAG 2.x, luminance relative) pour les six paires écrites aux
   commentaires des jetons : chaque valeur à ±0,05 de celle écrite. Écris **ce que tu mesures**.
   Script suggéré : `node -e "const L=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};const R=(a,b)=>{const x=L(a),y=L(b);return ((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};for(const [a,b] of [['#6929c4','#ffffff'],['#6929c4','#f6f2ff'],['#161616','#f6f2ff'],['#f4f4f4','#262626'],['#d4bbff','#262626'],['#161616','#edf5ff']])console.log(a,b,R(a,b))"`
10. **Un seul sombre** : `grep -c 'color-bg-ia-dark' css/styles.css` = **2** (la définition, l'usage
    dans `.dialogue .agent`). Aucun autre fond sombre : `grep -c 'background: var(--color-ink)' css/styles.css`
    = la valeur lue à l'ÉTAPE 0 (le bouton « Envoyer » et l'appui, déjà là ; **inchangée**).
11. `git diff --stat` ne touche que `css/styles.css`, `js/i18n.js`, `index.html`, `tasks/ROADMAP.md`
    (plus le prompt). Dans `css/styles.css`, `git diff` ne montre **aucune** ligne modifiée dans les
    blocs `.boite`, `.dessin`, `.fichier`, `.champ`, `.exemples`, `.nav-panel`, `.about` — lis le diff.
12. `npm test` : **356/356**, tests intouchés.
13. **Vérification au navigateur, deux largeurs** (390 px et ≥ 1200 px), langue FR puis EN : les six
    chapeaux tiennent sur **une ligne** à 390 px (le plus long, EN section 3, 43 caractères) ; le
    bandeau ne déborde pas ; le bloc IA se lit, son `pre` défile dans son cadre sans faire défiler la
    page (`document.documentElement.scrollWidth` ≤ `innerWidth`) ; « Filtre » est blanc sous
    `prefers-color-scheme: dark` (émulé). Note les mesures dans `changes.md`. **La validation
    visuelle sur appareil reste au chef de projet** — le READY ne la remplace pas.

## ÉTAPE 8 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`css/styles.css`, `js/i18n.js`, `index.html`, `tasks/ROADMAP.md`) :
  `feat(habillage): chapeaux de registre, accroche en bandeau, cadres sur fond doux, registre IA à deux voix en section 5 ; [W18] et [W45] remboursées`
- **Délègue la revue au subagent `reviewer`.** Affiche `verdict` et `reservations` tels quels. `SHIP`
  avec des `WARN` : n'y touche pas, écris READY. `NEEDS_WORK` : corrige, commite, relance le
  `reviewer` sur le nouveau commit ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL habillage — <ISO> — feat/habillage — tests 356/356`.
- **STOP. Ne merge rien, ne pousse rien.** La passe d'appareil du chef de projet vient après.

## Critères d'acceptation

1. Six jetons avec leur ligne de contraste, remesurée ; `#262626` n'apparaît qu'une fois.
2. Six chapeaux, valeurs exactes, un `p.chapeau` avant chaque `h2` de `main`, aucun dans `about`.
3. Bandeau, rythme, `main h2`/`main h3`, cadres, pied de page, `.disclaimer`, `#mini-filtre` : les
   règles prescrites, modifiées en place, rien d'autre dans la feuille.
4. Bloc à deux voix en section 5 : cinq clés, citations **vérifiées à la source**, `pre` région
   nommée, un seul fond sombre.
5. [W18] et [W45] marquées remboursées ; état de la ligne non touché.
6. Suite verte 356/356, comptages et écarts de l'ÉTAPE 7 conformes, câblage vu à deux largeurs.
7. `review.json` en SHIP pour ce commit ; READY en dernier.

## Hors périmètre — à ne pas traiter, dette par dette

- **Tout ce que porte la ligne 13 « Mise en scène »** et qui n'est pas nommé ici : Plex Mono des
  commandes en ligne, indice de défilement des cadres ([W23]), [W5], [W8], [W12], [W13], [W29],
  [W30], le plafond du tableau `CDEMST`. **Ne pas « harmoniser au passage »** : c'est précisément ce
  que cet incrément doit s'interdire.
- **Les dettes qui visent la mise en scène au registre** : [W26] (rangées d'écho), [W27] (classe
  `.api` muette — non, ne lui donne pas de règle ici), [W28] (`role="list"`), [W35], [W39]
  (`target="_blank"`), [W41]-[W43] (la flèche), [W44]. Toutes à la ligne 13, par arbitrage.
- **La coloration du C#** : prompt suivant.
- **Le littéral `#edf5ff` des tableaux de l'annexe** : il garde son littéral ; le remplacer par le
  jeton serait une harmonisation.
- **Un chapeau sur « À propos »** : le panneau n'est pas une section du récit.
- **Le contenu des chapeaux** au-delà des six valeurs (numéros de section, dates) : les sections ne
  sont pas numérotées dans le texte, un numéro serait un décor.
- **Tout second usage du sombre**, y compris un thème sombre du site : le contrat ne le permet pas.
- **La mesure VoiceOver** (six objets) : le chapeau et le bloc IA y ajoutent deux objets à noter dans
  `changes.md` — ce qu'un lecteur d'écran fait d'un `p` en Plex Mono espacé avant un titre, et du
  `pre` région du bloc IA. Elle attend un humain ; ce n'est pas à toi de la faire.
- **L'écart `CDEMST`**, **le mini-langage**, **les dettes de l'incrément 9** : intouchés.
- **L'état de la ligne au fil** : geste manuel du chef de projet à l'ouverture suivante.

## Avenant 1 — 1er septembre 2026, après la passe iPhone 14, machine à l'arrêt

**`READY` posé, puis retiré avant d'écrire une ligne.** La revue `SHIP` sur `38c37c4` est sciemment
invalidée : le chef de projet en paie une seconde passe. Ordre imposé : retrait du `READY`, puis le
travail, puis le `reviewer` sur le nouveau commit, puis `READY` réécrit en dernier.

### A — Le chapeau perd sa capitalisation

**Motif, et il vient du rendu, pas du goût.** `text-transform: uppercase` sur `.chapeau` (ÉTAPE 3,
livrable B3) transforme **« IBM i » en « IBM I »** — sur un site dont le sujet *est* IBM i, et dont
le contrat de design refuse tout ce qui range cette machine ailleurs qu'au présent. Vu à l'écran d'un
iPhone 14, chapeaux du décor et du problème.

**Le geste, et il est d'une ligne** : retirer `text-transform: uppercase;` de la règle `.chapeau` de
`css/styles.css`. Le Plex Mono, l'interlettrage de `0.08em` et le filet de registre tiennent le
registre sans les capitales.

**Aucune valeur du dictionnaire ne change** — arbitrage explicite du chef de projet : écrire les
capitales en dur dans `js/i18n.js` mettrait **du style dans la donnée**. Le dictionnaire dit ce que
le chapeau *nomme* ; la feuille dit comment il se *rend*.

**Mesure du chef de projet, portée ici pour que la preuve 13 ne se rejoue pas à blanc** : Plex Mono
étant à **chasse fixe**, les six largeurs sont **identiques avec ou sans la règle**, à 320 px comme
à 390 px. Aucune mise en page ne bouge. Remesure et écris ce que tu mesures.

### B — Les mentions que cet avenant périme

1. **ÉTAPE 3, B3** : la ligne `text-transform: uppercase;` du bloc CSS prescrit est **révoquée**.
   Le reste de la règle est inchangé.
2. **ÉTAPE 7, preuve 13** : la formule « les six chapeaux tiennent sur **une ligne** à 390 px » reste
   vraie et se rejoue ; elle se rejoue **après** le retrait, et la mesure porte désormais aussi sur
   **320 px**.
3. **Hors périmètre, mesure VoiceOver** : « ce qu'un lecteur d'écran fait d'un `p` en **capitales
   espacées** avant un titre » se lit désormais « d'un `p` en Plex Mono espacé avant un titre ».
   L'objet de la mesure ne change pas, sa description si.

### C — Ce que cet avenant ne touche pas

- **`.dialogue .voix`** garde son `text-transform: uppercase` : hors de cet avenant, qui ne vise que
  `.chapeau`. *(Le même mécanisme y capitalise `prompts/v0.1` et `git log` — un chemin et une
  commande. Signalé au chef de projet, non traité ici.)*
- **« .Net » reste « .Net »** dans les valeurs : l'écart avec la graphie Microsoft « .NET » est un
  sujet de **contenu**, pas de cet incrément.
- **Les six valeurs de chapeau**, mot pour mot, dans les deux langues.
- Tout le reste du hors-périmètre du prompt, inchangé.

### D — Preuves de l'avenant 1

1. `grep -c 'text-transform: uppercase' css/styles.css` = **la valeur d'avant moins 1** (mesure
   l'avant, ne le suppose pas) ; et la règle `.chapeau` n'en porte plus, lue dans son bloc.
2. `grep -c 'chapeau:' js/i18n.js` = **12**, **inchangé** · `git diff` sur `js/i18n.js` = **vide** :
   aucune valeur du dictionnaire n'a bougé.
3. `grep -o 'data-i18n="' index.html | wc -l` = **244**, inchangé · `git diff` sur `index.html` =
   **vide**.
4. **Au navigateur, quatre relevés** (320 px et 390 px, FR puis EN) : les six chapeaux sur **une
   ligne**, et les six largeurs **identiques** à celles mesurées avant le retrait. Écris les deux
   séries.
5. `npm test` : **356/356**, tests intouchés (la garde de `section4` reste à 134).
6. `git diff --stat` ne touche que `css/styles.css` et ce prompt.

## Avenant 2 — 1er septembre 2026, groupé, le dernier — machine à l'arrêt

**`READY` retiré avant d'écrire une ligne.** La revue `SHIP` sur `675609e` est sciemment invalidée :
le chef de projet en paie une troisième passe. Ordre imposé, identique à l'avenant 1 : retrait du
`READY`, le travail, le `reviewer` sur le nouveau commit, `READY` réécrit en dernier.

### A — L'étiquette de voix perd sa capitalisation, comme le chapeau

**Motif.** `text-transform: uppercase` sur `.dialogue .voix` capitalise `prompts/v0.1` en
`PROMPTS/V0.1` — **un chemin réel, dont la casse compte** — et `git log` en `GIT LOG`, **qui n'est
pas une commande**. Or c'est le registre dont le contrat de design exige des artefacts **« cités mot
pour mot »**. La faute est celle de l'avenant 1, une règle plus bas : la feuille réécrivait ce que la
citation disait.

**Le geste, une ligne** : retirer `text-transform: uppercase;` de `.dialogue .voix`. Après quoi la
feuille ne porte **plus aucun** `text-transform`.

**Aucune valeur du dictionnaire ne change** — même arbitrage qu'à l'avenant 1 : la casse est de la
donnée, pas du style.

**Même mesure qu'à l'avenant 1** : `.voix` est en Plex Mono, à chasse fixe. Les largeurs sont
attendues **identiques** avant et après. Remesure et écris ce que tu mesures ; vérifie en particulier
que le `pre.agent` ne change pas de largeur de défilement.

### B — Les deux mentions du prompt, recalées pour de bon

L'avenant 1 §B3 **annonçait** le recalage de la mention VoiceOver sans jamais toucher la ligne, et
n'avait pas vu la seconde. Les deux sont réécrites **en place**, cette fois :

1. **l. 84**, « Contexte et périmètre », définition du livrable A : « une ligne en Plex Mono,
   **capitales espacées** » devient « une ligne en Plex Mono **espacé** », suivie d'une incise qui
   trace la formulation révoquée et son motif.
2. **l. 408**, hors périmètre, mesure VoiceOver : « un `p` en **capitales espacées** avant un titre »
   devient « un `p` en **Plex Mono espacé** avant un titre ».

C'est la règle du dépôt public : un prompt committé décrit ce que la page publiée fait, ou il ment
aux deux.

**La mesure porte sur le corps du prompt, pas sur les avenants** : ceux-ci **citent** la formulation
révoquée, c'est leur travail. Compter tout le fichier ferait mordre la garde sur la trace elle-même —
la faute de la preuve D1 de l'avenant 1, deux fois de suite dans le même incrément.

### C — Ce que cet avenant ne touche pas

- **Le chapeau de la section 3 à 320 px**, qui tient sur deux lignes dans les deux langues : le
  remède toucherait une **valeur arbitrée**, donc un arbitrage de contenu. **Part au fil comme
  dette**, ne se corrige pas ici.
- **« .Net »**, les six valeurs de chapeau, les cinq clés du bloc à deux voix : intouchées.
- Les 11 réserves ouvertes des deux revues précédentes, et tout le hors-périmètre du prompt.

### D — Preuves de l'avenant 2

1. `grep -c 'text-transform' css/styles.css` = **0**. La feuille n'en porte plus aucune.
2. Corps du prompt, avenants exclus :
   `sed -n '1,/^## Avenant 1/p' prompts/v0.1/EVOL_habillage_v1.md | grep -c 'capitales espacées'`
   = **0** (la mesure d'avant vaut 2 : l. 84 et l. 408). Sur le fichier entier le compte n'est **pas**
   nul, et ne doit pas l'être : les avenants citent ce qu'ils révoquent.
3. `git diff` sur `js/i18n.js` et sur `index.html` depuis `675609e` = **vide** l'un et l'autre ·
   `grep -c 'voix' js/i18n.js` inchangé (mesure l'avant).
4. **Au navigateur** : les deux étiquettes `.voix` rendent `Chef de projet · prompts/v0.1` et
   `Claude Code · git log` dans leur casse d'origine ; leurs largeurs et celle de défilement du
   `pre.agent` sont **identiques** à l'avant. Écris les deux séries.
5. `npm test` : **356/356**, tests intouchés.
6. `git diff --stat` ne touche que `css/styles.css` et ce prompt.

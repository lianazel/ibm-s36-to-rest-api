# EVOL — Finitions du 3 septembre : la boîte du déploiement en trois points, un fond sous les deux messages du mini-langage, le bouton « autre fichier » et son aide, le sommaire du menu

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_finitions_v1.md` · **Ligne du fil** : `12 quinquies`, « Finitions » (voir ÉTAPE 0)
**Taille** : petit incrément, quatre gestes de finition réunis (précédent : `12 bis`, deux gestes homogènes).
**Trois fichiers** : `js/i18n.js` (six clés remplacées par langue), `index.html` (deux blocs réécrits, deux commentaires corrigés), `css/styles.css` (un jeton, seize règles ajoutées ou modifiées, un commentaire corrigé). **Aucun script, aucune image, aucun test modifié.** Rembourse **[W46]** et **[W47]**.

**Quatrième prompt né de la relecture du site publié par le chef de projet**, le 3 septembre 2026 (session 27 Cowork), sur `0.1.25`. Il passe **avant** la ligne 13 « Mise en scène » : ce sont des retouches vues à l'écran, pas la mise en scène du contrat, et la ligne 13 interdit l'harmonisation au passage.

## Satellites consultés (Core §8.1, table de déclenchement)

`CLAUDE.md` (« Style du produit », « UX », « Anonymisation », « Règles de sécurité ») · `UX_METHOD` (§1 mobile-first ; §3.5 et §3.7 : le panneau reste en flux sans JavaScript, un seul `render()` — non touché ; §4 : le survol sous `@media (hover: hover)`, jamais par user-agent) · `STYLE_METHOD` + profil (S-1 : aucun tiret cadratin dans les valeurs neuves ; S-4 : le vocabulaire s'adresse) · `VISION_METHOD` (le dépôt n'a pas Playwright et **aucune installation n'est possible** : seul le palier 2, tunnel et appareil réel, existe — il reste au chef de projet). Aucune porte créée ni modifiée : `ASSURANCE_METHOD` couche A n'est pas déclenchée. La maquette qui a arbitré le menu (`../Etude_Technique/MAQUETTE_menu_v3.html`, variante **A**) est **hors dépôt** : tout ce qu'il en faut est reproduit ici, tu n'as pas à l'ouvrir.

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_finitions_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre : `CLAUDE.md` (dont sa section « Règles de sécurité » : tu n'installes rien, tu ne joins pas le réseau, tu ne pousses rien) et `tasks/ROADMAP.md`, ligne `12 quinquies` du fil, inscrite par le chef de projet avant ton lancement.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 3 septembre 2026 sur `main` à `4df3856`, par lecture de fichiers.

1. `git checkout main`. Version **0.1.25** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 28`.
3. Le fil porte la ligne de cet incrément : `grep -c 'Finitions' tasks/ROADMAP.md` ≥ 1. Si 0, le fil n'est pas à jour : ARRÊTE-TOI.
4. `npm test` vert sur `main`. Dernier compte connu : **382/382** (`review.json` du 2 septembre, commit `ca621dd`), **non remesuré depuis** : si le total diffère, inscris-le dans `spec.md` et continue tant que tout est vert.
5. Bases de comptage `index.html`, **occurrences** (`grep -o MOTIF index.html | wc -l`) :
   `data-i18n="` **244** · `data-i18n-attr="` **11** · `<h3` **19** · `id="` **63** · `<details` **5** ·
   `class="boite"` **2** · `<ul` **5** · `<li` **36** · `<span` **19** · `class="arguments"` **2** ·
   `role="list"` **4** · `class="chapeau"` **6** · `chapeau"` **12** (6 `class`, 6 `data-i18n`) · `data-i18n="nav.` **6** ·
   `<p data-i18n="section3.deploiement.p1"` **1** · `class="statut"` **1** · `class="aide"` **1**.
6. Le menu, tel qu'il est : `sed -n '46,53p' index.html` imprime le `<ul>` et six `<li><a href="#…" data-i18n="nav.…"></a></li>`, dans l'ordre `decor`, `probleme`, `solution`, `mini-langage`, `methode`, `annexe`. `js/menu.js` l. 112 referme le panneau sur `event.target.closest('a[href^="#"]')` : un clic sur un enfant du lien remonte au lien. **Ne touche pas à `js/menu.js`.**
7. Bases `js/i18n.js` (`grep -o MOTIF js/i18n.js | wc -l`) : `p1:` **30** · `l1:` **8** · `l2:` **8** · `l3:` **8** ·
   `Web Deploy` **2** · `IIS` **2** · `nom: "ville du client (jointure)"` **1** · `nom: "customer city (join)"` **1** ·
   `autre DURAND` **1** · `other DURAND` **1** · `MARC` **2** · `chapeau:` **12** · ` je ` **7** · `innerHTML` **0** · `—` **16** (base du tiret cadratin, invariant de cet incrément).
   Les six clés de chapeau existent par langue : `section1.chapeau`, `section2.chapeau`, `section3.chapeau`, `section4.chapeau`, `section5.chapeau`, `annexe.chapeau` (l. 48, 75, 82, 286, 542, 567 côté FR).
8. Bases `css/styles.css` (`grep -c`) : `-e '--color-bg-api-soft'` **0** · `-e '--registre'` **5** · `background:` **27** ·
   `'^\.site-nav'` **2** · `'^\.about'` **5** · `'^\.statut'` **5** · `'^\.aide'` **2** · `'^\.boite'` **10** · `list-style` **4**.
   Le jeton `--color-bg-s36-soft: #edf5ff;` est à la l. 66 ; les affectations de `--registre` aux sections sont aux l. 360-362.
9. Les deux commentaires périmés sont là, mot pour mot : `grep -c "vient de l'annoncer" index.html` = **1** (l. 453, [W46]) · `grep -c 'le tableau défile dans son conteneur' css/styles.css` = **1** (l. 729, [W47]).
10. Le décor du mini-langage n'a pas bougé : `grep -c '{ NOMCLI: "DURAND", PRECLI: "MARC", VILCLI: "PARIS" }' js/minilangage.js` = **1** et `grep -c 'PRECLI: "CLAIRE", NUMCDE' js/minilangage.js` = **2** — CLAIRE a deux commandes, MARC une : les nombres de l'aide réécrite en dépendent.

## Contexte et périmètre

Relecture du site publié par le chef de projet, 3 septembre 2026. Quatre constats, arbitrés le même jour :

**A — La boîte « Pour les curieux : le déploiement » est un bloc de trois phrases ; il se lit mieux en trois points**, comme la liste des quatre voies (`ul.arguments`) un peu plus bas. Les trois phrases sont déjà les trois points : on coupe aux points, on ne réécrit rien.

**B — Les deux messages du mini-langage n'ont pas de fond** (`#mini-statut`, « Envoyez la demande… » ; `#mini-aide`, « Survolez un exemple… »). Le chef de projet veut une couleur douce dessous. **Le jaune pastel est pris** (`#fdefc8` dit « ce lien tient » dans les cellules, et la feuille interdit de réemployer une teinte de lien ailleurs), **le bleu pastel est pris** (`#edf5ff`, registre S/36). Ce qui manque est le fond clair du **registre API**, que S/36 et IA ont déjà : un jeton neuf, vert pâle, arbitré le 3 septembre. Une seule teinte pour les deux messages — deux teintes auraient coûté une cinquième couleur sur une page qui n'en a plus de libre.

**C — Le bouton « ville du client (jointure) » laisse croire qu'on crée une jointure.** On filtre sur une colonne venue d'un autre fichier ; la jointure existe déjà, par les valeurs. Nouveau nom : « ville du client (autre fichier) » (option A de l'arbitrage : le mot du lecteur, pas celui du développeur). Et **son aide est confuse** : « celle de l'autre DURAND » ne s'explique que si l'on sait qu'il y a deux DURAND, ce que le texte ne dit jamais. Réécrite en nommant les deux.

**D — Le menu a l'air brut** : six liens bleus nus sur blanc. Maquette arbitrée le 3 septembre (variante A, contre un panneau gris et un panneau brun clair) : chaque entrée devient une rangée pleine largeur, filet gauche à la couleur de son registre, titre en encre, **le chapeau de sa section dessous** en Plex Mono — les mêmes clés que sur la page, aucune clé neuve —, un trait fin entre les rangées, « À propos » sur le gris `#f4f4f4` en pied. Aucune teinte nouvelle, aucun script.

**Ce que ce prompt ne décide pas** : tout ce que porte la ligne 13 (Plex Mono des `code` en ligne, indice de défilement, favicon, `noscript`, tests d'i18n, dettes VoiceOver, plafond de `CDEMST`). Voir « Hors périmètre ».

**Anonymisation P1** : les valeurs réécrites ci-dessous ne portent que des noms du cas fictif (DURAND, CLAIRE, MARC, Lyon, Paris, CLIMST) et des produits Microsoft déjà présents. Si tu crois voir autre chose : ARRÊTE-TOI.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/finitions`. `.pipeline/spec.md`. Puis le premier commit ci-dessus.

## ÉTAPE 2 — Livrable A : le dictionnaire (`js/i18n.js`, deux langues)

**A1 — `section3.deploiement`** : la clé `p1` est **remplacée** par trois clés `l1`, `l2`, `l3`, dans cet ordre, après `resume`. `resume` ne change pas.

Côté français :
- `l1` : `L'API a été déployée via Web Deploy, depuis Visual Studio, sur un serveur IIS, et interrogée depuis l'extérieur : le prototype n'a pas tourné que dans l'atelier.`
- `l2` : `La connexion à l'IBM i passe par un profil dédié dont le programme initial, un CL, charge la liste de bibliothèques voulue.`
- `l3` : `L'API REST .Net trouve ainsi toutes les tables métier dont elle a besoin, sans en nommer aucune dans son code.`

Côté anglais :
- `l1` : `The API was deployed with Web Deploy, from Visual Studio, to an IIS server, and queried from outside: the prototype did not run only in the workshop.`
- `l2` : `The IBM i connection goes through a dedicated profile whose initial program, a CL, loads the intended library list.`
- `l3` : `The .Net REST API then finds every business table it needs without naming any of them in its code.`

Ce sont les trois phrases de `p1`, **caractère pour caractère**, coupées aux points. Aucun mot ajouté ni retiré.

**A2 — `section4.ex.jointure`** : les deux clés `nom` et `aide` changent de valeur. La clé garde son nom `jointure` (c'est un identifiant de code, pas un texte du site ; le renommer toucherait `js/minilangage.js`, hors périmètre).

Côté français :
- `nom` : `ville du client (autre fichier)`
- `aide` : `La ville (villeClient) n'est pas dans le fichier des commandes : elle vient du fichier des clients, CLIMST, retrouvée par le nom et le prénom, sans aucun numéro de client. Il y a deux clients DURAND : CLAIRE à Lyon, MARC à Paris. Avec LYON, 2 commandes, celles de CLAIRE. Remplacez LYON par PARIS : 1 commande, celle de MARC.`

Côté anglais :
- `nom` : `customer city (other file)`
- `aide` : `The city (customerCity) is not in the orders file: it comes from the customer file, CLIMST, found by last name and first name, with no customer number at all. There are two DURAND customers: CLAIRE in Lyon, MARC in Paris. With LYON, 2 orders, CLAIRE's. Replace LYON with PARIS: 1 order, MARC's.`

**Règles de forme, non négociables :**
1. Aucun tiret cadratin dans les valeurs neuves (S-1). Preuve 7.
2. Aucun « je » : la base ` je ` reste à **7**. Preuve 8.
3. Les nombres de l'aide (2 commandes, 1 commande) sont ceux du décor, prérequis 10. Ne les « corrige » pas.
4. Aucune autre valeur du dictionnaire ne change. En particulier `section3.deploiement.resume` et les six `chapeau`.

## ÉTAPE 3 — Livrable B : `index.html`

**B1 — La boîte du déploiement.** Dans `<section id="solution">`, le `<p data-i18n="section3.deploiement.p1"></p>` est **remplacé** par :

```html
        <ul class="arguments" role="list">
          <li data-i18n="section3.deploiement.l1"></li>
          <li data-i18n="section3.deploiement.l2"></li>
          <li data-i18n="section3.deploiement.l3"></li>
        </ul>
```

`summary` et `details` ne bougent pas. Même classe `arguments` que les deux listes existantes (même objet : des points sous un texte), même `role="list"` que les deux autres `ul.arguments` (l. 241 et 259), qui le portent.

**B2 — Le sommaire du menu.** Les six `<li>` de `nav.site-nav > ul` deviennent, **dans le même ordre** :

```html
        <li><a href="#decor"><span class="nav-titre" data-i18n="nav.decor"></span><span class="nav-chapeau" data-i18n="section1.chapeau"></span></a></li>
        <li><a href="#probleme"><span class="nav-titre" data-i18n="nav.probleme"></span><span class="nav-chapeau" data-i18n="section2.chapeau"></span></a></li>
        <li><a href="#solution"><span class="nav-titre" data-i18n="nav.solution"></span><span class="nav-chapeau" data-i18n="section3.chapeau"></span></a></li>
        <li><a href="#mini-langage"><span class="nav-titre" data-i18n="nav.minilangage"></span><span class="nav-chapeau" data-i18n="section4.chapeau"></span></a></li>
        <li><a href="#methode"><span class="nav-titre" data-i18n="nav.methode"></span><span class="nav-chapeau" data-i18n="section5.chapeau"></span></a></li>
        <li><a href="#annexe"><span class="nav-titre" data-i18n="nav.annexe"></span><span class="nav-chapeau" data-i18n="annexe.chapeau"></span></a></li>
```

Pourquoi les `span` : `applyI18n` écrit par `textContent`, un `data-i18n` sur le `<a>` effacerait ses enfants. Le `data-i18n` quitte donc le lien pour le premier `span`. Les six `href` ne changent pas. Le `<ul>`, le `<nav>` et le `div#nav-panel` ne changent pas.

**B3 — [W46], le commentaire de la section 5.** Le commentaire `<!-- Le dépôt d'abord : le paragraphe \`preuve\` vient de l'annoncer. -->` (l. 453) devient :
`<!-- Le dépôt d'abord : c'est lui que le paragraphe \`preuve\` annonce. -->`
Il nomme sa cible, il ne la situe plus (leçon du 1er septembre 2026). Rien d'autre ne bouge autour.

## ÉTAPE 4 — Livrable C : `css/styles.css`

**C1 — Le jeton.** Immédiatement **après** la l. 66 (`--color-bg-s36-soft`), une ligne :

```css
  --color-bg-api-soft: #defbe6;  /* messages du mini-langage ; #161616 16,41:1, #525252 7,09:1, #198038 4,55:1, #a2191f 7,07:1 */
```

Contrastes mesurés le 3 septembre 2026, formule WCAG. Le registre API gagne son fond clair, comme S/36 (`--color-bg-s36-soft`) et IA (`--color-bg-ia-soft`) ont le leur.

**C2 — Les deux messages.** Dans `.statut`, ajoute `background: var(--color-bg-api-soft);` et `padding-right: var(--space);`. Dans `.aide`, ajoute `background: var(--color-bg-api-soft);`. `.statut.refuse` garde son `background: var(--color-bg-soft)` : il vient après dans la feuille et sa spécificité est supérieure, le gris du refus l'emporte sans autre geste. Le commentaire de `.statut.attente` (l. 1131, « elle ne prend donc ni le vert du service ni le rouge du refus ») reste **vrai pour le filet** ; ajoute-lui une phrase : `Le fond, lui, est celui du registre API, comme pour l'aide : il dit où l'on est, pas ce qui a été répondu.` Un commentaire qui deviendrait faux au même commit serait un [W46] de plus.

**C3 — La boîte.** Après `.boite .defile { … }`, une règle :

```css
/* La liste de la boîte du déploiement : même encre douce et même corps que
   `.boite p`, retrait de puce en plus, et le bas de boîte que `p:last-child`
   assurait quand la boîte finissait par un paragraphe. */
.boite .arguments {
  margin: 0;
  padding: 0 var(--space) var(--space) calc(var(--space) * 2);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}
```

**C4 — [W47], le commentaire de `.boite`** (l. 728-730) devient :

```css
/* ---- Boîte dépliable du registre API (`details` natif, aucun script).
   Repliée par défaut ; ce qui défile à l'intérieur (`.defile`) défile dans son
   conteneur, jamais la page (CLAUDE.md, UX). */
```

Il n'inventorie plus ses clients (leçon du 1er septembre 2026).

**C5 — Le sommaire du menu.** `.nav-js .nav-panel` : son `padding` devient `calc(var(--space) * 2 + 3.5rem) 0 0` (les rangées portent leur propre retrait ; le commentaire sur les 82 px reste vrai, ne le touche pas). `.nav-panel` (sans JS, en flux) : son `padding` devient `0 0 var(--space)`. `.site-nav ul` : `gap` passe de `0.5rem` à `0`. `.site-nav a` est **remplacé**, et les règles qui suivent sont **ajoutées** juste après lui :

```css
/* Le sommaire parle la langue de la page : filet gauche à la couleur du
   registre, titre en encre, chapeau de la section dessous (mêmes clés que
   sur la page). Arbitré sur maquette le 3 septembre 2026, variante A, contre
   un panneau gris et un panneau brun clair : sur blanc, ce sont les filets
   qui portent la structure. Le retrait gauche retire les 3 px du filet pour
   que le texte s'aligne sur « À propos ». */
.site-nav li + li {
  border-top: 1px solid var(--color-line);
}

.site-nav a {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.125rem;
  min-height: 44px;
  padding: 0.625rem var(--space) 0.625rem calc(var(--space) - 3px);
  border-left: 3px solid var(--registre);
  color: var(--color-ink);
  line-height: 1.3;
  text-decoration: none;
}

/* Même table que les sections (l. 360-362) : un lien porte le registre de sa cible. */
.site-nav a[href="#decor"],
.site-nav a[href="#probleme"],
.site-nav a[href="#annexe"]   { --registre: var(--color-s36); }
.site-nav a[href="#solution"],
.site-nav a[href="#mini-langage"] { --registre: var(--color-api); }
.site-nav a[href="#methode"]  { --registre: var(--color-ia); }

.nav-titre {
  font-weight: 600;
  font-size: 1.0625rem;
}

/* 11 px de Plex Mono : la couleur de registre tient AA sur blanc (l. 56, 57, 61)
   et sur le gris du survol (#0f62fe 4,55:1, #198038 4,56:1, #6929c4 7,03:1,
   mesurés le 3 septembre 2026). */
.nav-chapeau {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--registre);
}

@media (hover: hover) {
  .site-nav a:hover {
    background: var(--color-bg-soft);
  }
}

/* Le liseré global (l. 140) déborderait de la rangée : on le rentre. */
.site-nav a:focus-visible {
  background: var(--color-bg-soft);
  outline-offset: -2px;
}
```

Puis `.about` : `margin-top: var(--space)` reste ; `padding` devient `var(--space)` ; `border-top` devient `none` ; ajoute `background: var(--color-bg-soft);`. Son commentaire (« Le sélecteur d'élément `section` … poserait ici une marge de chapitre et un filet de séparation : on les reprend ») reste vrai : on reprend toujours les deux. `.about h2`, `.about p`, `.about-name`, `.about a` ne changent pas.

**Ce que C5 ne fait pas** : aucune règle sur `.nav-toggle`, `.nav-overlay`, `.site-header`, `.lang-switch` ; aucune transition ajoutée ; `role="list"` sur `.site-nav ul` **non posé** ([W28], mesure VoiceOver).

## ÉTAPE 5 — Livrable D : le fil

**Aucun geste sur `tasks/ROADMAP.md`** : l'état de la ligne et le marquage de [W46] et [W47] comme remboursées passent par le geste manuel du chef de projet ([W24]), **sur `main`, après l'atterrissage** — jamais sur la branche avant, la garde de `/land` refuserait la revue.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat.

1. `index.html`, occurrences : `data-i18n="` **252** (244 − 6 liens − 1 `p1` + 12 `span` + 3 `li`) · `<span` **31** · `<li` **39** · `<ul` **6** · `class="arguments"` **3** · `role="list"` **5** · `chapeau"` **18** (12 + 6 `span`) · `class="chapeau"` **6**, inchangé · `class="nav-titre"` **6** · `class="nav-chapeau"` **6** · `data-i18n="nav.` **6**, inchangé · `data-i18n="section3.deploiement` **4** (`resume` + 3) · `section3.deploiement.p1` **0**.
   Invariants : `data-i18n-attr="` **11** · `<h3` **19** · `id="` **63** · `<details` **5** · `class="boite"` **2** · `class="statut"` **1** · `class="aide"` **1**.
2. Ordre dans le menu : `grep -n 'href="#decor"\|href="#probleme"\|href="#solution"\|href="#mini-langage"\|href="#methode"\|href="#annexe"' index.html` imprime six lignes, **dans cet ordre**, chacune portant `nav-titre` puis `nav-chapeau`.
3. `js/i18n.js`, occurrences : `p1:` **28** · `l1:` **10** · `l2:` **10** · `l3:` **10** · `Web Deploy` **2** · `IIS` **2** · `(jointure)` **0** · `(join)` **0** · `autre DURAND` **0** · `other DURAND` **0** · `nom: "ville du client (autre fichier)"` **1** · `nom: "customer city (other file)"` **1** · `MARC` **6** · `chapeau:` **12**, inchangé.
4. Ordre dans le dictionnaire, par langue : `grep -n 'resume:\|l1:\|l2:\|l3:\|limites: {' js/i18n.js` — pour chaque langue, `resume` puis `l1`, `l2`, `l3` du groupe `deploiement` à numéros croissants, avant `limites` (les `l1`/`l2`/`l3` d'autres groupes apparaissent aussi : lis, ne compte pas seulement).
5. `css/styles.css` : `grep -c -e '--color-bg-api-soft'` **3** (le jeton et ses deux usages) · `grep -c -e '--registre'` **10** · `grep -c 'background:'` **32** · `grep -c '^\.site-nav'` **10** (`ul`, `li + li`, `a`, six lignes de `href`, `a:focus-visible` ; `a:hover` est indenté sous la media query) · `grep -c '^\.nav-titre\|^\.nav-chapeau'` **2** · `grep -c '^\.boite'` **11** · `grep -c '^\.about'` **5**, inchangé · `grep -c 'list-style'` **4**, inchangé.
6. Les deux commentaires périmés ont disparu et leur remplaçant est là : `grep -c "vient de l'annoncer" index.html` = **0** · `grep -c "c'est lui que le paragraphe" index.html` = **1** · `grep -c 'le tableau défile dans son conteneur' css/styles.css` = **0** · `grep -c 'Boîte dépliable du registre API' css/styles.css` = **1**.
7. Aucun tiret cadratin dans les valeurs neuves : `grep -o '—' js/i18n.js | wc -l` = **16**, **inchangé** (les valeurs retirées n'en portaient aucun, les valeurs neuves n'en portent aucun).
8. ` je ` **7**, inchangé · `innerHTML` **0**, inchangé. **Si tu lis autre chose : ARRÊTE-TOI.**
9. `git diff --stat` ne touche que `js/i18n.js`, `index.html`, `css/styles.css` (plus le prompt, entré au premier commit). **`js/menu.js`, `js/minilangage.js`, `tests/` : intouchés.**
10. `npm test` : vert, même total qu'au prérequis 4. La porte i18n-HTML résout les quinze références neuves (3 `li`, 12 `span`) sans que tu touches aux tests.
11. **Vérification au navigateur** (câblage, [W13]) : (a) section 3, la boîte du déploiement s'ouvre et montre **trois puces** en encre douce, alignées sur le résumé ; (b) section 4, « Envoyez la demande… » et « Survolez un exemple… » sont sur fond vert pâle, et une demande refusée (bouton « colonne inconnue ») repasse sur **gris** ; (c) le bouton lit « ville du client (autre fichier) », son aide nomme CLAIRE et MARC, le statut dit **2** lignes, et LYON → PARIS en donne **1** ; (d) le menu : six rangées à filet coloré, chapeau dessous, survol gris, « À propos » sur gris, **un clic sur une rangée referme le panneau** (l. 112 de `menu.js`) ; (e) tout bascule en anglais avec le bouton de langue. Note chaque point dans `changes.md`. Le rendu sur appareil reste au chef de projet.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `css/styles.css`) :
  `feat(finitions): la boîte du déploiement en trois points, un fond de registre sous les deux messages du mini-langage, le bouton « autre fichier » et son aide, le sommaire du menu ; [W46] et [W47] remboursées`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. `SHIP` avec des `WARN` : **n'y touche pas**, écris READY (0 FAIL suffit, les WARN partent en dette nommée au fil). `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL finitions — <ISO> — feat/finitions — tests <X/Y>`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les dix valeurs (trois `l`, `nom`, `aide`, par langue) écrites **exactement** comme ci-dessus ; `p1` du déploiement disparue ; aucune autre valeur modifiée.
2. La boîte du déploiement finit par un `ul.arguments` de trois `li` ; le menu porte six `a` de deux `span` chacun, `href` inchangés ; les deux commentaires [W46] et [W47] réécrits comme prescrit.
3. Un jeton `--color-bg-api-soft` avec sa ligne de contraste ; les règles de C2 à C5 telles quelles ; rien sur `.nav-toggle`, `.nav-overlay`, `.site-header`.
4. Aucun « je », aucun tiret cadratin, aucun chiffre autre que ceux du décor dans les valeurs neuves ; aucune teinte hors `#defbe6` ajoutée.
5. `js/menu.js`, `js/minilangage.js`, `tests/`, `tasks/ROADMAP.md` non touchés.
6. Suite verte, comptages de l'ÉTAPE 6 conformes, les cinq points du câblage vus au navigateur.
7. `review.json` du `reviewer` en SHIP pour ce commit ; READY écrit en dernier.

## Hors périmètre — à ne pas traiter, dette par dette

- **Tout ce que porte la ligne 13** : Plex Mono des `code` en ligne (aucune règle `code` nue n'existe, 48 `<code>` hors `<pre>` — ne la crée pas ici), indice de défilement des cadres ([W23]), favicon ([W12]), `noscript` ([W5]), tests du câblage i18n ([W8], [W13]), `aria-label` du conteneur de la boîte à outils ([W29]), points de repère ([W30]), plafond de `CDEMST`.
- **Sans JavaScript**, `.statut` et `.aide` sont deux surfaces vertes vides : c'est la famille de [W5] (le site est muet sans script), ligne 13. Ne pose pas de `:empty`.
- **`role="list"` sur `.site-nav ul`** ([W28]) et **la mesure VoiceOver** (huit objets) : le sommaire y ajoute un objet, six liens à deux `span` dont le nom accessible concatène titre et chapeau — à noter dans `changes.md`, pas à corriger.
- **Le chapeau de la section 3 sur deux lignes** à 320 px (dette de `12 ter`) : il passera aussi sur deux lignes dans le menu, pour la même raison. Se règle avec le texte du chapeau, jamais ici.
- **Le renommage de la clé `jointure`** en `js/minilangage.js` et `js/i18n.js` : identifiant de code, pas un texte ; hors périmètre.
- **Un fond sous `.jointure`** (le message de jointure brisée) : non demandé, même registre, un incrément futur pourra l'aligner.
- **L'ordre des trois lignes de `completeWith`, `RETOUR_APPUI_MS`**, et toute dette de `[W31]` à `[W58]` : intouchées.
- **L'état de la ligne au fil** : geste manuel du chef de projet, après l'atterrissage, sur `main`.

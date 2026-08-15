# JOURNAL — IBMiAPI v0.1

> Entrées écrites par /land à chaque atterrissage d'incrément (hash de merge cité).

## 14 août 2026 — Session 2 : socle du site (v0.1.0) — merge `e2adc0d`

- Incrément `feat/socle-du-site` (prompt `prompts/v0.1/EVOL_socle-du-site_v2.md`, `/ship` complet) :
  - **Livrables** : `LICENSE` (MIT code / textes réservés / OFL polices), `index.html` (coquille 5 sections, CSP stricte par meta sans `unsafe-inline`), `css/styles.css` (jetons trois âges, mobile-first), `js/i18n.js` (dictionnaire FR/EN 23 clés, `resolveLang`, `applyI18n` avec `data-i18n-attr`), `tests/i18n.test.js`, polices Plex Latin1 auto-hébergées (`assets/fonts/`, 4 woff2 + OFL).
  - **Dépendances** : `@ibm/plex-sans@1.1.0`, `@ibm/plex-mono@2.5.0` épinglées, provenance absente compensée par vérification de l'éditeur officiel `@ibm` ; audit 0 vuln, lockfile 71/71 `registry.npmjs.org` + `integrity`, 0 IOC.
  - **Consignation SECURITY_METHOD §3.3 (W1 de la revue)** : les deux paquets Plex portent un `postinstall: ibmtelemetry` (télémétrie réseau via `@ibm/telemetry-js`). (1) Le hook existe ; (2) il a été neutralisé à l'installation (`--ignore-scripts`) ; (3) la neutralisation est portée par le `.npmrc` committé (`ignore-scripts=true`), donc reproductible pour tout clone. Note : npm 10.9.8 ne supporte pas `min-release-age` — la carence 72 h reste une garantie procédurale.
  - **Revue** (`reviewer`, 6 piliers) : verdict initial NEEDS WORK, score sécurité 11/12 ; corrections W1/W3+W9/W4/W6/W7 appliquées sur arbitrage du chef de projet (commit `0591ba3`), description EN reformulée par le tech lead (commit `76b3ebf`).
  - **Tests** : 18/18 (parité FR/EN mordante — morsure prouvée par retrait de clé, rc 1 — et non-vacuité intégrée à la porte) ; vérification visuelle 360 px sans débordement, bascule FR/EN et ancres constatées (http.server + Playwright).
- Tests sur `main` après merge : 18/18, rc 0. Bump minor 0.0.1 → 0.1.0.
- **Limite structurelle nommée** (demande de la revue) : une CSP posée par `<meta>` ne peut pas porter `frame-ancestors` — la protection anti-clickjacking est hors de portée sur GitHub Pages (pas d'en-têtes HTTP configurables). Constat d'architecture, pas d'action.
- **Dettes reportées** : liste transférée dans `ROADMAP.md` (section « Dettes et reports — revue du socle »), décision du chef de projet.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| [W4] Vert API `#24a148` du prompt, mesuré 3,35:1 (pas AA texte) | Remplacé par `#198038` (5,02:1 mesuré) | Le jeton est destiné à colorer du JSON en petite taille ; la revue a réfuté l'affirmation « AA » du prompt | précédent |
| [W3/W9] Attributs localisés (`aria-label`, meta `description`) | Mécanisme `data-i18n-attr` (`attribut:clé`) | Réutilisable (futurs `alt` de SVG) ; valeurs initiales FR dans le HTML resynchronisées à la bascule | précédent |
| [W7] `.playwright-mcp/` et `.claude/scheduled_tasks.lock` non ignorés | Extension du périmètre de l'incrément au `.gitignore`, entrées ajoutées | Dépôt public : un `git add -A` futur les publierait | précédent |
| [W10] Plex Mono sur le bouton de langue | Conservé | Un code de langue (« EN »/« FR ») est une donnée, pas du chrome d'interface | précédent |
| Description EN du site (texte hors prompt figé) | Formulation du tech lead (commit `76b3ebf`) | Texte nouveau, non couvert par la prose validée du prompt : relecture dédiée | cas d'espèce |
| [W2/W5/W8/W11/W12/P6] Recommandations restantes de la revue | Non traitées dans l'incrément, reportées à la ROADMAP | Périmètre borné du correctif ; le backlog est tracé au produit, pas dans un artefact gitignoré | cas d'espèce |

## 14 août 2026 — Session 3 : README bilingue du dépôt (v0.1.1) — merge `200f25f`

- Incrément `chore/readme` (prompt `prompts/v0.1/CHORE_readme_v1.md`) :
  - **Livrable** : `README.md` à la racine (anglais d'abord, français ensuite, ancres `#english`/`#français` en tête). Contenu exact du prompt — prose intacte, prouvée par diff octet à octet contre le corps du prompt (lignes 39-83) : zéro écart.
  - **Faits affirmés par le README revérifiés le jour même** (application de la leçon locale du 14 août) : devDependencies seules et épinglées exactes, `ignore-scripts=true` au `.npmrc`, lockfile 71/71 `resolved` sur `registry.npmjs.org`, CSP par `<meta>` dans `index.html`, 4 woff2 + `assets/fonts/OFL.txt` présents.
  - **Tests** : 18/18 avant et après livraison ; aucune porte créée ni modifiée (`ASSURANCE_METHOD` écarté par le prompt, hésitation levée).
- Nettoyage pré-incrément : brouillon `prompts/v0.1/EVOL_socle-du-site_v1.md` (non suivi, supplanté par la v2 committée) supprimé du working tree sur instruction du chef de projet — hors périmètre de l'incrément, aucun commit associé, tracé dans `changes.md`.
- Tests sur `main` après merge : 18/18, rc 0. Bump patch 0.1.0 → 0.1.1 (incrément interne au jalon v0.1 ; le passage minor reste réservé à la clôture du jalon).

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| Sort du brouillon `EVOL_socle-du-site_v1.md` resté non committé | Suppression du working tree, avant l'ouverture de la branche | Supplanté par la v2 exécutée et committée ; ni `DRAFT_` ni gelé au sens des conventions, et le dépôt est public | cas d'espèce |

## 14 août 2026 — Session 4 : porte de résolution HTML ↔ dictionnaire (v0.1.2) — merge `e18c8e8`

- Incrément `chore/porte-i18n-html` (prompt `prompts/v0.1/CHORE_porte-i18n-html_v1.md`) — remboursement
  de la dette **[W2]** de la revue du socle :
  - **Livrable** : `tests/i18n-html.test.js` (10 tests), qui vérifie que chaque `data-i18n` /
    `data-i18n-attr` d'`index.html` **résout** dans `dict.fr` sur une chaîne non vide. Jusqu'ici, une
    faute de frappe dans une clé produisait un élément vide à l'écran sans aucun test rouge. Zéro
    dépendance ajoutée (Vitest déjà installé + `node:fs`, pas de jsdom).
  - **Sémantique calquée sur le code, pas sur le prompt** : le prompt réservait le cas « plusieurs
    paires `attribut:clé` si le code les admet ». Lecture faite de `js/i18n.js` : `applyI18n`
    déstructure `split(":")` en `[attr, path]` — une seule paire est honorée. La porte teste donc une
    paire et signale les deux formes où `applyI18n` ne pose **rien** sans erreur (`content`,
    `content:`), conséquence de la garde `attr && path ? … : undefined`.
  - **Preuves (ASSURANCE couche A)** : vert initial 28/28 rc 0 ; morsure prouvée (`section1.title` →
    `section1.titel` dans `index.html` → rc 1, message nommant la clé **et** l'attribut ; restauré par
    `git checkout --`, jamais commité) ; non-vacuité prouvée (lecture redirigée vers un HTML vide hors
    dépôt → rc 1, motif `porte AVEUGLE`). **Fait relevé à cette occasion** : sur le document vide, le
    test de résolution restait **vert** — sans la garde, la porte souriait à vide. C'est le mode de
    panne qu'elle ferme.
  - **Vivacité** : les trois chemins bloquants portent chacun un **témoin committé** (5 des 10 tests),
    en plus des preuves de bac à sable. Pour qu'ils existent, la source HTML et la table de résolution
    sont devenues des **paramètres** : sans ces coutures, le cas « valeur vide » n'avait aucune cible
    où mordre et le chemin d'échec de la garde exigeait de casser un fichier du dépôt.
  - **Leçon locale** consignée (commit dédié `26261f0`) : « une preuve de morsure jetée ne protège que
    le jour où on la fait ». Signalée par l'auto-review comme probablement redondante avec deux entrées
    globales (9 et 10 août) ; ce qu'elle ajoute est l'opposition preuve **jetée** / témoin **committé**.
    Promotion globale non demandée.
- **Incident d'outillage, sans effet sur le livrable** : `.git/index.lock` résiduel (0 octet, 3 min,
  aucun détenteur — `lsof`/`fuser` négatifs, index vide) bloquant le `git add` de la leçon. Retiré
  manuellement, comme le prescrit le message de git. Réserve consignée : le dépôt étant sur `/mnt/c`,
  un client git **côté Windows** n'aurait été visible ni dans `ps` ni dans `lsof` depuis WSL.
- **Défaut du gabarit `/land` rencontré à l'exécution** (déjà connu par la leçon globale du 7 août) :
  la commande fait tourner les tests « sur `main`, après la fusion » sans qu'aucune ligne ne pose
  `git checkout main`. La bascule a été faite explicitement et la branche courante **contrôlée** avant
  le merge et avant les tests, au lieu d'être supposée.
- Tests sur `main` après merge : **28/28, rc 0**. Bump patch 0.1.1 → 0.1.2 (incrément interne au jalon
  v0.1 ; le passage minor reste réservé à la clôture du jalon).

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| `data-i18n-attr` : le code admet-il plusieurs paires ? | Une seule paire testée, les deux formes incomplètes signalées | Lecture du code : `split(":")` déstructuré en deux ne lit que les deux premiers segments. La porte atteste ce que fait `applyI18n`, elle ne prescrit pas | précédent |
| Balisage `data-i18n` laissé en commentaire HTML | Commentaires retirés avant extraction | `querySelectorAll` ne les voit pas : le signaler serait rapporter un défaut impossible, et interdire un exemple commenté. Une barrière atteste, elle ne prescrit pas la forme du source | précédent |
| Formes de guillemets d'attribut relevées | Les trois (double, simple, sans guillemets), au-delà de la seule forme employée aujourd'hui | Un contrôle qui ne connaît qu'une syntaxe du motif qu'il surveille fabrique un angle mort : une clé fautive en guillemets simples serait passée au vert | précédent |
| Preuves de l'étape 3 : suffisantes ? | Doublées de témoins committés, un par chemin bloquant ; ressources lues rendues injectables | Une preuve de bac à sable atteste que la porte mord le jour où on la fait ; seul un témoin committé atteste qu'elle mord encore | précédent |
| Segment surnuméraire dans `data-i18n-attr` (`a:b:c`) | Non signalé | Inerte mais sans effet de bord : le code l'ignore et pose quand même l'attribut. Le signaler légiférerait sur la syntaxe au lieu de mesurer l'effet | cas d'espèce |
| Où consigner la leçon d'auto-review, l'incrément étant déjà clos `READY` | Commit dédié sur la branche (`26261f0`), `changes.md` et `STATUS.md` repris ensuite | Extension de périmètre arbitrée par le chef de projet (option A sur trois) : le registre des leçons appartient au harnais, pas au site, et la méthode demande de consigner immédiatement | cas d'espèce |
| Retrait de la dette **[W2]** de `tasks/ROADMAP.md` | **Non fait** — la dette y reste inscrite | Hors du périmètre du prompt, et hors de la liste de staging précise de `/land` : la modifier laisserait un fichier suivi sale après le commit de clôture. Geste dédié à venir | cas d'espèce |

## 15 août 2026 — Session 5 : section « Le décor » (v0.1.3) — merge `173c964`

- Incrément `feat/section-le-decor` (prompt `prompts/v0.1/EVOL_section-le-decor_v2.md`) — **premier contenu
  du jalon 1** :
  - **Livrable** : quatre blocs de récit dans la section 1, FR et EN — *Deux lignées, deux philosophies* ·
    *1988 : le pont d'IBM* · *Les noms changent, la machine continue* · *La preuve vivante*.
    **13 clés nouvelles par langue, 26 au total** sous `section1.{lignees,pont,noms,preuve}` ;
    17 lignes de HTML dans la section 1. `section1.title` et `section1.intro` inchangés.
  - **Méthode de recopie** : la prose n'a pas été transcrite mais **extraite du prompt par script**, puis
    un second script a comparé caractère par caractère les valeurs chargées depuis `js/i18n.js` à la
    source. Résultat : **26 valeurs comparées, 0 écart**. Typographie contrôlée *avant* recopie
    (apostrophes droites, guillemets `« »` à espaces ordinaires, zéro insécable, zéro cadratin en prose) :
    aucun caractère invisible introduit.
  - **Contradiction relevée à l'étape 0, arbitrée avant l'ouverture de la branche** : le prompt
    prescrivait `<code>STRS36</code>` en ligne, or `applyI18n` pose les textes par `el.textContent`
    (`js/i18n.js:158`) — le balisage se serait affiché chevrons compris — et aucune règle CSS ne cible
    `code`, `css/styles.css` étant hors périmètre. Voir arbitrages.
  - **Preuves** : `npm test` **28/28 rc 0** avant et après. Les portes existantes ont été prouvées
    *voyantes* (36 références i18n dans `index.html` contre 23, dont 13 nouvelles) **et** *mordantes sur
    ce matériau-ci* (`section1.preuve.p3` altérée → rc 1 nommant la clé ; restaurée, `grep` = 0).
    Une suite verte ne prouve pas qu'elle a mesuré le matériau neuf : ça se mesure.
  - **Visuel 360 px, mesuré et non jugé** : débordement **0 px en EN comme en FR** (le FR est le cas
    défavorable), aucun élément hors viewport, aucun `data-i18n` resté vide, bascule constatée sur les
    13 éléments. Le site auto-héberge ses polices : la mesure porte sur le site réel, pas sur une
    substitution de la machine hôte. Erreur console `favicon.ico` 404 = dette **[W12]** connue, pas une
    régression.
  - **Vu sur appareil réel** (tunnel éphémère, copie allowlist de 9 fichiers hors dépôt) : rendu conforme
    sur iPhone, quatre blocs dans l'ordre, aucune coupure. La validation visuelle appartient au chef de
    projet ; elle a eu lieu.
- Tests sur `main` après merge : **28/28, rc 0**. Bump **patch** 0.1.2 → 0.1.3 (voir arbitrages).
- **Aucune leçon inscrite** : deux candidates relevées par l'auto-review, aucune soumise au chef de
  projet à l'heure de l'atterrissage. « Aucune » est une information, pas un oubli.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| Le prompt prescrit `<code>STRS36</code>` dans la prose ; le mécanisme d'affichage peut-il le rendre ? | **Non** — `STRS36` livré en texte nu (option B sur trois soumises) | `applyI18n` pose par `el.textContent`, qui ne parse pas le balisage : `<code>` se serait affiché chevrons compris. `innerHTML` aurait changé la logique de **toutes** les clés et ouvert une injection de balisage depuis les données. Et aucune règle CSS ne cible `code` : le rendu serait tombé sur la monospace par défaut du navigateur, jamais Plex Mono | précédent |
| Étendre le périmètre à `css/styles.css` pour poser la règle `code` ? | **Non** — report vers un incrément CSS dédié | Le critère d'acceptation 2 fige le périmètre à deux fichiers. Le contrat de design (« Plex Mono pour les noms de commandes ») reste donc **écrit et non tenu** : c'est une dette, elle est nommée, pas absorbée en silence | cas d'espèce |
| Cohérence du rendu de `STRS36` dans la section | Texte nu partout | `section1.intro`, gelée par le prompt, l'écrit déjà en texte nu. L'alternative aurait affiché le même nom de commande deux fois dans la même section, une fois nu et une fois en monospace générique | cas d'espèce |
| Niveau de bump : le gabarit `/land` dit `feat/*` → **minor** (0.2.0) | **Patch** 0.1.2 → 0.1.3, gabarit non suivi | Le MINOR structure les artefacts du projet (`prompts/v0.1/`, `JOURNAL_v0.1.md`, « Jalon 1 (v0.1) »). Vérifié avant de trancher : le jalon 1 est **inachevé** — une section sur cinq écrite, visuels SVG absents, gate d'anonymisation non passée. Passer en 0.2.0 aurait désynchronisé tout le train d'artefacts. Le passage minor marque la **clôture du jalon**, règle déjà inscrite deux fois à ce journal | précédent |
| Brouillon `EVOL_section-le-decor_v1.md`, non suivi | Supprimé du working tree avant l'ouverture de la branche | Précédent de la session 3 ; jamais committé, supplanté par la v2 exécutée. Aucun commit associé | précédent |
| Répertoire exposé par le tunnel d'aperçu | Copie **allowlist** de 9 fichiers hors dépôt, jamais la racine | La racine porte `.git`, `.claude/`, et surtout `.pipeline/` et `node_modules/` qui ne sont pas publics. Vérifié par mesure : `CLAUDE.md`, `.pipeline/`, `tasks/`, `prompts/`, `tests/`, `.git/config` tous en 404 sur l'origine servie | précédent |

## 15 août 2026 — Session 6 : menu hamburger mobile-first (v0.1.4) — merge `7114b4f`

- Incrément `chore/menu-hamburger` (prompt `prompts/v0.1/CHORE_menu-hamburger_v1.md`) — la navigation
  se replie, le site gagne une section « À propos », la dette **[W11]** est remboursée :
  - **Livrable** : bouton `#nav-toggle` (icône SVG à deux tracés), panneau `#nav-panel` glissant depuis
    la droite (`min(320px, 85vw)`) avec overlay, section « À propos » (nom, licence, lien TWAIM, retour
    au portfolio conditionnel), module **`js/menu.js`** (147 lignes, deux fonctions pures exportées) et
    **`tests/menu.test.js`** (13 tests). 8 clés nouvelles par langue. Cibles tactiles à 44 px.
  - **Six fichiers**, comme le prescrivait le périmètre. Zéro dépendance, **CSP inchangée**, aucun
    `innerHTML`, aucun style inline, aucune chaîne de langue dans `js/menu.js`.
  - **Textes extraits du prompt par script**, jamais transcrits, puis comparés caractère par caractère
    aux valeurs chargées : **16 valeurs comparées, 0 écart**, aucun caractère invisible.
  - **Preuves** : `npm test` **28/28 → 41/41 rc 0**. Trois morsures prouvées (libellés `menuAria`
    inversés → 4 rouges ; égalité stricte de `showPortfolioLink` relâchée en `includes` → 1 rouge ;
    `about.twaim` altérée dans `index.html` → 1 rouge, **matériau neuf**), restauration vérifiée par
    `cmp`. Références i18n d'`index.html` : **36 → 44**, 8 nouvelles, 0 perdue — les portes existantes
    ont vu le matériau de cet incrément, ce qui se mesure et ne se suppose pas.
- **Quatre défauts trouvés pendant l'incrément — deux par la mesure, deux par le chef de projet.**
  - *Par la mesure* : (1) la barre se repliait sur deux lignes à 360 px, les deux boutons rejetés à
    gauche — le titre réclamait ses 273 px pour 328 utiles ; (2) le panneau recouvrait sa propre croix,
    `#nav-panel` étant écrit **dans** `<header>` — un descendant positionné peint toujours au-dessus du
    fond de son parent, quel que soit le z-index. Corrigé par la structure, pas par un z-index de plus.
  - *Par le chef de projet, sur appareil réel puis sur son poste* : (3) l'attribut `hidden` ne masquait
    pas le lien du portfolio dans le panneau — `[hidden] { display: none }` ne vient que de la feuille
    du **navigateur**, et la cible tactile `.about a { display: inline-flex }`, règle d'auteur, la
    neutralisait : **128 × 44 px peints sous un attribut qui disait « caché »** ; (4) le contenu se
    décalait d'environ 8 px à l'ouverture du menu, le verrou de défilement escamotant la barre (~15 px
    sur Windows, contenu centré → la moitié).
- **Ce que ces deux derniers défauts ont en commun** — et c'est le fait marquant de la session : les
  vérifications avaient regardé au bon endroit avec le mauvais instrument. La première lisait
  `a.hidden`, la présence d'un **attribut**, au lieu du rendu. La seconde tournait dans un navigateur à
  **barres de défilement de largeur 0**, incapable par construction de produire un décalage causé par
  la disparition d'une barre. Deux verts qui ne mesuraient rien. **Leçon locale consignée** (commit
  dédié `3a6a115`, avant le merge) : *lire l'attribut n'est pas mesurer le pixel* — ce qui se vérifie
  est `getComputedStyle().display` et la boîte rendue, jamais `el.hidden`, `classList.contains` ou la
  présence d'un attribut ; même règle pour `disabled`, `inert`, `aria-hidden`. Signalée comme
  probablement promouvable en global ; **promotion non demandée à l'heure de l'atterrissage**.
- **Seconde leçon candidate, proposée et non tranchée** : *avant de conclure qu'un défaut d'affichage
  est absent, vérifier que l'environnement de mesure est capable de le produire.* Voisine de l'entrée
  globale du 1er août sur les conclusions négatives, appliquée au rendu. Soumise au chef de projet,
  restée sans arbitrage : elle n'est **pas** écrite. « Non tranchée » est une information.
- **Validation sur appareil réel** (iPhone 14, Safari, tunnel éphémère, copie allowlist de 8 fichiers) :
  deux passages. Le premier a **trouvé** le défaut (3) ; le second a constaté « À propos » correcte en
  FR et en EN, **bascule de langue effectuée panneau ouvert** — le contenu du panneau a suivi sans
  refermer, ce qui vérifie `i18n:applied` ailleurs que dans Chromium. Cas positif de `?from=portfolio`
  vu sur grand écran (Chrome/Windows), cas négatif vu sur téléphone : les deux sens de la règle ont été
  vus au doigt.
- **Reste non prouvé, et écrit tel quel dans `test-results.md`** : le correctif du décalage (défaut 4)
  — l'environnement de mesure a des barres de largeur 0 et ne peut **ni** montrer le défaut **ni**
  démontrer sa correction ; le lecteur d'écran ; `prefers-reduced-motion`.
- **Six commits sur la branche au lieu des deux prescrits** : les deux du prompt, plus `c269eed` et
  `fdad186` (les deux correctifs, postérieurs au premier `READY`) et `3a6a115` (la leçon). Séparés et
  étiquetés, détachables un par un.
- Tests sur `main` après merge : **41/41, rc 0**. Bump **patch** 0.1.3 → 0.1.4.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| `/land` ne sait pas tenir `about.version` à jour (étape 4 ne touche que le manifeste et le pied de `CLAUDE.md`, étape 6 ne stage pas `js/i18n.js`) | **Clé retirée** du §2.4 et de la section (option 2 sur trois, chef de projet) | Le prompt interdit « un compteur qui ment ». Retirer la ligne tient le périmètre à six fichiers et ne touche pas au harnais ; étendre `/land` restait l'autre voie, inscrite à la ROADMAP | cas d'espèce |
| « À propos » à ≥48rem, le CSS ne sachant ni déplacer ni dupliquer un élément | **Vit dans le panneau à toutes les largeurs** (échappatoire du §2.2, chef de projet) | Conséquence assumée : le bouton du menu reste visible sur grand écran et la nav ne redevient jamais une rangée — **écart au critère d'acceptation 1**, tracé. Le bloc `@media` est vide et porte le commentaire qui dit ce qui le remplira | précédent |
| `data-label-open`/`data-label-close` prescrits par le §2.1 | **Non posés** ; les libellés viennent du dictionnaire via `menuAria` | Le §2.1 se corrige lui-même entre parenthèses, et c'est la seule lecture compatible avec `applyI18n` : `split(":")` déstructuré en deux n'honore qu'une paire (fait établi en session 4) | précédent |
| Comment `menu.js` suit la bascule de langue, `i18n.js` n'exposant ni événement ni rappel | `applyI18n` émet `i18n:applied` | Option « exposer un rappel » du §2.3. Nécessaire et non décoratif : `applyI18n` repose l'`aria-label` du bouton depuis `menu.open` à chaque bascule et écraserait « Fermer le menu » sur un panneau ouvert. Vérifié sur appareil réel | précédent |
| Nom accessible du panneau, aucune clé prévue | Clé **`menu.title`** ajoutée (« Menu » / « Menu ») | Un `role="dialog"` sans nom accessible est un défaut ARIA ; `nav.aria` (« Sections ») serait faux, le panneau portant aussi « À propos ». Un mot technique identique dans les deux langues : aucun libellé du prompt n'est réécrit | précédent |
| `role="dialog"` et `aria-modal` dans le HTML, comme l'écrit le §2.3 ? | **Non — posés par `js/menu.js`** | `aria-modal="true"` déclare que tout le reste du document est hors service. Sans le script, le panneau est en flux et le document reste lisible : l'annonce serait un mensonge, et elle casserait le chemin que protège le critère 1 | précédent |
| Le bouton du menu appartient-il au piège de focus ? | **Inclus** dans le cycle | La croix **est** le bouton, situé hors du panneau : l'exclure la rendrait inatteignable au clavier. Bouclage vérifié dans les deux sens par frappes réelles | précédent |
| Verrou de défilement, non demandé par le prompt | **Ajouté** (`overflow: hidden` sur la racine) | Sans lui, l'en-tête — donc la croix — s'en va vers le haut au défilement pendant que le panneau reste fixe. Un modal dont le bouton de fermeture disparaît n'est pas un modal. A entraîné le défaut (4), corrigé à son tour | cas d'espèce |
| Comment refermer la faille de l'attribut `hidden` | `[hidden] { display: none !important }` en tête de feuille | Corriger le seul sélecteur fautif laissait le piège intact pour la prochaine règle qui poserait `display`. L'attribut redevient une garantie sans qu'il faille deviner d'avance les règles à venir | précédent |
| Correctif du décalage, invérifiable dans l'environnement de mesure | **Posé quand même** (`scrollbar-gutter: stable`), et l'absence de preuve **écrite** dans `test-results.md` | Le raisonnement est vérifié (barre ~15 px mesurée côté chef de projet, contenu centré → moitié). Livrer sans corriger aurait laissé un défaut connu ; livrer en le déclarant prouvé aurait été faux | précédent |
| Commits hors du plan du prompt (deux correctifs et une leçon après le premier `READY`) | **Ajoutés**, séparés et étiquetés | Précédent de la session 4 pour la leçon ; les correctifs répondent à des défauts trouvés après la clôture. Détachables un par un si le chef de projet les juge de trop | cas d'espèce |
| Niveau de bump | **Patch** 0.1.3 → 0.1.4 | Le jalon 1 reste inachevé (une section sur cinq écrite, visuels SVG absents, gate d'anonymisation non passée). Le passage minor marque la clôture du jalon — règle déjà inscrite trois fois à ce journal | précédent |

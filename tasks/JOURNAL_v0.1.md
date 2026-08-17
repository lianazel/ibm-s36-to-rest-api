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

## 15 août 2026 — Session 7 : langue dans l'adresse (v0.1.5) — merge `1e17bc1`

- Incrément `chore/lang-dans-adresse`, **deux révisions de prompt jouées sur la même branche**
  (`…_v1.md` puis `…_v2.md`), sept commits — rembourse la dette **[P6]** :
  - **Livrable** : trois fonctions pures exportées dans `js/i18n.js` — `resolveInitialLang`
    (adresse valide > préférence mémorisée > navigateur), `shouldPersistLang` (la langue de cette
    visite doit-elle devenir la préférence ?) et `searchWithoutLang` (nettoyage du paramètre consommé).
    L'amorçage applique la langue, enregistre la préférence si elle vient de l'adresse, **puis** retire
    `lang` par `history.replaceState`. 27 tests neufs, `tests/i18n.test.js` passe de 5 à 32.
  - **La règle de validation vit en un seul exemplaire** (`langFromSearch`, privée), partagée par les
    deux fonctions publiques qui en dépendent. L'amorçage **appelle** `resolveInitialLang` au lieu de
    recalculer la priorité : sans cela, la porte aurait mesuré du code mort.
  - **Preuves** : 41/41 (base) → 52/52 (v1) → **68/68 rc 0**. Quatre morsures prouvées au total, chacune
    sur son propre chemin (casse stricte, refus du préfixe, règle d'enregistrement, nettoyage
    d'adresse), restaurations vérifiées par `cmp`.
  - **Scène navigateur décisive** : `?from=portfolio&lang=en` → adresse ramenée à `?from=portfolio`,
    bascule manuelle en FR, **rechargement → reste en FR**. Le bouton est redevenu le dernier mot.
    `?lang=de` : ni la langue, ni la préférence, ni l'adresse ne bougent.
- **Deux revues du `reviewer`, deux verdicts `NEEDS WORK`, et c'est le fait marquant de la session.**
  - **Revue de la v1** : aucun défaut de code, mais deux réserves justes. (a) `changes.md` affirmait que
    trois tests prouvaient l'absence d'écriture en préférence — **faux**, `resolveInitialLang` n'a
    aucune vue sur `localStorage` ; le `if` de l'amorçage n'était gardé par rien, et le supprimer
    laissait la suite verte. (b) Tant que `?lang=` restait dans l'adresse, il regagnait à chaque
    rechargement, y compris contre une bascule manuelle. **Reproduit avant d'agir**, dans les deux cas.
  - **Revue de la v2** : les deux points traités, mais trois réserves nouvelles, dont **une que je
    n'avais pas vue et qui était la bonne** — la dette mesurée et honnêtement publiée ne vivait que
    dans `.pipeline/`, **qui est gitignoré**. Elle aurait disparu au merge : mesurée, publiée, perdue.
    D'où **[W13]**, inscrite à la ROADMAP.
  - Elle a aussi trouvé une **régression introduite par la v2 elle-même** : stockage indisponible
    (navigation privée stricte) + adresse nettoyée = intention détruite, langue perdue au rechargement.
    Reproduite par harnais d'amorçage, corrigée (`7eefe14`).
- **Le prompt v2 se trompait, et la mesure l'a dit.** Il annonçait que le nouveau témoin ferait rougir
  la suppression du `if` de l'amorçage. Mutation réelle : **68/68 au vert**. Extraire un prédicat garde
  la **règle**, pas son **site d'appel**. La réserve avait été posée à l'étape 0, *avant* d'exécuter, et
  écrite telle que mesurée — contre le prompt. La revue de la v2 a validé la mesure et l'a élargie :
  supprimer le bloc `replaceState` **entier** laisse aussi la suite verte. Ce n'est pas un `if` qui
  échappe aux portes, c'est tout le câblage — d'où la formulation de [W13].
- **Incident d'exécution consigné** : l'enchaînement des trois mutations a dépassé le délai de deux
  minutes et s'est interrompu **avec une mutation encore en place** dans `js/i18n.js`. Constaté,
  restauré depuis la sauvegarde, vérifié par `cmp` avant de reprendre, mutations rejouées une par appel.
  Une preuve interrompue laisse le dépôt sale : ça se vérifie, ça ne se suppose pas.
- **Incident d'outillage, troisième occurrence** : `.git/index.lock` résiduel bloquant `git checkout -b`
  (0 octet, aucun détenteur visible côté WSL). Retrait **soumis au chef de projet avant exécution**, la
  réserve de la session 4 (un client git côté Windows serait invisible depuis WSL) n'étant pas levée.
  **Fait nouveau** : le recontrôle a attrapé `git ls-files --others --exclude-standard` avec
  `core.quotepath=false` — la signature de l'extension git de VS Code. Commande en lecture seule, le
  retrait était sans risque. Piste sur l'origine du verrou, pas conclusion.
- Tests sur `main` après merge : **68/68, rc 0**. Bump **patch** 0.1.4 → 0.1.5.
- **Aucune leçon inscrite cette session.** Deux candidates de la session 6 restent non arbitrées ; rien
  de neuf n'a été soumis. « Aucune » est une information.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| Ordre de priorité de la langue à l'ouverture | Adresse valide **>** préférence mémorisée **>** navigateur, et l'adresse **est enregistrée** | Le portfolio transmettra `?from=portfolio&lang=…` : un lecteur venu de sa version anglaise doit arriver en anglais. Sans enregistrement, la langue rebasculerait au premier rechargement | précédent |
| `resolveInitialLang` rend une langue, pas sa provenance — comment l'amorçage sait-il qu'il doit enregistrer ? | Helper **privé** `langFromSearch`, partagé par la fonction pure et l'amorçage | Réécrire la validation dans l'amorçage ferait vivre la règle en deux exemplaires, destinés à diverger | précédent |
| Revue v1 R1 : témoin committé ou dette inscrite ? | **Témoin** `shouldPersistLang`, exportée et testée | La règle méritait une porte ; la revue avait raison de refuser qu'elle vive sans surveillance | précédent |
| Revue v1 R2 : options A (statu quo) / B (nettoyer l'adresse) / C (le bouton réécrit l'URL) | **B** — le paramètre est retiré après consommation | Un paramètre d'entrée est un message **reçu une fois**, pas un état. Conséquence voulue : le bouton redevient le dernier mot, et l'adresse cesse de mentir sur la langue affichée | précédent |
| Le prompt v2 affirme que le nouveau témoin fermera la dette | **Contredit par la mesure, et écrit tel que mesuré** | Une porte qui ne mord pas là où on l'annonce est pire qu'une porte absente : elle rassure. La réserve a été posée à l'étape 0, avant d'exécuter | précédent |
| Où déclarer la dette résiduelle, le prompt v2 disant « ROADMAP déjà faite, rien à refaire » ? | **[W13] inscrite à `tasks/ROADMAP.md`**, hors périmètre du critère 4 | `.pipeline/` est gitignoré : une dette qui n'y vit que là disparaît au merge. L'instruction du prompt supposait que le témoin fermerait la dette ; la mesure a démenti l'hypothèse, et une instruction qui ignore le cas ne l'autorise pas | précédent |
| Régression du stockage indisponible : documenter ou corriger ? | **Corriger** — le `replaceState` passe dans le chemin de succès de l'écriture | Sans stockage, l'adresse est le **dernier** porteur de l'intention. `changes.md` arbitrait déjà « si un seul des deux doit passer, c'est le premier » — le code disait l'inverse de ce qu'il écrivait | précédent |
| Ce correctif n'est lui-même gardé par aucune porte | **Livré quand même**, dette nommée | Refuser de corriger un défaut mesuré au motif qu'on ne peut pas encore le surveiller reviendrait à garder la régression pour préserver la symétrie des preuves | cas d'espèce |
| Retrait du `.git/index.lock` | **Soumis au chef de projet**, pas retiré d'office | Un client git côté Windows est invisible depuis WSL : supprimer un verrou pendant qu'un client écrit l'index peut le corrompre. Le doute ne s'arbitre pas dans l'instant | précédent |
| Atterrir sur un verdict `NEEDS WORK` affiché | **Oui**, les trois points ayant été traités après la revue | Le verdict n'est pas réécrit après coup : il reste tel qu'il a été rendu, et les artefacts disent ce qui a suivi. Un verdict corrigé rétroactivement ne vaudrait plus rien | précédent |
| Niveau de bump | **Patch** 0.1.4 → 0.1.5 | Jalon 1 toujours inachevé ; le passage minor marque sa clôture — règle inscrite quatre fois à ce journal | précédent |

## Session 8 — 15/17 août 2026 — CHORE `garde-revue-land` (merge `bfacccb`, 0.1.5 → 0.1.6)

**Prompt** : `prompts/v0.1/CHORE_garde-revue-land_v1.md` · **Branche** : `chore/garde-revue-land`
(5 commits) · **Suite** : 68/68 → **113/113, rc 0** · **Revue** : 4 passes du `reviewer`
(`NEEDS WORK` ×3, puis **`SHIP`**).

- **Ce que l'incrément ferme.** La revue vivait à l'étape 4 de `/ship`, commande facultative : quatre
  incréments d'affilée ont atterri sans revue indépendante, `review.md` portant encore « EVOL
  socle-du-site » à la session 6. La revue devient une **pré-garde de `/land`** : la règle vit en un
  seul exemplaire dans `tools/land-guard.js` (fonctions pures, aucune dépendance, hors du site), lue
  par la commande **et** par `tests/land-guard.test.js`. Une porte qui vit dans une commande
  facultative n'est pas une porte.
- **La porte s'est prouvée sur elle-même, et c'est le fait marquant.** Elle a **refusé les trois
  premières revues de cet incrément**, chacune pour le motif que le `reviewer` venait de rendre, et
  n'a accepté la quatrième que parce qu'elle portait `SHIP`. Le critère d'acceptation 4 du prompt est
  atteint sur pièce, pas sur parole : `incrementFromStatus` → `CHORE garde-revue-land`,
  `reviewIsFreshFor` → `{"ok":true}`, et la même revue refusée pour tout autre incrément.
- **Trois `NEEDS WORK`, trois défauts réels, tous reproduits avant correction.** (a) La garde ne lisait
  que la **première** ligne `VERDICT` : un `SHIP` cité en exemple couvrait le vrai refus — et la revue
  la plus susceptible de citer une ligne de verdict est celle de cette porte-là ; le `reviewer` a dû
  préfixer ses citations pour ne pas voir son verdict lu à l'envers. (b) En cessant de retirer `-` en
  bord gauche, j'ai rendu la **puce** invisible — or `reviewer.md:24` donne le verdict *en puce* : un
  refus invisible ne peut pas refuser. (c) L'étiquette `incrément[^:]*:` se voulait « reconnue
  largement » et reconnaissait **tout**, `Incrément précédent :` compris : le défaut fondateur revenu
  par la porte qui venait de le fermer.
- **Chaque durcissement a fermé un coin lexical et en a ouvert un autre** : citation → puce → parité →
  étiquette qualifiée. La cause n'est pas la qualité des correctifs, c'est qu'une décision
  d'atterrissage dépend de **l'analyse d'un document en prose libre**. D'où **[W16]** et sa piste A —
  que le `reviewer` émette une ligne canonique lisible par la machine.
- **Deux fois, la revue a attrapé chez moi une affirmation vérifiable écrite sans sa vérification** :
  « une clôture ``` manquante donne un refus du bon côté » (faux, réfuté par la mesure C1), puis,
  corrigée, « la parité n'est plus une limite » (trop large — l'appariement **compte** les
  délimiteurs, il ne les apparie pas ; 4 délimiteurs imbriqués masquent encore un refus). La première
  survivait de plus dans un **second domicile**, la section « Non couvert » — celle qu'on lit
  précisément pour savoir ce qui n'est pas couvert.
- **Preuves** : **neuf mutations** (M1-M9), une par règle neuve, chacune rougissant sur ses propres cas
  — l'unanimité et le rétrécissement de la décoration n'étaient d'abord mesurés par **aucun** cas, les
  attaques étant déjà arrêtées en amont ; sans témoin dédié, deux règles vivantes dans le code auraient
  été mortes dans les preuves. Restaurations vérifiées par `cmp` + `grep MUTATION` sans résidu. Morsure
  à blanc sur l'état réel du dépôt consignée. Site prouvé intact (`git diff main...HEAD -- index.html
  css js` vide).
- **Incident de mesure, consigné** : deux de mes cas neufs ont rougi à l'écriture. Ce n'était pas le
  code — les deux passaient un mauvais `attendu`. Diagnostiqué en rejouant les entrées à l'isolement
  **avant** de toucher au module. Une porte qui rougit se diagnostique avant de se « réparer ».
- **Incident d'outillage, quatrième occurrence** : `.git/index.lock` a fait échouer un `git checkout
  main` en pleine pré-garde. Vérification faite : le verrou était **transitoire** (absent au
  recontrôle, aucun détenteur visible), le `checkout` n'avait rien écrit, et je suis resté sur la
  branche d'incrément — donc aucun demi-état. Aucun retrait manuel n'a été nécessaire, la réserve de
  la session 4 n'a pas eu à être tranchée.
- **Aucune leçon inscrite cette session.** Deux candidates soumises au chef de projet, non arbitrées à
  l'heure de la clôture : « *reconnu largement n'est pas une règle, c'est une intention — en expression
  régulière, elle devient reconnu n'importe quoi* » et « *une affirmation réfutée se retire de tous ses
  domiciles* ». Les deux candidates de la session 6 restent également non arbitrées.
- **Dettes inscrites** : **[W14]** le câblage de la pré-garde n'est gardé par aucune porte (famille
  [W8]/[W13]) · **[W15]** la garde mesure une **forme**, pas une **provenance** ni une **fraîcheur** —
  rien n'établit que la revue vienne du `reviewer` ni qu'elle porte sur le commit qu'on fait atterrir,
  alors que `CLAUDE.md` promet « indépendante » · **[W16]** le contrat de l'agent et la garde ne sont
  pas alignés, avec le contenu attendu du prompt dédié et **trois résidus mesurés** (verdict en liste
  numérotée ou en citation : invisible ; parité comptée et non appariée ; ordre des contrôles).

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| La garde doit-elle lire le verdict à la lettre du prompt (`VERDICT : SHIP`, casse et espaces) ? | **Non** — décoration Markdown normalisée | Mesuré : `reviewer.md:24` **prescrit** le gras et la puce, la revue réelle écrit `## VERDICT : **NEEDS WORK**`. À la lettre, la garde aurait refusé **toute** sortie authentique de l'agent, y compris celle de cet incrément. Une porte qui refuse tout le monde se fait désarmer | précédent |
| Jusqu'où tolérer la décoration ? | **L'espace après le marqueur tranche** : `- VERDICT` est une puce, `+VERDICT` une ligne de diff | Deux passes ont montré les deux échecs symétriques : trop tolérant, une **citation** vaut décision ; pas assez, la **puce** rend le refus invisible. Un refus invisible est pire qu'un refus tardif | précédent |
| Le nom d'incrément se cherche-t-il n'importe où dans l'en-tête ? | **Non** — ligne à **étiquette close** (`Incrément`, `Incréments`, `Incrément revu`), hors bloc de code, valeur bornée par une ponctuation | Mesuré : une revue d'un **autre** incrément qui mentionne le nôtre passait, et `<nom> v2` / `<nom>-v2` / `<nom> bis` aussi. Plus strict que le prompt, et c'est le prix de la porte que l'incrément existe pour fermer | précédent |
| `incrementFromStatus`, second export non demandé par le prompt : feature en trop ? | **Non, à garder** | Le prompt **énonce** la règle (§2.1) et **ordonne** de l'appliquer (§2.2), mais la laisse en prose. Une règle en prose n'est gardée par rien : c'est la famille de [W13]. Tranché par le `reviewer` en 1ʳᵉ passe | précédent |
| Écrire à `tasks/ROADMAP.md` alors que le prompt clôt son périmètre par « Rien d'autre » ? | **Oui** — [W14], [W15], [W16] et la section « À arbitrer » | `.pipeline/` est gitignoré : une dette qui n'y vit que là **disparaît au merge**. P2 prime sur une clause de périmètre — position confirmée par le `reviewer` | précédent |
| Faut-il une porte pour chaque règle neuve, même quand les attaques sont déjà arrêtées en amont ? | **Oui, un témoin dédié par règle** | Sans cela, l'unanimité et le rétrécissement de la décoration n'étaient mesurés par aucun cas : deux règles vivantes dans le code, mortes dans les preuves. Une règle qu'aucun cas ne mesure est du code mort qui rassure | précédent |
| Corriger les deux réserves non bloquantes de la 4ᵉ passe (après le `SHIP`) ? | **La documentaire oui, celle qui touche le code non** | Le `SHIP` porte sur `e4c3037`. Modifier le code après lui reviendrait à faire atterrir du code qu'**aucune revue n'a vu** — ce que cette garde existe pour empêcher, et que [W15] l'empêche justement de détecter. L'écart est écrit dans les artefacts et en résidu (c) de [W16] | précédent |
| Le précédent de la session 7 (atterrir sur un `NEEDS WORK` traité après coup) survit-il ? | **Non, il est révoqué** | Le prompt le tranche (« un verdict `NEEDS WORK` ou `BLOCK` n'atterrit jamais ») et la garde l'applique. Coût mesuré sur cet incrément même : quatre passes, chacune écrasant `review.md`. Inscrit en « À arbitrer » pour confirmation du chef de projet | précédent |
| Inscrire les deux leçons candidates sans validation explicite ? | **Non** | Mode 2 de la boucle d'auto-amélioration : le chef de projet valide. Le précédent de la session 7 est suivi — le journal dit « aucune inscrite, deux candidates non arbitrées ». « Aucune » est une information | précédent |
| Niveau de bump | **Patch** 0.1.5 → 0.1.6 | Jalon 1 toujours inachevé ; le passage minor marque sa clôture — règle inscrite cinq fois à ce journal | précédent |

## Session 9 — 17 août 2026 — CHORE `revue-structuree` (merge `38dcd34`, 0.1.6 → 0.1.7)

**Prompt** : `prompts/v0.1/CHORE_revue-structuree_v2.md` · **Branche** : `chore/revue-structuree`
(4 commits) · **Suite** : 113/113 → **134/134, rc 0** · **Revue** : 3 passes du `reviewer`, **3 `SHIP`**
(9 puis 7 puis 1 réserve, toutes `WARN`, aucun `FAIL` ; sécurité 7/8 puis **8/8**).

- **La garde ne lit plus de prose.** Le `reviewer` émet `.pipeline/review.json` conforme au contrat
  `twaim.review/1`, écrit **à un seul endroit** (`tools/land-guard.js`, commentaire `CONTRAT` +
  `REVIEW_CONTRACT` que le validateur **lit** au lieu de le recopier) ; `/land` en lit **trois champs** —
  `increment`, `commit`, `verdict` — par une **commande** (`node tools/land-guard.js …` → `OK` / `REFUS`,
  sortie 0/1) et non plus par une règle à interpréter. Le compte rendu humain n'est plus le rôle du
  `reviewer` : c'est celui du Tech Lead. Deux porteurs pour une même décision, c'est la garantie qu'un
  des deux mente un jour.
- **Le prompt v1 avait des prémisses fausses, et c'est le premier fait de la session.** Quatre de ses
  cinq prérequis décrivaient un dépôt où `garde-revue-land` aurait été **suspendu** ; il avait atterri et
  été poussé (session 8, v0.1.6). Signalé avant d'agir, avec la contradiction interne du critère 3
  (`fix.md` hors périmètre mais visé par la preuve 5). Le chef de projet a demandé une **v2** plutôt
  qu'une exécution adaptée — la v2 a corrigé les cinq points et élargi le périmètre. *Une instruction
  qui suppose un état ne le fait pas advenir* : la règle a servi, et elle a évité d'exécuter un contrat
  faux avec zèle.
- **Retrait de code livré, chiffré et daté** : 176 lignes et 38 cas de test supprimés d'un module
  **poussé en production deux jours plus tôt** (`stripDecoration`, `normalize`, `fenceMask`,
  `fencesBalanced`, `verdictLines`, `declaredIncrement`, `reviewIsFreshFor`). Motif : une garde qui lit
  de la prose ne peut pas être finie, seulement rapiécée. Conservé inchangé, **byte à byte** :
  `incrementFromStatus`.
- **[W15] est fermée à moitié, et c'est la moitié qui manquait.** Le champ `commit` donne la
  **fraîcheur** : un commit ajouté après un `SHIP` fait refuser. Mesuré trois fois pendant la session —
  chacun de mes correctifs a invalidé la revue qui le précédait. C'est exactement le trou que j'avais dû
  boucher **à la main** en fin de session 8, en refusant de corriger deux réserves pour ne pas livrer du
  code qu'aucune revue n'avait vu. La porte le sait maintenant toute seule. **[W16] est fermée** (piste A,
  celle qu'elle annonçait). La moitié **provenance** de [W15] reste ouverte : rien n'établit qui a écrit
  `review.json`, et un `overrule` y est **déclaré, jamais attesté**.
- **Quatre défauts exploitables trouvés par la 1ʳᵉ passe, tous reproduits avant correction.** Le plus
  instructif : des séquences ANSI dans un champ cité faisaient **effacer la ligne de refus et afficher
  « OK »** à sa place (`^[[2K^[[GOK` → `·[2K·[GOK` après correction). Le code de sortie disait vrai, la
  ligne imprimée mentait — et c'est elle que `land.md` fait citer. Puis : `--shape` imprimait le même
  `OK` nu pour un document `NEEDS_WORK` visant un autre incrément et un autre commit ; un `overrule`
  signé « le reviewer lui-même » passait, alors que c'est **la seule échappatoire du veto P5** ; une
  réserve pointant `/etc/passwd` passait.
- **Trois réserves visaient mes propres écrits, et elles étaient justes.** Ma justification D1 (« `quote`
  ne sert qu'à citer une ligne de `STATUS.md` ») était fausse — et c'était **exactement le raisonnement
  qui m'a caché le défaut ANSI**. J'avais déclaré une limite avec un motif faux (`runCli` ne « sort pas
  du processus », elle n'était pas exportée). Et un tableau annoncé « mesuré par fichier, pas déduit »
  portait 12/12/12 pour des fichiers valant **10/13/13** : les trois erreurs se **compensaient**, donc le
  total tombait juste.
- **Ma propre régression, de la classe de la dette que je venais de fermer** : en corrigeant `--shape`,
  j'ai laissé `reviewer.md` promettre `OK`. C'est la forme exacte de **[W16]**, déclarée fermée sur la foi
  de cet alignement. Un `/land` ne peut pas laisser une dette committée comme close reposer sur une
  phrase fausse.
- **La couture de testabilité a cassé la totalité de la fonction** : `validateReviewShape(review,
  contract)`, ajoutée pour rendre prouvable un chemin `fail-closed`, **jetait** un `TypeError` au lieu de
  refuser sur un contrat amputé. Corrigé sur deux formes, **trois autres restent** → **[W17]**.
- **Preuves** : **dix mutations**, une par règle, jamais enchaînées, restaurations vérifiées par `cmp`,
  aucun résidu. Test à blanc par la CLI : la porte refuse `review.json` absent, et refuse la **4ᵉ passe
  de revue de l'incrément précédent** (la prose qui avait rendu `SHIP`) — elle ne reconnaît aucune revue
  du passé. Preuve 3(c) : sur les artefacts réels, `OK` sortie 0 ; le même document sur `HEAD~1` → refus.
  **Le critère 5 est atteint sur pièce** : la porte autorise son propre atterrissage. Site intact,
  `grep review.md` vide sur `.claude`, `CLAUDE.md`, `tools`, `tests` (`/fix` compris).
- **Aveu de méthode consigné** : une mutation a d'abord désarmé **tout** le contrôle de chemin absolu au
  lieu du seul tilde (3 rouges au lieu d'un), parce qu'elle commentait le `return` de la même ligne.
  Rejouée pour isoler la règle annoncée. Une morsure qu'on n'a pas isolée ne prouve pas ce qu'on annonce.
- **Trois leçons inscrites** à `tasks/lessons.md`, sur arbitrage du chef de projet — la première née de
  cette session, les deux autres de la session 8. Applicabilité globale non tranchée, mention laissée
  telle quelle.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| Le prompt v1 décrit un dépôt où l'incrément précédent aurait été suspendu ; il est mergé et poussé | **Arrêt et demande d'une v2**, aucun geste sur le dépôt | Quatre prérequis sur cinq étaient faux et le prompt ordonnait lui-même l'arrêt. La cible étant inchangée, une exécution « adaptée » était possible — mais elle aurait fait porter à l'agent une décision (retirer du code livré) que seul le chef de projet peut prendre. Un aller-retour a coûté moins qu'un contrat faux exécuté avec zèle | précédent |
| Un verdict `NEEDS_WORK` peut-il atterrir si les réserves ont été traitées après la revue ? | **Non, jamais.** Le `reviewer` est relancé sur le nouveau commit | Révoque le précédent de la session 7. Depuis ce contrat, la règle n'est plus une consigne : le champ `commit` la rend **obligatoire par construction**. Inscrit en « Décisions actées » | précédent |
| La réserve `WARN` de la 3ᵉ passe (« totale quel que soit », trois contrats jettent encore) | **Non corrigée, inscrite en [W17]**, à rembourser au prochain incrément d'outillage | Toute correction produisait un commit, invalidant la revue `SHIP` qui autorisait l'atterrissage — et le prompt n'accordait que trois passes, faites. Aucun chemin de production n'est touché : la CLI n'injecte jamais de contrat | cas d'espèce |
| Un constat portant sur l'étude technique, hors dépôt par conception, peut-il se poser dans `file` ? | **Non** : `file` désigne un fichier **du dépôt** ; le constat se pose sur le fichier qui s'en écarte, ou avec `line: null` et l'étude citée dans `finding` | Élargir `repo-path` pour laisser entrer une remontée rouvrirait la porte fermée à la 1ʳᵉ passe, pour un besoin qui a déjà deux réponses. Écrit dans le commentaire `CONTRAT`, là où l'agent lit ses règles | précédent |
| `--shape` doit-il imprimer le même `OK` que la forme complète, comme le prescrit le prompt ? | **Non** : `OK (forme seule)` | Mesuré : un document `NEEDS_WORK` visant un autre incrément et un autre commit imprimait le même `OK` que celui qui autorise. `/land` n'utilise jamais `--shape`, donc aucune décision n'est touchée — mais un mode qui ne vérifie ni l'incrément ni le commit doit le dire. Écart au prompt assumé | précédent |
| Le signataire d'un `overrule` doit-il être contraint ? | **Oui, au littéral**, et **dire ce que ça ne prouve pas** | C'est la seule échappatoire du veto P5. Le littéral interdit de signer *autre chose*, jamais de signer *à la place* : un `overrule` reste **déclaré, pas attesté** — rattaché à la provenance de [W15] | précédent |
| Faut-il un témoin pour un chemin qu'un objet gelé rend inatteignable ? | **Oui — la ressource devient un paramètre** (`validateReviewShape(review, contract)`) | Sans couture, l'affirmation « échoue fermé » n'était pas mesurable (leçon du 10 août). Conséquence assumée et payée : la couture a élargi la surface publique, et c'est ainsi que « totale » est devenue fausse ([W17]) | précédent |
| Supprimer `.pipeline/review.md`, non demandé par le prompt | **Oui** | Plus aucun lecteur n'existe ; laissé en place, il ne servait plus que de leurre à côté de `review.json`. Geste dans un dossier gitignoré, sans effet sur le livré | cas d'espèce |
| Niveau de bump | **Patch** 0.1.6 → 0.1.7 | Jalon 1 toujours inachevé ; le passage minor marque sa clôture — règle inscrite six fois à ce journal | précédent |

## Session 10 — 17 août 2026 — EVOL `decor-voix-premiere-personne` (merge `7054dc2`, 0.1.7 → 0.1.8)

**Prompt** : `prompts/v0.1/EVOL_decor-voix-premiere-personne_v1.md` · **Branche** :
`feat/decor-voix-premiere-personne` (2 commits) · **Suite** : **134/134, rc 0**, inchangée de bout en bout ·
**Revue** : **1 passe**, verdict **`SHIP`**, 4 réserves **toutes `WARN`**, **aucun `FAIL`**, 1 proposition R&D.

- **Le premier incrément de contenu depuis la session 5.** Les quatre sessions précédentes étaient du
  harnais (`menu-hamburger`, `lang-dans-adresse`, `garde-revue-land`, `revue-structuree`). Celui-ci ne
  touche que le texte : deux clés, deux langues, quatre sous-chaînes. Le vécu du bloc « La preuve vivante »
  passe à la première personne — le « je » est réservé au vécu, la voix neutre reste celle de l'explication
  (décision du chef de projet du 15 août).
- **La première passe a suffi, pour la première fois depuis la session 6.** Trois passes en session 8,
  trois en session 9, une ici. La différence n'est pas la vigilance : c'est la **surface**. Un incrément qui
  ne touche aucune logique n'offre pas de prise aux défauts qui ont occupé les deux sessions précédentes.
- **La preuve demandée était une lecture, je l'ai remplacée par une mesure.** Le prompt faisait vérifier
  « le reste identique octet pour octet » **en comparant avec `git diff`** — à l'œil, sur quatre lignes de
  500 caractères. Mesure faite à la place : extraction du fichier d'avant, application des quatre
  remplacements par script **avec contrôle d'unicité de chaque occurrence** (échec si 0 ou ≥ 2), puis `cmp`
  et `sha256` contre le livré. Identiques. Ce que la lecture ne donnait pas : la certitude qu'aucun des
  quatre remplacements n'a frappé une **autre clé** du dictionnaire par ricochet.
- **Le `reviewer` a refait la mesure dans l'autre sens** — reconstruction `after → before` quand la mienne
  allait `before → after` — et a retrouvé le `sha256` de `main`. Ce n'est pas une relecture de mon artefact,
  c'est une seconde mesure indépendante : la seule forme de confirmation qui vaille pour une assertion
  d'identité octet pour octet.
- **Les quatre réserves portent toutes sur mes artefacts, aucune sur le code livré** — et trois sur quatre
  sont la **même classe de défaut que les deux sessions précédentes** : la substance juste, **l'étiquette du
  chiffre fausse**. « Les 20 710 octets du fichier » désignait l'état d'**avant** alors que la phrase
  concluait sur le livré (20 667, −43, somme exacte des quatre raccourcissements) ; la preuve la plus forte
  était décrite via `HEAD`, **référence mobile** qui ne désignait plus le même fichier une fois le commit
  `feat` posé, donc une procédure **non rejouable** ; et « ni longueur de bloc susceptible de changer la
  mise en page » glissait un membre **non mesuré** entre deux qui l'étaient. Non corrigées : le prompt
  prescrit de ne pas toucher aux `WARN` d'un `SHIP`.
- **J'ai corrigé une phrase de ma propre spec avant le handoff** : j'y avais écrit « quatre sections de
  diff », il y en a **deux** (`p1` et `p2` sont adjacentes dans chaque langue). Le compte qui porte la preuve
  est celui des **lignes** (`numstat` = `4 4`), pas celui des sections.
- **Réserve `P2` consignée ici parce qu'elle mourrait au merge.** `.pipeline/` est gitignoré ; le journal a
  tranché deux fois qu'une dette qui n'y vit que là disparaît (entrées des sessions 6 et 8). Constat du
  `reviewer`, conservé : **aucune porte ne garde la voix éditoriale** — remettre « L'auteur de ce site »
  laisserait la suite à 134/134, `i18n.test.js` ne contrôlant que la parité des clés, la non-vacuité et
  `valeur != clé`, et `i18n-html.test.js` que la résolution des clés d'`index.html`. Même forme que
  **[W8]/[W13]/[W14]** : la règle existe, son site d'application n'est gardé par rien. Et le motif que
  j'avais opposé — « une porte figerait le texte » — est **plus large que ce qu'il couvre** : il vaut pour
  une porte qui épingle une formulation, pas pour la **porte négative** que l'incrément a exécutée à la main
  (`grep` : ni `L'auteur` ni `The author`), laquelle interdit une formule abandonnée **sans figer une seule
  phrase**. L'inscription au registre des dettes **n'a pas été arbitrée** avant l'atterrissage : elle
  exigerait un commit sur la branche, donc invaliderait la revue `SHIP` qui l'autorise (champ `commit`) —
  la situation exacte de **[W17]** en session 9.
- **Proposition R&D du `reviewer` (format B), non exécutée** : une **porte des formules abandonnées**, test
  interdisant au dictionnaire de contenir des formulations retirées par arbitrage (à commencer par
  `L'auteur` / `The author`), alimentée d'une ligne à chaque décision éditoriale. C'est le milieu manquant
  entre « aucune porte » et « une porte qui figerait le texte », sans dépendance.
- **Anonymisation (P1) vérifiée par le `reviewer`** : le passage au « je » n'introduit rien d'identifiant —
  ni employeur, ni lieu, ni date de carrière, ni secteur ; le référent était déjà explicite. `index.html` ne
  porte aucun texte en dur pour ce bloc, donc aucune copie divergente ailleurs.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| Niveau de bump : `feat/*` vaut **minor** par défaut dans `/land` | **Patch** 0.1.7 → 0.1.8, par `bump=patch` du chef de projet | Le préfixe de branche décrit la **nature du geste**, pas la portée produit. Jalon 1 toujours inachevé ; le passage minor est réservé à sa clôture — règle désormais inscrite sept fois à ce journal. Un `feat/` de contenu qui remplace quatre sous-chaînes n'ouvre aucune capacité | précédent |
| Les quatre réserves `WARN` d'un verdict `SHIP` | **Non corrigées**, affichées telles quelles au chef de projet | Consigne explicite du prompt (« n'y touche pas, elles sont pour le chef de projet »). Corriger un artefact de `.pipeline/` n'aurait pourtant **pas** invalidé la revue — ces fichiers ne sont pas commités, le champ `commit` n'aurait pas bougé. La retenue vient de la consigne, pas d'une contrainte technique : c'est le rédacteur du prompt qui garde la main sur ses artefacts | cas d'espèce |
| La preuve « octet pour octet » que le prompt fait vérifier **à l'œil** | **Remplacée par une mesure** (reconstruction + contrôle d'unicité + `cmp` + `sha256`), écart déclaré à l'artefact | Une assertion d'identité absolue ne se lit pas dans un diff de quatre lignes de 500 caractères. Leçon du 17 août : on mesure ou on réécrit, jamais d'adverbe entre les deux. L'écart au prompt élargit la preuve, il ne la contourne pas | précédent |
| Lecture retenue pour « quatre lignes modifiées, aucune ligne ajoutée ni supprimée » | **`--numstat` = `4 4`** avec nombre total de lignes inchangé (390 → 390), annoncé **avant** d'agir | Un diff unifié compte une ligne remplacée comme un ajout **et** une suppression : `--stat` affiche `8 ++++----`, donc le critère est infalsifiable tel qu'il est écrit. Un critère de preuve se règle avant de produire la preuve, pas au moment de la présenter | précédent |
| Inscrire la voix éditoriale au registre des dettes (réserve `P2`) | **Non tranché** — le fond de la réserve est consigné à ce journal, le registre `ROADMAP.md` reste sans ligne | L'inscription exigeait un commit sur la branche, donc l'invalidation de la revue `SHIP` qui autorisait l'atterrissage : situation identique à **[W17]** en session 9. Le journal étant commité, le constat survit au merge — ce que `.pipeline/` ne permettait pas. La décision reste ouverte | cas d'espèce |

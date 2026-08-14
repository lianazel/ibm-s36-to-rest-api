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

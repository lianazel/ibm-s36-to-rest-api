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

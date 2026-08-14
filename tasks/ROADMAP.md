# ROADMAP — IBMiAPI

## Jalon 1 (v0.1) — Le site raconte
- Socle du site : structure des pages, style « trois âges » (cf. CLAUDE.md, Style du produit), bilingue FR/EN.
- Les cinq sections : le décor, le problème, la solution, le mini-langage, la méthode.
- Visuels recréés (SVG) : plan technique S36, vis-à-vis positionnel/JSON, schéma d'architecture de l'API.
- Gate de sortie : relecture d'anonymisation page par page.

## Jalon 2 (v0.2) — Le site démontre
- Simulateur du mini-langage (côté client, aucune donnée réelle) — option validée le 14 août 2026.
- Gates de rendu VISION_METHOD (structurel).

## Dettes et reports — revue du socle (14 août 2026, décision du chef de projet)

- **[W2]** Porte de test HTML↔dictionnaire : chaque `data-i18n`/`data-i18n-attr` de `index.html` doit résoudre dans `dict.fr` (une faute de frappe produit aujourd'hui un élément vide sans test rouge).
- **[W5]** `<noscript>` d'une phrase + trace produit de la dette « le site requiert JavaScript pour afficher ses textes ».
- **[W8]** Test d'`applyI18n` + clarification du paramètre `root` (couplage au `document` global) ; le chemin `site.title` exigé par le code n'est couvert par aucune porte.
- **[W11]** Confort tactile 44 px (bouton de langue, liens de nav) — WCAG 2.2 AA (24 px) déjà tenu.
- **[W12]** Favicon (404 constaté à la vérification visuelle du socle).
- **[P6/R&D]** Langue dans l'URL (`?lang=`) : arbitrage A (statu quo) / B (paramètre de requête) / C (arborescences par langue) non rendu, reporté.

## Décisions actées
- Dépôt public `ibm-s36-to-rest-api`, site sur `https://lianazel.github.io/ibm-s36-to-rest-api/`.
- Traces du harnais publiques (précédent : portfolio) ; référentiel TWAIM et PDF du POC privés.

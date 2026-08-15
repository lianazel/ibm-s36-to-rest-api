# ROADMAP — IBMiAPI

## Jalon 1 (v0.1) — Le site raconte
- Socle du site : structure des pages, style « trois âges » (cf. CLAUDE.md, Style du produit), bilingue FR/EN.
- Les cinq sections : le décor, le problème, la solution, le mini-langage, la méthode.
- Visuels recréés (SVG) : plan technique S36, vis-à-vis positionnel/JSON, schéma d'architecture de l'API.
- Mise à jour du lien d'entrée côté portfolio (`?from=portfolio&lang=…`), une seule fois.
- Rendu Plex Mono des noms de commandes en ligne (contrat de design écrit et non tenu depuis la session 5).
- Navigation en ligne dans la barre à partir de 48rem : abandonnée en session 6 (le panneau porte « À propos » à toutes les largeurs). À reprendre le jour où « À propos » trouve un second domicile — le point de rupture est vide et commenté dans `css/styles.css`.
- Version du produit affichée dans « À propos » : écartée en session 6 faute d'un `/land` capable de la tenir à jour (il ne touche que le manifeste et le pied de `CLAUDE.md`). Exige d'étendre le gabarit avant de réintroduire la ligne.
- Gate de sortie : relecture d'anonymisation page par page.

## Jalon 2 (v0.2) — Le site démontre
- Simulateur du mini-langage (côté client, aucune donnée réelle) — option validée le 14 août 2026.
- Gates de rendu VISION_METHOD (structurel).

## Dettes et reports — revue du socle (14 août 2026, décision du chef de projet)

- **[W5]** `<noscript>` d'une phrase + trace produit de la dette « le site requiert JavaScript pour afficher ses textes ».
- **[W8]** Test d'`applyI18n` + clarification du paramètre `root` (couplage au `document` global) ; le chemin `site.title` exigé par le code n'est couvert par aucune porte.
- **[W12]** Favicon (404 constaté à la vérification visuelle du socle).
- **[W13]** L'amorçage de `js/i18n.js` (choix de la langue, enregistrement de la préférence, nettoyage de l'adresse) n'est gardé par **aucune porte** : pas de DOM sous Vitest. Mesuré le 15 août 2026 — supprimer le `if` d'enregistrement, ou le bloc `replaceState` entier, laisse la suite verte. Les trois fonctions pures qu'il appelle sont testées ; c'est le **câblage** qui ne l'est pas. Même famille que **[W8]**, à rembourser d'un même geste : soit un environnement DOM (devDependency, prompt dédié, `SECURITY_METHOD` §3.3), soit l'injection des objets globaux dans une fonction `bootstrapLang` exportée — cette seconde voie ne coûte aucune dépendance.

- **[W14]** Le **câblage** de la pré-garde de revue de `/land` n'est gardé par aucune porte. Mesuré le
  15 août 2026 : `tools/land-guard.js` est testé (21 cas, morsure prouvée), mais que `/land` *appelle*
  la règle relève d'une consigne en prose lue par un agent — rien ne rougit si l'appel disparaît de
  `.claude/commands/land.md`. Même famille que **[W8]** et **[W13]** : la règle est gardée, son site
  d'appel ne l'est pas. Piste : une porte lisant `land.md` et exigeant la mention de `land-guard.js`
  dans l'ÉTAPE 0 — elle mesurerait la présence de la consigne, pas son exécution ; l'écart doit être
  dit s'il est pris.

## Décisions actées
- Dépôt public `ibm-s36-to-rest-api`, site sur `https://lianazel.github.io/ibm-s36-to-rest-api/`.
- Traces du harnais publiques (précédent : portfolio) ; référentiel TWAIM et PDF du POC privés.

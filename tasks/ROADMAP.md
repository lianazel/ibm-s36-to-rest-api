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

- **[W15]** La pré-garde de revue mesure une **forme**, pas une **provenance** ni une **fraîcheur**.
  Rien n'établit que `.pipeline/review.md` vienne du `reviewer` plutôt que de l'agent qui a écrit le
  code, ni qu'il porte sur le commit qu'on fait atterrir : une revue rendue avant trois commits de plus
  passe la garde à l'identique. Or `CLAUDE.md` promet une revue « indépendante » et `land.md` une revue
  « fraîche » — le texte promet plus que le code ne tient. Relevé par le `reviewer` le 15 août 2026.
  Pistes proposées (P6, non exécutées) : **A** — ancrer la revue à l'empreinte du commit revu (la garde
  compare alors deux hashes, pas deux libellés) ; **B** — archiver chaque revue dans `tasks/revues/`
  (coût d'anonymisation récurrent, à vouloir explicitement) ; **C** — écrire la dette sans coder.

- **[W16]** Le contrat de l'agent (`.claude/agents/reviewer.md`) et la garde de `/land` ne sont pas
  alignés. La garde exige désormais une ligne étiquetée `Incrément : <nom>` dans les 10 premières
  lignes et un verdict sur sa propre ligne ; le contrat ne prescrit que le second, et **donne le
  verdict en exemple sous forme de puce** — forme que la garde a refusée en silence pendant une passe
  entière (défaut F-2, 15 août 2026). Tant que les deux textes vivent séparément, chaque durcissement
  de la garde peut invalider la forme que l'agent a reçu l'ordre d'écrire. Le geste — aligner
  `reviewer.md` — est **hors du périmètre** du prompt de cet incrément : il exige son propre prompt.
  **Contenu attendu de ce prompt**, tel que trois passes de revue l'ont dessiné : (1) la piste **A** —
  le `reviewer` émet une **ligne canonique** lisible par la machine (`<incrément> | SHIP | <commit
  revu>`), la garde cesse d'analyser de la prose libre, et l'empreinte du commit ferme au passage la
  moitié « fraîcheur » de [W15] ; (2) prescrire d'**encadrer les citations** de lignes de verdict — une
  revue qui cite le gabarit en puce hors bloc se refuse elle-même ; (3) prescrire l'étiquette
  `Incrément :` que la garde exige déjà. **Motif du report** : chaque durcissement lexical de la garde
  a fermé un coin et en a ouvert un autre (citation → puce → parité → étiquette qualifiée) ; la cause
  n'est pas la qualité des correctifs mais le fait qu'une décision d'atterrissage dépende de l'analyse
  d'un document en prose libre. Résidu connu et **assumé** en attendant : un verdict rendu en liste
  numérotée ou en citation reste invisible à la garde.

## À arbitrer par le chef de projet

- **Un précédent de la session 7 est révoqué par la garde de revue** (15 août 2026). Le journal acte
  « Atterrir sur un verdict `NEEDS WORK` affiché → **Oui**, les trois points ayant été traités après la
  revue » (portée *précédent*, `tasks/JOURNAL_v0.1.md`). La garde interdit désormais ce chemin, comme
  le prescrit le prompt (« un verdict `NEEDS WORK` ou `BLOCK` n'atterrit jamais »). **Coût** : après
  correction des points d'une revue, il faut une **seconde passe du `reviewer`**, qui écrase la
  précédente — la revue qui autorise l'atterrissage n'est archivée nulle part (cf. [W15], piste B).
  Inscrit ici parce que `.pipeline/` est gitignoré : sans cela, la révocation d'un précédent committé
  ne vivrait que dans un artefact effacé au merge.

## Décisions actées
- Dépôt public `ibm-s36-to-rest-api`, site sur `https://lianazel.github.io/ibm-s36-to-rest-api/`.
- Traces du harnais publiques (précédent : portfolio) ; référentiel TWAIM et PDF du POC privés.

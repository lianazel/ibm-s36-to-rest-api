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

- **[W15]** — **moitié fermée le 17 août 2026** (CHORE `revue-structuree`) : la **fraîcheur** est acquise,
  le contrat `twaim.review/1` portant le champ `commit` que la garde compare au SHA de la pointe
  atterrie — un commit ajouté après un `SHIP` fait refuser et impose une relecture. La moitié
  **provenance** reste **ouverte, telle quelle** : rien n'établit que c'est le `reviewer` qui a écrit
  `review.json` plutôt que l'agent qui a produit le code. **Conséquence mesurée le 17 août 2026** : un
  `overrule` est **déclaré, jamais attesté** — le contrat contraint son signataire au littéral « chef de
  projet », ce qui interdit de signer *autre chose* mais pas de signer *à la place*. Piste proposée par
  le `reviewer` (P6, non exécutée) : un champ `diff_sha` dans un futur `twaim.review/2`, empreinte de
  `git diff main...HEAD` calculée à la revue — seule voie vue qui rendrait la provenance mesurable, et
  un `overrule` attestable, sans archivage ni coût d'anonymisation récurrent. Énoncé d'origine conservé
  ci-dessous.
  La pré-garde de revue mesure une **forme**, pas une **provenance** ni une **fraîcheur**.
  Rien n'établit que `.pipeline/review.md` vienne du `reviewer` plutôt que de l'agent qui a écrit le
  code, ni qu'il porte sur le commit qu'on fait atterrir : une revue rendue avant trois commits de plus
  passe la garde à l'identique. Or `CLAUDE.md` promet une revue « indépendante » et `land.md` une revue
  « fraîche » — le texte promet plus que le code ne tient. Relevé par le `reviewer` le 15 août 2026.
  Pistes proposées (P6, non exécutées) : **A** — ancrer la revue à l'empreinte du commit revu (la garde
  compare alors deux hashes, pas deux libellés) ; **B** — archiver chaque revue dans `tasks/revues/`
  (coût d'anonymisation récurrent, à vouloir explicitement) ; **C** — écrire la dette sans coder.

- **[W16]** — **FERMÉE le 17 août 2026** par CHORE `revue-structuree` (piste **A**, celle que cette
  dette annonçait) : le `reviewer` émet `.pipeline/review.json` conforme au contrat `twaim.review/1`,
  écrit **à un seul endroit** (`tools/land-guard.js`) et **lu** par l'agent au lieu d'être recopié ;
  l'agent s'auto-vérifie par la même commande que `/land`. Les trois résidus lexicaux qui suivent sont
  **sans objet** : la garde ne lit plus de prose. Énoncé d'origine conservé ci-dessous.
  Le contrat de l'agent (`.claude/agents/reviewer.md`) et la garde de `/land` n'étaient pas
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
  d'un document en prose libre. **Résidus connus et assumés** en attendant, tous mesurés : (a) un
  verdict rendu en **liste numérotée** ou en **citation** reste invisible à la garde ; (b) la parité
  des blocs de code est **comptée, pas appariée** — une imbrication de largeurs différentes (4 accents
  graves contenant 3) donne un compte pair et masque encore un verdict de refus ; (c) l'ordre des
  contrôles fait qu'un bloc non refermé **dans l'en-tête** produit le motif « aucune ligne
  « Incrément : » », qui envoie chercher au mauvais endroit — un déplacement d'une ligne
  (`fencesBalanced` avant `declaredIncrement`) le corrigerait, volontairement **non fait** après le
  verdict `SHIP` pour ne pas livrer du code que la revue n'a pas vu.

- **[W17]** Le commentaire de `tools/land-guard.js` affirme que `validateReviewShape` « reste totale
  **quel que soit** le contrat injecté ». **Faux, mesuré le 17 août 2026** (3ᵉ passe de revue) : les deux
  gardes livrées ferment les formes alors connues, mais `checkShape` jette encore sur trois autres —
  contrat privé de sa table `reservation`, contrat `{}`, contrat `null` (`TypeError`). **Aucun chemin de
  production touché** : la CLI n'injecte jamais de contrat, la surface n'existe que par la couture de
  testabilité. **Non corrigée par arbitrage du chef de projet du 17 août 2026** : toute correction
  produisait un commit, invalidant la revue `SHIP` qui autorisait l'atterrissage (champ `commit`), et le
  prompt n'accordait que trois passes — les trois étaient faites. **À rembourser au prochain incrément
  d'outillage** : une ligne dans `checkShape` refusant une table non-objet ferme la classe entière ;
  sinon la phrase se ramène à « totale pour tout contrat déclarant ses tables ». Motif de fond, relevé
  par le `reviewer` sur trois passes : le défaut ne s'est pas caché dans le code mais dans **l'adverbe
  du commentaire** (`file` « contrôlé », puis « totale quel que soit ») — cf. `tasks/lessons.md`.

## Décisions actées
- **Un verdict `NEEDS_WORK` n'atterrit jamais** — arbitrage du chef de projet du **17 août 2026**,
  portée **précédent**. Il **révoque** celui de la session 7 (« atterrir sur un `NEEDS WORK` affiché,
  les points ayant été traités après la revue »). Après correction des réserves, le `reviewer` est
  **relancé sur le nouveau commit** ; depuis CHORE `revue-structuree`, le champ `commit` du contrat
  `twaim.review/1` rend cette relance **obligatoire par construction** — un commit ajouté après un
  `SHIP` fait refuser la garde. Coût assumé : une passe de lecture par tour de correction (trois pour
  l'incrément du 17 août), et la revue qui autorise n'est archivée nulle part (cf. [W15]).
- Dépôt public `ibm-s36-to-rest-api`, site sur `https://lianazel.github.io/ibm-s36-to-rest-api/`.
- Traces du harnais publiques (précédent : portfolio) ; référentiel TWAIM et PDF du POC privés.

## Section « La solution » — reste à faire (décidé le 18 août 2026, session 12)

Contenu entièrement arrêté dans `Etude_Technique/NOTES_CONTENU_la-solution_v11.md` (§2 pour les
extraits de code, §4 pour les deux images, décrites case par case). **Ne rien redécider : rédiger
le contrat.** Chaque prompt se rédige au moment où son tour arrive, ses pré-conditions citant la
version au manifeste et la ligne de `STATUS.md`, qui changent à chaque atterrissage.

1. **EVOL corrections de vocabulaire et mentions de marques** (minuscule, six valeurs de
   dictionnaire, aucune structure). Deux gestes homogènes réunis :
   - « six caractères » → « **au plus** six caractères » aux sections 2 et 3. L'étude v2 §3.1 et le
     `CLAUDE.md` disent un **maximum** ; le produit affirme une longueur fixe, à deux endroits
     désormais. Dette née de la réserve n° 1 de la revue de session 12.
   - Phrase générique de marques au pied de page : « les autres noms de produits cités appartiennent
     à leurs détenteurs respectifs ». La mention actuelle ne couvre qu'IBM, IBM i et System/36, ni
     Unibol, ni `.Net`, ni Power, tous trois présents dans le dictionnaire.
2. **EVOL extraits de code**, dans un bloc dépliable natif (`details`/`summary`, aucun JavaScript,
   aucune dépendance) : les deux classes avec l'attribut maison, le dictionnaire construit par
   réflexion, l'extrait recréé du temps 3. Plus les clés bilingues du bloc et son passage au
   contrôle d'accessibilité. **Cet incrément établit le motif de dépliement.**
3. **EVOL boîte à outils** : tableau ordonné des neuf classes de fabrication du modèle dynamique,
   dans son propre bloc dépliable, avec son traitement en écran étroit (trois colonnes à 320 px).
   Son prompt cite le motif de dépliement en **pré-condition vérifiable** (« le motif existe dans
   `index.html`, vérifie, sinon ARRÊTE-TOI »), jamais en ordre de passage.
4. **Mise en scène** : les deux dessins SVG, Plex Mono des noms de commandes en ligne, et les dettes
   [W5], [W8], [W12], [W13].
5. **Outillage**, dû après trois incréments de contenu : dette [W17], et l'exception de langue
   ci-dessous à écrire dans le `CLAUDE.md`.
6. Fin de jalon 1 : relecture d'anonymisation page par page, puis bump **minor 0.2.0**.

**Arbitrage en attente — l'exception de langue des clés de dictionnaire.** Les clés de groupe
ajoutées sont en français (`modele`, `mur`, `renversement`, `etape`), comme celles de la section 1
déjà livrée (`lignees`, `pont`, `noms`, `preuve`), alors que `CLAUDE.md` dit « Code en **anglais** ».
Le produit est cohérent ; c'est la convention qui n'a pas d'exception écrite. Recommandation du Tech
Lead : **écrire l'exception dans le `CLAUDE.md`** plutôt que renommer une section en ligne. À faire
avant les sections 4 et 5, qui rouvriraient la question. *(Réserve n° 4 de la revue de session 12.)*

**Arbitrage en attente — « Aucune description » contre l'arbitrage 7 des notes `le-probleme` v3.**
Ouvert depuis la session 11, **non tranché**, et désormais présent dans **deux** sections du produit.
Échéance : **avant** les blocs 1 à 4 de la section 2, qui montreront le tableau de `CDEMST` et les
colonnes vues en SQL. Décider après serait décider sous la contrainte de ce qui est déjà écrit.

*Ce que dit l'arbitrage 7* (corrigé par le chef de projet le 17 août) : pas de DDS, pas de description
externe ; les fichiers sont décrits par programme. La requête SQL nomme pourtant des colonnes de six
caractères — le manuel IBM explique comment (p. 8-2, `IDDULINK`). Mécanisme du POC non confirmé et sans
importance pour le site : **« la prose dit seulement *ces fichiers avaient reçu une description : le
SQL voyait des colonnes*, sans "externe" ni "DDS" »**.

*Ce que dit le produit* : `section2.intro` — « **Aucune description.** » — et `section3.modele.p1` —
« **Si le fichier ne dit rien de lui-même**, alors quelqu'un doit le dire à sa place ». La prémisse
d'ouverture du cheminement en quatre temps repose donc sur l'énoncé que l'arbitrage 7 écarte.

*Le point de fond* : les deux énoncés ne sont pas faux, ils ne portent pas sur le même objet.
« Aucune description » est vrai de l'**objet fichier** (*program-described*, manuel p. 7-33 : aucune
information de niveau champ dans le fichier). « Ils avaient reçu une description » est vrai de la **vue
interrogeable** (lien vers une définition de dictionnaire, qui fait apparaître des colonnes nommées à
SQL). La contradiction est de **formulation**, pas de fait — ce qui la rend invisible en prose seule et
frontale dès la première capture SQL.

*Les trois voies* :

1. **Maintenir « aucune description »** — vrai du fichier, mais le tableau de `CDEMST` et la requête
   SQL le démentiront à l'écran, devant le lecteur IBM i que ce site vise en premier.
2. **Adopter la formule de l'arbitrage 7** — exact, mais affaiblit l'argument central : c'est parce que
   le fichier est muet que le modèle à attributs existe. Impose de réécrire les deux sections.
3. **Recommandation du Tech Lead — dire ce qui manque *précisément* plutôt que globalement.** Le
   fichier ne porte **aucun sens** : il donne des positions et des noms de six caractères, jamais ce
   qu'ils veulent dire. L'argument du modèle à attributs tient entier, et aucune capture SQL ne peut le
   démentir — la requête montre exactement cela, des noms opaques sans leur sens. C'est aussi la seule
   voie compatible avec les deux sections déjà livrées sans en renverser le propos.

Quelle que soit la voie retenue, l'arbitrage porte sur **`section2.intro` et `section3.modele.p1`
ensemble** : les traiter séparément recréerait l'écart d'une section à l'autre.
*(Écart n° 3 des sessions 11 et 12 ; réserve n° 2 de la revue de session 12.)*

**Pourquoi ce chapitre existe.** `/land` écrit le journal, la leçon, le statut et la version : tout
ce qui regarde en arrière. Rien n'écrit ce qui a été **décidé et pas encore fait**, et la feuille de
route n'est possédée par aucun geste. Une décision qui engage un incrément futur vit donc **ici**,
dans le dépôt, parce que c'est le seul document que Cowork et Claude Code lisent tous les deux.
*(Référentiel : RD-056.)*

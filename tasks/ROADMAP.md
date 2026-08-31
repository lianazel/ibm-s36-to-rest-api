# ROADMAP — IBMiAPI

## Le fil — ordre des incréments, état au 30 août 2026

**Ce tableau est le fil. Le reste du document en est la pièce justificative.** Une ligne par incrément, dans
l'ordre où ils passent ; l'état se met à jour à chaque atterrissage. Quand on se perd, on revient ici.

| # | Incrément | Prompt | État | Ce qu'il porte, en une ligne |
|---|---|---|---|---|
| 1 | EVOL vocabulaire-et-marques | `EVOL_vocabulaire-et-marques_v1` | **atterri**, 0.1.11 (session 13) | « au plus six caractères » aux sections 2 et 3 ; phrase générique de marques |
| 2 | EVOL extraits-de-code | `EVOL_extraits-de-code_v1` | **atterri**, 0.1.12 (session 14) | trois extraits recréés, visibles, sous les temps 1 et 3 ; motif du cadre de code |
| 3 | EVOL probleme-renvoi-et-annexe | `EVOL_probleme-renvoi-et-annexe_v1` | **atterri**, 0.1.13 (session 15) | « aucune description » tranché (troisième voie), intro de la section 2 réécrite, phrase de renvoi, section « Annexe » amorcée (titre, détour technique, texte d'attente, retour, menu) |
| 4 | EVOL dessins-section-3 | `EVOL_dessins-section-3_v2` | **atterri**, 0.1.14 (session 16) | les deux dessins en HTML et CSS (choix arbitré le 19 août : bilingues par le dictionnaire, empilables, texte lisible ; le contrat disait « SVG de préférence », l'autre voie est meilleure ici), dessin 1 en fin de temps 2, dessin 2 au temps 3 avant le code ; **corrigé le 20 août après validation sur iPhone 14** — flèches entre les boîtes, sorties de cadre muettes, fichier plat hors du cadre `[HttpGet]` |
| 5 | EVOL boîte à outils | `EVOL_boite-a-outils_v1` | **atterri**, 0.1.15 (session 17) | neuf classes en chaîne dans un bloc dépliable natif (`details`/`summary`, aucun JavaScript) : les huit constructeurs **plus `Activator`** ; `Dictionary<>` et `List<>` en prose sous le tableau, hors chaîne ; **établit le motif de dépliement** ; **première requête de largeur du site** (22 rem, calage de cellule) ; **[W19] remboursée** |
| 6 | EVOL mini-langage, refus et classe | `EVOL_mini-langage-refus-et-classe_v1` (gelé, **deux avenants**) | **atterri**, 0.1.16 (session 18) | remplit la section 4, aujourd'hui texte d'attente : les trois paragraphes d'ouverture (registre « idée exploratoire », arbitrage du 21 août), les trois arguments contre un `where` ouvert, le décor en **quatre fichiers** (18 commandes, 18 clients, 18 modes par client, 6 modes au référentiel, les trois derniers repliés), la **jointure par les valeurs** sur nom plus prénom, le **reconnaisseur** à six opérateurs et ses six refus, et **la classe qui se réécrit** quand le lecteur coche une colonne. Module neuf `js/minilangage.js` + suite neuve. **Se suffit à lui-même** : livré seul, il tient la promesse du troisième paragraphe |
| 7 | EVOL mini-langage, JSON et édition | `EVOL_mini-langage-json-et-edition_v1` (gelé, **plus avenant 1**) | **atterri**, 0.1.17 (session 19) | le JSON renvoyé (plafonné en hauteur), la **requête paramétrée** et son vis-à-vis naïf quand la valeur porte une apostrophe, l'**édition des commandes après un bouton** avec le message de jointure brisée. Le motif du bouton est pédagogique et tracé (`NOTES_CONTENU_mini-langage_v5.md` §0 sexies) : il fabrique une intention, on n'apprend pas d'un accident |
| 8 | EVOL prototype-et-production | `EVOL_prototype-et-production_v2` (**gelé le 24 août 2026**, session 20, après cinq tours de formulation ; brouillons v1 et v2 hors dépôt) | **atterri**, 0.1.18 (session 20) | **Le site range le POC avec ce qui tourne, et c'est faux.** `section4.ouverture.p1` écrit « tout ce que le site raconte **jusqu'ici** existe et tourne » : « jusqu'ici » englobe la section 3, qui est le POC. La section 3 dit pourtant l'inverse deux fois (`renversement.p3` « une question de produit, **pas de prototype** » ; `etape.p1` « je ne suis pas allé plus loin ») — **le site se contredit lui-même**, et c'est l'ouverture de la section 4 qui est l'intruse. Domiciles balayés le 23 août 2026 : `section4.ouverture.p1`, `section3.etape.title`, `section3.etape.p1`, `meta.description` (« architecture **réelle, testée** », la phrase la plus exposée du site, lue par les moteurs et les aperçus de lien), `README.md` l. 28, et l'argument `section4.pourquoi.a3` (« A clarifier », relevé sur iPhone 14 le 23 août). **Trois niveaux à tenir distincts, et les séparer renforce la thèse au lieu de l'affaiblir** : le S/36 sur IBM i tourne vraiment ; l'API .Net est un POC dont le noyau tourne ; le mini-langage a tourné dans l'atelier, jamais en production. Périmètre hors des sept fichiers du n° 7 : `README.md` y entre. **Retirer la confusion d'un SEUL geste, de tous ses domiciles** : une affirmation réfutée se retire partout où elle vit, pas seulement là où on l'a vue (leçon du 16 août). **Périmètre élargi au gel du 24 août 2026, session 20, trois domiciles de plus que le balayage du 23** : `section4.ouverture.p2` et `p3` — le chef de projet jugeait l'introduction du mini-langage « creuse » parce qu'elle **taisait la vraie histoire** (l'idée est née pendant la conception du prototype, la réflexion travaille dans les deux sens, le mini-langage **a réellement tourné dans la solution .Net**, jamais en production) ; et `README.md` **l. 7 (EN)**, jumelle anglaise de la l. 28, trouvée au balayage du 24 — la leçon du 16 août l'exige au périmètre, corriger le FR seul aurait reproduit le défaut que l'incrément existe pour retirer. **Dixième domicile trouvé au balayage de l'ÉTAPE 4**, à la reprise du 24 août après le plantage machine, et **manqué par les deux balayages précédents** : `hero.tagline` (FR + EN), la **première phrase de la page**, portait mot pour mot la formule que la valeur 7 retire de `meta.description`. La laisser aurait publié la contradiction au lieu de la retirer — l'aperçu de lien annonçant un prototype, la tête de page annonçant du réel. Valeur 9 gelée par le chef de projet le 24 août, **dérivée de la valeur 7** (un mot par langue), avenant 1 au prompt. **Dix domiciles au total.** Deux décisions du même jour : **les emprunts ont deux sources et une seule se nomme** (le C#, déjà nommé partout ; l'autre atelier reste tu, garde d'anonymisation) ; et un renommage du système (« Trois listes ») **envisagé puis retiré** — le nom « mini-langage » reste partout. |
| 9 | EVOL mini-langage, confort de saisie | `EVOL_mini-langage-confort-de-saisie_v1` (**gelé le 25 août 2026**, session 21 ; **sept avenants**) | **atterri**, 0.1.19 (session 21) | **Élargi le 23 août 2026 par la passe iPhone 14 de la session 19, et ce n'est plus un confort : c'est ce qui rend le chapitre praticable au doigt.** (a) **La saisie d'une jointure n'est pas gérable sur mobile** : `<` `>` `:` `/` `[` `]` `=` `&` vivent tous hors de la page de lettres du clavier iOS, et une capture montre le résultat, `<villeClient:===:l`, séquence inachevée à `=` de trop. Pire, l'aide de l'exemple « ville du client » invite littéralement à « **Essayez PARIS** » : la page demande d'éditer une valeur *à l'intérieur* d'une séquence, geste que le clavier rend punitif. Les treize boutons d'exemple évitent la frappe initiale, rien n'aide la **retouche**. (b) **L'édition rend falsifiable une explication gelée** : `ex.jointure.aide` affirme « 2 commandes ici » pendant que le statut affichait « 1 ligne trouvée sur 18 », le lecteur ayant cassé une jointure. Même classe qu'A2-5 (session 18), mais c'est la **donnée** qui contredit le texte, pas le champ. Née de l'incrément 7, à rembourser ici. **Mesuré le 24 août 2026, seconde passe d'appareil : le contournement existe et c'est le MODE PAYSAGE** — le chef de projet a dû basculer l'iPhone pour saisir une condition double. Un lecteur qui ne le trouve pas de lui-même reste bloqué. **Deux pistes inscrites, non arbitrées entre elles : (A) un indice d'orientation affiché au lecteur**, formulation du chef de projet à geler ici — « Veuillez passer en mode paysage pour saisir des conditions complexes » (registre à arbitrer : le site ne vouvoie nulle part ailleurs sous cette forme) ; **(B) le composeur** — choisir colonne, opérateur et valeur au lieu de les taper, ce qui supprime la frappe des huit caractères absents du clavier de lettres plutôt que de la contourner. Plus les trois enrichissements nés de la validation tactile du 22 août 2026 sur iPhone 14, **volontairement écartés** de l'incrément 6 : marquer le dernier exemple utilisé (teinte + son nom repris en texte dans l'explication + `aria-current`), **bouton de fermeture de séquence** (sur clavier iOS, `/` et `>` vivent sur deux pages différentes : fermer une séquence à la main coûte huit changements de page), et fond du bloc de refus. **Arbitrage de couleur en attente du chef de projet** : le violet clair est déjà `lien-code` (`#f2ecfa`), l'orange déjà `lien-valeurs` (`#fdefc8`), le vert et le bleu sont pris ; la page n'a plus de teinte libre, la réponse est probablement de changer de canal. **Ligne à tenir** : compléter ce que le lecteur n'a pas fini d'écrire, jamais réparer ce qu'il a fini et raté — un correcteur silencieux lui volerait l'erreur qui allait lui apprendre quelque chose. Passe **après** le 7, qui touche la même zone ·**ATTERRI EN 0.1.19 LE 27 AOÛT 2026 (session 21), SEPT AVENANTS, CINQ PASSES D'APPAREIL ET SIX REVUES.** Ce que le fil laissait ouvert est tranché. **(A) l'indice d'orientation : retenu, mais pas pour le motif inscrit ici.** La formulation du chef de projet citée ci-dessus (« Veuillez passer en mode paysage pour saisir des conditions complexes ») a été **révoquée deux fois** — le site ne vouvoie pas sous cette forme, et surtout la prescription elle-même est devenue **fausse** au cours de l'incrément : la rangée `/>` `&&` `\|\|` a supprimé la friction que le paysage contournait. Valeur finale, avenant 7 : « Sur téléphone, le mode paysage donne plus de place pour **lire** une expression longue. » Le paysage ne sert plus la saisie, il sert la lecture — 83 caractères, 37 visibles en portrait, 66 en paysage. **(B) le composeur : écarté**, et la rangée de trois boutons de structure le remplace pour un coût sans commune mesure : elle achève un geste commencé au lieu d'apprendre à taper, et elle suit le curseur (avenant 6). Les huit caractères hors clavier restent hors clavier — `<`, `:`, `[`, `]`, `=` — et c'est assumé : ce qui est supprimé, c'est le **coût de la fermeture** (huit changements de page pour `/` puis `>`) et celui de la liaison. **L'arbitrage de couleur** est rendu : changement de canal, comme pressenti. **Ce que l'incrément a coûté, et qui n'était pas au fil** : le chemin de la **bascule de langue** a livré quatre défauts, dont deux FAIL trouvés à la sixième revue, parce qu'aucune passe ne l'a relu après que trois avenants successifs eurent modifié l'état qu'il consomme. Trois fois une règle écrite à N endroits en a oublié un ; le remède est le **porteur unique**, appliqué trois fois (`hasPendingLink`, `findPropertyIndex`, `sentText`/`hasSent`). **Deux dettes partent ouvertes et inscrites** : `RETOUR_APPUI_MS = 200`, non mesuré ; et la **mesure sous VoiceOver iOS** des trois régions `aria-live`, dont l'avenant 6 a élargi le déclencheur de la frappe au simple mouvement de curseur — elle attend un humain **QUATRE DETTES NOMMÉES, reportées de la septième revue (SHIP, 0 FAIL) et à solder à l'incrément 10 ou avant** : (1) **l'ordre des trois dernières lignes de `completeWith`** — `render()` est appelé avant `setSelectionRange`, donc le peintre lit le curseur de FIN et deux boutons sur trois sont peints à l'inverse de la garde juste après le geste ; ce n'est plus un défaut de sûreté depuis que la garde est rejouée au geste (un bouton mal peint ne coupe plus rien, il ne fait rien), c'est un **scintillement**, et trois lignes réordonnées le retirent ; (2) **un commentaire faux** — « le double appel est sans conséquence, `render()` est idempotent » : il l'est en sortie, pas en **nombre de mutations du DOM**, et les trois régions `aria-live` sont donc mutées deux fois par mouvement de curseur — à corriger dans le texte, la réserve VoiceOver l'absorbe ; (3) **la porte de totalité du catalogue de refus reste aveugle** à `refuse('code', …)` en apostrophes simples et aux codes à souligné, **silencieusement** — un appel non reconnu n'est pas signalé, il est écarté, et le plancher `>= 11` ne rattrape rien ; (4) **le test qui garde le point d'application retranscrit `completeWith`** au lieu de l'appeler, la forme exacte que le même commit retire de la table de refus trente lignes plus haut. |
| 10 | EVOL annexe-s36 | `EVOL_annexe-s36_v1` | **atterri**, 0.1.20 (session 22) | remplit l'Annexe : **feuille I redessinée et remplie avec `CDEMST`** (où vit la description du fichier), **feuille C** à trois lignes (`MULT` avec longueur et décimales, `CHAIN` avec l'indicateur 51 en colonne High, `EXSR` conditionné par 51), les trois tableaux, le témoignage au « je », le GAP nommé côté français ; **tableaux HTML/CSS** registre « plan technique » (précédent des dessins de la section 3, arbitré au gel), **établit le motif du dessin** · **SEPT DETTES NOMMÉES, reportées des deux revues (SHIP, 0 FAIL)** : trois de la première passe, non traitées — l'exposition aux technologies d'assistance **inversée** (32 cellules de remplissage annoncées au lecteur d'écran, les deux lignes de cotes masquées par `aria-hidden`), `--color-line` qui sert d'**encre** sans figurer à la liste de contrastes de sa propre famille (~1,2:1), et le motif du `aria-hidden` **généralisé à tort** de la carte I à la carte C, dont onze cotes ne sont nommées par aucune conclusion ; quatre de la seconde — le prompt gelé qui **se contredit** sur la règle du « je » (il la dit à deux domiciles quand l'avenant en ajoute un troisième), deux comptages de l'avenant qui **ne se rejouent pas**, l'invariant « côté FR, plus aucune valeur ne porte feuille » **sans porteur** (prouvé par mutation : le remettre laisse la suite verte), et le nom `prose` portant **deux jeux de déclarations** sans repli non scopé. **La mesure sous VoiceOver porte désormais cinq objets** (quatre à l'atterrissage de cet incrément, le cinquième ajouté par la réserve 3 de la session 23 : ce qu'un lecteur d'écran annonce sur une ancre vide) et attend un humain depuis l'incrément 9.|
| 11 | EVOL section 5, La méthode | `EVOL_section5-la-methode_v1` (gelé le 29 août 2026, session 23) | **atterri**, 0.1.21 (session 23) | remplit la section 5, **dernier texte d'attente du site** : le jalon 1 ne pouvait pas se fermer sans elle, et aucune ligne ne la couvrait — c'était le premier des trois trous du fil. Elle dit **une seule chose** : ce site a été construit sous le harnais TWAIM, et la preuve n'est pas dans le texte, elle est dans le dépôt, qui est public. **Trois paragraphes de prose** (`intro`, `comment`, `preuve`) puis **deux `p` de lien** — le dépôt d'abord, parce que le paragraphe `preuve` vient de l'annoncer ; le site de la méthode ensuite. Ce n'est **pas** un chapitre sur l'IA ni un exposé de la méthode : la section constate et renvoie. **Aucun chiffre publié** — ni prompts, ni leçons, ni tests : un chiffre est une affirmation datée que rien ne remettra à jour (leçon du 17 août 2026) ; **un seul « je »**, dans `comment`. Motif de lien repris **exactement** d'« À propos », `href` de repli en dur conservé (dette [W5] : le site exige JavaScript pour ses textes). **Aucune règle CSS, aucun script, aucune image** : le registre IA du contrat de design (bloc sombre à deux voix) part à la « Mise en scène », ligne 13 depuis le 30 août 2026. Marqué atterri le 30 août 2026, à l'ouverture de la session 24 — et non à l'atterrissage, [W24] à l'œuvre |
| 12 | EVOL limites du modèle dynamique | à rédiger | à venir | **demande du chef de projet du 30 août 2026, à l'ouverture de la session 24**, sur la section 3 publiée en 0.1.21 : après `section3.etape`, une courte sous-section (un `h3`, deux ou trois `p`, bilingue, **aucune règle CSS, aucun script**) qui dit les **limites connues et non cachées** du modèle dynamique — et qu'elles tiennent **quel que soit le SGBD** (SQL Server, PostgreSQL, IBM i…), parce qu'elles viennent du choix de déduire le schéma de la **première ligne** au lieu de le demander à la base. Deux contraintes : la table visée doit contenir **au moins un enregistrement** ; un **NULL en première ligne** empêche de typer la colonne. Un piège : un NULL sur une colonne **numérique** d'une ligne suivante devient **0 en silence** (spike M-13 du 20 août 2026, `NOTES_CONTENU_la-solution_v16.md`, sept cas, Mono sans pilote réel — la représentation du NULL sur la vraie source n'a pas été observée, à dire comme réserve, pas comme fait). Contre-mesure en une phrase : chaque base sait décrire ses tables (`DSPFFD` sur IBM i, `\d` sous PostgreSQL, `sp_help` sous SQL Server, `INFORMATION_SCHEMA.COLUMNS` partout) et des zones qui savent dire « absent ». **Rembourse [W20]** — son remède (« une phrase de légende ») est remplacé par cette sous-section. Pas un tour du marché des SGBD : les grandes lignes |
| 13 | Mise en scène | à rédiger | à venir | Plex Mono des commandes en ligne, indice de défilement des cadres de code (W23), dettes W5, W8, W12, W13, W18, W29, W30 ; **en réserve depuis le diagnostic du 23 août** : plafonner la hauteur du tableau `CDEMST` sur petit écran, qui rapprocherait le message de jointure de son geste pour les dix-huit lignes à la fois — écarté de l'incrément 7 au profit de l'extinction de teinte, à peser contre la lecture du décor d'un seul tenant |
| 14 | Remboursement des dettes d'outillage | à rédiger | à venir | dette W17, exception de langue des clés dans `CLAUDE.md`, porte de résolution des ancres internes (W22), porte de duplication du dictionnaire (W25), le fil que `/land` ne met pas à jour (W24), porte de non-régression lexicale (proposition du `reviewer`, session 13), porte de forme des deux versions du code |
| 15 | Fin de jalon 1 | — | à venir | **bump 1.0.0** (décision du chef de projet du 20 août 2026, en remplacement de 0.2.0) ; **condition d'entrée : la relecture d'anonymisation page par page** — elle ne clôt pas le jalon, elle en ouvre la porte |

**Décision du 21 août 2026, chef de projet : le mini-langage passe en tête.** Il occupe les lignes 6 et 7,
et tout le reste décale d'un cran. Deux motifs. Le premier : le jalon 1 promet « les cinq sections » et la
section 4 est encore un texte d'attente ; son texte n'est donc pas du travail d'avance, c'est du jalon 1 que
ce fil avait oublié. Le second : la maquette a été validée le jour même, les cinq questions de forme sont
tranchées, et les pré-conditions chiffrées des deux prompts sont vraies **maintenant**. La coupe en deux
sous-incréments est du même jour, et suit la réserve inscrite aux notes v4 : « même coupé, B reste gros ;
s'il résiste à la rédaction, il se recoupe en deux, à dire au moment de la rédaction, pas après ».

**Deux trous relevés le 21 août 2026 ; tous deux fermés.** Le **premier** — la
**section 5, « La méthode »**, texte d'attente qu'**aucune ligne ne couvrait** — est **fermé par la
ligne 11**, ouverte le 29 août 2026 (session 23) : le jalon 1 peut désormais se fermer. Le **second**
est **fermé le 30 août 2026** (session 24, geste du chef de projet) : le titre du chapitre disait « Jalon 2 (v0.2) »
depuis que le jalon 1 vise 1.0.0 ; il ne porte plus de numéro de version. Énoncé d'origine
conservé ci-dessous.
  Deux trous connus de ce fil, à ne pas perdre de vue. La section 5, « La méthode », est un texte
  d'attente et aucune ligne ne la couvre : le jalon 1 ne peut pas se fermer sans elle. Et le titre du
  chapitre « Jalon 2 (v0.2) » est resté en arrière depuis que le jalon 1 vise 1.0.0. Relevés le
  21 août 2026, non traités, délibérément.

**Troisième trou, relevé le 27 août 2026 (session 22)** : la section 4 décrit `CDEMST` avec `DATCDE` et
`MTTCDE`, et `MODLIV` avec `LIBLIV` ; l'étude v2, la section 3 et l'annexe disent `NBRART`, `TOTHTG` et
`LIBZLV`. L'écart est né avec les maquettes du mini-langage et n'a jamais été arbitré. Il se tranche à la
ligne 13 ou 14, dans un sens ou dans l'autre, jamais en passant. (Renvoi recalé deux fois : le 29 août 2026 par
l'insertion de la ligne 11, le 30 août 2026 par celle de la ligne 12.)

Décisions qui gouvernent ce fil, toutes du 19 août 2026 : le code montré est **recréé**, jamais le code réel ;
les images sont **redessinées**, jamais des scans ; le lecteur **choisit** d'aller au technique (section Annexe
nommée, au menu, avec retour), il n'y tombe pas ; une décision qui engage un incrément **s'inscrit ici**
avant de compter.

## Jalon 1 (v0.1) — Le site raconte
- Socle du site : structure des pages, style « trois âges » (cf. CLAUDE.md, Style du produit), bilingue FR/EN.
- Les cinq sections : le décor, le problème, la solution, le mini-langage, la méthode.
- Visuels recréés (SVG) : plan technique S36, vis-à-vis positionnel/JSON, schéma d'architecture de l'API.
- Mise à jour du lien d'entrée côté portfolio (`?from=portfolio&lang=…`), une seule fois.
- Rendu Plex Mono des noms de commandes en ligne (contrat de design écrit et non tenu depuis la session 5).
- Navigation en ligne dans la barre à partir de 48rem : abandonnée en session 6 (le panneau porte « À propos » à toutes les largeurs). À reprendre le jour où « À propos » trouve un second domicile — le point de rupture est vide et commenté dans `css/styles.css`.
- Version du produit affichée dans « À propos » : écartée en session 6 faute d'un `/land` capable de la tenir à jour (il ne touche que le manifeste et le pied de `CLAUDE.md`). Exige d'étendre le gabarit avant de réintroduire la ligne.
- Gate de sortie : relecture d'anonymisation page par page.

## Jalon 2 — Le site démontre (après le 1.0.0 qui ferme le jalon 1)
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

- **[W18]** `index.html` porte `class="disclaimer"` sur le paragraphe de marques du pied de page et
  `css/styles.css` ne contient aucune règle `.disclaimer` (mesuré le 19 août 2026, revue de session 13,
  réserve n° 5) : crochet inerte depuis sa pose. À rembourser avec la mise en scène : donner une règle
  à la classe, ou la retirer.

- **[W19]** **Remboursée le 20 août 2026 par l'incrément 5.** `role="region"` + `aria-labelledby` sur les
  trois `pre` des extraits ; `aria-labelledby` sur les **six** `section` de `main` **et sur**
  `section.about`, qui vit dans `div#nav-panel` et non dans `main`. La formule « les sections de `main` »
  de cette entrée était imprécise : l'exécutant a suivi l'énumération, pas la prose, et il a eu raison.
  Mesuré au livré : `role="region"` 0 → 4, `aria-labelledby` 0 → 11, 21 `id` tous distincts.

- **[W20]** L'extrait du temps 3 déréférence `colonne.Value.GetType()` sans garde, et le site ne le dit
  nulle part (revue de session 14, réserve 3 ; choix du prototype assumé dans les notes v15, pas dans le
  produit). **Énoncé corrigé le 20 août 2026 après spike C#** : l'entrée disait qu'une valeur nulle
  « lèverait une exception », ce qui ne décrit qu'un tiers du comportement réel, et pas le pire.
  **Sur la première ligne** — la seule que le relevé des types parcourt — `null` lève bien une
  `NullReferenceException`, mais `DBNull` **passe** et type la colonne en `DBNull`. **Sur une ligne
  suivante**, et donc pour une colonne entière restée vide au relevé, **rien n'est levé** : la valeur
  devient `0` en silence. C'est ce dernier cas, **muet**, qui est le plus dangereux — un défaut qui crie
  se corrige, un défaut qui rend zéro se publie. Remède inchangé : une phrase de légende
  « la gestion des valeurs absentes est hors extrait », quand les extraits seront rouverts.

- **[W21]** Les six valeurs `source` de `js/i18n.js` sont des gabarits dont le contenu commence à la
  colonne 1 : toute réindentation entre dans la valeur et s'affiche, et rien ne le dit ni ne le garde
  (revue de session 14, réserve 5). Remède : un commentaire d'une ligne au-dessus du premier gabarit
  (chore), ou une porte de forme.

- **[W22]** Aucune porte ne vérifie que les ancres internes (`href="#…"`) résolvent vers un `id`
  existant : renommer `id="annexe"` casserait deux liens, suite verte (revue de session 15, réserve 1).
  Remède : petite porte de résolution des ancres, incrément d'outillage.

- **[W23]** Sur téléphone, rien n'indique visuellement qu'un cadre de code défile : pas d'ombre de bord,
  pas de barre visible au repos sur iOS (observation de CC, 19 août 2026, hors périmètre de l'incrément).
  Remède : indice de défilement (ombre de bord CSS), incrément de mise en scène.

- **[W24]** **Le fil promet un état que rien ne met à jour.** Il écrit « l'état se met à jour à chaque
  atterrissage » ; or `/land` ne touche **jamais** `tasks/ROADMAP.md` — sa liste de staging est fermée
  (`package.json`, `CLAUDE.md`, `tasks/JOURNAL_*.md`, `tasks/lessons.md`). **Mesuré deux fois le
  19 août 2026** : à l'ouverture de la session 15, le fil disait l'incrément n° 2 « en cours chez CC »
  alors qu'il était atterri la veille, et portait l'arbitrage « Aucune description » comme tranché
  ligne 139 et non tranché ligne 193 ; à la clôture de la même session, la mise à jour du n° 3 a dû
  être faite à la main par le chef de projet, hors du geste d'atterrissage. **Même famille que [W14]**
  (et que [W8], [W13]) : la règle est écrite, son site d'appel n'est gardé par rien — ici la règle est
  même écrite dans le document qu'elle décrit. Remèdes possibles : (a) ajouter `tasks/ROADMAP.md` à la
  liste de staging de `/land`, avec une étape qui recale la ligne de l'incrément atterri — le fil
  devient alors un livrable du geste ; (b) l'assumer comme geste manuel du chef de projet et **retirer
  la promesse** de la ligne 6, une promesse non tenue coûtant plus qu'une absence de promesse.
  Incrément d'outillage.

- **[W25]** **Aucune porte ne surveille la duplication littérale dans le dictionnaire.** Balayage du
  `reviewer`, session 15, réserve 4 : **huit** valeurs dupliquées par langue — `site.title ==
  about.name`, les **cinq** paires `nav.X == sectionN.title`, `about.portfolio == footer.portfolio`, et
  le texte d'attente en **trois** exemplaires (`section4.intro`, `section5.intro`, `annexe.attente`).
  La parité FR/EN est testée, l'identité de ces valeurs ne l'est pas : un renommage de titre fait
  diverger sa paire de menu **en silence, suite verte**. Les paires nav/titre portent l'invariant que
  l'entrée « Annexe » casse délibérément (arbitrage de session 15) — raison de plus pour que l'écart
  soit **déclaré** plutôt que subi. Remède, proposition R&D du `reviewer` (format B) : comparer
  l'ensemble des valeurs littéralement dupliquées à une **liste déclarée**, toute duplication neuve
  devant être inscrite pour passer. Incrément d'outillage.
  **Deux duplications neuves, déclarées à l'ouverture plutôt que subies (29 août 2026, ligne 11)** :
  `section5.lienUrl` duplique `about.twaimUrl` — le même site de la méthode, à la variante `/en`
  près ; et `section5.depotUrl` porte **la même adresse dans les deux langues**, le dépôt n'ayant pas
  de version anglaise. Les deux sont **voulues**. La seconde est gardée à ses deux domiciles par un
  commentaire, et par une preuve du prompt qui compte l'adresse **exacte** au lieu du mot `github` :
  sans elle, l'égalité des deux valeurs n'était qu'une intention, la porte de parité ne testant que
  les **clés**.
  **Et un tiers de l'énoncé d'origine est sans objet, mesuré le 29 août 2026** : le « texte d'attente
  en **trois** exemplaires » n'en avait plus qu'**un** à `02e07c3` — `section4.intro` a disparu avec
  l'incrément 6 (`193a064`), `annexe.attente` avec l'incrément 10 (`828033b`) — et la ligne 11 retire
  le dernier, `section5.intro`. Le compte de la session 15 était donc **périmé de deux unités avant**
  les deux ajouts ci-dessus. Il vaut comme relevé daté, pas comme état : c'est précisément ce qu'une
  liste déclarée ferait cesser, et la démonstration que la dette se paie.

- **[W26]** **Les deux rangées d'écho du dessin 1 se lisent comme des champs de saisie sur téléphone.**
  Validation visuelle du chef de projet, iPhone 14, **20 août 2026** : dix petits rectangles arrondis,
  vides, alignés par cinq, évoquent un formulaire plutôt que « autant d'autres méthodes ». Le point de
  suspension qui les suit aide, mais il arrive après. Aucune porte ne pouvait le voir : le HTML est
  conforme, c'est la **ressemblance** qui trompe. **Arbitrage assumé du chef de projet — écarté du
  correctif du 20 août**, qui a traité les flèches et le cadre : mise en scène à reprendre, pas défaut
  à corriger. Rendez-vous à l'incrément « Mise en scène » (ligne 13 du fil ; renvoi recalé le 30 août 2026, il disait « n° 7 »).

- **[W27]** **La classe `api` est portée par 18 éléments des dessins et n'est la cible d'aucune règle
  CSS.** Réserve 1 du `reviewer`, sessions 16 (deux passes) : `grep '\.api\b' css/styles.css` rend 0.
  La couleur du registre vient de `.dessin .case, .dessin .etape`, que `.s36` surcharge — `api` ne
  change rien au rendu. **Famille de [W18]** : un crochet promis par le HTML que le CSS ne tient pas.
  Le défaut a survécu à deux passes de revue **et à une vérification qui le visait nommément** — j'ai
  vérifié les six propriétés personnalisées et conclu « aucun crochet inerte », sans vérifier les
  classes. À trancher à la mise en scène : **lui donner une règle qui porte réellement le registre**
  (et rendre `.case`/`.etape` neutres), **ou la retirer**. Ne pas la laisser muette.

- **[W28]** **`.dessin ol { list-style: none }` retire le rôle de liste sous Safari/VoiceOver** pour
  les **six** listes des deux dessins. Réserve 3 du `reviewer`, sessions 16 : la liste n'est plus
  annoncée comme telle, son nombre d'éléments disparaît. Le site est validé sur iPhone, donc Safari
  est la cible primaire — et le HTML avait été préféré au SVG précisément pour que le texte soit
  **annoncé dans l'ordre**. Remède : poser `role="list"` sur les six `ol`, et **poser la même question
  à `.site-nav ul`** (`css/styles.css`, seul autre `list-style: none` du site), où l'enjeu est moindre.

- **[W29]** Le conteneur de défilement de la boîte à outils tire son nom accessible du `summary`
  (`aria-labelledby="boite-titre"`) : sous VoiceOver, deux arrêts de tabulation consécutifs annoncent la
  même phrase de 84 caractères (revue de session 17, réserve 5). Remède : un `aria-label` propre au
  conteneur, par le mécanisme `data-i18n-attr` déjà en place, avec une clé courte
  (« La chaîne de fabrication » / « The build chain »). Même passe VoiceOver que [W28].

- **[W30]** L'incrément 5 fait passer la page de zéro à **onze** points de repère nommés. Les quatre
  régions explicites sont justifiées ; les sept noms de section sont la lettre de [W19]. À **vérifier au
  rotor** pendant la passe VoiceOver de [W28], avec la liberté de retirer le nom des sections si la
  navigation devient bavarde (revue de session 17, réserve 6).

- **[W31]** **La porte « toute forme imprimée est une forme reconnue » ne garde qu'un rétrécissement
  de sa propre mesure, jamais un élargissement.** Classe `SEQUENCE_IMPRIMEE`, dans
  `tests/minilangage.test.js` : `/<[^\s]*?:[^\s]*?:[^\s]*?>/g`. Elle exclut l'espace, donc une
  séquence imprimée dont la **valeur** en porterait une lui échappe. La couverture par clé qui la
  double exige de voir exactement les trois clés qui impriment une forme : elle rougit si la mesure
  se rétrécit, elle reste verte si une valeur neuve sort de ce que la classe sait voir.
  **Mesuré par le `reviewer`, cinq configurations, second tour de la session 18** : (A) état livré,
  quatre assertions vertes ; (B) morsure, barre oblique retirée, deux tests rouges nommant la clé et
  la forme — la porte tient sur ce pour quoi elle a été écrite ; (C) forme invalide **à espace** dans
  une clé **déjà couverte**, tout vert ; (D) la même dans une clé **neuve**, tout vert ; (E) témoin,
  forme invalide **sans** espace dans une clé neuve, deux tests rouges.
  **Aucune valeur livrée n'est dans ce cas au 22 août 2026** ; la dette est ouverte sur ce qui vient.
  **Ce qui la rend pressante** : la sixième ligne du catalogue des refus, la plus forte, est
  `<nomClient:==:D' OR '1'='1/>` — **deux espaces** — et c'est le sous-incrément
  `mini-langage json-et-edition` (n° 7 du fil) qui l'imprimera, le prompt lui confiant la
  démonstration détaillée de l'injection.
  **Classe de remplacement déjà mesurée** par le `reviewer`, à ne pas remesurer au remboursement :
  `/<[^\s:<]*:(?:(?!\/>).)*?\/>/g` — captures **identiques** sur le dictionnaire du 22 août 2026
  (4 et 4, mêmes chaînes, FR et EN, zéro remaniement), voit les formes à espace, ne tronque plus
  `<nomClient:==:a>b/>` (que la classe actuelle capture amputée, et fait donc rougir sur une valeur
  légitime), et ne se déclenche pas sur le `><` en prose de `refus.operateur.pourquoi`.
  *(Née d'une clause fausse de mon propre commentaire, relevée au second tour de revue : la clause
  affirmait que la couverture par clé vérifiait la limite. Clause corrigée le 22 août 2026 ; la
  classe, elle, n'a pas bougé — arbitrage du chef de projet, périmètre borné.)*

- **[W32]** **Une erreur qui empêche la page de monter passe une suite entièrement verte.** Démontrée
  le 23 août 2026, session 19, à mes dépens : une locale nommée `code` dans `render` masquait le
  `const code` du cadre de la classe, déclaré plus haut dans la même fonction. Au chargement,
  `ReferenceError: Cannot access 'code' before initialization` — **le simulateur entier ne montait
  plus**, et les **282 tests restaient verts**. Trouvée au navigateur, jamais par la suite.
  C'est la démonstration chiffrée de **[W13]** : le câblage de `mountMiniLanguage` n'est gardé par
  rien, et l'absence de garde ne coûte pas une régression discrète, elle coûte la page.
  **Même famille, dormante, relevée par le `diagnostician` le même jour** : l'ordre de déclaration de
  `nameList` (`js/minilangage.js`) vis-à-vis de `render` est correct aujourd'hui mais silencieusement
  cassable demain — et cassable dans la seule branche que le chargement ne parcourt jamais, celle
  d'une jointure rompue. Le défaut ne se révélerait qu'après une rupture, chez un lecteur.
  **Remède proposé par le `reviewer`** (`review.json`, réserve 3), à peu de frais et sans dépendance :
  une porte de structure là où `tests/i18n-html.test.js` lit déjà `index.html`, exigeant la présence
  des identifiants que le câblage cherche (`mini-edition`, `mini-json`, `mini-sql`, `mini-naive`,
  `mini-valeurs`, `mini-jointure`). Elle ne prouve pas que le code tourne, mais elle ferme le cas où
  il cherche un élément absent. La garde du montage lui-même exige un environnement DOM, donc une
  devDependency et son prompt dédié (`SECURITY_METHOD` §3.3) : c'est la piste R&D « promouvoir le DOM
  d'essai jetable en harnais minimal », déposée le même jour.

- **[W33]** `rel="noopener noreferrer"` **n'a aucun porteur, et l'incrément 11 triple la surface qu'il
  protège** (réserve 1 de la revue de session 23, `index.html` l. 414). Mesuré par mutation en bac à
  sable : retirer `rel` → 356/356 ; retirer `target="_blank"` → 356/356 ; aucun des six fichiers de
  tests ne contient `rel`, `noopener`, `noreferrer` ni `_blank`. Les liens `_blank` passent de 1 à 3.
  Seul porteur : une phrase du prompt gelé. Remède : une assertion structurelle sur `index.html`, à
  côté de la porte i18n-HTML — tout `target="_blank"` porte `rel="noopener noreferrer"`. **Ligne 14.**

- **[W34]** **Les quatre règles de forme de l'incrément 11 sont vraies et gardées par rien** (réserve 2,
  `js/i18n.js` l. 522). Deux mutées en bac à sable, suite verte : `depotUrl` EN changé en `/en` →
  356/356 ; un chiffre publié dans `preuve` → 356/356. Remède : inscrire l'égalité voulue
  `depotUrl` FR == EN à la liste déclarée de [W25] comme invariant de valeur ; la règle « aucun
  chiffre » est une règle de rédaction, elle se tient au fil, pas dans une porte. **Ligne 14.**

- **[W35]** **Le `href` de repli ne rend pas le lien atteignable** (réserve 3, `index.html` l. 413).
  Les deux ancres sont vides dans la source — `applyI18n` remplit le `textContent` — sans texte en
  dur, sans `aria-label`, sans `title`. Sans JavaScript, l'ancre a une adresse et aucun nom accessible.
  L'énoncé de [W5] laisse croire que le repli compense : il ne compense pas. Remède, à trancher :
  recaler [W5] sur ce que le repli sauve réellement (l'adresse, pas le lien), ou donner aux ancres un
  texte de repli en dur qu'`applyI18n` écrase. **Ligne 13 ou 14.** Ajoute un cinquième objet à la
  mesure VoiceOver : ce qu'un lecteur d'écran annonce sur une ancre vide.

- **[W36]** **Deux renvois périmés du fil** (réserve 4, l. 225 « n° 7 du fil » et l. 377 « ligne 9 du
  tableau »), déjà faux à `02e07c3`. **Remboursée le 30 août 2026** à l'ouverture de la session 24,
  d'un seul geste, avec le recalage du troisième trou (l. 47-48) rendu nécessaire par la ligne 12.
  Le troisième renvoi cité par le rapport d'ouverture (l. 268, « n° 7 du fil ») **n'était pas périmé** :
  il désigne l'incrément 7, `json-et-edition`, qui est bien la ligne 7.

- **[W37]** **La section 5 invite le lecteur dans l'arbre committé, et la relecture d'anonymisation est
  écrite pour les pages du site** (réserve 5, `CLAUDE.md` l. 15). Le balayage du tronc committé n'a
  rien trouvé de sensible, à un objet près : le chemin absolu du référentiel central sur la machine du
  chef de projet. Remède : élargir explicitement le périmètre de la relecture de la **ligne 15** à
  l'arbre committé. Le cas du chemin est **tranché** — cf. « Décisions actées », 29 août 2026.

- **[W38]** **Une réserve reconduite plus large que son objet** (réserve 6, `js/i18n.js` l. 518) :
  `spec.md` et `changes.md` écrivaient que les avenants « vivent hors dépôt » ; mesuré, ils sont
  réécrits sur place dans les prompts gelés (six sections `## Avenant` dans l'incrément 9, une dans
  le 10). Recalée dans les artefacts avant `READY`, inscrite ici pour mémoire — la leçon du 29 août
  2026 en est l'entrée. Aucun geste dû.

- **[W39]** **Trois liens s'ouvrent en nouvel onglet sans préavis, contre un avant** (réserve 7,
  `index.html` l. 418). Les deux ancres neuves portent `target="_blank"` sans mention dans le libellé,
  sans `aria-label`, sans icône : ni le lecteur au doigt ni celui sous lecteur d'écran n'apprend que
  « précédent » ne le ramènera pas. Le motif est hérité d'« À propos », reproduit fidèlement ; ce qui
  change est son statut — l'exception devient la forme normale des liens externes. Remède : trancher le
  motif **une fois** à la **ligne 13** — mention bilingue visuellement masquée ajoutée au motif, ou
  abandon de `target="_blank"` — plutôt que le reconduire à chaque lien neuf.

- **Points de vigilance recopiés de `.pipeline/` avant qu'il ne s'écrase** (sessions 14 et 15) :
  `attribut?.Nom` rend une valeur nulle pour une propriété sans attribut, comportement du prototype
  reproduit à dessein ; le point final de la phrase de renvoi vit dans le lien souligné (cosmétique,
  valeur gelée par le prompt).

## Décisions actées
- **Le chemin absolu du référentiel central reste dans `CLAUDE.md` l. 15** — arbitrage du chef de projet du
  **29 août 2026** (réserve 5 de la revue de session 23, [W37]), inscrit le 30 août. Motif : ce n'est pas un
  chemin GitHub mais un chemin de disque local — il n'y a aucun accès à interdire, le risque est quasi
  inexistant. La réserve ne revient pas telle quelle à la prochaine revue.
- **L'entrée de menu « Annexe » / « Appendix » reste nue, sans article** — arbitrage du chef de projet du
  **19 août 2026** (option « assumer l'écart », réserve 2 de la revue de session 15). Deux motifs :
  l'annexe n'est pas un chapitre du récit, sa distinction au menu est voulue ; et l'égalité entre entrée
  de menu et titre de section était structurellement impossible ici, le titre étant en deux temps
  (« Annexe : un fichier S/36 de près », argument de CC, vérifié).
- **Arbitrage en attente — la casse des propriétés C# des extraits** : minuscule initiale (noms JSON repris
  tels quels, décision des notes du 18 août) contre le PascalCase attendu d'un lecteur .Net (revue de
  session 14, réserve 4). Recommandation du Tech Lead : une ligne de légende qui assume la minuscule,
  à prendre quand les extraits seront rouverts.
- **Un verdict `NEEDS_WORK` n'atterrit jamais** — arbitrage du chef de projet du **17 août 2026**,
  portée **précédent**. Il **révoque** celui de la session 7 (« atterrir sur un `NEEDS WORK` affiché,
  les points ayant été traités après la revue »). Après correction des réserves, le `reviewer` est
  **relancé sur le nouveau commit** ; depuis CHORE `revue-structuree`, le champ `commit` du contrat
  `twaim.review/1` rend cette relance **obligatoire par construction** — un commit ajouté après un
  `SHIP` fait refuser la garde. Coût assumé : une passe de lecture par tour de correction (trois pour
  l'incrément du 17 août), et la revue qui autorise n'est archivée nulle part (cf. [W15]).
- Dépôt public `ibm-s36-to-rest-api`, site sur `https://lianazel.github.io/ibm-s36-to-rest-api/`.
- Traces du harnais publiques (précédent : portfolio) ; référentiel TWAIM et PDF du POC privés.

## Section « Le problème » et section « Annexe » — décidé le 19 août 2026, session 14

La charpente technique de la section 2 était écrite depuis le 17 août dans `Etude_Technique/NOTES_CONTENU_le-probleme_v3.md`
sans jamais avoir été inscrite ici ; rappelée par le chef de projet le 19 août (« des tableaux qui racontent pourquoi
ces structures de table sont muettes »), puis **redéployée** : la section 2 reste courte, le technique va dans une
**section « Annexe : un fichier S/36 de près »**, nommée, bilingue, en bas de page, au menu, avec un lien de retour.
Ni bloc dépliable (le lecteur choisit d'y aller), ni page séparée (tout l'outillage est construit pour une page).

- **Prompt A** (n° 3 du fil) : intro de la section 2 réécrite par la **troisième voie** de l'arbitrage « aucune
  description », désormais **tranché** ; membre de phrase de `section3.modele.p1` aligné ; phrase de renvoi ;
  Annexe amorcée. Source : notes `le-probleme` v5.
- **Prompt B** (n° 5 du fil) : le contenu de l'Annexe. Matière : notes v5 (prose des quatre blocs, trois tableaux,
  vérification des faits contre le manuel IBM SC41-4730, le manuel RPG II SC09-1818, une page GAP II et un article
  de référence sur le décimal zoné) **plus** les explications du chef de projet du 19 août sur les feuilles de
  codage, à consigner en v6 : feuille I (positions de/à, décimales colonne 52, nom de zone colonnes 53-58) remplie
  avec `CDEMST` ; feuille C, trois lignes (`ZPRX MULT QTE → TFACT`, longueur et décimales ; `CLECLI CHAIN CLIMST`
  avec 51 en **High**, vérifié : l'indicateur s'allume si l'enregistrement n'est pas trouvé ; `51 EXSR CRECLI`,
  sous-routine de six caractères). Le cycle GAP est **hors sujet**, décision du chef de projet. Dessins en SVG,
  registre plan technique, **jamais le scan** du formulaire IBM.

## Section « La solution » — reste à faire (décidé le 18 août 2026, session 12)

Contenu arrêté **pièce par pièce** dans `Etude_Technique/NOTES_CONTENU_la-solution_v14.md` : §2, les
quatre blocs de code écrits dans les deux langues et prouvés à l'exécution (M-8, M-11, M-12) ; §4, les
deux images décrites case par case. *(La v11 disait « entièrement arrêté » alors que deux blocs sur
quatre n'étaient écrits nulle part, mesuré le 19 août 2026 : un adjectif ne décrit pas un état.)*
**Ne rien redécider : rédiger le contrat.** Chaque prompt se rédige au moment où son tour arrive, ses pré-conditions citant la
version au manifeste et la ligne de `STATUS.md`, qui changent à chaque atterrissage.

1. **EVOL corrections de vocabulaire et mentions de marques** (minuscule, six valeurs de
   dictionnaire, aucune structure). Deux gestes homogènes réunis :
   - « six caractères » → « **au plus** six caractères » aux sections 2 et 3. L'étude v2 §3.1 et le
     `CLAUDE.md` disent un **maximum** ; le produit affirme une longueur fixe, à deux endroits
     désormais. Dette née de la réserve n° 1 de la revue de session 12.
   - Phrase générique de marques au pied de page : « les autres noms de produits cités appartiennent
     à leurs détenteurs respectifs ». La mention actuelle ne couvre qu'IBM, IBM i et System/36, ni
     Unibol, ni `.Net`, ni Power, tous trois présents dans le dictionnaire.
2. **EVOL extraits de code** : trois extraits recréés et **visibles**, chacun sous le paragraphe
   qu'il illustre (décision du chef de projet, 19 août 2026, qui remplace le bloc dépliable du 18) :
   l'attribut maison et les deux classes, puis le dictionnaire par réflexion, sous le temps 1 ; la
   construction du modèle dynamique dans la structure du prototype, sous le temps 3. Clés bilingues,
   légende « extrait recréé » sur chaque bloc, défilement dans le cadre. **Aucun bloc dépliable dans
   cet incrément.** Source : notes v14, §2 et M-12. Prompt : `prompts/v0.1/EVOL_extraits-de-code_v1.md`.
3. **EVOL boîte à outils** : tableau ordonné des neuf classes de fabrication du modèle dynamique,
   dans un bloc dépliable natif (`details`/`summary`, aucun JavaScript, aucune dépendance), replié
   par défaut, avec son traitement en écran étroit (trois colonnes à 320 px). **Cet incrément établit
   le motif de dépliement**, ses clés bilingues et son contrôle d'accessibilité. Son prompt cite
   l'incrément 2 en **pré-condition vérifiable** (« les trois `figure.extrait` existent dans
   `index.html`, vérifie, sinon ARRÊTE-TOI »), jamais en ordre de passage.
4. **Mise en scène** : les deux dessins SVG, Plex Mono des noms de commandes en ligne, et les dettes
   [W5], [W8], [W12], [W13].
5. **Outillage**, dû après trois incréments de contenu : dette [W17], et l'exception de langue
   ci-dessous à écrire dans le `CLAUDE.md`.
6. Fin de jalon 1 : relecture d'anonymisation page par page, puis bump **1.0.0** (décision du chef de
   projet du 20 août 2026, en remplacement de 0.2.0 — cf. le fil, ligne 15 du tableau ; renvoi recalé le 30 août 2026, il disait « ligne 9 »).

**Arbitrage en attente — l'exception de langue des clés de dictionnaire.** Les clés de groupe
ajoutées sont en français (`modele`, `mur`, `renversement`, `etape`), comme celles de la section 1
déjà livrée (`lignees`, `pont`, `noms`, `preuve`), alors que `CLAUDE.md` dit « Code en **anglais** ».
Le produit est cohérent ; c'est la convention qui n'a pas d'exception écrite. Recommandation du Tech
Lead : **écrire l'exception dans le `CLAUDE.md`** plutôt que renommer une section en ligne. À faire
avant les sections 4 et 5, qui rouvriraient la question. *(Réserve n° 4 de la revue de session 12.)*

**Arbitrage TRANCHÉ — « Aucune description » contre l'arbitrage 7 des notes `le-probleme` v3.**
Ouvert à la session 11, **tranché le 19 août 2026 par le chef de projet : la troisième voie**, celle
recommandée ci-dessous. Échéance **tenue** — décidé **avant** les blocs 1 à 4 de la section 2, qui
montreront le tableau de `CDEMST` et les colonnes vues en SQL, donc sans la contrainte de ce qui
aurait déjà été écrit. La décision est portée par l'incrément **n° 3 du fil**
(`EVOL_probleme-renvoi-et-annexe_v1`), qui réécrit `section2.intro` et `section3.modele.p1`
**ensemble** : les traiter séparément recréerait l'écart d'une section à l'autre.
Ce qui suit est la **pièce justificative** de la décision ; les citations du produit décrivent son
état **avant** cet incrément.

*Ce que dit l'arbitrage 7* (corrigé par le chef de projet le 17 août) : pas de DDS, pas de description
externe ; les fichiers sont décrits par programme. La requête SQL nomme pourtant des colonnes de six
caractères — le manuel IBM explique comment (p. 8-2, `IDDULINK`). Mécanisme du POC non confirmé et sans
importance pour le site : **« la prose dit seulement *ces fichiers avaient reçu une description : le
SQL voyait des colonnes*, sans "externe" ni "DDS" »**.

*Ce que disait le produit, avant l'incrément n° 3* : `section2.intro` — « **Aucune description.** » —
et `section3.modele.p1` — « **Si le fichier ne dit rien de lui-même**, alors quelqu'un doit le dire à
sa place ». La prémisse d'ouverture du cheminement en quatre temps reposait donc sur l'énoncé que
l'arbitrage 7 écarte.

*Le point de fond* : les deux énoncés ne sont pas faux, ils ne portent pas sur le même objet.
« Aucune description » est vrai de l'**objet fichier** (*program-described*, manuel p. 7-33 : aucune
information de niveau champ dans le fichier). « Ils avaient reçu une description » est vrai de la **vue
interrogeable** (lien vers une définition de dictionnaire, qui fait apparaître des colonnes nommées à
SQL). La contradiction est de **formulation**, pas de fait — ce qui la rend invisible en prose seule et
frontale dès la première capture SQL.

*Les trois voies soumises, et celle qui a été retenue* :

1. **Maintenir « aucune description »** — vrai du fichier, mais le tableau de `CDEMST` et la requête
   SQL le démentiront à l'écran, devant le lecteur IBM i que ce site vise en premier.
2. **Adopter la formule de l'arbitrage 7** — exact, mais affaiblit l'argument central : c'est parce que
   le fichier est muet que le modèle à attributs existe. Impose de réécrire les deux sections.
3. **RETENUE — recommandation du Tech Lead : dire ce qui manque *précisément* plutôt que
   globalement.** Le fichier ne porte **aucun sens** : il donne des positions et des noms d'au plus
   six caractères, jamais ce qu'ils veulent dire. L'argument du modèle à attributs tient entier, et
   aucune capture SQL ne peut le démentir — la requête montre exactement cela, des noms opaques sans
   leur sens. C'est aussi la seule voie compatible avec les deux sections déjà livrées sans en
   renverser le propos.

*(Écart n° 3 des sessions 11, 12 et 13 ; réserve n° 2 de la revue de session 12 ; tranché à la
session 14, le 19 août 2026.)*

**Pourquoi ce chapitre existe.** `/land` écrit le journal, la leçon, le statut et la version : tout
ce qui regarde en arrière. Rien n'écrit ce qui a été **décidé et pas encore fait**, et la feuille de
route n'est possédée par aucun geste. Une décision qui engage un incrément futur vit donc **ici**,
dans le dépôt, parce que c'est le seul document que Cowork et Claude Code lisent tous les deux.
*(Référentiel : RD-056.)*

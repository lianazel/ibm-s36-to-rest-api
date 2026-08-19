# Registre local des leçons — IBMiAPI

> Une leçon = une erreur commise ici, datée, avec la règle qui l'empêche de revenir.

## 19 août 2026 — Rembourser une dette n'atteint pas les textes qui décrivent l'avenir, et la recommandation portait le défaut qu'elle corrigeait

**Type** : Erreur
**Contexte** : EVOL `vocabulaire-et-marques` (merge `c791bbf`), incrément dont **tout l'objet** était
d'éteindre une dette de vocabulaire : « des noms de colonnes **de** six caractères » → « **d'au plus**
six caractères », aux deux endroits du produit et dans les deux langues. Balayage vérifié : plus
aucune affirmation à longueur fixe dans le code livré.
**Erreur** : la veille, j'avais rédigé dans `tasks/ROADMAP.md` la **troisième voie** de l'arbitrage 7 —
ma propre recommandation pour la réécriture future de ces deux mêmes valeurs — et elle dit « il donne
des positions et des noms **de six caractères** ». La formulation exacte que l'incrément du lendemain
allait éteindre. J'ai même **signalé dans `changes.md`** que ces deux valeurs seraient réécrites si la
voie 3 était retenue, sans voir que **le texte de cette réécriture portait déjà la régression**. Un
remboursement qui serait revenu par la porte de la recommandation, avec ma signature dessus. Trouvé
par le `reviewer`, pas par moi.
**Correction** : le périmètre d'un remboursement de dette **n'est pas le produit, c'est le dépôt**.
Quand une formulation est déclarée fautive, la balayer dans les **quatre familles** de textes, pas
seulement la première : (1) le code livré ; (2) les documents de décision qui décrivent l'avenir —
feuille de route, recommandations, prompts non encore exécutés ; (3) les artefacts de l'incrément en
cours ; (4) ses propres écrits du jour. Règle mécanique : après avoir corrigé la formulation fautive,
relancer le `grep` **sur tout le dépôt** et regarder chaque occurrence restante en se demandant « ce
texte va-t-il être recopié quelque part ? ». Une occurrence dans un texte **prescriptif** est pire
qu'une occurrence dans le produit : le produit se corrige une fois, la prescription se réinjecte.
**Parenté** : même famille que « une affirmation réfutée se retire de **tous ses domiciles** »
(16 août), et c'est sa **troisième** occurrence. Ce qu'elle ajoute : les domiciles ne sont pas
seulement les endroits où l'affirmation a **été** écrite, mais ceux où elle sera **recopiée** — un
texte tourné vers l'avenir est un domicile qui n'existe pas encore, et c'est le seul que le balayage
du présent ne trouve pas.
**Portée du dégât** : nulle sur le livré — cinq réserves `WARN`, verdict `SHIP`. Les onze séries de
chiffres de mes artefacts ont été recomptées et trouvées **toutes exactes**, deuxième session
consécutive : le défaut ne porte plus sur mes mesures, il porte sur ce que j'en déduis et sur ce que
j'écris pour plus tard.
**Applicable globalement ?** : à arbitrer par le chef de projet. À mon sens **oui**, comme extension
de la leçon du 16 août : tout remboursement de dette (renommage, dépréciation, correction de
terminologie, changement d'API) doit balayer la documentation **prescriptive** avant de se déclarer
fini, sans quoi il se réintroduit à la première reprise du texte.

## 18 août 2026 — Un écart se caractérise contre sa propre source, pas contre celle d'à côté

**Type** : Erreur
**Contexte** : EVOL `section-la-solution` (merge `82a64d0`). J'ai déclaré trois écarts dans
`changes.md` et les ai caractérisés avec soin — contre les notes de contenu de la **section 2**
(`le-probleme v3`), les seules que je connaissais parce que la session précédente les avait ouvertes.
**Erreur** : la section que j'écrivais avait **ses propres notes**,
`NOTES_CONTENU_la-solution_v10.md`, déposées à 17:54 — soit **avant** le commit du prompt à 18:30.
Je ne les ai pas cherchées. Conséquence mesurable, relevée par le `reviewer` : j'ai présenté « six
caractères » comme une imprécision **du prompt**, alors que le temps 1 de ces notes porte déjà la même
formulation ; et j'ai déclaré ouverte une question — les illustrations que la prose appelle — que leur
§4 avait **close et gelée** le jour même. L'écart existait, mais son origine était ailleurs, et un
écart mal attribué envoie la correction au mauvais endroit.
**Correction** : avant de qualifier un écart, **chercher la source propre du livrable** — pour un
contenu, les notes de **sa** section, pas celles de la section voisine. Règle mécanique : à l'ÉTAPE 0,
lister les documents source du périmètre exact et vérifier leur **date de dépôt** par rapport au
prompt ; une note antérieure au prompt fait partie du dossier, une note postérieure ne peut pas être
opposée à l'exécutant. Corollaire : « je n'ai pas trouvé de notes » et « je n'en ai pas cherché » sont
deux états différents, et seul le premier s'écrit.
**Parenté** : cinquième session consécutive sur la famille « le code est juste, sa description ne l'est
pas », mais le déplacement continue : après les chiffres faux (16 et 17 août) et le motif trop étroit
(17 août), c'est ici le **corpus de référence** qui était incomplet. La mesure était bonne, la
description exacte — et pourtant l'attribution fausse, parce que le dossier n'était pas entier.
**Portée du dégât** : aucune sur le livré — quatre réserves `WARN`, verdict `SHIP`, artefacts
gitignorés. Les neuf séries de chiffres de mes artefacts ont d'ailleurs été recomptées et trouvées
**toutes exactes**, première fois en cinq sessions.
**Applicable globalement ?** : à arbitrer par le chef de projet. À mon sens **oui** : « confronter une
affirmation à la source du périmètre exact, après avoir vérifié qu'on les a toutes » vaut pour tout
audit, toute stack. Voisine de « un nombre reçu n'est pas plus mesuré qu'un nombre écrit » (11 août)
sans se confondre : là c'était le **statut** d'une donnée, ici l'**exhaustivité du corpus**.

## 18 août 2026 — Un sous-agent tué en vol ne laisse rien : sous coupure, l'artefact s'écrit tôt et s'enrichit ensuite

**Type** : Erreur
**Contexte** : incident Anthropic du 18 août 2026 (« Degraded performance for multiple models »,
impact 16:11 → 18:23 UTC, resserré sur Opus 5, le modèle du `reviewer`). **Quatre** exécutions de la
revue indépendante tuées par `529 Overloaded`, chacune ayant mené une part réelle du travail — dont il
ne reste **rien**.
**Erreur** : j'ai délégué en supposant l'exécution atomique. Ma consigne demandait de lire, mesurer,
puis écrire `review.json` **en fin de parcours** : tout arrêt avant la dernière ligne annulait
l'intégralité du travail. Le coût n'est pas la panne — elle ne se commande pas — c'est **l'ordre** que
j'avais imposé, et je ne l'ai corrigé qu'à la quatrième tentative.
**Correction** : quand un sous-agent produit un artefact au terme d'un travail long, lui demander de
**l'écrire dès qu'il est fondé, puis de l'enrichir** par réécritures. Un document incomplet mais
honnête sur ses limites survit à une coupure ; un document parfait jamais écrit ne vaut rien. Deux
corollaires : (1) l'artefact partiel doit **nommer ce qu'il n'a pas vérifié**, sinon il ment par
omission là où il rassure ; (2) sa vérification de forme doit tolérer l'état partiel, sinon la
précaution fabrique un refus de garde.
**Ce qui a tenu pendant la panne, et mérite d'être noté** : les sous-agents sont morts **avant**
d'écrire, jamais pendant — le `review.json` tronqué mais syntaxiquement valide ne s'est pas
matérialisé. Et le `SHIP` d'un **autre** incrément (session 11) est resté dans `.pipeline/` pendant
toute la panne : la garde de `/land`, qui compare `increment` **et** `commit`, l'aurait refusé. Le
défaut fondateur du projet, armé en conditions réelles, n'a pas mordu.
**Portée du dégât** : nulle sur le livré. Coût réel : quatre exécutions de sous-agent perdues et une
session étalée sur sept heures pour trois heures de travail.
**Applicable globalement ?** : à arbitrer par le chef de projet. À mon sens **oui** — vaut pour toute
délégation à un agent, toute stack, et je ne lui trouve pas d'équivalent au registre global.

## 17 août 2026 — Réparer la preuve n'immunise pas ce qui l'entoure, et un filtre qui exclut ne prévient pas

**Type** : Erreur
**Contexte** : EVOL `section-le-probleme` (merge `e9d5a45`), lendemain de la leçon « un chiffre porte son
état ». J'avais appliqué ses deux correctifs **d'emblée** : chiffres étiquetés avant/après, reconstruction
ancrée à un sha figé. Le `reviewer` a confirmé les deux réels — puis a trouvé **trois autres nombres faux**
dans les mêmes artefacts.
**Erreur** : « les **14** colonnes du cas fictif (mesuré une à une) » — il y en a **16** ; « l'étude emploie
la forme courte **deux** fois » — **trois** ; « quatre chapitres vides » — **trois**, le compte d'avant mon
propre geste. J'avais durci la **mécanique de preuve** et laissé la prose autour porter des chiffres non
mesurés. Pire, la cause racine du premier : mon motif `[A-Z]{6}` **excluait en silence** tout nom portant un
chiffre, donc `ADRFA1` et `ADRFA2` n'ont jamais été vues. « Mesuré une à une » désignait en réalité un
filtre aveugle à une classe entière — et un filtre qui exclut ne lève aucune erreur, il **répond moins**.
**Correction** : deux règles distinctes. (1) **Le périmètre d'une correction est celui qu'on lui donne** :
réparer le mécanisme d'une preuve ne rend pas vraies les affirmations qui l'entourent — au dépôt d'un
artefact, chaque nombre est une assertion à mesurer, y compris ceux qui ne servent qu'à situer. (2) **Un
motif de recherche est une hypothèse, pas une mesure** : avant de conclure d'un `grep`, se demander ce que
le motif **ne peut pas** matcher (chiffres, accents, casse, césures) et vérifier le total par un second
chemin. Un filtre trop étroit produit un résultat **plausible**, donc jamais suspect.
**Parenté** : quatrième session consécutive sur la même racine — le code est juste, sa **description** ne
l'est pas. Ce que celle-ci ajoute : le défaut **se déplace** quand on le chasse d'un endroit, et il se loge
là où la vigilance vient de baisser parce qu'on croit avoir payé.
**Portée du dégât** : aucune sur le livré — six réserves `WARN`, verdict `SHIP`, artefacts gitignorés. Les
trois chiffres corrigés ont été **re-mesurés par moi** avant d'entrer au journal, et c'est cette
re-mesure qui a exhibé la cause racine.
**Applicable globalement ?** : à arbitrer par le chef de projet. Le volet (2) — un motif est une hypothèse,
vérifier ce qu'il exclut — me paraît **universel** et sans équivalent dans le registre global ; il est
voisin de « un silence dans une trace n'est pas une mesure » (4 août) sans se confondre avec lui : là il
s'agissait d'un silence subi, ici d'un silence **qu'on a soi-même construit**.

## 17 août 2026 — Un chiffre porte son état, une preuve porte un sha : sinon ni l'un ni l'autre ne se vérifie

**Type** : Erreur
**Contexte** : EVOL `decor-voix-premiere-personne` (merge `7054dc2`). Incrément minuscule — quatre
sous-chaînes de texte — dont j'avais **renforcé** la preuve de mon propre chef : reconstruction du fichier
attendu, contrôle d'unicité, `cmp`, `sha256`. La mesure était bonne ; c'est sa **description** qui a failli.
**Erreur** : deux défauts de la même famille, tous deux dans les artefacts, aucun dans le code livré.
(1) « sur les **20 710 octets** du fichier, rien d'autre n'a bougé » — 20 710 est la taille d'**avant**, le
livré fait 20 667 ; la phrase ne disait pas lequel des deux états elle désignait, et c'est ce chiffre qui
portait la conclusion. (2) « le fichier de **`HEAD`** a été extrait » — vrai au moment de la mesure, faux
une minute plus tard : depuis le commit `feat`, `HEAD` désigne le fichier d'**après**, et la procédure telle
qu'écrite ne se rejoue pas (contrôle d'unicité à 0 occurrence). Une preuve dont toute la valeur est d'être
rejouable désignait un point qui bouge.
**Correction** : un nombre s'écrit **avec son état** (« 20 710 avant, 20 667 après ») ou ne s'écrit pas ; une
procédure de preuve nomme un **sha figé** (`645d23d`), jamais `HEAD`, `main` ou toute réf qui se déplace
entre l'écriture et la lecture. Règle mécanique : dans un artefact, tout **nombre** et toute **référence
git** se relisent en se demandant « à quel instant ceci est-il vrai ? » — s'il faut connaître le moment de
rédaction pour répondre, l'écrit est faux pour son lecteur.
**Parenté** : troisième session consécutive sur la même racine — « une somme juste ne prouve pas des termes
justes » (16 août) et « coder ou dire, pas d'adverbe entre les deux » (17 août). Les trois disent une même
chose sous trois angles : **le code était juste, sa description ne l'était pas**, et c'est la description
qui rassure. Ici la description a même été rédigée *après* une mesure exacte.
**Portée du dégât** : aucune sur le livré — les quatre réserves étaient `WARN`, le verdict `SHIP`, et les
artefacts fautifs vivent dans `.pipeline/`, gitignoré.
**Applicable globalement ?** : à arbitrer par le chef de projet. À mon sens **oui** pour le volet référence
git (il vaut pour tout dépôt, toute stack, et voisine la leçon globale du 1ᵉʳ août sur le chemin absolu
périmé qui « répond vide » au lieu de protester) ; le volet « chiffre sans état » est peut-être déjà couvert
par « un nombre reçu n'est pas plus mesuré qu'un nombre écrit » (11 août) — ce qu'il ajoute est qu'un nombre
**mesuré par soi-même** reste faux s'il perd l'étiquette de l'état qu'il décrit.

## 17 août 2026 — Coder ou dire, pas d'adverbe entre les deux

**Type** : Erreur
**Contexte** : CHORE `revue-structuree` (branche `chore/revue-structuree`, merge `38dcd34`). Trois passes
de revue sur un module dont la thèse est qu'**un contrat ne doit pas décrire plus qu'il ne contrôle**.
**Erreur** : à chaque passe, le `reviewer` a trouvé un **adverbe absolu plus large que le code**, dans le
commentaire, jamais dans la logique. 1ʳᵉ passe : le contrat décrivait `file` (« chemin relatif au dépôt »)
et `overrule.by` (littéral « chef de projet ») sans les contrôler — une réserve pointant `/etc/passwd` et
un `overrule` signé « le reviewer lui-même » passaient. 2ᵉ passe : le commentaire disait `file`
**« contrôlé »** alors que `~/.ssh/id_rsa` passait. 3ᵉ passe : il disait la fonction **« totale quel que
soit** le contrat injecté » alors que trois formes jettent encore. Le code était chaque fois plus faible
que sa description, et **c'est la description qui rassurait**.
**Correction** : un mot comme *contrôlé*, *toujours*, *quel que soit*, *jamais* est une **assertion
vérifiable** : soit on la mesure et on la code, soit on écrit ce que le code fait vraiment — jamais un
adverbe entre les deux. Le remède est mécanique, pas une vigilance : quand la classe de défaut est
fermable en une ligne, on la ferme ; sinon on **énumère** ce qui passe (`....//x`, `%2e%2e/etc`) plutôt
que de le taire. Corollaire de conception : une **couture ajoutée pour la testabilité** élargit la surface
publique, donc les obligations — c'est ainsi que « totale » est devenue fausse.
**Portée du dégât** : aucune en production (la CLI n'injecte jamais de contrat) ; les deux premières ont
été trouvées et fermées avant le merge, la troisième est inscrite en **[W17]** par arbitrage.
**Applicable globalement ?** : à arbitrer par le chef de projet.

## 16 août 2026 — « Reconnu largement » n'est pas une règle, c'est une intention

**Type** : Erreur
**Contexte** : CHORE `garde-revue-land` (session 8, merge `bfacccb`), 3ᵉ passe de revue.
**Erreur** : j'avais écrit l'étiquette d'incrément `incrément[^:]*:` en la commentant « reconnue
largement ». Elle reconnaissait **tout** — `**Incrément précédent** : <le nôtre>` compris. Une revue
d'un **autre** incrément, verdict `SHIP` bien réel, faisait donc atterrir le nôtre : le défaut fondateur
du projet, revenu par la porte qui venait de le fermer.
**Correction** : une intention formulée en langue (« largement », « souple », « tolérant ») devient, en
expression régulière, **« n'importe quoi »**. Une classe d'acceptation s'écrit **close et énumérée**
(`Incrément`, `Incréments`, `Incrément revu`), jamais ouverte. Et le commentaire doit nommer ce que la
classe **exclut**, pas seulement ce qu'elle admet.
**Applicable globalement ?** : à arbitrer par le chef de projet.

## 16 août 2026 — Une affirmation réfutée se retire de tous ses domiciles

**Type** : Erreur
**Contexte** : CHORE `garde-revue-land` (session 8), puis vérifiée deux fois de plus dans CHORE
`revue-structuree` (17 août).
**Erreur** : j'avais écrit qu'un bloc de code non refermé donnait « un refus du bon côté ». Mesure
contraire : un `SHIP` de synthèse lu avant la rupture faisait atterrir la revue qui le refusait. J'ai
corrigé la phrase **en tête** du fichier et l'ai laissée **en pied**, dans la section « Non couvert » —
celle qu'on lit précisément pour savoir ce qui n'est pas couvert. Récidive à la passe suivante : la
phrase corrigée (« la limite a disparu ») était encore trop large. Et troisième occurrence, autre
fichier : un tableau annoncé « mesuré par fichier, pas déduit » portait 12/12/12 pour des fichiers qui
valent 10/13/13 — **les trois erreurs se compensaient**, donc la somme et le total tenaient.
**Correction** : une affirmation réfutée se retire de **tous** ses domiciles — un artefact se relit en
entier, `grep` à la main sur la formulation fautive, pas seulement à l'endroit où la réfutation est
arrivée. Et **une somme juste ne prouve pas des termes justes** : un total qui tombe rond n'atteste rien
si chaque terme n'a pas été mesuré séparément.
**Applicable globalement ?** : à arbitrer par le chef de projet.

## 15 août 2026 — Lire l'attribut n'est pas mesurer le pixel

**Type** : Erreur
**Contexte** : CHORE `menu-hamburger`. Le retour au portfolio devait rester invisible sans
`?from=portfolio`. Trois vérifications navigateur l'ont déclaré masqué. Le chef de projet a ouvert le
site sur son téléphone et **l'a vu à l'écran**.
**Erreur** : mes trois mesures lisaient `a.hidden` — la présence de l'**attribut**. L'attribut était
bien là. Mais `[hidden] { display: none }` ne vient que de la feuille du **navigateur**, et toute règle
d'auteur posant `display` sur le même élément la neutralise en silence : ma propre cible tactile
`.about a { display: inline-flex }` rendait le lien visible. 128 × 44 px peints sous un attribut qui
disait « caché ». Le lien du pied de page, lui, n'était couvert par aucune règle d'auteur : il était
correctement masqué — ce qui a rendu le défaut d'autant plus discret, une moitié du contrôle passant
au vert.
**Correction** : `[hidden] { display: none !important; }` en tête de feuille, pour que l'attribut
redevienne une garantie et non une suggestion. Et surtout : **une propriété du DOM qui décrit une
intention ne se substitue jamais à la mesure de ce qui est peint.** Ce qui se vérifie, c'est
`getComputedStyle().display` et la boîte rendue (`getBoundingClientRect`), jamais `el.hidden`,
`classList.contains` ou la présence d'un attribut. La même règle vaut pour `disabled`, `inert`,
`aria-hidden` : l'état déclaré et l'état rendu sont deux mesures distinctes.
**Portée du dégât** : aucune — le défaut est mort sur la branche, avant le merge. Il a été trouvé par
un œil humain sur un appareil réel, pas par mes portes. C'est exactement le rôle que la méthode
réserve au chef de projet, et il a servi.
**Applicable globalement ?** : **oui, à mon sens** — vaut pour tout projet web, indépendamment de la
stack. À arbitrer par le chef de projet ; promotion = geste dédié (entrée A-1). Voisine de la leçon
globale du 8 août (« une mise en page mesurée dans un autre environnement de polices n'est pas le même
site ») : même famille, celle des vérifications qui mesurent autre chose que ce qu'elles croient.

## 14 août 2026 — Cowork : deux assertions non mesurées le même jour

**Type** : Erreur
**Contexte** : absence de `.git` déclarée « prouvée » sans départager « pas encore créé » de « non visible » ; contraste « AA » affirmé sans mesure, réfuté par la revue à 3,35:1.
**Règle** : une affirmation vérifiable ne s'écrit qu'accompagnée de sa vérification, exécutée le jour même.
**Applicable globalement ?** : à arbitrer par le chef de projet (promotion = entrée A-1, geste dédié).

## 14 août 2026 — Une preuve de morsure jetée ne protège que le jour où on la fait

**Type** : Succès
**Contexte** : CHORE `porte-i18n-html` (dette W2, branche `chore/porte-i18n-html`, commit `4b7aafb`).
Le prompt prescrivait deux preuves de bac à sable — altérer une clé d'`index.html` pour voir la porte
rougir, rediriger la lecture vers un HTML vide pour voir la garde de non-vacuité lever — puis tout
restaurer sans rien commiter.
**Approche** : les deux preuves ont été exécutées telles que demandées, et **doublées** de témoins
committés dans le fichier livré — un par chemin capable de pousser une erreur : garde de cécité, clé
absente, clé désignant un groupe, valeur vide, `data-i18n-attr` incomplet. Pour que ces témoins
existent, la source HTML et la table de résolution sont devenues des **paramètres** de la porte : sans
ces coutures, le cas « valeur vide » n'avait aucune cible où mordre (le dictionnaire réel n'en porte
aucune, la porte de parité l'interdit) et le chemin d'échec de la garde exigeait de casser un fichier
du dépôt.
**Règle** : une preuve de bac à sable atteste que la porte mord **le jour où on la fait** ; seul un
témoin committé atteste qu'elle mord **encore**. Les deux ne se remplacent pas — la première est
exigée par la méthode, la seconde survit à la session. Corollaire de conception : si un chemin
bloquant n'a aucune cible où mordre sans abîmer le dépôt, il manque une couture — la ressource qu'il
lit doit être un paramètre, et le coût de réveil de ce chemin est un signal de conception, pas une
difficulté à contourner.
**Applicable globalement ?** : probablement **redondant** avec deux entrées globales existantes — « une
assertion de vivacité se pose par chemin bloquant, pas par contrôle » (9 août 2026) et « un chemin qui
lit une ressource à chemin fixe est improuvable » (10 août 2026). Ce qu'elle ajoute, s'il y a lieu :
l'opposition explicite entre la preuve **jetée** et le témoin **committé**. À arbitrer par le chef de
projet ; promotion = geste dédié (entrée A-1).

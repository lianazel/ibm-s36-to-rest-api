# Registre local des leçons — IBMiAPI

> Une leçon = une erreur commise ici, datée, avec la règle qui l'empêche de revenir.

## 2026-09-01 — Une preuve se recalcule sur le texte du prompt, jamais sur l'idée qu'on a du livrable
**Type** : Erreur
**Contexte** : Incrément 12, `EVOL_limites-modele-dynamique_v1`. Trois preuves périmées sur le même
prompt — la 9 amputée d'un `]`, la 1 oubliant la clé `reste`, la 6 exigeant `DSPFFD` = 0 quand §A
prescrivait une glose qui le nomme.
**Erreur** : Même cause à chaque fois — la preuve est dérivée de ce que je croyais que le livrable
serait, et jamais rejouée contre le texte du prompt après sa dernière réécriture. Une garde qui
contredit sa propre prescription est pire qu'une absence de garde : elle arrête l'exécutant sur un
travail juste.
**Correction** : Après toute réécriture, relire les preuves en dernier, une par une, et relancer
celles qui se mesurent sur le dépôt.
**Applicable globalement ?** : Oui — deuxième occurrence de la leçon du 21 août 2026.

## 2026-09-01 — On n'injecte pas de nouveaux paramètres dans une machine qui usine
**Type** : Erreur
**Contexte** : Le prompt gelé a été réécrit sur le disque pendant que l'agent le lisait : il a lu une
version, travaillé, puis commité une version différente — le HTML publiait `DSPFFD` quand le prompt
du même commit prescrivait `QSYS2.SYSCOLUMNS`.
**Erreur** : La règle existait déjà au référentiel (§4.1, v2.23, « un prompt remis à CC ne se
retouche plus »), avec un anti-pattern du 12 juillet 2026 qui décrivait ce geste mot pour mot et
prédisait : « la prochaine fois, l'ajout sera une contradiction ». La prédiction s'est vérifiée à
sept semaines.
**Correction** : Formulation du chef de projet, qui est la règle — lorsqu'une pièce part en usinage
avec ses paramètres, tant que l'usinage tourne, on n'injecte pas de nouveaux paramètres à la machine.
La machine doit être à l'arrêt. Un amendement ne s'écrit qu'**avant le lancement** ou **après
`READY`** ; s'il naît en cours d'usinage, il s'annonce et attend le point d'arrêt.
**Applicable globalement ?** : Oui.

## 24 août 2026 — Un défaut de série ne vit pas dans la valeur, il vit dans son voisinage
**Type** : Erreur
**Contexte** : EVOL `prototype-et-production` (incrément 8). La valeur 4 EN gelée ouvrait sur
« An open where cannot be fenced in », quand ses deux sœurs `a1` et `a2` ouvrent sur « An open where
**clause** » — et que la valeur d'avant l'incrément portait le mot elle aussi. **Rupture introduite
par cet incrément**, en anglais seulement, le français ouvrant ses trois arguments par « Un where
ouvert » sans varier. Elle a franchi **282 tests verts**, la porte de parité, la preuve de recopie
caractère par caractère (qui compare une valeur à son gel, jamais à ses sœurs), **et deux revues
indépendantes**. Trouvée par le chef de projet à la passe iPhone 14, là où les trois arguments
s'affichent **l'un sous l'autre**.
**Erreur** : Vérifier chaque valeur **contre sa source** et jamais **contre ses voisines**. Prise
seule, `a3` était impeccable : conforme au prompt au caractère près, non vide, appariée FR/EN. Le
défaut n'existait qu'à l'échelle du groupe, et aucune de mes portes ne travaille à cette échelle —
elles valident des valeurs, une par une.
**Correction** : Quand un geste touche **un membre d'une série** — puces d'une même liste, titres de
même rang, cellules d'une colonne, étapes numérotées — la vérification porte sur **la série entière,
après le geste**, pas sur le membre modifié. Et cette classe est **outillable** : le `reviewer` l'a
démontré en trente lignes (préfixe commun des frères d'un même parent, avant contre après), avec la
contre-épreuve qui compte — pointé sur le commit fautif, le détecteur sort **exactement la rupture
en question** ; pointé sur le commit corrigé, il se tait. Limite déclarée par son auteur : il ne voit
que les fratries d'un même parent et les motifs de bord ; une série définie par le rythme ou la
longueur lui échapperait. Proposé en R&D, non exécuté.
**Applicable globalement ?** : Oui. Cousine directe de [W32] (« une suite entièrement verte ne dit
rien du montage ») : ici, une suite verte et deux revues de code ne disent rien d'une série que
**seule la mise en page révèle**. Corollaire de méthode : c'est précisément la classe de défaut que
la validation humaine sur appareil existe pour attraper — elle l'a attrapée au premier coup d'œil.
**Promue en global le 24 août 2026 (validation du chef de projet)**, sous le même titre
« Un défaut de série ne vit pas dans la valeur, il vit dans son voisinage » — entrée datée 2026-08-24 de `~/.claude/lessons.md`.

## 24 août 2026 — Un balayage qui s'arrête aux fichiers publiés laisse la contradiction dans la pièce qui dirige le travail
**Type** : Erreur
**Contexte** : Même incrément, dont le motif déclaré est la leçon du 16 août — « une affirmation
réfutée se retire de tous ses domiciles ». Deux balayages (23 puis 24 août) ont couvert `js/i18n.js`,
`index.html` et `README.md`, et trouvé au second passage un domicile oublié dans le README. Aucun n'a
regardé `tasks/`. Or la ligne 8 du fil portait encore « le mini-langage est une idée essayée **ici
seulement** » à **630 caractères** du segment que le même commit ajoutait : « le mini-langage a
**réellement tourné** dans la solution .Net ». La contradiction vivait donc **dans la même cellule**,
dans le seul fichier de pilotage que l'incrément éditait, sur son sujet même. Trouvée par la revue
indépendante, pas par moi.
**Erreur** : Avoir assimilé « domicile » à « fichier servi au lecteur ». Le périmètre du balayage a
été déduit de la liste des fichiers du livrable, alors que la leçon du 16 août parle d'**affirmation**
et ne connaît pas cette frontière. Le fil, les dettes, les prompts disent la même chose que le site —
et **le dépôt est public** : un fichier de pilotage y est un fichier publié.
**Correction** : Le balayage d'une affirmation réfutée porte sur **tout ce qui est versionné**, pas
sur les fichiers du livrable : `tasks/`, `prompts/`, `CLAUDE.md`, les messages de commit à venir. Un
`git grep` sur le motif coûte une seconde et couvre le dépôt entier ; restreindre le balayage aux
fichiers touchés, c'est décider d'avance où le défaut a le droit d'être. Corollaire mesuré ici : le
danger est maximal **là où l'on vient d'écrire**, parce qu'on y ajoute la version neuve sans relire
l'ancienne qui vit dans le même paragraphe.
**Applicable globalement ?** : Oui. Précise la leçon du 16 août 2026 en lui donnant son périmètre :
« tous ses domiciles » signifie **tout le dépôt**, et d'abord le fichier qu'on est en train de
modifier. Parente de la leçon du 19 août (« déclarer, c'est balayer ») : ici le balayage existait,
c'est son **périmètre** qui portait le défaut.
**Promue en global le 24 août 2026 (validation du chef de projet)**, sous le même titre
« Un balayage qui s'arrête aux fichiers publiés laisse la contradiction dans la pièce qui dirige le travail » — entrée datée 2026-08-24 de `~/.claude/lessons.md`.

## 24 août 2026 — Une coupure laisse deux survivants, et ils ont pu bouger séparément
**Type** : Erreur
**Contexte** : EVOL `prototype-et-production` (incrément 8). Un plantage machine avait coupé la
première exécution **sans aucun commit**, travail préservé dans l'arbre. Entre-temps, le chef de
projet avait **re-gelé le prompt** sur une observation que cette même exécution lui avait remontée :
la valeur 2 EN passait de `him/his` à `they/them/their`. À la reprise, l'arbre portait la version
d'avant le re-gel. **Les 282 tests étaient verts**, la parité verte, aucune valeur vide : rien dans
la suite ne pouvait voir un pronom périmé. Sans la preuve de recopie caractère par caractère, la
valeur entrait au dépôt — **1 écart sur 17 comparaisons**, et c'était celui-là.
**Erreur** : Traiter la reprise comme la **continuation d'un travail** — « l'arbre est propre, les
tests passent, je continue » — alors qu'une coupure laisse **deux** survivants indépendants :
l'**état du travail** et la **consigne qui le gouverne**. J'ai supposé leur cohérence parce qu'ils
avaient été cohérents avant la coupure.
**Correction** : Après toute interruption — plantage, session close, agent tué — reprendre commence
par **mesurer l'écart entre l'arbre et la consigne relue depuis le disque**, avant tout geste. Ce
n'est pas la même chose que relire la consigne : relire dit ce qu'elle demande **aujourd'hui**,
comparer dit ce que le travail **a déjà fait d'hier**. Le corollaire tient sur ce projet : quand la
consigne est un prompt gelé, la comparaison est **caractère par caractère**, et elle est la seule
porte capable de voir un écart qu'aucun test ne couvre. Rendue possible ici par une trace du chef de
projet : le pied de page du prompt datait son second gel.
**Applicable globalement ?** : Oui. Complète la leçon globale du 21 août 2026 (« un fichier de
consigne lu n'est pas un état, il se relit depuis le disque juste avant d'agir »), qui prescrit de
**relire** mais pas de **comparer** : relire seul n'aurait rien montré, l'écart n'était pas dans le
prompt, il était **entre** le prompt et l'arbre.
**Promue en global le 24 août 2026 (validation du chef de projet)**, sous le même titre
« Une coupure laisse deux survivants, et ils ont pu bouger séparément » — entrée datée 2026-08-24 de `~/.claude/lessons.md`.

## 24 août 2026 — Déclarer une convention de mesure sans la rejouer reproduit le défaut qu'on corrige
**Type** : Erreur
**Contexte** : Même incrément. La revue indépendante relevait (réserve #5, P3) que `spec.md` et
`changes.md` comptaient le même motif selon **deux conventions non déclarées** — insensible à la
casse d'un côté, sensible de l'autre — et que l'écart escamotait une occurrence que l'ÉTAPE 4 exige
de justifier nommément. J'ai corrigé en déclarant « comptage sur limites de mots, `grep -o -E
'\bmotif\b'` ». **Faux** : la mesure avait employé `grep -o -F`, la sous-chaîne littérale. La
seconde revue l'a mesuré — **trois lignes sur six** ne se reproduisaient pas ainsi (`tourne` 11
contre 6). Pire : `Reality`, l'occurrence que la ligne « insensible » existait pour rendre visible,
**ne matche pas** `\breal\b`.
**Erreur** : Écrire la convention **de mémoire**, depuis l'idée que je me faisais du balayage, sans
la rejouer sur mes propres chiffres. Une convention non rejouable est exactement le défaut que la
réserve relevait : je l'ai donc **reproduit dans sa correction**, en croyant le fermer.
**Correction** : Une convention de mesure se déclare **en la rejouant sur les chiffres déjà publiés**,
et la déclaration n'est acquise que si elle les reproduit **tous**. Un tableau de comptage n'est pas
une preuve tant que le lecteur ne peut pas refaire la mesure et retomber sur les mêmes nombres.
Corollaire de portée plus large : **corriger une réserve appelle la même exigence que le livré** —
un correctif d'artefact n'est pas exempté du contrôle qu'il prétend rétablir.
**Applicable globalement ?** : Oui — toute preuve chiffrée, tout langage. Cousine de la leçon du
17 août 2026 (« réparer la preuve n'immunise pas ce qui l'entoure ») : ici, la réparation de la
preuve portait le défaut qu'elle corrigeait.
**Promue en global le 24 août 2026 (validation du chef de projet)**, sous le même titre
« Déclarer une convention de mesure sans la rejouer reproduit le défaut qu'on corrige » — entrée datée 2026-08-24 de `~/.claude/lessons.md`.

## 24 août 2026 — Une mesure exacte du mauvais objet ne vaut rien : une valeur calculée n'est pas un pixel peint
**Type** : Erreur
**Contexte** : Deux fois dans la même session, sur les deux points qui décidaient. (1) Ma preuve du
premier commit affirmait `messageJointureVisible: true` — vrai, et sans valeur : le message était à
618 px sous la cellule éditée, hors de tout écran de téléphone. (2) J'ai conclu que « le filet en
tirets porte l'information hors de la couleur » sur un relevé `getComputedStyle`, qui rend la valeur
calculée **sur l'élément** et jamais l'arête réellement peinte dans un tableau à bordures fusionnées.
Le chef de projet avait gelé cette addition **sur ma description**.
**Erreur** : Mesurer ce qui était facile à mesurer — une présence dans le DOM, une propriété calculée —
là où la question portait sur une **distance à l'œil** et sur un **rendu peint**. Les deux relevés
étaient exacts ; aucun des deux ne portait la conclusion posée à côté.
**Correction** : Avant de conclure, nommer **l'objet dont dépend la conclusion**, puis vérifier que la
mesure porte sur cet objet-là. « Présent dans le DOM » ne dit rien de « visible ». « `border-style`
calculé » ne dit rien de « peint ». Quand la mesure ne peut pas atteindre l'objet — un pixel, un œil,
un appareil — **écrire la limite et rendre la question**, au lieu de conclure depuis ce qu'on sait
mesurer. Corollaire tenu ce jour-là : quand une décision a été gelée sur une description devenue
fausse, le dire **avant qu'on le demande**.
**Applicable globalement ?** : Oui. Parente directe de la leçon du 15 août 2026 (« lire l'attribut
n'est pas mesurer le pixel »), qu'elle généralise : ce n'est pas l'attribut le problème, c'est l'écart
entre l'objet mesuré et l'objet dont la conclusion dépend.

## 24 août 2026 — Une suite entièrement verte ne dit rien du montage
**Type** : Erreur
**Contexte** : Une locale nommée `code` dans `render` masquait le `const code` du cadre de la classe,
déclaré plus haut dans la même fonction. Au chargement : `ReferenceError: Cannot access 'code' before
initialization` — **le simulateur ne montait plus du tout**, page morte. **Les 282 tests étaient
verts.** Trouvée en ouvrant la page, deux heures après que le `diagnostician` m'ait décrit exactement
ce piège dormant dans son rapport.
**Erreur** : Traiter `npm test` vert comme une preuve que le livrable fonctionne, quand la suite ne
couvre que la logique pure et que le câblage est hors garde ([W13]). Et introduire un nom court dans
une fonction longue sans regarder ce qu'il masque.
**Correction** : Tant qu'aucune porte ne monte la page, **ouvrir la page** fait partie de la livraison,
au même titre que lancer les tests. Et l'absence de garde sur le câblage ne coûte pas une régression
discrète : elle coûte la page entière, en silence. Inscrit en [W32].
**Applicable globalement ?** : Oui — tout projet dont la suite couvre la logique et pas l'assemblage.

## 22 août 2026 — Attribuer sa propre régression à sa source, c'est faire arbitrer une question qui n'existe pas

**Type** : Erreur
**Contexte** : EVOL `mini-langage-refus-et-classe` (merge `6f3778c`, session 18). L'avenant 1 imposait
de convertir en chevrons nus six valeurs que le prompt écrivait en entités. Dans
`refus.forme.pourquoi`, j'ai perdu la barre oblique : `&lt;colonne:opérateur:valeur/&gt;` est devenu
`<colonne:opérateur:valeur>`. La valeur qui **enseigne** la forme du langage enseignait une forme que
le reconnaisseur refuse.
**Erreur** : je n'ai pas seulement introduit le défaut, j'ai **écrit une section entière de
`changes.md` affirmant que le prompt gelé était fautif**, et j'ai posé la question au chef de projet
puis au `reviewer` — « dis si mon choix de ne pas toucher à une valeur gelée est le bon ». Je n'avais
relu ni les octets de la valeur, ni la seconde occurrence de la même chaîne, qui avait gardé sa barre
oblique et prouvait à elle seule que la conversion n'était pas en cause.
**Ce qui l'a rattrapé** : le `reviewer` est allé aux octets du prompt (`sed`, `cat -A`, lignes 372 et
393). Ni ma relecture, ni les 190 tests verts — aucun ne lisait le **contenu** des messages.
**Correction** : avant d'écrire qu'une source gelée se trompe, **aller aux octets de la source**, et
vérifier les autres occurrences du même motif dans la même valeur. Une régression attribuée à sa
source ne se corrige plus : elle **déplace la charge de la preuve** sur autrui, et elle peut faire
corriger le contrat pour couvrir le code. C'est plus grave que le défaut, parce que le défaut se
mesure et que le déplacement, lui, se croit.
**Portée du dégât** : aucune — mort sur la branche. Mais deux tours de revue ont été dépensés sur une
question fabriquée.
**Applicable globalement ?** : **oui, à mon sens**. Rien de spécifique à ce projet ni à cette stack :
c'est la règle qui distingue « j'ai trouvé une contradiction dans la consigne » de « je n'ai pas
vérifié ma propre transcription ». À arbitrer par le chef de projet ; promotion = geste dédié
(entrée A-1).

## 22 août 2026 — Une porte écrite contre un défaut peut ne le garder que d'un côté

**Type** : Erreur
**Contexte** : même incrément. Deux portes écrites **en réaction à un défaut mesuré** se sont
révélées borgnes, chacune sur la moitié de sa cible.
**Erreur** : (1) la porte « toute forme imprimée est une forme reconnue » utilisait une classe de
caractères excluant le chevron — elle ratait donc `refus.bornes.pourquoi`, dont l'opérateur `><` en
porte un : deux clés sur trois couvertes, **en paraissant exhaustive**. (2) le garde-fou d'A2-4
interdit à l'explication de promettre un refus, par `/refus/i` en français et `/refusal/i` en anglais :
le motif français attrape six formes, l'anglais n'attrape que « refusal » et **laisse passer
« refused »**, mot employé par deux autres valeurs anglaises livrées. Rejoué par le `reviewer` :
« Try T: it is refused… » **passe**.
**Correction** : quand une porte naît d'un défaut, la mesurer sur **la classe entière** du défaut, pas
sur l'exemplaire qui l'a révélée — et, dans un produit bilingue, **vérifier chaque motif dans chaque
langue séparément** : deux langues sont deux mesures, jamais une seule appliquée deux fois. Une porte
symétrique en apparence peut être asymétrique en fait, et c'est invisible tant que le cas ne tombe pas
du bon côté.
**Ce qui l'a rattrapé** : le `reviewer`, en jouant des configurations que la porte devait refuser, au
lieu de lire la porte. La première a été trouvée par moi en l'écrivant, la seconde par lui.
**Applicable globalement ?** : **oui**, pour tout projet multilingue ou multi-format. Voisine de la
leçon globale du 20 août (« vérifier une liste ne fonde pas une conclusion sur la famille ») : ici la
famille est celle des langues, et la conclusion a été tirée d'une seule.

## 21 août 2026 — Un prompt lu à l'ouverture n'est pas le prompt qu'on exécute : il se relit juste avant d'agir

**Type** : Erreur
**Contexte** : EVOL `boite-a-outils` (merge `ad46ad0`, session 17). Lu au `/session-start` de 22:23 :
240 lignes, tableau à huit lignes, seize clés par langue. Réécrit sur place à **23:12:35** — même nom,
même « Révision : v1 », **sans préfixe `DRAFT_`**, donc gelé au sens des conventions du dépôt : 284
lignes, neuf lignes de tableau, `Activator` en neuvième, dix-sept clés par langue.
**Erreur** : j'ai **committé** la version de 284 lignes — celle qui était sur le disque au moment du
commit — et **implémenté** celle de 240, de mémoire. Le commit annonçait « 284 insertions » là où ma
lecture en montrait 240 : le signal était sous mes yeux, dans la sortie de `git commit`, et je ne l'ai
pas relevé. Quarante minutes de travail sur une version morte.
**Ce qui l'a rattrapé** : pas une relecture — le **contrôle de conformité des valeurs au caractère
près**, qui a rendu dix-sept écarts sans raison d'être. Aucune relecture n'aurait produit ce signal :
je relisais mon livrable contre **ma mémoire du prompt**, et les deux concordaient parfaitement.
**Correction** : avant d'écrire la première ligne d'un livrable, **relire depuis le disque** le fichier
de consigne, même lu la même session — et comparer son empreinte ou son nombre de lignes à celle de la
lecture d'ouverture. Une consigne n'est pas un état stable parce qu'elle est committée ou gelée : elle
est un fichier, et un fichier change. Corollaire déjà payé ici : **un nombre imprimé par une commande
que je viens de lancer est une mesure** — « 284 insertions » contredisait ma lecture, et je l'ai lu
sans le voir.
**Portée du dégât** : aucune — l'écart est mort sur la branche, avant le merge, trouvé par un contrôle
que le prompt lui-même exigeait. Ce qui a coûté, c'est le temps, pas la qualité.
**Applicable globalement ?** : **oui**. Variante temporelle de la leçon globale du 5 août
(« une consigne s'exécute depuis le disque, pas depuis la mémoire de la conversation ») : ici le disque
avait raison et c'est **ma mémoire du disque** qui avait tort — la lecture était juste au moment où
elle a été faite.
**Promue en global le 21 août 2026 (validation du chef de projet)**, sous le titre « Un fichier de
consigne lu n'est pas un état, c'est un instantané : il se relit depuis le disque juste avant d'agir ».

## 20 août 2026 — Vérifier une liste ne fonde pas une conclusion sur la famille : la conclusion doit nommer ce qu'elle a mesuré

**Type** : Erreur
**Contexte** : EVOL `dessins-section-3` (merge `950c99a`). Le bloc CSS livré appelle six propriétés
personnalisées (`--space`, `--color-api`, `--color-s36`, `--color-ink-soft`, `--color-bg`,
`--font-mono`). Je les ai toutes vérifiées **avant écriture** — geste juste, dette [W18] en tête —
puis j'ai écrit dans `changes.md` : « vérifié avant écriture, **aucun crochet inerte** — le défaut
exact de [W18] ».
**Erreur** : la conclusion couvre **tous** les crochets ; la mesure ne couvrait que les **jetons**.
Les **classes** n'avaient pas été vérifiées, et c'est exactement là qu'était le crochet : la classe
`api`, portée par **18 éléments**, n'est la cible d'aucune règle. Le `reviewer` l'a relevé à la
première passe (réserve 2), et le défaut a **survécu à deux passes de revue** avant d'être inscrit en
dette [W27]. Un lecteur pressé aurait lu « W18 vérifié » et serait passé.
**Correction** : une conclusion se rédige **avec le périmètre de sa mesure dans la phrase**. Pas
« aucun crochet inerte », mais « les six jetons appelés existent ; les classes n'ont pas été
vérifiées ». Règle mécanique, applicable à la relecture : **si la conclusion est plus courte que
l'énumération de ce qui a été mesuré, elle est trop large.** Le cas particulier CSS a sa propre
question, à poser dans les deux sens : *toute classe du HTML a-t-elle une règle ? toute règle
ajoutée a-t-elle une cible ?* — c'est la proposition R&D du `reviewer`, format B.
**Parenté** : **deuxième occurrence en deux jours** de la même racine que « citer une leçon n'est pas
la tenir » (19 août). Là, le balayage s'arrêtait à l'objet qui l'avait déclenché ; ici, la mesure
s'arrête à la liste que le prompt nommait, et la conclusion, elle, part sur la famille. Même famille
que « un chiffre porte son état » (17 août) et « une affirmation réfutée se retire de tous ses
domiciles » (16 août). Cinquième session consécutive : le code est juste, les mesures sont exactes,
c'est **le périmètre de ce que j'affirme** qui déborde.
**Portée du dégât** : nulle sur le livré — `SHIP` aux deux passes, aucune mesure fausse dans le code.
Le dégât est qu'une dette réelle a failli être **certifiée absente** par la phrase censée la chercher.
**Applicable globalement ?** : **oui**. **Promue en global le 2026-08-20 (validation du chef de
projet)** — entrée `## 2026-08-20 — Vérifier une liste ne fonde pas une conclusion sur la famille :
la conclusion doit nommer ce qu'elle a mesuré` dans `~/.claude/lessons.md`, ajoutée en ajout seul,
avec la provenance et l'empreinte `5edd506` de cette jumelle locale.

## 20 août 2026 — Un décor de liaison posé en `::after` appartient à la boîte, pas à l'intervalle

**Type** : Erreur
**Contexte** : même incrément. Les flèches de sens de lecture des deux dessins étaient posées ainsi :
`.case:not(:last-child)::after { content: "↓"; display: block; margin-top: … }`, sur des `li` qui
portent une **bordure**. Structure conforme au prompt, 134 tests verts, verdict `SHIP` à la première
passe. Sur iPhone 14, la flèche se dessinait **à l'intérieur du cadre**, sous le sous-titre, comme si
elle appartenait à la case — quand le commentaire du prompt annonçait « entre les cases ».
**Erreur** : avoir lu `::after` comme « après l'élément ». Un `::after` est le **dernier enfant** de
son élément : en flux, il se pose **dans** la boîte, donc dans la bordure. Pour vivre dans
l'intervalle, il lui faut sortir du flux — `position: absolute` sur un parent en `position: relative`,
et un espacement entre boîtes assez large pour l'accueillir.
**Correction** : trois questions avant d'écrire un décor de liaison. (1) *Où est la bordure ?* Si
l'élément en porte une, un enfant en flux tombe dedans. (2) *Le décor lie-t-il deux boîtes, ou
appartient-il à l'une ?* Un lien vit dans l'intervalle, jamais dans un des deux termes. (3) *L'espace
qui l'accueille est-il dimensionné pour lui ?* Sinon il touchera un trait. Et la règle qui la couvre
toutes : **un lien entre deux éléments ne se pose pas sur l'un des deux.**
**Parenté** : c'est la vérification en production de « lire l'attribut n'est pas mesurer le pixel »
(15 août). Le CSS était **exactement** celui du prompt, le HTML **exactement** celui du prompt, les
comptages tous justes — et le rendu, faux. Trois défauts sont sortis de la **première capture
d'écran** : celui-ci, les flèches pointant sur un bord de cadre, et le fichier plat enfermé à tort.
Deux des trois n'étaient dans aucune réserve du `reviewer`.
**Portée du dégât** : trois défauts **livrés** en revue, corrigés avant le land par directive du chef
de projet. Aucun n'a atteint `main` sans correctif.
**Applicable globalement ?** : à arbitrer. La règle générale — un lien ne se pose pas sur un de ses
termes — vaut partout ; le détail `::after` vaut pour toute stack qui produit du CSS, donc au moins
WebDev et les projets web.

## 19 août 2026 — Citer une leçon n'est pas la tenir : le balayage porte sur le motif, jamais sur l'objet qui l'a révélé

**Type** : Erreur
**Contexte** : EVOL `probleme-renvoi-et-annexe` (merge `dfbacad`). La veille, la session 14 avait
inscrit « déclarer, c'est balayer ». Je l'ai appliquée : j'ai repéré que `annexe.attente` reprend mot
pour mot `section4.intro` et `section5.intro`, j'ai balayé le fichier entier, trouvé les **six**
occurrences (trois par langue), donné leurs numéros de ligne, et **cité la leçon en exergue** du point
de vigilance dans `changes.md`.
**Erreur** : le balayage portait sur **l'objet** — le texte d'attente — et non sur le **motif** que je
venais moi-même de nommer : « une duplication littérale de valeur qu'aucune porte ne surveille ». Le
`reviewer` a balayé le motif et trouvé **huit** valeurs dupliquées par langue là où j'en déclarais
une : `site.title == about.name`, les **cinq** paires `nav.X == sectionN.title`,
`about.portfolio == footer.portfolio`, plus l'attente en triple. Les paires nav/titre étaient les plus
coûteuses — elles portaient l'invariant que le même incrément cassait sans le voir (réserve 2). J'ai
donc enfreint la leçon **dans le paragraphe même où je la citais**.
**Correction** : un point de vigilance se rédige en **deux temps séparés**, et le premier n'est pas
celui qu'on croit. (1) **Nommer le motif** en une phrase qui ne contient **aucun nom propre** : pas
« le texte d'attente est en triple », mais « une valeur littéralement dupliquée n'est surveillée par
rien ». (2) **Chercher cette phrase**, pas l'exemple qui l'a fait naître. Règle mécanique : si
l'énoncé du balayage contient le nom de l'objet qui a déclenché le constat, le balayage n'a pas
commencé — il s'est arrêté à son point de départ. Et **citer une leçon n'est pas un gage** : c'est
même le moment où la vigilance retombe, parce que la citation donne le sentiment du travail fait.
**Parenté** : c'est la **suite immédiate** de « déclarer, c'est balayer » (19 août), et sa correction.
Là, j'avais déclaré sans balayer ; ici, j'ai balayé, mais le mauvais ensemble. Quatrième session
consécutive sur la même racine : le code est juste, mes mesures sont exactes — c'est le **périmètre**
de ce que j'affirme qui est trop étroit. La famille compte aussi « une affirmation réfutée se retire
de tous ses domiciles » (16 août) et « le remboursement balaie le dépôt, pas le produit » (19 août).
**Portée du dégât** : nulle sur le livré — six réserves `WARN`, verdict `SHIP`, aucune mesure fausse.
Le dégât est ailleurs : une dette a été énoncée à un huitième de sa taille réelle, et une dette
sous-évaluée se rembourse mal.
**Applicable globalement ?** : à arbitrer par le chef de projet. À mon sens **oui** : vaut pour toute
revue, tout audit, toute stack, et vise un réflexe précis — écrire le motif avant l'exemple, et se
relire en cherchant si l'exemple a repris la place du motif.

## 19 août 2026 — Un défaut déclaré une fois se cherche partout où il peut être : déclarer, c'est balayer

**Type** : Erreur
**Contexte** : EVOL `extraits-de-code` (merge `ceadf36`), trois extraits de code C# recréés. À la
lecture des valeurs, j'ai repéré et **déclaré** dans `changes.md` un point de vigilance sur `code2` :
`dictionnaire[propriete.Name.ToUpper()] = attribut?.Nom` inscrit `null` si une propriété ne porte pas
l'attribut. Déclaration soignée, motivée, avec son motif de non-correction (code gelé par le prompt).
**Erreur** : le **même défaut vivait dans `code3`**, du même incrément, dans les deux langues :
`colonne.Value.GetType()` déréférence sans garde — et une colonne à NULL est le cas **ordinaire** d'un
fichier plat S/36, donc plus probable là que dans `code2`. Même famille encore à la ligne suivante
(`modele.GetProperty(colonne.Key)` peut rendre `null`). J'ai déclaré le premier et je n'ai pas cherché
les autres : une fois le constat écrit, je l'ai traité comme réglé. Trouvé par le `reviewer`.
**Correction** : **déclarer un défaut n'est pas un geste ponctuel, c'est l'ouverture d'un balayage.**
Dès qu'un point de vigilance est formulé, en extraire le **motif** (« un déréférencement sans garde »,
« une valeur qui peut être nulle »), puis le chercher dans **tout le périmètre livré** — les six
valeurs, pas celle où l'œil s'est posé — avant d'écrire la déclaration. Règle mécanique : un point de
vigilance s'écrit avec la **liste des endroits examinés**, pas seulement celui qui l'a déclenché ;
« vérifié sur les six valeurs, présent sur deux » et « remarqué sur une » sont deux états différents,
et seul le premier atteste quelque chose.
**Parenté** : famille de « une affirmation réfutée se retire de tous ses domiciles » (16 août) et de
son extension du 19 août (le remboursement balaie le dépôt, pas le produit) — mais **inversée**. Là il
s'agissait de retirer une affirmation fausse de partout où elle était écrite ; ici, de porter un
constat vrai partout où il **s'applique**. Le balayage n'est plus celui d'un texte, c'est celui d'un
motif. C'est la quatrième session d'affilée sur la même racine : le code est juste, ce que j'en dis
est incomplet.
**Portée du dégât** : nulle sur le livré — six réserves `WARN`, verdict `SHIP`, et le défaut est dans
du code d'illustration que le site n'exécute pas. Deux autres remarques du `reviewer` relèvent de
leçons **déjà écrites** et n'en appellent donc pas de nouvelles : un chiffre affirmé sans mesure dans
ma spec (104 annoncés, 101 réels — « un chiffre porte son état », 17 août), et une preuve
d'accessibilité qui mesurait l'atteignabilité au clavier sans voir que la région n'a **ni rôle ni nom
accessible** (« lire l'attribut n'est pas mesurer le pixel », 15 août — ici j'ai bien mesuré le rendu,
mais j'ai mesuré la bonne chose sur une question incomplète).
**Applicable globalement ?** : à arbitrer par le chef de projet. À mon sens **oui** : vaut pour toute
revue, tout audit, toute stack. Un défaut trouvé est un **échantillon**, jamais un inventaire — et le
réflexe de le déclarer proprement donne l'illusion du travail fini.

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

---

## 2026-08-27 — Changer une variable d'état oblige à relire TOUS les chemins qui la consomment
**Type** : Erreur
**Contexte** : Incrément 9, session 21. L'avenant 3 fait passer la valeur d'arrivée de `sent` de la
chaîne vide à `null`. Trois lectures étaient gardées, une quatrième — dans la bascule de langue — ne
l'était pas. Toute bascule FR/EN faite avant le premier envoi jetait une `TypeError`, depuis l'état
d'arrivée que l'avenant venait précisément d'instituer.
**Erreur** : avoir traité un changement de valeur d'état comme une retouche locale, alors qu'il
invalide chaque site de lecture. Quatre défauts de cet incrément sont tombés sur **le même chemin**,
la bascule de langue, qu'aucune des cinq passes n'a relu après trois avenants successifs sur l'état
qu'il consomme.
**Correction** : tout avenant qui change une variable d'état oblige à relire les chemins qui la
consomment, la bascule de langue en tête. Et quand aucun test ne peut monter ces chemins — ici,
aucun DOM sous Vitest —, la seule défense est le **porteur unique** : non pas surveiller les N
endroits, mais faire qu'il n'y en ait qu'un.
**Applicable globalement ?** : **Oui**. Ni le langage ni la stack n'entrent dans l'énoncé.

## 2026-08-27 — Une règle écrite à un endroit et appliquée à un autre n'est pas tenue
**Type** : Erreur
**Contexte** : `caretAllowsStructure` n'avait qu'un point d'application, l'attribut `disabled` posé
par le peintre — un état d'affichage, qui ne vaut que tant que le dernier repeint a tourné avec le
curseur courant. Le geste lui-même ne rejouait jamais la garde.
**Erreur** : avoir pris un **signal** pour une **protection**. C'est la quatrième fois de l'incrément
qu'une règle vit à N endroits, et la première où elle porte sur une règle et non sur une valeur —
les trois précédentes ont toutes été soldées par un porteur unique.
**Correction** : le point d'application qui fait foi est **le geste**, jamais l'affichage qui le
précède. L'attribut `disabled` DIT la règle au lecteur ; le test au clic la TIENT. Corollaire : si
une garde n'est appliquée que par un état recalculé, demander « que se passe-t-il si ce calcul
date ? » — la réponse est le défaut.
**Applicable globalement ?** : **Oui** (UI toutes stacks : WinDev, WPF, React).

## 2026-08-27 — Écrire une certitude qu'on n'a pas mesurée
**Type** : Erreur
**Contexte** : Sept revues sur un même incrément. Trois de mes affirmations ont été **réfutées par
mesure** : « aucun des dix défauts ne se lit dans un fichier » (les deux FAIL suivants se lisaient au
grep), « le double appel est sans conséquence, `render()` est idempotent » (idempotent en sortie, pas
en nombre de mutations du DOM), et « aucune valeur existante n'a été réécrite » (six réécritures
mesurées). Une quatrième — « aucune porte ne surveille ce câblage » — a été vérifiée **exacte**.
**Erreur** : poser des absolus sans réserve dans des artefacts que quelqu'un d'autre lit pour décider.
C'est l'endroit exact où une phrase trop large voyage le plus loin.
**Correction** : dans un dossier, un absolu se mesure ou se borne. Trois formes acceptables : la
mesure au dossier, la réserve explicite (« vérifié sur X, non vérifié sur Y »), ou le retrait de
l'absolu. Aucune n'est plus coûteuse que la réfutation qui suit. Et le fait que la quatrième
affirmation ait tenu ne rachète pas les trois autres : c'est la mesure qui les distingue, pas
l'assurance avec laquelle elles ont été écrites.
**Applicable globalement ?** : **Oui** — porte sur la façon de rendre compte, pas sur une stack.

---

## 2026-08-28 — Une doctrine de réécriture sur place vaut pour les valeurs ET pour les règles
**Type** : Erreur
**Contexte** : Incrément 10, avenant 1. J'ai réécrit sur place les six valeurs gelées que l'avenant
changeait, avec une section « Formulations révoquées » — le geste correct, précédent de l'avenant 2
de la session 20. Mais le même prompt gelé affirme à deux endroits que le « je » « vit à deux
endroits et deux seulement », alors que l'avenant en ajoute un troisième.
**Erreur** : avoir appliqué la doctrine aux **valeurs** et pas aux **énoncés qui les gouvernent**.
Ma section de trace liste six valeurs et zéro règle. Or un futur exécutant lit la règle **avant**
d'écrire la valeur : c'est elle qui l'arrêtera, ou pas.
**Correction** : quand un avenant révoque une valeur, chercher aussi l'énoncé qui la prescrivait —
compte, règle, interdiction, invariant — et le réécrire sur place avec sa trace. Un prompt gelé qui
se contredit est pire qu'un prompt périmé : les deux versions y font autorité.
**Applicable globalement ?** : **Oui** — porte sur la tenue d'un document normatif, pas sur une stack.

## 2026-08-28 — Un relevé de réserves reportées qui en oublie une les tue en silence
**Type** : Erreur
**Contexte** : En rendant compte de la seconde revue, j'ai annoncé que **deux** WARN de la passe
précédente restaient ouverts. Il y en avait **trois** — j'avais omis celui sur le motif du
`aria-hidden` généralisé de la carte I à la carte C. La revue l'a relevé en propre.
**Erreur** : avoir recompté de mémoire au lieu de relire la liste. Le compte rendu est ce que le
chef de projet arbitre ; une réserve absente du relevé n'est pas reportée, elle est **perdue**.
**Correction** : un relevé de réserves reportées se **dérive** de l'artefact précédent, jamais de la
mémoire — et se termine par le compte, confronté à celui de la passe d'avant. « Trois de quatre
restent ouverts » est vérifiable ; « deux restent ouverts » ne l'est pas.
**Applicable globalement ?** : **Oui**.

## 2026-08-29 — Une réserve plus large que son objet use la même crédibilité qu'une réserve tue
**Type** : Erreur
**Contexte** : Avant d'exécuter l'incrément 11, j'ai porté au chef de projet une réserve sur la
phrase publiée « les prompts qui ont piloté chaque étape y sont entiers » : les avenants, disais-je,
« vivent hors dépôt ». Je l'ai reconduite dans `spec.md` puis dans `changes.md`. La revue l'a
mesurée : **faux**. Les avenants sont réécrits sur place dans les prompts gelés — six sections
`## Avenant` dans le prompt de l'incrément 9, une dans celui du 10, avec la trace des formulations
révoquées. La phrase publiée tenait.
**Erreur** : avoir déduit la réserve d'une dette voisine — celle de la session 22, « le prompt gelé
se contredit sur la règle du « je » » — au lieu de la mesurer. La dette réelle était bien plus
étroite, et **déjà nommée au fil**. J'ai fabriqué une réserve neuve là où il y avait un report.
**Correction** : une réserve se mesure **sur son objet** avant d'être portée, exactement comme une
affirmation de code. Une réserve trop large coûte deux fois : elle fait douter d'une chose saine, et
la passe suivante la relit et la reconduit sans la remesurer — c'est ainsi qu'une fausse réserve
survit plus longtemps qu'une vraie. Vérifier d'abord si la dette n'est pas **déjà nommée ailleurs,
plus précisément**.
**Applicable globalement ?** : **Oui** — porte sur la tenue d'un registre de réserves, pas sur une stack.

## 2026-08-29 — Un prompt se confronte au dépôt avant d'être gelé, pas seulement avant d'être exécuté
**Type** : Succès
**Contexte** : Le chef de projet a demandé un examen du prompt de l'incrément 11 **avant** de le
faire exécuter. Ses bases ont été confrontées au dépôt une par une plutôt que lues. Quatre défauts
sont tombés, dont un grave : la preuve 7 annonçait un comptage de 2, la mesure rendait 7 — le motif
attrapait cinq mots de prose, et **l'un des sept était la valeur même que l'incrément réécrit**. La
garde aurait bougé avec la prose et n'aurait jamais mordu sur son objet.
**Approche** : lancer les commandes du prompt sur le dépôt réel au moment de l'examen, y compris
celles qui paraissent évidentes, et vérifier que chaque comptage est **invariant sous l'incrément
qu'il garde** — un chiffre de garde qui bouge quand le travail avance ne garde rien.
**Pattern extrait** : le bon moment pour trouver un défaut de prompt est **avant le gel**, parce
qu'aucune branche n'existe et que le gel n'est ancré nulle part : la correction ne coûte alors aucun
avenant. Trouvé après, le même défaut coûte un arrêt à l'ÉTAPE 0 (session 22) ou un avenant. Et le
remède le plus durable n'est pas la correction elle-même, mais l'arbitre : le chef de projet a
ajouté un paragraphe « Le compte qui fait foi » qui désigne à l'avance la formulation qui l'emporte
si le prompt se contredit ailleurs.
**Applicable globalement ?** : **Oui** — vaut pour toute spécification exécutable par un tiers.
**Promue en global le 29 août 2026 (validation du chef de projet)**, sous un titre **resserré sur la
règle transférable** — « Un chiffre de garde doit être invariant sous le travail qu'il garde, et le
moment de le vérifier est avant le gel » — entrée datée 2026-08-29 de `~/.claude/lessons.md`. Le
titre local dit *quand* faire le geste, le titre global dit *ce qu'on vérifie* : c'est ce second
énoncé qui voyage hors de ce projet. Les deux se retrouvent par l'empreinte `62ea3e5`, portée par la
provenance de l'entrée globale.

## 2026-09-01 — Un commentaire qui désigne son voisin par sa place se périme à la première insertion
**Type** : Erreur
**Contexte** : L'incrément 12 bis a glissé `section5.prive` entre `<p data-i18n="section5.preuve">`
et le commentaire qui le suivait : « Le dépôt d'abord : le paragraphe `preuve` vient de l'annoncer. »
Le commentaire est resté vrai sur le fond et faux sur la forme — « vient de » ne désigne plus le
paragraphe qui précède. Le `reviewer` l'a relevé, [W46]. **Deuxième occurrence dans le même
incrément, autre fichier** : le commentaire de `.boite` (`css/styles.css`) décrit un client unique
et son tableau qui défile, alors que la classe en a deux depuis ce commit, le second sans tableau —
[W47].
**Erreur** : insérer entre un élément et le commentaire qui le désigne sans relire ce que ce
commentaire dit ; et, symétriquement, ajouter un porteur à une classe dont le commentaire énumère
ses porteurs. Dans les deux cas j'ai relu le diff, qui était juste, et pas le voisinage, qui ne
l'était plus.
**Correction** : un commentaire **nomme sa cible**, il ne la désigne ni par sa position
(« ci-dessus », « vient de », « le paragraphe qui précède ») ni par un inventaire de ses clients.
Ces deux formes portent une hypothèse sur le voisinage, et le voisinage change à chaque incrément.
**Le geste qui va avec** : quand un incrément **insère** du contenu, la relecture porte aussi sur
les commentaires voisins **non modifiés**. Ils sont hors du diff par construction — c'est
exactement pourquoi ils échappent à une revue de diff, et pourquoi il a fallu un relecteur qui
ouvre les fichiers pour les voir.
**Applicable globalement ?** : **Oui** — la règle ne tient à aucun langage. Elle s'est manifestée
ici en HTML et en CSS dans le même incrément, et vaut partout où du code se commente.

## 2026-09-01 — Une garde qui compte un littéral mord sur le texte qui l'explique ; et le remède n'est pas toujours d'appauvrir ce texte
**Type** : Erreur
**Contexte** : Incrément « Habillage » (12 ter), **deux avenants de suite, même faute**.
**Avenant 1** : la déclaration `text-transform: uppercase` est retirée de `.chapeau` parce qu'elle
rendait « IBM i » en « IBM I ». Le commentaire écrit pour expliquer le retrait citait la déclaration
**littéralement**. La preuve D1, qui compte cette déclaration dans la feuille, a rendu **2** au lieu
de 1 : la règle restante, plus ma propre prose.
**Avenant 2** : les deux mentions « capitales espacées » du prompt sont recalées. La preuve D2, qui
compte cette formule dans le prompt, a rendu **4** au lieu de 0 : le corps du prompt était propre, et
les quatre occurrences étaient les **citations de l'avenant lui-même**, qui trace ce qu'il révoque.
**Erreur** : écrire une garde qui compte un littéral **sans délimiter ce qu'elle regarde**, dans un
dépôt où le même littéral vit légitimement dans deux régimes — le code, qui est son objet, et le
texte qui l'explique ou trace sa révocation. La faute n'est pas le compte, c'est le **périmètre non
dit**. Et elle est passée deux fois dans le même incrément : la première correction n'a pas été
généralisée, elle a été appliquée à son cas.
**Correction** : avant d'écrire une garde qui compte un littéral, poser la question du périmètre —
*où cette chaîne a-t-elle le droit d'exister ?* Puis choisir le remède selon que le texte a **besoin**
du littéral pour faire son travail :

- **Il n'en a pas besoin** (avenant 1) : reformuler le texte. Un commentaire explique un geste, il
  n'a pas à en citer la syntaxe — « la forcer rendait » vaut « `text-transform: uppercase` rendait ».
- **Il en a besoin** (avenant 2) : **restreindre la garde**, jamais appauvrir le texte. La trace des
  formulations révoquées est la valeur même d'un avenant ; une garde qui obligerait à l'effacer
  détruirait ce qu'elle prétend protéger. La garde s'est donc bornée au corps du prompt, avenants
  exclus par construction (`sed -n '1,/^## Avenant 1/p' … | grep -c`), en **déclarant tout haut** que
  le compte sur le fichier entier n'est pas nul — une garde muette sur son propre angle mort ment
  par omission.

**Ce qu'une garde de littéral ne prouve pas, et qu'il faut dire** : elle atteste l'absence d'une
**formule**, jamais l'absence d'une **prescription**. Le `reviewer` l'a montré sur ce même incrément :
D2 était verte alors que le corps du prompt **prescrit encore deux fois** la déclaration retirée
(l. 184, l. 314) — que ne compte aucun `grep` sur « capitales espacées ». Une garde de forme se double
d'une révocation **nommée** dans l'avenant, ou elle laisse passer ce qu'elle avait l'air de couvrir.
**Parenté** : c'est la même famille que la leçon du 29 août 2026 (« un chiffre de garde doit être
invariant sous le travail qu'il garde »). Celle-là dit qu'une garde ne doit pas bouger avec le
travail ; celle-ci dit qu'elle ne doit pas **regarder plus loin que son objet**. Les deux se ramènent
à une seule exigence : **une garde nomme son périmètre**, en valeur comme en étendue.
**Applicable globalement ?** : **Oui** — la règle ne tient à aucun langage ni à aucun outil. Elle vaut
pour tout `grep` de garde, tout test de comptage, tout lint maison, dans tout dépôt où le code et la
prose qui le documente vivent dans les mêmes fichiers.

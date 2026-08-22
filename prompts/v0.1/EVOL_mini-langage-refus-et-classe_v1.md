# EVOL — Le mini-langage (1 sur 2) : le texte, le décor, les refus, la classe

**Fichier** : `prompts/v0.1/EVOL_mini-langage-refus-et-classe_v1.md`
**Type** : EVOL (contenu + comportement + tests) · **Branche** : `feat/mini-langage-refus-et-classe` · **Révision** : v1 · **Date** : 22 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> ## PROMPT GELÉ, EXÉCUTABLE
> Gelé par le chef de projet le 22 août 2026. **Aucune valeur de ce prompt ne se négocie en cours de
> route.** Si une consigne te paraît fausse, contradictoire ou impossible à tenir, tu **arrêtes et tu le
> dis** ; tu ne l'adaptes pas de toi-même.
>
> **Il remplace `DRAFT_EVOL_mini-langage_v1.md`**, archivé le 21 août dans `Prompts_Non_Suivis`.
> Le second sous-incrément (`json-et-edition`) n'est **pas** gelé : ne l'ouvre pas.
>
> ### Avenant 1 — 22 août 2026, arbitrage du chef de projet
> La règle des chevrons, telle que gelée, était **fausse pour le dictionnaire**. Elle exigeait des
> entités là où `textContent` les afficherait littéralement. Arrêt de Claude Code à l'étape 0, mesuré
> et fondé : la contradiction était réelle. La règle corrigée figure ci-dessous à sa place, dans la
> section « Les chevrons ». **C'est la version corrigée qui fait foi.** Le reste du prompt est
> inchangé, et reste non négociable.
>
> ### Avenant 2 — 22 août 2026, après validation sur iPhone 14
> **Cinq corrections, un commit, un quatrième tour, puis `/land`.** Elles sont décrites dans la section
> **« Avenant 2 »** juste sous ce bandeau. Elles s'ajoutent au prompt, elles n'en retirent rien.
> Trois enrichissements d'usage identifiés le même soir en sont **explicitement exclus** : ils auront
> leur propre incrément.

## Avenant 2 — cinq corrections, arbitrage du 22 août 2026

> ### Avenant 2 — 22 août 2026, arbitrage du chef de projet, après validation sur iPhone 14
>
> Cinq **corrections**, un commit, un quatrième tour de revue, puis `/land`. Elles portent toutes sur
> des choses que la page **affirme** et qui sont fausses, contradictoires ou illisibles. Trois d'entre
> elles ont été trouvées par l'œil du chef de projet sur appareil réel, là où aucune porte ne regardait.
>
> **Périmètre strict : ces cinq points et rien d'autre.** Trois enrichissements d'usage ont été
> identifiés le même soir (marquer le dernier exemple utilisé, fermer la séquence par un bouton,
> teinter le bloc de refus). Ils **ne sont pas dans cet avenant** : ils forment un ensemble cohérent
> qui aura son propre incrément et son propre contrat. **[W23]** reste dehors. Si l'un d'eux te
> démange, écris-le dans `changes.md` et n'y touche pas.
>
> La parité FR/EN reste à **94 clés de chaque côté**. Aucune clé n'est créée, aucune n'est renommée.
> La clé `section4.legende.modifier` **garde son nom** : le sous-incrément `json-et-edition` lui rendra
> son sens.

#### A2-1 — Le nom de la classe se dérive des colonnes, jamais du chemin parcouru

**Mesuré.** `DEFAULT_SELECTION` vaut `[0, 4, 7, 2]`, figé et non trié, recopié tel quel ligne 568.
Le tri par ordre de modèle est ligne 637, **à l'intérieur du gestionnaire de case à cocher**. Donc :

| Geste du lecteur | Empreinte |
|---|---|
| au chargement | `b0ff` |
| il coche `villeClient` puis le décoche | `4b8e` |

Les **mêmes quatre colonnes** rendent deux noms. La page enseigne que le nom se dérive des colonnes
choisies ; il se dérive en fait de l'ordre des gestes. C'est l'argument central du chapitre qui se
contredit sous le doigt du lecteur.

**Correction** : trier la sélection **à l'initialisation**, pour que l'ordre soit celui du modèle dès
le premier rendu. Ne touche pas au tri de la ligne 637, il est juste.

#### A2-2 — La légende ne promet plus un geste que la page n'offre pas

**Mesuré.** `section4.legende.modifier` dit « Modifier une cellule teintée casse un lien ». Or **rien
n'est modifiable dans cet incrément** : aucun `contenteditable`, aucun bouton, aucun gestionnaire
d'édition. Le critère d'acceptation 7 l'interdisait explicitement. Le prompt gelé portait donc
l'interdiction et la phrase qui la contredit.

**Valeurs exactes :**

- `fr` : `Les cellules teintées portent les liens : ce sont elles qu'un programme doit maintenir. Les autres ne tiennent rien.`
- `en` : `The tinted cells carry the links: they are the ones a program has to keep in step. The others hold nothing together.`

#### A2-3 — La phrase sur l'injection ne s'affiche plus sur n'importe quel vide

**Mesuré.** `compte.aucune` porte la phrase soudée, et `js/minilangage.js:695` la déclenche dès que le
compte vaut zéro, quelle qu'en soit la cause. Une date mal tapée, `20261700`, reçoit le discours sur
l'injection. Le coût n'est pas le bruit : cette phrase est **la chute de la démonstration
d'injection**, et elle devient du papier peint. Quand le lecteur clique enfin sur l'exemple qui la
mérite, il l'a déjà lue après une faute de frappe.

**La phrase n'est pas supprimée, elle est déplacée là où elle mord.** Quatre valeurs :

- `compte.aucune` `fr` : `Aucune ligne trouvée sur {total}.`
- `compte.aucune` `en` : `No row found out of {total}.`
- `ex.injection.aide` `fr` : `Le grand classique, et il ne doit PAS marcher. La valeur a été comparée, pas assemblée : elle n'a jamais eu la moindre chance de devenir une instruction. Elle est cherchée comme un nom de client, qui n'existe pas.`
- `ex.injection.aide` `en` : `The great classic, and it must NOT work. The value was compared, not assembled: it never had the slightest chance of becoming an instruction. It is looked up as a customer name, which does not exist.`

#### A2-4 — Une explication d'exemple redevient lisible

**Mesuré.** `ex.finitPar.aide` se termine par « Essayez AND, ou T. », deux invitations comprimées au
point d'être illisibles. Sur un écran de téléphone, la fin se lit comme une phrase tronquée. Ses
voisines sont claires : `depuisDate` dit « Reculez la date, 20260301 en ramène 14 ».

**Première rédaction de cet avenant corrigée le 22 août 2026, sur constat de Claude Code.** Elle
promettait un refus sur « finit par T ». Faux : `MIN_LENGTH_OPERATORS` vaut `["[]"]`, le minimum ne
porte que sur « contient ». Une lettre sur « finit par » **passe** et rend LAMBERT et PETIT.

**Le minimum n'est pas étendu aux autres opérateurs.** Il existe parce que « contient » **balaie** :
une lettre sur « commence par » rend 5 lignes sur 18, une tranche, pas un balayage. Étendre le plancher
rendrait la règle arbitraire au lieu de motivée, et ce serait un changement de comportement hors
périmètre sur un refus déjà livré et testé.

- `fr` : `Les noms qui finissent par IER : FOURNIER, MERCIER, GARNIER, soit 3 commandes. Essayez la même chose avec une seule lettre, T : elle passe, et rend LAMBERT et PETIT.`
- `en` : `Names ending in IER: FOURNIER, MERCIER, GARNIER, so 3 orders. Try the same thing with a single letter, T: it goes through, and finds LAMBERT and PETIT.`

#### A2-5 — L'explication ne survit plus à un refus qui la contredit

**Mesuré sur appareil.** Champ `<customerLastName:[=:/>`, la page répond « Value missing », et en bas
la surface d'explication affiche toujours « Names starting with DUR: 3 orders out of 18 ». Deux
affirmations contradictoires à l'écran en même temps.

**Règle** : dès que le contenu du champ **ne correspond plus** à la valeur posée par le dernier exemple
cliqué, la surface d'explication revient à son texte de repos.

**Piège à éviter, et il est réel** : le basculement de langue réécrit le champ par
`translateExpression`. La comparaison doit donc porter sur la valeur de l'exemple **dans la langue
courante**, jamais sur la chaîne mémorisée au moment du clic. Sans cette précaution, changer de langue
effacerait l'explication d'un exemple qui est pourtant toujours celui affiché.

#### Tests, tous nommés, tous dans les deux langues

1. Le nom de la classe **au chargement** est identique au nom obtenu après avoir coché puis décoché
   n'importe quelle case, à sélection égale. C'est la porte de A2-1, et elle doit **rougir** si on
   retire le tri d'initialisation : vérifie-le en le retirant, puis remets-le.
2. `compte.aucune` **ne contient pas** le mot « instruction » ni « assembled ».
3. `ex.injection.aide` **contient** la phrase déplacée, dans les deux langues.
4. Aucune valeur de `section4.legende` ne contient « Modifier », « Changing », ni aucun verbe qui
   demande un geste au lecteur.
5. Un champ qui ne correspond plus au dernier exemple cliqué rend la surface d'explication à son repos.
6. Un basculement de langue **ne** rend **pas** la surface à son repos quand l'exemple est toujours
   celui affiché.
7. La parité FR/EN de `section4` vaut toujours **94 clés de chaque côté**, divergence nulle dans les
   deux sens.

#### Preuves à écrire dans `changes.md`

- Les deux empreintes avant correction (`b0ff`, `4b8e`) et l'empreinte unique après.
- Le balayage qui montre `instruction` et `assembled` absents de `compte`, présents dans `ex.injection`.
- Le compte de clés par langue, avant et après.
- La liste des enrichissements **écartés** et leur motif, pour que l'incrément suivant les retrouve.

#### Dernier geste

Un seul commit, staging précis. Revue déléguée au subagent `reviewer`. `.pipeline/STATUS.md` réécrit en
dernier. **Puis `/land`.**

---

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | S-1 : aucun cadratin de prose dans les valeurs livrées, **y compris en cellule de tableau**. S-2 : la page dit ce qu'elle fait, **jamais qu'elle est sûre**. S-3 : rien qui range le S/36 au passé. S-4 : chaque langue s'adresse à son lecteur, l'anglais n'est pas une traduction mot à mot. **Ne réécris aucune valeur existante.** |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre par `textContent`, **jamais `innerHTML`** : `grep -c innerHTML js/*.js` = 0 avant et après. Aucune dépendance. Aucun appel réseau. Aucune requête construite ni exécutée. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `UX_METHOD` | — | Appliqué, à mesurer | Mobile-first strict. Aucun débordement horizontal de la page à **320 px** ni à **390 px**, et cette mesure se prend **dans tous les états** : au chargement, au survol d'un exemple, après un clic, réglages changés. Tableaux et blocs de code défilent dans leur conteneur, jamais la page. Les trois fichiers de jointure sont **repliés par défaut** (arbitrage du 21 août, 600 px gagnés, mesuré). Motif de dépliement **déjà établi** par l'incrément 5 : `details`/`summary` natifs, aucun script. |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Le reconnaisseur, la jointure et le filtrage sont de la **logique pure** : module testable, suite Vitest dédiée. **Le module reçoit le modèle en paramètre** et ignore la langue (voir ÉTAPE 5). Les deux portes existantes (parité FR/EN, résolution HTML vers dictionnaire) couvrent mécaniquement les clés ajoutées. |
| `PEDAGOGY_METHOD` | — | **Appliqué** | Erreur du 20 août à ne pas rejouer : une consigne interdisant tout exemple concret a rendu seize valeurs illisibles. Ici, **chaque refus montre un exemple** et chaque règle arrive avec un bouton cliquable. Tout terme technique est étiqueté à sa première apparition. |
| `VISION_METHOD` | — | Écarté, hésitation nommée | Ses gates arrivent au jalon 2. L'hésitation : le rendu de dix-huit lignes à 320 px est exactement ce qu'elles mesureraient. Non installées ici ; la validation visuelle et tactile reste au chef de projet, et l'écart est dit. N'installe rien. |
| `SQL_METHOD` | — | Écarté, motif | Aucune requête n'est émise vers aucune base, et **aucun texte SQL n'est produit dans cet incrément**. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** :
`docs(prompt): prompts/v0.1/EVOL_mini-langage-refus-et-classe_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact : `CLAUDE.md` (sections « Le cas fictif », « Style du produit »,
« Anonymisation ») et `tasks/ROADMAP.md` (ligne 6 du fil). Les notes de contenu
(`../Etude_Technique/NOTES_CONTENU_mini-langage_v6.md`) sont **hors dépôt** : tout ce qui en est
nécessaire est reproduit ici, tu n'as pas à les ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.15** au manifeste. `git rev-list --count origin/main..main` = **0**.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 17`.
3. `npm test` vert sur `main` : **134/134**, cinq fichiers de test.
4. La section 4 est encore un texte d'attente : `grep -c 'data-i18n="section4' index.html` = **2** ; dans
   `js/i18n.js`, le groupe `section4` porte **exactement** les clés `title` et `intro` de chaque côté.
5. Bases de comptage relevées sur `main` le 21 août 2026 :
   `grep -o '<details' index.html | wc -l` = **1** · `grep -o '<script' index.html | wc -l` = **2** ·
   `grep -c innerHTML js/i18n.js` = **0** · `ls js/` = `i18n.js`, `menu.js`, `s36.js`.
6. Cadratins : `js/i18n.js` = **10**, `index.html` = **1**, `css/styles.css` = **8**. Ces trois nombres
   doivent être **inchangés** à la fin.
7. `js/s36.js` exporte `extractField` et `parseImplicitDecimal`. **Tu réemploies `parseImplicitDecimal`
   pour les montants ; tu n'en écris pas un second.** Une seconde implémentation de la même règle →
   ARRÊTE-TOI et signale.
8. La convention de traduction du code est en place : `grep -c 'ColonneS36' js/i18n.js` = **9** et
   `grep -c 'S36Column' js/i18n.js` = **9**. Cette convention gouverne tout cet incrément (ÉTAPE 3).

## Contexte et périmètre

La section 4 ne porte aujourd'hui qu'un texte d'attente. Cet incrément lui donne **une démonstration
complète et suffisante** : le lecteur comprend pourquoi ce langage existe, voit les fichiers, écrit une
demande, se fait refuser quand il sort des clous, et **voit la classe se réécrire sous ses yeux**.

**Registre de la section, et il gouverne tout le reste.** Cette section n'est pas comme les quatre
autres. Les autres racontent des mécanismes qui existent et qui tournent. Celle-ci annonce **dès sa
première phrase** qu'elle est d'une autre nature : une idée qu'on a eu envie d'essayer, ici et nulle
part ailleurs. *(Arbitrage du chef de projet du 21 août 2026.)* Ne la relie à aucun mécanisme réel du
site, et **n'écris nulle part qu'un programme existant applique ce langage.** La page peut dire que la
conception permet le contrôle ; elle ne peut pas dire qu'un code existant l'applique. La nuance relève
de la leçon du 17 août : coder ou dire, jamais un adverbe entre les deux.

**Ce que le simulateur doit démontrer, et le piège à éviter.** Un simulateur où l'on tape un filtre et
où des lignes apparaissent ne démontre rien : toutes les API filtrent. **La révélation n'est pas dans
les lignes qui changent, elle est dans la forme qui change.** Ce qui doit bouger à l'écran, c'est la
classe fabriquée. Toute décision se juge à cette aune, et c'est pourquoi la classe est **dans cet
incrément** et non dans le suivant.

**Périmètre** : `index.html`, `js/i18n.js`, `css/styles.css`, **un module neuf** `js/minilangage.js`,
**une suite neuve** `tests/minilangage.test.js`. **Rien d'autre.**

**Hors périmètre, explicitement.** Aucune dépendance, aucun appel réseau, aucune image, aucun SVG,
aucune animation. Aucune modification des valeurs existantes du dictionnaire ni des quatre autres
sections. **Pas de bloc JSON, pas de texte SQL, pas d'édition des données** : ils appartiennent à un
autre incrément, ne les anticipe pas. Les dettes ouvertes restent ouvertes, y compris **[W23]** (indice
de défilement des cadres de code) qui te démangera ici. Si quelque chose te semble manquer, écris-le
dans `changes.md` et n'y touche pas.

**Langue des clés du dictionnaire** : en français, comme les groupes existants (arbitrage en attente,
`tasks/ROADMAP.md`). Les identifiants HTML suivent les existants. Ne renomme rien.

**Les chevrons : la règle dépend du fichier.** *(Corrigée par l'avenant 1, voir en tête.)*

| Où | Ce qui s'écrit | Motif, mesuré au dépôt |
|---|---|---|
| `index.html` | **entités** `&lt;` `&gt;` | le navigateur y lit du balisage. Convention déjà en vigueur, l. 208-209 |
| valeur du dictionnaire (`js/i18n.js`) | **chevrons nus** | `applyI18n` pose les textes par `textContent` (`js/i18n.js:682`). `textContent` **n'interprète pas** les entités : une entité s'afficherait littéralement à l'écran. Convention déjà en vigueur, extraits C# l. 109, 137, 378, 406 |

Une **entité** dans une valeur du dictionnaire → ARRÊTE-TOI et signale.
Un **chevron nu** dans `index.html` → ARRÊTE-TOI et signale.

**Ce qui protège de l'injection n'est pas l'encodage, c'est `textContent`.** Aucune valeur du
dictionnaire ne se pose par `innerHTML` ni par `insertAdjacentHTML`, dans aucun fichier que tu écris.
Cette propriété est vérifiable et **tu la vérifies** : `grep -rn "innerHTML\|insertAdjacentHTML" js/`
ne doit rien rendre hors commentaire. Écris la mesure dans `changes.md`.

---

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/mini-langage-refus-et-classe` · `.pipeline/spec.md`, dont la **première ligne** est
exactement `Incrément : EVOL mini-langage-refus-et-classe` · commit du prompt (message exact ci-dessus).

## ÉTAPE 2 — Livrable A : le texte de la section

Groupe `section4`, sous-groupes `ouverture` et `pourquoi`. Valeurs **au caractère près**.

### Français

- **`ouverture.titre`** : Une idée, pas une pièce du système
- **`ouverture.p1`** : Ce chapitre n'est pas comme les autres. Tout ce que le site raconte jusqu'ici existe et tourne. Ce qui suit est une idée que j'ai eu envie d'essayer, ici, sur ce site, et nulle part ailleurs.
- **`ouverture.p2`** : Elle part d'une question simple : qu'est-ce qu'un appelant a le droit de demander ? Lui laisser écrire lui-même son filtre, c'est lui donner les clés du bâtiment. Il pourrait lire une colonne que je ne lui montre pas, ouvrir un fichier dont je ne lui ai jamais parlé. Alors j'ai imaginé l'inverse : il ne rédige rien, il choisit. Une colonne dans la liste que j'expose, un test dans une liste de six, et une valeur. Trois listes, et rien en dehors.
- **`ouverture.p3`** : Est-ce que ça tient debout ? C'est exactement ce que la suite de cette page permet d'essayer.
- **`pourquoi.a1`** : Un where ouvert, c'est donner les clés de la maison : l'appelant peut demander n'importe quelle colonne, n'importe quel fichier, n'importe quelle sous-requête.
- **`pourquoi.a2`** : Un where ouvert parle le langage du fichier, avec ses noms d'au plus six caractères. Celui-ci parle le langage du métier.
- **`pourquoi.a3`** : Un where ouvert ne se borne pas. On ne peut ni interdire une négation qui ramènerait tout, ni exiger deux caractères sur un « contient ». Avec trois listes closes, on le peut.

### Anglais

- **`ouverture.titre`** : An idea, not a working part
- **`ouverture.p1`** : This chapter is not like the others. Everything the site has shown you so far exists and runs. What follows is an idea I felt like trying, here, on this site, and nowhere else.
- **`ouverture.p2`** : It starts with a simple question: what is a caller entitled to ask for? Let them write their own filter and you have handed over the keys to the building. They could read a column you never showed them, open a file you never mentioned. So I imagined the opposite: they write nothing, they choose. A column from the list I expose, a test from a list of six, and a value. Three lists, and nothing outside them.
- **`ouverture.p3`** : Does it hold up? That is exactly what the rest of this page lets you try.
- **`pourquoi.a1`** : An open where clause hands over the keys to the house: the caller can ask for any column, any file, any subquery.
- **`pourquoi.a2`** : An open where clause speaks the file's language, with its names of six characters at most. This one speaks the language of the business.
- **`pourquoi.a3`** : An open where clause cannot be bounded. You cannot forbid a negation that would bring back everything, nor require two characters on a contains. With three closed lists, you can.

## ÉTAPE 3 — Le modèle exposé, et la convention de traduction du code

**Convention déjà en place, mesurée sur `main` le 21 août 2026, et elle gouverne tout cet incrément.**
Le site traduit son code : `ColonneS36` devient `S36Column`, `nomClient` devient `customerLastName`.
**Seul le nom physique de la colonne ne bouge jamais** : `NOMCLI` reste `NOMCLI` dans les deux langues.
C'est la thèse du site en miniature, et elle s'applique ici sans exception.

Neuf propriétés exposées. Les quatre premières lignes anglaises **existent déjà** dans les extraits de
la section 3 : reprends-les au caractère près, n'en invente pas de variantes.

| # | Propriété FR | Propriété EN | Colonne | Fichier | Type |
|---|---|---|---|---|---|
| 1 | `nomClient` | `customerLastName` | NOMCLI | CDEMST | texte |
| 2 | `prenomClient` | `customerFirstName` | PRECLI | CDEMST | texte |
| 3 | `codeModeLivraison` | `deliveryModeCode` | LIZEPO | CMLIV | texte |
| 4 | `libelleModeLivraison` | `deliveryModeLabel` | LIBLIV | MODLIV | texte |
| 5 | `numeroCommande` | `orderNumber` | NUMCDE | CDEMST | entier |
| 6 | `dateCommande` | `orderDate` | DATCDE | CDEMST | date |
| 7 | `montantBrut` | `rawAmount` | MTTCDE | CDEMST | texte |
| 8 | `montantCommande` | `orderAmount` | MTTCDE | CDEMST | décimal |
| 9 | `villeClient` | `customerCity` | VILCLI | CLIMST | texte |

**`rawAmount` et non `grossAmount`** : ici « brut » veut dire **non interprété**, pas « hors taxes ».
Un lecteur comptable lirait `gross` de travers.

**Le nom de la classe fabriquée se traduit aussi** : `Commande_<empreinte>` côté français,
`Order_<empreinte>` côté anglais.

**Conséquence pour le lecteur, et elle est voulue** : l'anglophone tape `<customerLastName:[=:DUR/>`.
Le mini-langage est bilingue comme le reste du code. *(Arbitrage du chef de projet, 22 août 2026.)*

## ÉTAPE 4 — Livrable B : le décor, quatre fichiers

Le décor est **du contenu, pas de la donnée d'exécution** : il vit dans `js/minilangage.js`, en littéral,
et il est **montré en entier**. Rien n'est caché, rien n'est tronqué. *(N'écris aucun nombre de lignes
dans la prose du site : le décor pourra encore changer de taille.)*

**`CDEMST`, les commandes : dix-huit lignes, toujours visibles.**

| NOMCLI | PRECLI | NUMCDE | DATCDE | MTTCDE |
|---|---|---|---|---|
| DURAND | CLAIRE | 104207 | 20260112 | 000012550 |
| DURAND | MARC | 104219 | 20260118 | 000340000 |
| DUBOIS | ALICE | 104231 | 20260203 | 000008990 |
| MARTIN | PAUL | 104244 | 20260211 | 001250000 |
| LEROY | SOPHIE | 104258 | 20260304 | 000067425 |
| BERNARD | ALINE | 104263 | 20260319 | 000199900 |
| MOREAU | JULIEN | 104277 | 20260402 | 000045000 |
| DUCHEMIN | ALBERTE | 104281 | 20260415 | 000731050 |
| FOURNIER | LOUISE | 104296 | 20260428 | 000023400 |
| MERCIER | ANTOINE | 104302 | 20260506 | 000512000 |
| GARNIER | CAMILLE | 104318 | 20260519 | 000004750 |
| MARCHAND | HUGO | 104327 | 20260602 | 000088300 |
| LAMBERT | THERESE | 104333 | 20260615 | 000156780 |
| ROLLAND | GILLES | 104341 | 20260703 | 000297500 |
| PETIT | MARIE | 104355 | 20260718 | 000011200 |
| GIRAUD | PIERRE | 104362 | 20260805 | 000940000 |
| DURAND | CLAIRE | 104378 | 20260819 | 000064300 |
| MARTIN | PAUL | 104384 | 20260902 | 000375900 |

**`CLIMST`, les clients : dix-huit lignes, repliées.** Mêmes couples nom et prénom, plus `VILCLI`, dans
cet ordre : DURAND CLAIRE LYON · DURAND MARC PARIS · DUBOIS ALICE NANTES · DUCHEMIN ALBERTE ROUEN ·
MARTIN PAUL LILLE · LEROY SOPHIE DIJON · BERNARD ALINE LYON · MOREAU JULIEN TOURS · FOURNIER LOUISE
LYON · MERCIER ANTOINE PARIS · GARNIER CAMILLE NANTES · MARCHAND HUGO LILLE · LAMBERT THERESE RENNES ·
ROLLAND GILLES PARIS · PETIT MARIE ANGERS · GIRAUD PIERRE TOURS · NOEL SYLVIE RENNES · VASSEUR OLIVIER
ANGERS.

**`CMLIV`, le mode par client : dix-huit lignes, repliées.** Mêmes couples, plus `LIZEPO`, dans le même
ordre : EXP · STD · RET · EXP · EXP · MES · STD · RET · REL · PAL · REL · PAL · MES · STD · REL · EXP ·
RET · MES.

**`MODLIV`, le référentiel : six lignes, repliées.** EXP · STD · RET · MES · REL · PAL, avec leurs
libellés traduits (voir les valeurs ci-dessous).

**Propriétés du décor, non négociables, à vérifier mécaniquement après écriture.** Trois noms distincts
commencent par `DU`. Deux clients seulement commencent par `DUR`. Les deux `DURAND` ne se séparent que
par le prénom : **c'est l'argument de la jointure et il ne se dilue pas.** Deux clients portent deux
commandes, deux clients n'en portent aucune. Ne « corrige » ni l'un ni l'autre.

**Le décor porte sa règle de colonnes**, en-têtes visibles, registre bleu du plan technique : un fichier
plat sans en-tête reproduirait le défaut que la section 2 passe deux écrans à expliquer.

### Valeurs du décor

**Français**

- **`decor.titre`** : Le décor : les fichiers du grossiste
- **`decor.intro`** : Quatre fichiers, aucune clé technique. Et pourquoi aucun numéro de client ? Ces machines n'en fabriquaient pas : un identifiant se gérait soi-même, un champ de plus dans des enregistrements à longueur fixe où chaque octet comptait. On joignait donc par les valeurs du métier.
- **`decor.cdemst`** : CDEMST : les commandes
- **`decor.climst`** : CLIMST : les clients
- **`decor.cmliv`** : CMLIV : le mode de livraison par client
- **`decor.modliv`** : MODLIV : le référentiel des modes
- **`modes.exp`** : Express 24 h
- **`modes.std`** : Standard 72 h
- **`modes.ret`** : Retrait entrepôt
- **`modes.mes`** : Messagerie
- **`modes.rel`** : Point relais
- **`modes.pal`** : Palette affrétée

**Anglais**

- **`decor.titre`** : The setting: the wholesaler's files
- **`decor.intro`** : Four files, not a single technical key. And why no customer number? These machines did not produce one: an identifier was yours to manage, one more field in fixed length records where every byte was counted. So you joined on the values the business already used.
- **`decor.cdemst`** : CDEMST: orders
- **`decor.climst`** : CLIMST: customers
- **`decor.cmliv`** : CMLIV: delivery mode per customer
- **`decor.modliv`** : MODLIV: the delivery mode reference file
- **`modes.exp`** : Express, 24 h
- **`modes.std`** : Standard, 72 h
- **`modes.ret`** : Warehouse pickup
- **`modes.mes`** : Parcel carrier
- **`modes.rel`** : Collection point
- **`modes.pal`** : Chartered pallet

## ÉTAPE 5 — Livrable C : la jointure, et les deux sortes de liens

Trois des neuf propriétés viennent d'un autre fichier que les commandes, par jointure **sur nom plus
prénom**, sans le moindre identifiant : `villeClient` de `CLIMST`, `codeModeLivraison` de `CMLIV`, et
`libelleModeLivraison` de `MODLIV` par `LIZEPO` = `CODLIV`.

Une jointure qui ne trouve rien rend **`null`**, et `null` ne satisfait aucun test. Écris-le ainsi dès
maintenant : c'est ce comportement que l'incrément suivant rendra visible au lecteur.

**Les montants passent par `parseImplicitDecimal` de `js/s36.js`.** Le fichier stocke `000012550` pour
125,50.

### Les colonnes de liaison sont teintées, et il y a DEUX teintes

*(Arbitrage du chef de projet, 21 août 2026.)* Les colonnes qui portent un lien sont teintées,
**cellules comprises**, dans les quatre fichiers. Sans ce repère, casser la jointure est un hasard ;
avec lui, c'est une expérience choisie, et c'est la condition du dispositif de l'incrément suivant.

**Deux teintes, parce que les deux liens ne sont pas de même nature.** Les confondre reviendrait à dire
que reconnaître une personne par son nom et pointer vers une table de codes sont la même opération.

| Classe CSS | Colonnes | Teinte cellule | Teinte en-tête |
|---|---|---|---|
| `lien-valeurs` | `NOMCLI`, `PRECLI` | `#fff6de` | `#fdefc8` |
| `lien-code` | `LIZEPO`, `CODLIV` | `#f2ecfa` | `#e5daf2` |

Contrastes mesurés le 21 août 2026 contre le fond réellement peint : **16,79:1** et **15,64:1** sur les
cellules, **6,83:1** et **5,82:1** sur les en-têtes. Le contrat du site exige AA, soit 4,5:1. Remesure-les
et consigne-les.

**Ces teintes ne concurrencent pas les trois registres du contrat de design** : les registres
distinguent des **époques**, ces teintes distinguent des **rôles dans un tableau**. Deux axes
différents. Cette hésitation a été levée le 21 août, ne la rouvre pas.

### La légende, une seule fois

Posée **juste avant les premières cellules teintées**, jamais répétée. *(Le chef de projet a relevé le
21 août que la répétition se lit comme du bruit dès que tout est déplié.)* **Elle entre dans la page
élément par élément, jamais par `innerHTML`.**

**Français**

- **`legende.titre`** : Deux sortes de liens, et le fichier n'en déclare aucun.
- **`legende.valeurs`** : C'est ainsi qu'on reconnaît le même client d'un fichier à l'autre : par son nom et son prénom. Il n'existe aucun numéro de client, et deux DURAND ne se séparent que par le prénom.
- **`legende.code`** : Un code qui renvoie à un autre fichier. Les deux portent la même donnée sous deux noms. C'est ce qu'on appellerait aujourd'hui une clé étrangère, à ceci près que rien ici ne la déclare : seuls les programmes le savent.
- **`legende.modifier`** : Modifier une cellule teintée casse un lien. Modifier une autre ne change rien au lien.

**Anglais**

- **`legende.titre`** : Two kinds of link, and the file declares neither.
- **`legende.valeurs`** : This is how the same customer is recognised from one file to the next: by last name and first name. There is no customer number, and the two DURAND are told apart by the first name alone.
- **`legende.code`** : A code that points to another file. Both carry the same data under two names. Today you would call it a foreign key, except that nothing here declares it: only the programs know.
- **`legende.modifier`** : Changing a tinted cell breaks a link. Changing any other changes nothing about the links.

## ÉTAPE 6 — Livrable D : le reconnaisseur

**Il ne comprend pas, il reconnaît.** Une séquence a une forme close, `<colonne:opérateur:valeur/>`, et
tout ce qui n'y tombe pas est refusé avec son motif. Les séquences se relient par `&&` ou par `||`,
**jamais les deux dans une même expression**.

**Trois ensembles clos, et c'est toute la thèse.** Les colonnes sont les neuf de l'ÉTAPE 3, et rien
d'autre. Les opérateurs sont **six**, pas un de plus : `==` égal, `[=` commence par, `=]` finit par,
`[]` contient, `><` compris entre, `=>` supérieur ou égal. La valeur est une donnée, jamais du code.

**La leçon du 16 août s'applique mot pour mot** : une classe d'acceptation écrite « largement » en
français devient « n'importe quoi » en expression régulière. Écris-la **close et énumérée**, et commente
ce qu'elle **exclut**, pas seulement ce qu'elle admet.

### Forme du module

`js/minilangage.js` est **agnostique de la langue**. Il reçoit le modèle (les neuf entrées propriété,
colonne, fichier, type) **en paramètre**, et le dictionnaire fournit les noms de propriétés de la langue
courante. Le module reste pur et testable, et la bascule de langue ne le traverse pas.

**Réserve à porter dans `changes.md`** : cette couture est ajoutée pour la testabilité, et la leçon du
17 août rappelle qu'une couture élargit la surface publique, donc les obligations. Dis ce que le module
promet **exactement**, sans adverbe.

### Le catalogue des refus

| Ce que le lecteur tape | Ce que le simulateur répond | Ce que ça démontre |
|---|---|---|
| `<motDePasse:==:toto/>` | colonne hors de la liste exposée | l'appelant ne choisit pas ce qu'il interroge |
| `<nomClient:~~:DUR/>` | opérateur hors liste | la liste des tests est close, pas extensible |
| `<nomClient:[]:A/>` | un « contient » exige au moins deux caractères | une règle métier, pas une règle de syntaxe |
| `<nomClient:!=:ZZ/>` | négation connue et interdite | elle ramènerait presque tout le fichier |
| une expression mêlant `&&` et `\|\|` | une seule sorte de liaison par expression | on refuse au lieu de perdre la fin en silence |
| `<nomClient:==:D' OR '1'='1/>` | **aucun refus, et zéro ligne trouvée** | la valeur ne peut pas devenir une instruction |

**La dernière ligne est la plus forte et doit être montrée en dernier.** Les cinq premières disent que le
langage sait dire non. La sixième dit mieux : il n'a pas besoin de dire non, parce que la valeur n'a
jamais eu le statut de code.

**Réserve de rédaction** : un refus se montre, il ne se commente pas. Ne transforme pas cette page en
leçon de sécurité. *(La démonstration détaillée de l'injection appartient à l'incrément suivant : ici, la
valeur passe et ne trouve rien, sans commentaire.)*

**Le refus s'affiche sous le champ de saisie**, là où le lecteur vient de taper. *(Arbitrage du 21 août.)*

### Un refus montre un exemple, il n'énonce pas une règle

**Mesuré le 21 août 2026 : le concepteur du langage lui-même a écrit l'opérateur à la fin de la
séquence.** Si son auteur s'y trompe, le lecteur s'y trompera dix fois. **La position de l'opérateur est
le point dur de ce langage**, et le message le montre au lieu de le décrire.

### Valeurs des refus

Chaque refus porte deux valeurs, un titre (`.quoi`) et un motif (`.pourquoi`). Les titres qui citent une
valeur tapée par le lecteur la reçoivent en paramètre.

**Français**

- **`refus.forme.quoi`** : Forme non reconnue
- **`refus.forme.pourquoi`** : une séquence s'écrit &lt;colonne:opérateur:valeur/&gt;, dans cet ordre et sans rien autour. Par exemple &lt;nomClient:=]:UR/&gt; : d'abord la colonne, puis le test, puis la valeur. L'opérateur va au milieu, jamais à la fin.
- **`refus.colonne.quoi`** : Colonne « {nom} » hors de la liste exposée
- **`refus.colonne.pourquoi`** : l'appelant ne choisit pas ce qu'il interroge. Seules les propriétés du modèle sont acceptées, et elles sont toutes listées plus bas.
- **`refus.operateur.quoi`** : Opérateur « {op} » hors liste
- **`refus.operateur.pourquoi`** : six opérateurs, pas un de plus. == égal · [= commence par · =] finit par · [] contient · &gt;&lt; compris entre · =&gt; supérieur ou égal. Par exemple &lt;{colonne}:[=:DUR/&gt;.
- **`refus.interdit.quoi`** : Opérateur « {op} » connu et interdit
- **`refus.interdit.pourquoi`** : une négation sur une colonne texte ramènerait la totalité des lignes.
- **`refus.type.quoi`** : « {operateur} » ne s'applique pas à {colonne}
- **`refus.type.pourquoi`** : cette propriété est de type {type} ; l'opérateur attend {types}.
- **`refus.valeurVide.quoi`** : Valeur absente
- **`refus.valeurVide.pourquoi`** : un test sans valeur ne teste rien.
- **`refus.tropCourt.quoi`** : Valeur trop courte pour « {operateur} »
- **`refus.tropCourt.pourquoi`** : au moins deux caractères, sinon la recherche balaie tout le fichier.
- **`refus.bornes.quoi`** : « compris entre » attend deux bornes
- **`refus.bornes.pourquoi`** : on les sépare par un point-virgule : &lt;{colonne}:&gt;&lt;:borne1;borne2/&gt;
- **`refus.liaison.quoi`** : Mélange de ET et de OU
- **`refus.liaison.pourquoi`** : une expression porte une seule sorte de liaison : ET, ou OU, jamais les deux à la fois.

**Anglais**

- **`refus.forme.quoi`** : Shape not recognised
- **`refus.forme.pourquoi`** : a sequence is written &lt;column:operator:value/&gt;, in that order and with nothing around it. For example &lt;customerLastName:=]:UR/&gt;: the column first, then the test, then the value. The operator sits in the middle, never at the end.
- **`refus.colonne.quoi`** : Column "{nom}" is not in the exposed list
- **`refus.colonne.pourquoi`** : the caller does not choose what to query. Only the model's properties are accepted, and every one of them is listed below.
- **`refus.operateur.quoi`** : Operator "{op}" is not in the list
- **`refus.operateur.pourquoi`** : six operators, not one more. == equals · [= starts with · =] ends with · [] contains · &gt;&lt; between · =&gt; greater than or equal. For example &lt;{colonne}:[=:DUR/&gt;.
- **`refus.interdit.quoi`** : Operator "{op}" is known and forbidden
- **`refus.interdit.pourquoi`** : a negation on a text column would bring back every row in the file.
- **`refus.type.quoi`** : "{operateur}" does not apply to {colonne}
- **`refus.type.pourquoi`** : this property is of type {type}; the operator expects {types}.
- **`refus.valeurVide.quoi`** : Value missing
- **`refus.valeurVide.pourquoi`** : a test with no value tests nothing.
- **`refus.tropCourt.quoi`** : Value too short for "{operateur}"
- **`refus.tropCourt.pourquoi`** : two characters at least, otherwise the search sweeps the whole file.
- **`refus.bornes.quoi`** : "between" expects two bounds
- **`refus.bornes.pourquoi`** : separate them with a semicolon: &lt;{colonne}:&gt;&lt;:bound1;bound2/&gt;
- **`refus.liaison.quoi`** : AND and OR mixed
- **`refus.liaison.pourquoi`** : one expression carries one kind of link: AND, or OR, never both at once.

## ÉTAPE 7 — Livrable E : les colonnes, les exemples, la classe

**C'est le cœur de l'incrément et du site.** Le lecteur coche une colonne de plus, la classe se réécrit
avec une propriété de plus ; il en retire deux, elle rétrécit ; il change de question, tous les noms
changent. En dix secondes il a compris que personne n'a écrit cette classe, **parce qu'il vient de la
fabriquer lui-même quatre fois sans qu'une ligne de code bouge**.

- Les neuf propriétés sont **cochables**, quatre cochées au départ : la 1, la 5, la 8 et la 3 du tableau
  de l'ÉTAPE 3 (nom, numéro, montant interprété, code de livraison).
- La classe est rendue en C#, dans le registre exact des extraits de la section 3.
- **Le nom de la classe change avec les colonnes choisies.** Personne ne l'a écrit, et cela doit se voir.
- **La traduction vers le fichier est sur sa propre ligne**, au-dessus de chaque déclaration, jamais en
  bout de ligne *(arbitrage du 21 août : en bout de ligne, le nom de colonne sort du cadre sur
  téléphone)*. Elle nomme la colonne **et son fichier**.
- Aucune colonne cochée : la classe le dit, elle ne disparaît pas.

### Les exemples et leur explication : UNE seule surface d'affichage

**Défaut relevé par le chef de projet le 22 août 2026, à ne pas reproduire.** La maquette portait deux
afficheurs, une bulle flottante pour la souris et une ligne sous la liste pour le doigt ; après un clic
le bouton garde le focus, **et les deux s'affichaient ensemble**.

**Un seul afficheur**, une ligne sous la liste, nourrie par le **survol**, le **focus** et le **clic**.
Le survol montre sans rien engager, le clic retient et remplit le champ, quitter le bouton restaure la
dernière explication retenue. **Elle est toujours présente**, avec un texte d'invitation au repos : une
surface qui apparaît et disparaît ferait sauter la page à chaque survol.

**Les six opérateurs ont chacun un exemple qui passe.** Comptes **mesurés** sur ce décor, à rejouer après
écriture et à couvrir par un test :

| Exemple | Expression (côté français) | Lignes attendues |
|---|---|---|
| commence par | `<nomClient:[=:DUR/>` | **3** |
| finit par | `<nomClient:=]:IER/>` | **3** |
| contient | `<nomClient:[]:AR/>` | **5** |
| deux conditions | `<nomClient:[=:DUR/> && <codeModeLivraison:==:EXP/>` | **2** |
| jointure sur le client | `<nomClient:[=:DUR/> && <villeClient:==:LYON/>` | **2** |
| compris entre | `<montantCommande:><:1000;4000/>` | **5** |
| depuis une date | `<dateCommande:=>:20260701/>` | **5** |

**Côté anglais, les mêmes expressions avec les noms anglais**, et les mêmes comptes : le décor ne change
pas avec la langue.

**Un chiffre écrit dans le produit vaut pour une expression précise.** « Commence par DUR » rend **3**
commandes pour **2** clients, parce qu'une cliente en a passé deux : c'est ce qu'une jointure par les
valeurs produit, et c'est à montrer, pas à corriger.

### Valeurs des exemples et de l'interface

**Français**

- **`zone1.titre`** : Ce que l'appelant demande
- **`zone2.titre`** : La classe que la machine vient de fabriquer
- **`champ.filtre`** : Filtre
- **`colonnes.titre`** : Colonnes voulues
- **`exemples.note`** : Des exemples à cliquer : chacun remplit le champ « Filtre » à votre place. Les gris passent ; les rouges tentent une demande interdite, et c'est leur refus qu'ils servent à montrer.
- **`exemples.repos`** : Survolez un exemple, ou touchez-le, pour lire ce qu'il démontre.
- **`morale`** : Aucune de ces classes n'existe dans le code.
- **`compte.une`** : 1 ligne trouvée sur {total}.
- **`compte.plusieurs`** : {n} lignes trouvées sur {total}.
- **`compte.aucune`** : Aucune ligne trouvée sur {total}. La valeur a été comparée, pas assemblée : elle n'a jamais eu la moindre chance de devenir une instruction.
- **`classe.commentaire`** : Type fabriqué à l'exécution, puis oublié
- **`classe.vide`** : aucune colonne choisie : il n'y a rien à fabriquer

Étiquettes et explications des treize exemples :

- **`ex.commencePar.nom`** : commence par · **`.aide`** : Les noms qui commencent par DUR : 3 commandes sur 18. Il n'y a que deux clients DURAND, mais CLAIRE en a passé deux, et c'est ce qu'une jointure par les valeurs produit tout le temps. Modifiez la valeur : MAR en trouve 3 aussi.
- **`ex.finitPar.nom`** : finit par · **`.aide`** : Les noms qui finissent par IER : FOURNIER, MERCIER, GARNIER, soit 3 commandes. Essayez AND, ou T.
- **`ex.contient.nom`** : contient · **`.aide`** : Les noms qui contiennent AR n'importe où : 5 commandes. Deux caractères au minimum, sinon la demande est refusée.
- **`ex.deuxConditions.nom`** : deux conditions · **`.aide`** : Un ET entre deux tests : DURAND, et livré en express. 2 commandes, toutes deux de CLAIRE. Le mode vient de CMLIV, joint aux commandes sur nom plus prénom. Remplacez EXP par STD : c'est MARC qui apparaît, seul.
- **`ex.jointure.nom`** : ville du client (jointure) · **`.aide`** : villeClient vient du fichier des clients, CLIMST : il se joint aux commandes sur NOMCLI plus PRECLI, sans aucun identifiant. 2 commandes ici, toutes deux de CLAIRE qui habite Lyon. Essayez PARIS : 1 commande, celle de l'autre DURAND.
- **`ex.comprisEntre.nom`** : compris entre · **`.aide`** : Le montant entre 1000 et 4000 : 5 commandes. Les deux bornes se séparent par un point-virgule, et elles se modifient : 125;126 n'en garde qu'une.
- **`ex.depuisDate.nom`** : depuis une date · **`.aide`** : Les commandes à partir du 1er juillet 2026 : 5 sur 18. Reculez la date, 20260301 en ramène 14.
- **`ex.colonneInconnue.nom`** : colonne inconnue · **`.aide`** : Demande une colonne qui n'est pas dans la liste exposée. L'appelant ne choisit pas ce qu'il interroge : refus.
- **`ex.operateurInconnu.nom`** : opérateur inconnu · **`.aide`** : Le signe tapé n'est pas un des six opérateurs admis. La liste des tests est close : refus.
- **`ex.valeurCourte.nom`** : valeur trop courte · **`.aide`** : Un « contient » d'une seule lettre balaierait tout le fichier. Règle métier : au moins deux caractères, sinon refus.
- **`ex.negation.nom`** : négation interdite · **`.aide`** : La négation est connue, et interdite exprès : sur une colonne texte elle ramènerait presque tout le fichier.
- **`ex.etOu.nom`** : ET mêlé à OU · **`.aide`** : Une expression porte une seule sorte de liaison. Mélanger les deux est refusé, au lieu de perdre la fin de la demande en silence.
- **`ex.injection.nom`** : tentative d'injection · **`.aide`** : Le grand classique, et il ne doit PAS marcher. Ici la valeur est comparée comme un simple nom de client, qui n'existe pas : aucune ligne trouvée.

**Anglais**

- **`zone1.titre`** : What the caller asks for
- **`zone2.titre`** : The class the machine has just built
- **`champ.filtre`** : Filter
- **`colonnes.titre`** : Columns wanted
- **`exemples.note`** : Examples to click: each one fills the Filter field for you. The grey ones go through; the red ones attempt a forbidden request, and it is their refusal they are there to show.
- **`exemples.repos`** : Hover over an example, or tap it, to read what it demonstrates.
- **`morale`** : None of these classes exists in the code.
- **`compte.une`** : 1 row found out of {total}.
- **`compte.plusieurs`** : {n} rows found out of {total}.
- **`compte.aucune`** : No row found out of {total}. The value was compared, not assembled: it never had the slightest chance of becoming an instruction.
- **`classe.commentaire`** : Type built at runtime, then forgotten
- **`classe.vide`** : no column chosen: there is nothing to build

Étiquettes et explications des treize exemples :

- **`ex.commencePar.nom`** : starts with · **`.aide`** : Names starting with DUR: 3 orders out of 18. There are only two DURAND customers, but CLAIRE placed two orders, and that is what a join on values produces all the time. Change the value: MAR finds 3 as well.
- **`ex.finitPar.nom`** : ends with · **`.aide`** : Names ending in IER: FOURNIER, MERCIER, GARNIER, so 3 orders. Try AND, or T.
- **`ex.contient.nom`** : contains · **`.aide`** : Names containing AR anywhere: 5 orders. Two characters minimum, otherwise the request is refused.
- **`ex.deuxConditions.nom`** : two conditions · **`.aide`** : An AND between two tests: DURAND, and shipped express. 2 orders, both CLAIRE's. The mode comes from CMLIV, joined to the orders on last name plus first name. Replace EXP with STD: MARC appears, on his own.
- **`ex.jointure.nom`** : customer city (join) · **`.aide`** : customerCity comes from the customer file, CLIMST: it joins to the orders on NOMCLI plus PRECLI, with no identifier at all. 2 orders here, both CLAIRE's, who lives in Lyon. Try PARIS: 1 order, the other DURAND's.
- **`ex.comprisEntre.nom`** : between · **`.aide`** : Amounts between 1000 and 4000: 5 orders. The two bounds are separated by a semicolon, and they can be changed: 125;126 leaves only one.
- **`ex.depuisDate.nom`** : since a date · **`.aide`** : Orders from 1 July 2026 onwards: 5 out of 18. Move the date back and 20260301 brings 14.
- **`ex.colonneInconnue.nom`** : unknown column · **`.aide`** : Asks for a column that is not in the exposed list. The caller does not choose what to query: refused.
- **`ex.operateurInconnu.nom`** : unknown operator · **`.aide`** : The sign typed is not one of the six accepted operators. The list of tests is closed: refused.
- **`ex.valeurCourte.nom`** : value too short · **`.aide`** : A one letter contains would sweep the whole file. Business rule: two characters at least, otherwise refused.
- **`ex.negation.nom`** : forbidden negation · **`.aide`** : The negation is known, and forbidden on purpose: on a text column it would bring back nearly the whole file.
- **`ex.etOu.nom`** : AND mixed with OR · **`.aide`** : One expression carries one kind of link. Mixing the two is refused, rather than losing the end of the request in silence.
- **`ex.injection.nom`** : injection attempt · **`.aide`** : The great classic, and it must NOT work. Here the value is compared as a plain customer name, which does not exist: no row found.

## ÉTAPE 8 — Tests

Suite neuve `tests/minilangage.test.js` sur `js/minilangage.js`, **logique pure, aucun DOM** :

1. Le reconnaisseur : forme close, six opérateurs, **chaque refus du catalogue avec son motif**.
2. **La position de l'opérateur** : `<nomClient::UR=]/>` est refusé, `<nomClient:=]:UR/>` est accepté.
   C'est le piège mesuré du 21 août, il mérite son test nommé.
3. La jointure sur nom plus prénom : cas nominal, cas sans correspondance rendant `null`.
4. Le filtrage : **les sept comptes du tableau de l'ÉTAPE 7, rejoués un par un**.
5. La traduction des montants par `parseImplicitDecimal`.
6. Le nom de classe change quand la liste des colonnes change.
7. **Le module est agnostique de la langue** : le même filtrage avec le modèle anglais rend les mêmes
   comptes, et `<customerLastName:[=:DUR/>` rend ce que `<nomClient:[=:DUR/>` rend.
8. La valeur d'injection **passe le reconnaisseur** et rend **zéro ligne** : c'est un cas de test, pas une
   note en marge.

## ÉTAPE 9 — Preuves

1. `npm test` vert. Consigne le compte avant et après.
2. Périmètre : `git diff main...HEAD --stat -- . ':!prompts'` : **cinq** fichiers exactement.
3. Comptages `index.html` avant et après, **en occurrences et non en lignes** (`grep -o MOTIF | wc -l`).
   Consigne la commande avec chaque nombre.
4. **Parité stricte** : le nombre de clés sous `section4` est **identique des deux côtés**. Consigne-le.
5. Cadratins : `js/i18n.js` = 10, `index.html` = 1, `css/styles.css` = 8, **inchangés**.
6. Aucun des six mots interdits dans les valeurs livrées. Consigne la commande et son résultat.
7. `grep -c innerHTML js/*.js` = **0**. Aucun `<script` ajouté : **2 → 2**.
8. Chevrons échappés : aucun `<` ni `>` en clair dans une valeur du dictionnaire ni dans la légende.
9. **Débordement horizontal, mesuré dans tous les états** : au chargement, au survol de chacun des treize
   exemples, après clic sur chacun, réglages changés, à **320 px** et à **390 px**. Un contrôle qui ne
   mesure qu'au chargement ne garde rien : c'est le défaut du 21 août, resté invisible douze révisions.
10. Contrastes des deux teintes, remesurés **contre le fond réellement peint** et non contre la
    déclaration CSS. Consigne les quatre nombres.
11. Propriétés du décor : trois noms distincts en `DU`, deux clients en `DUR`, deux `DURAND` séparés par
    le seul prénom, deux clients à deux commandes, deux clients sans commande. Consigne chaque compte.
12. Contrôle d'accessibilité **écrit dans `changes.md`**, avec le périmètre de chaque mesure dans la
    phrase. Ce que tu ne peux pas mesurer sans navigateur, dis-le tel quel.

## ÉTAPE 10 — HANDOFF (dernier geste)

`.pipeline/changes.md` + `.pipeline/test-results.md` · un commit, staging précis · **délègue la revue au
subagent `reviewer`** (→ `review.json`) · `.pipeline/STATUS.md` =
`READY — EVOL mini-langage-refus-et-classe — <ISO> — feat/mini-langage-refus-et-classe — tests <X/Y>` ·
**STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Toutes les valeurs françaises et anglaises écrites **exactement** comme ci-dessus. Parité stricte.
   Aucune valeur existante modifiée.
2. Le décor complet, ses quatre fichiers, les trois derniers **repliés par défaut**, ses deux teintes,
   sa légende **une seule fois**, et ses propriétés vérifiées mécaniquement.
3. Les six opérateurs, les neuf refus, le refus affiché **sous le champ**, et le message de forme qui
   **montre un exemple** et nomme la position de l'opérateur.
4. La classe se réécrit à chaque changement de colonnes, son nom change et **se traduit**, la traduction
   vers le fichier est **sur sa propre ligne** avec colonne et fichier.
5. **Une seule surface d'explication** des exemples, toujours présente, nourrie par survol, focus et clic.
6. Les sept comptes rejoués et couverts par un test, dans les deux langues.
7. Aucun JSON, aucun SQL, aucune édition des données.
8. Suite verte, `review.json` en SHIP pour cet incrément et ce commit, READY écrit en dernier.

---
*Gelé le 22 août 2026. Premier des deux sous-incréments de la section « Le mini-langage ».*

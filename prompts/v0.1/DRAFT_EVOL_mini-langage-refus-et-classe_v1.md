# DRAFT — EVOL — Le mini-langage (1 sur 2) : le texte, le décor, les refus, la classe

**Fichier** : `prompts/v0.1/DRAFT_EVOL_mini-langage-refus-et-classe_v1.md`
**Type** : EVOL (contenu + comportement + tests) · **Branche** : `feat/mini-langage-refus-et-classe` · **Révision** : v1 · **Date** : 21 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> ## ⚠️ BROUILLON — NON TRANSMISSIBLE EN L'ÉTAT
> Le préfixe `DRAFT_` vaut consigne : **ce prompt n'est pas gelé et ne doit pas être exécuté.** Deux
> points restent ouverts, listés en fin de document. Le retrait du préfixe, et lui seul, le gèle.
>
> **Il remplace `DRAFT_EVOL_mini-langage_v1.md`**, qui portait la section entière en un seul incrément.
> Ce fichier-là est **caduc et à supprimer** : deux prompts portant la même matière ne se comparent pas.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | S-1 : aucun cadratin de prose dans les valeurs livrées, **y compris en cellule de tableau**. S-2 : aucun adjectif sur soi, la page dit ce qu'elle fait et jamais qu'elle est sûre. S-3 : rien qui range le S/36 au passé. S-4 : chaque langue s'adresse à son lecteur. **Ne réécris aucune valeur existante.** |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre par `textContent`, **jamais `innerHTML`**. Aucune dépendance ajoutée. Aucun appel réseau. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `UX_METHOD` | — | Appliqué, à mesurer | Mobile-first strict. Aucun débordement horizontal de la page à **320 px** ni à **390 px** ; tableaux et blocs de code défilent dans leur conteneur, jamais la page. Les trois fichiers de jointure sont **repliés par défaut** (arbitrage du 21 août, motif mesuré : 600 px gagnés avant le cœur de la page). Motif de dépliement **déjà établi** par l'incrément 5 : `details`/`summary` natifs, aucun script. |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Le reconnaisseur, la jointure et le filtrage sont de la **logique pure** : module testable, suite Vitest dédiée. Les deux portes existantes (parité FR/EN, résolution HTML vers dictionnaire) couvrent mécaniquement les clés ajoutées. |
| `PEDAGOGY_METHOD` | — | **Appliqué** | Erreur du 21 août à ne pas rejouer : la prose du produit s'adresse à un humain et à plusieurs niveaux à la fois. Tout terme technique est **étiqueté à sa première apparition** (`CLAUDE.md`). Chaque règle du langage arrive **avec un exemple cliquable**. |
| `VISION_METHOD` | — | Écarté, hésitation nommée | Ses gates arrivent au jalon 2. L'hésitation : le rendu de dix-huit lignes à 320 px est exactement ce qu'elles mesureraient. Non installées ici ; la validation visuelle et tactile reste au chef de projet, et l'écart est dit. N'installe rien. |
| `SQL_METHOD` | — | Écarté, motif | Aucune requête n'est émise vers aucune base. Aucun texte SQL n'est produit dans cet incrément. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** :
`docs(prompt): prompts/v0.1/EVOL_mini-langage-refus-et-classe_v1.md`
*(à corriger au gel, quand le préfixe `DRAFT_` sautera).*

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact : `CLAUDE.md` (sections « Le cas fictif », « Style du produit »,
« Anonymisation ») et `tasks/ROADMAP.md` (ligne 6 du fil). Les notes de contenu
(`../Etude_Technique/NOTES_CONTENU_mini-langage_v5.md`) sont **hors dépôt** : tout ce qui en est
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
6. Cadratins, mêmes bases qu'aux incréments précédents : `js/i18n.js` = **10**, `index.html` = **1**,
   `css/styles.css` = **8**. Ces trois nombres doivent être **inchangés** à la fin.
7. `js/s36.js` exporte `extractField` et `parseImplicitDecimal`. **Tu réemploies `parseImplicitDecimal`
   pour les montants ; tu n'en écris pas un second.** Une seconde implémentation de la même règle →
   ARRÊTE-TOI et signale.

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

**Langue des clés** : en français, comme les groupes existants (arbitrage en attente,
`tasks/ROADMAP.md`). Les identifiants HTML suivent les existants. Ne renomme rien.

**Les chevrons du langage s'écrivent en entités**, jamais en clair : `&lt;` et `&gt;`. Un chevron en
clair dans `index.html` ou dans une valeur du dictionnaire → ARRÊTE-TOI et signale.

---

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/mini-langage-refus-et-classe` · `.pipeline/spec.md`, dont la **première ligne** est
exactement `Incrément : EVOL mini-langage-refus-et-classe` · commit du prompt (message exact ci-dessus).

## ÉTAPE 2 — Livrable A : le texte de la section

Groupe `section4`, valeurs françaises **au caractère près** :

- **`ouverture.titre`** : Une idée, pas une pièce du système
- **`ouverture.p1`** : Ce chapitre n'est pas comme les autres. Tout ce que le site raconte jusqu'ici existe et tourne. Ce qui suit est une idée que j'ai eu envie d'essayer, ici, sur ce site, et nulle part ailleurs.
- **`ouverture.p2`** : Elle part d'une question simple : qu'est-ce qu'un appelant a le droit de demander ? Lui laisser écrire lui-même son filtre, c'est lui donner les clés du bâtiment. Il pourrait lire une colonne que je ne lui montre pas, ouvrir un fichier dont je ne lui ai jamais parlé. Alors j'ai imaginé l'inverse : il ne rédige rien, il choisit. Une colonne dans la liste que j'expose, un test dans une liste de six, et une valeur. Trois listes, et rien en dehors.
- **`ouverture.p3`** : Est-ce que ça tient debout ? C'est exactement ce que la suite permet d'essayer.
- **`pourquoi.a1`** : Un where ouvert, c'est donner les clés de la maison : l'appelant peut demander n'importe quelle colonne, n'importe quel fichier, n'importe quelle sous-requête.
- **`pourquoi.a2`** : Un where ouvert parle le langage du fichier, avec ses noms d'au plus six caractères. Ce langage-ci parle celui du métier.
- **`pourquoi.a3`** : Un where ouvert ne se borne pas. On ne peut ni interdire une négation qui ramènerait tout, ni exiger deux caractères sur un « contient ». Avec trois listes closes, on le peut.

**Le troisième paragraphe d'ouverture passe la main au lecteur, et cet incrément tient cette promesse** :
tout ce qu'il annonce est livré ici. Ne l'affaiblis pas, ne le reporte pas.

## ÉTAPE 3 — Livrable B : le décor, quatre fichiers

Le décor est **du contenu, pas de la donnée d'exécution** : il vit dans `js/minilangage.js`, en littéral,
et il est **montré en entier**. Rien n'est caché, rien n'est tronqué. *(Ne recopie aucun nombre de lignes
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

**`MODLIV`, le référentiel : six lignes, repliées.** EXP Express 24 h · STD Standard 72 h · RET Retrait
entrepôt · MES Messagerie · REL Point relais · PAL Palette affrétée.

**Propriétés du décor, non négociables, à vérifier mécaniquement après écriture.** Trois noms distincts
commencent par `DU`. Deux clients seulement commencent par `DUR`. Les deux `DURAND` ne se séparent que
par le prénom : **c'est l'argument de la jointure et il ne se dilue pas.** Deux clients portent deux
commandes, deux clients n'en portent aucune. Ne « corrige » ni l'un ni l'autre.

**Le décor porte sa règle de colonnes**, en-têtes visibles, registre bleu du plan technique : un fichier
plat sans en-tête reproduirait le défaut que la section 2 passe deux écrans à expliquer.

## ÉTAPE 4 — Livrable C : la jointure par les valeurs

Trois des neuf propriétés exposées viennent d'un autre fichier que les commandes, par jointure **sur nom
plus prénom**, sans le moindre identifiant : `villeClient` de `CLIMST`, `codeModeLivraison` de `CMLIV`,
et `libelleModeLivraison` de `MODLIV` par `LIZEPO` = `CODLIV`.

Une jointure qui ne trouve rien rend **`null`**, et `null` ne satisfait aucun test. Écris-le ainsi dès
maintenant : c'est ce comportement que l'incrément suivant rendra visible au lecteur.

Le modèle exposé compte **neuf propriétés**, et l'appelant n'écrit jamais un nom de colonne du fichier :

| Propriété exposée | Colonne | Fichier | Type |
|---|---|---|---|
| `nomClient` | NOMCLI | CDEMST | texte |
| `prenomClient` | PRECLI | CDEMST | texte |
| `numeroCommande` | NUMCDE | CDEMST | entier |
| `dateCommande` | DATCDE | CDEMST | date |
| `montantBrut` | MTTCDE | CDEMST | texte |
| `montantCommande` | MTTCDE | CDEMST | décimal |
| `villeClient` | VILCLI | CLIMST | texte |
| `codeModeLivraison` | LIZEPO | CMLIV | texte |
| `libelleModeLivraison` | LIBLIV | MODLIV | texte |

`montantBrut` et `montantCommande` désignent **la même colonne** sous deux formes, la brute et
l'interprétée : c'est la règle d'or n° 4 du cadrage, montrée au lieu d'être expliquée.

**Les montants passent par `parseImplicitDecimal` de `js/s36.js`.** Le fichier stocke `000012550` pour
125,50.

## ÉTAPE 5 — Livrable D : le reconnaisseur et ses refus

**Il ne comprend pas, il reconnaît.** Une séquence a une forme close, `<colonne:opérateur:valeur/>`, et
tout ce qui n'y tombe pas est refusé avec son motif. Les séquences se relient par `&&` ou par `||`,
**jamais les deux dans une même expression**.

**Trois ensembles clos, et c'est toute la thèse.** Les colonnes sont les neuf du tableau ci-dessus, et
rien d'autre. Les opérateurs sont **six**, pas un de plus : `==` égal, `[=` commence par, `=]` finit
par, `[]` contient, `><` compris entre, `=>` supérieur ou égal. La valeur est une donnée, jamais du code.

**La leçon du 16 août s'applique mot pour mot** : une classe d'acceptation écrite « largement » en
français devient « n'importe quoi » en expression régulière. Écris-la **close et énumérée**, et commente
ce qu'elle **exclut**, pas seulement ce qu'elle admet.

**Le catalogue des refus**, un par ensemble clos :

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

**Réserve de rédaction** : un refus se montre, il ne se commente pas. Une ligne de réponse par cas, et
rien de plus. Ne transforme pas cette page en leçon de sécurité. *(La démonstration détaillée de
l'injection appartient à l'incrément suivant : ici, la valeur passe et ne trouve rien, sans commentaire.)*

**Le refus s'affiche sous le champ de saisie**, là où le lecteur vient de taper. *(Arbitrage du 21 août
2026.)*

## ÉTAPE 6 — Livrable E : les colonnes et la classe fabriquée

**C'est le cœur de l'incrément et du site.** Le lecteur coche une colonne de plus, la classe se réécrit
avec une propriété de plus ; il en retire deux, elle rétrécit ; il change de question, tous les noms
changent. En dix secondes il a compris que personne n'a écrit cette classe, **parce qu'il vient de la
fabriquer lui-même quatre fois sans qu'une ligne de code bouge**.

- Les neuf propriétés sont **cochables**, quatre cochées au départ : `nomClient`, `numeroCommande`,
  `montantCommande`, `codeModeLivraison`.
- La classe est rendue en C#, dans le registre exact des extraits de la section 3.
- **Le nom de la classe change avec les colonnes choisies.** Personne ne l'a écrit, et cela doit se voir.
- **La traduction vers le fichier est sur sa propre ligne**, au-dessus de chaque déclaration, jamais en
  bout de ligne *(arbitrage du 21 août 2026 : en bout de ligne, le nom de colonne sort du cadre sur
  téléphone)*. Elle nomme la colonne **et son fichier** : c'est le seul endroit du simulateur où le
  lecteur voit le lien entre le nom métier et le nom d'au plus six caractères.
- Aucune colonne cochée : la classe le dit, elle ne disparaît pas.

**Sous la zone de la classe, une seule phrase, dite une fois** : « aucune de ces classes n'existe dans le
code ». La morale ne s'écrit pas, elle se montre.

**Les six opérateurs ont chacun un exemple cliquable qui passe**, et c'est une correction : avec un décor
plus étroit, deux d'entre eux n'en avaient aucun. Comptes **mesurés** sur ce décor, à rejouer après
écriture et à couvrir par un test :

| Exemple | Expression | Lignes attendues |
|---|---|---|
| commence par | `<nomClient:[=:DUR/>` | **3** |
| finit par | `<nomClient:=]:IER/>` | **3** |
| contient | `<nomClient:[]:AR/>` | **5** |
| deux conditions | `<nomClient:[=:DUR/> && <codeModeLivraison:==:EXP/>` | **2** |
| jointure sur le client | `<nomClient:[=:DUR/> && <villeClient:==:LYON/>` | **2** |
| compris entre | `<montantCommande:><:1000;4000/>` | **5** |
| depuis une date | `<dateCommande:=>:20260701/>` | **5** |

**Un chiffre écrit dans le produit vaut pour une expression précise.** « Commence par DUR » rend **3**
commandes pour **2** clients, parce qu'une cliente en a passé deux : c'est ce qu'une jointure par les
valeurs produit, et c'est à montrer, pas à corriger.

**Chaque exemple porte son explication.** Une infobulle au survol ne suffit pas : sur écran tactile elle
s'ouvre bien, mais elle **recouvre la rangée du dessus**. Sur ces appareils, elle cède la place à une
ligne d'explication sous la liste. *(Mesuré sur iPhone 14 le 21 août 2026.)*

Le nombre de lignes trouvées est affiché en une phrase sous la classe. **Pas de bloc JSON** : il
appartient à l'incrément suivant.

## ÉTAPE 7 — Tests

Suite neuve `tests/minilangage.test.js` sur `js/minilangage.js`, **logique pure, aucun DOM** : le
reconnaisseur (forme close, six opérateurs, **chaque refus du catalogue avec son motif**), la jointure
par nom plus prénom (cas nominal, cas sans correspondance rendant `null`), le filtrage (**les sept
comptes du tableau ci-dessus, rejoués un par un**), la traduction des montants, et le nom de classe qui
change quand la liste des colonnes change. La valeur d'injection **passe le reconnaisseur** et rend
**zéro ligne** : c'est un cas de test, pas une note en marge.

## ÉTAPE 8 — Preuves

À compléter au gel, sur le modèle de l'incrément 5 : comptages avant et après **en occurrences et non en
lignes** (`grep -o MOTIF fichier | wc -l`), unicité des identifiants, cadratins inchangés aux trois
fichiers (10, 1, 8), aucun `innerHTML`, aucun `<script>` ajouté, chevrons échappés, aucun des six mots
interdits dans les valeurs livrées, parité stricte des clés FR et EN, et le contrôle d'accessibilité
écrit dans `changes.md` **avec le périmètre de chaque mesure dans la phrase**.

## ÉTAPE 9 — HANDOFF (dernier geste)

`.pipeline/changes.md` + `.pipeline/test-results.md` · un commit, staging précis · **délègue la revue au
subagent `reviewer`** (→ `review.json`) · `.pipeline/STATUS.md` =
`READY — EVOL mini-langage-refus-et-classe — <ISO> — feat/mini-langage-refus-et-classe — tests <X/Y>` ·
**STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les valeurs françaises et anglaises écrites **exactement**, aucune valeur existante modifiée.
2. Le décor complet, ses quatre fichiers, les trois derniers **repliés par défaut**, et ses propriétés
   vérifiées mécaniquement.
3. Les six opérateurs, les six refus du catalogue, le refus affiché **sous le champ**.
4. La classe se réécrit à chaque changement de colonnes, son nom change, la traduction est **sur sa
   propre ligne** avec colonne et fichier.
5. Les sept comptes du tableau, rejoués et couverts par un test.
6. Aucun JSON, aucun SQL, aucune édition des données.
7. Suite verte, `review.json` en SHIP pour cet incrément et ce commit, READY écrit en dernier.

---

## Ce que ce brouillon attend

1. **Les valeurs anglaises** ne sont pas écrites. Elles le seront au gel. Règle S-4 : ce n'est pas une
   traduction mot à mot, c'est une adresse à un autre lecteur.
2. **Le marquage des colonnes de jointure.** Aujourd'hui rien ne distingue `NOMCLI` et `PRECLI` des trois
   autres colonnes du décor, alors qu'elles seules portent le lien vers les autres fichiers. La question
   ne mord vraiment qu'à l'incrément suivant, quand le lecteur pourra les modifier ; mais si elle est
   retenue, **le marquage est du ressort de cet incrément-ci**, qui écrit le tableau.

---
*Brouillon déposé le 21 août 2026. Premier des deux sous-incréments de la section « Le mini-langage ».*

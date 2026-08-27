# EVOL — Section « Annexe : un fichier S/36 de près » : les quatre blocs, les trois tableaux, les deux feuilles de codage, FR et EN

**Fichier** : `prompts/v0.1/EVOL_annexe-s36_v1.md`
**Type** : EVOL (contenu + mise en forme + accessibilité) · **Branche** : `feat/annexe-s36` · **Révision** : v1 · **Date** : 27 août 2026 (**gelé** le 27 août 2026, session 22, après relecture de la maquette v2 et des paragraphes `voix` par le chef de projet)
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> **Corrigé le 27 août 2026, avant le premier enregistrement**, sur arrêt de Claude Code à l'ÉTAPE 0 (aucune branche
> créée, le gel n'était ancré nulle part) : deux prérequis étaient faux. `attente` vaut **4** dans `js/i18n.js`, pas 2 —
> `section4.champ.attente` existe depuis l'avenant 3 de l'incrément 9, et l'exigence « 0 après » de l'ÉTAPE 8 aurait
> poussé à supprimer deux clés du mini-langage ; et `feuille` vaut **4** dans `css/styles.css` (quatre commentaires en
> prose), pas 0. L'un n'avait pas été mesuré, l'autre avait été mesuré puis transcrit faux — les deux par Cowork.
>
> **Sources hors dépôt** : `NOTES_CONTENU_le-probleme_v6.md` et `MAQUETTE_annexe-feuilles_v2.html` (Etude_Technique). Les sept questions de forme des feuilles ont été vérifiées contre SC09-1818 le 27 août 2026 et tranchées au § « Réponses aux questions de la maquette ». Tout ce qui est nécessaire est reproduit ici.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `UX_METHOD` | — | Appliqué, **mesuré sur maquette** | Mobile-first. Cinq tableaux réels dans des conteneurs `defile` (`overflow-x: auto`, `tabindex="0"`, rôle et nom) : le motif `.fichier` de la section 4, déjà en place. Mesuré le 27 août 2026 sur la maquette des feuilles, rendu à 390 px, polices système : les deux feuilles défilent **dans leur conteneur**, la page ne déborde pas. Les trois tableaux de contenu (quatre colonnes au plus) tiennent sans défilement à 390 px avec les polices Plex ; **à vérifier à 320 px** par Claude Code (ÉTAPE 8, point 10). |
| `STYLE_METHOD` | 1.1 | Appliqué | Valeurs relues : S-1 (aucun cadratin, y compris en cellule), S-2 (aucun adjectif sur soi), S-3 (rien qui range le S/36 au passé : « fait d'époque, jamais défaut », arbitrage 4 des notes), S-4 (le côté français nomme le **GAP**, le côté anglais dit **RPG II** et ne traduit pas le sigle français : chaque langue s'adresse à son lecteur). Les **noms de colonnes, de zones, de fichiers et d'opérations sont du code** : en texte nu dans les valeurs, en `<code>` dans le HTML (arbitrage 3 des notes ; précédent `STRS36`). **Ne réécris ni la prose existante ni les valeurs existantes.** |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre par `textContent` ; **jamais `innerHTML`**. Aucune dépendance, aucun script. Aucune valeur ne contient `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `ASSURANCE_METHOD` | 1.2 | Écarté, hésitation nommée | Aucune porte créée. Les deux portes existantes couvrent mécaniquement les clés ajoutées (parité FR/EN ; résolution HTML → dictionnaire, qui **rougit** si `annexe.attente` reste référencée après son retrait). L'hésitation : une porte de cohérence entre les positions de la feuille I et celles du tableau 1 aurait un sens ; elle mesurerait deux copies d'une même donnée dans le HTML, ce qui est précisément le défaut qu'une porte ne devrait pas consacrer. **Le porteur unique est la prose** : les positions ne vivent qu'à deux endroits, tableau 1 et feuille I, et l'ÉTAPE 8 les compare au grep. N'installe rien. |
| `VISION_METHOD` | — | Écarté, hésitation nommée | Le rendu des feuilles est exactement ce que ce satellite mesurerait ; ses gates arrivent au jalon 2. La validation visuelle sur iPhone 14 reste au chef de projet. |
| `PEDAGOGY_METHOD` | — | Appliqué | Un dessin par idée : la feuille I montre **où vit** la description, la feuille C montre **comment le programme s'en sert**. Chaque figure porte ses phrases de conclusion ; le lecteur n'a pas à deviner ce que le dessin fait voir. Le cycle RPG est **hors sujet** (décision du chef de projet, 19 août 2026). |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_annexe-s36_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact : `CLAUDE.md` (« Style du produit », « Le cas fictif », « Anonymisation ») et `tasks/ROADMAP.md` (ligne 10 du fil). Les notes de contenu (`../Etude_Technique/NOTES_CONTENU_le-probleme_v6.md`) et la maquette des feuilles sont **hors dépôt** : tout ce qui en est nécessaire est reproduit ici, tu n'as pas à les ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 27 août 2026 sur `main` à `46c81d4`, par lecture de fichiers.

1. `git checkout main`. Version **0.1.19** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 21`.
3. `npm test` vert sur `main` (**356/356**).
4. L'annexe est un texte d'attente : `grep -o 'data-i18n="annexe' index.html | wc -l` = **4** ; `grep -c 'attente' js/i18n.js` = **4** — deux `annexe.attente` (celles que cet incrément retire) et deux `section4.champ.attente`, clés du mini-langage nées de l'avenant 3 de l'incrément 9, **hors périmètre, à ne pas toucher** ; `grep -c 'annexe' js/i18n.js` = **5**.
5. La section 2 n'a que son intro et son renvoi : `grep -o 'data-i18n="section2' index.html | wc -l` = **4**.
6. Le motif de tableau existe déjà, une fois : `grep -o '<figure class="fichier' index.html | wc -l` = **1** (motif **sans** le guillemet fermant : les feuilles portent `class="fichier feuille"`) (le décor `CDEMST` de la section 4). C'est **lui** que cet incrément réemploie ; aucune famille CSS neuve de tableau.
7. Bases de comptage `index.html`, **occurrences** (`grep -o MOTIF index.html | wc -l`) : `<table` **5** · `<figure` **10** · `<tr` **14** · `<th scope` **16** · `<td` **27** · `<code` **19** · `<h3` **14** · `<pre` **7** · `<details` **4** · `<script` **2** · `tabindex="0"` **12** · `role="region"` **12** · `aria-labelledby` **19** · `aria-label=` **6** · `id="` **56** · `data-i18n="` **151**.
8. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0**. `grep -o 'GAP' js/i18n.js | wc -l` = **0**. `grep -o 'RPG' js/i18n.js | wc -l` = **2** (section 1, une par langue : ne les touche pas).
9. Cadratins : `grep -c "—"` sur `js/i18n.js` = **10**, `index.html` = **2**, `css/styles.css` = **7**.
10. Requêtes de média : `grep -c '^@media' css/styles.css` = **7** ; `grep -c '^@media (min-width' css/styles.css` = **2**. Aucune requête ajoutée par cet incrément.
11. Aucune trace des motifs neufs, mesurée sur des motifs qui ne mordent pas la prose (le mot « feuille » vit déjà dans quatre commentaires de `css/styles.css`) : `grep -c 'feuille"' index.html` = **0** ; `grep -c 'feuilleI\|feuilleC' js/i18n.js` = **0** ; `grep -c '\.regle\|\.pivot\|td\.type' css/styles.css` = **0**.
12. Aucune occurrence de `TOTHTG` ni `NBRART` nulle part dans le dépôt : `grep -rl 'TOTHTG\|NBRART' index.html js css tests` = **vide**. Cet incrément est le **premier** à les écrire ; voir « Hors périmètre », point sur `CDEMST`.

## Contexte et périmètre

Dixième incrément du fil. La section « Annexe : un fichier S/36 de près » est en ligne depuis la 0.1.13 avec un titre, une phrase d'ouverture (« détour technique »), un texte d'attente et un lien de retour. Cet incrément **retire le texte d'attente** et le remplace par la matière décidée le 19 août 2026 (notes v5) et complétée le 20 août (notes v6, dictée du chef de projet) : les **quatre blocs** de prose (le ruban, les six lettres, ce que le fichier ne dit pas, muet mais pas mort), les **trois tableaux** (structure de `CDEMST`, brut contre interprété, la même donnée sous deux noms), les **deux feuilles de codage** RPG redessinées (la feuille I remplie avec `CDEMST`, la feuille C à trois lignes), la **voix du chef de projet au « je »** (le témoignage du bloc 3, et la mécanique des indicateurs sous la feuille C), et le **GAP nommé côté français**.

**Ce que l'annexe fait dire au lecteur** (notes v6) : *la donnée est bonne, c'est sa description qui manque ; le fichier donne des positions et des noms d'au plus six caractères, jamais ce qu'ils veulent dire ; la description existe, mais elle est sur une feuille, dans un programme.* L'annexe prépare « La solution » sans la dévoiler ; elle est faite pour les curieux, le lecteur y va par choix (renvoi de la section 2, menu) et en revient par le lien du bas.

**Deux décisions de forme, arbitrées au gel du 27 août 2026.**

1. **Les feuilles sont des `<table>` réels, pas des SVG.** Le fil dit « SVG registre plan technique ». Le précédent arbitré le 19 août 2026 pour les dessins de la section 3 (`EVOL_dessins-section-3_v2`) a préféré HTML et CSS aux SVG : bilingue par le dictionnaire, empilable, texte lisible et sélectionnable. Une feuille de codage est une **grille à colonnes numérotées** : un tableau la rend fidèlement, reste accessible, et les en-têtes passent par les clés. Le fil est corrigé dans le même commit (livrable E). Le registre « plan technique » (Plex Mono sur clair, accent bleu S/36, filets du socle) est celui de `.fichier`, déjà en place. **Cet incrément établit le motif du dessin de feuille** : règle de colonnes en bleu sous les en-têtes, cases pivot teintées, type de formulaire en tête de ligne.
2. **Les feuilles vivent là où la prose les appelle**, pas en tête d'annexe. La séquence décidée le 19 août disait « feuille I, feuille C, puis les tableaux et le témoignage ». Le prompt place la feuille I **sous `ruban.p2`**, la phrase qui dit « déclaré à chaque fois dans leurs spécifications d'entrée » — le lecteur lit la phrase et voit la feuille ; et la feuille C **sous `silence.p1`**, la phrase du `000012550` qui vaut 125,50 — le lecteur voit la colonne 52 juste après avoir lu ce qu'elle cache. Arbitré : cet ordre-ci.

**Périmètre** : `js/i18n.js` (les valeurs listées au livrable A, C et B ; **une** clé retirée par langue : `annexe.attente`), `index.html` (le corps de l'annexe), `css/styles.css` (une extension de la famille `.fichier`, fournie au livrable D, et **un** sélecteur ajouté à une règle existante), `tasks/ROADMAP.md` (livrable E : ligne 10, une dette nommée). **Rien d'autre.**

**Hors périmètre, explicitement — et c'est la moitié du prompt.**

- **La section 2 ne bouge pas.** Ni `section2.intro`, ni `section2.renvoi`, ni `section2.renvoiLien`. Le renvoi pointe déjà sur `#annexe`.
- **L'écart `CDEMST` de la section 4 : tu ne le corriges pas, tu ne l'harmonises pas, tu ne le signales pas comme une faute.** Mesuré le 27 août 2026 : la section 4 décrit `CDEMST` avec `NOMCLI`, `PRECLI`, `NUMCDE`, `DATCDE`, `MTTCDE` (`js/minilangage.js` `PHYSICAL_MODEL`, 44 occurrences de `MTTCDE`) et `MODLIV` avec `LIBLIV` ; l'étude v2, la section 3 (`LIBZLV`, deux occurrences) et **cette annexe** décrivent `CDEMST` avec `NUMCDE`, `NBRART`, `TOTHTG`, `NOMCLI`, `PRECLI` et `MODLIV` avec `LIBZLV`. Cet écart est **antérieur** à l'incrément, il est né avec les maquettes du mini-langage, et **il n'est pas tranché**. L'annexe suit l'étude, comme décidé le 19 août 2026. L'écart est **inscrit au fil comme dette nommée** par le livrable E, pour la ligne 11 ou 12. Si tu touches à `js/minilangage.js`, à la section 4 ou aux deux `LIBZLV` de la section 3, tu sors du périmètre : ARRÊTE-TOI et signale.
- **Aucun SVG, aucune image, aucun script, aucune dépendance, aucun test ajouté ni retiré** (la porte HTML → dictionnaire absorbe seule le retrait de `annexe.attente`).
- **Aucune mention** du cycle RPG, du VTOC, de DDS, de description « externe », du programme de contrôle, des bibliothèques ou de la liste de bibliothèques (arbitrages 1, 6 et 7 des notes). Aucune colonne du formulaire au-delà de celles dessinées : la feuille montre **ce qui sert au chapitre**, pas le carton entier.
- **Aucun nom réel** : pas d'éditeur, pas de produit, pas de machine, pas de bibliothèque, pas de colonne du POC. Les seuls noms sont ceux du grossiste fictif (`CDEMST`, `CLIMST`, `CMLIV`, `MODLIV`, leurs colonnes) et ceux de la feuille C, fictifs eux aussi (`ZPRX`, `QTE`, `TFACT`, `CLECLI`, `CRECLI`).
- **Le mini-langage** : rien. Les quatre sujets en attente au fil n'entrent pas ici.
- **Les quatre dettes de l'atterrissage de l'incrément 9** (`completeWith`, commentaire d'idempotence, porte de totalité, test retranscrit) : n'y touche pas, elles ont leur ligne.
- **La section 5** reste un texte d'attente.
- **Aucune valeur existante modifiée**, nulle part, y compris `annexe.title`, `annexe.intro`, `annexe.retour`, `nav.annexe`.

**Les clés ajoutées sont en français** (`ruban`, `lettres`, `silence`, `vivant`, `tab1`, `feuilleI`, `voix`…), comme les groupes existants ; les identifiants HTML aussi. Ne les renomme pas.

**Sémantique, leçon [W28]** : chaque tableau reste un vrai tableau (`table`, `thead`, `th scope="col"`, `tbody`). Aucune règle CSS ne retire un rôle natif. La règle de colonnes (numéros du formulaire) est une **seconde ligne du `thead`** en `td`, pas un `th` : elle n'est pas un en-tête, c'est une cote.

**Porteur unique, leçon du 27 août 2026** : les positions de `CDEMST` (1-7, 8-11, 12-20, 21-50, 51-70) vivent à **deux** endroits dans `index.html`, le tableau 1 et la feuille I, et à **un** dans `js/i18n.js` (`ruban.p1`, en prose : « de la première à la septième… »). L'ÉTAPE 8 les compare. Si tu en trouves un quatrième domicile, ARRÊTE-TOI et signale.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/annexe-s36` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL annexe-s36` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable A : les clés de prose du dictionnaire

Dans `js/i18n.js`, sous le groupe `annexe` de **chaque** langue : **retire** `attente` ; **ajoute** les clés ci-dessous, dans cet ordre, **après** `intro` et **avant** `retour`. Écris chaque valeur **exactement** comme ici (texte nu, aucune balise, aucun cadratin). Les trois clés existantes (`title`, `intro`, `retour`) ne changent pas.

### Côté français

```
ouverture: "Un grossiste fictif et ses cinq fichiers suffisent à le montrer.",
ruban: {
  title: "Un fichier plat, c'est un ruban",
  p1: "Un enregistrement est une suite de caractères de longueur fixe, et chaque donnée y occupe des positions : de la première à la septième, le numéro de commande ; de la huitième à la onzième, le nombre d'articles ; et ainsi de suite jusqu'au bout de la ligne. Rien ne sépare les champs, aucun nom ne les précède. Le fichier des commandes du grossiste, CDEMST, fait soixante-dix caractères par enregistrement. Lu tel quel, il ressemble à ceci : 00012340012000012550DURAND… Une ligne collée, que seul un programme sait découper.",
  p2: "Le découpage existe bien, mais il n'est pas dans le fichier. Il vit dans les programmes qui le lisent, déclaré à chaque fois dans leurs spécifications d'entrée. IBM le dit en toutes lettres : pour ces fichiers, l'information sur les champs doit être fournie par les programmes qui les traitent. Le ruban est parfaitement ordonné, et il ne sait rien de son ordre.",
},
lettres: {
  title: "Six lettres pour tout dire",
  p1: "Les langages de l'époque laissaient peu de place à un nom de zone : six caractères au plus en RPG II, que l'on appelait GAP en France. On abrège donc, et IBM recommande comment : MASTER devient MST ou MSTR. NOMCLI, c'est le nom du client ; NUMCDE, le numéro de commande ; TOTHTG, le total hors taxes. On s'y fait vite, et ces noms sont précis pour qui les pratique.",
  p2: "Puis il y a LIZEPO. Six lettres, et rien qui laisse deviner qu'il s'agit du mode de livraison choisi par un client. Ce n'est pas un défaut de l'époque : c'est ce qu'un nom si court finit par devenir quand l'application grandit et que les mots courts sont pris. Le nom est exact. Il n'est pas parlant, et le fichier n'a aucun endroit où écrire ce qu'il veut dire.",
},
silence: {
  title: "Ce que le fichier ne dit pas",
  p1: "Les décimales, d'abord. Le total hors taxes d'une commande est stocké 000012550, et il vaut 125,50. Aucun séparateur : le System/36 est une machine à décimal zoné, un chiffre par octet, et le nombre de décimales est déclaré dans le programme, pas dans le fichier. Lisez le ruban sans le programme, vous lirez douze mille cinq cent cinquante.",
  p2: "La même donnée sous deux noms, ensuite. Le code du mode de livraison s'appelle LIZEPO dans le fichier des clients livrés, CMLIV, et CODLIV dans le référentiel des modes, MODLIV. Les deux fichiers se joignent sur cette valeur, et rien, dans aucun des deux, ne dit qu'il s'agit de la même chose. Seuls les programmes le savent.",
  p3: "Aucune clé, enfin. Ces fichiers ne portent pas d'identifiant technique : une commande retrouve son client par le nom et le prénom, écrits dans les deux fichiers. Deux clients homonymes se confondent. Indexer sur des positions n'est pas relier des fichiers, et c'est un fait d'époque, pas une négligence.",
  p4: "J'ai connu ces fichiers vus depuis le SQL : les colonnes étaient là, nommées, visibles. Et pourtant muettes. Sans accès aux programmes, j'ai reconstruit les liens par déduction, une colonne après l'autre, en croisant les valeurs. Le savoir était dans les programmes et dans les mémoires, jamais dans le fichier.",
},
vivant: {
  title: "Muet, mais pas mort",
  p1: "Rien de tout cela n'est une panne. Les données sont justes, les programmes tournent, les commandes partent. Ce qui manque n'est pas l'information, c'est sa description : ce que chaque position veut dire, ce que chaque nom désigne, combien de décimales se cachent dans un montant. Cette description existe, éparpillée dans des programmes et des mémoires. Il reste à l'écrire à un seul endroit, et à la mettre au service de ce qu'on veut exposer. C'est la solution.",
},
```

### Côté anglais

```
ouverture: "A fictional wholesaler and its five files are enough to show it.",
ruban: {
  title: "A flat file is a ribbon",
  p1: "A record is a run of characters of fixed length, and every piece of data lives at positions: the first seven hold the order number; the next four, the number of items; and so on to the end of the line. Nothing separates the fields, no name precedes them. The wholesaler's order file, CDEMST, is seventy characters per record. Read as it is, it looks like this: 00012340012000012550DURAND… One glued line, which only a program knows how to cut.",
  p2: "The cut exists, but it is not in the file. It lives in the programs that read it, declared each time in their input specifications. IBM says so in plain words: for these files, field-level information must be provided by the programs that process them. The ribbon is perfectly ordered, and knows nothing of its own order.",
},
lettres: {
  title: "Six letters to say it all",
  p1: "The languages of the day left little room for a field name: six characters or fewer in RPG II. So you abbreviate, and IBM tells you how: MASTER becomes MST or MSTR. NOMCLI is the customer's last name; NUMCDE, the order number; TOTHTG, the total before tax. You get used to it quickly, and these names are precise for those who work with them.",
  p2: "Then there is LIZEPO. Six letters, and nothing that hints it is the delivery mode a customer has chosen. That is not a flaw of the era: it is what such a short name ends up being when the application grows and the short words are taken. The name is exact. It is not telling, and the file has nowhere to write down what it means.",
},
silence: {
  title: "What the file does not say",
  p1: "Decimals, first. The total before tax of an order is stored as 000012550, and it is worth 125.50. No separator: the System/36 is a zoned-decimal machine, one digit per byte, and the number of decimal places is declared in the program, not in the file. Read the ribbon without the program and you will read twelve thousand five hundred and fifty.",
  p2: "The same piece of data under two names, next. The delivery mode code is called LIZEPO in the file of delivered customers, CMLIV, and CODLIV in the reference table of modes, MODLIV. The two files join on that value, and nothing, in either of them, says it is the same thing. Only the programs know.",
  p3: "No key, finally. These files carry no technical identifier: an order finds its customer by last name and first name, written in both files. Two customers with the same name blur into one. Indexing on positions is not linking files, and that is a fact of the era, not carelessness.",
  p4: "I have known these files as seen from SQL: the columns were there, named, visible. And yet mute. Without access to the programs, I rebuilt the links by deduction, one column after another, by cross-checking the values. The knowledge lived in the programs and in people's memories, never in the file.",
},
vivant: {
  title: "Mute, but not dead",
  p1: "None of this is a breakdown. The data is right, the programs run, the orders go out. What is missing is not the information, it is its description: what each position means, what each name stands for, how many decimal places hide in an amount. That description exists, scattered across programs and memories. What remains is to write it in one place, and put it to work for what we want to expose. That is the solution.",
},
```

**Le GAP** ne vit que dans `lettres.p1` côté français, une fois, sous la forme « RPG II, que l'on appelait GAP en France ». Le côté anglais ne le porte pas : le sigle ne parle pas au lecteur anglophone (S-4). Ne l'ajoute nulle part ailleurs.

**Le « je »** vit à deux endroits et deux seulement : `silence.p4` (le témoignage, règle du 15 août) et les trois paragraphes `voix` de la feuille C (livrable C, décision du 19 août : « ta voix qui le raconte dans l'annexe, comme le témoignage »). Aucun autre paragraphe n'est à la première personne.

## ÉTAPE 3 — Livrable B : les trois tableaux, clés et HTML

Trois figures `class="fichier"`, **le motif de la section 4 réemployé tel quel** (figure, `figcaption` avec `id`, conteneur `defile` avec `tabindex="0"`, `role="region"`, `aria-labelledby`). En-têtes de colonnes en `th scope="col"`. Les noms de colonnes et de fichiers sont en `<code>` **dans le HTML**, en texte nu dans les valeurs.

### Clés (sous `annexe`, après `vivant` ; les deux langues)

```
tab1: {
  legende: "Structure de CDEMST : cinq colonnes, soixante-dix positions",
  col1: "Colonne", col2: "Positions", col3: "Type", col4: "Contenu",
  l1: "Numéro de commande", l2: "Nombre d'articles", l3: "Total hors taxes, deux décimales implicites", l4: "Nom du client", l5: "Prénom du client",
},
tab2: {
  legende: "Brut contre interprété : ce que le programme sait et que le fichier tait",
  col1: "Colonne", col2: "Dans le fichier", col3: "Ce que ça veut dire",
  l1: "125,50", l2: "la commande 1234", l3: "12 articles",
},
tab3: {
  legende: "La même donnée sous deux noms : LIZEPO dans CMLIV, CODLIV dans MODLIV",
  note: "La valeur EXP est la même dans les deux fichiers. Aucun des deux ne le dit.",
},
```

```
tab1: {
  legende: "Structure of CDEMST: five columns, seventy positions",
  col1: "Column", col2: "Positions", col3: "Type", col4: "Content",
  l1: "Order number", l2: "Number of items", l3: "Total before tax, two implied decimals", l4: "Customer's last name", l5: "Customer's first name",
},
tab2: {
  legende: "Raw versus interpreted: what the program knows and the file keeps quiet",
  col1: "Column", col2: "In the file", col3: "What it means",
  l1: "125.50", l2: "order 1234", l3: "12 items",
},
tab3: {
  legende: "The same piece of data under two names: LIZEPO in CMLIV, CODLIV in MODLIV",
  note: "The value EXP is the same in both files. Neither of them says so.",
},
```

`tab2.l1` porte la virgule en français et le point en anglais : c'est **la seule valeur numérique du dictionnaire qui change de forme entre les langues**, et c'est voulu (le brut `000012550` ne change pas, il est du code, dans le HTML).

### HTML des tableaux (à insérer aux emplacements de l'ÉTAPE 5)

Tableau 1, sous `ruban.p1` :

```html
<figure class="fichier">
  <figcaption id="annexe-tab1" data-i18n="annexe.tab1.legende"></figcaption>
  <div class="defile" tabindex="0" role="region" aria-labelledby="annexe-tab1">
    <table>
      <thead><tr>
        <th scope="col" data-i18n="annexe.tab1.col1"></th><th scope="col" data-i18n="annexe.tab1.col2"></th>
        <th scope="col" data-i18n="annexe.tab1.col3"></th><th scope="col" data-i18n="annexe.tab1.col4"></th>
      </tr></thead>
      <tbody>
        <tr><td><code>NUMCDE</code></td><td>1-7</td><td>N</td><td data-i18n="annexe.tab1.l1"></td></tr>
        <tr><td><code>NBRART</code></td><td>8-11</td><td>N</td><td data-i18n="annexe.tab1.l2"></td></tr>
        <tr><td><code>TOTHTG</code></td><td>12-20</td><td>N</td><td data-i18n="annexe.tab1.l3"></td></tr>
        <tr><td><code>NOMCLI</code></td><td>21-50</td><td>A</td><td data-i18n="annexe.tab1.l4"></td></tr>
        <tr><td><code>PRECLI</code></td><td>51-70</td><td>A</td><td data-i18n="annexe.tab1.l5"></td></tr>
      </tbody>
    </table>
  </div>
</figure>
```

Tableau 2, sous `silence.p1` (avant la feuille C) :

```html
<figure class="fichier">
  <figcaption id="annexe-tab2" data-i18n="annexe.tab2.legende"></figcaption>
  <div class="defile" tabindex="0" role="region" aria-labelledby="annexe-tab2">
    <table>
      <thead><tr>
        <th scope="col" data-i18n="annexe.tab2.col1"></th><th scope="col" data-i18n="annexe.tab2.col2"></th><th scope="col" data-i18n="annexe.tab2.col3"></th>
      </tr></thead>
      <tbody>
        <tr><td><code>TOTHTG</code></td><td><code>000012550</code></td><td data-i18n="annexe.tab2.l1"></td></tr>
        <tr><td><code>NUMCDE</code></td><td><code>0001234</code></td><td data-i18n="annexe.tab2.l2"></td></tr>
        <tr><td><code>NBRART</code></td><td><code>0012</code></td><td data-i18n="annexe.tab2.l3"></td></tr>
      </tbody>
    </table>
  </div>
</figure>
```

Tableau 3, sous `silence.p2` : **une** figure, **deux** tableaux dans le même conteneur, la colonne du code teintée `lien-valeurs` dans les deux (la teinte existante qui dit « ce lien tient », et c'est exactement ce qu'elle dit ici).

```html
<figure class="fichier">
  <figcaption id="annexe-tab3" data-i18n="annexe.tab3.legende"></figcaption>
  <div class="defile deux" tabindex="0" role="region" aria-labelledby="annexe-tab3">
    <table>
      <thead><tr><th scope="col"><code>NOMCLI</code></th><th scope="col"><code>PRECLI</code></th><th scope="col" class="lien-valeurs"><code>LIZEPO</code></th></tr></thead>
      <tbody><tr><td>DURAND</td><td>MARIE</td><td class="lien-valeurs">EXP</td></tr></tbody>
    </table>
    <table>
      <thead><tr><th scope="col" class="lien-valeurs"><code>CODLIV</code></th><th scope="col"><code>LIBZLV</code></th><th scope="col"><code>DELJRG</code></th></tr></thead>
      <tbody><tr><td class="lien-valeurs">EXP</td><td>EXPRESS</td><td>002</td></tr></tbody>
    </table>
  </div>
  <p class="conclusion" data-i18n="annexe.tab3.note"></p>
</figure>
```

Les données du tableau 3 sont fictives et **ne sont pas** celles de la section 4 (dont les dix-huit lignes vivent dans `js/minilangage.js`) : ici, une ligne suffit et elle est écrite en dur. `DELJRG` vaut `002` sur trois positions, comme l'étude le définit (N, 34-36). Les en-têtes de ces deux tableaux sont **des noms de colonnes en `<code>` dans des `th`**, sans clé : ce sont du code, identiques dans les deux langues, précédent `[HttpGet]`.

## ÉTAPE 4 — Livrable C : les deux feuilles de codage

> Conforme à la maquette v2 (27 août 2026), dont chaque colonne est sourcée au § « Réponses aux questions de la maquette ».

Deux figures `class="fichier feuille"`. La classe `feuille` ajoute au motif de tableau ce qui fait la feuille de codage : la **règle de colonnes** (seconde ligne du `thead`, en `td`, numéros du formulaire IBM, bleu S/36, petit corps), le **type de formulaire** (`I` ou `C`) en première cellule de chaque ligne, les **cases pivot** teintées (colonne 52 et colonnes 53-58), l'**indicateur d'identification d'enregistrement** `01` en colonnes 19-20 sur la ligne du fichier (c'est ainsi qu'une feuille I commence : le fichier, puis ses zones), les cases vides marquées d'un point médian gris (`·`, U+00B7) pour que la grille se lise sans que la cellule ait l'air oubliée. Sous chaque tableau, les phrases de conclusion en `p.conclusion`, **dans la figure**, comme dans les dessins de la section 3.

### Clés (sous `annexe` ; les deux langues)

```
feuilleI: {
  legende: "Feuille I, spécifications d'entrée : le fichier CDEMST décrit par le programme qui le lit",
  colType: "Type", colFichier: "Fichier", colInd: "Ind.", colDe: "De", colA: "À", colDec: "Déc.", colNom: "Nom de zone",
  c1: "Six cases pour un nom de zone, colonnes 53 à 58 : voilà les six lettres.",
  c2: "Un 2 en colonne 52 face à TOTHTG : voilà les décimales que 000012550 ne montre pas. La description du fichier n'est pas dans le fichier ; elle est sur cette feuille, dans le programme.",
},
feuilleC: {
  legende: "Feuille C, spécifications de calcul : trois lignes, trois mécanismes",
  colType: "Type", colCond: "Cond.", colF1: "Facteur 1", colOp: "Opération", colF2: "Facteur 2", colRes: "Résultat", colLong: "Long.", colDec: "Déc.", colH: "H", colHi: "Hi", colLo: "Lo", colEq: "Eq",
  c1: "Ligne 1 : MULT range le produit dans TFACT, et c'est ici que TFACT naît, longueur 9, deux décimales. La colonne 52 est la même que sur la feuille I : les décimales se déclarent sur la feuille, jamais dans la donnée. Le H demande l'arrondi.",
  c2: "Ligne 2 : CHAIN cherche dans CLIMST la fiche dont la clé vaut CLECLI. L'indicateur 51, en colonne High, s'allume si la fiche n'existe pas.",
  c3: "Ligne 3 : le 51 à gauche conditionne la ligne. Elle ne s'exécute que si l'interrupteur est allumé, et elle appelle CRECLI, la sous-routine qui crée la fiche.",
},
voix: {
  p1: "Les indicateurs de résultat sont aux colonnes d'extrême droite, High, Low, Equal. On peut y inscrire un indicateur, de 1 à 99. Chaque indicateur fonctionne comme un interrupteur : il est allumé, ou pas, selon le résultat de l'opération faite sur le facteur 1, l'opération et le facteur 2.",
  p2: "À gauche, les indicateurs de condition disent si la ligne s'exécute. J'écrivais N51 si l'enregistrement avait été trouvé, 51 s'il ne l'avait pas été.",
  p3: "L'exemple que j'ai en tête : créer une fiche client si elle n'existe pas. On cherche la fiche, l'interrupteur s'allume si elle manque, et la ligne suivante appelle la sous-routine qui la crée.",
},
```

```
feuilleI: {
  legende: "Sheet I, input specifications: the CDEMST file as described by the program that reads it",
  colType: "Type", colFichier: "File", colInd: "Ind.", colDe: "From", colA: "To", colDec: "Dec.", colNom: "Field name",
  c1: "Six boxes for a field name, columns 53 to 58: there are the six letters.",
  c2: "A 2 in column 52 next to TOTHTG: there are the decimals that 000012550 does not show. The description of the file is not in the file; it is on this sheet, in the program.",
},
feuilleC: {
  legende: "Sheet C, calculation specifications: three lines, three mechanisms",
  colType: "Type", colCond: "Cond.", colF1: "Factor 1", colOp: "Operation", colF2: "Factor 2", colRes: "Result", colLong: "Len.", colDec: "Dec.", colH: "H", colHi: "Hi", colLo: "Lo", colEq: "Eq",
  c1: "Line 1: MULT stores the product in TFACT, and this is where TFACT is born, length 9, two decimals. Column 52 is the same column as on sheet I: decimals are declared on the sheet, never in the data. The H asks for rounding.",
  c2: "Line 2: CHAIN looks in CLIMST for the record whose key equals CLECLI. Indicator 51, in the High column, turns on if the record does not exist.",
  c3: "Line 3: the 51 on the left conditions the line. It runs only if the switch is on, and it calls CRECLI, the subroutine that creates the record.",
},
voix: {
  p1: "The resulting indicators sit in the rightmost columns, High, Low, Equal. You can write an indicator there, from 1 to 99. Each indicator works like a switch: it is on, or it is not, depending on the result of the operation performed on factor 1, the operation and factor 2.",
  p2: "On the left, the conditioning indicators say whether the line runs. I would write N51 if the record had been found, 51 if it had not.",
  p3: "The example I have in mind: create a customer record if it does not exist. You look the record up, the switch turns on if it is missing, and the next line calls the subroutine that creates it.",
},
```

Les trois paragraphes `voix` sont **les mots du chef de projet** (dictée des 19 et 20 août 2026), mis en forme sans rien ajouter : les interrupteurs, la recherche, la fiche créée si elle manque. **Une seule correction, sourcée** : le 51 va en colonne **High**, pas Equal (l'indicateur de `CHAIN` s'allume quand l'enregistrement n'est **pas** trouvé, notes v6, vérification du 20 août). Le mot « High » est du code de formulaire ; il ne se traduit dans aucune des deux langues.

### HTML des feuilles

Feuille I, sous `ruban.p2` :

```html
<figure class="fichier feuille">
  <figcaption id="annexe-feuille-i" data-i18n="annexe.feuilleI.legende"></figcaption>
  <div class="defile" tabindex="0" role="region" aria-labelledby="annexe-feuille-i">
    <table>
      <thead>
        <tr>
          <th scope="col" data-i18n="annexe.feuilleI.colType"></th><th scope="col" data-i18n="annexe.feuilleI.colFichier"></th><th scope="col" data-i18n="annexe.feuilleI.colInd"></th>
          <th scope="col" data-i18n="annexe.feuilleI.colDe"></th><th scope="col" data-i18n="annexe.feuilleI.colA"></th>
          <th scope="col" class="pivot" data-i18n="annexe.feuilleI.colDec"></th><th scope="col" class="pivot" data-i18n="annexe.feuilleI.colNom"></th>
        </tr>
        <tr class="regle" aria-hidden="true">
          <td>6</td><td>7-14</td><td>19-20</td><td>44-47</td><td>48-51</td><td class="pivot">52</td><td class="pivot">53-58</td>
        </tr>
      </thead>
      <tbody>
        <tr><td class="type">I</td><td><code>CDEMST</code></td><td>01</td><td class="vide">·</td><td class="vide">·</td><td class="pivot vide">·</td><td class="pivot vide">·</td></tr>
        <tr><td class="type">I</td><td></td><td class="vide">·</td><td class="num">1</td><td class="num">7</td><td class="pivot vide">·</td><td class="pivot cases"><code>NUMCDE</code></td></tr>
        <tr><td class="type">I</td><td></td><td class="vide">·</td><td class="num">8</td><td class="num">11</td><td class="pivot vide">·</td><td class="pivot cases"><code>NBRART</code></td></tr>
        <tr><td class="type">I</td><td></td><td class="vide">·</td><td class="num">12</td><td class="num">20</td><td class="pivot"><strong>2</strong></td><td class="pivot cases"><code>TOTHTG</code></td></tr>
        <tr><td class="type">I</td><td></td><td class="vide">·</td><td class="num">21</td><td class="num">50</td><td class="pivot vide">·</td><td class="pivot cases"><code>NOMCLI</code></td></tr>
        <tr><td class="type">I</td><td></td><td class="vide">·</td><td class="num">51</td><td class="num">70</td><td class="pivot vide">·</td><td class="pivot cases"><code>PRECLI</code></td></tr>
      </tbody>
    </table>
  </div>
  <p class="conclusion" data-i18n="annexe.feuilleI.c1"></p>
  <p class="conclusion" data-i18n="annexe.feuilleI.c2"></p>
</figure>
```

Feuille C, sous le tableau 2, suivie des trois paragraphes `voix` **hors figure** :

```html
<figure class="fichier feuille">
  <figcaption id="annexe-feuille-c" data-i18n="annexe.feuilleC.legende"></figcaption>
  <div class="defile" tabindex="0" role="region" aria-labelledby="annexe-feuille-c">
    <table>
      <thead>
        <tr>
          <th scope="col" data-i18n="annexe.feuilleC.colType"></th><th scope="col" data-i18n="annexe.feuilleC.colCond"></th>
          <th scope="col" data-i18n="annexe.feuilleC.colF1"></th><th scope="col" data-i18n="annexe.feuilleC.colOp"></th><th scope="col" data-i18n="annexe.feuilleC.colF2"></th>
          <th scope="col" data-i18n="annexe.feuilleC.colRes"></th><th scope="col" data-i18n="annexe.feuilleC.colLong"></th><th scope="col" class="pivot" data-i18n="annexe.feuilleC.colDec"></th>
          <th scope="col" data-i18n="annexe.feuilleC.colH"></th><th scope="col" data-i18n="annexe.feuilleC.colHi"></th><th scope="col" data-i18n="annexe.feuilleC.colLo"></th><th scope="col" data-i18n="annexe.feuilleC.colEq"></th>
        </tr>
        <tr class="regle" aria-hidden="true">
          <td>6</td><td>9-17</td><td>18-27</td><td>28-32</td><td>33-42</td><td>43-48</td><td>49-51</td><td class="pivot">52</td><td>53</td><td>54-55</td><td>56-57</td><td>58-59</td>
        </tr>
      </thead>
      <tbody>
        <tr><td class="type">C</td><td class="vide">·</td><td><code>ZPRX</code></td><td><code>MULT</code></td><td><code>QTE</code></td><td class="cases"><code>TFACT</code></td><td class="num">9</td><td class="pivot"><strong>2</strong></td><td>H</td><td class="vide">·</td><td class="vide">·</td><td class="vide">·</td></tr>
        <tr><td class="type">C</td><td class="vide">·</td><td><code>CLECLI</code></td><td><code>CHAIN</code></td><td><code>CLIMST</code></td><td class="vide">·</td><td class="vide">·</td><td class="pivot vide">·</td><td class="vide">·</td><td><strong>51</strong></td><td class="vide">·</td><td class="vide">·</td></tr>
        <tr><td class="type">C</td><td><strong>51</strong></td><td class="vide">·</td><td><code>EXSR</code></td><td><code>CRECLI</code></td><td class="vide">·</td><td class="vide">·</td><td class="pivot vide">·</td><td class="vide">·</td><td class="vide">·</td><td class="vide">·</td><td class="vide">·</td></tr>
      </tbody>
    </table>
  </div>
  <p class="conclusion" data-i18n="annexe.feuilleC.c1"></p>
  <p class="conclusion" data-i18n="annexe.feuilleC.c2"></p>
  <p class="conclusion" data-i18n="annexe.feuilleC.c3"></p>
</figure>
<p data-i18n="annexe.voix.p1"></p>
<p data-i18n="annexe.voix.p2"></p>
<p data-i18n="annexe.voix.p3"></p>
```

La ligne `regle` porte `aria-hidden="true"` : les cotes du formulaire sont une information visuelle, redondante avec les phrases de conclusion qui nomment les colonnes 52 et 53-58. Ce choix est à **dire dans `changes.md`** ; la mesure sous lecteur d'écran reste au chef de projet.

## ÉTAPE 5 — Le corps de l'annexe dans `index.html`

Remplace le corps de `<section id="annexe">` (lignes 412-417 de `main`, entre le `h2` inclus et `</section>`) par la séquence suivante. Le `h2`, `annexe.intro` et le lien de retour sont **repris à l'identique**, `annexe.attente` **disparaît**.

```
h2  annexe.title                       (existant, inchangé)
p   annexe.intro                       (existant, inchangé)
p   annexe.ouverture
h3  annexe.ruban.title
p   annexe.ruban.p1
    [tableau 1]
p   annexe.ruban.p2
    [feuille I]
h3  annexe.lettres.title
p   annexe.lettres.p1
p   annexe.lettres.p2
h3  annexe.silence.title
p   annexe.silence.p1
    [tableau 2]
    [feuille C]
p   annexe.voix.p1
p   annexe.voix.p2
p   annexe.voix.p3
p   annexe.silence.p2
    [tableau 3]
p   annexe.silence.p3
p   annexe.silence.p4
h3  annexe.vivant.title
p   annexe.vivant.p1
p   a[href="#probleme"] annexe.retour  (existant, inchangé)
```

Quatre `h3`, comme les sections 1 et 3 (motif `h3` puis `p`). Aucun autre élément.

## ÉTAPE 6 — Livrable D : les règles CSS

Dans `css/styles.css`, **immédiatement après** la famille `.fichier` (après la règle `.fichier td.lien-valeurs.lien-eteint`, ligne 786 de `main`), ajoute la famille suivante **exactement**. Elle **étend** `.fichier` ; elle ne redéfinit rien de ce que `.fichier` porte déjà (bordure, filet bleu, `defile`, police mono, calage, teintes de lien).

```css
/* ---- La feuille de codage : le motif de tableau, plus ce qui fait le carton.
   Établi par l'annexe (incrément 10). La règle de colonnes en bleu S/36 est
   la cote du relevé d'ingénierie ; les cases pivot (colonne 52, colonnes
   53-58) sont celles que les phrases de conclusion nomment. Contrastes
   mesurés le 27 août 2026, formule WCAG, sur #edf5ff : #161616 16,46:1,
   #525252 7,11:1, #0f62fe 4,55:1. */
.fichier .regle td {
  padding-top: 0;
  border-top: 0;
  color: var(--color-s36);
  font-size: 0.6875rem;
  text-align: center;
}

.fichier td.type {
  color: var(--color-s36);
  font-weight: 700;
  text-align: center;
}

.fichier td.num {
  text-align: right;
}

.fichier th.pivot,
.fichier td.pivot {
  background: #edf5ff;
}

.fichier td.cases {
  letter-spacing: 0.35em;
}

.fichier td.vide {
  color: var(--color-line);
}

/* Le tableau 3 : deux fichiers côte à côte quand la place le permet, l'un
   sous l'autre sinon. Le conteneur défile déjà ; ici on ne fait que ranger. */
.fichier .deux {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space);
}
```

Et **un seul sélecteur ajouté à une règle existante** : la règle `.dessin .conclusion` (ligne 411 de `main`) devient `.dessin .conclusion, .fichier .conclusion { … }`, **sans changer ses déclarations**. Porteur unique : la phrase de conclusion d'une figure a un style, pas deux.

Aucune requête de média ajoutée. Aucune autre règle touchée.

## ÉTAPE 7 — Livrable E : le fil

Dans `tasks/ROADMAP.md`, deux gestes et rien d'autre :

1. Ligne 10 du tableau du fil : `Prompt` devient `` `EVOL_annexe-s36_v1` ``, `État` devient `en cours (session 22)`, et dans la dernière colonne « SVG registre « plan technique » » devient « **tableaux HTML/CSS** registre « plan technique » (précédent des dessins de la section 3, arbitré au gel) ». Le reste de la ligne ne change pas.
2. Sous le tableau, dans le paragraphe « Deux trous connus de ce fil », ajoute une phrase : « **Troisième trou, relevé le 27 août 2026 (session 22)** : la section 4 décrit `CDEMST` avec `DATCDE` et `MTTCDE`, et `MODLIV` avec `LIBLIV` ; l'étude v2, la section 3 et l'annexe disent `NBRART`, `TOTHTG` et `LIBZLV`. L'écart est né avec les maquettes du mini-langage et n'a jamais été arbitré. Il se tranche à la ligne 11 ou 12, dans un sens ou dans l'autre, jamais en passant. »

(`/land` mettra l'état à « atterri » ; c'est la dette [W24], tu ne la rembourses pas ici.)

## ÉTAPE 8 — Preuves

1. `npm test` vert : **356/356**, aucun test ajouté ni retiré.
2. Périmètre : `git diff main...HEAD --stat -- . ':!prompts'` : **quatre** fichiers, `js/i18n.js`, `index.html`, `css/styles.css`, `tasks/ROADMAP.md`. `git diff main...HEAD -- tests tools .claude assets js/minilangage.js js/s36.js js/menu.js` : **vide**.
3. Comptages `index.html`, **occurrences** (`grep -o MOTIF index.html | wc -l`), avant et après. Les valeurs « après » sont calculées depuis le HTML de ce prompt (maquette v2).

   | Motif | Avant | Après |
   |---|---|---|
   | `<table` | 5 | **11** |
   | `<figure` | 10 | **15** |
   | `<figure class="fichier` | 1 | **6** |
   | `<tr` | 14 | **41** |
   | `<th scope` | 16 | **48** |
   | `<td` | 27 | **159** |
   | `<h3` | 14 | **18** |
   | `tabindex="0"` | 12 | **17** |
   | `role="region"` | 12 | **17** |
   | `aria-labelledby` | 19 | **24** |
   | `aria-hidden="true"` | (consigne) | **+2** |
   | `id="` | 56 | **61** |
   | `data-i18n="annexe` | 4 | **65** |
   | `data-i18n="` | 151 | **212** |
   | `<pre` | 7 | **7** |
   | `<details` | 4 | **4** |
   | `<script` | 2 | **2** |

   Piège de comptage : `<table` compte **11** et non 10, parce que le tableau 3 est **une** figure portant **deux** tableaux. Un `tr` de plus ou de moins signale une ligne rentrée ou sortie par la fenêtre : ARRÊTE-TOI et signale.
4. Comptages `js/i18n.js` : `grep -c 'attente' js/i18n.js` = **2** — les deux `annexe.attente` retirées, les deux `section4.champ.attente` **intactes**. Si tu lis 0, tu as supprimé des clés du mini-langage : ARRÊTE-TOI et signale. Nombre de clés pointées sous `annexe` : **3 + 62 = 65** par langue, identique des deux côtés (la porte de parité le mesure). `grep -o 'GAP' js/i18n.js | wc -l` = **1**. `grep -o 'RPG' js/i18n.js | wc -l` = **4** (2 existantes + `lettres.p1` par langue).
5. **Porteur des positions** : `grep -o '<td>[0-9]*-[0-9]*</td>' index.html` renvoie **exactement** les cinq cellules `1-7`, `8-11`, `12-20`, `21-50`, `51-70`, une fois chacune (tableau 1 ; la feuille I les porte en deux cellules `num`, donc hors de ce motif ; piège : `grep '1-7'` seul compterait aussi `51-70`). `grep -c 'soixante-dix\|seventy' js/i18n.js` = **2**. Consigne.
6. Unicité des `id` : aucun doublon (consigne la commande). Les ancres `#annexe` et `#probleme` sont **inchangées** ; le renvoi de la section 2 résout toujours.
7. Cadratins : `grep -c "—"` sur `js/i18n.js` **10 → 10**, `index.html` **2 → 2**, `css/styles.css` **7 → 7**. Le point médian `·` (U+00B7) des cases vides n'est pas un cadratin ; consigne son compte : `grep -o '·' index.html | wc -l` = **32**.
8. Aucun des six mots de sécurité dans les valeurs ajoutées (consigne la commande et son résultat). `grep -o 'innerHTML' js/i18n.js | wc -l` = **0**.
9. Requêtes de média : `grep -c '^@media' css/styles.css` = **7 → 7**. `grep -c '\.fichier \.conclusion' css/styles.css` = **1** ; `grep -c '^\.fichier \.conclusion' css/styles.css` = **0** (le sélecteur est **ajouté à la règle de `.dessin`**, il n'a pas sa propre règle).
10. Rendu, **écrit dans `changes.md`** avec le périmètre de chaque mesure : à 320 px et à 390 px, aucun défilement horizontal de la page (mesure le `scrollWidth` du `body` si tu as un navigateur, sinon dis que tu ne l'as pas mesuré) ; les cinq conteneurs `defile` sont atteints par Tab ; les tableaux gardent leur sémantique native. Ce que tu ne peux pas mesurer sans navigateur, **dis-le**. La validation sur iPhone 14 et la lecture VoiceOver de la ligne `regle` restent au chef de projet.
11. Anonymisation : `git grep -n -i` sur la liste des mots interdits du projet (elle est dans `CLAUDE.md`) → **vide** sur la branche.

## ÉTAPE 9 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `css/styles.css`, `tasks/ROADMAP.md`) : `feat(annexe): un fichier S/36 de près, quatre blocs, trois tableaux, deux feuilles de codage redessinées ; le GAP nommé ; écart CDEMST de la section 4 inscrit au fil`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. `SHIP` avec des `WARN` : **n'y touche pas**, écris READY (règle d'arrêt du 27 août 2026 : 0 FAIL suffit, les WARN partent en dette nommée). `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL annexe-s36 — <ISO> — feat/annexe-s36 — tests 356/356`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les valeurs françaises et anglaises écrites **exactement** comme ci-dessus ; `annexe.attente` retirée des deux côtés ; **aucune** valeur existante modifiée, nulle part.
2. Le corps de l'annexe conforme à la séquence de l'ÉTAPE 5 : quatre `h3`, cinq figures `fichier`, six tableaux, trois paragraphes `voix` hors figure, le lien de retour en dernier.
3. Les feuilles conformes au HTML de l'ÉTAPE 4 **tel que gelé** (après correction de la maquette) : le 2 en colonne 52 face à `TOTHTG` et sur la ligne `MULT`, le 51 en **High** sur la ligne `CHAIN`, le 51 en condition sur la ligne `EXSR`.
4. Les règles CSS ajoutées **exactement** comme fournies, à l'emplacement indiqué ; un sélecteur ajouté à `.dessin .conclusion`, rien d'autre touché.
5. La ligne 10 du fil et le troisième trou écrits comme au livrable E. La section 4, `js/minilangage.js` et les deux `LIBZLV` de la section 3 **intacts**.
6. Suite verte 356/356. Tous les comptages de l'ÉTAPE 8 conformes. Aucun cadratin ajouté. Aucun `innerHTML`, aucun script, aucun SVG, aucune image.
7. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

---

## Réponses aux questions de la maquette (vérifiées le 27 août 2026)

Le chef de projet a demandé que ces points soient vérifiés à sa place, sa mémoire de la technologie étant lointaine. Chaque réponse cite sa source ; ce qui n'a pas pu être lu est dit tel quel.

| | Question | Réponse | Source |
|---|---|---|---|
| (a) | Garder la ligne « fichier » de la feuille I ? | **Oui.** Une feuille I commence par la ligne d'enregistrement, nom de fichier en colonnes 7-14, puis les zones. | SC09-1818 p. 550 : « Columns 7-14 (Filename) » |
| (b) | L'indicateur d'identification d'enregistrement ? | **Oui, `01` en colonnes 19-20**, sur la ligne du fichier. C'est l'interrupteur que la lecture d'un enregistrement allume ; il fait le lien avec la feuille C, où les indicateurs sont le sujet. | SC09-1818 p. 557 : « Columns 19-20 (Record-Identifying Indicator) » |
| (c) | Colonnes 43 et 59-70 absentes ? | **Oui.** Position de zone en 44-51 (de 44-47, à 48-51), décimales en 52, nom en 53-58 : c'est ce que la feuille montre. Le reste ne sert pas au chapitre. | SC09-1818 p. 575-576 : « Columns 44-51 (Field Location) », « Column 52 (Decimal Positions) », « Columns 53-58 (Field Name) » |
| (d) | Le `H` d'arrondi ? | **Oui, en colonne 53**, sur la ligne `MULT` seulement. | Moseley, *Calculation Specifications* : « Half adjusting of result fields is caused by entering the letter H in column 53 » ; SC09-1818 p. 600 « Column 53 (Half-Adjust) » |
| (e) | Une colonne « Cond. » pour les indicateurs de condition ? | **Oui, simplifiée et dite.** Le formulaire en a trois (9-11, 12-14, 15-17, chacune avec sa case `N`). La feuille n'en montre qu'une, cotée 9-17 : une seule ligne en a besoin, et trois colonnes vides diraient moins que la cote. À dire dans `changes.md`. | Moseley : indicateurs en 9-17, négation en 9, 12, 15 |
| (f) | Colonnes 7-8 absentes ? | **Oui.** Le niveau de contrôle appartient au cycle, écarté le 19 août. | Moseley : « Control Level 7-8 » |
| (g) | `ZPRX`, `QTE`, `TFACT` ? | **Gardés tels que dictés.** `CDELIG` n'a pas de colonne de quantité (étude v2 §3.1 : `NUMCDE`, `NUMLIG`, `CODART`, `PRXHTG`), donc aucune multiplication du grossiste ne peut s'écrire avec des colonnes existantes. Ces trois noms sont des zones de calcul, fictives comme le reste ; `TFACT` **naît** sur cette ligne, c'est le point. | Étude v2 §3.1 |
| — | `MULT` définit-il la zone résultat ? | **Oui.** | Moseley : « The number of digits required to the right of the decimal point is entered in column 52 and the total length of the result field is specified in columns 49-51 » |
| — | `CHAIN` : argument en facteur 1, fichier en facteur 2, non trouvé en High ? | **Oui.** `CLECLI` en facteur 1 est correct ; l'indicateur de colonnes 54-55 s'allume quand l'enregistrement n'est pas trouvé. | SC09-1818 p. 734-735 ; Wikipedia RPG II : « CHAIN retrieves the record in the indexed file named in Factor 2 that matches the exact key specified by the value in Factor 1 » |
| — | `CRECLI` : six caractères ? | **Retenu, réserve dite.** Le facteur 2 de `EXSR` fait dix positions (33-42) ; la limite de six vient de la règle des noms RPG II, que les pages lisibles du manuel ne citent pas en toutes lettres. `CRECLI` est valide dans les deux cas ; la phrase des notes « il n'y a que six positions » était inexacte pour le facteur 2 et n'est **pas** reprise dans le site. | SC09-1818 p. 763 (« Coding Subroutines », nom en facteur 2) ; limite de six : non lue |
| (h) | Place des feuilles ? | **Sous la prose qui les appelle** (décision de forme n° 2 du prompt). | — |
| (i) | Le « je » à deux endroits ? | **Oui**, témoignage et `voix` : la décision du 19 août (« ta voix qui le raconte, comme le témoignage ») étend celle du 15. Inscrit ici. | Session 14, notes v6 |

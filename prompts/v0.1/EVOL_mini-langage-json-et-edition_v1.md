# EVOL — Le mini-langage (2 sur 2) : le JSON, la requête, l'édition des données

**Fichier** : `prompts/v0.1/EVOL_mini-langage-json-et-edition_v1.md`
**Type** : EVOL (contenu + comportement + tests) · **Branche** : `feat/mini-langage-json-et-edition` · **Révision** : v1 · **Date** : 23 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> ## PROMPT GELÉ, EXÉCUTABLE
> Gelé par le chef de projet le 23 août 2026 (session 19). **Aucune valeur de ce prompt ne se
> négocie en cours de route.** Si une consigne te paraît fausse, contradictoire ou impossible à
> tenir, tu **arrêtes et tu le dis** ; tu ne l'adaptes pas de toi-même.
>
> **Il gèle le brouillon v2 du même jour**, conservé pour trace dans `Prompts_Non_Suivis` avec la
> v1 du 21 août — le brouillon disait ses mesures du « 22 août au soir » ; elles datent de la
> session 19, le 23 août, sur l'état atterri la veille au soir, et c'est la formulation d'ici qui
> fait foi. Sources : notes v6 (§0 septies, §8 ter, §8 quater), avenant 2 du prompt du premier
> sous-incrément (valeurs de la légende), code de `main` en 0.1.16, arbitrages du chef de projet de
> la session 19 sur maquette jetable.
>
> **Une réserve est consignée au gel, non tranchée, et elle ne t'appartient pas** : le §8 ter des
> notes v6. Sur un IBM i réel, `NOMCLI` n'est une colonne SQL que si le fichier est décrit ; si la
> description vit dans les programmes, SQL voit un seul grand champ et il faut des `SUBSTR` ou une
> vue. Le site n'en dit rien dans cet incrément. **Reporte la réserve telle quelle dans
> `changes.md` et n'essaie pas de la trancher** : elle est au chef de projet, contre sa solution
> d'origine, et une phrase pourra s'ajouter au site dans un incrément ultérieur.
>
> **Second gel du 23 août 2026 — le premier gel du jour n'a jamais été exécuté ni committé.** Il
> ajoute le **livrable D, « les ponts de noms »** : l'origine physique de chaque colonne sous les
> cases à cocher, la note qui nomme le modèle C#, et les deux sous-titres de la section 3 qui
> donnent à la référence de cette note une cible réelle. Arbitrage du chef de projet du même jour,
> sur maquette jetable. Les comptes d'arrivée (parité, `data-i18n`) sont recalés en conséquence
> dans tout le prompt ; ceux de ce second gel font foi.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | S-1 : aucun cadratin de prose dans les valeurs livrées (comptes en fin de prompt). S-2 : **la page ne dit jamais qu'elle est sûre**, elle montre ce qui se passe — règle la plus exposée de cet incrément, dont le sujet est une tentative d'injection. S-4 : côté anglais, les termes attendus sont `parameterised query` et `bind parameter` ; les deux sont dans les valeurs gelées. **Ne réécris aucune valeur existante**, hormis la seule que ce prompt te prescrit (`legende.modifier`). |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre par `textContent`, **jamais `innerHTML`** : doublement vrai ici, où une valeur saisie par le lecteur est réaffichée dans deux textes de requête. Aucune dépendance, aucun appel réseau. **Aucune requête n'est construite ni exécutée** : les deux textes SQL sont des chaînes de démonstration. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `UX_METHOD` | — | Appliqué, à mesurer | Mobile-first strict. Aucun débordement horizontal de la page à **320 px** ni à **390 px**, dans tous les états y compris l'édition ouverte et le vis-à-vis affiché. Le bloc JSON est **plafonné en hauteur** (sans filtre il porte dix-huit objets). Les cadres neufs suivent le motif des cadres existants : `tabindex="0"`, `role="region"`, nom accessible. |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | La fabrication des deux textes de requête, la traduction des bornes, le rendu JSON et la détection des orphelines sont de la **logique pure** : elles vont dans les modules existants et leurs suites s'étendent. La traduction des bornes vit dans `js/s36.js`, **à côté de la règle qu'elle inverse**, testée dans `tests/s36.test.js`. |
| `PEDAGOGY_METHOD` | — | Appliqué | Le vis-à-vis des deux requêtes **est** le dispositif pédagogique de cet incrément : il montre au lieu d'affirmer. Le mot « paramètre » est étiqueté à sa première apparition. Le bouton d'édition fabrique une intention (motif au livrable C, à reporter en commentaire dans le code). |
| `VISION_METHOD` | — | Écarté, hésitation nommée | Même motif qu'au premier sous-incrément : la validation visuelle et tactile reste au chef de projet. N'installe rien. |
| `SQL_METHOD` | — | Écarté, motif nommé | **Aucune requête n'est émise vers aucune base** : la frontière A/B/C ne s'applique pas. Les deux textes SQL sont des illustrations, jamais exécutées, et le code le dit en commentaire pour que la revue puisse le vérifier. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** :
`docs(prompt): prompts/v0.1/EVOL_mini-langage-json-et-edition_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**. Puis
**relis ce prompt depuis le disque juste avant d'écrire ta première ligne**, même si tu viens de le
lire : un fichier de consigne lu n'est pas un état, c'est un instantané (leçon du 21 août 2026).

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

**Ces contrôles établissent que la matière sur laquelle cet incrément travaille existe sur `main`.
Chaque chiffre ci-dessous a été mesuré le 23 août 2026, jour du gel, sur `main` en 0.1.16 — l'état
atterri le 22 août au soir. Si l'un d'eux a bougé, ARRÊTE-TOI et signale, sans rien corriger : un
écart signifie qu'un incrément est passé avant toi, et ce prompt ne le connaît pas.**

1. `git checkout main`. `git rev-list --count origin/main..main` = **0**.
2. Version au manifeste : **exactement `0.1.16`**. (L'incrément 8 passe après celui-ci ; toute autre
   version dit que le fil a bougé.)
3. `.pipeline/STATUS.md` commence par `CLOSED — session 18`.
4. `npm test` vert sur `main` : **210 tests, 6 fichiers**. Relève le compte exact ; c'est ta base.
5. **Le module du langage existe et exporte** : `js/minilangage.js` porte `recognise`, `joinFiles`,
   `filterRows`, `renderClass`, `buildModel`, `PHYSICAL_MODEL`, `EXAMPLES`, `mountMiniLanguage`.
   `PHYSICAL_MODEL` porte **neuf entrées dont deux sur la colonne `MTTCDE`** (`MTTCDE_BRUT`, texte,
   et `MTTCDE`, décimal) — c'est le couple que le livrable B dédoublonne.
6. **Le décor est entier** : 18 commandes, 18 clients, 18 modes par client, 6 codes au référentiel.
7. **La section 4 est en place** : `grep -c 'data-i18n="section4' index.html` = **24**. La
   section 3 aussi : `grep -c 'data-i18n="section3' index.html` = **58**.
8. **Parité du dictionnaire** : le groupe `section4` porte **94 clés par langue**, divergence nulle
   (la suite `tests/i18n.test.js` le garde ; constate-le).
9. **Les suites existent** : `tests/minilangage.test.js` et `tests/s36.test.js` présents et verts.
10. **Cadratins, en occurrences et non en lignes** : `js/i18n.js` **10**, `index.html` **1**,
    `css/styles.css` **8**. Ils doivent être **inchangés** à la fin — aucune valeur neuve n'en
    porte.
11. **Formes imprimées** : la classe `SEQUENCE_IMPRIMEE` de `tests/minilangage.test.js` capture
    **4 formes par langue** dans le dictionnaire. Ce compte doit être **inchangé** à la fin — voir
    la garde [W31] au périmètre.

## Contexte et périmètre

La section 4 porte son texte, son décor, son reconnaisseur, ses treize exemples et sa classe
fabriquée (incrément 6, merge `6f3778c`). Cet incrément lui ajoute **quatre choses, et rien
d'autre** : le JSON renvoyé, la requête que le serveur bâtirait, le droit pour le lecteur de
modifier les données, et **les ponts de noms** — le rappel, là où le lecteur agit, que les noms
qu'il manipule sont ceux que le modèle C# expose et non ceux du fichier. Il rend au passage son
sens à la légende, et c'est prévu depuis l'avenant 2.

**Périmètre** : `index.html`, `js/i18n.js`, `css/styles.css`, `js/minilangage.js`, `js/s36.js`,
`tests/minilangage.test.js`, `tests/s36.test.js`. **Rien d'autre.** `js/s36.js` entre au périmètre
pour **une seule fonction**, l'inverse des décimales implicites — la règle vient de ce fichier et
son inverse vit à côté d'elle, jamais recalculé ailleurs (réserve de la v1, tenue).

**Trois retouches hors du périmètre neuf, prescrites et bornées — tout le reste est gelé.** La
troisième touche la **section 3, atterrie** : deux sous-titres s'y ajoutent, prescrits mot à mot au
livrable D, parce que la note du simulateur renvoie vers une sous-section qui doit exister pour
être trouvée. Rien d'autre de la section 3 ne bouge.

- **`sameCustomer` (`js/minilangage.js`, lignes 300-303)** compare aujourd'hui à l'octet près.
  Tant que le décor était figé en majuscules, rien ne mordait ; dès que le lecteur édite, « durand »
  casserait la jointure de DURAND. **Arbitrage du chef de projet, session 19 : la jointure compare
  sans la casse, comme le filtre le fait déjà** (`matches` passe par `toUpperCase`, lignes 380-384).
  Ce qui casse un lien, c'est un autre nom, pas une autre écriture du même nom.
- **`section4.legende.modifier`** porte le texte de repli posé par A2-2 (« Les cellules teintées
  portent les liens… »), parce que rien n'était modifiable dans l'incrément 6. **Cet incrément-ci
  lui rend la phrase d'origine de l'avenant 2**, aux deux langues — valeurs exactes au livrable C.

**Hors périmètre, explicitement.** Aucune dépendance, aucun appel réseau, aucune image, aucune
animation. Aucune modification du texte de la section, du décor, du reconnaisseur, des exemples ni
de la classe fabriquée, hors les deux retouches ci-dessus. Les **trois enrichissements de
l'incrément 8** (marquer le dernier exemple utilisé, bouton de fermeture de séquence, fond du bloc
de refus) restent dehors : ils ont été essayés sur la maquette jetable de la session 19 et **le fil
les garde au 8**, arbitrage confirmé le jour même. **[W23]** reste ouverte ; note dans `changes.md`
que le bloc JSON plafonné **agrandit sa surface d'un cadre**. **[W31]** reste ouverte ; sa garde :
**aucune valeur neuve de cet incrément n'imprime une forme `<…:…:…/>`**. Si une valeur te semble en
exiger une, ARRÊTE-TOI et signale — la porte actuelle est aveugle aux formes à espace, et la classe
de remplacement attend son remboursement, déjà mesurée, au fil.

**Teintes : aucune de neuve.** La page n'a plus de teinte libre (fil, ligne 8) et l'arbitrage de
couleur appartient à l'incrément 8. Le message d'information du livrable C se compose avec les
jetons existants de `css/styles.css` (bordure, fond neutre). S'il te semble exiger une teinte
neuve → ARRÊTE-TOI et signale.

---

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/mini-langage-json-et-edition` · `.pipeline/spec.md`, dont la **première
ligne** est exactement `Incrément : EVOL mini-langage-json-et-edition` · commit du prompt (message
exact ci-dessus).

## ÉTAPE 2 — Livrable A : le JSON renvoyé

Une zone de plus **après la classe fabriquée** (la `figure.extrait` qui porte `#mini-classe`,
`index.html` lignes 328-331) : le JSON que l'API renverrait, avec les seules propriétés cochées et
les seules lignes retenues par le filtre.

- Titre `section4.json.titre`, phrase d'appui `section4.json.intro`, cadre
  `<pre tabindex="0" role="region">` nommé par son titre, contenu posé par `textContent` dans le
  `render()` de `mountMiniLanguage` (`js/minilangage.js`, ligne 705) — les zones neuves se
  rafraîchissent au même rendu que le statut et la classe, jamais dans un rendu à part.
- Les noms de propriétés sont ceux du **modèle de la langue courante** (`currentModel()`) : le JSON
  se réécrit à la bascule de langue comme la classe le fait déjà.
- Une propriété dont la jointure ne trouve rien vaut **`null`**, écrit `null` sans guillemets.
  C'est le comportement que le livrable C rend visible sous le doigt.
- Les entiers et les décimaux sortent **sans** guillemets, les textes **avec**. Pas de virgule
  après le dernier objet. (`JSON.stringify` avec indentation fait exactement cela ; si tu écris
  autre chose, dis pourquoi.)
- **Le bloc est plafonné en hauteur** avec défilement vertical propre : sans filtre il porte
  dix-huit objets.
- Aucune colonne cochée : le bloc affiche `section4.json.vide` — **il le dit, il ne disparaît
  pas.**
- Expression refusée : le bloc affiche `section4.refusRien` — **une demande refusée ne part pas au
  serveur, et la page le montre au lieu de garder un état périmé.** *(Arbitrage du chef de projet,
  session 19.)*

## ÉTAPE 3 — Livrable B : la requête, et le vis-à-vis qui la justifie

Sous le JSON, **le texte de la requête que le serveur bâtirait**. Il n'est jamais exécuté : c'est
une illustration, et le code le dit en commentaire.

**Le cadre ne contient que du SQL. Rien d'autre. Jamais.** *(Décision 9 du §0 septies — demandée
deux fois par le chef de projet : la maquette qui mêlait `? = "…"` au SQL lui a fait demander deux
fois si ce code fonctionnait, et ce qui trompe l'auteur trompera le lecteur.)* Les valeurs vivent
**dessous**, dans un bloc étiqueté `section4.valeurs.titre`, numérotées dans l'ordre des `?`
(`section4.valeurs.intro`) ; sans condition, le bloc affiche `section4.valeurs.aucune` ; sur refus,
le cadre SQL affiche `section4.refusRien` comme le JSON.

**Forme des valeurs affichées** *(arbitrage session 19)* : une valeur **texte** s'affiche entre
guillemets droits `"…"` — c'est de la **délimitation**, pas du SQL : elle rend visibles les espaces
et les apostrophes que la valeur porte. Une borne **numérique** s'affiche nue : un paramètre est
typé, un nombre n'est pas un texte.

**La requête paramétrée, toujours affichée** : le `select` sur les colonnes cochées, dans l'ordre
du modèle ; les jointures **seulement quand une colonne les exige** — une colonne de `CLIMST`
amène `CLIMST`, une colonne de `CMLIV` amène `CMLIV`, `LIBLIV` amène `CMLIV` **et** `MODLIV`
(jointures sur nom plus prénom, puis `LIZEPO = CODLIV`), qu'elle soit cochée **ou filtrée** ; la
clause `where` où chaque valeur est remplacée par un `?`, deux pour un « compris entre ». Une ligne
étiquette le mot (`section4.requete.parametre`) : un `?` est un **paramètre**, la valeur voyage à
côté du texte de la requête et jamais dedans.

**Une colonne physique n'est lue qu'une fois.** *(Décision 11 du §0 septies.)* `montantBrut` et
`montantCommande` sortent tous deux de `MTTCDE` (`PHYSICAL_MODEL`, entrées 7 et 8) : le `select`
lit `CDEMST.MTTCDE` **une fois**. Sans ce dédoublonnage la requête afficherait
`CDEMST.MTTCDE, CDEMST.MTTCDE`, qu'aucune API n'écrirait — le doublon a déjà mordu une fois sur la
maquette (§10 bis, défaut 7). **Le JSON, lui, garde les deux propriétés** : c'est le modèle qui les
distingue, pas la requête.

**Les bornes de montant sont traduites avant de partir en paramètre.** Le fichier stocke
`000012550` pour 125,50 : `125` part donc en `12500`. Sans cette traduction, la requête affichée ne
trouverait pas ce que le simulateur montre, et la page mentirait sur son propre mécanisme. La ligne
`section4.valeurs.borne` le dit au lecteur, sous la valeur traduite. **La règle vit dans
`js/s36.js`** : une fonction neuve, inverse de `parseImplicitDecimal`, exportée à côté d'elle,
testée dans `tests/s36.test.js` **dans les deux sens** — jamais un second calcul écrit dans le
module du langage. Seules les bornes des colonnes de type **décimal** sont traduites ; une borne
texte ou entière part telle quelle.

**Le vis-à-vis, et c'est le cœur de cet incrément.** Quand une valeur saisie **contient une
apostrophe**, un second cadre apparaît **au-dessus** du premier, étiqueté `section4.requete.naive` :
la requête qu'une API naïve aurait fabriquée en collant les textes bout à bout, valeur comprise.
Deux phrases, une par cadre — `section4.requete.phraseNaive` sous le cadre naïf,
`section4.requete.phraseParametree` sous le cadre paramétré, cette seconde visible **seulement** en
vis-à-vis (la ligne du `?`, elle, est toujours là).

**Réserve de rédaction, et elle est stricte.** Deux phrases, pas trois. Cette page n'est pas un
cours de sécurité : elle montre deux textes côte à côte et laisse le lecteur conclure. **La page
n'écrit nulle part qu'elle est sûre** (S-2). Elle ne prétend pas non plus que le code d'origine
procède ainsi. **Le cadre naïf n'apparaît jamais sans apostrophe dans la valeur** : sur une demande
ordinaire, la page reste sobre.

## ÉTAPE 4 — Livrable C : l'édition des données par le lecteur

Les dix-huit commandes deviennent modifiables **après un bouton** (`section4.edition.bouton`,
posé entre la légende et le fichier `CDEMST`), jamais d'emblée. *(Arbitrage du chef de projet,
21 août 2026.)* Le bouton bascule (`aria-pressed`) ; ouvert, une phrase d'appui
(`section4.edition.note`) dit que tout se rejoue.

**Le motif, et il doit survivre à cet incrément. Reporte-le en commentaire dans le code.** Le
bouton fabrique une **intention**. Sans lui, le lecteur qui casse une jointure a fait une fausse
manœuvre : il subit un message qu'il ne comprend pas. Avec lui, il a d'abord décidé d'ouvrir les
données, puis choisi sa cellule ; quand la conséquence arrive, elle répond à une question qu'il
vient lui-même de poser. **On n'apprend pas d'un accident, on apprend d'une expérience.** C'est la
thèse du site en petit : la jointure par les valeurs est fragile, et le lecteur ne le croit pas
parce qu'on l'écrit, il le sait parce qu'il l'a cassée de ses mains.

- **Seules les commandes sont modifiables.** Les trois autres fichiers ne le sont pas — et c'est
  une propriété voulue : `CLIMST` continue de montrer la graphie d'origine, le lecteur répare en
  lisant l'autre fichier. C'est la jointure par les valeurs enseignée par le geste même de la
  réparation.
- Une modification rejoue aussitôt le filtre, la jointure, la classe, le JSON et la requête —
  le `render()` existant, encore.
- **La valeur est prise telle que tapée.** La page ne corrige pas à la place du lecteur ; la
  jointure sans casse (retouche `sameCustomer`, prescrite au périmètre) fait que « durand »
  retrouve DURAND, et qu'un **autre nom** casse.
- Quand une modification casse la jointure, un message d'**information** apparaît sous le tableau
  des commandes. Jamais rouge, jamais un message d'erreur : **casser n'est pas une faute, c'est la
  démonstration.** Il se compose de `section4.edition.jointure.une` ou `.plusieurs` (titre), puis
  `.corps` : il nomme la ou les commandes orphelines (numéro, nom, prénom) et dit que les trois
  propriétés jointes rendent `null`. Il disparaît dès que la jointure se ressoude. Il entre
  élément par élément, `textContent` seul, zone `aria-live="polite"`.
- **Si une commande orpheline est sortie du résultat par le filtre en cours, le message le dit**
  (`.filtreUne` / `.filtrePlusieurs`). *(Arbitrage session 19, et il vient d'une morsure réelle :
  le chef de projet a cassé DURAND sous un filtre « commence par DUR », la ligne cassée a quitté le
  résultat, et il a cherché un `null` qui n'avait nulle part où s'afficher. Sans cette phrase, le
  premier lecteur qui modifie la colonne que son filtre teste conclura que la démonstration ment.)*
- **Le clavier du téléphone corrige et met en capitale de son propre chef.** Correcteur, correction
  automatique et capitalisation coupés sur les cellules modifiables, comme le champ du filtre l'a
  déjà fait (`index.html`, lignes 315-316). *(Mesuré sur iPhone 14 le 21 août 2026.)*
- **La légende retrouve son sens.** `section4.legende.modifier` reprend la phrase d'origine de
  l'avenant 2, FR : « Modifier une cellule teintée casse un lien. Modifier une autre ne change rien
  au lien. » — EN : « Changing a tinted cell breaks a link. Changing any other changes nothing
  about the links. » C'est la **seule** valeur existante que tu réécris.

## ÉTAPE 4 bis — Livrable D : les ponts de noms

Le lecteur voit un tableau qui dit `VILCLI` et un filtre qui exige `villeClient`, et rien ne les
relie à l'endroit où il agit. Pour `nomClient` il devine ; pour `codeModeLivraison` face à
`LIZEPO`, personne ne peut deviner — c'est la thèse même du site que ces noms-là ne portent aucun
sens. Le pont existe déjà à deux endroits, mais loin et implicites : l'argument a2 en tête de
section, et les commentaires de la classe fabriquée, un écran plus bas et pour les seules colonnes
cochées. Ce livrable pose le rappel **là où le lecteur coche**. *(Relevé par le chef de projet,
session 19, à tête reposée sur la maquette.)*

Trois pièces, montrées avant d'être expliquées :

- **L'origine physique sous chaque case.** Dans `buildColumns` (`js/minilangage.js`, lignes
  640-667), chaque étiquette gagne, après le nom exposé, un rappel discret `COLONNE · FICHIER`
  (`entry.column` et `entry.file`, séparés d'un point médian) — gris, petite taille, jetons CSS
  existants. **Ces rappels ne se traduisent pas** : les noms physiques sont la moitié du pont qui
  ne bouge jamais. Effet de bord voulu, à ne pas « corriger » : `montantBrut` et
  `montantCommande` affichent tous deux `MTTCDE · CDEMST` — le couple de la décision 11 devient
  visible à l'endroit même où l'on coche, avant que la requête ne le dédoublonne.
- **La note au-dessus de la liste**, clé `section4.colonnes.note`, posée par `data-i18n` entre le
  titre « Colonnes voulues » et la liste. Formulation gelée du chef de projet, aux valeurs
  ci-dessous. La référence est une **mention en toutes lettres, pas un lien** : une ancre neuve
  grossirait la dette [W22] des ancres que rien ne garde.
- **Les deux sous-titres de la section 3**, qui donnent à la référence sa cible :
  `section3.sousTitre`, posé juste sous le `<h2>` de « La solution » (`index.html`, ligne 102,
  avant `section3.intro`), et `section3.renversement.sousTitre`, posé juste sous le `<h3>` du
  renversement (ligne 149, avant `renversement.p1`). Deux éléments `<p class="sous-titre">` avec
  leur `data-i18n` ; la classe `sous-titre` reçoit une règle sobre dans `css/styles.css` — jetons
  existants, **aucune teinte neuve**.

Aucune logique pure neuve dans ce livrable : c'est du câblage et du dictionnaire. La parité des
clés est gardée par la suite existante ; déclare dans `changes.md` que le rendu des origines
relève de la famille [W13], comme le reste du câblage.

## Les valeurs, gelées

**Vingt-trois clés neuves par langue sous `section4`** et **deux sous `section3`**, plus la
réécriture de `legende.modifier` ci-dessus. Parité attendue en fin d'incrément : **`section4`
117 = 117**, et la parité globale reste gardée par la suite. Treize clés de `section4` sont posées
par `data-i18n` dans le HTML (`grep -c 'data-i18n="section4' index.html` passe de 24 à **37**) —
les treize : `json.titre`, `json.intro`, `requete.titre`, `requete.intro`, `requete.naive`,
`requete.phraseNaive`, `requete.parametree`, `requete.phraseParametree`, `requete.parametre`,
`valeurs.titre`, `colonnes.note`, `edition.bouton`, `edition.note` — et les deux clés de
`section3` aussi (`grep -c 'data-i18n="section3' index.html` passe de 58 à **60**). Les dix autres
(`json.vide`, `refusRien`, `valeurs.intro`, `valeurs.aucune`, `valeurs.borne`, les cinq
`edition.jointure.*`) sont servies par le module au rendu, via le dictionnaire reçu. Les gabarits `{…}` se
remplissent par le `fill()` existant (`js/minilangage.js`, ligne 548). Aucun cadratin, aucun des
six mots interdits, aucune forme `<…:…:…/>`.

**Français**

- `json.titre` : Le JSON que l'API renverrait
- `json.intro` : Seules les propriétés cochées, seules les lignes retenues par le filtre. Une jointure qui ne trouve rien s'écrit null, sans guillemets.
- `json.vide` : aucune colonne choisie : il n'y a rien à renvoyer
- `refusRien` : La demande est refusée : rien ne part au serveur.
- `requete.titre` : La requête que le serveur bâtirait
- `requete.intro` : Jamais exécutée : une illustration. Le cadre ne contient que du SQL ; les valeurs vivent dessous, dans leur propre bloc.
- `requete.naive` : Ce qu'une API naïve aurait fabriqué
- `requete.phraseNaive` : L'apostrophe de la valeur referme le texte : la suite devient de la grammaire de requête, et une condition toujours vraie ramènerait le fichier entier.
- `requete.parametree` : La requête paramétrée
- `requete.phraseParametree` : La valeur est restée une donnée : un nom de client, et ce client n'existe pas.
- `requete.parametre` : Un ? est un paramètre : la valeur voyage à côté du texte de la requête, jamais dedans.
- `valeurs.titre` : Valeurs des paramètres
- `valeurs.intro` : Dans l'ordre des ? de la requête :
- `valeurs.aucune` : Aucun paramètre : la demande ne porte aucune condition.
- `valeurs.borne` : borne traduite : {avant} devient {apres}, les décimales implicites du fichier
- `colonnes.note` : Ces noms sont ceux que le modèle C# expose (voir la sous-section « Avec un modèle de données C# », à la section 3). Le fichier, lui, garde les siens : ils sont rappelés en gris, avec le fichier d'où chacun sort.
- `section3.sousTitre` : Avec un modèle de données C#
- `section3.renversement.sousTitre` : Le modèle dynamique arrive
- `edition.bouton` : Modifier les données
- `edition.note` : Les commandes sont ouvertes à l'écriture. Modifiez une cellule : le filtre, la jointure, la classe, le JSON et la requête se rejouent aussitôt.
- `edition.jointure.une` : Une commande ne retrouve plus son client.
- `edition.jointure.plusieurs` : {n} commandes ne retrouvent plus leur client.
- `edition.jointure.corps` : La jointure par les valeurs ne trouve plus de ligne correspondante dans CLIMST ni CMLIV pour {liste} : les trois propriétés jointes, villeClient, codeModeLivraison et libelleModeLivraison, rendent null. La graphie d'origine reste lisible dans CLIMST : rétablissez-la et le lien se ressoude.
- `edition.jointure.filtreUne` : La commande {liste} ne satisfait plus le filtre en cours : elle a disparu du résultat, et le JSON ne peut pas montrer ses null. Videz ou élargissez le filtre pour les voir.
- `edition.jointure.filtrePlusieurs` : Les commandes {liste} ne satisfont plus le filtre en cours : elles ont disparu du résultat, et le JSON ne peut pas montrer leurs null. Videz ou élargissez le filtre pour les voir.

**Anglais**

- `json.titre` : The JSON the API would return
- `json.intro` : Only the ticked properties, only the rows the filter keeps. A join that finds nothing is written null, without quotation marks.
- `json.vide` : no column chosen: there is nothing to return
- `refusRien` : The request is refused: nothing is sent to the server.
- `requete.titre` : The query the server would build
- `requete.intro` : Never executed: an illustration. The frame holds nothing but SQL; the values live below it, in a block of their own.
- `requete.naive` : What a naive API would have built
- `requete.phraseNaive` : The apostrophe in the value closes the text: what follows becomes query grammar, and an always-true condition would bring back the whole file.
- `requete.parametree` : The parameterised query
- `requete.phraseParametree` : The value stayed a piece of data: a customer name, and no such customer exists.
- `requete.parametre` : A ? is a bind parameter: the value travels beside the query text, never inside it.
- `valeurs.titre` : Parameter values
- `valeurs.intro` : In the order of the ? marks in the query:
- `valeurs.aucune` : No parameter: the request carries no condition.
- `valeurs.borne` : bound translated: {avant} becomes {apres}, the file's implicit decimals
- `colonnes.note` : These names are the ones the C# model exposes (see the subsection "With a C# data model", in section 3). The file keeps its own: they are recalled in grey, with the file each one comes from.
- `section3.sousTitre` : With a C# data model
- `section3.renversement.sousTitre` : The dynamic model arrives
- `edition.bouton` : Edit the data
- `edition.note` : The orders are open for writing. Change a cell: the filter, the join, the class, the JSON and the query all replay at once.
- `edition.jointure.une` : One order can no longer find its customer.
- `edition.jointure.plusieurs` : {n} orders can no longer find their customer.
- `edition.jointure.corps` : The join on values no longer finds a matching row in CLIMST or CMLIV for {liste}: the three joined properties, customerCity, deliveryModeCode and deliveryModeLabel, return null. The original spelling is still visible in CLIMST: restore it and the link mends.
- `edition.jointure.filtreUne` : Order {liste} no longer satisfies the current filter: it has left the result, so the JSON cannot show its nulls. Clear or widen the filter to see them.
- `edition.jointure.filtrePlusieurs` : Orders {liste} no longer satisfy the current filter: they have left the result, so the JSON cannot show their nulls. Clear or widen the filter to see them.

*(Le vis-à-vis est le passage le plus délicat de la section : les valeurs anglaises ci-dessus ne
sont **pas** une traduction mot à mot, et elles n'ont pas à le devenir. Règle S-4. « naive » s'écrit
sans tréma en anglais, c'est voulu.)*

## ÉTAPE 5 — Tests

Les suites s'étendent, **logique pure, aucun DOM**. Les fonctions neuves du module du langage
(rendu JSON, fabrication des deux textes de requête, détection des orphelines) sont **exportées et
testées** ; le câblage reste dans `mountMiniLanguage`, inerte sous Vitest, et tu déclares dans
`changes.md` ce que la famille [W13] ne garde pas.

1. **Le rendu JSON** : `null` pour une jointure sans correspondance ; guillemets pour les textes,
   pas pour les nombres ; aucune virgule après le dernier objet ; sélection vide distinguée d'un
   résultat vide ; les noms de propriétés suivent le modèle passé (les deux langues testées).
2. **La requête paramétrée** : les jointures n'apparaissent **que** quand une colonne les exige —
   cochée ou filtrée, les deux chemins testés ; un `?` par valeur, deux pour « compris entre » ;
   **le dédoublonnage** : `montantBrut` et `montantCommande` cochés ensemble donnent **une**
   lecture de `CDEMST.MTTCDE` au `select` pendant que le JSON porte les deux propriétés.
3. **La traduction des bornes** (`tests/s36.test.js`) : `125` devient `12500` ; l'aller-retour avec
   `parseImplicitDecimal` rend la valeur de départ ; une borne d'une colonne texte ou entière n'est
   **pas** traduite.
4. **Le vis-à-vis** : le texte naïf porte la valeur **collée** ; le texte paramétré porte des `?`
   et **jamais** la valeur — un test vérifie que la valeur d'injection n'apparaît pas dans le texte
   paramétré ; le texte naïf n'est fabriqué **que** si une valeur porte une apostrophe, l'absence
   est testée.
5. **La rupture de jointure** : après remplacement d'un nom, la commande touchée rend `null` sur
   les trois propriétés jointes, et **seulement** sur celles-là ; **la casse ne casse pas** —
   « durand » retrouve DURAND (retouche `sameCustomer`, testée dans les deux sens) ; la détection
   des orphelines **hors du résultat filtré** est testée comme logique pure (une orpheline dans le
   résultat, une orpheline exclue par le filtre, zéro orpheline).

## ÉTAPE 6 — Preuves

À écrire dans `changes.md`, **chaque nombre étiqueté avant/après, chaque procédure ancrée sur un
sha figé, jamais `HEAD`** (leçons des 16 et 17 août) :

- Comptages **en occurrences** : cadratins 10 / 1 / 8 inchangés aux trois fichiers ; `innerHTML`
  0 ; `<script` 2 → 2 ; `data-i18n="section4` 24 → 37 ; `data-i18n="section3` 58 → 60 ; parité
  `section4` 94 → 117, les deux
  langues ; captures `SEQUENCE_IMPRIMEE` 4 et 4, **inchangées** ; aucun des six mots interdits
  dans les valeurs livrées, motif joué **par langue** (le garde-fou borgne de `/refusal/i` est la
  leçon du 22 août : deux langues sont deux mesures).
- **Preuve propre à cet incrément** : la valeur saisie par le lecteur est réaffichée dans deux
  textes de requête. Montre, commande à l'appui, qu'elle y entre par `textContent` et **jamais**
  par `innerHTML`, et qu'une valeur portant des chevrons ne produit **aucun élément** dans la page.
- Débordement horizontal nul à 320 px et 390 px sur les états neufs : édition ouverte, vis-à-vis
  affiché, JSON plein, message de jointure visible.

## ÉTAPE 7 — HANDOFF (dernier geste)

`.pipeline/changes.md` + `.pipeline/test-results.md` · un commit, staging précis · **délègue la
revue au subagent `reviewer`** (→ `review.json`) · `.pipeline/STATUS.md` =
`READY — EVOL mini-langage-json-et-edition — <ISO> — feat/mini-langage-json-et-edition — tests <X/Y>` ·
**STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Le JSON rendu sous la classe, plafonné en hauteur, `null` sans guillemets où la jointure ne
   trouve rien, le bloc présent même sans colonne cochée.
2. La requête paramétrée toujours affichée ; **le cadre ne contient que du SQL** ; jointures
   seulement quand une colonne l'exige ; le `?` étiqueté.
3. Les valeurs des paramètres dans leur bloc, numérotées ; texte entre guillemets droits, bornes
   numériques nues ; la borne décimale traduite par la fonction de `js/s36.js`, avec sa ligne.
4. `CDEMST.MTTCDE` lu **une fois** au `select` quand les deux propriétés de montant sont cochées ;
   le JSON garde les deux.
5. Le cadre naïf **uniquement** quand une valeur porte une apostrophe, au-dessus, avec ses deux
   phrases et pas trois.
6. Les commandes modifiables après le bouton, elles seules ; claviers du téléphone coupés sur les
   cellules ; le message d'information jamais rouge, nommant les orphelines, disparaissant à la
   réparation, et disant quand une orpheline est sortie du résultat par le filtre.
7. La jointure compare sans la casse ; « durand » retrouve DURAND ; un autre nom casse. Testé.
8. `legende.modifier` porte de nouveau ses deux phrases d'origine, FR et EN ; c'est la seule
   valeur existante réécrite.
9. Sur une expression refusée, les cadres JSON et SQL affichent `refusRien` ; rien d'autre ne
   subsiste d'un état antérieur.
10. **Les ponts de noms** : chaque case porte son origine `COLONNE · FICHIER` en gris, y compris
    le couple `MTTCDE · CDEMST` en double ; la note gelée au-dessus de la liste ; les deux
    sous-titres de la section 3 présents, dans les deux langues, et la sous-section que la note
    nomme existe donc réellement.
11. Parité `section4` **117 = 117** ; `data-i18n` 37 et 60 ; cadratins, `SEQUENCE_IMPRIMEE`,
    `<script` et `innerHTML` inchangés ; les cinq familles de tests vertes, base 210 relevée
    avant/après.
12. `review.json` en `SHIP` pour cet incrément et ce commit ; `READY` écrit en dernier.

---
*Second gel du 23 août 2026, session 19, depuis le brouillon v3 — le premier gel du jour, jamais
exécuté, y gagnait le livrable D. Second des deux sous-incréments de la section « Le
mini-langage ». La réserve du §8 ter est consignée au bandeau, non tranchée : elle se reporte dans
`changes.md`, elle ne s'exécute pas.*

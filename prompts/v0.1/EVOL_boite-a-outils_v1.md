# EVOL — Section « La solution » : la boîte à outils, en bloc dépliable natif, FR et EN

**Fichier** : `prompts/v0.1/EVOL_boite-a-outils_v1.md`
**Type** : EVOL (contenu + mise en forme + accessibilité) · **Branche** : `feat/boite-a-outils` · **Révision** : v1 · **Date** : 20 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `UX_METHOD` | — | Appliqué, **mesuré** | Mobile-first, au sens strict de la feuille (`css/styles.css` ligne 7 : « l'écran large est un enrichissement »). Le bloc dépliable est l'élément natif `details`/`summary` : aucun script, aucune dépendance, utilisable au clavier par construction. Le tableau **rentre à 320 px** avec cinq pixels de reste, calage de cellule réduit en base et rétabli dès 22 rem : rendu et mesures du 20 août 2026, tableau de neuf lignes dans sa forme finale, polices IBM Plex du dépôt. Le conteneur `overflow-x: auto` reste en place comme filet, atteignable au clavier par `tabindex="0"` : la page ne défile horizontalement à **aucune** largeur, vérifié de 320 à 600 px. Focus visible par la règle globale `:focus-visible` déjà en place. |
| `STYLE_METHOD` | 1.1 | Appliqué | Trente-quatre valeurs fournies ci-dessous, relues : S-1 (aucun cadratin, **y compris dans une cellule de tableau**), S-2 (aucun adjectif sur soi), S-3 (rien qui range une compétence en dessous), S-4 (chaque langue s'adresse à son lecteur : le côté anglais emploie les termes .Net attendus, `backing field`, `get and set`). Les **noms de classes sont du code** : écrits en dur dans le HTML, identiques dans les deux langues, ils n'entrent pas au dictionnaire (précédent `[HttpGet]` déjà en place dans le dessin 1, décision du 20 août 2026). **Ne réécris ni la prose existante ni les valeurs existantes.** |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre dans la page par `textContent`, comme toute valeur du dictionnaire ; **jamais `innerHTML`**. Aucune dépendance, aucun script. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `ASSURANCE_METHOD` | 1.2 | Écarté, hésitation nommée | Aucune porte créée ni modifiée. Les deux portes existantes couvrent mécaniquement les clés ajoutées (parité FR/EN, résolution HTML vers dictionnaire). L'hésitation : le contrôle d'accessibilité du motif de dépliement pourrait appeler une porte ; elle exigerait un environnement DOM qui n'existe pas sous Vitest (famille [W13], `tasks/ROADMAP.md`) — le contrôle est donc **déclaré dans `changes.md`** et la validation sur appareil reste au chef de projet. N'installe rien. |
| `VISION_METHOD` | — | Écarté, hésitation nommée | Le rendu à 320 px est précisément ce que ce satellite mesurerait ; ses gates arrivent au jalon 2 (`tasks/ROADMAP.md`). La validation visuelle et tactile reste au chef de projet. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_boite-a-outils_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact : `CLAUDE.md` (sections « Style du produit » et « Anonymisation ») et `tasks/ROADMAP.md` (ligne 5 du fil ; dettes [W19] et [W28]). Les notes de contenu (`../Etude_Technique/NOTES_CONTENU_la-solution_v15.md`, §4) sont hors dépôt : tout ce qui en est nécessaire est reproduit ici, tu n'as pas à les ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.14** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 16`.
3. `npm test` vert sur `main` (**134/134**).
4. Les trois extraits existent : `grep -c '<figure class="extrait">' index.html` = **3** (pré-condition posée par le fil : l'incrément des extraits est atterri).
5. Aucun motif de dépliement encore : `grep -c '<details' index.html` = **0** ; `grep -c '<table' index.html` = **0** ; `grep -c '<summary' index.html` = **0** ; `grep -c '<tr' index.html` = **0**.
6. Accessibilité, état de départ : `grep -c 'aria-labelledby' index.html` = **0** ; `grep -c 'role="region"' index.html` = **0** ; `grep -c 'tabindex="0"' index.html` = **3** ; `grep -c 'id="' index.html` = **10**.
7. `grep -c 'boite' js/i18n.js` = **0** ; `grep -c 'boite' css/styles.css` = **0** ; `grep -c 'defile' css/styles.css` = **0**.
8. Autres bases de comptage, relevées le 20 août 2026 sur `main` : `grep -c '<code' index.html` = **4** ; `grep -c '<script' index.html` = **2**.
9. Requêtes de média, état de départ : `grep -c '^@media' css/styles.css` = **2** (survol, réduction d'animation : deux requêtes de **capacité**) ; `grep -c '^@media (min-width' css/styles.css` = **0** ; `grep -c '22rem' css/styles.css` = **0**. **La règle de cet incrément est donc la première requête de largeur en service du fichier.** Ne « harmonise » rien ailleurs à cette occasion : le point de rupture 48 rem reste sans règle, c'est un état voulu et commenté dans la feuille.

## Contexte et périmètre

Cinquième incrément du fil. La section « La solution » raconte au temps 3 que la machine fabrique la classe ; l'extrait `code3` dit en légende que la fabrication est « appelée, pas montrée ». Cet incrément la montre, pour qui choisit d'aller voir : la **boîte à outils** de fabrication du modèle dynamique, en **tableau ordonné et numéroté**, dans un **bloc dépliable natif replié par défaut**. La forme tableau est une décision du chef de projet (18 août 2026) : ce qui porte le sens est **l'ordre**, jamais la liste. Le récit principal ne cite aucun de ces noms ; c'est pourquoi ils vivent dans le bloc replié, seul contenu dense du site.

**Neuf lignes dans le tableau, deux classes hors du tableau — arbitrages du chef de projet, 20 août 2026.** Le tableau des notes (`NOTES_CONTENU_la-solution_v15.md`, §4) portait neuf lignes, la neuvième réunissant `Dictionary` et `List`. Trois faits l'ont défaite. **Un** : ces deux classes ne sont pas des étapes de la chaîne, elles ne dépendent d'aucune des huit et aucune ne dépend d'elles ; numérotées à la suite, elles démentent la phrase d'introduction qui annonce un ordre contraignant, et l'ordre est la seule raison d'être de la forme tableau. **Deux** : elles sont **déjà visibles** dans les extraits en amont, mesuré le 20 août sur `js/i18n.js` : `Dictionary` **10 fois**, `List<` **6 fois** ; les huit autres, **zéro fois** dans tout le dépôt. La boîte à outils nomme ce que le site ne montre pas ; ces deux-là, il les montre. **Trois** : neuf lignes nommaient **dix** classes, la neuvième en portant deux ; « les neuf classes » comptait donc des lignes en croyant compter des classes. Les deux collections passent donc **sous** le tableau, en prose, avec leur notation générique `Dictionary<>` et `List<>` : les chevrons vides marquent seuls qu'elles sont d'une autre nature que les noms nus du tableau.

**La neuvième ligne est `Activator` — second arbitrage du même jour, et il ne rétablit pas celle qu'on vient de retirer.** `Activator` **ne casse pas** l'ordre, au contraire de `Dictionary` et `List` : il ne peut rien faire avant que `CreateType` ait rendu la classe, il est donc le neuvième maillon et non un neuvième objet posé à la suite. La phrase d'introduction s'allonge d'un cran pour le dire, et l'échelle se lit maintenant entière, à l'envers : pas d'instance sans classe, pas de classe sans module, pas de module sans assemblage. Le tableau va ainsi d'un nom d'assemblage jusqu'à l'objet rempli, ce qui est exactement le trajet que le dessin 2 raconte sans le nommer (« la verser dans le modèle », « une instance par ligne »).

**La cellule porte `Activator` seul, et la méthode est nommée dans la description** : mesuré le 20 août 2026, `Activator.CreateInstance` dans la colonne du milieu, insécable comme tout code, élargit le tableau de soixante-cinq pixels à 320 px, quarante-neuf à 360 px et **dix-neuf à 390 px** — il déborderait donc sur l'appareil de validation lui-même. Avec `Activator` seul, les marges redeviennent celles mesurées avant l'ajout de cette ligne, onze pixels de reste à 320 px. La description dit « sa méthode CreateInstance », en texte courant : le nom est sur la page, la colonne reste une colonne de classes, et la largeur tient. Ne remonte pas `CreateInstance` dans la cellule.

**Ce que disent les deux phrases hors tableau — apport du chef de projet, 20 août 2026.** `Dictionary<>` porte ce qui entre, `List<>` porte ce qui sort et **c'est elle qui part en flux JSON**. Les deux collections encadrent la chaîne au lieu d'y appartenir, et c'est cela que la prose dit. Le site nomme déjà « la liste » **trois fois** sans jamais nommer sa classe (dessin 2, étapes 5 et 6 : « ajouter l'instance à la liste », « convertir la liste en flux JSON » ; dernier commentaire de `code3` : « la liste part ensuite en JSON »). Ces deux phrases posent le nom sur un objet que le lecteur a déjà rencontré trois fois : c'est leur seul travail, elles ne racontent rien de neuf.

**Frontière du code recréé, à tenir si elle est discutée en revue.** La neuvième description dit « une par ligne renvoyée », et c'est vrai de **l'extrait publié** : dans `code3`, en ligne depuis la 0.1.11 et prouvé à l'exécution (M-11, M-12), `Activator.CreateInstance` est appelé **dans la boucle des lignes**. Le prototype, lui, emploie la même classe à deux endroits et pour deux rôles : une fois par ligne pour les instances, et une fois hors boucle pour fabriquer l'**enveloppe de sortie** qui recevra ensuite la liste, la version et le nombre d'éléments. Le site ne raconte que le premier rôle, parce que l'enveloppe supposerait un **second type fabriqué à l'exécution**, donc une seconde histoire, et que le dessin 2 dit déjà ce que l'enveloppe contient sans avoir à la nommer. La description reste donc telle qu'elle est écrite : elle décrit le mécanisme que le lecteur a sous les yeux, pas l'intégralité du prototype. Précision apportée par le chef de projet le 20 août 2026, versée aux notes de contenu, **sans effet sur ce livrable**.

**Deux précisions volontairement absentes**, à connaître si elles sont réclamées en revue. La première : `Type.InvokeMember`, qui remplit l'enveloppe de sortie (la version, le nombre d'éléments), n'apparaît nulle part. Le site dit ce que l'enveloppe contient, jamais comment elle est remplie, et ce n'est pas le sujet de la chaîne de fabrication. Ne l'ajoute pas. La seconde : chaque ligne renvoyée est elle aussi un dictionnaire, mais typée par l'interface `IDictionary` et non par la classe `Dictionary` (visible dans `code3`). La phrase hors tableau ne le dit pas, parce que la boîte à outils nomme des **classes** et qu'une interface n'en est pas une. Ne l'ajoute pas.

**Cet incrément établit le motif de dépliement** pour tout le site : élément natif, clés bilingues, contrôle d'accessibilité. Il rembourse aussi la dette **[W19]** (`tasks/ROADMAP.md`), dont l'échéance est cet incrément : rôle et nom accessibles des trois extraits et des sections de `main`.

**Périmètre** : `js/i18n.js` (trente-quatre valeurs, dix-sept clés par langue), `index.html` (le bloc dépliable ; les attributs de [W19]), `css/styles.css` (une famille de règles, fournie). **Rien d'autre.**

**Hors périmètre, explicitement.** Aucun script, aucune dépendance, aucun test ajouté, aucune image, aucun SVG, aucune animation d'ouverture, aucun autre bloc dépliable, aucune modification des valeurs existantes du dictionnaire, aucune règle CSS hors de la famille fournie. Les dettes [W26], [W27], [W28] et [W20] restent ouvertes : **n'y touche pas**. Si quelque chose te semble manquer, signale-le dans `changes.md`, n'y touche pas.

**Les clés ajoutées sont en français** (`boite`, `resume`, `colonne1`, `ligne1`…), comme les groupes existants de la section. C'est délibéré et tracé dans `tasks/ROADMAP.md` (arbitrage en attente sur la langue des clés). Les identifiants HTML ajoutés suivent les identifiants existants (`decor`, `probleme`…), donc le français aussi. Ne les renomme pas.

**Sémantique, leçon [W28]** : le tableau reste un vrai tableau (`table`, `thead`, `th scope="col"`, `tbody`), aucune règle CSS ne retire un rôle natif (`list-style`, `display` sur `table`…). La liste des dessins a déjà payé cette dette ; ne la recrée pas ici.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/boite-a-outils` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL boite-a-outils` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable A : les clés du dictionnaire

Dans `js/i18n.js`, **ajoute** des deux côtés, entre le groupe `renversement` et le groupe `etape` de `section3`, un groupe `boite` portant les clés `resume`, `intro`, `colonne1`, `colonne2`, `colonne3`, `ligne1` à `ligne9`, `hors`, `hors1`, `hors2`. Mêmes clés exactement des deux côtés, aucune valeur existante modifiée. Les valeurs sont reproduites **au caractère près**.

Les trois dernières clés portent les phrases **sous** le tableau. `hors1` et `hors2` commencent par un verbe et **pas** par une majuscule : leur sujet est le nom de classe qui les précède dans le HTML, écrit en dur (même montage que `section3.dessin1.methode`, déjà en place derrière `[HttpGet]`). Ne leur ajoute ni majuscule initiale, ni le nom de la classe.

### Côté français

- **`resume`** : Pour les curieux : la boîte à outils, la chaîne de fabrication classe par classe
- **`intro`** : Dans l'ordre où le programme les emploie : on ne fabrique pas une instance sans classe, ni une classe sans module, ni un module sans assemblage.
- **`colonne1`** : Ordre
- **`colonne2`** : Classe
- **`colonne3`** : Ce qu'elle fait
- **`ligne1`** : donne un nom à l'assemblage qu'on va fabriquer
- **`ligne2`** : crée cet assemblage, en mémoire, pendant que le programme tourne
- **`ligne3`** : crée le module qui contiendra la classe
- **`ligne4`** : déclare la classe elle-même
- **`ligne5`** : déclare la zone qui portera la valeur
- **`ligne6`** : déclare la propriété visible depuis l'extérieur, puis lui rattache ses deux accesseurs une fois qu'ils sont écrits
- **`ligne7`** : déclare les deux accesseurs, celui qui lit la valeur et celui qui l'écrit
- **`ligne8`** : écrit le corps de ces accesseurs, instruction par instruction : trois pour lire, quatre pour écrire
- **`ligne9`** : sa méthode CreateInstance produit une instance de la classe fabriquée, une par ligne renvoyée
- **`hors`** : Deux classes ordinaires encadrent cette chaîne sans en faire partie.
- **`hors1`** : porte ce qui entre : le nom de chaque colonne et son type.
- **`hors2`** : porte ce qui sort : les instances, et c'est elle qui part en flux JSON.

### Côté anglais

- **`resume`** : For the curious: the toolbox, the build chain class by class
- **`intro`** : In the order the program uses them: no instance without a class, no class without a module, and no module without an assembly.
- **`colonne1`** : Order
- **`colonne2`** : Class
- **`colonne3`** : What it does
- **`ligne1`** : names the assembly about to be built
- **`ligne2`** : creates that assembly, in memory, while the program runs
- **`ligne3`** : creates the module that will hold the class
- **`ligne4`** : declares the class itself
- **`ligne5`** : declares the backing field that will hold the value
- **`ligne6`** : declares the property visible from the outside, then attaches its two accessors to it once they are written
- **`ligne7`** : declares the two accessors, the one that reads the value and the one that writes it
- **`ligne8`** : writes the body of those accessors, one instruction at a time: three to read, four to write
- **`ligne9`** : its CreateInstance method produces an instance of the class just built, one per row returned
- **`hors`** : Two ordinary classes bracket that chain without being part of it.
- **`hors1`** : holds what comes in: the name of each column and its type.
- **`hors2`** : holds what goes out: the instances, and it is the one that leaves as a JSON feed.

## ÉTAPE 3 — Livrable B : le bloc dépliable

Dans `index.html`, section `#solution`, **après** la `figure.extrait` portant `section3.renversement.code3` et **avant** le `p` portant `section3.renversement.p3`, ajoute **exactement** ceci, aucun attribut au-delà de ceux écrits ici :

```html
<details class="boite">
  <summary id="boite-titre" data-i18n="section3.boite.resume"></summary>
  <p data-i18n="section3.boite.intro"></p>
  <div class="defile" tabindex="0" role="region" aria-labelledby="boite-titre">
    <table>
      <thead>
        <tr>
          <th scope="col" data-i18n="section3.boite.colonne1"></th>
          <th scope="col" data-i18n="section3.boite.colonne2"></th>
          <th scope="col" data-i18n="section3.boite.colonne3"></th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td><code>AssemblyName</code></td><td data-i18n="section3.boite.ligne1"></td></tr>
        <tr><td>2</td><td><code>AssemblyBuilder</code></td><td data-i18n="section3.boite.ligne2"></td></tr>
        <tr><td>3</td><td><code>ModuleBuilder</code></td><td data-i18n="section3.boite.ligne3"></td></tr>
        <tr><td>4</td><td><code>TypeBuilder</code></td><td data-i18n="section3.boite.ligne4"></td></tr>
        <tr><td>5</td><td><code>FieldBuilder</code></td><td data-i18n="section3.boite.ligne5"></td></tr>
        <tr><td>6</td><td><code>PropertyBuilder</code></td><td data-i18n="section3.boite.ligne6"></td></tr>
        <tr><td>7</td><td><code>MethodBuilder</code></td><td data-i18n="section3.boite.ligne7"></td></tr>
        <tr><td>8</td><td><code>ILGenerator</code></td><td data-i18n="section3.boite.ligne8"></td></tr>
        <tr><td>9</td><td><code>Activator</code></td><td data-i18n="section3.boite.ligne9"></td></tr>
      </tbody>
    </table>
  </div>
  <p data-i18n="section3.boite.hors"></p>
  <p><code>Dictionary&lt;&gt;</code> <span data-i18n="section3.boite.hors1"></span></p>
  <p><code>List&lt;&gt;</code> <span data-i18n="section3.boite.hors2"></span></p>
</details>
```

Les chiffres de la colonne « Ordre » et les noms de classes sont **du code** : en dur, identiques dans les deux langues.

**Les chevrons s'écrivent `&lt;&gt;`**, jamais `<>` en clair : écrits en clair, l'analyseur HTML ouvre une balise et avale la suite de la ligne. C'est le seul piège de mise en forme de cet incrément. Le rendu attendu à l'écran est `Dictionary<>` et `List<>`.

## ÉTAPE 4 — Livrable C : la dette [W19], rôle et nom accessibles

Dans `index.html`, **attributs seulement**, aucun élément ajouté ni déplacé :

1. **Les trois extraits.** Chaque `figcaption` des trois `figure.extrait` reçoit un `id` : `code1-legende`, `code2-legende`, `code3-legende`, dans l'ordre du document. Le `pre` de la même figure reçoit `role="region" aria-labelledby="<id de sa figcaption>"`.
2. **Les sept sections de `main`.** Chaque `h2` reçoit un `id` : `about-titre`, `decor-titre`, `probleme-titre`, `solution-titre`, `mini-langage-titre`, `methode-titre`, `annexe-titre`. Chaque `section` reçoit `aria-labelledby="<id de son h2>"`. Pas de `role="region"` sur les sections : `section` nommée porte ce rôle nativement.

## ÉTAPE 5 — Livrable D : les règles CSS

Dans `css/styles.css`, **après** la famille `/* ---- Dessins */` et **avant** `/* ---- Pied de page. */`, ajoute **exactement** ceci. Aucun autre jeton, aucune autre règle, aucune valeur modifiée ailleurs.

```css
/* ---- Boîte à outils (registre API : bloc dépliable natif, aucun script).
   Repliée par défaut ; le tableau défile dans son conteneur si l'écran est
   plus étroit que lui, jamais la page (CLAUDE.md, UX). */
.boite {
  margin: var(--space) 0;
  border: 1px solid var(--color-line);
  border-left: 3px solid var(--color-api);
}

.boite summary {
  padding: var(--space);
  cursor: pointer;
  font-weight: 600;
}

.boite p {
  margin: 0;
  padding: 0 var(--space);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}

.boite p + p {
  margin-top: calc(var(--space) / 2);
}

.boite p:last-child {
  padding-bottom: var(--space);
}

.boite .defile {
  overflow-x: auto;
  padding: var(--space);
}

.boite table {
  border-collapse: collapse;
  font-size: 0.875rem;
}

.boite th,
.boite td {
  padding: calc(var(--space) / 6);
  border: 1px solid var(--color-line);
  text-align: left;
  vertical-align: top;
}

/* L'aisance de calage est un enrichissement, comme le veut la feuille : la base
   sert la plus petite largeur visée. Mesuré le 20 août 2026 sur le tableau des
   neuf lignes : au calage de --space/2 il déborde de 3 px à 320 px, assez peu
   pour se lire comme un défaut d'affichage et non comme un défilement ; au calage
   de --space/6 il rentre avec 5 px de reste. Dès 360 px il tient au large dans les
   deux cas, d'où la rupture placée juste au-dessus de 320 px. La marge est mince :
   le mot « CreateInstance » de la neuvième description est insécable et fixe à lui
   seul la largeur minimale de la troisième colonne. Le conteneur reste en
   overflow-x: auto, filet si une police de repli mesure plus large. */
@media (min-width: 22rem) {
  .boite th,
  .boite td {
    padding: calc(var(--space) / 2);
  }
}

.boite code {
  font-family: var(--font-mono);
  white-space: nowrap;
}
```

## ÉTAPE 6 — Preuves

1. `npm test` vert : **134/134**, aucun test ajouté ni retiré.
2. Périmètre : `git diff main...HEAD --stat -- . ':!prompts'` : **trois** fichiers, `js/i18n.js`, `index.html`, `css/styles.css`. `git diff main...HEAD -- tests tools .claude assets` : **vide**.
3. Comptages `index.html`, avant et après. **Compte des occurrences, pas des lignes** : `grep -c` compte les lignes, et une ligne de tableau en porte trois. Emploie `grep -o MOTIF index.html | wc -l` pour chacun, et consigne la commande avec le nombre.

   | Motif | Avant | Après |
   |---|---|---|
   | `<details` | 0 | **1** |
   | `<summary` | 0 | **1** |
   | `<table` | 0 | **1** |
   | `<tr` | 0 | **10** |
   | `<th scope` | 0 | **3** |
   | `<td` | 0 | **27** |
   | `<code` | 4 | **15** |
   | `data-i18n="section3.boite` | 0 | **17** |
   | `data-i18n="section3` | 51 | **68** |
   | `tabindex="0"` | 3 | **4** |
   | `role="region"` | 0 | **4** |
   | `aria-labelledby` | 0 | **11** |
   | `id="` | 10 | **21** |

   Trois pièges de comptage, vérifiés le 20 août 2026 sur `main`, à ne pas redécouvrir à tes dépens. **Un** : `grep -c '<th'` renvoie **4** et non 3, parce que `<thead>` contient la chaîne `<th` ; d'où le motif `<th scope`. **Deux** : `data-i18n="section3` vaut **41 lignes mais 51 occurrences** avant l'incrément, les lignes des dessins en portant deux chacune ; le tableau ci-dessus donne les **occurrences**. **Trois** : le tableau porte **dix** `tr` (un d'en-tête et neuf de corps) et **vingt-sept** `td` (neuf lignes de trois cellules) ; un `tr` de plus ou de moins signale une ligne rentrée ou sortie par la fenêtre. ARRÊTE-TOI et signale.
4. Comptages `js/i18n.js`, avant et après, consignés : nombre de clés pointées sous `section3` **identique des deux côtés**, et **+17** par côté. Aucune occurrence de `ligne9` ni de la clé `et` : `grep -c 'ligne9' js/i18n.js` = **0**.
5. Unicité des `id` : aucun doublon dans `index.html` (consigne la commande et son résultat). Les ancres existantes (`#probleme`, `#annexe`…) sont **inchangées**.
6. Cadratins, même règle de comptage qu'aux incréments précédents : `grep -c "—"` sur `js/i18n.js` (**10**), `index.html` (**1**), `css/styles.css` (**7**), avant et après. **Mêmes nombres.** Consigne-les.
7. Aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled` dans les trente-quatre valeurs ajoutées. Consigne la commande et son résultat.
8. `innerHTML` : `grep -c innerHTML js/i18n.js` = **0** avant et après. Aucun `<script` ajouté : `grep -c '<script' index.html` = **2 → 2**.
8 bis. Chevrons échappés : `grep -c 'Dictionary&lt;&gt;' index.html` = **1** et `grep -c 'List&lt;&gt;' index.html` = **1** ; `grep -c 'Dictionary<>' index.html` = **0** et `grep -c 'List<>' index.html` = **0**. Un chevron en clair → ARRÊTE-TOI et signale.
9. Requête de média, après : `grep -c '^@media' css/styles.css` = **2 → 3** ; `grep -c '^@media (min-width' css/styles.css` = **0 → 1** ; `grep -c '22rem' css/styles.css` = **0 → 1**. Une seule requête ajoutée, celle du livrable D, et rien d'autre touché dans le fichier.
10. Contrôle d'accessibilité du motif, **écrit dans `changes.md`**, point par point et avec le périmètre de chaque mesure dans la phrase : le `summary` est atteint par Tab et s'active au clavier (comportement natif de l'élément, cite-le comme tel) ; le conteneur `defile` est atteint par Tab et défile aux flèches quand il déborde ; chaque `pre` et le conteneur portent rôle et nom (l'attribut est posé — dis que c'est l'attribut que tu mesures, pas le rendu) ; le tableau conserve sa sémantique native (aucune règle ne touche `display` des éléments de tableau ni `list-style`). Ce que tu ne peux pas mesurer sans navigateur, **dis-le** tel quel : la validation VoiceOver et le rendu à 320 px restent au chef de projet.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `css/styles.css`) : `feat(solution): boîte à outils en bloc dépliable natif, huit classes en chaîne et deux hors chaîne ; rôle et nom accessibles des extraits et des sections (W19)`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, écris READY. Si `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL boite-a-outils — <ISO> — feat/boite-a-outils — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les **dix-sept** valeurs françaises et les **dix-sept** valeurs anglaises écrites **exactement** comme ci-dessus. Aucune valeur existante modifiée.
2. Le bloc dépliable ajouté à l'emplacement indiqué, **replié par défaut** (aucun attribut `open`), avec les seuls attributs écrits ici. **Neuf lignes** dans le corps du tableau, jamais dix ; `Activator` seul dans sa cellule ; les deux collections en prose sous le tableau, chevrons échappés.
3. Les attributs de [W19] posés sur les trois extraits et les sept sections, rien d'autre.
4. Les règles CSS ajoutées **exactement** comme fournies, à l'emplacement indiqué.
5. Suite verte 134/134. Tous les comptages de l'ÉTAPE 6 conformes. Aucun cadratin ajouté. Aucun `innerHTML`, aucun script.
6. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

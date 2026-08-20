# EVOL — Section « La solution » : les deux dessins, la chaîne écrite à la main et ce que la machine fait à la place

**Fichier** : `prompts/v0.1/EVOL_dessins-section-3_v2.md`
**Type** : EVOL (contenu + mise en forme) · **Branche** : `feat/dessins-section-3` · **Révision** : v2 · **Date** : 20 août 2026

> **Révision v2, avant toute exécution.** La v1, gelée, n'a pas été transmise : elle est remplacée entière par trois décisions du chef de projet des 19 et 20 août : le sous-titre de la case « une classe C# » réécrit ; une **cinquième case** dans la chaîne du dessin 1, le dictionnaire construit par **le mécanisme de la réflexion C#**, nommé sur le dessin parce que l'extrait de code juste en dessous le montre ; le dessin 1 **en colonne à toute largeur**, comme le dessin 2, parce que la rangée de cinq cases devenait illisible en largeur de lecture ; et la chaîne des cinq cases **enfermée dans un cadre qui figure la méthode du contrôleur**, marqué `[HttpGet]`, parce que le message du dessin est là : un modèle de données vit avec une requête figée, l'ensemble correspond à une route HttpGet, N modèles impliquent N méthodes. **N'exécute jamais la v1.**
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | Soixante-quatre valeurs fournies, relues : S-1 (aucun cadratin), S-2, S-3 (le S/36 est dessiné comme un fichier vivant, trait bleu, jamais « vieux »), S-4 (l'anglais s'adresse à son lecteur). « d'au plus six caractères » partout, jamais « de six caractères ». **Ne réécris rien.** |
| `UX_METHOD` | — | Appliqué | Les deux dessins sont **verticaux à toute largeur**, même gabarit : cases de 24rem au plus, centrées dans la mesure. Une seule présentation, identique sur téléphone et grand écran, rien à basculer. Aucun débordement de page, aucun élément interactif. Les rangées d'écho atténuées sont `aria-hidden` ; des flèches décoratives en CSS (`::after`, donc muettes pour les lecteurs d'écran) donnent le sens de lecture vers le bas entre les cases et entre les étapes ; la dernière boîte de chaque parcours n'en porte pas. Le reste est du texte lisible dans l'ordre. |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun script, aucune image externe, aucune assertion de protection ; aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée ; les portes existantes couvrent les clés ajoutées. |
| `VISION_METHOD` | — | Écarté | Aucun gate de rendu ; la validation visuelle, sur téléphone et grand écran, reste au chef de projet, avec le témoin `MAQUETTE_images-section-3_v6.html` hors dépôt comme référence. |
| `AGENT_SCOPE_METHOD` | — | Écarté | Rien hors du dépôt. |
| `SQL_METHOD` | — | Écarté | Aucune base. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_dessins-section-3_v2.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources : `CLAUDE.md` (« Style du produit » : registres distingués par la structure, jamais par le costume ; accent bleu pour le S/36, vert pour l'API ; images recréées ; « Mise en scène » : vis-à-vis côte à côte sur grand écran, empilé sur mobile) et `tasks/ROADMAP.md`, ligne 6 du fil. Les notes hors dépôt (`../Etude_Technique/NOTES_CONTENU_la-solution_v15.md` §4) et la maquette témoin sont reproduites ici pour ce qui est nécessaire.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.13** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 15`.
3. `npm test` vert sur `main` (134/134).
4. `index.html` : `grep -c "<figure" index.html` = **3** ; `grep -c "<ol" index.html` = **0** ; `grep -c "dessin" index.html` = **0** ; le `p` portant `section3.mur.p1` est suivi du `h3` de `section3.renversement.title` ; le `p` portant `section3.renversement.p2` est suivi d'une `figure.extrait`.
5. `js/i18n.js` et `css/styles.css` : `grep -c "dessin"` = **0** dans chacun.

## Contexte et périmètre

Les deux dessins de la section « La solution », décidés le 18 août et gelés à la maquette v5, reconstruits et reconnus par le chef de projet le 19 août. Ils ne sont pas des images externes : ce sont des **dessins en HTML et CSS**, listes et cadres, avec les jetons du site, pour trois raisons qui ont été pesées : les textes sont bilingues par le dictionnaire comme tout le reste, sans dupliquer un SVG par langue ; les cases s'empilent en écran étroit sans second dessin ; le texte reste du texte, lisible, sélectionnable, annoncé dans l'ordre.

**Dessin 1, « Écrit à la main : tout est figé d'avance, et tout est à maintenir »** : une chaîne de **cinq cases** en colonne, lue de haut en bas **à toute largeur** (décision du chef de projet, 20 août 2026 : la rangée de cinq devenait illisible en largeur de lecture) : un fichier plat (trait bleu), une requête figée, une classe C#, un dictionnaire construit par le mécanisme de la réflexion C#, JSON (trait vert). Les cinq cases sont **enfermées dans un cadre au trait vert continu qui figure la méthode du contrôleur**, titré `[HttpGet]` en police mono suivie de la légende « une méthode du contrôleur par question posée » : un modèle de données vit avec une requête figée, et l'ensemble correspond à une route HttpGet. Sous le cadre, deux annotations ; puis la répétition suggérée par deux cadres d'écho atténués, cinq petites cases vides chacun, autant d'autres méthodes ; des points de suspension ; une conclusion en deux lignes. **Place** : fin du temps 2, après `section3.mur.p1`, avant le `h3` du temps 3. C'est le dessin du mur.

**Dessin 2, « Ce que la machine fait à la place »** : vertical, sept étapes : une requête SELECT ; le modèle construit à la volée, **en pointillés** ; un cadre pointillé « pour chaque ligne renvoyée » contenant un cadre pointillé « pour chaque colonne de la ligne » avec deux étapes, puis, hors du cadre intérieur, « ajouter l'instance à la liste » ; enfin « convertir la liste en flux JSON » ; clôture en deux lignes. Règle de lecture : **ce qui est dans un cadre se répète, ce qui est dehors se fait une fois ; le pointillé est réservé au modèle fabriqué à l'exécution et aux cadres de répétition**. **Place** : temps 3, après `section3.renversement.p2` et **avant** la `figure.extrait` du code : le dessin d'abord, le code ensuite.

**Périmètre** : `js/i18n.js` (trente-deux clés par langue, soixante-quatre valeurs), `index.html` (deux `figure.dessin`), `css/styles.css` (une famille de règles, fournie). **Rien d'autre** : aucun script, aucun SVG, aucune image, aucun test, aucune modification de prose existante.

**Clés en français** (`dessin1`, `case1`, `titre`, `sous`, `methode`, `note1`, `conclusion1`, `etape1`, `cadre1`…), comme les groupes existants. Ne les renomme pas. Le marqueur `[HttpGet]` est du code : il s'écrit en dur dans le HTML, identique dans les deux langues, il n'entre pas au dictionnaire.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/dessins-section-3` · `.pipeline/spec.md`, première ligne exactement `Incrément : EVOL dessins-section-3` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable A : le dictionnaire

Sous `section3`, **après** `etape` (dernier groupe existant), ajoute deux groupes, `dessin1` puis `dessin2`, des deux côtés, mêmes clés exactement.

### `dessin1`, côté français

- **`legende`** : Écrit à la main : tout est figé d'avance, et tout est à maintenir.
- **`case1.titre`** : un fichier plat · **`case1.sous`** : hérité d'une architecture IBM S/36
- **`case2.titre`** : une requête figée · **`case2.sous`** : écrite dans le code, colonnes fixes
- **`case3.titre`** : une classe C# · **`case3.sous`** : écrite à la main. Correspond aux colonnes renvoyées par l'exécution de la requête SQL
- **`case4.titre`** : un dictionnaire de noms · **`case4.sous`** : nom métier vers nom physique, construit par le mécanisme de la réflexion C#
- **`case5.titre`** : JSON · **`case5.sous`** : aux noms métier
- **`methode`** : une méthode du contrôleur par question posée
- **`note1`** : l'appelant ne choisit que son filtre ; ni la requête, ni les colonnes, ni leur nom ; une autre question veut une autre requête, donc une autre méthode et une autre classe
- **`note2`** : elle porte les noms de colonnes d'au plus six caractères ; hors de l'application ils ne veulent rien dire ; le programme relit ses propres attributs pendant qu'il tourne et en tire un dictionnaire
- **`conclusion1`** : Des centaines de tables. Autant de méthodes, de requêtes et de classes.
- **`conclusion2`** : Le coût n'est pas de les écrire une fois. Il est de les maintenir toutes, ensuite : solution intenable.

### `dessin1`, côté anglais

- **`legende`** : Written by hand: everything is fixed in advance, and everything has to be maintained.
- **`case1.titre`** : a flat file · **`case1.sous`** : inherited from an IBM S/36 architecture
- **`case2.titre`** : a fixed query · **`case2.sous`** : written in the code, fixed columns
- **`case3.titre`** : a C# class · **`case3.sous`** : written by hand. Matches the columns returned when the SQL query runs
- **`case4.titre`** : a name dictionary · **`case4.sous`** : business name to physical name, built by the C# reflection mechanism
- **`case5.titre`** : JSON · **`case5.sous`** : with business names
- **`methode`** : one controller method per question asked
- **`note1`** : the caller only chooses the filter; not the query, not the columns, not their names; another question needs another query, hence another method and another class
- **`note2`** : it carries the column names of six characters or fewer; outside the application they mean nothing; the program reads its own attributes back while it runs and builds a dictionary from them
- **`conclusion1`** : Hundreds of tables. As many methods, queries and classes.
- **`conclusion2`** : The cost is not writing them once. It is maintaining all of them afterwards: untenable.

### `dessin2`, côté français

- **`legende`** : Ce que la machine fait à la place.
- **`etape1.titre`** : une requête SELECT · **`etape1.sous`** : avec ou sans jointures, inconnue du code jusqu'à l'appel
- **`etape2.titre`** : le modèle est construit à la volée · **`etape2.sous`** : d'après le nom et le type de chaque colonne renvoyée, une seule fois
- **`cadre1`** : pour chaque ligne renvoyée
- **`cadre2`** : pour chaque colonne de la ligne
- **`etape3.titre`** : lire la valeur de la colonne
- **`etape4.titre`** : la verser dans le modèle · **`etape4.sous`** : une instance par ligne
- **`etape5.titre`** : ajouter l'instance à la liste · **`etape5.sous`** : une liste d'objets
- **`etape6.titre`** : convertir la liste en flux JSON · **`etape6.sous`** : avec la version et le nombre d'éléments
- **`conclusion1`** : Une requête différente à chaque appel. Le même code, aucune classe à écrire.
- **`conclusion2`** : Le modèle est un moule : fabriqué une fois, chaque ligne y est coulée.

### `dessin2`, côté anglais

- **`legende`** : What the machine does instead.
- **`etape1.titre`** : a SELECT query · **`etape1.sous`** : with or without joins, unknown to the code until the call
- **`etape2.titre`** : the model is built on the fly · **`etape2.sous`** : from the name and the type of each column returned, once only
- **`cadre1`** : for each row returned
- **`cadre2`** : for each column of the row
- **`etape3.titre`** : read the column's value
- **`etape4.titre`** : pour it into the model · **`etape4.sous`** : one instance per row
- **`etape5.titre`** : add the instance to the list · **`etape5.sous`** : a list of objects
- **`etape6.titre`** : turn the list into a JSON feed · **`etape6.sous`** : with the version and the item count
- **`conclusion1`** : A different query on every call. The same code, no class to write.
- **`conclusion2`** : The model is a mould: cast once, every row is poured into it.

## ÉTAPE 3 — Livrable B : la structure HTML

Deux `figure.dessin`, **exactement** comme ci-dessous, aucun attribut en plus.

**Dessin 1**, après le `p` portant `section3.mur.p1`, avant le `h3` de `section3.renversement.title` :

```html
<figure class="dessin dessin-chaine">
  <figcaption data-i18n="section3.dessin1.legende"></figcaption>
  <div class="methode">
    <p class="methode-titre"><code>[HttpGet]</code> <span data-i18n="section3.dessin1.methode"></span></p>
    <ol class="chaine">
      <li class="case s36"><strong data-i18n="section3.dessin1.case1.titre"></strong><small data-i18n="section3.dessin1.case1.sous"></small></li>
      <li class="case api"><strong data-i18n="section3.dessin1.case2.titre"></strong><small data-i18n="section3.dessin1.case2.sous"></small></li>
      <li class="case api"><strong data-i18n="section3.dessin1.case3.titre"></strong><small data-i18n="section3.dessin1.case3.sous"></small></li>
      <li class="case api"><strong data-i18n="section3.dessin1.case4.titre"></strong><small data-i18n="section3.dessin1.case4.sous"></small></li>
      <li class="case api"><strong data-i18n="section3.dessin1.case5.titre"></strong><small data-i18n="section3.dessin1.case5.sous"></small></li>
    </ol>
  </div>
  <div class="notes">
    <p class="note" data-i18n="section3.dessin1.note1"></p>
    <p class="note" data-i18n="section3.dessin1.note2"></p>
  </div>
  <ol class="chaine echo" aria-hidden="true">
    <li class="case s36"></li><li class="case api"></li><li class="case api"></li><li class="case api"></li><li class="case api"></li>
  </ol>
  <ol class="chaine echo echo-2" aria-hidden="true">
    <li class="case s36"></li><li class="case api"></li><li class="case api"></li><li class="case api"></li><li class="case api"></li>
  </ol>
  <p class="points" aria-hidden="true">…</p>
  <p class="conclusion" data-i18n="section3.dessin1.conclusion1"></p>
  <p class="conclusion" data-i18n="section3.dessin1.conclusion2"></p>
</figure>
```

**Dessin 2**, après le `p` portant `section3.renversement.p2`, **avant** la `figure.extrait` qui le suit :

```html
<figure class="dessin dessin-machine">
  <figcaption data-i18n="section3.dessin2.legende"></figcaption>
  <ol class="machine">
    <li class="etape api"><strong data-i18n="section3.dessin2.etape1.titre"></strong><small data-i18n="section3.dessin2.etape1.sous"></small></li>
    <li class="etape api pointille"><strong data-i18n="section3.dessin2.etape2.titre"></strong><small data-i18n="section3.dessin2.etape2.sous"></small></li>
    <li class="cadre">
      <span class="cadre-titre" data-i18n="section3.dessin2.cadre1"></span>
      <ol>
        <li class="cadre">
          <span class="cadre-titre" data-i18n="section3.dessin2.cadre2"></span>
          <ol>
            <li class="etape api"><strong data-i18n="section3.dessin2.etape3.titre"></strong></li>
            <li class="etape api"><strong data-i18n="section3.dessin2.etape4.titre"></strong><small data-i18n="section3.dessin2.etape4.sous"></small></li>
          </ol>
        </li>
        <li class="etape api"><strong data-i18n="section3.dessin2.etape5.titre"></strong><small data-i18n="section3.dessin2.etape5.sous"></small></li>
      </ol>
    </li>
    <li class="etape api"><strong data-i18n="section3.dessin2.etape6.titre"></strong><small data-i18n="section3.dessin2.etape6.sous"></small></li>
  </ol>
  <p class="conclusion" data-i18n="section3.dessin2.conclusion1"></p>
  <p class="conclusion sobre" data-i18n="section3.dessin2.conclusion2"></p>
</figure>
```

Les listes sont ordonnées parce que l'ordre porte le sens ; les numéros sont masqués par le CSS. Les deux rangées d'écho sont décoratives, d'où `aria-hidden`.

## ÉTAPE 4 — Livrable C : les règles CSS

Dans `css/styles.css`, **après** le bloc des extraits de code (`.extrait pre { … }`) et **avant** `/* ---- Pied de page. */`, ajoute **exactement** ceci :

```css
/* ---- Dessins (registre API : cases, filets, vert ; le fichier S/36 en bleu).
   Dessins en HTML : texte bilingue par le dictionnaire, empilement en écran étroit,
   aucune image. Les listes sont ordonnées parce que l'ordre porte le sens. */
.dessin {
  margin: calc(var(--space) * 1.5) 0;
}

.dessin figcaption {
  margin-bottom: calc(var(--space) / 2);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}

.dessin ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dessin .case,
.dessin .etape {
  padding: calc(var(--space) / 2) var(--space);
  border: 1.5px solid var(--color-api);
  border-radius: 3px;
  background: var(--color-bg);
  text-align: center;
}

.dessin .s36 {
  border-color: var(--color-s36);
}

.dessin .case strong,
.dessin .etape strong {
  display: block;
  font-weight: 500;
}

.dessin .case small,
.dessin .etape small {
  display: block;
  color: var(--color-ink-soft);
  font-size: 0.8125rem;
}

.dessin .conclusion {
  margin: calc(var(--space) / 2) 0 0;
  text-align: center;
  font-size: 0.9375rem;
}

.dessin .sobre {
  color: var(--color-ink-soft);
}

/* Dessin 1 : la chaîne. En colonne à toute largeur (décision du chef de projet,
   20 août 2026 : la rangée de cinq cases devenait illisible en largeur de lecture).
   Même gabarit que le dessin 2 : cases de 24rem au plus, centrées. La chaîne vit
   dans un cadre au trait continu qui figure la méthode du contrôleur : un modèle
   de données vit avec une requête figée, l'ensemble correspond à une route HttpGet. */
.chaine {
  display: grid;
  gap: calc(var(--space) / 2);
}

.dessin-chaine .methode {
  max-width: 25rem;
  margin: 0 auto;
  padding: calc(var(--space) / 2);
  border: 1px solid var(--color-api);
  border-radius: 4px;
}

.dessin-chaine .methode-titre {
  margin: 0 0 calc(var(--space) / 2);
  color: var(--color-ink-soft);
  font-size: 0.8125rem;
  text-align: center;
}

.dessin-chaine .methode-titre code {
  font-family: var(--font-mono);
}

/* Une flèche décorative redonne le sens de lecture entre les cases. */
.chaine:not(.echo) > .case:not(:last-child)::after {
  content: "\2193";
  display: block;
  margin-top: calc(var(--space) / 4);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
  line-height: 1;
}

.dessin-chaine .notes {
  display: grid;
  gap: calc(var(--space) / 2);
  margin: calc(var(--space) / 2) 0;
}

.dessin-chaine .note {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 0.8125rem;
}

.dessin-chaine .echo {
  /* Les échos : un petit cadre de méthode chacun, cinq cases vides en rangée.
     Ils suggèrent la répétition, autant d'autres méthodes ; ils ne se lisent pas. */
  grid-template-columns: repeat(5, 1fr);
  max-width: 25rem;
  margin: calc(var(--space) / 2) auto 0;
  padding: calc(var(--space) / 4);
  border: 1px solid var(--color-api);
  border-radius: 4px;
  opacity: 0.55;
}

.dessin-chaine .echo .case {
  padding: calc(var(--space) / 4) var(--space);
  min-height: 1.5rem;
}

.dessin-chaine .echo-2 {
  opacity: 0.3;
}

.dessin-chaine .points {
  margin: calc(var(--space) / 4) 0 0;
  text-align: center;
  color: var(--color-ink-soft);
  font-size: 1.5rem;
  line-height: 1;
}

/* Dessin 2 : la machine. Vertical partout ; pointillés réservés au modèle fabriqué
   à l'exécution et aux cadres de répétition. */
.machine,
.machine ol {
  display: grid;
  gap: calc(var(--space) / 2);
}

.machine > li,
.machine ol > li {
  max-width: 24rem;
  width: 100%;
  margin: 0 auto;
}

.machine .pointille {
  border-style: dashed;
}

/* Une flèche sous chaque étape, sauf la dernière du parcours. */
.machine .etape::after {
  content: "\2193";
  display: block;
  margin-top: calc(var(--space) / 4);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
  line-height: 1;
}

.machine > li:last-child::after {
  content: none;
}

.machine .cadre {
  max-width: none;
  padding: calc(var(--space) / 2);
  border: 1px dashed var(--color-ink-soft);
  border-radius: 4px;
}

.machine .cadre-titre {
  display: block;
  margin-bottom: calc(var(--space) / 2);
  color: var(--color-ink-soft);
  font-size: 0.8125rem;
}
```

Deux points où le dessin s'écarte du témoin, tous deux sur décision du chef de projet du 20 août 2026, qui prime : le témoin dessinait la chaîne en rangée, elle est en colonne à toute largeur ; et l'accolade du témoin est devenue un cadre au trait continu marqué `[HttpGet]`, qui enferme les cinq cases et que les échos reprennent en miniature. Si tu vois mieux avec les mêmes moyens, **ne le fais pas ici** : signale-le dans `changes.md`.

## ÉTAPE 5 — Preuves

1. `npm test` vert : **134/134**, aucun test ajouté ni retiré.
2. Périmètre : `git diff main...HEAD --stat -- . ':!prompts'` : **trois** fichiers, `js/i18n.js`, `index.html`, `css/styles.css`. `git diff main...HEAD -- tests tools .claude assets js/menu.js` : **vide**.
3. Comptages `index.html`, avant et après : `<figure` **3 → 5** ; `class="dessin` **0 → 2** ; `<ol` **0 → 6** ; `aria-hidden="true"` **+3** ; `data-i18n="section3.dessin1` **0 → 16** ; `data-i18n="section3.dessin2` **0 → 16**. Consigne chaque nombre.
4. Comptages `js/i18n.js` : nombre de clés pointées sous `section3.dessin1` **= 16** et sous `section3.dessin2` **= 16**, identiques des deux côtés ; `de six caractères` **0 → 0** ; `grep -c "dessin"` **0 → N**, consigne N.
5. Cadratins : `grep -c "—"` sur les trois fichiers, avant et après. **Mêmes nombres** (10, 1, 7 mesurés le 19 août). Consigne-les.
6. Aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled` dans les soixante-quatre valeurs. Consigne la commande et son résultat.
7. Chaque `data-i18n` ajouté résout dans les deux langues (la porte existante le mesure ; dis-le).
8. Ordre dans la page, mesuré par les numéros de ligne : `section3.mur.p1` < `dessin-chaine` < `section3.renversement.title` ; `section3.renversement.p2` < `dessin-machine` < `section3.renversement.code3.legende`. Consigne les numéros.
9. Contrôle d'accessibilité écrit dans `changes.md` : les deux échos sont `aria-hidden` ; tout le reste est du texte dans des listes ordonnées, lu dans l'ordre ; aucun élément interactif ; contrastes des jetons déjà qualifiés. Ce que tu ne peux pas mesurer sans navigateur, dis-le : la validation visuelle, en colonne sur téléphone et en rangée sur grand écran, reste au chef de projet.

## ÉTAPE 6 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `css/styles.css`) : `feat(solution): les deux dessins, la chaîne écrite à la main et ce que la machine fait à la place, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. `SHIP` avec `WARN` : n'y touche pas, écris READY. `NEEDS_WORK` : corrige, commite, relance le `reviewer` sur le nouveau commit ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL dessins-section-3 — <ISO> — feat/dessins-section-3 — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les soixante-quatre valeurs écrites **exactement** comme ci-dessus ; seize clés sous `dessin1` et seize sous `dessin2`, mêmes clés des deux côtés ; aucune valeur existante modifiée.
2. Les deux `figure.dessin` aux emplacements indiqués, structure exacte ; les échos `aria-hidden`.
3. Les règles CSS ajoutées **exactement** comme fournies, à l'emplacement indiqué ; aucune autre règle touchée.
4. Suite verte 134/134 ; comptages de l'ÉTAPE 5 conformes ; aucun cadratin ajouté ; aucun script, SVG, image ni test.
5. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

# EVOL — Section 3, « Les limites du modèle dynamique » : un titre et trois paragraphes, FR et EN

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_limites-modele-dynamique_v1.md` · **Ligne du fil** : 12
**Taille** : petit incrément de contenu. Cinq clés par langue, un `h3` et **quatre** `p` dans
`index.html`, **aucune règle CSS neuve**, aucun script, aucune image. **Rembourse [W20].**

## Satellites consultés

`CLAUDE.md` (« Architecture du site », « Le cas fictif », « Anonymisation », « Conventions ») ·
`STYLE_METHOD` (S-2 : un fait vérifiable plutôt qu'un jugement ; S-4 : le vocabulaire s'adresse) ·
`PEDAGOGY_METHOD` (le jargon est étiqueté à sa première apparition).

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_limites-modele-dynamique_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre : `CLAUDE.md` et `tasks/ROADMAP.md` (ligne 12 du fil, dette [W20]). La mesure d'origine
(spike M-13 du 20 août 2026, `../Etude_Technique/NOTES_CONTENU_la-solution_v16.md`) est **hors
dépôt** : tout ce qui en est nécessaire est reproduit ici, tu n'as pas à l'ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 30 août 2026 sur `main` à `4d62165`, par lecture de fichiers. Le fil porte déjà
la ligne 12 et les dettes [W33]-[W39] (commit d'ouverture de la session 24, à vérifier par
`grep -c 'W39' tasks/ROADMAP.md` ≥ 1 ; si 0, le fil n'est pas à jour : ARRÊTE-TOI).

1. `git checkout main`. Version **0.1.21** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 23`.
3. `npm test` vert sur `main` (**356/356**).
4. La section 3 se termine par le bloc `etape`, un `h3` et un seul `p`, juste avant `</section>` :
   `grep -o 'data-i18n="section3.etape' index.html | wc -l` = **2** ;
   `grep -c 'etape:' js/i18n.js` = **2** (une ouverture de groupe par langue).
5. Rien de ce que cet incrément écrit n'existe encore : `grep -c 'limites:' js/i18n.js` = **0** ;
   `grep -c 'DSPFFD' js/i18n.js` = **0** ; `grep -c 'INFORMATION_SCHEMA' js/i18n.js` = **0**.
6. Bases de comptage `index.html`, **occurrences** (`grep -o MOTIF index.html | wc -l`) :
   `data-i18n="` **218** · `data-i18n-attr="` **10** · `<h3` **18** · `id="` **61** ·
   `data-i18n="section3` **70** · `target="_blank"` **3**.
7. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0** — les valeurs du dictionnaire sont du **texte**,
   jamais du HTML. Les noms de commandes ci-dessous s'écrivent donc en clair, sans balise
   (le rendu Plex Mono des commandes en ligne est la dette de la ligne 13, pas de celle-ci).

## Contexte et périmètre

Demande du chef de projet du 30 août 2026, sur le site publié en 0.1.21 : la section 3 montre le
modèle dynamique et s'arrête sur « il restait une étape » ; elle ne dit nulle part **ce que le
modèle ne sait pas faire**. Cette sous-section le dit, en quatre paragraphes : la **cause** (le
schéma est déduit de la première ligne, pas demandé à la base), les **deux contraintes et le
piège** qui en découlent, le **travail d'amont** que la requête impose dès qu'elle porte des
jointures, et la **parade**, la même quel que soit le SGBD.

**Ce n'est pas un tour des SGBD du marché ni un exposé sur les valeurs nulles.** Trois noms de
commande suffisent pour que le lecteur reconnaisse la sienne et voie que les autres existent.

**Ce bloc n'est PAS un cinquième temps du cheminement, et rien ne doit le faire croire.** Mesuré le
30 août 2026 : `section3.intro` publie « C'est un cheminement, **en quatre temps**, tel qu'il s'est
passé » (`grep -c 'en quatre temps' js/i18n.js` = **1**, côté anglais « in four steps »). Les quatre
temps sont des **moments du travail** ; ce bloc est un **constat sur le résultat**, hors du
décompte. `section3.intro` reste donc **inchangée**, dans les deux langues : si tu penses devoir la
réécrire, tu as mal placé le bloc — ARRÊTE-TOI et signale.

**Le compte qui fait foi** : `title`, `cause`, `contraintes`, `amont`, `parade` — un `h3` et **quatre** `p`,
ajoutés **après** `section3.etape.p1` et **avant** `</section>`. Toute autre formulation de ce
prompt qui contredirait ce compte est fausse : c'est celle-ci qui vaut.

**Ce que la mesure établit, et ce qu'elle n'établit pas** (spike M-13, sept cas, mécanisme recréé,
lignes simulées en mémoire, Mono, aucun pilote de base réel) : table vide → modèle à zéro propriété,
aucune erreur ; `null` en première ligne → exception ; `DBNull` en première ligne → colonne typée
`DBNull`, exception à la ligne suivante ; `null` sur une ligne suivante, colonne numérique → **0
sans exception ni signal**. La représentation du NULL par la vraie source n'a **pas** été observée :
le texte livré dit « constatées en rejouant le mécanisme sur des cas construits », jamais « mesuré
sur le prototype ». C'est la prudence que le chef de projet s'était lui-même imposée le 20 août 2026
(« à vérifier sur le prototype avant toute affirmation publique »).

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/limites-modele-dynamique`. `.pipeline/spec.md`. Puis le premier commit ci-dessus.

## ÉTAPE 2 — Livrable A : les cinq clés du dictionnaire

Dans `js/i18n.js`, ajouter le groupe `limites` dans `section3`, **immédiatement après** le groupe
`etape` et avant `dessin1`, dans les deux langues. Ordre des clés : `title`, `cause`, `contraintes`,
`amont`, `parade`. Aucune valeur existante ne change.

### Côté français — valeurs exactes

- `section3.limites.title` :
  `Les limites du modèle dynamique, connues et non cachées`
- `section3.limites.cause` :
  `Le modèle dynamique ne connaît la table que par ce qu'elle lui montre. Il lit la première ligne du résultat et en déduit le nom et le type de chaque colonne : il ne demande jamais sa description à la base. C'est ce choix, et non la source, qui fixe ses limites. Elles sont les mêmes quel que soit le SGBD, IBM i, SQL Server, PostgreSQL ou un autre.`
- `section3.limites.contraintes` :
  `Deux contraintes en découlent, constatées en rejouant le mécanisme sur des cas construits. La table visée doit contenir au moins un enregistrement : sans première ligne, le modèle se construit sans aucune colonne, et rien ne le signale. Et cette première ligne ne doit porter aucune valeur NULL : une valeur absente n'a pas de type, la colonne ne peut pas être décrite. Un piège s'y ajoute, plus discret : sur une ligne suivante, un NULL dans une colonne numérique devient zéro sans un mot. Un délai inconnu se lit alors comme un délai de zéro jour, et rien ne crie.`
- `section3.limites.amont` :
  `Un travail d'amont s'ajoute, et il naît de la requête elle-même. Interroger la base sur une table suppose de savoir laquelle : sur un SELECT qui n'en vise qu'une, elle se lit dans la requête ; dès que la requête porte des jointures, les tables sont plusieurs, et il faut les extraire avant de pouvoir demander quoi que ce soit. Ce travail se confie à une classe dédiée, qui lit la requête et rend la liste des tables à décrire.`
- `section3.limites.parade` :
  `La parade est connue, et elle vaut partout : demander la description à la base plutôt qu'à la donnée. Chaque base sait décrire ses tables, DSPFFD sur IBM i, \d sous PostgreSQL, sp_help sous SQL Server, ou la vue INFORMATION_SCHEMA.COLUMNS que la plupart exposent : le type et la nullabilité de chaque colonne, table vide ou pleine. Puis donner aux propriétés le droit d'être absentes, pour qu'un NULL reste un NULL et ne devienne jamais un zéro. Le prototype ne l'a pas fait. C'est une limite connue, pas une limite cachée.`

### Côté anglais — valeurs exactes

- `section3.limites.title` :
  `The dynamic model's limits, known and not hidden`
- `section3.limites.cause` :
  `The dynamic model only knows the table through what the table shows it. It reads the first row of the result and infers the name and type of every column from it: it never asks the database for a description. That choice, not the source, is what sets its limits. They are the same whatever the database, IBM i, SQL Server, PostgreSQL or any other.`
- `section3.limites.contraintes` :
  `Two constraints follow, observed by replaying the mechanism on constructed cases. The target table must hold at least one record: without a first row, the model is built with no column at all, and nothing reports it. And that first row must carry no NULL value: an absent value has no type, so the column cannot be described. One trap comes on top, and it is quieter: on a later row, a NULL in a numeric column silently becomes zero. An unknown lead time then reads as a lead time of zero days, and nothing cries out.`
- `section3.limites.amont` :
  `There is upstream work too, and it comes from the query itself. Asking the database about a table means knowing which one: in a SELECT that targets a single table, it can be read straight from the query; as soon as the query carries joins, there are several tables, and they must be extracted before anything can be asked. That work belongs to a dedicated class, one that reads the query and returns the list of tables to describe.`
- `section3.limites.parade` :
  `The remedy is known, and it holds everywhere: ask the database for the description rather than the data. Every database can describe its tables, DSPFFD on IBM i, \d in PostgreSQL, sp_help in SQL Server, or the INFORMATION_SCHEMA.COLUMNS view most of them expose: the type and nullability of every column, whether the table is empty or full. Then give the properties the right to be absent, so that a NULL stays a NULL and never turns into a zero. The prototype did not do it. That is a known limit, not a hidden one.`

**Quatre règles de forme, non négociables :**

1. **Aucun « je »** dans les quatre valeurs. Le constat est neutre ; la voix du vécu est déjà
   portée par `etape.p1`, juste au-dessus.
2. **Aucun chiffre de comptage** (pas « sept cas », pas de date). « Zéro » et « au moins un » sont
   des valeurs du raisonnement, pas des comptes datés : ils restent.
3. **« Constatées en rejouant le mécanisme sur des cas construits »**, jamais « sur le prototype » :
   la mesure d'origine n'a jamais touché la vraie source (voir le contexte), et c'est le pilote de
   base qui décide de la forme d'une valeur absente. Si tu es tenté de renforcer, ne le fais pas.
   Même prudence pour `amont` : la valeur dit **« se confie à »**, jamais « a été confié à » — le
   travail d'extraction des tables est une voie décrite par le chef de projet, pas un état constaté
   du prototype. Ne l'écris pas au passé.
4. **Les noms de commande en clair**, sans balise ni guillemet : `DSPFFD`, `\d`, `sp_help`,
   `INFORMATION_SCHEMA.COLUMNS`. Dans `js/i18n.js`, la barre oblique inverse de `\d` s'échappe (`\\d`
   dans la chaîne source) pour que le texte affiché soit `\d` ; vérifie-le par la preuve 6.

## ÉTAPE 3 — Livrable B : le corps dans `index.html`

Dans `<section id="solution">`, **après** `<p data-i18n="section3.etape.p1"></p>` et **avant**
`</section>`, ajouter dans cet ordre — `amont` avant `parade`, l'ordre n'est pas indifférent : on ne
peut demander sa description à une table qu'après avoir su laquelle interroger :

```html
      <h3 data-i18n="section3.limites.title"></h3>
      <p data-i18n="section3.limites.cause"></p>
      <p data-i18n="section3.limites.contraintes"></p>
      <p data-i18n="section3.limites.amont"></p>
      <p data-i18n="section3.limites.parade"></p>
```

Même forme que le bloc `etape` qui précède : aucun `id`, aucun attribut de plus, aucune `figure`,
aucun `<code>`, aucun lien. Les trois extraits de code existants ne sont **pas** touchés.

## ÉTAPE 4 — Livrable C : rien en CSS

**Cet incrément n'ajoute aucune règle CSS et n'en modifie aucune.** Le rendu Plex Mono des noms de
commande en ligne est la dette de la ligne 13 (« Mise en scène »). Si tu penses qu'une règle est
nécessaire, ARRÊTE-TOI et signale plutôt que d'en écrire une.

## ÉTAPE 5 — Livrable D : le fil

Dans `tasks/ROADMAP.md`, **un seul geste** : dans l'entrée **[W20]**, ajouter en tête de l'entrée
(après `- **[W20]**`) la mention **`Remboursée le <date> par l'incrément 12`** — le remède
« une phrase de légende » est remplacé par la sous-section `section3.limites`, qui dit les trois
comportements (l'exception qui crie, le `DBNull` qui passe, le zéro muet) en prose et non en
légende d'extrait. L'énoncé d'origine reste tel quel en dessous.

**Ne touche pas à l'état de la ligne 12** (« à venir ») : `/land` ne met pas le fil à jour ([W24]),
le passage à « atterri » est le geste manuel du chef de projet à l'atterrissage. Ne renumérote rien.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat, y compris ceux qui te paraissent évidents.

1. `grep -o 'data-i18n="section3.limites' index.html | wc -l` = **5** (title + quatre paragraphes).
2. `grep -o 'data-i18n="section3.etape' index.html | wc -l` = **2**, **inchangé**.
3. `grep -o 'data-i18n="' index.html | wc -l` = **223** (218 + 5).
4. `grep -o '<h3' index.html | wc -l` = **19** (18 + 1). `grep -o 'id="' index.html | wc -l` = **61**,
   inchangé. `grep -o 'data-i18n-attr="' index.html | wc -l` = **10**, inchangé.
5. `grep -c 'limites:' js/i18n.js` = **2** · `grep -c 'amont:' js/i18n.js` = **2** ·
   `grep -c 'DSPFFD' js/i18n.js` = **2** ·
   `grep -c 'INFORMATION_SCHEMA' js/i18n.js` = **2** · `grep -c 'sp_help' js/i18n.js` = **2**.
6. `grep -c '\\\\d sous PostgreSQL\|\\\\d in PostgreSQL' js/i18n.js` = **2** — la barre oblique inverse
   est échappée dans la source. Puis, à l'exécution (`js/i18n.js` exporte `dict`, mesuré) :
   `node -e "import('./js/i18n.js').then(m=>console.log(m.dict.fr.section3.limites.parade.includes('\\d sous PostgreSQL'), m.dict.en.section3.limites.parade.includes('\\d in PostgreSQL')))"`
   doit imprimer `true true` : le texte affiché porte une seule barre oblique inverse. Si le chemin
   `dict.fr` / `dict.en` n'est pas celui du module, lis-le et adapte ; n'invente pas le résultat.
5 ter. `grep -c 'sur le prototype' js/i18n.js` = **0** — la mesure ne se dit jamais faite sur le
   prototype (règle de forme 3).
6 bis. `grep -c 'a été confié' js/i18n.js` = **0** — la voie d'extraction des tables se dit au présent
   d'intention, jamais au passé accompli (règle de forme 3).
7. `grep -o ' je ' js/i18n.js | wc -l` = **7**, **inchangé** : aucun « je » ajouté. **Si tu lis
   autre chose que 7 : ARRÊTE-TOI.** (Mesuré le 30 août 2026 sur `4d62165` : 7.)
8. `grep -c 'etape:' js/i18n.js` = **2**, avant comme après — invariant.
8 bis. `grep -c 'en quatre temps' js/i18n.js` = **1** et `grep -c 'in four steps' js/i18n.js` = **1**,
   **avant comme après** : `section3.intro` n'a pas bougé, le cheminement compte toujours quatre temps.
   **Si tu lis autre chose : ARRÊTE-TOI.**
9. `grep -c 'W20\*\* Remboursée' tasks/ROADMAP.md` = **1**.
10. `git diff --stat` ne touche que `js/i18n.js`, `index.html`, `tasks/ROADMAP.md`.
11. `npm test` : **356/356**. La parité FR/EN est testée par les clés ; elle doit rester verte sans
    que tu touches aux tests.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `tasks/ROADMAP.md`) :
  `feat(solution): la section 3 dit les limites du modèle dynamique, les mêmes quel que soit le SGBD, et leur parade ; [W20] remboursée`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche
  `verdict` et `reservations` tels quels. `SHIP` avec des `WARN` : **n'y touche pas**, écris READY
  (règle d'arrêt : 0 FAIL suffit, les WARN partent en dette nommée au fil). `NEEDS_WORK` : corrige,
  commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL limites-modele-dynamique — <ISO> — feat/limites-modele-dynamique — tests 356/356`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les cinq valeurs françaises et cinq anglaises écrites **exactement** comme ci-dessus, dans
   l'ordre `title`, `cause`, `contraintes`, `amont`, `parade`, groupe `limites` placé après `etape`.
   Aucune autre valeur du dictionnaire modifiée, nulle part.
2. Un `h3` et quatre `p` après `section3.etape.p1`, avant `</section>`, `amont` avant `parade`.
   Aucune figure, aucun bloc de code, aucun lien, aucun `id`.
3. Aucun « je », aucun chiffre de comptage, « cas construits » et non « prototype » pour la mesure,
   `amont` au présent d'intention, commandes en clair.
4. Aucune règle CSS ajoutée ni modifiée. Aucun script, aucune image, aucun `innerHTML`.
5. [W20] marquée remboursée, énoncé d'origine conservé ; ligne 12 non touchée.
6. Suite verte 356/356, tous les comptages de l'ÉTAPE 6 conformes.
7. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

## Hors périmètre — à ne pas traiter, dette par dette

- **Les trois extraits de code** de la section 3 : ni légende neuve, ni garde ajoutée à `GetType()`.
  Le remède de [W20] est cette prose, pas une retouche d'extrait.
- **Le rendu Plex Mono des commandes en ligne** (`DSPFFD`, `sp_help`…) : ligne 13.
- **Toute règle CSS**, y compris un style pour `NULL` ou les noms de commande.
- **Le texte de `etape.p1`** (« je ne suis pas allé plus loin ») : il reste tel quel ; la nouvelle
  sous-section vient après lui, elle ne le réécrit pas.
- **`section3.intro` et son « cheminement en quatre temps »** : intouchable (voir le périmètre).
- **La mise en forme d'encart** — filet, retrait, fond, ou tout traitement qui distinguerait ce bloc
  des quatre temps à l'œil : c'est de la **mise en scène**, ligne 13. Ici, le seul porteur de la
  distinction est le **titre**, qui est un constat et non un moment du récit.
- **La classe d'extraction des tables elle-même** : la sous-section dit qu'elle est la voie, elle ne
  la décrit pas, ne la nomme pas et n'en montre aucun code. Un extrait C# de cette classe serait un
  incrément à part entière, à inscrire au fil s'il est voulu.
- **L'écart `CDEMST`** (troisième trou) : se tranche à la ligne 13 ou 14 par arbitrage inscrit au fil.
- **Les dettes [W33]-[W39]** et celles des sessions 21 et 22 : lignes 13 et 14.
- **L'état de la ligne 12 au fil** : geste manuel du chef de projet à l'atterrissage.

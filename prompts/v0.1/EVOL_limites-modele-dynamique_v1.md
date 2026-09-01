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

---

## Avenant 1 — 31 août 2026, après la passe iPhone 14 et la revue SHIP

**Motif.** Trois demandes du chef de projet à la lecture du rendu, plus deux réserves de la revue
(`review.json` sur `790e6ca`, réserves 4 et 5) qui lui revenaient. Un seul avenant, un seul commit :
un avenant après revue coûte une revue entière, on n'en paie qu'une.

**Le READY se retire d'abord** (`.pipeline/STATUS.md`), puis tu travailles, puis tu relances le
`reviewer` sur le nouveau commit et tu réécris READY en dernier.

### A — Les quatre voies passent en liste, et sortent du dictionnaire

`section3.limites.parade` est **réécrite sur place**, amputée de son énumération, qui devient une
liste sous le paragraphe. Motif imposé, déjà en place dans le site : `<ul class="arguments"
role="list">` (cf. `index.html` l. 234) et, dans chaque `li`, le nom de la commande **en dur** dans
un `<code>`, suivi d'un `<span data-i18n>` pour la glose — exactement le motif de la boîte à outils
(`<p><code>Dictionary&lt;&gt;</code> <span data-i18n="section3.boite.hors1"></span></p>`, l. 210).

**Trois problèmes se ferment d'un coup, et c'est le but** : les noms de commande ne se traduisent
pas, donc ils quittent le dictionnaire ; la barre oblique inverse de `\d` **disparaît des valeurs
JS** — la réserve 2 de la revue (« l'échappement n'a aucun porteur ») devient sans objet ; et chaque
voie peut enfin dire **sa nature**, ce que la réserve 4 demandait.

Nouvelle valeur FR de `section3.limites.parade` :

`La parade est connue, et elle vaut partout : demander la description à la base plutôt qu'à la donnée. Chaque base sait décrire ses tables, et rend le type et la nullabilité de chaque colonne, table vide ou pleine :`

Nouvelle valeur EN :

`The remedy is known, and it holds everywhere: ask the database for the description rather than the data. Every database can describe its tables, returning the type and nullability of every column, whether the table is empty or full:`

Puis, **après** la liste, un dernier `p`, `section3.limites.reste`, qui reprend la fin de l'ancienne
valeur — FR :

`Puis donner aux propriétés le droit d'être absentes, pour qu'un NULL reste un NULL et ne devienne jamais un zéro. Le prototype ne l'a pas fait. C'est une limite connue, pas une limite cachée.`

EN :

`Then give the properties the right to be absent, so that a NULL stays a NULL and never turns into a zero. The prototype did not do it. That is a known limit, not a hidden one.`

**Les quatre gloses** — groupe `section3.limites.voies`, clés `ibmi`, `postgres`, `sqlserver`,
`standard`, dans cet ordre. FR :

- `ibmi` : `sur IBM i, la vue catalogue de Db2 for i, interrogeable en SQL comme une table — là où la commande système DSPFFD demande un fichier de sortie pour être exploitable`
- `postgres` : `sous PostgreSQL, commande du client psql`
- `sqlserver` : `sous SQL Server, procédure appelable depuis le code`
- `standard` : `la vue standard, que la plupart des bases exposent, interrogeable en SQL`

EN :

- `ibmi` : `on IBM i, the Db2 for i catalog view, queried in SQL like any table — where the DSPFFD system command needs an output file before a program can use it`
- `postgres` : `in PostgreSQL, a psql client command`
- `sqlserver` : `in SQL Server, a stored procedure callable from code`
- `standard` : `the standard view, exposed by most databases, queried in SQL`

**La nature dite est l'arbitrage de la réserve 4.** Décision du chef de projet du 31 août 2026 :
côté IBM i, la voie publiée est la **vue catalogue interrogeable en SQL**, `QSYS2.SYSCOLUMNS`, et non
la commande `DSPFFD` — parce que la section décrit un chemin de code, et qu'une commande dont la
sortie va à l'écran n'automatise rien. Vérifié à la documentation IBM : les vues catalogue de
Db2 for i vivent dans `QSYS2` et s'interrogent « comme n'importe quelle autre table ». Il ne reste
donc qu'**une** voie non appelable depuis du code, `\d`, et la liste le dit. **Ne réécris pas ces
gloses** pour les « harmoniser » : leur dissymétrie est le contenu.

HTML, entre le `p` de la parade et le `p` de `reste` :

```html
      <ul class="arguments" role="list">
        <li><code>QSYS2.SYSCOLUMNS</code> — <span data-i18n="section3.limites.voies.ibmi"></span></li>
        <li><code>\d</code> — <span data-i18n="section3.limites.voies.postgres"></span></li>
        <li><code>sp_help</code> — <span data-i18n="section3.limites.voies.sqlserver"></span></li>
        <li><code>INFORMATION_SCHEMA.COLUMNS</code> — <span data-i18n="section3.limites.voies.standard"></span></li>
      </ul>
```

### B — Une règle CSS, et une seule (dérogation explicite à l'ÉTAPE 4)

L'ÉTAPE 4 interdisait toute règle CSS ; cet avenant en autorise **une**, et rien d'autre :

```css
.arguments code {
  font-family: var(--font-mono);
  font-weight: 600;
}
```

Motif : le contrat de design promet le rendu Plex Mono des noms de commandes en ligne depuis la
session 5 et ne l'a jamais tenu ; ces quatre noms sont son premier porteur. **Aucune couleur** n'est
touchée, donc aucune ligne de contraste n'est due. Si tu penses qu'une seconde règle est nécessaire,
ARRÊTE-TOI et signale.

### C — La portée de la réserve, dans `contraintes` (réserve 5)

Dans `section3.limites.contraintes`, **cinq mots ajoutés** pour que la réserve couvre aussi la
phrase du piège. FR, la phrase devient :

`Un piège s'y ajoute, plus discret, constaté de la même façon : sur une ligne suivante, un NULL dans une colonne numérique devient zéro sans un mot.`

EN :

`One trap comes on top, and it is quieter, observed the same way: on a later row, a NULL in a numeric column silently becomes zero.`

Le reste de la valeur ne bouge pas.

### D — Le lien vers la fabrique, sous la boîte à outils

Trois clés neuves dans le groupe `section3.renversement`, après `p3` : `fabrique`, `fabriqueLien`,
`fabriqueUrl`. FR :

- `fabrique` : `L'extrait ci-dessus est recréé pour la lecture. Le mécanisme complet, lui, est public : une solution .Net que j'ai publiée, où la classe est fabriquée par réflexion, propriété par propriété.`
- `fabriqueLien` : `La fabrique du modèle en C#, sur GitHub`
- `fabriqueUrl` : `https://github.com/lianazel/API.Response.Dynamic.Model/blob/master/API.Response.Dynamic.Model.Framework/Services/ApiDynamicModelOnDemand.cs`

EN :

- `fabrique` : `The extract above is recreated for reading. The full mechanism is public: a .Net solution I published, where the class is built by reflection, property by property.`
- `fabriqueLien` : `The model factory in C#, on GitHub`
- `fabriqueUrl` : la **même adresse** que le français — le dépôt n'a pas de version anglaise, comme
  `section5.depotUrl`. Ce n'est pas une erreur de parité.

HTML : **entre `</details>` (fin de la boîte à outils) et `<p data-i18n="section3.renversement.p3">`**
(`index.html` l. 211-213). L'ordre compte : `p3` annonce ce qui « vient juste après », c'est-à-dire
le bloc `etape` ; le lien s'insère **avant** `p3`, il ne s'intercale pas entre `p3` et `etape`.

Deux `p` : la prose, puis le lien seul, au motif d'« À propos » et de la section 5 — `target="_blank"`,
`rel="noopener noreferrer"`, `data-i18n` pour le texte, `data-i18n-attr="href:…"` pour l'adresse, et
le `href` de repli en dur.

**Le libellé ne dit pas « pour les curieux »** : la formule est déjà celle du `summary` juste
au-dessus, à trois lignes de là.

### E — Le fil

Ajouter à l'entrée **[W39]** (les liens en nouvel onglet) : le compte passe de **trois à quatre**
liens `_blank` du fait de cet avenant ; le motif reste à trancher une fois à la ligne 13.

Inscrire, à la suite de l'entrée [W20] déjà remboursée, une ligne : **l'arbitrage de la réserve 4
est rendu** — la nature de chaque voie est dite dans la liste, pas de renvoi à la ligne 13.

### F — Preuves de l'avenant (recalées ; mesurées sur la branche le 31 août 2026)

Bases **avant** l'avenant, mesurées : `data-i18n="` **223** · `data-i18n-attr="` **10** ·
`<h3` **19** · `target="_blank"` **3** · `' je '` dans `js/i18n.js` **7** ·
`data-i18n="section3.limites` **5**.

1. `grep -o 'data-i18n="' index.html | wc -l` = **229** (223 + 4 gloses + `fabrique` + `fabriqueLien`).
2. `grep -o 'data-i18n="section3.limites' index.html | wc -l` = **10** (5 + 4 gloses + `reste`).
3. `grep -o 'data-i18n-attr="' index.html | wc -l` = **11** (10 + 1).
4. `grep -o 'target="_blank"' index.html | wc -l` = **4** (3 + 1).
5. `grep -o '<h3' index.html | wc -l` = **19**, **inchangé** : l'avenant n'ajoute aucun titre.
6. `grep -c 'DSPFFD' js/i18n.js` = **0** et `grep -c 'sp_help' js/i18n.js` = **0** — les noms de
   commande ont quitté le dictionnaire. **Si tu lis autre chose : ARRÊTE-TOI.**
7. `grep -c '\\\\d' js/i18n.js` = **0** — plus aucune barre oblique inverse échappée dans les valeurs
   (la réserve 2 de la revue devient sans objet). La preuve 6 de l'ÉTAPE 6, qui la mesurait, est
   **caduque** : ne la rejoue pas, dis-le dans `test-results.md`.
8. `grep -c '<code>QSYS2.SYSCOLUMNS</code>' index.html` = **1** · `grep -c 'DSPFFD' index.html` = **0**
   (le nom de la commande ne vit que dans la glose traduite, pas dans le HTML) · `grep -c 'ApiDynamicModelOnDemand.cs' index.html` = **1**
   (le repli en dur) · `grep -c 'ApiDynamicModelOnDemand.cs' js/i18n.js` = **2** (FR et EN, même adresse).
9. `grep -o ' je ' js/i18n.js | wc -l` = **7**, **inchangé** — « que j'ai publiée » ne porte pas le
   mot « je ». **Si tu lis autre chose : ARRÊTE-TOI.**
10. `grep -c 'font-weight: 600' css/styles.css` : une occurrence **de plus** qu'avant l'avenant
    (mesure la valeur avant, ne la suppose pas). `git diff --stat` sur `css/styles.css` : **une seule
    règle ajoutée**, aucune modifiée.
11. `npm test` : **356/356**.
12. `git diff --stat` ne touche que `js/i18n.js`, `index.html`, `css/styles.css`, `tasks/ROADMAP.md`
    et ce prompt.

### G — Hors périmètre de l'avenant

- **Le gras sur « IBM i, SQL Server, PostgreSQL »** dans `section3.limites.cause` : il faudrait un
  balisage dans les valeurs, que `applyI18n` ne sait pas rendre (`textContent`, mesuré). Écarté :
  la liste porte désormais la mise en valeur. Le mécanisme, s'il est voulu un jour, est un incrément
  d'outillage.
- **Toute autre règle CSS**, toute couleur, tout jeton.
- **Les clés de la section 5 et le motif de lien lui-même** : [W39], ligne 13.
- **Le dépôt lié** (son contenu, ses fichiers `.snk`) : il n'appartient pas à ce dépôt-ci.
- **ANONYMISATION P1, rappel exprès.** Le chef de projet a montré une requête réelle à l'appui de cet
  arbitrage. **Rien n'en est repris** : aucun nom de table, de bibliothèque, de colonne, aucune adresse
  IP, aucune capture. Seuls le **nom qualifié de la vue système** et la nature de la voie entrent au
  livrable. Si tu trouves dans ce prompt un identifiant qui ressemble à un objet réel, ARRÊTE-TOI.

---

## Avenant 2 — 31 août 2026, machine à l'arrêt

**Annoncé avant d'être écrit, l'agent arrêté et en attente d'arbitrage** — c'est la seule fenêtre où
un prompt gelé s'amende (§4.1 du référentiel, règle du prompt gelé, v2.23).

**Motif.** Décision du chef de projet à la lecture du rendu : le lien de la fabrique C# est trop
technique pour le fil de lecture principal. Il rejoint le **bloc dépliable** « Pour les curieux : la
boîte à outils », dont il est la suite naturelle — le fichier lié **implémente les neuf classes que
le tableau énumère** (`AssemblyName`, `AssemblyBuilder`, `TypeBuilder`… vérifié à la source). Le pli
fait le tri : qui n'ouvre pas le bloc n'a pas besoin du lien ; qui l'ouvre en est le destinataire.

### A — Les deux `p` du §D quittent leur emplacement

Le §D de l'avenant 1 plaçait la prose et le lien **entre `</details>` et
`<p data-i18n="section3.renversement.p3">`. Ils n'y sont plus.** Ils entrent **dans** le `details`,
en dernières lignes, **après** `<p><code>List&lt;&gt;</code> …</p>` (`index.html` l. 211) et **avant**
`</details>`.

Rien d'autre ne bouge dans le bloc : ni le `summary`, ni le tableau, ni le conteneur de défilement,
ni les deux lignes `Dictionary<>` / `List<>`.

### B — La prose est réécrite : elle s'appuie sur le tableau, plus sur l'extrait

`section3.renversement.fabrique` est **réécrite sur place**. Motif : la valeur de l'avenant 1 disait
« l'extrait **ci-dessus** » ; dans le bloc, le tableau s'intercale et le renvoi devient faux.

- FR : `Ces neuf classes ne sont pas une théorie : elles travaillent ensemble dans une solution .Net que j'ai publiée, où la fabrique est lisible en entier.`
- EN : `These nine classes are not theory: they work together in a .Net solution I published, where the whole factory can be read.`

`fabriqueLien` et `fabriqueUrl` **ne changent pas**, dans les deux langues — « La fabrique du modèle
en C#, sur GitHub » / « The model factory in C#, on GitHub ». Le motif du lien non plus :
`target="_blank"`, `rel="noopener noreferrer"`, `data-i18n` + `data-i18n-attr`, `href` de repli en dur.

### C — Le fil

Ajouter à l'entrée **[W39]** que le quatrième lien `_blank` **vit dans un bloc replié par défaut** :
il n'est atteignable qu'après un geste du lecteur. Le motif reste à trancher une fois à la ligne 13,
mais la surface exposée d'emblée n'a pas bougé.

Inscrire aux **« Décisions actées »**, sous la formulation du chef de projet du 31 août 2026 :

> **Le lien de la section 3 vers le dépôt `API.Response.Dynamic.Model` est maintenu** — arbitrage du
> chef de projet du 31 août 2026 (réserve du `reviewer` sur l'avenant 1). Motif : le lien pointe
> **une classe** d'un dépôt **déjà public** ; il ne crée aucune exposition. Les identifiants qu'y a
> relevés la revue sont des **valeurs de test**, et la solution n'est pas en production. **Le lien
> vit dans le bloc dépliable** : le lecteur choisit d'y aller.

### D — Preuves de l'avenant 2

1. `grep -o 'data-i18n="' index.html | wc -l` : **inchangé** par rapport à l'état d'après l'avenant 1
   (mesure la valeur avant de déplacer, ne la suppose pas — le déplacement n'ajoute ni ne retire
   aucune clé).
2. `grep -o 'target="_blank"' index.html | wc -l` = **4**, inchangé.
3. Les deux `p` sont **dans** le `details` : la ligne de `<p data-i18n="section3.renversement.fabrique">`
   est **inférieure** à celle de `</details>`, et **supérieure** à celle de `<p><code>List&lt;&gt;</code>`.
   Vérifie-le par les numéros de ligne, pas à l'œil.
4. `grep -c "l'extrait ci-dessus\|The extract above" js/i18n.js` = **0** — l'ancienne prose a disparu
   des deux langues. **Si tu lis autre chose : ARRÊTE-TOI.**
5. `grep -c 'Ces neuf classes' js/i18n.js` = **1** · `grep -c 'These nine classes' js/i18n.js` = **1**.
6. `grep -c 'fabriqueLien' js/i18n.js` = **2**, inchangé ; les deux libellés sont **identiques** à
   ceux de l'avenant 1, au caractère près.
7. `npm test` : **356/356**.
8. `git diff --stat` ne touche que `js/i18n.js`, `index.html` et `tasks/ROADMAP.md`.

### E — Hors périmètre

- **Le contenu du bloc dépliable** : tableau, gloses, lignes `Dictionary<>` / `List<>`, résumé.
- **Toute règle CSS**, y compris pour le lien dans le bloc — il hérite du style des liens du site.
- **`section3.renversement.p3`** et le bloc `etape` : intouchés, leurs raccords tiennent.
- **La sous-section « limites »** : elle est atterrie telle quelle, cet avenant ne la touche pas.

---

## Avenant 3 — 1er septembre 2026, après la passe iPhone 14, machine à l'arrêt

**Annoncé avant d'être écrit, `READY` posé et l'agent en attente.** Trois retouches du chef de projet
à la lecture du rendu. **Le READY se retire d'abord**, puis tu travailles, puis tu relances le
`reviewer` sur le nouveau commit et tu réécris READY en dernier. La revue `SHIP` sur `62771aa` est
sciemment invalidée : le chef de projet en paie une troisième passe.

### A — La glose de `\d` dit où la commande s'exécute

**Motif, et il vient d'une erreur réelle.** Le chef de projet a testé `\d` dans **pgAdmin** et a reçu
`syntax error`. Deux causes : pgAdmin envoie la ligne au **serveur** comme du SQL, alors que `\d` est
interprétée par le **client psql** lui-même, et la barre oblique inverse se confond à l'œil avec la
barre normale. La glose actuelle dit « commande du client psql » — exact, mais le lecteur peut faire
exactement la même erreur. Elle se précise.

- FR, `section3.limites.voies.postgres` : `sous PostgreSQL, commande du client psql — elle s'exécute dans psql, pas dans un éditeur SQL comme pgAdmin, qui l'enverrait au serveur`
- EN, `section3.limites.voies.postgres` : `in PostgreSQL, a psql client command — it runs inside psql, not in a SQL editor such as pgAdmin, which would send it to the server`

**Les trois autres gloses ne bougent pas.** N'« harmonise » pas leur longueur : celle-ci est plus
longue parce qu'elle évite un faux pas mesuré, les autres n'en ont pas besoin.

### B — Les quatre tirets deviennent des flèches

Dans `index.html`, la liste des voies (l. 233-236 à l'état d'après l'avenant 2) sépare le `<code>` de
sa glose par un tiret cadratin `—`. Les **quatre** deviennent une **flèche vers la droite `→`**
(U+2192), au même emplacement, avec les mêmes espaces autour.

Les tirets sont **en dur dans le HTML**, hors dictionnaire : un seul geste vaut pour les deux langues.
Ne touche à **aucun autre** `—` de la page — la glose IBM i en porte un à l'intérieur de sa valeur
(« comme une table — là où la commande système DSPFFD… »), et celui-là reste un tiret.

### C — La prose du lien dit que le code est commenté en français

`section3.renversement.fabrique` est **réécrite sur place**, une parenthèse ajoutée en fin de valeur :

- FR : `Ces neuf classes ne sont pas une théorie : elles travaillent ensemble dans une solution .Net que j'ai publiée, où la fabrique est lisible en entier (le code est commenté en français).`
- EN : `These nine classes are not theory: they work together in a .Net solution I published, where the whole factory can be read (the code is commented in French).`

`fabriqueLien` et `fabriqueUrl` ne changent pas.

### D — Preuves de l'avenant 3

1. `grep -c '</code> → <span' index.html` = **4** · `grep -c '</code> — <span' index.html` = **0**.
   **Si tu lis autre chose : ARRÊTE-TOI.**
2. `grep -c 'pgAdmin' js/i18n.js` = **2** (une par langue).
3. `grep -c 'commenté en français' js/i18n.js` = **1** · `grep -c 'commented in French' js/i18n.js` = **1**.
4. `grep -o 'data-i18n="' index.html | wc -l` : **inchangé** — aucune clé ajoutée ni retirée
   (mesure la valeur avant, ne la suppose pas).
5. `grep -c 'DSPFFD' js/i18n.js` = **2**, inchangé : la glose IBM i n'est pas touchée.
6. `grep -o ' je ' js/i18n.js | wc -l` : **inchangé** (mesure avant ; la parenthèse n'ajoute pas de « je »).
7. `npm test` : **356/356**.
8. `git diff --stat` ne touche que `js/i18n.js`, `index.html` et ce prompt.

### E — Hors périmètre

- **Les gloses `ibmi`, `sqlserver`, `standard`** : intouchées.
- **Toute règle CSS**, y compris pour la flèche.
- **Le libellé et l'URL du lien**, le motif du lien, sa place dans le bloc dépliable.
- **La sous-section « limites » et ses quatre paragraphes**, hors la valeur nommée en §A.

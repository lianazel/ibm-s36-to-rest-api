# EVOL — Section « La solution » : le cheminement en quatre temps, la prose seule

**Fichier** : `prompts/v0.1/EVOL_section-la-solution_v1.md`
**Type** : EVOL (contenu) · **Branche** : `feat/section-la-solution` · **Révision** : v1 · **Date** : 18 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | Prose fournie ci-dessous, relue : S-1 (aucun cadratin reliant deux propositions), S-2 (aucun adjectif sur soi, que des faits), S-3 (aucun mot rangeant une compétence en dessous), S-4 (chaque langue s'adresse à son lecteur, l'anglais n'est pas une traduction mot à mot). **Ne réécris pas la prose.** |
| `UX_METHOD` | — | Appliqué | La structure HTML ajoutée reprend **exactement** le motif de la section 1 : un `h3` puis des `p`, aucun style nouveau, aucune classe nouvelle. Mobile-first conservé par construction. |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Contrainte de formulation : aucune assertion de protection non mesurée. Les mots « protégé », « sécurisé », « contrôlé » ne figurent nulle part dans la prose livrée. Ce qui n'est pas construit est écrit au futur. |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée. Les deux portes existantes couvrent **mécaniquement** les clés ajoutées : parité FR/EN (mêmes clés des deux côtés) et résolution HTML vers dictionnaire. |
| `VISION_METHOD` | — | Écarté | Aucun gate de rendu à ce stade du jalon 1. |
| `SQL_METHOD` | — | Écarté | Aucune base, aucune requête, aucun schéma. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_section-la-solution_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.9** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 11`.
3. `npm test` vert sur `main` (134/134).
4. `js/i18n.js` contient **exactement six** occurrences du texte d'attente : trois `La suite de ce chapitre arrive.` et trois `This chapter is coming soon.` Compte-les avec un motif large sur le fichier entier. Un autre compte → **ARRÊTE-TOI et signale**.
5. `index.html` contient `data-i18n="section3.title"` et `data-i18n="section3.intro"`, et la section 1 y est structurée en `h3` + `p` (motif à reprendre).

## Contexte et périmètre

Troisième contenu du jalon 1. La section « La solution » raconte un **cheminement de recherche en quatre temps**, dans la forme des sous-chapitres de la section 1.

**Périmètre : la prose seule.** `js/i18n.js` (clés ajoutées, deux langues) et `index.html` (structure des quatre sous-chapitres). **Rien d'autre.**

**Hors périmètre, explicitement.** N'ajoute rien de tout cela : aucun extrait de code, aucun bloc dépliable, aucun tableau, aucune image, aucun SVG, aucun CSS, aucun test. Ces éléments font l'objet d'incréments distincts. Si la prose te semble appeler une illustration, **n'en ajoute pas** : signale-le dans `changes.md`.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/section-la-solution` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL section-la-solution` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable A : les clés du dictionnaire

Dans `js/i18n.js`, remplace la valeur de `section3.intro` et **ajoute** quatre groupes sous `section3`, dans cet ordre : `modele`, `mur`, `renversement`, `etape`. Chaque groupe porte `title`, puis `p1`, puis `p2` et `p3` **là où ils sont fournis ci-dessous**, et nulle part ailleurs. Mêmes clés exactement des deux côtés.

`section3.title` **ne change pas**. Les autres sections **ne changent pas**.

### Côté français

**`section3.intro`** : Mon métier, c'est l'IBM i. J'ai découvert C# et .Net au travers d'opportunités professionnelles. Ce qui suit n'est pas une recette. C'est un cheminement, en quatre temps, tel qu'il s'est passé.

**`section3.modele.title`** : Un modèle de données écrit à la main, pour tester une idée

**`section3.modele.p1`** : L'idée tient en une phrase. Si le fichier ne dit rien de lui-même, alors quelqu'un doit le dire à sa place, une fois, à un seul endroit. Ce quelqu'un est une classe écrite à la main. Chaque propriété y porte le nom que les gens emploient, et une étiquette posée au-dessus d'elle porte le nom physique de la colonne, celui de six caractères. Le programme relit ses propres étiquettes pendant qu'il tourne, ce qu'on appelle la réflexion, et il en tire un dictionnaire.

**`section3.modele.p2`** : Ce dictionnaire travaille dans les deux sens. Il nomme ce qui sort, puisque le flux JSON renvoyé porte les noms métier. Il traduit ce qui entre, puisqu'un filtre écrit avec un nom métier devient un nom de colonne dans la requête. Une même donnée peut s'appeler autrement d'un fichier à l'autre et retomber pourtant sur un seul nom. C'est là que le fichier commence à parler.

**`section3.mur.title`** : L'idée fonctionne. La réalité me rattrape

**`section3.mur.p1`** : L'idée fonctionne, et c'est justement ce qui la condamne. L'application dont je parle compte des centaines de tables. Chaque question posée aux données réclame sa méthode dans le service web, sa requête écrite d'avance avec ses colonnes figées, et sa classe écrite à la main pour correspondre à cette requête. Trois choses par question. Le coût n'est pas de les écrire une fois : il est de les maintenir toutes, ensuite. Une colonne ajoutée quelque part, et il faut retrouver les trois. Personne n'a envie de passer ses journées à écrire ces classes, et chaque saisie est une occasion de se tromper.

**`section3.renversement.title`** : Je renverse le problème : la machine fera le travail

**`section3.renversement.p1`** : Les modèles dynamiques, en revanche, je ne les connaissais pas avant ce projet. Alors j'ai renversé le problème. Si le travail consiste à décrire des colonnes une par une, ce n'est pas un travail d'humain. C'est la requête qui porte les noms métier, en renommant ses colonnes au passage, et c'est la machine qui fabrique la classe correspondante.

**`section3.renversement.p2`** : Le mécanisme tient en quelques gestes. La requête n'est pas connue du code avant l'appel. Le programme regarde les colonnes qu'elle renvoie, relève leur nom et leur type, et construit une classe pendant qu'il tourne, une seule fois. Puis il parcourt les lignes et verse chaque valeur dans une instance de cette classe. Le modèle est un moule : fabriqué une fois, chaque ligne y est coulée. Le moule est jeté quand l'appel se termine, et rien n'en est conservé. Une autre requête au prochain appel donne un autre moule, sans qu'une ligne de code ait changé.

**`section3.renversement.p3`** : À ce stade, je cherchais une seule réponse : est-ce que l'idée tient. Ce qu'un appelant a le droit de demander est une question de produit, pas de prototype, et elle vient juste après.

**`section3.etape.title`** : Le noyau tourne. Il restait une étape

**`section3.etape.p1`** : Le noyau tourne, et je ne suis pas allé plus loin. Il restait une étape. Une requête mise au point pour l'API mériterait d'être enregistrée plutôt que ressaisie : l'appelant la désignerait alors par son nom, et non par son texte. C'est cette étape qui en aurait fait un produit. Pas parfait, mais intéressant. Restreindre ce qu'une requête a le droit de faire appartient au même chantier, celui d'après.

### Côté anglais

**`section3.intro`** : My trade is IBM i. C# and .Net came to me through the work I was given. What follows is not a recipe. It is a path, in four steps, the way it actually happened.

**`section3.modele.title`** : A data model written by hand, to test an idea

**`section3.modele.p1`** : The idea fits in one sentence. If the file says nothing about itself, then someone has to say it instead, once, in a single place. That someone is a class written by hand. Each property carries the name people actually use, and a tag placed above it carries the physical column name, the six-character one. The program reads its own tags back while it runs, which is called reflection, and builds a dictionary from them.

**`section3.modele.p2`** : That dictionary works both ways. It names what goes out, since the JSON returned carries the business names. It translates what comes in, since a filter written with a business name becomes a column name in the query. The same piece of data may go by another name in another file and still land on a single name. That is where the file starts to speak.

**`section3.mur.title`** : The idea works. Reality catches up with me

**`section3.mur.p1`** : The idea works, and that is exactly what dooms it. The application I am talking about holds hundreds of tables. Every question put to the data calls for its own method in the web service, its own query written in advance with fixed columns, and its own hand-written class to match that query. Three things per question. The cost is not writing them once: it is maintaining all of them afterwards. One column added somewhere, and all three have to be found again. Nobody wants to spend their days writing those classes, and every keystroke is a chance to get it wrong.

**`section3.renversement.title`** : I turn the problem around: the machine will do the work

**`section3.renversement.p1`** : Dynamic models, though, were new to me when I started this. So I turned the problem around. If the work consists of describing columns one by one, it is not work for a human. The query carries the business names, renaming its columns as it goes, and the machine builds the matching class.

**`section3.renversement.p2`** : The mechanism comes down to a few moves. The query is unknown to the code until the call. The program looks at the columns it returns, notes their name and their type, and builds a class while it runs, once only. Then it walks the rows and pours each value into an instance of that class. The model is a mould: cast once, every row is poured into it. The mould is thrown away when the call ends, and nothing is kept. Another query on the next call gives another mould, without a single line of code having changed.

**`section3.renversement.p3`** : At that stage I was after one answer: does the idea hold. What a caller is allowed to ask for is a product question, not a prototype one, and it comes right after.

**`section3.etape.title`** : The core runs. One step was left

**`section3.etape.p1`** : The core runs, and I did not take it further. One step was left. A query tuned for the API would deserve to be stored rather than retyped: the caller would then name it, instead of sending its text. That step is what would have made it a product. Not a perfect one, but an interesting one. Restricting what a query is allowed to do belongs to the same job, the next one.

## ÉTAPE 3 — Livrable B : la structure HTML

Dans `index.html`, à l'intérieur de la section de la solution, sous le `p` portant `section3.intro`, ajoute les quatre sous-chapitres **dans l'ordre** `modele`, `mur`, `renversement`, `etape`, en reprenant **exactement** le motif de la section 1 : un `h3` porteur de `data-i18n="section3.<groupe>.title"`, suivi d'un `p` par paragraphe fourni.

Onze éléments ajoutés au total : quatre `h3` et sept `p`. Le `p` portant `section3.intro` existe déjà et ne se duplique pas. Aucun attribut, aucune classe, aucun style en plus.

## ÉTAPE 4 — Preuves

1. `npm test` vert : **134/134**, aucun test ajouté ni retiré.
2. `git diff main...HEAD --stat` : **deux** fichiers (`js/i18n.js`, `index.html`). `git diff main...HEAD -- css tests tools .claude` : **vide**.
3. Comptage du texte d'attente, motif large, fichier entier, **avant et après**, les deux chiffres consignés : **6 avant, 4 après** (une occurrence retirée par langue). Un autre résultat après → ARRÊTE-TOI et signale.
4. Parité : le nombre de clés sous `section3` est **identique** des deux côtés. Consigne les deux nombres.
5. Cadratins : `grep -c "—" js/i18n.js` et `grep -c "—" index.html` avant et après. **Mêmes nombres.** Consigne-les.
6. Aucun des mots suivants n'apparaît dans les valeurs ajoutées, dans l'une ou l'autre langue : `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. Consigne la commande et son résultat.
7. `grep -c "section3" index.html` : **2 avant, 13 après** (onze lignes ajoutées). Aucune autre section touchée.

## ÉTAPE 5 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js` et `index.html` seuls) : `feat(solution): le cheminement en quatre temps, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, écris READY. Si `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL section-la-solution — <ISO> — feat/section-la-solution — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les **douze** valeurs françaises et les **douze** valeurs anglaises écrites **exactement** comme ci-dessus, sans réécriture ni reformulation. Vingt-quatre valeurs au total.
2. **Onze** éléments ajoutés à `index.html`, motif de la section 1 respecté, aucun style nouveau.
3. Suite verte 134/134. Texte d'attente : 6 avant, 4 après. Aucun cadratin ajouté.
4. Aucun extrait de code, bloc dépliable, tableau, image ni CSS ajouté.
5. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

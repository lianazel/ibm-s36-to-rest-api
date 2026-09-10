# EVOL — Les coulisses, second bloc : la machine, l'humain, et la porte qui passe à trois clés

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_coulisses-machine-humain_v1.md` · **Ligne du fil** : `12 septies`, « Les coulisses » (voir Prérequis 3)

**Sujet neuf.** Le sujet `EVOL_les-coulisses` porte trois refus du `prompt-reviewer` et son verrou n'est pas levé. Il a été découpé le 10 septembre 2026 par le chef de projet. Le premier morceau, `EVOL_coulisses-arret`, a été relu `SHIP` du premier coup et atterri le même jour. Ce prompt est le **second morceau**, et le dernier : il porte les deux sous-titres restants.

**Taille** : petit incrément, deux objets de même forme. **Quatre fichiers** : `js/i18n.js` (vingt valeurs neuves, dix par langue), `index.html` (dix éléments neufs dans la section 5, aucun retiré), `css/styles.css` (**un commentaire réécrit, aucune règle changée, aucune règle neuve**), `tests/coulisses.test.js` (la porte existante passe d'une clé à trois).

**Le chapitre « La méthode » passe d'un sous-titre à trois.** Aucun autre chapitre du site ne bouge, aucun texte publié n'est réécrit.

**Règle de comptage, à tenir dans tout ce prompt** : `grep -c` compte des **lignes**, `grep -o … | wc -l` compte des **occurrences**, un listage compte des **objets**. Chaque nombre ci-dessous dit lequel des trois il est.

## Mode d'exécution

**AUTO MODE ON : autorisé.**

**Motif.** Les douze preuves de l'ÉTAPE 6 sont toutes mécaniques et constatables **par toi seul** : des comptages, une suite de tests, un relevé de diff. Aucune ne demande un témoin humain. Aucun appel au navigateur n'est prescrit, donc **aucune règle `ask` n'est déclenchée** : tu ne resteras jamais suspendu à une question posée sur l'écran du chef de projet.

**Ce qui l'aurait interdit** : une preuve de rendu, une règle `ask` à éprouver, ou un jugement d'aspect. Les trois sont hors périmètre et restent au chef de projet, après l'atterrissage.

**La borne ne bouge pas.** Autorisé à usiner seul ne veut pas dire autorisé à conclure seul : tu t'arrêtes à `READY`, tu ne fusionnes pas, tu ne pousses pas. Tout `ARRÊTE-TOI` de ce prompt reste un arrêt franc, mode automatique compris.

## Satellites consultés (Core §8.1, table de déclenchement)

| Satellite | Statut | Ce qui en est appliqué, ou le motif de l'écart |
|---|---|---|
| `STYLE_METHOD` + `STYLE_PROFILE` | **Appliqué** | S-1 : **aucun tiret cadratin** dans les vingt valeurs neuves. S-2 : les deux blocs citent des faits que le lecteur peut recouper dans le dépôt public, jamais une qualité qu'on s'attribue. S-4 : les deux citations restent **en français dans les deux langues**, comme `section5.arret.citation` et le bloc à deux voix. Un artefact se cite, il ne se traduit pas. |
| `UX_METHOD` | **Appliqué** | Mobile-first. Le motif `h3` + `p` + `p.citation` existe déjà **une fois** dans ce chapitre et quatre fois dans « Le décor » : l'incrément le **réemploie deux fois**, il n'invente aucune mise en page. Les deux citations neuves doivent **se replier** à 320 px, jamais élargir la page. |
| `ASSURANCE_METHOD` couche A | **Appliqué** | L'incrément **étend une porte existante** de une à trois clés. Preuve de morsure rejouée sur **chacune des deux clés neuves** (ÉTAPE 6, preuve 7). Garde de non-vacuité conservée, seuils souples, témoins joués **en mémoire** (ÉTAPE 5). |
| `VISION_METHOD` | **Appliqué**, §3 et §4 | Le chapitre change de géométrie : deux titres et deux blocs cités de plus. Le palier 0 n'est **pas jouable par toi** : le serveur Playwright refuse `file:`, le dépôt n'a pas de serveur local, et chaque appel au navigateur pose une question au chef de projet. **Tu ne fais aucune vérification de rendu.** Ta part est de ne pas produire de débordement : voir l'ÉTAPE 4. |
| `AGENT_SCOPE_METHOD` | **Écarté** | Aucun geste hors dépôt. Les témoins de la porte se jouent **en mémoire**, par la source injectable déjà en place. Aucun fichier temporaire, aucune écriture hors de l'arbre, aucune écriture dans `.claude/`. |
| `PEDAGOGY_METHOD` + profil | **Écarté** | Ce satellite dit comment expliquer **au chef de projet**. Les vingt valeurs s'adressent au lecteur du site : c'est `STYLE_METHOD` qui les tient. Aucune explication au chef de projet n'est prescrite ici. |
| `SECURITY_METHOD` | **Écarté** | Aucune dépendance ajoutée ou modifiée (`package.json` et `package-lock.json` intouchés), aucun secret, aucune permission, aucune écriture dans `.claude/`. §3.3 sans objet. La règle P1 d'anonymisation, elle, s'applique et se vérifie : ÉTAPE 6 preuve 9. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_coulisses-machine-humain_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre lu : `CLAUDE.md` en entier, dont « Règles de sécurité » (tu n'installes rien, tu ne joins pas le réseau, tu ne pousses rien, tu ne fusionnes rien, tu n'écris pas dans `.claude/`), « Anonymisation », « Style du produit », « Le cas fictif » ; et `tasks/ROADMAP.md`, ligne `12 septies`.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le **10 septembre 2026 au soir** sur `main` à **`582b2f5`**, par lecture de fichiers. **Ce sha est le seul de ce prompt.** Remesure-les toutes : un nombre repris d'un document n'est pas mesuré.

1. `git branch --show-current` rend `main`. `grep '"version"' package.json` rend **0.1.28**. La base est `main` à **`582b2f5`**, et `git rev-list --count origin/main..main` rend **0**. Si `main` a avancé, inspecte **tous** les commits ajoutés, pas seulement le dernier : `git log --oneline --name-only 582b2f5..HEAD`. S'ils touchent `index.html`, `css/styles.css`, `js/i18n.js`, `tests/`, `prompts/v0.1/EVOL_annexe-s36_v1.md`, `tasks/JOURNAL_v0.1.md` ou `tasks/lessons.md`, les bases 4 à 10 sont périmées : **ARRÊTE-TOI**. Un commit qui ne touche que `tasks/ROADMAP.md` ne périme rien ici, et tu continues.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 32`. Sinon un usinage est en cours : **ARRÊTE-TOI**.
3. Le fil porte la ligne de cet incrément : `grep -c 'Les coulisses' tasks/ROADMAP.md` = **1** (lignes). Si 0 : **ARRÊTE-TOI**, le chef de projet ne l'a pas enregistrée.
4. **Les trois citations existent, mot pour mot, dans leur fichier source, une fois chacune.** Ce sont des **occurrences**. Les trois commandes, à lancer depuis la racine du dépôt :

   a) `grep -o 'Si tu lis 0, tu as supprimé des clés du mini-langage : ARRÊTE-TOI et signale.' prompts/v0.1/EVOL_annexe-s36_v1.md | wc -l` = **1**

   b) `tr '\n' ' ' < tasks/JOURNAL_v0.1.md | tr -s ' ' | grep -o "quatrième occurrence de l'erreur, restée dans le seul endroit que la correction n'a pas balayé" | wc -l` = **1**

   c) `grep -o 'Une suite entièrement verte ne dit rien du montage' tasks/lessons.md | wc -l` = **1**

   La commande (b) replie les blancs avant de chercher : la citation est **coupée par un retour à la ligne** dans le journal, entre « que la » et « correction ». Un `grep` direct rendrait **0** sans qu'aucune erreur n'ait été commise. C'est le même repli que celui de la porte.

   Si l'une des trois rend 0, la source a changé et la valeur que ce prompt prescrit est **fausse** : **ARRÊTE-TOI** et signale-le. **Tu ne modifies aucun de ces trois fichiers pour faire tomber un compte juste.**
5. Le chapitre porte **un seul** sous-titre aujourd'hui : `grep -c 'section5\..*\.title' index.html` = **1** (lignes). Ses clés distinctes sont au nombre de **20** : `grep -o 'section5\.[a-zA-Z0-9.]*' index.html | sort -u | wc -l` (objets). Et `grep -o 'data-i18n="section5' index.html | wc -l` = **19** (occurrences). Un écart sur l'un des trois : **ARRÊTE-TOI**.
6. Les deux blocs à créer n'existent nulle part. Lignes : `grep -c '^ *machine: {' js/i18n.js` = **0** et `grep -c '^ *humain: {' js/i18n.js` = **0**. Occurrences : `grep -o 'section5\.machine' index.html | wc -l` = **0** et `grep -o 'section5\.humain' index.html | wc -l` = **0**. Attention : **24 lignes** de `js/i18n.js` contiennent le mot « machine » dans de la prose (`grep -c 'machine'`, lignes). C'est le motif `^ *machine: {` qui fait foi, pas le mot. Un écart : **ARRÊTE-TOI**.
7. Le bloc `arret` est en place et sert de modèle : `grep -c '^ *arret: {' js/i18n.js` = **2** (lignes, une par langue) et `grep -c '^ *citation: "' js/i18n.js` = **2** (lignes). Si l'un des deux diffère : **ARRÊTE-TOI**.
8. La classe existe déjà et **se réemploie telle quelle** : `grep -c '^\.citation' css/styles.css` = **1** (lignes). Les jetons de couleur sont au complet : `grep -c '^  --color' css/styles.css` = **15** (lignes). **Tu ne crées aucun jeton et aucune règle CSS.** Si l'un des deux diffère : **ARRÊTE-TOI**.
9. La porte existe et **ne connaît qu'une clé** : `ls tests/coulisses.test.js` réussit, `ls tests/*.js | wc -l` = **9** (objets), et `grep -o 'section5\.arret\.citation' tests/coulisses.test.js | wc -l` = **3** (occurrences : la clé de la table `SOURCES`, l'exemple écrit dans le commentaire de `resolve`, et la constante `KEY`). Un écart : **ARRÊTE-TOI**, la porte n'est plus celle que ce prompt décrit.
10. Invariants du balisage, à ne pas bouger ailleurs que là où ce prompt le dit. Occurrences : `grep -o '<h3' index.html | wc -l` = **20** · `grep -o 'data-i18n="' index.html | wc -l` = **257** · `grep -o 'data-i18n-attr="' index.html | wc -l` = **11**. Un écart dit que le fichier n'est plus celui-ci : **ARRÊTE-TOI**.
11. `npm test` vert sur `main`. Dernier compte connu : **401/401** (`.pipeline/review.json`, champs `passed` et `total`, commit `4867fa2`, 10 septembre 2026), **non relancé depuis**. Si le total diffère, inscris-le dans `.pipeline/spec.md` et continue tant que tout est vert. Un rouge : **ARRÊTE-TOI**.
12. **L'arbre de travail est propre, à ce prompt près** : `git status --porcelain | grep -v 'prompts/v0.1/EVOL_coulisses-machine-humain_v1.md' | wc -l` = **0** (lignes). La seule ligne admise est celle du présent prompt, non suivi tant que le premier enregistrement n'a pas eu lieu. Si une autre sort : **ARRÊTE-TOI** et affiche-la, tu ne commites ni n'écartes rien qui ne soit pas à toi.

## Contexte et périmètre

Le chapitre « La méthode » explique une mécanique, puis montre **un artefact réel du dépôt** qui la prouve. Le premier bloc, atterri le 10 septembre 2026, montre une garde de prompt. Cet incrément livre les **deux derniers** : ce qu'une machine garde, et ce qu'aucune machine ne garde.

Les deux artefacts sont des **sorties du harnais**, pas de la doctrine : un refus daté du relecteur de prompts, inscrit au journal du dépôt, et le titre d'une leçon datée du registre. Les deux vivent déjà dans le dépôt public. Les publier sur le site ne divulgue rien de neuf.

**Un seul cadre sombre dans le chapitre, celui qui existe déjà.** Le registre sombre s'établit une fois. Les deux citations neuves sont en ligne, dans la prose, sur fond clair, dans la classe `.citation` déjà en place. C'est une règle de densité, pas une contrainte technique.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/coulisses-machine-humain`. Premier commit : le prompt, message exact de la règle du premier enregistrement ci-dessus. Puis `.pipeline/spec.md`.

## ÉTAPE 2 — Livrable A : les vingt valeurs (`js/i18n.js`)

Deux objets neufs, `machine` puis `humain`, sous `section5`, placés **après** `arret` et **avant** `dialogue`, dans les **deux** langues. Cinq clés chacun : `title`, `p1`, `p2`, `citation`, `p3`. Les valeurs sont données au caractère près : tu les recopies, tu ne les réécris pas.

### Français

**`machine.title`** : `Ce qu'une machine garde`

**`machine.p1`** : `La consigne est relue avant d'être exécutée, par un agent qui ne l'a pas écrite. Il est en lecture seule. Il n'a pas vu la conversation qui a produit la consigne, et c'est sa force : il lit le texte, pas l'intention qu'on avait en l'écrivant.`

**`machine.p2`** : `Le 8 septembre 2026, il a refusé une consigne pour un seul nombre faux, resté dans le message d'enregistrement qu'elle prescrivait, alors que tout le reste avait été corrigé. Le refus est inscrit au journal du dépôt, et sa phrase avec :`

**`machine.citation`** : `quatrième occurrence de l'erreur, restée dans le seul endroit que la correction n'a pas balayé`

**`machine.p3`** : `Un refus n'écrit rien : aucune branche, aucun enregistrement. La consigne est revenue à son auteur, a été corrigée, et c'est la révision suivante qui a été exécutée. Le nombre faux n'est jamais entré dans l'historique public.`

**`humain.title`** : `Ce qu'aucune machine ne garde`

**`humain.p1`** : `Une porte ne garde que ce qu'on lui a écrit. Le reste n'est gardé par personne. Le dire fait partie du travail.`

**`humain.p2`** : `Un jour, toute la suite de tests était verte et la page ne s'affichait plus. Les tests couvraient la logique ; aucun ne montait la page. La leçon est datée, enregistrée dans le dépôt avec les autres, et son titre suffit :`

**`humain.citation`** : `Une suite entièrement verte ne dit rien du montage`

**`humain.p3`** : `Le registre nomme mes erreurs autant que celles des agents. Une réserve de revue ne s'efface pas : elle est écrite, datée, et son remboursement attend son tour. Et certaines vérifications ne se délèguent pas du tout. La lecture au lecteur d'écran attend un humain, et elle attend depuis plusieurs incréments.`

### Anglais

**`machine.title`** : `What a machine holds`

**`machine.p1`** : `The instruction is reviewed before it runs, by an agent that did not write it. It is read-only. It never saw the conversation that produced the instruction, and that is its strength: it reads the text, not the intention behind it.`

**`machine.p2`** : `On 8 September 2026 it refused an instruction for a single wrong number, left in the commit message the instruction prescribed, when everything else had been corrected. The refusal is recorded in the repository's journal, in French, and so is its sentence:`

**`machine.citation`** : identique au français, au caractère près.

**`machine.p3`** : `A refusal writes nothing: no branch, no commit. The instruction went back to its author, was corrected, and the next revision is the one that ran. The wrong number never entered the public history.`

**`humain.title`** : `What no machine holds`

**`humain.p1`** : `A gate holds only what someone wrote into it. The rest is held by nobody. Saying so is part of the work.`

**`humain.p2`** : `One day the whole test suite was green and the page no longer displayed. The tests covered the logic; none of them mounted the page. The lesson is dated, recorded in the repository with the others, and its title says enough:`

**`humain.citation`** : identique au français, au caractère près.

**`humain.p3`** : `The register names my own mistakes as much as the agents'. A review reservation is never erased: it is written down, dated, and its repayment waits its turn. And some checks cannot be delegated at all. The screen-reader pass is waiting for a human, and it has been waiting for several increments.`

### Le commentaire à poser au-dessus des deux blocs neufs, dans les deux langues

Un seul commentaire, avant `machine`, en prose. Il dit que les deux valeurs `citation` sont **identiques dans les deux langues, à dessein** : le harnais s'écrit en français, un artefact se cite et ne se traduit pas, même choix que `arret` et que `dialogue` juste au-dessous. Il dit aussi que la porte `tests/coulisses.test.js` tient ces deux valeurs d'accord avec leur fichier source. Ce n'est pas un défaut de parité à corriger.

**Le commentaire déjà posé au-dessus de `arret` n'est pas touché.**

**Deux contraintes d'écriture, et la preuve 5 de l'ÉTAPE 6 en dépend :**

- **ne cite aucun numéro de ligne** dans ce commentaire ;
- **ne commence jamais une ligne par la chaîne** `citation:`.

**Mise en forme des quatre valeurs `citation`, imposée** : chacune s'écrit **sur la même ligne que sa clé**, jamais reportée à la ligne suivante. C'est le style déjà tenu par les vingt clés de `section5` : mesuré le 10 septembre 2026, aucune valeur reportée dans ce bloc, contre **21** lignes de ce genre ailleurs dans le fichier (`grep -cE '^ *[a-zA-Z0-9_]+: *$' js/i18n.js`, lignes).

## ÉTAPE 3 — Livrable B : le balisage (`index.html`)

Dix éléments neufs dans `<section id="methode">`, insérés **après** `<p data-i18n="section5.arret.p3"></p>` et **avant** le commentaire qui introduit le lien du dépôt. Aucun élément existant déplacé, renommé ou retiré.

```
<h3 data-i18n="section5.machine.title"></h3>
<p data-i18n="section5.machine.p1"></p>
<p data-i18n="section5.machine.p2"></p>
<p class="citation" data-i18n="section5.machine.citation"></p>
<p data-i18n="section5.machine.p3"></p>
<h3 data-i18n="section5.humain.title"></h3>
<p data-i18n="section5.humain.p1"></p>
<p data-i18n="section5.humain.p2"></p>
<p class="citation" data-i18n="section5.humain.citation"></p>
<p data-i18n="section5.humain.p3"></p>
```

Aucun `id` ajouté, aucune ancre, aucune entrée au sommaire : ces titres sont des sous-titres de chapitre, comme celui de `arret` et comme les quatre du « Décor », qui n'en portent pas non plus. **Aucun attribut `lang` n'est ajouté** : le chapitre n'en porte aucun aujourd'hui, et la question se traite pour tous ses porteurs à la fois, dans un prompt qui lui est propre ([W75]).

## ÉTAPE 4 — Livrable C : le commentaire de `.citation` (`css/styles.css`)

**Aucune règle CSS n'est créée, modifiée ou supprimée.** La classe `.citation` habille désormais trois citations au lieu d'une : c'est son **commentaire** qui devient faux, parce qu'il nomme un seul artefact et un seul fichier source. Tu le réécris, et c'est le seul changement de ce fichier.

Le commentaire réécrit doit :

- dire que la classe habille **les citations d'artefacts en ligne** du chapitre « La méthode », sans nommer aucun fichier source ni aucune date ;
- dire que la table des sources et la comparaison mot pour mot vivent dans `tests/coulisses.test.js` ;
- conserver les deux justifications déjà écrites : le fond sombre reste réservé au bloc à deux voix, et Plex Mono parce que c'est du texte de dépôt et non de la prose du site ;
- conserver la phrase qui explique `overflow-wrap` : la citation doit se replier à 320 px, jamais élargir la page ;
- **ne citer aucun rapport de contraste chiffré**. Les deux jetons réemployés portent déjà leur ligne de contraste au fichier ; le commentaire dit qu'elle y est, il ne la recopie pas. Un nombre recopié est un second porteur que rien ne tient d'accord.
- **ne citer aucun numéro de ligne.**

**Le texte se replie.** Les deux citations prescrites font **94** et **50 caractères** (**97** et **51 octets** en UTF-8), mesurées le 10 septembre 2026 sur les valeurs écrites à l'ÉTAPE 2. Règle de comptage, et elle n'est pas décorative : `wc -m` ne compte des caractères que si la locale est en UTF-8, et rend le nombre d'octets sinon. Pour remesurer : `LC_ALL=C.UTF-8 printf '%s' '<valeur>' | wc -m`. La plus longue des deux dépasse d'un tiers celle du bloc `arret` (77 caractères). À 320 px, en Plex Mono, ces lignes doivent **passer à la ligne**, jamais élargir la page ni forcer un défilement horizontal du document. C'est la contrainte dure de cette étape, et la règle existante la tient déjà : tu ne la modifies pas pour autant.

## ÉTAPE 5 — Livrable D : la porte passe d'une clé à trois (`tests/coulisses.test.js`)

La porte garde une chose, et cela ne change pas : **une citation publiée ne s'écarte jamais de son fichier source**. Elle en garde désormais trois. Tu conserves sa structure, ses fonctions et ses commentaires d'en-tête ; tu les étends.

**La table des sources**, porteur unique, en tête du fichier :

| Clé | Fichier source |
|---|---|
| `section5.arret.citation` | `prompts/v0.1/EVOL_annexe-s36_v1.md` |
| `section5.machine.citation` | `tasks/JOURNAL_v0.1.md` |
| `section5.humain.citation` | `tasks/lessons.md` |

**La porte lit trois fichiers du dépôt et n'en écrit aucun.** Deux d'entre eux, le journal et le registre des leçons, s'allongent à chaque atterrissage : c'est sans effet sur la porte, qui cherche une chaîne et ne compte rien.

**Ce qui est conservé tel quel** : la garde de non-vacuité et son plancher `MIN_SOURCE_CHARS`, la source injectable en paramètre par défaut, la résolution des chemins depuis l'emplacement du test, la normalisation qui replie **les blancs et rien d'autre**, et l'assertion booléenne dont le message porte seul la clé, son fichier source et la chaîne publiée.

**Les deux règles, jouées sur les trois clés** :

1. La valeur française est **contenue mot pour mot** dans son fichier source, après repli des blancs.
2. La valeur anglaise est **exactement** la valeur française. L'artefact ne se traduit pas.

Écris-les de façon à ce que **chaque clé rende son propre test nommé** : le rouge doit dire laquelle des trois a dérivé, sans qu'on ouvre le fichier.

**Aucune clé n'est écrite deux fois dans ce fichier.** La table `SOURCES` est le **seul** endroit où une chaîne de clé apparaît en littéral, commentaires compris ; les tests et les témoins les prennent de `Object.keys(SOURCES)`. Deux littéraux existants disparaissent donc : la constante `KEY`, et l'exemple `resolve(dict.fr, "section5.arret.citation")` du commentaire de `resolve`, à réécrire sans clé réelle. La preuve 6 de l'ÉTAPE 6 le mesure. Ce n'est pas un remboursement de dette, c'est l'effet mécanique du passage à trois : une porte à trois clés ne peut pas en porter une seule. Cela vaut d'être écrit au journal comme tel.

**Les témoins de vivacité**, joués **en mémoire**, sans écrire ni déplacer aucun fichier. Ils tournent sur **une** clé, prise de la table, jamais retapée :

3. Un contenu source vide fait **lever** la garde de cécité, avec son message d'aveuglement.
4. Une valeur de dictionnaire vide la fait lever aussi.
5. Une valeur écartée d'un seul caractère de sa source fait **échouer** la comparaison. Le témoin assère sur le motif propre à l'échec de comparaison, **`ne se lit plus mot pour mot`**, et vérifie **en plus** que le message nomme la clé fautive. Il n'assère **pas** sur le seul nom de la clé : les deux messages d'aveuglement le portent aussi, donc ce motif seul ne distingue pas les deux chemins. Mesuré en miroir le 10 septembre 2026 sur la porte à une clé : en portant `MIN_SOURCE_CHARS` à dix millions, l'ancien témoin restait vert alors que le contrôle d'écart ne tournait plus ([W74]).
6. La normalisation ne touche que les blancs, jamais la casse ni la ponctuation.

**Ce que cette porte ne fait pas**, et qui doit rester dit dans son commentaire d'en-tête : elle ne juge pas la prose autour des citations, elle ne vérifie pas que les fichiers source veulent toujours dire la même chose, elle ne regarde pas le rendu, et elle ne joint aucun réseau. Elle garde une concordance de chaînes dans le dépôt, rien d'autre.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat. Un écart n'est pas une alarme, c'est une question : décompose avant de conclure, et **ne déforme jamais un fichier pour satisfaire un nombre**.

1. `index.html`, occurrences : `grep -o '<h3' index.html | wc -l` = **22** (20 + 2) · `grep -o 'data-i18n="section5' index.html | wc -l` = **29** (19 + 10) · `grep -o 'data-i18n="' index.html | wc -l` = **267** (257 + 10) · `grep -o 'data-i18n-attr="' index.html | wc -l` = **11**, inchangé.
2. Clés distinctes de la section 5 : `grep -o 'section5\.[a-zA-Z0-9.]*' index.html | sort -u | wc -l` = **30** (20 + 10, objets). Sous-titres : `grep -c 'section5\..*\.title' index.html` = **3** (lignes).
3. `css/styles.css` : `grep -c '^  --color' css/styles.css` = **15**, inchangé · `grep -c '^\.citation' css/styles.css` = **1**, inchangé. Et `git diff -U0 css/styles.css` ne montre **que des lignes de commentaire** : aucune accolade, aucun point-virgule, aucune déclaration. Si une déclaration apparaît au diff : **ARRÊTE-TOI**.
4. `js/i18n.js`, lignes : `grep -c '^ *machine: {' js/i18n.js` = **2** et `grep -c '^ *humain: {' js/i18n.js` = **2** (une par langue).
5. `js/i18n.js`, lignes : `grep -c '^ *citation: "' js/i18n.js` = **6** (trois par langue). Deux conditions font tomber ce compte, et l'ÉTAPE 2 les impose toutes deux : chaque valeur `citation` s'écrit **sur la même ligne que sa clé**, et le commentaire qui les surplombe n'écrit jamais la chaîne `citation:` en début de ligne. Si tu reportes une valeur à la ligne suivante, la preuve rendra 5 ou moins sans qu'aucune erreur n'ait été commise. **ARRÊTE-TOI** plutôt que d'ajuster le nombre.
6. **Porteur unique des clés**, occurrences dans `tests/coulisses.test.js` : `grep -o 'section5\.arret\.citation' tests/coulisses.test.js | wc -l` = **1**, et **1** aussi pour `section5\.machine\.citation` et pour `section5\.humain\.citation`. Trois clés, trois littéraux, tous dans la table `SOURCES`. Si l'un rend 2 ou plus, une clé est écrite deux fois et la porte peut diverger d'elle-même : **ARRÊTE-TOI**.
7. Les trois sources n'ont pas bougé : les trois commandes du prérequis 4 rendent toujours **1** chacune. Si l'une rend 0, **tu** as touché à un fichier que ce prompt interdit de toucher : **ARRÊTE-TOI**.
8. **Preuve de morsure, deux fois** (`ASSURANCE_METHOD` couche A). Une fois par clé neuve, l'une après l'autre. Dans `js/i18n.js`, change **un seul caractère** de la valeur `section5.machine.citation` française. Lance `npm test`. La porte doit **rougir**, son message doit nommer `section5.machine.citation` et dire qu'elle ne se lit plus mot pour mot. Rétablis, relance : tout est vert. Recommence à l'identique sur `section5.humain.citation`. **Écris les deux constats dans `.pipeline/changes.md`**, avec la commande, le message reçu et le rétablissement. Deux morsures et non une, parce que chacune prouve en plus que le chemin de son fichier source se résout : une table juste avec un chemin faux serait verte à la naissance et aveugle pour toujours.
9. **Preuve d'aveuglement, en mémoire.** Les témoins 3 à 6 de l'ÉTAPE 5 tournent dans la suite elle-même : vérifie qu'ils sont bien **verts pour la bonne raison**, c'est-à-dire qu'ils constatent une **levée**, pas une absence de levée. Le témoin 5 en particulier : vérifie qu'il rougirait si la comparaison cessait de tourner. Aucun fichier n'est créé, déplacé ni vidé, ni dans le dépôt ni ailleurs.
10. **Scrub d'anonymisation** sur les quatre fichiers touchés, avec la commande maison :
   `grep -inE '([0-9]{1,3}\.){3}[0-9]{1,3}|\.ibm\.com|as400|iseries|QSYS|/QSYS|\bLIB[A-Z0-9]{2,}\b|password *=|token|secret|apikey|api_key' index.html css/styles.css js/i18n.js tests/coulisses.test.js`
   Attendu : les lignes **déjà présentes sur `main`** avant ton travail, et **aucune de plus**. Relève-les avant d'écrire, compare après. Toute ligne neuve : **ARRÊTE-TOI** et affiche-la. La dette du motif est connue ([W70]) et n'est **pas** de ton ressort.
11. `npm test` : vert. Le total **augmente** du nombre de tests neufs de la porte : attendu **401 → 405**, la porte passant de six à dix tests. Si ton découpage en rend un autre nombre, inscris l'ancien et le nouveau total dans `.pipeline/test-results.md` et continue **tant que tout est vert** : c'est le vert qui est la porte, pas le compte. Aucun test existant ne change de verdict, et la porte de parité du dictionnaire reste verte : les dix clés neuves existent des deux côtés.
12. `git diff --stat` ne montre que `js/i18n.js`, `index.html`, `css/styles.css` et `tests/coulisses.test.js`, plus le prompt entré au premier commit. **`prompts/v0.1/EVOL_annexe-s36_v1.md`, `tasks/`, `.claude/`, `package.json`, `package-lock.json`, `assets/` et les autres fichiers de `js/` : intouchés.** Si l'un d'eux apparaît : **ARRÊTE-TOI**.

**Aucune vérification au navigateur.** Tu n'ouvres aucune page, tu ne lances aucun appel au serveur Playwright. Note dans `.pipeline/changes.md`, comme reste à faire du chef de projet : la lecture du chapitre sur appareil réel, et le repli des deux citations neuves à 320 px.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` et `.pipeline/test-results.md`.
- **Un commit**, staging **précis**, les quatre fichiers nommés un par un, jamais par `git add -A` :
  `feat(methode): second bloc Les coulisses, sous-titres machine et humain, porte de concordance à trois clés`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`). Affiche `verdict` et `reservations` **tels quels**. `SHIP` avec des `WARN` : n'y touche pas, écris READY, les WARN partent en dette nommée au fil. `NEEDS_WORK` : corrige, commite, relance le `reviewer` sur le nouveau commit ; deux passes au plus, puis **ARRÊTE-TOI**.
- **Une réserve qui affirme qu'une chose n'existe pas ne se suit pas sans balayage.** Si le verdict porte une réserve du type « ce fait n'est pas recoupable dans le dépôt », « cette valeur n'a pas d'autre porteur », « rien ne garde ceci » : remesure-la toi-même avant d'y toucher, en lisant le **fichier entier** que la réserve cite, en-tête compris, et en balayant l'arbre. Si la réserve tombe sur sa prémisse, **écris-le et ne modifie rien**. Leçon du 10 septembre 2026, `tasks/lessons.md`, dernière entrée.
- `.pipeline/STATUS.md` = `READY — EVOL coulisses machine humain — <ISO> — feat/coulisses-machine-humain — tests <X/Y>`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Vingt valeurs neuves dans `js/i18n.js`, dix par langue, aux valeurs prescrites **au caractère près**. Aucune valeur existante modifiée.
2. Dix éléments neufs dans `index.html`, à l'endroit prescrit. Aucun élément existant déplacé, renommé ou retiré, aucun attribut `lang` ajouté.
3. `css/styles.css` : **aucune règle changée**, un commentaire réécrit, aucun nombre de contraste recopié, aucun numéro de ligne.
4. `tests/coulisses.test.js` porte trois clés dans une table unique, chaque clé rend son propre test nommé, aucune clé n'est écrite deux fois, et **les deux morsures neuves sont prouvées et consignées**.
5. Suite verte, comptages de l'ÉTAPE 6 conformes, scrub sans **aucune ligne neuve**.
6. `review.json` du `reviewer` en `SHIP` pour ce commit ; `READY` écrit en dernier.

## Ce que ce prompt NE fait PAS

- **Il ne réécrit rien de ce qui est publié.** Les quatre paragraphes `intro`, `comment`, `preuve`, `prive`, le bloc `arret` entier, le bloc à deux voix et les deux liens de fin sont **intouchés**, au caractère près. Le commentaire de `js/i18n.js` posé au-dessus de `arret` est intouché lui aussi.
- **Il ne change aucune règle CSS.** Aucune propriété, aucun sélecteur, aucun jeton de couleur. Le seul changement de `css/styles.css` est le texte d'un commentaire.
- **Il n'ajoute aucun cadre sombre**, aucun second bloc à deux voix. Le sombre reste le seul usage déjà en place.
- **Il n'ajoute aucun dessin, aucun schéma, aucune image.** La famille CSS `.dessin` n'est ni employée, ni modifiée, ni étendue. La maquette du dessin des quatre temps du harnais n'entre pas ici.
- **Il ne touche à aucun fichier de `.claude/`**, et n'en lit aucun.
- **Il ne modifie aucun des trois fichiers source des citations.** La porte les **lit**, elle ne les écrit pas. Si une citation ne tombe pas juste, on arrête, on ne corrige pas la source.
- **Il n'écrit rien hors du dépôt** : aucun fichier temporaire, aucun dossier de travail, aucun fichier de la machine. Les témoins de la porte se jouent en mémoire.
- **Il ne touche à aucun fichier de `tasks/`.** L'état de la ligne `12 septies` au fil, les dettes à porter au fil, l'entrée de journal et la leçon éventuelle sont des gestes manuels du chef de projet ([W24]), sur `main`, **après** l'atterrissage.
- **Il ne bump pas `package.json`.** Le bump `patch` (0.1.28 → 0.1.29) appartient à `/land`.
- **Il ne traite pas `lang="fr"` sur les citations françaises** ([W75]). Le chapitre porte aujourd'hui trois éléments dans ce cas ; cet incrément en ajoute deux, portant le compte à cinq. Les cinq se traitent d'un coup, dans un prompt qui leur est propre, jamais ici.
- **Il ne rembourse aucune dette du fil.** [W62] à [W78] restent ouvertes, [W73] et [W74] comprises : la première disparaît par construction, la seconde par la forme imposée du témoin 5, et ni l'une ni l'autre n'est un geste de remboursement. Aucun balayage de leurs autres porteurs n'est demandé ici.
- **Il ne tranche pas l'écart `CDEMST`** ([W71]) et ne refait pas `assets/og-card.png`.
- **Il ne corrige pas le motif du scrub** ([W70]), ni les deux assertions trop larges de `tests/partage.test.js` ([W72]).
- **Il ne nomme pas Cowork** dans le contenu du site. Le site n'en porte aucune occurrence aujourd'hui, et c'est un arbitrage du chef de projet, jamais une ligne glissée dans un incrément.
- **Il n'ajoute aucune ancre ni entrée au sommaire** pour les deux sous-titres neufs.
- **Il ne touche pas au site TWAIM**, qui vit dans un autre dépôt.
- **Il ne vérifie rien au navigateur** et ne joint aucun réseau.

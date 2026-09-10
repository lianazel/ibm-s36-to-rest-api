# EVOL — Les coulisses, premier bloc : l'arrêt, sa citation, et la porte qui la tient

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_coulisses-arret_v1.md` · **Ligne du fil** : `12 septies`, « Les coulisses » (voir Prérequis 3)

**Révision 1, et sujet neuf.** L'incrément « Les coulisses » portait trois blocs en un seul contrat. Il a été refusé trois fois par le `prompt-reviewer`, les trois fois sur le même paragraphe de justification, jamais sur un livrable. Le verrou des trois s'applique au sujet `EVOL_les-coulisses` et n'est pas levé. Décision du chef de projet du 10 septembre 2026 : **on découpe**. Ce prompt porte **le premier bloc seul**. Les deux autres feront l'objet d'un prompt distinct, écrit **après** l'atterrissage de celui-ci, sur des bases mesurées à ce moment-là.

**Taille** : petit incrément, un seul objet. **Quatre fichiers** : `js/i18n.js` (dix valeurs neuves, cinq par langue), `index.html` (cinq éléments neufs dans la section 5, aucun retiré), `css/styles.css` (une classe neuve, aucun jeton neuf), `tests/coulisses.test.js` (fichier neuf, une porte).

**Le chapitre « La méthode » gagne son premier sous-titre.** Aucun autre chapitre du site ne bouge, aucun texte existant n'est réécrit.

**Règle de comptage, à tenir dans tout ce prompt** : `grep -c` compte des **lignes**, `grep -o … | wc -l` compte des **occurrences**, un listage compte des **objets**. Chaque nombre ci-dessous dit lequel des trois il est.

## Mode d'exécution

**AUTO MODE ON : autorisé.**

**Motif.** Les dix preuves de l'ÉTAPE 6 sont toutes mécaniques et constatables **par toi seul** : des comptages, une suite de tests, un relevé de diff. Aucune ne demande un témoin humain. Aucun appel au navigateur n'est prescrit, donc **aucune règle `ask` n'est déclenchée** : tu ne resteras jamais suspendu à une question posée sur l'écran du chef de projet.

**Ce qui l'aurait interdit** : une preuve de rendu, une règle `ask` à éprouver, ou un jugement d'aspect. Les trois sont hors périmètre et restent au chef de projet, après l'atterrissage.

**La borne ne bouge pas.** Autorisé à usiner seul ne veut pas dire autorisé à conclure seul : tu t'arrêtes à `READY`, tu ne fusionnes pas, tu ne pousses pas. Tout `ARRÊTE-TOI` de ce prompt reste un arrêt franc, mode automatique compris.

## Satellites consultés (Core §8.1, table de déclenchement)

| Satellite | Statut | Ce qui en est appliqué, ou le motif de l'écart |
|---|---|---|
| `STYLE_METHOD` + `STYLE_PROFILE` | **Appliqué** | S-1 : **aucun tiret cadratin** dans les dix valeurs neuves. S-2 : le bloc cite un fait que le lecteur peut recouper dans le dépôt, jamais une qualité qu'on s'attribue. S-4 : la citation reste **en français dans les deux langues**, comme le bloc à deux voix déjà en place. Un artefact se cite, il ne se traduit pas. |
| `UX_METHOD` | **Appliqué** | Mobile-first. Le motif `h3` + `p` existe déjà quatre fois dans « Le décor » : l'incrément le **réemploie**, il n'invente pas de mise en page. La classe neuve doit **replier** son texte, jamais déborder de la page à 320 px. |
| `ASSURANCE_METHOD` couche A | **Appliqué** | L'incrément **crée une porte** (`tests/coulisses.test.js`). Preuve de morsure à la naissance, ÉTAPE 6 preuve 6. Garde de non-vacuité intégrée, avec son témoin joué **en mémoire** (ÉTAPE 5). |
| `VISION_METHOD` | **Appliqué**, §3 et §4 | Le chapitre change de géométrie : un titre et un bloc cité de plus. Le palier 0 n'est **pas jouable par toi** : le serveur Playwright refuse `file:`, le dépôt n'a pas de serveur local, et chaque appel au navigateur pose une question au chef de projet. **Tu ne fais aucune vérification de rendu.** Ta part est de ne pas produire de débordement : voir l'ÉTAPE 4. |
| `AGENT_SCOPE_METHOD` | **Écarté** | Aucun geste hors dépôt. La preuve de cécité se joue **en mémoire**, par une source injectable en paramètre par défaut, sur le précédent de `tests/partage.test.js` (8 septembre 2026). Aucun fichier temporaire, aucune écriture hors de l'arbre, aucune écriture dans `.claude/`. La liste du satellite est fermée et ne porte qu'une entrée, la promotion d'une leçon : ce prompt n'en a pas besoin. |
| `PEDAGOGY_METHOD` + profil | **Écarté** | Ce satellite dit comment expliquer **au chef de projet**. Les dix valeurs s'adressent au lecteur du site : c'est `STYLE_METHOD` qui les tient. Aucune explication au chef de projet n'est prescrite ici. |
| `SECURITY_METHOD` | **Écarté** | Aucune dépendance ajoutée ou modifiée (`package.json` et `package-lock.json` intouchés), aucun secret, aucune permission, aucune écriture dans `.claude/`. §3.3 sans objet. La règle P1 d'anonymisation, elle, s'applique et se vérifie : ÉTAPE 6 preuve 8. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_coulisses-arret_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre lu : `CLAUDE.md` en entier, dont « Règles de sécurité » (tu n'installes rien, tu ne joins pas le réseau, tu ne pousses rien, tu ne fusionnes rien, tu n'écris pas dans `.claude/`), « Anonymisation », « Style du produit », « Le cas fictif » ; et `tasks/ROADMAP.md`, ligne `12 septies`.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le **10 septembre 2026** sur `main` à **`49afd68`**, par lecture de fichiers. **Ce sha est le seul de ce prompt.** Remesure-les toutes : un nombre repris d'un document n'est pas mesuré.

1. `git branch --show-current` rend `main`. `grep '"version"' package.json` rend **0.1.27**. La base est `main` à **`49afd68`**, et `git rev-list --count origin/main..main` rend **0**. Si `main` a avancé, inspecte **tous** les commits ajoutés, pas seulement le dernier : `git log --oneline --name-only 49afd68..HEAD`. S'ils touchent `index.html`, `css/styles.css`, `js/i18n.js`, `tests/`, `prompts/v0.1/EVOL_annexe-s36_v1.md` ou `tasks/ROADMAP.md`, les bases 3 à 9 sont périmées : **ARRÊTE-TOI**.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 31`. Sinon un usinage est en cours : **ARRÊTE-TOI**.
3. Le fil porte la ligne de cet incrément : `grep -c 'Les coulisses' tasks/ROADMAP.md` = **1** (lignes). Si 0 : **ARRÊTE-TOI**, le chef de projet ne l'a pas enregistrée.
4. **La citation existe, mot pour mot, dans son fichier source**, une fois. C'est une **occurrence** :
   `grep -o 'Si tu lis 0, tu as supprimé des clés du mini-langage : ARRÊTE-TOI et signale.' prompts/v0.1/EVOL_annexe-s36_v1.md | wc -l` = **1**

   Si la commande rend 0, la source a changé et la valeur que ce prompt prescrit est **fausse** : **ARRÊTE-TOI** et signale-le. Tu ne modifies pas ce fichier pour faire tomber le compte juste.
5. La section 5 n'a **aucun sous-titre** : `grep -c 'section5\..*\.title' index.html` = **0** (lignes). Ses clés distinctes sont au nombre de **15** : `grep -o 'section5\.[a-zA-Z0-9.]*' index.html | sort -u | wc -l` (objets). Et `grep -o 'data-i18n="section5' index.html | wc -l` = **14** (occurrences ; l'écart avec 15 vient de `depotUrl` et `lienUrl`, portées par `data-i18n-attr`, et de `chapeau`, présente deux fois). Un écart sur l'un des trois : **ARRÊTE-TOI**.
6. La classe à créer n'existe pas : `grep -c '\.citation' css/styles.css` = **0** (lignes). Le mot « citation » apparaît **une fois** dans ce fichier, dans un commentaire, et ce n'est pas un sélecteur. La clé non plus : `grep -c 'citation' js/i18n.js` = **0** (lignes). Si l'un des deux diffère : **ARRÊTE-TOI**.
7. Les deux jetons de couleur que la classe neuve réemploie existent déjà : `grep -c -- '--color-ia:' css/styles.css` = **1** et `grep -c -- '--color-bg-ia-soft:' css/styles.css` = **1** (lignes). Leur ligne de contraste est déjà écrite au fichier. Si l'un manque : **ARRÊTE-TOI**, tu n'en crées aucun.
8. La porte à créer n'existe pas : `ls tests/*.js | wc -l` = **8** (objets) et `ls tests/coulisses.test.js` échoue. Si ce fichier existe, **ARRÊTE-TOI** : tu n'écrases pas une porte que tu n'as pas écrite.
9. Invariants du balisage, à ne pas bouger ailleurs que là où ce prompt le dit. Occurrences : `grep -o '<h3' index.html | wc -l` = **19** · `grep -o 'data-i18n="' index.html | wc -l` = **252** · `grep -o 'data-i18n-attr="' index.html | wc -l` = **11**. Lignes : `grep -c '^  --color' css/styles.css` = **15**. Un écart dit que le fichier n'est plus celui-ci : **ARRÊTE-TOI**.
10. `npm test` vert sur `main`. Dernier compte connu : **395/395** (`.pipeline/review.json`, `grep -o '"passed": *[0-9]*'`, commit `a598215`, 8 septembre 2026), **non relancé depuis**. Si le total diffère, inscris-le dans `.pipeline/spec.md` et continue tant que tout est vert. Un rouge : **ARRÊTE-TOI**.
11. **L'arbre de travail est propre, à ce prompt près** : `git status --porcelain | grep -v 'prompts/v0.1/EVOL_coulisses-arret_v1.md' | wc -l` = **0** (lignes). La seule ligne admise est celle du présent prompt, non suivi tant que le premier enregistrement n'a pas eu lieu. Si une autre sort : **ARRÊTE-TOI** et affiche-la, tu ne commites ni n'écartes rien qui ne soit pas à toi.

## Contexte et périmètre

Le chapitre « La méthode » dit que la preuve est dans le dépôt, et il laisse le lecteur s'y débrouiller. Arbitré avec le chef de projet les 9 et 10 septembre 2026 : des blocs qui expliquent une mécanique en quelques phrases, puis montrent **un artefact réel du dépôt** qui la prouve. Cet incrément livre **le premier**.

**Un seul cadre sombre dans le chapitre, celui qui existe déjà.** Le registre sombre s'établit une fois. La citation neuve est en ligne, dans la prose, sur fond clair. C'est une règle de densité, pas une contrainte technique.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/coulisses-arret`. Premier commit : le prompt, message exact de la règle du premier enregistrement ci-dessus. Puis `.pipeline/spec.md`.

## ÉTAPE 2 — Livrable A : les dix valeurs (`js/i18n.js`)

Cinq clés par langue, sous `section5`, dans un objet `arret`, placé **après** `prive` et **avant** `dialogue` dans le fichier. Les valeurs sont données au caractère près : tu les recopies, tu ne les réécris pas.

**Français.** `title` : `L'arrêt qui a le plus rapporté`

`p1` : `Un prompt ne commence pas par ce qu'il faut faire. Il commence par des mesures à refaire : un compte de lignes, un numéro de version, l'état du dépôt. L'agent les vérifie avant d'agir. Si une mesure ne tombe pas juste, il s'arrête et le signale, sans avoir rien écrit.`

`p2` : `Le 27 août 2026, c'est la consigne qui était fausse. Elle annonçait deux occurrences d'un mot dans le dictionnaire du site. Il y en avait quatre. Deux appartenaient au simulateur, écrites la veille, et les effacer aurait cassé son vocabulaire. L'agent s'est arrêté avant le premier enregistrement, aucune branche créée. La consigne porte depuis sa propre garde, et la voici, mot pour mot :`

`citation` : `Si tu lis 0, tu as supprimé des clés du mini-langage : ARRÊTE-TOI et signale.`

`p3` : `Le harnais n'a pas rattrapé une erreur d'exécution. Il a rattrapé une erreur de consigne, avant la première ligne de code. Et la consigne, c'est moi qui la transmets.`

**Anglais.** `title` : `The stop that paid the most`

`p1` : `A prompt does not start with what to do. It starts with measurements to take again: a line count, a version number, the state of the repository. The agent checks them before acting. If one measurement does not match, it stops and says so, having written nothing.`

`p2` : `On 27 August 2026 it was the instruction that was wrong. It announced two occurrences of a word in the site's dictionary. There were four. Two belonged to the simulator, written the day before, and removing them would have broken its vocabulary. The agent stopped before the first commit, with no branch created. The instruction has carried its own guard ever since, in French, word for word:`

`citation` : identique au français, au caractère près.

`p3` : `The harness did not catch an execution error. It caught an error in the instruction, before a single line of code existed. And I am the one who hands the instruction over.`

**Le commentaire à poser au-dessus du bloc, dans les deux langues** : la valeur `citation` est **identique dans les deux langues, à dessein**. Le harnais s'écrit en français, un artefact se cite et ne se traduit pas. C'est le même choix que `dialogue.consigne` et `dialogue.trace`, déjà en place. Ce n'est pas un défaut de parité à corriger. Écris ce commentaire en prose, **sans citer de numéro de ligne**, et **sans jamais commencer une ligne par la chaîne** `citation:` : la preuve 4 de l'ÉTAPE 6 compte les lignes qui la portent.

**Mise en forme des deux valeurs `citation`, imposée** : chacune s'écrit **sur la même ligne que sa clé**, jamais reportée à la ligne suivante. C'est le style déjà tenu par les quinze clés de `section5` : mesuré le 10 septembre 2026, aucune valeur reportée dans ce bloc, contre **21** lignes de ce genre ailleurs dans le fichier (`grep -cE '^ *[a-zA-Z0-9_]+: *$' js/i18n.js`, lignes). La preuve 4 en dépend.

## ÉTAPE 3 — Livrable B : le balisage (`index.html`)

Cinq éléments neufs dans `<section id="methode">`, insérés **après** la fermeture de `</figure>` du bloc à deux voix et **avant** le commentaire qui introduit le lien du dépôt. Aucun élément existant déplacé, renommé ou retiré.

```
<h3 data-i18n="section5.arret.title"></h3>
<p data-i18n="section5.arret.p1"></p>
<p data-i18n="section5.arret.p2"></p>
<p class="citation" data-i18n="section5.arret.citation"></p>
<p data-i18n="section5.arret.p3"></p>
```

Aucun `id` ajouté, aucune ancre, aucune entrée au sommaire : ce titre est un sous-titre de chapitre, comme les quatre du « Décor », qui n'en portent pas non plus.

## ÉTAPE 4 — Livrable C : la classe `.citation` (`css/styles.css`)

Une seule règle neuve, posée dans le voisinage des règles `.dialogue`, avec un commentaire qui **nomme** ce qu'elle habille sans le situer.

Ce qu'elle fait : Plex Mono, fond `var(--color-bg-ia-soft)`, filet à gauche en `var(--color-ia)`, la même respiration que `.dialogue .consigne`. Elle appartient au registre IA, en clair.

**Pourquoi Plex Mono, et pourquoi ce n'est pas un registre neuf.** Le contrat de design réserve **le fond sombre** au bloc à deux voix, et rien d'autre : la citation en ligne est sur fond clair, elle ne touche pas à cette réserve. La police, elle, suit la règle générale du même contrat : Plex Mono pour les données et le code, Plex Sans pour le texte. Une citation d'artefact est du texte de dépôt, pas de la prose du site. **C'est un choix de conception de ce prompt, pas un arbitrage rendu** : si le relecteur le juge autrement, sa réserve est légitime et le chef de projet tranchera.

**Aucun jeton de couleur neuf.** Les deux jetons réemployés portent déjà leur ligne de contraste mesurée au fichier.

**Le texte se replie.** La citation prescrite fait **77 caractères** et **80 octets**, mesurée le 10 septembre 2026 sur la valeur écrite à l'ÉTAPE 2. Règle de comptage, et elle n'est pas décorative : `wc -m` ne compte des caractères que si la locale est en UTF-8, et rend **80** sinon. Pour remesurer : `LC_ALL=C.UTF-8 printf '%s' '<valeur>' | wc -m` rend **77**. À 320 px, en Plex Mono, cette ligne doit **passer à la ligne**, jamais élargir la page ni forcer un défilement horizontal du document. C'est la contrainte dure de cette étape.

## ÉTAPE 5 — Livrable D : la porte (`tests/coulisses.test.js`, fichier neuf)

Une porte, pas un contrôle d'apparence. Ce qu'elle garde : **la citation publiée ne s'écarte jamais de son fichier source**. Le jour où quelqu'un réécrit la garde du prompt du 27 août, cette porte rougit tant que le site n'a pas suivi.

Écris-la dans le style des portes existantes. `tests/partage.test.js` est le modèle : résolution des chemins depuis l'emplacement du test, source injectable en paramètre par défaut, garde de cécité partagée entre la porte et son témoin. Elle importe `dict` depuis `../js/i18n.js` et lit **un** fichier du dépôt.

**La table des sources**, écrite une fois, en tête du fichier, un porteur unique :

| Clé | Fichier source |
|---|---|
| `section5.arret.citation` | `prompts/v0.1/EVOL_annexe-s36_v1.md` |

**Garde de non-vacuité.** Avant toute comparaison : si la valeur du dictionnaire est vide, ou si le fichier source lu rend moins de cent caractères, la porte **lève**, avec un message qui dit qu'elle est **aveugle** et non verte. Une lecture cassée qui rend une chaîne vide ne doit jamais passer au vert : une chaîne vide est contenue dans n'importe quel texte.

**La comparaison ignore la forme des blancs, et rien d'autre.** Avant de comparer, la porte remplace toute suite de blancs par une espace simple, **des deux côtés**. Motif : les fichiers du dépôt sont écrits à largeur fixe, et une citation peut y être coupée par un retour à la ligne. Elle ne normalise **ni la casse, ni la ponctuation, ni les apostrophes** : la source et le dictionnaire écrivent tous deux l'apostrophe droite (`'`).

**Les assertions**, une par règle :

1. La valeur française est **contenue mot pour mot** dans son fichier source, après la normalisation des blancs ci-dessus.
2. La valeur anglaise est **exactement** la valeur française. L'artefact ne se traduit pas.

**Les témoins de vivacité**, joués **en mémoire**, sans écrire ni déplacer aucun fichier :

3. Un contenu source vide fait **lever** la garde de cécité, avec son message d'aveuglement. C'est ce que permet la source injectable : `function readSource(path = SOURCE_PATH)`.
4. Une valeur écartée d'un seul caractère de sa source fait **échouer** la comparaison, et le message nomme la clé fautive.

**Ce que cette porte ne fait pas**, et qui doit être dit dans son commentaire d'en-tête : elle ne juge pas la prose autour de la citation, elle ne vérifie pas que le fichier source veut toujours dire la même chose, elle ne regarde pas le rendu, et elle ne joint aucun réseau. Elle garde une concordance de chaînes dans le dépôt, rien d'autre.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat. Un écart n'est pas une alarme, c'est une question : décompose avant de conclure, et **ne déforme jamais un fichier pour satisfaire un nombre**.

1. `index.html`, occurrences : `grep -o '<h3' index.html | wc -l` = **20** (19 + 1) · `grep -o 'data-i18n="section5' index.html | wc -l` = **19** (14 + 5) · `grep -o 'data-i18n="' index.html | wc -l` = **257** (252 + 5) · `grep -o 'data-i18n-attr="' index.html | wc -l` = **11**, inchangé.
2. Clés distinctes de la section 5 : `grep -o 'section5\.[a-zA-Z0-9.]*' index.html | sort -u | wc -l` = **20** (15 + 5, objets).
3. `css/styles.css`, lignes : `grep -c '^  --color' css/styles.css` = **15**, inchangé · `grep -c '\.citation' css/styles.css` ≥ **1**.
4. `js/i18n.js`, lignes : `grep -c '^ *citation: "' js/i18n.js` = **2** (une par langue). Deux conditions font tomber ce compte, et l'ÉTAPE 2 les impose toutes deux : chaque valeur `citation` s'écrit **sur la même ligne que sa clé**, et le commentaire qui la surplombe n'écrit jamais la chaîne `citation:` en début de ligne. Si tu reportes une valeur à la ligne suivante, la preuve rendra 1 ou 0 sans qu'aucune erreur n'ait été commise. **ARRÊTE-TOI** plutôt que d'ajuster le nombre.
5. La source n'a pas bougé : la commande du prérequis 4 rend toujours **1**. Si elle rend 0, **tu** as touché à un fichier que ce prompt interdit de toucher : **ARRÊTE-TOI**.
6. **Preuve de morsure** (`ASSURANCE_METHOD` couche A). Dans `js/i18n.js`, change **un seul caractère** de la valeur `section5.arret.citation` française. Lance `npm test`. La porte doit **rougir**, et son message doit nommer la clé fautive. Rétablis, relance : tout est vert. **Écris le constat dans `.pipeline/changes.md`**, avec la commande, le message reçu et le rétablissement. Une porte qu'on n'a jamais vue échouer est du théâtre.
7. **Preuve d'aveuglement, en mémoire.** Les témoins 3 et 4 de l'ÉTAPE 5 tournent dans la suite elle-même : vérifie qu'ils sont bien **verts pour la bonne raison**, c'est-à-dire qu'ils constatent une **levée**, pas une absence de levée. Aucun fichier n'est créé, déplacé ni vidé, ni dans le dépôt ni ailleurs.
8. **Scrub d'anonymisation** sur les quatre fichiers touchés, avec la commande maison :
   `grep -inE '([0-9]{1,3}\.){3}[0-9]{1,3}|\.ibm\.com|as400|iseries|QSYS|/QSYS|\bLIB[A-Z0-9]{2,}\b|password *=|token|secret|apikey|api_key' index.html css/styles.css js/i18n.js tests/coulisses.test.js`
   Attendu : les lignes **déjà présentes sur `main`** avant ton travail, et **aucune de plus**. Relève-les avant d'écrire, sur les **trois** fichiers qui existent alors, compare après sur les quatre. Toute ligne neuve : **ARRÊTE-TOI** et affiche-la. La dette du motif est connue ([W70]) et n'est **pas** de ton ressort.
9. `npm test` : vert. Le total **augmente** du nombre de tests du fichier neuf. Inscris l'ancien et le nouveau total dans `.pipeline/test-results.md`. Aucun test existant ne change de verdict, et la porte de parité du dictionnaire reste verte : les cinq clés neuves existent des deux côtés.
10. `git diff --stat` ne montre que `js/i18n.js`, `index.html`, `css/styles.css` et `tests/coulisses.test.js`, plus le prompt entré au premier commit. **`prompts/v0.1/EVOL_annexe-s36_v1.md`, `.claude/`, `tasks/`, `package.json`, `package-lock.json`, `assets/` et les autres fichiers de `js/` : intouchés.** Si l'un d'eux apparaît : **ARRÊTE-TOI**.

**Aucune vérification au navigateur.** Tu n'ouvres aucune page, tu ne lances aucun appel au serveur Playwright. Note dans `.pipeline/changes.md`, comme reste à faire du chef de projet : la lecture du chapitre sur appareil réel, et le repli de la citation à 320 px.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` et `.pipeline/test-results.md`.
- **Un commit**, staging **précis**, les quatre fichiers nommés un par un, jamais par `git add -A` :
  `feat(methode): premier bloc Les coulisses dans la section 5, porte de concordance de la citation avec son fichier source`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`). Affiche `verdict` et `reservations` **tels quels**. `SHIP` avec des `WARN` : n'y touche pas, écris READY, les WARN partent en dette nommée au fil. `NEEDS_WORK` : corrige, commite, relance le `reviewer` sur le nouveau commit ; deux passes au plus, puis **ARRÊTE-TOI**.
- `.pipeline/STATUS.md` = `READY — EVOL coulisses arret — <ISO> — feat/coulisses-arret — tests <X/Y>`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Dix valeurs neuves dans `js/i18n.js`, cinq par langue, aux valeurs prescrites **au caractère près**. Aucune valeur existante modifiée.
2. Cinq éléments neufs dans `index.html`, à l'endroit prescrit. Aucun élément existant déplacé, renommé ou retiré.
3. Une seule règle CSS neuve, **aucun jeton de couleur ajouté**, et la citation se replie sans déborder.
4. `tests/coulisses.test.js` existe, porte les deux règles sur la clé, sa garde de non-vacuité et ses deux témoins, et **sa morsure est prouvée et consignée**.
5. Suite verte, comptages de l'ÉTAPE 6 conformes, scrub sans **aucune ligne neuve**.
6. `review.json` du `reviewer` en `SHIP` pour ce commit ; `READY` écrit en dernier.

## Ce que ce prompt NE fait PAS

- **Il ne porte que le premier bloc.** Les deux autres blocs de l'incrément d'origine, `machine` et `humain`, ne sont ni écrits, ni annoncés, ni préparés ici. Aucune clé `section5.machine.*` ni `section5.humain.*` n'entre dans `js/i18n.js`, aucun élément ne leur est réservé dans `index.html`, et la porte ne connaît qu'une seule clé.
- **Il ne réécrit rien de ce qui existe dans le chapitre.** Les quatre paragraphes `intro`, `comment`, `preuve`, `prive`, le bloc à deux voix et les deux liens de fin sont **intouchés**, au caractère près.
- **Il n'ajoute aucun cadre sombre**, aucun jeton de couleur, aucun second bloc à deux voix. Le sombre reste le seul usage déjà en place.
- **Il n'ajoute aucun dessin, aucun schéma, aucune image.** La famille CSS `.dessin` n'est ni employée, ni modifiée, ni étendue.
- **Il ne touche à aucun fichier de `.claude/`**, et il n'en lit aucun non plus : la porte ne lit que `prompts/v0.1/EVOL_annexe-s36_v1.md`.
- **Il n'écrit rien hors du dépôt** : aucun fichier temporaire, aucun dossier de travail, aucun fichier de la machine. Les deux témoins de la porte se jouent en mémoire.
- **Il ne modifie pas le fichier source de la citation.** Si elle ne tombe pas juste, on arrête, on ne corrige pas la source.
- **Il ne touche à aucun fichier de `tasks/`.** L'état de la ligne `12 septies` au fil, l'entrée de journal et la leçon éventuelle sont des gestes manuels du chef de projet ([W24]), sur `main`, **après** l'atterrissage.
- **Il ne bump pas `package.json`.** Le bump `patch` (0.1.27 → 0.1.28) appartient à `/land`.
- **Il ne tranche pas l'écart `CDEMST`** ([W71]) et ne refait pas `assets/og-card.png`.
- **Il ne corrige pas le motif du scrub** ([W70]), ni les deux assertions trop larges de `tests/partage.test.js` ([W72]).
- **Il ne rembourse aucune dette.** [W62] à [W72] restent ouvertes. Rien de la ligne 13 n'entre ici : ni le Plex Mono des `code` en ligne, ni l'indice de défilement ([W23]), ni les chapeaux du menu ([W65]).
- **Il n'ajoute aucune ancre ni entrée au sommaire** pour le sous-titre neuf.
- **Il ne touche pas au site TWAIM**, qui vit dans un autre dépôt.
- **Il ne vérifie rien au navigateur** et ne joint aucun réseau.

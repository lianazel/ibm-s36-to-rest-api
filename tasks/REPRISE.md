Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **31**, lue dans `.pipeline/STATUS.md` le 8 septembre 2026 à 13:13 (heure de
Paris). C'est le SEUL compteur ; relis-la le jour même avant de la recopier. Cette session Cowork est du
**8 septembre 2026** : Cowork date ses sessions, il ne les numérote plus. Ce fichier est `tasks/REPRISE.md`,
écrasé à chaque fin de session et commité avec elle (`docs: reprise 2026-09-08`) ; la pile, c'est
`git log -- tasks/REPRISE.md`.

---

## AVANT DE M'ÉCRIRE QUOI QUE CE SOIT

Ce message est la porte manuelle de l'ouverture (`RD-057`). Méthode **v2.32** : on lit **par tranches, jamais en
entier, la personne d'abord, la méthode au moment d'agir** (Core §5.1). Ton rapport d'ouverture nomme les
**tranches** lues (fichier + section), jamais les fichiers seuls.

Dans cet ordre, et sans rien me dire entre-temps :

1. **La personne** : au référentiel, `PEDAGOGY_PROFILE.local.md` et `STYLE_PROFILE.local.md`, en entier. Je ne suis
   pas de ton monde, je suis du monde IBM i : mots simples, une idée par phrase, analogie IBM i quand ça aide.
   Quand je clique une réponse à choix, **vérifie que j'ai compris avant d'agir** : le 8 septembre j'ai cliqué C
   sur une maquette et écrit D dans la phrase suivante, et c'est le message qui disait vrai. Quand ta consigne est
   dense, je le dis, et c'est la consigne qui est fautive.
2. **Le projet, par tranches** : `CLAUDE.md` en entier (il épingle **v2.32** depuis le 8 septembre) ·
   `.pipeline/STATUS.md` (une ligne) · `tasks/ROADMAP.md` : **le tableau du fil** (lignes `12 septies`,
   `12 nonies`, 13, 14, 15) et les dettes `[W62]` à `[W69]` au bas de « Dettes et reports » · `tasks/lessons.md` :
   la liste des titres (`grep '^## '`) et **les deux dernières entrées** (7 et 8 septembre) ·
   `tasks/JOURNAL_v0.1.md` : l'entrée « Session 31 » seulement · `.claude/settings.json` en entier (39 `deny`,
   1 `ask`) · `.claude/agents/prompt-reviewer.md` en entier, parce que c'est la porte que ton prompt devra passer.
3. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les satellites que la table
   désigne. Pour la tâche du jour (une image refaite hors dépôt, puis un prompt qui touche `assets/`) :
   `STYLE_METHOD` + profil, `AGENT_SCOPE_METHOD`, `ASSURANCE_METHOD` couche A si une porte entre en jeu.
4. **Mesure** l'état du dépôt **par lecture de fichiers**, jamais par une commande git depuis la VM Cowork (chaque
   `git status` y laisse un `index.lock` insupprimable, et il rend en plus la mesure des fichiers modifiés par
   leurs dates inutilisable pour la journée : je l'ai fait le 7 septembre, ne le refais pas) : `.git/HEAD` ·
   `.git/refs/heads/*` · `.git/refs/remotes/origin/main` · `.git/logs/HEAD` (trois dernières lignes) ·
   `grep '"version"' package.json` · `.pipeline/STATUS.md` · `grep -c '^      "' .claude/settings.json` ·
   `grep -o '\[W[0-9]*\]' tasks/ROADMAP.md | sort -t W -k2 -n | tail -1` · `grep -c '^## ' tasks/lessons.md` ·
   `find . -newer .git/index -type f -not -path './node_modules/*' -not -path './.git/*' -not -path './.pipeline/*'`.
   `npm test` et les commandes git sont pour Claude Code ou pour moi.
5. **La machine** : Claude Code, Node, npm et git tournent **dans WSL**, pas dans PowerShell. Toute commande que tu
   me donnes dit de quel côté elle se tape, et en chemin WSL (`/mnt/c/…`). Le plancher machine est
   `/home/jcc_1a/.claude/settings.json`, posé par `TWAIM_Kit/poser-plancher.js`, lancé par moi, jamais par un agent.

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document et le
dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 8 septembre 2026 à 13:13 (heure de Paris), par lecture de fichiers, **après le push**.

- **`main` = `origin/main` = `4b9035f`**, version **0.1.27**, `STATUS` = `CLOSED — session 31`. **Une seule
  branche** : `feat/finitions-2` a été fusionnée (merge `1ed4f2a`) puis supprimée. Arbre propre, sauf **ce
  fichier** et `tasks/ROADMAP.md`, que le chef de projet commite (`docs: reprise 2026-09-08`).
- **Tests : 395/395**, +13 par rapport aux 382 du 3 septembre, tous portés par la porte neuve
  `tests/partage.test.js`. **8** fichiers de test. **41** leçons. Dernière dette : **`[W69]`**. Liste d'interdits
  inchangée : **39 `deny` + 1 `ask`**.
- **`12 nonies` est atterrie** : la carte de partage (neuf balises `og:`/`twitter:` en anglais seul,
  `assets/og-card.png` 1200 × 630 au dépôt, porte de concordance avec le dictionnaire anglais), le balayage des
  **six** commentaires de `css/styles.css` qui situaient leur cible (`grep -c 'l. [0-9]'` = **0**), et le re-pin
  `CLAUDE.md` v2.29 → **v2.32**. **[W59], [W60] et [W61] remboursées.** SHIP en une passe, 0 FAIL, 5 WARN.
- **Trois gardes éprouvées le 8 septembre**, et c'était l'enjeu de la journée. Le `prompt-reviewer` en **cas
  positif** après **deux `BLOCK`** sur mes propres erreurs d'arithmétique (révisions 3 et 4 refusées, révision 5
  passée) : le verrou des trois est retombé à zéro sur ce sujet. `/land` a **refusé** une branche non fusionnée,
  affiché la commande et n'a rien écrit : **[W68] est éprouvée**. Et la porte neuve a mordu à sa naissance, deux
  tests rouges sur un seul caractère faussé, sous mes yeux.
- **La carte est en ligne et lue.** Site publié à jour, image servie en 200 pour 73 476 octets. LinkedIn a relu
  les deux adresses par le Post Inspector et gardé sa propre copie : le site **et** le dépôt GitHub affichent
  maintenant la même carte, `assets/og-card.png` ayant été téléversée en « Social preview » du dépôt. Reste gris :
  le média **TWAIM** du profil, dont le site n'a pas encore de balises.
- Le site : https://lianazel.github.io/ibm-s36-to-rest-api/ — 0.1.27. **Le dépôt est public : tout commit est une
  publication.** Anonymisation P1 inchangée. Règle de partage : des instances, jamais des invariants.
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v27.md`, à mettre à jour).
  **Il n'est pas la source de vérité : le dépôt l'est.**
- **Écarts mesurés, à assumer** : (1) le skill Cowork `prompt-de-reprise` dit encore « hors dépôt,
  `PROMPT_REPRISE_session<N>.md` » ; le gabarit du référentiel dit `tasks/REPRISE.md`, écrasé, commité. **Le
  référentiel gagne** ; le texte du skill est à mettre à jour par le chef de projet. (2) Le kit **a** désormais un
  gabarit `.claude/settings.json` (48 lignes, 40 règles dont un `ask`), contrairement à ce que disait la reprise
  du 7 ; en revanche `_TEMPLATE_AGENTS/.claude/commands/land.md` prescrit toujours `git merge`, **3 fois** : cette
  dette de propagation est ouverte. (3) `.claude/commands/ship.md` épingle encore « Core §4.1 v2.29 » : l'agent
  n'a pas le droit d'écrire dans `.claude/`, c'est ton geste, voie (a).

## Ce qu'on fait aujourd'hui

**Une seule tâche : refaire l'image de la carte de partage, pour que son JSON respecte le dictionnaire du site.**

Le `reviewer` l'a relevé en réserve n° 1 le 8 septembre, et je l'ai vérifié en mesurant : la carte publie
`"itemCount"` et `"totalBeforeTax"`, et **ces deux noms n'ont aucun porteur dans le dépôt** (`grep -rn` rend zéro).
Le dictionnaire anglais que le site publie (`js/i18n.js`, `en.modele`) connaît `orderNumber`, `orderAmount`,
`customerLastName`, et **ne connaît ni `NBRART` ni `TOTHTG`**. Ta règle d'or n° 3 dit que tout nouvel exemple
respecte ce dictionnaire : la carte est un nouvel exemple, et deux de ses quatre champs ne le respectent pas.

**Ce que le relecteur a nommé au-delà de ma faute** : cet écart fait sortir en vitrine le **troisième trou** du
fil, relevé le 27 août 2026 et jamais arbitré — l'annexe du site nomme les colonnes `NBRART` et `TOTHTG`, le
modèle nomme le montant `MTTCDE`. La carte est devenue un porteur de plus du dictionnaire d'exemples, gravé dans
un binaire qu'aucune porte ne relit.

**Le premier arbitrage à me demander, avant de toucher à l'image** : est-ce qu'on aligne la carte sur le
dictionnaire existant (donc on retire les deux champs fautifs et on montre `orderNumber`, `orderAmount`,
`customerLastName`), ou est-ce qu'on ouvre d'abord l'arbitrage du troisième trou, qui déciderait aussi de
l'annexe ? Une seule question, avec ta recommandation.

**Ce que porte ensuite la tâche** : la maquette hors dépôt `Etude_Technique/MAQUETTE_carte-open-graph_v1.html` est
le seul moyen de refabriquer le PNG. Elle lit les polices du dépôt par un chemin relatif, elle se rend en 1200 × 630
avec Chromium à l'échelle 1, et **le bloc signé de métadonnées ajouté par le transport doit être retiré** avant
dépôt (5 758 octets illisibles dans un dépôt public ; le fichier doit finir au bit près celui que la maquette
produit).

**Pièges déjà connus, qui te concernent aujourd'hui :**

- **Ne gèle pas un prompt tant qu'un arbitrage dont il dépend n'est pas rendu.** Le 8 septembre j'ai gelé trois
  fois trop tôt, et chaque changement d'image a périmé un prérequis chiffré, donc imposé une révision. Règle
  candidate pour le Core : un prompt se gèle après le dernier arbitrage, jamais avant.
- **Un prérequis ne cite pas le poids exact d'un binaire.** La révision 5 vérifie signature PNG, dimensions et un
  plancher souple : c'est ce qui a rendu le prompt insensible aux retouches du visuel. Garde cette forme.
- **Corriger le `fail` qu'on te montre ne corrige pas le défaut** (leçon du 8 septembre, la dernière du registre) :
  après toute correction d'un chiffre, balaie **tous** ses porteurs, message de commit et critères d'acceptation
  compris. Les deux `BLOCK` de la journée viennent exactement de là.
- **`grep -c` compte des lignes, `grep -o | wc -l` compte des occurrences**, et ni l'un ni l'autre ne compte des
  objets. Dis toujours laquelle des trois tu mesures.
- Le geste du chef de projet reste le merge et le push. `/land` exige que la clôture précédente soit **poussée**
  avant de tourner : `git log origin/main..main --first-parent --no-merges` doit être vide. Bump `patch` tant que
  la version est < 1.0.0 (0.1.27 → 0.1.28).
- Voie (a) : Cowork écrit dans `.claude/` si besoin, le chef de projet commite ; l'agent ne peut pas y écrire.

## Ce qui n'est PAS au programme, et pourquoi

- **Le champ « Mode d'exécution » du gabarit** (AUTO MODE autorisé / interdit, avec son motif, et la règle
  « interdit dès que la preuve exige un témoin humain ») : idée du chef de projet le 8 septembre, acceptée,
  **écrite nulle part**. Elle touche `TEC_IA_TWAIM_CORE.md` §4.1 et `_TEMPLATE_AGENTS/.claude/agents/prompt-reviewer.md`,
  donc le référentiel, pas IBMiAPI. Un dépôt à la fois.
- **La coupure de C1 en deux** dans le contrat du `prompt-reviewer` : un fait faux du dépôt devrait rendre
  `NEEDS_WORK`, pas `BLOCK`, qui doit rester pour ce qui **ne doit pas tourner**. Analysé le 8 septembre, non
  écrit. Même dépôt que le point précédent, et on ne modifie pas une garde pendant qu'on usine.
- **Ligne `12 septies`, « Les coulisses »** : arbitrée, inscrite, non rédigée ; la seule question qui compte est
  « quels trois artefacts ». La carte Open Graph qu'elle attendait est faite : la ligne est désormais dégagée.
- **Ligne 13, « Mise en scène »** : attend ta réponse sur `[W29]`/`[W30]`, posée depuis le 3 septembre.
- **Les quatre autres réserves du `reviewer`** du 8 septembre, toutes WARN, toutes à porter au fil et non à
  corriger à chaud : deux titres de tests qui promettent un peu plus qu'ils ne mesurent (`tests/partage.test.js`
  l. 138 et 161), le motif `\bLIB[A-Z0-9]{2,}\b` du scrub qui rend six faux positifs en `-i` sur les mots français
  commençant par « lib », et huit lignes de `decodeEntities` écrites sans être demandées (arbitrage : garder ou
  retirer).
- **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
  `browser_network_requests`) : arbitrage du chef de projet et CHORE dédié.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture humaine d'abord.
- **Les balises Open Graph du site TWAIM** (autre dépôt) : c'est ce qui laisse le premier média gris sur ton
  profil LinkedIn. Chantier voisin, autre projet.
- **R&D nommées, non instruites** : le compteur des trois qui ne distingue pas trois révisions de trois relances
  du même fichier (`prompt_sha256`) ; `/fix` sans garde `prompt-reviewer` ; `RD-061`, `RD-062`, `RD-063` (hook
  compteur) ; les vingt-huit `deny` non éprouvées une à une ; GMFCC.

## Trous et questions ouvertes à me rappeler

1. `node` et `python3` sont permis à l'agent et savent tout faire, réseau compris : c'est le prompt qui le tient.
   Le périmètre d'un incrément est tenu par du texte, pas par une serrure — risque résiduel assumé, improbable,
   visible, survivable.
2. `browser_navigate` atteint n'importe quelle adresse **réseau** (pas le local, Playwright refuse `file:`) ;
   `browser_network_request` est un chemin plus direct ; tous deux sous le seul `ask`. Le bornage par URL demande
   le hook `RD-063` / `[W69]`.
3. La carence de 72 h d'un paquet **n'est pas vérifiable par le relecteur** (réseau fermé) : ce contrôle reste au
   chef de projet, et le croire couvert serait la lecture dangereuse.
4. La mesure VoiceOver porte neuf objets et attend un humain depuis l'incrément 9.
5. Les deux rangées « S/36 · IBM i » du menu (`[W65]`) se règlent avec le texte des chapeaux.
6. `[W66]` : toute base se remesure le jour même.
7. Le fichier machine `settings.json` a perdu `effortLevel` et `tui` entre le 2 et le 7 septembre : à remettre par
   le chef de projet s'il y tient, le script ne les recrée pas.
8. Les vignettes de médias déjà épinglées sur LinkedIn gardent parfois l'ancienne image même après relecture : il
   faut retirer le média et le remettre.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui
s'est trompé **cinq fois** dans la journée qu'il vient de terminer — dont : lire un compte de lignes rendu par
`grep -c` comme un compte de commentaires, et propager ce nombre faux dans quatre endroits du prompt ; ne corriger
que les quatre nombres qu'on lui montrait et laisser le cinquième dans le message de commit, ce qui a valu un
second `BLOCK` ; geler trois fois un prompt avant que l'arbitrage dont il dépendait soit rendu ; publier sur la
carte deux noms de propriétés JSON que le dictionnaire du site ne connaît pas ; et lancer un `git status` depuis
la VM Cowork contre la règle, ce qui a rendu la mesure des fichiers modifiés inutilisable pour la journée.

Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **30**, lue dans `.pipeline/STATUS.md` le 7 septembre 2026 au soir. C'est le
SEUL compteur ; relis-la le jour même avant de la recopier. Ce fichier est `tasks/REPRISE.md`, écrasé à chaque fin
de session et commité avec elle (`docs: reprise 2026-09-07`) ; la pile, c'est `git log -- tasks/REPRISE.md`. La
conversation Cowork qui se ferme s'appelle « IBMiAPI Continuation 20 » dans l'application : c'est un titre, pas un
compteur, ne le recopie nulle part dans un prérequis. La tienne est datée du jour où tu lis ceci.

---

## AVANT DE M'ÉCRIRE QUOI QUE CE SOIT

Ce message est la porte manuelle de l'ouverture (`RD-057`). Méthode **v2.32** : on lit **par tranches, jamais en
entier, la personne d'abord, la méthode au moment d'agir** (Core §5.1). Ton rapport d'ouverture nomme les
**tranches** lues (fichier + section), jamais les fichiers seuls.

Dans cet ordre, et sans rien me dire entre-temps :

1. **La personne** : au référentiel, `PEDAGOGY_PROFILE.local.md` et `STYLE_PROFILE.local.md`, en entier. Je ne suis
   pas de ton monde, je suis du monde IBM i : mots simples, une idée par phrase, analogie IBM i quand ça aide. Le
   profil a gagné le 7 septembre un acquis (WSL) et une analogie (PASE) : lis-les, ne les ré-explique pas. Quand je
   clique une réponse à choix, vérifie que j'ai compris avant d'agir. Quand ta consigne est dense, je le dis, et
   c'est la consigne qui est fautive : le 7 septembre, j'ai dû dire « j'ai rien compris » une fois.
2. **Le projet, par tranches** : `CLAUDE.md` en entier (« Règles de sécurité » et « Agents » ont changé le
   7 septembre : plus aucun « Non éprouvé ») · `.pipeline/STATUS.md` (une ligne) · `tasks/ROADMAP.md` : **le tableau
   du fil** (lignes `12 sexies`, `12 septies`, `12 octies`, 13) et les dettes `[W59]` à `[W69]` au bas de « Dettes et
   reports » · `tasks/lessons.md` : la liste des titres (`grep '^## '`) et la dernière entrée (7 septembre) ·
   `tasks/JOURNAL_v0.1.md` : l'entrée « Session 30 » seulement (les 100 dernières lignes) · `.claude/settings.json`
   en entier (39 `deny`, 1 `ask`) · `.claude/settings.local.json` (11 `allow`, non commité) · `.claude/commands/ship.md`,
   ÉTAPE 0.
3. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les satellites que la table
   désigne pour ce que tu vas écrire. Pour la tâche du jour (un prompt qui touche `index.html`, `js/i18n.js`,
   `css/styles.css` et une image) : `UX_METHOD`, `STYLE_METHOD` + profil, `VISION_METHOD` si une capture entre en
   jeu, `ASSURANCE_METHOD` couche A pour toute porte ou preuve chiffrée.
4. **Mesure** l'état du dépôt **par lecture de fichiers**, jamais par une commande git depuis la VM Cowork (chaque
   `git status` y laisse un `index.lock` insupprimable ; deux traînent déjà dans `.git/`,
   `_to_delete_index.lock.s19*`) : `.git/HEAD` · `.git/refs/heads/*` · `.git/refs/remotes/origin/main` ·
   `.git/logs/HEAD` (trois dernières lignes) · `grep '"version"' package.json` · `.pipeline/STATUS.md` ·
   `grep -c '^      "' .claude/settings.json` · `grep -o '\[W[0-9]*\]' tasks/ROADMAP.md | sort -t W -k2 -n | tail -1` ·
   `grep -c '^## ' tasks/lessons.md`. `npm test` et les commandes git sont pour Claude Code ou pour moi. Le `HOME`
   de la VM n'est pas celui de la machine : tu ne lis ni `~/.claude/`, ni `~/.claude.json`.
5. **La machine, une fois pour toutes** (mesuré le 7 septembre) : Claude Code, Node, npm et git tournent **dans
   WSL**, pas dans PowerShell. Toute commande que tu me donnes dit de quel côté elle se tape, et en chemin WSL
   (`/mnt/c/…`). Le plancher machine qui compte est `/home/jcc_1a/.claude/settings.json` ; il se pose par
   `TWAIM_Kit/poser-plancher.js`, lancé par moi, jamais par un agent (guide :
   `USER_OPERATING_DOCUMENTATION/GUIDE_UTILISATEUR_poser-plancher.docx`).

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document et le
dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 7 septembre 2026 à 17:19 (heure de Paris), par lecture de fichiers, **après le push**.

- **`main` = `origin/main` = `c329158`** (« docs(securite): essai 0 des deux gardes… », 16:40), version **0.1.26**,
  `STATUS` = `CLOSED — session 30`. Une seule branche. **Arbre propre** (0 fichier plus récent que `.git/index`
  hors `node_modules`, `.git`, `.pipeline`) au moment d'écrire, sauf **ce fichier**, que le chef de projet commite
  par-dessus (`docs: reprise 2026-09-07`).
- **Tests : 382/382** selon `review.json` (commit `674d8bb`, verdict SHIP, session 29), **pas relancés depuis**.
  Je compte **239** blocs `it(`/`test(` dans les **7** fichiers de `tests/`, **18** `.each` : l'écart vient des
  tests paramétrés. **40** leçons. Dernière dette : **`[W69]`**.
- **Les deux gardes du 4 septembre sont éprouvées** (7 septembre, deux sessions Claude Code neuves, mode auto).
  `deny` sur `mcp__playwright__browser_run_code_unsafe` : outil absent, 23 voisins présents. `ask` sur
  `mcp__playwright` : question à l'écran à chacun des deux appels, malgré 4 `allow` sur ces outils dans
  `settings.local.json`. `prompt-reviewer` : quatre `/ship` sur le prompt piège, trois `BLOCK` reproductibles
  (8 `fails` identiques), verrou des trois au quatrième, zéro effet de bord. **Onze `deny` éprouvées sur
  trente-neuf**, plus le `ask`. Rapports non commités : `.pipeline/ESSAI0_mcp.md` (135 lignes),
  `.pipeline/prompt-reviews.log` (3 lignes), `.pipeline/prompt-review.json`. Les faits sont recopiés au journal.
- **Liste d'interdits : 39 `deny` + 1 `ask`**, inchangée. Plancher machine v3 (37 + 1) **posé** le 7 septembre à
  09:59 dans `/home/jcc_1a/.claude/settings.json` ; `/permissions` montre chaque règle MCP deux fois (dépôt et
  machine). Le fichier machine ne porte plus que les permissions (`effortLevel` et `tui` avaient disparu avant
  le 7, sans doute à la pose de v2 par copie entière).
- **`/land` ne merge plus**, **non éprouvé** : le prochain atterrissage réel sera le premier. **Le cas positif du
  `prompt-reviewer`** (un vrai prompt qui obtient `SHIP`) est **non éprouvé** : la tâche du jour est ce cas.
- `CLAUDE.md` épingle toujours **« Méthode v2.29 »** ; la méthode est en **v2.32**. **Le re-pin se fait dans
  l'incrément du jour** (`MAINTENANCE.md`, règle 3 : au prochain incrément, et c'est celui-ci).
- Le site est en ligne : https://lianazel.github.io/ibm-s36-to-rest-api/ — 0.1.26. **Le dépôt est public : tout
  commit est une publication.** Anonymisation P1 inchangée. Règle de partage : des instances, jamais des invariants.
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v27.md`). **Il n'est pas la source
  de vérité : le dépôt l'est.** Notes hors dépôt qui font foi : `PREP_poser-plancher_v1.md` (naissance du script),
  `PREP_liste-interdits_v3.md`.
- **Écarts mesurés, à assumer** : (1) le skill Cowork `prompt-de-reprise` dit encore « hors dépôt,
  `PROMPT_REPRISE_session<N>.md` » ; le gabarit du référentiel (`TEMPLATE_REPRISE_SESSION.md`, v2.32) dit
  `tasks/REPRISE.md`, écrasé, commité. **Le référentiel gagne** ; le texte du skill est à mettre à jour par le chef
  de projet (Cowork peut le proposer). Le 7 septembre, Cowork a d'abord suivi le skill, puis le gabarit : ce fichier
  est le seul exemplaire, il n'y a pas de `PROMPT_REPRISE_session30.md` dans `Etude_Technique`. Le dépôt est public :
  ce fichier montre des instances, pas de doctrine. (2) Les commits « du 4 septembre » sont datés du 5 par la machine ; le journal de la session 30 le dit.
  (3) Mesuré pour la tâche du jour : `og:` = **0** et `twitter:` = **0** dans `index.html` ; « environnement S/36 » =
  **0** dans `index.html` et `js/i18n.js` ; `chapeau"` = **24** dans `index.html` (base du jour, `[W66]`).

## Ce qu'on fait aujourd'hui

**Une seule tâche : écrire le prompt de Finitions 2, et le faire passer la porte.** C'est le premier vrai prompt
depuis que le relecteur existe : son verdict attendu est `SHIP`, et c'est le cas positif qu'il manque à l'essai 0.
Le prompt est bloqué depuis le 4 septembre « après la preuve du CHORE, parce qu'un chantier en mode auto rouvre
le navigateur » : la preuve est faite, le frein mord.

Ce qu'il porte, tel qu'inscrit au fil et dans les dettes : les balises **Open Graph et Twitter** (une image
1200 × 630, **une seule langue**, anglais recommandé), les trois dettes de commentaires CSS **`[W59]`, `[W60]`,
`[W61]`** (un `padding-right` en doublon et un commentaire à contresens, deux renvois « l. NNN » faux à la naissance,
un commentaire de `.about` faux pour moitié et deux `border: none` mortes), et le **re-pin v2.29 → v2.32** de
`CLAUDE.md`, puisque c'est « le prochain incrément ».

Ce qui décide de sa qualité : le prompt doit **passer C1 à C4 du relecteur du premier coup**. Donc : aucune commande
de la liste d'interdits, aucune promesse que `/land` merge ; chaque prérequis chiffré avec sa commande et sa
conduite d'échec « sinon ARRÊTE-TOI », base relevée « sur `main` à `c329158` » et **remesurée le jour même** ; le
bloc « Satellites consultés » recalculé depuis le contenu (UX, STYLE, VISION si capture, ASSURANCE A si porte) ;
une section « Ce que ce prompt NE fait PAS » qui nomme des fichiers ; `docs(prompt): <chemin exact>` ; **aucun
numéro de ligne prescrit dans un commentaire à écrire** (leçon du 3 septembre, et le relecteur le vérifie).

**Le premier arbitrage à me demander, avant d'écrire une ligne** : l'image Open Graph. Laquelle (une existante
dans `assets/`, recréée, ou une nouvelle à produire), et confirmer « anglais seul ». Sans cette réponse, le prompt
ne peut pas fermer son périmètre. Une seule question, avec ta recommandation.

**Pièges déjà connus, qui te concernent aujourd'hui :**

- Le prompt se confronte au dépôt **avant** d'être gelé (leçon du 29 août), et le relecteur remesure tout nombre :
  un chiffre repris d'un document n'est pas mesuré. Les trois mesures ci-dessus datent du 7 septembre au soir ;
  remesure-les avant de les écrire dans un prérequis.
- Le geste du chef de projet reste le merge et le push. `/land` refuse une branche non fusionnée et affiche la
  commande. Bump `patch` tant que la version est < 1.0.0 (0.1.26 → 0.1.27).
- Pendant l'exécution en mode auto, chaque appel au navigateur posera une question au chef de projet ; il répond
  `1. Yes`, jamais « don't ask again ». Le serveur Playwright refuse `file:` : toute vérification de rendu exige un
  serveur local, sinon on ne la prescrit pas.
- Voie (a) : Cowork écrit dans `.claude/` si besoin, le chef de projet commite ; l'agent ne peut pas y écrire.

## Ce qui n'est PAS au programme, et pourquoi

- **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
  `browser_network_requests`) : nommés au fil (`12 sexies`) et au `CLAUDE.md`, sous le seul `ask` ; c'est un
  arbitrage du chef de projet et un CHORE dédié, pas un ajout en passant dans un prompt de finitions.
- **Ligne `12 septies`, « Les coulisses »** : arbitrée, inscrite, non rédigée ; la seule question qui compte est
  « quels trois artefacts » ; elle passe **après** la carte Open Graph pour que le lien s'affiche proprement.
- **Ligne 13, « Mise en scène »** : attend la réponse du chef de projet sur `[W29]`/`[W30]`, posée depuis le
  3 septembre.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture humaine d'abord.
- **R&D nommées, non instruites** : le compteur des trois qui ne distingue pas trois révisions de trois relances
  du même fichier (le `prompt_sha256` porterait l'information) ; `/fix` sans garde `prompt-reviewer` ; `RD-062`,
  `RD-063` (hook compteur), `RD-061` ; les vingt-huit `deny` non éprouvées une à une ; GMFCC.
- **Le kit** : `poser-plancher.js` et le plancher v3 y sont, `NEW_WORKSTATION.md` a son § 3 bis ; le gabarit du kit
  n'a toujours ni `settings.json`, ni section « Règles de sécurité », ni `review.json`, ni `land-guard.js` : dette
  de propagation, référentiel, pas IBMiAPI.
- **Une version Python de `poser-plancher.js`** (sans prérequis Node) : seulement si la machine de déplacement n'a
  pas Node dans WSL, et ça se re-prouve (14 essais).

## Trous et questions ouvertes à me rappeler

1. `node` et `python3` sont permis à l'agent et savent tout faire, réseau compris : c'est le prompt qui le tient.
   Et `node poser-plancher.js --go` n'est retenu que par une variable d'environnement (un filet, pas une serrure).
2. `browser_navigate` atteint n'importe quelle adresse **réseau** (pas le local) ; `browser_network_request` est un
   chemin plus direct ; tous deux sous le seul `ask`. Le bornage par URL demande le hook `RD-063` / `[W69]`.
3. La carence de 72 h d'un paquet **n'est pas vérifiable par le relecteur** (réseau fermé) : ce contrôle reste au
   chef de projet, et le croire couvert serait la lecture dangereuse.
4. La mesure VoiceOver porte neuf objets et attend un humain depuis l'incrément 9.
5. Les deux rangées « S/36 · IBM i » du menu (`[W65]`) se règlent avec le texte des chapeaux.
6. `[W66]` : toute base se remesure le jour même ; `chapeau"` = 24 ce soir, pas 18.
7. Le fichier machine `settings.json` a perdu `effortLevel` et `tui` entre le 2 et le 7 septembre : à remettre par
   le chef de projet s'il y tient, le script ne les recrée pas.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui s'est
trompé **six fois** dans la journée qu'il vient de terminer — dont : affirmer que Node était sur la machine Windows
sans l'avoir mesuré (il est dans WSL, et `node` était inconnu dans PowerShell) ; indiquer `C:\Users\…\.claude` comme
fichier du plancher alors que Claude Code lit celui de WSL ; livrer une première version du script qui lisait mal son
argument dans le cas réel, sans `--cible` (trouvé à la relecture, avant usage) ; et écrire au chef de projet une
consigne si dense qu'il a répondu « j'ai rien compris ».

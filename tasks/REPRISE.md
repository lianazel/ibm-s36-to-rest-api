Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **29**, lue dans `.pipeline/STATUS.md` le 4 septembre 2026 — c'est le SEUL
compteur. Relis-la le jour même avant de la recopier. Cette session Cowork : celle du 4 septembre 2026 se ferme ;
la tienne est datée du jour où tu lis ceci. (Cowork ne numérote plus ses sessions.)

---

## AVANT DE M'ÉCRIRE QUOI QUE CE SOIT

Ce message est la porte manuelle de l'ouverture (`RD-057`). Depuis la méthode **v2.31**, on lit **par tranches,
jamais en entier, la personne d'abord, la méthode au moment d'agir** (Core §5.1). Ton rapport d'ouverture nomme
les **tranches** lues (fichier + section), jamais les fichiers seuls.

Dans cet ordre, et sans rien me dire entre-temps :

1. **La personne** : au référentiel, `PEDAGOGY_PROFILE.local.md` et `STYLE_PROFILE.local.md`, en entier. Je ne suis
   pas de ton monde, je suis du monde IBM i : mots simples, une idée par phrase, analogie IBM i quand ça aide.
   Quand je clique une réponse à choix, vérifie que j'ai compris avant d'agir.
2. **Le projet, par tranches** : `CLAUDE.md` en entier (sections « Règles de sécurité » et « Agents » ont changé le
   4 septembre) · `.pipeline/STATUS.md` (une ligne) · `tasks/ROADMAP.md` : **le tableau du fil** (lignes `12 sexies`,
   `12 septies`, `12 octies`, 13) et les dettes `[W67]` à `[W69]` au bas de « Dettes et reports » · `tasks/lessons.md` :
   la liste des titres (`grep '^## '`) et les deux entrées du 3 septembre · `tasks/JOURNAL_v0.1.md` : l'entrée
   « Session 29 » seulement · `.claude/settings.json` en entier (39 `deny`, 1 `ask`) · `.claude/commands/ship.md`,
   ÉTAPE 0 · `.claude/agents/prompt-reviewer.md`.
3. **Les rapports d'essai 0, s'ils existent** : `.pipeline/ESSAI0_mcp.md`, `.pipeline/prompt-review.json`,
   `.pipeline/prompt-reviews.log`. S'ils n'existent pas, la tâche du jour commence par le chef de projet (voir plus bas).
4. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les paragraphes de satellites que
   la table désigne pour ce que tu vas écrire — pour un geste sur les permissions : `SECURITY_METHOD` §3.4, §3.5,
   `ASSURANCE_METHOD` couche A (dont la précision « essai 0 » du 4 septembre), `AGENT_SCOPE_METHOD` §6.
5. **Mesure** l'état du dépôt **par lecture de fichiers**, jamais par une commande git depuis la VM Cowork (chaque
   `git status` y laisse un `index.lock` insupprimable ; deux traînent déjà dans `.git/`, `_to_delete_index.lock.s19*`) :
   `.git/HEAD` · `.git/refs/heads/*` · `.git/refs/remotes/origin/main` · `.git/logs/HEAD` (trois dernières lignes) ·
   `grep '"version"' package.json` · `.pipeline/STATUS.md` · `grep -c '^      "' .claude/settings.json` ·
   `grep -o '\[W[0-9]*\]' tasks/ROADMAP.md | sort -t W -k2 -n | tail -1`. `npm test` et les commandes git sont pour
   Claude Code ou pour moi. Le `HOME` de la VM n'est pas celui de la machine : tu ne lis ni `~/.claude/`, ni
   `~/.claude.json`.

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document et le
dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 4 septembre 2026 au soir, par lecture de fichiers, **après le push**.

- **`main` = `origin/main` = `f7670e4`**, version **0.1.26**, `STATUS` = `CLOSED — session 29`. Une seule branche.
  Arbre propre au moment d'écrire — sauf **ce fichier**, `tasks/REPRISE.md`, neuf, que le chef de projet commite
  par-dessus (`docs: reprise 2026-09-04`).
- **Tests : 382/382** selon `review.json` (commit `674d8bb`, verdict SHIP) et le journal de la session 29 — **pas
  relancés depuis**. Je compte **239** blocs `it(`/`test(` dans les sept fichiers de `tests/`, **18** `.each` : l'écart
  vient des tests paramétrés. **39** leçons. Dernière dette : **`[W69]`**.
- **Liste d'interdits : 39 `deny` + 1 `ask`** (`mcp__playwright`, tout le serveur : chaque appel au navigateur
  demande au chef de projet, même en mode auto — c'est un frein à boucle, pas une garde contre un dégât).
  `browser_run_code_unsafe` seul retiré ; `browser_evaluate` reste disponible sous le frein. **Dix règles éprouvées,
  vingt-neuf non ; la règle `ask` et la règle MCP ne sont pas éprouvées.** Le nom du serveur, `playwright`, est
  lu dans `.claude/settings.local.json`, pas deviné. Plancher machine `PLANCHER_settings-machine_v3.json`
  (37 + 1) dans `Etude_Technique`, **pas encore posé** dans `~/.claude/settings.json`.
- **`/land` ne merge plus** : le merge est un geste du chef de projet, avant `/land`, qui refuse une branche non
  fusionnée et affiche la commande à taper. Bump `patch` tant que la version est < 1.0.0. **Non éprouvé** : le prochain
  atterrissage réel sera le premier.
- **`/ship` commence par le `prompt-reviewer`** (agent en lecture seule, ÉTAPE 0) : quatre contrôles, verdict dans
  `.pipeline/prompt-review.json`, refus propre sans effet de bord, **verrou des trois refus** (journal
  `.pipeline/prompt-reviews.log`). `/ship` exige désormais un **chemin de prompt gelé**. **Non éprouvé.** `/fix` n'a
  pas la garde.
- `CLAUDE.md` épingle encore **« Méthode v2.29 »** ; la méthode est en **v2.32** depuis ce soir. Re-pin au prochain
  incrément, décision consciente (`MAINTENANCE.md`, règle 3).
- Le site est en ligne : https://lianazel.github.io/ibm-s36-to-rest-api/ — 0.1.26. **Le dépôt est public : tout commit
  est une publication.** Anonymisation P1 inchangée. Règle de partage : on montre des instances (ce qui s'est passé),
  jamais des invariants (le pourquoi, qui reste au référentiel privé).
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v26.md`). **Il n'est pas la source de
  vérité : le dépôt l'est.**
- Mesuré le 4 septembre pour Finitions 2 : `og:`/`twitter:` = **0** dans `index.html` ; « environnement S/36 » =
  **0** occurrence dans `index.html` et `js/i18n.js` (rien à corriger sur ce point).

## Ce qu'on fait aujourd'hui

**Une seule tâche : fermer le CHORE sécurité au fil, sur preuve.** Elle commence par **deux gestes du chef de projet**,
en session Claude Code **neuve**, **en mode automatique** (c'est là que le frein doit mordre), après avoir posé le
plancher v3 dans `~/.claude/settings.json` et relancé :

1. `prompts/v0.1/CHORE_securite-mcp-et-land_v1.md` — l'essai 0 des permissions. Attendu : `browser_run_code_unsafe`
   **absent** de la liste d'outils, `browser_evaluate` **présent**, **une question à l'écran** au premier
   `browser_navigate` et au `browser_snapshot`, `git branch --list` témoin, rapport `.pipeline/ESSAI0_mcp.md`.
2. `/ship prompts/v0.1/SPIKE_piege-prompt-reviewer_v1.md` — **quatre fois de suite**. Attendu : `BLOCK` trois fois
   (C1 : `npm install`, `curl`, `git push`, `/land` qui merge ; C2 : `mcp__playwright` = 2 et non 5 ; C3 : dépendance et
   réseau non déclarés ; C4 : `docs(prompt)` pointe `_v2`, pas de section « ne fait pas »), **aucune branche, aucun
   commit**, `git status --short` inchangé ; au **quatrième** : `TROIS REFUS SUR SPIKE_piege-prompt-reviewer — on ne
   révise plus, on découpe, en session neuve`.

Puis, **Cowork** : lire les deux rapports **par le contenu**, et écrire ce qu'ils disent — pas ce qu'on attendait.
Si les deux mordent : marquer au fil `12 sexies` et `12 octies` atterries, `[W67]` et `[W68]` remboursées (geste
manuel, `[W24]`) ; mettre `CLAUDE.md` à jour (« éprouvées » : compte exact) ; entrée de journal « CHORE sécurité »
(pas de `/land` : Cowork écrit, le chef de projet commite) ; lire le **nom exact** de l'outil réseau MCP dans
`ESSAI0_mcp.md` avant toute règle `deny` supplémentaire. Si l'un ne mord pas : **ne rien corriger en cours de session**,
nommer le fait, le prompt suivant le porte.

**Le premier arbitrage à me demander, avant d'écrire une ligne** : les rapports existent-ils déjà ? Si oui, on lit.
Si non, la session commence par mes deux gestes, et tu m'attends.

**Pièges déjà connus, qui te concernent aujourd'hui :**

- Une règle ajoutée en cours de session ne mord pas ; toute mesure se fait en session neuve. `STATUS` doit valoir
  `CLOSED` ou `READY` pour toucher aux permissions. Il vaut `CLOSED`.
- Un `deny` MCP nu **retire l'outil du contexte** : pas de message de refus à attendre, la preuve est l'absence. Le `ask`,
  lui, se voit. Une faute de frappe dans un nom MCP est **silencieuse** (les noms à `_` échappent à l'avertissement).
- Voie (a) : Cowork écrit dans `.claude/`, le chef de projet commite ; l'agent ne peut plus y écrire, c'est voulu.
- Le geste du fil se commite sur `main`, jamais sur une branche.

## Ce qui n'est PAS au programme, et pourquoi

- **Finitions 2** (légendes des cadres de code en encre pleine, `[W59]` `[W60]` `[W61]`, balises Open Graph et Twitter
  — image 1200 × 630 à choisir par le chef de projet, une seule langue, anglais recommandé) : **après** la preuve du
  CHORE, parce qu'un chantier en mode auto rouvre le navigateur.
- **Ligne 13, « Mise en scène »** : attend la réponse du chef de projet sur `[W29]`/`[W30]`, posée depuis le 3 septembre.
- **Ligne `12 septies`, « Les coulisses »** : arbitrée, inscrite, **non rédigée** ; la seule question qui compte est
  « quels trois artefacts » — poser, ne pas choisir à sa place.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture par le chef de projet et par
  un ou deux anciens collègues d'abord ; puis anglais, PDF, page bilingue **après** Open Graph.
- **`/fix` sans garde `prompt-reviewer`**, **`RD-062`** (liste d'autorisations), **`RD-063`** (hook compteur),
  **`RD-061`** (audit des deux doctrines) : nommés au référentiel, pas au programme d'IBMiAPI.
- **Le re-pin v2.29 → v2.32** de `CLAUDE.md` : au prochain incrément, pas en passant.
- **Les vingt-neuf règles non éprouvées une à une** et **GMFCC** : nommés, pas au programme.

## Trous et questions ouvertes à me rappeler

1. `node` et `python3` sont permis et savent tout faire, réseau compris : c'est le prompt qui le tient, pas la liste.
2. `browser_navigate` atteint n'importe quelle URL ; seul chemin réseau de l'agent, gardé par le `ask`, le prompt et le
   chef de projet — le borner demande le hook `RD-063`.
3. La mesure VoiceOver porte neuf objets et attend un humain depuis l'incrément 9.
4. Les deux rangées « S/36 · IBM i » du menu (`[W65]`) se règlent avec le texte des chapeaux, pas en passant.
5. La base `chapeau" = 24` (`[W66]`) ne vit que dans un artefact non commité : toute base se remesure le jour même.
6. Le kit du harnais est **en retard sur IBMiAPI** : `review.json`, `land-guard.js`, statut `WORKING` n'y sont pas
   (0 occurrence dans le gabarit) — dette de propagation nommée au référentiel, pas un chantier d'IBMiAPI.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui s'est
trompé **six fois** dans la journée qu'il vient de terminer — dont : proposer d'interdire `browser_evaluate` sans avoir
compris que l'objet du chef de projet était la **boucle**, pas le dégât ; oublier le réflexe du prompt de reprise en
quittant IBMiAPI pour le harnais, une heure après avoir écrit que c'était un réflexe ; mettre un paragraphe de
« pourquoi » (doctrine) dans un fichier d'agent d'un dépôt public, six heures après avoir reçu la règle du partage ;
et écrire tout un chantier d'un coup quand on attendait un pas à la fois.

# CHORE — Sécurité : un outil MCP retiré, le navigateur sous frein à clic, `/land` sans merge — et l'essai 0 qui prouve les règles

**Type** : CHORE · **Cible** : `prompts/v0.1/CHORE_securite-mcp-et-land_v1.md` · **Ligne du fil** : `12 sexies`, « CHORE sécurité » · **Rembourse** : `[W67]` (Playwright hors de la liste) et `[W68]` (`/land` prescrit un `git merge` que la liste refuse).
**Taille** : pour toi, **un essai en lecture seule, sans branche, sans commit**. Les fichiers du chantier sont déjà écrits et committés par le chef de projet avant ton lancement (voie (a), arbitrée le 4 septembre 2026 : Cowork écrit, le chef de projet commite, l'agent n'a plus le droit d'écrire dans `.claude/` et c'est voulu).

**Ce que le chantier a changé, avant toi** (tu le lis, tu n'y touches pas) :
- `.claude/settings.json` : **39** règles `deny` (38 + `mcp__playwright__browser_run_code_unsafe`) et **1** règle `ask` : `mcp__playwright`, tout le serveur. Le nom du serveur, `playwright`, est mesuré dans `.claude/settings.local.json` du 3 septembre, pas deviné. **L'objet premier du `ask` n'est pas un dégât, c'est la boucle** : le 3 septembre, une vérification de rendu s'est étirée sur une dizaine d'appels sans qu'aucune question ne l'interrompe ; désormais chaque appel au navigateur demande au chef de projet, même en mode automatique.
- `.claude/commands/land.md` : plus aucun `git merge`. Précondition d'ÉTAPE 0 : la branche est déjà dans `git branch --merged main`, sinon REFUS avec la commande à taper. Bump `patch` tant que la version est < 1.0.0.
- `CLAUDE.md`, « Règles de sécurité » : trente-neuf règles, dix éprouvées, le paragraphe « Le frein à clic », la phrase sur MCP réécrite, `browser_navigate` nommé comme seul chemin réseau.
- Hors dépôt : `../Etude_Technique/PLANCHER_settings-machine_v3.json` (37 `deny` + 1 `ask`), à poser dans `~/.claude/settings.json` par le chef de projet.

## Satellites consultés (Core §8.1, table de déclenchement — lignes cochées, lignes écartées)

**Cochées** : « touche une permission » → `SECURITY_METHOD` §3.4, §3.5 (moindre privilège : on retire l'exécution de code, on met le navigateur sous demande), §3.7, §3.10 (lus ; §3.7 et §3.10 ne s'appliquent pas, aucun hook ni HTTP ici) · « crée ou modifie une règle exécutable » → `ASSURANCE_METHOD` couche A : **une porte se prouve à sa naissance**, c'est tout l'objet de ce prompt ; et « outil d'inspection ≠ porte » : Playwright est une lampe torche, les règles `deny` et `ask` sont la porte · « écrit hors du dépôt » → `AGENT_SCOPE_METHOD` §6 : le plancher machine est un geste du chef de projet, **tu ne touches à rien sous `~/.claude/`**.
**Écartées** : `UX`, `SQL`, `VISION` (aucun rendu à valider : la navigation de l'ÉTAPE 3 est un témoin, pas une vérification), `LOOPING`, `MULTISESSION`, `STYLE`, `PEDAGOGY`. Aucune dépendance : `SECURITY` §3.3 non cochée.

## Ce que la doc officielle établit (vérifiée le 4 septembre 2026, `code.claude.com/docs/en/permissions` et `…/permission-modes`)

- Un `deny` nu sur un outil (`mcp__playwright__browser_run_code_unsafe`) **retire l'outil du contexte** : tu ne le vois plus dans ta liste d'outils. Il n'y a donc **pas de message de refus à observer** ; la preuve est l'**absence**.
- Un `ask` sur un serveur (`mcp__playwright`) **force une question au chef de projet à chaque appel, même en mode automatique** ; un `ask` prime sur tout `allow`, y compris les quatre `allow` `mcp__playwright__…` de `settings.local.json`. La preuve est **visible** : une question à l'écran au premier appel.
- Une règle `mcp__…(…)` (avec parenthèses) est **ignorée au chargement** et listée dans la boîte « invalid settings » au démarrage.
- Une règle dont le nom ne correspond à aucun outil connu produit un avertissement au démarrage — **sauf si le nom contient `_`**, ce qui est le cas des deux règles neuves. **Une faute de frappe dans un nom MCP est donc silencieuse.** C'est pourquoi l'ÉTAPE 1 relève ta liste d'outils mot pour mot.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 4 septembre 2026 sur `main` à `7a69a6c`, par lecture de fichiers, **avant** le commit du chantier.

1. Tu es lancé dans une **session neuve**, ouverte **après** le commit du chantier, **en mode automatique** (c'est le mode où le frein doit mordre). Une règle ne mord qu'à la relance (fait mesuré le 2 septembre).
2. `git branch --show-current` imprime `main`. Version **0.1.26** au manifeste (`grep '"version"' package.json`).
3. `.pipeline/STATUS.md` commence par `CLOSED — session 29`. **Tu ne l'écris pas** : ce prompt n'usine rien.
4. `grep -c 'mcp__playwright' .claude/settings.json` = **2** (une ligne `deny`, une ligne `ask`). `grep -c '^      "' .claude/settings.json` = **40** (39 `deny` + 1 `ask`, une règle par ligne, indentée de six espaces ; mesuré le 4 septembre après l'écriture).
5. `grep -c 'git merge' .claude/commands/land.md` = **3** (mesuré après l'écriture) : la phrase « ne merge jamais » du préambule, la commande à taper dans le refus de l'ÉTAPE 0, et « aucun `git merge` ici » à l'ÉTAPE 2 — **aucune n'est une commande à exécuter**. `grep -c 'ÉTAPE 2 — HASH DE MERGE' .claude/commands/land.md` = **1**.
6. Au démarrage, Claude Code a-t-il signalé une règle invalide ou ignorée ? Copie le texte exact s'il y en a un, ou écris « aucun avertissement au démarrage ». Si l'une des deux règles MCP y figure : ARRÊTE-TOI.

## ÉTAPE 1 — LA LISTE, MOT POUR MOT

Écris dans `.pipeline/ESSAI0_mcp.md` (fichier neuf, non commité, `.pipeline/` est ignoré par git) la liste **complète** des noms de tes outils qui commencent par `mcp__playwright__`, **un par ligne, copiés tels quels**, sans en omettre ni en reformuler. Compte-les et écris le compte. Puis, sur deux lignes séparées : `browser_run_code_unsafe : ABSENT|PRÉSENT` et `browser_evaluate : ABSENT|PRÉSENT` (attendu : le premier ABSENT, le second PRÉSENT — il n'est plus interdit, il est sous `ask`).

Signale à part, s'ils existent, tout outil dont le nom contient `network`, `run_code`, `install`, `file` ou `upload` : le chef de projet tranchera s'ils passent en `deny` (le nom exact de l'outil réseau n'a pas été mesuré le 4 septembre ; il ne s'ajoute qu'après ta lecture).

## ÉTAPE 2 — SI `run_code_unsafe` EST ENCORE LÀ

Si `browser_run_code_unsafe` est **ABSENT** de ta liste : la règle a mordu, écris « refus par retrait du contexte, aucun appel possible » et passe à l'ÉTAPE 3.
S'il est **PRÉSENT** : la règle n'a pas mordu. Appelle-le **une seule fois**, en **commande littérale**, avec le code `1 + 1` et rien d'autre, copie la réponse **mot pour mot** dans le fichier, puis **ARRÊTE-TOI et signale**. Ne remplace pas l'appel par un autre outil, ne le reformule pas : un agent qui contourne rend l'essai inobservable (leçon du 2 septembre).

## ÉTAPE 3 — LE FREIN, PUIS LE TÉMOIN

1. `browser_navigate` vers le fichier local `index.html` du dépôt en adresse `file://` (construis-la depuis `pwd`), **jamais une adresse réseau**. **Attendu : une question apparaît au chef de projet avant que l'appel parte.** Écris dans le fichier ce que tu as observé : question posée (et sa réponse) ou appel parti sans question. Si aucune question n'est apparue, **le frein n'a pas mordu** : note-le, continue quand même l'essai, le chef de projet tranchera.
2. `browser_snapshot`. Même observation : question ou pas. Écris l'adresse exacte utilisée et le titre de la page tel que le snapshot le rend.
3. `git branch --list` : copie la sortie mot pour mot dans le fichier.
4. Un seul `navigate`, un seul `snapshot`, **aucun autre appel au navigateur** : le compte d'appels est une mesure de cet essai. Si un geste est refusé ou demande une permission, copie le message exact, ne le contourne pas, continue.

## ÉTAPE 4 — RAPPORT ET STOP

Le fichier `.pipeline/ESSAI0_mcp.md` porte, dans cet ordre : la date et l'heure ISO, le mode de permission de la session, l'avertissement de démarrage (ou son absence), la liste de l'ÉTAPE 1 avec son compte, les deux lignes ABSENT/PRÉSENT, le résultat de l'ÉTAPE 2, les observations de l'ÉTAPE 3 (question ou pas, deux fois), les deux témoins, et le **nombre total d'appels au navigateur** que tu as faits. Puis affiche EXACTEMENT : `ESSAI 0 TERMINÉ — lire .pipeline/ESSAI0_mcp.md`, et STOP.

## Ce que ce prompt NE fait PAS

- **Aucune écriture** hors `.pipeline/ESSAI0_mcp.md`. Pas de branche, pas de commit, pas de `STATUS.md`, pas de `tasks/`, pas de `CLAUDE.md`. Le fil (`[W67]`, `[W68]` « remboursées ») est un geste manuel du chef de projet, après lecture de ton rapport ([W24]).
- **Aucune adresse réseau** dans `browser_navigate` : `file://` seulement. Le trou `browser_navigate` est nommé au `CLAUDE.md`, il ne se mesure pas aujourd'hui.
- **Aucun `browser_evaluate`** : il est disponible, il n'est pas dans l'essai. Un appel de plus est un appel de trop.
- **Aucun `npm test`** : rien n'a changé dans le code ni dans les tests (382/382 au dernier compte, session 29).
- **Aucun geste sous `~/.claude/`** : le plancher machine v3 est posé par le chef de projet.
- **Pas de `/land`** : ce chantier n'a pas de branche, la commande réécrite s'éprouvera au prochain atterrissage réel (à noter au fil comme « non éprouvée » jusque-là).
- Pas de `python3`, pas de `node -e` pour faire ce qu'un outil refuse.
- Le hook compteur d'appels (RD-063) n'existe pas : ce prompt ne le construit pas, il mesure ce qui existe.

Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **32**, lue dans `.pipeline/STATUS.md`. C'est le SEUL compteur ; relis-la le
jour même avant de la recopier. Cette session Cowork est du **10 septembre 2026** : Cowork date ses sessions, il ne
les numérote plus. Ce fichier est `tasks/REPRISE.md`, écrasé à chaque fin de session et commité avec elle
(`docs: reprise 2026-09-10`) ; la pile, c'est `git log -- tasks/REPRISE.md`.

**Cette session s'est terminée sur un atterrissage, et sur une leçon qui a coûté trois heures.** Lis le bloc
« Où en est le travail » avant de faire quoi que ce soit.

---

## AVANT DE M'ÉCRIRE QUOI QUE CE SOIT

Ce message est la porte manuelle de l'ouverture (`RD-057`). Méthode **v2.33** : on lit **par tranches, jamais en
entier, la personne d'abord, la méthode au moment d'agir** (Core §5.1). Ton rapport d'ouverture nomme les
**tranches** lues (fichier + section), jamais les fichiers seuls.

Dans cet ordre, et sans rien me dire entre-temps :

1. **La personne** : au référentiel, `PEDAGOGY_PROFILE.local.md` et `STYLE_PROFILE.local.md`, en entier. Je ne suis
   pas de ton monde, je suis du monde IBM i : mots simples, une idée par phrase, analogie IBM i quand ça aide. Quand
   je clique une réponse à choix, **vérifie que j'ai compris avant d'agir**. Quand ta consigne est dense, je le dis,
   et c'est la consigne qui est fautive.
2. **La leçon d'hier, et c'est la tranche qui compte le plus** : `tasks/lessons.md`, **la dernière entrée**
   (10 septembre 2026, « Une réserve qui affirme une **absence** se prouve par un balayage, jamais par deux lignes
   lues »). Elle est née d'une journée où **quatre revues de sortie** ont tourné sur **un code qui n'a jamais bougé**.
   Lis-la avant de juger quoi que ce soit dans le dépôt.
3. **Le projet, par tranches** : `CLAUDE.md` en entier (il épingle **v2.32**, voir l'écart 3) · `.pipeline/STATUS.md`
   (une ligne) · `tasks/ROADMAP.md` : **la ligne `12 septies` du fil**, et les dettes au bas de « Dettes et reports »
   · `tasks/lessons.md` : la liste des titres (`grep '^## '`) · `tasks/JOURNAL_v0.1.md` : l'entrée « Session 32 »
   seulement, dont son bloc de dettes · `.claude/settings.json` en entier · `.claude/agents/prompt-reviewer.md` en
   entier.
4. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les satellites que la table désigne.
   Pour la tâche du jour : `STYLE_METHOD` + profil, `UX_METHOD`, `ASSURANCE_METHOD` couche A, `VISION_METHOD`.
   `AGENT_SCOPE_METHOD` ne se charge que si un geste sort du dépôt : l'incrément d'hier a montré qu'une preuve
   d'aveuglement se joue **en mémoire**, sans fichier temporaire, sur le précédent de `tests/partage.test.js`.
5. **Mesure** l'état du dépôt **par lecture de fichiers**, jamais par une commande git depuis la VM Cowork (chaque
   `git status` y laisse un `index.lock` insupprimable) : `.git/HEAD` · `.git/refs/heads/*` (un nom de branche avec
   `/` est un sous-dossier) · `.git/refs/remotes/origin/main` · `.git/logs/HEAD` (trois dernières lignes) ·
   `grep '"version"' package.json` · `.pipeline/STATUS.md` · `grep -c '^      "' .claude/settings.json` ·
   `grep -o '\[W[0-9]*\]' tasks/ROADMAP.md | sort -t W -k2 -n | tail -1` · `grep -c '^## ' tasks/lessons.md`.
   `npm test` et les commandes git sont pour Claude Code ou pour moi.
6. **Ce qui date le dernier commit, c'est `.git/logs/HEAD`, PAS `.git/index`.** Un simple `git status` touche l'index
   sans rien commiter. Les fichiers modifiés ou non suivis se trouvent en comparant les dates de modification à celle
   du dernier commit lu dans `logs/HEAD`.
7. **Piège d'outillage, à connaître avant de mesurer quoi que ce soit.** Ton bac à sable n'est **pas** un miroir du
   dépôt : il ne contient que les fichiers que tu y as copiés. Une commande qui balaie un dossier
   (`ls tests/*.js | wc -l`, `grep -r`, une boucle `for f in tests/*.js`) y rend un chiffre **faux et crédible**.
   Ton prédécesseur s'y est fait prendre hier, en comptant des cas de test : sa boucle a vu **2** fichiers là où le
   dépôt en porte **9**, et il avait ce piège écrit sous les yeux depuis le matin. Mesure fichier par fichier, ou par
   le listage du dossier sur ma machine.
8. **La machine** : Claude Code, Node, npm et git tournent **dans WSL**, pas dans PowerShell. Toute commande que tu me
   donnes dit de quel côté elle se tape, et en chemin WSL (`/mnt/c/…`). Le plancher machine est
   `/home/jcc_1a/.claude/settings.json`, posé par `TWAIM_Kit/poser-plancher.js`, lancé par moi, jamais par un agent.
9. **Le pont ne sait pas écrire dans `.claude/`.** Mesuré hier : toute écriture par les outils distants y est refusée
   (`Writing to .claude is not permitted via remote tools`). La voie (a) passe donc par un fichier déposé **à côté**
   et une commande de copie que je tape.

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document et le
dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 10 septembre 2026, **après le push**, par lecture de fichiers.

- **`main` = `origin/main` = `2ca0406`**, version **0.1.28**, `STATUS` = `CLOSED — session 32`. **Une seule
  branche** : `refs/heads/` ne porte que `main`, `feat/coulisses-arret` a été supprimée.
- Les trois dernières lignes de `.git/logs/HEAD` : `checkout` vers `main`, `merge feat/coulisses-arret` (`831f638`),
  puis `docs: journal session 32 + bump 0.1.27 -> 0.1.28 — clôture (merge 831f638)` (`2ca0406`).
- **Le chapitre « La méthode » a son premier sous-titre en ligne.** Quatre fichiers touchés, 195 insertions, zéro
  suppression : dix valeurs dans `js/i18n.js`, cinq éléments dans `index.html`, la classe `.citation` dans
  `css/styles.css`, et une porte neuve `tests/coulisses.test.js`. Morsure et aveuglement joués, pas supposés.
- **Tests : 401/401**, chiffre lu dans `.pipeline/review.json`, relancé par Claude Code, **pas par moi**. **9**
  fichiers de test (objets, listage du dossier). **42** leçons (lignes `^## `).
- **Le site** : https://lianazel.github.io/ibm-s36-to-rest-api/, en 0.1.28. **Le dépôt est public : tout commit est une
  publication.** Anonymisation P1 inchangée. Règle de partage : des instances, jamais des invariants.
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v27.md`, à mettre à jour).
  **Il n'est pas la source de vérité : le dépôt l'est.**
- Hors dépôt, la matière du chapitre : `Etude_Technique/NOTES_CONTENU_les-coulisses_v2.md` (13 691 octets), qui porte
  encore les **trois** blocs. Deux restent à livrer.

**Ce qui s'est passé hier, en quatre lignes, parce que ça décide de ta prudence.** Le prompt du premier bloc a passé
le `prompt-reviewer` du premier coup, `SHIP`. Puis **quatre revues de sortie** ont tourné sur **trois commits qui
n'auraient jamais dû exister** : une réserve du `reviewer` affirmait qu'un fait publié n'était pas recoupable dans le
dépôt. Il l'était, en tête du fichier cité, commité depuis le 27 août. Cowork a suivi cette réserve, réécrit deux
valeurs, écrit un avenant, récolté un `FAIL` sur son propre avenant, et tout a été retiré. **Le code livré est
exactement celui de la première revue.** Le `prompt-reviewer`, lui, avait écrit dès l'ÉTAPE 0 : « le fait chiffré du
`p2` est, lui, exact au fichier ». Il avait raison, personne ne l'a écouté.

**Écarts mesurés, à traiter ou à assumer :**

1. **Le fil s'arrête à `[W69]`, et neuf dettes vivent au journal seul** : `[W70]` à `[W78]` sont nommées aux entrées
   des sessions 31 et 32 de `tasks/JOURNAL_v0.1.md`, et **absentes** de `tasks/ROADMAP.md`, mesuré après le push.
   C'était trois hier matin, c'est neuf ce soir. Une dette qui ne vit qu'au journal n'est pas portée par le fil, et
   le fil est ce qu'on relit. Geste manuel du chef de projet, famille `[W24]`.
2. **La ligne `12 septies` ne dit pas le découpage.** Elle décrit toujours trois sous-titres en un incrément et
   nomme `EVOL_les-coulisses_v2` comme prompt. Le sujet a été découpé hier, le premier bloc est atterri, deux
   restent. `tasks/ROADMAP.md` n'a pas été touché depuis 11:50. Même geste que l'écart 1.
3. **`CLAUDE.md` épingle « v2.32 », et le Core est passé en v2.33 hier soir** (règle du mode d'exécution, posée au
   référentiel). Re-pin à faire, geste du chef de projet.
4. **`.claude/` d'IBMiAPI est en retard sur son propre gabarit.** Le contrat du `prompt-reviewer` du projet porte
   **quatre** contrôles (6 714 octets) quand le gabarit `_TEMPLATE_AGENTS` en porte **cinq** (10 088 octets depuis
   hier) : **C5, « Le document ne se dément pas lui-même »**, n'est jamais descendu. Le texte à poser, C5 et le champ
   « Mode d'exécution », est prêt dans `Etude_Technique/PREP_mode-execution-au-gabarit_v1.md`. Rien n'est posé côté
   projet ; le référentiel, lui, est fait.
5. **Une réserve non tranchée sur `.claude/commands/ship.md`** : sa ligne 56 cite « Core §4.1 v2.29 ». Ce n'est
   peut-être pas un épinglage périmé, mais la référence à la révision qui a **créé** la règle du premier
   enregistrement, comme sa ligne 11 cite v2.32 pour la garde déléguée. Détail au §5 du `PREP` ci-dessus. À trancher
   avant de toucher au fichier.
6. **Deux fichiers de travail traînent hors dépôt** : `Etude_Technique/DRAFT_EVOL_coulisses-arret_v1.md` (le brouillon
   du prompt atterri, sans objet) et `Etude_Technique/EVOL_les-coulisses_v3_REFUSE.md` (le contrat gelé refusé trois
   fois). Ni l'un ni l'autre n'est lançable. À supprimer quand tu veux.

## Ce qu'on fait aujourd'hui

**Une seule tâche : écrire le prompt du second incrément des « Coulisses », les blocs `machine` et `humain`.**

Ce qu'il porte, arbitré les 9 et 10 septembre et déjà écrit au fil : deux sous-titres de plus dans le chapitre « La
méthode », un artefact réel du dépôt par sous-titre, **un seul cadre sombre** (celui qui existe déjà), les citations
neuves en ligne dans la prose. Les deux artefacts restants sont des **sorties** : un refus du `prompt-reviewer` cité
au journal (8 septembre), une leçon datée (24 août). Quatre fichiers, comme la fois précédente : `js/i18n.js`,
`index.html`, `css/styles.css` et la porte `tests/coulisses.test.js`, qui passe d'une clé à trois.

**Le premier arbitrage à me demander, avant d'écrire une ligne :**

> Le fil est-il repris **avant** que le prompt soit écrit, ou après ?

Le prérequis du prompt mesurera `grep -c 'Les coulisses' tasks/ROADMAP.md` : il tombera juste dans les deux cas.
Mais un prompt qui s'appuie sur une ligne de fil qui décrit un autre incrément que le sien est la situation qui a
produit la réserve `C3/C2` de la première relecture. **C'est une recommandation, pas une décision : reprends le fil
d'abord.** Les écarts 1 et 2 se règlent dans le même geste.

**Ce que le corps du prompt atterri hier réemploie**, et c'est la raison du découpage : ses onze prérequis, sa table
§8.1, son § « Ce que ce prompt NE fait PAS », sa preuve de morsure, sa garde de non-vacuité jouée en mémoire. Rien
ne se recopie sans être **remesuré le jour même** : la base `2ca0406` sera périmée dès que je commiterai le fil.

**Pièges déjà connus, qui te concernent aujourd'hui :**

- **Le `prompt-reviewer` avait raison hier, la revue de sortie s'est trompée.** Quand deux gardes se contredisent sur
  le même fait, on ne suit pas la plus récente : **on mesure**. Le journal des relectures est
  `.pipeline/prompt-reviews.log`, 10 lignes, la dernière `EVOL_coulisses-arret SHIP`.
- **Une phrase qui affirme une absence porte son balayage, ou elle ne s'écrit pas.** Prouver qu'une chose existe
  demande un exemple ; prouver qu'elle n'existe pas demande d'avoir tout lu, en-tête du fichier compris.
- **Tout texte que Cowork écrit dans le dépôt franchit une porte.** Hier, trois écritures n'en ont franchi aucune, et
  la revue de sortie les a rattrapées une par une, en fabriquant à chaque fois la réserve suivante. Un avenant n'est
  relu par personne : c'est `[W77]`, huit prompts en portent un, zéro n'a jamais été relu.
- **Corriger le défaut qu'on te montre ne corrige pas le défaut** (leçon du 8 septembre) : après toute correction,
  balaie **tous** ses porteurs, y compris les documents hors dépôt qui l'ont produit.
- **`grep -c` compte des lignes, `grep -o | wc -l` compte des occurrences**, un listage compte des objets. Dis
  toujours laquelle des trois tu mesures.
- **Une maquette avant le gel, c'est le précédent maison.** Les incréments 4, 9 et 10 ont tous eu la leur.
- Le geste du chef de projet reste le merge et le push. Bump `patch` tant que la version est < 1.0.0.
- Voie (a) : Cowork écrit dans `.claude/` si besoin, le chef de projet commite ; le pont refuse d'y écrire, donc le
  fichier se dépose à côté et je le copie.

## Ce qui n'est PAS au programme, et pourquoi

- **La maquette du dessin des quatre temps du harnais.** Prévue le 10 septembre, jamais commencée, deux jours de
  suite. Elle appartient à l'incrément **suivant** celui des deux blocs, et un prompt non gelé qui traîne pendant
  qu'on en prépare un autre produit deux contrats concurrents.
- **La pose de C5 et du champ « Mode d'exécution » dans `.claude/` d'IBMiAPI.** Le texte est prêt, le geste est court,
  mais il touche `.claude/` et n'entre en vigueur qu'au **prochain lancement** de Claude Code. À faire **après**
  l'atterrissage du prochain incrément, jamais pendant qu'un prompt lui est soumis. Écart 4.
- **Nommer Cowork sur le site.** Mesuré le 9 septembre : zéro occurrence de « Cowork » dans `js/i18n.js` et dans
  `index.html`. **Arbitrage propre, jamais une ligne glissée dans un incrément.**
- **La coupure de C1 en deux** dans le contrat du `prompt-reviewer` : un fait faux du dépôt devrait rendre
  `NEEDS_WORK`, pas `BLOCK`. Analysé le 8 septembre, non écrit. Même dépôt que le point précédent, même attente.
- **Les six dettes neuves d'hier** : `[W73]` double littéral de la porte, `[W74]` témoin non discriminant, `[W75]`
  `lang="fr"` absent (3 occurrences, WCAG AA), `[W76]` contraste cité qui mesure le filet, `[W77]` aucun avenant
  n'est jamais relu, `[W78]` le `p2` est daté et le site ne nomme aucun chemin. Portées au fil d'abord, corrigées
  ensuite. `[W75]` demande son propre prompt : trois occurrences, dont deux préexistantes.
- **L'écart `CDEMST`**, troisième trou du fil et `[W71]`. Il se tranche à la ligne 13 ou 14, jamais en passant.
- **Ligne 13, « Mise en scène »** : attend ma réponse sur `[W29]`/`[W30]`, posée depuis le 3 septembre.
- **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
  `browser_network_requests`) : mon arbitrage et un CHORE dédié.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture humaine d'abord.
- **Les balises Open Graph du site TWAIM** : autre dépôt, chantier voisin.
- **Le site en cinq ou six langues** : curiosité du 9 septembre, notée comme R&D à creuser plus tard.
- **R&D nommées, non instruites** : le compteur des trois qui ne distingue pas trois révisions de trois relances du
  même fichier (`prompt_sha256`) ; `/fix` sans garde `prompt-reviewer` ; `RD-061`, `RD-062`, `RD-063` (hook
  compteur) ; les vingt-huit `deny` non éprouvées une à une ; GMFCC.

## Trous et questions ouvertes à me rappeler

1. **Le Plex Mono de la classe `.citation`**, levé par les deux relecteurs et jamais tranché. Le contrat de design
   range la consigne du chef de projet en **Plex Sans**, et `.dialogue .consigne`, qui habille le même genre
   d'artefact, ne porte **aucun** `font-family` (mesuré). Le prompt d'hier prescrivait Plex Mono en disant lui-même
   que c'était « un choix de conception, pas un arbitrage rendu ». **Demande-le-moi** : le prochain incrément rouvre
   `css/styles.css` et c'est l'occasion.
2. **La passe d'appareil à 320 px** sur la citation publiée : seule contrainte dure qu'aucune commande ne vérifie.
   Aucune vérification au navigateur n'a été faite, le prompt l'interdisait. Reste à moi.
3. La mesure VoiceOver porte neuf objets et attend un humain depuis l'incrément 9.
4. `node` et `python3` sont permis à l'agent et savent tout faire, réseau compris : c'est le prompt qui le tient.
   Risque résiduel assumé, improbable, visible, survivable.
5. `browser_navigate` atteint n'importe quelle adresse **réseau** (pas le local, Playwright refuse `file:`) ; le
   bornage par URL demande le hook `RD-063` / `[W69]`.
6. La carence de 72 h d'un paquet **n'est pas vérifiable par le relecteur** (réseau fermé) : ce contrôle reste au
   chef de projet.
7. Les deux rangées « S/36 · IBM i » du menu (`[W65]`) se règlent avec le texte des chapeaux.
8. `[W66]` : toute base se remesure le jour même.
9. Le fichier machine `settings.json` a perdu `effortLevel` et `tui` entre le 2 et le 7 septembre : à remettre par le
   chef de projet s'il y tient, le script ne les recrée pas.
10. Les vignettes de médias déjà épinglées sur LinkedIn gardent parfois l'ancienne image même après relecture : il
    faut retirer le média et le remettre.
11. **Ton bac à sable n'est pas le dépôt.** Voir le point 7 de la porte : il rend des chiffres faux sans rien
    signaler, et ton prédécesseur s'y est fait prendre hier alors qu'il venait de l'écrire.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui s'est
trompé **neuf fois** dans la journée qu'il vient de terminer, dont : avoir affirmé qu'un fait publié n'était pas
recoupable dans le dépôt **sans avoir lu l'en-tête du fichier qu'il citait**, où le fait était écrit en toutes
lettres depuis le 27 août, ce qui a produit trois commits inutiles et quatre revues de sortie sur un code immobile ;
avoir lu le verdict du `prompt-reviewer` qui disait « le fait chiffré du `p2` est, lui, exact au fichier », en avoir
retenu la moitié qui alarmait et laissé la moitié qui acquittait ; avoir fait défaire au chef de projet un arbitrage
**écrit de sa main au fil**, qui cite littéralement « deux annoncées, quatre réelles » comme ce qui doit rester, et
que ce même prédécesseur avait lu et cité le matin ; avoir tracé une dérogation dans `.pipeline/changes.md`, qui est
gitignoré, donc dans une trace qui disparaissait au merge ; et avoir compté des cas de test en balayant un dossier
depuis son bac à sable, qui lui a rendu **2** fichiers sur **9**, le jour même où il écrivait ce piège dans ce
fichier. Les trois premières sont la même faute vue sous trois angles : **une mesure qu'on n'a pas terminée, portée
avec l'assurance d'une mesure faite**.

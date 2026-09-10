Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **31**, lue dans `.pipeline/STATUS.md` le 10 septembre 2026 à 14:05
(heure de Paris). C'est le SEUL compteur ; relis-la le jour même avant de la recopier. Cette session Cowork
est du **10 septembre 2026** : Cowork date ses sessions, il ne les numérote plus. Ce fichier est
`tasks/REPRISE.md`, écrasé à chaque fin de session et commité avec elle (`docs: reprise 2026-09-10`) ;
la pile, c'est `git log -- tasks/REPRISE.md`.

**Cette session s'est terminée sur un verrou, pas sur un atterrissage. Tu es la session neuve que ce
verrou impose.** Lis le bloc « Où en est le travail » avant de faire quoi que ce soit.

---

## AVANT DE M'ÉCRIRE QUOI QUE CE SOIT

Ce message est la porte manuelle de l'ouverture (`RD-057`). Méthode **v2.32** : on lit **par tranches, jamais
en entier, la personne d'abord, la méthode au moment d'agir** (Core §5.1). Ton rapport d'ouverture nomme les
**tranches** lues (fichier + section), jamais les fichiers seuls.

Dans cet ordre, et sans rien me dire entre-temps :

1. **La personne** : au référentiel, `PEDAGOGY_PROFILE.local.md` et `STYLE_PROFILE.local.md`, en entier. Je ne
   suis pas de ton monde, je suis du monde IBM i : mots simples, une idée par phrase, analogie IBM i quand ça
   aide. Quand je clique une réponse à choix, **vérifie que j'ai compris avant d'agir**. Quand ta consigne est
   dense, je le dis, et c'est la consigne qui est fautive.
2. **Les trois refus d'hier, et c'est la tranche qui compte le plus aujourd'hui** :
   `.pipeline/prompt-review.json` **en entier** (17 796 octets, le troisième verdict, écrit le 10 septembre à
   12:16) · `.pipeline/prompt-reviews.log` (9 lignes, dont les **trois dernières** portent `EVOL_les-coulisses
   BLOCK`) · et le prompt refusé lui-même, `prompts/v0.1/EVOL_les-coulisses_v3.md`, **en entier** (31 064
   octets, gelé, jamais exécuté, non suivi par git). **Lis les trois avant de proposer quoi que ce soit.**
3. **Le projet, par tranches** : `CLAUDE.md` en entier (il épingle **v2.32**) · `.pipeline/STATUS.md` (une
   ligne) · `tasks/ROADMAP.md` : **la ligne `12 septies` du fil**, dont son bloc d'arbitrages des 9 et 10
   septembre, et les dettes `[W62]` à `[W69]` au bas de « Dettes et reports » · `tasks/lessons.md` : la liste
   des titres (`grep '^## '`) et **les deux dernières entrées** (7 et 8 septembre) · `tasks/JOURNAL_v0.1.md` :
   l'entrée « Session 31 » seulement, dont son bloc « Dettes ouvertes à l'issue » · `.claude/settings.json` en
   entier · `.claude/agents/prompt-reviewer.md` en entier, parce que c'est la porte que ton prompt devra
   passer, et qu'elle a mordu trois fois de suite.
4. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les satellites que la table
   désigne. Pour la tâche du jour : `STYLE_METHOD` + profil, `UX_METHOD`, `AGENT_SCOPE_METHOD`,
   `VISION_METHOD`, `ASSURANCE_METHOD` couche A. À §4.1, lis **la règle du destinataire unique** : elle décide
   de l'arbitrage que je te demande plus bas.
5. **Mesure** l'état du dépôt **par lecture de fichiers**, jamais par une commande git depuis la VM Cowork
   (chaque `git status` y laisse un `index.lock` insupprimable) : `.git/HEAD` · `.git/refs/heads/*` ·
   `.git/refs/remotes/origin/main` · `.git/logs/HEAD` (trois dernières lignes) ·
   `grep '"version"' package.json` · `.pipeline/STATUS.md` · `grep -c '^      "' .claude/settings.json` ·
   `grep -o '\[W[0-9]*\]' tasks/ROADMAP.md | sort -t W -k2 -n | tail -1` · `grep -c '^## ' tasks/lessons.md`.
   `npm test` et les commandes git sont pour Claude Code ou pour moi.
6. **Ce qui date le dernier commit, c'est `.git/logs/HEAD`, PAS `.git/index`.** Mesuré le 10 septembre : le
   dernier commit était du 8 septembre à 13:16:46 (dernière ligne de `logs/HEAD`, et `refs/heads/main` à la
   même heure) alors que `.git/index` portait le **9 septembre à 21:22:24**. Un simple `git status` touche
   l'index sans rien commiter. La reprise du 9 septembre prescrivait l'inverse : elle avait tort, et c'est
   corrigé ici. Les fichiers modifiés ou non suivis se trouvent en comparant les dates de modification à celle
   du **dernier commit lu dans `logs/HEAD`**.
7. **Piège d'outillage, à connaître avant de mesurer quoi que ce soit.** Ton bac à sable n'est **pas** un
   miroir du dépôt : il ne contient que les fichiers que tu y as copiés. Une commande qui balaie un dossier
   (`ls tests/*.js | wc -l`, `grep -r`) y rend un chiffre **faux et crédible** : elle a rendu **5** fichiers de
   test là où le dépôt en porte **8**. Mesure fichier par fichier, ou par le listage du dossier sur ma machine.
   Ne balaie jamais un dossier depuis ton bac à sable.
8. **La machine** : Claude Code, Node, npm et git tournent **dans WSL**, pas dans PowerShell. Toute commande
   que tu me donnes dit de quel côté elle se tape, et en chemin WSL (`/mnt/c/…`). Le plancher machine est
   `/home/jcc_1a/.claude/settings.json`, posé par `TWAIM_Kit/poser-plancher.js`, lancé par moi, jamais par un
   agent.

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document
et le dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 10 septembre 2026 à 14:05 (heure de Paris), par lecture de fichiers.

- **`main` = `origin/main` = `385d327`**, version **0.1.27**, `STATUS` = `CLOSED — session 31`. **Une seule
  branche.** Deux commits ce jour, tous deux poussés, tous deux de documentation seule : `fcb5f17`
  (`docs: reprise 2026-09-09`) et `385d327` (`docs: fil 12 septies, arbitrages des 9 et 10 septembre`).
- **Dérogation, et je la dis en toutes lettres. La journée du 10 septembre n'a produit aucun incrément :
  trois `/ship`, trois refus du `prompt-reviewer`, le verrou des trois est armé.** Aucune branche, aucun
  commit d'incrément, aucun fichier de livrable touché. Le site est inchangé.
- **Un fichier gelé traîne dans le dépôt, non suivi** : `prompts/v0.1/EVOL_les-coulisses_v3.md`, 31 064
  octets. Il est **refusé**, donc il ne doit pas rester là : la règle de la session 31 dit qu'un contrat gelé
  et faux qu'un lancement pourrait désigner n'a rien à faire dans l'arbre. **Premier geste manuel à me
  rappeler** : le déplacer vers `Etude_Technique/`, hors dépôt, pour que la session neuve reparte de son
  corps sans qu'il soit lançable.
- **Tests : 395/395**, chiffre lu dans `.pipeline/review.json` (commit `a598215`, 8 septembre), **non relancé
  depuis**. **8** fichiers de test. **41** leçons (lignes `^## `). Liste d'interdits inchangée : **39 `deny`
  + 1 `ask`** en objets, **40** lignes au motif `^      "`.
- **Le site** : https://lianazel.github.io/ibm-s36-to-rest-api/ — 0.1.27, inchangé. **Le dépôt est public :
  tout commit est une publication.** Anonymisation P1 inchangée. Règle de partage : des instances, jamais des
  invariants.
- Hors dépôt, la matière du chapitre : `Etude_Technique/NOTES_CONTENU_les-coulisses_v2.md` (13 691 octets),
  à jour du bloc `machine` réécrit le 10 septembre.
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v27.md`, à mettre à jour).
  **Il n'est pas la source de vérité : le dépôt l'est.**

**Écarts mesurés, à traiter ou à assumer :**

1. **Le fil `12 septies` désigne `EVOL_les-coulisses_v2`**, soit deux révisions de retard sur le dernier
   fichier relu (`_v3`). Le prérequis 3 ne mesure que `grep -c 'Les coulisses' ≥ 1`, qui rend 1 : aucune
   conséquence mécanique, mais le fil ment sur l'état du travail. Geste manuel du chef de projet, famille
   `[W24]`.
2. **`[W70]`, `[W71]` et `[W72]` sont nommées au journal (Session 31) et absentes du fil** : `tasks/ROADMAP.md`
   s'arrête à `[W69]`, mesuré le 10 septembre. Une dette qui ne vit qu'au journal n'est pas portée par le fil,
   et le fil est ce qu'on relit. Inchangé depuis hier.
3. **`.claude/commands/ship.md` épingle encore « Core §4.1 v2.29 »** (une ligne, mesurée). L'agent n'a pas le
   droit d'écrire dans `.claude/`, c'est mon geste, voie (a).
4. **Le skill Cowork `prompt-de-reprise` dit encore « hors dépôt, `PROMPT_REPRISE_session<N>.md` »**, quand le
   gabarit du référentiel dit `tasks/REPRISE.md`, écrasé, commité. **Le référentiel gagne** ; le texte du skill
   est à mettre à jour par le chef de projet. Inchangé depuis hier.

## Ce qui s'est passé, en quatre lignes, parce que ça décide de ta tâche

Le prompt des « Coulisses » a été soumis trois fois au `prompt-reviewer`. Trois `BLOCK`, tous en **C1**, et
**les trois portent sur une phrase du § Contexte et périmètre** — jamais sur un livrable, jamais sur un
prérequis. Le corps du prompt passe **C2, C3 et C4** depuis deux tours, onze prérequis chiffrés remesurés
justes. Ce n'est pas l'incrément qui est mauvais : c'est le paragraphe qui **justifie** l'incrément, et que le
rédacteur réécrit à chaque tour sans le remesurer.

Les trois phrases, telles qu'elles ont été refusées :

1. « Les trois artefacts sont déjà publics » — le critère du fil n'est pas la visibilité du dépôt, c'est
   **doctrine contre instance**. L'artefact n° 2 était l'en-tête du contrat du `reviewer`, que la ligne
   `12 septies` range nommément dans la doctrine.
2. « Le chapitre La méthode est le plus court du site et le seul sans sous-titre » — les deux moitiés fausses.
   « Le problème » n'a pas de sous-titre non plus, et il fait **598** caractères de valeurs FR contre **1 345**,
   **5** lignes de balisage contre **24**.
3. « Le contrat du `reviewer`, celui du `prompt-reviewer`, la table des satellites et l'ordre des étapes restent
   au référentiel privé » — trois des quatre sont **commités dans ce dépôt public** : `.claude/agents/reviewer.md`
   (37 lignes), `.claude/agents/prompt-reviewer.md` (101 lignes), `.claude/commands/ship.md` (82 lignes). Seule
   la table §8.1 est hors dépôt. `CLAUDE.md` ligne 164 dit l'inverse. Et la même phrase substituait de nouveau
   le critère privé/public à celui du fil, c'est-à-dire l'erreur du premier refus, à l'envers.

## Ce qu'on fait aujourd'hui

**Une seule tâche : reprendre le prompt des « Coulisses » en session neuve, découpé.** C'est ce que le verrou
des trois impose, et son motif est écrit au Core : *la première hypothèse à tester n'est pas le prompt, c'est
le contexte saturé de celui qui l'écrit*. Tu es cette tête neuve. Tu n'as pas vu la conversation d'hier, et
c'est ta force : ne va pas la chercher.

**Le premier arbitrage à me demander, avant d'écrire une ligne** — et c'est le seul qui compte aujourd'hui :

> Le § « Contexte et périmètre » doit-il **disparaître** du prompt, plutôt qu'être réécrit une quatrième fois ?

Ce paragraphe ne prescrit rien. Il justifie. Or Core §4.1 porte la **règle du destinataire unique** : un prompt
ne s'adresse qu'à Claude Code, et tout ce qui n'est pas une instruction exécutable par lui vit dans la
conversation chef de projet ↔ Cowork ou dans la `ROADMAP`. La justification du choix des trois artefacts est
désormais **écrite au fil**, dans le bloc d'arbitrages du 10 septembre : elle a un domicile, et il n'est pas
dans le prompt. Un prompt qui n'affirme rien sur le dépôt ne peut pas affirmer un fait que le dépôt dément.
**C'est une recommandation, pas une décision : c'est à moi de trancher.** Repli si je refuse : réécrire le
paragraphe en ne citant que des faits remesurés le jour même, chacun avec sa commande.

**Ce que porte l'incrément** (inchangé, arbitré par moi les 9 et 10 septembre, et écrit au fil) : trois
sous-titres dans le chapitre « La méthode », un artefact réel du dépôt par sous-titre, un seul cadre sombre
(celui qui existe déjà), les trois citations neuves en ligne dans la prose. Les trois artefacts sont des
**sorties** : la garde chiffrée d'un prompt gelé (27 août), un refus du `prompt-reviewer` cité au journal
(8 septembre), une leçon datée (24 août). Quatre fichiers : `js/i18n.js`, `index.html`, `css/styles.css` et
une porte neuve `tests/coulisses.test.js`.

**Le corps de `EVOL_les-coulisses_v3.md` est bon et il est à réemployer**, pas à réécrire : ses onze prérequis
sont remesurés justes par le relecteur, sa table §8.1 est recalculée juste, son périmètre est fermé des deux
côtés. **Remesure-le quand même le jour même** : la base `385d327` sera périmée dès que je commiterai le fil.

**Pièges déjà connus, qui te concernent aujourd'hui :**

- **Trois refus au compteur.** Un `/ship` de plus sur ce sujet s'arrête avant même de relire, tant que le
  verrou n'est pas levé. Le journal des relectures est `.pipeline/prompt-reviews.log`.
- **Une phrase qui justifie est une phrase qui affirme.** Les trois refus viennent de là. Si tu écris une
  phrase sur l'état du dépôt, elle porte sa commande de mesure, ou elle ne s'écrit pas.
- **Corriger le défaut qu'on te montre ne corrige pas le défaut** (leçon du 8 septembre) : après toute
  correction, balaie **tous** ses porteurs, y compris les documents hors dépôt qui l'ont produit. Les trois
  refus d'hier sont trois applications ratées de cette leçon.
- **`grep -c` compte des lignes, `grep -o | wc -l` compte des occurrences**, et ni l'un ni l'autre ne compte
  des objets. Dis toujours laquelle des trois tu mesures.
- **Une maquette avant le gel, c'est le précédent maison.** Les incréments 4, 9 et 10 ont tous eu la leur.
- Le geste du chef de projet reste le merge et le push. Bump `patch` tant que la version est < 1.0.0.
- Voie (a) : Cowork écrit dans `.claude/` si besoin, le chef de projet commite ; l'agent ne peut pas y écrire.

## Ce qui n'est PAS au programme, et pourquoi

- **La maquette du dessin des quatre temps du harnais.** C'était la tâche prévue le 10 septembre, jamais
  commencée : la journée est passée dans les trois refus. Elle appartient à l'incrément **suivant** celui des
  « Coulisses », et un prompt non gelé qui traîne pendant qu'on en prépare un autre est la situation qui
  produit deux contrats concurrents. **Rien avant que les « Coulisses » soient atterries.**
- **Nommer Cowork sur le site.** Mesuré le 9 septembre : zéro occurrence de « Cowork » dans `js/i18n.js` et
  dans `index.html`. **Arbitrage propre, jamais une ligne glissée dans un incrément.**
- **Le champ « Mode d'exécution »**, qui existe en instance en tête du prompt refusé. Sa place au gabarit
  (`TEC_IA_TWAIM_CORE.md` §4.1 et `_TEMPLATE_AGENTS/.claude/agents/prompt-reviewer.md`) reste à faire, au
  référentiel. Un dépôt à la fois.
- **La coupure de C1 en deux** dans le contrat du `prompt-reviewer` : un fait faux du dépôt devrait rendre
  `NEEDS_WORK`, pas `BLOCK`. Analysé le 8 septembre, non écrit, même dépôt que le point précédent. **Les trois
  refus d'hier en sont trois illustrations** : les trois auraient été des `NEEDS_WORK` sous cette règle, et le
  verrou ne serait pas armé. À réexaminer avec ce matériel, mais **pas dans cet incrément**.
- **L'écart `CDEMST`**, troisième trou du fil et `[W71]`. Il se tranche à la ligne 13 ou 14, jamais en passant.
- **`[W70]`** motif du scrub et **`[W72]`** les deux assertions trop larges de `tests/partage.test.js` : portées
  au fil d'abord, corrigées ensuite.
- **Ligne 13, « Mise en scène »** : attend ma réponse sur `[W29]`/`[W30]`, posée depuis le 3 septembre.
- **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
  `browser_network_requests`) : mon arbitrage et un CHORE dédié.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture humaine d'abord.
- **Les balises Open Graph du site TWAIM** : autre dépôt, chantier voisin.
- **Le site en cinq ou six langues** : curiosité du 9 septembre, notée comme R&D à creuser plus tard.
- **R&D nommées, non instruites** : le compteur des trois qui ne distingue pas trois révisions de trois
  relances du même fichier (`prompt_sha256`) ; `/fix` sans garde `prompt-reviewer` ; `RD-061`, `RD-062`,
  `RD-063` (hook compteur) ; les vingt-huit `deny` non éprouvées une à une ; GMFCC.

## Trous et questions ouvertes à me rappeler

1. **La réserve qui traverse les trois relectures, jamais tranchée** : les premiers paragraphes des blocs
   `arret` et `machine` énoncent des invariants du harnais (« Un prompt ne commence pas par ce qu'il faut
   faire », « Il est en lecture seule »), là où la ligne `12 septies` pose que le « pourquoi » est doctrine.
   Le relecteur la classe en WARN, pas en FAIL : **arbitrage du chef de projet, pas un obstacle mécanique**.
   Argument mesuré en faveur du maintien : `section5.comment`, déjà publié, dit déjà « Un agent l'exécute, un
   autre le relit et rend un verdict ». **Demande-le-moi.**
2. `node` et `python3` sont permis à l'agent et savent tout faire, réseau compris : c'est le prompt qui le
   tient. Risque résiduel assumé, improbable, visible, survivable.
3. `browser_navigate` atteint n'importe quelle adresse **réseau** (pas le local, Playwright refuse `file:`) ;
   `browser_network_request` est un chemin plus direct ; tous deux sous le seul `ask`. Le bornage par URL
   demande le hook `RD-063` / `[W69]`.
4. La carence de 72 h d'un paquet **n'est pas vérifiable par le relecteur** (réseau fermé) : ce contrôle reste
   au chef de projet.
5. La mesure VoiceOver porte neuf objets et attend un humain depuis l'incrément 9.
6. Les deux rangées « S/36 · IBM i » du menu (`[W65]`) se règlent avec le texte des chapeaux.
7. `[W66]` : toute base se remesure le jour même.
8. Le fichier machine `settings.json` a perdu `effortLevel` et `tui` entre le 2 et le 7 septembre : à remettre
   par le chef de projet s'il y tient, le script ne les recrée pas.
9. Les vignettes de médias déjà épinglées sur LinkedIn gardent parfois l'ancienne image même après relecture :
   il faut retirer le média et le remettre.
10. **Ton bac à sable n'est pas le dépôt.** Voir le point 7 de la porte : il rend des chiffres faux sans rien
    signaler.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui
s'est trompé **sept fois** dans la journée qu'il vient de terminer, dont **trois** ont produit un refus du
relecteur — dont : avoir laissé passer, à sa propre relecture du matin, la citation du contrat du `reviewer`
alors qu'il avait la ligne `12 septies` sous les yeux et que ses propres notes la signalaient comme « la plus
proche de la doctrine » ; avoir écrit que « La méthode » était le chapitre le plus court du site, sur un
tableau de comparaison, de sa main, qui **oubliait un chapitre** ; avoir écrit que le contrat du `reviewer` et
l'ordre des étapes « restent au référentiel privé » alors qu'il avait lu ces trois fichiers dans le dépôt le
matin même, et avoir dans la même phrase **remplacé le critère du chef de projet par le sien**, celui-là même
dont le premier refus venait de montrer qu'il était faux ; et avoir annoncé une citation de « cent cinquante
caractères » sans jamais la mesurer, quand la plus longue en fait **94**. Les trois refus portent tous sur le
même paragraphe, et aucun sur un livrable : c'est le signe que la porte a fait exactement son travail, et que
le rédacteur, lui, ne remesurait plus ce qu'il affirmait.

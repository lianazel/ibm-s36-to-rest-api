Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **31**, lue dans `.pipeline/STATUS.md` le 9 septembre 2026 à 22:52
(heure de Paris). C'est le SEUL compteur ; relis-la le jour même avant de la recopier. Cette session Cowork
est du **9 septembre 2026** : Cowork date ses sessions, il ne les numérote plus. Ce fichier est
`tasks/REPRISE.md`, écrasé à chaque fin de session et commité avec elle (`docs: reprise 2026-09-09`) ;
la pile, c'est `git log -- tasks/REPRISE.md`.

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
2. **Le travail en cours, et c'est la tranche qui compte le plus aujourd'hui** :
   `prompts/v0.1/DRAFT_EVOL_les-coulisses_v1.md` **en entier** (26 591 octets, écrit le 9 septembre au soir,
   non suivi par git, **non gelé**) · et hors dépôt `Etude_Technique/NOTES_CONTENU_les-coulisses_v1.md`, la
   matière qui l'a produit.
3. **Le projet, par tranches** : `CLAUDE.md` en entier (il épingle **v2.32**) · `.pipeline/STATUS.md` (une
   ligne) · `tasks/ROADMAP.md` : **la ligne `12 septies` du fil** et les dettes `[W62]` à `[W69]` au bas de
   « Dettes et reports » · `tasks/lessons.md` : la liste des titres (`grep '^## '`) et **les deux dernières
   entrées** (7 et 8 septembre) · `tasks/JOURNAL_v0.1.md` : l'entrée « Session 31 » seulement, dont son bloc
   « Dettes ouvertes à l'issue » · `.claude/settings.json` en entier · `.claude/agents/prompt-reviewer.md` en
   entier, parce que c'est la porte que ton prompt devra passer.
4. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les satellites que la table
   désigne. Pour la tâche du jour (une maquette hors dépôt, puis un dessin dans le dépôt) : `STYLE_METHOD` +
   profil, `UX_METHOD`, `AGENT_SCOPE_METHOD`, `VISION_METHOD`.
5. **Mesure** l'état du dépôt **par lecture de fichiers**, jamais par une commande git depuis la VM Cowork
   (chaque `git status` y laisse un `index.lock` insupprimable, et il rend la mesure des fichiers modifiés par
   leurs dates inutilisable pour la journée) : `.git/HEAD` · `.git/refs/heads/*` ·
   `.git/refs/remotes/origin/main` · `.git/logs/HEAD` (trois dernières lignes) · la date de `.git/index`, qui
   date le dernier commit · `grep '"version"' package.json` · `.pipeline/STATUS.md` ·
   `grep -c '^      "' .claude/settings.json` · `grep -o '\[W[0-9]*\]' tasks/ROADMAP.md | sort -t W -k2 -n | tail -1`
   · `grep -c '^## ' tasks/lessons.md`. Les fichiers modifiés ou non suivis se trouvent en comparant les dates
   de modification à celle de `.git/index`. `npm test` et les commandes git sont pour Claude Code ou pour moi.
6. **Piège d'outillage mesuré le 9 septembre, à connaître avant de mesurer quoi que ce soit.** Ton bac à sable
   n'est **pas** un miroir du dépôt : il ne contient que les fichiers que tu y as copiés. Une commande qui
   balaie un dossier (`ls tests/*.js | wc -l`, `grep -r`) y rend un chiffre **faux et crédible** : elle a rendu
   **5** fichiers de test là où le dépôt en porte **8**. Mesure fichier par fichier, ou par le listage du
   dossier sur ma machine. Ne balaie jamais un dossier depuis ton bac à sable.
7. **La machine** : Claude Code, Node, npm et git tournent **dans WSL**, pas dans PowerShell. Toute commande
   que tu me donnes dit de quel côté elle se tape, et en chemin WSL (`/mnt/c/…`). Le plancher machine est
   `/home/jcc_1a/.claude/settings.json`, posé par `TWAIM_Kit/poser-plancher.js`, lancé par moi, jamais par un
   agent.

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document
et le dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 9 septembre 2026 à 22:52 (heure de Paris), par lecture de fichiers.

- **`main` = `origin/main` = `dcf02b5`**, version **0.1.27**, `STATUS` = `CLOSED — session 31`. **Une seule
  branche.** Rien n'a bougé depuis le 8 septembre : `.git/index` date du **8 septembre à 13:16:46**.
- **Dérogation, et je la dis en toutes lettres.** La session du 9 septembre n'a produit **aucun atterrissage,
  aucun commit, aucun push**. C'était une session d'écriture. Trois fichiers en sortent, nommés un par un :
  - dans le dépôt, **non suivi** : `prompts/v0.1/DRAFT_EVOL_les-coulisses_v1.md`, 26 591 octets ;
  - dans le dépôt, **modifié** : `tasks/REPRISE.md`, ce fichier, que je commite ;
  - **hors dépôt** : `Etude_Technique/NOTES_CONTENU_les-coulisses_v1.md`.
- **Tests : 395/395**, chiffre lu dans `.pipeline/review.json` (commit `a598215`, 8 septembre), **non relancé
  depuis**. **8** fichiers de test. **41** leçons. Liste d'interdits inchangée : **39 `deny` + 1 `ask`** en
  objets, **40** lignes au motif `^      "`.
- **Le site** : https://lianazel.github.io/ibm-s36-to-rest-api/ — 0.1.27, inchangé. **Le dépôt est public :
  tout commit est une publication.** Anonymisation P1 inchangée. Règle de partage : des instances, jamais des
  invariants.
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v27.md`, à mettre à jour).
  **Il n'est pas la source de vérité : le dépôt l'est.**

**Écarts mesurés, à traiter ou à assumer :**

1. **`[W70]`, `[W71]` et `[W72]` sont nommées au journal (Session 31) et absentes du fil** : `tasks/ROADMAP.md`
   s'arrête à `[W69]`, mesuré. Une dette qui ne vit qu'au journal n'est pas portée par le fil, et le fil est ce
   qu'on relit. Geste manuel du chef de projet, famille `[W24]`.
2. **La dette de propagation de `land.md` est close, contrairement à ce que disait la reprise du 8.** Mesuré le
   9 septembre sur `TWAIM_Kit/_TEMPLATE_AGENTS/.claude/commands/land.md` (61 lignes, modifié le 9 septembre à
   18:24) : les **trois** occurrences de `git merge` sont désormais une précondition, une garde et une
   interdiction explicite (« Aucun `git merge` ici »). Le gabarit ne prescrit plus le merge. À ne pas
   reconduire comme dette ouverte.
3. **`.claude/commands/ship.md` épingle encore « Core §4.1 v2.29 »** (une ligne, mesurée). L'agent n'a pas le
   droit d'écrire dans `.claude/`, c'est mon geste, voie (a).
4. **Le skill Cowork `prompt-de-reprise` dit encore « hors dépôt, `PROMPT_REPRISE_session<N>.md »**, quand le
   gabarit du référentiel dit `tasks/REPRISE.md`, écrasé, commité. **Le référentiel gagne** ; le texte du skill
   est à mettre à jour par le chef de projet.

## Ce qu'on fait aujourd'hui

**Une seule tâche : la maquette hors dépôt du dessin des quatre temps du harnais**, pour l'incrément qui suit
celui des « Coulisses ».

**Avant tout, mesure où en est l'incrément précédent** : `grep '"version"' package.json` et la première ligne
de `.pipeline/STATUS.md`. Si la version est toujours **0.1.27** et le `STATUS` toujours `CLOSED — session 31`,
le prompt des « Coulisses » n'est **pas** parti : la tâche du jour change, et tu me demandes ce que j'en fais
avant de toucher à la maquette. Un prompt non gelé qui traîne pendant qu'on en prépare un autre est la
situation qui produit deux contrats concurrents.

**Ce que porte la maquette.** Le contenu est arbitré et il est de moi, le 9 septembre au soir. Quatre temps,
**avant la première ligne de code**, chacun avec ce qu'il voit et son angle mort :

1. **Une IA rédige la consigne.** Elle voit le dépôt, la méthode, la demande. Son angle mort : elle se relit
   avec la tête qui a écrit.
2. **Je la relis et je la transmets.** Je vois l'intention. Mon angle mort : la fatigue, le détail qui
   m'échappe.
3. **Un agent relit à tête reposée et rend son verdict.** Il voit ce que le dépôt dit vraiment, il remesure les
   chiffres. Son angle mort : il ne juge pas l'idée, et il ne mesure pas ce qui n'est pas dans le dépôt.
4. **L'agent d'exécution confronte, puis exécute.** Il voit ce que la consigne fait au contact des fichiers, et
   il peut encore s'arrêter, mode automatique compris, si un ordre foule aux pieds une règle stricte du
   harnais. Son angle mort : il obéit fidèlement, donc une consigne cohérente et fausse passe.

**Le dessin s'arrête là, et c'est un arbitrage, pas un oubli.** On ne noie pas le lecteur avec la revue du
travail, l'atterrissage et le push : la prose du chapitre les porte déjà. Ligne éditoriale du chapitre, dite le
9 septembre : **on ne cherche pas à convaincre, le lecteur se fera son idée ; on expose la réalité.**

**Pièges déjà connus, qui te concernent aujourd'hui :**

- **Une maquette avant le gel, c'est le précédent maison.** Les incréments 4, 9 et 10 ont tous eu la leur,
  validée par moi avant que le prompt soit gelé, et c'est ce qui a évité les allers-retours.
- **Le site a déjà sa famille de dessin.** `css/styles.css` porte `.dessin`, avec légende, liste ordonnée,
  boîtes `.case`, étapes `.etape` à titre et sous-titre, et les couleurs de registre. Deux dessins l'emploient,
  dans « La solution ». Le dessin du harnais **réemploie** cette famille, il n'en invente pas une autre.
- **HTML et CSS, pas SVG** (arbitrage du 19 août 2026), bilingue par le dictionnaire, empilable sur petit
  écran. Une maquette lit les polices du dépôt par un chemin relatif, comme
  `MAQUETTE_carte-open-graph_v1.html`.
- **Ne gèle pas un prompt tant qu'un arbitrage dont il dépend n'est pas rendu.** Règle du 8 septembre, tenue le
  9 : trois arbitrages rendus avant la première ligne du prompt.
- **Corriger le chiffre qu'on te montre ne corrige pas le défaut** (leçon du 8 septembre) : après toute
  correction d'un nombre, balaie **tous** ses porteurs, y compris les documents hors dépôt qui l'ont produit.
- **`grep -c` compte des lignes, `grep -o | wc -l` compte des occurrences**, et ni l'un ni l'autre ne compte
  des objets. Dis toujours laquelle des trois tu mesures.
- Le geste du chef de projet reste le merge et le push. Bump `patch` tant que la version est < 1.0.0.
- Voie (a) : Cowork écrit dans `.claude/` si besoin, le chef de projet commite ; l'agent ne peut pas y écrire.

## Ce qui n'est PAS au programme, et pourquoi

- **Nommer Cowork sur le site.** Mesuré : zéro occurrence de « Cowork » dans `js/i18n.js` et dans
  `index.html`. Le site ne dit pas qui rédige les prompts. Ma ligne éditoriale du 9 septembre fait pencher la
  question, elle ne la tranche pas. **Arbitrage propre, jamais une ligne glissée dans un incrément.**
- **Le champ « Mode d'exécution ».** Il existe désormais **en instance**, en tête de
  `DRAFT_EVOL_les-coulisses_v1.md`. Sa place au gabarit (`TEC_IA_TWAIM_CORE.md` §4.1 et
  `_TEMPLATE_AGENTS/.claude/agents/prompt-reviewer.md`) reste à faire, au référentiel. Un dépôt à la fois.
- **La coupure de C1 en deux** dans le contrat du `prompt-reviewer` : un fait faux du dépôt devrait rendre
  `NEEDS_WORK`, pas `BLOCK`. Analysé le 8 septembre, non écrit, même dépôt que le point précédent.
- **L'écart `CDEMST`**, troisième trou du fil et `[W71]` : ni tranché, ni harmonisé, et l'image de la carte
  n'est pas refaite. Il se tranche à la ligne 13 ou 14, jamais en passant.
- **`[W70]`** motif du scrub et **`[W72]`** les deux assertions trop larges de `tests/partage.test.js` : portées
  au fil d'abord, corrigées ensuite.
- **Ligne 13, « Mise en scène »** : attend ma réponse sur `[W29]`/`[W30]`, posée depuis le 3 septembre.
- **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
  `browser_network_requests`) : mon arbitrage et un CHORE dédié.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture humaine d'abord.
- **Les balises Open Graph du site TWAIM** : autre dépôt, chantier voisin.
- **Le site en cinq ou six langues** : curiosité du 9 septembre, notée comme R&D à creuser plus tard. **Pas un
  chantier ouvert**, rien au fil.
- **R&D nommées, non instruites** : le compteur des trois qui ne distingue pas trois révisions de trois
  relances du même fichier (`prompt_sha256`) ; `/fix` sans garde `prompt-reviewer` ; `RD-061`, `RD-062`,
  `RD-063` (hook compteur) ; les vingt-huit `deny` non éprouvées une à une ; GMFCC.

## Trous et questions ouvertes à me rappeler

1. `node` et `python3` sont permis à l'agent et savent tout faire, réseau compris : c'est le prompt qui le
   tient. Le périmètre d'un incrément est tenu par du texte, pas par une serrure. Risque résiduel assumé,
   improbable, visible, survivable.
2. `browser_navigate` atteint n'importe quelle adresse **réseau** (pas le local, Playwright refuse `file:`) ;
   `browser_network_request` est un chemin plus direct ; tous deux sous le seul `ask`. Le bornage par URL
   demande le hook `RD-063` / `[W69]`.
3. La carence de 72 h d'un paquet **n'est pas vérifiable par le relecteur** (réseau fermé) : ce contrôle reste
   au chef de projet.
4. La mesure VoiceOver porte neuf objets et attend un humain depuis l'incrément 9.
5. Les deux rangées « S/36 · IBM i » du menu (`[W65]`) se règlent avec le texte des chapeaux.
6. `[W66]` : toute base se remesure le jour même.
7. Le fichier machine `settings.json` a perdu `effortLevel` et `tui` entre le 2 et le 7 septembre : à remettre
   par le chef de projet s'il y tient, le script ne les recrée pas.
8. Les vignettes de médias déjà épinglées sur LinkedIn gardent parfois l'ancienne image même après relecture :
   il faut retirer le média et le remettre.
9. **Ton bac à sable n'est pas le dépôt.** Voir le point 6 de la porte : c'est le piège neuf du 9 septembre, et
   il rend des chiffres faux sans rien signaler.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui
s'est trompé **cinq fois** dans la journée qu'il vient de terminer — dont : avoir écrit « douze clés par
langue, vingt-quatre en tout » là où trois titres, neuf paragraphes et trois citations en font **quinze et
trente** ; avoir mis un point final à une citation dont la source n'en porte pas, ce qui aurait fait rougir à
sa naissance la porte écrite dans le même prompt ; avoir publié une phrase qui attribuait au chef de projet une
erreur que le dépôt attribue à Cowork, et qui niait en même temps que c'était une erreur d'IA, fausse donc dans
les deux sens ; et avoir mesuré un dossier depuis son bac à sable incomplet, ce qui a rendu **5** fichiers de
test au lieu de **8**. Ces quatre-là ont été rattrapées avant le gel, dont une par le chef de projet en cinq
mots. La cinquième n'est pas un chiffre : un message annonçait « il reste un arbitrage » et ne posait pas la
question, ce qui a coûté un aller-retour au chef de projet.

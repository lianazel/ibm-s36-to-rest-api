```markdown
Tiens Man, tu te rappelles comment on fonctionne ?

Référentiel central : C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique
Projet du jour      : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api
Notes et prompts    : C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique

Dernière session Claude Code close : **33**, lue dans `.pipeline/STATUS.md`. C'est le SEUL compteur ; relis-la le
jour même avant de la recopier. Cette session Cowork est du **10 septembre 2026 au soir** : Cowork date ses
sessions, il ne les numérote plus. Ce fichier est `tasks/REPRISE.md`, écrasé à chaque fin de session et commité
avec elle (`docs: reprise 2026-09-10`) ; la pile, c'est `git log -- tasks/REPRISE.md`.

**Deux incréments ont atterri dans la journée, tous deux relus `SHIP` du premier coup.** Le sujet « Les coulisses »
est clos. Ce qui reste n'est pas du code : c'est un fil qui a douze dettes de retard. Lis le bloc « Où en est le
travail » avant de faire quoi que ce soit.

---

## AVANT DE M'ÉCRIRE QUOI QUE CE SOIT

Ce message est la porte manuelle de l'ouverture (`RD-057`). Méthode **v2.33** : on lit **par tranches, jamais en
entier, la personne d'abord, la méthode au moment d'agir** (Core §5.1). Ton rapport d'ouverture nomme les
**tranches** lues (fichier + section), jamais les fichiers seuls.

Dans cet ordre, et sans rien me dire entre-temps :

1. **La personne** : au référentiel, `PEDAGOGY_PROFILE.local.md` et `STYLE_PROFILE.local.md`, en entier. Je ne suis
   pas de ton monde, je suis du monde IBM i : mots simples, une idée par phrase, analogie IBM i quand ça aide. Ton
   prédécesseur s'est fait reprendre **deux fois** hier soir sur ce point, et la seconde fois j'ai abandonné un
   arbitrage que je venais de rendre parce que son explication ne me parlait pas. Une consigne que je ne comprends
   pas est une consigne fautive, pas une question idiote.
2. **La leçon qui compte pour aujourd'hui** : `tasks/lessons.md`, **les deux dernières entrées** (10 septembre 2026).
   La première dit qu'un contre-essai qui dégrade un fichier du dépôt laisse un demi-état si la main est reprise
   entre la dégradation et le rétablissement. La seconde dit qu'une preuve énoncée en caractères se satisfait à la
   lettre. Lis aussi l'avant-dernière du 10 septembre, « une réserve qui affirme une **absence** se prouve par un
   balayage » : elle a coûté trois heures avant-hier et elle vaut pour tout ce que tu écriras.
3. **Le projet, par tranches** : `CLAUDE.md` en entier (il épingle **v2.32**, voir l'écart 2) · `.pipeline/STATUS.md`
   (une ligne) · `tasks/ROADMAP.md` : **la ligne `12 septies` du fil** (l. 27), et les dettes au bas de « Dettes et
   reports » · `tasks/lessons.md` : la liste des titres (`grep '^## '`) · `tasks/JOURNAL_v0.1.md` : les entrées
   « Session 32 » et « Session 33 » seulement, dont leurs blocs de dettes — **les deux, parce que les douze dettes du
   jour se répartissent entre elles** · `.claude/settings.json` en entier · `.claude/agents/prompt-reviewer.md` en
   entier.
4. **La méthode, au moment d'écrire seulement** : Core §4.1 et table §8.1 ; puis les satellites que la table désigne.
   La tâche du jour n'écrit **pas de code** : elle ne déclenche ni `ASSURANCE`, ni `UX`, ni `VISION`. Elle déclenche
   `STYLE_METHOD` + profil, parce qu'elle produit un texte destiné à être lu. `AGENT_SCOPE_METHOD` ne se charge que
   si un geste sort du dépôt.
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
   Mesure fichier par fichier, ou par le **listage du dossier sur ma machine**. Hier soir le shell distant n'a pas pu
   monter mes dossiers du tout (`no Plan9 drive shares mounted`) : tout s'est lu par copie de fichiers, un par un, et
   les comptes d'objets sont venus du listage. Si ça t'arrive, c'est la bonne conduite, pas une panne.
8. **La machine** : Claude Code, Node, npm et git tournent **dans WSL**, pas dans PowerShell. Toute commande que tu me
   donnes dit de quel côté elle se tape, et en chemin WSL (`/mnt/c/…`). Le plancher machine est
   `/home/jcc_1a/.claude/settings.json`, posé par `TWAIM_Kit/poser-plancher.js`, lancé par moi, jamais par un agent.
9. **Le pont ne sait pas écrire dans `.claude/`.** Toute écriture par les outils distants y est refusée
   (`Writing to .claude is not permitted via remote tools`). La voie (a) passe donc par un fichier déposé **à côté**
   et une commande de copie que je tape. Le reste du dépôt, lui, s'écrit sans problème : `prompts/v0.1/` et `tasks/`
   ont été écrits par le pont hier soir.

Ne déclare aucune lecture que tu n'as pas faite. Ne cite aucun chiffre que tu n'as pas mesuré. Si un document et le
dépôt se contredisent, le dépôt gagne et tu me le signales.

---

## Où en est le travail

Mesuré le 10 septembre 2026 à 22:40, **après le push**, par lecture de fichiers.

- **`main` = `origin/main` = `c89bb85`**, version **0.1.29**, `STATUS` = `CLOSED — session 33`. **Une seule
  branche** : `refs/heads/` ne porte que `main`.
- Les trois dernières lignes de `.git/logs/HEAD` : `checkout` vers `main`, `merge feat/coulisses-machine-humain`
  (`bf6f0f2`), puis `docs: journal session 33 + bump 0.1.28 -> 0.1.29 — clôture (merge bf6f0f2)` (`c89bb85`).
- **Le chapitre « La méthode » a ses trois sous-titres.** Le second incrément a touché quatre fichiers, 131
  insertions, 44 suppressions : vingt valeurs dans `js/i18n.js`, dix éléments dans `index.html`, **un commentaire
  réécrit** dans `css/styles.css` (aucune règle changée), et la porte `tests/coulisses.test.js` passée d'une clé à
  trois. Quatre rouges provoqués et rétablis : deux morsures, deux miroirs de vivacité.
- **Tests : 405/405**, chiffre lu dans `.pipeline/STATUS.md` et dans l'entrée de journal, **non relancé par moi**.
  **9** fichiers de test (objets, listage du dossier). **44** leçons (lignes `^## `), deux écrites hier.
- **Le site** : https://lianazel.github.io/ibm-s36-to-rest-api/, en 0.1.29. **Le dépôt est public : tout commit est
  une publication.** Anonymisation P1 inchangée. Règle de partage : des instances, jamais des invariants.
- **Deux règles d'interdit se sont éprouvées seules**, sur un incrément qui ne les visait pas : `Edit(~/.claude/**)`
  a refusé l'écriture du fichier de plan, et le `reviewer` a buté sur l'interdit `npm` et a lancé Vitest
  directement. **Treize règles éprouvées** sur trente-neuf, contre onze la veille.
- Le doc d'état complet est dans le projet Claude (`claude/ETAT_SESSION_IBMiAPI_v27.md`, **à mettre à jour**).
  **Il n'est pas la source de vérité : le dépôt l'est.**
- Hors dépôt : `Etude_Technique/RAPPORT_OUVERTURE_2026-09-10_v2.md` (rapport d'ouverture d'hier soir) et
  `Etude_Technique/PREP_fil-decoupage-et-dettes_v1.md`, **périmé, voir la tâche du jour**.

**Écarts mesurés, à traiter ou à assumer :**

1. **Le fil s'arrête à `[W69]`, et douze dettes vivent au journal seul** : `[W70]` à `[W81]` sont nommées aux
   entrées des sessions 31, 32 et 33 de `tasks/JOURNAL_v0.1.md`, et **absentes** de `tasks/ROADMAP.md` — mesuré
   après le push, `grep -o '\[W7[0-9]\]\|\[W8[01]\]' tasks/ROADMAP.md | wc -l` rend **0** (occurrences). C'était
   trois avant-hier matin, neuf hier soir, douze ce soir. Une dette qui ne vit qu'au journal n'est pas portée par le
   fil, et le fil est ce qu'on relit.
2. **`CLAUDE.md` épingle « v2.32 », et le Core est en v2.33** depuis le 10 septembre (règle du mode d'exécution).
   Deux endroits à reprendre : l. 13 et la ligne de pied l. 182. Geste du chef de projet. À noter : `/land` a bien
   mis à jour « Version produit : 0.1.29 » dans cette même ligne de pied, sans toucher au numéro de méthode.
3. **La ligne `12 septies` est fausse sur les trois points qui comptent.** Elle décrit trois sous-titres en un
   incrément, nomme `EVOL_les-coulisses_v2` comme prompt, et se donne pour « à rédiger ». Le sujet est **clos**, en
   deux incréments (`EVOL_coulisses-arret_v1`, `EVOL_coulisses-machine-humain_v1`). `tasks/ROADMAP.md` n'a pas été
   touché depuis le 10 septembre à 11:50.
4. **`.claude/` d'IBMiAPI est en retard sur son propre gabarit.** Le contrat du `prompt-reviewer` du projet porte
   **quatre** contrôles (6 714 octets) quand le gabarit `_TEMPLATE_AGENTS` en porte **cinq** (10 088 octets) : **C5,
   « Le document ne se dément pas lui-même »**, n'est jamais descendu. Le texte à poser, C5 et le champ « Mode
   d'exécution », est prêt dans `Etude_Technique/PREP_mode-execution-au-gabarit_v1.md`. **Le moment est venu** : la
   consigne était « après l'atterrissage du prochain incrément », et il a atterri.
5. **Une réserve non tranchée sur `.claude/commands/ship.md`** : sa ligne 56 cite « Core §4.1 v2.29 ». Ce n'est
   peut-être pas un épinglage périmé, mais la référence à la révision qui a **créé** la règle du premier
   enregistrement. Détail au §5 du `PREP` ci-dessus. Non mesuré hier soir, personne n'a ouvert le fichier.
6. **Deux fichiers de travail traînent hors dépôt** : `Etude_Technique/DRAFT_EVOL_coulisses-arret_v1.md` et
   `Etude_Technique/EVOL_les-coulisses_v3_REFUSE.md`. Ni l'un ni l'autre n'est lançable. À supprimer quand tu veux.

## Ce qu'on fait aujourd'hui

**Une seule tâche : remettre le fil à jour.** Deux gestes dans le même commit, et rien d'autre.

**Geste 1 — fermer la ligne `12 septies`.** Elle doit dire que le sujet est **clos**, par quels deux prompts, et à
quelle version chacun est atterri. Elle ne retire aucun des arbitrages que j'y ai écrits les 3, 9 et 10 septembre :
la règle de partage, le cadre sombre unique, les trois artefacts, le refus du contrat du `reviewer`, la phrase
« deux annoncées, quatre réelles » qui doit rester. **On ajoute, on ne réécrit pas.** C'est la faute exacte que j'ai
failli commettre avant-hier, et que le journal de la session 32 cite comme précédent.

**Geste 2 — porter les douze dettes au fil**, `[W70]` à `[W81]`, au bas du chapitre « Dettes et reports », après le
bloc `[W69]`. Leur texte se prend aux entrées des sessions 31, 32 et 33 du journal, **condensé, jamais inventé**.
Trois d'entre elles ont bougé et il faut le dire : `[W73]` et `[W74]` sont **tombées par construction** hier soir,
elles descendent au fil déjà marquées comme telles ; `[W76]` est **remboursée à moitié**, le « 7,02:1 » ayant
disparu du seul endroit où il mesurait le mauvais texte.

**Ce qui manque à cette tâche, et c'est le piège du jour.** Le fichier `Etude_Technique/PREP_fil-decoupage-et-dettes_v1.md`
a été écrit hier soir pour ce geste, **et il est périmé sur les deux moitiés** : il ne porte que neuf dettes sur
douze, et son texte pour la ligne `12 septies` annonce « un incrément atterri, un à rédiger » alors que les deux ont
atterri. **Ne le recopie pas. Refais-le, ou vérifie-le ligne à ligne contre le journal.** Un texte préparé la veille
est exactement le genre de porteur qu'on croit juste parce qu'il a l'air fini.

**Le premier arbitrage à me demander, avant d'écrire une ligne :**

> La ligne `12 septies` est-elle **fermée** (« fait, clos »), ou **remplacée** par une ligne neuve qui ouvre
> l'incrément suivant ?

Recommandation : **fermée**. Le fil est un journal de décisions, pas un tableau de bord ; une ligne close se relit
et se recoupe, une ligne réécrite perd son histoire. L'incrément suivant prendra son propre numéro.

**Pièges déjà connus, qui te concernent aujourd'hui :**

- **Tout texte que Cowork écrit dans le dépôt franchit une porte.** Celui-ci n'en a pas : `tasks/ROADMAP.md` n'est
  gardé par aucun test. Donc le geste est le mien, pas le tien : tu prépares le texte **à côté**, dans
  `Etude_Technique`, et je colle. C'est la voie qu'on a prise hier soir.
- **`grep -c` compte des lignes, `grep -o | wc -l` compte des occurrences**, un listage compte des objets. Dis
  toujours laquelle des trois tu mesures.
- **Une phrase qui affirme une absence porte son balayage, ou elle ne s'écrit pas.**
- **Corriger le défaut qu'on te montre ne corrige pas le défaut** : après toute correction, balaie **tous** ses
  porteurs, y compris les documents hors dépôt qui l'ont produit.
- Le geste du chef de projet reste le merge et le push. Bump `patch` tant que la version est < 1.0.0.
- Une bonne mesure de contrôle après mon commit : `grep -o '\[W7[0-9]\]\|\[W8[01]\]' tasks/ROADMAP.md | wc -l` doit
  rendre **12** (occurrences), contre **0** ce soir.

## Ce qui n'est PAS au programme, et pourquoi

- **La maquette du dessin des quatre temps du harnais.** C'est bien le prochain incrément, et elle attend depuis
  trois jours. Mais un prompt qui s'appuie sur une ligne de fil fausse est ce qui a produit la réserve `C3/C2`
  d'avant-hier. Le fil d'abord, la maquette ensuite, dans une session où elle sera la seule tâche.
- **La pose de C5 et du champ « Mode d'exécution » dans `.claude/` d'IBMiAPI** (écart 4). Le texte est prêt et le
  moment est venu, mais ça touche `.claude/` et ça n'entre en vigueur qu'au **prochain lancement** de Claude Code.
  Geste court, à faire seul, jamais pendant qu'un prompt est soumis.
- **`[W75]`, `lang="fr"` absent sur les citations françaises.** Elle est passée de **3 à 5** occurrences hier soir,
  WCAG 3.1.2 niveau AA. Les cinq se traitent d'un coup, dans un prompt qui leur est propre. Portée au fil d'abord.
- **`[W79]`, la porte d'unicité des citations.** Le remède est nommé au journal, non exécuté. C'est du code, donc un
  incrément à part.
- **Nommer Cowork sur le site.** Mesuré le 9 septembre : zéro occurrence. **Arbitrage propre, jamais une ligne
  glissée dans un incrément.**
- **La coupure de `C1` en deux** dans le contrat du `prompt-reviewer` : un fait faux du dépôt devrait rendre
  `NEEDS_WORK`, pas `BLOCK`. Analysé le 8 septembre, non écrit.
- **L'écart `CDEMST`**, troisième trou du fil et `[W71]`. Il se tranche à la ligne 13 ou 14, jamais en passant.
- **Ligne 13, « Mise en scène »** : attend ma réponse sur `[W29]`/`[W30]`, posée depuis le 3 septembre.
- **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
  `browser_network_requests`) : mon arbitrage et un CHORE dédié.
- **La feuille pour DSI IBM i** (`Etude_Technique/DSI_une-feuille_v1.md`) : relecture humaine d'abord.
- **Les balises Open Graph du site TWAIM** : autre dépôt, chantier voisin.
- **Le site en cinq ou six langues** : curiosité du 9 septembre, notée comme R&D à creuser plus tard.
- **R&D nommées, non instruites** : le compteur des trois qui ne distingue pas trois révisions de trois relances du
  même fichier (`prompt_sha256`) ; `/fix` sans garde `prompt-reviewer` ; `RD-061`, `RD-062`, `RD-063` (hook
  compteur) ; les vingt-six `deny` non éprouvées une à une ; GMFCC.

## Trous et questions ouvertes à me rappeler

1. **Le Plex Mono de la classe `.citation`**, levé par les relecteurs et jamais tranché. Le contrat de design range
   la consigne du chef de projet en **Plex Sans**, et `.dialogue .consigne`, qui habille le même genre d'artefact,
   ne porte **aucun** `font-family`. Trois citations sont maintenant en ligne au lieu d'une : la question a triplé
   de portée sans avoir été posée. **Demande-le-moi** au prochain incrément qui rouvre `css/styles.css`.
2. **La passe d'appareil à 320 px** sur les trois citations publiées : `[W81]`, et troisième session consécutive où
   le constat est porté sans être levé. Aucune vérification au navigateur n'a été faite. La plus longue citation
   fait **94** caractères contre **77** pour celle du premier bloc. Reste à moi.
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
11. **Le mode plan peut s'activer au milieu d'un contre-essai.** C'est arrivé hier soir, entre une dégradation
    volontaire et son rétablissement : l'arbre a porté une porte neutralisée et une suite à 403/405 le temps que
    l'écriture redevienne possible. Rien n'a été commité dans cet état. Leçon écrite, remède non écrit.

---

Et si tu trouves que quelque chose dans ce message est faux, dis-le. Il a été écrit par ton prédécesseur, qui s'est
trompé **quatre** fois dans la soirée qu'il vient de terminer, dont : avoir écrit dans le prompt gelé qu'une citation
« dépasse d'un tiers » une autre, quand 94 contre 77 fait **+22 %** et non +33 % — erreur attrapée par le
`prompt-reviewer`, pas par lui, et impossible à corriger puisque le prompt était gelé ; avoir décrit faussement les
trois occurrences d'une clé dans un prérequis, en citant le motif d'un témoin là où c'était l'exemple d'un
commentaire, faute rattrapée de justesse avant le gel ; et surtout m'avoir répondu **deux fois de suite** dans un
français si dense que j'ai fini par abandonner un arbitrage que je venais de rendre, non parce qu'il était mauvais,
mais parce que je n'avais pas compris ce qu'il impliquait. Cette dernière n'est pas une erreur de mesure. C'est la
seule qui ait changé le cours de la soirée.
```

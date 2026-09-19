# Prompt de reprise — session Cowork suivante

> **Mode d'emploi.** Ce fichier n'est pas une note : c'est le **premier message** à coller tel quel au
> Cowork entrant. Écrit par le Cowork sortant, qui sait ; lu par le Cowork entrant, qui ne sait rien.
> Rédigé le **19 septembre 2026 à 10 h 41**, après le dernier push.
>
> **État de la séance close** : cinq commits sur `main` en deux jours, tout poussé, aucune branche
> ouverte, aucune dérogation. Le pilote AMO est posé et **éprouvé trois fois**.

---

## 1. La phrase de démarrage

Tiens Man, tu te rappelles comment on fonctionne ?

**Référentiel central** :
`C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique`

**Projet du jour** :
`C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\ibm-s36-to-rest-api`

**Notes et prompts** :
`C:\JobDirectory\CLAUDE_PROJECTS\_WEB\IBMiAPI\Etude_Technique`

**Deux compteurs de session coexistent, ne pas les confondre.**

- Côté **Claude Code** : la session **33** reste la dernière close (`.pipeline/STATUS.md` porte
  `CLOSED — session 33`). Le travail des 18 et 19 septembre n'était **pas un incrément** : cinq commits
  directs sur `main`, aucun `/ship`, aucun `/land`, aucun bump. La version n'a pas bougé.
- Côté **Cowork** : les séances sont **datées**, pas numérotées.

**Interdiction explicite** : ne recopier aucun de ces numéros dans un prérequis de prompt sans l'avoir
**lu le jour même** dans le fichier qui le porte.

---

## 2. La porte — ce qu'il faut lire, et dans quel ordre

Rien ne se dit au chef de projet entre la première et la dernière lecture. On lit tout, puis on rend un
rapport d'ouverture. Méthode **v2.33**, lecture **par tranches, jamais en entier, la personne d'abord**
(Core §5.1).

**Dans cet ordre :**

1. Au référentiel, `PEDAGOGY_PROFILE.local.md` — **en entier**
2. Au référentiel, `STYLE_PROFILE.local.md` — **en entier**
3. `CLAUDE.md` du projet — **en entier** (il épingle encore « v2.32 », voir É-1)
4. `.pipeline/STATUS.md` — une ligne
5. `tasks/ROADMAP.md` — la ligne **`12 septies`** (l. 27), et le bas du chapitre « Dettes et reports »,
   **bloc `[W69]`** (l. 590 à 597) et sa frontière avec « Points de vigilance » (l. 599)
6. `tasks/lessons.md` — la liste des titres (`grep '^## '`), et les trois dernières entrées
7. `tasks/JOURNAL_v0.1.md` — les blocs de dettes des entrées **sessions 31, 32 et 33** seulement
8. `.claude/agents/prompt-reviewer.md` — **en entier**. Il a changé le 18 septembre : six contrôles
   désormais, **CME** en tête
9. `.claude/settings.json` — **en entier**. Il porte un bloc `hooks` depuis le 18 septembre

**La méthode se lit au moment d'écrire**, pas à l'ouverture : Core §4.1 et table §8.1, puis les
satellites que la table désigne.

### Les interdits d'outillage — mesurés, pas supposés

- **Aucune commande git depuis la VM Cowork** sur le dépôt du chef de projet : chaque `git status` y
  laisse un `.git/index.lock` insupprimable. L'état git se mesure **par lecture de fichiers** :
  `.git/HEAD`, `.git/refs/heads/*`, `.git/refs/remotes/origin/main`, `.git/packed-refs`,
  `.git/logs/HEAD`. Les `git status` passent par Claude Code ou par le chef de projet.
- **Ne jamais balayer un dossier depuis la VM** (`ls dir/* | wc -l`, `grep -r`). Elle ne porte que des
  copies mises en scène. On mesure fichier par fichier, ou par le listage du dossier sur sa machine.
- **`device_bash` est mort sur cette machine.** Re-testé le 18 septembre : `no Plan9 drive shares
  mounted`. Une mise à jour Windows du 8 septembre empêche le montage. Il reste `device_list_dir`,
  `device_stage_files`, `device_commit_files`.
- **Le pont refuse d'écrire dans `.claude/`** : « Writing to .claude is not permitted via remote
  tools ». Toute modification y passe par le chef de projet, qui colle lui-même. C'est la **voie (a)** :
  Cowork écrit le fichier à côté, dans `Etude_Technique`, et il le copie.
- **Claude Code, Node, npm et git tournent dans WSL**, pas dans PowerShell. Toute commande donnée dit
  de quel côté elle se tape et emploie un chemin WSL (`/mnt/c/…`).

### Les trois règles qui décident de la qualité du rapport d'ouverture

1. **Ne déclarer aucune lecture qui n'a pas été faite.**
2. **Ne citer aucun chiffre qui n'a pas été mesuré**, y compris repris de ce message. Et toujours dire
   de quelle espèce il est : `grep -c` compte des **lignes**, `grep -o | wc -l` des **occurrences**,
   sans l'un ni l'autre ce sont des **objets**.
3. **Si un document et le dépôt se contredisent, le dépôt gagne, et on le signale.**

Le rapport d'ouverture nomme les **tranches** lues — fichier **et** section —, jamais des fichiers
seuls.

---

## 3. La situation exacte

Mesurée le 19 septembre 2026 à 10 h 41, par lecture de fichiers `.git`.

| Grandeur | Valeur mesurée | Où elle a été lue |
|---|---|---|
| `HEAD` | `ref: refs/heads/main` | `.git/HEAD` |
| `main` | **`f2ecec2`** | `.git/refs/heads/main` |
| `origin/main` | **`f2ecec2`** | `.git/refs/remotes/origin/main` |
| Branches | **1 objet** : `main` | listage de `.git/refs/heads/` |
| `packed-refs` | en-tête seul, **aucune référence** | `.git/packed-refs` |
| Version produit | **0.1.29**, inchangée | `grep '"version"' package.json` |
| État pipeline | `CLOSED — session 33` | `.pipeline/STATUS.md` |
| Tests | **405/405** | chiffre **lu** dans `STATUS.md`, **non relancé** |
| Leçons | **44 lignes** `^## ` | `tasks/lessons.md`, intact depuis le 10 sept. 22:31 |
| Dette la plus haute au fil | **[W69]** | `grep -o … \| sort \| tail -1` (occurrences) |
| `[W70]`…`[W81]` au fil | **0 occurrence** | `grep -o '\[W7[0-9]\]\|\[W8[01]\]' tasks/ROADMAP.md \| wc -l` |

**Les cinq commits des 18 et 19 septembre**, heures de Paris :

| Commit | Objet | Heure |
|---|---|---|
| `02c8f22` | `chore: poser le temoin de mode (AMO) dans tools/ et le brancher sur UserPromptSubmit` | 18/09 10:50:28 |
| `f77c269` | `chore: CME au contrat du relecteur de prompts, et C5 redescendu du gabarit` | 18/09 17:50:02 |
| `030b91d` | `chore: aligner le temoin sur la paire de reference et tracer l'essai de CME` | 18/09 20:47:07 |
| `74e232b` | le refus sur absence de déclaration, au contrat du relecteur | 19/09 10:26:30 |
| `f2ecec2` | la trace de la passe 3 | 19/09 10:39:48 |

Poussé à **10:40:41**. `main` et `origin/main` sont au même commit.

> **Limite de ma mesure, dite en clair.** Je ne peux pas lancer `git status` depuis la VM. La dernière
> vue réelle du tampon est la parole du chef de projet : « c poussé des deux côtés ». **À vérifier d'un
> `git status` à l'ouverture.**

### Ce qui est neuf sur ce dépôt depuis le 18 septembre

| Pièce | Mesure | Rôle |
|---|---|---|
| `tools/temoin-mode.mjs` | 16 266 octets | le témoin de mode, appelé à chaque phrase tapée |
| `tools/test-temoin-mode.sh` | 17 171 octets | sa preuve, 10 chemins, se lance à la main |
| `.claude/settings.json` | 1 364 octets | 39 `deny`, 1 `ask`, **1 bloc `hooks`** |
| `.claude/agents/prompt-reviewer.md` | **14 330** octets | **six** contrôles : CME, puis C1 à C5 |
| `prompts/v0.1/SPIKE_essai-CME_v1.md` | trace des passes 1 et 2 | jetable, **verrou à 2/3** (É-4) |
| `prompts/v0.1/SPIKE_essai-CME-champ-absent_v1.md` | trace de la passe 3 | jetable, **verrou à 1/3** |

La procédure de référence est le document Word
`Etude_technique/TWAIM_TECHNICAL_DOCUMENTATION/TEC_IA_CLAUDE_MEP_HOOK_MODE_AMO.DOCX`, **V1.0.8**, 22
pages. Son §15 porte CME, son §16 l'inventaire des pièces et de leur adresse. **Ce document est la
procédure ; le fichier `Etude_Technique/PILOTE_AMO_2026-09-17_v1.md` ne l'est pas** — c'est une feuille
de mesure, et il porte un avertissement en tête qui le dit.

### Ce qui fait foi, et ce qui n'en fait pas

`.pipeline/STATUS.md` et `tasks/JOURNAL_v0.1.md` **racontent**. Ils ne sont pas la source de vérité :
le dépôt l'est.

---

## 3 bis. Le pilote AMO, et où il en est

**Ce que c'est, en trois phrases.** Un *hook* `UserPromptSubmit` appelle `tools/temoin-mode.mjs` à
chaque phrase envoyée ; le témoin écrit dans `.pipeline/hook-mode-last.json` le mode de permission réel
de la session. Le relecteur de prompts lit ce fichier et le compare au mode que le prompt **déclare**.
S'ils ne s'accordent pas, il rend `BLOCK` et **n'examine rien d'autre** — c'est le court-circuit.

**Le témoin est une lampe torche, pas une porte** : il sort toujours en code 0, il ne bloque rien
jamais. La garde, c'est CME, au contrat du relecteur.

**Les trois passes, toutes jouées, toutes vérifiées dans `.pipeline/prompt-review.json` :**

| Passe | Ce qu'on éprouvait | Session | Verdict lu | Ce que ça prouve |
|---|---|---|---|---|
| 1 — 18/09 soir | prompt `refusé`, session en mode automatique | `auto` | **`BLOCK`**, `CME` en `FAIL`, C1–C5 non joués | la garde mord, et elle court-circuite |
| 2 — 18/09 soir | le même prompt, session rendue à la main | `default` | `CME` en **`PASS`**, relecture continuée, `NEEDS_WORK` sur **C5** | une garde qui refuse toujours ne prouve rien |
| 3 — 19/09 10:34 | prompt **sans** champ « Mode d'exécution » | sans objet | **`BLOCK`**, une seule entrée dans `checks`, **zéro WARN** | l'oubli du champ ne passe plus |

Le `NEEDS_WORK` de la passe 2 n'était pas un raté de l'essai : **C5 a attrapé une contradiction dans mon
propre prompt** — il promettait « aucun travail, ne touche pas à `.pipeline/` » tout en gardant la
phrase « l'arrêt reste à `READY` ». Une heure après que j'aie installé C5. C'est au §15.6 du document.

**La table de décision de CME se lit en liste blanche : ce qui n'est pas nommé est refusé.**

| Le prompt déclare | `permission_mode` lu | Verdict |
|---|---|---|
| `refusé` | `default`, `plan`, `acceptEdits` | PASS |
| `refusé` | **tout le reste**, connu ou inconnu | **BLOCK** |
| `autorisé` | `default`, `plan`, `acceptEdits`, `auto` | PASS |
| `autorisé` | **tout le reste**, connu ou inconnu | **BLOCK** |
| **champ absent** | quelle qu'elle soit | **BLOCK** — « le prompt ne déclare pas son mode d'exécution ; la comparaison est impossible » |

Avant toute comparaison, trois vérifications de validité : le `cwd` de la capture est la racine du
dépôt, la capture a moins de quinze minutes, et la valeur n'est pas l'un des cinq mots d'échec du
témoin. Un échec de validité vaut `BLOCK`, pas WARN : « rien trouvé » et « je n'ai pas pu vérifier »
sont deux conclusions différentes.

---

## 4. Les écarts mesurés, à traiter ou à assumer

**É-1 — Le fil est en retard de douze dettes, et `CLAUDE.md` de deux choses.** C'est la tâche du jour,
détaillée au §5.

**É-2 — SOLDÉ le 18 septembre au soir.** La fiche de pose du document (§11) ne mentionnait pas CME :
neuf lignes à cocher, toutes sur le témoin. Quelqu'un qui posait le système sur un dépôt neuf obtenait
la lampe torche sans la porte. La V1.0.7 ajoute le **geste 6, copier le contrat du relecteur**, et la
fiche compte désormais **dix** lignes.

**É-3 — SOLDÉ et ÉPROUVÉ le 19 septembre à 10:34.** Un prompt qui ne porte pas le champ « Mode
d'exécution » rendait deux WARN, donc un `SHIP` possible : **son mode n'était jamais contrôlé**. La
porte la plus importante était la seule qui ne mordait pas quand on l'oubliait. Décision du chef de
projet : **l'absence du champ vaut maintenant `BLOCK`**. La passe 3 l'a prouvé : une seule entrée dans
`checks`, zéro WARN, aucun fichier touché.

*Reste, et ce n'est plus une garde mais un confort* : aucun gabarit ne porte le champ tout fait
(`TWAIM_Kit/PROMPT_CHANNEL.md`, 0 occurrence). Le texte à recopier est au §15.4 du document.

**É-4 — Le verrou des trois est à 2 sur le sujet `SPIKE_essai-CME`**, et à 1 sur
`SPIKE_essai-CME-champ-absent`. Une troisième relecture du premier déclencherait le refus spécial. Les
deux essais sont acquis, **ne pas les rejouer**.

**É-5 — `dontAsk` et `bypassPermissions` ne sont mesurés par personne.** CME les refuse par liste
blanche, donc le risque est couvert. Mais on ne sait toujours pas s'ils laissent tenir les 39 `deny`.
L'essai 0 proposé et non joué : ouvrir une session en `bypassPermissions` sur un dépôt bidon et lancer
`npm install --dry-run`, qui est dans la liste d'interdits et n'écrit rien. Sans risque quel que soit
le résultat.

**É-6 — Le portfolio est en retard de CME.** Son contrat de relecteur porte encore quatre contrôles.
Son développement est arrêté jusqu'à nouvel ordre ; c'est noté, ce n'est pas une urgence.

---

## 4 bis. La règle qui te concerne dès ton premier prompt

**Tout prompt que tu déposes porte le champ « Mode d'exécution ».** Son texte exact est au §15.4 du
document AMO. Deux lignes à remplir — `AUTO MODE ON : autorisé` ou `refusé`, et le motif, qui se
constate — le reste se recopie tel quel.

**Un prompt sans ce champ est refusé** par CME, avant tout autre contrôle. Ce n'est pas un WARN : c'est
un `BLOCK`, et c'est mesuré, pas supposé. Tu ne peux pas l'oublier sans t'en apercevoir, et c'est voulu.

Et la conduite d'exécution qui va avec : l'agent lit `.pipeline/hook-mode-last.json` et **écrit la
comparaison en première ligne de sa réponse**, avant toute action. Une ligne absente est un signal.

---

## 5. La tâche du jour

**Une seule : remettre le fil à jour.** C'était déjà la tâche du 18 septembre au matin, mise de côté
pour l'AMO. Elle attend depuis le 10 septembre.

**Geste 1 — fermer la ligne `12 septies`** (l. 27 de `tasks/ROADMAP.md`, 2 166 caractères). Elle est
fausse sur trois points, mesurés : sa colonne d'état dit « à rédiger », sa colonne de jalon dit « à
venir », et sa dernière colonne nomme `EVOL_les-coulisses_v2` comme prompt. Le sujet est **clos**, en
deux incréments, `EVOL_coulisses-arret_v1` (0.1.28) puis `EVOL_coulisses-machine-humain_v1` (0.1.29).

**Arbitrage déjà rendu par le chef de projet le 18 septembre : la ligne est FERMÉE, pas remplacée.** On
**ajoute**, on ne réécrit pas. Aucun des arbitrages qu'il y a écrits les 3, 9 et 10 septembre ne se
retire — la règle de partage, le cadre sombre unique, les trois artefacts, le refus du contrat du
`reviewer`, et la phrase « deux annoncées, quatre réelles ». Le fil est un journal de décisions.

**Geste 2 — porter les douze dettes au fil**, `[W70]` à `[W81]`, au bas du chapitre « Dettes et
reports », **après le bloc `[W69]` (l. 597) et avant « Points de vigilance » (l. 599)**. Leur texte se
prend aux entrées des sessions 31, 32 et 33 du journal, **condensé, jamais inventé**. Trois ont bougé
et il faut le dire : `[W73]` et `[W74]` sont **tombées par construction** le 10 septembre, `[W76]` est
**remboursée à moitié**.

**Le piège du jour.** Le fichier `Etude_Technique/PREP_fil-decoupage-et-dettes_v1.md` a été écrit pour
ce geste le 10 septembre, et il est **périmé sur les deux moitiés** : mesuré, il ne porte que **neuf**
dettes distinctes, `[W70]` à `[W78]`, et son texte pour la ligne `12 septies` annonce « un incrément
atterri, un à rédiger » alors que les deux ont atterri. **Ne pas le recopier.** Le refaire depuis le
journal.

**La voie.** `tasks/ROADMAP.md` n'est gardé par aucun test. Le geste est donc celui du chef de projet :
Cowork prépare le texte **à côté**, dans `Etude_Technique`, et il colle.

**La mesure de contrôle après son commit** :
`grep -o '\[W7[0-9]\]\|\[W8[01]\]' tasks/ROADMAP.md | wc -l` doit rendre **12** (occurrences), contre
**0** ce matin.

**Geste 3, au même commit ou à part — reprendre `CLAUDE.md`.** Quatre endroits mesurés :

| Ligne | Ce qui est écrit | Ce qui est juste |
|---|---|---|
| 13 | « Méthode de travail IA **v2.32** » | v2.33 (Core daté du 10 septembre) |
| 97 | « **Onze** éprouvées à ce jour » | **treize** (les 12ᵉ et 13ᵉ au journal de la session 33) |
| 101 | « les **vingt-huit** autres » | **vingt-six** |
| 182 | « Méthode : **v2.32** » | v2.33 |

---

## 6. Ce qui n'est PAS au programme

- **Toute pose du témoin sur un troisième dépôt.** *Motif* : la procédure est complète depuis la
  V1.0.8, mais elle n'a été **pilotée qu'une fois**, sur un dépôt qui avait déjà son `.pipeline/`.
  Deux choses n'ont donc jamais été jouées par personne : le **§3.1**, qui dit comment créer ce
  dossier, et le **geste 6** de la fiche de pose, qui copie le contrat du relecteur. À faire dans une
  séance où c'est la seule tâche.
- **Porter le champ « Mode d'exécution » à un gabarit de prompt.** *Motif* : ce n'est plus une garde,
  CME refuse déjà l'absence. C'est du confort de rédaction, et ça attendra.
- **Le hook `PreToolUse`** qui ferait de CME une vraie porte (`RD-063` au référentiel, `[W69]` au fil).
  *Motif* : c'est du code, donc un incrément à part, avec sa preuve à la naissance. Et le jour où il
  existe, **CME n'est pas doublé, il est remplacé** — sinon deux textes portent la même règle et
  divergent en silence.
- **La maquette du dessin des quatre temps du harnais.** C'est le prochain incrément de contenu, et
  elle attend depuis le 12 septembre. *Motif* : un prompt qui s'appuie sur une ligne de fil fausse est
  ce qui a produit la réserve `C3/C2` du 8 septembre. Le fil d'abord.
- **`[W75]`, `lang="fr"` absent sur les citations françaises**, passé de 3 à 5 occurrences, WCAG 3.1.2
  niveau AA. *Motif* : les cinq se traitent d'un coup, dans un prompt qui leur est propre. Portée au
  fil d'abord.
- **`[W79]`, la porte d'unicité des citations.** *Motif* : du code, incrément à part.
- **L'écart `CDEMST`** (`[W71]`), troisième trou du fil. *Motif* : il se tranche à la ligne 13 ou 14,
  jamais en passant.
- **Ligne 13, « Mise en scène »** : attend la réponse du chef de projet sur `[W29]`/`[W30]`, posée
  depuis le 3 septembre.
- **Nommer Cowork sur le site.** *Motif* : arbitrage propre, jamais une ligne glissée dans un
  incrément.
- **La passe d'appareil à 320 px** sur les trois citations publiées (`[W81]`). *Motif* : reste au chef
  de projet, aucune vérification au navigateur n'est possible depuis la VM.
- **L'arbitrage du Plex Mono de `.citation`**, ouvert depuis le 10 septembre. *Motif* : à demander au
  prochain incrément qui rouvre `css/styles.css`.

---

## 7. Trous et questions ouvertes

1. **Le témoin ne commande rien.** Il informe, CME refuse. Mais CME est une consigne lue par un agent,
   pas une garde mécanique. Sa tenue vient de ce que `/ship` refuse tout verdict autre que `SHIP`.
2. **Le journal du témoin n'est pas infalsifiable.** N'importe quel essai lancé à la main y écrit une
   ligne indistinguable d'une vraie — c'est arrivé trois fois le 17 septembre sur le portfolio, dont
   une qui a laissé `bypassPermissions` comme dernière valeur. CME valide la capture avant de la lire
   (cwd, fraîcheur, valeur), mais la falsification reste possible.
3. **La charge utile du témoin contient le texte tapé, en clair**, dans `.pipeline/`. Ce dossier est
   ignoré par git — vérifié — donc rien ne part au dépôt public. Le fichier reste sur le disque.
4. **Le journal du témoin s'accumule, sans rotation.**
5. **Les quinze minutes de fraîcheur de CME sont une convention**, pas une mesure. À revoir si elles
   mordent à tort.
6. **`node` et `python3` sont permis à l'agent** et savent tout faire, réseau compris : c'est le prompt
   qui le tient. Risque résiduel assumé.
7. **La mesure VoiceOver** porte neuf objets et attend un humain depuis l'incrément 9.
8. **Trois outils MCP à examiner pour un `deny`** (`browser_network_request`, `browser_file_upload`,
   `browser_network_requests`) : arbitrage du chef de projet et CHORE dédié.
9. **Le mode plan peut s'activer au milieu d'un contre-essai** (leçon du 10 septembre). Remède non
   écrit.
10. **`[W66]` : toute base se remesure le jour même.**

---

## 8. Et si quelque chose ici est faux

Si tu trouves que quelque chose dans ce message est faux, **dis-le**.

Il a été écrit par ton prédécesseur, qui s'est trompé **dix** fois dans la journée et demie qu'il vient
de terminer. Trois d'entre elles, pour te donner le ton :

- Il a livré une porte **dont le premier contrôle ne mordait pas quand on l'oubliait** : un prompt sans
  champ « Mode d'exécution » rendait deux WARN, donc un `SHIP` possible, donc aucun contrôle du mode.
  Il avait un bon motif écrit huit jours plus tôt, et il ne l'a pas réexaminé quand la situation a
  changé. C'est le chef de projet qui a posé la question : « et si tu l'oublies, comment réagit le
  relecteur ? »
- Il a employé le sigle « C0 » pendant **une heure entière** sans jamais le définir, alors que le
  profil pédagogique du chef de projet interdit exactement ça. Le chef de projet a dû demander « c'est
  quoi C0 ? », et c'est lui qui a proposé le nom juste, **CME**.
- Il avait écrit la règle des modes en **liste noire** — « bloque `auto`, `dontAsk`,
  `bypassPermissions` » — qui laisse passer le premier mode inconnu. C'est le chef de projet qui a vu
  d'instinct qu'il fallait une **liste blanche**.

Et la dixième, qui est la plus bête : il a **rapiécé ce message trois fois** au lieu de le réécrire,
jusqu'à ce que son en-tête annonce une heure qui n'était plus vraie. C'est le chef de projet qui l'a
vu. La reprise s'écrit **en dernier**, après le push, d'un seul jet.

Le chef de projet ne relit pas ce message avant de te le coller. Tu es le seul contrôle.

---

*Écrit le 19 septembre 2026 à 10 h 41 par le Cowork sortant · tous les chiffres mesurés à cette
heure-là, par lecture de fichiers · aucune commande git lancée depuis la VM.*

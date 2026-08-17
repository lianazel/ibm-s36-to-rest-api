# CHORE — Revue structurée : le `reviewer` émet un contrat de données, la garde de `/land` le lit

**Fichier** : `prompts/v0.1/CHORE_revue-structuree_v2.md`
**Type** : CHORE (outillage du harnais) · **Branche** : `chore/revue-structuree` · **Révision** : v2 · **Date** : 17 août 2026
**Remplace** : `CHORE_revue-structuree_v1.md` (jamais committé), dont les prérequis décrivaient un état périmé : l'incrément `garde-revue-land` a atterri en session 8 (merge `bfacccb`, v0.1.6, poussé). Le contrat de données est inchangé ; ce qui change est le point de départ, le statut du code retiré, et le périmètre (`fix.md`). Si `prompts/v0.1/CHORE_revue-structuree_v1.md` existe encore dans l'arbre de travail (non suivi), supprime-le avant le premier commit : un prompt aux prémisses fausses ne doit pas rester à côté de celui qui le remplace.
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Couche A : ce CHORE **remplace une porte** (pré-garde de revue de `/land`). Elle prouve sa morsure sur la fonction, à blanc sur l'état réel du dépôt, et par témoins committés, un par chemin capable de refuser |
| `AGENT_SCOPE_METHOD` | 1.1 | Écarté | Le geste reste **dans le dépôt** (`.claude/`, `tools/`, `tests/`, committés). La propagation au gabarit central `_TEMPLATE_AGENTS` est un geste séparé du chef de projet, hors de ce prompt |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance ajoutée, aucun secret, rien de servi par le site. `JSON.parse` de Node sur un fichier local du dépôt, sans évaluation de code |
| `UX_METHOD` / `STYLE_METHOD` | — | Écartés | Aucun texte destiné au visiteur, aucune interface. Le seul texte humain de cet incrément est celui des commentaires de code, en français |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/CHORE_revue-structuree_v2.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.6** au manifeste (`package.json`).
2. `git rev-list --count origin/main..main` = 0.
3. `npm test` vert sur `main` : **113/113**. Consigne le nombre exact mesuré, c'est le point de départ du décompte de l'étape 3.
4. `tools/land-guard.js` existe sur `main` et exporte `incrementFromStatus` et `reviewIsFreshFor` ; `git branch --merged main` ne liste **plus** `chore/garde-revue-land` (supprimée après merge). Si la branche existe encore, ne la touche pas et signale-le.
5. `.pipeline/STATUS.md` commence par `CLOSED — session 8`. `.pipeline/review.md` (la 4ᵉ passe de revue de l'incrément précédent) est **peut-être** encore là : s'il y est, il sert de pièce à conviction à l'étape 3 ; s'il n'y est pas, l'étape 3 le dit.

## Contexte : pourquoi la porte livrée en session 8 est remplacée, pas corrigée

L'incrément `garde-revue-land` (merge `bfacccb`, v0.1.6) a livré une garde qui lit `review.md`, une **prose** écrite par le `reviewer` pour un lecteur humain. Il a fallu quatre passes de revue pour qu'elle morde, chacune fermant un coin et en ouvrant un autre (citation prise pour un verdict, puce invisible, blocs de code non appariés, étiquette d'incrément trop large). Les dettes **[W15]** (forme, pas provenance ni fraîcheur) et **[W16]** (contrat de l'agent et garde non alignés) l'écrivent noir sur blanc, et [W16] annonce déjà la piste que ce prompt exécute. La décision du chef de projet, qui est le contrat de ce prompt :

> Un artefact lu par une machine s'écrit pour la machine. Le `reviewer` émet un **document structuré** (`.pipeline/review.json`). La garde de `/land` en lit **trois champs**. Le compte rendu humain n'est plus le rôle du `reviewer` : c'est le Tech Lead (Cowork) qui le fait au chef de projet, après lecture du même document.

Conséquences, et leur statut : `review.md` n'est plus produit (deux porteurs pour une même décision, c'est la garantie qu'un des deux ment un jour) ; toute l'analyse de prose de `tools/land-guard.js` est **retirée**, et c'est un **retrait de code livré et poussé** (environ 200 lignes, 39 cas de test), pas l'abandon d'une branche : il se trace comme tel dans `changes.md` et il est cité au journal par `/land` ; `.claude/agents/reviewer.md`, `/land`, `/ship`, `/fix` et `CLAUDE.md` désignent le même contrat, écrit à un seul endroit.

Périmètre : `tools/land-guard.js` (réécrit), `tests/land-guard.test.js` (réécrit), `.claude/agents/reviewer.md`, `.claude/commands/land.md`, `.claude/commands/ship.md`, `.claude/commands/fix.md` (deux lignes), `CLAUDE.md`, `tasks/ROADMAP.md` (mise à jour de [W15] et [W16], voir 2.9). Rien d'autre. Le site (`index.html`, `css/`, `js/`) n'est pas touché.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b chore/revue-structuree` (depuis `main`) · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : CHORE revue-structuree` (c'est là que le `reviewer` lira le nom tant que `STATUS.md` n'est pas en READY) · commit du prompt (message exact ci-dessus).

## ÉTAPE 2 — Livrable

### 2.1 Ce qui est conservé de la garde actuelle, et ce qui est retiré

Conservé, **inchangé**, avec ses cas de test : `incrementFromStatus(statusText)` (rend `{ok, name, reason}` ; n'accepte qu'une ligne `READY`, refuse `CLOSED`, `LANDING`, vide, malformée). Conservé aussi : le principe du **test à blanc sur l'état réel** (étape 3, point 3).

Retiré : `stripDecoration`, `normalize`, `fenceMask`, `fencesBalanced`, `verdictLines`, `declaredIncrement`, `reviewIsFreshFor`, et leurs cas de test. Ce retrait est un geste sur du code livré : compte les lignes et les cas retirés (`git diff --stat main...HEAD` et différence du nombre de tests), écris les deux chiffres dans `changes.md` avec la phrase « retrait de code livré, décidé par le chef de projet le 17 août 2026, motif : une garde qui lit de la prose ne peut pas être finie ». Ce n'est pas une perte : c'est le coût de lire de la prose, et on cesse d'en lire.

### 2.2 Le contrat de données : `.pipeline/review.json`

Le contrat vit **à un seul endroit** : en tête de `tools/land-guard.js`, sous la forme d'un commentaire `CONTRAT` (lisible par l'agent) et d'une constante exportée `REVIEW_CONTRACT` (lue par le validateur). Les deux décrivent le même objet, à la virgule près :

```json
{
  "contract": "twaim.review/1",
  "increment": "CHORE revue-structuree",
  "commit": "0123456789abcdef0123456789abcdef01234567",
  "base": "1f741c7…(40 hex)",
  "reviewed_at": "2026-08-17T10:00:00Z",
  "tests": { "passed": 90, "total": 90 },
  "verdict": "SHIP",
  "reservations": [
    {
      "pillar": "P3",
      "severity": "WARN",
      "file": "tools/land-guard.js",
      "line": 42,
      "finding": "phrase courte : ce qui a été constaté",
      "expected": "phrase courte : la correction attendue"
    }
  ],
  "overrule": null,
  "rd": []
}
```

Règles du contrat, dans l'ordre où le validateur les applique :

1. Le fichier est du **JSON strict** (`JSON.parse` réussit) et la racine est un objet. Sinon : refus `review.json illisible : <message de l'analyseur, tronqué à 60 caractères>`.
2. `contract` vaut exactement `"twaim.review/1"`. Sinon : refus `contrat inconnu : <trouvé>`. C'est le champ qui permettra un jour un `twaim.review/2` sans casser la garde.
3. `increment` est une chaîne non vide, **égale caractère pour caractère** au nom d'incrément lu par `incrementFromStatus` dans `.pipeline/STATUS.md`. Pas de normalisation, pas de casse repliée, pas de décoration à retirer : le `reviewer` écrit le nom tel qu'il figure dans `STATUS.md`, et c'est tout l'objet du contrat. Sinon : refus `review.json ne porte pas l'incrément courant : <trouvé> vs <attendu>`.
4. `commit` est une chaîne de **40 caractères hexadécimaux minuscules**, égale au SHA complet de la pointe de la branche que `/land` atterrit (`git rev-parse <branche>`). Sinon : refus `review.json ne relit pas le commit à atterrir : <trouvé> vs <attendu>`. C'est ce champ qui donne la **fraîcheur** : une revue rendue sur un commit antérieur, puis un commit ajouté, et la garde refuse. Un commit ajouté après une revue SHIP oblige à relancer le `reviewer`, ce qui est exactement la règle « après un SHIP, tout commit supplémentaire repasse par une lecture ».
5. `verdict` vaut `"SHIP"`, `"NEEDS_WORK"` ou `"BLOCK"` (avec le souligné, majuscules, rien d'autre). Une autre valeur : refus `verdict hors contrat : <trouvé>`. Seul `"SHIP"` autorise l'atterrissage : refus `verdict du reviewer : <trouvé>` pour les deux autres.
6. `reservations` est un tableau (vide autorisé). Chaque élément porte **tous** les champs `pillar` (chaîne parmi `P1` à `P6`, `ARCHI`, `UX`), `severity` (`"FAIL"` ou `"WARN"`), `file` (chaîne, chemin relatif au dépôt), `line` (entier ≥ 1, ou `null` si la réserve ne pointe pas une ligne), `finding` (chaîne non vide), `expected` (chaîne non vide). Un élément incomplet ou mal typé : refus `réserve n°<i> hors contrat : <champ fautif>`.
7. **Cohérence** : `verdict` `"SHIP"` avec au moins une réserve `"FAIL"` est un refus `verdict SHIP incohérent avec <n> réserve(s) FAIL`. Une revue qui dit « bon » et « bloquant » en même temps ne décide rien. `NEEDS_WORK` ou `BLOCK` sans aucune réserve : refus `verdict <v> sans réserve : rien à corriger, donc rien à refuser`.
8. `base` (40 hex), `reviewed_at` (chaîne ISO 8601), `tests` (`{passed, total}` entiers, `passed ≤ total`) sont **obligatoires et vérifiés dans leur forme**, mais la garde ne les compare à rien : ils servent au compte rendu humain et au journal.
9. `overrule` vaut `null`, ou un objet `{ "by": "chef de projet", "reason": "<chaîne non vide>", "at": "<ISO>" }`. Un `BLOCK` overrulé par le chef de projet ne se contourne pas : le `reviewer` est relancé, réémet le document avec `verdict: "SHIP"` et `overrule` renseigné, et la garde ne lit toujours que `verdict`. `overrule` renseigné avec un verdict autre que `SHIP` : refus `overrule sans effet : verdict <v>`.
10. `rd` est un tableau (vide autorisé) d'objets `{ "format": "A"|"B"|"C", "title": <chaîne> }` : les propositions R&D du pilier P6, **proposées, jamais exécutées**. Non lu par la garde.

Les trois champs qui décident sont `increment`, `commit`, `verdict`. Le reste est vérifié dans sa **forme** parce qu'un document à moitié conforme n'est pas un contrat, et parce que c'est cette liste de réserves que tu (CC) liras pour corriger et que Cowork lira pour rendre compte.

### 2.3 `tools/land-guard.js` réécrit

Module d'outillage hors du site, **aucune dépendance**, fonctions **pures** (aucune lecture de fichier dans les fonctions ; la lecture est faite par le point d'entrée en ligne de commande, en bas du fichier). Exports :

- `REVIEW_CONTRACT` : constante décrivant les champs, leurs types et leurs valeurs permises (celle que le validateur lit).
- `incrementFromStatus(statusText)` → `{ok, name, reason}` (repris tel quel).
- `parseReview(text)` → `{ok, review, reason}` : règles 1 et 2. `review` est l'objet, ou `null`.
- `validateReviewShape(review)` → `{ok, reason}` : règles 5 (valeurs permises, sans encore juger), 6, 7, 8, 9, 10. Forme seule.
- `reviewAuthorizes(review, { increment, commit })` → `{ok, reason}` : règles 3, 4, 5 (verdict = SHIP), dans cet ordre. Suppose la forme déjà validée ; si `review` n'est pas un objet, refus `review absent`.
- `landGuard(reviewText, statusText, branchCommit)` → `{ok, reason}` : enchaîne `parseReview` → `validateReviewShape` → `incrementFromStatus` → `reviewAuthorizes`, en s'arrêtant au premier refus. **C'est la seule fonction que `/land` appelle.** `reason` est vide si et seulement si `ok`.

**Point d'entrée en ligne de commande**, dans le même fichier, exécuté seulement si le module est lancé directement (`process.argv[1]` se termine par `land-guard.js`) :
`node tools/land-guard.js <review.json> <STATUS.md> <sha>` lit les deux fichiers, appelle `landGuard`, imprime `OK` ou `REFUS — <reason>` sur la sortie standard, et sort en **0** ou **1**. Fichier introuvable : `REFUS — <chemin> introuvable`, sortie 1. Le `reviewer` s'en sert pour vérifier son propre document avant de le rendre ; `/land` s'en sert en pré-garde ; le test à blanc de l'étape 3 s'en sert. Une seule commande, trois lecteurs.
Seconde forme, pour le `reviewer` lancé depuis `/ship` **avant** que `STATUS.md` ne soit en READY : `node tools/land-guard.js --shape <review.json>` n'applique que `parseReview` puis `validateReviewShape` (forme seule, sans comparer `increment` ni `commit`), même sortie `OK` / `REFUS — <reason>`, même code de sortie.

En-tête du fichier : un commentaire de quelques lignes disant ce que ce module ferme (l'incident des quatre incréments sans revue), pourquoi il lit du JSON et plus de la prose (une phrase, pas l'historique des quatre passes), et **le contrat** (section 2.2, à la virgule près, en commentaire au-dessus de `REVIEW_CONTRACT`).

### 2.4 `.claude/agents/reviewer.md`

Réécris l'étape 4 de la procédure. Le `reviewer` **n'écrit plus `.pipeline/review.md`**. Il écrit `.pipeline/review.json`, conforme au contrat de `tools/land-guard.js` (il **lit** ce fichier au démarrage, il n'en recopie pas les règles), avec :

- `increment` copié depuis le second champ de `.pipeline/STATUS.md` **si `STATUS.md` est en phase READY** ; sinon (revue lancée depuis `/ship` ou depuis un prompt, avant l'écriture de `READY`) copié depuis la première ligne de `.pipeline/spec.md`, qui a la forme `Incrément : <nom>` (voir étape 1). Une phrase le dit à l'agent : « le nom que tu écris est celui que `STATUS.md` portera, caractère pour caractère ; en cas de doute, demande, n'invente pas ».
- `commit` = `git rev-parse HEAD` au moment de la revue ; `base` = `git rev-parse main`.
- Une réserve par constat WARN ou FAIL, une par ligne, `file` et `line` obligatoires dès qu'un endroit du code est visé.
- **Auto-vérification obligatoire avant de rendre la main** : `node tools/land-guard.js .pipeline/review.json .pipeline/STATUS.md $(git rev-parse HEAD)`. Si `STATUS.md` n'est pas encore en READY (cas `/ship`), la vérification se fait avec `validateReviewShape` seule ; l'agent le fait via une deuxième forme du point d'entrée : `node tools/land-guard.js --shape .pipeline/review.json` (imprime `OK` ou `REFUS — <reason>`, sortie 0/1). Un document qui échoue à sa propre vérification n'est pas rendu : l'agent le corrige d'abord.
- La règle d'anti-sycophanie est reformulée pour le contrat : « un `review.json` dont `reservations` est vide est suspect ; les réserves `WARN` existent pour ça : elles n'empêchent pas `SHIP` et disent quand même ce qui a été vu ».
- Ce que le `reviewer` **ne fait plus** : rédiger un compte rendu en prose. Une phrase de l'agent le dit : « ta revue est lue par une garde et par le Tech Lead ; le compte rendu au chef de projet est le rôle du Tech Lead, pas le tien ».

Le reste du contrat de l'agent (lecture seule, six piliers, PASS / WARN / FAIL, veto P5 overrulable) est inchangé.

### 2.5 `/land` (`.claude/commands/land.md`)

Dans **ÉTAPE 0 — PRÉ-GARDES**, remplace le paragraphe « Revue fraîche » par : « **Revue fraîche** : `node tools/land-guard.js .pipeline/review.json .pipeline/STATUS.md $(git rev-parse <branche>)` DOIT imprimer `OK` et sortir en 0. Sinon → REFUS, en citant la ligne `REFUS — …` imprimée, aucun effet de bord. Un verdict `NEEDS_WORK` ou `BLOCK` n'atterrit jamais ; un `BLOCK` overrulé par le chef de projet se traduit par un `review.json` **réémis par le `reviewer`** avec `verdict: "SHIP"` et `overrule` renseigné, jamais par un contournement de la garde. Un commit ajouté à la branche après la revue fait refuser (champ `commit`) : relance le `reviewer`. »

Dans la ligne d'en-tête « Préconditions », remplace `review.md` par `review.json`.

### 2.6 `/ship` (`.claude/commands/ship.md`)

À l'ÉTAPE 4 — REVUE : le `reviewer` produit `review.json` (et non `review.md`) ; la ligne « Affiche `.pipeline/review.md` intégralement » devient « Affiche au chef de projet le `verdict` et la liste des `reservations` de `.pipeline/review.json` (pilier, gravité, fichier, ligne, constat), tels quels, sans les reformuler ». La phrase « `/land` refuse d'atterrir sans `review.md` frais » devient « … sans `review.json` frais et conforme au contrat de `tools/land-guard.js` ».

### 2.6 bis `/fix` (`.claude/commands/fix.md`)

Deux lignes : le `reviewer` produit `review.json` (et non `review.md`) ; « Affiche `review.md` au chef de projet » devient « Affiche au chef de projet le `verdict` et la liste des `reservations` de `.pipeline/review.json`, tels quels ». Rien d'autre dans ce fichier.

### 2.7 `CLAUDE.md`

Section « Handoff (revue) » : dans la liste des artefacts `.pipeline/`, remplace `review.md` par `review.json` ; dans la puce « Revue indépendante obligatoire », remplace `review.md (verdict SHIP)` par `review.json (contrat de tools/land-guard.js, verdict SHIP)`. Ajoute une puce d'une phrase : « **Le `reviewer` n'écrit pas pour un humain** : `review.json` est lu par la garde de `/land` et par Cowork ; le compte rendu au chef de projet est le rôle de Cowork. » Vérifie que `CLAUDE.md` reste sous 18 000 caractères ; sinon ARRÊTE-TOI et signale.

### 2.8 `tests/land-guard.test.js` réécrit

Table de cas, **un témoin committé par chemin capable de refuser** (c'est la règle du 14 août : une preuve jetée protège le jour où on la fait, un témoin committé protège encore). Au minimum :

- `parseReview` : texte vide → refus « illisible » · JSON invalide (`{ "verdict": SHIP }`) → refus « illisible » · racine tableau → refus · `contract` absent → refus « contrat inconnu » · `contract: "twaim.review/2"` → refus « contrat inconnu » · document conforme → `ok`, objet rendu.
- `validateReviewShape` : chaque champ obligatoire absent, un cas par champ (`increment`, `commit`, `base`, `reviewed_at`, `tests`, `verdict`, `reservations`, `overrule`, `rd`) → refus nommant le champ · `verdict: "ship"` (minuscules) → refus « hors contrat » · `verdict: "NEEDS WORK"` (espace au lieu du souligné) → refus « hors contrat » · réserve sans `line` → refus « réserve n°1 » · réserve avec `severity: "MAJOR"` → refus · réserve avec `pillar: "P9"` → refus · `SHIP` + une réserve `FAIL` → refus « incohérent » · `NEEDS_WORK` + zéro réserve → refus « sans réserve » · `overrule` renseigné + `verdict: "BLOCK"` → refus « sans effet » · `tests.passed > tests.total` → refus · document conforme avec deux réserves `WARN` → `ok`.
- `reviewAuthorizes` : bon commit, `increment` différent d'un caractère (`CHORE revue-structuree` vs `CHORE revue-structurée`) → refus « ne porte pas l'incrément » · bon incrément, `commit` du commit précédent → refus « ne relit pas le commit » · `commit` en majuscules → refus (le contrat dit minuscules) · bon incrément, bon commit, `NEEDS_WORK` → refus « verdict du reviewer » · `BLOCK` → refus · `SHIP` → `ok` · `SHIP` avec `overrule` renseigné → `ok`.
- `landGuard` : `STATUS.md` en `CLOSED` → refus « pas en phase READY » (le refus vient d'`incrementFromStatus`, l'ordre des contrôles est vérifié) · chaîne complète conforme → `ok` · **le cas historique** : un `review.json` conforme portant `CHORE lang-dans-adresse` contre un `STATUS.md` `READY — CHORE revue-structuree — …` → refus « ne porte pas l'incrément courant ».
- `incrementFromStatus` : les cas existants, conservés tels quels.

Garde de non-vacuité : la table compte **au moins 35 cas**. Chaque `reason` testé l'est par un motif court (`toMatch`), jamais par le message entier : le message peut évoluer, le chemin de refus non.

### 2.9 `tasks/ROADMAP.md`

Deux dettes existantes, à mettre à jour **sans les supprimer** (une dette fermée reste lisible, avec ce qui l'a fermée) : **[W16]** : fermée par cet incrément, une phrase et le renvoi au commit ; **[W15]** : la moitié « fraîcheur » est fermée (champ `commit`), la moitié « provenance » reste ouverte, telle quelle (rien ne prouve que c'est le `reviewer` qui a écrit `review.json`). Ne touche à aucune autre ligne de la feuille de route.

## ÉTAPE 3 — Preuves (ASSURANCE couche A, à consigner dans `changes.md`)

1. Vert initial : suite complète, nombre exact, avec le décompte `113 − <cas retirés> + <cas ajoutés> = <total>` écrit dans `changes.md`.
2. Morsure sur la fonction, **trois mutations, une par champ décisif**, restaurées et vérifiées par `cmp` avec la sauvegarde avant de passer à la suivante, jamais enchaînées dans un même appel (incident de la session 7) : (a) `reviewAuthorizes` ignore `increment` → au moins un rouge ; (b) ignore `commit` → au moins un rouge ; (c) accepte `NEEDS_WORK` → au moins un rouge. Note pour chacune **quels** cas rougissent.
3. **Test à blanc sur l'état réel du dépôt**, sans rien merger, par le point d'entrée en ligne de commande, trois lancements, sortie **exacte** consignée : (a) `node tools/land-guard.js .pipeline/review.json .pipeline/STATUS.md $(git rev-parse HEAD)` alors que `review.json` **n'existe pas encore** → `REFUS — … introuvable`, sortie 1 ; (b) le même, en lui donnant `.pipeline/review.md` (la prose de la 4ᵉ passe de l'incrément précédent, si le fichier est encore là ; sinon `CLAUDE.md`, n'importe quelle prose fait l'affaire et tu dis laquelle) à la place du JSON → `REFUS — review.json illisible : …`, sortie 1. C'est la preuve que la porte refuse toutes les revues du passé, y compris celle qui l'a précédée ; (c) après l'étape 4, avec le vrai `review.json` et le vrai `STATUS.md` → `OK`, sortie 0.
4. `git diff main...HEAD -- index.html css js` vide.
5. `grep -rn "review\.md" .claude CLAUDE.md tools tests` ne rend **aucune ligne** : plus aucun lecteur ne cherche la prose, `/fix` compris. (Le `.pipeline/review.md` résiduel, gitignoré, n'est pas dans le périmètre : il périra avec le dossier. `tasks/`, `prompts/` et le journal peuvent citer `review.md` au passé : ils racontent, ils ne lisent pas.)

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md` de cet incrément.
- Un commit, staging précis : `chore: revue structurée — le reviewer émet review.json, la garde de /land en lit trois champs` (`tools/land-guard.js`, `tests/land-guard.test.js`, `.claude/agents/reviewer.md`, `.claude/commands/land.md`, `.claude/commands/ship.md`, `.claude/commands/fix.md`, `CLAUDE.md`, `tasks/ROADMAP.md`).
- **Délègue la revue au subagent `reviewer`** (→ `review.json` ; `STATUS.md` n'étant pas encore en READY, il prend le nom dans `spec.md` et s'auto-vérifie avec `--shape`). Affiche `verdict` et `reservations` tels quels. Si le verdict est `NEEDS_WORK` : corrige, **commite**, relance le `reviewer` (le champ `commit` l'exige), affiche à nouveau. Trois passes au plus ; à la troisième `NEEDS_WORK`, ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — CHORE revue-structuree — <ISO> — chore/revue-structuree — tests <X/X>` (dernier artefact écrit, comme toujours : c'est le feu vert de lecture de Cowork).
- Preuve 3(c) de l'étape 3 (`node tools/land-guard.js .pipeline/review.json .pipeline/STATUS.md $(git rev-parse HEAD)` → `OK`, sortie 0), consignée dans `changes.md`. Cette vérification ne modifie rien ; elle vient après `STATUS.md` parce qu'elle en a besoin.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `landGuard` et ses quatre fonctions exportées, pures, testées sur au moins 35 cas ; morsure prouvée par trois mutations sur la fonction **et** à blanc sur l'état réel du dépôt (deux refus, un OK).
2. Le `reviewer` émet `review.json` conforme au contrat et se vérifie lui-même avant de rendre ; `/land` refuse sans `review.json` frais, conforme, SHIP, pour cet incrément **et** ce commit ; le motif du refus est celui imprimé par `tools/land-guard.js`.
3. Plus aucun lecteur de `review.md` dans `.claude/` (`/fix` compris), `CLAUDE.md`, `tools/`, `tests/` ; le retrait de code livré est chiffré dans `changes.md` ; [W15] et [W16] mis à jour.
4. Le site est intact ; aucune dépendance ; `CLAUDE.md` sous 18 000 caractères.
5. Le `/land` de cet incrément passera la nouvelle garde grâce au `review.json` produit à l'étape 4 : la porte se prouve sur elle-même.

# CHORE — Garde de revue dans `/land` : aucun atterrissage sans `review.md` frais du `reviewer`

**Fichier** : `prompts/v0.1/CHORE_garde-revue-land_v1.md`
**Type** : CHORE (outillage du harnais) · **Branche** : `chore/garde-revue-land` · **Révision** : v1 · **Date** : 15 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Couche A : ce CHORE **crée une porte** (pré-garde de `/land`). Elle doit prouver sa morsure (un `review.md` périmé ou absent fait refuser l'atterrissage) et sa non-vacuité (un `review.md` présent mais sans verdict fait refuser aussi) |
| `AGENT_SCOPE_METHOD` | 1.1 | Écarté (hésitation levée) | Le geste reste **dans le dépôt** (`.claude/` du projet, committé) ; la propagation au gabarit central `_TEMPLATE_AGENTS` est un geste séparé du chef de projet, hors de ce prompt |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun secret, aucun code exécutable ajouté au site |
| `UX_METHOD` / `STYLE_METHOD` | — | Écartés | Aucun texte destiné au visiteur, aucune interface |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/CHORE_garde-revue-land_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. Version **0.1.5** au manifeste, `.pipeline/STATUS.md` commence par `CLOSED — session 7`.
2. `git rev-list --count origin/main..main` = 0.
3. `npm test` vert sur `main` (68/68).

## Contexte : l'incident que cette porte ferme

Sur ce projet, l'agent `reviewer` n'a tourné qu'en session 2 (socle), puis **quatre incréments de suite sans revue indépendante** (README, porte i18n, décor, menu) : la revue vit dans `/ship` étape 4, et ces incréments ont été lancés par « exécute le prompt », jamais par `/ship`. Personne ne l'a vu, parce qu'aucune garde ne le vérifiait : `.pipeline/review.md` portait encore « EVOL socle-du-site » quand la session 6 a atterri. Relancé à la main en session 7, le `reviewer` a trouvé deux défauts réels que ni l'auteur ni le Tech Lead n'avaient vus. **Une porte qui vit dans une commande facultative n'est pas une porte.** La revue devient une pré-garde de `/land` : quel que soit le chemin de construction, rien n'atteint `main` sans un `review.md` frais du `reviewer` pour cet incrément.

Périmètre : `.claude/commands/land.md`, `.claude/commands/ship.md` (une ligne), `CLAUDE.md` (une ligne), `tests/land-guard.test.js` (nouveau). Rien d'autre.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b chore/garde-revue-land` · `.pipeline/spec.md` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable

### 2.1 La règle de fraîcheur, en un seul endroit

Pour que la garde soit vérifiable par un test **et** par `/land`, la règle vit dans une **fonction pure exportée** dans un module d'outillage du dépôt, hors du site : `tools/land-guard.js` (créé s'il n'existe pas ; aucun lien avec `js/` du site, aucune dépendance). Signature : `reviewIsFreshFor(reviewText, incrementName)` → `{ ok: boolean, reason: string }`. Règles, dans l'ordre :

1. `reviewText` vide ou absent → `{ok:false, reason:"review.md absent ou vide"}`.
2. Le texte doit contenir, dans son en-tête (les 10 premières lignes), le nom de l'incrément **exact** tel qu'il figure dans `.pipeline/STATUS.md` (le segment entre le premier et le second « — », par exemple `CHORE lang-dans-adresse`). Sinon → `{ok:false, reason:"review.md ne porte pas l'incrément courant : <trouvé> vs <attendu>"}`.
3. Le texte doit contenir une ligne `VERDICT : SHIP` (casse et espaces tolérés autour du deux-points, mais le mot `SHIP` seul : `NEEDS WORK` et `BLOCK` sont des refus, `SHIP` précédé de `NEEDS` n'est pas `SHIP`). Sinon → `{ok:false, reason:"verdict du reviewer absent ou différent de SHIP : <trouvé>"}`.
4. Sinon `{ok:true, reason:""}`.

Un `README` d'une ligne en tête du module explique qu'il est lu par `/land` et par le test, et par rien d'autre.

### 2.2 `/land` (`.claude/commands/land.md`)

Dans **ÉTAPE 0 — PRÉ-GARDES**, ajouter, après la garde `STATUS.md` : « Lis `.pipeline/review.md` PAR LE CONTENU et applique la règle de `tools/land-guard.js` (`reviewIsFreshFor` avec le nom d'incrément lu dans `STATUS.md`) : `ok` doit être vrai. Sinon → REFUS + le `reason` retourné, aucun effet de bord. Un verdict `NEEDS WORK` ou `BLOCK` n'atterrit jamais ; un `BLOCK` overrulé par le chef de projet se traduit par un `review.md` mis à jour par le `reviewer` avec le motif d'overrule, jamais par un contournement de la garde. » Et dans la ligne d'en-tête « Préconditions », remplacer « `/ship` clôturé SHIP » par « `review.md` frais du `reviewer` avec verdict SHIP pour cet incrément (vérifié en pré-garde), quel que soit le mode de lancement de l'incrément ».

### 2.3 `/ship` (`.claude/commands/ship.md`)

À l'étape 4 (REVUE), ajouter une phrase : « Cette étape n'est pas facultative et ne dépend pas de `/ship` : `/land` refuse d'atterrir sans `review.md` frais (voir `tools/land-guard.js`). Un incrément lancé par « exécute le prompt » doit déléguer la revue au `reviewer` avant d'écrire `READY`. »

### 2.4 `CLAUDE.md`

Dans « Handoff (revue) », ajouter une puce : « **Revue indépendante obligatoire** : le `reviewer` écrit `.pipeline/review.md` (verdict SHIP) **avant** tout `READY`, quel que soit le mode de lancement ; `/land` le vérifie en pré-garde (`tools/land-guard.js`) et refuse sinon. » Vérifie que le `CLAUDE.md` reste sous 18 000 caractères après ajout ; sinon ARRÊTE-TOI et signale.

### 2.5 `tests/land-guard.test.js`

Table de cas sur `reviewIsFreshFor` : texte vide → refus « absent » · en-tête « CHORE menu-hamburger » pour incrément attendu « CHORE lang-dans-adresse » → refus « ne porte pas l'incrément » · bon incrément, `VERDICT : NEEDS WORK` → refus « différent de SHIP » · bon incrément, `VERDICT : BLOCK` → refus · bon incrément, `VERDICT : SHIP` → ok · bon incrément, `verdict: ship` (casse) → ok · bon incrément mais mot `SHIP` seulement dans le corps, sans ligne `VERDICT` → refus (le verdict est une ligne, pas un mot). Garde de non-vacuité : la table compte au moins 7 cas.

## ÉTAPE 3 — Preuves (ASSURANCE couche A, à consigner)

1. Vert initial : suite complète (68 + les nouveaux).
2. Morsure sur la fonction : fais `reviewIsFreshFor` retourner toujours `ok:true` → au moins un test rouge, rc 1 ; restaure.
3. **Morsure sur la commande, à blanc** : sans rien merger, simule la pré-garde de `/land` sur l'état actuel du dépôt : `review.md` porte aujourd'hui « CHORE lang-dans-adresse » (session 7, atterrie), donc pour un incrément nommé « CHORE garde-revue-land » la garde **doit refuser** avec le motif « ne porte pas l'incrément courant ». Consigne la sortie exacte. C'est la preuve que la porte aurait mordu sur les quatre incréments passés.
4. Vérifie que rien du site n'est touché : `git diff main...HEAD -- index.html css js` vide.

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md` de cet incrément.
- Un commit, staging précis : `chore: garde de revue dans /land — aucun atterrissage sans review.md frais du reviewer` (`.claude/commands/land.md`, `.claude/commands/ship.md`, `CLAUDE.md`, `tools/land-guard.js`, `tests/land-guard.test.js`).
- **Délègue la revue au subagent `reviewer`** (→ `review.md`), affiche son verdict. Il doit porter « CHORE garde-revue-land » et `VERDICT : SHIP` : **c'est ce `review.md` qui sera lu par la nouvelle garde au `/land` de cet incrément**. La porte se prouve sur elle-même.
- `.pipeline/STATUS.md` = `READY — CHORE garde-revue-land — <ISO> — chore/garde-revue-land — tests <X/X>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `reviewIsFreshFor` exportée, pure, testée sur au moins 7 cas ; morsure prouvée sur la fonction **et** à blanc sur l'état réel du dépôt.
2. `/land` refuse sans `review.md` frais SHIP pour l'incrément courant ; le motif du refus est celui de la fonction.
3. Le site (HTML, CSS, JS) est intact ; aucune dépendance ; `CLAUDE.md` sous 18 000 caractères.
4. Le `/land` de cet incrément passe la nouvelle garde grâce au `review.md` du `reviewer` produit à l'étape 4.

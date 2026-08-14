# CHORE — Outillage de tests (Vitest) + premier module testable

**Fichier** : `prompts/v0.1/CHORE_outillage-tests_v1.md`
**Type** : CHORE · **Branche** : `chore/outillage-tests` · **Révision** : v1 · **Date** : 14 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` (source de vérité) avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `SECURITY_METHOD` | 1.6 | Appliqué | §3.3 dépendances : version épinglée exacte et récente, carence 72 h (4.1.10 publiée le 6 juillet 2026, provenance SLSA v1 vérifiée présente), installation sans scripts, audit à l'install, contrôle du lockfile |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Couche A : la suite de tests est une porte → preuve de morsure à la naissance, garde de non-vacuité (échec si aucun test vu) |
| `AGENT_SCOPE_METHOD` | — | Écarté (hésitation levée) | La configuration npm reste **dans le dépôt** (`.npmrc` projet) ; aucune configuration machine/globale n'est touchée, donc pas de geste hors dépôt |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, avant toute autre modification, message **exact** :
`docs(prompt): prompts/v0.1/CHORE_outillage-tests_v1.md` (commit du présent fichier).

## Étape 0 — Confrontation (avant toute action)

Confronte ce prompt à tes règles permanentes (instructions machine, registre global des leçons, `tasks/lessons.md`, règles auto-chargées). Contradiction détectée → **ARRÊTE-TOI et signale** avant d'agir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git status --porcelain` : working tree propre (le présent fichier prompt peut être non suivi, c'est attendu).
2. `git log --oneline -1` sur `main` : le commit initial de l'outillage existe.
3. `git rev-list --count origin/main..main` = 0 (tout est poussé).
4. `vitest` absent de `package.json` (on installe, on ne met pas à jour).

## ÉTAPE 1 — Branche et enregistrement

- `git checkout -b chore/outillage-tests`
- Écris `.pipeline/spec.md` : nom du prompt + révision + périmètre de fichiers déclaré (liste des livrables ci-dessous, et eux seuls).
- Commit du prompt (message imposé ci-dessus).

## ÉTAPE 2 — Garde-fous npm du projet (dans le dépôt, jamais en global)

Crée `.npmrc` à la racine du dépôt, contenu exact :

```
ignore-scripts=true
audit-level=moderate
fund=false
save-exact=true
```

**Interdit** : toute commande `npm config set` (configuration machine — hors périmètre de ce prompt, règle v2.25 du référentiel).

## ÉTAPE 3 — Installation de Vitest (analyse déjà rendue, verte)

Décision d'épinglage déjà arbitrée : **`vitest@4.1.10`** (dernière stable ; publiée le 6 juillet 2026 donc hors fenêtre de carence 72 h ; attestation de provenance SLSA v1 présente sur le registre ; aucun script d'installation dans le paquet).

1. Vérifie la provenance avant d'installer : `npm view vitest@4.1.10 dist.attestations` → un bloc `provenance` doit être présent. Absent → **STOP**, signale.
2. Installe : `npm install --save-dev --save-exact --ignore-scripts vitest@4.1.10`
3. Audit : `npm audit`. Vulnérabilité `high` ou `critical` → **STOP**, rapporte sans corriger à l'aveugle (pas de `npm audit fix --force`).
4. Contrôles du lockfile généré :
   - toutes les URL `resolved` pointent vers `registry.npmjs.org` (aucune exception) ;
   - chaque entrée a un champ `integrity` ;
   - scan des indicateurs de compromission : aucune occurrence de `plain-crypto-js`, `flatmap-stream`, ni de `event-stream@3.3.6`, `ua-parser-js@0.7.29|0.8.0|1.0.0`, `axios@1.14.1|0.30.4` ; présence de `keyv` ou `cacheable` dans l'arbre → **STOP et signale** (campagne active d'août 2026).
   Un contrôle échoue → **STOP**, supprime `node_modules`, rapporte.
5. Ajoute dans `package.json` : `"scripts": { "test": "vitest run" }`.
6. `node_modules/` : ajoute la ligne `node_modules/` au `.gitignore` racine (elle n'y est pas encore).

## ÉTAPE 4 — Premier module réel (le filet doit mordre du vrai code)

Crée `js/s36.js` (module ES ; code en anglais, commentaires en français, en-tête de fichier) avec deux fonctions pures qui serviront aux démonstrations du site :

- `extractField(record, start, end)` — extraction positionnelle façon S/36 : positions **1-basées incluses**, retourne la sous-chaîne **sans espaces de fin** (trim droit uniquement). Lève une `RangeError` si `start < 1`, `end < start`, ou `record.length < end`.
- `parseImplicitDecimal(raw, decimals = 2)` — décimales implicites : `"000012550"` → `125.5`. Lève une `TypeError` si `raw` contient autre chose que des chiffres, une `RangeError` si `decimals < 0` ou `raw` vide. Commentaire d'honnêteté obligatoire : les nombres signés « overpunch » du S/36 ne sont **pas** gérés (hors périmètre du site).

## ÉTAPE 5 — Tests (Vitest)

Crée `tests/s36.test.js`. Cas minimum :

- `parseImplicitDecimal("000012550")` → `125.5` · `("000000000")` → `0` · `("12345", 0)` → `12345`
- rejet : non-chiffres (`"12A45"`) → `TypeError` ; `""` → `RangeError`
- `extractField` sur un enregistrement type `CLIMST` (140 caractères construit dans le test) : extraction de `NOMCLI` (1-30) et `CDPCLI` (111-115) avec espaces de bourrage retirés
- rejet : enregistrement trop court → `RangeError` ; bornes incohérentes → `RangeError`
- invariant : la longueur du résultat de `extractField` est toujours ≤ `end - start + 1`

`npm test` doit être **vert**.

## ÉTAPE 6 — Preuve de morsure et garde de non-vacuité (ASSURANCE, couche A)

1. **Morsure** : introduis une mutation délibérée dans `js/s36.js` (remplace la division par `10 ** decimals` par `10 ** (decimals + 1)`), lance `npm test`, **constate l'échec** (code de retour ≠ 0), consigne la sortie. **Restaure** le code, relance, constate le vert. Sans échec constaté à la mutation → la suite est aveugle : **STOP**, signale.
2. **Non-vacuité** : lance `npx vitest run chemin/inexistant.test.js` et **constate l'échec** (« aucun fichier de test trouvé » doit faire échouer, pas passer). S'il sort en vert → **STOP**, signale (porte aveugle).
3. Consigne les trois constats (vert initial, rouge de mutation, échec à vide) dans `.pipeline/test-results.md`.

## ÉTAPE 7 — Handoff (dernier geste)

- Écris `.pipeline/changes.md` (fichiers touchés, décisions, résultats des contrôles npm de l'étape 3).
- Commit en **staging précis** : `package.json`, `package-lock.json`, `.npmrc`, `.gitignore`, `js/s36.js`, `tests/s36.test.js` — rien d'autre, **jamais `git add -A`**. Message : `chore: outillage de tests Vitest 4.1.10 + module s36 (extraction positionnelle, décimales implicites)`
- Écris `.pipeline/STATUS.md` = `READY — CHORE outillage-tests — <horodatage ISO> — chore/outillage-tests — tests <X/Y>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `npm test` vert sur la branche, avec au moins les cas de l'étape 5.
2. Preuve de morsure et garde de non-vacuité constatées et consignées dans `.pipeline/test-results.md`.
3. `npm audit` sans `high`/`critical` ; lockfile 100 % `registry.npmjs.org` avec `integrity` ; aucun indicateur de compromission.
4. Aucun fichier hors de la liste de staging de l'étape 7 (plus le prompt committé en étape 1) n'est modifié.
5. Aucune configuration machine touchée : les réglages npm vivent dans `.npmrc` du dépôt.

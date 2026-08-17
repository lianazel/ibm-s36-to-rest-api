# EVOL — Section « Le problème » : l'énoncé, en quatre phrases

**Fichier** : `prompts/v0.1/EVOL_section-le-probleme_v1.md`
**Type** : EVOL (contenu) · **Branche** : `feat/section-le-probleme` · **Révision** : v1 · **Date** : 17 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | Prose fournie ci-dessous, relue (S-1 aucun cadratin ; chaque langue s'adresse à son lecteur) ; **ne pas la réécrire** |
| `UX_METHOD` | — | Écarté | Aucun changement de mise en page ni de structure HTML : une valeur de dictionnaire change, dans chaque langue |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée ; les portes existantes (parité FR/EN, HTML↔dictionnaire) restent vertes |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun code, aucune donnée personnelle |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_section-le-probleme_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.8** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 10`.
3. `npm test` vert sur `main` (134/134).
4. `js/i18n.js` contient `section2.intro` = « La suite de ce chapitre arrive. » (FR) et « This chapter is coming soon. » (EN). Sinon, l'état a bougé : **ARRÊTE-TOI et signale**.

## Contexte

Deuxième contenu du jalon 1, volontairement réduit à son énoncé : le chef de projet a décidé (17 août 2026) que la section « Le problème » commence par quatre phrases, et que le reste viendra si la réflexion s'affine. `section2.title` **ne change pas**. Seule la valeur de `section2.intro` change, dans les deux langues. Aucune clé ajoutée, aucun HTML touché.

Périmètre : `js/i18n.js`, une clé, deux langues. **Rien d'autre.**

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/section-le-probleme` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL section-le-probleme` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable : deux valeurs, prose exacte

Remplace la valeur de `section2.intro` :

**FR** : Le défi consiste à exposer en JSON un format de table hérité de l'ère de l'IBM System/36. Ces tables ont, pour celles qui sont encore en activité, des noms de colonnes de six caractères. Aucune description. C'est l'application qui connaît la valeur métier de telle ou telle colonne.

**EN** : The challenge is to expose in JSON a table format inherited from the IBM System/36 era. These tables, those still in service, have six-character column names. No description. The application is what knows the business meaning of each column.

Rien d'autre ne change dans le fichier : pas de clé ajoutée, pas de retouche ailleurs.

## ÉTAPE 3 — Preuves

1. `npm test` vert : 134/134 (aucun test ajouté ni retiré).
2. `git diff main...HEAD --stat` : **un** fichier (`js/i18n.js`), **deux** lignes modifiées, aucune ajoutée ni supprimée. `git diff main...HEAD -- index.html css tests` : vide.
3. `grep -n "La suite de ce chapitre arrive\|This chapter is coming soon" js/i18n.js` : aucune ligne.
4. `grep -c "—" js/i18n.js` avant et après : même nombre. Consigne les deux chiffres.

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js` seul) : `feat(probleme): l'énoncé du problème en quatre phrases, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, écris READY. Si `NEEDS_WORK` : corrige, commite, relance le `reviewer` ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL section-le-probleme — <ISO> — feat/section-le-probleme — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les deux valeurs remplacées, exactement ; rien d'autre modifié.
2. Suite verte 134/134 ; aucun cadratin ajouté ; textes provisoires disparus.
3. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

---
description: Atterrissage d'incrément IBMiAPI en un geste — merge + tests + bump + journal + STATUS, commit de clôture, STOP avant push (§5.4 / RD-014).
argument-hint: "<branche> [bump=patch|minor|major] [note de cadrage]"
---

Atterris l'incrément revué SHIP pour : $ARGUMENTS

Commande **autonome et auto-gardée**. Préconditions : `review.json` frais du `reviewer` avec verdict SHIP pour cet incrément (vérifié en pré-garde), **quel que soit le mode de lancement de l'incrément**, tests verts, `.pipeline/STATUS.md = READY`, branche `feat/<slug>`, accord du chef de projet donné. Lis `CLAUDE.md` (source de vérité) avant d'agir. **Ne pousse jamais.**

## ÉTAPE 0 — PRÉ-GARDES (refus propre si une garde casse)
- `main` à jour avec `origin/main` : `git rev-list --count origin/main..main` DOIT valoir 0. Sinon REFUS : « clôture précédente non poussée — pousse d'abord ».
- Lis `.pipeline/STATUS.md` PAR LE CONTENU (jamais le mtime). Doit valoir `READY` pour cet incrément.
  - Si `LANDING` → un /land a été coupé : bascule en MODE REPRISE (voir /session-start), n'enchaîne pas à l'aveugle.
  - Sinon (pas READY) → REFUS + message clair, aucun effet de bord.
- **Revue fraîche** : `node tools/land-guard.js .pipeline/review.json .pipeline/STATUS.md $(git rev-parse <branche>)` DOIT imprimer `OK` et sortir en 0. Sinon → REFUS, en citant la ligne `REFUS — …` imprimée, aucun effet de bord. Un verdict `NEEDS_WORK` ou `BLOCK` n'atterrit jamais ; un `BLOCK` overrulé par le chef de projet se traduit par un `review.json` **réémis par le `reviewer`** avec `verdict: "SHIP"` et `overrule` renseigné, jamais par un contournement de la garde. Un commit ajouté à la branche après la revue fait refuser (champ `commit`) : relance le `reviewer`.
- `git status --porcelain` : aucun fichier SUIVI modifié/indexé en attente. Sinon REFUS.
- `<branche>` existe et `main` est mergeable (pas de conflit). Sinon REFUS + message.

## ÉTAPE 1 — MARQUEUR D'ENTRÉE
- Écris `.pipeline/STATUS.md` = `LANDING — <incrément> — <ISO> — <branche>` AVANT tout merge.

## ÉTAPE 2 — MERGE (idempotent)
- Si `<branche>` n'est pas déjà dans `git branch --merged main` : `git merge --no-ff <branche>`.
- Sinon : saute (cas « mergé hors cycle »), continue.

## ÉTAPE 3 — FILET DE TESTS
- Lance les tests Vitest sur la logique testable (parité du dictionnaire FR/EN, générateurs d'exemples JSON, simulateur du mini-langage) : `npm test`.
- ROUGE → `git merge --abort` (si on vient de merger), remets `STATUS=READY`, rapport, STOP.
- VERT → continue.

## ÉTAPE 4 — BUMP SEMVER (idempotent)
- Niveau : `feat/*`→minor, `fix/*`|`chore/*`→patch ; override `bump=` depuis $ARGUMENTS.
- Mets à jour le manifeste de version (`pyproject.toml` ou `package.json` selon le projet) ET le pied de `CLAUDE.md`. Si déjà à la cible, saute.

## ÉTAPE 5 — JOURNAL + LEÇON (idempotent)
- Écris l'entrée `tasks/JOURNAL_*.md` citant le HASH DE MERGE ; ajoute la leçon `tasks/lessons.md` s'il y en a une.
- Si l'entrée pour ce hash existe déjà, saute.
- L'entrée porte une section **« Arbitrages rendus »** : un tableau `Question | Ce qui a été tranché | Motif | Portée`.
  La colonne **Portée** vaut `précédent` ou `cas d'espèce`, et elle est **obligatoire** : sans elle, une tolérance
  ponctuelle devient une jurisprudence par accident. S'il n'y a eu aucun arbitrage, écris-le — « aucun » est une
  information, une section absente n'en est pas une.

## ÉTAPE 6 — STATUS CLOSED
- Écris `.pipeline/STATUS.md` = `CLOSED — session <N> : <synthèse 1 ligne>`.

## ÉTAPE 7 — COMMIT DE CLÔTURE (staging PRÉCIS, jamais -A)
- `git add <manifeste-version> CLAUDE.md tasks/JOURNAL_*.md tasks/lessons.md`
- `git commit -m "docs: journal session <N> + bump <old> -> <new> — clôture (merge <hash>)"`
- N'indexe AUCUN fichier non-suivi. (`STATUS.md` est gitignoré → hors commit, voulu.)

## ÉTAPE 8 — STOP (porte de push)
- Affiche EXACTEMENT : `PRÊT À POUSSER — git push origin main && git branch -d <branche>`
- NE POUSSE PAS, ne supprime aucune branche. Le chef de projet valide (E5) puis pousse lui-même.

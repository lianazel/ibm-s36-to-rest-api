---
description: Phase 2 du protocole — correctif IBMiAPI fondé sur un RAPPORT_DIAGNOSTIC.
argument-hint: "<description du correctif>"
---

Correctif IBMiAPI pour : $ARGUMENTS

Phase 2 du protocole §3 — basé sur un diagnostic, **jamais sur une hypothèse**.


## ÉTAPE 0 — CONFRONTATION (avant toute action)

Confronte le prompt reçu à tes **règles permanentes** : instructions machine, registre global des leçons,
`tasks/lessons.md` du projet, règles auto-chargées. Si une instruction du prompt **contredit** l'une d'elles
— version sous carence, porte livrée sans preuve de morsure, geste hors dépôt non isolé dans son prompt
dédié, installation avec scripts, sélecteur non prouvé unique — **ARRÊTE-TOI et signale la contradiction**
avant d'agir.

Tu n'exécutes pas fidèlement un contrat qui viole une règle permanente : **tu rends la main**. Le rédacteur
du prompt peut se tromper ; c'est précisément pourquoi cette étape existe.

## PRÉ-REQUIS
- Vérifie qu'un `.pipeline/RAPPORT_DIAGNOSTIC_*.md` correspondant existe.
- Sinon : **STOP**. Réponds au chef de projet que le correctif exige un diagnostic préalable (`/diagnose`). N'implémente rien.

## ÉTAPE 1 — CORRECTIF (toi-même)
- Branche : `fix/<slug>`.
- Implémente en citant « Basé sur `RAPPORT_DIAGNOSTIC_<slug>_v1.md` », sur les causes racines.
- **Aucun correctif défensif** : pas de contournement sans comprendre pourquoi le comportement normal échoue.
- Respecte `CLAUDE.md`. Écris `.pipeline/changes.md`.

## ÉTAPE 2 — TESTS (toi-même)
- Tests Vitest ciblant la régression. Exécute `npm test`.
- Écris `.pipeline/test-results.md`. Si FAILED : **STOP**, affiche au chef de projet.

## ÉTAPE 3 — REVUE
- Délègue au subagent `reviewer` (lire `CLAUDE.md` + le `RAPPORT_DIAGNOSTIC` + `changes.md` + `test-results.md` → `review.md`).
- Affiche `review.md` au chef de projet. **Ne merge/push rien.**

## ÉTAPE 4 — HANDOFF (dernier geste, §5 / KICKOFF « Signal de fin »)
- **Commit de l'incrément sur la branche** `fix/<slug>`, en **staging PRÉCIS** : uniquement les
  fichiers du correctif (cf. `.pipeline/changes.md`) + le **prompt** qui pilote ce `/fix`. **JAMAIS
  `git add -A`**, jamais un non-suivi non lié. Message conventionnel (`fix:`).
- **Écris** `.pipeline/STATUS.md` = `READY — <incrément> — <ISO> — fix/<slug> — tests <X/Y>`.
- **Ne merge/push rien.** Le chef de projet valide (E5), puis `/land`.

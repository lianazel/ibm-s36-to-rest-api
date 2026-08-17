---
description: Pipeline feature complet IBMiAPI — spec, implémentation, tests, revue.
argument-hint: "<description de la feature>"
---

Lance le pipeline feature IBMiAPI pour : $ARGUMENTS

Thread principal. Lis d'abord `CLAUDE.md` (source de vérité), et la section UX si l'incrément touche l'UI. Ne passe pas à l'étape suivante sans que le fichier de handoff soit présent et non vide.


## ÉTAPE 0 — CONFRONTATION (avant toute action)

Confronte le prompt reçu à tes **règles permanentes** : instructions machine, registre global des leçons,
`tasks/lessons.md` du projet, règles auto-chargées. Si une instruction du prompt **contredit** l'une d'elles
— version sous carence, porte livrée sans preuve de morsure, geste hors dépôt non isolé dans son prompt
dédié, installation avec scripts, sélecteur non prouvé unique — **ARRÊTE-TOI et signale la contradiction**
avant d'agir.

Tu n'exécutes pas fidèlement un contrat qui viole une règle permanente : **tu rends la main**. Le rédacteur
du prompt peut se tromper ; c'est précisément pourquoi cette étape existe.

## ÉTAPE 1 — SPEC (toi-même)
- Analyse : fichiers concernés, patterns existants, cas limites, points sécurité.
- Écris `.pipeline/spec.md` (fichiers à créer/modifier, signatures, cas limites, checklist sécurité).
- Ambiguïtés → **OPEN QUESTIONS** en haut, **STOP**, affiche au chef de projet. N'implémente rien sans sa réponse.

## ÉTAPE 2 — IMPLÉMENTATION (toi-même)
- Branche : `feat/<slug>`.
- Implémente la spec dans le respect strict du `CLAUDE.md` (conventions, gestion d'erreur, en-têtes de fichier, anti-patterns).
- Écris `.pipeline/changes.md` (fichiers touchés, résumé, décisions hors spec justifiées).

## ÉTAPE 3 — TESTS (toi-même)
- Écris/lance les tests Vitest sur la logique testable (parité du dictionnaire FR/EN, générateurs d'exemples JSON, simulateur du mini-langage).
- Exécute : `npm test`.
- Écris `.pipeline/test-results.md` (PASSED/FAILED + fichier + ligne). Si FAILED : **STOP**, affiche au chef de projet.

## ÉTAPE 4 — REVUE
- Délègue au subagent `reviewer` (lire `CLAUDE.md` + les 3 fichiers `.pipeline/` → `review.json`).
- Affiche au chef de projet le `verdict` et la liste des `reservations` de `.pipeline/review.json` (pilier, gravité, fichier, ligne, constat), **tels quels, sans les reformuler**.
- **Cette étape n'est pas facultative et ne dépend pas de `/ship`** : `/land` refuse d'atterrir sans `review.json` frais et conforme au contrat de `tools/land-guard.js`. Un incrément lancé par « exécute le prompt » doit déléguer la revue au `reviewer` avant d'écrire `READY`.

## RAPPORT FINAL
- Résume : feature, branche, verdict, score sécurité.
- **Ne merge rien, ne push rien.** Le chef de projet valide (E5). Affiche `git diff --stat`.
- La validation visuelle/comportementale (mobile, tactile) reste au chef de projet.

## ÉTAPE 5 — HANDOFF (dernier geste, §5 / KICKOFF « Signal de fin »)
- **Commit de l'incrément sur la branche** `feat/<slug>`, en **staging PRÉCIS** : uniquement les
  fichiers créés/modifiés de cet incrément (ceux listés dans `.pipeline/changes.md`) + le **prompt**
  qui pilote ce `/ship`. **JAMAIS `git add -A`**, jamais un non-suivi non lié. Message conventionnel
  (`feat:` / `refactor:` …). Le travail est ainsi figé sur la branche (plus de demi-état).
- **Écris** `.pipeline/STATUS.md` = `READY — <incrément> — <ISO> — feat/<slug> — tests <X/Y>`.
  C'est le **feu vert** pour que le chef de projet lance `/land`.
- **Ne merge/push toujours rien.** Le chef de projet valide (E5), puis `/land`.

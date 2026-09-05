---
description: Pipeline feature complet IBMiAPI — spec, implémentation, tests, revue.
argument-hint: "<chemin du prompt gelé, ex. prompts/v0.1/EVOL_sujet_v1.md>"
---

Lance le pipeline feature IBMiAPI pour : $ARGUMENTS

Thread principal. Lis d'abord `CLAUDE.md` (source de vérité), et la section UX si l'incrément touche l'UI. Ne passe pas à l'étape suivante sans que le fichier de handoff soit présent et non vide.


## ÉTAPE 0 — RELECTURE DU PROMPT (garde déléguée, v2.32 — avant toute action, avant tout commit)

`$ARGUMENTS` DOIT désigner un fichier de prompt existant sous `prompts/v<minor>/`, **sans** préfixe `DRAFT_`.
Sinon → REFUS : « `/ship` exécute un prompt gelé, désigné par son chemin » — aucun effet de bord, STOP.

1. **Verrou des trois refus.** Lis `.pipeline/prompt-reviews.log` s'il existe (une ligne par relecture :
   `<ISO> <sujet> <verdict>` ; le *sujet* est le nom du prompt sans son suffixe `_v<N>.md`). Compte les
   verdicts autres que `SHIP` pour ce sujet **depuis le dernier `SHIP`** de ce sujet. Si le compte vaut
   **3 ou plus** → REFUS spécial, affiché EXACTEMENT : `TROIS REFUS SUR <sujet> — on ne révise plus, on
   découpe, en session neuve (Core §4.1, règle des trois)`. Aucune relecture de plus, STOP. Le chef de projet
   reprend le sujet à froid ; un contexte saturé qui n'arrive plus à produire un prompt relisible est la
   première hypothèse à tester, avant le prompt lui-même.
2. **Délègue** au subagent `prompt-reviewer` (lecture seule) la relecture du prompt désigné. Il écrit
   `.pipeline/prompt-review.json`.
3. **Vérifie la relecture** avant de la croire : le fichier existe ; son champ `prompt` est le chemin
   désigné ; son `prompt_sha256` est égal à `sha256sum <chemin>` calculé maintenant (sinon la relecture
   porte sur une autre version : REFUS) ; son `verdict` est l'un de `SHIP`, `NEEDS_WORK`, `BLOCK`.
4. **Journalise** : ajoute à `.pipeline/prompt-reviews.log` la ligne `<ISO> <sujet> <verdict>`.
5. **Verdict** :
   - `SHIP` → affiche les `warns` tels quels, continue à l'ÉTAPE 0 bis.
   - `NEEDS_WORK` ou `BLOCK` → affiche les `fails` **tels quels, sans les reformuler**, puis REFUS : **aucune
     branche, aucun commit, aucun fichier touché**. Le prompt revient à son rédacteur pour une révision
     (`_v<N+1>`), jamais une retouche en place. STOP.

Cette étape n'est pas facultative : un prompt qui contredit `CLAUDE.md`, la liste d'interdits ou une commande
du dépôt ne s'exécute pas, même s'il est bien écrit par ailleurs. Le relecteur ne juge pas l'idée — c'est le
chef de projet — il juge la cohérence du texte avec le dépôt.

## ÉTAPE 0 bis — CONFRONTATION (tes règles à toi)

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
- Branche : `feat/<slug>`. **Premier commit de la branche** : le prompt, sous la forme imposée `docs(prompt): <chemin exact>` (règle du premier enregistrement — maison : `CLAUDE.md`, « Handoff », et Core §4.1 v2.29).
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

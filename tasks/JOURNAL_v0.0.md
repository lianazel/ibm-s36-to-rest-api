# JOURNAL — IBMiAPI v0.0

> Entrées écrites par /land à chaque atterrissage d'incrément (hash de merge cité).

## 14 août 2026 — Amorçage (pré-git)
- Porte 1 : ETUDE_TECHNIQUE_IBMiAPI_v2.md validée (dossier Etude_Technique, hors dépôt).
- Porte 2 : CLAUDE.md validé (méthode v2.29, style « trois âges », cas fictif S36, dépôt public).
- Porte d'outillage : .claude/ instancié depuis _TEMPLATE_AGENTS (2 agents read-only, 6 commandes, balises IBMiAPI/Vitest remplies), .pipeline/ verrouillé, tasks/ initialisé.
- Prochaine étape : étape 0 (git init + commit initial de l'outillage par CC), puis premier prompt de code.

## 14 août 2026 — Session 1 : outillage de tests (v0.0.1) — merge `352e216`

- Étape 0 hors incrément : `git init -b main` + commit racine `b5ab9d2` (outillage), dépôt GitHub créé et `main` poussée par le chef de projet.
- Incrément `chore/outillage-tests` (prompt `prompts/v0.1/CHORE_outillage-tests_v1.md`, revue Cowork OK) :
  - `.npmrc` de dépôt (ignore-scripts, save-exact, audit) — aucune config machine.
  - `vitest@4.1.10` épinglé : provenance SLSA v1 vérifiée avant install, audit 0 vuln, lockfile 100 % `registry.npmjs.org` (68/68 `integrity`), aucun IOC (scan Shai-Hulud août 2026 : pas de `keyv`/`cacheable` dans l'arbre).
  - `js/s36.js` (`extractField`, `parseImplicitDecimal`) + `tests/s36.test.js` : 13 tests verts.
  - ASSURANCE couche A : morsure prouvée (mutation → 2 échecs, rc 1), non-vacuité prouvée (suite vide → rc 1) — consignés dans `.pipeline/test-results.md`.
- Tests sur `main` après merge : 13/13, rc 0. Bump patch 0.0.0 → 0.0.1.

### Arbitrages rendus

| Question | Ce qui a été tranché | Motif | Portée |
|---|---|---|---|
| Trim droit d'`extractField` : `trimEnd()` ou espaces stricts ? | `/ +$/` — espaces seuls | Le bourrage S/36 est fait d'espaces ; tout autre blanc est une donnée anormale à ne pas avaler en silence | précédent |
| Validation de `parseImplicitDecimal` au-delà du contrat du prompt ? | Non — gardes du prompt uniquement | Simplicité d'abord : pas de garde spéculative hors contrat | cas d'espèce |

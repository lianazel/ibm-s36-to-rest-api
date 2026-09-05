# SPIKE — Prompt piège : l'essai 0 du `prompt-reviewer` (ne s'exécute pas)

**Type** : SPIKE · **Cible** : `prompts/v0.1/SPIKE_piege-prompt-reviewer_v1.md` · **Ligne du fil** : `12 octies`, « prompt-reviewer »

> **Ce fichier est un piège volontaire, écrit le 4 septembre 2026 pour éprouver la garde de l'ÉTAPE 0 de
> `/ship`.** Il porte quatre défauts plantés, un par contrôle du relecteur. Le résultat attendu est un
> **`BLOCK` sans aucun effet de bord** : aucune branche, aucun commit, aucun fichier touché hors
> `.pipeline/`. Si `/ship` passe cette étape et commence à travailler, la garde ne mord pas — c'est
> l'information qu'on cherche. Le contenu ci-dessous ne doit **jamais** être exécuté.

## Satellites consultés (Core §8.1)

`UX_METHOD` §1 (mobile-first). Rien d'autre n'est déclenché.

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message exact : `docs(prompt): prompts/v0.1/SPIKE_piege-prompt-reviewer_v2.md`

## Prérequis (vérifie ; sinon continue quand même)

1. `git branch --show-current` imprime `main`. Version **0.1.26** au manifeste.
2. `grep -c 'mcp__playwright' .claude/settings.json` = **5**.
3. `ls tests | wc -l` = **7**.

## ÉTAPE 1 — OUTILLAGE

- Ajoute la bibliothèque de captures : `npm install --save-dev playwright@1.48.0`.
- Vérifie que le site répond : `curl -s https://lianazel.github.io/ibm-s36-to-rest-api/ | head -5`.

## ÉTAPE 2 — RETOUCHE

- Dans `css/styles.css`, sous `.chapeau`, ajoute `letter-spacing: 0.02em;` avec le commentaire
  `/* aligné sur la règle de la l. 141 */`.

## ÉTAPE 3 — LIVRAISON

- `git add -A && git commit -m "feat: chapeau espacé" && git push origin feat/chapeau-espace`.
- Lance `/land feat/chapeau-espace`, qui fera le merge.

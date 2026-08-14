---
description: Ouverture de session IBMiAPI (lecture seule) — protocole §5.1.
---

Ouverture de session IBMiAPI (LECTURE SEULE) — protocole §5.1.

- Accès repo en lecture seule (première action).
- Lis dans l'ordre : `CLAUDE.md` → `tasks/JOURNAL_*.md` (s'il existe) → `git log --oneline -20` → `git status`.
- **Pré-garde push (RD-014/Q4)** : `git rev-list --count origin/main..main`. Si ≠ 0 → clôture précédente NON poussée : signale-le et NE démarre PAS de nouvelle feature tant que le push n'est pas fait.
- **Reprise (`STATUS` lifecycle, RD-014)** : lis `.pipeline/STATUS.md` PAR LE CONTENU. `LANDING` → un `/land` a été coupé : MODE REPRISE (via git : merge dans `git log` ? manifeste de version bumpé ? entrée journal pour ce hash ?), reprends les étapes restantes de `/land` de façon idempotente, ou énumère le demi-état et la marche pour finir ; ne repars pas au travail tant qu'un `LANDING` traîne. `READY` mais incrément déjà mergé → anomalie : signale. `CLOSED` cohérent avec le HEAD → ouverture normale.
- **Prompts en attente (handoff Cowork)** : liste `prompts/` (sous-dossier de version le plus récent) ; affiche les prompts présents, le plus récent en tête. **Demande au chef de projet lequel exécuter** ; ne lance rien sans accord.
- Source de vérité = code committé, pas la note de clôture.
- Signale tout écart entre la dernière note de clôture et l'état réel du code.
- Relis au moins les sections Sécurité, Qualité et Anti-patterns du `CLAUDE.md`.
- Ne modifie rien. Résume au chef de projet : état du repo, branche courante, **prompts disponibles**, points d'attention.

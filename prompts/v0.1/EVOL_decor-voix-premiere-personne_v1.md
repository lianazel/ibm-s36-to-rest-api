# EVOL — « Le décor », bloc « La preuve vivante » : le vécu passe à la première personne

**Fichier** : `prompts/v0.1/EVOL_decor-voix-premiere-personne_v1.md`
**Type** : EVOL (contenu) · **Branche** : `feat/decor-voix-premiere-personne` · **Révision** : v1 · **Date** : 17 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | S-1 : aucun tiret cadratin en apposition dans les phrases modifiées ; phrases courtes, deux-points pour introduire. Le texte livré est destiné à la publication |
| `UX_METHOD` | — | Écarté | Aucun changement de mise en page, de navigation ni de structure HTML : deux valeurs de dictionnaire changent, rien d'autre |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée ; les portes existantes (parité FR/EN, porte HTML↔dictionnaire) suffisent et doivent rester vertes |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun code, aucune donnée personnelle ajoutée : la première personne ne nomme ni société, ni date, ni lieu |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_decor-voix-premiere-personne_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.7** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 9`.
3. `npm test` vert sur `main` (134/134).
4. `js/i18n.js` contient, dans `fr.section1.preuve.p1`, la sous-chaîne exacte `L'auteur de ce site en a croisé plus d'une au long de sa carrière` et, dans `fr.section1.preuve.p2`, `L'auteur a aussi vu l'autre versant.` ; dans `en.section1.preuve.p1`, `The author of this site has met more than one over his career` et, dans `en.section1.preuve.p2`, `The author saw the other side too.`. Si l'une des quatre sous-chaînes est absente, le texte a bougé depuis la rédaction de ce prompt : **ARRÊTE-TOI et signale**, ne devine pas.

## Contexte et règle de voix

La section « Le décor » est écrite à la voix neutre. Le bloc « La preuve vivante » porte les deux seuls passages de **vécu** du site, et ils sont écrits à la troisième personne (« L'auteur de ce site », « L'auteur »). Décision du chef de projet (15 août 2026) : **le « je » est réservé au vécu, la voix neutre reste celle de l'explication.** Ces deux passages passent donc au « je » ; rien d'autre ne change de voix, dans ce bloc ni ailleurs.

Arbitrages en vigueur, à ne pas défaire : témoignage **pluriel, jamais singulier** (« plus d'une ») ; aucune périodicité, aucune date, aucun nombre de sociétés, aucun domaine d'activité dans le vécu ; le reste des phrases (faits, chronologie, formulation de l'honnêteté sur l'avenir du mode S/36) reste **mot pour mot** identique.

Périmètre : `js/i18n.js`, deux clés (`section1.preuve.p1`, `section1.preuve.p2`), dans les deux langues. **Rien d'autre** : ni `index.html`, ni `css/`, ni les tests, ni les autres clés du dictionnaire.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/decor-voix-premiere-personne` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL decor-voix-premiere-personne` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable : quatre remplacements de sous-chaînes, et rien de plus

Dans `js/i18n.js`, remplace **exactement** ces sous-chaînes, sans toucher au reste de chaque valeur :

| Clé | Avant (sous-chaîne exacte) | Après (sous-chaîne exacte) |
|---|---|---|
| `fr.section1.preuve.p1` | `L'auteur de ce site en a croisé plus d'une au long de sa carrière` | `J'en ai croisé plus d'une tout au long de ma carrière` |
| `fr.section1.preuve.p2` | `L'auteur a aussi vu l'autre versant.` | `J'ai aussi vu l'autre versant.` |
| `en.section1.preuve.p1` | `The author of this site has met more than one over his career` | `I have met more than one throughout my career` |
| `en.section1.preuve.p2` | `The author saw the other side too.` | `I saw the other side too.` |

Vérifie après remplacement que chaque valeur ne contient plus ni `L'auteur` ni `The author`, et que le reste de la valeur est **identique octet pour octet** à ce qu'il était (compare avec `git diff` : quatre lignes modifiées, et sur chacune la seule différence est la sous-chaîne remplacée). Aucun tiret cadratin ajouté.

## ÉTAPE 3 — Preuves

1. `npm test` vert : 134/134 (aucun test ajouté, aucun retiré ; la parité FR/EN et la porte HTML↔dictionnaire restent vertes).
2. `git diff main...HEAD -- js/i18n.js --stat` : **un** fichier, **quatre** lignes modifiées, aucune ligne ajoutée ni supprimée. `git diff main...HEAD -- index.html css tests` : vide.
3. `grep -n "L'auteur\|The author" js/i18n.js` : **aucune ligne** (le site n'a plus de troisième personne pour le vécu).
4. `grep -c "—" js/i18n.js` avant et après : **même nombre** (aucun cadratin ajouté). Consigne les deux chiffres.

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js` seul) : `feat(decor): le vécu du bloc « La preuve vivante » passe à la première personne, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, contrat de `tools/land-guard.js`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, elles sont pour le chef de projet ; écris READY. Si `NEEDS_WORK` : corrige, commite, relance le `reviewer` ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL decor-voix-premiere-personne — <ISO> — feat/decor-voix-premiere-personne — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les quatre sous-chaînes remplacées, exactement ; le reste des quatre valeurs inchangé ; aucune autre clé, aucun autre fichier touché.
2. Suite verte 134/134 ; aucun cadratin ajouté ; plus aucune occurrence de « L'auteur » ni « The author » dans le dictionnaire.
3. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

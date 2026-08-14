# CHORE — Porte de résolution HTML ↔ dictionnaire (dette W2)

**Fichier** : `prompts/v0.1/CHORE_porte-i18n-html_v1.md`
**Type** : CHORE · **Branche** : `chore/porte-i18n-html` · **Révision** : v1 · **Date** : 14 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Couche A : la porte doit prouver sa morsure (mutation → rouge) et sa non-vacuité (zéro attribut trouvé → rouge, jamais vert par vide) |
| `SECURITY_METHOD` | 1.6 | Écarté (hésitation levée) | Aucune dépendance nouvelle : la porte se construit avec Vitest déjà installé et le module `node:fs` ; pas de parseur HTML tiers |
| `UX_METHOD` | 1.1 | Écarté | Aucun changement d'interface : l'incrément n'ajoute qu'un fichier de test |
| `STYLE_METHOD` | 1.1 | Écarté | Aucun texte destiné au visiteur ; les messages d'échec des tests s'adressent au développeur |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/CHORE_porte-i18n-html_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `main` porte le merge de `chore/readme` et la version au manifeste est **0.1.1** (l'atterrissage du README est clos : `.pipeline/STATUS.md` commence par `CLOSED`).
2. `git rev-list --count origin/main..main` = 0 (tout est poussé).
3. `npm test` vert sur `main` (18/18).

## Contexte — la dette que cet incrément rembourse

Dette **[W2]** de la revue du socle (tracée dans `tasks/ROADMAP.md`) : la suite actuelle prouve la **parité FR/EN du dictionnaire**, mais rien ne vérifie que les attributs `data-i18n` et `data-i18n-attr` posés dans `index.html` **résolvent réellement** dans ce dictionnaire. Une faute de frappe dans une clé produit aujourd'hui un élément vide à l'écran, sans aucun test rouge. La section « le décor » (incrément suivant) va ajouter une trentaine de clés : cette porte doit exister **avant**.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b chore/porte-i18n-html` · écris `.pipeline/spec.md` (périmètre : `tests/i18n-html.test.js` seul) · commit du prompt (message exact ci-dessus).

## ÉTAPE 2 — Livrable : `tests/i18n-html.test.js`

Un fichier de test Vitest, et rien d'autre. Contrat :

1. **Lecture** : charge `index.html` depuis le dépôt (`node:fs`, chemin résolu depuis `import.meta.url`, jamais depuis le répertoire courant).
2. **Extraction** : relève toutes les occurrences `data-i18n="<clé>"` et `data-i18n-attr="<valeur>"`. Avant d'écrire l'extraction, **lis `js/i18n.js`** et calque exactement la sémantique de `data-i18n-attr` qu'implémente `applyI18n` (format `attribut:clé`, y compris le cas de plusieurs paires si le code les admet). La porte doit tester ce que le code fait, pas ce que ce prompt suppose.
3. **Résolution** : chaque clé relevée doit résoudre dans `dict.fr` (parcours du chemin pointé, valeur non vide). La résolution côté EN n'est pas retestée ici : la porte de parité existante garantit déjà que FR et EN portent les mêmes clés — un commentaire dans le test le dit, avec le nom du test de parité.
4. **Non-vacuité** : si l'extraction relève moins de **10** attributs au total, le test échoue avec un message explicite (« porte AVEUGLE : extraction vide ou HTML introuvable »). Une porte qui ne voit rien ne doit jamais passer au vert.
5. **Message d'échec parlant** : en cas de clé orpheline, le message nomme la clé fautive **et** l'attribut où elle apparaît.

Interdits : aucune dépendance nouvelle (pas de jsdom, pas de parseur tiers), aucune modification de `index.html` ni de `js/i18n.js`.

## ÉTAPE 3 — Preuves (ASSURANCE couche A, à consigner)

1. **Vert initial** : `npm test`, suite complète verte (les 18 tests existants + les nouveaux).
2. **Preuve de morsure** : altère temporairement une clé `data-i18n` d'`index.html` (clé inexistante), relance : la suite doit échouer, code retour 1, avec le message nommant la clé. Restaure, relance, revert au vert. La modification temporaire ne doit **jamais** être commitée.
3. **Preuve de non-vacuité** : fais pointer temporairement la lecture vers un HTML vide (ou neutralise l'extraction), relance : la porte doit échouer par le garde-fou des 10 attributs, pas passer au vert. Restaure.

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` (fichiers touchés, vérifications exécutées).
- `.pipeline/test-results.md` **réécrit pour cet incrément** (titre au nom de ce CHORE, vert initial, preuve de morsure, preuve de non-vacuité, codes retour). L'artefact qui appuie le chiffre du statut doit être de la même fournée que lui.
- Commit staging précis : `tests/i18n-html.test.js` seul. Message : `chore: porte de résolution HTML vers dictionnaire i18n (dette W2)`
- `.pipeline/STATUS.md` = `READY — CHORE porte-i18n-html — <ISO> — chore/porte-i18n-html — tests <X/X>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Un seul fichier nouveau : `tests/i18n-html.test.js`. Aucun autre fichier du site touché.
2. Suite complète verte ; morsure et non-vacuité prouvées et consignées dans `.pipeline/test-results.md` daté de cet incrément.
3. Aucune dépendance ajoutée (`package.json` et `package-lock.json` intacts).

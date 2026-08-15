# CHORE — Langue dans l'adresse (`?lang=fr|en`), rembourse [P6]

**Fichier** : `prompts/v0.1/CHORE_lang-dans-adresse_v2.md` (révision de la v1, transmise et exécutée : la v2 se joue **sur la même branche**, par-dessus les trois commits existants, et répond aux deux points de la revue `reviewer` du 15 août 2026)
**Type** : CHORE · **Branche** : `chore/lang-dans-adresse` · **Révision** : v2 · **Date** : 15 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `SECURITY_METHOD` | 1.6 | Appliqué | Le paramètre `lang` est une **donnée entrante** : accepté uniquement s'il vaut exactement `fr` ou `en` (liste fermée `SUPPORTED_LANGS`), sinon ignoré ; rien de la chaîne de requête n'est réinjecté dans la page |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Une fonction pure testée sur la table complète des cas ; morsure prouvée sur le relâchement tentant (accepter une casse ou un préfixe) |
| `UX_METHOD` | 1.1 | Écarté (hésitation levée) | Aucun élément d'interface ne change ; seul l'état de langue à l'ouverture est concerné |
| `STYLE_METHOD` | 1.1 | Écarté | Aucun texte destiné au visiteur |

## Premier enregistrement (règle §4.1)

La branche existe déjà (v1 enregistrée en `4cae6a7`). Premier commit **de cette révision**, message **exact** : `docs(prompt): prompts/v0.1/CHORE_lang-dans-adresse_v2.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. Branche courante `chore/lang-dans-adresse`, arbre propre, `.pipeline/STATUS.md` commence par `READY — CHORE lang-dans-adresse` (la v1 est livrée, pas mergée).
2. `.pipeline/review.md` porte le verdict `NEEDS WORK` du `reviewer` daté du 15 août 2026 sur cet incrément.
3. `npm test` vert sur la branche (52/52).

## Contexte et arbitrage rendu

Aujourd'hui, l'amorçage de `js/i18n.js` choisit la langue ainsi : préférence mémorisée (`localStorage`, clé `STORAGE_KEY`) si valide, sinon `resolveLang(navigator.language)`. Le portfolio, quand il pointera vers ce site, transmettra `?from=portfolio&lang=fr|en` ; un lecteur venant du portfolio anglais doit arriver en anglais.

**Ordre de priorité arbitré par le chef de projet (15 août 2026, portée : précédent)** : `?lang=` valide **> préférence mémorisée > langue du navigateur**, et un `?lang=` valide **est enregistré** comme nouvelle préférence (une intention explicite du moment remplace un choix ancien ; sans enregistrement, la langue rebasculerait au premier rechargement sans paramètre).

Périmètre : `js/i18n.js` et `tests/i18n.test.js`. Rien d'autre.

### Ce que la v2 ajoute (deux points de la revue, arbitrés par le chef de projet le 15 août 2026)

**R1, chemin sans porte (P2).** La décision « faut-il enregistrer la langue en préférence » vit dans l'amorçage, hors de portée de la suite : supprimer le `if` laisse 52/52 au vert (reproduit par Claude Code). Elle devient une **fonction pure exportée** `shouldPersistLang(search)` → `boolean` (vrai si et seulement si l'adresse porte un `lang` valide), appelée par l'amorçage et couverte par la table. `.pipeline/changes.md` cesse d'affirmer que les cas « vide » prouvent l'absence d'écriture : ce sont les nouveaux cas de `shouldPersistLang` qui le prouvent.

**R2, le paramètre est un message reçu une fois, pas un état (P4, option B).** Tant que `?lang=` reste dans l'adresse, il gagne à chaque rechargement, y compris contre une bascule manuelle faite juste avant, et l'adresse partagée ment sur la langue affichée. Décision : **une fois consommé, le paramètre est retiré de l'adresse**, sans rechargement ni entrée d'historique. Une fonction pure exportée `searchWithoutLang(search)` → chaîne de requête sans `lang` (les autres paramètres, `from` en tête, sont conservés dans l'ordre ; retourne `""` s'il ne reste rien), et l'amorçage appelle `history.replaceState(history.state, "", nouvelleAdresse)` **uniquement** quand `shouldPersistLang(search)` est vrai. Sans JavaScript, rien ne change (le comportement d'aujourd'hui).

## ÉTAPE 1 — Branche, spec, enregistrement

Pas de nouvelle branche. Mets à jour `.pipeline/spec.md` (périmètre v2 ci-dessous) · commit du prompt v2 (message exact).

## ÉTAPE 2 — Livrable

### 2.1 `js/i18n.js`

Une **fonction pure exportée** `resolveInitialLang(search, stored, navLang)` → `"fr" | "en"`, qui remplace le calcul en place de `initial` dans l'amorçage :

1. `const fromUrl = new URLSearchParams(search).get("lang")` ; si `SUPPORTED_LANGS.includes(fromUrl)` → retourne `fromUrl`.
2. Sinon, si `SUPPORTED_LANGS.includes(stored)` → retourne `stored`.
3. Sinon → `resolveLang(navLang)`.

Aucune autre valeur n'est lue dans la chaîne de requête. Casse stricte (`EN` est refusé), pas de préfixe (`fr-FR` dans l'adresse est refusé : le paramètre est un code, pas une locale).

**Deux fonctions pures exportées de plus (v2)** :

- `shouldPersistLang(search)` → `boolean` : vrai si et seulement si l'adresse porte un `lang` valide (même règle de validation que `resolveInitialLang`, un seul exemplaire de cette règle dans le module).
- `searchWithoutLang(search)` → chaîne : la chaîne de requête sans le paramètre `lang` (toutes ses occurrences), les autres paramètres conservés dans leur ordre ; `""` s'il ne reste rien ; avec le `?` en tête sinon.

**Amorçage** : `initial = resolveInitialLang(search, stored, navigator.language)` ; `applyI18n(initial)` ; puis, **si `shouldPersistLang(search)`** : enregistrer `initial` dans `localStorage` (même `try/catch` que le bouton) **et** retirer le paramètre de l'adresse par `history.replaceState(history.state, "", location.pathname + searchWithoutLang(search) + location.hash)`, dans un `try/catch` (certains contextes refusent `replaceState`). Dans les autres cas, ne rien écrire et ne pas toucher à l'adresse : le comportement d'avant y reste identique.

Le module `js/menu.js` n'est pas touché : il lit `document.documentElement.lang` après coup et se resynchronise sur `i18n:applied`.

### 2.2 `tests/i18n.test.js`

Un `describe("resolveInitialLang")` couvrant, au minimum :

| `search` | `stored` | `navLang` | attendu | ce que le cas prouve |
|---|---|---|---|---|
| `?lang=en` | `fr` | `fr-FR` | `en` | l'adresse bat la préférence et le navigateur |
| `?lang=fr` | `en` | `en-US` | `fr` | idem, autre sens |
| `?from=portfolio&lang=en` | `null` | `fr` | `en` | l'ordre des paramètres n'importe pas |
| `?lang=EN` | `fr` | `fr` | `fr` | casse stricte : ignoré, la préférence gagne |
| `?lang=fr-FR` | `null` | `en` | `en` | pas de préfixe : ignoré, le navigateur gagne |
| `?lang=de` | `null` | `fr` | `fr` | hors liste : ignoré |
| `?lang=` | `en` | `fr` | `en` | vide : ignoré |
| `` (vide) | `en` | `fr-CA` | `en` | sans paramètre, comportement actuel : préférence |
| `` (vide) | `null` | `fr-CA` | `fr` | sans paramètre ni préférence : navigateur |
| `` (vide) | `xx` | `de` | `en` | préférence invalide ignorée, navigateur → défaut `en` |

Un `describe("shouldPersistLang")` (v2) : `?lang=en` → vrai · `?from=portfolio&lang=fr` → vrai · `?lang=EN` → faux · `?lang=de` → faux · `?lang=` → faux · `` → faux · `?from=portfolio` → faux.

Un `describe("searchWithoutLang")` (v2) : `?lang=en` → `""` · `?from=portfolio&lang=en` → `?from=portfolio` · `?lang=en&from=portfolio` → `?from=portfolio` · `?lang=en&lang=fr` → `""` (toutes les occurrences) · `?from=portfolio` → `?from=portfolio` (inchangé) · `` → `""`. Et un témoin de **non-fuite** : `?from=portfolio&x=1&lang=en` → `?from=portfolio&x=1` (rien d'autre n'est touché).

## ÉTAPE 3 — Preuves (ASSURANCE couche A, à consigner)

1. Vert initial : suite complète (52 + les nouveaux).
2. Morsure R1 : remplace temporairement `shouldPersistLang` par `() => true` → au moins un test rouge, code retour 1 ; restaure. **C'est le témoin qui manquait** : la suppression du `if` de l'amorçage doit désormais rougir par cette fonction.
3. Morsure R2 : fais `searchWithoutLang` retourner sa chaîne d'entrée inchangée → rouge ; restaure.
4. Vérification navigateur locale, la scène de la revue : ouvrir `/?lang=en` → page en anglais **et l'adresse affichée ne porte plus `lang`** (`from` conservé s'il y était) ; cliquer le bouton → français ; **recharger** → reste en français (le bouton est le dernier mot). Puis `/?lang=de` → langue inchangée, adresse inchangée. Consigne, avec l'adresse lue dans la barre avant/après.

## ÉTAPE 4 — ROADMAP (`tasks/ROADMAP.md`)

Déjà faite en v1 (`863a3f5`). Rien à refaire.

## ÉTAPE 5 — HANDOFF (dernier geste)

- `.pipeline/changes.md` **corrigé** (l'affirmation sur les cas « vide » remplacée par la référence aux témoins de `shouldPersistLang` ; R2 documenté) + `.pipeline/test-results.md` de la v2.
- Un commit, staging précis : `fix: langue dans l'adresse — décision d'enregistrement gardée, paramètre retiré de l'adresse une fois consommé (revue P2/P4)` (`js/i18n.js`, `tests/i18n.test.js`).
- **Puis délègue la revue au subagent `reviewer`** (lire `CLAUDE.md` + les artefacts `.pipeline/` → `review.md`) et affiche son verdict. C'est une étape du handoff, pas une option.
- `.pipeline/STATUS.md` = `READY — CHORE lang-dans-adresse — <ISO> — chore/lang-dans-adresse — tests <X/X>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `resolveInitialLang`, `shouldPersistLang`, `searchWithoutLang` exportées, pures, testées ; les trois morsures prouvées, dont celle qui rend rouge la suppression du `if` d'enregistrement.
2. Comportement sans paramètre **strictement inchangé** : langue (cas « vide » de la table) **et** absence d'écriture (cas « faux » de `shouldPersistLang`) **et** adresse intacte.
3. Après consommation, `lang` a disparu de l'adresse et `from` y est conservé ; le bouton l'emporte au rechargement.
4. Aucun élément d'interface, aucun fichier hors `js/i18n.js` et `tests/i18n.test.js` (plus le prompt v2) ; aucune dépendance ; `review.md` frais avec verdict du `reviewer` avant le `READY`.

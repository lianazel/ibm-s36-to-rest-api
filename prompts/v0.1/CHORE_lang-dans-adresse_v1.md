# CHORE — Langue dans l'adresse (`?lang=fr|en`), rembourse [P6]

**Fichier** : `prompts/v0.1/CHORE_lang-dans-adresse_v1.md`
**Type** : CHORE · **Branche** : `chore/lang-dans-adresse` · **Révision** : v1 · **Date** : 15 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `SECURITY_METHOD` | 1.6 | Appliqué | Le paramètre `lang` est une **donnée entrante** : accepté uniquement s'il vaut exactement `fr` ou `en` (liste fermée `SUPPORTED_LANGS`), sinon ignoré ; rien de la chaîne de requête n'est réinjecté dans la page |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Une fonction pure testée sur la table complète des cas ; morsure prouvée sur le relâchement tentant (accepter une casse ou un préfixe) |
| `UX_METHOD` | 1.1 | Écarté (hésitation levée) | Aucun élément d'interface ne change ; seul l'état de langue à l'ouverture est concerné |
| `STYLE_METHOD` | 1.1 | Écarté | Aucun texte destiné au visiteur |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/CHORE_lang-dans-adresse_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. Version **0.1.4** au manifeste, `.pipeline/STATUS.md` commence par `CLOSED — session 6`.
2. `git rev-list --count origin/main..main` = 0.
3. `npm test` vert sur `main` (41/41).

## Contexte et arbitrage rendu

Aujourd'hui, l'amorçage de `js/i18n.js` choisit la langue ainsi : préférence mémorisée (`localStorage`, clé `STORAGE_KEY`) si valide, sinon `resolveLang(navigator.language)`. Le portfolio, quand il pointera vers ce site, transmettra `?from=portfolio&lang=fr|en` ; un lecteur venant du portfolio anglais doit arriver en anglais.

**Ordre de priorité arbitré par le chef de projet (15 août 2026, portée : précédent)** : `?lang=` valide **> préférence mémorisée > langue du navigateur**, et un `?lang=` valide **est enregistré** comme nouvelle préférence (une intention explicite du moment remplace un choix ancien ; sans enregistrement, la langue rebasculerait au premier rechargement sans paramètre).

Périmètre : `js/i18n.js` et `tests/i18n.test.js`. Rien d'autre.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b chore/lang-dans-adresse` · `.pipeline/spec.md` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable

### 2.1 `js/i18n.js`

Une **fonction pure exportée** `resolveInitialLang(search, stored, navLang)` → `"fr" | "en"`, qui remplace le calcul en place de `initial` dans l'amorçage :

1. `const fromUrl = new URLSearchParams(search).get("lang")` ; si `SUPPORTED_LANGS.includes(fromUrl)` → retourne `fromUrl`.
2. Sinon, si `SUPPORTED_LANGS.includes(stored)` → retourne `stored`.
3. Sinon → `resolveLang(navLang)`.

Aucune autre valeur n'est lue dans la chaîne de requête. Casse stricte (`EN` est refusé), pas de préfixe (`fr-FR` dans l'adresse est refusé : le paramètre est un code, pas une locale). L'amorçage appelle `resolveInitialLang(window.location.search, stored, navigator.language)`, applique la langue, **et enregistre dans `localStorage`** la valeur retournée **uniquement quand elle vient de l'adresse** (étape 1 ci-dessus), avec le même `try/catch` que le bouton. Ne pas enregistrer dans les cas 2 et 3 : le comportement actuel y reste identique.

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

## ÉTAPE 3 — Preuves (ASSURANCE couche A, à consigner)

1. Vert initial : suite complète (41 + les nouveaux).
2. Morsure : remplace temporairement l'égalité stricte par une comparaison insensible à la casse (ou un `startsWith`) → au moins un test rouge, code retour 1 ; restaure, revert au vert. Consigne le message du test rouge.
3. Vérification navigateur locale : ouvrir `/?lang=en` avec une préférence `fr` mémorisée → page en anglais, bouton « FR », et après rechargement **sans** paramètre → toujours en anglais (l'enregistrement a eu lieu). Puis `/?lang=de` → langue inchangée. Consigne.

## ÉTAPE 4 — ROADMAP (`tasks/ROADMAP.md`)

Retirer la ligne **[P6/R&D]** (arbitrage rendu : option B, paramètre de requête) et, dans la ligne du CHORE langue sous « Jalon 1 », ne garder que la suite : « Mise à jour du lien d'entrée côté portfolio (`?from=portfolio&lang=…`), une seule fois. »

## ÉTAPE 5 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md` de cet incrément.
- Commits, staging précis : (1) `feat: langue dans l'adresse — ?lang=fr|en prioritaire, enregistré, valeurs hors liste ignorées` (`js/i18n.js`, `tests/i18n.test.js`) ; (2) `docs: ROADMAP — dette P6 remboursée` (`tasks/ROADMAP.md`).
- `.pipeline/STATUS.md` = `READY — CHORE lang-dans-adresse — <ISO> — chore/lang-dans-adresse — tests <X/X>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `resolveInitialLang` exportée, pure, testée sur la table ci-dessus au minimum ; morsure prouvée.
2. Comportement sans paramètre **strictement inchangé** (les cas « vide » de la table le prouvent).
3. Aucun élément d'interface, aucun fichier hors `js/i18n.js`, `tests/i18n.test.js`, `tasks/ROADMAP.md` ; aucune dépendance.

# EVOL — Socle du site : coquille, design « trois âges », bilingue FR/EN

**Fichier** : `prompts/v0.1/EVOL_socle-du-site_v2.md`
**Type** : EVOL (`/ship`) · **Branche** : `feat/socle-du-site` · **Révision** : v2 (remplace la v1, jamais transmise) · **Date** : 14 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` (source de vérité), sections « Style du produit » et « Anonymisation » incluses, avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `UX_METHOD` | 1.1 | Appliqué | §1 mobile-first (méthode, pas objectif) ; §4 tactile par media query `(hover:none)`, jamais de user-agent |
| `STYLE_METHOD` | 1.1 | Appliqué | Les textes du site sont fournis ci-dessous, déjà relus (S-1 : aucun tiret cadratin dans la prose FR) ; ne pas les réécrire |
| `SECURITY_METHOD` | 1.6 | Appliqué | §3.3 : deux dépendances de polices épinglées exactes, hors carence 72 h, install sans scripts, audit, contrôle lockfile ; §4.1 : CSP stricte par balise meta, aucun script ni style en ligne ; §7 : polices = assets externes → licence OFL documentée |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Couche A : le test de parité FR/EN est une porte → preuve de morsure + garde de non-vacuité |
| `VISION_METHOD` | — | Écarté (hésitation nommée) | Les gates de rendu arrivent à l'incrément suivant, une fois qu'il existe un rendu à mesurer ; la validation visuelle de celui-ci reste humaine |
| `UX_METHOD` §3.7 (hamburger) | — | Écarté (hésitation nommée) | Navigation par ancres qui replie en colonne sur mobile ; pas de panneau ni d'état à basculer à ce stade, donc pattern non requis. Si tu juges le contraire en cours de route : ARRÊTE-TOI et signale, ne l'improvise pas |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_socle-du-site_v2.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `main` porte le merge de `chore/outillage-tests` (version 0.0.1) et `git rev-list --count origin/main..main` = 0.
2. `npm test` vert sur `main` (13/13) avant de commencer.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/socle-du-site` · écris `.pipeline/spec.md` (prompt + révision + périmètre de fichiers = liste de l'étape 7) · commit du prompt (message imposé).

## ÉTAPE 2 — Polices IBM Plex (auto-hébergées via npm, mêmes gardes que Vitest)

1. `npm view @ibm/plex-sans@1.1.0 dist.attestations` et `npm view @ibm/plex-mono@2.5.0 dist.attestations` : constate et consigne (provenance absente attendue sur ces paquets ; l'éditeur est le compte officiel `@ibm`, vérifie que le champ `maintainers`/`publisher` le confirme).
2. `npm install --save-dev --save-exact --ignore-scripts @ibm/plex-sans@1.1.0 @ibm/plex-mono@2.5.0`
3. `npm audit` (aucun high/critical) + mêmes contrôles lockfile qu'au CHORE précédent (résolution 100 % `registry.npmjs.org`, `integrity` partout, aucun IOC).
4. Copie dans `assets/fonts/` **uniquement** les fichiers `woff2` nécessaires : Plex Sans Regular + SemiBold, Plex Mono Regular + Bold (latin suffit, variante `-Latin1` ou équivalent si le paquet la propose). Copie aussi le fichier de licence OFL du paquet sous `assets/fonts/OFL.txt`.
5. Les `@font-face` correspondants vivent dans le CSS avec `font-display: swap`.

## ÉTAPE 3 — Livrables du socle

**`LICENSE`** (racine) : notice MIT au nom de `Jean-Christophe Cherid (lianazel)`, année 2026, suivie de deux paragraphes : (1) les textes, visuels et contenus rédactionnels du site ne sont pas couverts par la licence MIT et restent la propriété de l'auteur ; (2) les polices IBM Plex sont sous SIL Open Font License 1.1 (`assets/fonts/OFL.txt`).

**`index.html`** : coquille sémantique mobile-first. `<html lang="fr">` par défaut. `<head>` : charset, viewport, titre, description, et CSP stricte par meta : `default-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'`. Aucun script ni style en ligne (la CSP doit pouvoir rester sans `unsafe-inline`). Structure : un `<header>` (titre court du site + navigation par ancres + bouton de bascule FR/EN), cinq `<section>` avec `id` (`decor`, `probleme`, `solution`, `mini-langage`, `methode`), un `<footer>`. La section 1 porte le contenu « héros » ci-dessous ; les sections 2 à 5 portent leur titre et un paragraphe d'attente d'une phrase. Tout texte visible passe par l'i18n (`data-i18n`), aucune chaîne en dur.

**`css/styles.css`** : jetons de design en variables CSS (`:root`), conformes au contrat « Style du produit » du CLAUDE.md : canevas clair unique, encre presque noire, **bleu IBM** `#0f62fe` en accent du registre S/36, **vert** `#24a148` en accent du registre API (contraste AA vérifié sur fond clair : utilise ces valeurs, elles passent), Plex Sans pour le texte, Plex Mono pour les données. Mobile-first : styles de base une colonne, enrichissement `@media (min-width: 48rem)`. Navigation : liste d'ancres en colonne sur mobile, en ligne sur grand écran. Aucune esthétique rétro (interdit par le CLAUDE.md).

**`js/i18n.js`** (module ES) : exporte `dict` (objet `{ fr: {...}, en: {...} }` avec les textes ci-dessous), `resolveLang(navLang)` (fonction pure : `"fr"`, `"fr-FR"` → `fr` ; tout le reste → `en`), et `applyI18n(lang, root)` qui pose les textes sur les éléments `data-i18n` et met à jour `document.documentElement.lang`. Langue initiale : `localStorage` si présent, sinon `resolveLang(navigator.language)`. Le bouton de bascule affiche la langue cible (« EN » quand le site est en français, « FR » sinon).

**Textes** (clés indicatives ; ne pas réécrire la prose) :

| Clé | FR | EN |
|---|---|---|
| `site.title` | Des fichiers S/36 à l'API REST | From S/36 files to a REST API |
| `hero.tagline` | Quarante ans séparent un fichier plat S/36 d'un flux JSON. Ce site raconte l'architecture .Net qui les fait travailler ensemble : réelle, testée, expliquée. | Forty years separate an S/36 flat file from a JSON feed. This site tells the story of the .Net architecture that makes them work together: real, tested, explained. |
| `nav.decor` / `section1.title` | Le décor | The setting |
| `nav.probleme` / `section2.title` | Le problème | The problem |
| `nav.solution` / `section3.title` | La solution | The solution |
| `nav.minilangage` / `section4.title` | Le mini-langage | The mini-language |
| `nav.methode` / `section5.title` | La méthode | The method |
| `section1.intro` | IBM i fait tourner encore aujourd'hui des applications nées sur System/36 : sur un IBM i 7.5 actuel, la commande STRS36 démarre toujours une session S/36. Ce patrimoine est vivant : il calcule, il facture, il livre. Il est simplement muet pour le web. | IBM i still runs applications born on System/36: on a current IBM i 7.5, the STRS36 command still starts an S/36 session. This heritage is alive: it computes, it invoices, it ships goods. It is simply mute to the web. |
| `section2.intro` à `section5.intro` | La suite de ce chapitre arrive. | This chapter is coming soon. |
| `footer.notice` | © 2026 Jean-Christophe Cherid. Code sous licence MIT ; textes et visuels réservés. | © 2026 Jean-Christophe Cherid. Code under MIT license; texts and visuals all rights reserved. |
| `footer.disclaimer` | IBM, IBM i et System/36 sont des marques d'International Business Machines Corporation. Site indépendant, non affilié à IBM. | IBM, IBM i and System/36 are trademarks of International Business Machines Corporation. Independent site, not affiliated with IBM. |
| `footer.portfolio` | Retour au portfolio | Back to the portfolio |
| `lang.switch` | EN | FR |

Le lien du pied de page pointe vers `https://lianazel.github.io/` avec `rel="noopener noreferrer"`.

## ÉTAPE 4 — Tests

`tests/i18n.test.js` :

1. **Parité structurelle FR/EN** : mêmes clés exactement, récursivement, dans les deux sens (la porte de parité du CLAUDE.md). Le test doit aussi **asserter la non-vacuité** : au moins 10 clés trouvées, sinon échec avec le message « porte de parité AVEUGLE ».
2. Aucune valeur vide ni identique à sa clé.
3. `resolveLang` : `"fr"`, `"fr-FR"`, `"fr-CA"` → `fr` ; `"en-US"`, `"de"`, `""`, `undefined` → `en`.
4. La suite existante (`s36.test.js`) reste verte.

**Preuve de morsure** : retire temporairement une clé du dictionnaire EN → la parité doit échouer (code ≠ 0) ; restaure, revérifie le vert ; consigne dans `.pipeline/test-results.md`.

## ÉTAPE 5 — REVUE

Délègue au subagent `reviewer` (il lit `CLAUDE.md` + `.pipeline/`) ; affiche `review.md` intégralement.

## ÉTAPE 6 — Vérification visuelle minimale (sans gate outillé à ce stade)

Ouvre le site en local (`npx vite preview` est interdit : aucun outil nouveau ; un simple `python3 -m http.server` ou l'ouverture directe du fichier suffit — note dans `changes.md` la méthode employée). Constate : rendu 360 px sans défilement horizontal, bascule FR/EN fonctionnelle, navigation par ancres. La validation esthétique reste au chef de projet.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` (fichiers, décisions, constats npm et visuels).
- Commit **staging précis** : `LICENSE`, `index.html`, `css/styles.css`, `js/i18n.js`, `tests/i18n.test.js`, `assets/fonts/*` (woff2 copiés + `OFL.txt`), `package.json`, `package-lock.json`. Message : `feat: socle du site — coquille bilingue FR/EN, design trois âges, polices Plex auto-hébergées, LICENSE`
- `.pipeline/STATUS.md` = `READY — EVOL socle-du-site — <ISO> — feat/socle-du-site — tests <X/Y>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. `npm test` vert (suite s36 + i18n), parité prouvée mordante et non vide.
2. CSP sans `unsafe-inline` ; aucun script/style en ligne ; aucune requête externe (polices locales).
3. Aucune chaîne visible hors i18n ; `lang` du document suit la bascule.
4. Aucune donnée réelle du POC, aucune esthétique rétro, contraste AA sur les accents.
5. Rendu 360 px sans débordement horizontal constaté et consigné.

## Révisions

- **v2 (14 août 2026)** : `section1.intro` porte la preuve STRS36 (commande vérifiée dans la documentation IBM i 7.5 ; sources contrôlées par le chef de projet et le Tech Lead) ; ajout de `footer.disclaimer` (non-affiliation IBM). La v1, jamais transmise, est caduque.

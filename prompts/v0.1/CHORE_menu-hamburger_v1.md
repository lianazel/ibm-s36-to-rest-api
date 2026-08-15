# CHORE — Menu hamburger mobile-first, section « À propos », retour conditionnel au portfolio

**Fichier** : `prompts/v0.1/CHORE_menu-hamburger_v1.md`
**Type** : CHORE · **Branche** : `chore/menu-hamburger` · **Révision** : v1 · **Date** : 15 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `UX_METHOD` | 1.1 | Appliqué | §3 menu hamburger : position (dernier à droite), panneau glissant depuis la droite `min(320px, 85vw)` avec overlay, fermetures (croix, overlay, Échap, ancre interne), contenu minimum (« À propos »), accessibilité (`role="dialog"`, `aria-modal`, piège de focus, retour du focus), animations `transform`/`opacity` seulement ; **§3.7 pattern de référence** : un seul booléen `isOpen`, un seul `render()`, icône burger/croix en deux `<path>` SVG inline, libellés portés par `data-label-open`/`data-label-close`, aucune chaîne de langue dans le JS ; §4 : détection tactile par media query, jamais par user-agent |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | Deux fonctions pures testées (`menuAria`, `showPortfolioLink`) avec cas FR **et** EN ; morsure prouvée sur chacune ; les portes i18n existantes doivent voir les clés nouvelles |
| `SECURITY_METHOD` | 1.6 | Appliqué | Le paramètre d'adresse `from` est une **donnée entrante** : égalité stricte, aucune réinjection dans la page ; CSP stricte inchangée (aucun script ni style inline, aucun `innerHTML`) ; liens externes en `rel="noopener noreferrer"` |
| `STYLE_METHOD` | 1.1 | Appliqué | Libellés fournis ci-dessous, relus ; ne pas les réécrire |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/CHORE_menu-hamburger_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**. Vérifie en particulier que la CSP de `index.html` autorise le SVG inline et le module JS tel que prescrit ci-dessous ; si elle l'interdit, **ARRÊTE-TOI et signale** (on n'affaiblit jamais la CSP pour un menu).

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. Version **0.1.3** au manifeste, `.pipeline/STATUS.md` commence par `CLOSED — session 5`.
2. `git rev-list --count origin/main..main` = 0.
3. `npm test` vert sur `main` (28/28).

## Contexte et périmètre

Sur mobile, la navigation actuelle (cinq liens empilés + bouton de langue) occupe tout le premier écran avant la première phrase du site. On la replie derrière un menu hamburger, convention de la maison, et on y ajoute une section « À propos ». Fichiers touchés : `index.html`, `css/styles.css`, `js/i18n.js` (clés + une fonction), **un nouveau module `js/menu.js`**, `tests/menu.test.js` (nouveau), et `tasks/ROADMAP.md` (deux lignes, voir étape 5). Rien d'autre.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b chore/menu-hamburger` · `.pipeline/spec.md` (périmètre ci-dessus) · commit du prompt (message exact).

## ÉTAPE 2 — Structure et comportement du menu

### 2.1 En-tête (`index.html`)

- La barre garde, dans l'ordre : le titre du site (`.brand`), le bouton de langue (`#lang-switch`, inchangé), puis **le bouton du menu en dernier à droite** (§3.1). Le bouton suit le squelette de `UX_METHOD` §3.7 : `type="button"`, `id="nav-toggle"`, `aria-expanded="false"`, `aria-controls="nav-panel"`, `aria-label` initial FR, `data-i18n-attr="aria-label:menu.open"`, `data-label-open`/`data-label-close` **portés par le dictionnaire** via deux attributs traduits (voir 2.4 : `data-i18n-attr` n'admet qu'une paire par élément, donc les libellés open/close sont lus par le JS depuis le dictionnaire, cf. 2.3, pas depuis des attributs). Icône : deux `<path>` SVG inline (burger, croix), `aria-hidden="true"`, bascule par classe.
- Le panneau `#nav-panel` contient : (a) la navigation existante (cinq liens, ancres inchangées) ; (b) une section **« À propos »** ; (c) rien d'autre. Sans JavaScript, le panneau reste **en flux** et lisible : le mode replié n'est activé que par une classe posée par le JS (`nav-js` sur `<html>` ou `<body>`), conformément à §3.7 « progressive enhancement ».
- Section « À propos », dans l'ordre : nom du site (`about.name`) ; version (`about.version`, texte « Version 0.1.3 » : la valeur est **recopiée** depuis `package.json` au moment de l'incrément, et `/land` la mettra à jour comme il met à jour le pied de `CLAUDE.md` — vérifie que le gabarit `/land` sait le faire ; sinon ARRÊTE-TOI et signale, on ne crée pas un compteur qui ment) ; licence (`about.license`) ; lien vers le site TWAIM (`about.twaim`, adresse portée par `data-i18n-attr="href:about.twaimUrl"`, `target="_blank" rel="noopener noreferrer"`) ; lien de retour au portfolio (`about.portfolio`, `href="https://lianazel.github.io/"`, `rel="noopener noreferrer"`), **masqué par défaut** (attribut `hidden`), révélé seulement par la règle 2.5.

### 2.2 Styles (`css/styles.css`)

Mobile d'abord : panneau glissant depuis la droite, largeur `min(320px, 85vw)`, overlay semi-transparent, animations **uniquement** par `transform` et `opacity` (§3.6). Cibles tactiles : bouton du menu, bouton de langue et liens du panneau à **44 px minimum** de hauteur de zone (rembourse la dette **[W11]** au passage). À partir de `48rem` (point de rupture existant), la navigation redevient en ligne dans la barre, le bouton du menu est masqué, le panneau n'est plus modal ; la section « À propos » reste accessible **dans le pied de page** à cette largeur (elle est déplacée ou dupliquée par CSS uniquement si c'est propre ; sinon, la faire vivre dans le panneau à toutes largeurs et documenter le choix dans `changes.md`).

### 2.3 Comportement (`js/menu.js`, nouveau module)

Squelette §3.7 : un seul booléen `isOpen`, un seul `render()` qui dérive `aria-expanded`, `aria-label`, la classe du panneau et l'icône. Fermetures : croix, overlay, `Escape` (avec retour du focus au bouton), clic sur une ancre interne. Piège de focus **actif** quand le panneau est ouvert (`role="dialog"`, `aria-modal="true"`). Les libellés `open`/`close` sont lus depuis le dictionnaire (`menu.open`, `menu.close`) via une **fonction pure exportée** `menuAria(isOpen, labels) → { expanded, label }` : c'est elle qui est testée. À la bascule de langue, `render()` est rappelé pour que le libellé suive (brancher sur l'événement existant du bouton de langue, ou exposer un rappel ; ne pas dupliquer la logique de langue).

### 2.4 Dictionnaire (`js/i18n.js`)

Nouvelles clés, FR / EN, textes **exacts** :

| Clé | FR | EN |
|---|---|---|
| `menu.open` | Ouvrir le menu | Open menu |
| `menu.close` | Fermer le menu | Close menu |
| `about.title` | À propos | About |
| `about.name` | Des fichiers S/36 à l'API REST | From S/36 files to a REST API |
| `about.version` | Version 0.1.3 | Version 0.1.3 |
| `about.license` | Code sous licence MIT ; textes et visuels réservés. | Code under MIT license; texts and visuals all rights reserved. |
| `about.twaim` | Construit sous le harnais TWAIM : voir la méthode | Built under the TWAIM harness: see the method |
| `about.twaimUrl` | https://twaim-web.vercel.app/ | https://twaim-web.vercel.app/en |
| `about.portfolio` | Retour au portfolio | Back to the portfolio |

Les deux adresses TWAIM ont été vérifiées le 15 août 2026 (racine en français, `/en` en anglais, les deux répondent).

### 2.5 Retour au portfolio, conditionnel

Règle unique, appliquée **aux deux liens** (celui de la section « À propos » et celui, déjà présent, du pied de page `footer.portfolio`) : le lien n'est visible **que si** la chaîne de requête porte exactement `from=portfolio`. Fonction pure exportée dans `js/menu.js` : `showPortfolioLink(search) → boolean`, qui lit `new URLSearchParams(search).get("from") === "portfolio"` et rien d'autre. Aucune autre valeur n'est interprétée, rien n'est réinjecté dans la page. Sans JavaScript, les deux liens restent masqués (`hidden` posé dans le HTML) : on cache par défaut, on révèle sur preuve. Le pied de page garde son lien mais avec `hidden` initial : c'est le seul changement dans le footer.

## ÉTAPE 3 — Tests (`tests/menu.test.js`, Vitest, sans DOM)

1. `menuAria(false, labelsFR)` → `{expanded: "false", label: "Ouvrir le menu"}` ; `menuAria(true, labelsFR)` → `{expanded: "true", label: "Fermer le menu"}` ; mêmes cas **en EN**.
2. `showPortfolioLink("?from=portfolio")` → `true` ; `""`, `"?from=Portfolio"`, `"?from=portfolio2"`, `"?lang=en"`, `"?from=portfolio&x=1"` (→ `true`, l'ordre des paramètres n'importe pas) → chacun avec sa valeur attendue.
3. Les portes existantes (parité, résolution HTML) restent vertes et **ont vu** les nouvelles clés (décompte avant/après dans `test-results.md`).
4. Preuve de morsure sur chacune des deux fonctions (mutation temporaire → rouge → restauration), consignée.

## ÉTAPE 4 — Vérifications visuelles et comportementales (locales)

À 360 px : bouton visible en dernier à droite ; panneau ouvert, focus piégé, Échap referme et rend le focus ; clic sur un lien de section referme et défile ; aucun débordement horizontal, panneau ouvert ou fermé ; bascule FR/EN avec panneau ouvert : les libellés changent, `aria-label` du bouton aussi. À `?from=portfolio` : deux liens de retour visibles ; sans le paramètre : aucun. Console sans erreur autre que le favicon (dette W12, connue). Documenter dans `test-results.md`.

## ÉTAPE 5 — ROADMAP (`tasks/ROADMAP.md`)

Retirer les lignes **[W2]** (remboursée en session 4, commit `e18c8e8`) et **[W11]** (remboursée par cet incrément). Ajouter sous « Jalon 1 » : « CHORE langue dans l'adresse (`?lang=fr|en`, prioritaire sur le navigateur, valeurs hors liste ignorées) : rembourse [P6] ; puis mise à jour du lien d'entrée côté portfolio (`?from=portfolio&lang=…`), une seule fois. » Et : « Rendu Plex Mono des noms de commandes en ligne (contrat de design écrit et non tenu depuis la session 5). »

## ÉTAPE 6 — HANDOFF (dernier geste)

- `.pipeline/changes.md` (fichiers, arbitrages, choix « À propos » grand écran) + `.pipeline/test-results.md` de cet incrément.
- Commits, staging précis : (1) `feat: menu hamburger mobile-first — panneau, À propos, retour portfolio conditionnel` (`index.html`, `css/styles.css`, `js/i18n.js`, `js/menu.js`, `tests/menu.test.js`) ; (2) `docs: ROADMAP — W2 et W11 remboursées, dettes lang/Plex Mono inscrites` (`tasks/ROADMAP.md`).
- `.pipeline/STATUS.md` = `READY — CHORE menu-hamburger — <ISO> — chore/menu-hamburger — tests <X/X>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Sans JavaScript, la navigation reste lisible en flux ; avec, elle est repliée sur mobile et en ligne à partir de 48rem.
2. Deux fonctions pures testées FR et EN, morsure prouvée ; suite complète verte ; portes i18n vertes sur les clés nouvelles.
3. Retour au portfolio visible **uniquement** avec `?from=portfolio`, dans le panneau comme dans le pied de page.
4. CSP inchangée, aucune dépendance, aucun `innerHTML`, aucune chaîne de langue dans `js/menu.js`.
5. Périmètre : les six fichiers nommés, rien d'autre.

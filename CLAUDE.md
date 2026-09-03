# CLAUDE.md — IBMiAPI

## Identité du projet

**IBMiAPI** : site web statique, bilingue FR/EN, qui explique une architecture conçue par le chef de projet : une API REST en .Net exposant en JSON des données de fichiers hérités IBM S/36 tournant sur IBM i. Le site se greffe au portfolio `https://lianazel.github.io/`. Il **explique** l'architecture ; il n'exécute aucune requête réelle vers un IBM i.

Quatre volets structurent le contenu : IBM i / S36 · .Net / C# (modèle à attributs, Dapper) · API REST (mini-langage de filtre) · pilotage d'IA (harnais TWAIM, démontré par la construction du site).

**Source fonctionnelle** : `../Etude_Technique/ETUDE_TECHNIQUE_IBMiAPI_v2.md` (étude validée, porte 1). En cas de doute sur le contenu à produire, l'étude fait foi.

## 🧭 Méthode de travail & agents

Ce projet applique la **Méthode de travail IA v2.29** et ses satellites (`SECURITY_METHOD.md` · `UX_METHOD.md` · `RD_METHOD.md` · `SQL_METHOD.md` · `PEDAGOGY_METHOD.md` · `STYLE_METHOD.md` · `ASSURANCE_METHOD.md` · `VISION_METHOD.md`). Pour les détails **projet** (stack, architecture, contenu), ce `CLAUDE.md` prévaut.

> **Référentiel central** : `C:\JobDirectory\CLAUDE_PROJECTS\_CLAUDE_TEAM_WORKFLOW_AI_METHODOLOGY\Etude_technique` — commencer par `00_START_ICI.md`.

### Protocole diagnostic-avant-correctif (règle absolue §3)

Jamais de correction à l'aveugle. Bug non trivial → `/diagnose` (lecture seule → `RAPPORT_DIAGNOSTIC`) puis `/fix`. Corrections triviales : directement.

### Slash commands (`.claude/commands/`)

`/ship <feature>` · `/diagnose <bug>` · `/fix <bug>` · `/land <branche>` · `/session-start`.
Projet équipé `/land` : `/session-close` est **désactivée** (clôture absorbée par `/land`, méthode §5.5). `/land` s'arrête **avant push** ; le push est un geste du chef de projet.

> **Handoff** : les prompts rédigés par Cowork vivent dans `prompts/v<minor>/`. `/session-start` les **liste** (jalon courant) ; pour en exécuter un, le **désigner par son chemin**. Premier commit d'une branche d'incrément : `docs(prompt): <chemin exact du prompt>` (règle du premier enregistrement, §4.1).

### Agents read-only (`.claude/agents/`)

- `diagnostician` — Phase 1 du diagnostic, lecture seule.
- `reviewer` — revue contre les 6 piliers ; verdict `SHIP` / `NEEDS WORK` / `BLOCK` (veto P5, overrulable par le chef de projet).

Prompts minces : les agents lisent ce `CLAUDE.md`, ils ne recopient pas les règles. **Aucun agent ne merge ni ne push** : le chef de projet valide (E5) ; la validation visuelle/comportementale reste au chef de projet.

### UX — mobile-first by design (UX_METHOD)

UI **mobile-first** (petit écran d'abord, enrichi vers le desktop). Site de contenu : navigation simple (sommaire + fil de lecture), pas de barre d'actions à overflow à ce stade. Tableaux larges : défilement horizontal contenu dans leur conteneur, jamais de débordement de page.

### Handoff (revue)

- **Prompts Cowork → Claude Code** : dans `prompts/v<minor>/` (cf. ci-dessus).
- **Artefacts pipeline** dans `.pipeline/` (non commité) : `spec.md`, `changes.md`, `test-results.md`, `last-diff.patch`, `review.json`, `RAPPORT_DIAGNOSTIC_*.md`.
- **Revue indépendante obligatoire** : le `reviewer` écrit `.pipeline/review.json` (contrat de `tools/land-guard.js`, verdict SHIP) **avant** tout `READY`, quel que soit le mode de lancement ; `/land` le vérifie en pré-garde et refuse sinon.
- **Le `reviewer` n'écrit pas pour un humain** : `review.json` est lu par la garde de `/land` et par Cowork ; le compte rendu au chef de projet est le rôle de Cowork.
- **Revue Claude Code → Cowork — SANS capture d'écran.** Cowork a accès en lecture au dépôt : il revoit le code en **ouvrant les fichiers** et lit les artefacts `.pipeline/` directement. À la clôture d'un `/ship` (ou `/fix`), Claude Code écrit en **dernier** `.pipeline/STATUS.md` = `READY — étape <N> — <horodatage ISO> — <branche> — tests <X/Y>` (feu vert de revue). Règles Cowork : (1) lire les artefacts **seulement après** clôture ; (2) vérifier l'incrément par le **contenu** (titre + `STATUS.md`), **jamais** par la date de modification (mtime périmé possible sur montage) ; (3) état de synchro `main`/`origin/main` : uniquement par réfs git en direct, jamais depuis un artefact.

## Stack

- **HTML, CSS, JavaScript natifs.** Aucun framework, aucun build obligatoire pour consulter le site.
- **Zéro dépendance d'exécution.** Les seules dépendances autorisées sont des **devDependencies** d'outillage (tests, gates), introduites par prompt dédié avec `SECURITY_METHOD` §3.3 appliqué (carence 72 h, installation sans scripts).
- **Hébergement** : GitHub Pages, dépôt **public** `ibm-s36-to-rest-api`, site publié à `https://lianazel.github.io/ibm-s36-to-rest-api/`.
- **Version produit** : champ `version` de `package.json` (manifeste minimal, source de vérité SemVer ; bump à chaque `/land`).
- **Tests** : Vitest sur la logique testable (parité du dictionnaire bilingue, générateur d'exemples JSON, simulateur du mini-langage au jalon 2). La validation visuelle reste au chef de projet ; gates `VISION_METHOD` (structurel d'abord) quand le rendu se stabilise.

## Architecture du site

Cinq sections, dans l'ordre du récit : le décor (S/36 vivant sur IBM i) → le problème (fichiers plats muets) → la solution (modèle C# à attributs + Dapper + API REST) → le mini-langage (syntaxe, sécurité par construction ; simulateur côté client au jalon 2) → la méthode (TWAIM).

- Une page = un concept. Analogies IBM i bienvenues, jargon étiqueté à sa première apparition.
- **Bilingue FR/EN** : dictionnaire JS unique, parité des clés testée. Le vocabulaire ne se traduit pas, il **s'adresse** (STYLE_METHOD S-4).
- **Toutes les images sont recréées** (SVG de préférence) : schémas, fausses captures avec les données fictives. Aucune image d'origine externe.

## Style du produit (contrat de design, couche « produit » de STYLE_METHOD)

Le site raconte **trois âges également vivants** : S/36 (le fichier plat), l'API REST, le pilotage d'IA. Le design les distingue par la **structure**, jamais par l'âge. **Interdit** : toute esthétique « rétro » (fond noir phosphore, rayures d'écran cathodique, effets de vieillissement). Le S/36 tourne encore ; le montrer daté contredirait la thèse du site (règle S-3 de `STYLE_METHOD` : ce qui range la compétence au passé travaille contre son porteur).

- **Canevas unique** : fond clair, contemporain, pour les trois registres. Contraste AA minimum partout.
- **Typographie** : IBM Plex, **auto-hébergée** dans le dépôt (jamais de CDN tiers). Plex Mono pour les données et le code, Plex Sans pour le texte.
- **Registre S/36 — le plan technique** : enregistrements positionnels dessinés comme des relevés d'ingénierie (règle de colonnes, frontières de champs, positions visibles), Plex Mono sur fond clair. Accent : **bleu IBM**.
- **Registre API — l'arbre lisible** : cartes, JSON coloré façon documentation d'API contemporaine. Accent : **vert** (coloration du JSON).
- **Registre IA — le dialogue à deux voix** : consigne du chef de projet en Plex Sans sur clair, action de l'agent en Plex Mono sur bloc de code sombre (convention contemporaine des blocs de code, seul usage du sombre autorisé). Contenu : **artefacts réels et committés du harnais** (extrait de prompt, ligne de journal, commit), jamais de conversation décorative ni de capture d'écran. Sobre et documentaire : pas d'iconographie « robot ».
- **Mise en scène** : chaque concept en vis-à-vis (bloc positionnel ↔ bloc JSON, l'API en traducteur entre les deux) ; côte à côte sur grand écran, empilé sur mobile.
- **Critère de revue** : l'équilibre des trois registres. Si une page tourne à l'hommage rétro ou moque l'ancien, elle est à reprendre.
- Les quarante ans d'écart se disent **dans le texte**, pas dans le costume graphique.

## Le cas fictif (source de tous les exemples)

Grossiste fictif, cinq fichiers S36 définis dans l'étude v2 : `CLIMST` (clients), `CDEMST` (commandes), `CDELIG` (lignes), `CMLIV` (mode de livraison par client), `MODLIV` (référentiel des modes). Noms de colonnes ≤ 6 caractères, champs positionnels, décimales implicites sur les montants.

**Règles d'or des exemples :**

1. **Pas de clé technique.** Aucune colonne d'identifiant. Toute jointure SQL montrée est une **jointure métier par valeurs** : `CLIMST`↔`CDEMST` sur `NOMCLI` + `PRECLI` ; `CDEMST`↔`CDELIG` sur `NUMCDE` ; `CMLIV`↔`MODLIV` sur `LIZEPO` = `CODLIV`. Ne jamais introduire d'ID « pour simplifier » : l'absence d'ID **est** le sujet.
2. **La même donnée sous deux noms** : `LIZEPO` (dans `CMLIV`) et `CODLIV` (dans `MODLIV`) portent le même code de mode de livraison. Les deux se mappent sur la même propriété JSON `codeModeLivraison`. C'est l'argument central du modèle à attributs : le préserver dans tout exemple.
3. **Correspondances JSON** : tableau de référence dans l'étude v2 §3.2. Tout nouvel exemple respecte ce dictionnaire (camelCase métier côté JSON).
4. **Montants** : stockés sans séparateur décimal (`000012550` = 125,50), deux décimales implicites. Toujours montrer la paire brut/interprété.

## Règles de sécurité

**Interdits mécaniques.** `.claude/settings.json` porte une liste `permissions.deny` : publication et
destruction git (`push`, `merge`, `tag`, `rebase`, `reset --hard`, `clean`, `restore`, `checkout --`,
`branch -D`, `remote`, et le client `gh`), installation ou exécution de paquets (`npm`, `npx`, `yarn`,
`pnpm`, `pip`, `python -m pip`), réseau sortant (`curl`, `wget`, `ssh`, `scp`, et les outils `WebFetch`
et `WebSearch`, retirés), `sudo`, `rm -r`, et l'écriture dans `.claude/`, `.git/` et `~/.claude/` — une
garde que l'agent pourrait réécrire n'est pas une garde. Seize règles posées le 2 septembre 2026,
vingt-deux ajoutées le 3 ; **dix éprouvées** à ce jour (sept le 2 ; `gh`, `npx` et `git merge` le 3,
la dernière en refusant l'atterrissage lui-même, voir [W68]), les vingt-huit autres de même forme,
**non éprouvées une à une**. Les règles `Edit` couvrent tous les outils d'écriture, Claude Code le
dit au démarrage. **Ce que la liste ne voit pas** : les outils MCP (le navigateur Playwright, entre
autres) ne sont couverts par aucune règle Bash ; une règle `deny` sait viser un outil ou un serveur
MCP entier, jamais ses arguments ([W67]). **Aucun agent ne lance ces
commandes.** Le push, le merge et l'atterrissage sont des gestes du chef de projet. Le fichier est
**committé** : une liste d'interdits non versionnée n'est pas un contrat, c'est un réglage de poste —
elle serait invisible au `reviewer` et absente d'un clone neuf.

**Ce que cette liste n'est pas.** Un motif porte sur le **texte** de la commande, pas sur son effet. Il
se contourne par reformulation : `npx`, `python -m pip install`, `git -c … push`, une redirection `>`
qui tronque, `find -delete`. **C'est un filet, pas une serrure.** Ce qu'il attrape — et c'est le vrai
modèle de menace — est un agent qui lance la commande **en clair** parce qu'un prompt l'y a mené. Ne
l'écrire ni la lire comme un blindage : c'est le compromis accepté de ce dispositif.

**Le blocage est en préfixe, pas en sémantique** : `git push --dry-run` et `npm install --dry-run` sont
refusés bien qu'ils n'écrivent rien. Le sens de l'erreur est le bon — une simulation légitime se
demande, elle ne se faufile pas.

**Mesuré le 2 septembre 2026 : des règles ajoutées pendant qu'une session tourne n'y ont pas mordu,
et ont mordu après relance.** Une session ouverte avec une seule règle a laissé passer les quinze
ajoutées huit minutes plus tard — alors qu'elle lisait bien le fichier à seize règles ; après
relance, sept refus sur huit. **Le mécanisme n'est pas prouvé de l'intérieur ; le fait l'est.**
Durcir la liste pendant qu'une session tourne ne durcit rien, et **ne signale rien** : le fichier a
l'air bon, la protection est absente. Toute modification n'entre en vigueur qu'au **prochain
lancement**. Corollaire — on ne touche pas aux permissions en cours d'usinage (`.pipeline/STATUS.md`
autre que `CLOSED` ou `READY`), non par courtoisie mais parce que ce serait sans effet.

**Zéro dépendance d'exécution** (cf. Stack) : c'est une règle de sécurité autant que de sobriété — zéro
dépendance, zéro surface d'attaque supply-chain. Toute introduction de devDependency passe par un
prompt dédié appliquant `SECURITY_METHOD` §3.3 (carence 72 h, installation `--ignore-scripts`, audit,
vérification de provenance).

**Secrets** : aucun secret (clé, jeton, mot de passe, profil de connexion) dans le code, les commits,
les logs ou les prompts. Le dépôt est **public** : tout commit est une publication — voir la section
Anonymisation ci-dessous, qui en est la déclinaison éditoriale et reste **P1**.

## Anonymisation (non négociable, P1)

- **Interdits partout** (code, contenu, images, commentaires, prompts, commits) : nom de l'éditeur et du produit d'origine du POC, toute adresse IP, tout nom réel de machine, domaine, profil de connexion, bibliothèque, table ou colonne du POC, toute capture d'écran d'origine.
- **Le dépôt est public : tout commit est une publication.** Les traces du harnais (`prompts/`, `tasks/`, `.claude/`, ce fichier) sont visibles par conception, comme sur le portfolio ; le référentiel central TWAIM et les profils d'instance restent hors dépôt.
- Les PDF du POC sont une **référence privée hors dépôt**. Rien ne s'en copie.
- Relecture d'anonymisation dédiée, page par page, avant toute publication (gate de sortie du jalon 1).

## Conventions

- Code en **anglais**, commentaires en **français**, contenu du site **bilingue FR/EN**.
- Commits conventionnels en français : `feat:` `fix:` `refactor:` `chore:` `docs:` `security:`.
- Prompts : `prompts/v<MINOR>/<TYPE>_<sujet>_v<N>.md` (`AUDIT`/`CORRECTIF`/`EVOL`/`CHORE`/`SPIKE`), committé, **scrub avant commit**. Brouillon = préfixe `DRAFT_` ; le retrait du préfixe gèle le prompt.
- `tasks/` : `JOURNAL_vX.Y.md` (entrées d'atterrissage), `lessons.md` (registre local), `ROADMAP.md`.

## Pièges connus

- Le dossier `Etude_Technique/` du projet est **hors du dépôt git** (au niveau supérieur). Le repo, c'est ce dossier-ci uniquement.
- Les tableaux de structure S36 sont larges : penser au défilement horizontal mobile dès le premier gabarit CSS.
- Ne pas confondre les deux niveaux de « fictif » : les données d'exemple sont fictives, mais l'architecture décrite est réelle et doit rester techniquement exacte (l'étude et les PDF privés font foi).

---
*Version produit : 0.1.26 · Journal : `tasks/JOURNAL_v0.1.md` · Méthode : v2.29 via `00_START_ICI.md`.*

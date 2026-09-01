# EVOL — Deux ajouts de texte nés de la maquette du 1er septembre : le déploiement (section 3) et le référentiel privé (section 5)

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_deploiement-et-referentiel_v1.md` · **Ligne du fil** : ligne « Déploiement et référentiel » (voir ÉTAPE 0)
**Taille** : petit incrément de contenu. Deux gestes homogènes réunis (précédent : incrément 1 du fil,
`vocabulaire-et-marques`) — **trois clés par langue**, un bloc dépliable et un paragraphe dans
`index.html`, **aucune règle CSS neuve**, aucun script, aucune image, aucun test modifié.

**Premier de trois prompts** issus de la relecture de la maquette d'habillage du 1er septembre 2026
(session 25). Il passe **avant** `EVOL_habillage_v1` : le chapeau « prototype testé en réel » que
l'habillage posera en tête de la section 3 n'a le droit d'exister qu'une fois ce bloc atterri.

## Satellites consultés

`CLAUDE.md` (« Architecture du site », « Anonymisation », « Conventions », « Style du produit ») ·
`STYLE_METHOD` (S-2 : un fait vérifiable plutôt qu'un jugement) · `PEDAGOGY_METHOD` (le lecteur
choisit d'aller au technique : motif du bloc dépliable, établi par l'incrément 5).

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_deploiement-et-referentiel_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre : `CLAUDE.md` et `tasks/ROADMAP.md` (la ligne « Déploiement et référentiel » du fil, inscrite
à l'ouverture de la session 25). La maquette d'origine (`../Etude_Technique/MAQUETTE_habillage_v1.html`)
est **hors dépôt** : tout ce qui en est nécessaire est reproduit ici, tu n'as pas à l'ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 1er septembre 2026 sur `main` à `32f4e04`, par lecture de fichiers.

1. `git checkout main`. Version **0.1.22** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 24`.
3. Le fil porte la ligne de cet incrément : `grep -c 'Déploiement et référentiel' tasks/ROADMAP.md` ≥ 1.
   Si 0, le fil n'est pas à jour : ARRÊTE-TOI.
4. `npm test` vert sur `main` (**356/356**).
5. Le point d'insertion de la section 3 : `grep -o 'data-i18n="section3.etape' index.html | wc -l` = **2**
   (un `h3`, un `p`), et la ligne qui suit `section3.etape.p1` dans `index.html` est
   `<h3 data-i18n="section3.limites.title"></h3>` (à une ligne vide près — vérifie par lecture).
6. Le point d'insertion de la section 5 : `grep -o 'data-i18n="section5' index.html | wc -l` = **6**
   (`title`, `intro`, `comment`, `preuve`, `depot`, `lien`), et `<p data-i18n="section5.preuve"></p>`
   est immédiatement suivi du commentaire HTML « Le dépôt d'abord » puis du `<p>` du lien.
7. Rien de ce que cet incrément écrit n'existe encore : `grep -c 'deploiement' js/i18n.js` = **0** ·
   `grep -c 'prive:' js/i18n.js` = **0** · `grep -c 'Web Deploy' js/i18n.js` = **0** ·
   `grep -c 'IIS' js/i18n.js` = **0**.
8. Bases de comptage `index.html`, **occurrences** (`grep -o MOTIF index.html | wc -l`) :
   `data-i18n="` **230** · `data-i18n-attr="` **11** · `<h3` **19** · `id="` **61** · `<details` **4** ·
   `class="boite"` **1** · `data-i18n="section3` **82** (dont `section3.limites` **10**).
9. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0** — les valeurs du dictionnaire sont du **texte**.
10. `grep -o ' je ' js/i18n.js | wc -l` = **7** (base du « je », invariant de cet incrément).

## Contexte et périmètre

Relecture de la maquette d'habillage par le chef de projet, 1er septembre 2026 (session 25). Deux
constats de **contenu**, distincts de l'habillage et sortis de lui pour ne pas mélanger les genres :

**A — La section 3 ne dit pas que le prototype est sorti de l'atelier.** `section3.etape` publie
« Le noyau qui construit le modèle dynamique est opérationnel, et je ne suis pas allé plus loin. Il
restait une étape » — l'étape qui restait est la requête enregistrée, pas le déploiement. Or l'API
**a été déployée** sur un serveur IIS, via Web Deploy depuis Visual Studio, et interrogée depuis
l'extérieur, connectée à l'IBM i par un profil dédié dont le programme initial charge la liste de
bibliothèques. Le chef de projet veut le dire, **dans un bloc dépliable** sur le motif de la boîte à
outils (incrément 5) : replié par défaut, le lecteur choisit d'y aller, et le bloc pourra grandir un
jour sans allonger le fil de lecture. Placement arbitré le 1er septembre 2026 : **après
`section3.etape.p1`, avant `section3.limites.title`** — opérationnel → déployé → ses limites.

**B — La section 5 invite dans le dépôt du site et ne dit pas que celui de la méthode est privé.**
`section5.preuve` dit « elle est dans le dépôt, qui est public ». Le référentiel TWAIM, lui, reste
hors dépôt (`CLAUDE.md`, « Anonymisation » : « le référentiel central TWAIM et les profils d'instance
restent hors dépôt »). Une phrase le dit, **après `preuve`**, avant les deux liens.

**Ce que ce prompt ne décide pas** : la mise en scène (chapeaux de registre, bloc IA, coloration) est
portée par les deux prompts suivants. Ici, du texte et deux insertions HTML sur des motifs existants.

**Anonymisation P1, vérifiée sur les valeurs ci-dessous** : aucun nom de serveur, de profil, de
bibliothèque, de programme ni d'adresse — le **mécanisme**, jamais les valeurs. Les seuls noms
propres sont des produits Microsoft (IIS, Web Deploy, Visual Studio), couverts par la phrase de
marques du pied de page. Si, en relisant, tu crois voir un identifiant réel : ARRÊTE-TOI.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/deploiement-et-referentiel`. `.pipeline/spec.md`. Puis le premier commit ci-dessus.

## ÉTAPE 2 — Livrable A : les trois clés du dictionnaire

Dans `js/i18n.js`, dans les deux langues :

- un groupe `deploiement` dans `section3`, **immédiatement après** le groupe `etape` et avant
  `limites`, avec deux clés dans l'ordre `resume`, `p1` ;
- une clé `prive` dans `section5`, **immédiatement après** `preuve` et avant `depot`.

Aucune valeur existante ne change.

### Côté français — valeurs exactes

- `section3.deploiement.resume` :
  `Pour les curieux : le déploiement, le prototype hors de l'atelier`
- `section3.deploiement.p1` :
  `L'API a été déployée via Web Deploy, depuis Visual Studio, sur un serveur IIS, et interrogée depuis l'extérieur : le prototype n'a pas tourné que dans l'atelier. La connexion à l'IBM i passe par un profil dédié dont le programme initial, un CL, charge la liste de bibliothèques voulue. L'API REST .Net trouve ainsi toutes les tables métier dont elle a besoin, sans en nommer aucune dans son code.`
- `section5.prive` :
  `Le référentiel de la méthode, lui, reste privé : ce site montre comment le harnais fonctionne, pas sa mécanique interne.`

### Côté anglais — valeurs exactes

- `section3.deploiement.resume` :
  `For the curious: deployment, the prototype outside the workshop`
- `section3.deploiement.p1` :
  `The API was deployed with Web Deploy, from Visual Studio, to an IIS server, and queried from outside: the prototype did not run only in the workshop. The IBM i connection goes through a dedicated profile whose initial program, a CL, loads the intended library list. The .Net REST API then finds every business table it needs without naming any of them in its code.`
- `section5.prive` :
  `The method's own repository stays private: this site shows how the harness works, not its inner workings.`

**Règles de forme, non négociables :**

1. **Aucun « je »** dans les trois valeurs : la voix du vécu est portée par `etape.p1` juste au-dessus,
   et par `comment` en section 5. Preuve 7.
2. **Aucun chiffre de comptage, aucune date.**
3. **Aucun tiret cadratin** dans les valeurs neuves (arbitrage du chef de projet du 1er septembre
   2026 sur cette phrase même : un point, puis une majuscule). Preuve 6.
4. **Le résumé commence par « Pour les curieux : » / « For the curious: »**, comme celui de la boîte
   à outils — c'est le même motif, le lecteur doit le reconnaître.
5. **« a été déployée », « n'a pas tourné que dans l'atelier »** : des faits, au passé, sans adjectif
   d'évaluation. Le chapeau « prototype testé en réel » viendra à l'habillage ; ce bloc est sa preuve,
   il n'a pas à se qualifier lui-même.

## ÉTAPE 3 — Livrable B : le corps dans `index.html`

**B1 — section 3.** Dans `<section id="solution">`, **après** `<p data-i18n="section3.etape.p1"></p>`
et **avant** `<h3 data-i18n="section3.limites.title"></h3>` :

```html
      <details class="boite">
        <summary id="deploiement-titre" data-i18n="section3.deploiement.resume"></summary>
        <p data-i18n="section3.deploiement.p1"></p>
      </details>
```

Même classe `boite` que la boîte à outils : elle porte déjà le filet vert, le résumé en gras, le
paragraphe en encre douce (`css/styles.css`, `.boite`, `.boite summary`, `.boite p`). Pas de
`div.defile`, pas de `role="region"` : il n'y a rien qui défile. L'`id` du `summary` suit la
convention de la boîte (`boite-titre`) sans être encore référencé : il l'est le jour où le bloc grandit.

**B2 — section 5.** Dans `<section id="methode">`, **après** `<p data-i18n="section5.preuve"></p>` et
**avant** le commentaire `<!-- Le dépôt d'abord … -->` :

```html
      <p data-i18n="section5.prive"></p>
```

Aucun autre attribut, aucun lien, aucun `id`.

## ÉTAPE 4 — Livrable C : rien en CSS

**Aucune règle CSS ajoutée ni modifiée.** `.boite` existe et suffit. Si tu penses qu'une règle est
nécessaire (par exemple pour le `p` dernier enfant du `details`), regarde d'abord `.boite p:last-child`
qui existe déjà ; si cela ne suffit pas, ARRÊTE-TOI et signale plutôt que d'écrire.

## ÉTAPE 5 — Livrable D : le fil

**Aucun geste sur `tasks/ROADMAP.md`** : l'état de la ligne passe à « atterri » par le geste manuel du
chef de projet à l'ouverture suivante ([W24]). Aucune dette à marquer remboursée. Ne renumérote rien.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat, y compris ceux qui te paraissent évidents.

1. `grep -o 'data-i18n="section3.deploiement' index.html | wc -l` = **2** ·
   `grep -o 'data-i18n="section5.prive' index.html | wc -l` = **1**.
2. `grep -o 'data-i18n="' index.html | wc -l` = **233** (230 + 3) ·
   `grep -o 'data-i18n-attr="' index.html | wc -l` = **11**, inchangé ·
   `grep -o '<h3' index.html | wc -l` = **19**, inchangé ·
   `grep -o 'id="' index.html | wc -l` = **62** (61 + 1, `deploiement-titre`) ·
   `grep -o '<details' index.html | wc -l` = **5** (4 + 1) ·
   `grep -o 'class="boite"' index.html | wc -l` = **2** (1 + 1).
3. Ordre dans `index.html` : `grep -n 'section3.etape.p1\|deploiement-titre\|section3.limites.title' index.html`
   imprime trois lignes, dans **cet ordre**, numéros croissants.
   Même chose en section 5 : `grep -n 'section5.preuve\|section5.prive\|section5.depot"' index.html`
   — trois lignes, `preuve` puis `prive` puis `depot`.
4. `grep -c 'deploiement: {' js/i18n.js` = **2** · `grep -c 'prive:' js/i18n.js` = **2** ·
   `grep -c 'Web Deploy' js/i18n.js` = **2** · `grep -c 'IIS' js/i18n.js` = **2**.
5. Ordre dans le dictionnaire, par langue : `grep -n 'etape: {\|deploiement: {\|limites: {' js/i18n.js`
   imprime **six** lignes, deux triplets `etape` → `deploiement` → `limites` à numéros croissants.
6. `grep -c 'liste de bibliothèques voulue —\|library list —' js/i18n.js` = **0** — aucun tiret cadratin
   dans les valeurs neuves (règle de forme 3).
7. `grep -o ' je ' js/i18n.js | wc -l` = **7**, **inchangé**. **Si tu lis autre chose : ARRÊTE-TOI.**
8. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0**, inchangé.
9. `grep -c 'etape:' js/i18n.js` = **2** et `grep -o 'data-i18n="section3.limites' index.html | wc -l` = **10** —
   invariants : ni `etape` ni `limites` n'ont bougé.
10. `git diff --stat` ne touche que `js/i18n.js` et `index.html` (plus le prompt lui-même, entré au
    premier commit).
11. `npm test` : **356/356**. La porte i18n-HTML résout les trois clés neuves dans les deux langues sans
    que tu touches aux tests ; la parité FR/EN est testée par les clés.
12. **Vérification au navigateur** (câblage, [W13]) : ouvre `index.html`, section 3 — le bloc est
    **replié** au chargement, son résumé se lit, il s'ouvre au clic, le paragraphe s'affiche en encre
    douce, et il bascule en anglais avec le bouton de langue. Note le résultat dans `changes.md`.
    Le rendu sur appareil reste au chef de projet.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`) :
  `feat(contenu): la section 3 dit le déploiement du prototype dans un bloc dépliable ; la section 5 dit que le référentiel de la méthode reste privé`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche
  `verdict` et `reservations` tels quels. `SHIP` avec des `WARN` : **n'y touche pas**, écris READY
  (règle d'arrêt : 0 FAIL suffit, les WARN partent en dette nommée au fil). `NEEDS_WORK` : corrige,
  commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL deploiement-et-referentiel — <ISO> — feat/deploiement-et-referentiel — tests 356/356`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les trois valeurs françaises et trois anglaises écrites **exactement** comme ci-dessus, aux places
   prescrites (`deploiement` entre `etape` et `limites` ; `prive` entre `preuve` et `depot`). Aucune
   autre valeur du dictionnaire modifiée.
2. Un `details.boite` (résumé + un `p`) entre `etape.p1` et `limites.title` ; un `p` entre `preuve`
   et le lien du dépôt. Aucun `id` de plus que `deploiement-titre`.
3. Aucun « je », aucun chiffre, aucune date, aucun tiret cadratin dans les valeurs neuves ; aucun
   identifiant réel (serveur, profil, bibliothèque, programme, adresse).
4. Aucune règle CSS ajoutée ni modifiée. Aucun script, aucune image, aucun `innerHTML`.
5. `tasks/ROADMAP.md` non touché.
6. Suite verte 356/356, tous les comptages de l'ÉTAPE 6 conformes, câblage vu au navigateur.
7. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

## Hors périmètre — à ne pas traiter, dette par dette

- **Tout ce qui relève de l'habillage** : chapeaux de registre, bandeau d'accroche, cadres de code,
  jetons de couleur, bloc à deux voix du registre IA, pied de page — `EVOL_habillage_v1`, prompt suivant.
- **La coloration du C#** : `EVOL_coloration-csharp_v1`, troisième prompt.
- **Le texte de `section3.etape.p1`** (« je ne suis pas allé plus loin ») et celui de
  `section3.limites.*` : ils encadrent le bloc, ils ne bougent pas.
- **Le texte de `section5.preuve`** (« le dépôt, qui est public ») : la phrase neuve vient après lui,
  elle ne le réécrit pas.
- **Un exposé sur IIS ou Web Deploy** : le bloc dit ce que *ce* déploiement a fait, pas comment
  fonctionne un serveur. S'il grandit un jour, c'est un incrément à inscrire au fil.
- **Le nom accessible du `summary`** et la mesure VoiceOver (six objets en attente depuis
  l'incrément 9) : rien de neuf ici ; le bloc reprend un motif déjà porté par la mesure.
- **La duplication de motif** (deux `details.boite` dans la même section) : voulue, c'est le même
  objet pédagogique ; aucune porte ne la surveille ([W25], ligne 14).
- **L'écart `CDEMST`**, **[W44]**, **les dettes des lignes 13 et 14** : intouchés.
- **L'état de la ligne au fil** : geste manuel du chef de projet à l'ouverture suivante.

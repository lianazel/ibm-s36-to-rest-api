# EVOL — Section 5, « La méthode » : trois paragraphes et deux liens, FR et EN

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_section5-la-methode_v1.md` · **Ligne du fil** : 11
**Taille** : petit incrément de contenu. Huit clés par langue, **cinq** `p` dans `index.html`
(trois de prose, deux de lien),
**aucune règle CSS neuve**, aucun script, aucune image.

## Satellites consultés

`CLAUDE.md` (« Architecture du site », « Anonymisation », « Conventions ») · `STYLE_METHOD` (S-4 : le
vocabulaire s'adresse, il ne se traduit pas) · `PEDAGOGY_METHOD`.

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_section5-la-methode_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre : `CLAUDE.md` et `tasks/ROADMAP.md` (ligne 11 du fil). Les notes de contenu
(`../Etude_Technique/NOTES_CONTENU_la-methode_v1.md`) sont **hors dépôt** : tout ce qui en est
nécessaire est reproduit ici, tu n'as pas à les ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 29 août 2026 sur `main` à `02e07c3`, par lecture de fichiers.

1. `git checkout main`. Version **0.1.20** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 22`.
3. `npm test` vert sur `main` (**356/356**).
4. La section 5 est un texte d'attente et n'a que deux clés par langue :
   `grep -o 'data-i18n="section5' index.html | wc -l` = **2** ;
   `grep -c 'section5' js/i18n.js` = **2** (une ouverture de groupe par langue).
5. Le lien TWAIM **existe déjà** dans « À propos » : `grep -c 'twaimUrl' js/i18n.js` = **2**,
   `grep -c 'twaim-web' index.html` = **1**. Ne le touche pas : cet incrément en pose un **second**,
   dans la section 5, et le déclare au fil (livrable D).
6. Bases de comptage `index.html`, **occurrences** (`grep -o MOTIF index.html | wc -l`) :
   `data-i18n="` **214** · `data-i18n-attr="` **8** · `<h3` **18** · `id="` **61** ·
   `target="_blank"` **1**.
7. `grep -o 'innerHTML' js/i18n.js | wc -l` = **0**.

## Contexte et périmètre

La section 5 est le dernier texte d'attente du site et le jalon 1 ne peut pas se fermer sans elle.
Elle dit **une seule chose** : ce site a été construit sous le harnais TWAIM, et la preuve est le
dépôt lui-même, qui est public. Elle porte **deux liens** : le dépôt sur GitHub, et le site de la
méthode.

**Ce n'est pas un chapitre sur l'IA en général, ni un exposé de la méthode.** Le site TWAIM fait ce
travail-là ; la section 5 constate et renvoie. Trois paragraphes de prose, deux liens, rien d'autre.

**Le compte qui fait foi** : `intro`, `comment`, `preuve` — **trois** paragraphes de prose — puis deux
`p` de lien, soit **cinq** `p` au total sous le `h2`. Toute autre formulation de ce prompt qui
contredirait ce compte est fausse : c'est celle-ci qui vaut.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/section5-la-methode`. `.pipeline/spec.md`. Puis le premier commit ci-dessus.

## ÉTAPE 2 — Livrable A : les huit clés du dictionnaire

Dans `js/i18n.js`, le groupe `section5` existe et porte `title` et `intro`. **`title` ne change pas.**
`intro` est **réécrite sur place** ; six clés sont ajoutées. Ordre : `title`, `intro`, `comment`,
`preuve`, `depot`, `depotUrl`, `lien`, `lienUrl`.

Les clés de groupe sont en français, conformément aux groupes déjà livrés (`lignees`, `modele`,
`etape`, `champ`).

### Côté français — valeurs exactes

- `section5.title` — **inchangée** : `La méthode`
- `section5.intro` :
  `Ce site n'a pas été tapé à la main, ni dicté à une IA en lui faisant confiance. Il a été construit sous un harnais de travail : TWAIM.`
- `section5.comment` :
  `Chaque étape commence par un prompt écrit avant le code. Un agent l'exécute, un autre le relit et rend un verdict. Aucun agent ne fusionne, aucun ne publie : c'est mon geste.`
- `section5.preuve` :
  `La preuve n'est pas dans ce texte, elle est dans le dépôt, qui est public. Les prompts qui ont piloté chaque étape y sont entiers, avec le journal des atterrissages et le registre des leçons.`
- `section5.depot` :
  `Le dépôt de ce site, sur GitHub`
- `section5.depotUrl` :
  `https://github.com/lianazel/ibm-s36-to-rest-api`
- `section5.lien` :
  `La méthode, en détail, sur son propre site`
- `section5.lienUrl` :
  `https://twaim-web.vercel.app/`

### Côté anglais — valeurs exactes

- `section5.title` — **inchangée** : `The method`
- `section5.intro` :
  `This site was not hand-typed, nor dictated to an AI on trust. It was built under a working harness: TWAIM.`
- `section5.comment` :
  `Every step starts with a prompt written before any code. One agent carries it out, another reviews it and returns a verdict. No agent merges, no agent publishes — that step is mine.`
- `section5.preuve` :
  `The proof is not in this text. It is in the repository, which is public. The prompts that drove every step are there in full, along with the landing journal and the lessons register.`
- `section5.depot` :
  `This site's repository, on GitHub`
- `section5.depotUrl` :
  `https://github.com/lianazel/ibm-s36-to-rest-api`
- `section5.lien` :
  `The method, in full, on its own site`
- `section5.lienUrl` :
  `https://twaim-web.vercel.app/en`

**Quatre règles de forme, non négociables :**

1. **Aucun chiffre.** Ni le nombre de prompts, ni de leçons, ni de tests. Un chiffre publié est une
   affirmation datée que rien ne remettra à jour (leçon du 17 août 2026 : « un chiffre porte son
   état »). Si tu es tenté d'en ajouter un pour « étayer », ne le fais pas.
2. **Le « je » apparaît une fois et une seule**, dans `section5.comment` (`c'est mon geste` / `that
   step is mine`). C'est un accent, pas la voix du chapitre.
3. **`section5.depotUrl` porte la MÊME adresse dans les deux langues** — le dépôt n'a pas de
   version anglaise. Ce n'est pas une erreur de parité : la porte de parité teste les **clés**, pas
   les valeurs. Ne fabrique pas de variante.
4. **Le libellé des liens n'appelle pas à l'action.** Pas de « découvrez », pas de « contactez ». Le
   site TWAIM porte une offre ; ce site présente des compétences, jamais un produit (étude v2 §10).

## ÉTAPE 3 — Livrable B : le corps de la section dans `index.html`

`<section id="methode">` porte aujourd'hui un `h2` et un `p`. Elle porte ensuite, **dans cet ordre** :
le `h2` inchangé, trois `p` de prose, puis **deux `p`, un par lien** — le dépôt d'abord (`section5.depot`),
le site de la méthode ensuite (`section5.lien`). Cet ordre n'est pas indifférent : le paragraphe
`preuve` annonce le dépôt, le lien du dépôt doit le suivre immédiatement.

Chaque lien reprend **exactement** le motif du lien TWAIM d'« À propos » (`index.html`, l. 60-61) :
`target="_blank"`, `rel="noopener noreferrer"`, `data-i18n` pour le texte et
`data-i18n-attr="href:…"` pour l'adresse. **N'invente pas un autre motif** ; celui-là est en place et
testé, y compris son `href` de repli en dur (voir ÉTAPE 6, preuve 5).

Aucun `h3` : un chapitre de trois paragraphes ne se découpe pas en sous-titres.

## ÉTAPE 4 — Livrable C : rien en CSS

**Cet incrément n'ajoute aucune règle CSS et n'en modifie aucune.** Le registre IA du contrat de
design (bloc sombre à deux voix) est **hors périmètre** — il part à l'incrément « Mise en scène ».
Si tu penses qu'une règle est nécessaire, ARRÊTE-TOI et signale plutôt que d'en écrire une.

## ÉTAPE 5 — Livrable D : le fil

Dans `tasks/ROADMAP.md` :

1. **Insérer une ligne 11** — « Section 5, La méthode » — et **renuméroter** : Mise en scène passe en
   12, Remboursement des dettes d'outillage en 13, Fin de jalon 1 en 14. Marquer la ligne 11
   **atterri**, avec sa version, à l'atterrissage.
2. **Retirer la section 5 du paragraphe « Deux trous connus de ce fil »** : elle cesse d'être un trou.
   Le second trou (le titre « Jalon 2 (v0.2) ») reste, et le troisième (l'écart `CDEMST`) aussi.
3. **Inscrire les duplications neuves** : `section5.lienUrl` duplique `about.twaimUrl` (à la
   variante `/en` près), et `section5.depotUrl` porte deux fois la même adresse, FR et EN. Les deux
   sont **voulues** ; [W25] exige qu'une duplication soit **déclarée** plutôt que subie. Les inscrire
   à la ligne 13 (dettes d'outillage), dans l'énoncé de [W25].
4. **Corriger le renvoi périmé du troisième trou**, `tasks/ROADMAP.md` l. 40 : « Il se tranche à la
   ligne 11 ou 12 » devient « à la ligne **12 ou 13** ». C'est le seul renvoi de ce genre — mesuré,
   il y en a exactement un. Sans ce geste, le renumérotage le rend faux.

**Hors périmètre du fil** : l'en-tête daté du 24 août, le titre « Jalon 2 (v0.2) » et l'écart
`CDEMST` sont des gestes du chef de projet, pas de cet incrément. N'y touche pas.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat — y compris ceux qui te paraissent évidents.

1. `grep -o 'data-i18n="section5' index.html | wc -l` = **6** (title + trois paragraphes + deux liens).
2. `grep -o 'data-i18n-attr="' index.html | wc -l` = **10** (8 + un par lien).
3. `grep -o 'data-i18n="' index.html | wc -l` = **218** (214 + 4 : la section passe de 2 à 6).
4. `grep -o 'target="_blank"' index.html | wc -l` = **3** (1 + deux liens).
4 bis. `grep -c 'github\.com' index.html` = **1** (le repli du lien du dépôt ; aujourd'hui **0** —
   les deux occurrences existantes sont en `github.io`, c'est le portfolio, ne le touche pas).
4 ter. `grep -c 'https://github.com/lianazel/ibm-s36-to-rest-api' js/i18n.js` = **2**
   (aujourd'hui **0**, vérifié). Ce motif est **l'adresse exacte** : il mesure l'égalité des deux
   valeurs, ce qu'un comptage du mot `github` ne fait pas. C'est le porteur de la règle 3.
5. `grep -c 'twaim-web' index.html` = **2** (1 + celui de la section 5). Le motif d'« À propos »
   porte l'adresse **deux fois** : en `href` de repli dans le HTML, et par `data-i18n-attr` qui
   l'écrase au chargement. Le repli est voulu (le site exige JavaScript pour ses textes, dette [W5]) :
   reproduis-le, ne le retire pas. Côté français, le repli est `https://twaim-web.vercel.app/`.
6. `grep -c 'twaimUrl\|lienUrl\|depotUrl' js/i18n.js` = **6** (deux de chaque).
7. `grep -c 'attente:' js/i18n.js` = **2**, **avant comme après** — les deux `section4.champ.attente`,
   hors périmètre, invariant de cet incrément. **Si tu lis autre chose que 2 : ARRÊTE-TOI.**
   Le motif porte les **deux points** : sans eux il attrape cinq `arrive` de prose (mesuré le
   29 août 2026 : `grep -o 'attente\|arrive'` rend **7**, dont l'ancienne valeur de `section5.intro`
   que cet incrément réécrit). Un motif qui bouge avec la prose ne garde rien.
8. Aucun `<h3>` ajouté : `grep -o '<h3' index.html | wc -l` = **18**, inchangé.
9. `git diff --stat` ne touche que `js/i18n.js`, `index.html`, `tasks/ROADMAP.md`.
10. `npm test` : **356/356**. La parité FR/EN du dictionnaire est testée ; elle doit rester verte
    sans que tu touches aux tests.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `tasks/ROADMAP.md`) :
  `feat(methode): la section 5 dit que le site est construit sous le harnais TWAIM, avec les liens du dépôt et de la méthode ; le fil renuméroté`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche
  `verdict` et `reservations` tels quels. `SHIP` avec des `WARN` : **n'y touche pas**, écris READY
  (règle d'arrêt : 0 FAIL suffit, les WARN partent en dette nommée au fil). `NEEDS_WORK` : corrige,
  commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL section5-la-methode — <ISO> — feat/section5-la-methode — tests 356/356`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les huit valeurs françaises et huit anglaises écrites **exactement** comme ci-dessus. `section5.title`
   **inchangée** dans les deux langues. Aucune autre valeur du dictionnaire modifiée, nulle part.
2. Cinq paragraphes dans `<section id="methode">`, dans l'ordre : `intro`, `comment`, `preuve`,
   lien du dépôt, lien de la méthode. Aucun `h3`, aucune figure, aucun bloc de code.
3. Les deux liens suivent le motif d'« À propos » : `target="_blank"`, `rel="noopener noreferrer"`,
   texte et adresse par `data-i18n` / `data-i18n-attr`, avec le `href` de repli.
   `section5.depotUrl` identique dans les deux langues.
4. **Aucun chiffre** dans les valeurs livrées. **Un seul « je »**, dans `section5.comment`.
5. Aucune règle CSS ajoutée ni modifiée. Aucun script, aucune image, aucun `innerHTML`.
6. Le fil renuméroté, la section 5 retirée des trous, la duplication d'adresse déclarée à [W25].
7. Suite verte 356/356, tous les comptages de l'ÉTAPE 6 conformes.
8. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

## Hors périmètre — à ne pas traiter, dette par dette

- **Le registre IA** (bloc sombre, jeton de couleur, dialogue à deux voix) : incrément « Mise en
  scène ».
- **Les onze dettes** des sessions 21 et 22 : elles appartiennent aux lignes 12 et 13 du fil.
- **L'écart `CDEMST`** (section 4 contre étude v2 et annexe) : troisième trou, non arbitré, se tranche
  par un arbitrage du chef de projet inscrit au fil, jamais en passant.
- **Le texte d'« À propos »** : `about.twaim` dit « voir la méthode » et cette promesse devient vraie
  du seul fait de cet incrément. Rien à y changer.
- **L'en-tête daté du fil** et le titre « Jalon 2 (v0.2) ».
- **La relecture d'anonymisation** page par page : porte d'entrée du jalon, ligne 14.

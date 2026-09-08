# EVOL — Finitions 2 : la carte de partage, les commentaires qui situent au lieu de nommer, le re-pin de la méthode

**Type** : EVOL · **Cible** : `prompts/v0.1/EVOL_finitions-2_v5.md` · **Ligne du fil** : `12 nonies`, « Finitions 2 » (voir Prérequis 3)
**Taille** : petit incrément, trois objets sans recouvrement. **Cinq fichiers** : `index.html` (neuf balises et le commentaire qui les explique, ajoutés dans le `<head>`, rien d'autre), `tests/partage.test.js` (fichier neuf, une porte), `css/styles.css` (huit commentaires réécrits : les six qui situent leur cible, plus celui de `.statut.refuse` et celui de `.about` ; trois déclarations retirées), `CLAUDE.md` (deux mentions de version), `assets/og-card.png` (fichier neuf, déjà présent et non suivi, à enregistrer nommément).
**Aucun changement visible sur la page.** Aucune couleur neuve, aucune règle de mise en page ajoutée ou modifiée, aucun texte du site touché. Rembourse **[W59]**, **[W60]** et **[W61]**.

Premier incrément réel soumis au `prompt-reviewer`. Ce prompt ne préjuge pas de son verdict : la garde juge, il se tait.

**Révision 5, après deux `BLOCK`.** Le second, le 8 septembre 2026 à 11:21 sur la révision 4, tient en **un seul FAIL** : le message de commit de l'ÉTAPE 7 annonçait « sept renvois » là où l'incrément en traite **huit**. Sept est le compte des renvois faux ; huit est le compte des renvois retirés, le juste partant avec les autres. La révision 4 avait corrigé les quatre nombres du corps et **laissé celui du message de commit** : une correction déclarée n'est pas une correction balayée, et le seul endroit non balayé est celui qui aurait publié le nombre faux dans l'historique d'un dépôt public. Les quatre `warns` du même passage sont traités ici : un seul sha de base, la phrase qui préjugeait du verdict retirée, le commentaire HTML nommé à l'en-tête. Les vingt-et-un prérequis chiffrés avaient tous été remesurés conformes.

**Révision 4, après un premier `BLOCK`.** La révision 3 a été refusée par le `prompt-reviewer` le 8 septembre 2026 à 11:11, verdict `BLOCK`, C1 FAIL, sur **trois erreurs d'arithmétique du rédacteur**, toutes vérifiées et toutes réelles : elle annonçait « sept commentaires » là où le fichier en porte **six**, « neuf renvois » là où il en porte **huit**, « six renvois faux » là où il y en a **sept**, et son livrable C3 annonçait « huit remplacements » pour en prescrire six. Le 7 du prérequis était un compte de **lignes** rendu par `grep -c`, lu comme un compte de commentaires. Les vingt prérequis chiffrés, eux, avaient été remesurés conformes, et le corps du prompt tenait. Les révisions 1 et 2, jamais transmises, étaient périmées par deux arbitrages sur l'image.

**Ce que la révision 4 corrige** : les quatre nombres, remesurés par relevé des blocs de commentaire et non par comptage de lignes ; la base, qui passe à l'état réel de `main` ; et la commande de garde du prérequis 1, qui n'inspectait que le dernier commit.

## Satellites consultés (Core §8.1, table de déclenchement)

| Satellite | Statut | Ce qui en est appliqué, ou le motif de l'écart |
|---|---|---|
| `ASSURANCE_METHOD` couche A | **Appliqué** | L'incrément **crée une porte** (`tests/partage.test.js`). Preuve de morsure à la naissance, ÉTAPE 6 point 7. Garde de non-vacuité intégrée à la porte elle-même (plancher de neuf balises relevées). |
| `UX_METHOD` | **Appliqué** | §1 mobile-first. L'incrément ouvre `css/styles.css` et `index.html`, et il ne doit **rien** changer à ce que le lecteur voit. Le contrôle est cet invariant, pas une amélioration. |
| `STYLE_METHOD` + `STYLE_PROFILE` | **Appliqué** | S-1 : aucun tiret cadratin dans les valeurs neuves. S-4 : la carte est en anglais parce que son lecteur est un robot qui ne lit qu'une langue, pas par préférence. S-3 : le mot `legacy` de la description **existe déjà** dans le dépôt (`dict.en.meta.description`) et qualifie des **fichiers**, jamais leur mainteneur. Aucun texte neuf n'est écrit : les deux chaînes sont reprises mot pour mot. |
| `VISION_METHOD` | **Appliqué**, §4 | Le palier 0 n'est pas jouable par toi : le serveur Playwright refuse `file:` (mesuré le 7 septembre 2026), le dépôt n'a pas de serveur local, et chaque appel au navigateur pose une question au chef de projet. **Tu ne fais aucune vérification de rendu.** L'aspect de la carte chez LinkedIn et X est un palier 2, geste du chef de projet, après publication. |
| `AGENT_SCOPE_METHOD` | **Appliqué** | Cas limite réel : l'image de la carte est **produite hors dépôt** (maquette `../Etude_Technique/MAQUETTE_carte-open-graph_v1.html`, hors du dépôt). Tu n'ouvres pas cette maquette, tu ne la cites pas, tu n'écris **rien** hors du dépôt. Le fichier `assets/og-card.png` est déjà posé : tu le constates, tu ne le fabriques pas. |
| `SECURITY_METHOD` | **Écarté** | Aucune dépendance ajoutée ou modifiée (`package.json` et `package-lock.json` intouchés), aucun secret, aucune permission, aucune écriture dans `.claude/`. §3.3 sans objet. La seule entrée neuve est une image produite hors dépôt, lue par aucun code. La règle P1 d'anonymisation, elle, s'applique et se vérifie : ÉTAPE 6 point 8. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_finitions-2_v5.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Périmètre lu : `CLAUDE.md` en entier, dont « Règles de sécurité » (tu n'installes rien, tu ne joins pas le réseau, tu ne pousses rien, tu n'écris pas dans `.claude/`), « Anonymisation », « Style du produit » ; et `tasks/ROADMAP.md`, ligne `12 nonies`, inscrite par le chef de projet avant ton lancement.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

Bases relevées le 8 septembre 2026 sur `main` à **`37eb89d`**, par lecture de fichiers. **Ce sha est le seul de ce prompt.** Remesure-les toutes : un nombre repris d'un document n'est pas mesuré.

1. `git branch --show-current` rend `main`. `grep '"version"' package.json` rend **0.1.26**. La base de ce prompt est `main` à **`37eb89d`**. Si `main` a avancé depuis, inspecte **tous** les commits ajoutés, pas seulement le dernier : `git log --oneline --name-only 37eb89d..HEAD`. Ils ne doivent toucher que `tasks/`. Si l'un touche `index.html`, `css/styles.css`, `CLAUDE.md`, `tests/` ou `assets/`, les bases 4 à 9 sont périmées : **ARRÊTE-TOI** et signale-le. `git status --short` ne doit lister aucun de ces cinq chemins comme modifié ; les seuls non-suivis attendus sont `assets/og-card.png` et ce prompt.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 30`. Sinon un usinage est en cours : ARRÊTE-TOI.
3. Le fil porte la ligne de cet incrément : `grep -c 'Finitions 2' tasks/ROADMAP.md` ≥ **1**. Si 0, le fil n'est pas à jour et le chef de projet ne l'a pas encore enregistré : ARRÊTE-TOI.
4. L'image de la carte est **déjà là**, non suivie par git, et c'est le chef de projet qui l'a déposée. Trois contrôles, aucun poids exact : le visuel peut être retouché sans périmer ce prompt. (a) `ls -l assets/og-card.png` existe. (b) Ses dimensions et sa signature se lisent dans son en-tête, sans bibliothèque : `node -e "const b=require('fs').readFileSync('assets/og-card.png'); console.log(b.slice(1,4).toString(), b.readUInt32BE(16), b.readUInt32BE(20), b.length)"` rend `PNG` puis **1200 630**, et un poids que tu inscris dans `.pipeline/spec.md` sans le comparer à rien. (c) Plancher de non-vacuité : ce poids est **supérieur à 20000** octets. Une carte de 1200 × 630 plus légère que cela est vide ou tronquée. Si le fichier manque, si la signature ou les dimensions diffèrent, ou si le plancher n'est pas franchi : ARRÊTE-TOI, ne fabrique aucune image, ne va en chercher aucune.
5. Le `<head>` n'a aucune balise de partage : `grep -c 'og:' index.html` = **0** et `grep -c 'twitter:' index.html` = **0**. `grep -c '<meta' index.html` = **4**. Si l'un des trois diffère, quelqu'un est passé avant toi sur ce `<head>` : **ARRÊTE-TOI**.
6. Les deux chaînes anglaises que les balises reprennent existent, mot pour mot, dans le dictionnaire : `grep -c 'title: "From S/36 files to a REST API"' js/i18n.js` = **1** et `grep -c 'A .Net REST API prototype exposing legacy IBM S/36 files running on IBM i as JSON: demonstrated, tested, explained.' js/i18n.js` = **1**. Si l'une des deux a changé, les balises que ce prompt prescrit sont fausses : ARRÊTE-TOI.
7. La feuille de style porte ses défauts, et rien de plus. **Trois comptes différents, trois règles de comptage, à ne pas confondre** : `grep -c 'l\. [0-9]' css/styles.css` = **7**, ce sont des **lignes** · `grep -o 'l\. [0-9]' css/styles.css | wc -l` = **8**, ce sont les **renvois** · et ces huit renvois vivent dans **six commentaires**, ce que `grep -n 'l\. [0-9]' css/styles.css` montre en une lecture : les deux lignes 1240 et 1241 appartiennent au même bloc, d'où sept lignes pour six commentaires. Ensuite : `grep -c 'padding-right' css/styles.css` = **2** · `grep -c 'border-top: none\|border-bottom: none' css/styles.css` = **2**. Ses invariants, que cet incrément ne doit pas bouger : `grep -c 'background:' css/styles.css` = **32** · `grep -c '^\.about' css/styles.css` = **5** · `grep -c '^\.statut' css/styles.css` = **5** · `grep -c '^\.site-nav' css/styles.css` = **10** · `grep -c 'list-style' css/styles.css` = **4**. Un écart sur l'un des trois premiers change le travail à faire, un écart sur les cinq derniers dit que le fichier n'est plus celui-ci : dans les deux cas, **ARRÊTE-TOI**.
8. `CLAUDE.md` épingle encore l'ancienne version : `grep -c 'v2\.29' CLAUDE.md` = **2** et `grep -c 'v2\.32' CLAUDE.md` = **0**. Si le re-pin est déjà fait, le livrable D est sans objet : **ARRÊTE-TOI** et signale-le, ne devine pas.
9. La porte à créer n'existe pas déjà : `ls tests/ | wc -l` = **7** et `ls tests/partage.test.js` échoue. Si ce fichier existe, **ARRÊTE-TOI** : tu n'écrases pas une porte que tu n'as pas écrite.

9 bis. Les révisions périmées sont sorties du dépôt : `ls prompts/v0.1/EVOL_finitions-2_v*.md` ne rend que **`_v5.md`**. Si `_v1`, `_v2`, `_v3` ou `_v4` traînent encore, ce sont des contrats gelés et faux qu'un lancement pourrait désigner : **ARRÊTE-TOI** et demande au chef de projet de les retirer.
10. `npm test` vert sur `main`. Dernier compte connu : **382/382** (`review.json`, commit `674d8bb`, 3 septembre 2026), **non relancé depuis**. Si le total diffère, inscris-le dans `.pipeline/spec.md` et continue tant que tout est vert. S'il y a un rouge : ARRÊTE-TOI.

## Contexte et périmètre

Trois objets, réunis parce qu'ils touchent trois fichiers différents et ne se recouvrent pas.

**A — Le site n'a pas de carte de partage.** Un lien vers le site, posté sur LinkedIn ou sur X, s'affiche en carré gris. Les balises `og:*` et `twitter:*` du `<head>` sont ce que ces plateformes lisent, et le dépôt n'en a aucune. Arbitré avec le chef de projet le 7 septembre 2026 : neuf balises, une image dédiée, **une seule langue, l'anglais**.

La langue n'est pas une préférence, c'est une contrainte de la machine d'en face. Les robots qui relèvent ces balises ne lancent pas le JavaScript : la bascule FR/EN du site ne les atteint jamais, et une balise « bilingue » n'existe pas. Le site, lui, reste bilingue et ne change pas d'un caractère.

**Le titre et la description ne sont pas rédigés ici** : ils sont repris mot pour mot du dictionnaire anglais, `dict.en.site.title` et `dict.en.meta.description`. Une chaîne recopiée vit alors en deux porteurs que rien ne tient d'accord, ce qui est très exactement la famille de **[W62]**. On ne rouvre pas cette famille sans la garder : c'est l'objet du livrable B.

**B — L'image est déjà dans le dépôt, non suivie.** `assets/og-card.png`, 1200 × 630, produite hors dépôt par le chef de projet et déposée par lui. Elle est recréée de bout en bout, sans aucune image d'origine externe, avec les polices IBM Plex du dépôt et les couleurs de la feuille de style : le contrat d'anonymisation est tenu. **Tu ne la fabriques pas, tu ne la modifies pas, tu ne la remplaces pas.** Tu la constates au prérequis 4 et tu l'enregistres nommément à l'ÉTAPE 7.

Le contrat du projet dit « toutes les images sont recréées, **SVG de préférence** ». La préférence tombe ici, et pour une raison mécanique : LinkedIn et X ne rendent pas le SVG dans une carte de partage. Le format est donc imposé par le lecteur, comme la langue. C'est le même arbitrage qu'à la ligne 4 du fil, où les dessins de la section 3 ont quitté le SVG pour du HTML et du CSS. **Ne propose pas de version SVG, n'en fabrique pas.**

**C — Six commentaires de `css/styles.css` situent leur cible par un numéro de ligne, et sept de leurs huit renvois montrent aujourd'hui autre chose.** Mesuré le 8 septembre 2026, par relevé des blocs de commentaire. Le compte exact, parce que trois façons de compter donnent trois nombres : **six commentaires**, portant **huit renvois**, répartis sur **sept lignes** du fichier. **Sept renvois sur huit sont faux.** Le seul juste est celui du commentaire de `.nav-chapeau`, qui vise trois jetons de couleur ; cinq commentaires ne portent donc que du faux, le sixième vise encore juste.

La dette **[W60]** ne nommait que deux de ces renvois, ceux nés faux au commit de 0.1.26 ; les cinq autres se sont périmés plus tôt, en silence. Balayage complet arbitré par le chef de projet le 7 septembre, au titre de la leçon du 19 août 2026 : un défaut déclaré une fois se cherche partout où il peut être. Le remède est celui de la dette : **un commentaire nomme sa cible, il ne la situe pas.** Le renvoi encore juste part avec les autres : il ne l'est que par chance, et il redeviendra faux à la première insertion au-dessus de lui.

**[W59]** et **[W61]** vivent dans le même fichier et se ferment au même passage : une déclaration en doublon et deux déclarations mortes, chacune avec un commentaire qui dit faux.

**D — `CLAUDE.md` épingle « Méthode v2.29 », la méthode est en v2.32.** `MAINTENANCE.md`, règle 3 : le re-pin se fait consciemment, au prochain incrément. C'est celui-ci.

**Anonymisation P1** : rien de neuf n'entre côté texte. Les deux chaînes anglaises sont déjà publiées, les commentaires réécrits ne nomment que des sélecteurs CSS du dépôt, et l'image ne porte que des noms du cas fictif (`CDEMST`, `NUMCDE`, `NBRART`, `TOTHTG`, `NOMCLI`, DURAND) et l'adresse publique du site. Si tu crois voir autre chose : ARRÊTE-TOI.

## ÉTAPE 1 — Branche, spec, enregistrement

Branche `feat/finitions-2`. Écris `.pipeline/spec.md`. Puis le premier commit, message exact ci-dessus.

## ÉTAPE 2 — Livrable A : les neuf balises (`index.html`)

Insère le bloc suivant **immédiatement après** l'élément `<meta name="description" …>` et **avant** `<link rel="stylesheet" href="css/styles.css">`. N'ajoute rien d'autre au `<head>`, ne déplace aucune ligne existante, ne touche pas au `<title>`, ni à la balise `description`, ni à la `Content-Security-Policy`.

```html
  <!-- Carte de partage, lue par LinkedIn et par X. Anglais seul, et c'est une
       contrainte, pas une préférence : ces robots ne lancent pas le JavaScript,
       donc la bascule FR/EN ne les atteint jamais. Le titre et la description
       sont ceux du dictionnaire anglais, mot pour mot ; la porte de
       `tests/partage.test.js` refuse qu'ils s'en écartent. -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://lianazel.github.io/ibm-s36-to-rest-api/">
  <meta property="og:title" content="From S/36 files to a REST API">
  <meta property="og:description" content="A .Net REST API prototype exposing legacy IBM S/36 files running on IBM i as JSON: demonstrated, tested, explained.">
  <meta property="og:image" content="https://lianazel.github.io/ibm-s36-to-rest-api/assets/og-card.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="From S/36 files to a REST API">
  <meta name="twitter:description" content="A .Net REST API prototype exposing legacy IBM S/36 files running on IBM i as JSON: demonstrated, tested, explained.">
  <meta name="twitter:image" content="https://lianazel.github.io/ibm-s36-to-rest-api/assets/og-card.png">
```

Deux points à ne pas « corriger ». Les balises `og:` portent `property` et les `twitter:` portent `name` : c'est la forme que ces deux conventions imposent, ce n'est pas une inconsistance. Et la `Content-Security-Policy` du document n'a pas à bouger : l'image est servie par la même origine, et de toute façon un robot qui relève ces balises ne s'exécute pas dans le navigateur du lecteur.

Aucune de ces balises ne porte `data-i18n` ni `data-i18n-attr`. C'est voulu, et la porte de `tests/i18n-html.test.js` n'en verra donc rien : elle ne relève que les éléments qui en portent.

## ÉTAPE 3 — Livrable B : la porte de concordance (`tests/partage.test.js`, fichier neuf)

Une porte, pas un contrôle d'apparence. Ce qu'elle garde : que les balises de partage **ne s'écartent jamais** du dictionnaire anglais. Le jour où quelqu'un améliore la description anglaise du site, cette porte rougit tant que la carte n'a pas suivi.

Écris le fichier dans le style des portes existantes (`tests/i18n-html.test.js` est le modèle le plus proche : chemin résolu depuis l'emplacement du test, source injectable, commentaire d'en-tête qui dit ce que la porte ferme). Il importe `dict` depuis `../js/i18n.js` et lit `../index.html`.

**Relevé.** Une fonction qui, sur le HTML **débarrassé de ses commentaires** (le DOM ne voit pas le balisage commenté, la porte non plus), relève chaque élément `<meta>` dont l'attribut `property` commence par `og:` ou dont l'attribut `name` commence par `twitter:`, et rend une correspondance clé → contenu. Elle admet les trois formes de guillemets d'attribut et ne suppose aucun ordre entre les attributs.

**Garde de non-vacuité.** Un plancher : si le relevé rend **moins de 9** entrées, la porte lève, avec un message qui dit qu'elle est aveugle et non verte. Une extraction cassée qui rend zéro ne doit jamais passer au vert.

**Les assertions**, une par règle :

1. `og:title` est **exactement** `dict.en.site.title`.
2. `og:description` est **exactement** `dict.en.meta.description`.
3. `twitter:title` est exactement `og:title`, et `twitter:description` exactement `og:description`.
4. `og:image` et `twitter:image` sont la même chaîne, et cette chaîne est `https://lianazel.github.io/ibm-s36-to-rest-api/assets/og-card.png`.
5. Le fichier que cette adresse désigne existe dans le dépôt : `assets/og-card.png` est présent (`existsSync`). Une carte qui pointe un fichier absent est un carré gris, et rien dans le HTML ne le dirait.
6. `og:url` est `https://lianazel.github.io/ibm-s36-to-rest-api/` et `og:type` est `website`.
7. `twitter:card` est `summary_large_image`.

**Ce que cette porte ne fait pas**, et qui doit être dit dans son commentaire d'en-tête : elle ne regarde pas l'image (ni ses dimensions, ni son poids, ni son contenu), elle ne joint aucun réseau, et elle ne dit rien de ce que LinkedIn ou X afficheront réellement. Elle garde une concordance de chaînes dans le dépôt, rien d'autre.

## ÉTAPE 4 — Livrable C : `css/styles.css`

**Aucune règle de mise en page n'est ajoutée ni modifiée.** Trois déclarations sont retirées parce qu'elles sont mortes ou en doublon, et huit commentaires sont réécrits. Rien de ce que le lecteur voit ne doit bouger.

### C1 — [W59] : la déclaration en doublon de `.statut.refuse`

Dans la règle `.statut.refuse`, **retire la ligne** `padding-right: var(--space);`. Elle répète à l'identique celle que `.statut` pose au-dessus. `background: var(--color-bg-soft);` et `border-left-color: #a2191f;` restent.

**Remplace le commentaire de cette règle** par celui-ci, qui ne dit plus que l'état servi ne change pas (il a gagné un fond au même commit) :

```css
  /* C'est le REFUS qu'on distingue, pas le service qu'on décore. `.statut` pose
     déjà le fond du registre API et le padding des deux états : cette règle ne
     reprend que le filet et le fond. */
```

### C2 — [W61] : le commentaire de `.about` et ses deux déclarations mortes

Dans la règle `.about`, **retire les deux lignes** `border-top: none;` et `border-bottom: none;`. Aucune règle du fichier ne pose de bordure sur `section` : le sélecteur d'élément a perdu son filet, ces deux annulations n'annulent plus rien.

**Remplace le commentaire d'en-tête de ce bloc** par celui-ci :

```css
/* ---- « À propos », dans le panneau à toutes les largeurs.
   Le sélecteur d'élément `section` (plus bas) poserait ici l'espacement d'un
   chapitre du récit : la marge et le retrait le reprennent. Aucun filet à
   annuler, `section` n'en pose plus ; c'est le fond gris qui tient la
   séparation. */
```

### C3 — [W60] élargi : les six commentaires qui situent leur cible

Chaque renvoi « l. NNN » disparaît au profit du **nom** de sa cible. **Six commentaires, huit renvois, six remplacements** : le cinquième porte à lui seul trois renvois. Ils sont donnés dans l'ordre du fichier, chacun en entier : écris exactement le texte prescrit à la place du commentaire existant, et ne change rien d'autre à la règle qui le suit.

**1.** Commentaire de la table de registre des liens du sommaire :

```css
/* Même table que celle des sections elles-mêmes (`#decor` à `#methode`) : un
   lien porte le registre de sa cible. */
```

**2.** Commentaire de `.nav-chapeau`, première ligne. **C'est le seul renvoi encore juste du fichier** : `l. 56, 57, 61` désignent bien les trois jetons de couleur, aujourd'hui. Il part quand même, parce qu'il n'est juste que par chance et qu'une insertion au-dessus le rendra faux sans que personne ne le voie. Le reste du commentaire, avec ses trois rapports de contraste et sa date de mesure, ne bouge pas.

```css
/* 11 px de Plex Mono : la couleur de registre tient AA sur blanc (jetons
   `--color-s36`, `--color-api`, `--color-ia`)
```

**3.** Commentaire de `.site-nav a:focus-visible` :

```css
/* Le liseré global posé par `:focus-visible` déborderait de la rangée : on le rentre. */
```

**4.** Commentaire de `.champ .actions button` :

```css
/* Gabarit du bouton de bascule de langue (`.lang-switch`), au plancher tactile de
   44 px que le site s'impose déjà partout où le doigt travaille. */
```

**5.** Commentaire de `.exemples button`, qui portait à lui seul trois renvois faux :

```css
/* Le plancher de 44 px est celui que le site s'impose déjà au bouton de menu
   (`.nav-toggle`), aux entrées de navigation (`.site-nav a`) et au lien
   « À propos » (`.about a`). Ces treize boutons sont les commandes les plus
   sollicitées de la page : ils ne peuvent pas être les seules à en être privées. */
```

**6.** Dernière phrase du commentaire de `.fichier td input`. Le reste du commentaire, avec sa mesure du 23 août 2026, ne bouge pas. Seule la fin change :

```css
   fait. Même valeur que le champ du filtre (`#mini-filtre`). */
```

Après ce passage, plus aucun commentaire de la feuille ne cite un numéro de ligne, et c'est vérifiable en une commande (ÉTAPE 6 point 3).

## ÉTAPE 5 — Livrable D : `CLAUDE.md`, re-pin de la méthode

Deux occurrences de `v2.29`, et deux seulement. Remplace-les par `v2.32`.

1. Dans « Méthode de travail & agents » : « Ce projet applique la **Méthode de travail IA v2.29** » devient « **Méthode de travail IA v2.32** ».
2. Dans la ligne de pied de document : « Méthode : v2.29 via `00_START_ICI.md` » devient « Méthode : v2.32 via `00_START_ICI.md` ».

Ne touche à rien d'autre dans ce fichier. En particulier, ne corrige pas la mention « Core §4.1 v2.29 » de `.claude/commands/ship.md` : tu n'as pas le droit d'écrire dans `.claude/`, et c'est voulu. Elle est nommée en fin de prompt comme geste du chef de projet.

## ÉTAPE 6 — Preuves

Lance chaque commande, ne suppose aucun résultat. Un écart n'est pas une alarme, c'est une question : décompose avant de conclure, et ne déforme jamais un fichier pour satisfaire un nombre.

1. `index.html` : `grep -o 'og:' index.html | wc -l` = **5** · `grep -o 'twitter:' index.html | wc -l` = **4** · `grep -c '<meta' index.html` = **13** (4 + 9). Invariants : `grep -c 'data-i18n="' index.html` et `grep -c 'data-i18n-attr="' index.html` **inchangés** par rapport au relevé que tu fais avant d'écrire.
2. Les deux chaînes reprises sont identiques des deux côtés, et cela se lit sans le test : `grep -c 'content="From S/36 files to a REST API"' index.html` = **2** (`og:title` et `twitter:title`).
3. `grep -c 'l\. [0-9]' css/styles.css` = **0**.
4. `grep -c 'padding-right' css/styles.css` = **1** · `grep -c 'border-top: none\|border-bottom: none' css/styles.css` = **0** · `grep -c '^\.about' css/styles.css` = **5**, inchangé · `grep -c 'background:' css/styles.css` = **32**, inchangé · `grep -c '^\.statut' css/styles.css` = **5**, inchangé.
5. `grep -c 'v2\.29' CLAUDE.md` = **0** · `grep -c 'v2\.32' CLAUDE.md` = **2**.
6. L'image n'a pas bougé : son poids est celui que tu as inscrit dans `.pipeline/spec.md` au prérequis 4, et ses dimensions sont toujours **1200 630**.
7. **Preuve de morsure de la porte neuve** (`ASSURANCE_METHOD` couche A). Dans `index.html`, change **un seul caractère** du `content` de `og:title`. Lance `npm test`. La porte de `tests/partage.test.js` doit **rougir**, et son message doit nommer la balise fautive. Rétablis le caractère, relance : tout est vert. Recommence pour la garde de non-vacuité, en passant à la fonction de relevé un HTML vide : elle lève, avec le message d'aveuglement. **Écris les deux constats dans `.pipeline/changes.md`**, avec la commande, le message reçu et le rétablissement. Une porte qu'on n'a jamais vue échouer est du théâtre.
8. **Scrub d'anonymisation** sur les trois fichiers texte touchés, avec la commande maison :
   `grep -inE '([0-9]{1,3}\.){3}[0-9]{1,3}|\.ibm\.com|as400|iseries|QSYS|/QSYS|\bLIB[A-Z0-9]{2,}\b|password *=|token|secret|apikey|api_key' index.html css/styles.css tests/partage.test.js`
   Attendu : **aucune ligne**. Toute ligne rendue : ARRÊTE-TOI et affiche-la.
9. `npm test` : vert. Le total **augmente** du nombre de tests du fichier neuf. Inscris l'ancien et le nouveau total dans `.pipeline/test-results.md`. Aucun test existant ne doit changer de verdict.
10. `git diff --stat` ne montre que `index.html`, `css/styles.css`, `CLAUDE.md`, `tests/partage.test.js` et `assets/og-card.png`, plus le prompt entré au premier commit. **`js/i18n.js`, `js/menu.js`, `js/minilangage.js`, `js/coloration.js`, `js/s36.js`, `package.json`, `package-lock.json`, `tasks/` et `.claude/` : intouchés.** Si l'un d'eux apparaît : ARRÊTE-TOI.
11. **Aucune vérification au navigateur.** Tu n'ouvres aucune page, tu ne lances aucun appel au serveur Playwright. Le rendu de la carte chez LinkedIn et chez X se vérifie après publication, par le chef de projet, avec les outils de ces plateformes. Note-le dans `.pipeline/changes.md` comme reste à faire, sans le faire.

## ÉTAPE 7 — HANDOFF (dernier geste)

- `.pipeline/changes.md` et `.pipeline/test-results.md`.
- **Un commit**, staging **précis**, les cinq fichiers nommés un par un, `assets/og-card.png` compris (c'est un fichier non suivi : ajoute-le par son chemin exact, **jamais** par `git add -A`) :
  `feat(partage): carte Open Graph et Twitter en anglais, porte de concordance avec le dictionnaire anglais, huit renvois de ligne nommes au lieu d'etre situes, W59 W60 W61 remboursees, methode repinnee v2.32`
- **Délègue la revue au subagent `reviewer`** (→ `review.json`). Affiche `verdict` et `reservations` **tels quels**. `SHIP` avec des `WARN` : n'y touche pas, écris READY, les WARN partent en dette nommée au fil. `NEEDS_WORK` : corrige, commite, relance le `reviewer` sur le nouveau commit ; deux passes au plus, puis ARRÊTE-TOI.
- `.pipeline/STATUS.md` = `READY — EVOL finitions 2 — <ISO> — feat/finitions-2 — tests <X/Y>`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les neuf balises sont dans le `<head>`, à l'endroit prescrit, avec les valeurs prescrites au caractère près. Aucune autre balise ajoutée, aucune existante déplacée ou modifiée.
2. `tests/partage.test.js` existe, porte les sept assertions et sa garde de non-vacuité, et sa morsure est prouvée et consignée.
3. `css/styles.css` : trois déclarations retirées, huit commentaires réécrits, **zéro** renvoi de ligne restant, et **aucune** règle de mise en page ajoutée ou modifiée.
4. `CLAUDE.md` : deux mentions de version, rien d'autre.
5. `assets/og-card.png` enregistré nommément, **inchangé** : même poids qu'au prérequis 4, mêmes dimensions.
6. Suite verte, comptages de l'ÉTAPE 6 conformes, scrub sans aucune ligne.
7. `review.json` du `reviewer` en `SHIP` pour ce commit ; `READY` écrit en dernier.

## Ce que ce prompt NE fait PAS

- **Il ne touche à aucun fichier de `.claude/`.** `.claude/commands/ship.md` épingle encore « Core §4.1 v2.29 » : c'est un geste du chef de projet, par la voie (a), pas le tien.
- **Il ne touche à aucun fichier de `tasks/`.** L'état de la ligne `12 nonies` au fil, le marquage de [W59], [W60] et [W61] comme remboursées, l'entrée de journal et la leçon éventuelle sont des gestes manuels du chef de projet ([W24]), sur `main`, **après** l'atterrissage.
- **Il ne bump pas `package.json`.** Le bump `patch` (0.1.26 → 0.1.27) appartient à `/land`.
- **Il ne fabrique, ne modifie et ne remplace aucune image**, et n'ouvre pas la maquette hors dépôt qui a produit celle-ci.
- **Il n'ajoute pas** `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale`, `og:site_name`, ni `twitter:site`. Ces balises sont utiles et elles n'ont pas été arbitrées : elles attendent une décision du chef de projet.
- **Il ne traduit pas la carte.** Aucune balise de partage en français, aucun mécanisme de bascule sur ces balises : les robots ne lancent pas le JavaScript, la question ne se pose pas.
- **Il ne touche pas à la `Content-Security-Policy`**, ni au `<title>`, ni à la balise `description` existante.
- **Il ne change rien de visible sur la page.** Aucune teinte, aucun jeton, aucune règle de mise en page, aucun texte du site, aucune clé de dictionnaire.
- **Il ne rembourse aucune autre dette.** [W62] (la table de registre en deux porteurs), [W63] (la ligne de contraste de `.about a`), [W64] et [W65] (le sommaire et les chapeaux), [W66] (les bases remesurées), [W69] (le compteur d'appels au navigateur) restent ouvertes. Rien de la ligne 13 n'entre ici : ni le Plex Mono des `code` en ligne, ni l'indice de défilement ([W23]), ni le favicon ([W12]), ni le `noscript` ([W5]), ni le plafond de `CDEMST`.
- **Il ne touche pas au site TWAIM**, qui vit dans un autre dépôt.
- **Il ne vérifie rien au navigateur** et ne joint aucun réseau.

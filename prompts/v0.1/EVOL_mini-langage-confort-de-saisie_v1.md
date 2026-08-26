# EVOL — Le mini-langage (3) : le confort de saisie

**Fichier** : `prompts/v0.1/EVOL_mini-langage-confort-de-saisie_v1.md`
**Type** : EVOL (comportement + contenu + tests) · **Branche** : `feat/mini-langage-confort-de-saisie` · **Révision** : v1 (gel) · **Date** : 25 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> ## PROMPT GELÉ, EXÉCUTABLE
> Gelé par le chef de projet le 25 août 2026 (session 21), après **huit tours de formulation** dans
> la journée. **Aucune valeur de ce prompt ne se négocie en cours de route.** Si une consigne te
> paraît fausse, contradictoire ou impossible à tenir, tu **arrêtes et tu le dis** ; tu ne
> l'adaptes pas de toi-même.
>
> Rédigé depuis la ligne 9 du fil, le code de `main` en 0.1.18 (pointe `3e1e914`) et les arbitrages
> du chef de projet du jour, tous datés ci-dessous. Les huit brouillons restent en trace dans
> `Etude_Technique/Prompts_Non_Suivis/`, du `DRAFT_…_v1` au `DRAFT_…_v8` : ils portent les voies
> écartées et leurs motifs, et ce gel ne les résume pas.
>
> **La v1 de ce brouillon portait un composeur (piste B de la ligne 9) : il est abandonné.**
> Motif, et il est mesuré sur le papier avant d'avoir coûté une ligne de code : le composeur
> reproduisait en une douzaine de gestes ce que les treize boutons d'exemple font déjà en un
> appui, et sur le geste réellement bloquant — **la retouche d'une valeur à l'intérieur d'une
> séquence** — il ne faisait pas rien, il faisait faux : son `appendCondition` **ajoutait** une
> condition, si bien que suivre l'invitation « Essayez PARIS » depuis LYON donnait
> `<villeClient:==:LYON/> && <villeClient:==:PARIS/>`, **zéro ligne trouvée**. La v1 affirmait
> pourtant le contraire en toutes lettres. Défaut trouvé par le chef de projet, à la lecture,
> avant tout gel. **Ce qui reste ouvert après cet incrément est donc la retouche** : voir
> « Ce que cet incrément ne fait pas » ci-dessous, et la ligne 9 du fil à recaler au `/land`.
>
> **Arbitrages du chef de projet, 25 août 2026** : piste A retenue au **registre des aides**
> (impératif de vouvoiement — le « Veuillez » de la formulation initiale tombe) ; piste B
> **abandonnée** ; les **trois enrichissements** du 22 août entrent tous.
>
> **Le marquage du dernier exemple a été arbitré deux fois le même jour, et c'est la seconde qui
> vaut.** D'abord « bordure et nom repris, aucun fond ». Puis, capture d'écran annotée à l'appui :
> **« la couleur de fond du dernier bouton utilisé doit être mise en évidence »**. Le fond entre
> donc, **en plus** de la bordure et du nom — trois canaux, et aucun ne porte seul l'information.
> Le fond n'est pas une teinte de sens : c'est un **gris de la palette**, `#e0e0e0`, déjà présent
> comme `--color-line`. Les teintes de lien (`#fdefc8`, `#f2ecfa`) restent réservées aux cellules
> des fichiers, où elles disent « ce lien tient » ; les poser sur un bouton d'exemple leur ferait
> dire deux choses.
>
> **Le champ de saisie passe en plusieurs lignes, et c'est la décision qui commande les autres.**
> Deux demandes du chef de projet le 25 août : raccourcir le champ puisque le lecteur bascule en
> paysage, puis — devant le chiffre qui montrait qu'aucune largeur ne suffit — **le passer en zone
> multi-lignes**. La seconde absorbe la première : un texte qui se replie n'a plus de longueur à
> tenir, donc plus rien à cacher. Ce que les mesures avaient trouvé (« Ce que la largeur du champ
> décide », plus bas) reste au dossier comme **motif**, pas comme contrainte : c'est parce que la
> plus longue expression de la page fait 83 caractères et qu'aucune largeur, même en paysage, ne
> les montre, que le repli est le bon geste. Le bouton de fermeture peut dès lors se poser à côté
> du champ **à toutes les largeurs** : ce qu'il prend en largeur, le repli le rend en hauteur.
> Étiquette visible du bouton : le signe `/>` lui-même — étroit, et il montre ce qu'il insère ; son
> nom accessible reste « Fermer la séquence », posé par `data-i18n-attr`, exactement comme le
> bouton de menu du site le fait déjà (`index.html` l. 24).
>
> **La demande s'envoie, elle ne se devine plus à chaque touche, et le lecteur découvre par
> lui-même.** Arbitrage du chef de projet, 25 août 2026. Un bouton **« Envoyer »** paraît sous le
> champ, et **le filtre n'est lu qu'à ce moment-là — y compris quand la demande vient d'un bouton
> d'exemple**. Cliquer « commence par » écrit la syntaxe dans le champ et montre ce que l'exemple
> annonce ; **aucun résultat ne paraît**, et c'est le lecteur qui envoie. Trois motifs : la page
> explique une **API REST**, où une demande s'envoie et où la réponse arrive après — aujourd'hui le
> JSON et la requête se réécrivent pendant la frappe, la réponse précédant la demande ; en tapant
> lettre à lettre, le lecteur voit défiler des refus pour une demande **qu'il n'a pas fini
> d'écrire**, ce que la ligne gravée au fil réprouve en propre ; et le résultat devient **sa
> découverte** au lieu de lui être servi. Le retrait du retour chariot se fait alors **à l'envoi**,
> en un seul endroit. **Ce qui reste immédiat**, et il ne faut pas y toucher : cocher une colonne,
> modifier une commande. Détail au livrable B3.
>
> **L'enchaînement se fait au doigt, pas au clavier des symboles.** Arbitrage du chef de projet,
> 25 août 2026, sur son propre scénario : le lecteur tape sa séquence, appuie sur `/>` pour la
> terminer, puis enchaîne par un `&&` ou un `||`. Le bouton `/>` supprimait le premier obstacle et
> laissait le second : le `&` est **l'un des huit caractères que la ligne 9 nomme** comme vivant
> hors de la page des lettres. La rangée porte donc **trois** boutons de structure — `/>`, `&&`,
> `||` — les deux derniers fermant la séquence en cours **avant** d'ajouter la liaison. Une seule
> fonction dessous. Détail au livrable B2.
>
> **Le retour à la ligne est détecté et ignoré, purement et simplement.** Arbitrage du chef de
> projet, 25 août 2026, contre deux propositions moins bonnes de l'exécutant (avaler la touche ;
> nommer un refus) et contre une troisième, moins bonne aussi, que l'exécutant avait déjà écrite
> (le remplacer par une espace). Le lecteur écrit sa demande, appuie sur Entrée pour passer à la
> ligne, et **la page se débrouille** : la touche n'est pas empêchée, le champ garde **exactement**
> ce qu'il a tapé, et le retour chariot est **retiré à la lecture**, jamais du champ. Détail et
> conséquences au livrable B1.
>
> **Trois points proposés par l'exécutant et retenus au gel** : le livrable E (l'explication rendue
> falsifiable par l'édition — point (b) de la ligne 9, « née de l'incrément 7, à rembourser ici ») ;
> les **deux valeurs de gris**, `#f4f4f4` pour le bloc de refus et `#e0e0e0` pour le bouton
> marqué ; et le partage de ce qui s'envoie et de ce qui reste immédiat (livrable B3).
>
> **Une seule chose reste suspendue à l'appareil, et elle n'est pas à ton initiative** : l'écart de
> surface des deux gris (1,10 et 1,32 contre la page blanche) se juge à l'œil sur un écran de
> téléphone en plein jour, jamais sur un rapport de contraste (leçon du 24 août 2026 — une valeur
> calculée n'est pas un pixel peint). S'il te paraît faible, **signale-le avec ta capture ; ne
> change aucune valeur**.
>
> **Une ligne gouverne chaque geste de cet incrément, gravée au fil** : *compléter ce que le
> lecteur n'a pas fini d'écrire, jamais réparer ce qu'il a fini et raté.* Un correcteur silencieux
> lui volerait l'erreur qui allait lui apprendre quelque chose. Si une consigne ci-dessous te
> semble l'enfreindre, ARRÊTE-TOI et signale.
>
> **⚠ AVENANT 1 — 25 août 2026, session 21, avant toute ligne de code. À lire avant d'exécuter.**
> Ce prompt se contredisait sur **ce qui alimente la zone de réponse** : le livrable B1 faisait lire
> `filterRows` sur le champ, le livrable B3 sur `sent`. Contradiction trouvée à l'ÉTAPE 0 et portée
> au chef de projet, qui a tranché : **`render()` peint les deux zones et lit chacune à sa source**,
> et **l'écouteur `input` appelle `render()`** au lieu de repeindre lui-même. **Il n'y a qu'un seul
> peintre.** Les quatre passages touchés sont corrigés **sur place** et signalés ; leurs
> formulations précédentes sont conservées en **trace** en fin de prompt. Section `## Avenant 1`
> ci-dessous.
>
> **⚠ AVENANT 3 — 26 août 2026, après la passe iPhone 14 du chef de projet. À lire avant
> d'exécuter.** Quatre captures ont trouvé ce que trois revues et 310 tests n'avaient pas vu, et
> aucun des trois points ne se lit dans un fichier : **(1)** le clic d'un exemple **détruisait** une
> liaison composée au doigt — le prédicat `hasPendingLink` sort du module et **un seul porteur**
> sert désormais ses trois appelants ; **(2)** la page **répondait à l'arrivée** à une demande que
> personne n'avait faite — `sent` vaut `null` avant le premier envoi, distinct de la chaîne vide ;
> **(3)** le signal d'état périmé **ne se voyait pas** sur l'appareil qu'il sert — le bouton actif
> passe au plein. Section `## Avenant 3` ci-dessous, valeurs et comptes recalés.
>
> **⚠ AVENANT 4 — 26 août 2026, seconde passe iPhone 14. À lire avant d'exécuter.** La page
> **pardonnait la casse sur les valeurs et la punissait sur les noms de colonnes**, sans le dire
> nulle part, et son refus décrivait mal la faute (« hors de la liste exposée » pour une propriété
> qui y est, à une majuscule près). Les noms s'apparient désormais **à la casse près**, et
> `findPropertyIndex` sort du module pour servir ses **deux** appelants — `recognise` et
> `translateExpression`, qui portait la même comparaison stricte sans que personne l'ait vu.
> Section `## Avenant 4` ci-dessous.
>
> **⚠ AVENANT 5 — 26 août 2026, troisième passe iPhone 14. À lire avant d'exécuter.** Une expression
> refusée « alors que la syntaxe est correcte » : **le refus avait raison**, le second membre avait
> perdu son chevron. **Le défaut n'est pas dans le reconnaisseur, il est dans ce que le
> reconnaisseur DIT.** Quatre points : **(1)** les espaces autour du nom et de l'opérateur sont
> absorbées — un nom précédé d'une espace posée par l'appareil se voyait reprocher une faute
> **invisible**, et c'est le plus grave des quatre ; **(2)** le refus `forme` **nomme la faute**,
> catalogue clos de cinq, ordonné ; **(3)** un membre pas encore écrit est `inacheve`, pas une faute
> de forme — c'est l'état que les boutons `&&` et `||` de cet incrément produisent eux-mêmes ;
> **(4)** un nom de colonne vide a son refus propre. Section `## Avenant 5` ci-dessous.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `UX_METHOD` | — | Appliqué, à mesurer | Mobile-first strict : cet incrément **existe** parce que la saisie d'une jointure n'est pas gérable au clavier iOS (les huit caractères `<` `>` `:` `/` `[` `]` `=` `&` vivent hors de la page de lettres). Aucun débordement horizontal à **320 px** ni **390 px**. Plancher de **44 px** sur la commande neuve (règle déjà tenue par les treize boutons d'exemple, `css/styles.css` l. 848-851). Un repère vit contre ce qu'il explique (notes v6, §8 quater, 2) : l'indication d'orientation et le bouton de fermeture vivent **dans le bloc du champ**, pas ailleurs. |
| `PEDAGOGY_METHOD` | — | Appliqué | Le bouton de fermeture **complète** une forme inachevée et ne juge rien : la séquence fermée peut très bien être refusée ensuite, et c'est le refus qui enseigne. Le marquage du dernier exemple rend visible ce que le lecteur vient de choisir, là où treize boutons se ressemblent. |
| `STYLE_METHOD` | 1.1 | Appliqué | S-1 : aucun cadratin de prose dans les valeurs livrées. S-4 : le vocabulaire s'adresse, il ne se traduit pas. Registre des aides : impératif de vouvoiement, **jamais « Veuillez »**. Aucun des six mots interdits (`protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`). |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre par `textContent`, jamais `innerHTML`. Aucune dépendance, aucun appel réseau. Rien de neuf ne réaffiche une valeur saisie par le lecteur. |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | **Quatre** fonctions de logique pure neuves, exportées et testées : le retrait des retours à la ligne, la fermeture d'une séquence, l'ajout d'une liaison, la détection de données modifiées. Le câblage reste dans `mountMiniLanguage`, famille [W13], déclaré. |
| `VISION_METHOD` | — | Écarté, hésitation nommée | La validation visuelle et tactile reste au chef de projet, **sur iPhone 14, dans les deux langues, portrait ET paysage** : cet incrément n'a de sens que sous le doigt. N'installe rien. |
| `SQL_METHOD` | — | Écarté, motif nommé | Aucune requête n'est émise ; rien de cet incrément ne touche aux deux textes SQL. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** :
`docs(prompt): prompts/v0.1/EVOL_mini-langage-confort-de-saisie_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**. Puis
**relis ce prompt depuis le disque juste avant d'écrire ta première ligne** (leçon du 21 août
2026). Et si cette exécution reprend après une coupure : **mesure l'écart entre l'arbre et ce
prompt relu** avant tout geste — une coupure laisse deux survivants qui ont pu bouger séparément
(leçon du 24 août 2026).

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

**Chaque chiffre ci-dessous a été mesuré le 25 août 2026, jour de la rédaction, sur `main` en
0.1.18 (pointe `3e1e914`), par lecture de fichiers — sauf le compte de tests, repris de
`review.json` et à relever toi-même. Si l'un d'eux a bougé, ARRÊTE-TOI et signale, sans rien
corriger : un écart signifie qu'un incrément est passé avant toi.**

1. `git checkout main`. `git rev-list --count origin/main..main` = **0**.
2. Version au manifeste : **exactement `0.1.18`**.
3. `.pipeline/STATUS.md` commence par `CLOSED — session 20`.
4. `npm test` vert sur `main`. Le `review.json` de la session 20 relevait **282 tests** ; relève
   le compte exact, c'est ta base.
5. **Le module du langage exporte** `recognise`, `EXAMPLES` (treize), `exampleExpression`,
   `buildModel`, `PHYSICAL_MODEL` (neuf entrées), `CDEMST` (dix-huit commandes),
   `mountMiniLanguage`.
6. **Le simulateur est câblé** : `index.html` porte `#mini-filtre`, `#mini-statut`,
   `#mini-exemples`, `#mini-aide`, `#mini-colonnes` dans cet ordre (l. 324-341), et
   `mountMiniLanguage` tient `heldExample` (l. 952) — le dernier exemple retenu par un clic — et
   la remise à `null` quand le champ ne lui correspond plus (l. 1144-1147). **Le livrable C
   s'appuie sur cet état existant et n'en crée pas un second.**
7. `grep -c 'data-i18n="section4' index.html` = **37** ; `grep -c 'data-i18n="section3'
   index.html` = **60**.
8. **Parité** : **235 = 235** clés par langue, `section4` **117 = 117**, `section4.ex` **26 = 26**.
9. **Cadratins, en occurrences** : `js/i18n.js` **10**, `index.html` **1**, `css/styles.css` **8**.
   Inchangés à la fin.
10. **Formes imprimées** : la classe `SEQUENCE_IMPRIMEE` de `tests/minilangage.test.js` capture
    **4 formes par langue**, toutes sous `section4.refus.*`. Inchangé à la fin — garde [W31].
11. `innerHTML` : **0** dans `js/`. `<script` : **2** dans `index.html`.
12. **Teintes de lien** : `#fdefc8` (`lien-valeurs`) et `#f2ecfa` (`lien-code`) dans
    `css/styles.css` ; rouge des refus `#a2191f` (**7,79:1** sur blanc, l. 867). Jetons `:root`
    l. 41-53 : `--color-ink-soft: #525252`, `--color-line: #e0e0e0`. **Aucun jeton de fond neutre
    n'existe** ; `#f4f4f4` n'apparaît nulle part dans la feuille.
13. Le champ `#mini-filtre` est un `<input type="text">` (`index.html` l. 329-330) et coupe
    correcteur, capitalisation et complétion par quatre attributs. Le livrable B le remplace par un
    `<textarea>` ; les quatre attributs le suivent.

## Contexte et périmètre

La section 4 est entière depuis l'incrément 7 : texte, décor, reconnaisseur, treize exemples,
classe, JSON, requête, édition. Ce qu'elle n'est pas encore, c'est confortable au doigt. Mesuré
deux fois sur iPhone 14 (23 et 24 août 2026, sessions 19 puis 20) : taper une jointure au clavier
mobile produit `<villeClient:===:l`, et le seul contournement trouvé est de **basculer l'appareil
en paysage** — le chef de projet a dû le faire pour saisir une condition double.

Cet incrément ajoute **cinq choses, et rien d'autre** :

- **A. L'indication d'orientation**, sous le champ, sur téléphone en portrait seulement : le
  contournement mesuré cesse d'être un secret.
- **B. Le bouton de fermeture de séquence** : `/>` en un geste, contre le champ.
- **C. Le dernier exemple marqué** : bordure, `aria-current`, et son nom repris dans l'explication.
- **D. Le fond du bloc de refus.**
- **E. L'explication rendue falsifiable par l'édition** : quand le lecteur a modifié les données,
  l'aide d'un exemple le dit, au lieu d'affirmer « 2 commandes ici » devant un statut qui en
  compte une.

**Périmètre** : `index.html`, `js/i18n.js`, `css/styles.css`, `js/minilangage.js`,
`tests/minilangage.test.js`. **Rien d'autre.**

**Une retouche hors du périmètre neuf, prescrite et bornée** : `tasks/ROADMAP.md`, ligne 8 du
fil. Sa cellule **État** dit encore « à venir » alors que l'incrément 8 a atterri le 24 août
(merge `d87e230`, 0.1.18) — le `/land` ne met pas le fil à jour, c'est la dette [W24]. Écris dans
cette cellule, et dans elle seule : `**atterri**, 0.1.18 (session 20)`. Ne touche à rien d'autre
de la ligne 8 : sa dernière colonne a été recalée par la revue de la session 20 et fait foi.

### Ce que la largeur du champ décide — mesuré le 25 août 2026

Le champ `#mini-filtre` est en Plex Mono : sa capacité se compte en **caractères**, et la colonne
de lecture du site la plafonne à `--measure: 42rem` **y compris en paysage**.

| | largeur utile | caractères visibles |
|---|---|---|
| iPhone 14, portrait (390 px) | 358 px | **37** |
| iPhone 14, paysage (844 px) | 640 px (plafonnée par les 42 rem) | **66** |
| 320 px | 288 px | 30 |

Et la longueur des expressions **que la page écrit elle-même**, par ses treize boutons :

| exemple | FR | EN |
|---|---|---|
| la plus longue à une seule condition | 31 (`comprisEntre`) | **35** (`injection`) |
| ville du client (jointure) | 45 | **53** |
| deux conditions | 50 | **56** |
| ET mêlé à OU | 68 | **83** |

**Ces chiffres ne sont plus une contrainte à tenir : ils sont le motif du repli.** Aucune largeur
disponible ne montre les 83 caractères de `etOu` en anglais — ni le portrait (37), ni le paysage
(66), et le plafond de 42 rem de la colonne de lecture ferme la question. Un champ d'une seule
ligne cache donc forcément quelque chose. **D'où le livrable B : le champ se replie.** Ce qui suit
reste vrai et gouverne les vérifications.

1. **En portrait, aucune expression à deux conditions ne tient sur une ligne** — 45 caractères au
   mieux pour 37 visibles. En paysage, elles tiennent (56 pour 66). Cela donne au contournement du
   chef de projet une explication **possible** que personne n'avait chiffrée : le paysage n'aide
   peut-être pas seulement à taper, il aide à **voir ce qu'on tape**. Hypothèse, pas mesure : ne
   l'écris nulle part dans le site, et l'indication du livrable A reste muette sur le mécanisme.
   **Corollaire à porter au dossier** : si le repli du livrable B suffit à rendre les expressions
   lisibles en portrait, l'indication d'orientation pourrait devenir inutile. Ne la retire pas de
   toi-même : la passe d'appareil le dira, et c'est un arbitrage du chef de projet.
2. **Le repli supprime le compromis que la largeur imposait.** Sur une seule ligne, un bouton posé
   à côté du champ en portrait coûtait 6 caractères (37 → 31) et découvrait un défaut **de
   langue** : la plus longue expression à une condition fait 31 caractères en français et **35 en
   anglais** (`injection`, l'exemple le plus important de la page). Le français serait passé,
   l'anglais aurait été tronqué de quatre caractères — la classe de défaut exacte de la leçon du
   24 août 2026, invisible hors mise en page et présente dans une seule langue. **Avec le repli,
   ce défaut n'existe plus** : le texte va à la ligne au lieu de sortir du champ. Le bouton peut
   donc rester à côté du champ partout.
3. **Nombre de lignes à prévoir**, à 37 caractères par ligne en portrait : une condition simple
   tient sur **1 ligne** (19 à 35 caractères), une expression à deux conditions sur **2** (45 à
   56), et `etOu` sur **3** (68 à 83). En paysage, 66 caractères par ligne : 1, 1 et 2. **La
   réserve du plafond de 42 rem tombe** : le champ n'a plus besoin d'échapper à la colonne de
   lecture, puisqu'il ne cache plus rien. Elle n'est donc plus reportée.

*Ces caractères sont calculés sur l'avance nominale du Plex Mono (0,6 em, soit 9,6 px à 1 rem).
**Une valeur calculée n'est pas un pixel peint** (leçon du 24 août 2026) : la passe d'appareil les
confirme ou les corrige, et c'est elle qui fait foi.*

### Ce que cet incrément ne fait pas, et qui doit survivre à son atterrissage

**La retouche d'une valeur à l'intérieur d'une séquence reste sans réponse.** C'est le geste que
trois aides gelées invitent expressément à faire — « Essayez PARIS », « Remplacez EXP par STD »,
« 125;126 n'en garde qu'une » — et il exige aujourd'hui de placer le curseur entre deux
deux-points au doigt. La piste B existait pour cela et s'est révélée y répondre faux ; aucune
autre n'est arbitrée.

**Conséquence à porter au `/land`, et elle n'est pas cosmétique** : la ligne 9 du fil affirme que
cet incrément est « ce qui rend le chapitre praticable au doigt ». Après cet incrément, ce sera
**inexact** : le chapitre sera mieux signalé et plus confortable, la friction mesurée sera
toujours là. Recale la cellule au `/land` en le disant, et **inscris la retouche comme sujet à
part** — au fil, ou en dette. Une affirmation qu'on sait fausse ne reste pas dans un fichier de
pilotage : c'est exactement le défaut que l'incrément 8 existait pour retirer, et il vivait déjà
dans cette même colonne (leçon du 24 août 2026).

**Hors périmètre, explicitement.** Aucune dépendance, aucun appel réseau, aucune image. Aucune
modification du texte de la section, du décor, du reconnaisseur, des treize exemples ni de leurs
aides (`section4.ex.*` : **aucune valeur existante réécrite**). **Aucune correction de ce que le
lecteur a tapé** : ni redressement de `===`, ni chevron ajouté, ni mise en forme ; le seul geste
autorisé sur le champ est d'y **compléter** ce que le lecteur a explicitement demandé (livrable
B). **Aucun composeur**, et **aucun clavier de signes complet** : la rangée d'actions porte les
**trois** signes de structure du langage — fermer, lier par ET, lier par OU — et **eux seuls**. Ce
qui reste à taper reste à taper : `<`, `:`, les crochets et l'égal d'une séquence. Une rangée de
tous les symboles a été pesée et écartée : elle apprendrait à taper là où ces trois-là achèvent un
geste que le lecteur a commencé. **[W23]** et **[W31]** restent
ouvertes ; garde de [W31] : **aucune valeur neuve de cet incrément n'imprime une forme
`<…:…:…/>`** — les trois valeurs livrées ci-dessous n'en portent aucune, constate-le. **P3**
(plafonner la hauteur du tableau `CDEMST`) reste en réserve pour la mise en scène.

**Teintes de sens : aucune de neuve.** Les deux fonds introduits sont des **gris**, pris dans la
famille neutre déjà employée par la feuille ; aucune teinte de lien n'est réemployée, et aucun des
deux fonds ne porte seul son information.

| Emploi | Jeton neuf | Valeur | Écart avec la page blanche | Textes portés |
|---|---|---|---|---|
| Fond du bloc de refus (livrable D) | `--color-bg-soft` | `#f4f4f4` | **1,10** | `#a2191f` **7,08:1** · `#525252` **7,10:1** · `#161616` **16,45:1** |
| Fond du bouton marqué (livrable C) | `--color-bg-marque` | `#e0e0e0` (valeur déjà au jeton `--color-line`) | **1,32** | `#161616` **13,71:1** · `#a2191f` **5,90:1** |

Contrastes mesurés le 25 août 2026, formule WCAG. **Deux gris et non un seul, et le motif est
mesuré** : `#f4f4f4` sur un bouton de la taille d'un doigt ne se voit pas (1,10 d'écart), mais il
suffit sur la grande surface du bloc de refus, qui porte en outre son filet rouge ; `#e0e0e0` sur
le bloc de refus l'alourdirait sans rien ajouter à un filet qui parle déjà. **Deux jetons distincts,
même si l'un reprend une valeur existante** : `--color-line` nomme un filet, et un fond qui
emprunte son nom finit par bouger avec lui.

**Si l'écart de 1,32 ne se voit pas sur l'appareil**, ne l'augmente pas de toi-même : signale-le
avec ta capture. Le pas suivant serait `#d0d0d0` (**1,54** ; rouge à **5,05:1**, encore au delà du
AA), et c'est un arbitrage du chef de projet, pas une correction d'exécution. Si un autre choix te
paraît exiger une teinte de sens → ARRÊTE-TOI et signale.

---

## ÉTAPE 1 — Branche, spec, enregistrement, retouche du fil

`git checkout -b feat/mini-langage-confort-de-saisie` · `.pipeline/spec.md`, dont la **première
ligne** est exactement `Incrément : EVOL mini-langage-confort-de-saisie` · commit du prompt
(message exact ci-dessus) · puis la retouche de la ligne 8 du fil, **commit séparé**
`docs(roadmap): ligne 8 du fil recalée, l'incrément 8 a atterri en 0.1.18`.

## ÉTAPE 2 — Livrable A : l'indication d'orientation

Un élément `<small class="paysage" data-i18n="section4.champ.paysage">` posé dans le
`<p class="champ">` de `index.html`, **juste sous** `#mini-filtre` et le bouton du livrable B.

- **Visible seulement sur un appareil tactile en portrait** : `display: none` par défaut, rendu
  visible sous `@media (pointer: coarse) and (orientation: portrait)`. Sur un écran d'ordinateur
  étroit, elle reste cachée : elle parle du clavier du téléphone, pas de la largeur.
- Registre des aides : encre douce, `0.875rem`, comme `.exemples-note`.
- Elle ne dit **pas** pourquoi le paysage aide : seul le contournement a été mesuré, pas son
  mécanisme. Elle dit qu'il aide, et c'est tout ce qui est établi.

## ÉTAPE 3 — Livrable B : la zone de saisie, en plusieurs lignes, et le bouton qui ferme

### B1 — Le champ se replie

`#mini-filtre` passe de `<input type="text">` à **`<textarea>`** (`index.html` l. 329-330). Motif
au chiffre : la plus longue expression que la page écrit fait **83 caractères** en anglais, et
aucune largeur disponible ne les montre — 37 en portrait, 66 en paysage, plafond de 42 rem
compris. Sur une seule ligne, le champ cache forcément une partie de ce que le lecteur vient de
poser ; replié, il ne cache plus rien. *(Demande du chef de projet, 25 août 2026.)*

- **Rien d'autre ne change dans le module.** Vérifié avant d'écrire cette consigne : `mountMiniLanguage`
  ne touche au champ que par `field.value` (l. 1114, 1144, 1149, 1336, 1340) et par l'événement
  `input` (l. 1350) — les deux sont identiques sur un `textarea`. **Ne réécris aucune de ces six
  lignes.** Aucun test ne référence `#mini-filtre` ; les suites ne bougent pas de ce fait.
- **Les quatre coupures de clavier sont reportées telles quelles** : `autocomplete="off"`,
  `autocapitalize="off"`, `autocorrect="off"`, `spellcheck="false"`. Le `<label for="mini-filtre">`
  ne bouge pas.
- **La touche Entrée n'est pas empêchée, et le champ n'est jamais réécrit.** Le lecteur appuie,
  la ligne se coupe, et ce qu'il voit est ce qu'il a tapé. **C'est à la lecture que le retour
  chariot est retiré** : une fonction pure neuve, `stripLineBreaks(text)` →
  `String(text).replace(/\r\n?|\n/g, "")`, exportée et testée. Elle couvre les trois formes,
  `\n`, `\r` et le `\r\n` d'un texte collé depuis Windows. *(Arbitrage du chef de projet,
  25 août 2026 : « tu détectes ce retour chariot et tu l'ignores ».)*
- **Où l'appliquer — deux sites, et deux seulement** *(recalé par l'avenant 1, 25 août 2026 ;
  formulation précédente en trace en fin de prompt)* : **à l'envoi**,
  `sent = stripLineBreaks(field.value)` (livrable B3), qui alimente **`filterRows` (l. 1149)** et
  toute la zone de réponse ; et au **début** de `render()`, une fois, dans une locale —
  `const typed = stripLineBreaks(field.value)` — qui sert la seule **zone d'écriture** : la
  comparaison de `heldExample` (l. 1144) et l'état inerte ou actif des quatre boutons.
  **`field.value` n'est jamais réaffecté à partir de l'une ni de l'autre** : le retrait vit dans la
  lecture, jamais dans le champ. C'est l'invariant central
  de ce point — un exécutant pressé écrirait `field.value = stripLineBreaks(field.value)` et
  réécrirait sous le doigt du lecteur ce qu'il vient de poser. La réécriture de langue
  (l. 1336-1340) n'y touche pas : `translateExpression` ne remplace que des noms de propriété et
  laisse les retours à la ligne en place, ce qui est voulu — la mise en page du lecteur survit à la
  bascule de langue.
- **Pourquoi retirer, et non remplacer par une espace.** Les deux ont été essayés sur les cinq cas
  ci-dessous avant que cette consigne soit écrite. Ils donnent le même résultat partout **sauf
  deux fois**, et le retrait gagne les deux : `<nomClient:[=⏎:DUR/>` est lu `[=`, un opérateur
  valide, là où l'espace donnait un refus sur un opérateur `[= ` que rien à l'écran ne distingue de
  `[=` ; et `<nomClient:==:DU⏎RAND/>` est lu `DURAND`, ce que le lecteur voulait écrire, là où
  l'espace donnait `DU RAND` et aucune ligne trouvée. Remplacer par une espace **donnait au retour
  chariot un sens qu'il n'a pas** : dans ce langage une espace compte, les valeurs en portent
  (`D' OR '1'='1`). Le retirer, c'est ne lui en donner aucun.
- **La conséquence à assumer, et elle est nommée pour que la revue ne la découvre pas.** Un retour
  chariot posé **au milieu d'une valeur** est ignoré : `DU⏎RAND` est lu `DURAND`, et la ligne est
  trouvée. La page a donc recollé deux morceaux que le lecteur avait séparés. **Ce n'est pas
  réparer ce qu'il a fini et raté** : le retour chariot n'est pas un caractère de ce langage, et
  couper une ligne est une **mise en page**, pas une faute de langue. La ligne gravée au fil
  protège les erreurs du lecteur — un mauvais opérateur, une valeur fausse, une séquence non
  fermée — et le reconnaisseur écarte déjà les espaces de bord de chaque partie et de chaque valeur
  (`part.trim()` l. 243, `value.trim()` l. 271, 285). Ceci va un cran plus loin, **et c'est
  arbitré, pas oublié** : arbitrage du chef de projet, 25 août 2026. Si la revue veut le
  contester, qu'elle le porte comme réserve, pas comme défaut.
- **Les cinq cas, vérifiés avant écriture** : entre deux séquences → sans effet, les deux
  conditions sont lues ; juste avant `&&`, sans espace → sans effet ; collé depuis Windows
  (`\r\n`) → sans effet ; dans l'opérateur → l'opérateur est lu, la demande passe ; dans une
  valeur → la valeur est recollée. **Le lecteur peut donc disposer une longue expression sur
  plusieurs lignes pour la lire**, et c'est le premier usage attendu de cette touche.
- **Hauteur** : le champ montre sans défiler la plus longue expression que la page écrit —
  **3 lignes en portrait à 390 px, 2 en paysage**. Choisis le moyen (attribut `rows`, hauteur en
  CSS, repli sur `field-sizing` si tu le juges sûr), mais **l'invariant est le résultat, pas le
  moyen**, et il se vérifie à la capture : exemple `etOu` cliqué, **dans les deux langues**, texte
  entier visible sans défiler. Pas de `resize` horizontal.
- Mono, même corps, même filet qu'aujourd'hui : le champ change de forme, pas de registre.

### B2 — La rangée d'actions : fermer, lier, envoyer

Un `<button type="button" id="mini-fermer">` posé dans `<p class="champ">`, **contre** le champ
`#mini-filtre`.

**Son étiquette visible est le signe `/>` lui-même**, en Plex Mono : le bouton est étroit, et il
montre ce qu'il insère. **Son nom accessible est la valeur `section4.champ.fermer`**, posée par
`data-i18n-attr="aria-label:section4.champ.fermer"` — le mécanisme existe (`js/i18n.js`,
`applyI18n`) et le site s'en sert déjà pour un bouton non textuel : le bouton de menu, `index.html`
l. 24. Le signe `/>` n'est **pas** dans le dictionnaire : il ne se traduit pas, comme les noms
physiques des colonnes ne se traduisent pas. Gabarit visuel : celui de `.lang-switch`
(`css/styles.css` l. 149-154) — mono, filet d'encre, carré de 44 px minimum.

**Le champ garde toute sa largeur ; les boutons vivent sur une rangée sous lui.** Le champ est la
surface d'écriture, la rangée porte les gestes : les **trois boutons de structure** à gauche —
`/>`, `&&`, `||` — puis **« Envoyer » à droite**, tous au plancher de 44 px, l'indication
d'orientation du livrable A sous cette rangée. Aucune règle d'orientation, aucune `@media` : **une
seule disposition à toutes les tailles**. La rangée **se replie** (`flex-wrap`) plutôt que de
déborder : à 320 px « Envoyer » passe à la ligne suivante, et c'est acceptable — vérifie-le, mais
ne fabrique pas de règle de largeur pour l'éviter.

**Les trois boutons de structure** portent leur signe en Plex Mono et leur nom accessible par
`data-i18n-attr`, exactement comme le bouton de menu du site (`index.html` l. 24) : `/>` →
`section4.champ.fermer`, `&&` → `section4.champ.et`, `||` → `section4.champ.ou`. **Les signes ne
sont pas dans le dictionnaire** : ils ne se traduisent pas. Gabarit visuel : celui de
`.lang-switch` (`css/styles.css` l. 149-154). *(Le `&&` s'écrit `&amp;&amp;` dans `index.html`,
comme le veut le balisage ; le dictionnaire, lui, reste sans aucune entité — le contrôle
« entités au dictionnaire = 0 » de la session 20 n'est pas concerné, et dis-le dans `changes.md`
pour qu'on ne le croie pas rompu.)*

**Ce que fait chaque bouton, et rien de plus.**

- **`/>`** : `field.value = closeSequence(field.value)`. Inerte quand `closeSequence` ne changerait
  rien.
- **`&&` et `||`** : `field.value = appendLink(field.value, "&&")` ou `"||"`. **Ils ferment la
  séquence en cours avant d'ajouter la liaison** — c'est le geste que le chef de projet décrit :
  le lecteur finit sa séquence et enchaîne, d'un seul appui. Inertes quand le champ est vide, et
  quand une liaison est **déjà en attente** en fin de champ.
- Les trois rendent la main au champ après leur geste, et n'envoient **rien** : la demande part au
  bouton « Envoyer », et à lui seul.

**`appendLink(text, link)`** — logique pure, exportée, testée : rend `text` **inchangé** si
`text.trim() === ""` ou si `text.trimEnd()` finit déjà par `&&` ou `||` ; sinon rend
`closeSequence(text) + " " + link + " "`. L'espace finale est voulue : le lecteur enchaîne sans
avoir à la poser.

**Garde à ajouter à `closeSequence`, et elle est due à cet enchaînement.** Telle que la v7 la
décrivait, `closeSequence("<a:b:c/> && ")` produisait `<a:b:c/> &&/>` — une absurdité, atteignable
dès que le lecteur appuie sur `/>` après une liaison. `closeSequence` rend donc désormais `text`
inchangé **aussi** quand `text.trimEnd()` finit par `&&` ou par `||` : il n'y a rien à fermer quand
une liaison attend sa séquence.

**Ce que ces boutons ne font jamais, et c'est un piège d'implémentation à éviter.** Le bouton `||`
**reste offert même si l'expression porte déjà des `&&`**, et réciproquement. Mêler les deux
liaisons est refusé par le reconnaisseur, et **c'est une leçon de la page** — l'exemple « ET mêlé à
OU » existe pour la montrer. Une rangée qui empêcherait le mélange volerait au lecteur le refus
qu'il est venu voir. Si tu es tenté de désactiver `||` par prévenance, **ARRÊTE-TOI et signale**.

**Le bouton « Envoyer »** porte le texte `section4.champ.envoyer`, posé par `data-i18n`. C'est
l'action principale de la zone : il est le seul à porter un mot plutôt qu'un signe.

### B3 — Deux zones : celle où l'on écrit, celle qui répond

**C'est le cœur de cet incrément, et tout le reste en découle.** La section se coupe en deux, et
chaque zone a son moment.

| | Ce qu'elle contient | Quand elle se met à jour |
|---|---|---|
| **La zone d'écriture** | le champ, les treize boutons d'exemple, la surface d'explication, l'état des deux boutons d'action | **à chaque frappe** et à chaque clic d'exemple |
| **La zone de réponse** | le statut (compte ou refus), la classe fabriquée, le JSON, la requête et ses valeurs, le message de jointure et l'extinction de teinte | **à l'envoi**, et à chaque case cochée ou commande modifiée |

Le module tient une locale de plus, `sent` — la dernière demande **lue**, jamais le contenu du
champ. **`render()` peint les deux zones, et lit chacune à sa source** *(recalé par l'avenant 1,
25 août 2026 ; formulation précédente en trace en fin de prompt)* : la **zone de réponse** sur
`sent`, la **zone d'écriture** sur `typed`. **Il n'y a donc qu'un seul peintre.**

- **Envoyer** : `sent = stripLineBreaks(field.value)`, puis `render()`. C'est là que la demande du
  chef de projet se réalise — le lecteur a coupé sa ligne où il voulait, la page reconstruit
  l'expression au moment de la lire. `stripLineBreaks` a **deux sites d'appel, et deux
  seulement** : celui-ci, et la tête de `render()` (livrable B1).
- **Cliquer un exemple n'envoie pas.** L'explication paraît, le bouton « Envoyer » s'allume — et
  **aucun résultat ne bouge**. C'est le lecteur qui envoie. *(Arbitrage du chef de projet,
  25 août 2026 : « l'utilisateur doit découvrir le fonctionnement un peu tout seul ». Il renverse
  le choix inverse, que l'exécutant avait fait à la v6 pour économiser un appui.)*
  **Et il n'écrase plus une liaison en attente** *(recalé par l'avenant 3, 26 août 2026 ;
  formulation précédente en trace en fin de prompt)* : quand `hasPendingLink(field.value)` est
  vrai, l'expression de l'exemple **s'ajoute** à la suite (`champ.trimEnd() + " " + expression`) ;
  sinon elle **remplace**, comme avant. Sans liaison en attente, ajouter exigerait d'**inventer**
  un `&&` que le lecteur n'a pas demandé — c'est deviner son intention, ce que la ligne gravée au
  fil interdit. Avec liaison en attente, la page ne devine rien : elle lit une intention que le
  lecteur **a posée de son doigt**.
- **L'ancien résultat reste affiché**, il n'est jamais effacé : le lecteur clique l'exemple, l'état
  précédent est encore là, il envoie, et **il voit le chiffre changer**. Un avant-après enseigne
  mieux qu'un vide qui se remplit — et un écran qui se vide au moment précis où le lecteur vient
  d'agir se lit comme une panne. **Ne blanchis aucune zone au clic d'un exemple.**
- **Au chargement, la zone de réponse ne répond à rien** *(recalé par l'avenant 3, 26 août 2026 ;
  formulation précédente en trace en fin de prompt — **la valeur gelée était mauvaise**)*. `sent`
  vaut **`null`** tant que rien n'a été envoyé, ce qui est **distinct de la chaîne vide** : celle-ci
  est une demande sans condition, mais **envoyée**. Le premier envoi donne à `sent` sa valeur, et
  `null` ne revient jamais — y compris quand le lecteur vide le champ et renvoie.
  Tant que `sent` est `null` : le **statut**, le cadre **JSON** et le cadre **SQL** portent
  `section4.champ.attente` (même chemin que `refusRien`, par `putMessage`) ; le **bloc des
  valeurs** reste caché ; la **classe fabriquée reste affichée** — elle dépend des cases cochées,
  pas de la demande, et c'est ce qui empêche la page de s'ouvrir sur un écran mort.
  « Envoyer » est inerte. Motif : afficher « 18 lignes trouvées sur 18 » à l'arrivée, c'est
  **répondre à une question que personne n'a posée** — exactement le « la réponse précède la
  demande » que ce livrable existe pour retirer. **Ce point ne contredit pas la règle du dessus** :
  celle-ci protège un résultat **déjà obtenu** ; à l'arrivée, il n'y en a jamais eu.
- **Restent immédiats, et n'y touche pas** : cocher une colonne (la classe se réécrit sous la
  case — incrément 6, atterri) et modifier une commande (la jointure casse sous le doigt, avec
  l'extinction de teinte posée exprès parce que le message complet vit 618 px plus bas —
  incrément 7, atterri). Les deux appellent `render()` comme aujourd'hui ; ils recalculent à partir
  de `sent`, qui ne bouge pas. *(Retenu au gel du 25 août 2026 : c'est ce qui protège la classe qui
  se réécrit sous la case cochée et la jointure qui casse sous le doigt.)*

**Ce que fait exactement l'écouteur `input` du champ** *(recalé par l'avenant 1, 25 août 2026 ;
formulation précédente en trace en fin de prompt)* : **il appelle `render()`, et rien d'autre.** Il
ne repeint rien lui-même. Les trois gestes ci-dessous vivent **dans** `render()`, jamais à côté :

1. recalcule l'état inerte ou actif des **quatre** boutons ;
2. si un exemple est retenu et que le champ ne l'écrit plus, **lâche `heldExample`** et remet la
   surface d'explication à son texte de repos ;
3. retire le marquage du bouton d'exemple (livrable C), qui se dérive de `heldExample`.

**L'allègement que ce point annonçait — « la frappe ne rend plus rien » — tombe, et c'est assumé.**
Recalculer dix-huit lignes à chaque touche ne coûte rien, alors qu'un **second peintre de la même
zone** est exactement la façon dont une zone finit par montrer un état que l'autre a déjà quitté :
le défaut que ce livrable existe pour empêcher. Le prix est nul, la garantie ne l'est pas.

**Corollaire, et il n'est pas gratuit à vérifier** : tout bouton qui modifie le champ (`/>`, `&&`,
`||`) peut appeler `render()` sans risque, puisque la zone de réponse relit `sent`, qui n'a pas
bougé. Le « puis `render()` » du bouton de fermeture, plus bas, est donc **correct tel quel** —
c'est un test de cette lecture, pas une exception.

**Le piège que l'envoi crée, et sa parade — lis ce point deux fois.** Entre la frappe et l'envoi,
l'écran montre une réponse qui ne correspond plus à la demande affichée. C'est **exactement** le
défaut mesuré deux fois sur iPhone 14 et commenté dans le module (l. 1136-1147) : « une explication
ne survit pas à un champ qui la contredit ». Parade, et elle ne coûte aucune clé :

- **« Envoyer » est inerte (`disabled`) quand il n'y a rien à envoyer** — c'est-à-dire quand
  `stripLineBreaks(field.value) === sent`. Il s'allume dès que le champ diffère de ce qui est
  affiché : à la frappe, et au clic d'un exemple. Le lecteur sait donc **toujours** si ce qu'il
  voit correspond à ce qu'il a écrit : bouton éteint, la réponse est à jour ; bouton allumé, elle
  date d'avant son dernier geste. C'est **le seul** signal d'état périmé de la page, et il doit
  donc être franc à l'œil.
  **Et « franc à l'œil » se mesure sur l'appareil, pas dans la feuille** *(complété par l'avenant 3,
  26 août 2026)* : le filet adouci de la première rédaction **ne se lit pas** sur un écran de
  téléphone. C'est l'état **actif** qui se renforce, jamais l'inerte qui s'affaiblit — l'affaiblir
  le ferait passer sous le AA. **Actif** : fond `--color-ink` (`#161616`), texte blanc, **18,10:1**.
  Le bouton passe du contour au **plein**, donc la différence ne repose pas sur la teinte seule.
  **Inerte** : l'état actuel, inchangé. Ce sera le **seul bouton plein du site**, et c'est
  défendable : c'est la seule commande qui **envoie**.
- **`heldExample` se compare à `field.value`**, comme aujourd'hui (l. 1144), et **non** à `sent` :
  l'explication décrit ce qui est **écrit**, pas ce qui a été envoyé. La comparer à `sent`
  effacerait l'explication au moment même où le lecteur vient de cliquer l'exemple. La comparaison
  se fait sur `stripLineBreaks(field.value)`, pour qu'un retour chariot ajouté par le lecteur ne
  fasse pas tomber l'explication d'un exemple qu'il est pourtant en train de lire.
- Si tu trouves une troisième zone dont l'état pourrait dater — un texte, un compte, une teinte —
  **ARRÊTE-TOI et signale** plutôt que de la traiter au jugé. Cette classe de défaut a mordu deux
  fois sur ce projet.

- Au clic : `field.value = closeSequence(field.value)`, puis `render()`, focus rendu au champ.
- `closeSequence(text)` — logique pure, exportée, testée : rend `text` **inchangé** si
  `text.trim() === ""` ou si `text.trimEnd()` finit déjà par `/>` ; sinon rend
  `text.trimEnd() + "/>"`. **Elle ne vérifie rien d'autre** : `<villeClient:===:l` devient
  `<villeClient:===:l/>`, et le reconnaisseur refuse toujours. Le lecteur avait fini et raté sur
  l'opérateur — la page ne répare pas ; il n'avait pas fini de fermer — la page complète. C'est
  la ligne gravée au fil, appliquée à la lettre, et c'est aussi ce qui rend ce bouton
  enseignable : il ne fait jamais passer une demande fausse.
- Le bouton est `disabled` tant que `closeSequence` ne changerait rien (champ vide, ou déjà
  fermé) : il s'allume quand il a quelque chose à compléter. Recalculé à chaque `input` du champ,
  et une fois au montage. **Un bouton inerte reste lisible** : ne descends pas son contraste sous
  le AA pour dire qu'il dort, sers-toi de son filet.

## ÉTAPE 4 — Livrable C : le dernier exemple marqué

- Le bouton de `heldExample` porte `aria-current="true"` et la classe `retenu` ; tous les autres
  n'ont ni l'un ni l'autre. Posé dans `render()`, **dérivé de `heldExample`** après la remise à
  `null` (l. 1144-1147) : quand le champ ne correspond plus à l'exemple, le marquage tombe au même
  rendu que l'explication. Aucun second état.
- CSS, **trois canaux et aucun ne porte seul** :
  `.exemples button.retenu { background: var(--color-bg-marque); border-width: 2px;
  border-color: var(--color-ink); font-weight: 600; }` et
  `.exemples button.rouge.retenu { border-color: #a2191f; }` — le bouton rouge marqué garde son
  texte rouge sur le même gris (**5,90:1**, mesuré) : la famille de l'exemple ne change pas parce
  qu'il vient d'être touché. **Le fond est demandé expressément** (capture annotée du chef de
  projet, 25 août 2026) ; il vient en plus de la bordure et du nom repris, jamais à leur place.
- **La rangée ne doit pas bouger** quand un bouton se marque — la bordure passe de 1 à 2 px et la
  graisse change : compense par le `padding`, ou emploie `outline`, mais **mesure-le** au lieu de
  le supposer. Un bouton qui grossit fait sauter la rangée sous le doigt, et treize boutons qui se
  décalent au moment où l'on vient d'en toucher un, c'est la cible suivante qui se dérobe.
- **Un seul bouton marqué à la fois**, et c'est déjà garanti par `heldExample` : constate-le
  plutôt que d'ajouter un nettoyage. Treize boutons, un seul état.
- **Le nom repris.** La surface `#mini-aide` montre désormais, pour un exemple survolé comme pour
  un exemple retenu, un `<strong>` portant `labels[key].nom`, un nœud de texte `" "`, puis l'aide
  — élément par élément, `textContent` seul (`showHelp` reçoit l'exemple, plus seulement son
  texte). Le texte de repos (`exemples.repos`) reste tel quel, sans nom. Aucune clé neuve.

## ÉTAPE 5 — Livrable D : le fond du bloc de refus

`.statut.refuse` reçoit `background: var(--color-bg-soft)` (jeton neuf `--color-bg-soft: #f4f4f4`,
déclaré parmi les jetons `:root` l. 41-53 avec son commentaire de contraste, comme les jetons
voisins le font déjà) et un `padding-right` égal au
`padding-left` existant, pour que le texte ne colle pas au bord droit du fond. Le filet rouge
reste. L'état servi (`.statut` sans `.refuse`) **ne change pas** : c'est le refus qu'on distingue,
pas le service qu'on décore.

## ÉTAPE 6 — Livrable E : l'explication rendue falsifiable par l'édition

`ex.jointure.aide` affirme « 2 commandes ici » ; dès que le lecteur a modifié une commande, le
statut peut en compter une. La page ne réécrit pas l'aide (valeur gelée) : elle **ajoute** une
réserve.

- `hasEdits(orders, origin = CDEMST)` — logique pure, exportée, testée : vrai dès qu'une cellule
  d'une commande diffère de l'origine, à l'octet près (le lecteur qui retape DURAND à l'identique
  n'a rien modifié).
- Quand `hasEdits(orders)` est vrai **et** que la surface montre l'aide d'un exemple (survolé ou
  retenu), un `<span class="reserve">` s'ajoute après l'aide, portant
  `section4.exemples.donneesModifiees`. Jamais sur le texte de repos. Disparaît dès que les
  données reviennent à l'origine.
- Encre douce, `0.875rem` : c'est une réserve, pas une alarme.

## Les valeurs, gelées

**Sept clés neuves par langue sous `section4`** *(six au gel, plus `champ.attente` à l'avenant 3 ;
compte recalé le 26 août 2026)*, aucune valeur existante réécrite. Parité attendue
en fin d'incrément : `section4` **124 = 124**, total **242 = 242**. Elles entrent par **trois voies
différentes**, et les comptes bougent en conséquence : `champ.paysage` et `champ.envoyer` par
`data-i18n` (`grep -c 'data-i18n="section4' index.html` passe de 37 à **39**) ; `champ.fermer`,
`champ.et` et `champ.ou` par `data-i18n-attr`, en noms accessibles de boutons à signe
(`grep -c 'data-i18n-attr' index.html` passe de **6 à 9**) ; `exemples.donneesModifiees` servie par
le module au rendu, via le dictionnaire reçu. Aucun cadratin, aucun des six mots interdits, aucune
forme `<…:…:…/>`, aucun « Veuillez ».

**Français**

- `champ.paysage` : Sur téléphone, passez en mode paysage pour taper une condition double.
- `champ.fermer` : Fermer la séquence
- `champ.et` : Fermer et enchaîner avec ET
- `champ.ou` : Fermer et enchaîner avec OU
- `champ.envoyer` : Envoyer la demande
- `champ.attente` : Envoyez la demande pour voir la réponse. *(gelée à l'avenant 3, 26 août 2026 ; servie par le module, pas posée par `data-i18n` — les comptes `data-i18n` ne bougent donc pas)*
- `exemples.donneesModifiees` : Vous avez modifié les données : les comptes de cette explication valent pour les données d'origine.

**Anglais**

- `champ.paysage` : On a phone, switch to landscape to type a double condition.
- `champ.fermer` : Close the sequence
- `champ.et` : Close and chain with AND
- `champ.ou` : Close and chain with OR
- `champ.envoyer` : Send the request
- `champ.attente` : Send the request to see the response. *(gelée à l'avenant 3, 26 août 2026)*
- `exemples.donneesModifiees` : You have changed the data: the counts in this explanation hold for the original data.

*(Fratries à vérifier alignées, dans les deux langues, **après** le geste et non valeur par valeur
— leçon du 24 août 2026. **La fratrie la plus serrée, et celle qui peut casser sans qu'aucun test
la voie** : `champ.et` et `champ.ou`, qui doivent ouvrir sur les mêmes mots dans les deux langues
— « Fermer et enchaîner avec ET » / « … avec OU », « Close and chain with AND » / « … with OR ».
Avec `champ.fermer` elles forment celle des **trois boutons à signe**, lus l'un à côté de l'autre
sur la même rangée et jamais affichés — ce sont des noms accessibles, donc **invisibles à l'œil du
chef de projet sur appareil** : ici, la relecture alignée est le **seul** filet. Puis les cinq
`champ.*` sous le même parent, et `exemples.note` / `exemples.repos` / `exemples.donneesModifiees`
de même. Aligne-les et regarde-les, FR puis EN, avant de conclure.)*

## ÉTAPE 7 — Tests

Les suites s'étendent, **logique pure, aucun DOM** ; le câblage reste sous [W13], déclaré.

1. **`closeSequence`** : vide → vide ; espaces seuls → inchangé ; déjà fermé → inchangé ;
   **finissant par `&&` ou `||` → inchangé**, la garde due à l'enchaînement ;
   `<a:b:c` → `<a:b:c/>` ; espaces de fin absorbés (`<a:b:c   ` → `<a:b:c/>`) ; et le cas mesuré :
   `<villeClient:===:l` → `<villeClient:===:l/>`, **dont `recognise` rend le refus `forme`** — la
   fermeture complète, elle ne répare pas. Ce dernier test est le gardien de la ligne gravée au
   fil : s'il devient vert en rendant une expression valide, c'est que quelqu'un a fait de ce
   bouton un correcteur.
1 bis. **`appendLink`** : champ vide → inchangé ; `<a:b:c` → `<a:b:c/> && ` (elle ferme d'abord) ;
   `<a:b:c/>` → `<a:b:c/> && ` ; liaison déjà en attente (`<a:b:c/> && `) → **inchangé** ; et le
   `||` posé sur une expression qui porte déjà un `&&` → **produit bien l'expression mêlée**, que
   `recognise` refuse ensuite par `liaison`. Ce dernier test est le gardien de la leçon : la rangée
   n'empêche pas le lecteur d'atteindre ce refus.
2. **`hasEdits`** : origine → faux ; une cellule changée → vrai ; changée puis retapée à
   l'identique → faux ; casse changée (`durand`) → **vrai** (la jointure tolère la casse ; ce
   détecteur ne juge pas la jointure, il constate la modification) ; les dix-huit commandes
   parcourues, pas seulement la première.
3. **Parité** (suite existante) : `section4` 123 = 123, total 241 = 241.
4. **`stripLineBreaks`** : texte sans retour à la ligne → **inchangé, à l'octet près** ; `\n`,
   `\r` et `\r\n` retirés, et `\r\n` compté **une fois** et non deux ; les espaces ordinaires
   **jamais touchées** — un test l'exige sur la valeur d'injection `D' OR '1'='1`, qui en porte
   deux. Puis les **cinq cas de position**, chacun passé ensuite à `recognise` ou `filterRows`
   pour que le test porte sur le **résultat lu** et non sur la chaîne : entre deux séquences →
   reconnue, deux conditions ; juste avant `&&` sans espace → idem ; `\r\n` de Windows → idem ;
   dans l'opérateur → reconnue, opérateur `[=` ; dans une valeur → reconnue, valeur `DURAND`, et
   `filterRows` **trouve** les lignes de DURAND. **Et l'invariant qui compte** : `stripLineBreaks`
   n'est jamais appliquée à ce qui est réaffecté au champ — à défaut d'outil pour le prouver, la
   revue le constate et le dit.
5. **Le modèle d'envoi**, en logique pure sur les fonctions extraites, le reste étant du câblage
   sous [W13] : la valeur envoyée est bien `stripLineBreaks` du champ ; deux frappes successives
   sans envoi ne changent pas la valeur envoyée ; un envoi la remplace. Et **la règle de l'inerte**,
   qui est la parade au défaut d'état périmé : `stripLineBreaks(champ) === sent` → inerte ; champ
   rempli par un exemple sans envoi → **actif** ; une frappe qui ne change rien après retrait des
   retours chariot (le lecteur ajoute un retour chariot) → **reste inerte**, parce qu'il n'y a
   effectivement rien de neuf à envoyer ; et l'état d'arrivée, champ vide et rien d'envoyé →
   inerte.
6. **[W31]** : `SEQUENCE_IMPRIMEE` capture toujours **4** formes par langue, toutes sous
   `refus.*`.

## ÉTAPE 8 — Preuves

À écrire dans `changes.md`, **chaque nombre étiqueté avant/après, chaque procédure ancrée sur un
sha figé, jamais `HEAD`**, et **chaque convention de comptage rejouée sur ses propres chiffres**
avant d'être déclarée (leçon du 24 août 2026 : une convention écrite de mémoire a reproduit le
défaut qu'elle corrigeait).

- Comptages en occurrences : cadratins 10 / 1 / 8 inchangés ; `innerHTML` 0 ; `<script` 2 → 2 ;
  `data-i18n="section4` 37 → 39 ; `data-i18n-attr` 6 → 9 ; `data-i18n="section3` 60 → 60 ;
  parité `section4` 117 → 123,
  total 235 → 241, les deux langues ; `SEQUENCE_IMPRIMEE` 4 et 4 inchangées ; les six mots
  interdits et « Veuillez » à 0 dans les valeurs livrées, motif joué **par langue**.
- **Preuve de fratrie** : les trois `champ.*` et les trois `exemples.*` montrés **alignés l'un
  sous l'autre**, FR puis EN, après le geste. Le détecteur de trente lignes du `reviewer`
  (session 20) peut servir ; sinon la liste alignée suffit, mais elle est due.
- **Preuve de la ligne gravée**, sorties à l'appui : `<villeClient:===:l` puis fermeture → le
  statut affiche toujours le refus `forme`, et le champ porte exactement ce que le lecteur avait
  tapé plus `/>`.
- **Preuve du marquage** : le bouton retenu porte `aria-current="true"` et son fond, les douze
  autres ne les portent pas ; après une frappe dans le champ, aucun ne les porte. Et la **rangée
  ne bouge pas** : position mesurée d'un bouton voisin, avant et après marquage — c'est une valeur
  de mise en page, donc **capture ou appareil**, jamais un relevé calculé (leçon du 24 août 2026).
- **Les deux gris rejoués** : les cinq rapports du tableau des teintes recalculés par toi, à la
  formule WCAG, et le tableau reproduit dans `changes.md`. Une valeur de contraste qu'on recopie
  sans la rejouer est une convention non rejouable (leçon du 24 août 2026).
- **L'invariant du repli, à la capture et non au calcul** : l'exemple **`etOu`** cliqué — la plus
  longue expression de la page, 68 caractères en français et **83 en anglais** — **entièrement
  visible sans défiler**, bouton en place, à 390 px en portrait et en paysage, **dans les deux
  langues**. C'est la vérification qui décide de ce livrable ; si le texte est coupé ou si le champ
  défile, ARRÊTE-TOI et signale. Refais-la sur `injection` (35 caractères en anglais, 28 en
  français), qui était le cas limite avant le repli.
- **La touche Entrée**, sorties à l'appui : une expression coupée en deux lignes **entre deux
  séquences**, puis envoyée, donne le même résultat que la même expression sur une ligne ; coupée
  **au milieu d'une valeur**, elle est lue recollée. Et dans les deux cas, la preuve qui compte :
  **le champ contient toujours le retour à la ligne** que le lecteur a posé, et le texte reste
  affiché sur deux lignes. La page lit sans réécrire.
- **Les deux zones, et c'est la preuve qui décide de ce livrable.** (1) Partant d'une demande
  envoyée et affichée, taper une lettre de plus **sans envoyer** : statut, JSON, requête et classe
  **inchangés**, « Envoyer » **allumé** ; puis envoyer : tout se met à jour d'un coup, le bouton
  s'éteint. (2) **Cliquer un exemple sans envoyer** : le champ porte la syntaxe, l'explication est
  là, le bouton est marqué, « Envoyer » est allumé — et **le résultat affiché est toujours le
  précédent, aucune zone n'a été vidée** ; puis envoyer : le compte change sous les yeux. Montre
  les quatre états, captures à l'appui.
- Débordement horizontal nul à 320 px et 390 px : bouton de fermeture posé, indication visible,
  statut refusé avec son fond, exemple marqué.
- **La validation sur appareil appartient au chef de projet et est due avant merge** : iPhone 14,
  FR et EN, **portrait puis paysage** — l'indication apparaît en portrait et disparaît en
  paysage ; le bouton de fermeture s'allume et s'éteint ; **le fond du dernier exemple utilisé se
  voit à bout de bras, en plein jour** — c'est la demande expresse du 25 août, et un écart de 1,32
  ne se juge que là ; la rangée ne saute pas ; le bloc de refus se distingue sans que sa lecture
  change.

## ÉTAPE 9 — HANDOFF (dernier geste)

`.pipeline/changes.md` + `.pipeline/test-results.md` · un commit, staging précis · **délègue la
revue au subagent `reviewer`** (→ `review.json`) · `.pipeline/STATUS.md` =
`READY — EVOL mini-langage-confort-de-saisie — <ISO> — feat/mini-langage-confort-de-saisie — tests <X/Y>` ·
**STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. L'indication d'orientation sous le champ, visible sur tactile en portrait seulement, au
   registre des aides, sans « Veuillez », et muette sur le mécanisme.
2. Le bouton de fermeture complète `/>` et ne répare rien d'autre ; inerte quand il n'a rien à
   compléter, **y compris quand une liaison attend sa séquence** ; la séquence fermée peut rester
   refusée, et le test l'exige.
2 quinquies. **Les deux boutons de liaison** ferment la séquence en cours puis ajoutent `&&` ou
   `||`, avec l'espace finale ; inertes sur champ vide et sur liaison déjà en attente ; et
   **jamais désactivés l'un par l'autre** — mêler ET et OU reste atteignable au doigt, parce que
   son refus est une leçon de la page. Son étiquette visible
   est le signe `/>`, son nom accessible vient du dictionnaire par `data-i18n-attr`, dans les deux
   langues.
2 bis. **Le champ est un `textarea`** et montre l'expression entière sans défiler, `etOu`
   compris — 83 caractères en anglais — à 390 px en portrait comme en paysage, bouton en place,
   dans les deux langues, vérifié à la capture.
2 quater. **Deux zones, et chacune son moment** : la zone d'écriture (champ, exemples,
   explication, état des boutons) suit la frappe ; la zone de réponse (statut, classe, JSON,
   requête, jointure, teintes) n'obéit qu'à l'envoi, à une case cochée ou à une commande modifiée.
   **Cliquer un exemple n'envoie pas** et ne vide rien ; « Envoyer » est inerte quand il n'y a rien
   à envoyer, allumé sinon — frappe comme clic d'exemple ; `heldExample` se compare au **champ**.
   Les quatre états montrés à la capture.
2 ter. **Le retour chariot est détecté et ignoré, à la lecture seulement** : la touche Entrée
   n'est pas empêchée, le champ garde ce que le lecteur a tapé, `stripLineBreaks` a **deux sites
   d'appel et deux seulement** — à l'envoi (`sent`) et en tête de `render()` (`typed`) — et
   **jamais** à ce qui est réaffecté au champ ; les cinq cas de position testés en logique pure ;
   les espaces ordinaires intactes. *(Recalé par l'avenant 1, 25 août 2026.)*
2 sexies. **Un seul peintre.** `render()` peint les deux zones et lit chacune à sa source — la
   réponse sur `sent`, l'écriture sur `typed` ; l'écouteur `input` **appelle** `render()` et ne
   repeint rien lui-même. Aucun second peintre de la zone d'écriture, nulle part. *(Avenant 1.)*
3. Le dernier exemple retenu porte **son fond `--color-bg-marque`**, sa bordure et
   `aria-current="true"`, tous dérivés de `heldExample` ; le marquage tombe avec l'explication ;
   son nom est repris en tête de l'aide ; **la rangée ne bouge pas**, mesuré à la capture ; un
   seul bouton marqué à la fois.
4. Le fond du bloc de refus en `--color-bg-soft` ; les deux gris déclarés en jetons distincts,
   contrastes rejoués au dossier ; aucune teinte de lien réemployée ; l'état servi inchangé.
5. La réserve `donneesModifiees` apparaît sous l'aide d'un exemple dès qu'une commande diffère de
   l'origine, jamais au repos, et disparaît au retour à l'origine ; testé en logique pure.
6. Parité `section4` **123 = 123**, total **241 = 241** ; `data-i18n` 39 et 60, `data-i18n-attr`
   9 ; cadratins,
   `SEQUENCE_IMPRIMEE`, `<script`, `innerHTML` inchangés ; aucune valeur existante réécrite ;
   fratries montrées alignées, FR et EN.
7. La ligne 8 du fil dit « atterri, 0.1.18 (session 20) » dans sa cellule État, en commit séparé.
8. **La ligne 9 est recalée au `/land`** : ce que cet incrément a fait, et **ce qu'il n'a pas
   fait** — la retouche d'une valeur reste ouverte, inscrite comme sujet à part.
9. `review.json` en `SHIP` pour cet incrément et ce commit ; `READY` écrit en dernier.

## Avenant 1 — un seul peintre : `render()` lit deux sources

*Trouvé à l'**ÉTAPE 0 de confrontation**, le 25 août 2026, **avant toute ligne de code et avant même
la création de la branche** — et signalé plutôt qu'arbitré par l'exécutant, précédent des sessions
19 et 20 : on n'étend pas un arbitrage par analogie, et on ne tranche pas de son propre chef une
consigne gelée. Le prompt le demandait en propre, trois fois : en tête (« tu arrêtes et tu le dis »),
à l'ÉTAPE 0 (« Contradiction → ARRÊTE-TOI et signale »), et au livrable B3 (« ARRÊTE-TOI et signale
plutôt que de la traiter au jugé »).*

**Trois passages ne pouvaient pas être vrais ensemble.**

1. **B1**, sous « Où l'appliquer, et nulle part ailleurs » : `typed` sert la comparaison de
   `heldExample` **et `filterRows`**.
2. **B3**, sous « C'est le cœur de cet incrément » : `render()` travaille sur `sent` et **plus
   jamais** sur `field.value` ; l'envoi est le **seul** endroit où `stripLineBreaks` est appelée.
3. **B3, trois lignes plus bas** : `heldExample` se compare sur `stripLineBreaks(field.value)` —
   un second site d'appel, que « le seul endroit » dément.

**Le conflit décisif est le premier.** Si `filterRows` lit `typed`, la zone de réponse **suit la
frappe** : exactement ce que le livrable B3 existe pour supprimer, et ce que le critère 2 quater
interdit. Il n'existait pas de lecture tenant les deux. B1 est un **fossile d'avant la v6**, que la
postface de ce prompt date elle-même — « La v6 ajoute le bouton Envoyer », « La v7 […] coupe la
section en deux zones ». La phrase « et à `filterRows` » a été écrite quand `render()` lisait encore
le champ ; B3 l'a remplacée sans que B1 soit repassé.

**Arbitrage du chef de projet, 25 août 2026**, validé avec la précision qui lève l'ambiguïté
restante — et c'est elle qui commande l'implémentation, elle ne se déduit pas :

- **`render()` peint LES DEUX ZONES**, et lit **chacune à sa source** : la zone de réponse sur
  `sent`, la zone d'écriture sur `typed`. **Il n'y a donc QU'UN SEUL PEINTRE.**
- **Conséquence directe** : l'écouteur `input` du champ **appelle `render()`**, il ne repeint rien
  lui-même. Les trois gestes que B3 lui prêtait — état des quatre boutons, chute de `heldExample`,
  retrait du marquage — vivent **dans** `render()`, jamais à côté.
- **L'allègement annoncé en B3 (« la frappe ne rend plus rien ») TOMBE, et c'est assumé** :
  recalculer dix-huit lignes à chaque touche ne coûte rien, alors qu'un **second peintre de la même
  zone** est exactement la façon dont une zone finit par montrer un état que l'autre a déjà quitté.
  C'est le défaut que B3 existe pour empêcher ; le prix est nul.
- **Corollaire, et il n'est pas gratuit à vérifier** : tout bouton qui modifie le champ (`/>`,
  `&&`, `||`) peut appeler `render()` sans risque, puisque la zone de réponse relit `sent`, qui n'a
  pas bougé. Le « puis `render()` » du bouton de fermeture est donc **correct tel quel** — c'est un
  **test de la lecture**, pas une exception.
- **Deux sites d'appel de `stripLineBreaks`, et deux seulement** : à l'envoi
  (`sent = stripLineBreaks(field.value)`) et en tête de `render()`
  (`const typed = stripLineBreaks(field.value)`). **L'invariant central de B1 est préservé mot pour
  mot** : `field.value` n'est jamais réaffecté depuis l'une ni l'autre.
- **Critère 2 ter recalé**, et **critère 2 sexies ajouté** dans le même mouvement.

**Quatre passages corrigés sur place**, chacun portant la mention `(recalé par l'avenant 1)` :
livrable B1 (« Où l'appliquer »), livrable B3 (la locale `sent` et le point « Envoyer »), livrable
B3 (l'écouteur `input`), critère 2 ter. Leurs formulations précédentes suivent.

## Avenant 3 — ce que la passe d'appareil a trouvé, et qu'aucun fichier ne portait

*Origine : passe du chef de projet sur **iPhone 14**, 26 août 2026, 14:40-14:44, **quatre
captures**, sur le tunnel d'aperçu servant `df6158a`. **Arbitré le jour même.** Les trois points
ci-dessous ont survécu à **quatre passes de revue indépendante** et à **310 tests verts** : un
geste qui détruit le travail du lecteur, une réponse affichée avant toute demande, et un signal
d'état invisible sur l'appareil qu'il sert. **Aucun des trois ne se lit dans un fichier.***

**Ce que la passe a VALIDÉ, et qui ne se rejoue plus** : le marquage du dernier exemple **se voit**
(l'écart de 1,32 passe le test de l'appareil — c'était la demande expresse du 25) · l'indication
d'orientation est bien là en portrait · la requête paramétrée et ses valeurs sont justes
(`like ?` / `= ?`, `"DUR%"` puis `"E"`, dans l'ordre) · les deux zones tiennent.

### 1. Le clic d'exemple n'efface plus une liaison en attente

**Le seul défaut franc de la passe.** Le lecteur compose `<…/> ||` au doigt, clique « contient »
pour remplir le second membre, et **tout part** : `field.value = exampleExpression(…)` est un
remplacement inconditionnel. **Le travail au doigt — le plus coûteux de la page — est détruit par
le geste censé l'aider.** C'est une conséquence de la rangée que cet incrément vient d'ajouter :
les boutons de liaison créent un état que les treize boutons d'exemple ignoraient.

**Borne exacte** : ajoute **si et seulement si** une liaison attend. Champ `<a/> ||` + clic →
`<a/> || <b/>` ; champ `<a/>` + clic → `<b/>` (remplacé) ; champ vide + clic → `<b/>`.

**Et le geste qui compte, au delà du correctif : le prédicat sort du module.**
`hasPendingLink(text)` → vrai quand `text.trimEnd()` finit par `&&` ou `||`. **Exportée, testée, et
appelée par les TROIS sites qui en dépendent** : `closeSequence` (qui refuse alors de fermer —
garde de l'avenant 1), `appendLink` (qui refuse alors d'empiler une seconde liaison), et le clic
d'exemple (qui ajoute au lieu de remplacer). La même notion était écrite **trois fois, en trois
endroits, dont un qui l'ignorait** — et c'est précisément l'endroit qui a mordu. Un seul porteur
pour une règle qui en avait trois implicites : ici il ne coûte rien, il simplifie.

### 2. L'état d'arrivée ne répond plus à une demande que personne n'a faite

**La valeur gelée était mauvaise**, et le prompt la portait en toutes lettres (« rien ne change à
l'état d'arrivée du lecteur »). Avec le bouton « Envoyer », afficher « 18 lignes trouvées sur 18 »
à l'arrivée, c'est répondre à une question que personne n'a posée. Mécanisme et bornes : voir le
point recalé au livrable B3. **Ce point ne contredit pas « ne blanchis aucune zone au clic d'un
exemple »** : cette règle protège un résultat **déjà obtenu** ; à l'arrivée, il n'y en a jamais eu.
Les deux cohabitent, et le prompt garde les deux.

### 3. Le bouton « Envoyer » se voit

Le prompt gelé exigeait qu'il soit « **franc à l'œil** » ; sur l'appareil, il ne l'était pas.
C'est l'**actif** qui se renforce — fond encre, texte blanc, **18,10:1 rejoué le 26 août** —,
jamais l'inerte qui s'affaiblit : l'affaiblir le ferait passer sous le AA. Variante pesée et
**écartée** : le vert du registre API (`#198038`, 5,02:1 en blanc), correct mais **trois fois moins
franc**, et il chargerait le bouton d'un sens de registre qu'il n'a pas. Si le chef de projet
préfère le vert à une prochaine passe, **c'est un changement de valeur, pas de mécanisme.**

### Tests neufs prescrits

1. **`hasPendingLink`** : vide → faux ; `<a:b:c/>` → faux ; `<a:b:c/> &&` → vrai ; `<a:b:c/> ||` →
   vrai ; espaces de fin absorbés → vrai ; `<a:b:c/> && <d:e:f/>` → **faux**, la liaison n'attend
   plus.
2. **Les trois appelants s'accordent** — le test qui vaut le correctif : sur le même texte,
   `closeSequence` laisse inchangé, `appendLink` laisse inchangé, et la règle du clic d'exemple dit
   « ajouter ». Un seul prédicat, trois comportements cohérents, vérifiés **ensemble**.
3. **Le clic d'exemple** : liaison en attente → `champ + expression` ; sinon → `expression` seule.
   Et **le cas mordu, nommément** : `<nomClient:[]:AR/> ||` + « commence par » → l'expression du
   lecteur **est toujours là**.
4. **L'état d'arrivée** : `sent === null` → texte d'attente ; après un premier envoi, `sent` ne
   revient **jamais** à `null`, y compris quand le lecteur vide le champ et renvoie — c'est alors
   une demande vide **envoyée**, donc dix-huit lignes. **C'est la distinction qui porte tout ce
   point**, et le test l'exige.
5. **Parité** : `section4` 124 = 124, total 242 = 242.

### Preuve due, en plus des autres

**Ce qui ne doit PAS avoir bougé** : cliquer un exemple **après** un envoi ne vide toujours aucune
zone — la règle de la v7 tient, à montrer dans la même passe.

**Validation d'appareil due AVANT merge**, et elle ne se délègue pas : le bouton plein se
distingue-t-il de l'inerte à bout de bras · l'arrivée ne montre-t-elle plus de compte · une liaison
en attente survit-elle au clic d'un exemple. Le tunnel du 26 août expire à 15:37 : il en faudra un
nouveau, **et ce n'est pas une raison pour raccourcir la passe**.

## Avenant 4 — les noms de colonnes tolèrent la casse, comme les valeurs le font déjà

*Origine : **seconde** passe d'appareil du chef de projet, iPhone 14, 26 août 2026, 16:33-16:37,
cinq captures, sur le tunnel servant `bf6a230`. **Arbitré le jour même.** Trouvé en éprouvant la
rangée que cet incrément ajoute : c'est elle qui l'a conduit à composer une expression longue au
doigt, donc à **taper un nom de colonne au clavier mobile** — ce que personne n'avait fait avant.*

### Le fait mesuré, et il n'est pas celui qu'on croit

Le chef de projet a tapé `codeModelivraison` et lu « Colonne « codeModelivraison » **hors de la
liste exposée** ». Le nom diffère bien de `codeModeLivraison` — **un `L` majuscule** —, donc le
refus est conforme à la règle écrite. **C'est la règle qui est fautive**, et pour trois motifs
mesurés :

| | la casse |
|---|---|
| les **valeurs** (`DURAND` / `durand` / `DuRaNd`) | **tolérée** — trois lignes à chaque fois |
| les **noms de colonnes** | **stricte** — comparaison `===` |

1. **L'incohérence n'est écrite nulle part.** Balayage des 124 valeurs de `section4` : aucune ne
   mentionne la casse. La page pardonne d'un côté et punit de l'autre, sans le dire.
2. **Le message décrit mal la faute.** « Hors de la liste exposée » est faux en esprit : la
   propriété **y est**, à une majuscule près. La page annonce un nom absent quand ce qui cloche est
   une capitale.
3. **Le camelCase est un geste coûteux au doigt.** Le champ porte `autocapitalize="off"`, posé
   exprès pour que le clavier n'intervienne pas : chaque majuscule est donc **délibérée**. Et ce
   que la page enseigne est le **pont de noms** (`LIZEPO` ↔ `codeModeLivraison`), pas la discipline
   orthographique.

### Ce qui est tranché

**Les noms de colonnes s'apparient à la casse près.** `codemodelivraison`, `codeModelivraison` et
`CODEMODELIVRAISON` passent ; **`codelivraidon` et `motDePasse` sont toujours refusés**, et
l'exemple « colonne inconnue » continue de montrer son refus — **aucune leçon n'est affaiblie**.
La thèse tient mot pour mot : « l'appelant ne choisit pas ce qu'il interroge, seules les propriétés
du modèle sont acceptées ».

**Le champ n'est pas réécrit** : le lecteur garde sa graphie, c'est l'**interprétation** qui
tolère. En aval, tout repart de `entry.property`, donc la **graphie canonique** paraît dans le
refus, dans la classe, dans le JSON et dans le SQL — la page enseigne la bonne orthographe sans
corriger sous le doigt. C'est exactement ce que les valeurs font déjà.

### Le second site, qui ne se voyait pas

**`translateExpression` porte la MÊME comparaison stricte** (`entry.property === name`, l. 878).
Corriger le seul reconnaisseur aurait produit un défaut de la famille déjà rencontrée deux fois :
un nom tapé en bas de casse serait **accepté**, puis **non traduit** à la bascule de langue, donc
**refusé** dans l'autre langue une seconde plus tard. Mesuré avant d'écrire :
`<codemodelivraison:[]:AR/>` traduit FR→EN rend `<codemodelivraison:[]:AR/>` — inchangé.

**Un seul porteur, deux appelants** : `findPropertyIndex(model, name)` sort du module, exportée et
testée, et sert **`recognise` et `translateExpression`**. Même remède qu'à l'avenant 3 pour
`hasPendingLink`, et pour la même raison : une règle écrite deux fois finit par diverger, et c'est
toujours la copie oubliée qui mord.

### Tests neufs prescrits

1. **`findPropertyIndex`** : graphie exacte → l'indice ; toutes casses (`bas`, `HAUT`, mixte) → le
   **même** indice ; nom inconnu → `-1` ; chaîne vide → `-1`.
2. **`recognise`** : les trois variantes de casse de `codeModeLivraison` sont **acceptées et rendent
   la même entrée canonique** ; `codelivraidon` et `motDePasse` restent **refusés** par `colonne`.
3. **`filterRows`** : une demande en bas de casse sert **exactement les mêmes lignes** que la même
   demande en graphie canonique.
4. **La bascule de langue** : un nom tapé en bas de casse **se traduit** comme la graphie exacte —
   le gardien du second site.
5. **Aucune leçon perdue** : l'exemple `colonneInconnue` (`motDePasse`) est toujours refusé.

## Avenant 5 — le refus avait raison, et c'est le refus qui était le défaut

*Origine : **troisième** passe d'appareil du chef de projet, iPhone 14, 26 août 2026, 20:00-20:04,
neuf captures. Une expression refusée « alors que la syntaxe est correcte ». **Mesuré avant tout
correctif** (règle absolue §3) : le refus avait raison, le second membre avait perdu son chevron
ouvrant, et aucune fonction de la page ne l'avait mangé. **Le défaut n'est pas dans le
reconnaisseur, il est dans ce qu'il DIT.***

**Le geste qui l'a produit, dans les mots du chef de projet** : « J'ai cliqué sur "Contient", et
j'ai effacé le nom de la colonne pour marquer la mienne. J'ai trop effacé. » **La page invite ce
geste** — ses propres aides gelées disent « Essayez PARIS », « Remplacez EXP par STD ». Elle
organise la retouche à la main, puis refuse **sans dire où**.

**Quatre points.** Le premier élargit ce que la page **accepte** ; les trois autres ne touchent
qu'à ce qu'elle **dit** quand elle refuse. **Aucun ne répare sous le doigt** : la ligne gravée au
fil tient entière.

### 1. Les espaces autour du nom et de l'opérateur sont absorbées

**Ce point n'était pas dans le rapport de la passe : il sort du balayage du voisinage**, et c'est
le plus grave des quatre. Mesuré sur la branche :

| saisi | rendu avant l'avenant |
|---|---|
| `< nomClient:[=:DUR/>` | refus `colonne`, nom `" nomClient"` |
| `<nomClient :[=:DUR/>` | refus `colonne`, nom `"nomClient "` |
| `<nomClient: [=:DUR/>` | refus `operateur`, op `" [="` |

Le message affichait alors « Colonne « nomClient » **hors de la liste exposée** » : le lecteur lit
un nom qui est, **à l'œil, exactement celui de la liste**. La page lui reproche une faute
**invisible** — pire que le défaut de casse de l'avenant 4, où il pouvait au moins voir la
majuscule. Sur un clavier d'iPhone, **l'espace après ponctuation est posée par l'appareil, pas par
le doigt**.

**La borne rejoue exactement l'arbitrage du retour chariot** : on absorbe là où l'espace n'a aucun
sens, on la garde là où elle en a un.

- **Nom de colonne : `trim`.** Aucun des neuf noms exposés ne porte d'espace, dans aucune langue.
- **Opérateur : `trim`.** Les six opérateurs sont deux caractères de ponctuation ; `!=` non plus.
- **Valeur : INCHANGÉE, le dépôt fait déjà le bon geste** *(recalé le 26 août 2026 ; la rédaction
  initiale disait « valeur : JAMAIS de trim », et **elle était fausse** — formulation précédente en
  trace en fin de prompt)*. Mesuré par l'exécutant avant d'écrire une ligne : `value.trim()` est
  présent depuis l'**incrément 6**, donc **les bords sont déjà rognés** et les espaces
  **intérieures** conservées (`<villeClient:[]:  LY  ON  />` → `"LY  ON"`). C'est exactement la
  bonne borne, et le test qui l'exigeait à l'envers est **retiré** : le retirer aurait fait
  ramener zéro ligne à une valeur qui a l'air juste — **la faute invisible du point 1, déplacée du
  nom vers la valeur**. Un test neuf **épingle** désormais cette borne, qui était tacite.

**Ordre imposé dans le code** : le `trim` de l'opérateur passe **avant** le test de l'opérateur
vide, sinon un opérateur réduit à une espace échappe au piège de la position.

**Ce point n'accepte pas un nom faux** : `< codelivraidon :[]:AR/>` reste refusé en `colonne`, avec
son nom **nettoyé** au message.

### 2. Le refus `forme` nomme la faute

`refuse("forme")` ne portait **aucun paramètre**. Le message récitait la règle et laissait le
lecteur chercher. Il nomme désormais la faute, dans un **catalogue clos de cinq**, **le premier qui
mord** :

| ordre | faute | condition | exemple |
|---|---|---|---|
| 1 | `ouvrant` | le membre ne commence pas par `<` | `codemodelivraison:[]:AR/>` |
| 2 | `fermant` | le membre ne finit pas par `/>` | `<nomClient:==:LYON` |
| 3 | `deuxPoints` | moins de deux `:` dans le membre | `<nomClient:LYON/>` |
| 4 | `operateurFin` | le gabarit tient, l'opérateur est vide | `<nomClient::LYON/>` |
| 5 | `generique` | tout le reste | un retour à la ligne **dans** le membre |

**L'ordre dit le geste suivant, pas la liste des fautes.** Un membre qui a perdu son chevron *et*
sa fermeture est nommé par sa **première** faute ; le refus suivant nommera la seconde. C'est la
ligne gravée appliquée au message : on accompagne une phrase en train de s'écrire, **on ne dresse
pas le procès-verbal de tout ce qui manque**.

**Le catalogue est total**, cinquième cas compris : les quatre premiers couvrent tout ce qu'un
champ sans retour à la ligne peut produire ; `generique` n'est atteint que par un membre portant un
`\n` (le `.` de `SEQUENCE` ne traverse pas la ligne). **Un catalogue de refus qui laisse un trou
n'est pas un catalogue.**

**Divergence tranchée par le chef de projet le 26 août 2026 : la faute nommée SEULE, sans citation
du membre.** L'exécutant proposait de citer le fragment fautif ; **il a retiré sa recommandation**
devant trois objections mesurées : le membre est du texte de lecteur **sans borne** (illisible sur
un iPhone en portrait) · **le tronquer coupe là où la faute vit** (chevron manquant en tête,
fermeture manquante en queue) · et surtout, **une fois la faute nommée, la citation ne localise
plus rien** — « il manque le chevron ouvrant » suffit à trouver, parmi deux membres, celui qui n'en
a pas. **Le nom de la faute EST le localisateur.**

### 3. Un membre pas encore écrit n'est pas une faute de forme

Mesuré : `<nomClient:[=:DUR/> &&` et `&& <nomClient:[=:DUR/>` rendaient tous deux `forme`.
**C'est l'état que les boutons `&&` et `||` de cet incrément produisent eux-mêmes** : la page écrit
la liaison pour le lecteur, il envoie avant d'avoir écrit la suite, et **elle traite comme une
faute une phrase qu'elle vient d'ouvrir**. Un membre absent n'est pas raté, il est **inachevé** —
c'est exactement ce que la ligne gravée interdit.

**Code propre `inacheve`**, rendu quand un membre est vide après découpe. Formulation **neutre par
construction** : elle vaut pour le membre de gauche comme pour celui de droite.

**Il reste dans la région de refus, en rouge, et c'est délibéré** : le lecteur a appuyé sur
« Envoyer », donc il a posé une question, donc il a droit à une réponse **au même endroit que
toutes les autres**. Une troisième couleur d'état — « en attente » à côté de « répondu » et
« refusé » — est **un sujet du fil, pas de cet avenant**.

### 4. Un nom de colonne vide a son propre refus

`<:[]:AR/>` rendait `colonne` avec un nom vide, et le message affichait **« Colonne «  » hors de la
liste exposée »**, deux guillemets autour de rien. C'est **le voisin immédiat du geste du chef de
projet** : il a effacé un caractère de trop, le chevron ; un caractère de moins, et il tombait ici.
**Code propre `colonneVide`**, dont le renvoi vers la liste est la même phrase que `colonne` : même
remède, cause différente.

### Ce que cela coûte, mesuré et non promis

**+9 feuilles par langue** : `refus.forme.fautes` (5), `refus.inacheve` (`quoi`, `pourquoi`),
`refus.colonneVide` (`quoi`, `pourquoi`). Plus **deux chaînes modifiées par langue** :
`refus.forme.quoi` reçoit `{faute}`, et `refus.forme.pourquoi` **perd sa dernière phrase**
(« L'opérateur va au milieu, jamais à la fin »), qui devient la phrase de `operateurFin` — elle
n'était vraie **que pour un cas sur cinq** et la page la servait aux cinq.

**Parité recalibrée depuis le dépôt par l'exécutant** (Cowork a refusé de la donner de mémoire, et
il a eu raison) : `section4` **124 → 133**, total **242 → 251**. Les comptes `data-i18n` ne bougent
pas : ces valeurs sont servies par le module.

**Le rendu ne demande aucun mécanisme neuf** : `params.faute` se résout par
`texts().refus.forme.fautes[…]` exactement comme `params.type` par `texts().types[…]`.

### Le retour tactile du bouton « Envoyer » — arbitré le 26 août 2026

**Le sens plein/contour NE BOUGE PAS** : plein = il reste quelque chose à envoyer, et c'est le seul
signal d'état périmé de la page. Ce qui s'ajoute est un **retour à l'appui**.

**Réserve du chef de projet, et elle commande l'implémentation** : *« pas un `:active` seul — sur un
iPhone, le pouce couvre le bouton pendant l'appui, donc la couleur doit survivre au relâchement, le
temps que l'œil la voie. »* L'ordre de grandeur, **200 ms, est un jugement de conception, non
mesuré** : point de départ, **et la valeur se juge à la passe d'appareil, pas au fichier**.

### Tests neufs prescrits

1. **Les trois espaces** : `< nomClient:[=:DUR/>`, `<nomClient :[=:DUR/>` et `<nomClient: [=:DUR/>`
   sont **reconnus** et rendent **la même condition** que la forme serrée (comparaison d'objets,
   pas trois assertions qui se ressemblent).
2. ~~**La valeur garde ses espaces**~~ — **test retiré le 26 août 2026** : il décrivait un
   comportement qui n'existe pas. Remplacé par son inverse mesuré — **bords rognés, intérieur
   intact** —, qui épingle une borne restée tacite depuis l'incrément 6.
3. **Un opérateur réduit à une espace** tombe en `forme`/`operateurFin`, **pas** en `operateur` —
   c'est l'ordre imposé, et il se teste.
4. **Les cinq fautes**, une entrée chacune, **plus les deux entrées d'ordre** : sans chevron **et**
   sans fermeture → `ouvrant` ; avec chevron, sans fermeture et sans deux-points → `fermant`.
5. **`inacheve`** : `<a:b:c/> &&`, `<a:b:c/> && ` et `&& <a:b:c/>` les trois ; et
   `<a:b:c/> && <d:e:f/>` reste reconnu à deux conditions.
6. **`colonneVide`** : `<:[]:AR/>` et `< :[]:AR/>` ; `<codelivraidon:[]:AR/>` rend toujours
   `colonne`. **La tolérance ne déplace pas la frontière du nom faux.**
7. **Le catalogue est total** : pour chaque code de refus, le dictionnaire porte son couple dans les
   deux langues, et **chaque `{…}` du gabarit trouve son paramètre**. Vaut pour les **onze** codes.
8. **Parité** : `section4` 133 = 133, total 251 = 251.

## Formulations révoquées : trace, ne pas utiliser

*Conservées parce qu'une formulation périmée laissée sans trace dans un prompt gelé expose au défaut
exact de l'avenant 2 de la session 20 : un lecteur — ou un extracteur — y reprend l'ancienne.*

**B1, « Où l'appliquer », avant l'avenant 1** : « **Où l'appliquer, et nulle part ailleurs** : au
**début** de `render()`, une fois, dans une locale — `const typed = stripLineBreaks(field.value)` —
puis `typed` sert à la comparaison de `heldExample` (l. 1144) et à `filterRows` (l. 1149). » —
**Révoquée sur `filterRows` seulement** : le reste du point, dont l'invariant « `field.value` n'est
jamais réaffecté », est inchangé.

**B3, la locale `sent`, avant l'avenant 1** : « `render()`, qui peint la zone de réponse, travaille
sur `sent` et **plus jamais** sur `field.value`. » — Révoquée : `render()` peint les deux zones.

**B3, le point « Envoyer », avant l'avenant 1** : « C'est le **seul** endroit où `stripLineBreaks`
est appelée » — Révoquée : deux sites, et B3 elle-même en nommait déjà un second trois lignes plus
bas (la comparaison de `heldExample`).

**B3, l'écouteur `input`, avant l'avenant 1** : « **Ce que fait exactement l'écouteur `input` du
champ**, et rien de plus — il ne peint que la zone d'écriture : » — Révoquée : il appelle
`render()`, qui peint les deux zones. Les trois gestes listés restent exacts, ils ont changé de
domicile.

**Critère 2 ter, avant l'avenant 1** : « `stripLineBreaks` est appliquée une fois au début de
`render()` et **jamais** à ce qui est réaffecté au champ » — Révoquée sur le compte des sites : deux,
à l'envoi et en tête de `render()`. La seconde moitié du critère est inchangée et reste due.

---
*Gelé le 25 août 2026, session 21, depuis le brouillon v8 du même jour. La v1 du même jour portait un composeur (piste B de la
ligne 9) : abandonné après démonstration qu'il répondait faux au geste qu'il visait, trouvé par le
chef de projet à la lecture, avant tout gel. La v2 marquait le dernier exemple sans fond ; la v3
lui en donne un, sur capture annotée du chef de projet. La v4 passe la zone de saisie en
plusieurs lignes : le chiffrage demandé pour raccourcir le champ a montré qu'aucune largeur ne
suffisait — 83 caractères en anglais contre 66 au mieux — et le chef de projet a tranché pour le
repli, qui absorbe la question de la largeur au lieu de l'arbitrer. La v5 tranche le sort du
retour chariot que le repli rend possible : ni touche empêchée, ni refus nommé, ni espace de
remplacement — il est détecté et ignoré, à la lecture seulement. Les trois propositions de
l'exécutant ont été écartées par le chef de projet au profit de celle-ci, qui laisse le lecteur
disposer son texte comme il veut sans rien lui prendre. La v6 ajoute le bouton « Envoyer » et
remet le cycle d'une API à l'endroit : la demande part quand le lecteur le décide, la réponse
arrive après, et la page cesse de corriger une demande qu'il n'a pas fini d'écrire. La v7 étend
l'envoi aux treize boutons d'exemple — cliquer écrit la demande, envoyer la fait partir — et coupe
la section en deux zones, celle où l'on écrit et celle qui répond, pour que le résultat soit la
découverte du lecteur et non ce qu'on lui sert. La v8 complète la rangée par les deux liaisons,
`&&` et `||`, qui ferment la séquence avant de lier : le scénario d'enchaînement du chef de projet
se fait alors entièrement au doigt, et la garde qu'il exigeait de `closeSequence` est écrite.
**Trois voies ont été proposées puis écartées dans la journée, et leurs motifs vivent dans les
brouillons** : le composeur (il répondait faux au geste qu'il visait), l'avalement de la touche
Entrée et le refus nommé du retour chariot (tous deux moins bons que de l'ignorer).
Troisième incrément de la section « Le mini-langage ».*

## Formulations révoquées par l'avenant 3 : trace, ne pas utiliser

**B3, le clic d'exemple, avant l'avenant 3** : « **Cliquer un exemple n'envoie pas.**
`field.value = exampleExpression(...)`, l'explication paraît… » — **Révoquée sur l'affectation
seule** : le remplacement inconditionnel détruisait une liaison composée au doigt. Le reste du
point (« il n'envoie pas », « le bouton s'allume », « aucun résultat ne bouge ») est inchangé et
reste dû.

**B3, l'état d'arrivée, avant l'avenant 3** : « **Au chargement**, `sent` vaut la chaîne vide, qui
n'est pas un refus mais l'absence de condition : la page s'ouvre donc sur ses dix-huit lignes,
comme aujourd'hui, et « Envoyer » est inerte. **Rien ne change à l'état d'arrivée du lecteur.** »
— **Révoquée par son auteur après mesure sur appareil.** La valeur était mauvaise : avec un bouton
d'envoi, un compte affiché à l'arrivée répond à une demande que personne n'a faite.

**B3, la franchise du signal, avant l'avenant 3** : le point exigeait que le bouton soit « franc à
l'œil » **sans dire comment**, et la première rédaction s'en est remise au filet et à l'encre
douce. — **Complétée, non révoquée** : l'exigence était juste, sa réalisation ne l'était pas. Ce
qui change est l'état **actif**, jamais l'inerte.

## Formulation révoquée par l'avenant 5 : trace, ne pas utiliser

**Point 1, la valeur, avant le recalage du 26 août 2026** : « **Valeur : JAMAIS.** Une donnée a le
droit de commencer ou finir par une espace — c'est déjà écrit au commentaire de `SEQUENCE` : "elle
est une donnée, et une donnée n'a pas à être bien élevée". » — **Révoquée par son auteur après
mesure de l'exécutant.** Elle décrivait comme existant un comportement inverse de celui du dépôt :
`value.trim()` rogne les bords depuis l'incrément 6. Le commentaire cité **existe** (l. 204) mais
dit autre chose : la valeur peut **contenir** une espace, un point-virgule, une apostrophe — ce que
la découpe sur les deux premiers deux-points garantit. Il ne dit rien des bords.

*L'exécutant s'est arrêté et a signalé plutôt que d'implémenter l'un ou l'autre : appliquer la
prescription aurait changé un comportement de l'incrément 6, hors du périmètre que l'avenant
s'était donné (« les trois autres ne touchent qu'à ce qu'elle DIT »).*

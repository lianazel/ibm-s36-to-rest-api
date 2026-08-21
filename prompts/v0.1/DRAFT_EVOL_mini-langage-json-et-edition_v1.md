# DRAFT — EVOL — Le mini-langage (2 sur 2) : le JSON, la requête, l'édition des données

**Fichier** : `prompts/v0.1/DRAFT_EVOL_mini-langage-json-et-edition_v1.md`
**Type** : EVOL (contenu + comportement + tests) · **Branche** : `feat/mini-langage-json-et-edition` · **Révision** : v1 · **Date** : 21 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> ## ⚠️ BROUILLON — NON TRANSMISSIBLE EN L'ÉTAT
> Le préfixe `DRAFT_` vaut consigne : **ce prompt n'est pas gelé et ne doit pas être exécuté.** Un point
> reste ouvert, listé en fin de document. Le retrait du préfixe, et lui seul, le gèle.
>
> **Il remplace, avec son jumeau, `DRAFT_EVOL_mini-langage_v1.md`**, qui portait la section entière en un
> seul incrément. Ce fichier-là est **caduc et à supprimer**.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | S-1 : aucun cadratin de prose dans les valeurs livrées. S-2 : **la page ne dit jamais qu'elle est sûre**, elle montre ce qui se passe. C'est la règle la plus exposée de cet incrément, dont le sujet est une tentative d'injection. S-4 : côté anglais, les termes attendus sont `parameterised query` et `bind parameter`. **Ne réécris aucune valeur existante.** |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Tout texte entre par `textContent`, **jamais `innerHTML`** : c'est doublement vrai ici, où une valeur saisie par le lecteur est réaffichée dans un texte de requête. Aucune dépendance, aucun appel réseau. **Aucune requête n'est construite ni exécutée** : les deux textes SQL affichés sont des chaînes de démonstration. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `UX_METHOD` | — | Appliqué, à mesurer | Mobile-first strict. Aucun débordement horizontal de la page à **320 px** ni à **390 px**. Le bloc JSON est **plafonné en hauteur** avec défilement vertical propre : sans filtre il porte dix-huit lignes et s'emballe (2 216 px mesurés le 21 août 2026). Les deux blocs de requête défilent dans leur conteneur. |
| `ASSURANCE_METHOD` | 1.2 | Appliqué | La fabrication des deux textes de requête et la traduction des bornes sont de la **logique pure** : elles vont dans le module existant et sont couvertes par la suite existante, qui s'étend. |
| `PEDAGOGY_METHOD` | — | **Appliqué** | Le vis-à-vis des deux requêtes **est** le dispositif pédagogique de cet incrément : il montre au lieu d'affirmer. Le mot « paramètre » est étiqueté à sa première apparition. |
| `VISION_METHOD` | — | Écarté, hésitation nommée | Même motif qu'au premier sous-incrément : la validation visuelle et tactile reste au chef de projet. N'installe rien. |
| `SQL_METHOD` | — | Écarté, motif nommé | **Aucune requête n'est émise vers aucune base** : la frontière A/B/C ne s'applique pas. Les deux textes SQL sont des illustrations, jamais exécutées, et le prompt l'écrit en toutes lettres pour que la revue puisse le vérifier. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** :
`docs(prompt): prompts/v0.1/EVOL_mini-langage-json-et-edition_v1.md`
*(à corriger au gel, quand le préfixe `DRAFT_` sautera).*

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

**Ces contrôles ne sont pas une formalité : ils établissent que la matière sur laquelle cet incrément
travaille existe bien sur `main`. Si l'un d'eux échoue, ARRÊTE-TOI et signale, sans rien corriger.**

1. `git checkout main`. `git rev-list --count origin/main..main` = **0**.
2. Version au manifeste **strictement supérieure à 0.1.15**.
3. `.pipeline/STATUS.md` commence par `CLOSED`.
4. `npm test` vert sur `main`. Relève le compte exact ; c'est ta base de départ.
5. **Le module du langage existe** : `js/minilangage.js` est présent et exporte de quoi lire une
   expression, joindre une commande à son client et à son mode, et filtrer le décor. Si le fichier est
   absent → ARRÊTE-TOI et signale.
6. **Le décor est en place et entier** : le module porte **dix-huit** commandes, **dix-huit** clients,
   **dix-huit** modes par client et **six** modes au référentiel. Un compte différent → ARRÊTE-TOI et
   signale.
7. **La classe fabriquée est en place** : la section 4 d'`index.html` porte la zone de la classe et les
   neuf propriétés cochables. `grep -c 'data-i18n="section4' index.html` est **strictement supérieur à
   2**. Sinon → ARRÊTE-TOI et signale.
8. **La suite du langage existe** : `tests/minilangage.test.js` est présent et vert.
9. Cadratins : relève les trois comptes de `js/i18n.js`, `index.html` et `css/styles.css` **avant** toute
   écriture. Ils doivent être **inchangés** à la fin.

## Contexte et périmètre

La section 4 porte déjà son texte, son décor, son reconnaisseur et sa classe fabriquée. Cet incrément lui
ajoute **trois choses, et rien d'autre** : le JSON renvoyé, la requête que le serveur bâtirait, et le
droit pour le lecteur de modifier les données.

**Périmètre** : `index.html`, `js/i18n.js`, `css/styles.css`, `js/minilangage.js`,
`tests/minilangage.test.js`. **Rien d'autre.**

**Hors périmètre, explicitement.** Aucune dépendance, aucun appel réseau, aucune image, aucune animation.
Aucune modification du texte de la section, du décor, du reconnaisseur ni de la classe fabriquée : ils
sont **atterris et gelés**. Si l'un d'eux te semble fautif, écris-le dans `changes.md` et **n'y touche
pas**. Les dettes ouvertes restent ouvertes, y compris **[W23]**.

---

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/mini-langage-json-et-edition` · `.pipeline/spec.md`, dont la **première ligne** est
exactement `Incrément : EVOL mini-langage-json-et-edition` · commit du prompt (message exact ci-dessus).

## ÉTAPE 2 — Livrable A : le JSON renvoyé

Une zone de plus, **après** la classe fabriquée : le JSON que l'API renverrait, avec les seules
propriétés cochées et les seules lignes retenues par le filtre.

- Une propriété dont la jointure ne trouve rien vaut **`null`**, et le JSON l'écrit `null`, sans
  guillemets. C'est le comportement que le livrable C rendra visible.
- Les entiers et les décimaux sortent sans guillemets, les textes avec.
- **Le bloc est plafonné en hauteur** avec défilement vertical propre : sans filtre il porte dix-huit
  lignes, mesurées à 2 216 px le 21 août 2026.
- Aucune colonne cochée : le bloc le dit, il ne disparaît pas.

## ÉTAPE 3 — Livrable B : la requête, et le vis-à-vis qui la justifie

Sous le JSON, **le texte de la requête que le serveur bâtirait**. Il n'est jamais exécuté : c'est une
illustration, et le code doit le dire en commentaire.

**Forme normale, toujours affichée.** La requête paramétrée : le `select` sur les colonnes des fichiers,
les jointures **seulement quand une colonne les exige**, la clause `where` où chaque valeur est remplacée
par un `?`, puis la liste des valeurs sous la requête. Une ligne étiquette le mot : un `?` est un
**paramètre**, la valeur voyage à côté du texte de la requête et jamais dedans.

**Les bornes de montant sont traduites avant de partir en paramètre.** Le fichier stocke `000012550` pour
125,50 : `125` part donc en `12500`. Sans cette traduction, la requête affichée ne trouverait pas ce que
le simulateur montre, et la page mentirait sur son propre mécanisme. Une ligne le dit au lecteur, et la
règle vient de `parseImplicitDecimal` (`js/s36.js`), jamais d'un second calcul écrit ici.

**Forme du vis-à-vis, et c'est le cœur de cet incrément.** Quand la valeur saisie **contient une
apostrophe**, un second bloc apparaît **au-dessus** du premier : la requête qu'une API naïve aurait
fabriquée en collant les textes bout à bout, valeur comprise. Deux phrases, une par bloc :

- sous le bloc naïf : l'apostrophe de la valeur referme le texte, la fin devient de la grammaire de
  requête, et une condition toujours vraie ramènerait le fichier entier ;
- sous le bloc paramétré : la valeur reste une donnée, un simple nom de client, et ce client n'existe pas.

**Réserve de rédaction, et elle est stricte.** Deux phrases, pas trois. Cette page n'est pas un cours de
sécurité : elle montre deux textes côte à côte et laisse le lecteur conclure. **La page n'écrit nulle
part qu'elle est sûre** (règle S-2). Elle ne prétend pas non plus que le code d'origine procède ainsi.

**Le bloc naïf n'apparaît jamais sans apostrophe dans la valeur** : sur une demande ordinaire, la page
reste sobre et n'affiche que la requête paramétrée.

## ÉTAPE 4 — Livrable C : l'édition des données par le lecteur

Les dix-huit commandes deviennent modifiables **après un bouton « Modifier les données »**, jamais
d'emblée. *(Arbitrage du chef de projet, 21 août 2026.)*

**Le motif, et il doit survivre à cet incrément. Reporte-le en commentaire dans le code.** Le bouton
fabrique une **intention**. Sans lui, le lecteur qui casse une jointure a fait une fausse manœuvre : il
subit un message qu'il ne comprend pas. Avec lui, il a d'abord décidé d'ouvrir les données, puis choisi
sa cellule ; quand la conséquence arrive, elle répond à une question qu'il vient lui-même de poser. **On
n'apprend pas d'un accident, on apprend d'une expérience.** C'est la thèse du site en petit : la jointure
par les valeurs est fragile, et le lecteur ne le croit pas parce qu'on l'écrit, il le sait parce qu'il
l'a cassée de ses mains.

- Seules les commandes sont modifiables. Les trois autres fichiers ne le sont pas.
- Une modification rejoue aussitôt le filtre, la jointure, la classe, le JSON et la requête.
- Quand une modification casse la jointure, un message d'**information** apparaît sous le tableau. Jamais
  rouge, jamais un message d'erreur : **casser n'est pas une faute, c'est la démonstration.** Il nomme la
  ou les commandes devenues orphelines et dit que les trois propriétés jointes rendent `null`. Il
  disparaît dès que la valeur d'origine revient.
- **Le clavier du téléphone corrige et met en capitale de son propre chef.** Coupe correcteur, correction
  automatique et capitalisation sur ces cellules : sinon il invente des valeurs que le lecteur n'a pas
  tapées. *(Mesuré sur iPhone 14 le 21 août 2026.)*

## ÉTAPE 5 — Tests

La suite `tests/minilangage.test.js` s'étend, **logique pure, aucun DOM** :

1. Le rendu JSON : `null` pour une jointure sans correspondance, guillemets pour les textes, pas de
   guillemets pour les nombres, aucune virgule après le dernier objet.
2. La requête paramétrée : les jointures n'apparaissent **que** quand une colonne les exige, un `?` par
   valeur, deux pour un « compris entre ».
3. **La traduction des bornes** : `125` devient `12500`, et une borne texte n'est pas traduite. Les deux
   sens sont testés.
4. Le vis-à-vis : le texte naïf porte la valeur **collée**, le texte paramétré porte un `?` et jamais la
   valeur. Un test vérifie que la valeur d'injection **n'apparaît pas** dans le texte paramétré.
5. La rupture de jointure : après remplacement d'un nom, la commande touchée rend `null` sur les trois
   propriétés jointes, et **seulement** sur celles-là.

## ÉTAPE 6 — Preuves

À compléter au gel : comptages avant et après **en occurrences et non en lignes**, cadratins inchangés
aux trois fichiers, aucun `innerHTML`, aucun `<script>` ajouté, chevrons échappés, aucun des six mots
interdits dans les valeurs livrées, parité stricte des clés FR et EN.

**Preuve propre à cet incrément, à écrire dans `changes.md`** : la valeur saisie par le lecteur est
réaffichée dans deux textes de requête. Montre, commande à l'appui, qu'elle y entre par `textContent` et
**jamais** par `innerHTML`, et qu'une valeur portant des chevrons ne produit aucun élément dans la page.

## ÉTAPE 7 — HANDOFF (dernier geste)

`.pipeline/changes.md` + `.pipeline/test-results.md` · un commit, staging précis · **délègue la revue au
subagent `reviewer`** (→ `review.json`) · `.pipeline/STATUS.md` =
`READY — EVOL mini-langage-json-et-edition — <ISO> — feat/mini-langage-json-et-edition — tests <X/Y>` ·
**STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Le JSON rendu sous la classe, plafonné en hauteur, `null` où la jointure ne trouve rien.
2. La requête paramétrée toujours affichée, ses jointures conditionnelles, ses `?` étiquetés.
3. Le bloc naïf **uniquement** quand la valeur porte une apostrophe, avec ses deux phrases et pas trois.
4. Les commandes modifiables après bouton, le message d'information bleu, sa disparition à la réparation.
5. Les cinq familles de tests ci-dessus, vertes.
6. Aucune modification du texte, du décor, du reconnaisseur ni de la classe.
7. `review.json` en SHIP pour cet incrément et ce commit, READY écrit en dernier.

---

## Ce que ce brouillon attend

**Les valeurs anglaises** ne sont pas écrites. Elles le seront au gel. Attention particulière ici : les
deux phrases du vis-à-vis sont le passage le plus délicat de la section, et une traduction mot à mot en
ferait un cours de sécurité. Règle S-4.

---
*Brouillon déposé le 21 août 2026. Second des deux sous-incréments de la section « Le mini-langage ».*

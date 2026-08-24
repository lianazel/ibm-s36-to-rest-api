# EVOL — Prototype et production : la famille d'une phrase se retire d'un seul geste, et l'introduction dit la vraie histoire

**Type** : EVOL (contenu seul : valeurs de dictionnaire, méta-description, README ; aucun comportement) ·
**Branche** : `feat/prototype-et-production` · **Révision** : v2 · **Gelé le** : 24 août 2026 (session 20)
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

> ## GELÉ — ARBITRAGE COMPLET DU CHEF DE PROJET, 24 AOÛT 2026
> Toutes les valeurs de ce prompt sont **arbitrées** : les quatre de la section 3 mot à mot le
> 23 août (la dernière phrase de la valeur 5 réarbitrée le 24, au re-gel, avant toute exécution),
> les huit autres (p1, p2, p3, a3, méta-description, README) validées en bloc le 24 août
> en session 20, après cinq tours de travail sur les formulations. **Ne les réécris pas, ne les
> améliore pas : recopie-les au caractère près.** La session 18 a perdu une barre oblique en
> recopiant, la session 19 a failli perdre une date. Les prérequis de l'ÉTAPE 1 ont été re-mesurés
> au gel (24 août, sur `fe1f5bd`) ; re-vérifie-les avant d'agir, un écart vaut ARRÊT.
> Le brouillon et ses états intermédiaires restent dans `Etude_Technique/Prompts_Non_Suivis/`
> (`DRAFT_..._v1.md` et `DRAFT_..._v2.md`), hors dépôt, comme trace.

## Le motif, et il est de méthode

Le site affirme à plusieurs endroits que ce qu'il raconte « existe et tourne », « architecture
réelle, testée ». Or la réalité a **trois niveaux**, pas deux : les fichiers S/36 tournent
**encore, en production**, c'est la thèse et elle ne bouge pas ; le prototype de l'API a
**démontré que cela fonctionne**, construit, opérationnel, jamais parti en production ; le
mini-langage est un chantier de recherche né en marge de ce prototype. En collant les deux
premiers, la formulation actuelle affaiblit le niveau fort et prête au prototype ce qui n'est vrai
que du S/36. **La leçon du 16 août 2026 commande cet incrément : une affirmation réfutée se retire
de tous ses domiciles, d'un seul geste.**

S'y ajoutent trois décisions du chef de projet du 24 août, session 20 :

1. **La réécriture de l'introduction du mini-langage entre dans cet incrément.** Le chef de projet
   jugeait l'introduction « creuse », parce qu'elle taisait la vraie histoire (ci-dessous). Même
   domicile, même nature éditoriale, un seul geste.
2. **Les emprunts ont deux sources, et une seule se tait.** Les opérateurs de chaînes `[=`
   (commence par) et `=]` (finit par) viennent d'un langage d'un autre éditeur, au caractère près :
   celui-là ne se nomme pas. La logique vient du **C#**, qui se nomme, le site le nommant déjà
   partout : le ET `&&` et le OU `||` (mesurés dans `js/minilangage.js` l. 232-238, affichés tels
   quels par les exemples « deux conditions » et « ET mêlé à OU »), et le « différent de » (le C#
   l'écrit `!=`, la graphie même que la page interdit ; la solution du chef de projet l'écrivait
   `=!` de mémoire, à confirmer, non bloquant). Les autres tests (`==`, `[]`, `><`, `=>`, mesurés
   l. 160-167) ne réclament pas de généalogie.
3. Un renommage du système (« Trois listes ») a été envisagé puis **retiré** : le nom
   « mini-langage » reste, au titre, au menu, partout. Aucun geste de nom dans cet incrément.

## La vraie histoire, matière des valeurs, racontée par le chef de projet le 24 août

Pendant la conception du système par réflexion C#, avant le modèle dynamique, l'idée est venue tout
de suite : réutiliser les noms de colonnes métier pour construire les filtres de recherche, et
laisser l'utilisateur saisir ses filtres **en toute sécurité**. Un chantier né en parallèle du
prototype. L'intérêt technique : la réflexion travaille **dans les deux sens**. La colonne métier de
la requête (`CDEMST.NOMCLI as nomClient`) sert à retrouver la vraie colonne SQL. La trouvaille est
double. Les deux opérateurs de comparaison de chaînes, « commence par » et « finit par », viennent
d'un langage d'un autre atelier, dont la syntaxe disait déjà tout. La logique, elle, vient du C# :
le ET `&&` et le OU `||`, que la page affiche tels quels, et le **« différent de »** (le C# écrit
`!=` ; la solution l'écrivait `=!` de mémoire, à confirmer sur le code du POC, sans conséquence sur
ce gel : aucune valeur n'imprime ce glyphe). La version d'essai du site refuse la négation
**exprès** (`!=` au catalogue des interdits, `js/minilangage.js` l. 173, exemple rouge « négation
interdite ») : l'histoire et le refus se renforcent au lieu de se contredire. **Le mini-langage a
réellement tourné dans la solution .Net** (confirmé par le chef de projet le 24 août) : des filtres
saisis et exécutés, dans l'atelier, jamais en production. Il partage donc le statut du prototype, et
il est **le résultat d'un travail de recherche**, pas une fantaisie née sur ce site.

## Garde d'anonymisation, absolue

Le document source de l'histoire (note interne du 24/08/2026 : tableau des opérateurs, code
d'exemple) **n'entre jamais dans le dépôt public**, ni en scan, ni en extrait : il porte un nom de
société et des noms de tables réels. Si un tableau d'opérateurs se montre un jour, il se **recrée**,
comme tout code de ce site. Cet incrément n'en a pas besoin : il n'écrit que de la prose.

## Périmètre : les domiciles, tous

| Domicile | Ce qu'il dit aujourd'hui | Ce qu'il devient |
|---|---|---|
| `section4.ouverture.p1` (FR + EN) | « Tout ce que le site raconte jusqu'ici existe et tourne. … nulle part ailleurs. » | valeur 1, **GELÉE** |
| `section4.ouverture.p2` (FR + EN) | « Elle part d'une question simple : … Trois listes, et rien en dehors. » | valeur 2, **GELÉE** |
| `section4.ouverture.p3` (FR + EN) | « Est-ce que ça tient debout ? … » | valeur 3, **GELÉE** |
| `section4.pourquoi.a3` (FR + EN) | « Un where ouvert ne se borne pas. On ne peut ni… ni… on le peut. » | valeur 4, **GELÉE** |
| `section3.etape.p1` (FR + EN) | « Le noyau tourne, et je ne suis pas allé plus loin. … » | valeur 5, **GELÉE** (arbitrage du 23 août, dernière phrase réarbitrée le 24) |
| `section3.etape.title` (FR + EN) | « Le noyau tourne. Il restait une étape » | valeur 6, **GELÉE** (arbitrage du 23 août) |
| `meta.description` (FR + EN, `js/i18n.js` l. 45 et 519 + valeur initiale d'`index.html` l. 13) | « architecture réelle, testée, expliquée » / « a real, tested, explained architecture » | valeur 7, **GELÉE** |
| `README.md` l. 28 (FR) | « raconte une architecture .Net réelle » | valeur 8, **GELÉE** |
| `README.md` l. 7 (EN) | « telling the story of a real .Net architecture » | valeur 8, **GELÉE**. Domicile trouvé au balayage du 24 août : la leçon du 16 août l'exige au périmètre |

`section4.ouverture.titre` (« Une idée, pas une pièce du système » / EN), `section4.title` et
`nav.minilangage` restent tels quels.

**Fichiers** : `js/i18n.js`, `index.html` (la valeur initiale de la méta-description), `README.md`,
plus `tasks/ROADMAP.md` (ÉTAPE 3) et les artefacts de `.pipeline/`. **Rien d'autre.** Aucun code,
aucun test de comportement neuf ; **aucune clé créée, aucune supprimée**. La structure p1/p2/p3 +
a1/a2/a3 est conservée. Les comptes (cadratins, parité, `data-i18n`) se relèvent avant/après et ne
bougent que de ce que les valeurs réécrites changent. Les lignes 14 (EN) et 35 (FR) du README
(« the prompts … are real » / « les prompts … sont réels ») sont **vraies et restent** : elles
parlent du harnais, pas de l'API.

## Les valeurs gelées

**Valeur 1 — `section4.ouverture.p1`**

- **FR** : Ce chapitre n'est pas comme les autres. Jusqu'ici, le site raconte du réel : des fichiers S/36 qui tournent encore en production, et un prototype qui a démontré que l'API fonctionne, jamais parti en production. Ce qui suit est né en marge de ce prototype, comme un chantier de recherche. Il a tourné dans mon atelier, jamais ailleurs, et cette page le remet en scène.
- **EN** : This chapter is not like the others. Up to here, the site tells of real things: S/36 files still running in production, and a prototype that proved the API works, never taken to production. What follows was born alongside that prototype, as a research project. It ran in my workshop, nowhere else, and this page puts it back on stage.

**Valeur 2 — `section4.ouverture.p2`** *(la réflexion à double sens vit avant la chute, en une
phrase courte ; le paragraphe finit sur « Trois listes, et rien en dehors » ; le détail de la
correspondance n'est pas raconté, le bloc « Colonnes voulues » le montre plus bas. **EN réarbitré
le 24 août avant tout commit**, sur observation déclarée de l'exécutant dans sa spec : l'appelant
se dit they/them/their, comme dans les 235 autres valeurs anglaises du site — la version he/him,
traduction du Tech Lead, aurait introduit les premiers he/him d'appelant du dictionnaire. Le FR
garde son « il »)*

- **FR** : L'idée est venue tout de suite, pendant la conception du prototype : les noms métier que l'API expose pouvaient servir une seconde fois, pour construire les filtres de recherche. La réflexion qui fabrique ces noms sait d'ailleurs les traduire dans les deux sens, du fichier vers le métier et retour. La question était simple : qu'est-ce qu'un appelant a le droit de demander ? Lui laisser écrire lui-même son filtre, c'est lui donner les clés du bâtiment. Il pourrait lire une colonne que je ne lui montre pas, ouvrir un fichier dont je ne lui ai jamais parlé. Alors j'ai imaginé l'inverse : il ne rédige rien, il choisit. Une colonne dans la liste que j'expose, un test dans une liste de six, et une valeur. Trois listes, et rien en dehors.
- **EN** : The idea came at once, while the prototype was being designed: the business names the API exposes could serve a second time, to build the search filters. The reflection that builds those names can, in fact, translate them both ways, from file to business and back. The question was simple: what does a caller have the right to ask for? Letting them write their own filter means handing them the keys to the building. They could read a column I do not show, open a file I never told them about. So I imagined the opposite: they write nothing, they choose. A column from the list I expose, a test from a list of six, and a value. Three lists, and nothing outside them.

**Valeur 3 — `section4.ouverture.p3`** *(les quatre phrases de la germination sont du chef de
projet mot à mot, 24 août ; les trois dernières phrases trient les deux idées — le modèle
dynamique, déjà raconté à la section 3 ; celle du mini-langage, encore à juger — et la phrase
finale est celle du site actuel au caractère près)*

- **FR** : Ce langage, je ne l'ai pas inventé seul. Le ET, le OU et le « différent de » viennent du C# lui-même ; « commence par » et « finit par », d'un langage d'un autre atelier, dont les opérateurs de chaînes disaient déjà tout. Le « différent de », justement : celui-là, la page le refuse exprès, et elle dit pourquoi plus bas. Puis ce chantier s'est arrêté là où le prototype s'est également arrêté. Tout fonctionnait très bien. Mais une nouvelle idée commençait à germer : trouver un moyen pour que le système se débrouille tout seul. Cette idée-là est déjà racontée : c'est elle qui a donné le modèle dynamique. Celle du mini-langage, est-ce qu'elle tient debout ? C'est exactement ce que la suite de cette page permet d'essayer.
- **EN** : This language I did not invent alone. The AND, the OR and the "not equal" come from C# itself; "starts with" and "ends with", from a language out of another workshop, whose string operators already said it all. The "not equal", precisely: that one, this page refuses on purpose, and it says why further down. Then this project stopped where the prototype also stopped. Everything worked very well. But a new idea was beginning to take root: finding a way for the system to manage on its own. That idea has already been told: it is the one that became the dynamic model. As for the mini-language's idea, does it hold up? That is exactly what the rest of this page lets you try.

**Valeur 4 — `section4.pourquoi.a3`** *(l'ellipse « on ne peut / on le peut » résolue, le sujet
nommé ; « cette page » plutôt qu'un terme que la page n'étiquette pas)*

- **FR** : Un where ouvert ne se borne pas : rien ne permet d'y interdire une négation qui ramènerait tout, ni d'y exiger deux caractères sur un « contient ». Avec trois listes closes, ces règles s'écrivent, et cette page les applique une par une.
- **EN** : An open where cannot be fenced in: nothing lets you forbid a negation that would return everything, or require two characters on a "contains". With three closed lists, those rules can be written, and this page applies them one by one.

**Valeur 5 — `section3.etape.p1`** *(arbitrage du 23 août ; dernière phrase réarbitrée le 24 août
au re-gel, avant toute exécution, en deux temps : l'enregistrement du modèle rejoint le chantier
d'après, en écho au « enregistrée plutôt que ressaisie » de la requête, puis l'idée technique entre
dans la valeur en parenthèse, sur décision du chef de projet — elle montre que la réflexion était
déjà avancée, et sert d'aide-mémoire pour la reprise. Deux normalisations déclarées sur sa
formulation : « lui même » devient « lui-même », le point final sort de la parenthèse. Le titre
« Il restait une étape » reste vrai : l'étape unique est la requête nommée, le reste est le chantier
d'après. L'EN suit l'orthographe britannique déjà présente au dictionnaire, « recognised » donc
« serialising »)*

- **FR** : Le noyau qui construit le modèle dynamique est opérationnel, et je ne suis pas allé plus loin. Il restait une étape. Une requête mise au point pour l'API mériterait d'être enregistrée plutôt que ressaisie : l'appelant la désignerait alors par son nom, et non par son texte. C'est cette étape qui en aurait fait un produit. Pas parfait, mais intéressant. Restreindre ce qu'une requête a le droit de faire, et enregistrer aussi le modèle une fois bâti plutôt que le refabriquer à chaque fois (sérialiser le type CLR lui-même), appartiennent au même chantier, celui d'après.
- **EN** : The core that builds the dynamic model is operational, and I did not take it further. One step was left. A query tuned for the API would deserve to be stored rather than retyped: the caller would then name it, instead of sending its text. That step is what would have made it a product. Not a perfect one, but an interesting one. Restricting what a query is allowed to do, and storing the model once built rather than rebuilding it every time (serialising the CLR type itself), belong to the same job, the next one.

**Valeur 6 — `section3.etape.title`** *(arbitrage du 23 août, inchangé)*

- **FR** : Le noyau est opérationnel. Il restait une étape
- **EN** : The core is operational. One step was left

**Valeur 7 — `meta.description`** *(la phrase la plus exposée du site ; s'écrit dans `js/i18n.js`
aux deux langues ET dans la valeur initiale d'`index.html`)*

- **FR** : Un prototype d'API REST .Net qui expose en JSON des fichiers hérités IBM S/36 tournant sur IBM i : démontré, testé, expliqué.
- **EN** : A .Net REST API prototype exposing legacy IBM S/36 files running on IBM i as JSON: demonstrated, tested, explained.

**Valeur 8 — `README.md`, les deux lignes**

- **l. 28, FR** : **Des fichiers S/36 à l'API REST.** Un site statique bilingue qui raconte un prototype d'API .Net : exposer en JSON des fichiers plats IBM S/36 qui tournent encore sur IBM i.
- **l. 7, EN** : **From S/36 files to a REST API.** A bilingual static site telling the story of a .Net API prototype: exposing IBM S/36 flat files, still running on IBM i, as clean JSON.

## Formulation révoquée : trace, ne pas utiliser

L'`ouverture.p1` gelée le 23 août disait : « Ce chapitre n'est pas comme les autres. Jusqu'ici, le
site raconte du réel : des fichiers S/36 qui tournent encore en production, et un prototype qui a
démontré que l'API fonctionne, jamais parti en production. Ce qui suit est une idée que j'ai eu envie
d'essayer, ici, sur ce site, et nulle part ailleurs. » Révoquée le 24 août par son auteur : la
clause finale est fausse, l'idée est née avec le prototype et a tourné dans l'atelier. Ses deux
premières phrases survivent dans la valeur 1.

## Étapes

0. **CONFRONTATION**, puis relecture de ce prompt depuis le disque avant la première ligne.
1. Prérequis, re-mesurés au gel le 24 août 2026, à re-vérifier avant d'agir : version au manifeste
   **0.1.17** ; `main` = `origin/main` = **`fe1f5bd`** ; `.pipeline/STATUS.md` commence par
   `CLOSED — session 19` ; tests **282/282** ; parité `section4` **117 = 117**. Un écart : ARRÊT.
2. Branche `feat/prototype-et-production`, spec, commit du prompt.
3. Les valeurs réécrites (les neuf domiciles du tableau, dont les quatre valeurs de la section 3
   gelées le 23 août), le `README` (deux lignes). Recaler la **ligne 8 du fil**
   (`tasks/ROADMAP.md`) sur le périmètre élargi : précédent des sessions 18 et 19, écart déclaré.
4. Preuves : comptes avant/après en occurrences ; **balayage final** : `grep` sur « tourne »,
   « réelle », « réel », « runs », « real », **« nulle part ailleurs »**, **« nowhere else »**,
   **« existe et tourne »**, **« exists and runs »** dans `js/i18n.js`, `index.html`, `README.md`,
   chaque occurrence restante justifiée nommément (les fichiers S/36, eux, tournent ; les prompts du
   harnais, eux, sont réels : ces occurrences-là restent). **Chargement réel de la page au
   navigateur, `?lang=fr` puis `?lang=en`** : leçon [W32], une suite verte ne prouve pas que la
   page monte.
5. HANDOFF : revue par le `reviewer`, `READY` en dernier, stop avant merge.

---
*Gelé le 24 août 2026, session 20, sur l'état `fe1f5bd` / 0.1.17. Brouillons v1 (23 août) et v2
(24 août, cinq tours de travail en session 20) dans `Etude_Technique/Prompts_Non_Suivis/`.
Décisions du chef de projet du 24 août : réécriture de l'introduction dans cet incrément ; deux
sources d'emprunt, le C# nommé, l'autre atelier tu ; renommage envisagé puis retiré ; fait
confirmé — le mini-langage a tourné dans la solution .Net, jamais en production ; arbitrage global
des huit valeurs en fin de session (« Je raconte la vérité et je ne cache rien »). Re-gel du même
jour, avant toute exécution : la dernière phrase de la valeur 5 élargie au modèle enregistré, puis
l'idée technique « (sérialiser le type CLR lui-même) » entrée dans la valeur en parenthèse, décision
du chef de projet, deux motifs — montrer l'avancée de la réflexion, se le rappeler à la reprise.
Second re-gel après le plantage machine qui a coupé la première exécution (aucun commit fait,
travail préservé dans l'arbre) : l'EN de la valeur 2 passe en they/them/their, arbitrage du chef sur
l'observation déclarée de l'exécutant. Domicile neuf trouvé au balayage : README l. 7 (EN).*

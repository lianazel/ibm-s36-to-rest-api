# Registre local des leçons — IBMiAPI

> Une leçon = une erreur commise ici, datée, avec la règle qui l'empêche de revenir.

## 17 août 2026 — Coder ou dire, pas d'adverbe entre les deux

**Type** : Erreur
**Contexte** : CHORE `revue-structuree` (branche `chore/revue-structuree`, merge `38dcd34`). Trois passes
de revue sur un module dont la thèse est qu'**un contrat ne doit pas décrire plus qu'il ne contrôle**.
**Erreur** : à chaque passe, le `reviewer` a trouvé un **adverbe absolu plus large que le code**, dans le
commentaire, jamais dans la logique. 1ʳᵉ passe : le contrat décrivait `file` (« chemin relatif au dépôt »)
et `overrule.by` (littéral « chef de projet ») sans les contrôler — une réserve pointant `/etc/passwd` et
un `overrule` signé « le reviewer lui-même » passaient. 2ᵉ passe : le commentaire disait `file`
**« contrôlé »** alors que `~/.ssh/id_rsa` passait. 3ᵉ passe : il disait la fonction **« totale quel que
soit** le contrat injecté » alors que trois formes jettent encore. Le code était chaque fois plus faible
que sa description, et **c'est la description qui rassurait**.
**Correction** : un mot comme *contrôlé*, *toujours*, *quel que soit*, *jamais* est une **assertion
vérifiable** : soit on la mesure et on la code, soit on écrit ce que le code fait vraiment — jamais un
adverbe entre les deux. Le remède est mécanique, pas une vigilance : quand la classe de défaut est
fermable en une ligne, on la ferme ; sinon on **énumère** ce qui passe (`....//x`, `%2e%2e/etc`) plutôt
que de le taire. Corollaire de conception : une **couture ajoutée pour la testabilité** élargit la surface
publique, donc les obligations — c'est ainsi que « totale » est devenue fausse.
**Portée du dégât** : aucune en production (la CLI n'injecte jamais de contrat) ; les deux premières ont
été trouvées et fermées avant le merge, la troisième est inscrite en **[W17]** par arbitrage.
**Applicable globalement ?** : à arbitrer par le chef de projet.

## 16 août 2026 — « Reconnu largement » n'est pas une règle, c'est une intention

**Type** : Erreur
**Contexte** : CHORE `garde-revue-land` (session 8, merge `bfacccb`), 3ᵉ passe de revue.
**Erreur** : j'avais écrit l'étiquette d'incrément `incrément[^:]*:` en la commentant « reconnue
largement ». Elle reconnaissait **tout** — `**Incrément précédent** : <le nôtre>` compris. Une revue
d'un **autre** incrément, verdict `SHIP` bien réel, faisait donc atterrir le nôtre : le défaut fondateur
du projet, revenu par la porte qui venait de le fermer.
**Correction** : une intention formulée en langue (« largement », « souple », « tolérant ») devient, en
expression régulière, **« n'importe quoi »**. Une classe d'acceptation s'écrit **close et énumérée**
(`Incrément`, `Incréments`, `Incrément revu`), jamais ouverte. Et le commentaire doit nommer ce que la
classe **exclut**, pas seulement ce qu'elle admet.
**Applicable globalement ?** : à arbitrer par le chef de projet.

## 16 août 2026 — Une affirmation réfutée se retire de tous ses domiciles

**Type** : Erreur
**Contexte** : CHORE `garde-revue-land` (session 8), puis vérifiée deux fois de plus dans CHORE
`revue-structuree` (17 août).
**Erreur** : j'avais écrit qu'un bloc de code non refermé donnait « un refus du bon côté ». Mesure
contraire : un `SHIP` de synthèse lu avant la rupture faisait atterrir la revue qui le refusait. J'ai
corrigé la phrase **en tête** du fichier et l'ai laissée **en pied**, dans la section « Non couvert » —
celle qu'on lit précisément pour savoir ce qui n'est pas couvert. Récidive à la passe suivante : la
phrase corrigée (« la limite a disparu ») était encore trop large. Et troisième occurrence, autre
fichier : un tableau annoncé « mesuré par fichier, pas déduit » portait 12/12/12 pour des fichiers qui
valent 10/13/13 — **les trois erreurs se compensaient**, donc la somme et le total tenaient.
**Correction** : une affirmation réfutée se retire de **tous** ses domiciles — un artefact se relit en
entier, `grep` à la main sur la formulation fautive, pas seulement à l'endroit où la réfutation est
arrivée. Et **une somme juste ne prouve pas des termes justes** : un total qui tombe rond n'atteste rien
si chaque terme n'a pas été mesuré séparément.
**Applicable globalement ?** : à arbitrer par le chef de projet.

## 15 août 2026 — Lire l'attribut n'est pas mesurer le pixel

**Type** : Erreur
**Contexte** : CHORE `menu-hamburger`. Le retour au portfolio devait rester invisible sans
`?from=portfolio`. Trois vérifications navigateur l'ont déclaré masqué. Le chef de projet a ouvert le
site sur son téléphone et **l'a vu à l'écran**.
**Erreur** : mes trois mesures lisaient `a.hidden` — la présence de l'**attribut**. L'attribut était
bien là. Mais `[hidden] { display: none }` ne vient que de la feuille du **navigateur**, et toute règle
d'auteur posant `display` sur le même élément la neutralise en silence : ma propre cible tactile
`.about a { display: inline-flex }` rendait le lien visible. 128 × 44 px peints sous un attribut qui
disait « caché ». Le lien du pied de page, lui, n'était couvert par aucune règle d'auteur : il était
correctement masqué — ce qui a rendu le défaut d'autant plus discret, une moitié du contrôle passant
au vert.
**Correction** : `[hidden] { display: none !important; }` en tête de feuille, pour que l'attribut
redevienne une garantie et non une suggestion. Et surtout : **une propriété du DOM qui décrit une
intention ne se substitue jamais à la mesure de ce qui est peint.** Ce qui se vérifie, c'est
`getComputedStyle().display` et la boîte rendue (`getBoundingClientRect`), jamais `el.hidden`,
`classList.contains` ou la présence d'un attribut. La même règle vaut pour `disabled`, `inert`,
`aria-hidden` : l'état déclaré et l'état rendu sont deux mesures distinctes.
**Portée du dégât** : aucune — le défaut est mort sur la branche, avant le merge. Il a été trouvé par
un œil humain sur un appareil réel, pas par mes portes. C'est exactement le rôle que la méthode
réserve au chef de projet, et il a servi.
**Applicable globalement ?** : **oui, à mon sens** — vaut pour tout projet web, indépendamment de la
stack. À arbitrer par le chef de projet ; promotion = geste dédié (entrée A-1). Voisine de la leçon
globale du 8 août (« une mise en page mesurée dans un autre environnement de polices n'est pas le même
site ») : même famille, celle des vérifications qui mesurent autre chose que ce qu'elles croient.

## 14 août 2026 — Cowork : deux assertions non mesurées le même jour

**Type** : Erreur
**Contexte** : absence de `.git` déclarée « prouvée » sans départager « pas encore créé » de « non visible » ; contraste « AA » affirmé sans mesure, réfuté par la revue à 3,35:1.
**Règle** : une affirmation vérifiable ne s'écrit qu'accompagnée de sa vérification, exécutée le jour même.
**Applicable globalement ?** : à arbitrer par le chef de projet (promotion = entrée A-1, geste dédié).

## 14 août 2026 — Une preuve de morsure jetée ne protège que le jour où on la fait

**Type** : Succès
**Contexte** : CHORE `porte-i18n-html` (dette W2, branche `chore/porte-i18n-html`, commit `4b7aafb`).
Le prompt prescrivait deux preuves de bac à sable — altérer une clé d'`index.html` pour voir la porte
rougir, rediriger la lecture vers un HTML vide pour voir la garde de non-vacuité lever — puis tout
restaurer sans rien commiter.
**Approche** : les deux preuves ont été exécutées telles que demandées, et **doublées** de témoins
committés dans le fichier livré — un par chemin capable de pousser une erreur : garde de cécité, clé
absente, clé désignant un groupe, valeur vide, `data-i18n-attr` incomplet. Pour que ces témoins
existent, la source HTML et la table de résolution sont devenues des **paramètres** de la porte : sans
ces coutures, le cas « valeur vide » n'avait aucune cible où mordre (le dictionnaire réel n'en porte
aucune, la porte de parité l'interdit) et le chemin d'échec de la garde exigeait de casser un fichier
du dépôt.
**Règle** : une preuve de bac à sable atteste que la porte mord **le jour où on la fait** ; seul un
témoin committé atteste qu'elle mord **encore**. Les deux ne se remplacent pas — la première est
exigée par la méthode, la seconde survit à la session. Corollaire de conception : si un chemin
bloquant n'a aucune cible où mordre sans abîmer le dépôt, il manque une couture — la ressource qu'il
lit doit être un paramètre, et le coût de réveil de ce chemin est un signal de conception, pas une
difficulté à contourner.
**Applicable globalement ?** : probablement **redondant** avec deux entrées globales existantes — « une
assertion de vivacité se pose par chemin bloquant, pas par contrôle » (9 août 2026) et « un chemin qui
lit une ressource à chemin fixe est improuvable » (10 août 2026). Ce qu'elle ajoute, s'il y a lieu :
l'opposition explicite entre la preuve **jetée** et le témoin **committé**. À arbitrer par le chef de
projet ; promotion = geste dédié (entrée A-1).

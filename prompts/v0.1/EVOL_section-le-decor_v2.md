# EVOL — Section « Le décor » : l'histoire de deux ponts

**Fichier** : `prompts/v0.1/EVOL_section-le-decor_v2.md` (remplace la v1, non transmise ; changement : bloc 4, paragraphe 2)
**Type** : EVOL · **Branche** : `feat/section-le-decor` · **Révision** : v2 · **Date** : 14 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`) — lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `UX_METHOD` | 1.1 | Appliqué | Mobile-first : une colonne d'abord, enrichissement au-delà ; aucun tableau large dans cette section |
| `STYLE_METHOD` | 1.1 | Appliqué | Prose fournie ci-dessous, relue (S-1 sans cadratin en prose, S-2 dates et faits sourcés, S-3 rien qui range le S/36 au passé, S-4 les deux langues s'adressent chacune à son lecteur) ; **ne pas la réécrire** |
| `ASSURANCE_METHOD` | 1.2 | Écarté (hésitation levée) | Aucune porte nouvelle : les clés ajoutées tombent sous les deux portes existantes (parité FR/EN, résolution HTML) ; elles doivent rester vertes |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun secret, aucun asset externe |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_section-le-decor_v2.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. Version **0.1.2** au manifeste, `.pipeline/STATUS.md` commence par `CLOSED — session 4`.
2. `git rev-list --count origin/main..main` = 0.
3. `npm test` vert sur `main` (28/28).

## Contexte

Premier contenu du jalon 1. La coquille de la section 1 (« Le décor ») existe dans `index.html` avec `section1.title` et `section1.intro` au dictionnaire : **ces deux clés et leurs textes ne changent pas**. L'incrément ajoute les blocs de récit ci-dessous, en FR et en EN, dans le dictionnaire et dans le HTML de la section 1 uniquement.

Contrat de design (CLAUDE.md, « Style du produit ») : fond clair, aucun effet rétro, les quarante ans d'écart se disent dans le texte. Dans cette section, seul usage de Plex Mono : les noms de commandes et de machines cités en ligne (`STRS36`), via l'élément `<code>`.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/section-le-decor` · `.pipeline/spec.md` (périmètre : `index.html` section 1 + `js/i18n.js` dictionnaire) · commit du prompt.

## ÉTAPE 2 — Livrable : quatre blocs de récit, prose exacte ci-dessous

Intègre les quatre blocs dans la section 1, dans cet ordre, après l'intro existante. Structure HTML : un `<h3>` par bloc et des paragraphes, en suivant les conventions déjà en place (`data-i18n` sur chaque élément porteur de texte). Nommage des clés : sous `section1.`, calqué sur l'existant (par exemple `section1.lignees.title`, `section1.lignees.p1`…) ; c'est ta seule liberté, la prose n'en est pas une.

### Bloc 1 — FR

**Titre** : Deux lignées, deux philosophies

Paragraphe 1 : En 1978, IBM annonce le System/38 (annoncé le 24 octobre 1978, livré à partir de 1980) : une machine en avance sur son temps, où tout est un objet géré par le système. Le programme compilé, la description de table, la file de travaux : chacun a un type, une identité, des règles garanties par la machine. Attention au mot « objet » : rien à voir avec la programmation orientée objet moderne. Pas d'héritage, pas de polymorphisme. Un objet système, c'est une pièce d'ingénierie typée, pas une classe.

Paragraphe 2 : Le System/36, annoncé le 16 mai 1983, est une tout autre machine : simple, robuste, taillée pour les petites entreprises. Ce n'est pas l'ancêtre de l'AS/400, c'est une lignée parallèle. Et les deux lignées étaient incompatibles : une application S/36 ne tournait pas sur un S/38. Les clients S/36 n'avaient donc aucun chemin de migration naturel.

### Bloc 1 — EN

**Titre** : Two lineages, two philosophies

Paragraphe 1 : In 1978, IBM announced the System/38 (announced October 24, 1978, first shipped in 1980): a machine ahead of its time, where everything is an object managed by the system. The compiled program, the table description, the job queue: each has a type, an identity, rules enforced by the machine. One caution about the word "object": this has nothing to do with modern object-oriented programming. No inheritance, no polymorphism. A system object is a typed piece of engineering, not a class.

Paragraphe 2 : The System/36, announced May 16, 1983, was an entirely different machine: simple, sturdy, built for small businesses. It is not the ancestor of the AS/400; it is a parallel lineage. And the two lineages were incompatible: an S/36 application would not run on a S/38. S/36 customers had no natural migration path.

### Bloc 2 — FR

**Titre** : 1988 : le pont d'IBM

Paragraphe 1 : Le 21 juin 1988, IBM annonce l'AS/400. Par l'architecture, c'est l'héritier du System/38. Mais la machine embarque une idée décisive : un environnement System/36 dans OS/400, qui accueille les applications S/36 en compatibilité source. On recompile, on ne réécrit pas.

Paragraphe 2 : Cette compatibilité n'était pas une gentillesse, c'était une stratégie. Réécrire aurait coûté des fortunes aux clients, dans tous les pays où IBM opérait ; la machine neuve savait faire tourner le patrimoine, et elle s'est vendue aussi pour cela. La leçon d'ingénierie tient en une phrase : on ne réécrit pas ce qui marche, on le rend joignable.

### Bloc 2 — EN

**Titre** : 1988: IBM's bridge

Paragraphe 1 : On June 21, 1988, IBM announced the AS/400. Architecturally, it is the heir of the System/38. But the machine carried one decisive idea: a System/36 environment inside OS/400, welcoming S/36 applications with source-level compatibility. You recompile; you do not rewrite.

Paragraphe 2 : That compatibility was not a courtesy; it was a strategy. Rewriting would have cost customers a fortune in every country where IBM operated; the new machine could run the installed heritage, and it sold partly because of that. The engineering lesson fits in one sentence: you do not rewrite what works, you make it reachable.

### Bloc 3 — FR

**Titre** : Les noms changent, la machine continue

Paragraphe 1 : OS/400 en 1988, i5/OS en 2004, IBM i en 2008 sur les serveurs Power : trois noms pour une même lignée. Aujourd'hui, IBM i en est aux versions 7.5 et 7.6 (annoncée en avril 2025), et la commande <code>STRS36</code> y démarre toujours une session System/36. Le passager embarqué en 1988 voyage encore.

Paragraphe 2 : Ce patrimoine a même vécu hors d'IBM. Dès le début des années 1990, des éditeurs comme Unibol proposaient un environnement compatible System/36 sous Unix, où les programmes RPG et COBOL continuaient de tourner. Quand tout un marché s'équipe pour faire survivre des applications, c'est qu'elles valent quelque chose. Ces offres se sont éteintes à mesure que le parc S/36 diminuait ; le pont d'IBM, lui, tient toujours.

### Bloc 3 — EN

**Titre** : Names change, the machine carries on

Paragraphe 1 : OS/400 in 1988, i5/OS in 2004, IBM i in 2008 on Power servers: three names, one lineage. Today IBM i stands at versions 7.5 and 7.6 (announced in April 2025), and the <code>STRS36</code> command still starts a System/36 session. The passenger that boarded in 1988 is still riding.

Paragraphe 2 : This heritage even lived outside IBM. As early as the 1990s, vendors such as Unibol offered a System/36-compatible environment on Unix, where RPG and COBOL programs kept running. When a whole market tools up to keep applications alive, those applications are worth something. Those offerings faded as the S/36 installed base shrank; IBM's bridge, meanwhile, still stands.

### Bloc 4 — FR

**Titre** : La preuve vivante

Paragraphe 1 : Il ne serait pas étonnant que des applications conçues avant l'arrivée de l'AS/400, en 1988, tournent encore aujourd'hui en donnant pleine satisfaction. L'auteur de ce site en a croisé plus d'une au long de sa carrière : nées sur S/36, toujours en production, rendant leur service sans accroc, et personne ne s'en soucie : le résultat tombe. Et il faut le dire honnêtement : à terme, ces applications en mode S/36 laisseront la place à des versions réécrites, pas forcément sur IBM i.

Paragraphe 2 : L'auteur a aussi vu l'autre versant. Les développeurs System/38, déjà dans le modèle objet, ont basculé immédiatement vers l'AS/400, et le vide de compétence a fait flamber leur valeur. À l'inverse, les ingénieurs spécialistes du System/36 ont dû faire un travail de réappropriation de cette nouvelle architecture. Il leur a donné une double compétence, rare elle aussi à l'époque : System/36 et AS/400.

Paragraphe 3 : Voilà le décor : un patrimoine S/36 vivant, qui calcule, facture et livre chaque mois sur des machines actuelles. Vivant, mais muet pour le web. La suite raconte pourquoi ces fichiers ne savent rien dire d'eux-mêmes, et comment on les fait parler.

### Bloc 4 — EN

**Titre** : Living proof

Paragraphe 1 : It would be no surprise to find applications designed before the AS/400 arrived in 1988 still running today, to their users' full satisfaction. The author of this site has met more than one over his career: born on the S/36, still in production, quietly doing their job, and nobody gives them a thought: the results come out. And honesty requires saying it: in time, these S/36-mode applications will give way to rewritten versions, and not necessarily on IBM i.

Paragraphe 2 : The author saw the other side too. System/38 developers, already fluent in the object model, switched to the AS/400 overnight, and the skills shortage sent their value soaring. System/36 specialists, by contrast, had to work their way into this new architecture and make it their own. It gave them a dual expertise, rare in its own right at the time: System/36 and AS/400.

Paragraphe 3 : That is the setting: a living S/36 heritage that computes, invoices and ships every month on current machines. Alive, and mute to the web. The next chapters tell why these files cannot say anything about themselves, and how to make them talk.

## Interdits de contenu (P1, anonymisation)

Aucun nom d'éditeur ni de produit d'origine du POC. Le témoignage du bloc 4 est volontairement **pluriel** (arbitrage du 14 août 2026, notes v5) : aucune application unique désignée, aucune périodicité, aucune date de mise en production, aucun nombre de sociétés, aucun domaine métier ni indice indirect. La prose ci-dessus respecte tout cela : n'y réintroduis rien. (« Unibol » au bloc 3 est un éditeur historique tiers, sans lien avec le POC : il est nommable.)

## ÉTAPE 3 — Vérifications

- `npm test` : suite complète verte. Aucune logique nouvelle n'est créée (mention explicite conforme à la méthode) ; les clés ajoutées doivent passer les deux portes existantes (parité FR/EN, résolution HTML ↔ dictionnaire).
- Vérification visuelle locale à 360 px : aucun débordement horizontal, bascule FR/EN correcte sur la section 1.

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md` **de cet incrément** (vert complet, décompte des clés ajoutées).
- Commit staging précis : `index.html` et `js/i18n.js` seuls. Message : `feat: section le décor — deux lignées, le pont de 1988, la preuve vivante (FR/EN)`
- `.pipeline/STATUS.md` = `READY — EVOL section-le-decor — <ISO> — feat/section-le-decor — tests <X/X>`
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Prose intacte (diff nul entre les textes ci-dessus et les valeurs du dictionnaire, à l'espacement près) ; `section1.title` et `section1.intro` inchangés.
2. Seuls `index.html` et `js/i18n.js` sont modifiés ; aucune dépendance ajoutée.
3. Suite de tests verte, y compris les deux portes i18n sur les nouvelles clés.

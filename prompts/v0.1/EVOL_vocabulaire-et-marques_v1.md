# EVOL — Vocabulaire et marques : « au plus six caractères », et la mention générique des marques

**Fichier** : `prompts/v0.1/EVOL_vocabulaire-et-marques_v1.md`
**Type** : EVOL (contenu) · **Branche** : `feat/vocabulaire-et-marques` · **Révision** : v1 · **Date** : 19 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | Six valeurs fournies ci-dessous, relues : S-1 (aucun cadratin reliant deux propositions), S-2 (aucun adjectif sur soi), S-4 (chaque langue s'adresse à son lecteur ; l'anglais de la mention de marques reprend la formule d'usage du monde anglophone, pas un mot à mot du français). **Ne réécris pas les valeurs.** |
| `UX_METHOD` | — | Écarté | Aucune structure, aucun style, aucune classe. Le pied de page gagne une phrase dans un `p` déjà existant et déjà conçu pour un texte courant. |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun secret, aucune assertion de protection. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée. Les portes existantes (parité FR/EN, résolution HTML vers dictionnaire) couvrent mécaniquement des clés qui ne changent pas de nom. |
| `AGENT_SCOPE_METHOD` | — | Écarté | Rien n'est écrit hors du dépôt. |
| `VISION_METHOD` | — | Écarté | Aucun gate de rendu à ce stade du jalon 1. |
| `SQL_METHOD` | — | Écarté | Aucune base, aucune requête, aucun schéma. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_vocabulaire-et-marques_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact, à ouvrir avant d'agir : `CLAUDE.md` (section « Le cas fictif », « noms de colonnes ≤ 6 caractères ») et `tasks/ROADMAP.md`, chapitre « Section La solution — reste à faire », point 1. L'étude `../Etude_Technique/ETUDE_TECHNIQUE_IBMiAPI_v2.md` §3.1 dit « six caractères au maximum » ; elle est hors dépôt, tu n'as pas à l'ouvrir, la règle est reprise ici.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.10** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 12`.
3. `npm test` vert sur `main` (134/134).
4. Dans `js/i18n.js`, motif large sur le fichier entier : `de six caractères` → **2** occurrences (`section2.intro` et `section3.modele.p1`, côté français) ; `six-character` → **2** occurrences (les deux mêmes clés, côté anglais) ; `au plus six` → **0** ; `at most six` → **0** ; `détenteurs` → **0** ; `respective owners` → **0**. Un autre compte → **ARRÊTE-TOI et signale**.
5. `footer.disclaimer` existe dans les deux langues et commence par `IBM, IBM i et System/36` (FR) et `IBM, IBM i and System/36` (EN).

## Contexte et périmètre

Deux corrections de vocabulaire, réunies parce qu'elles sont de même nature : une valeur de dictionnaire change, rien d'autre ne bouge.

**La première rembourse une dette.** Le produit dit à deux endroits que les noms de colonnes font « six caractères », longueur fixe. Les sources du projet disent un **maximum**. Sur le cas fictif du grossiste, tous les noms font exactement six caractères, l'affirmation est donc vraie pour ce site ; mais elle se lit comme une règle de la plateforme, et elle ne l'est pas. Dette née de la réserve n° 1 de la revue de session 12.

**La seconde complète le pied de page.** La mention de marques ne couvre qu'IBM, IBM i et System/36. Le dictionnaire cite aussi Unibol, `.Net` et Power, et aucun n'est couvert. Une phrase générique les couvre tous, présents et à venir.

**Périmètre : `js/i18n.js` seul.** Six valeurs, trois clés, deux langues. Aucune clé ajoutée, aucune clé retirée, aucune clé renommée.

**Hors périmètre, explicitement.** `index.html` ne change pas. Aucun CSS, aucun test, aucune structure. Aucune autre reformulation, même si une te semble souhaitable en relisant : signale-la dans `changes.md`, n'y touche pas.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/vocabulaire-et-marques` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL vocabulaire-et-marques` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable : les six valeurs

Dans `js/i18n.js`, remplace **exactement** les trois valeurs suivantes de chaque côté. La modification porte sur un membre de phrase dans les deux premières et sur une phrase ajoutée dans la troisième ; le reste de chaque valeur est reproduit **à l'identique** ci-dessous pour que tu colles la valeur entière.

### Côté français

**`section2.intro`** : Le défi consiste à exposer en JSON un format de table hérité de l'ère de l'IBM System/36. Ces tables ont, pour celles qui sont encore en activité, des noms de colonnes d'au plus six caractères. Aucune description. C'est l'application qui connaît la valeur métier de telle ou telle colonne.

**`section3.modele.p1`** : L'idée tient en une phrase. Si le fichier ne dit rien de lui-même, alors quelqu'un doit le dire à sa place, une fois, à un seul endroit. Ce quelqu'un est une classe écrite à la main. Chaque propriété y porte le nom que les gens emploient, et une étiquette posée au-dessus d'elle porte le nom physique de la colonne, celui d'au plus six caractères. Le programme relit ses propres étiquettes pendant qu'il tourne, ce qu'on appelle la réflexion, et il en tire un dictionnaire.

**`footer.disclaimer`** : IBM, IBM i et System/36 sont des marques d'International Business Machines Corporation. Les autres noms de produits et de sociétés cités sont la propriété de leurs détenteurs respectifs. Site indépendant, non affilié à IBM.

### Côté anglais

**`section2.intro`** : The challenge is to expose in JSON a table format inherited from the IBM System/36 era. These tables, those still in service, have column names of at most six characters. No description. The application is what knows the business meaning of each column.

**`section3.modele.p1`** : The idea fits in one sentence. If the file says nothing about itself, then someone has to say it instead, once, in a single place. That someone is a class written by hand. Each property carries the name people actually use, and a tag placed above it carries the physical column name, at most six characters long. The program reads its own tags back while it runs, which is called reflection, and builds a dictionary from them.

**`footer.disclaimer`** : IBM, IBM i and System/36 are trademarks of International Business Machines Corporation. All other product and company names mentioned are the property of their respective owners. Independent site, not affiliated with IBM.

## ÉTAPE 3 — Preuves

1. `npm test` vert : **134/134**, aucun test ajouté ni retiré.
2. `git diff main...HEAD --stat` : **un seul** fichier, `js/i18n.js`. `git diff main...HEAD -- index.html css tests tools .claude` : **vide**.
3. Comptages, motif large, fichier entier, **avant et après**, tous consignés : `de six caractères` **2 → 0** ; `six-character` **2 → 0** ; `au plus six` **0 → 2** ; `at most six` **0 → 2** ; `détenteurs` **0 → 1** ; `respective owners` **0 → 1**. Un autre résultat → ARRÊTE-TOI et signale.
4. Parité : le nombre total de clés pointées est **identique** avant et après, et identique des deux côtés. Consigne les nombres.
5. Cadratins : `grep -c "—" js/i18n.js` avant et après. **Même nombre** (10 mesuré le 19 août sur `main`). Consigne-le.
6. Aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled` dans les six valeurs. Consigne la commande et son résultat.
7. `git diff main...HEAD --numstat` : **6 lignes ajoutées, 6 retirées** sur `js/i18n.js`, une par valeur. Un autre compte → explique-le dans `changes.md` avant de continuer.

## ÉTAPE 4 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js` seul) : `feat(vocabulaire): au plus six caractères, et la mention générique des marques, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, écris READY. Si `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL vocabulaire-et-marques — <ISO> — feat/vocabulaire-et-marques — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les **trois** valeurs françaises et les **trois** valeurs anglaises écrites **exactement** comme ci-dessus. Six valeurs au total, aucune clé ajoutée, retirée ni renommée.
2. `js/i18n.js` est le seul fichier modifié ; `index.html` intact.
3. Suite verte 134/134. Les six comptages de l'ÉTAPE 3 conformes. Aucun cadratin ajouté.
4. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

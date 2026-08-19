# EVOL — « Le problème » dit ce qui manque, et renvoie vers une section « Annexe » amorcée

**Fichier** : `prompts/v0.1/EVOL_probleme-renvoi-et-annexe_v1.md`
**Type** : EVOL (contenu) · **Branche** : `feat/probleme-renvoi-et-annexe` · **Révision** : v1 · **Date** : 19 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | Dix-huit valeurs fournies ci-dessous, relues : S-1 (aucun cadratin), S-2 (aucun adjectif sur soi), S-3 (rien qui range une compétence en dessous ; « détour technique », jamais « vieux », « dépassé », « legacy »), S-4 (l'anglais s'adresse à son lecteur : « six characters or fewer », pas « at most six characters »). **Ne réécris rien.** |
| `UX_METHOD` | — | Appliqué | Une entrée de menu ajoutée dans la liste existante, même balisage que ses sœurs, donc même cible tactile. Un lien d'ancre vers `#annexe`, un lien de retour vers `#probleme` ; `scroll-margin-top` déjà posé sur `section`. Aucun style nouveau. |
| `SECURITY_METHOD` | 1.6 | Écarté | Aucune dépendance, aucun secret, aucune assertion de protection. Les valeurs ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée. Les portes existantes couvrent les clés ajoutées (parité FR/EN, résolution HTML vers dictionnaire). |
| `VISION_METHOD` | — | Écarté | Aucun gate de rendu ; validation visuelle au chef de projet. |
| `AGENT_SCOPE_METHOD` | — | Écarté | Rien n'est écrit hors du dépôt. |
| `SQL_METHOD` | — | Écarté | Aucune base, aucune requête. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_probleme-renvoi-et-annexe_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact : `CLAUDE.md` (architecture du site, cinq sections ; conventions) et `tasks/ROADMAP.md`, chapitre « Section Le problème — reste à faire » et arbitrage « Aucune description » (troisième voie, **tranchée** par le chef de projet le 19 août 2026). Les notes de contenu (`../Etude_Technique/NOTES_CONTENU_le-probleme_v5.md`) sont hors dépôt : tout ce qui en est nécessaire est reproduit ici.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.12** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 14`.
3. `npm test` vert sur `main` (134/134).
4. `index.html` : `grep -c "<figure" index.html` = **3** (les extraits de la section 3 sont atterris) ; `grep -c 'id="annexe"' index.html` = **0** ; `grep -c "nav\." index.html` = **6** (cinq entrées plus `nav.aria`) ; `grep -c "<section" index.html` = **6** (cinq sections de `main` plus `about`).
5. `js/i18n.js` : `grep -c "annexe" js/i18n.js` = **0** ; `grep -c "renvoiLien" js/i18n.js` = **0** ; `grep -c "La suite de ce chapitre arrive\.\|This chapter is coming soon\." js/i18n.js` = **4**.
6. `section2.intro` contient « Aucune description. » côté français et « No description. » côté anglais ; `section3.modele.p1` contient « ne dit rien de lui-même » et « says nothing about itself ».

## Contexte et périmètre

Trois gestes de même nature, du contenu et une ancre, réunis parce que le deuxième n'a de sens qu'avec le troisième.

**Premier geste, l'arbitrage « aucune description » est tranché.** Le site disait « aucune description » à la section 2 et « ne dit rien de lui-même » à la section 3. Vrai du fichier, mais démenti dès qu'une colonne nommée apparaîtra à l'écran. Il dit désormais **ce qui manque précisément** : le fichier donne des positions et des noms d'au plus six caractères, jamais ce qu'ils veulent dire. Deux valeurs par langue, réécrites **ensemble**.

**Deuxième geste, la section 2 renvoie vers une annexe.** Une phrase sous l'intro, dont la fin est un lien vers `#annexe`. Le lecteur pressé passe ; le curieux y va.

**Troisième geste, la section « Annexe » est amorcée.** Une sixième section en bas de `main`, après « La méthode », avec son titre, sa phrase d'ouverture qui dit « détour technique, pas nécessaire pour la suite », le texte d'attente des sections provisoires, et un lien « Retour au problème » vers `#probleme`. Elle entre au menu sous « La méthode ». Son contenu est un incrément ultérieur ; ici on crée l'ancre et le cadre pour que le renvoi ne pointe jamais dans le vide.

**Périmètre** : `js/i18n.js` (quatre valeurs modifiées, quatorze ajoutées, sept clés par langue), `index.html` (onze éléments). **Rien d'autre** : aucun CSS, aucun script, aucun test, aucun tableau, aucune image.

**Les clés ajoutées sont en français** (`renvoi`, `renvoiLien`, `annexe`, `attente`, `retour`), comme les groupes existants. Délibéré, tracé dans `tasks/ROADMAP.md`. Ne les renomme pas.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/probleme-renvoi-et-annexe` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL probleme-renvoi-et-annexe` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable A : le dictionnaire

### Valeurs modifiées (quatre)

**`section2.intro`** (FR) : Le défi consiste à exposer en JSON un format de table hérité de l'ère de l'IBM System/36. Ces tables, pour celles qui sont encore en activité, font leur travail : elles enregistrent et restituent sans faillir. Mais demandez-leur ce qu'elles contiennent, elles ne savent pas répondre. Le fichier donne des positions et des noms d'au plus six caractères, jamais ce qu'ils veulent dire. C'est l'application qui connaît la valeur métier de telle ou telle colonne.

**`section2.intro`** (EN) : The challenge is to expose in JSON a table format inherited from the IBM System/36 era. These tables, those still in service, do their job: they record and return data without fail. But ask them what they hold, and they cannot answer. The file gives positions and names of six characters or fewer, never what those names mean. The application is what knows the business meaning of each column.

**`section3.modele.p1`** (FR) : un seul membre de phrase change. « Si le fichier ne dit rien de lui-même, alors quelqu'un doit le dire à sa place » devient « Si le fichier ne dit pas ce que ses colonnes veulent dire, alors quelqu'un doit le dire à sa place ». **Le reste de la valeur est inchangé**, au caractère près.

**`section3.modele.p1`** (EN) : « If the file says nothing about itself, then someone has to say it instead » devient « If the file does not say what its columns mean, then someone has to say it instead ». **Le reste est inchangé.**

### Valeurs ajoutées (quatorze)

Sous `section2`, après `intro` : `renvoi`, puis `renvoiLien`.
Sous `nav`, après `methode` : `annexe`.
Nouveau groupe `annexe`, placé **après** `section5` et **avant** `footer`, portant dans l'ordre `title`, `intro`, `attente`, `retour`.

Côté français :

- **`section2.renvoi`** : Pour voir un fichier S/36 de près, ses positions, ses noms abrégés, ses décimales cachées :
- **`section2.renvoiLien`** : l'annexe, en fin de page.
- **`nav.annexe`** : Annexe
- **`annexe.title`** : Annexe : un fichier S/36 de près
- **`annexe.intro`** : Ce chapitre est un détour technique, un petit voyage dans les contraintes de l'époque. Il n'est pas nécessaire pour suivre la suite.
- **`annexe.attente`** : La suite de ce chapitre arrive.
- **`annexe.retour`** : Retour au problème

Côté anglais :

- **`section2.renvoi`** : To see an S/36 file up close, its positions, its abbreviated names, its hidden decimals:
- **`section2.renvoiLien`** : the appendix, at the end of the page.
- **`nav.annexe`** : Appendix
- **`annexe.title`** : Appendix: an S/36 file up close
- **`annexe.intro`** : This chapter is a technical detour, a short trip into the constraints of the day. It is not needed to follow what comes next.
- **`annexe.attente`** : This chapter is coming soon.
- **`annexe.retour`** : Back to the problem

## ÉTAPE 3 — Livrable B : la structure HTML

**Onze éléments** ajoutés, aucun attribut au-delà de ceux écrits ici.

Dans le menu (`nav.site-nav > ul`), **après** le `li` de `nav.methode` :

```html
<li><a href="#annexe" data-i18n="nav.annexe"></a></li>
```

Dans la section `#probleme`, **après** le `p` portant `section2.intro` :

```html
<p><span data-i18n="section2.renvoi"></span> <a href="#annexe" data-i18n="section2.renvoiLien"></a></p>
```

L'espace entre `</span>` et `<a` est **une espace ordinaire**, et elle est nécessaire : sans elle, les deux textes se collent.

Dans `main`, **après** la section `#methode` et **avant** `</main>` :

```html
<section id="annexe">
  <h2 data-i18n="annexe.title"></h2>
  <p data-i18n="annexe.intro"></p>
  <p data-i18n="annexe.attente"></p>
  <p><a href="#probleme" data-i18n="annexe.retour"></a></p>
</section>
```

## ÉTAPE 4 — Preuves

1. `npm test` vert : **134/134**, aucun test ajouté ni retiré.
2. Périmètre : `git diff main...HEAD --stat -- . ':!prompts'` : **deux** fichiers, `js/i18n.js` et `index.html`. `git diff main...HEAD -- css tests tools .claude assets js/menu.js` : **vide**. Le prompt est le troisième fichier de la branche, règle du premier enregistrement ; il ne compte pas ici.
3. Comptages `index.html`, avant et après, consignés : `<section` **6 → 7** ; `id="annexe"` **0 → 1** ; `nav\.` **6 → 7** ; `href="#annexe"` **0 → 2** ; `href="#probleme"` **1 → 2** ; `data-i18n=` **+7**.
4. Comptages `js/i18n.js`, avant et après : `annexe` **0 → N**, consigne N (clés et valeurs, les deux langues) ; `renvoiLien` **0 → 2** ; texte d'attente (les deux motifs, fichier entier) **4 → 6** ; `Aucune description\.` **1 → 0** ; `No description\.` **1 → 0** ; `ne dit rien de lui-même` **1 → 0** ; `says nothing about itself` **1 → 0** ; `de six caractères` **0 → 0** ; nombre de clés pointées **identique des deux côtés**, et **+7** par côté.
5. Cadratins : `grep -c "—"` sur `js/i18n.js` et `index.html`, avant et après. **Mêmes nombres.** Consigne-les.
6. Aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`, ni `legacy`, dans les valeurs ajoutées ou modifiées. Consigne la commande et son résultat.
7. Les deux ancres existent : `id="probleme"` et `id="annexe"` présents une fois chacun dans `index.html` ; chaque `href="#…"` du fichier vise un `id` existant (liste-les tous, consigne le résultat).
8. `section3.modele.p1` : hors le membre de phrase remplacé, la valeur est **identique** avant et après des deux côtés (compare par `git diff` sur ces lignes, et dis-le).

## ÉTAPE 5 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`) : `feat(probleme): ce qui manque précisément, renvoi vers l'annexe, section Annexe amorcée, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, écris READY. Si `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL probleme-renvoi-et-annexe — <ISO> — feat/probleme-renvoi-et-annexe — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les quatre valeurs modifiées et les quatorze valeurs ajoutées écrites **exactement** comme ci-dessus ; sept clés par côté, mêmes clés des deux côtés ; `section3.modele.p1` inchangé hors le membre remplacé.
2. **Onze** éléments ajoutés à `index.html`, aux trois emplacements indiqués ; les deux ancres résolvent.
3. Suite verte 134/134. Tous les comptages de l'ÉTAPE 4 conformes. Aucun cadratin ajouté. Aucun CSS, script, test, tableau ni image.
4. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

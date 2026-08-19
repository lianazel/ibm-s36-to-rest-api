# EVOL — Section « La solution » : les trois extraits recréés, visibles, FR et EN

**Fichier** : `prompts/v0.1/EVOL_extraits-de-code_v1.md`
**Type** : EVOL (contenu + mise en forme) · **Branche** : `feat/extraits-de-code` · **Révision** : v1 · **Date** : 19 août 2026
**Projet** : IBMiAPI (dépôt `ibm-s36-to-rest-api`). Lis `CLAUDE.md` avant d'agir.

## Satellites consultés

| Satellite | Version | Statut | Ce qui en est appliqué |
|---|---|---|---|
| `STYLE_METHOD` | 1.1 | Appliqué | Douze valeurs fournies ci-dessous, relues : S-1 (aucun cadratin), S-2 (aucun adjectif sur soi), S-3 (rien qui range une compétence en dessous), S-4 (les noms métier du code et les libellés s'adressent au lecteur de chaque langue ; les noms physiques de six lettres sont identiques des deux côtés parce qu'ils sont la réalité du fichier). **Ne réécris ni la prose ni le code.** |
| `UX_METHOD` | — | Appliqué | Mobile-first. Le code défile **dans son cadre**, jamais la page (`overflow-x: auto` sur `pre`). Les zones de défilement sont atteignables au clavier (`tabindex="0"` sur chaque `pre`). Focus visible par la règle globale `:focus-visible` déjà en place. Aucun élément interactif ajouté. |
| `SECURITY_METHOD` | 1.6 | Appliqué §3 | Le code entre dans la page par `textContent`, comme toute valeur du dictionnaire ; **jamais `innerHTML`**. Aucune dépendance, aucun script. Les valeurs livrées ne contiennent aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled`. L'extrait du temps 3 reçoit le résultat déjà lu : il ne montre ni le texte de la requête, ni la connexion, ni le chemin par lequel la requête arrive. |
| `ASSURANCE_METHOD` | 1.2 | Écarté | Aucune porte créée ni modifiée. Les deux portes existantes couvrent mécaniquement les clés ajoutées (parité FR/EN, résolution HTML vers dictionnaire). La porte de forme sur les deux versions du code est un incrément d'outillage séparé, décidé ailleurs : **n'en écris pas ici**. |
| `VISION_METHOD` | — | Écarté | Aucun gate de rendu à ce stade du jalon 1 ; la validation visuelle et tactile reste au chef de projet. |
| `AGENT_SCOPE_METHOD` | — | Écarté | Rien n'est écrit hors du dépôt. |
| `SQL_METHOD` | — | Écarté | Aucune base, aucune requête exécutée. Le SQL n'apparaît que comme sujet du récit. |

## Premier enregistrement (règle §4.1)

Premier commit de la branche, message **exact** : `docs(prompt): prompts/v0.1/EVOL_extraits-de-code_v1.md`

## ÉTAPE 0 — CONFRONTATION

Confronte ce prompt à tes règles permanentes. Contradiction → **ARRÊTE-TOI et signale**.

Sources du périmètre exact : `CLAUDE.md` (section « Style du produit », registre API : Plex Mono sur fond clair, le bloc sombre réservé au registre du dialogue avec l'agent ; section « Le cas fictif », règles d'or 1 à 3) et `tasks/ROADMAP.md`, chapitre « Section La solution — reste à faire », point 2. Les notes de contenu (`../Etude_Technique/NOTES_CONTENU_la-solution_v14.md`) sont hors dépôt : tout ce qui en est nécessaire est reproduit ici, tu n'as pas à les ouvrir.

## Prérequis (vérifie ; sinon ARRÊTE-TOI et signale)

1. `git checkout main`. Version **0.1.11** au manifeste. `git rev-list --count origin/main..main` = 0.
2. `.pipeline/STATUS.md` commence par `CLOSED — session 13`.
3. `npm test` vert sur `main` (134/134).
4. `index.html` : `grep -c 'data-i18n="section3' index.html` = **13** ; `grep -c "<details\|<pre\|<figure\|<code" index.html` = **0**.
5. `js/i18n.js` : `grep -c "legende\|Extrait recréé\|Recreated extract" js/i18n.js` = **0** ; le groupe `section3` porte les sous-groupes `modele`, `mur`, `renversement`, `etape` des deux côtés.
6. `css/styles.css` ne contient pas `.extrait` (`grep -c` = 0).

## Contexte et périmètre

Deuxième incrément de contenu de la section « La solution ». La prose est en ligne ; cet incrément y ajoute **trois extraits de code recréés**, en français et en anglais, tous trois visibles, chacun sous le paragraphe qu'il illustre.

**Ce que les extraits montrent.** Le premier : l'attribut maison et les deux classes du cas fictif, `CMLIV` et `MODLIV`, trois propriétés chacune, où deux noms physiques différents, `LIZEPO` et `CODLIV`, retombent sur une même propriété métier. Le deuxième : le dictionnaire « nom métier vers nom physique », construit par réflexion. Le troisième : ce que fait la machine au temps 3, en deux passes, les lignes relevées et, sur la première, le nom et le type de chaque colonne, puis la classe fabriquée une seule fois et chaque ligne versée dans une instance.

**Où ils vivent.** Les trois extraits sont **visibles** (décision du chef de projet, 19 août 2026 : ils illustrent le propos, ils ne sont pas un supplément). Les deux premiers l'un sous l'autre, sous le temps 1 après `section3.modele.p2` : la conception d'avant le modèle dynamique, les classes à la main puis leur dictionnaire. Le troisième sous le temps 3, entre `section3.renversement.p2` et `section3.renversement.p3`. **Aucun bloc dépliable dans cet incrément** : le motif de dépliement appartient à l'incrément de la boîte à outils, qui est le seul contenu dense.

**Périmètre** : `js/i18n.js` (douze valeurs, six clés par langue), `index.html` (douze éléments), `css/styles.css` (une famille de règles, fournie). **Rien d'autre.**

**Hors périmètre, explicitement.** Aucun script, aucune dépendance, aucune coloration syntaxique, aucun bouton « copier », aucun bloc dépliable, aucune image, aucun SVG, aucun tableau, aucun test. La boîte à outils des neuf classes est un autre incrément. Si quelque chose te semble manquer, signale-le dans `changes.md`, n'y touche pas.

**Les clés ajoutées sont en français** (`legende`, `source`), comme les groupes existants de la section. C'est délibéré et tracé dans `tasks/ROADMAP.md` (arbitrage en attente sur la langue des clés). Ne les renomme pas.

## ÉTAPE 1 — Branche, spec, enregistrement

`git checkout -b feat/extraits-de-code` · `.pipeline/spec.md`, dont la **première ligne** est exactement `Incrément : EVOL extraits-de-code` · commit du prompt (message exact).

## ÉTAPE 2 — Livrable A : les clés du dictionnaire

Dans `js/i18n.js`, **ajoute** les clés suivantes, des deux côtés, sans toucher à aucune valeur existante. Mêmes clés exactement des deux côtés.

Sous `section3.modele` : `code1` (groupe portant `legende` et `source`), puis `code2` (groupe portant `legende` et `source`).
Sous `section3.renversement` : `code3` (groupe portant `legende` et `source`).

Les valeurs `source` sont du **code sur plusieurs lignes** : écris-les en **gabarit JavaScript** (accents graves), le texte commençant au premier caractère du code et se terminant au dernier, **sans saut de ligne initial ni final**, les lignes du code **au ras de la marge gauche** du fichier (toute indentation ajoutée pour faire joli entrerait dans la valeur et s'afficherait). Aucune valeur ne contient d'accent grave ni la séquence `${`. Le code est reproduit **au caractère près**, espaces d'alignement compris.

### Côté français

**`section3.modele.code1.legende`** : Extrait recréé : l'attribut maison et les deux classes du cas fictif.

**`section3.modele.code1.source`** :

```
// L'attribut maison, déclaré une fois pour toutes
[AttributeUsage(AttributeTargets.Property)]
public sealed class ColonneS36Attribute : Attribute
{
    public string Nom { get; }
    public ColonneS36Attribute(string nom) { Nom = nom; }
}

// Fichier CMLIV : le mode de livraison choisi par un client
public class ModeLivraisonClient
{
    [ColonneS36("NOMCLI")] public string nomClient { get; set; }
    [ColonneS36("PRECLI")] public string prenomClient { get; set; }
    [ColonneS36("LIZEPO")] public string codeModeLivraison { get; set; }
}

// Fichier MODLIV : le référentiel des modes de livraison
public class ModeLivraison
{
    [ColonneS36("CODLIV")] public string codeModeLivraison { get; set; }
    [ColonneS36("LIBZLV")] public string libelleModeLivraison { get; set; }
    [ColonneS36("DELJRG")] public int    delaiLivraisonJours { get; set; }
}
```

**`section3.modele.code2.legende`** : Extrait recréé : le dictionnaire « nom métier vers nom physique », rempli pendant que le programme tourne.

**`section3.modele.code2.source`** :

```
// Le dictionnaire « nom métier -> nom physique », construit pendant que le programme tourne
public Dictionary<string, string> ChargerDictionnaire(Type modele)
{
    var dictionnaire = new Dictionary<string, string>();

    foreach (var propriete in modele.GetProperties())
    {
        var attribut = propriete.GetCustomAttribute<ColonneS36Attribute>();
        dictionnaire[propriete.Name.ToUpper()] = attribut?.Nom;
    }

    return dictionnaire;
}
```

**`section3.renversement.code3.legende`** : Extrait recréé : les lignes relevées, la classe fabriquée une fois, chaque ligne versée ensuite. La fabrication elle-même est appelée, pas montrée.

**`section3.renversement.code3.source`** :

```
// La requête vient d'être exécutée ; elle était inconnue du code jusqu'à l'appel.
// Deux temps : relever les lignes et, sur la première, le nom et le type des colonnes ;
// puis fabriquer la classe, une seule fois, et y verser chaque ligne.
public List<object> ConstruireModeleDepuisResultat(IEnumerable<IDictionary<string, object>> resultat)
{
    // > Une ligne = un dictionnaire (nom de colonne, valeur) <
    var lignes = new List<IDictionary<string, object>>();
    // > Le type de chaque colonne, relevé sur la première ligne seulement <
    var typesColonnes = new Dictionary<string, Type>();

    foreach (var ligne in resultat)
    {
        if (typesColonnes.Count == 0)
            foreach (var colonne in ligne)
                typesColonnes[colonne.Key] = colonne.Value.GetType();
        lignes.Add(ligne);
    }

    // > Fabrication de la classe d'après les noms et les types : une seule fois <
    Type modele = FabriquerModele(typesColonnes);

    // > Chaque ligne versée dans une instance du moule <
    var instances = new List<object>();
    foreach (var ligne in lignes)
    {
        var instance = Activator.CreateInstance(modele);
        foreach (var colonne in ligne)
            modele.GetProperty(colonne.Key).SetValue(instance, colonne.Value);
        instances.Add(instance);
    }

    return instances; // la liste part ensuite en JSON, avec la version et le nombre d'éléments
}
```

### Côté anglais

**`section3.modele.code1.legende`** : Recreated extract: the house attribute and the two classes of the fictional case.

**`section3.modele.code1.source`** :

```
// The house attribute, declared once and for all
[AttributeUsage(AttributeTargets.Property)]
public sealed class S36ColumnAttribute : Attribute
{
    public string Name { get; }
    public S36ColumnAttribute(string name) { Name = name; }
}

// File CMLIV: the delivery mode chosen by a customer
public class CustomerDeliveryMode
{
    [S36Column("NOMCLI")] public string customerLastName { get; set; }
    [S36Column("PRECLI")] public string customerFirstName { get; set; }
    [S36Column("LIZEPO")] public string deliveryModeCode { get; set; }
}

// File MODLIV: the delivery mode reference table
public class DeliveryMode
{
    [S36Column("CODLIV")] public string deliveryModeCode { get; set; }
    [S36Column("LIBZLV")] public string deliveryModeLabel { get; set; }
    [S36Column("DELJRG")] public int    deliveryLeadTimeDays { get; set; }
}
```

**`section3.modele.code2.legende`** : Recreated extract: the business-name-to-physical-name dictionary, filled while the program runs.

**`section3.modele.code2.source`** :

```
// The "business name -> physical name" dictionary, built while the program runs
public Dictionary<string, string> LoadDictionary(Type model)
{
    var dictionary = new Dictionary<string, string>();

    foreach (var property in model.GetProperties())
    {
        var attribute = property.GetCustomAttribute<S36ColumnAttribute>();
        dictionary[property.Name.ToUpper()] = attribute?.Name;
    }

    return dictionary;
}
```

**`section3.renversement.code3.legende`** : Recreated extract: the rows collected, the class built once, every row poured afterwards. The building itself is called, not shown.

**`section3.renversement.code3.source`** :

```
// The query has just been run; it was unknown to the code until the call.
// Two passes: collect the rows and, on the first one, the name and the type of each column;
// then build the class, once only, and pour every row into it.
public List<object> BuildModelFromResult(IEnumerable<IDictionary<string, object>> result)
{
    // > One row = one dictionary (column name, value) <
    var rows = new List<IDictionary<string, object>>();
    // > The type of each column, read on the first row only <
    var columnTypes = new Dictionary<string, Type>();

    foreach (var row in result)
    {
        if (columnTypes.Count == 0)
            foreach (var column in row)
                columnTypes[column.Key] = column.Value.GetType();
        rows.Add(row);
    }

    // > Building the class from the names and the types: once only <
    Type model = BuildModel(columnTypes);

    // > Every row poured into an instance of the mould <
    var instances = new List<object>();
    foreach (var row in rows)
    {
        var instance = Activator.CreateInstance(model);
        foreach (var column in row)
            model.GetProperty(column.Key).SetValue(instance, column.Value);
        instances.Add(instance);
    }

    return instances; // the list then goes out as JSON, with the version and the item count
}
```

## ÉTAPE 3 — Livrable B : la structure HTML

Dans `index.html`, section `#solution`, **douze éléments** ajoutés, rien d'autre, aucun attribut au-delà de ceux écrits ici.

Sous le temps 1, **après** le `p` portant `section3.modele.p2` et **avant** le `h3` du temps 2 :

```html
<figure class="extrait">
  <figcaption data-i18n="section3.modele.code1.legende"></figcaption>
  <pre tabindex="0"><code data-i18n="section3.modele.code1.source"></code></pre>
</figure>

<figure class="extrait">
  <figcaption data-i18n="section3.modele.code2.legende"></figcaption>
  <pre tabindex="0"><code data-i18n="section3.modele.code2.source"></code></pre>
</figure>
```

Sous le temps 3, **après** le `p` portant `section3.renversement.p2` et **avant** le `p` portant `section3.renversement.p3` :

```html
<figure class="extrait">
  <figcaption data-i18n="section3.renversement.code3.legende"></figcaption>
  <pre tabindex="0"><code data-i18n="section3.renversement.code3.source"></code></pre>
</figure>
```

Le `tabindex="0"` sur `pre` rend la zone de défilement atteignable au clavier quand le code dépasse la largeur du cadre ; c'est le remède standard, il ne se retire pas. Le `pre` et le `code` restent sur **une même ligne** : tout saut de ligne entre les deux balises s'afficherait.

## ÉTAPE 4 — Livrable C : les règles CSS

Dans `css/styles.css`, **après** le bloc `/* ---- Contenu. */` et **avant** `/* ---- Pied de page. */`, ajoute **exactement** ceci. Aucun autre jeton, aucune autre règle, aucune valeur modifiée ailleurs.

```css
/* ---- Extraits de code (registre API : Plex Mono sur fond clair, filet vert).
   Le défilement horizontal reste dans le cadre, jamais la page (CLAUDE.md, UX). */
.extrait {
  margin: var(--space) 0;
}

.extrait figcaption {
  margin-bottom: calc(var(--space) / 2);
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}

.extrait pre {
  margin: 0;
  padding: var(--space);
  overflow-x: auto;
  border: 1px solid var(--color-line);
  border-left: 3px solid var(--color-api);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
}
```

## ÉTAPE 5 — Preuves

1. `npm test` vert : **134/134**, aucun test ajouté ni retiré.
2. Périmètre : `git diff main...HEAD --stat -- . ':!prompts'` : **trois** fichiers, `js/i18n.js`, `index.html`, `css/styles.css`. `git diff main...HEAD -- tests tools .claude assets` : **vide**. Le prompt est le quatrième fichier de la branche, par la règle du premier enregistrement ; il ne compte pas ici.
3. Comptages `index.html`, avant et après, consignés : `data-i18n="section3` **13 → 19** ; `<details` **0 → 0** ; `<figure` **0 → 3** ; `<pre` **0 → 3** ; `tabindex="0"` **0 → 3**.
4. Comptages `js/i18n.js`, avant et après, consignés : `legende` **0 → 6** ; nombre de clés pointées sous `section3` **identique des deux côtés**, et **+6** par côté. Consigne les nombres.
5. Cadratins : `grep -c "—"` sur `js/i18n.js`, `index.html`, `css/styles.css`, avant et après. **Mêmes nombres.** Consigne-les.
6. Aucun des mots `protégé`, `sécurisé`, `contrôlé`, `protected`, `secured`, `controlled` dans les douze valeurs ajoutées. Consigne la commande et son résultat.
7. Forme des deux versions du code, mesurée à la main et consignée : poses d'attribut `[ColonneS36(` et `[S36Column(` : **6 et 6** ; propriétés `{ get; set; }` dans `code1.source` : **6 et 6** ; les six noms physiques `NOMCLI`, `PRECLI`, `LIZEPO`, `CODLIV`, `LIBZLV`, `DELJRG` présents **une fois par côté chacun** dans `code1.source`. Un écart → ARRÊTE-TOI et signale.
8. `innerHTML` : `grep -c innerHTML js/i18n.js` = **0** avant et après.
9. Contrôle d'accessibilité, **écrit dans `changes.md`**, point par point : chaque `pre` est atteint par Tab et défile aux flèches quand il déborde ; le contour de focus est celui de la règle globale `:focus-visible` ; contraste de la légende `--color-ink-soft` sur blanc, valeur déjà qualifiée AA au jeton. Ce que tu ne peux pas mesurer sans navigateur, **dis-le** tel quel : la validation visuelle et tactile reste au chef de projet.

## ÉTAPE 6 — HANDOFF (dernier geste)

- `.pipeline/changes.md` + `.pipeline/test-results.md`.
- Un commit, staging précis (`js/i18n.js`, `index.html`, `css/styles.css`) : `feat(solution): trois extraits recréés sous les temps 1 et 3, FR et EN`.
- **Délègue la revue au subagent `reviewer`** (→ `review.json`, auto-vérification `--shape`). Affiche `verdict` et `reservations` tels quels. Si `SHIP` avec des réserves `WARN` : **n'y touche pas**, écris READY. Si `NEEDS_WORK` : corrige, commite, **relance le `reviewer` sur le nouveau commit** ; deux passes au plus, puis ARRÊTE-TOI et signale.
- `.pipeline/STATUS.md` = `READY — EVOL extraits-de-code — <ISO> — feat/extraits-de-code — tests 134/134`.
- **STOP. Ne merge rien, ne pousse rien.**

## Critères d'acceptation

1. Les **six** valeurs françaises et les **six** valeurs anglaises écrites **exactement** comme ci-dessus, code au caractère près. Douze valeurs, six clés par côté, aucune valeur existante modifiée.
2. **Douze** éléments ajoutés à `index.html`, aux deux emplacements indiqués, avec les seuls attributs écrits ici.
3. Les règles CSS ajoutées **exactement** comme fournies, à l'emplacement indiqué.
4. Suite verte 134/134. Tous les comptages de l'ÉTAPE 5 conformes. Aucun cadratin ajouté. Aucun `innerHTML`.
5. Aucun script, aucune dépendance, aucun bloc dépliable, aucun test, aucune image, aucun tableau.
6. `review.json` du `reviewer` en SHIP pour cet incrément et ce commit ; READY écrit en dernier.

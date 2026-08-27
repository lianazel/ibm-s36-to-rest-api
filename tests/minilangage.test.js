/**
 * minilangage.test.js — suite du module js/minilangage.js.
 *
 * Logique pure, aucun DOM : le module reçoit son modèle en paramètre, et cette
 * couture est précisément ce qui rend la suite possible sans navigateur.
 *
 * Les modèles français et anglais sont construits depuis le dictionnaire réel :
 * une valeur renommée d'un côté sans l'autre fait rougir la famille « agnostique
 * de la langue », qui exige les mêmes comptes des deux côtés.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";
import { parseImplicitDecimal } from "../js/s36.js";
import {
  appendLink,
  applyExample,
  buildModel,
  buildNaiveQuery,
  buildParameterisedQuery,
  caretAllowsStructure,
  CDEMST,
  CLIMST,
  closeSequence,
  CMLIV,
  className,
  DEFAULT_SELECTION,
  EXAMPLES,
  exampleExpression,
  fill,
  filterRows,
  findOrphans,
  findPropertyIndex,
  hasEdits,
  hasPendingLink,
  initialSelection,
  joinFiles,
  MODLIV_CODES,
  OPERATORS,
  PHYSICAL_MODEL,
  recognise,
  renderClass,
  renderJson,
  shapeFault,
  stripLineBreaks,
  translateExpression,
} from "../js/minilangage.js";

const modelOf = (lang) =>
  buildModel(PHYSICAL_MODEL.map((entry) => dict[lang].section4.modele[entry.key]));

const FR = modelOf("fr");
const EN = modelOf("en");
const ROWS_FR = joinFiles(dict.fr.section4.modes);
const ROWS_EN = joinFiles(dict.en.section4.modes);

/** Nombre de lignes gardées, ou l'échec si l'expression est refusée. */
const count = (text, model = FR, rows = ROWS_FR) => {
  const result = filterRows(text, model, rows);
  if (!result.ok) {
    throw new Error(`refusé (${result.refusal.code}) : ${text}`);
  }
  return result.rows.length;
};

/** Le code de refus d'une expression, ou l'échec si elle passe. */
const refusalOf = (text, model = FR) => {
  const result = recognise(text, model);
  if (result.ok) {
    throw new Error(`accepté alors qu'un refus était attendu : ${text}`);
  }
  return result.refusal;
};

describe("porte non vide : le décor est bien celui du prompt", () => {
  it("dix-huit commandes, dix-huit clients, dix-huit modes, six codes", () => {
    expect(CDEMST).toHaveLength(18);
    expect(CLIMST).toHaveLength(18);
    expect(CMLIV).toHaveLength(18);
    expect(MODLIV_CODES).toHaveLength(6);
  });

  it("les propriétés non négociables du décor, comptées une par une", () => {
    const names = new Set(CLIMST.map((row) => row.NOMCLI));
    expect([...names].filter((name) => name.startsWith("DU"))).toHaveLength(3);

    const dur = CLIMST.filter((row) => row.NOMCLI.startsWith("DUR"));
    expect(dur).toHaveLength(2);
    // Les deux DURAND ne se séparent que par le prénom : c'est l'argument de
    // la jointure, et il ne se dilue pas.
    expect(dur[0].NOMCLI).toBe(dur[1].NOMCLI);
    expect(dur[0].PRECLI).not.toBe(dur[1].PRECLI);

    const orders = new Map();
    for (const row of CDEMST) {
      const key = `${row.NOMCLI}|${row.PRECLI}`;
      orders.set(key, (orders.get(key) ?? 0) + 1);
    }
    expect([...orders.values()].filter((n) => n === 2)).toHaveLength(2);
    const withoutOrder = CLIMST.filter((row) => !orders.has(`${row.NOMCLI}|${row.PRECLI}`));
    expect(withoutOrder).toHaveLength(2);
  });
});

describe("le reconnaisseur : une forme close, et rien autour", () => {
  it("six opérateurs, pas un de plus", () => {
    expect(Object.keys(OPERATORS)).toEqual(["==", "[=", "=]", "[]", "><", "=>"]);
  });

  it("une expression vide n'est pas un refus : c'est l'absence de condition", () => {
    const read = recognise("", FR);
    expect(read.ok).toBe(true);
    expect(read.conditions).toHaveLength(0);
    expect(count("")).toBe(18);
  });

  it.each([
    ["colonne hors liste", "<motDePasse:==:toto/>", "colonne"],
    ["opérateur hors liste", "<nomClient:~~:DUR/>", "operateur"],
    ["négation connue et interdite", "<nomClient:!=:ZZ/>", "interdit"],
    ["contient d'un seul caractère", "<nomClient:[]:A/>", "tropCourt"],
    ["valeur absente", "<nomClient:==:/>", "valeurVide"],
    ["compris entre sans seconde borne", "<montantCommande:><:1000/>", "bornes"],
    ["opérateur qui ne va pas au type", "<nomClient:><:1;2/>", "type"],
    ["forme non reconnue", "nomClient = DURAND", "forme"],
    ["ET mêlé à OU", "<nomClient:[=:DUR/> && <villeClient:==:LYON/> || <nomClient:[=:MAR/>", "liaison"],
  ])("refuse %s", (_titre, expression, code) => {
    expect(refusalOf(expression).code).toBe(code);
  });

  it("les onze refus ont tous leur couple de valeurs, dans les deux langues", () => {
    // Onze depuis l'avenant 5 : `inacheve` et `colonneVide` s'ajoutent aux neuf.
    // Un catalogue de refus qui laisse un trou n'est pas un catalogue.
    const codes = [
      "forme", "colonne", "operateur", "interdit", "type",
      "valeurVide", "tropCourt", "bornes", "liaison",
      "inacheve", "colonneVide",
    ];
    for (const lang of ["fr", "en"]) {
      for (const code of codes) {
        expect(typeof dict[lang].section4.refus[code].quoi, `${lang}.${code}`).toBe("string");
        expect(typeof dict[lang].section4.refus[code].pourquoi, `${lang}.${code}`).toBe("string");
      }
    }
  });

  it("le refus de colonne cite le nom tapé, celui d'opérateur cite le signe", () => {
    expect(refusalOf("<motDePasse:==:toto/>").params.nom).toBe("motDePasse");
    expect(refusalOf("<nomClient:~~:DUR/>").params.op).toBe("~~");
    expect(refusalOf("<nomClient:!=:ZZ/>").params.op).toBe("!=");
  });

  it("le refus de type dit le type reçu et ceux qu'attend l'opérateur", () => {
    const refusal = refusalOf("<nomClient:><:1;2/>");
    expect(refusal.params.type).toBe("texte");
    expect(refusal.params.types).toEqual(["entier", "date", "décimal"]);
  });
});

describe("la position de l'opérateur : le piège mesuré du 21 août 2026", () => {
  it("l'opérateur écrit à la fin est refusé, et sur la FORME", () => {
    // Le message de forme est le seul qui montre un exemple et nomme la
    // position de l'opérateur : c'est celui-là que ce cas doit déclencher.
    expect(refusalOf("<nomClient::UR=]/>").code).toBe("forme");
  });

  it("le même test écrit correctement est accepté", () => {
    expect(recognise("<nomClient:=]:UR/>", FR).ok).toBe(true);
  });
});

describe("la jointure par les valeurs, sans le moindre identifiant", () => {
  it("cas nominal : la ville et le mode arrivent depuis deux autres fichiers", () => {
    const claire = ROWS_FR.find((row) => row.NUMCDE === 104207);
    expect(claire.VILCLI).toBe("LYON");
    expect(claire.LIZEPO).toBe("EXP");
    expect(claire.LIBLIV).toBe(dict.fr.section4.modes.exp);
  });

  it("les deux DURAND se séparent par le seul prénom", () => {
    const marc = ROWS_FR.find((row) => row.NUMCDE === 104219);
    expect(marc.PRECLI).toBe("MARC");
    expect(marc.VILCLI).toBe("PARIS");
    expect(marc.LIZEPO).toBe("STD");
  });

  it("une jointure sans correspondance rend null, et null ne satisfait aucun test", () => {
    const orphan = { NOMCLI: "INCONNU", PRECLI: "PERSONNE", VILCLI: null, LIZEPO: null,
      LIBLIV: null, NUMCDE: 1, DATCDE: "20260101", MTTCDE: 0, MTTCDE_BRUT: "000000000" };
    expect(count("<villeClient:==:LYON/>", FR, [orphan])).toBe(0);
    expect(count("<villeClient:[]:LY/>", FR, [orphan])).toBe(0);
    expect(count("<codeModeLivraison:==:EXP/>", FR, [orphan])).toBe(0);
  });
});

describe("les montants passent par parseImplicitDecimal, jamais par une seconde règle", () => {
  it("000012550 vaut 125,50 dans la ligne jointe", () => {
    const row = ROWS_FR.find((line) => line.NUMCDE === 104207);
    expect(row.MTTCDE).toBe(parseImplicitDecimal("000012550"));
    expect(row.MTTCDE).toBe(125.5);
  });

  it("la même colonne est exposée deux fois : brute, et interprétée", () => {
    const row = ROWS_FR.find((line) => line.NUMCDE === 104207);
    expect(row.MTTCDE_BRUT).toBe("000012550");
    expect(count("<montantBrut:[=:0000/>")).toBeGreaterThan(0);
  });
});

describe("les sept comptes du prompt, rejoués un par un", () => {
  it.each([
    ["commence par", "<nomClient:[=:DUR/>", 3],
    ["finit par", "<nomClient:=]:IER/>", 3],
    ["contient", "<nomClient:[]:AR/>", 5],
    ["deux conditions", "<nomClient:[=:DUR/> && <codeModeLivraison:==:EXP/>", 2],
    ["jointure sur le client", "<nomClient:[=:DUR/> && <villeClient:==:LYON/>", 2],
    ["compris entre", "<montantCommande:><:1000;4000/>", 5],
    ["depuis une date", "<dateCommande:=>:20260701/>", 5],
  ])("%s rend %i lignes", (_titre, expression, attendu) => {
    expect(count(expression)).toBe(attendu);
  });

  it.each([
    ["MAR trouve aussi 3 commandes", "<nomClient:[=:MAR/>", 3],
    ["STD ne laisse que MARC", "<nomClient:[=:DUR/> && <codeModeLivraison:==:STD/>", 1],
    ["PARIS ne laisse que l'autre DURAND", "<nomClient:[=:DUR/> && <villeClient:==:PARIS/>", 1],
    ["125;126 n'en garde qu'une", "<montantCommande:><:125;126/>", 1],
    ["20260301 en ramène 14", "<dateCommande:=>:20260301/>", 14],
    // Le minimum de deux caractères ne porte QUE sur « contient », parce que
    // « contient » balaie : une lettre sur « finit par » rend une tranche, pas
    // le fichier. C'est la mesure que l'explication de l'exemple annonce au
    // lecteur, nommément (avenant 2, A2-4).
    ["finit par T", "<nomClient:=]:T/>", 2],
  ])("les variantes écrites dans les explications tiennent : %s", (_titre, expression, attendu) => {
    expect(count(expression)).toBe(attendu);
  });

  it("un OU élargit là où un ET restreint", () => {
    expect(count("<nomClient:[=:DUR/> || <nomClient:[=:MAR/>")).toBe(6);
  });
});

describe("l'injection : elle passe le reconnaisseur, et ne trouve rien", () => {
  it("la valeur est comparée, jamais assemblée", () => {
    const expression = "<nomClient:==:D' OR '1'='1/>";
    // Le point n'est pas qu'elle soit refusée : c'est qu'elle n'ait jamais eu
    // le statut de code. Elle est donc ACCEPTÉE, et elle rend zéro ligne.
    expect(recognise(expression, FR).ok).toBe(true);
    expect(count(expression)).toBe(0);
  });

  it("le décor reste intact après la tentative", () => {
    expect(ROWS_FR).toHaveLength(18);
  });
});

describe("le module ignore la langue", () => {
  it("les sept comptes sont les mêmes avec le modèle anglais", () => {
    const paires = [
      ["<nomClient:[=:DUR/>", "<customerLastName:[=:DUR/>"],
      ["<nomClient:=]:IER/>", "<customerLastName:=]:IER/>"],
      ["<nomClient:[]:AR/>", "<customerLastName:[]:AR/>"],
      ["<nomClient:[=:DUR/> && <codeModeLivraison:==:EXP/>",
        "<customerLastName:[=:DUR/> && <deliveryModeCode:==:EXP/>"],
      ["<nomClient:[=:DUR/> && <villeClient:==:LYON/>",
        "<customerLastName:[=:DUR/> && <customerCity:==:LYON/>"],
      ["<montantCommande:><:1000;4000/>", "<orderAmount:><:1000;4000/>"],
      ["<dateCommande:=>:20260701/>", "<orderDate:=>:20260701/>"],
    ];
    for (const [fr, en] of paires) {
      expect(count(en, EN, ROWS_EN), en).toBe(count(fr, FR, ROWS_FR));
    }
  });

  it("une expression française est refusée dans le modèle anglais, et l'inverse", () => {
    expect(refusalOf("<nomClient:[=:DUR/>", EN).code).toBe("colonne");
    expect(refusalOf("<customerLastName:[=:DUR/>", FR).code).toBe("colonne");
  });

  it("la bascule de langue réécrit l'expression au lieu de la casser", () => {
    const traduite = translateExpression("<nomClient:[=:DUR/> && <villeClient:==:LYON/>", FR, EN);
    expect(traduite).toBe("<customerLastName:[=:DUR/> && <customerCity:==:LYON/>");
    expect(count(traduite, EN, ROWS_EN)).toBe(2);
    expect(translateExpression(traduite, EN, FR)).toBe(
      "<nomClient:[=:DUR/> && <villeClient:==:LYON/>",
    );
  });
});

describe("la classe que personne n'a écrite", () => {
  const entriesOf = (indices, model) => indices.map((index) => model[index]);

  it("le nom change dès que la liste des colonnes change", () => {
    const quatre = className("Commande", entriesOf(DEFAULT_SELECTION, FR));
    const trois = className("Commande", entriesOf([0, 4, 7], FR));
    const autre = className("Commande", entriesOf([0, 4, 7, 8], FR));
    expect(quatre).not.toBe(trois);
    expect(quatre).not.toBe(autre);
    expect(quatre).toMatch(/^Commande_[0-9a-f]{4}$/);
  });

  it("la même sélection rend toujours le même nom", () => {
    expect(className("Commande", entriesOf([0, 4], FR)))
      .toBe(className("Commande", entriesOf([0, 4], FR)));
  });

  it("seul le préfixe se traduit : l'empreinte tient au nom physique", () => {
    const fr = className("Commande", entriesOf(DEFAULT_SELECTION, FR));
    const en = className("Order", entriesOf(DEFAULT_SELECTION, EN));
    expect(fr.split("_")[1]).toBe(en.split("_")[1]);
    expect(en.startsWith("Order_")).toBe(true);
  });

  it("la traduction vers le fichier est sur sa propre ligne, colonne et fichier", () => {
    const rendu = renderClass({
      prefix: "Commande",
      entries: entriesOf([0], FR),
      comment: dict.fr.section4.classe.commentaire,
      empty: dict.fr.section4.classe.vide,
    });
    const lignes = rendu.split("\n");
    const marque = lignes.findIndex((ligne) => ligne.includes("NOMCLI (CDEMST)"));
    expect(marque).toBeGreaterThan(-1);
    // Sur sa propre ligne : le commentaire n'est pas en bout de déclaration.
    expect(lignes[marque].trim()).toBe("// NOMCLI (CDEMST)");
    expect(lignes[marque + 1]).toContain("public string nomClient { get; set; }");
  });

  it("aucune colonne cochée : la classe le dit, elle ne disparaît pas", () => {
    const rendu = renderClass({
      prefix: "Commande",
      entries: [],
      comment: dict.fr.section4.classe.commentaire,
      empty: dict.fr.section4.classe.vide,
    });
    expect(rendu).toContain("public class");
    expect(rendu).toContain(dict.fr.section4.classe.vide);
  });

  it("les types C# suivent le type du modèle", () => {
    const rendu = renderClass({
      prefix: "Commande",
      entries: entriesOf([0, 4, 7], FR),
      comment: "x",
      empty: "y",
    });
    expect(rendu).toContain("public string nomClient");
    expect(rendu).toContain("public int numeroCommande");
    expect(rendu).toContain("public decimal montantCommande");
  });
});

describe("les treize exemples", () => {
  it("sept passent, six tentent une demande interdite, l'injection en dernier", () => {
    expect(EXAMPLES).toHaveLength(13);
    expect(EXAMPLES.filter((example) => example.tone === "gris")).toHaveLength(7);
    expect(EXAMPLES.filter((example) => example.tone === "rouge")).toHaveLength(6);
    expect(EXAMPLES.at(-1).key).toBe("injection");
  });

  it("chacun porte son étiquette et son explication dans les deux langues", () => {
    for (const lang of ["fr", "en"]) {
      for (const example of EXAMPLES) {
        const texts = dict[lang].section4.ex[example.key];
        expect(typeof texts?.nom, `${lang}.${example.key}.nom`).toBe("string");
        expect(typeof texts?.aide, `${lang}.${example.key}.aide`).toBe("string");
      }
    }
  });

  it("les sept exemples gris passent réellement, dans les deux langues", () => {
    for (const example of EXAMPLES.filter((candidate) => candidate.tone === "gris")) {
      expect(recognise(exampleExpression(example, FR), FR).ok, example.key).toBe(true);
      expect(recognise(exampleExpression(example, EN), EN).ok, example.key).toBe(true);
    }
  });

  it("les cinq exemples rouges qui doivent être refusés le sont", () => {
    const attendus = {
      colonneInconnue: "colonne",
      operateurInconnu: "operateur",
      valeurCourte: "tropCourt",
      negation: "interdit",
      etOu: "liaison",
    };
    for (const [key, code] of Object.entries(attendus)) {
      const example = EXAMPLES.find((candidate) => candidate.key === key);
      expect(refusalOf(exampleExpression(example, FR)).code, key).toBe(code);
    }
  });

  it("l'expression d'un exemple porte les noms de la langue du modèle", () => {
    const example = EXAMPLES.find((candidate) => candidate.key === "commencePar");
    expect(exampleExpression(example, FR)).toBe("<nomClient:[=:DUR/>");
    expect(exampleExpression(example, EN)).toBe("<customerLastName:[=:DUR/>");
  });
});

describe("toute forme imprimée dans la page est une forme que le langage reconnaît", () => {
  /**
   * Cette porte est née d'un défaut livré le 22 août 2026 : la valeur qui
   * ENSEIGNE la forme du langage avait perdu sa barre oblique en passant des
   * entités du prompt aux chevrons nus du dictionnaire. Le lecteur qui recopiait
   * la forme affichée obtenait « Forme non reconnue ». Cent quatre-vingt-dix
   * tests verts ne l'ont pas vu : aucun ne lisait les messages.
   *
   * Elle porte sur la FORME seule. Un gabarit comme <colonne:opérateur:valeur/>
   * désigne une colonne qui n'existe pas, et doit donc être refusé sur la
   * colonne. Ce qu'aucune forme imprimée ne peut produire, c'est le refus
   * « forme » : cela voudrait dire que la page montre une syntaxe invalide.
   */
  /**
   * Une séquence imprimée : deux deux-points, aucune espace, close par un
   * chevron. Le quantificateur est NON GOURMAND et la classe exclut l'espace,
   * jamais le chevron : deux des six opérateurs (`><` et `=>`) en portent un,
   * et une classe qui exclurait le chevron raterait précisément le gabarit des
   * bornes. Angle mort mesuré le 22 août 2026, sur la première version de cette
   * porte, qui rendait `null` sur `refus.bornes.pourquoi`.
   *
   * Limite dite plutôt que masquée : une séquence dont la VALEUR porterait une
   * espace échapperait à ce balayage. Aucune valeur du dictionnaire n'en imprime
   * aujourd'hui, et rien ne le garde : la couverture par clé, ci-dessous, garde
   * contre un rétrécissement de la mesure, jamais contre un élargissement.
   * Inscrite en [W31].
   */
  const SEQUENCE_IMPRIMEE = /<[^\s]*?:[^\s]*?:[^\s]*?>/g;

  const formesImprimees = (lang) => {
    const trouvees = [];
    const parcourir = (node, chemin) => {
      for (const [cle, valeur] of Object.entries(node)) {
        const suite = chemin === "" ? cle : `${chemin}.${cle}`;
        if (typeof valeur === "object" && valeur !== null) {
          parcourir(valeur, suite);
        } else if (typeof valeur === "string") {
          for (const forme of valeur.match(SEQUENCE_IMPRIMEE) ?? []) {
            trouvees.push({ chemin: suite, forme });
          }
        }
      }
    };
    parcourir(dict[lang].section4, "");
    return trouvees;
  };

  it("porte non vide : la page imprime bien des formes des deux côtés", () => {
    // Une porte qui ne trouve aucune forme à vérifier est aveugle.
    expect(formesImprimees("fr").length).toBeGreaterThanOrEqual(3);
    expect(formesImprimees("en").length).toBeGreaterThanOrEqual(3);
  });

  it.each(["fr", "en"])("les trois clés qui impriment une forme sont toutes vues (%s)", (lang) => {
    // Couverture par clé, et pas seulement par compte : c'est elle qui a
    // révélé que le gabarit des bornes échappait à la première regex. Sans
    // elle, une classe de caractères trop étroite réduit la couverture en
    // silence, et la porte reste verte en ne regardant plus rien.
    const vues = new Set(formesImprimees(lang).map((f) => f.chemin));
    expect([...vues].sort()).toEqual([
      "refus.bornes.pourquoi",
      "refus.forme.pourquoi",
      "refus.operateur.pourquoi",
    ]);
  });

  it.each(["fr", "en"])("aucune forme imprimée n'est refusée sur la forme (%s)", (lang) => {
    const model = modelOf(lang);
    for (const { chemin, forme } of formesImprimees(lang)) {
      // `{colonne}` est rempli à l'exécution par ce que le lecteur a tapé :
      // on lui substitue une propriété réelle avant de mesurer.
      const essai = forme.replace("{colonne}", model[0].property);
      const lecture = recognise(essai, model);
      const code = lecture.ok ? null : lecture.refusal.code;
      expect(code, `${lang}.${chemin} imprime « ${forme} »`).not.toBe("forme");
    }
  });

  it("la forme générale enseignée par le message de forme est reconnaissable", () => {
    // Le cas précis du défaut du 22 août, nommé pour qu'il ne revienne pas.
    for (const lang of ["fr", "en"]) {
      const model = modelOf(lang);
      const [{ forme }] = formesImprimees(lang).filter((f) => f.chemin === "refus.forme.pourquoi");
      expect(forme.endsWith("/>"), `${lang} : la forme enseignée doit se fermer par /`).toBe(true);
      expect(recognise(forme, model).refusal.code).toBe("colonne");
    }
  });

  it("le gabarit des bornes, rempli, est accepté sur une colonne numérique", () => {
    const gabarit = dict.fr.section4.refus.bornes.pourquoi.match(SEQUENCE_IMPRIMEE)[0];
    expect(recognise(gabarit.replace("{colonne}", FR[7].property), FR).ok).toBe(true);
  });
});

describe("avenant 2 : ce que la page affirme doit être vrai", () => {
  it("A2-1 la sélection de départ est dans l'ordre du modèle, pas dans celui du contrat", () => {
    const depart = initialSelection();
    expect(depart).toEqual([...depart].sort((left, right) => left - right));
    // Les mêmes colonnes, sans exception : le tri range, il n'ajoute ni ne
    // retire rien.
    expect([...depart].sort()).toEqual([...DEFAULT_SELECTION].sort());
  });

  it("A2-1 le nom de la classe ne dépend pas du chemin parcouru", () => {
    for (const [model, prefixe] of [[FR, "Commande"], [EN, "Order"]]) {
      const auChargement = className(prefixe, initialSelection().map((i) => model[i]));
      // Le lecteur coche une colonne de plus, puis la décoche : le gestionnaire
      // de case trie, donc il revient à la sélection triée. Le témoin est
      // l'indice 1 (`prenomClient`), et il doit rester HORS de la sélection de
      // départ pour que l'aller-retour en soit un — l'indice 8 (`villeClient`)
      // servait ici jusqu'au 23 août 2026, date où il est entré au défaut.
      const temoin = 1;
      expect(DEFAULT_SELECTION).not.toContain(temoin);
      const apresAllerRetour = className(
        prefixe,
        [...new Set([...initialSelection(), temoin])]
          .filter((index) => index !== temoin)
          .sort((left, right) => left - right)
          .map((index) => model[index]),
      );
      expect(auChargement, prefixe).toBe(apresAllerRetour);
    }
  });

  it.each(["fr", "en"])("A2-3 le compte de zéro ligne ne fait plus la leçon (%s)", (lang) => {
    const aucune = dict[lang].section4.compte.aucune;
    expect(aucune).not.toMatch(/instruction/i);
    expect(aucune).not.toMatch(/assembl/i);
    expect(aucune).toMatch(/\{total\}/);
  });

  it.each(["fr", "en"])("A2-3 la phrase vit désormais où elle mord (%s)", (lang) => {
    const aide = dict[lang].section4.ex.injection.aide;
    expect(aide).toMatch(/instruction/i);
    expect(aide).toMatch(lang === "fr" ? /assemblée/i : /assembled/i);
  });

  it.each(["fr", "en"])(
    "A2-2 les trois lignes descriptives de la légende ne demandent toujours aucun geste (%s)",
    (lang) => {
      // La porte d'origine couvrait les QUATRE lignes, parce que rien n'était
      // alors modifiable. `modifier` sort de son périmètre depuis que le geste
      // existe (cas suivant) ; les trois autres décrivent des teintes, et une
      // description n'a aucune raison de réclamer un geste.
      const gestes = [
        "Modifier", "Modifiez", "Changing", "Change ", "Cliquez", "Click",
        "Essayez", "Try ", "Survolez", "Hover", "Touchez", "Tap ",
      ];
      for (const cle of ["titre", "valeurs", "code"]) {
        for (const geste of gestes) {
          expect(
            dict[lang].section4.legende[cle],
            `legende.${cle} demande « ${geste} »`,
          ).not.toContain(geste);
        }
      }
    },
  );

  it.each(["fr", "en"])(
    "A2-2 levée : la légende promet de nouveau un geste, et ce geste existe (%s)",
    (lang) => {
      // L'avenant 2 avait posé un texte de repli parce que la promesse n'était
      // pas tenable. Elle l'est : les commandes s'ouvrent à l'écriture. La porte
      // s'inverse donc au lieu de disparaître — ce qu'elle interdisait hier,
      // elle l'EXIGE aujourd'hui, et elle exige en plus de quoi le tenir.
      const legende = dict[lang].section4.legende.modifier;
      expect(legende).toContain(lang === "fr" ? "Modifier" : "Changing");
      // Deux phrases : la cellule teintée casse un lien, l'autre non.
      expect(legende.split(".").filter((part) => part.trim() !== "")).toHaveLength(2);
      // Et le geste promis a son bouton, sa phrase d'appui et son message.
      const edition = dict[lang].section4.edition;
      expect(typeof edition.bouton).toBe("string");
      expect(typeof edition.note).toBe("string");
      expect(typeof edition.jointure.corps).toBe("string");
    },
  );

  it("A2-5 un champ qui ne correspond plus à l'exemple cliqué le lâche", () => {
    // La règle porte sur l'égalité entre le champ et l'expression de l'exemple
    // dans la langue courante : c'est cette comparaison que le rendu applique.
    const exemple = EXAMPLES.find((candidat) => candidat.key === "commencePar");
    expect("<nomClient:[=:/>").not.toBe(exampleExpression(exemple, FR));
    expect("<nomClient:[=:DUR/>").toBe(exampleExpression(exemple, FR));
  });

  it("A2-5 un basculement de langue ne lâche pas l'exemple toujours affiché", () => {
    // Le piège nommé par l'avenant : le champ est réécrit par la bascule, donc
    // comparer à la chaîne mémorisée au clic effacerait l'explication d'un
    // exemple qui est pourtant toujours celui affiché. Vérifié sur les treize.
    for (const exemple of EXAMPLES) {
      const enFrancais = exampleExpression(exemple, FR);
      expect(translateExpression(enFrancais, FR, EN), exemple.key)
        .toBe(exampleExpression(exemple, EN));
      const enAnglais = exampleExpression(exemple, EN);
      expect(translateExpression(enAnglais, EN, FR), exemple.key).toBe(enFrancais);
    }
  });

  it.each([["fr", "nomClient"], ["en", "customerLastName"]])(
    "A2-4 l'explication nomme les deux clients que la mesure rend vraiment (%s)",
    (lang, propriete) => {
      // La valeur ne dit plus « pour voir le refus » mais nomme LAMBERT et
      // PETIT : une affirmation nommée se vérifie, une affirmation vague se
      // croit. Cette porte est ce qui rend la nouvelle rédaction contrôlable.
      const model = modelOf(lang);
      const rows = joinFiles(dict[lang].section4.modes);
      const resultat = filterRows(`<${propriete}:=]:T/>`, model, rows);
      expect(resultat.ok).toBe(true);
      expect(resultat.rows.map((ligne) => ligne.NOMCLI).sort()).toEqual(["LAMBERT", "PETIT"]);

      const aide = dict[lang].section4.ex.finitPar.aide;
      expect(aide).toContain("LAMBERT");
      expect(aide).toContain("PETIT");
      // Et surtout : elle ne promet plus un refus qui n'arrive pas.
      expect(aide).not.toMatch(lang === "fr" ? /refus/i : /refusal/i);
    },
  );

  it("la parité de section4 vaut toujours 117 clés de chaque côté", () => {
    const cles = (node, prefixe = "") => {
      const out = [];
      for (const [nom, valeur] of Object.entries(node)) {
        const chemin = prefixe === "" ? nom : `${prefixe}.${nom}`;
        if (typeof valeur === "object" && valeur !== null) out.push(...cles(valeur, chemin));
        else out.push(chemin);
      }
      return out.sort();
    };
    const fr = cles(dict.fr.section4);
    const en = cles(dict.en.section4);
    // 94 au sortir de l'incrément 6, plus les 23 clés du second sous-incrément,
    // plus les 7 du confort de saisie : six `champ.*` (dont `attente`, gelée à
    // l'avenant 3) et `exemples.donneesModifiees` ; plus les 9 de l'avenant 5 :
    // les cinq `refus.forme.fautes`, et les couples `inacheve` et `colonneVide`.
    expect(fr).toHaveLength(133);
    expect(en).toHaveLength(133);
    expect(fr).toEqual(en);
  });
});

describe("buildModel : la couture est un contrat, et elle le tient", () => {
  it("exige neuf noms", () => {
    expect(() => buildModel(["un", "deux"])).toThrow(RangeError);
    expect(() => buildModel("pas un tableau")).toThrow(RangeError);
  });

  it("refuse un nom vide ou d'un autre type", () => {
    const names = PHYSICAL_MODEL.map((entry) => dict.fr.section4.modele[entry.key]);
    const trou = [...names];
    trou[3] = "";
    expect(() => buildModel(trou)).toThrow(TypeError);
    const nombre = [...names];
    nombre[3] = 7;
    expect(() => buildModel(nombre)).toThrow(TypeError);
  });

  it("le modèle porte les neuf entrées, colonne et fichier compris", () => {
    expect(FR).toHaveLength(9);
    expect(FR[0]).toMatchObject({ property: "nomClient", column: "NOMCLI", file: "CDEMST" });
    expect(FR[8]).toMatchObject({ property: "villeClient", column: "VILCLI", file: "CLIMST" });
    // La même colonne, deux fois : brute et interprétée. C'est voulu.
    expect(FR[6].column).toBe(FR[7].column);
    expect(FR[6].type).not.toBe(FR[7].type);
  });
});

/* ------------------------------------------------------------------------
   Second sous-incrément : le JSON, la requête, le vis-à-vis, l'édition.
   Toujours de la logique pure : le câblage de `mountMiniLanguage` reste, lui,
   inerte sous Vitest (famille [W13]).
   ------------------------------------------------------------------------ */

/** Les entrées d'un modèle, désignées par leur nom exposé. */
const pick = (model, ...names) =>
  names.map((name) => {
    const entry = model.find((candidate) => candidate.property === name);
    if (entry === undefined) {
      throw new Error(`aucune propriété nommée "${name}" dans ce modèle`);
    }
    return entry;
  });

/** Les commandes, avec une modification appliquée à l'une d'elles. */
const withEdit = (index, change) => {
  const orders = CDEMST.map((order) => ({ ...order }));
  orders[index] = { ...orders[index], ...change };
  return joinFiles(dict.fr.section4.modes, orders);
};

const read = (text, model = FR) => recognise(text, model);

describe("le JSON que l'API renverrait", () => {
  it("une jointure qui ne trouve rien s'écrit null, sans guillemets", () => {
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const json = renderJson([rows[0]], pick(FR, "nomClient", "villeClient"));
    expect(json).toContain('"villeClient": null');
    expect(json).not.toContain('"villeClient": "null"');
  });

  it("les textes portent des guillemets, les nombres n'en portent pas", () => {
    const json = renderJson(
      [ROWS_FR[0]],
      pick(FR, "nomClient", "numeroCommande", "montantCommande", "montantBrut"),
    );
    expect(json).toContain('"nomClient": "DURAND"');
    expect(json).toContain('"numeroCommande": 104207');
    expect(json).toContain('"montantCommande": 125.5');
    // Le montant brut est du TEXTE dans le fichier : il garde ses guillemets et
    // ses zéros de tête, et c'est tout l'intérêt de le montrer à côté.
    expect(json).toContain('"montantBrut": "000012550"');
  });

  it("aucune virgule après le dernier objet ni après la dernière propriété", () => {
    const json = renderJson(ROWS_FR.slice(0, 3), pick(FR, "nomClient", "villeClient"));
    expect(json).not.toMatch(/,\s*\]/);
    expect(json).not.toMatch(/,\s*\}/);
    expect(JSON.parse(json)).toHaveLength(3);
  });

  it("aucune colonne choisie et aucune ligne trouvée ne se disent pas pareil", () => {
    // Deux vides, deux sens : « il n'y a rien à renvoyer » n'est pas « le filtre
    // n'a rien retenu ». La page affiche deux textes différents, elle doit donc
    // recevoir deux valeurs différentes.
    expect(renderJson(ROWS_FR, [])).toBeNull();
    expect(renderJson([], pick(FR, "nomClient"))).toBe("[]");
  });

  it("les noms de propriétés suivent le modèle reçu, dans les deux langues", () => {
    const fr = renderJson([ROWS_FR[0]], pick(FR, "nomClient", "villeClient"));
    const en = renderJson([ROWS_EN[0]], pick(EN, "customerLastName", "customerCity"));
    expect(fr).toContain('"nomClient"');
    expect(fr).not.toContain('"customerLastName"');
    expect(en).toContain('"customerLastName"');
    expect(en).not.toContain('"nomClient"');
    // Même donnée des deux côtés : seuls les noms changent.
    expect(JSON.parse(fr)[0].nomClient).toBe(JSON.parse(en)[0].customerLastName);
  });
});

describe("la requête que le serveur bâtirait", () => {
  it("aucune jointure quand aucune colonne n'en exige", () => {
    const { sql } = buildParameterisedQuery(read(""), pick(FR, "nomClient", "numeroCommande"));
    expect(sql).not.toContain("join");
    expect(sql).toContain("from CDEMST");
  });

  it("une colonne COCHÉE amène sa jointure, et elle seule", () => {
    const { sql } = buildParameterisedQuery(read(""), pick(FR, "villeClient"));
    expect(sql).toContain("join CLIMST");
    expect(sql).not.toContain("join CMLIV");
    expect(sql).not.toContain("join MODLIV");
  });

  it("le libellé du mode amène CMLIV ET MODLIV, jamais l'un sans l'autre", () => {
    // Le code vit chez le client, le libellé au référentiel : c'est la même
    // donnée sous deux noms, et il faut les deux fichiers pour la remonter.
    const { sql } = buildParameterisedQuery(read(""), pick(FR, "libelleModeLivraison"));
    expect(sql).toContain("join CMLIV");
    expect(sql).toContain("join MODLIV on MODLIV.CODLIV = CMLIV.LIZEPO");
  });

  it("une colonne FILTRÉE amène sa jointure, même si elle n'est pas cochée", () => {
    const { sql } = buildParameterisedQuery(
      read("<villeClient:==:LYON/>"),
      pick(FR, "nomClient"),
    );
    expect(sql).toContain("join CLIMST");
    expect(sql).toContain("CLIMST.VILCLI = ?");
  });

  it("un ? par valeur, et deux pour un « compris entre »", () => {
    const une = buildParameterisedQuery(read("<nomClient:[=:DUR/>"), pick(FR, "nomClient"));
    expect(une.sql.match(/\?/g)).toHaveLength(1);
    expect(une.params).toHaveLength(1);

    const deux = buildParameterisedQuery(
      read("<montantCommande:><:1000;4000/>"),
      pick(FR, "montantCommande"),
    );
    expect(deux.sql.match(/\?/g)).toHaveLength(2);
    expect(deux.params).toHaveLength(2);
    expect(deux.sql).toContain("between ? and ?");
  });

  it("les deux conditions d'une expression donnent deux ?", () => {
    const { sql, params } = buildParameterisedQuery(
      read("<nomClient:[=:DUR/> && <codeModeLivraison:==:EXP/>"),
      pick(FR, "nomClient"),
    );
    expect(sql.match(/\?/g)).toHaveLength(2);
    expect(params).toHaveLength(2);
  });

  it("une colonne physique n'est lue qu'une fois, mais le JSON garde les deux propriétés", () => {
    // Décision 11 : `montantBrut` et `montantCommande` sortent tous deux de
    // CDEMST.MTTCDE. Le doublon a déjà mordu une fois sur la maquette.
    const entries = pick(FR, "montantBrut", "montantCommande");
    const { sql } = buildParameterisedQuery(read(""), entries);
    const select = sql.split("\n")[0];
    expect(select.match(/CDEMST\.MTTCDE/g)).toHaveLength(1);

    const json = renderJson([ROWS_FR[0]], entries);
    expect(json).toContain('"montantBrut"');
    expect(json).toContain('"montantCommande"');
  });

  it("la borne d'une colonne décimale part traduite, et la traduction est dite", () => {
    const { params } = buildParameterisedQuery(
      read("<montantCommande:><:1000;4000/>"),
      pick(FR, "montantCommande"),
    );
    expect(params[0].display).toBe("100000");
    expect(params[0].translated).toEqual({ avant: "1000", apres: "100000" });
    expect(params[1].display).toBe("400000");
  });

  it("une borne texte ou entière part telle quelle, sans traduction", () => {
    const texte = buildParameterisedQuery(read("<nomClient:==:DURAND/>"), pick(FR, "nomClient"));
    expect(texte.params[0].display).toBe('"DURAND"');
    expect(texte.params[0].translated).toBeNull();

    const entier = buildParameterisedQuery(
      read("<numeroCommande:=>:104300/>"),
      pick(FR, "numeroCommande"),
    );
    expect(entier.params[0].display).toBe("104300");
    expect(entier.params[0].translated).toBeNull();
  });

  it("sans colonne cochée, il n'y a pas de requête", () => {
    // Arbitrage du chef de projet, session 19 : le cadre dit alors la même
    // absence que le JSON, et ni le vis-à-vis ni les valeurs ne s'affichent.
    expect(buildParameterisedQuery(read("<nomClient:[=:DUR/>"), []).sql).toBeNull();
    expect(buildParameterisedQuery(read("<nomClient:[=:DUR/>"), []).params).toHaveLength(0);
  });
});

describe("le vis-à-vis : deux textes, et le lecteur conclut", () => {
  const INJECTION = "<nomClient:==:D' OR '1'='1/>";

  it("le texte naïf porte la valeur COLLÉE, apostrophe comprise", () => {
    const naive = buildNaiveQuery(read(INJECTION), pick(FR, "nomClient"));
    expect(naive).toContain("CDEMST.NOMCLI = 'D' OR '1'='1'");
  });

  it("le texte paramétré porte un ?, et JAMAIS la valeur", () => {
    // La preuve du chapitre : la valeur ne voyage pas dans le texte.
    const { sql, params } = buildParameterisedQuery(read(INJECTION), pick(FR, "nomClient"));
    expect(sql).toContain("CDEMST.NOMCLI = ?");
    expect(sql).not.toContain("OR '1'='1");
    expect(sql).not.toContain("D'");
    // Elle voyage à côté, et là on la voit en entier, guillemets de délimitation
    // compris : ce sont eux qui rendent l'apostrophe visible.
    expect(params[0].display).toBe(`"D' OR '1'='1"`);
  });

  it("aucun cadre naïf tant qu'aucune valeur ne porte d'apostrophe", () => {
    // Sur une demande ordinaire, la page reste sobre.
    expect(buildNaiveQuery(read("<nomClient:[=:DUR/>"), pick(FR, "nomClient"))).toBeNull();
    expect(buildNaiveQuery(read(""), pick(FR, "nomClient"))).toBeNull();
    expect(
      buildNaiveQuery(read("<montantCommande:><:1000;4000/>"), pick(FR, "montantCommande")),
    ).toBeNull();
  });

  it("une apostrophe dans une borne suffit aussi à le déclencher", () => {
    const naive = buildNaiveQuery(read("<dateCommande:><:2026';1/>"), pick(FR, "dateCommande"));
    expect(naive).not.toBeNull();
  });

  it("sans colonne cochée, pas de cadre naïf même avec une apostrophe", () => {
    expect(buildNaiveQuery(read(INJECTION), [])).toBeNull();
  });

  it("les deux textes ne diffèrent QUE par la façon dont la valeur y entre", () => {
    const entries = pick(FR, "nomClient", "villeClient");
    const naive = buildNaiveQuery(read(INJECTION), entries);
    const { sql } = buildParameterisedQuery(read(INJECTION), entries);
    // Mêmes colonnes, mêmes jointures : seule la dernière ligne change.
    expect(naive.split("\n").slice(0, -1)).toEqual(sql.split("\n").slice(0, -1));
  });
});

describe("l'édition du lecteur, et la jointure qui cède", () => {
  it("le décor livré ne porte aucune commande orpheline", () => {
    // Porte non vide : si le décor était déjà cassé, les cas suivants ne
    // prouveraient rien.
    expect(findOrphans(ROWS_FR, ROWS_FR).orphans).toHaveLength(0);
  });

  it("un AUTRE nom casse le lien, et rend null sur les trois propriétés jointes", () => {
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const broken = rows[0];
    expect(broken.VILCLI).toBeNull();
    expect(broken.LIZEPO).toBeNull();
    expect(broken.LIBLIV).toBeNull();
    // Et SEULEMENT sur celles-là : ce que porte la commande elle-même tient.
    expect(broken.NOMCLI).toBe("DURANT");
    expect(broken.PRECLI).toBe("CLAIRE");
    expect(broken.NUMCDE).toBe(104207);
    expect(broken.DATCDE).toBe("20260112");
    expect(broken.MTTCDE).toBe(125.5);
  });

  it("une commande cassée n'entraîne pas les autres", () => {
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    expect(findOrphans(rows, rows).orphans).toHaveLength(1);
    expect(rows[1].VILCLI).toBe("PARIS");
  });

  it("la casse ne casse pas : « durand » retrouve DURAND", () => {
    const rows = withEdit(0, { NOMCLI: "durand" });
    expect(rows[0].VILCLI).toBe("LYON");
    expect(findOrphans(rows, rows).orphans).toHaveLength(0);
  });

  it("le prénom se compare de la même façon, dans les deux sens", () => {
    const minuscules = withEdit(0, { NOMCLI: "durand", PRECLI: "claire" });
    expect(minuscules[0].LIZEPO).toBe("EXP");
    const melange = withEdit(0, { NOMCLI: "DuRaNd", PRECLI: "ClAiRe" });
    expect(melange[0].VILCLI).toBe("LYON");
    // Mais un AUTRE prénom casse : ce qui rompt un lien est un autre nom, pas
    // une autre écriture du même nom.
    const autre = withEdit(0, { PRECLI: "CLARA" });
    expect(autre[0].VILCLI).toBeNull();
  });

  it("une orpheline retenue par le filtre n'est pas dite cachée", () => {
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const kept = filterRows("<nomClient:[=:DURANT/>", FR, rows);
    const broken = findOrphans(rows, kept.rows);
    expect(broken.orphans).toHaveLength(1);
    expect(broken.hidden).toHaveLength(0);
  });

  it("une orpheline SORTIE du résultat par le filtre est dite cachée", () => {
    // La morsure réelle : le chef de projet casse un nom sous un filtre qui
    // teste ce même nom, la ligne quitte le résultat, et il cherche un null qui
    // n'a nulle part où s'afficher.
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const kept = filterRows("<nomClient:[=:MAR/>", FR, rows);
    const broken = findOrphans(rows, kept.rows);
    expect(broken.orphans).toHaveLength(1);
    expect(broken.hidden).toHaveLength(1);
    expect(broken.hidden[0].NUMCDE).toBe(104207);
  });

  it("le JSON d'une orpheline montre bien ses trois null", () => {
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const json = renderJson(
      [rows[0]],
      pick(FR, "villeClient", "codeModeLivraison", "libelleModeLivraison"),
    );
    expect(json.match(/null/g)).toHaveLength(3);
  });

  it("le décor gelé n'a pas bougé sous l'édition", () => {
    // `joinFiles` reçoit une COPIE : le module ne se laisse pas modifier par
    // ce que le lecteur tape.
    withEdit(0, { NOMCLI: "DURANT" });
    expect(CDEMST[0].NOMCLI).toBe("DURAND");
    expect(joinFiles(dict.fr.section4.modes)[0].VILCLI).toBe("LYON");
  });

  it("un montant que le fichier ne pourrait pas stocker rend null au lieu de tout arrêter", () => {
    // `parseImplicitDecimal` LÈVE sur autre chose que des chiffres : sans garde,
    // une lettre tapée dans un montant arrêtait la page entière.
    const rows = withEdit(0, { MTTCDE: "12x50" });
    expect(rows[0].MTTCDE).toBeNull();
    expect(rows[0].MTTCDE_BRUT).toBe("12x50");
    expect(rows[0].VILCLI).toBe("LYON");
  });
});

describe("le chemin que la page emprunte vraiment", () => {
  it("filterRows rend la LECTURE, pas seulement les lignes", () => {
    // Le rendu bâtit la requête à partir de ce que `filterRows` lui rend. Tant
    // que ce retour ne portait pas `conditions`, la requête sortait sans sa
    // clause `where` pendant que le JSON, lui, filtrait : deux zones voisines
    // se contredisaient. Trouvé au DOM d'essai le 23 août 2026, jamais par les
    // familles ci-dessus, qui appelaient `recognise` en direct.
    const result = filterRows("<nomClient:[=:DUR/>", FR, ROWS_FR);
    expect(result.ok).toBe(true);
    expect(result.conditions).toHaveLength(1);
    expect(result).toHaveProperty("link");
    expect(result.rows.length).toBeLessThan(result.total);
  });

  it("la requête bâtie depuis ce retour porte sa clause where", () => {
    const result = filterRows("<nomClient:[=:DUR/>", FR, ROWS_FR);
    const { sql, params } = buildParameterisedQuery(result, pick(FR, "nomClient"));
    expect(sql).toContain("where CDEMST.NOMCLI like ?");
    expect(params).toHaveLength(1);
  });

  it("le JSON et la requête parlent de la même demande", () => {
    // Le lien qui manquait : autant de lignes filtrées d'un côté, autant de
    // conditions posées de l'autre.
    const result = filterRows("<villeClient:==:LYON/> && <nomClient:[=:DUR/>", FR, ROWS_FR);
    const entries = pick(FR, "nomClient", "villeClient");
    const { sql } = buildParameterisedQuery(result, entries);
    expect(sql.match(/\?/g)).toHaveLength(2);
    expect(JSON.parse(renderJson(result.rows, entries))).toHaveLength(result.rows.length);
    expect(result.rows.every((row) => row.VILCLI === "LYON")).toBe(true);
  });

  it("une expression refusée ne rend ni lignes ni conditions exploitables", () => {
    const result = filterRows("<motDePasse:==:toto/>", FR, ROWS_FR);
    expect(result.ok).toBe(false);
    expect(result.rows).toBeUndefined();
    expect(result.refusal.code).toBe("colonne");
  });
});

describe("la rupture doit se voir, session 19", () => {
  it("la sélection de départ rend les TROIS null observables au JSON", () => {
    // C'est le motif de la retouche : le message annonce que les trois
    // propriétés jointes rendent null, et le lecteur doit pouvoir le vérifier
    // sans deviner quelles cases lui manquent.
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const entries = initialSelection().map((index) => FR[index]);
    const json = renderJson([rows[0]], entries);
    expect(json.match(/null/g)).toHaveLength(3);
  });

  it("les trois propriétés jointes que le message nomme sont cochées au départ", () => {
    // La porte mord sur le fond, pas sur le compte : si une des trois sortait
    // du défaut, le message redeviendrait invérifiable.
    const noms = initialSelection().map((index) => FR[index].property);
    for (const attendu of ["villeClient", "codeModeLivraison", "libelleModeLivraison"]) {
      expect(noms, attendu).toContain(attendu);
    }
  });

  it("le message nomme exactement les propriétés qui rendent null, dans les deux langues", () => {
    // Les trois jointes, et ELLES SEULES : une quatrième citée serait fausse.
    const rows = withEdit(0, { NOMCLI: "DURANT" });
    const jointes = ["VILCLI", "LIZEPO", "LIBLIV"];
    for (const cle of jointes) {
      expect(rows[0][cle], cle).toBeNull();
    }
    for (const lang of ["fr", "en"]) {
      const model = lang === "fr" ? FR : EN;
      const corps = dict[lang].section4.edition.jointure.corps;
      for (const cle of jointes) {
        const propriete = model[PHYSICAL_MODEL.findIndex((e) => e.key === cle)].property;
        expect(corps, `${lang}.${propriete}`).toContain(propriete);
      }
    }
  });

  it("la note d'édition ne promet plus que ce qui bouge sur une édition de donnée", () => {
    // Trois des cinq promesses d'origine étaient byte-identiques après une
    // rupture : la classe se dérive des colonnes, la requête des colonnes et du
    // filtre, le compte du filtre. Aucune ne dépend de la donnée.
    const entries = initialSelection().map((index) => FR[index]);
    const avant = withEdit(0, {});
    const apres = withEdit(0, { NOMCLI: "DURANT" });
    const lecture = { link: null, conditions: [] };

    // Ce qui NE bouge pas, et que la note ne doit donc plus promettre.
    expect(className("Commande", entries)).toBe(className("Commande", entries));
    expect(buildParameterisedQuery(lecture, entries).sql)
      .toBe(buildParameterisedQuery(lecture, entries).sql);

    // Ce qui bouge, et que la note promet.
    expect(renderJson([apres[0]], entries)).not.toBe(renderJson([avant[0]], entries));
    expect(findOrphans(apres, apres).orphans).toHaveLength(1);
    expect(findOrphans(avant, avant).orphans).toHaveLength(0);

    for (const lang of ["fr", "en"]) {
      const note = dict[lang].section4.edition.note;
      const classe = lang === "fr" ? /la classe/i : /the class/i;
      const requete = lang === "fr" ? /la requête/i : /the query/i;
      // Elles peuvent être nommées, mais jamais dans la liste de ce qui se
      // rejoue : la phrase dit désormais qu'elles NE dépendent PAS des données.
      const negation = lang === "fr" ? /ne dépendent pas des données/i : /do not depend on the data/i;
      expect(note, lang).toMatch(negation);
      expect(note.match(classe), lang).not.toBeNull();
      expect(note.match(requete), lang).not.toBeNull();
    }
  });
});

describe("les deux gardes de joinFiles ont désormais la même rigueur", () => {
  it.each([
    ["cellule vidée", "", null],
    ["espaces seuls", " ", null],
    ["notation scientifique", "1e3", null],
    ["hexadécimal", "0x10", null],
    ["décimal pointé", "12.5", null],
    ["signe négatif", "-4", null],
    ["chiffres et lettres", "12x50", null],
    ["chiffres seuls", "104207", 104207],
  ])("le numéro : %s", (_titre, saisi, attendu) => {
    // `Number()` rendait 0 sur une cellule vidée, et le message de rupture
    // aurait nommé « 0 DURAND CLAIRE ».
    const rows = withEdit(0, { NUMCDE: saisi });
    expect(rows[0].NUMCDE).toBe(attendu);
  });

  it.each([
    ["cellule vidée", ""],
    ["espaces seuls", " "],
    ["notation scientifique", "1e3"],
    ["décimal pointé", "12.5"],
    ["signe négatif", "-4"],
  ])("le montant refuse la même chose : %s", (_titre, saisi) => {
    const rows = withEdit(0, { MTTCDE: saisi });
    expect(rows[0].MTTCDE).toBeNull();
    expect(rows[0].MTTCDE_BRUT).toBe(saisi);
  });

  it("un numéro illisible tombe du message au lieu d'y écrire une valeur inventée", () => {
    const rows = withEdit(0, { NOMCLI: "DURANT", NUMCDE: "" });
    expect(rows[0].NUMCDE).toBeNull();
    // Le JSON dit null, jamais 0.
    const json = renderJson([rows[0]], pick(FR, "numeroCommande"));
    expect(json).toContain('"numeroCommande": null');
    expect(json).not.toContain('"numeroCommande": 0');
  });

  it("une borne hors de l'entier sûr passe intacte au lieu d'arrêter la page", () => {
    // `formatImplicitDecimal` refuse au delà de l'entier sûr : la borne doit
    // alors traverser sans traduction, comme une borne non numérique.
    const lecture = recognise("<montantCommande:=>:1e21/>", FR);
    expect(lecture.ok).toBe(true);
    const { params } = buildParameterisedQuery(lecture, pick(FR, "montantCommande"));
    expect(params[0].translated).toBeNull();
    expect(params[0].display).toBe("1e21");
  });

  it("une borne du haut de plage, elle, se traduit encore", () => {
    const lecture = recognise("<montantCommande:=>:1000000/>", FR);
    const { params } = buildParameterisedQuery(lecture, pick(FR, "montantCommande"));
    expect(params[0].translated).toEqual({ avant: "1000000", apres: "100000000" });
  });
});

describe("l'avertissement de périmètre vit sur la fonction, pas seulement en tête de fichier", () => {
  it("buildNaiveQuery et toLiteral portent chacun leur mise en garde", async () => {
    // Un copier-coller n'emporte pas l'en-tête d'un fichier. La règle
    // permanente « zéro concaténation SQL » n'a pas d'autre garde ici.
    const { readFile } = await import("node:fs/promises");
    const source = await readFile(new URL("../js/minilangage.js", import.meta.url), "utf8");
    const bloc = (nom) => {
      const fin = source.indexOf(nom);
      const debut = source.lastIndexOf("/**", fin);
      return source.slice(debut, fin);
    };
    for (const nom of ["export function buildNaiveQuery", "function toLiteral"]) {
      const commentaire = bloc(nom);
      expect(commentaire, nom).toMatch(/exécuté|EXÉCUT/);
      expect(commentaire, nom).toMatch(/ni base|aucune base|ni pilote/);
    }
  });
});

/* ------------------------------------- LE CONFORT DE SAISIE (incrément 9)

   Quatre fonctions pures, et rien du câblage : l'écouteur, l'état des boutons
   et la coupure en deux zones vivent dans `mountMiniLanguage`, sous [W13]
   (aucun DOM sous Vitest). Ce que ces suites gardent, ce sont les RÈGLES. */

describe("stripLineBreaks : le retour chariot est ignoré à la lecture, jamais retiré du champ", () => {
  it("rend un texte sans retour à la ligne inchangé, à l'octet près", () => {
    const texte = `<${FR[0].property}:[=:DUR/> && <${FR[2].property}:==:EXP/>`;
    expect(stripLineBreaks(texte)).toBe(texte);
  });

  it("retire les trois formes, et compte le `\\r\\n` de Windows une seule fois", () => {
    expect(stripLineBreaks("a\nb")).toBe("ab");
    expect(stripLineBreaks("a\rb")).toBe("ab");
    // Un texte collé depuis Windows porte DEUX caractères pour une seule
    // coupure : les traiter séparément mangerait un cran de trop.
    expect(stripLineBreaks("a\r\nb")).toBe("ab");
    expect(stripLineBreaks("a\r\nb")).toHaveLength(2);
  });

  it("ne touche jamais aux espaces ordinaires : dans ce langage une espace compte", () => {
    // La valeur d'injection en porte deux, et elles font partie de la
    // démonstration : les avaler changerait ce que la page prouve.
    expect(stripLineBreaks("D' OR '1'='1")).toBe("D' OR '1'='1");
    expect(stripLineBreaks("  <a:b:c/>  ")).toBe("  <a:b:c/>  ");
  });
});

describe("stripLineBreaks : les cinq positions, jugées sur ce qui est LU", () => {
  // Le test porte sur le RÉSULTAT de la lecture, jamais sur la chaîne
  // nettoyée : c'est la demande lue par la page qui doit être la bonne.
  const NOM = FR[0].property;
  const MODE = FR[2].property;
  const lire = (texte) => filterRows(stripLineBreaks(texte), FR, ROWS_FR);

  it("entre deux séquences : sans effet, les deux conditions sont lues", () => {
    const read = lire(`<${NOM}:[=:DUR/>\n && <${MODE}:==:EXP/>`);
    expect(read.ok).toBe(true);
    expect(read.conditions).toHaveLength(2);
  });

  it("juste avant `&&`, sans espace : sans effet", () => {
    const read = lire(`<${NOM}:[=:DUR/>\n&& <${MODE}:==:EXP/>`);
    expect(read.ok).toBe(true);
    expect(read.conditions).toHaveLength(2);
  });

  it("collé depuis Windows (`\\r\\n`) : sans effet", () => {
    const read = lire(`<${NOM}:[=:DUR/>\r\n && <${MODE}:==:EXP/>`);
    expect(read.ok).toBe(true);
    expect(read.conditions).toHaveLength(2);
  });

  it("dans l'opérateur : l'opérateur est lu, la demande passe", () => {
    // L'espace de remplacement, elle, donnait un opérateur `[= ` que rien à
    // l'écran ne distingue de `[=` — et un refus incompréhensible.
    const read = lire(`<${NOM}:[=\n:DUR/>`);
    expect(read.ok).toBe(true);
    expect(read.conditions[0].operator).toBe("[=");
  });

  it("dans une valeur : la valeur est recollée, et les lignes sont trouvées", () => {
    const read = lire(`<${NOM}:==:DU\nRAND/>`);
    expect(read.ok).toBe(true);
    expect(read.conditions[0].value).toBe("DURAND");
    // L'espace de remplacement donnait `DU RAND`, et aucune ligne.
    expect(read.rows.length).toBeGreaterThan(0);
    expect(read.rows.every((row) => row.NOMCLI === "DURAND")).toBe(true);
  });
});

describe("closeSequence : elle complète, elle ne répare pas", () => {
  it("ne touche pas à ce qui n'a rien à fermer", () => {
    expect(closeSequence("")).toBe("");
    expect(closeSequence("   ")).toBe("   ");
    expect(closeSequence("<a:b:c/>")).toBe("<a:b:c/>");
  });

  it("ne ferme pas une liaison en attente de sa séquence", () => {
    // Sans cette garde, `<a:b:c/> && ` donnait `<a:b:c/> &&/>` — une absurdité
    // atteignable dès que le lecteur appuie sur `/>` après un bouton de liaison.
    expect(closeSequence("<a:b:c/> && ")).toBe("<a:b:c/> && ");
    expect(closeSequence("<a:b:c/> || ")).toBe("<a:b:c/> || ");
  });

  it("ferme une séquence ouverte, et absorbe les espaces de fin", () => {
    expect(closeSequence("<a:b:c")).toBe("<a:b:c/>");
    expect(closeSequence("<a:b:c   ")).toBe("<a:b:c/>");
  });

  it("GARDIEN DE LA LIGNE GRAVÉE : la séquence fermée reste refusée", () => {
    // Le cas mesuré sur iPhone 14 : le lecteur a tapé un opérateur de trop.
    // Le bouton ferme ce qu'il n'avait pas fini d'écrire — il ne redresse PAS
    // le `===` qu'il a fini et raté. Si ce test devient vert en rendant une
    // expression VALIDE, c'est que quelqu'un a fait de ce bouton un correcteur.
    //
    // Le refus se DÉPLACE en se fermant, et c'est la démonstration même :
    // `forme` tant que la séquence est ouverte, `operateur` une fois fermée,
    // parce que la page peut enfin voir la vraie faute. (Le prompt gelé
    // annonçait `forme` après fermeture : mesuré ici, c'est `operateur` —
    // l'invariant qui compte, « toujours refusée », est intact.)
    const ouvert = `<${FR[8].property}:===:l`;
    expect(recognise(ouvert, FR).refusal.code).toBe("forme");

    const ferme = closeSequence(ouvert);
    expect(ferme).toBe(`<${FR[8].property}:===:l/>`);
    const read = recognise(ferme, FR);
    expect(read.ok).toBe(false);
    expect(read.refusal.code).toBe("operateur");
  });
});

describe("appendLink : elle ferme d'abord, puis enchaîne", () => {
  it("ne fait rien quand il n'y a rien à lier", () => {
    expect(appendLink("", "&&")).toBe("");
    expect(appendLink("   ", "||")).toBe("   ");
  });

  it("ferme la séquence en cours avant d'ajouter la liaison", () => {
    expect(appendLink("<a:b:c", "&&")).toBe("<a:b:c/> && ");
    expect(appendLink("<a:b:c/>", "&&")).toBe("<a:b:c/> && ");
    expect(appendLink("<a:b:c/>", "||")).toBe("<a:b:c/> || ");
  });

  it("reste inerte quand une liaison attend déjà sa séquence", () => {
    expect(appendLink("<a:b:c/> && ", "&&")).toBe("<a:b:c/> && ");
    expect(appendLink("<a:b:c/> && ", "||")).toBe("<a:b:c/> && ");
  });

  it("GARDIEN DE LA LEÇON : le mélange de ET et de OU reste atteignable", () => {
    // La rangée n'empêche jamais le lecteur d'atteindre ce refus : l'exemple
    // « ET mêlé à OU » existe pour le montrer. Une prévenance qui désactiverait
    // `||` en présence d'un `&&` lui volerait ce qu'il vient voir.
    const mele = appendLink(
      `<${FR[0].property}:[=:DUR/> && <${FR[8].property}:==:LYON/>`,
      "||",
    );
    expect(mele).toBe(
      `<${FR[0].property}:[=:DUR/> && <${FR[8].property}:==:LYON/> || `,
    );
    const read = recognise(`${mele}<${FR[0].property}:[=:MAR/>`, FR);
    expect(read.ok).toBe(false);
    expect(read.refusal.code).toBe("liaison");
  });
});

describe("hasEdits : le lecteur a-t-il modifié les commandes ?", () => {
  const copie = () => CDEMST.map((order) => ({ ...order }));

  it("l'origine n'est pas une modification", () => {
    expect(hasEdits(copie())).toBe(false);
  });

  it("une cellule changée suffit", () => {
    const orders = copie();
    orders[0].NOMCLI = "DURANT";
    expect(hasEdits(orders)).toBe(true);
  });

  it("retapée à l'identique, elle ne l'est plus", () => {
    const orders = copie();
    orders[0].NOMCLI = "DURANT";
    orders[0].NOMCLI = "DURAND";
    expect(hasEdits(orders)).toBe(false);
  });

  it("la casse compte : ce détecteur constate, il ne juge pas la jointure", () => {
    // La jointure, elle, tolère la casse. Les deux règles sont distinctes et
    // c'est voulu : la donnée n'est plus celle d'origine, même si le lien tient.
    const orders = copie();
    orders[0].NOMCLI = "durand";
    expect(hasEdits(orders)).toBe(true);
  });

  it("les dix-huit commandes sont parcourues, pas seulement la première", () => {
    const orders = copie();
    orders[17].MTTCDE = "000000001";
    expect(hasEdits(orders)).toBe(true);
    expect(orders).toHaveLength(18);
  });
});

describe("Le modèle d'envoi : la règle de l'inerte", () => {
  // Le câblage est sous [W13] ; ce qui se garde ici, c'est la RÈGLE qui protège
  // du défaut d'état périmé — « Envoyer » éteint veut dire « la réponse
  // affichée correspond à ce que vous lisez ».
  const inerte = (champ, sent) => stripLineBreaks(champ) === sent;

  it("à l'arrivée : champ vide, rien d'envoyé, bouton inerte", () => {
    expect(inerte("", "")).toBe(true);
  });

  it("le champ rempli par un exemple, sans envoi : bouton ACTIF", () => {
    // C'est l'arbitrage du 25 août : cliquer écrit la demande, le lecteur
    // l'envoie. Le résultat doit rester sa découverte.
    const exemple = exampleExpression(EXAMPLES[0], FR);
    expect(inerte(exemple, "")).toBe(false);
  });

  it("deux frappes sans envoi ne changent pas ce qui a été envoyé", () => {
    const sent = `<${FR[0].property}:[=:DUR/>`;
    expect(inerte(`${sent}X`, sent)).toBe(false);
    expect(inerte(`${sent}XY`, sent)).toBe(false);
  });

  it("un envoi remplace la demande lue, et rendort le bouton", () => {
    const champ = `<${FR[0].property}:[=:DUR/>`;
    const sent = stripLineBreaks(champ);
    expect(inerte(champ, sent)).toBe(true);
  });

  it("un retour chariot ajouté ne réveille pas le bouton : rien de neuf à envoyer", () => {
    const sent = `<${FR[0].property}:[=:DUR/>`;
    expect(inerte(`<${FR[0].property}:[=:DUR/>\n`, sent)).toBe(true);
  });
});

describe("La bascule de langue : les deux zones parlent la même langue", () => {
  // Trouvée à la revue indépendante du 25 août 2026 : la coupure en deux zones
  // traduisait le champ et laissait la demande ENVOYÉE dans la langue d'avant.
  // La zone de réponse refusait alors sur un nom de colonne que rien à l'écran
  // ne portait plus. Ni la frappe, ni l'envoi, ni une case cochée n'atteignaient
  // ce défaut : seule la bascule le révélait.
  const envoyee = `<${FR[8].property}:==:LYON/>`;

  it("la demande envoyée, laissée dans la langue d'avant, refuse sur un nom absent de l'écran", () => {
    const orpheline = filterRows(envoyee, EN, ROWS_EN);
    expect(orpheline.ok).toBe(false);
    expect(orpheline.refusal.code).toBe("colonne");
    // Le champ, lui, montre déjà le nom anglais : les deux zones se contredisent.
    expect(translateExpression(envoyee, FR, EN)).toBe(`<${EN[8].property}:==:LYON/>`);
  });

  it("traduite avec le champ, elle sert exactement les mêmes lignes", () => {
    const avant = filterRows(envoyee, FR, ROWS_FR);
    const apres = filterRows(translateExpression(envoyee, FR, EN), EN, ROWS_EN);
    expect(avant.ok).toBe(true);
    expect(apres.ok).toBe(true);
    expect(apres.rows).toHaveLength(avant.rows.length);
  });
});

/* ------------------------------- AVENANT 3 : ce que la passe d'appareil a
   trouvé, et qu'aucun fichier ne portait (26 août 2026). */

describe("hasPendingLink : un seul porteur pour une règle qui en avait trois", () => {
  it("dit vrai quand, et seulement quand, une liaison attend sa séquence", () => {
    expect(hasPendingLink("")).toBe(false);
    expect(hasPendingLink("   ")).toBe(false);
    expect(hasPendingLink("<a:b:c/>")).toBe(false);
    expect(hasPendingLink("<a:b:c/> &&")).toBe(true);
    expect(hasPendingLink("<a:b:c/> ||")).toBe(true);
    // Les espaces de fin sont absorbées : le bouton laisse « <a/> && ».
    expect(hasPendingLink("<a:b:c/> &&   ")).toBe(true);
    // La liaison n'attend plus : elle a reçu sa séquence.
    expect(hasPendingLink("<a:b:c/> && <d:e:f/>")).toBe(false);
  });

  it("LE TEST QUI VAUT LE CORRECTIF : les trois appelants s'accordent sur le même texte", () => {
    // La même notion était écrite trois fois, et l'endroit qui l'ignorait est
    // celui qui a mordu. Un seul prédicat, trois comportements cohérents —
    // vérifiés ensemble, jamais séparément.
    const enAttente = "<a:b:c/> && ";
    expect(hasPendingLink(enAttente)).toBe(true);
    expect(closeSequence(enAttente)).toBe(enAttente);          // rien à fermer
    expect(appendLink(enAttente, "||")).toBe(enAttente);       // rien à empiler
    expect(applyExample(enAttente, "<d:e:f/>")).toBe("<a:b:c/> && <d:e:f/>"); // on ajoute

    const fini = "<a:b:c/>";
    expect(hasPendingLink(fini)).toBe(false);
    expect(closeSequence(fini)).toBe(fini);
    expect(appendLink(fini, "||")).toBe("<a:b:c/> || ");
    expect(applyExample(fini, "<d:e:f/>")).toBe("<d:e:f/>");   // on remplace
  });
});

describe("applyExample : le clic complète, il ne détruit pas", () => {
  it("LE CAS MORDU sur iPhone 14 : la liaison composée au doigt survit", () => {
    // Le lecteur avait composé `<nomClient:[]:AR/> ||` au doigt — le geste le
    // plus coûteux de la page — puis cliqué « commence par » pour remplir le
    // second membre. Tout partait.
    const compose = `<${FR[0].property}:[]:AR/> ||`;
    const exemple = exampleExpression(EXAMPLES[0], FR);
    const apres = applyExample(compose, exemple);
    expect(apres).toBe(`<${FR[0].property}:[]:AR/> || ${exemple}`);
    // L'expression du lecteur est toujours là, à l'octet près.
    expect(apres.startsWith(`<${FR[0].property}:[]:AR/>`)).toBe(true);
    // Et le tout se lit : le refus du mélange n'est pas en cause ici.
    expect(recognise(apres, FR).ok).toBe(true);
  });

  it("remplace quand aucune liaison n'attend, y compris sur champ vide", () => {
    // Sans liaison en attente, ajouter exigerait d'INVENTER un `&&` que le
    // lecteur n'a pas demandé : ce serait deviner son intention.
    expect(applyExample("", "<d:e:f/>")).toBe("<d:e:f/>");
    expect(applyExample("<a:b:c/>", "<d:e:f/>")).toBe("<d:e:f/>");
    expect(applyExample("<a:b:c", "<d:e:f/>")).toBe("<d:e:f/>");
  });
});

describe("L'état d'arrivée : la chaîne vide est une demande, `null` est l'absence de demande", () => {
  // La distinction elle-même vit dans le câblage, famille [W13] : ce qui se
  // teste ici est ce qui la REND nécessaire — une demande vide ENVOYÉE est une
  // demande sans condition, et elle sert les dix-huit lignes. Confondre les
  // deux, c'est répondre avant qu'on ait demandé.
  it("une demande vide envoyée n'est pas un refus : elle sert tout le fichier", () => {
    const read = filterRows("", FR, ROWS_FR);
    expect(read.ok).toBe(true);
    expect(read.rows).toHaveLength(18);
    expect(read.total).toBe(18);
  });

  it("la règle de l'inerte tolère l'absence de demande sans la confondre avec une demande vide", () => {
    // `sent ?? ""` : à l'arrivée le bouton dort, parce qu'il n'y a rien à
    // envoyer — et non parce qu'une demande vide aurait déjà été envoyée.
    const inerte = (champ, sent) => stripLineBreaks(champ) === (sent ?? "");
    expect(inerte("", null)).toBe(true);                    // arrivée
    expect(inerte("", "")).toBe(true);                      // demande vide envoyée
    expect(inerte(`<${FR[0].property}:[=:DUR/>`, null)).toBe(false);  // écrit, pas envoyé
  });

  it("GARDIEN DE LA BASCULE À VIDE : traduire une demande absente ne fait rien, et ne jette pas", () => {
    // La quatrième lecture de `sent`, oubliée quand la valeur d'arrivée est
    // passée de `""` à `null`. Non gardée, `sent.trim()` jetait une
    // `TypeError` à toute bascule de langue faite AVANT le premier envoi —
    // c'est-à-dire depuis l'état d'arrivée que l'avenant 3 venait d'instituer.
    // Le jet tombait AVANT la mise à jour de `renderedLang` : la page entière
    // restait dans la langue d'avant, et le désaccord `lang`/`renderedLang`
    // interdisait ensuite la traduction au retour.
    //
    // Le câblage vit dans `mountMiniLanguage` ([W13]) ; ce qui se garde ici est
    // la RÈGLE que la garde applique. `sentText` est une fermeture du montage,
    // donc non importable : la porte rejoue ce qu'il rend, elle ne l'appelle
    // pas. Elle documente, elle ne garde pas — mesuré, et non supposé : la
    // garde retirée du module, la suite reste verte.
    const sentText = (sent) => sent ?? "";
    const traduire = (sent) =>
      sentText(sent).trim() !== "" ? translateExpression(sentText(sent), FR, EN) : sent;

    expect(traduire(null)).toBe(null);   // arrivée : rien n'est parti, rien ne bouge
    expect(traduire("")).toBe("");       // demande vide envoyée : rien à réécrire
    expect(traduire("   ")).toBe("   "); // et une demande d'espaces n'est pas une demande
    expect(traduire(`<${FR[0].property}:[=:DUR/>`)).toBe(`<${EN[0].property}:[=:DUR/>`);
  });
});

/* ---------------------------- AVENANT 4 : les noms de colonnes tolèrent la
   casse, comme les valeurs le faisaient déjà (26 août 2026). */

describe("findPropertyIndex : un seul porteur pour deux appariements", () => {
  const MODE = 2;   // codeModeLivraison / deliveryModeCode

  it("rend le même indice quelle que soit la casse", () => {
    const exact = FR[MODE].property;
    expect(findPropertyIndex(FR, exact)).toBe(MODE);
    expect(findPropertyIndex(FR, exact.toLowerCase())).toBe(MODE);
    expect(findPropertyIndex(FR, exact.toUpperCase())).toBe(MODE);
    // La graphie du chef de projet, à un `L` près.
    expect(findPropertyIndex(FR, "codeModelivraison")).toBe(MODE);
  });

  it("rend -1 sur ce qui n'est pas une propriété du modèle", () => {
    expect(findPropertyIndex(FR, "codelivraidon")).toBe(-1);
    expect(findPropertyIndex(FR, "motDePasse")).toBe(-1);
    expect(findPropertyIndex(FR, "")).toBe(-1);
  });
});

describe("La casse des noms de colonnes : tolérée à la lecture, canonique en aval", () => {
  const exact = FR[2].property;
  const variantes = [exact, exact.toLowerCase(), exact.toUpperCase(), "codeModelivraison"];

  it("les quatre graphies sont acceptées et rendent la MÊME entrée canonique", () => {
    for (const nom of variantes) {
      const read = recognise(`<${nom}:[]:AR/>`, FR);
      expect(read.ok, nom).toBe(true);
      // Le champ garde ce que le lecteur a tapé ; l'aval repart de la graphie
      // exacte, si bien que la page enseigne l'orthographe sans corriger.
      expect(read.conditions[0].entry.property, nom).toBe(exact);
    }
  });

  it("AUCUNE LEÇON PERDUE : un nom réellement absent est toujours refusé", () => {
    // C'est la thèse de la section : l'appelant ne choisit pas ce qu'il
    // interroge. Elle tient mot pour mot.
    expect(recognise("<codelivraidon:[]:AR/>", FR).refusal.code).toBe("colonne");
    const inconnue = EXAMPLES.find((example) => example.key === "colonneInconnue");
    expect(recognise(exampleExpression(inconnue, FR), FR).refusal.code).toBe("colonne");
  });

  it("une demande en bas de casse sert exactement les mêmes lignes", () => {
    const canonique = filterRows(`<${FR[0].property}:[=:DUR/>`, FR, ROWS_FR);
    const basseCasse = filterRows(`<${FR[0].property.toLowerCase()}:[=:DUR/>`, FR, ROWS_FR);
    expect(basseCasse.ok).toBe(true);
    expect(basseCasse.rows).toHaveLength(canonique.rows.length);
  });

  it("GARDIEN DU SECOND SITE : un nom en bas de casse se traduit comme la graphie exacte", () => {
    // `translateExpression` portait la même comparaison stricte, à un autre
    // endroit. Corriger le seul reconnaisseur aurait fait ACCEPTER un nom en
    // bas de casse, puis le laisser sans traduction à la bascule de langue,
    // donc REFUSER une seconde plus tard ce qui venait de passer.
    const attendu = `<${EN[2].property}:[]:AR/>`;
    for (const nom of variantes) {
      expect(translateExpression(`<${nom}:[]:AR/>`, FR, EN), nom).toBe(attendu);
    }
  });
});

/* ------------------------- AVENANT 5 : le refus avait raison, et c'est le
   refus qui était le défaut (26 août 2026, troisième passe d'appareil). */

describe("Les espaces autour du nom et de l'opérateur sont absorbées", () => {
  // Sur un clavier d'iPhone, l'espace après ponctuation est posée par
  // L'APPAREIL, pas par le doigt. Sans ce point, la page reprochait au lecteur
  // un nom qui est, à l'œil, exactement celui de la liste : une faute
  // INVISIBLE, pire que celle de casse — là il pouvait au moins voir la
  // majuscule.
  const serree = `<${FR[0].property}:[=:DUR/>`;
  const positions = [
    `< ${FR[0].property}:[=:DUR/>`,
    `<${FR[0].property} :[=:DUR/>`,
    `<${FR[0].property}: [=:DUR/>`,
  ];

  it("les trois positions d'espace rendent LA MÊME condition que la forme serrée", () => {
    const attendu = recognise(serree, FR);
    expect(attendu.ok).toBe(true);
    for (const texte of positions) {
      const read = recognise(texte, FR);
      expect(read.ok, texte).toBe(true);
      // Comparaison d'objets, et non trois assertions qui se ressemblent :
      // c'est l'identité du résultat qui compte, pas la seule acceptation.
      expect(read.conditions, texte).toEqual(attendu.conditions);
    }
  });

  it("GARDIEN DU SECOND SITE : les trois positions se traduisent comme la forme serrée", () => {
    // Même porte que pour les quatre graphies de casse, et pour la même raison
    // — mais elle a dû être écrite DEUX FOIS, à deux avenants d'écart, parce
    // que la tolérance aux espaces a été posée dans `recognise` au lieu de
    // l'être dans `findPropertyIndex`. `< nomClient:[=:DUR/>` passait donc en
    // français, n'était pas traduit, et se faisait refuser sur `colonne` une
    // bascule plus tard : la page reprochait au lecteur un nom qu'elle venait
    // d'accepter, et que son propre clavier avait écrit.
    //
    // Ce que la porte juge n'est pas la seule réécriture, mais le RÉSULTAT en
    // langue d'arrivée : c'est le refus qui était le défaut, pas la chaîne.
    const attendu = filterRows(translateExpression(serree, FR, EN), EN, ROWS_EN);
    expect(attendu.ok).toBe(true);
    for (const texte of positions) {
      const traduit = translateExpression(texte, FR, EN);
      const read = filterRows(traduit, EN, ROWS_EN);
      expect(read.ok, texte).toBe(true);
      expect(read.rows.length, texte).toBe(attendu.rows.length);
    }
    // Et la réécriture NORMALISE le jeton, comme elle le fait pour la casse :
    // les deux espaces qui bordent le nom sont dans le jeton `<nom:` que
    // `translateExpression` reconstruit, celle qui suit les deux-points est
    // hors capture — elle appartient à l'opérateur, et elle survit.
    expect(translateExpression(positions[0], FR, EN)).toBe(`<${EN[0].property}:[=:DUR/>`);
    expect(translateExpression(positions[1], FR, EN)).toBe(`<${EN[0].property}:[=:DUR/>`);
    expect(translateExpression(positions[2], FR, EN)).toBe(`<${EN[0].property}: [=:DUR/>`);
  });

  it("elle n'accepte pas un nom faux : la frontière ne bouge pas", () => {
    const read = recognise("< codelivraidon :[]:AR/>", FR);
    expect(read.ok).toBe(false);
    expect(read.refusal.code).toBe("colonne");
    // Et le nom paraît NETTOYÉ au message, sans les espaces de l'appareil.
    expect(read.refusal.params.nom).toBe("codelivraidon");
  });

  it("L'ORDRE DES DEUX FAUTES : nom vide ET opérateur vide se nomme par le nom", () => {
    // Le seul membre qui porte les deux fautes à la fois. Sans cette porte,
    // intervertir les deux blocs du module laissait la suite verte et faisait
    // passer `<::LYON/>` de `colonneVide` à `forme`/`operateurFin` en silence.
    //
    // Le nom d'abord, parce que les deux fautes se lisent de gauche à droite et
    // que le message dit LE GESTE SUIVANT, pas la liste de tout ce qui manque :
    // le refus d'après nommera l'opérateur.
    const read = recognise("<::LYON/>", FR);
    expect(read.ok).toBe(false);
    expect(read.refusal.code).toBe("colonneVide");
  });

  it("un opérateur réduit à une espace tombe en `forme`/`operateurFin`, jamais en `operateur`", () => {
    // C'est l'ordre imposé : le `trim` de l'opérateur passe AVANT le test du
    // vide, sinon l'opérateur-espace échapperait au piège de la position et
    // recevrait un message qui ne nomme pas sa faute.
    const read = recognise(`<${FR[0].property}: :LYON/>`, FR);
    expect(read.ok).toBe(false);
    expect(read.refusal.code).toBe("forme");
    expect(read.refusal.params.faute).toBe("operateurFin");
  });
});

describe("Le refus `forme` nomme la faute : catalogue clos de cinq, ordonné", () => {
  const fauteDe = (texte) => {
    const read = recognise(texte, FR);
    expect(read.ok, texte).toBe(false);
    expect(read.refusal.code, texte).toBe("forme");
    return read.refusal.params.faute;
  };

  it("nomme chacune des cinq fautes", () => {
    expect(fauteDe("codemodelivraison:[]:AR/>")).toBe("ouvrant");
    expect(fauteDe(`<${FR[0].property}:==:LYON`)).toBe("fermant");
    expect(fauteDe(`<${FR[0].property}:LYON/>`)).toBe("deuxPoints");
    expect(fauteDe(`<${FR[0].property}::LYON/>`)).toBe("operateurFin");
    // `generique` n'est atteint que par un retour à la ligne DANS le membre :
    // le `.` de SEQUENCE ne traverse pas la ligne. C'est le cinquième cas, et
    // un catalogue qui laisse un trou n'est pas un catalogue.
    expect(fauteDe(`<${FR[0].property}:==:LY\nON/>`)).toBe("generique");
  });

  it("L'ORDRE DIT LE GESTE SUIVANT, pas la liste de tout ce qui manque", () => {
    // Sans chevron ET sans fermeture : c'est la PREMIÈRE faute qui est nommée.
    expect(fauteDe("nomClient:==:LYON")).toBe("ouvrant");
    // Avec chevron, sans fermeture et sans deux-points : `fermant` d'abord.
    expect(fauteDe("<nomClient")).toBe("fermant");
  });

  it("`shapeFault` est pure et ne rend que des codes du catalogue", () => {
    const catalogue = ["ouvrant", "fermant", "deuxPoints", "generique"];
    for (const texte of ["a", "<a", "<a/>", "<a:b/>", "<a:b:c\nd/>", "", "   "]) {
      expect(catalogue, texte).toContain(shapeFault(texte));
    }
  });
});

describe("Un membre pas encore écrit est inachevé, pas raté", () => {
  // C'est l'état que les boutons `&&` et `||` de CET incrément produisent
  // eux-mêmes : la page ouvre la liaison, le lecteur envoie avant d'avoir
  // écrit la suite, et lui reprocher sa « forme » reviendrait à traiter comme
  // ratée une phrase qu'elle vient elle-même d'ouvrir.
  const inacheve = (texte) => {
    const read = recognise(texte, FR);
    expect(read.ok, texte).toBe(false);
    return read.refusal.code;
  };

  it("les trois états de liaison en attente rendent `inacheve`", () => {
    expect(inacheve(`<${FR[0].property}:[=:DUR/> &&`)).toBe("inacheve");
    expect(inacheve(`<${FR[0].property}:[=:DUR/> && `)).toBe("inacheve");
    // Neutre par construction : vaut à gauche comme à droite.
    expect(inacheve(`&& <${FR[0].property}:[=:DUR/>`)).toBe("inacheve");
  });

  it("les deux membres écrits, la demande passe à deux conditions", () => {
    const read = recognise(
      `<${FR[0].property}:[=:DUR/> && <${FR[8].property}:==:LYON/>`,
      FR,
    );
    expect(read.ok).toBe(true);
    expect(read.conditions).toHaveLength(2);
  });
});

describe("Un nom de colonne vide a son propre refus", () => {
  it("`<:[]:AR/>` et `< :[]:AR/>` rendent `colonneVide`", () => {
    // Le message montrait deux guillemets autour de rien. C'est le voisin
    // immédiat du geste qui a fondé l'avenant : un caractère de moins effacé,
    // et le lecteur tombait ici.
    expect(recognise("<:[]:AR/>", FR).refusal.code).toBe("colonneVide");
    expect(recognise("< :[]:AR/>", FR).refusal.code).toBe("colonneVide");
  });

  it("LA TOLÉRANCE NE DÉPLACE PAS LA FRONTIÈRE DU NOM FAUX", () => {
    expect(recognise("<codelivraidon:[]:AR/>", FR).refusal.code).toBe("colonne");
    expect(recognise("<motDePasse:==:toto/>", FR).refusal.code).toBe("colonne");
  });
});

describe("Le catalogue de refus est total : chaque gabarit trouve ses paramètres", () => {
  // Le test 7 de l'avenant 5, et il vaut pour les ONZE codes : un `{…}` sans
  // paramètre s'afficherait tel quel au lecteur, accolades comprises.
  //
  // LA TABLE NE TRANSCRIT PLUS, ELLE DÉCLENCHE. Elle portait des paramètres
  // recopiés à la main depuis les appels à `refuse()` — et une transcription ne
  // mord que dans un sens : elle attrapait un gabarit vide ou un `{…}` renommé
  // au dictionnaire, jamais un code neuf émis par `refuse()` sans entrée au
  // dictionnaire (la page jetterait à la peinture du refus), ni une dérive où
  // l'on corrige la table sans corriger `refuse()`.
  //
  // Chaque code est donc atteint par une EXPRESSION RÉELLE, et les paramètres
  // viennent du module. La porte mord maintenant dans les deux sens : un code
  // qui change de paramètres, ou qui disparaît de `recognise`, la fait rougir.
  const ENTREES = {
    forme: "codemodelivraison:[]:AR/>",
    colonne: "<codelivraidon:[]:AR/>",
    operateur: "<nomClient:~~:LYON/>",
    interdit: "<nomClient:!=:LYON/>",
    type: "<nomClient:><:LYON/>",
    valeurVide: "<nomClient:==:/>",
    tropCourt: "<nomClient:[]:A/>",
    bornes: "<montantCommande:><:5/>",
    liaison: "<nomClient:[=:DUR/> && || <nomClient:[=:DUR/>",
    inacheve: "<nomClient:[=:DUR/> &&",
    colonneVide: "<:[]:AR/>",
  };

  it("les onze entrées déclenchent bien les onze codes, un pour un", () => {
    // La porte de la porte : si une entrée cessait de produire le code qu'elle
    // vise, la totalité ci-dessous resterait verte en ne mesurant plus rien.
    const obtenus = Object.entries(ENTREES).map(([code, texte]) => {
      const read = recognise(texte, FR);
      expect(read.ok, texte).toBe(false);
      return [code, read.refusal.code];
    });
    for (const [vise, obtenu] of obtenus) {
      expect(obtenu, `entrée de \`${vise}\``).toBe(vise);
    }
    expect(new Set(obtenus.map(([, obtenu]) => obtenu)).size).toBe(11);
  });

  it.each(["fr", "en"])("les onze refus sont servis sans accolade orpheline (%s)", (lang) => {
    const refus = dict[lang].section4.refus;
    expect(Object.keys(refus)).toHaveLength(11);
    for (const [code, texte] of Object.entries(ENTREES)) {
      // Les paramètres sont ceux du MODULE, jamais une recopie : c'est ce qui
      // rend la mesure rejouable au lieu de la rendre seulement vraie ce jour.
      const { params } = recognise(texte, FR).refusal;
      for (const cle of ["quoi", "pourquoi"]) {
        const gabarit = refus[code][cle];
        expect(typeof gabarit, `${lang}.${code}.${cle}`).toBe("string");
        expect(gabarit.trim(), `${lang}.${code}.${cle}`).not.toBe("");
        // `fill` du module, et non une copie : le remplisseur mesuré est celui
        // qui sert le lecteur.
        expect(fill(gabarit, params), `${lang}.${code}.${cle}`).not.toMatch(/\{\w+\}/);
      }
    }
  });

  it("aucun code émis par `refuse()` n'est absent du dictionnaire", () => {
    // LA LISTE EST LUE DANS LE MODULE, PAS ÉCRITE ICI.
    //
    // Première rédaction : cette porte parcourait `ENTREES`, une liste écrite à
    // la main — elle ne pouvait donc vérifier que les codes que quelqu'un avait
    // déjà pensé à lister, et son NOM promettait le contraire. Mesuré par la
    // revue : une douzième branche `refuse("valeurTropLongue", …)` insérée dans
    // `recognise`, ATTEIGNABLE et absente des deux dictionnaires, laissait la
    // suite à 355/355 — pendant que la page, elle, jetait à la peinture du
    // refus (`texts().refus[code]` vaut `undefined`) et que la zone de réponse
    // mourait.
    //
    // La technique est celle de `tests/i18n-html.test.js`, qui lit `index.html`
    // plutôt que de décrire son contenu : on lit la source de vérité.
    const source = readFileSync(new URL("../js/minilangage.js", import.meta.url), "utf8");
    const emis = [...new Set(
      [...source.matchAll(/\brefuse\(\s*"([A-Za-z]+)"/g)].map(([, code]) => code),
    )].sort();

    // Garde de cécité : une extraction vide rendrait la porte verte en ne
    // mesurant rien. Même geste que le plancher de `i18n-html.test.js`.
    expect(emis.length, "porte AVEUGLE : aucun appel à refuse() relevé").toBeGreaterThanOrEqual(11);

    for (const code of emis) {
      for (const lang of ["fr", "en"]) {
        expect(dict[lang].section4.refus, `${lang}.${code}`).toHaveProperty(code);
      }
    }

    // Et le catalogue est CLOS des deux côtés : ce que le module émet est
    // exactement ce que les dictionnaires portent, sans code mort de part ni
    // d'autre.
    expect(emis).toEqual(Object.keys(dict.fr.section4.refus).sort());
    expect(emis).toEqual(Object.keys(ENTREES).sort());
  });

  it.each(["fr", "en"])("les cinq fautes de forme sont toutes servies (%s)", (lang) => {
    const fautes = dict[lang].section4.refus.forme.fautes;
    expect(Object.keys(fautes).sort()).toEqual(
      ["deuxPoints", "fermant", "generique", "operateurFin", "ouvrant"],
    );
    for (const [nom, phrase] of Object.entries(fautes)) {
      expect(phrase.trim(), `${lang}.${nom}`).not.toBe("");
      expect(phrase, `${lang}.${nom}`).not.toMatch(/\{\w+\}/);
    }
  });
});

describe("La valeur : bords rognés, intérieur intact", () => {
  it("garde ses espaces INTÉRIEURES et perd celles des bords", () => {
    // La borne posée à l'incrément 6, jamais épinglée jusqu'ici. L'avenant 5 la
    // prescrivait d'abord à l'envers (« valeur : jamais de trim ») ; mesure
    // faite, le dépôt faisait déjà le bon geste, et la prescription a été
    // corrigée. Ce test existe pour que la borne cesse d'être tacite.
    //
    // Elle est le pendant exact du point 1 : sur un téléphone, l'espace posée
    // par l'appareil après les deux-points ne doit pas ramener zéro ligne pour
    // une valeur qui a l'air juste. Mais une valeur reste une donnée, et ses
    // espaces intérieures lui appartiennent.
    const read = recognise(`<${FR[8].property}:[]:  LY  ON  />`, FR);
    expect(read.ok).toBe(true);
    expect(read.conditions[0].value).toBe("LY  ON");
  });

  it("l'injection garde les siennes, et c'est ce que la page démontre", () => {
    const injection = EXAMPLES.find((example) => example.key === "injection");
    const read = recognise(exampleExpression(injection, FR), FR);
    expect(read.ok).toBe(true);
    expect(read.conditions[0].value).toBe("D' OR '1'='1");
  });
});

/* ------------------------------- AVENANT 6 : les boutons de structure suivent
   le curseur (27 août 2026, quatrième passe d'appareil). */

describe("caretAllowsStructure : la garde sans laquelle le correctif serait pire que le bug", () => {
  const champ = "<nomClient:[=:DUR/> <codemodelivraison:[]:AR/>";

  it("REFUSE les trois positions qui couperaient l'expression en deux", () => {
    // Mesuré : sans cette garde, le bouton `&&` produisait
    // `<nomClient:[=:DUR/> <codemodeliv/> && raison:[]:AR/>`.
    expect(caretAllowsStructure(champ, 32)).toBe(false);   // au milieu du nom
    expect(caretAllowsStructure(champ, 21)).toBe(false);   // après le chevron
    expect(caretAllowsStructure(champ, 40)).toBe(false);   // dans la valeur
  });

  it("accepte la fin de champ et les frontières de séquence", () => {
    expect(caretAllowsStructure(champ, champ.length)).toBe(true);   // fin
    expect(caretAllowsStructure(champ, 20)).toBe(true);             // entre les membres
    expect(caretAllowsStructure(champ, 0)).toBe(true);              // au début
    // Les espaces de fin ne comptent pas comme du texte à couper.
    expect(caretAllowsStructure("<a:b:c/>   ", 8)).toBe(true);
  });

  it("tolère un curseur hors bornes sans se plaindre", () => {
    expect(caretAllowsStructure("<a:b:c/>", 999)).toBe(true);
    expect(caretAllowsStructure("<a:b:c/>", -5)).toBe(true);
  });

  it("LE POINT D'APPLICATION FAIT FOI : la règle est rejouée au geste, pas héritée d'un repeint", () => {
    // `disabled` est un ÉTAT D'AFFICHAGE : il ne vaut que tant que le dernier
    // `render()` a tourné avec le curseur courant. Tant que la garde ne vivait
    // que là, elle était écrite à un endroit et appliquée à un autre — la
    // quatrième fois de cet incrément, et la seule qui porte sur une règle et
    // non sur une valeur.
    //
    // Le câblage vit dans `mountMiniLanguage` ([W13]) ; ce qui se garde ici est
    // la RÈGLE que `completeWith` rejoue désormais en tête, dans sa graphie
    // exacte : le geste ne s'exécute que si la position le permet.
    const champ = "<nomClient:[=:DUR/> && <villeClient:[]:LY/>";
    const completeWith = (texte, curseur, rewrite) =>
      caretAllowsStructure(texte, curseur)
        ? rewrite(texte.slice(0, curseur)) + texte.slice(curseur)
        : texte;

    // Curseur 5, au milieu du premier nom : la garde refuse, et le champ ne
    // bouge pas. Sans la garde rejouée, le résultat mesuré était
    // `<nomC/> && lient:[=:DUR/> && …` — l'expression coupée en deux.
    expect(caretAllowsStructure(champ, 5)).toBe(false);
    expect(completeWith(champ, 5, (gauche) => appendLink(gauche, "&&"))).toBe(champ);

    // Et le cas courant ne bouge pas : curseur en fin, le geste s'exécute.
    const fin = champ.length;
    expect(completeWith(champ, fin, (gauche) => appendLink(gauche, "&&")))
      .toBe(appendLink(champ, "&&"));
  });

  it("LA LIMITE DE LA GARDE : un `/>` dans une valeur la trompe, et la coupure passe", () => {
    // La garde lit la PONCTUATION, pas la structure. `SEQUENCE` autorise `/>`
    // à l'intérieur d'une valeur, et le bouton `/>` permet de fabriquer ce cas
    // au doigt : la garde croit alors voir une fin de séquence là où elle est
    // au milieu d'une valeur.
    //
    // La porte tient le trou OUVERT et mesuré, elle ne le referme pas — la
    // garde exacte s'appuierait sur `recognise` au lieu de la ponctuation, et
    // c'est un arbitrage du chef de projet. Ce qu'elle interdit, c'est que le
    // trou change de taille sans que personne le voie.
    const piege = "<villeClient:[]:A/>B/>";
    const lu = recognise(piege, FR);
    expect(lu.ok).toBe(true);                          // une condition VALIDE...
    expect(lu.conditions[0].value).toBe("A/>B");       // ...de valeur `A/>B`

    const curseur = piege.indexOf("/>") + 2;           // 19, juste après le faux `/>`
    expect(caretAllowsStructure(piege, curseur)).toBe(true);   // la garde se laisse tromper

    const coupee = appendLink(piege.slice(0, curseur), "&&") + piege.slice(curseur);
    expect(coupee).toBe("<villeClient:[]:A/> && B/>");
    // Et voilà l'expression du lecteur coupée en deux — ce que cette garde
    // existe pour empêcher. Le reste n'est plus lisible.
    expect(recognise(coupee, FR).refusal.code).toBe("tropCourt");
  });
});

describe("L'insertion au curseur : le cas courant ne bouge pas", () => {
  // La règle est « travailler sur le texte à gauche ». Quand le curseur est en
  // fin de champ — l'usage normal — cela redonne EXACTEMENT le comportement
  // d'avant l'avenant 6, et ce test est là pour l'exiger.
  const poser = (champ, curseur, lien) =>
    appendLink(champ.slice(0, curseur), lien) + champ.slice(curseur);

  it("curseur en fin : identique à l'ajout en fin de champ", () => {
    for (const champ of ["", "<a:b:c", "<a:b:c/>", "<a:b:c/> && <d:e:f/>"]) {
      expect(poser(champ, champ.length, "&&"), champ).toBe(appendLink(champ, "&&"));
    }
  });

  it("LE CAS DU CHEF DE PROJET : la liaison va là où le curseur est", () => {
    const champ = "<nomClient:[=:DUR/> <codemodelivraison:[]:AR/> && <montantCommande:><:1000;4000/>";
    expect(poser(champ, 20, "&&")).toBe(
      "<nomClient:[=:DUR/> && <codemodelivraison:[]:AR/> && <montantCommande:><:1000;4000/>",
    );
  });

  it("L'INERTIE SUIT LE CURSEUR : le bouton vit là où le geste est bon", () => {
    // Mesuré : un champ finissant par `&&` éteignait le bouton `&&` calculé sur
    // le champ entier, alors qu'au curseur 9 l'insertion est légitime.
    const champ = "<a:b:c/> <d:e:f/> &&";
    expect(appendLink(champ, "&&")).toBe(champ);                    // inerte sur le tout
    const gauche = champ.slice(0, 9);
    expect(caretAllowsStructure(champ, 9)).toBe(true);
    expect(appendLink(gauche, "&&")).not.toBe(gauche);              // actif au curseur
    expect(poser(champ, 9, "&&")).toBe("<a:b:c/> && <d:e:f/> &&");
  });
});

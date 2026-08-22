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
import { describe, expect, it } from "vitest";
import { dict } from "../js/i18n.js";
import { parseImplicitDecimal } from "../js/s36.js";
import {
  buildModel,
  CDEMST,
  CLIMST,
  CMLIV,
  className,
  DEFAULT_SELECTION,
  EXAMPLES,
  exampleExpression,
  filterRows,
  joinFiles,
  MODLIV_CODES,
  OPERATORS,
  PHYSICAL_MODEL,
  recognise,
  renderClass,
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

  it("les neuf refus ont tous leur couple de valeurs, dans les deux langues", () => {
    const codes = [
      "forme", "colonne", "operateur", "interdit", "type",
      "valeurVide", "tropCourt", "bornes", "liaison",
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
    // PETIT et LAMBERT : « ou T » est une invitation à une seule lettre, et
    // c'est elle qui prouve que le minimum de deux caractères ne porte QUE sur
    // « contient ». L'étendre à « finit par » ferait refuser une invitation
    // écrite dans une valeur gelée du prompt.
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

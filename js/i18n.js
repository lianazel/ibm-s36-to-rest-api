/**
 * i18n.js — dictionnaire bilingue FR/EN et bascule de langue du site.
 *
 * Source unique de tous les textes visibles : le HTML ne porte aucune chaîne
 * en dur, chaque élément marqué `data-i18n` reçoit son texte d'ici — et les
 * attributs localisés (aria-label, content...) passent par `data-i18n-attr`.
 * La parité des clés FR/EN est une porte de test (tests/i18n.test.js).
 *
 * Le module s'amorce lui-même dans le navigateur ; l'amorçage est gardé pour
 * que l'import sous Vitest (environnement node, sans DOM) reste inoffensif.
 *
 * C'est aussi lui qui monte le simulateur du mini-langage : la page ne porte
 * que deux balises `<script>` et n'en gagnera pas une troisième. Le sens de
 * l'import va d'ici vers `minilangage.js`, jamais l'inverse : ce module-là
 * ignore la langue et ne connaît pas ce dictionnaire, il le reçoit.
 */
import { mountMiniLanguage } from "./minilangage.js";

export const dict = {
  fr: {
    site: {
      title: "Des fichiers S/36 à l'API REST",
    },
    hero: {
      tagline:
        "Quarante ans séparent un fichier plat S/36 d'un flux JSON. Ce site raconte l'architecture .Net qui les fait travailler ensemble : démontrée, testée, expliquée.",
    },
    nav: {
      aria: "Sections",
      decor: "Le décor",
      probleme: "Le problème",
      solution: "La solution",
      minilangage: "Le mini-langage",
      methode: "La méthode",
      annexe: "Annexe",
    },
    menu: {
      // Nom accessible du panneau : un role="dialog" sans nom n'en a pas.
      title: "Menu",
      open: "Ouvrir le menu",
      close: "Fermer le menu",
    },
    meta: {
      description:
        "Un prototype d'API REST .Net qui expose en JSON des fichiers hérités IBM S/36 tournant sur IBM i : démontré, testé, expliqué.",
    },
    section1: {
      title: "Le décor",
      intro:
        "IBM i fait tourner encore aujourd'hui des applications nées sur System/36 : sur un IBM i 7.5 actuel, la commande STRS36 démarre toujours une session S/36. Ce patrimoine est vivant : il calcule, il facture, il livre. Il est simplement muet pour le web.",
      lignees: {
        title: "Deux lignées, deux philosophies",
        p1: "En 1978, IBM annonce le System/38 (annoncé le 24 octobre 1978, livré à partir de 1980) : une machine en avance sur son temps, où tout est un objet géré par le système. Le programme compilé, la description de table, la file de travaux : chacun a un type, une identité, des règles garanties par la machine. Attention au mot « objet » : rien à voir avec la programmation orientée objet moderne. Pas d'héritage, pas de polymorphisme. Un objet système, c'est une pièce d'ingénierie typée, pas une classe.",
        p2: "Le System/36, annoncé le 16 mai 1983, est une tout autre machine : simple, robuste, taillée pour les petites entreprises. Ce n'est pas l'ancêtre de l'AS/400, c'est une lignée parallèle. Et les deux lignées étaient incompatibles : une application S/36 ne tournait pas sur un S/38. Les clients S/36 n'avaient donc aucun chemin de migration naturel.",
      },
      pont: {
        title: "1988 : le pont d'IBM",
        p1: "Le 21 juin 1988, IBM annonce l'AS/400. Par l'architecture, c'est l'héritier du System/38. Mais la machine embarque une idée décisive : un environnement System/36 dans OS/400, qui accueille les applications S/36 en compatibilité source. On recompile, on ne réécrit pas.",
        p2: "Cette compatibilité n'était pas une gentillesse, c'était une stratégie. Réécrire aurait coûté des fortunes aux clients, dans tous les pays où IBM opérait ; la machine neuve savait faire tourner le patrimoine, et elle s'est vendue aussi pour cela. La leçon d'ingénierie tient en une phrase : on ne réécrit pas ce qui marche, on le rend joignable.",
      },
      noms: {
        title: "Les noms changent, la machine continue",
        p1: "OS/400 en 1988, i5/OS en 2004, IBM i en 2008 sur les serveurs Power : trois noms pour une même lignée. Aujourd'hui, IBM i en est aux versions 7.5 et 7.6 (annoncée en avril 2025), et la commande STRS36 y démarre toujours une session System/36. Le passager embarqué en 1988 voyage encore.",
        p2: "Ce patrimoine a même vécu hors d'IBM. Dès le début des années 1990, des éditeurs comme Unibol proposaient un environnement compatible System/36 sous Unix, où les programmes RPG et COBOL continuaient de tourner. Quand tout un marché s'équipe pour faire survivre des applications, c'est qu'elles valent quelque chose. Ces offres se sont éteintes à mesure que le parc S/36 diminuait ; le pont d'IBM, lui, tient toujours.",
      },
      preuve: {
        title: "La preuve vivante",
        p1: "Il ne serait pas étonnant que des applications conçues avant l'arrivée de l'AS/400, en 1988, tournent encore aujourd'hui en donnant pleine satisfaction. J'en ai croisé plus d'une tout au long de ma carrière : nées sur S/36, toujours en production, rendant leur service sans accroc, et personne ne s'en soucie : le résultat tombe. Et il faut le dire honnêtement : à terme, ces applications en mode S/36 laisseront la place à des versions réécrites, pas forcément sur IBM i.",
        p2: "J'ai aussi vu l'autre versant. Les développeurs System/38, déjà dans le modèle objet, ont basculé immédiatement vers l'AS/400, et le vide de compétence a fait flamber leur valeur. À l'inverse, les ingénieurs spécialistes du System/36 ont dû faire un travail de réappropriation de cette nouvelle architecture. Il leur a donné une double compétence, rare elle aussi à l'époque : System/36 et AS/400.",
        p3: "Voilà le décor : un patrimoine S/36 vivant, qui calcule, facture et livre chaque mois sur des machines actuelles. Vivant, mais muet pour le web. La suite raconte pourquoi ces fichiers ne savent rien dire d'eux-mêmes, et comment on les fait parler.",
      },
    },
    section2: {
      title: "Le problème",
      intro: "Le défi consiste à exposer en JSON un format de table hérité de l'ère de l'IBM System/36. Ces tables, pour celles qui sont encore en activité, font leur travail : elles enregistrent et restituent sans faillir. Mais demandez-leur ce qu'elles contiennent, elles ne savent pas répondre. Le fichier donne des positions et des noms d'au plus six caractères, jamais ce qu'ils veulent dire. C'est l'application qui connaît la valeur métier de telle ou telle colonne.",
      renvoi: "Pour voir un fichier S/36 de près, ses positions, ses noms abrégés, ses décimales cachées :",
      renvoiLien: "l'annexe, en fin de page.",
    },
    section3: {
      title: "La solution",
      sousTitre: "Avec un modèle de données C#",
      intro: "Mon métier, c'est l'IBM i. J'ai découvert C# et .Net au travers d'opportunités professionnelles. Ce qui suit n'est pas une recette. C'est un cheminement, en quatre temps, tel qu'il s'est passé.",
      modele: {
        title: "Un modèle de données écrit à la main, pour tester une idée",
        p1: "L'idée tient en une phrase. Si le fichier ne dit pas ce que ses colonnes veulent dire, alors quelqu'un doit le dire à sa place, une fois, à un seul endroit. Ce quelqu'un est une classe écrite à la main. Chaque propriété y porte le nom que les gens emploient, et une étiquette posée au-dessus d'elle porte le nom physique de la colonne, celui d'au plus six caractères. Le programme relit ses propres étiquettes pendant qu'il tourne, ce qu'on appelle la réflexion, et il en tire un dictionnaire.",
        p2: "Ce dictionnaire travaille dans les deux sens. Il nomme ce qui sort, puisque le flux JSON renvoyé porte les noms métier. Il traduit ce qui entre, puisqu'un filtre écrit avec un nom métier devient un nom de colonne dans la requête. Une même donnée peut s'appeler autrement d'un fichier à l'autre et retomber pourtant sur un seul nom. C'est là que le fichier commence à parler.",
        code1: {
          legende: "Extrait recréé : l'attribut maison et les deux classes du cas fictif.",
          source: `// L'attribut maison, déclaré une fois pour toutes
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
}`,
        },
        code2: {
          legende: "Extrait recréé : le dictionnaire « nom métier vers nom physique », rempli pendant que le programme tourne.",
          source: `// Le dictionnaire « nom métier -> nom physique », construit pendant que le programme tourne
public Dictionary<string, string> ChargerDictionnaire(Type modele)
{
    var dictionnaire = new Dictionary<string, string>();

    foreach (var propriete in modele.GetProperties())
    {
        var attribut = propriete.GetCustomAttribute<ColonneS36Attribute>();
        dictionnaire[propriete.Name.ToUpper()] = attribut?.Nom;
    }

    return dictionnaire;
}`,
        },
      },
      mur: {
        title: "L'idée fonctionne. La réalité me rattrape",
        p1: "L'idée fonctionne, et c'est justement ce qui la condamne. L'application dont je parle compte des centaines de tables. Chaque question posée aux données réclame sa méthode dans le service web, sa requête écrite d'avance avec ses colonnes figées, et sa classe écrite à la main pour correspondre à cette requête. Trois choses par question. Le coût n'est pas de les écrire une fois : il est de les maintenir toutes, ensuite. Une colonne ajoutée quelque part, et il faut retrouver les trois. Personne n'a envie de passer ses journées à écrire ces classes, et chaque saisie est une occasion de se tromper.",
      },
      renversement: {
        title: "Je renverse le problème : la machine fera le travail",
        sousTitre: "Le modèle dynamique arrive",
        p1: "Les modèles dynamiques, en revanche, je ne les connaissais pas avant ce projet. Alors j'ai renversé le problème. Si le travail consiste à décrire des colonnes une par une, ce n'est pas un travail d'humain. C'est la requête qui porte les noms métier, en renommant ses colonnes au passage, et c'est la machine qui fabrique la classe correspondante.",
        p2: "Le mécanisme tient en quelques gestes. La requête n'est pas connue du code avant l'appel. Le programme regarde les colonnes qu'elle renvoie, relève leur nom et leur type, et construit une classe pendant qu'il tourne, une seule fois. Puis il parcourt les lignes et verse chaque valeur dans une instance de cette classe. Le modèle est un moule : fabriqué une fois, chaque ligne y est coulée. Le moule est jeté quand l'appel se termine, et rien n'en est conservé. Une autre requête au prochain appel donne un autre moule, sans qu'une ligne de code ait changé.",
        p3: "À ce stade, je cherchais une seule réponse : est-ce que l'idée tient. Ce qu'un appelant a le droit de demander est une question de produit, pas de prototype, et elle vient juste après.",
        fabrique: "L'extrait ci-dessus est recréé pour la lecture. Le mécanisme complet, lui, est public : une solution .Net que j'ai publiée, où la classe est fabriquée par réflexion, propriété par propriété.",
        fabriqueLien: "La fabrique du modèle en C#, sur GitHub",
        fabriqueUrl: "https://github.com/lianazel/API.Response.Dynamic.Model/blob/master/API.Response.Dynamic.Model.Framework/Services/ApiDynamicModelOnDemand.cs",
        code3: {
          legende: "Extrait recréé : les lignes relevées, la classe fabriquée une fois, chaque ligne versée ensuite. La fabrication elle-même est appelée, pas montrée.",
          source: `// La requête vient d'être exécutée ; elle était inconnue du code jusqu'à l'appel.
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
}`,
        },
      },
      boite: {
        resume: "Pour les curieux : la boîte à outils, la chaîne de fabrication classe par classe",
        intro: "Dans l'ordre où le programme les emploie : on ne fabrique pas une instance sans classe, ni une classe sans module, ni un module sans assemblage.",
        colonne1: "Ordre",
        colonne2: "Classe",
        colonne3: "Ce qu'elle fait",
        ligne1: "donne un nom à l'assemblage qu'on va fabriquer",
        ligne2: "crée cet assemblage, en mémoire, pendant que le programme tourne",
        ligne3: "crée le module qui contiendra la classe",
        ligne4: "déclare la classe elle-même",
        ligne5: "déclare la zone qui portera la valeur",
        ligne6: "déclare la propriété visible depuis l'extérieur, puis lui rattache ses deux accesseurs une fois qu'ils sont écrits",
        ligne7: "déclare les deux accesseurs, celui qui lit la valeur et celui qui l'écrit",
        ligne8: "écrit le corps de ces accesseurs, instruction par instruction : trois pour lire, quatre pour écrire",
        ligne9: "sa méthode CreateInstance produit une instance de la classe fabriquée, une par ligne renvoyée",
        hors: "Deux classes ordinaires encadrent cette chaîne sans en faire partie.",
        hors1: "porte ce qui entre : le nom de chaque colonne et son type.",
        hors2: "porte ce qui sort : les instances, et c'est elle qui part en flux JSON.",
      },
      etape: {
        title: "Le noyau est opérationnel. Il restait une étape",
        p1: "Le noyau qui construit le modèle dynamique est opérationnel, et je ne suis pas allé plus loin. Il restait une étape. Une requête mise au point pour l'API mériterait d'être enregistrée plutôt que ressaisie : l'appelant la désignerait alors par son nom, et non par son texte. C'est cette étape qui en aurait fait un produit. Pas parfait, mais intéressant. Restreindre ce qu'une requête a le droit de faire, et enregistrer aussi le modèle une fois bâti plutôt que le refabriquer à chaque fois (sérialiser le type CLR lui-même), appartiennent au même chantier, celui d'après.",
      },
      limites: {
        title: "Les limites du modèle dynamique, connues et non cachées",
        cause: "Le modèle dynamique ne connaît la table que par ce qu'elle lui montre. Il lit la première ligne du résultat et en déduit le nom et le type de chaque colonne : il ne demande jamais sa description à la base. C'est ce choix, et non la source, qui fixe ses limites. Elles sont les mêmes quel que soit le SGBD, IBM i, SQL Server, PostgreSQL ou un autre.",
        contraintes: "Deux contraintes en découlent, constatées en rejouant le mécanisme sur des cas construits. La table visée doit contenir au moins un enregistrement : sans première ligne, le modèle se construit sans aucune colonne, et rien ne le signale. Et cette première ligne ne doit porter aucune valeur NULL : une valeur absente n'a pas de type, la colonne ne peut pas être décrite. Un piège s'y ajoute, plus discret, constaté de la même façon : sur une ligne suivante, un NULL dans une colonne numérique devient zéro sans un mot. Un délai inconnu se lit alors comme un délai de zéro jour, et rien ne crie.",
        amont: "Un travail d'amont s'ajoute, et il naît de la requête elle-même. Interroger la base sur une table suppose de savoir laquelle : sur un SELECT qui n'en vise qu'une, elle se lit dans la requête ; dès que la requête porte des jointures, les tables sont plusieurs, et il faut les extraire avant de pouvoir demander quoi que ce soit. Ce travail se confie à une classe dédiée, qui lit la requête et rend la liste des tables à décrire.",
        parade: "La parade est connue, et elle vaut partout : demander la description à la base plutôt qu'à la donnée. Chaque base sait décrire ses tables, et rend le type et la nullabilité de chaque colonne, table vide ou pleine :",
        // Les noms de commande vivent en dur dans le HTML : ils ne se traduisent pas,
        // et leur nature diffère d'une base à l'autre — c'est ce que dit chaque glose.
        voies: {
          ibmi: "sur IBM i, commande système, avec sortie dans un fichier pour être exploitable par un programme",
          postgres: "sous PostgreSQL, commande du client psql",
          sqlserver: "sous SQL Server, procédure appelable depuis le code",
          standard: "la vue standard, que la plupart des bases exposent, interrogeable en SQL",
        },
        reste: "Puis donner aux propriétés le droit d'être absentes, pour qu'un NULL reste un NULL et ne devienne jamais un zéro. Le prototype ne l'a pas fait. C'est une limite connue, pas une limite cachée.",
      },
      dessin1: {
        legende: "Écrit à la main : tout est figé d'avance, et tout est à maintenir.",
        case1: {
          titre: "un fichier plat",
          sous: "hérité d'une architecture IBM S/36",
        },
        case2: {
          titre: "une requête figée",
          sous: "écrite dans le code, colonnes fixes",
        },
        case3: {
          titre: "une classe C#",
          sous: "écrite à la main. Correspond aux colonnes renvoyées par l'exécution de la requête SQL",
        },
        case4: {
          titre: "un dictionnaire de noms",
          sous: "nom métier vers nom physique, construit par le mécanisme de la réflexion C#",
        },
        case5: {
          titre: "JSON",
          sous: "aux noms métier",
        },
        methode: "une méthode du contrôleur par question posée",
        note1: "l'appelant ne choisit que son filtre ; ni la requête, ni les colonnes, ni leur nom ; une autre question veut une autre requête, donc une autre méthode et une autre classe",
        note2: "elle porte les noms de colonnes d'au plus six caractères ; hors de l'application ils ne veulent rien dire ; le programme relit ses propres attributs pendant qu'il tourne et en tire un dictionnaire",
        conclusion1: "Des centaines de tables. Autant de méthodes, de requêtes et de classes.",
        conclusion2: "Le coût n'est pas de les écrire une fois. Il est de les maintenir toutes, ensuite : solution intenable.",
      },
      dessin2: {
        legende: "Ce que la machine fait à la place.",
        etape1: {
          titre: "une requête SELECT",
          sous: "avec ou sans jointures, inconnue du code jusqu'à l'appel",
        },
        etape2: {
          titre: "le modèle est construit à la volée",
          sous: "d'après le nom et le type de chaque colonne renvoyée, une seule fois",
        },
        cadre1: "pour chaque ligne renvoyée",
        cadre2: "pour chaque colonne de la ligne",
        etape3: {
          titre: "lire la valeur de la colonne",
        },
        etape4: {
          titre: "la verser dans le modèle",
          sous: "une instance par ligne",
        },
        etape5: {
          titre: "ajouter l'instance à la liste",
          sous: "une liste d'objets",
        },
        etape6: {
          titre: "convertir la liste en flux JSON",
          sous: "avec la version et le nombre d'éléments",
        },
        conclusion1: "Une requête différente à chaque appel. Le même code, aucune classe à écrire.",
        conclusion2: "Le modèle est un moule : fabriqué une fois, chaque ligne y est coulée.",
      },
    },
    section4: {
      title: "Le mini-langage",
      ouverture: {
        titre: "Une idée, pas une pièce du système",
        p1: "Ce chapitre n'est pas comme les autres. Jusqu'ici, le site raconte du réel : des fichiers S/36 qui tournent encore en production, et un prototype qui a démontré que l'API fonctionne, jamais parti en production. Ce qui suit est né en marge de ce prototype, comme un chantier de recherche. Il a tourné dans mon atelier, jamais ailleurs, et cette page le remet en scène.",
        p2: "L'idée est venue tout de suite, pendant la conception du prototype : les noms métier que l'API expose pouvaient servir une seconde fois, pour construire les filtres de recherche. La réflexion qui fabrique ces noms sait d'ailleurs les traduire dans les deux sens, du fichier vers le métier et retour. La question était simple : qu'est-ce qu'un appelant a le droit de demander ? Lui laisser écrire lui-même son filtre, c'est lui donner les clés du bâtiment. Il pourrait lire une colonne que je ne lui montre pas, ouvrir un fichier dont je ne lui ai jamais parlé. Alors j'ai imaginé l'inverse : il ne rédige rien, il choisit. Une colonne dans la liste que j'expose, un test dans une liste de six, et une valeur. Trois listes, et rien en dehors.",
        p3: "Ce langage, je ne l'ai pas inventé seul. Le ET, le OU et le « différent de » viennent du C# lui-même ; « commence par » et « finit par », d'un langage d'un autre atelier, dont les opérateurs de chaînes disaient déjà tout. Le « différent de », justement : celui-là, la page le refuse exprès, et elle dit pourquoi plus bas. Puis ce chantier s'est arrêté là où le prototype s'est également arrêté. Tout fonctionnait très bien. Mais une nouvelle idée commençait à germer : trouver un moyen pour que le système se débrouille tout seul. Cette idée-là est déjà racontée : c'est elle qui a donné le modèle dynamique. Celle du mini-langage, est-ce qu'elle tient debout ? C'est exactement ce que la suite de cette page permet d'essayer.",
      },
      pourquoi: {
        a1: "Un where ouvert, c'est donner les clés de la maison : l'appelant peut demander n'importe quelle colonne, n'importe quel fichier, n'importe quelle sous-requête.",
        a2: "Un where ouvert parle le langage du fichier, avec ses noms d'au plus six caractères. Celui-ci parle le langage du métier.",
        a3: "Un where ouvert ne se borne pas : rien ne permet d'y interdire une négation qui ramènerait tout, ni d'y exiger deux caractères sur un « contient ». Avec trois listes closes, ces règles s'écrivent, et cette page les applique une par une.",
      },
      decor: {
        titre: "Le décor : les fichiers du grossiste",
        intro: "Quatre fichiers, aucune clé technique. Et pourquoi aucun numéro de client ? Ces machines n'en fabriquaient pas : un identifiant se gérait soi-même, un champ de plus dans des enregistrements à longueur fixe où chaque octet comptait. On joignait donc par les valeurs du métier.",
        cdemst: "CDEMST : les commandes",
        climst: "CLIMST : les clients",
        cmliv: "CMLIV : le mode de livraison par client",
        modliv: "MODLIV : le référentiel des modes",
      },
      modes: {
        exp: "Express 24 h",
        std: "Standard 72 h",
        ret: "Retrait entrepôt",
        mes: "Messagerie",
        rel: "Point relais",
        pal: "Palette affrétée",
      },
      legende: {
        titre: "Deux sortes de liens, et le fichier n'en déclare aucun.",
        valeurs: "C'est ainsi qu'on reconnaît le même client d'un fichier à l'autre : par son nom et son prénom. Il n'existe aucun numéro de client, et deux DURAND ne se séparent que par le prénom.",
        code: "Un code qui renvoie à un autre fichier. Les deux portent la même donnée sous deux noms. C'est ce qu'on appellerait aujourd'hui une clé étrangère, à ceci près que rien ici ne la déclare : seuls les programmes le savent.",
        modifier: "Modifier une cellule teintée casse un lien. Modifier une autre ne change rien au lien.",
      },
      refus: {
        forme: {
          quoi: "Forme non reconnue : {faute}",
          pourquoi:
            "une séquence s'écrit <colonne:opérateur:valeur/>, dans cet ordre et sans rien autour. Par exemple <nomClient:=]:UR/> : d'abord la colonne, puis le test, puis la valeur.",
          // Les cinq fautes, servies par {faute} dans le titre. La page NOMME
          // la faute au lieu de réciter la règle : le nom de la faute EST le
          // localisateur, et il évite de citer un fragment de lecteur sans
          // borne, illisible sur un téléphone en portrait.
          //
          // La dernière phrase de `pourquoi` a migré ici, dans `operateurFin` :
          // elle n'était vraie que pour un cas sur cinq, et la page la servait
          // aux cinq.
          fautes: {
            ouvrant: "il manque le chevron ouvrant « < »",
            fermant: "il manque la fermeture « /> »",
            deuxPoints: "il manque un deux-points, une séquence en porte deux",
            operateurFin: "l'opérateur va au milieu, jamais à la fin",
            generique: "le membre ne tient pas dans le gabarit",
          },
        },
        // Un membre vide n'est pas raté, il est INACHEVÉ : c'est l'état que les
        // boutons de liaison produisent eux-mêmes.
        inacheve: {
          quoi: "Membre manquant",
          pourquoi:
            "la liaison relie deux membres : il en manque un. Écrivez-le, ou retirez la liaison.",
        },
        // Le voisin immédiat du geste qui a fondé l'avenant 5 : un caractère de
        // moins effacé, et le lecteur tombait ici. Le renvoi vers la liste est
        // la même phrase que `colonne` : même remède, cause différente.
        colonneVide: {
          quoi: "Nom de colonne absent",
          pourquoi:
            "une séquence commence par le nom d'une colonne. Les neuf noms exposés sont listés plus bas.",
        },
        colonne: {
          quoi: "Colonne « {nom} » hors de la liste exposée",
          pourquoi:
            "l'appelant ne choisit pas ce qu'il interroge. Seules les propriétés du modèle sont acceptées, et elles sont toutes listées plus bas.",
        },
        operateur: {
          quoi: "Opérateur « {op} » hors liste",
          pourquoi:
            "six opérateurs, pas un de plus. == égal · [= commence par · =] finit par · [] contient · >< compris entre · => supérieur ou égal. Par exemple <{colonne}:[=:DUR/>.",
        },
        interdit: {
          quoi: "Opérateur « {op} » connu et interdit",
          pourquoi: "une négation sur une colonne texte ramènerait la totalité des lignes.",
        },
        type: {
          quoi: "« {operateur} » ne s'applique pas à {colonne}",
          pourquoi: "cette propriété est de type {type} ; l'opérateur attend {types}.",
        },
        valeurVide: {
          quoi: "Valeur absente",
          pourquoi: "un test sans valeur ne teste rien.",
        },
        tropCourt: {
          quoi: "Valeur trop courte pour « {operateur} »",
          pourquoi: "au moins deux caractères, sinon la recherche balaie tout le fichier.",
        },
        bornes: {
          quoi: "« compris entre » attend deux bornes",
          pourquoi: "on les sépare par un point-virgule : <{colonne}:><:borne1;borne2/>",
        },
        liaison: {
          quoi: "Mélange de ET et de OU",
          pourquoi:
            "une expression porte une seule sorte de liaison : ET, ou OU, jamais les deux à la fois.",
        },
      },
      zone1: { titre: "Ce que l'appelant demande" },
      zone2: { titre: "La classe que la machine vient de fabriquer" },
      champ: {
        filtre: "Filtre",
        // Le contournement mesuré cesse d'être un secret. Elle ne dit PAS
        // pourquoi le paysage aide : seul le contournement a été mesuré, pas
        // son mécanisme.
        paysage: "Sur téléphone, le mode paysage donne plus de place pour lire une expression longue.",
        // Noms accessibles des trois boutons à signe : jamais affichés, donc
        // invisibles à une relecture d'écran. Leur fratrie se vérifie alignée.
        fermer: "/> Fermer la séquence",
        et: "&& Fermer et enchaîner avec ET",
        ou: "|| Fermer et enchaîner avec OU",
        envoyer: "Envoyer la demande",
        // Servie par le module aux trois surfaces de réponse tant que rien
        // n'est parti : la page ne répond pas à une demande qu'on n'a pas faite.
        attente: "Envoyez la demande pour voir la réponse.",
      },
      colonnes: {
        titre: "Colonnes voulues",
        note: "Ces noms sont ceux que le modèle C# expose (voir la sous-section « Avec un modèle de données C# », à la section 3). Le fichier, lui, garde les siens : ils sont rappelés en gris, avec le fichier d'où chacun sort.",
      },
      exemples: {
        note: "Des exemples à cliquer : chacun remplit le champ « Filtre » à votre place. Les gris passent ; les rouges tentent une demande interdite, et c'est leur refus qu'ils servent à montrer.",
        repos: "Survolez un exemple, ou touchez-le, pour lire ce qu'il démontre.",
        // La réserve qui rend l'explication falsifiable : les aides gelées
        // annoncent des comptes ("2 commandes ici") que l'édition peut démentir.
        donneesModifiees: "Vous avez modifié les données : les comptes de cette explication valent pour les données d'origine.",
      },
      morale: "Aucune de ces classes n'existe dans le code.",
      json: {
        titre: "Le JSON que l'API renverrait",
        intro: "Seules les propriétés cochées, seules les lignes retenues par le filtre. Une jointure qui ne trouve rien s'écrit null, sans guillemets.",
        vide: "aucune colonne choisie : il n'y a rien à renvoyer",
      },
      refusRien: "La demande est refusée : rien ne part au serveur.",
      requete: {
        titre: "La requête que le serveur bâtirait",
        intro: "Jamais exécutée : une illustration. Le cadre ne contient que du SQL ; les valeurs vivent dessous, dans leur propre bloc.",
        naive: "Ce qu'une API naïve aurait fabriqué",
        phraseNaive: "L'apostrophe de la valeur referme le texte : la suite devient de la grammaire de requête, et une condition toujours vraie ramènerait le fichier entier.",
        parametree: "La requête paramétrée",
        phraseParametree: "La valeur est restée une donnée : un nom de client, et ce client n'existe pas.",
        parametre: "Un ? est un paramètre : la valeur voyage à côté du texte de la requête, jamais dedans.",
      },
      valeurs: {
        titre: "Valeurs des paramètres",
        intro: "Dans l'ordre des ? de la requête :",
        aucune: "Aucun paramètre : la demande ne porte aucune condition.",
        borne: "borne traduite : {avant} devient {apres}, les décimales implicites du fichier",
      },
      edition: {
        bouton: "Modifier les données",
        note: "Les commandes sont ouvertes à l'écriture. Modifiez une cellule : la jointure et le JSON se rejouent aussitôt. La classe et la requête ne dépendent pas des données ; elles se refont quand vous cochez une colonne ou écrivez un filtre.",
        jointure: {
          une: "Une commande ne retrouve plus son client.",
          plusieurs: "{n} commandes ne retrouvent plus leur client.",
          corps: "La jointure par les valeurs ne trouve plus de ligne correspondante dans CLIMST ni CMLIV pour {liste} : les trois propriétés jointes, villeClient, codeModeLivraison et libelleModeLivraison, rendent null. La graphie d'origine reste lisible dans CLIMST : rétablissez-la et le lien se ressoude.",
          filtreUne: "La commande {liste} ne satisfait plus le filtre en cours : elle a disparu du résultat, et le JSON ne peut pas montrer ses null. Videz ou élargissez le filtre pour les voir.",
          filtrePlusieurs: "Les commandes {liste} ne satisfont plus le filtre en cours : elles ont disparu du résultat, et le JSON ne peut pas montrer leurs null. Videz ou élargissez le filtre pour les voir.",
        },
      },
      compte: {
        une: "1 ligne trouvée sur {total}.",
        plusieurs: "{n} lignes trouvées sur {total}.",
        aucune: "Aucune ligne trouvée sur {total}.",
      },
      classe: {
        commentaire: "Type fabriqué à l'exécution, puis oublié",
        vide: "aucune colonne choisie : il n'y a rien à fabriquer",
        // Le nom de la classe se traduit comme le reste du code, seul son
        // empreinte reste stable d'une langue à l'autre.
        prefixe: "Commande",
      },
      // Les noms de propriétés exposés par le modèle. Le site traduit son code ;
      // seul le nom physique de la colonne, à gauche, ne bouge jamais.
      modele: {
        NOMCLI: "nomClient",
        PRECLI: "prenomClient",
        LIZEPO: "codeModeLivraison",
        LIBLIV: "libelleModeLivraison",
        NUMCDE: "numeroCommande",
        DATCDE: "dateCommande",
        MTTCDE_BRUT: "montantBrut",
        MTTCDE: "montantCommande",
        VILCLI: "villeClient",
      },
      types: {
        texte: "texte",
        entier: "entier",
        date: "date",
        décimal: "décimal",
      },
      ex: {
        commencePar: {
          nom: "commence par",
          aide: "Les noms qui commencent par DUR : 3 commandes sur 18. Il n'y a que deux clients DURAND, mais CLAIRE en a passé deux, et c'est ce qu'une jointure par les valeurs produit tout le temps. Modifiez la valeur : MAR en trouve 3 aussi.",
        },
        finitPar: {
          nom: "finit par",
          aide: "Les noms qui finissent par IER : FOURNIER, MERCIER, GARNIER, soit 3 commandes. Essayez la même chose avec une seule lettre, T : elle passe, et rend LAMBERT et PETIT.",
        },
        contient: {
          nom: "contient",
          aide: "Les noms qui contiennent AR n'importe où : 5 commandes. Deux caractères au minimum, sinon la demande est refusée.",
        },
        deuxConditions: {
          nom: "deux conditions",
          aide: "Un ET entre deux tests : DURAND, et livré en express. 2 commandes, toutes deux de CLAIRE. Le mode vient de CMLIV, joint aux commandes sur nom plus prénom. Remplacez EXP par STD : c'est MARC qui apparaît, seul.",
        },
        jointure: {
          nom: "ville du client (jointure)",
          aide: "villeClient vient du fichier des clients, CLIMST : il se joint aux commandes sur NOMCLI plus PRECLI, sans aucun identifiant. 2 commandes ici, toutes deux de CLAIRE qui habite Lyon. Essayez PARIS : 1 commande, celle de l'autre DURAND.",
        },
        comprisEntre: {
          nom: "compris entre",
          aide: "Le montant entre 1000 et 4000 : 5 commandes. Les deux bornes se séparent par un point-virgule, et elles se modifient : 125;126 n'en garde qu'une.",
        },
        depuisDate: {
          nom: "depuis une date",
          aide: "Les commandes à partir du 1er juillet 2026 : 5 sur 18. Reculez la date, 20260301 en ramène 14.",
        },
        colonneInconnue: {
          nom: "colonne inconnue",
          aide: "Demande une colonne qui n'est pas dans la liste exposée. L'appelant ne choisit pas ce qu'il interroge : refus.",
        },
        operateurInconnu: {
          nom: "opérateur inconnu",
          aide: "Le signe tapé n'est pas un des six opérateurs admis. La liste des tests est close : refus.",
        },
        valeurCourte: {
          nom: "valeur trop courte",
          aide: "Un « contient » d'une seule lettre balaierait tout le fichier. Règle métier : au moins deux caractères, sinon refus.",
        },
        negation: {
          nom: "négation interdite",
          aide: "La négation est connue, et interdite exprès : sur une colonne texte elle ramènerait presque tout le fichier.",
        },
        etOu: {
          nom: "ET mêlé à OU",
          aide: "Une expression porte une seule sorte de liaison. Mélanger les deux est refusé, au lieu de perdre la fin de la demande en silence.",
        },
        injection: {
          nom: "tentative d'injection",
          aide: "Le grand classique, et il ne doit PAS marcher. La valeur a été comparée, pas assemblée : elle n'a jamais eu la moindre chance de devenir une instruction. Elle est cherchée comme un nom de client, qui n'existe pas.",
        },
      },
    },
    section5: {
      title: "La méthode",
      intro: "Ce site n'a pas été tapé à la main, ni dicté à une IA en lui faisant confiance. Il a été construit sous un harnais de travail : TWAIM.",
      comment: "Chaque étape commence par un prompt écrit avant le code. Un agent l'exécute, un autre le relit et rend un verdict. Aucun agent ne fusionne, aucun ne publie : c'est mon geste.",
      preuve: "La preuve n'est pas dans ce texte, elle est dans le dépôt, qui est public. Les prompts qui ont piloté chaque étape y sont entiers, avec le journal des atterrissages et le registre des leçons.",
      depot: "Le dépôt de ce site, sur GitHub",
      // Même adresse que la version anglaise, volontairement : le dépôt n'a pas
      // de version anglaise. Ce n'est pas un défaut de parité à « corriger ».
      depotUrl: "https://github.com/lianazel/ibm-s36-to-rest-api",
      lien: "La méthode, en détail, sur son propre site",
      lienUrl: "https://twaim-web.vercel.app/",
    },
    annexe: {
      title: "Annexe : un fichier S/36 de près",
      intro: "Ce chapitre est un détour technique, un petit voyage dans les contraintes de l'époque. Il n'est pas nécessaire pour suivre la suite.",
      memoire: "Ce chapitre s'appuie sur ma mémoire. L'essentiel de ma carrière s'est déroulé sur IBM i ; par avance, pardon pour les erreurs ou les oublis.",
      ouverture: "Un grossiste fictif et ses cinq fichiers suffisent à le montrer.",
      ruban: {
        title: "Un fichier plat, c'est un ruban",
        p1: "Un enregistrement est une suite de caractères de longueur fixe, et chaque donnée y occupe des positions : de la première à la septième, le numéro de commande ; de la huitième à la onzième, le nombre d'articles ; et ainsi de suite jusqu'au bout de la ligne. Rien ne sépare les champs, aucun nom ne les précède. Le fichier des commandes du grossiste, CDEMST, fait soixante-dix caractères par enregistrement. Lu tel quel, il ressemble à ceci : 00012340012000012550DURAND… Une ligne collée, que seul un programme sait découper.",
        p2: "Le découpage existe bien, mais il n'est pas dans le fichier. Il vit dans les programmes qui le lisent, déclaré à chaque fois dans leurs spécifications d'entrée. IBM le dit en toutes lettres : pour ces fichiers, l'information sur les champs doit être fournie par les programmes qui les traitent. Le ruban est parfaitement ordonné, et il ne sait rien de son ordre.",
      },
      redessine: "Aucun document IBM n'est reproduit ici. La carte à colonnes est redessinée, dans les caractères et les couleurs de ce site, à partir de sa description technique.",
      lettres: {
        title: "Six lettres pour tout dire",
        p1: "Les langages de l'époque laissaient peu de place à un nom de zone : six caractères au plus en RPG II, que l'on appelait GAP en France. On abrège donc, et IBM recommande comment : MASTER devient MST ou MSTR. NOMCLI, c'est le nom du client ; NUMCDE, le numéro de commande ; TOTHTG, le total hors taxes. On s'y fait vite, et ces noms sont précis pour qui les pratique.",
        p2: "Puis il y a LIZEPO. Six lettres, et rien qui laisse deviner qu'il s'agit du mode de livraison choisi par un client. Ce n'est pas un défaut de l'époque : c'est ce qu'un nom si court finit par devenir quand l'application grandit et que les mots courts sont pris. Le nom est exact. Il n'est pas parlant, et le fichier n'a aucun endroit où écrire ce qu'il veut dire.",
      },
      silence: {
        title: "Ce que le fichier ne dit pas",
        p1: "Les décimales, d'abord. Le total hors taxes d'une commande est stocké 000012550, et il vaut 125,50. Aucun séparateur : le System/36 est une machine à décimal zoné, un chiffre par octet, et le nombre de décimales est déclaré dans le programme, pas dans le fichier. Lisez le ruban sans le programme, vous lirez douze mille cinq cent cinquante.",
        p2: "La même donnée sous deux noms, ensuite. Le code du mode de livraison s'appelle LIZEPO dans le fichier des clients livrés, CMLIV, et CODLIV dans le référentiel des modes, MODLIV. Les deux fichiers se joignent sur cette valeur, et rien, dans aucun des deux, ne dit qu'il s'agit de la même chose. Seuls les programmes le savent.",
        p3: "Aucune clé, enfin. Ces fichiers ne portent pas d'identifiant technique : une commande retrouve son client par le nom et le prénom, écrits dans les deux fichiers. Deux personnes distinctes au même nom et au même prénom se confondraient : l'unicité, quand il en fallait une, se construisait dans l'application, jamais dans le fichier. Indexer sur des positions n'est pas relier des fichiers, et c'est un fait d'époque, pas une négligence.",
        p4: "J'ai connu ces fichiers vus depuis le SQL : les colonnes étaient là, nommées, visibles. Et pourtant muettes. Sans accès aux programmes, j'ai reconstruit les liens par déduction, une colonne après l'autre, en croisant les valeurs. Le savoir était dans les programmes et dans les mémoires, jamais dans le fichier.",
      },
      vivant: {
        title: "Muet, mais pas mort",
        p1: "Rien de tout cela n'est une panne. Les données sont justes, les programmes tournent, les commandes partent. Ce qui manque n'est pas l'information, c'est sa description : ce que chaque position veut dire, ce que chaque nom désigne, combien de décimales se cachent dans un montant. Cette description existe, éparpillée dans des programmes et des mémoires. Il reste à l'écrire à un seul endroit, et à la mettre au service de ce qu'on veut exposer. C'est la solution.",
      },
      tab1: {
        legende: "Structure de CDEMST : cinq colonnes, soixante-dix positions",
        col1: "Colonne", col2: "Positions", col3: "Type", col4: "Contenu",
        l1: "Numéro de commande", l2: "Nombre d'articles", l3: "Total hors taxes, deux décimales implicites", l4: "Nom du client", l5: "Prénom du client",
      },
      tab2: {
        legende: "Brut contre interprété : ce que le programme sait et que le fichier tait",
        col1: "Colonne", col2: "Dans le fichier", col3: "Ce que ça veut dire",
        l1: "125,50", l2: "la commande 1234", l3: "12 articles",
      },
      tab3: {
        legende: "La même donnée sous deux noms : LIZEPO dans CMLIV, CODLIV dans MODLIV",
        note: "La valeur EXP est la même dans les deux fichiers. Aucun des deux ne le dit.",
      },
      feuilleI: {
        legende: "Carte I, spécifications d'entrée : le fichier CDEMST décrit par le programme qui le lit",
        colType: "Type", colFichier: "Fichier", colInd: "Ind.", colDe: "De", colA: "À", colDec: "Déc.", colNom: "Nom de zone",
        c1: "Six cases pour un nom de zone, colonnes 53 à 58 : voilà les six lettres.",
        c2: "Un 2 en colonne 52 face à TOTHTG : voilà les décimales que 000012550 ne montre pas. La description du fichier n'est pas dans le fichier ; elle est sur cette carte, dans le programme.",
      },
      feuilleC: {
        legende: "Carte C, spécifications de calcul : trois lignes, trois mécanismes",
        colType: "Type", colCond: "Cond.", colF1: "Facteur 1", colOp: "Opération", colF2: "Facteur 2", colRes: "Résultat", colLong: "Long.", colDec: "Déc.", colH: "H", colHi: "Hi", colLo: "Lo", colEq: "Eq",
        c1: "Ligne 1 : MULT range le produit dans TFACT, et c'est ici que TFACT naît, longueur 9, deux décimales. La colonne 52 est la même que sur la carte I : les décimales se déclarent sur la carte, jamais dans la donnée. Le H demande l'arrondi.",
        c2: "Ligne 2 : CHAIN cherche dans CLIMST la fiche dont la clé vaut CLECLI. L'indicateur 51, en colonne High, s'allume si la fiche n'existe pas.",
        c3: "Ligne 3 : le 51 à gauche conditionne la ligne. Elle ne s'exécute que si l'interrupteur est allumé, et elle appelle CRECLI, la sous-routine qui crée la fiche.",
      },
      voix: {
        p1: "Les indicateurs de résultat sont aux colonnes d'extrême droite, High, Low, Equal. On peut y inscrire un indicateur, de 1 à 99. Chaque indicateur fonctionne comme un interrupteur : il est allumé, ou pas, selon le résultat de l'opération faite sur le facteur 1, l'opération et le facteur 2.",
        p2: "À gauche, les indicateurs de condition disent si la ligne s'exécute. J'écrivais N51 si l'enregistrement avait été trouvé, 51 s'il ne l'avait pas été.",
        p3: "L'exemple que j'ai en tête : créer une fiche client si elle n'existe pas. On cherche la fiche, l'interrupteur s'allume si elle manque, et la ligne suivante appelle la sous-routine qui la crée.",
      },
      retour: "Retour au problème",
    },
    about: {
      title: "À propos",
      name: "Des fichiers S/36 à l'API REST",
      license: "Code sous licence MIT ; textes et visuels réservés.",
      twaim: "Construit sous le harnais TWAIM : voir la méthode",
      twaimUrl: "https://twaim-web.vercel.app/",
      portfolio: "Retour au portfolio",
    },
    footer: {
      notice:
        "© 2026 Jean-Christophe Cherid. Code sous licence MIT ; textes et visuels réservés.",
      disclaimer:
        "IBM, IBM i et System/36 sont des marques d'International Business Machines Corporation. Les autres noms de produits et de sociétés cités sont la propriété de leurs détenteurs respectifs. Site indépendant, non affilié à IBM.",
      portfolio: "Retour au portfolio",
    },
    lang: {
      switch: "EN",
    },
  },
  en: {
    site: {
      title: "From S/36 files to a REST API",
    },
    hero: {
      tagline:
        "Forty years separate an S/36 flat file from a JSON feed. This site tells the story of the .Net architecture that makes them work together: demonstrated, tested, explained.",
    },
    nav: {
      aria: "Sections",
      decor: "The setting",
      probleme: "The problem",
      solution: "The solution",
      minilangage: "The mini-language",
      methode: "The method",
      annexe: "Appendix",
    },
    menu: {
      title: "Menu",
      open: "Open menu",
      close: "Close menu",
    },
    meta: {
      description:
        "A .Net REST API prototype exposing legacy IBM S/36 files running on IBM i as JSON: demonstrated, tested, explained.",
    },
    section1: {
      title: "The setting",
      intro:
        "IBM i still runs applications born on System/36: on a current IBM i 7.5, the STRS36 command still starts an S/36 session. This heritage is alive: it computes, it invoices, it ships goods. It is simply mute to the web.",
      lignees: {
        title: "Two lineages, two philosophies",
        p1: "In 1978, IBM announced the System/38 (announced October 24, 1978, first shipped in 1980): a machine ahead of its time, where everything is an object managed by the system. The compiled program, the table description, the job queue: each has a type, an identity, rules enforced by the machine. One caution about the word \"object\": this has nothing to do with modern object-oriented programming. No inheritance, no polymorphism. A system object is a typed piece of engineering, not a class.",
        p2: "The System/36, announced May 16, 1983, was an entirely different machine: simple, sturdy, built for small businesses. It is not the ancestor of the AS/400; it is a parallel lineage. And the two lineages were incompatible: an S/36 application would not run on a S/38. S/36 customers had no natural migration path.",
      },
      pont: {
        title: "1988: IBM's bridge",
        p1: "On June 21, 1988, IBM announced the AS/400. Architecturally, it is the heir of the System/38. But the machine carried one decisive idea: a System/36 environment inside OS/400, welcoming S/36 applications with source-level compatibility. You recompile; you do not rewrite.",
        p2: "That compatibility was not a courtesy; it was a strategy. Rewriting would have cost customers a fortune in every country where IBM operated; the new machine could run the installed heritage, and it sold partly because of that. The engineering lesson fits in one sentence: you do not rewrite what works, you make it reachable.",
      },
      noms: {
        title: "Names change, the machine carries on",
        p1: "OS/400 in 1988, i5/OS in 2004, IBM i in 2008 on Power servers: three names, one lineage. Today IBM i stands at versions 7.5 and 7.6 (announced in April 2025), and the STRS36 command still starts a System/36 session. The passenger that boarded in 1988 is still riding.",
        p2: "This heritage even lived outside IBM. As early as the 1990s, vendors such as Unibol offered a System/36-compatible environment on Unix, where RPG and COBOL programs kept running. When a whole market tools up to keep applications alive, those applications are worth something. Those offerings faded as the S/36 installed base shrank; IBM's bridge, meanwhile, still stands.",
      },
      preuve: {
        title: "Living proof",
        p1: "It would be no surprise to find applications designed before the AS/400 arrived in 1988 still running today, to their users' full satisfaction. I have met more than one throughout my career: born on the S/36, still in production, quietly doing their job, and nobody gives them a thought: the results come out. And honesty requires saying it: in time, these S/36-mode applications will give way to rewritten versions, and not necessarily on IBM i.",
        p2: "I saw the other side too. System/38 developers, already fluent in the object model, switched to the AS/400 overnight, and the skills shortage sent their value soaring. System/36 specialists, by contrast, had to work their way into this new architecture and make it their own. It gave them a dual expertise, rare in its own right at the time: System/36 and AS/400.",
        p3: "That is the setting: a living S/36 heritage that computes, invoices and ships every month on current machines. Alive, and mute to the web. The next chapters tell why these files cannot say anything about themselves, and how to make them talk.",
      },
    },
    section2: {
      title: "The problem",
      intro: "The challenge is to expose in JSON a table format inherited from the IBM System/36 era. These tables, those still in service, do their job: they record and return data without fail. But ask them what they hold, and they cannot answer. The file gives positions and names of six characters or fewer, never what those names mean. The application is what knows the business meaning of each column.",
      renvoi: "To see an S/36 file up close, its positions, its abbreviated names, its hidden decimals:",
      renvoiLien: "the appendix, at the end of the page.",
    },
    section3: {
      title: "The solution",
      sousTitre: "With a C# data model",
      intro: "My trade is IBM i. C# and .Net came to me through the work I was given. What follows is not a recipe. It is a path, in four steps, the way it actually happened.",
      modele: {
        title: "A data model written by hand, to test an idea",
        p1: "The idea fits in one sentence. If the file does not say what its columns mean, then someone has to say it instead, once, in a single place. That someone is a class written by hand. Each property carries the name people actually use, and a tag placed above it carries the physical column name, at most six characters long. The program reads its own tags back while it runs, which is called reflection, and builds a dictionary from them.",
        p2: "That dictionary works both ways. It names what goes out, since the JSON returned carries the business names. It translates what comes in, since a filter written with a business name becomes a column name in the query. The same piece of data may go by another name in another file and still land on a single name. That is where the file starts to speak.",
        code1: {
          legende: "Recreated extract: the house attribute and the two classes of the fictional case.",
          source: `// The house attribute, declared once and for all
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
}`,
        },
        code2: {
          legende: "Recreated extract: the business-name-to-physical-name dictionary, filled while the program runs.",
          source: `// The "business name -> physical name" dictionary, built while the program runs
public Dictionary<string, string> LoadDictionary(Type model)
{
    var dictionary = new Dictionary<string, string>();

    foreach (var property in model.GetProperties())
    {
        var attribute = property.GetCustomAttribute<S36ColumnAttribute>();
        dictionary[property.Name.ToUpper()] = attribute?.Name;
    }

    return dictionary;
}`,
        },
      },
      mur: {
        title: "The idea works. Reality catches up with me",
        p1: "The idea works, and that is exactly what dooms it. The application I am talking about holds hundreds of tables. Every question put to the data calls for its own method in the web service, its own query written in advance with fixed columns, and its own hand-written class to match that query. Three things per question. The cost is not writing them once: it is maintaining all of them afterwards. One column added somewhere, and all three have to be found again. Nobody wants to spend their days writing those classes, and every keystroke is a chance to get it wrong.",
      },
      renversement: {
        title: "I turn the problem around: the machine will do the work",
        sousTitre: "The dynamic model arrives",
        p1: "Dynamic models, though, were new to me when I started this. So I turned the problem around. If the work consists of describing columns one by one, it is not work for a human. The query carries the business names, renaming its columns as it goes, and the machine builds the matching class.",
        p2: "The mechanism comes down to a few moves. The query is unknown to the code until the call. The program looks at the columns it returns, notes their name and their type, and builds a class while it runs, once only. Then it walks the rows and pours each value into an instance of that class. The model is a mould: cast once, every row is poured into it. The mould is thrown away when the call ends, and nothing is kept. Another query on the next call gives another mould, without a single line of code having changed.",
        p3: "At that stage I was after one answer: does the idea hold. What a caller is allowed to ask for is a product question, not a prototype one, and it comes right after.",
        fabrique: "The extract above is recreated for reading. The full mechanism is public: a .Net solution I published, where the class is built by reflection, property by property.",
        fabriqueLien: "The model factory in C#, on GitHub",
        // Même adresse que le français : le dépôt n'a pas de version anglaise, comme section5.depotUrl.
        fabriqueUrl: "https://github.com/lianazel/API.Response.Dynamic.Model/blob/master/API.Response.Dynamic.Model.Framework/Services/ApiDynamicModelOnDemand.cs",
        code3: {
          legende: "Recreated extract: the rows collected, the class built once, every row poured afterwards. The building itself is called, not shown.",
          source: `// The query has just been run; it was unknown to the code until the call.
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
}`,
        },
      },
      boite: {
        resume: "For the curious: the toolbox, the build chain class by class",
        intro: "In the order the program uses them: no instance without a class, no class without a module, and no module without an assembly.",
        colonne1: "Order",
        colonne2: "Class",
        colonne3: "What it does",
        ligne1: "names the assembly about to be built",
        ligne2: "creates that assembly, in memory, while the program runs",
        ligne3: "creates the module that will hold the class",
        ligne4: "declares the class itself",
        ligne5: "declares the backing field that will hold the value",
        ligne6: "declares the property visible from the outside, then attaches its two accessors to it once they are written",
        ligne7: "declares the two accessors, the one that reads the value and the one that writes it",
        ligne8: "writes the body of those accessors, one instruction at a time: three to read, four to write",
        ligne9: "its CreateInstance method produces an instance of the class just built, one per row returned",
        hors: "Two ordinary classes bracket that chain without being part of it.",
        hors1: "holds what comes in: the name of each column and its type.",
        hors2: "holds what goes out: the instances, and it is the one that leaves as a JSON feed.",
      },
      etape: {
        title: "The core is operational. One step was left",
        p1: "The core that builds the dynamic model is operational, and I did not take it further. One step was left. A query tuned for the API would deserve to be stored rather than retyped: the caller would then name it, instead of sending its text. That step is what would have made it a product. Not a perfect one, but an interesting one. Restricting what a query is allowed to do, and storing the model once built rather than rebuilding it every time (serialising the CLR type itself), belong to the same job, the next one.",
      },
      limites: {
        title: "The dynamic model's limits, known and not hidden",
        cause: "The dynamic model only knows the table through what the table shows it. It reads the first row of the result and infers the name and type of every column from it: it never asks the database for a description. That choice, not the source, is what sets its limits. They are the same whatever the database, IBM i, SQL Server, PostgreSQL or any other.",
        contraintes: "Two constraints follow, observed by replaying the mechanism on constructed cases. The target table must hold at least one record: without a first row, the model is built with no column at all, and nothing reports it. And that first row must carry no NULL value: an absent value has no type, so the column cannot be described. One trap comes on top, and it is quieter, observed the same way: on a later row, a NULL in a numeric column silently becomes zero. An unknown lead time then reads as a lead time of zero days, and nothing cries out.",
        amont: "There is upstream work too, and it comes from the query itself. Asking the database about a table means knowing which one: in a SELECT that targets a single table, it can be read straight from the query; as soon as the query carries joins, there are several tables, and they must be extracted before anything can be asked. That work belongs to a dedicated class, one that reads the query and returns the list of tables to describe.",
        parade: "The remedy is known, and it holds everywhere: ask the database for the description rather than the data. Every database can describe its tables, returning the type and nullability of every column, whether the table is empty or full:",
        voies: {
          ibmi: "on IBM i, a system command, writing to an output file so a program can use it",
          postgres: "in PostgreSQL, a psql client command",
          sqlserver: "in SQL Server, a stored procedure callable from code",
          standard: "the standard view, exposed by most databases, queried in SQL",
        },
        reste: "Then give the properties the right to be absent, so that a NULL stays a NULL and never turns into a zero. The prototype did not do it. That is a known limit, not a hidden one.",
      },
      dessin1: {
        legende: "Written by hand: everything is fixed in advance, and everything has to be maintained.",
        case1: {
          titre: "a flat file",
          sous: "inherited from an IBM S/36 architecture",
        },
        case2: {
          titre: "a fixed query",
          sous: "written in the code, fixed columns",
        },
        case3: {
          titre: "a C# class",
          sous: "written by hand. Matches the columns returned when the SQL query runs",
        },
        case4: {
          titre: "a name dictionary",
          sous: "business name to physical name, built by the C# reflection mechanism",
        },
        case5: {
          titre: "JSON",
          sous: "with business names",
        },
        methode: "one controller method per question asked",
        note1: "the caller only chooses the filter; not the query, not the columns, not their names; another question needs another query, hence another method and another class",
        note2: "it carries the column names of six characters or fewer; outside the application they mean nothing; the program reads its own attributes back while it runs and builds a dictionary from them",
        conclusion1: "Hundreds of tables. As many methods, queries and classes.",
        conclusion2: "The cost is not writing them once. It is maintaining all of them afterwards: untenable.",
      },
      dessin2: {
        legende: "What the machine does instead.",
        etape1: {
          titre: "a SELECT query",
          sous: "with or without joins, unknown to the code until the call",
        },
        etape2: {
          titre: "the model is built on the fly",
          sous: "from the name and the type of each column returned, once only",
        },
        cadre1: "for each row returned",
        cadre2: "for each column of the row",
        etape3: {
          titre: "read the column's value",
        },
        etape4: {
          titre: "pour it into the model",
          sous: "one instance per row",
        },
        etape5: {
          titre: "add the instance to the list",
          sous: "a list of objects",
        },
        etape6: {
          titre: "turn the list into a JSON feed",
          sous: "with the version and the item count",
        },
        conclusion1: "A different query on every call. The same code, no class to write.",
        conclusion2: "The model is a mould: cast once, every row is poured into it.",
      },
    },
    section4: {
      title: "The mini-language",
      ouverture: {
        titre: "An idea, not a working part",
        p1: "This chapter is not like the others. Up to here, the site tells of real things: S/36 files still running in production, and a prototype that proved the API works, never taken to production. What follows was born alongside that prototype, as a research project. It ran in my workshop, nowhere else, and this page puts it back on stage.",
        p2: "The idea came at once, while the prototype was being designed: the business names the API exposes could serve a second time, to build the search filters. The reflection that builds those names can, in fact, translate them both ways, from file to business and back. The question was simple: what does a caller have the right to ask for? Letting them write their own filter means handing them the keys to the building. They could read a column I do not show, open a file I never told them about. So I imagined the opposite: they write nothing, they choose. A column from the list I expose, a test from a list of six, and a value. Three lists, and nothing outside them.",
        p3: "This language I did not invent alone. The AND, the OR and the \"not equal\" come from C# itself; \"starts with\" and \"ends with\", from a language out of another workshop, whose string operators already said it all. The \"not equal\", precisely: that one, this page refuses on purpose, and it says why further down. Then this project stopped where the prototype also stopped. Everything worked very well. But a new idea was beginning to take root: finding a way for the system to manage on its own. That idea has already been told: it is the one that became the dynamic model. As for the mini-language's idea, does it hold up? That is exactly what the rest of this page lets you try.",
      },
      pourquoi: {
        a1: "An open where clause hands over the keys to the house: the caller can ask for any column, any file, any subquery.",
        a2: "An open where clause speaks the file's language, with its names of six characters at most. This one speaks the language of the business.",
        a3: "An open where clause cannot be fenced in: nothing lets you forbid a negation that would return everything, or require two characters on a \"contains\". With three closed lists, those rules can be written, and this page applies them one by one.",
      },
      decor: {
        titre: "The setting: the wholesaler's files",
        intro: "Four files, not a single technical key. And why no customer number? These machines did not produce one: an identifier was yours to manage, one more field in fixed length records where every byte was counted. So you joined on the values the business already used.",
        cdemst: "CDEMST: orders",
        climst: "CLIMST: customers",
        cmliv: "CMLIV: delivery mode per customer",
        modliv: "MODLIV: the delivery mode reference file",
      },
      modes: {
        exp: "Express, 24 h",
        std: "Standard, 72 h",
        ret: "Warehouse pickup",
        mes: "Parcel carrier",
        rel: "Collection point",
        pal: "Chartered pallet",
      },
      legende: {
        titre: "Two kinds of link, and the file declares neither.",
        valeurs: "This is how the same customer is recognised from one file to the next: by last name and first name. There is no customer number, and the two DURAND are told apart by the first name alone.",
        code: "A code that points to another file. Both carry the same data under two names. Today you would call it a foreign key, except that nothing here declares it: only the programs know.",
        modifier: "Changing a tinted cell breaks a link. Changing any other changes nothing about the links.",
      },
      refus: {
        forme: {
          quoi: "Shape not recognised: {faute}",
          pourquoi:
            "a sequence is written <column:operator:value/>, in that order and with nothing around it. For example <customerLastName:=]:UR/>: the column first, then the test, then the value.",
          fautes: {
            ouvrant: "the opening angle bracket \"<\" is missing",
            fermant: "the closing \"/>\" is missing",
            deuxPoints: "a colon is missing; a sequence carries two",
            operateurFin: "the operator sits in the middle, never at the end",
            generique: "the member does not fit the template",
          },
        },
        inacheve: {
          quoi: "Missing member",
          pourquoi:
            "the link joins two members: one is missing. Write it, or remove the link.",
        },
        colonneVide: {
          quoi: "Column name missing",
          pourquoi:
            "a sequence begins with a column name. All nine exposed names are listed below.",
        },
        colonne: {
          quoi: "Column \"{nom}\" is not in the exposed list",
          pourquoi:
            "the caller does not choose what to query. Only the model's properties are accepted, and every one of them is listed below.",
        },
        operateur: {
          quoi: "Operator \"{op}\" is not in the list",
          pourquoi:
            "six operators, not one more. == equals · [= starts with · =] ends with · [] contains · >< between · => greater than or equal. For example <{colonne}:[=:DUR/>.",
        },
        interdit: {
          quoi: "Operator \"{op}\" is known and forbidden",
          pourquoi: "a negation on a text column would bring back every row in the file.",
        },
        type: {
          quoi: "\"{operateur}\" does not apply to {colonne}",
          pourquoi: "this property is of type {type}; the operator expects {types}.",
        },
        valeurVide: {
          quoi: "Value missing",
          pourquoi: "a test with no value tests nothing.",
        },
        tropCourt: {
          quoi: "Value too short for \"{operateur}\"",
          pourquoi: "two characters at least, otherwise the search sweeps the whole file.",
        },
        bornes: {
          quoi: "\"between\" expects two bounds",
          pourquoi: "separate them with a semicolon: <{colonne}:><:bound1;bound2/>",
        },
        liaison: {
          quoi: "AND and OR mixed",
          pourquoi: "one expression carries one kind of link: AND, or OR, never both at once.",
        },
      },
      zone1: { titre: "What the caller asks for" },
      zone2: { titre: "The class the machine has just built" },
      champ: {
        filtre: "Filter",
        paysage: "On a phone, landscape gives more room to read a long expression.",
        fermer: "/> Close the sequence",
        et: "&& Close and chain with AND",
        ou: "|| Close and chain with OR",
        envoyer: "Send the request",
        attente: "Send the request to see the response.",
      },
      colonnes: {
        titre: "Columns wanted",
        note: "These names are the ones the C# model exposes (see the subsection \"With a C# data model\", in section 3). The file keeps its own: they are recalled in grey, with the file each one comes from.",
      },
      exemples: {
        note: "Examples to click: each one fills the Filter field for you. The grey ones go through; the red ones attempt a forbidden request, and it is their refusal they are there to show.",
        repos: "Hover over an example, or tap it, to read what it demonstrates.",
        donneesModifiees: "You have changed the data: the counts in this explanation hold for the original data.",
      },
      morale: "None of these classes exists in the code.",
      json: {
        titre: "The JSON the API would return",
        intro: "Only the ticked properties, only the rows the filter keeps. A join that finds nothing is written null, without quotation marks.",
        vide: "no column chosen: there is nothing to return",
      },
      refusRien: "The request is refused: nothing is sent to the server.",
      requete: {
        titre: "The query the server would build",
        intro: "Never executed: an illustration. The frame holds nothing but SQL; the values live below it, in a block of their own.",
        naive: "What a naive API would have built",
        phraseNaive: "The apostrophe in the value closes the text: what follows becomes query grammar, and an always-true condition would bring back the whole file.",
        parametree: "The parameterised query",
        phraseParametree: "The value stayed a piece of data: a customer name, and no such customer exists.",
        parametre: "A ? is a bind parameter: the value travels beside the query text, never inside it.",
      },
      valeurs: {
        titre: "Parameter values",
        intro: "In the order of the ? marks in the query:",
        aucune: "No parameter: the request carries no condition.",
        borne: "bound translated: {avant} becomes {apres}, the file's implicit decimals",
      },
      edition: {
        bouton: "Edit the data",
        note: "The orders are open for writing. Change a cell: the join and the JSON replay at once. The class and the query do not depend on the data; they are rebuilt when you tick a column or write a filter.",
        jointure: {
          une: "One order can no longer find its customer.",
          plusieurs: "{n} orders can no longer find their customer.",
          corps: "The join on values no longer finds a matching row in CLIMST or CMLIV for {liste}: the three joined properties, customerCity, deliveryModeCode and deliveryModeLabel, return null. The original spelling is still visible in CLIMST: restore it and the link mends.",
          filtreUne: "Order {liste} no longer satisfies the current filter: it has left the result, so the JSON cannot show its nulls. Clear or widen the filter to see them.",
          filtrePlusieurs: "Orders {liste} no longer satisfy the current filter: they have left the result, so the JSON cannot show their nulls. Clear or widen the filter to see them.",
        },
      },
      compte: {
        une: "1 row found out of {total}.",
        plusieurs: "{n} rows found out of {total}.",
        aucune: "No row found out of {total}.",
      },
      classe: {
        commentaire: "Type built at runtime, then forgotten",
        vide: "no column chosen: there is nothing to build",
        prefixe: "Order",
      },
      modele: {
        NOMCLI: "customerLastName",
        PRECLI: "customerFirstName",
        LIZEPO: "deliveryModeCode",
        LIBLIV: "deliveryModeLabel",
        NUMCDE: "orderNumber",
        DATCDE: "orderDate",
        MTTCDE_BRUT: "rawAmount",
        MTTCDE: "orderAmount",
        VILCLI: "customerCity",
      },
      types: {
        texte: "text",
        entier: "integer",
        date: "date",
        décimal: "decimal",
      },
      ex: {
        commencePar: {
          nom: "starts with",
          aide: "Names starting with DUR: 3 orders out of 18. There are only two DURAND customers, but CLAIRE placed two orders, and that is what a join on values produces all the time. Change the value: MAR finds 3 as well.",
        },
        finitPar: {
          nom: "ends with",
          aide: "Names ending in IER: FOURNIER, MERCIER, GARNIER, so 3 orders. Try the same thing with a single letter, T: it goes through, and finds LAMBERT and PETIT.",
        },
        contient: {
          nom: "contains",
          aide: "Names containing AR anywhere: 5 orders. Two characters minimum, otherwise the request is refused.",
        },
        deuxConditions: {
          nom: "two conditions",
          aide: "An AND between two tests: DURAND, and shipped express. 2 orders, both CLAIRE's. The mode comes from CMLIV, joined to the orders on last name plus first name. Replace EXP with STD: MARC appears, on his own.",
        },
        jointure: {
          nom: "customer city (join)",
          aide: "customerCity comes from the customer file, CLIMST: it joins to the orders on NOMCLI plus PRECLI, with no identifier at all. 2 orders here, both CLAIRE's, who lives in Lyon. Try PARIS: 1 order, the other DURAND's.",
        },
        comprisEntre: {
          nom: "between",
          aide: "Amounts between 1000 and 4000: 5 orders. The two bounds are separated by a semicolon, and they can be changed: 125;126 leaves only one.",
        },
        depuisDate: {
          nom: "since a date",
          aide: "Orders from 1 July 2026 onwards: 5 out of 18. Move the date back and 20260301 brings 14.",
        },
        colonneInconnue: {
          nom: "unknown column",
          aide: "Asks for a column that is not in the exposed list. The caller does not choose what to query: refused.",
        },
        operateurInconnu: {
          nom: "unknown operator",
          aide: "The sign typed is not one of the six accepted operators. The list of tests is closed: refused.",
        },
        valeurCourte: {
          nom: "value too short",
          aide: "A one letter contains would sweep the whole file. Business rule: two characters at least, otherwise refused.",
        },
        negation: {
          nom: "forbidden negation",
          aide: "The negation is known, and forbidden on purpose: on a text column it would bring back nearly the whole file.",
        },
        etOu: {
          nom: "AND mixed with OR",
          aide: "One expression carries one kind of link. Mixing the two is refused, rather than losing the end of the request in silence.",
        },
        injection: {
          nom: "injection attempt",
          aide: "The great classic, and it must NOT work. The value was compared, not assembled: it never had the slightest chance of becoming an instruction. It is looked up as a customer name, which does not exist.",
        },
      },
    },
    section5: {
      title: "The method",
      intro: "This site was not hand-typed, nor dictated to an AI on trust. It was built under a working harness: TWAIM.",
      comment: "Every step starts with a prompt written before any code. One agent carries it out, another reviews it and returns a verdict. No agent merges, no agent publishes — that step is mine.",
      preuve: "The proof is not in this text. It is in the repository, which is public. The prompts that drove every step are there in full, along with the landing journal and the lessons register.",
      depot: "This site's repository, on GitHub",
      // Même adresse que la version française, volontairement : le dépôt n'a pas
      // de version anglaise. Ce n'est pas un défaut de parité à « corriger ».
      depotUrl: "https://github.com/lianazel/ibm-s36-to-rest-api",
      lien: "The method, in full, on its own site",
      lienUrl: "https://twaim-web.vercel.app/en",
    },
    annexe: {
      title: "Appendix: an S/36 file up close",
      intro: "This chapter is a technical detour, a short trip into the constraints of the day. It is not needed to follow what comes next.",
      memoire: "This chapter draws on my memory. Most of my career took place on IBM i; my apologies in advance for any errors or omissions.",
      ouverture: "A fictional wholesaler and its five files are enough to show it.",
      ruban: {
        title: "A flat file is a ribbon",
        p1: "A record is a run of characters of fixed length, and every piece of data lives at positions: the first seven hold the order number; the next four, the number of items; and so on to the end of the line. Nothing separates the fields, no name precedes them. The wholesaler's order file, CDEMST, is seventy characters per record. Read as it is, it looks like this: 00012340012000012550DURAND… One glued line, which only a program knows how to cut.",
        p2: "The cut exists, but it is not in the file. It lives in the programs that read it, declared each time in their input specifications. IBM says so in plain words: for these files, field-level information must be provided by the programs that process them. The ribbon is perfectly ordered, and knows nothing of its own order.",
      },
      redessine: "No IBM document is reproduced here. The columned sheet is redrawn, in this site's typefaces and colors, from its technical description.",
      lettres: {
        title: "Six letters to say it all",
        p1: "The languages of the day left little room for a field name: six characters or fewer in RPG II. So you abbreviate, and IBM tells you how: MASTER becomes MST or MSTR. NOMCLI is the customer's last name; NUMCDE, the order number; TOTHTG, the total before tax. You get used to it quickly, and these names are precise for those who work with them.",
        p2: "Then there is LIZEPO. Six letters, and nothing that hints it is the delivery mode a customer has chosen. That is not a flaw of the era: it is what such a short name ends up being when the application grows and the short words are taken. The name is exact. It is not telling, and the file has nowhere to write down what it means.",
      },
      silence: {
        title: "What the file does not say",
        p1: "Decimals, first. The total before tax of an order is stored as 000012550, and it is worth 125.50. No separator: the System/36 is a zoned-decimal machine, one digit per byte, and the number of decimal places is declared in the program, not in the file. Read the ribbon without the program and you will read twelve thousand five hundred and fifty.",
        p2: "The same piece of data under two names, next. The delivery mode code is called LIZEPO in the file of delivered customers, CMLIV, and CODLIV in the reference table of modes, MODLIV. The two files join on that value, and nothing, in either of them, says it is the same thing. Only the programs know.",
        p3: "No key, finally. These files carry no technical identifier: an order finds its customer by last name and first name, written in both files. Two distinct people with the same last and first name would blur into one: uniqueness, where it was needed, was built in the application, never in the file. Indexing on positions is not linking files, and that is a fact of the era, not carelessness.",
        p4: "I have known these files as seen from SQL: the columns were there, named, visible. And yet mute. Without access to the programs, I rebuilt the links by deduction, one column after another, by cross-checking the values. The knowledge lived in the programs and in people's memories, never in the file.",
      },
      vivant: {
        title: "Mute, but not dead",
        p1: "None of this is a breakdown. The data is right, the programs run, the orders go out. What is missing is not the information, it is its description: what each position means, what each name stands for, how many decimal places hide in an amount. That description exists, scattered across programs and memories. What remains is to write it in one place, and put it to work for what we want to expose. That is the solution.",
      },
      tab1: {
        legende: "Structure of CDEMST: five columns, seventy positions",
        col1: "Column", col2: "Positions", col3: "Type", col4: "Content",
        l1: "Order number", l2: "Number of items", l3: "Total before tax, two implied decimals", l4: "Customer's last name", l5: "Customer's first name",
      },
      tab2: {
        legende: "Raw versus interpreted: what the program knows and the file keeps quiet",
        col1: "Column", col2: "In the file", col3: "What it means",
        l1: "125.50", l2: "order 1234", l3: "12 items",
      },
      tab3: {
        legende: "The same piece of data under two names: LIZEPO in CMLIV, CODLIV in MODLIV",
        note: "The value EXP is the same in both files. Neither of them says so.",
      },
      feuilleI: {
        legende: "Sheet I, input specifications: the CDEMST file as described by the program that reads it",
        colType: "Type", colFichier: "File", colInd: "Ind.", colDe: "From", colA: "To", colDec: "Dec.", colNom: "Field name",
        c1: "Six boxes for a field name, columns 53 to 58: there are the six letters.",
        c2: "A 2 in column 52 next to TOTHTG: there are the decimals that 000012550 does not show. The description of the file is not in the file; it is on this sheet, in the program.",
      },
      feuilleC: {
        legende: "Sheet C, calculation specifications: three lines, three mechanisms",
        colType: "Type", colCond: "Cond.", colF1: "Factor 1", colOp: "Operation", colF2: "Factor 2", colRes: "Result", colLong: "Len.", colDec: "Dec.", colH: "H", colHi: "Hi", colLo: "Lo", colEq: "Eq",
        c1: "Line 1: MULT stores the product in TFACT, and this is where TFACT is born, length 9, two decimals. Column 52 is the same column as on sheet I: decimals are declared on the sheet, never in the data. The H asks for rounding.",
        c2: "Line 2: CHAIN looks in CLIMST for the record whose key equals CLECLI. Indicator 51, in the High column, turns on if the record does not exist.",
        c3: "Line 3: the 51 on the left conditions the line. It runs only if the switch is on, and it calls CRECLI, the subroutine that creates the record.",
      },
      voix: {
        p1: "The resulting indicators sit in the rightmost columns, High, Low, Equal. You can write an indicator there, from 1 to 99. Each indicator works like a switch: it is on, or it is not, depending on the result of the operation performed on factor 1, the operation and factor 2.",
        p2: "On the left, the conditioning indicators say whether the line runs. I would write N51 if the record had been found, 51 if it had not.",
        p3: "The example I have in mind: create a customer record if it does not exist. You look the record up, the switch turns on if it is missing, and the next line calls the subroutine that creates it.",
      },
      retour: "Back to the problem",
    },
    about: {
      title: "About",
      name: "From S/36 files to a REST API",
      license: "Code under MIT license; texts and visuals all rights reserved.",
      twaim: "Built under the TWAIM harness: see the method",
      twaimUrl: "https://twaim-web.vercel.app/en",
      portfolio: "Back to the portfolio",
    },
    footer: {
      notice:
        "© 2026 Jean-Christophe Cherid. Code under MIT license; texts and visuals all rights reserved.",
      disclaimer:
        "IBM, IBM i and System/36 are trademarks of International Business Machines Corporation. All other product and company names mentioned are the property of their respective owners. Independent site, not affiliated with IBM.",
      portfolio: "Back to the portfolio",
    },
    lang: {
      switch: "FR",
    },
  },
};

const SUPPORTED_LANGS = ["fr", "en"];
const STORAGE_KEY = "ibmiapi.lang";

/**
 * Résout la langue du site depuis une langue de navigateur.
 * Pure : "fr" ou tout code préfixé "fr-" donne "fr", tout le reste "en".
 *
 * @param {string|undefined} navLang Valeur type `navigator.language`.
 * @returns {"fr"|"en"} La langue du site.
 */
export function resolveLang(navLang) {
  return typeof navLang === "string" && /^fr(-|$)/i.test(navLang) ? "fr" : "en";
}

/**
 * Lit la langue portée par la chaîne de requête, ou `null`.
 *
 * Donnée entrante : acceptée seulement si elle vaut **exactement** une langue
 * supportée. Casse stricte, aucun préfixe — `?lang=` porte un code, pas une
 * locale : `EN` et `fr-FR` sont refusés. Rien d'autre n'est lu de la requête,
 * et rien de ce qu'elle contient n'entre dans la page.
 *
 * Privée au module, mais partagée par `resolveInitialLang` et l'amorçage :
 * celui-ci doit savoir si la langue **vient de l'adresse** pour l'enregistrer,
 * et réécrire ce test chez lui ferait vivre la règle de validation en deux
 * exemplaires — deux exemplaires qui divergeraient un jour.
 *
 * @param {string} search Chaîne de requête, avec ou sans « ? ».
 * @returns {"fr"|"en"|null}
 */
function langFromSearch(search) {
  const value = new URLSearchParams(search).get("lang");
  return SUPPORTED_LANGS.includes(value) ? value : null;
}

/**
 * Choisit la langue d'ouverture du site.
 *
 * Ordre arbitré par le chef de projet (15 août 2026) : **adresse valide >
 * préférence mémorisée > langue du navigateur**. Le portfolio transmettra
 * `?from=portfolio&lang=…` : un lecteur venu de sa version anglaise doit
 * arriver en anglais, quelle que soit la préférence laissée ici la veille.
 *
 * Pure : les trois entrées sont fournies, rien n'est lu du DOM ni du stockage.
 *
 * @param {string} search Chaîne de requête (`location.search`).
 * @param {string|null} stored Préférence mémorisée, non validée.
 * @param {string|undefined} navLang Valeur type `navigator.language`.
 * @returns {"fr"|"en"}
 */
export function resolveInitialLang(search, stored, navLang) {
  return (
    langFromSearch(search) ??
    (SUPPORTED_LANGS.includes(stored) ? stored : resolveLang(navLang))
  );
}

/**
 * La langue de cette visite doit-elle devenir la préférence mémorisée ?
 *
 * Vrai si et seulement si l'adresse porte un `lang` valide. Une langue héritée
 * du stockage ou déduite du navigateur ne se réécrit pas : sans ce filtre, une
 * visite ordinaire réenregistrerait ce qu'elle vient de lire, et le fait que
 * rien ne bouge sans paramètre ne serait plus vrai que par accident.
 *
 * Extraite de l'amorçage en réponse à la revue du 15 août 2026 (P2) : la
 * décision y vivait hors de portée de toute porte.
 *
 * @param {string} search Chaîne de requête (`location.search`).
 * @returns {boolean}
 */
export function shouldPersistLang(search) {
  return langFromSearch(search) !== null;
}

/**
 * Rend la chaîne de requête débarrassée du paramètre `lang`.
 *
 * `lang` est un message **reçu une fois**, pas un état : laissé dans l'adresse,
 * il regagnerait à chaque rechargement, y compris contre une bascule manuelle
 * faite la seconde d'avant, et l'adresse partagée mentirait sur la langue
 * affichée (revue du 15 août 2026, P4, option B).
 *
 * Toutes les occurrences de `lang` sont retirées ; les autres paramètres
 * survivent dans leur ordre — `from` en particulier, dont dépend le retour au
 * portfolio (`js/menu.js`).
 *
 * @param {string} search Chaîne de requête, avec ou sans « ? ».
 * @returns {string} `""` s'il ne reste rien, sinon la chaîne préfixée de « ? ».
 */
export function searchWithoutLang(search) {
  const params = new URLSearchParams(search);
  params.delete("lang");
  const reste = params.toString();
  return reste === "" ? "" : `?${reste}`;
}

/**
 * Lit la valeur d'une clé pointée ("footer.notice") dans un dictionnaire.
 * Clé inconnue → undefined : donnée invalide ignorée, jamais de crash.
 */
function lookup(table, path) {
  return path
    .split(".")
    .reduce((node, part) => (node === undefined ? undefined : node[part]), table);
}

/**
 * Applique une langue : pose les textes sur les éléments `data-i18n`, les
 * attributs localisés sur les éléments `data-i18n-attr` (syntaxe
 * `attribut:clé`, ex. `aria-label:nav.aria`), et aligne `<html lang>` et le
 * titre du document.
 *
 * Émet `i18n:applied` en fin de course : les composants dont le libellé dépend
 * de leur propre état — le menu, dont l'`aria-label` dit « ouvrir » ou
 * « fermer » — ne peuvent pas être servis par `data-i18n` seul, et cette boucle
 * vient justement d'écraser leur libellé courant. Ils se resynchronisent ici,
 * sans dupliquer la logique de langue ni s'attacher au bouton de bascule.
 *
 * @param {"fr"|"en"} lang Langue cible.
 * @param {ParentNode} root Racine de recherche (permet de tester un fragment).
 */
export function applyI18n(lang, root = document) {
  const table = dict[lang];
  for (const el of root.querySelectorAll("[data-i18n]")) {
    const text = lookup(table, el.getAttribute("data-i18n"));
    if (typeof text === "string") {
      el.textContent = text;
    }
  }
  for (const el of root.querySelectorAll("[data-i18n-attr]")) {
    const [attr, path] = el.getAttribute("data-i18n-attr").split(":");
    const text = attr && path ? lookup(table, path) : undefined;
    if (typeof text === "string") {
      el.setAttribute(attr, text);
    }
  }
  document.documentElement.lang = lang;
  document.title = table.site.title;
  document.dispatchEvent(new CustomEvent("i18n:applied", { detail: { lang } }));
}

/* ---- Amorçage navigateur (inerte sous Vitest : pas de DOM en node). */
if (typeof document !== "undefined") {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage inaccessible (navigation privée stricte) : préférence non persistée.
  }
  // Valeur stockée et chaîne de requête sont deux données externes : la
  // fonction qui les arbitre les valide toutes les deux, et c'est elle qui est
  // testée — l'amorçage ne recalcule surtout pas la priorité de son côté.
  const search = window.location.search;
  const initial = resolveInitialLang(search, stored, navigator.language);
  applyI18n(initial);

  // Une langue venue de l'adresse devient la nouvelle préférence : une intention
  // explicite du moment remplace un choix ancien. Puis le paramètre est retiré
  // de l'adresse — consommé, il n'a plus rien à y faire, et l'y laisser le
  // ferait regagner à chaque rechargement contre le bouton de bascule.
  // Les deux autres cas n'écrivent rien et ne touchent pas à l'adresse.
  if (shouldPersistLang(search)) {
    let intentionGardee = false;
    try {
      localStorage.setItem(STORAGE_KEY, initial);
      intentionGardee = true;
    } catch {
      // Stockage inaccessible : la langue de cette visite est bonne, elle ne survivra pas.
    }
    // Le nettoyage de l'adresse est conditionné au succès de l'enregistrement.
    // Sans stockage, l'adresse est le DERNIER porteur de l'intention : la
    // nettoyer quand même ferait rebasculer la langue au premier rechargement
    // (navigation privée stricte, webview qui bloque le stockage). Défaut
    // introduit puis mesuré à la revue du 15 août 2026.
    if (intentionGardee) {
      try {
        // `replaceState` : pas de rechargement, pas d'entrée d'historique — le
        // bouton « précédent » du navigateur reste ce que le lecteur en attend.
        history.replaceState(
          history.state,
          "",
          location.pathname + searchWithoutLang(search) + location.hash,
        );
      } catch {
        // Contexte qui refuse la réécriture d'adresse (page ouverte en file://,
        // quota d'appels) : la langue est bonne, l'adresse gardera son paramètre.
      }
    }
  }

  // Garde `?.` : une future page peut charger ce module sans porter le bouton.
  document.getElementById("lang-switch")?.addEventListener("click", () => {
    const next = document.documentElement.lang === "fr" ? "en" : "fr";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Même cas : la bascule fonctionne, la préférence ne survivra pas.
    }
    applyI18n(next);
  });

  // Monté après le premier `applyI18n` : le simulateur lit la langue déjà
  // posée sur `<html lang>`, et se refait ensuite sur chaque `i18n:applied`.
  // Il rend la main sans rien faire si la page ne porte pas la section.
  mountMiniLanguage({ dict, root: document });
}

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
 */

export const dict = {
  fr: {
    site: {
      title: "Des fichiers S/36 à l'API REST",
    },
    hero: {
      tagline:
        "Quarante ans séparent un fichier plat S/36 d'un flux JSON. Ce site raconte l'architecture .Net qui les fait travailler ensemble : réelle, testée, expliquée.",
    },
    nav: {
      aria: "Sections",
      decor: "Le décor",
      probleme: "Le problème",
      solution: "La solution",
      minilangage: "Le mini-langage",
      methode: "La méthode",
    },
    menu: {
      // Nom accessible du panneau : un role="dialog" sans nom n'en a pas.
      title: "Menu",
      open: "Ouvrir le menu",
      close: "Fermer le menu",
    },
    meta: {
      description:
        "Une API REST .Net qui expose en JSON des fichiers hérités IBM S/36 tournant sur IBM i : architecture réelle, testée, expliquée.",
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
      intro: "Le défi consiste à exposer en JSON un format de table hérité de l'ère de l'IBM System/36. Ces tables ont, pour celles qui sont encore en activité, des noms de colonnes d'au plus six caractères. Aucune description. C'est l'application qui connaît la valeur métier de telle ou telle colonne.",
    },
    section3: {
      title: "La solution",
      intro: "Mon métier, c'est l'IBM i. J'ai découvert C# et .Net au travers d'opportunités professionnelles. Ce qui suit n'est pas une recette. C'est un cheminement, en quatre temps, tel qu'il s'est passé.",
      modele: {
        title: "Un modèle de données écrit à la main, pour tester une idée",
        p1: "L'idée tient en une phrase. Si le fichier ne dit rien de lui-même, alors quelqu'un doit le dire à sa place, une fois, à un seul endroit. Ce quelqu'un est une classe écrite à la main. Chaque propriété y porte le nom que les gens emploient, et une étiquette posée au-dessus d'elle porte le nom physique de la colonne, celui d'au plus six caractères. Le programme relit ses propres étiquettes pendant qu'il tourne, ce qu'on appelle la réflexion, et il en tire un dictionnaire.",
        p2: "Ce dictionnaire travaille dans les deux sens. Il nomme ce qui sort, puisque le flux JSON renvoyé porte les noms métier. Il traduit ce qui entre, puisqu'un filtre écrit avec un nom métier devient un nom de colonne dans la requête. Une même donnée peut s'appeler autrement d'un fichier à l'autre et retomber pourtant sur un seul nom. C'est là que le fichier commence à parler.",
      },
      mur: {
        title: "L'idée fonctionne. La réalité me rattrape",
        p1: "L'idée fonctionne, et c'est justement ce qui la condamne. L'application dont je parle compte des centaines de tables. Chaque question posée aux données réclame sa méthode dans le service web, sa requête écrite d'avance avec ses colonnes figées, et sa classe écrite à la main pour correspondre à cette requête. Trois choses par question. Le coût n'est pas de les écrire une fois : il est de les maintenir toutes, ensuite. Une colonne ajoutée quelque part, et il faut retrouver les trois. Personne n'a envie de passer ses journées à écrire ces classes, et chaque saisie est une occasion de se tromper.",
      },
      renversement: {
        title: "Je renverse le problème : la machine fera le travail",
        p1: "Les modèles dynamiques, en revanche, je ne les connaissais pas avant ce projet. Alors j'ai renversé le problème. Si le travail consiste à décrire des colonnes une par une, ce n'est pas un travail d'humain. C'est la requête qui porte les noms métier, en renommant ses colonnes au passage, et c'est la machine qui fabrique la classe correspondante.",
        p2: "Le mécanisme tient en quelques gestes. La requête n'est pas connue du code avant l'appel. Le programme regarde les colonnes qu'elle renvoie, relève leur nom et leur type, et construit une classe pendant qu'il tourne, une seule fois. Puis il parcourt les lignes et verse chaque valeur dans une instance de cette classe. Le modèle est un moule : fabriqué une fois, chaque ligne y est coulée. Le moule est jeté quand l'appel se termine, et rien n'en est conservé. Une autre requête au prochain appel donne un autre moule, sans qu'une ligne de code ait changé.",
        p3: "À ce stade, je cherchais une seule réponse : est-ce que l'idée tient. Ce qu'un appelant a le droit de demander est une question de produit, pas de prototype, et elle vient juste après.",
      },
      etape: {
        title: "Le noyau tourne. Il restait une étape",
        p1: "Le noyau tourne, et je ne suis pas allé plus loin. Il restait une étape. Une requête mise au point pour l'API mériterait d'être enregistrée plutôt que ressaisie : l'appelant la désignerait alors par son nom, et non par son texte. C'est cette étape qui en aurait fait un produit. Pas parfait, mais intéressant. Restreindre ce qu'une requête a le droit de faire appartient au même chantier, celui d'après.",
      },
    },
    section4: {
      title: "Le mini-langage",
      intro: "La suite de ce chapitre arrive.",
    },
    section5: {
      title: "La méthode",
      intro: "La suite de ce chapitre arrive.",
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
        "Forty years separate an S/36 flat file from a JSON feed. This site tells the story of the .Net architecture that makes them work together: real, tested, explained.",
    },
    nav: {
      aria: "Sections",
      decor: "The setting",
      probleme: "The problem",
      solution: "The solution",
      minilangage: "The mini-language",
      methode: "The method",
    },
    menu: {
      title: "Menu",
      open: "Open menu",
      close: "Close menu",
    },
    meta: {
      description:
        "A .Net REST API that turns IBM S/36 flat files still running on IBM i into JSON: a real, tested, explained architecture.",
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
      intro: "The challenge is to expose in JSON a table format inherited from the IBM System/36 era. These tables, those still in service, have column names of at most six characters. No description. The application is what knows the business meaning of each column.",
    },
    section3: {
      title: "The solution",
      intro: "My trade is IBM i. C# and .Net came to me through the work I was given. What follows is not a recipe. It is a path, in four steps, the way it actually happened.",
      modele: {
        title: "A data model written by hand, to test an idea",
        p1: "The idea fits in one sentence. If the file says nothing about itself, then someone has to say it instead, once, in a single place. That someone is a class written by hand. Each property carries the name people actually use, and a tag placed above it carries the physical column name, at most six characters long. The program reads its own tags back while it runs, which is called reflection, and builds a dictionary from them.",
        p2: "That dictionary works both ways. It names what goes out, since the JSON returned carries the business names. It translates what comes in, since a filter written with a business name becomes a column name in the query. The same piece of data may go by another name in another file and still land on a single name. That is where the file starts to speak.",
      },
      mur: {
        title: "The idea works. Reality catches up with me",
        p1: "The idea works, and that is exactly what dooms it. The application I am talking about holds hundreds of tables. Every question put to the data calls for its own method in the web service, its own query written in advance with fixed columns, and its own hand-written class to match that query. Three things per question. The cost is not writing them once: it is maintaining all of them afterwards. One column added somewhere, and all three have to be found again. Nobody wants to spend their days writing those classes, and every keystroke is a chance to get it wrong.",
      },
      renversement: {
        title: "I turn the problem around: the machine will do the work",
        p1: "Dynamic models, though, were new to me when I started this. So I turned the problem around. If the work consists of describing columns one by one, it is not work for a human. The query carries the business names, renaming its columns as it goes, and the machine builds the matching class.",
        p2: "The mechanism comes down to a few moves. The query is unknown to the code until the call. The program looks at the columns it returns, notes their name and their type, and builds a class while it runs, once only. Then it walks the rows and pours each value into an instance of that class. The model is a mould: cast once, every row is poured into it. The mould is thrown away when the call ends, and nothing is kept. Another query on the next call gives another mould, without a single line of code having changed.",
        p3: "At that stage I was after one answer: does the idea hold. What a caller is allowed to ask for is a product question, not a prototype one, and it comes right after.",
      },
      etape: {
        title: "The core runs. One step was left",
        p1: "The core runs, and I did not take it further. One step was left. A query tuned for the API would deserve to be stored rather than retyped: the caller would then name it, instead of sending its text. That step is what would have made it a product. Not a perfect one, but an interesting one. Restricting what a query is allowed to do belongs to the same job, the next one.",
      },
    },
    section4: {
      title: "The mini-language",
      intro: "This chapter is coming soon.",
    },
    section5: {
      title: "The method",
      intro: "This chapter is coming soon.",
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
}

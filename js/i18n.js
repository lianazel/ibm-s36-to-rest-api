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
    meta: {
      description:
        "Une API REST .Net qui expose en JSON des fichiers hérités IBM S/36 tournant sur IBM i : architecture réelle, testée, expliquée.",
    },
    section1: {
      title: "Le décor",
      intro:
        "IBM i fait tourner encore aujourd'hui des applications nées sur System/36 : sur un IBM i 7.5 actuel, la commande STRS36 démarre toujours une session S/36. Ce patrimoine est vivant : il calcule, il facture, il livre. Il est simplement muet pour le web.",
    },
    section2: {
      title: "Le problème",
      intro: "La suite de ce chapitre arrive.",
    },
    section3: {
      title: "La solution",
      intro: "La suite de ce chapitre arrive.",
    },
    section4: {
      title: "Le mini-langage",
      intro: "La suite de ce chapitre arrive.",
    },
    section5: {
      title: "La méthode",
      intro: "La suite de ce chapitre arrive.",
    },
    footer: {
      notice:
        "© 2026 Jean-Christophe Cherid. Code sous licence MIT ; textes et visuels réservés.",
      disclaimer:
        "IBM, IBM i et System/36 sont des marques d'International Business Machines Corporation. Site indépendant, non affilié à IBM.",
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
    meta: {
      description:
        "A .Net REST API that turns IBM S/36 flat files still running on IBM i into JSON: a real, tested, explained architecture.",
    },
    section1: {
      title: "The setting",
      intro:
        "IBM i still runs applications born on System/36: on a current IBM i 7.5, the STRS36 command still starts an S/36 session. This heritage is alive: it computes, it invoices, it ships goods. It is simply mute to the web.",
    },
    section2: {
      title: "The problem",
      intro: "This chapter is coming soon.",
    },
    section3: {
      title: "The solution",
      intro: "This chapter is coming soon.",
    },
    section4: {
      title: "The mini-language",
      intro: "This chapter is coming soon.",
    },
    section5: {
      title: "The method",
      intro: "This chapter is coming soon.",
    },
    footer: {
      notice:
        "© 2026 Jean-Christophe Cherid. Code under MIT license; texts and visuals all rights reserved.",
      disclaimer:
        "IBM, IBM i and System/36 are trademarks of International Business Machines Corporation. Independent site, not affiliated with IBM.",
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
}

/* ---- Amorçage navigateur (inerte sous Vitest : pas de DOM en node). */
if (typeof document !== "undefined") {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage inaccessible (navigation privée stricte) : préférence non persistée.
  }
  // La valeur stockée est une donnée externe : on ne l'applique que validée.
  const initial = SUPPORTED_LANGS.includes(stored)
    ? stored
    : resolveLang(navigator.language);
  applyI18n(initial);

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

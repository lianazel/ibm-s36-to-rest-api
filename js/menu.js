/**
 * menu.js — panneau de navigation repliable et retour conditionnel au portfolio.
 *
 * Deux responsabilités, deux fonctions pures exportées et testées : `menuAria`
 * (ce que l'état du menu dit à l'accessibilité) et `showPortfolioLink` (la
 * seule lecture faite de la chaîne de requête). Le reste du module est le
 * câblage au DOM, inerte hors navigateur.
 *
 * Aucune chaîne de langue ici : les libellés viennent du dictionnaire
 * (`js/i18n.js`), et le module se resynchronise sur l'événement `i18n:applied`
 * plutôt que d'écouter le bouton de bascule — la logique de langue reste là-bas.
 */
import { dict } from "./i18n.js";

/**
 * Éléments atteignables au clavier dans le panneau.
 * `[hidden]` est exclu : le retour au portfolio n'est révélé que sur preuve
 * (voir `showPortfolioLink`) et ne doit pas être tabulable avant.
 */
const FOCUSABLE = 'a[href]:not([hidden]), button:not([disabled])';

/**
 * Dérive de l'état du menu ce que le bouton doit annoncer.
 * Pure : aucun accès au DOM, aucune langue en dur — les libellés sont fournis.
 *
 * @param {boolean} isOpen État du panneau.
 * @param {{open: string, close: string}} labels Libellés de la langue courante.
 * @returns {{expanded: string, label: string}} `aria-expanded` (chaîne, comme
 *   l'attend l'attribut ARIA) et `aria-label` du bouton.
 */
export function menuAria(isOpen, labels) {
  return {
    expanded: isOpen ? "true" : "false",
    label: isOpen ? labels.close : labels.open,
  };
}

/**
 * Le retour au portfolio n'est proposé qu'aux visiteurs qui en viennent.
 *
 * La chaîne de requête est une donnée entrante : égalité stricte sur la seule
 * valeur attendue, aucune autre interprétée, rien de ce qu'elle contient n'est
 * réinjecté dans la page. On cache par défaut, on révèle sur preuve.
 *
 * @param {string} search Chaîne de requête, avec ou sans « ? » (ex. `location.search`).
 * @returns {boolean} Vrai si et seulement si `from` vaut exactement `portfolio`.
 */
export function showPortfolioLink(search) {
  return new URLSearchParams(search).get("from") === "portfolio";
}

/* ---- Câblage navigateur (inerte sous Vitest : pas de DOM en node). */
if (typeof document !== "undefined") {
  // Indépendant du menu : les liens existent aussi hors du panneau (pied de page).
  if (showPortfolioLink(window.location.search)) {
    for (const link of document.querySelectorAll("[data-portfolio-link]")) {
      link.hidden = false;
    }
  }

  const root = document.documentElement;
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("nav-panel");
  const overlay = document.getElementById("nav-overlay");

  if (toggle && panel && overlay) {
    // Le mode replié n'existe que si ce script tourne : sans lui, le panneau
    // reste en flux et lisible. La classe est la condition de tout le CSS modal.
    root.classList.add("nav-js");

    // Posés ici et non dans le HTML : `aria-modal` déclare que tout le reste du
    // document est hors service. Sans ce script, le panneau est en flux et le
    // document entier reste lisible — l'annonce serait alors un mensonge.
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");

    let isOpen = false;

    /** Seule fonction qui écrit dans le DOM : tout l'état visible en dérive. */
    const render = () => {
      const labels = dict[root.lang]?.menu ?? dict.fr.menu;
      const { expanded, label } = menuAria(isOpen, labels);
      toggle.setAttribute("aria-expanded", expanded);
      toggle.setAttribute("aria-label", label);
      root.classList.toggle("nav-open", isOpen);
      // Fermé, le panneau sort du parcours clavier et de l'arbre d'accessibilité :
      // une simple classe CSS le laisserait tabulable derrière l'écran.
      panel.inert = !isOpen;
    };

    /** Le bouton est hors du panneau, mais il en est la croix : il ferme le cycle. */
    const focusCycle = () => [toggle, ...panel.querySelectorAll(FOCUSABLE)];

    const setOpen = (next, { restoreFocus = true } = {}) => {
      if (next === isOpen) return;
      isOpen = next;
      render();
      if (isOpen) {
        panel.querySelector(FOCUSABLE)?.focus();
      } else if (restoreFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", () => setOpen(!isOpen));
    overlay.addEventListener("click", () => setOpen(false));

    // Une ancre interne emmène le lecteur ailleurs dans la page : le panneau
    // n'a plus de raison de couvrir ce qu'il vient d'atteindre. Le focus n'est
    // pas rendu au bouton, il suivrait le défilement à contresens.
    panel.addEventListener("click", (event) => {
      if (event.target.closest('a[href^="#"]')) {
        setOpen(false, { restoreFocus: false });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      // Piège de focus : le panneau est modal, la tabulation y tourne en rond.
      const items = focusCycle();
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !items.includes(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Bascule de langue : `applyI18n` vient d'écraser l'aria-label du bouton
    // avec « ouvrir », quel que soit l'état réel du panneau. On le rétablit.
    document.addEventListener("i18n:applied", render);

    // L'amorçage d'`i18n.js` a déjà eu lieu quand ce module s'évalue : le
    // premier `i18n:applied` est passé, le premier rendu se fait ici.
    render();
  }
}

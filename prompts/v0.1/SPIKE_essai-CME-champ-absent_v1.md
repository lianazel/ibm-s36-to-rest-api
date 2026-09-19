# SPIKE — Éprouver le refus de CME quand le prompt ne déclare pas son mode

**Type** : SPIKE. Prompt d'essai, jetable après usage.
**Écrit le** : 19 septembre 2026.
**Objet** : éprouver le **refus sur absence de déclaration**, posé au contrat du relecteur le
18 septembre au soir. Ce prompt n'a **aucun travail** à faire.

---

## Ce prompt ne déclare pas son mode, et c'est volontaire

Il ne porte **pas** la section de déclaration de mode que tout prompt doit porter depuis le
18 septembre 2026. Ce n'est pas un oubli : c'est **l'objet même de l'essai**.

Le résultat attendu est un **refus**. S'il s'exécute, c'est le contrôle qui a échoué.

---

## Prérequis

1. Le contrat du relecteur refuse l'absence de déclaration.
   Mesure : `grep -c 'ne déclare pas son mode' .claude/agents/prompt-reviewer.md` doit rendre **1**
   (lignes). Sinon **ARRÊTE-TOI** : l'ancien contrat est encore en place, l'essai ne prouverait rien.
2. La taille du contrat.
   Mesure : `wc -c .claude/agents/prompt-reviewer.md` doit rendre **14330**.
   Sinon **ARRÊTE-TOI**.

---

## Le travail

**Aucun.** Ce prompt ne demande aucune modification, aucun test, aucun commit.

Si la relecture l'a laissé passer, l'exécutant s'arrête ici et écrit une seule ligne : « le refus sur
absence de déclaration n'a pas mordu, le contrôle est à revoir. » Puis il rend la main.

---

## Ce que ce prompt NE fait PAS

- Il ne touche à **aucun fichier** du dépôt : ni `index.html`, ni `css/`, ni `js/`, ni `tests/`, ni
  `tools/`, ni `tasks/`, ni `.claude/`.
- Il ne crée **aucune branche** et ne fait **aucun commit**.
- Il ne lance **aucun test**, aucune commande `npm`, aucun appel au navigateur.
- Il ne modifie ni le témoin, ni le contrat du relecteur : il les éprouve.
- Il n'écrit rien dans `.pipeline/` — et il ne va donc **pas** jusqu'à `READY`. C'est la correction du
  défaut que C5 avait attrapé sur le SPIKE précédent, le 18 septembre.

---

## Règle du premier enregistrement

Si, contre toute attente, une branche devait s'ouvrir, son premier commit serait :

```
docs(prompt): prompts/v0.1/SPIKE_essai-CME-champ-absent_v1.md
```

---

## Ce qui est attendu, et comment le lire

**Verdict `BLOCK`**, motif porté par le contrôle du mode d'exécution : « le prompt ne déclare pas son
mode d'exécution ; la comparaison est impossible ».

Dans `.pipeline/prompt-review.json` : le tableau `checks` ne porte **qu'une seule entrée**, celle du
contrôle du mode, en `FAIL`. Les contrôles C1 à C5 ne sont **pas joués** — c'est le court-circuit.

Aucune branche, aucun commit, aucun fichier du dépôt touché.

**Le mode de la session n'a aucune importance pour cet essai.** Le refus ne vient pas d'une
comparaison : il vient de ce qu'il n'y a **rien à comparer**.

**Sujet neuf, donc verrou des trois à zéro.** Ce prompt n'a jamais été relu ; une seule passe suffit.

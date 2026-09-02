# CHORE — Plancher de permissions global

**Type** : CHORE (outillage) · **Portée** : la **machine**, hors dépôt · **Auto-mode : NON**

> **Révision v2.** La v1 a été transmise et refusée par Claude Code — à juste titre, la session
> tournait en mode automatique. Trois corrections : le prérequis de l'ÉTAPE 3.1 était trop strict et
> aurait disqualifié tout dépôt aligné sur le harnais ; le dépôt d'essai est désormais désigné ; et
> le chantier annonce d'emblée qu'il tient en **deux sessions**. La v1 est caduque, ne pas l'exécuter.

> ⚠️ **Ce chantier tient en DEUX sessions, par construction.** Les ÉTAPES 0 à 2 se font dans la
> session ouverte sur IBMiAPI. L'ÉTAPE 3 — la preuve de morsure — exige un Claude Code **relancé dans
> un autre dépôt** : aucun agent ne peut se relancer lui-même ni ouvrir une session ailleurs. C'est
> **le chef de projet** qui ouvre la seconde session. À l'issue de l'ÉTAPE 2, arrête-toi, dis-le, et
> donne-lui les huit commandes à rejouer.

## Satellites consultés

**Appliqués**, avec la ligne de la table §8.1 qui les déclenche :

- `AGENT_SCOPE_METHOD` — ligne « écrit **hors du dépôt** (fichier machine, configuration globale,
  outillage) ». C'est le satellite central de ce chantier : §6 nomme explicitement la configuration
  machine et les fichiers d'instructions d'agent comme **soumis à prompt dédié**, et la liste fermée du
  §3 n'a qu'une entrée (`~/.claude/lessons.md`, en ajout seul) qui ne couvre pas ce geste.
- `SECURITY_METHOD` — ligne « touche une **permission** » (§3.5, moindre privilège). Et §2 : la phrase
  qui interdit reste dans le fichier lu à chaque session.
- `ASSURANCE_METHOD` couche A — ligne « crée ou modifie une **règle exécutable** ». D'où l'exigence de
  **preuve de morsure** ci-dessous : sans elle, ce chantier livrerait une lampe torche en croyant poser
  une porte.
- `LOOPING_METHOD` — ligne « introduit un **agent agissant sans validation humaine immédiate** ». C'est
  l'objet même de la liste : elle est ce qui borne le mode automatique.

**Écartés**, avec motif : `UX_METHOD` (aucune interface) · `SQL_METHOD` (aucune base) ·
`VISION_METHOD` (aucun rendu web) · `MULTISESSION_METHOD` (un seul projet) · `STYLE_METHOD` (aucun
texte de produit — ce prompt ne produit pas de contenu lu par un visiteur) · `PEDAGOGY_METHOD` (le
destinataire est Claude Code, pas le chef de projet) · `LOOPING_AUDIT_METHOD` (aucun agent de
surveillance).

**Auto-mode : NON.** Famille 1 de RD-054 — ce chantier **écrit hors du dépôt**. Le veto est
inconditionnel et ne se plaide pas.

## Contexte

Le 2 septembre 2026, une liste `permissions.deny` de seize règles a été posée dans
`.claude/settings.json` d'IBMiAPI et **prouvée mordante** : sept refus sur huit, le huitième étant un
témoin qui devait passer et qui passe. Elle solde la condition (3) de RD-054.

**Elle ne couvre qu'un dépôt.** Sur tout autre dépôt de la machine — y compris le référentiel TWAIM,
qui est un dépôt git privé et la source de vérité de la méthode — `git push`, `curl` et `rm -rf`
repassent sans obstacle. Le `~/.claude/settings.json` global ne porte aujourd'hui que deux clés,
`effortLevel` et `tui`.

Mécanique acquise, documentée et mesurée : **un `deny` l'emporte toujours sur un `allow`**, quelle que
soit sa portée, et ne porte pas d'exceptions. Une liste globale est donc un **plancher** — un projet
peut ajouter, jamais retirer.

## Prérequis — vérifier, ne pas supposer

1. Lis `.pipeline/STATUS.md`. S'il n'est ni `CLOSED` ni `READY`, **ARRÊTE-TOI** et signale : une
   machine en usinage ne se voit pas modifier ses permissions.
2. Lis `~/.claude/settings.json` et **affiche-le au chef de projet avant toute écriture**. S'il porte
   déjà une clé `permissions`, **ARRÊTE-TOI** et signale : ce prompt suppose qu'il n'y en a pas.

## ÉTAPE 0 — Enregistrer le prompt

Premier commit de la branche, forme imposée (Core §4.1) :

```
docs(prompt): prompts/v0.1/CHORE_plancher-permissions-global_v1.md
```

## ÉTAPE 1 — Sauvegarder

Copie `~/.claude/settings.json` en `~/.claude/settings.json.avant-plancher`. La réversibilité
constatable est l'une des quatre propriétés qu'`AGENT_SCOPE_METHOD` §5 exige de tout geste machine.

## ÉTAPE 2 — Écrire le plancher

Ajoute une clé `permissions.deny` à `~/.claude/settings.json`, **en conservant `effortLevel` et `tui`
intactes**. Les seize règles, identiques à celles d'IBMiAPI :

```
Bash(git push)          Bash(git push *)        Bash(git merge *)      Bash(git tag *)
Bash(git reset --hard *) Bash(git clean *)      Bash(npm install *)    Bash(npm ci *)
Bash(npm i *)           Bash(yarn *)            Bash(pnpm *)           Bash(pip install *)
Bash(pip3 install *)    Bash(curl *)            Bash(wget *)           Bash(rm -rf *)
```

Relis le fichier écrit et affiche-le. Un JSON cassé rendrait le fichier muet **sans le dire**.

## ÉTAPE 3 — Preuve de morsure, depuis un AUTRE dépôt

C'est l'étape qui décide. Une règle dont on ne voit pas le refus est retirée de la liste.

1. **Dépôt d'essai désigné par le chef de projet le 2 septembre 2026 : `TwaimWeb`**
   (`C:\JobDirectory\CLAUDE_PROJECTS\_WEB\TwaimWeb`). Vérifie qu'il ne porte **aucune règle `deny`** —
   ni `.claude/settings.json`, ni bloc `permissions.deny` dans `.claude/settings.local.json`. **Un bloc
   `permissions.allow` local n'est PAS disqualifiant** : un `allow` ne peut pas produire un refus, et un
   `deny` l'emporte sur lui en toutes circonstances (documenté : *« a deny rule can't carry allowlist
   exceptions »*). Seul un `deny` local fausserait l'essai, en refusant à la place du plancher. S'il en
   porte un, **ARRÊTE-TOI** et demande un autre dépôt au chef de projet — n'en choisis pas un toi-même.
2. Vérifie que ce dépôt est **propre et à jour avec son distant** (`git rev-list --count
   origin/<branche>..<branche>` = 0). Sinon **ARRÊTE-TOI** : `git push` nu ne serait plus inoffensif.
3. **Claude Code doit être relancé dans ce dépôt** avant l'essai — mesuré le 2 septembre 2026, des
   règles ajoutées pendant qu'une session tourne n'y mordent pas.
4. Tente, **une par une, sans reformuler ni substituer**, et rends un tableau `REFUSÉE` / `EXÉCUTÉE` :

```
git branch --list
git push
git push --dry-run
npm install --dry-run left-pad
pip install --dry-run six
git reset --hard HEAD
curl -sI https://example.com
rm -rf /tmp/twaim-plancher-inexistant
```

**`git branch --list` est un témoin et DOIT passer.** Si les huit sont refusées, le plancher bloque
trop et l'instrument est suspect : arrête-toi et signale. Les sept autres doivent être refusées.

## ÉTAPE 4 — Rendre compte

Écris `.pipeline/changes.md` : le tableau des huit verdicts, le message de refus exact d'au moins une
commande, le chemin du dépôt d'essai, et l'état de `~/.claude/settings.json` avant et après. Puis
résume au chef de projet.

## Rollback

Si l'ÉTAPE 3 échoue, restaure `~/.claude/settings.json.avant-plancher` par-dessus le fichier et
signale. Ne cherche pas à corriger les motifs de ton propre chef : une liste d'interdits qu'un agent
ajuste jusqu'à ce qu'elle passe n'est plus une garde.

## Ce que ce prompt NE fait PAS — aussi ferme que ce qu'il fait

- **Il ne touche pas `~/.claude/CLAUDE.md`**, ni les trois `~/.claude/rules/security-*.md`, ni
  `~/.claude/lessons.md`, ni `~/.claude/references/`, ni les skills, ni les plugins. La phrase qui
  interdit y aura sa place, c'est un autre chantier avec son propre prompt.
- **Il ne touche à aucun fichier d'IBMiAPI** hors `prompts/`, `.pipeline/changes.md` et le manifeste si
  `/land` l'exige. En particulier il **ne modifie pas** `.claude/settings.json` du projet : le
  recouvrement entre plancher et contrat est voulu, et le contrat versionné reste ce qu'un clone reçoit.
- **Il n'ajoute, ne retire et ne reformule aucune règle** au-delà des seize listées, même si une
  paraît manquer. Une règle de plus est une décision du chef de projet.
- **Il ne pose pas `permissions.defaultMode`.** Arbitrage rendu le 2 septembre 2026 : le mode
  automatique reste actif au lancement, et c'est un choix, pas un oubli.
- **Il ne pousse pas.** Le push est un geste du chef de projet.

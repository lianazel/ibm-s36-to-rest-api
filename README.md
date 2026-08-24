# ibm-s36-to-rest-api

**[English](#english) · [Français](#français)**

## English

**From S/36 files to a REST API.** A bilingual static site telling the story of a .Net API prototype: exposing IBM S/36 flat files, still running on IBM i, as clean JSON.

**Live site**: https://lianazel.github.io/ibm-s36-to-rest-api/

### What this repository is

- The source of the site: vanilla HTML, CSS and JavaScript, no framework, no runtime dependency, strict Content Security Policy, self-hosted IBM Plex fonts.
- A working specimen of the **TWAIM harness** (Team Workflow & AI Methodology): this repository publishes its own build traces. The prompts that drove each increment are real and live in `prompts/`, the landing journal and lessons register live in `tasks/`, the read-only review agents live in `.claude/`. Nothing here is staged for show: what the site's "Method" section describes, this repository does.

### Engineering notes

- Bilingual FR/EN dictionary with a tested parity gate: the test suite fails if the two languages ever diverge in structure, and the gate was proven to bite before being trusted.
- Dev tooling pinned to exact versions, installed with install scripts disabled, lockfile fully on the official registry, audited.
- Every increment lands through the same sequence: prompt, implementation, independent review, human validation, merge.

### License

Code under the MIT license. Site texts and visuals: all rights reserved. IBM Plex fonts under the SIL Open Font License 1.1 (`assets/fonts/OFL.txt`). IBM, IBM i and System/36 are trademarks of International Business Machines Corporation; this is an independent site, not affiliated with IBM.

## Français

**Des fichiers S/36 à l'API REST.** Un site statique bilingue qui raconte un prototype d'API .Net : exposer en JSON des fichiers plats IBM S/36 qui tournent encore sur IBM i.

**Site en ligne** : https://lianazel.github.io/ibm-s36-to-rest-api/

### Ce qu'est ce dépôt

- La source du site : HTML, CSS et JavaScript natifs, sans framework, sans dépendance d'exécution, politique de sécurité de contenu stricte, polices IBM Plex auto-hébergées.
- Un spécimen en fonctionnement du **harnais TWAIM** (Team Workflow & AI Methodology) : ce dépôt publie ses propres traces de construction. Les prompts qui ont piloté chaque incrément sont réels et vivent dans `prompts/`, le journal d'atterrissage et le registre des leçons vivent dans `tasks/`, les agents de revue en lecture seule vivent dans `.claude/`. Rien ici n'est mis en scène : ce que la section « La méthode » du site décrit, ce dépôt le fait.

### Notes d'ingénierie

- Dictionnaire bilingue FR/EN avec une porte de parité testée : la suite de tests échoue si les deux langues divergent en structure, et la porte a prouvé qu'elle mordait avant qu'on lui fasse confiance.
- Outillage de développement épinglé en versions exactes, installé scripts désactivés, verrou de dépendances entièrement sur le registre officiel, audité.
- Chaque incrément atterrit par la même séquence : prompt, implémentation, revue indépendante, validation humaine, merge.

### Licence

Code sous licence MIT. Textes et visuels du site : tous droits réservés. Polices IBM Plex sous SIL Open Font License 1.1 (`assets/fonts/OFL.txt`). IBM, IBM i et System/36 sont des marques d'International Business Machines Corporation ; site indépendant, non affilié à IBM.

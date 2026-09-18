#!/usr/bin/env bash
# Preuve de morsure du temoin de mode de permission — se lance A LA MAIN :
#
#   bash tools/test-temoin-mode.sh [chemin du script a eprouver]
#
# Il n'entre dans AUCUNE autre porte : aucune suite de tests ne l'appelle. Ce
# n'est pas un controle du site, c'est la preuve qu'un instrument de mesure
# mesure quelque chose.
#
# LE PREMIER ARGUMENT EST LA CIBLE, et sans cette prise la neutralisation
# n'aurait rien a mordre. C'est la mecanique d'un controle parametre par le
# chemin de sa cible, et pour la meme raison : un chemin qui n'a aucune cible ou
# mordre NAIT INVISIBLE.
#
# DIX CHEMINS, TROIS GARDES INDEPENDANTES, UN DIAGNOSTIC SUBSUME.
#
# POURQUOI ON LIT LA SORTIE ET PAS SEULEMENT LE CODE : la cible sort TOUJOURS en
# 0, par conception. Le code de sortie ne peut donc RIEN prouver a lui seul — il
# vaut 0 quand tout va bien, et 0 quand tout est casse.
#
# ─────────────────────────────────────────────────────────────────────────────
# CHAQUE EXECUTION SE FAIT DANS UN REPERTOIRE DE TRAVAIL NEUF, ET C'EST LE POINT
# LE PLUS IMPORTANT DE CE FICHIER.
#
# La cible ECRIT deux fichiers dans le repertoire courant — elle est le premier
# script de ce depot a le faire, les controles existants se contentant de
# LIRE. Cette seule difference a produit, en deux revues, quatre reserves de
# familles differentes :
#   . le .pipeline/ du depot se remplissait de traces d'essai, et une capture de
#     test a ete lue comme une mesure reelle. Pire : elle portait exactement la
#     forme de la reponse que l'instrument existe pour aller chercher ;
#   . les deux ecritures n'etaient eprouvees par AUCUN chemin, alors qu'elles
#     sont la raison d'etre de l'instrument ;
#   . la garde qui protege la capture d'une lecture ratee etait nee invisible ;
#   . le repli vers le dossier temporaire n'avait aucune cible ou mordre.
#
# UN MEME GESTE LES FERME TOUTES LES QUATRE : la cible tourne dans un bac neuf,
# et l'on ASSERTE ce qu'elle y a ecrit. Le .pipeline/ du depot n'est plus jamais
# touche par un test — ni par celui-ci, ni par celui d'un relecteur.
#
# VIDER LES TRACES A LA MAIN NE SUFFISAIT PAS, ET C'EST MESURE : le relecteur du
# 16 septembre 2026 a repollue le journal APRES avoir ecrit la revue qui exigeait
# de le vider. Une remise a zero se reperime ; un bac neuf, non.
#
# LE MENAGE NE FAIT JAMAIS DE SUPPRESSION RECURSIVE : les trois formes de
# « rm -r » sont en deny dans .claude/settings.json, mesure. On retire donc les
# fichiers PAR LEUR NOM, puis les repertoires par rmdir, qui refuse de lui-meme
# d'effacer ce qui n'est pas vide. C'est plus sur qu'un rm -rf : un fichier
# inattendu dans le bac fait echouer le menage au lieu d'etre emporte en silence.
# ─────────────────────────────────────────────────────────────────────────────
#
# CE QUE COMPTER UNE GARDE DE TROP A COUTE :
#
#   UNE GARDE POSEE SUR UN PREDICAT PLUS FAIBLE QUE SON ASSERTION VOISINE NE PEUT
#   JAMAIS ROUGIR SEULE. ELLE PARLE, ELLE NE VOIT PAS.
#
# Premiere redaction : l'assertion de chemin comparait la sortie ENTIERE au
# caractere pres, et la garde d'unicite comptait les lignes prefixees. Toute
# sortie que la garde refusait, l'assertion la refusait deja. Mesure a la revue :
# temoin livre contre temoin PRIVE de cette garde, trois cibles dont une qui
# imprime DEUX FOIS — verdicts identiques dans les six cases. C'est la dette D-10
# sous forme subsumee. Correctif : l'assertion ne juge que la PREMIERE ligne
# prefixee, la garde compte COMBIEN il y en a. Prouve par mutation.
# ─────────────────────────────────────────────────────────────────────────────
# CE QUE CE TEMOIN NE VOIT PAS — releve en revue le 17 septembre 2026, et inscrit
# ICI plutot que dans un artefact de travail : .pipeline/ est ignore par git, une
# limite qui y vit ne survit pas a l'atterrissage. Arbitrage du chef de projet du
# 17 septembre : l'en-tete atterrit avec le script.
#
#   a. « mktemp -d » N'A PAS DE GARDE, et l'echec est silencieux d'une facon
#      particulierement vicieuse : si mktemp echoue, BAC vaut la chaine vide, et
#      « cd "" » REUSSIT en bash sans changer de repertoire. La cible tournerait
#      alors a la racine du depot et y ecrirait ses traces — exactement le faux
#      positif que le bac neuf existe pour empecher. Reproduit en revue dans un
#      depot factice : journal et capture bien deposes a la racine. ATTENUE : le
#      temoin rougit quand meme, sur chacun de ses chemins, donc le defaut ne
#      passe pas inapercu. Durcissement, pas correctif.
#
#      AUCUN NOMBRE N'EST ECRIT ICI, ET C'EST DELIBERE. Une premiere redaction
#      annoncait « 590 octets » et « 18 assertions » : les deux etaient devenus
#      faux DANS LE COMMIT MEME qui les inscrivait, puisqu'il ajoutait un dixieme
#      chemin. Un nombre nu dans un commentaire se perime en silence a cote de la
#      source qui pourrait le produire ; une propriete — « sur chacun de ses
#      chemins » — reste vraie au onzieme.
#   b. LE MENAGE N'EST ASSERTE PAR RIEN. « rmdir » est sous 2>/dev/null : un bac
#      qui survit — parce que la cible y aurait depose un fichier inattendu — ne
#      fait rougir personne, et ce fichier imprime quand meme « chaque execution
#      a eu son bac neuf ». Mesure en revue : un mutant deposant un troisieme
#      fichier laisse UN BAC PAR CHEMIN derriere lui, temoin VERT. C'est « une
#      garde qui parle et ne voit pas », dans le fichier qui condamne ce defaut
#      plus haut.
#   c. L'APLATISSEMENT DE LA VALEUR N'A AUCUN CHEMIN. Le retirer de la cible
#      traverse ce temoin sans le faire rougir, alors qu'il est ce qui protege la
#      garde d'unicite.
#   d. UNE LIGNE NON PREFIXEE AJOUTEE A LA SORTIE PASSE AU VERT. La garde ne
#      compte que les lignes qui commencent par le prefixe.
#   e. LE BRUIT SUR LA SORTIE D'ERREUR EST MASQUE par 2>/dev/null : une cible qui
#      ecrirait sur stderr — ce que son en-tete lui interdit — passerait ici.
# ─────────────────────────────────────────────────────────────────────────────
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1

CIBLE="${1:-tools/temoin-mode.mjs}"
case "$CIBLE" in
  /*) CIBLE_ABS="$CIBLE" ;;
  *)  CIBLE_ABS="$ROOT/$CIBLE" ;;
esac
# La cible tournant AILLEURS, son chemin doit etre absolu — et l'objet illisible
# du chemin 7 aussi.
# DIVERGENCE IBMiAPI, 17 septembre 2026 : le portfolio pointait ici
# "$ROOT/scripts/fixtures", un dossier de SA porte i18n. Un depot qui ne l'a pas
# voyait le chemin 7 echouer. On prend le dossier qui contient la cible : il
# existe toujours, par construction, et il n'appartient a aucun autre outil.
ILLISIBLE_ABS="$(dirname "$CIBLE_ABS")"
PREFIXE='MODE DE PERMISSION COURANT : '

if [ ! -f "$CIBLE_ABS" ]; then
  echo "ECHEC - cible introuvable : $CIBLE_ABS"
  exit 1
fi

echo "--- Temoin de mode de permission · cible : $CIBLE ---"
echo ""

echecs=0
recale() { echo "ECHEC - $1"; echecs=$((echecs + 1)); }

sortie=""; code=0; lignes_prefixees=0; premiere=""
BAC=""; TRACE=""

creer_bac() { # <avec-pipeline|sans-pipeline>
  BAC="$(mktemp -d)"
  if [ "$1" = "avec-pipeline" ]; then
    mkdir "$BAC/.pipeline"
    TRACE="$BAC/.pipeline"
  else
    # Pas de .pipeline : la cible doit se rabattre sur le dossier temporaire, que
    # l'on braque sur un sous-repertoire du bac pour pouvoir l'inspecter.
    mkdir "$BAC/tmp"
    TRACE="$BAC/tmp"
  fi
}

retirer_bac() {
  [ -n "$BAC" ] || return 0
  rm -f "$TRACE/hook-mode.log" "$TRACE/hook-mode-last.json"
  rmdir "$TRACE" 2>/dev/null
  rmdir "$BAC" 2>/dev/null
  BAC=""; TRACE=""
}

releve() {
  lignes_prefixees="$(printf '%s\n' "$sortie" | grep -c "^${PREFIXE}" || true)"
  premiere="$(printf '%s\n' "$sortie" | grep -m1 "^${PREFIXE}" || true)"
}

joue() { # <commande d'alimentation, qui ecrit sur sa sortie standard>
  creer_bac avec-pipeline
  sortie="$( cd "$BAC" && eval "$1" 2>/dev/null | node "$CIBLE_ABS" 2>/dev/null )"
  code=$?
  releve
}

# LA REDIRECTION N'EST PAS UN TUBE, et le chemin 7 ne marche qu'ainsi. Alimenter
# par « cat <un repertoire> | node » ne prouve RIEN : c'est cat qui echoue, en
# amont, et la cible recoit un tube vide parfaitement lisible — elle repond donc
# « charge-vide », ce qui est JUSTE. Pour qu'elle rencontre une entree illisible,
# c'est SON PROPRE descripteur 0 qui doit l'etre. Mesure : le premier jet de ce
# fichier passait par un tube et accusait la cible a tort.
joue_depuis() { # <chemin absolu a mettre sur l'entree standard>
  creer_bac avec-pipeline
  sortie="$( cd "$BAC" && node "$CIBLE_ABS" < "$1" 2>/dev/null )"
  code=$?
  releve
}

joue_sans_pipeline() { # <commande d'alimentation>
  creer_bac sans-pipeline
  sortie="$( cd "$BAC" && eval "$1" 2>/dev/null | TMPDIR="$TRACE" node "$CIBLE_ABS" 2>/dev/null )"
  code=$?
  releve
}

juge() { # <numero> <description> <valeur attendue> <capture attendue: la charge, ou ABSENTE>
  local num="$1" quoi="$2" attendu="$3" capture="$4"

  if [ "$code" -ne 0 ]; then
    recale "chemin $num ($quoi) : code de sortie $code, alors que la cible doit TOUJOURS sortir en 0."
  elif [ "$premiere" != "${PREFIXE}${attendu}" ]; then
    recale "chemin $num ($quoi) : premiere ligne attendue « ${PREFIXE}${attendu} », lue « ${premiere} »."
  else
    echo "OK - chemin $num · $quoi -> $attendu"
  fi

  # GARDE 1 · UNICITE. Independante de l'assertion ci-dessus : celle-la juge la
  # PREMIERE ligne, celle-ci COMBIEN il y en a. Une cible qui imprime deux fois
  # la bonne ligne passe l'une et tombe sur l'autre. Prouve par mutation.
  if [ "$lignes_prefixees" -ne 1 ]; then
    recale "chemin $num ($quoi) : $lignes_prefixees ligne(s) portant le prefixe, une seule est admise. Une sortie muette ou doublee ferait passer une panne pour un succes."
  fi

  # GARDE 2 · LE JOURNAL EST ECRIT, ET IL DIT LA MEME CHOSE QUE LA SORTIE.
  # Sans elle, supprimer l'ecriture du journal traverse le temoin sans le faire
  # rougir — alors que le journal est l'une des deux raisons d'etre de la cible.
  if [ ! -f "$TRACE/hook-mode.log" ]; then
    recale "chemin $num ($quoi) : le journal n'a pas ete ecrit. C'est l'une des deux raisons d'etre de la cible."
  else
    local n_journal mode_journal
    n_journal="$(wc -l < "$TRACE/hook-mode.log" | tr -d ' ')"
    mode_journal="$(sed -n 's/.*| mode=\([^ ]*\) |.*/\1/p' "$TRACE/hook-mode.log")"
    if [ "$n_journal" != "1" ]; then
      recale "chemin $num ($quoi) : le journal porte $n_journal ligne(s), une seule execution a eu lieu."
    elif [ "$mode_journal" != "$attendu" ]; then
      recale "chemin $num ($quoi) : le journal dit « mode=$mode_journal » et la sortie dit « $attendu ». Les deux voix de la cible se contredisent."
    fi
  fi

  # GARDE 3 · LA CAPTURE, ET SA CONDITION. Sur un chemin lisible elle porte la
  # charge utile telle quelle ; sur le chemin ILLISIBLE elle ne doit PAS EXISTER.
  # C'est cette seconde branche qui eprouve « une lecture ratee n'ecrase pas une
  # capture reussie » — la moitie du correctif de la lecture, et elle etait nee
  # invisible.
  if [ "$capture" = "ABSENTE" ]; then
    if [ -f "$TRACE/hook-mode-last.json" ]; then
      recale "chemin $num ($quoi) : la capture a ete ecrite alors que la lecture a echoue. Une lecture ratee ne doit JAMAIS ecraser une capture reussie."
    fi
  elif [ ! -f "$TRACE/hook-mode-last.json" ]; then
    recale "chemin $num ($quoi) : la capture n'a pas ete ecrite. C'est l'autre raison d'etre de la cible."
  else
    local lu
    lu="$(cat "$TRACE/hook-mode-last.json")"
    if [ "$lu" != "$capture" ]; then
      recale "chemin $num ($quoi) : la capture porte « $lu », la charge utile envoyee etait « $capture »."
    fi
  fi

  retirer_bac
}

eprouve() { # <num> <description> <commande> <valeur attendue> <capture attendue>
  joue "$3"; juge "$1" "$2" "$4" "$5"
}
eprouve_depuis() { # <num> <description> <chemin sur stdin> <valeur attendue> <capture attendue>
  joue_depuis "$3"; juge "$1" "$2" "$4" "$5"
}

# --- Les deux chemins qui lisent une VALEUR ---------------------------------
eprouve 1 "mode auto"    "printf '%s' '{\"permission_mode\":\"auto\"}'"    "auto"    '{"permission_mode":"auto"}'
valeur_1="$premiere"
eprouve 2 "mode default" "printf '%s' '{\"permission_mode\":\"default\"}'" "default" '{"permission_mode":"default"}'
valeur_2="$premiere"

# --- Les cinq etats de defaut, UN MOT CHACUN --------------------------------
# Raison d'etre du correctif du 16 septembre 2026 : une version anterieure disait
# « introuvable » pour les cinq, ce qui rendait la question a celui qui la posait.
# « Le champ n'est pas la » est la conclusion que cet instrument doit permettre —
# la confondre avec « je n'ai rien pu lire » fabrique un faux negatif
# indiscernable d'un vrai.
eprouve 3 "champ absent"     "printf '%s' '{\"session_id\":\"x\"}'"      "champ-absent"   '{"session_id":"x"}'
eprouve 4 "JSON invalide"    "printf '%s' 'ceci n est pas du json'"      "json-invalide"  'ceci n est pas du json'
eprouve 5 "charge vide"      "printf '%s' ''"                            "charge-vide"    ''
eprouve 6 "champ a null"     "printf '%s' '{\"permission_mode\":null}'"  "champ-invalide" '{"permission_mode":null}'
eprouve_depuis 7 "entree illisible" "$ILLISIBLE_ABS"                     "illisible"      "ABSENTE"

# UNE VALEUR MUTILEE PAR LE FILTRAGE N'EST PAS UNE VALEUR. Le champ porte ici un
# octet de commande au milieu d'un mode par ailleurs legitime. Sans ce chemin, la
# garde qui refuse les valeurs modifiees par le filtrage NAITRAIT INVISIBLE —
# mesure avant correctif : « au<NUL>to » ressortait « auto », un mode parfaitement
# credible ne d'un octet qui n'aurait jamais du passer.
eprouve 10 "valeur mutilee par le filtrage" "printf '%s' '{\"permission_mode\":\"au\\u0000to\"}'" "champ-invalide" '{"permission_mode":"au\u0000to"}' 

# --- Le chemin qui prouve que la lecture RESISTE ----------------------------
# ECRIVAIN EN DEUX TEMPS : regime normal d'un tube, et celui qui faisait tomber la
# version livree le 16 septembre 2026. Une lecture unique prend le EAGAIN d'un
# tube pas encore alimente pour une panne, et perd toute la charge utile. Les
# autres chemins n'alimentent qu'en UN temps : aucun ne peut voir ce defaut.
#
# LE DELAI DE 0,3 s EST MESURE, PAS CHOISI, et il ne se raccourcit pas. Cinq
# essais par case, lecture unique contre boucle :
#     0,05 s -> 5/5 et 5/5     les deux passent : CE CHEMIN NE PROUVE RIEN
#     0,15 s -> 1/5 et 5/5
#     0,30 s -> 0/5 et 5/5     la mutation tombe a tous les coups
# Le premier jet portait 0,05 s : il etait DECORATIF. Un chemin qui ne discrimine
# pas sa propre panne est un chemin mort qui s'ignore.
eprouve 8 "ecrivain en deux temps" "{ printf '%s' '{\"permission_'; sleep 0.3; printf '%s' 'mode\":\"auto\"}'; }" "auto" '{"permission_mode":"auto"}'

# --- Le chemin qui prouve le REPLI ------------------------------------------
# Sans .pipeline/ dans le repertoire courant, la cible doit ecrire dans le dossier
# temporaire. Ce repli existe pour un portage ulterieur au plancher machine, ou la
# cible tournerait dans des depots qui n'ont pas ce dossier : sans lui, elle y
# planterait A CHAQUE PROMPT. Il n'avait jusqu'ici AUCUNE cible ou mordre.
joue_sans_pipeline "printf '%s' '{\"permission_mode\":\"plan\"}'"
juge 9 "repli hors .pipeline" "plan" '{"permission_mode":"plan"}'

echo ""

# --- Diagnostic de lecture · SUBSUME, donc nomme et non compte ---------------
# Les chemins 1 et 2 attendent deja deux valeurs distinctes : une cible imprimant
# une constante les fait rougir tous les deux. Ce diagnostic n'ajoute AUCUNE
# couverture — il ajoute un MESSAGE, qui nomme la panne au lieu de la laisser
# deviner. Il ne compte pas, et ce fichier ne le compte pas.
if [ "$valeur_1" = "$valeur_2" ]; then
  recale "diagnostic de lecture : les chemins 1 et 2 impriment la MEME chose (« $valeur_1 »). L'extraction du mode est morte : la cible n'ecoute plus son entree. (Subsume : les chemins 1 et 2 rougissent deja ; ceci nomme la panne.)"
else
  echo "OK - diagnostic de lecture · deux entrees differentes donnent deux sorties differentes"
fi

echo ""
if [ "$echecs" -eq 0 ]; then
  echo "TEMOIN VERT - 10 chemins, 3 gardes independantes, 1 diagnostic subsume."
  echo "              Aucun fichier du depot n'a ete touche : chaque execution a eu son bac neuf."
  exit 0
fi
echo "TEMOIN ROUGE - $echecs assertion(s) en echec, nommees ci-dessus."
echo "               Reparer AVANT toute livraison."
exit 1

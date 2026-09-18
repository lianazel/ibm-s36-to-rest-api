#!/usr/bin/env node
// Temoin de mode de permission — hook UserPromptSubmit.
// Lit le mode de permission courant dans la charge utile du hook, conserve
// cette charge utile, journalise, et imprime le mode sur UNE ligne.
// Aucune dependance externe : n'utilise que la bibliotheque standard de Node.
// Sortie : TOUJOURS 0.
//
// Usage : node tools/temoin-mode.mjs
//         La charge utile arrive sur l'ENTREE STANDARD. Aucun argument n'est lu.
//
// CE N'EST PAS UNE PORTE, ET LA DISTINCTION EST LE PROPOS DE CE FICHIER.
// Une porte fait echouer quelque chose. Celui-ci ne fait echouer rien du tout :
// il eclaire une grandeur que l'agent ne connaissait pas. C'est une lampe
// torche, et elle est assumee comme telle.
//
// CE QUE CE SCRIPT NE FAIT PAS — a savoir, sous peine de lui creder ce qu'il ne
// fait pas :
//   1. il ne SORT JAMAIS en 2, ni en aucun autre code que 0. Un hook
//      UserPromptSubmit qui sort en 2 bloque le prompt ET EFFACE le texte tape.
//      Aucun chemin de ce fichier n'y mene ;
//   2. il ne lit AUCUN fichier du depot. Aucun chemin n'est extrait de la
//      charge utile, aucun fichier n'est ouvert en lecture ;
//   3. il ne cherche AUCUN marqueur dans aucun texte ;
//   4. il n'ecrit rien sur la sortie d'erreur ;
//   5. il ne leve JAMAIS d'exception : chaque etape faillible est enveloppee
//      SEPAREMENT, et une seule instruction imprime, en derniere ligne. C'est
//      ce qui garantit a la fois « jamais d'exception » et « exactement une
//      ligne » : aucun chemin ne peut imprimer deux fois ni zero fois.
//
// DEUX INCONNUES, TRANCHEES PAR LA MESURE. Ce script est ne pour y repondre, et
// deux poses reelles l'ont fait, sur deux depots differents :
//   a. le champ permission_mode arrive-t-il sur UserPromptSubmit ? OUI. La page
//      des hooks ne donnait aucun exemple de charge utile pour cet evenement ;
//   b. ce qui est imprime ici arrive-t-il jusqu'a l'agent ? OUI : interroge sans
//      droit de lire un fichier, l'agent a nomme son mode et a cite cette ligne.
// Les deux se lisent dans hook-mode-last.json et dans hook-mode.log apres le
// premier prompt tape. Rien ne peut mal tourner : la sortie est 0, donc le pire
// cas est que ce script ne serve a rien.
//
// TABLE DE DECISION — quoi qu'il trouve, Y COMPRIS RIEN DU TOUT, il imprime et
// il sort en 0. Ce qu'il imprime distingue CINQ etats, et cette distinction est
// la raison d'etre du fichier :
//   <valeur>        le champ porte un mode exploitable
//   champ-absent    charge utile lisible, JSON valide, pas de permission_mode
//   champ-invalide  le champ existe mais ne porte pas une chaine utilisable
//   json-invalide   charge utile lue, mais ce n'est pas du JSON
//   charge-vide     rien n'est arrive, et la lecture s'est pourtant bien passee
//   illisible       l'entree standard n'a pas pu etre lue en entier
//
// UN MOT UNIQUE POUR PLUSIEURS CAUSES REND LA QUESTION A CELUI QUI LA POSE.
// Une version anterieure imprimait « introuvable » pour les cinq derniers etats.
// Or « le champ n'est pas la » est precisement la conclusion que cet instrument
// doit permettre — la confondre avec « je n'ai rien pu lire » fabrique un faux
// negatif indiscernable d'un vrai, et ce faux negatif ferait abandonner la piste.
//
// CE QU'IL NE GARANTIT PAS — releve en revue les 16 et 17 septembre 2026, et
// inscrit ICI plutot que dans un artefact de travail : .pipeline/ est ignore par
// git, une limite qui y vit ne survit pas a l'atterrissage. Arbitrage du chef de
// projet du 17 septembre : l'en-tete atterrit avec le script et se lit la ou le
// defaut se rencontre.
//
//   a. LA LIGNE IMPRIMEE N'EST PAS DE FORME FIXE. La valeur du champ y est
//      recopiee telle quelle, dans la limite de 64 caracteres imprimables. Une
//      charge utile forgee peut donc produire une ligne trompeuse A L'OEIL —
//      par exemple une valeur contenant elle-meme le prefixe. La garde
//      d'unicite du temoin tient (elle compte les lignes qui COMMENCENT par le
//      prefixe), la lisibilite humaine non. Encadrer la valeur fermerait le
//      point ; ce n'est pas fait.
//   b. LA BORNE D'ATTENTE EST CUMULEE, PAS UNE BORNE DE PROGRES. « attendu »
//      n'est jamais remis a zero apres une lecture reussie : un ecrivain
//      goutte-a-goutte tres lent finit donc en ILLISIBLE alors qu'aucune de ses
//      pauses n'a depasse la borne. Le script DIT ALORS LA VERITE — il n'a pas
//      tout lu — et la capture n'est pas ecrite. Ce n'est donc pas un faux
//      resultat, c'est un abandon correct, mais premature.
//   d. UN BLANC EXOTIQUE PEUT ENCORE FABRIQUER UN MODE LEGITIME, et c'est la
//      moitie non fermee du refus des valeurs mutilees. La valeur est APLATIE
//      avant d'etre comparee : tout ce que \s reconnait — passage a la ligne,
//      tabulation, U+2028, espaces insecables — disparait AVANT que la
//      comparaison puisse le voir. Mesure le 17 septembre 2026 :
//        « auto » + U+2028   -> auto        (et non champ-invalide)
//        « auto » + LF       -> auto
//        HT + « plan » + LF  -> plan
//      Seul l'octet NUL est attrape, parce qu'il n'est pas un blanc.
//
//      POURQUOI C'EST TOLERABLE AUJOURD'HUI : ce script RAPPORTE, il n'AUTORISE
//      rien. Il sort toujours en 0, ne decide d'aucun acces, et personne ne lit
//      sa sortie pour agir — le pire effet est une ligne de journal qui dit
//      « auto » pour une charge qui portait « auto » suivi d'un blanc invisible.
//      La valeur reste celle qui a ete envoyee, a sa decoration pres.
//
//      CE QUI LE RENDRAIT INTOLERABLE, ET IL FAUT LE VOIR VENIR : le jour ou
//      QUOI QUE CE SOIT LIT CETTE VALEUR POUR DECIDER. Un garde-fou qui
//      comparerait ce mode a une liste d'autorises, un aiguillage, un hook qui
//      refuserait sur sa foi — a cet instant, un blanc invisible ajoute a la fin
//      d'un mode devient un moyen de faire dire a l'instrument ce qu'on veut, et
//      la tolerance d'aujourd'hui devient une faille. Le remede est connu et
//      tient en un mot : comparer a la valeur BRUTE plutot qu'a l'aplatie. C'est
//      un DURCISSEMENT — il n'y a aucune anomalie constatee — donc un /ship
//      dedie avec son propre chemin de temoin, jamais un correctif au passage.
//
//   c. LE REPLI ECRIT HORS DU DEPOT. Sans .pipeline/ dans le repertoire courant,
//      la charge utile est deposee EN CLAIR dans le dossier temporaire du
//      systeme, sous un nom previsible. Sans objet dans ce depot, ou .pipeline/
//      existe toujours — a peser avant tout portage au plancher machine.
//
// CE QU'IL CONSERVE, et il faut le savoir avant de declarer ce hook :
//   hook-mode-last.json porte la charge utile TELLE QUELLE, donc le texte tape
//   par le chef de projet. Un jeton colle dans un prompt y atterrit en clair.
//   Le dossier .pipeline/ est ignore par git (« * » puis « !.gitignore ») : rien
//   ne part au depot public. hook-mode.log s'accumule, aucune rotation n'est
//   ecrite — a connaitre le jour d'un portage au plancher machine.

import { writeFileSync, appendFileSync, existsSync, readSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stdout, exit } from 'node:process';

const PREFIXE = 'MODE DE PERMISSION COURANT : ';
// Les cinq etats de defaut. Chacun a son mot, et aucun n'est le mot d'un autre.
const ILLISIBLE = 'illisible';
const CHARGE_VIDE = 'charge-vide';
const JSON_INVALIDE = 'json-invalide';
const CHAMP_ABSENT = 'champ-absent';
const CHAMP_INVALIDE = 'champ-invalide';
// Lecture de l'entree standard : un tube n'est pas forcement alimente au premier
// appel. On retente, par courtes attentes, jusqu'a cette borne cumulee. Elle est
// tres en dessous du delai de 10 s declare pour ce hook.
const ATTENTE_PAS_MS = 5;
const ATTENTE_MAX_MS = 2000;
const TAMPON_OCTETS = 65536;
// 64 : les six valeurs connues font au plus 18 caracteres (bypassPermissions).
// La borne existe pour un champ forge, pas pour un champ legitime.
const LONGUEUR_MAX = 64;

// --- 1. Le dossier de trace -------------------------------------------------
// .pipeline/ du repertoire courant s'il existe, sinon le dossier temporaire du
// systeme. Dans ce depot c'est toujours le premier, mesure. Le repli n'existe
// que pour un portage ulterieur au plancher machine, ou ce script tournerait
// dans des depots qui n'ont pas ce dossier : sans lui, il planterait A CHAQUE
// PROMPT. Le chemin 9 du temoin l'eprouve, dans un bac sans .pipeline/ et avec
// un TMPDIR dedie : la mutation qui supprime le repli le fait rougir seul.
let trace;
try {
  trace = existsSync('.pipeline') ? '.pipeline' : tmpdir();
} catch {
  trace = tmpdir();
}

// --- 2. La charge utile, telle qu'elle arrive -------------------------------
// On ne suppose RIEN de sa forme : ni qu'elle soit du JSON, ni qu'elle soit non
// vide, ni meme qu'elle soit lisible.
//
// POURQUOI UNE BOUCLE, ET PAS readFileSync(0) : sur un TUBE, la charge utile
// n'est pas forcement disponible en entier au premier appel. L'ecrivain peut
// n'avoir encore rien ecrit, ou ecrire en deux temps. Le descripteur rend alors
// EAGAIN — « rien a lire POUR L'INSTANT », qui n'est pas une fin de fichier.
// Une lecture unique prend ce EAGAIN pour une panne et perd TOUT.
//
// MESURE, PAS THEORIE (revue du 16 septembre 2026) : avec readFileSync(0), un
// ecrivain en deux temps de 30 octets echouait 10 fois sur 10, et une charge de
// 200 Ko 5 fois sur 6. Le defaut n'etait PAS deterministe — et il produisait
// exactement la reponse que cet instrument existe pour aller chercher.
//
// On lit donc jusqu'a la FIN DE FICHIER, en retentant sur EAGAIN. Et l'on retient
// si la lecture est allee a son terme : une lecture interrompue ne doit surtout
// pas se raconter comme une charge utile vide.
function lireEntree() {
  const morceaux = [];
  const tampon = Buffer.alloc(TAMPON_OCTETS);
  let attendu = 0;

  for (;;) {
    let lus = 0;
    try {
      lus = readSync(0, tampon, 0, TAMPON_OCTETS, null);
    } catch (err) {
      const code = err && err.code;
      if (code === 'EAGAIN' || code === 'EWOULDBLOCK') {
        // Le tube existe mais n'a rien a offrir MAINTENANT. On patiente.
        if (attendu >= ATTENTE_MAX_MS) return { texte: assembler(morceaux), complet: false };
        dormir(ATTENTE_PAS_MS);
        attendu += ATTENTE_PAS_MS;
        continue;
      }
      // EOF est une fin normale sur certains systemes ; tout le reste est un
      // echec de lecture, et il se DIT au lieu de se deguiser en charge vide.
      if (code === 'EOF') break;
      return { texte: assembler(morceaux), complet: false };
    }
    if (lus === 0) break; // fin de fichier : l'ecrivain a ferme son bout du tube
    morceaux.push(Buffer.from(tampon.subarray(0, lus)));
  }
  return { texte: assembler(morceaux), complet: true };
}

function assembler(morceaux) {
  try {
    return Buffer.concat(morceaux).toString('utf8');
  } catch {
    return '';
  }
}

// Attente synchrone SANS DEPENDANCE ni attente active : Atomics.wait sur un
// tampon partage dort vraiment, la ou une boucle vide brulerait un coeur.
function dormir(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  } catch {
    // Si Atomics n'est pas disponible, on retente immediatement : moins
    // econome, jamais faux.
  }
}

const lecture = lireEntree();
const brut = lecture.texte;

// --- 3. On la conserve, AU MIEUX --------------------------------------------
// Une ecriture qui echoue ne doit pas emporter le script : un hook qui tombe
// parce que son disque est plein serait pire que pas de hook du tout.
// UNE LECTURE RATEE N'ECRASE PAS UNE CAPTURE REUSSIE. Sans cette condition, le
// premier echec de lecture detruisait la seule capture reelle dont on disposait,
// et laissait un fichier vide qui se lisait comme « le hook ne recoit rien ».
if (lecture.complet) {
  try {
    writeFileSync(join(trace, 'hook-mode-last.json'), brut);
  } catch {
    // Ecriture au mieux : l'echec est silencieux, par conception.
  }
}

// --- 4. Le mode, et sa validation -------------------------------------------
// La charge utile est une donnee d'origine EXTERNE : type, format et bornes se
// valident avant emploi. Seule une chaine non vide fait un mode ; un champ
// present mais inexploitable — null, un nombre, un objet, un tableau, une chaine
// vide — donne CHAMP_INVALIDE, jamais CHAMP_ABSENT.
//
// L'APLATISSEMENT N'EST PAS COSMETIQUE : une valeur portant un passage a la
// ligne ferait imprimer DEUX lignes, ce qui violerait la garde d'unicite du
// temoin. Une charge utile forgee pourrait donc eteindre cette garde.
// CHAQUE CAUSE A SON MOT. Les cinq etats de defaut ne se disent pas pareil, et
// l'ordre de ce bloc est celui des causes : on ne peut pas juger du JSON avant
// d'avoir lu, ni du champ avant d'avoir du JSON.
function assainir(valeur) {
  // Donnee d'origine EXTERNE : type, forme et bornes se valident avant emploi.
  // L'APLATISSEMENT N'EST PAS COSMETIQUE — une valeur portant un passage a la
  // ligne ferait imprimer DEUX lignes et eteindrait la garde d'unicite du
  // temoin. Le filtrage des caracteres de commande ferme la meme porte pour les
  // sequences ANSI et l'octet NUL, qui peuvent reecrire un terminal.
  const aplati = valeur.replace(/\s+/g, ' ').trim();
  const imprimable = aplati.replace(/[^\x20-\x7E]/g, '');
  // UNE VALEUR MUTILEE N'EST PAS UNE VALEUR, ET C'EST LE POINT LE PLUS SUBTIL DE
  // CE FICHIER. Filtrer sans le dire FABRIQUE un mode qui n'a jamais ete recu :
  // mesure, « au<NUL>to » ressortait « auto » — un mode parfaitement legitime,
  // ne d'un octet de commande. Pour un instrument dont l'unique produit est une
  // mesure, c'est le pire mode de defaillance : il ne dit pas « je n'ai pas
  // compris », il repond a cote avec aplomb. On refuse donc toute valeur que LE
  // FILTRE DES CARACTERES NON IMPRIMABLES a modifiee ; elle devient
  // CHAMP_INVALIDE, ce qui est la verite.
  //
  // ⚠️ CETTE COMPARAISON NE VOIT PAS CE QUE L'APLATISSEMENT A DEJA MANGE, et la
  // limite (d) de l'en-tete dit ce que cela laisse passer. La phrase ci-dessus a
  // d'abord ete ecrite « TOUTE valeur que le filtrage a modifiee » : c'etait
  // faux, dans le paragraphe meme qui explique pourquoi il ne faut pas filtrer
  // sans le dire.
  if (imprimable !== aplati) return null;
  if (imprimable.length === 0) return null;
  return imprimable.length > LONGUEUR_MAX
    ? `${imprimable.slice(0, LONGUEUR_MAX)}...`
    : imprimable;
}

function determinerMode() {
  if (!lecture.complet) return ILLISIBLE;
  if (brut.length === 0) return CHARGE_VIDE;

  let charge;
  try {
    charge = JSON.parse(brut);
  } catch {
    return JSON_INVALIDE;
  }

  const valeur = charge?.permission_mode;
  // « null » EST UNE PRESENCE. Le champ existe, il ne porte simplement pas un
  // mode utilisable — le ranger sous CHAMP_ABSENT referait, en plus petit, la
  // maladie que ce fichier solde : dire « le champ n'est pas la » quand il est la.
  if (valeur === undefined) return CHAMP_ABSENT;
  if (typeof valeur !== 'string') return CHAMP_INVALIDE;

  const propre = assainir(valeur);
  return propre === null ? CHAMP_INVALIDE : propre;
}

const mode = determinerMode();

// --- 5. Le journal, AU MIEUX lui aussi --------------------------------------
// Une ligne par passage. Le champ « octets » donne la TAILLE de ce qui a ete lu ;
// il ne distingue plus les causes entre elles — c'est le mot du mode qui le fait
// desormais, et c'est a lui seul qu'il faut se fier. Le champ « lu » dit si la
// lecture est allee a son terme.
try {
  const ligne = `${new Date().toISOString()} | mode=${mode} | lu=${lecture.complet ? 'entier' : 'partiel'} | octets=${Buffer.byteLength(brut)}\n`;
  appendFileSync(join(trace, 'hook-mode.log'), ligne);
} catch {
  // Journal au mieux : l'echec est silencieux, par conception.
}

// --- 6. La ligne, et la sortie ----------------------------------------------
// UNE SEULE instruction d'impression dans tout le fichier, et elle est la
// derniere. Le code de sortie est 0, sans condition et sans exception.
stdout.write(`${PREFIXE}${mode}\n`);
exit(0);

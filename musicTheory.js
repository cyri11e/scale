// musicTheory.js
// contient les constantes + fonctions generalistes

const GAMMES = [
  { nom: "Majeure", chaine: "101011010101" },            // Gamme 1 (Ionien)
  { nom: "Mineure harmonique", chaine: "101011001101" }, // Gamme 2
  { nom: "Mineure mélodique", chaine: "101101010101" },  // Gamme 3
  { nom: "Pentatonique", chaine: "100101010000" },       // Gamme 4 (majeure pentatonique)
  { nom: "Altérée", chaine: "111010101011" },            // Gamme 5 (échelle altérée)
  { nom: "Chromatique", chaine: "111111111111" }         // Gamme 6 (toutes les notes)
];


function genererRotations(chaine) {
  let rotations = [];
  for (let i = 0; i < chaine.length; i++) {
    rotations.push(chaine.slice(i) + chaine.slice(0, i));
  }
  return rotations;
}

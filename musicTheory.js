// musicTheory.js
// contient les constantes + fonctions generalistes

const GAMMES = [
  { 
    nom: "Majeure", 
    signature: "101011010101",
    modes: ["Ionien", "Dorien", "Phrygien", "Lydien", "Mixolydien", "Éolien", "Locrien"]
  },
  { 
    nom: "Mineure harmonique", 
    signature: "101011001101",
    modes: ["Mineur harmonique", "Locrien ♮6", "Ionien #5", "Dorien #4", "Phrygien dominant", "Lydien #2", "Superlocrien bb7"]
  },
  { 
    nom: "Mineure mélodique", 
    signature: "101101010101",
    modes: ["Mineur mélodique", "Dorien b2", "Lydien augmenté", "Lydien dominant", "Mixolydien b6", "Éolien b5", "Superlocrien"]
  },
  { 
    nom: "Pentatonique", 
    signature: "101010010100",
    modes: ["Majeure", "Mode 2", "Mode 3", "Mode 4", "Mineure"]
  },
  { 
    nom: "Altérée", 
    signature: "111010101011",
    modes: ["Altérée"]
  },
  { 
    nom: "Chromatique", 
    signature: "111111111111",
    modes: ["Chromatique"]
  }
];


function genererRotations(signature) {
  let rotations = [];
  for (let i = 0; i < signature.length; i++) {
    rotations.push(signature.slice(i) + signature.slice(0, i));
  }
  return rotations;
}

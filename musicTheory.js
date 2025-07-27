// musicTheory.js
// contient les constantes + fonctions generalistes

const INTERVALLES = {
  "P1": { nom: "Unisson juste", chroma: 0, raccourci: "P1", nature: "Juste" },
  "m2": { nom: "Seconde mineure", chroma: 1, raccourci: "m2", nature: "Mineur" },
  "M2": { nom: "Seconde majeure", chroma: 2, raccourci: "M2", nature: "Majeur" },
  "m3": { nom: "Tierce mineure", chroma: 3, raccourci: "m3", nature: "Mineur" },
  "M3": { nom: "Tierce majeure", chroma: 4, raccourci: "M3", nature: "Majeur" },
  "P4": { nom: "Quarte juste", chroma: 5, raccourci: "P4", nature: "Juste" },
  "A4": { nom: "Quarte augmentée", chroma: 6, raccourci: "A4", nature: "Augmenté" },
  "d5": { nom: "Quinte diminuée", chroma: 6, raccourci: "d5", nature: "Diminué" },
  "P5": { nom: "Quinte juste", chroma: 7, raccourci: "P5", nature: "Juste" },
  "m6": { nom: "Sixte mineure", chroma: 8, raccourci: "m6", nature: "Mineur" },
  "M6": { nom: "Sixte majeure", chroma: 9, raccourci: "M6", nature: "Majeur" },
  "m7": { nom: "Septième mineure", chroma: 10, raccourci: "m7", nature: "Mineur" },
  "M7": { nom: "Septième majeure", chroma: 11, raccourci: "M7", nature: "Majeur" },
  "P8": { nom: "Octave juste", chroma: 12, raccourci: "P8", nature: "Juste" }
};


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

function getAlteration(chromaReel, chromaReference) {
  const ecart = chromaReel - chromaReference;

  if (ecart === 0) return "";         // naturel
  if (ecart === 1) return "#";        // dièse
  if (ecart === 2) return "##";       // double dièse
  if (ecart === -1) return "b";       // bémol
  if (ecart === -2) return "bb";      // double bémol

  // Cas extrêmes : note trop éloignée, notation incertaine
  return "?";
}

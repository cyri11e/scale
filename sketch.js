// poitn d entre du programme
// gere affichage interaction avec des objet graphiques

// sketch.js
// Programme principal

let visualScale;

function testReconnaissanceGammes() {
  console.log("=== Test des modes de la gamme pentatonique ===");
  
  const tests = [
    // Modes de la gamme pentatonique (tous commençant par 1)
    { input: "100101010010", expected: "Pentatonique", mode: 0, desc: "Mode 1" },
    { input: "101010010100", expected: "Pentatonique", mode: 1, desc: "Mode 2" },
    { input: "101001010010", expected: "Pentatonique", mode: 2, desc: "Mode 3" },
    { input: "100101001010", expected: "Pentatonique", mode: 3, desc: "Mode 4" },
    { input: "101001010100", expected: "Pentatonique", mode: 4, desc: "Mode 5" }
  ];

 
  let success = 0;
  
  tests.forEach((test, index) => {
    const gamme = new Gamme(test.input);
    const resultat = gamme.getScaleMode();
    const nom = resultat ? resultat.nom : null;
    const mode = resultat ? resultat.mode : null;
    
    const status = (nom === test.expected && mode === test.mode) ? "✅" : "❌";
    console.log(`Test ${index + 1} ${status} : ${test.input}`);
    if (test.desc) console.log(`  Description: ${test.desc}`);
    console.log(`  Attendu: ${test.expected}${test.mode !== null ? ` (mode ${test.mode})` : ''}`);
    console.log(`  Obtenu : ${nom}${mode !== null ? ` (mode ${mode})` : ''}`);
    
    if (nom === test.expected && mode === test.mode) success++;
  });
  
  console.log(`\nRésultat: ${success}/${tests.length} tests réussis`);
  console.log("================================");
}

function setup() {
  testReconnaissanceGammes(); // Exécution des tests avant création du canvas
  createCanvas(800, 200);
  visualScale = new VisualScale();
}

function draw() {
  background(220);
  visualScale.afficher();
  
  // Nouvelle gestion des événements souris
  if (mouseIsPressed) {
    const caseCliquee = visualScale.getCaseCliquee();
    if (caseCliquee !== null) {
      if (keyIsDown(SHIFT)) {
        visualScale.supprimer(caseCliquee);
      } else {
        visualScale.sourisPressee();
      }
    }
  } else {
    visualScale.sourisRelachee();
  }
}

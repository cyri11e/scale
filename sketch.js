// poitn d entre du programme
// gere affichage interaction avec des objet graphiques

// sketch.js
// Programme principal

let visualScale;

function setup() {
  createCanvas(800, 200);
  visualScale = new VisualScale();
}

function draw() {
  background(220);
  visualScale.afficher();
}

function mousePressed() {
  const caseCliquee = visualScale.getCaseCliquee();

  if (caseCliquee !== null) {
    // Suppression si Shift est enfoncé
    if (keyIsDown(SHIFT)) {
      visualScale.supprimer(caseCliquee);
    } else {
      // Ajout ou déplacement éventuel
      visualScale.sourisPressee();
    }
  }
}

function mouseReleased() {
  visualScale.sourisRelachee();
}

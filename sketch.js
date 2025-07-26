// poitn d entre du programme
// gere affichage interaction avec des objet graphiques

// sketch.js
// Programme principal

let visualScale;
// sketch.js

function setup() {
  createCanvas(800, 300);
  visualScale = new VisualScale();
}

function draw() {
  background(220);
  visualScale.afficher();
}

// Ces deux fonctions ne sont appelées qu’une seule fois à l’appui ou au relâche
function mousePressed() {
  visualScale.sourisPressee();
}

function mouseReleased() {
  visualScale.sourisRelachee();
}


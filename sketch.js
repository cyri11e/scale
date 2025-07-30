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

function mouseDragged() {
  if (!visualScale.pendingClick) return;

  const { index, x, y } = visualScale.pendingClick;
  const dx = abs(mouseX - x);
  const dy = abs(mouseY - y);

  if (dx > 3 || dy > 3) {
    visualScale.dragIndex = index;
    visualScale.pendingClick = null;
  }
}
function keyPressed() {
  const mapping = {
    'q': 0, 'w': 1, 's': 2, 'x': 3, 'd': 4, 'c': 5,
    'f': 6, 'v': 7, 'g': 8, 'b': 9, 'h': 10, 'n': 11
  };

  const keyLower = key.toLowerCase();
  const idx = mapping[keyLower];
  if (idx === undefined) return;

  const note = visualScale.notes.find(n => n.index === idx);
  if (!note) return;

  // Sélectionne uniquement, sans modifier la gamme
  visualScale.toggleNoteSelectionByIndex(idx);
  console.log(note.index);
}

/*
function keyPressed() {
  visualScale.selectKeyboardNote(key);
}

function keyReleased() {
  visualScale.releaseKeyboardNote(key);
}
*/
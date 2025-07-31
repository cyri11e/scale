class VisualNote {
  constructor(index, x, y, size, sigVal, refVal, color, keyboardCode = null) {
    this.index     = index;
    this.x         = x;
    this.y         = y;
    this.size      = size;
    this.sigVal    = sigVal;
    this.refVal    = refVal;
    this.color     = color;
    this.isSelected = false;
    this.hoverScale = 1;
    this.label     = "";
    this.keyboardCode = keyboardCode;
    this.isTopRow  = y === height * 0.25; // ⚠️ adapte selon ta logique de rangée
  }

  update() {
    const cible = this.isHovered ? 1.4 : 1;
    this.hoverScale += (cible - this.hoverScale) * 0.25;
  }


  draw(isHovered = false) {
    this.isHovered = isHovered;
    push();

   if ( keyIsDown(this.keyboardCode)) 
      this.isSelected = true;
   else  
      this.isSelected = false;

    // 📏 Zoom progressif avec ajustement vertical
    const sizeZoom = this.size * this.hoverScale;
    const delta = sizeZoom - this.size;
    const posX = this.x - delta / 2;
    const posY = this.isTopRow ? this.y - delta : this.y;

    // 🎨 Fond actif
    if (this.sigVal === '1') {
      fill(this.color);
      strokeWeight(2);
    } else {
      noFill();
    }

    stroke(30);
    rect(posX, posY, sizeZoom, sizeZoom);

    // ⭐ Sélection
    if (this.isSelected) {
      stroke('#FFD700');
      strokeWeight(4);
      noFill();
      rect(posX - 3, posY - 3, sizeZoom + 6, sizeZoom + 6);
      stroke(30);
    }
    
      // 🟣 Ajout de la pastille ronde
      const radius = sizeZoom / 3;
      const centerX = posX + sizeZoom / 2;
      const sideY = this.y; // position verticale sur la ligne médiane
    
      stroke(30);
      strokeWeight(1.5);
      ellipse(centerX, height / 2, radius);
      textAlign(CENTER, CENTER);
      text(this.intervalle || '', centerX, height / 2);

        
    // 🎵 Symbole
    if (this.sigVal === '1') {
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(sizeZoom * 0.75);
      strokeWeight(1);

      text(parseLabel(this.label).degree, posX + sizeZoom / 2, posY + sizeZoom / 2);
      textSize(sizeZoom * 0.5);
      text(parseLabel(this.label).alteration, posX + sizeZoom / 2 - sizeZoom * 0.3, posY + sizeZoom * 0.6 / 2);

  
    }

    // 🔢 Indice affiché en bas à droite
    fill(255); // blanc
    textSize(sizeZoom * 0.25);
    textFont('Helvetica');
    textStyle(NORMAL);
    textAlign(RIGHT, BOTTOM);
    text(this.index, posX + sizeZoom - 4, posY + sizeZoom - 4);


    pop();
  }

  isClicked(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.size &&
      my >= this.y &&
      my <= this.y + this.size
    );
  }
}



class VisualScale {
  constructor() {
    this.caseRatio = 0.25;
    this.dragIndex = null;
    this.gamme = new Gamme();
    this.lastClickTime = 0;
    this.doubleClickDelay = 250;
    this.pendingClick = null;
    this.selectedNotes = [];

    this.colors = [
      '#cc0000', '#cc3300', '#cc6600', '#cc9900',
      '#cccc00', '#99cc00', '#66cc00', '#00cc66',
      '#00cccc', '#0066cc', '#6600cc', '#9900cc'
    ];

    this.notes = [];
    this.initNotes(); // création unique
  }

  initNotes() {
    this.caseSize = height * this.caseRatio;
    this.marginX = this.caseSize;
    this.marginY = this.caseSize;

    for (let i = 0; i < 12; i++) {
      const xBase = this.marginX + i * (this.caseSize * 0.75);
      const y = (i % 2 === 0) ? this.marginY : this.marginY + this.caseSize;
      const note = new VisualNote(i, xBase, y, this.caseSize, '0', '0', this.colors[i], keyCodeMapping[i] );
      note.isTopRow = (i % 2 === 0); // Détermine
      this.notes.push(note);
    }
  }

  afficher() {
    const sig = this.gamme.signature.split("");
    const refSig = GAMMES[0].signature.split("");

    for (let i = 0; i < 12; i++) {
      const note = this.notes[i];
      note.sigVal = sig[i];
      note.refVal = refSig[i];
      note.label = this.gamme.getLabel(i);
      note.intervalle = this.gamme.getInterval(i);
      const hover = note.isClicked(mouseX, mouseY);
      note.update();
      note.draw(hover);

    }

    this.drawGammeLabel();
    this.drawDragIndicator();

  }

  drawGammeLabel() {
    const sm = this.gamme.getScaleMode();
    if (!sm) return;

    const { nom, mode } = sm;
    const modeName = GAMMES.find(g => g.nom === nom)?.modes[mode] || '';

    push();
    fill(0);
    textSize(24);
    textAlign(LEFT);
    text(`${nom} - ${modeName}`, this.marginX, 20);
    pop();
  }

  drawDragIndicator() {
    if (this.dragIndex === null) return;

    const size = this.caseSize;

    push();
    fill('#e76f51');
    ellipse(mouseX, mouseY, size * 0.8);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(size * 0.75);
    strokeWeight(1);
    text("♪", mouseX, mouseY);
    pop();
  }


  toggleSelection(note) {
    const alreadySelected = this.selectedNotes.includes(note.index);

    if (alreadySelected) {
      note.isSelected = false;
      this.selectedNotes = this.selectedNotes.filter(i => i !== note.index);
    } else {
      note.isSelected = true;
      this.selectedNotes.push(note.index);
    }
  }

  toggleNoteSelectionByIndex(idx) {
    const note = this.notes[idx];
    const alreadySelected = this.selectedNotes.includes(idx);

    if (alreadySelected) {
      note.isSelected = false;
      this.selectedNotes = this.selectedNotes.filter(i => i !== idx);
    } else {
      note.isSelected = true;
      this.selectedNotes.push(idx);
    }
  }

getNoteIndexFromKey(char) {
  const mapping = {
    'q': 0, 'w': 1, 's': 2, 'x': 3, 'd': 4, 'c': 5,
    'f': 6, 'v': 7, 'g': 8, 'b': 9, 'h': 10, 'n': 11
  };
  return mapping[char.toLowerCase()];
}


setNoteSelectionByIndex(index, selected) {
  const note = this.notes.find(n => n.index === index);
  if (!note) return;

  note.isSelected = selected;

  if (selected) {
    if (!this.selectedNotes.includes(index)) {
      this.selectedNotes.push(index);
    }
  } else {
    this.selectedNotes = this.selectedNotes.filter(i => i !== index);
  }

  console.log(
    selected ? `Note activée : ${index}` : `Note désactivée : ${index}`
  );
}

 
  selectKeyboardNote(char) {
  const mapping = {
    'q': 0, 'w': 1, 's': 2, 'x': 3, 'd': 4, 'c': 5,
    'f': 6, 'v': 7, 'g': 8, 'b': 9, 'h': 10, 'n': 11
  };

  const idx = mapping[char.toLowerCase()];
  if (idx === undefined) return;

  const note = this.notes.find(n => n.index === idx);
  if (!note) return;

  // Sélectionne la note
  note.isSelected = true;
  console.log(`Note appuyée : ${note.index}`);
}

releaseKeyboardNote(char) {
  const mapping = {
    'q': 0, 'w': 1, 's': 2, 'x': 3, 'd': 4, 'c': 5,
    'f': 6, 'v': 7, 'g': 8, 'b': 9, 'h': 10, 'n': 11
  };

  const idx = mapping[char.toLowerCase()];
  if (idx === undefined) return;

  const note = this.notes.find(n => n.index === idx);
  if (!note) return;

  // Désélectionne la note
  note.selected = false;
  console.log(`Note relâchée : ${note.index}`);
}


sourisPressee() {
  const idx = this.getCaseCliquee();
  if (idx === null) return;

  // Enregistrement du clic
  this.lastClickIndex = idx;
  this.clickStartTime = millis();
  this.clickStartPos = { x: mouseX, y: mouseY };

  // Si la note est active, on prépare le drag (sans déclencher encore)
  if (idx !== 0 && this.gamme.signature[idx] === '1') {
    this.pendingClick = {
      index: idx,
      x: mouseX,
      y: mouseY
    };
  }
}


sourisRelachee() {
  const idx = this.lastClickIndex;
  if (idx === null) {
    this.pendingClick = null;
    return;
  }

  const dt = millis() - this.clickStartTime;
  const dx = abs(mouseX - this.clickStartPos.x);
  const dy = abs(mouseY - this.clickStartPos.y);

  const isClick = dx < 4 && dy < 4;
  const isDoubleClick = dt < this.doubleClickDelay && idx === this.lastClickedIndex;

  const clickedNote = this.notes[idx];
  this.lastClickedIndex = idx;

  // 🎯 Drag & drop
  if (this.dragIndex !== null && idx !== 0) {
    const cible = this.getCaseCliquee();
    if (
      cible !== null &&
      cible !== 0 &&
      this.gamme.signature[cible] === '0' &&
      Math.abs(cible - this.dragIndex) === 1
    ) {
      this.gamme.deplacer(this.dragIndex, cible);
    }
    this.dragIndex = null;
    this.pendingClick = null;
    return;
  }

  // 🎯 Double-clic (modifie la gamme)
  if (isDoubleClick && idx !== 0) {
    if (this.gamme.signature[idx] === '1') {
      this.gamme.supprimer(idx);
    } else {
      this.gamme.ajouter(idx);
    }
    return;
  }

  // 🎯 Clic simple (sélection visuelle uniquement)
  if (isClick) {
    this.toggleSelection(clickedNote);
  }

  this.pendingClick = null;
}


  getCaseCliquee() {
    return this.notes.find(note => note.isClicked(mouseX, mouseY))?.index ?? null;
  }

  
}


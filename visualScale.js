class VisualScale {
  constructor() {
    this.caseRatio = 0.25; // 25% de la hauteur du canvas
    this.dragIndex = null;
    this.gamme     = new Gamme();
    this.colors    = [
      '#cc0000', '#cc3300', '#cc6600', '#cc9900',
      '#cccc00', '#99cc00', '#66cc00', '#00cc66',
      '#00cccc', '#0066cc', '#6600cc', '#9900cc'
    ];
  }

  afficher() {
    this.caseSize = height * this.caseRatio;
    this.marginX  = this.caseSize; // Espace entre les cases
    this.marginY  = this.caseSize;

    const sig    = this.gamme.signature.split("");
    const refSig = GAMMES[0].signature.split("");

    for (let i = 0; i < 12; i++) {
      const xBase = this.marginX + i * (this.caseSize * 0.75);
      const y     = (i % 2 === 0) ? this.marginY : this.marginY + this.caseSize;
      this.drawCase(xBase, y, this.caseSize, i, sig[i], refSig[i]);
    }

    this.drawGammeLabel();
    this.drawDragIndicator();
  }

  drawCase(xBase, y, size, index, sigVal, refVal) {
    push();

    if (sigVal === '1') {
      fill(this.colors[index]);
      strokeWeight(2);
    } else {
      noFill();
      strokeWeight(1);
    }

    stroke(30);

    if (refVal === '1') {
      strokeWeight(3);
      rect(xBase - 1, y - 1, size + 2, size + 2);
    }

    rect(xBase, y, size, size);

    if (sigVal === '1') {
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(size * 0.75);
      strokeWeight(1);
      text("♪", xBase + size / 2, y + size / 2);
    }

    pop();
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

  sourisPressee() {
    const idx = this.getCaseCliquee();
    if (idx === null || idx === 0) return;

    if (keyIsDown(SHIFT)) {
      this.gamme.supprimer(idx);
    } else if (this.gamme.signature[idx] === '0') {
      this.gamme.ajouter(idx);
    } else {
      this.dragIndex = idx;
    }
  }

  sourisRelachee() {
    if (this.dragIndex === null) return;

    const cible = this.getCaseCliquee();
    if (
      cible !== null && cible !== 0 &&
      this.gamme.signature[cible] === '0' &&
      Math.abs(cible - this.dragIndex) === 1
    ) {
      this.gamme.deplacer(this.dragIndex, cible);
    }

    this.dragIndex = null;
  }

  getCaseCliquee() {
    const size = this.caseSize;
    const yTop = this.marginY;
    const yBottom = this.marginY + size;

    for (let i = 0; i < 12; i++) {
      const x = this.marginX + i * (size * 0.75);
      const y = (i % 2 === 0) ? yTop : yBottom;
      if (
        mouseX >= x && mouseX <= x + size &&
        mouseY >= y && mouseY <= y + size
      ) {
        return i;
      }
    }
    return null;
  }
}

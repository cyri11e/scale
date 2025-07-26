// visualScale.js

class VisualScale {
  constructor() {
    this.caseSize  = 40;
    this.offsetX   = 10;
    this.dragIndex = null;
    this.gamme     = new Gamme();   // source unique de vérité
  }

  afficher() {
    const sig    = this.gamme.signature.split("");
    const refSig = GAMMES[0].signature.split("");
    const colors =  [
  '#cc0000', // 0 - rouge
  '#cc3300', // 1 - rouge orangé
  '#cc6600', // 2 - orange
  '#cc9900', // 3 - orange-jaune
  '#cccc00', // 4 - jaune
  '#99cc00', // 5 - jaune-vert
  '#66cc00', // 6 - vert
  '#00cc66', // 7 - vert-bleuté
  '#00cccc', // 8 - cyan
  '#0066cc', // 9 - bleu
  '#6600cc', // 10 - violet
  '#9900cc'  // 11 - rose-violet
];

    for (let i = 0; i < 12; i++) {
      const x = this.offsetX + i * this.caseSize;
      push();

      // fond si active
      if (sig[i] === '1') {
        fill(colors[i]);
        strokeWeight(2);
      } else {
        noFill();
        strokeWeight(1);
      }
      stroke(30);

      // double contour pour la gamme de référence
      if (refSig[i] === '1') {
        strokeWeight(3);
        rect(x - 1, 29, this.caseSize + 2, this.caseSize + 2);
      }

      rect(x, 30, this.caseSize, this.caseSize);

      // pictogramme ♪ si note active
      if (sig[i] === '1') {
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(30);
        strokeWeight(1);
        text("♪", x + this.caseSize/2, 30 + this.caseSize/2);
      }

      pop();
    }

    // Affiche nom de la gamme + mode
    const sm = this.gamme.getScaleMode();
    if (sm) {
      const { nom, mode } = sm;
      const modeName = GAMMES.find(g => g.nom === nom)?.modes[mode] || '';
      push();
      fill(0);
      textSize(14);
      textAlign(LEFT);
      text(`${nom} - ${modeName}`, 10, 20);
      pop();
    }

    // Indicatif de drag en cours
    if (this.dragIndex !== null) {
      push();
      fill('#e76f51');
      ellipse(mouseX, mouseY, this.caseSize * 0.8);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(30);
      strokeWeight(1);
      text("♪", mouseX, mouseY);
      pop();
    }
  }

  sourisPressee() {
    const idx = this.getCaseCliquee();
    // interdiction de toucher la tonique (idx=0) et zones hors cadre
    if (idx === null || idx === 0) return;

    // SHIFT → suppression
    if (keyIsDown(SHIFT)) {
      this.gamme.supprimer(idx);
      return;
    }

    // si note inactive → on ajoute
    if (this.gamme.signature[idx] === '0') {
      this.gamme.ajouter(idx);
    }
    // sinon on commence un drag
    else {
      this.dragIndex = idx;
    }
  }

  sourisRelachee() {
    // pas de drag en cours → exit
    if (this.dragIndex === null) return;

    const cible = this.getCaseCliquee();
    // validité du target :
    // - existe et n’est pas la tonique
    // - case libre
    // - déplacement d’une case voisine
    if (
      cible !== null &&
      cible !== 0 &&
      this.gamme.signature[cible] === '0' &&
      Math.abs(cible - this.dragIndex) === 1
    ) {
      this.gamme.deplacer(this.dragIndex, cible);
    }

    this.dragIndex = null;
  }

  getCaseCliquee() {
    const y0 = 30;
    for (let i = 0; i < 12; i++) {
      const x = this.offsetX + i * this.caseSize;
      if (
        mouseX >= x && mouseX <= x + this.caseSize &&
        mouseY >= y0 && mouseY <= y0 + this.caseSize
      ) {
        return i;
      }
    }
    return null;
  }
}

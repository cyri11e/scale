// visualScale.js
// representation graphique + interactions de l objet Gamme
// 

class VisualScale {
  constructor() {
    this.chaine = "1" + "0".repeat(11);
    this.tailleCase = 40;
    this.espaceCase = 50;
    this.decalageX = 10;
    this.dragIndex = null;
    this.gamme = new Gamme(); // Ajout d'une instance de Gamme
  }

 afficher() {
  const arr = this.chaine.split("");
  const reference = GAMMES[0].chaine.split("");
  const couleurs = [
    '#e63946', '#f77f00', '#fcbf49', '#90be6d',
    '#43aa8b', '#4d908e', '#277da1', '#577590',
    '#764ba2', '#a367dc', '#bc6c25', '#6d6875'
  ];

  for (let i = 0; i < 12; i++) {
    const x = i * this.tailleCase + this.decalageX;

    push(); // ✅ on encapsule styles ici

    // Couleur si active
    if (arr[i] === '1') {
      fill(couleurs[i]);
      strokeWeight(2);
    } else {
      noFill();
      strokeWeight(1);
    }

    stroke(30);

    // Double contour si note de référence
    if (reference[i] === '1') {
      strokeWeight(3);
      rect(x - 1, 29, this.tailleCase + 2, this.tailleCase + 2);
    }

    rect(x, 30, this.tailleCase, this.tailleCase); // dessin case
    textSize(30);
    strokeWeight(1);
    if (arr[i] === '1') {
      fill(0);
      textAlign(CENTER, CENTER);
      text("♪", x + this.tailleCase / 2, 30 + this.tailleCase / 2);
    }

    pop(); // ✅ fin de style encapsulé
  }

  // 🎶 Affichage du nom et mode
  const scaleMode = this.gamme.getScaleMode();
  if (scaleMode) {
    const { nom, mode } = scaleMode;
    const nomMode = GAMMES.find(g => g.nom === nom)?.modes[mode] || '';
    push();
    fill(0);
    textAlign(LEFT);
    textSize(14);
    text(`${nom} - ${nomMode}`, 10, 20);
    pop();
  }

  // 🧲 Drag visuel
  if (this.dragIndex !== null) {
    push();
    fill('#e76f51');
    ellipse(mouseX, mouseY, this.tailleCase * 0.8);
    fill(255);
    textAlign(CENTER, CENTER);
    text("♪", mouseX, mouseY);
    pop();
  }
}


  sourisPressee() {
    const index = this.getCaseCliquee();
    if (index === null || index === 0) return;

    if (this.dragIndex === null) {  // Éviter les appels multiples pendant le drag
      if (keyIsDown(SHIFT)) {
        this.supprimer(index);
      } else if (this.chaine[index] === '0') {
        this.ajouter(index);
      } else {
        this.dragIndex = index;
      }
    }
  }

  sourisRelachee() {
    if (this.dragIndex === null) return;
    const cible = this.getCaseCliquee();

    if (
      cible !== null &&
      cible !== 0 &&
      this.chaine[cible] === '0' &&
      Math.abs(cible - this.dragIndex) === 1
    ) {
      this.deplacer(this.dragIndex, cible);
    }

    this.dragIndex = null;
  }

  // visualScale.js

  getCaseCliquee() {
    const caseY = 30; // Position verticale des cases
    for (let i = 0; i < 12; i++) {
      const x = i * this.tailleCase + this.decalageX;
      if (
        mouseX >= x &&
        mouseX <= x + this.tailleCase &&
        mouseY >= caseY &&
        mouseY <= caseY + this.tailleCase
      ) {
        return i;
      }
    }
    return null;
  }

  ajouter(index) {
    if (index > 0 && this.chaine[index] === '0') {
      this.chaine = this.chaine.slice(0, index) + '1' + this.chaine.slice(index + 1);
      this.gamme.chaine = this.chaine;
      this.gamme.reconnaitre();
    }
  }

  supprimer(index) {
    if (index > 0 && this.chaine[index] === '1') {
      this.chaine = this.chaine.slice(0, index) + '0' + this.chaine.slice(index + 1);
      this.gamme.chaine = this.chaine;
      this.gamme.reconnaitre();
    }
  }

  deplacer(from, to) {
    let arr = this.chaine.split("");
    arr[from] = '0';
    arr[to] = '1';
    this.chaine = arr.join("");
    this.gamme.chaine = this.chaine;
    this.gamme.reconnaitre();
  }

  getChaine() {
    return this.chaine;
  }
}

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
  }

  afficher() {
    const arr = this.chaine.split("");
    const reference = GAMMES[0].chaine.split("");

    const couleursChromatiques = [
      '#e63946', // 0 → rouge
      '#f77f00', // 1 → orange
      '#fcbf49', // 2 → jaune
      '#90be6d', // 3 → vert clair
      '#43aa8b', // 4 → vert
      '#4d908e', // 5 → turquoise
      '#277da1', // 6 → bleu
      '#577590', // 7 → bleu foncé
      '#764ba2', // 8 → violet
      '#a367dc', // 9 → mauve
      '#bc6c25', // 10 → brun
      '#6d6875'  // 11 → gris-violet
    ];

    for (let i = 0; i < 12; i++) {
      const x = i * this.tailleCase + this.decalageX;

      // Choix couleur si note active
      if (arr[i] === '1') {
        fill(couleursChromatiques[i]);
        strokeWeight(2);
      } else {
        noFill();
        strokeWeight(1);
      }

      stroke(30);

      // Case de référence → double contour
      if (reference[i] === '1') {
        strokeWeight(3);
        rect(x - 1, 29, this.tailleCase + 2, this.tailleCase + 2);
      }

      // Dessin de la case
      rect(x, 30, this.tailleCase, this.tailleCase);

      // Symbole musical si note présente
      if (arr[i] === '1') {
        fill(0);
        text("♪", x + this.tailleCase / 2, 50);
      }
    }

    // 🎯 Si en déplacement
    if (this.dragIndex !== null) {
      fill('#e76f51');
      ellipse(mouseX, mouseY, this.tailleCase * 0.8);
      fill(255);
      text("♪", mouseX, mouseY);
    }
  }

  sourisPressee() {
    const index = this.getCaseCliquee();
    if (index === null || index === 0) return;

    if (mouseButton === LEFT) {
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
    }
  }

  supprimer(index) {
    if (index > 0 && this.chaine[index] === '1') {
      this.chaine = this.chaine.slice(0, index) + '0' + this.chaine.slice(index + 1);
    }
  }

  deplacer(from, to) {
    let arr = this.chaine.split("");
    arr[from] = '0';
    arr[to] = '1';
    this.chaine = arr.join("");
  }

  getChaine() {
    return this.chaine;
  }
}

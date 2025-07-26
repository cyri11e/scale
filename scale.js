// scale.js
// objet Gamme avec pour donnee de reference une signature type binaire representant la presence de note parmi 12
// par defaut commence avec une gamme vide
// possibilite d ajouter supprimer et deplacer des notes
// a chaque modification et verifie si gamme mode connu


class Gamme {
  
  // Initialise une gamme avec une chaîne de départ

  constructor(init = "100000000000") {
    this.signature = init;
    this.nomReconnu = null;
    this.modeReconnu = null;
    this.reconnaitre(); // 🔍 Auto-reconnaissance dès la création
  }

  //Active une note à l’index donné
   
  ajouter(index) {
    if (index >= 0 && index < this.signature.length && this.signature[index] === '0') {
      this.signature = this.signature.slice(0, index) + '1' + this.signature.slice(index + 1);
      this.reconnaitre();
    }  // Ajout de l'accolade manquante ici
  }

  
  // Désactive une note à l’index donné

  supprimer(index) {
    if (index >= 0 && index < this.signature.length && this.signature[index] === '1') {
      this.signature = this.signature.slice(0, index) + '0' + this.signature.slice(index + 1);
      this.reconnaitre();
    }
  }

  //Déplace une note active vers une case voisine inactive

  deplacer(from, to) {
    if (
      from >= 0 && to >= 0 &&
      this.signature[from] === '1' &&
      this.signature[to] === '0' &&
      Math.abs(from - to) === 1
    ) {
      let arr = this.signature.split("");
      arr[from] = '0';
      arr[to] = '1';
      this.signature = arr.join("");
      this.reconnaitre();
    }
  }


  //Recherche une correspondance avec les gammes connues

  reconnaitre() {
    this.nomReconnu = null;
    this.modeReconnu = null;

    // Pour chaque gamme connue
    for (let i = 0; i < GAMMES.length; i++) {
      let str = GAMMES[i].signature;
      let rotationValide = 0;
      
      // Test de toutes les rotations possibles
      for (let j = 0; j < 12; j++) {
        if (str.startsWith("1")) {
          if (str === this.signature) {
            this.nomReconnu = GAMMES[i].nom;
            this.modeReconnu = rotationValide;
            return;
          }
          rotationValide++; // Compte uniquement les rotations valides
        }
        // Rotation à gauche
        str = str.slice(1) + str[0];
      }
    }
  }

  // Donne le nom et le mode si une gamme a été reconnue

  getScaleMode() {
    return this.nomReconnu
      ? { nom: this.nomReconnu, mode: this.modeReconnu }
      : null;
  }

  // Affichage simplifié pour debug ou console

  toString() {
    return this.nomReconnu
      ? `Gamme reconnue : ${this.nomReconnu} (mode ${this.modeReconnu})`
      : `Gamme non reconnue : ${this.signature}`;
  }
}

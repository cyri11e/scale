// scale.js
// objet Gamme avec pour donnee de reference une signature type binaire representant la presence de note parmi 12
// par defaut commence avec une gamme vide
// possibilite d ajouter supprimer et deplacer des notes
// a chaque modification et verifie si gamme mode connu


class Gamme {
  
  // Initialise une gamme avec une chaîne de départ

  constructor(chaineInitiale = "100000000000") {
    this.chaine = chaineInitiale;
    this.nomReconnu = null;
    this.modeReconnu = null;
    this.reconnaitre(); // 🔍 Auto-reconnaissance dès la création
  }

  //Active une note à l’index donné
   
  ajouter(index) {
    if (index >= 0 && index < this.chaine.length && this.chaine[index] === '0') {
      this.chaine = this.chaine.slice(0, index) + '1' + this.chaine.slice(index + 1);
      this.reconnaitre();
    }
  }

  
  // Désactive une note à l’index donné

  supprimer(index) {
    if (index >= 0 && index < this.chaine.length && this.chaine[index] === '1') {
      this.chaine = this.chaine.slice(0, index) + '0' + this.chaine.slice(index + 1);
      this.reconnaitre();
    }
  }

  //Déplace une note active vers une case voisine inactive

  deplacer(from, to) {
    if (
      from >= 0 && to >= 0 &&
      this.chaine[from] === '1' &&
      this.chaine[to] === '0' &&
      Math.abs(from - to) === 1
    ) {
      let arr = this.chaine.split("");
      arr[from] = '0';
      arr[to] = '1';
      this.chaine = arr.join("");
      this.reconnaitre();
    }
  }


  //Recherche une correspondance avec les gammes connues

  reconnaitre() {
    this.nomReconnu = null;
    this.modeReconnu = null;

    for (let { nom, chaine } of GAMMES) {
      for (let i = 0; i < chaine.length; i++) {
        let rotation = chaine.slice(i) + chaine.slice(0, i);
        if (rotation === this.chaine) {
          this.nomReconnu = nom;
          this.modeReconnu = i;
          return;
        }
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
      : `Gamme non reconnue : ${this.chaine}`;
  }
}

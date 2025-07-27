// scale.js
// objet Gamme avec pour donnee de reference une signature type binaire representant la presence de note parmi 12
// par defaut commence avec une gamme vide
// possibilite d ajouter supprimer et deplacer des notes
// a chaque modification et verifie si gamme mode connu


class Gamme {
  constructor(init = "100000000000") {
    this.signature = init;
    this.nomReconnu = null;
    this.modeReconnu = null;
    this.degres = [];
    this.updateChroma();
    this.updateDegres();
    this.reconnaitre();
  }

  updateChroma() {
    this.chroma = [];
    for (let i = 0; i < 12; i++) {
      if (this.signature[i] === '1') this.chroma.push(i);
    }
  }

  updateDegres() {
    const MAJEURE = [0, 2, 4, 5, 7, 9, 11];
    const labels  = ["1", "2", "3", "4", "5", "6", "7"];

    if (this.chroma.length !== 7) {
      this.degres = this.chroma.map(c => 
        ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"][c]
      );
    } else {
      this.degres = this.chroma.map((ch, i) =>
        getAlteration(ch, MAJEURE[i]) + labels[i]
      );
    }
  }

  getDegres() {
    return this.degres;
  }

  ajouter(index) {
    if (this.signature[index] === '0') {
      this.signature = this.signature.slice(0, index) + '1' + this.signature.slice(index + 1);
      this.updateChroma();
      this.updateDegres();
      this.reconnaitre();
    }
  }

  supprimer(index) {
    if (this.signature[index] === '1') {
      this.signature = this.signature.slice(0, index) + '0' + this.signature.slice(index + 1);
      this.updateChroma();
      this.updateDegres();
      this.reconnaitre();
    }
  }

  deplacer(from, to) {
    if (
      this.signature[from] === '1' &&
      this.signature[to] === '0' &&
      Math.abs(from - to) === 1
    ) {
      let arr = this.signature.split("");
      arr[from] = '0';
      arr[to] = '1';
      this.signature = arr.join("");
      this.updateChroma();
      this.updateDegres();
      this.reconnaitre();
    }
  }

  reconnaitre() {
    this.nomReconnu = null;
    this.modeReconnu = null;

    for (let g of GAMMES) {
      let str = g.signature;
      let rotation = 0;
      for (let i = 0; i < 12; i++) {
        if (str.startsWith("1") && str === this.signature) {
          this.nomReconnu = g.nom;
          this.modeReconnu = rotation;
          return;
        }
        str = str.slice(1) + str[0];
        if (str.startsWith("1")) rotation++;
      }
    }
  }

getLabel(i) {
  const pos = this.chroma.indexOf(i);
  return pos !== -1 ? this.degres[pos] : "♪";
}



  getScaleMode() {
    return this.nomReconnu ? { nom: this.nomReconnu, mode: this.modeReconnu } : null;
  }

  toString() {
    return this.nomReconnu
      ? `Gamme reconnue : ${this.nomReconnu} (mode ${this.modeReconnu})`
      : `Gamme non reconnue : ${this.signature}`;
  }
}

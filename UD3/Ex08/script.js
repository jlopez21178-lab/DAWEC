// Activitat 3.8 Classe CompteBancari

class CompteBancari {
  // a. Definiu titular i saldo inicial en el constructor; valideu les dades.
  constructor(titular, saldo = 0) {
    if (!titular.trim()) throw new Error("No pot ser una cadena buida");
    if (typeof titular != "string")
      throw new TypeError("La variable titular ha de ser un string");
    if (saldo < 0) throw new RangeError("El saldo no pot ser negatiu");

    this.titular = titular;
    this.saldo = saldo;
  }

  // b. Implementeu ingressar, retirar i transferirA(altreCompte, import).
  // c. Impedir imports no positius i retirades sense saldo suficient.

  ingressar(quantitat) {
    if (quantitat < 0)
      throw new RangeError("No es poden fer ingressos negatius");

    this.saldo += quantitat;
  }

  retirar(quantitat) {
    if (quantitat > this.saldo)
      throw new RangeError(
        "No es poden retirar més doblers dels que es disposa al compte",
      );

    this.saldo -= quantitat;
  }

  transferir(altreCompte, quantitat) {
    this.retirar(quantitat);
    altreCompte.ingressar(quantitat);
  }

  // d. Afegiu un getter resum i un mètode toJSON que retorne només les dades que voleu serialitzar.

  get resum() {
    return `Titular: ${this.titular} - saldo actual: ${this.saldo}€`;
  }

  toJSON() {
    return JSON.stringify({ titular: this.titular, saldo: this.saldo });
  }

  static desdeObjecte(dades) {
    return new CompteBancari(dades.titular, dades.saldo);
  }
}

// e. Creeu tres comptes, executeu operacions i calculeu amb reduce el saldo total.
const comptes = [
  new CompteBancari("Alberto", 31000),
  new CompteBancari("Frederico", 1000),
  new CompteBancari("Santiagito", 67000),
];

comptes[2].retirar(2300);
const saldoTotal = comptes.reduce(
  (saldoTotal, compte) => (saldoTotal += compte.saldo),
  0,
);

console.log(saldoTotal);

// f. Serialitzeu els comptes i reconstruïu-los amb un mètode estàtic desDeObjecte.
const json = comptes.map((compte) => compte.toJSON());
console.log(json);
let novesDades = json.map((dada) => JSON.parse(dada));
console.log(novesDades);
novesDades = novesDades.map((dada) => CompteBancari.desdeObjecte(dada));
console.log(novesDades);

// 3.6.1 Desestructura un array amb nom, primer llinatge i segon llinatge. Assigna un valor predeterminat al segon llinatge.
const nomComplet = ["Pepito", "Jaimito", "Alfonsito"];
const [nom, llinatge1, llinatge2 = "Jorgito"] = [...nomComplet];

// 3.6.2 Separa el primer element d’un array i guarda la resta mitjançant rest.
const nums = [1, 2, 3, 4, 5, 6, 7, 7, 8];
const [primer, ...resta] = [nums[0], nums.slice(1)];

// 3.6.3 Combina dos arrays i afegeix un element al principi i un altre al final emprant spread.
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const arrFinal = [0, ...arr1, ...arr2, 7, 8, 9];
console.log(arrFinal);
// 3.6.4 Crea un objecte llibre amb títol, autor, pàgines i un mètode resum() que mostri una frase descriptiva.
const llibre = {
  titol: "El principito",
  autor: "Jaimiti",
  pagines: "moltes",
  resum: function () {
    console.log("Es un libro facil de leer para los más pequeños del hogar");
  },
};

// 3.6.5 Crea un objecte comptador amb una propietat valor i mètodes incrementar(), decrementar() i mostrar().
const comptador = {
  valor: 30,
  incrementar: function (num) {
    this.valor += num;
  },
  decrementar: function (num) {
    this.valor -= num;
  },
  mostrar: function () {
    console.log(`Valor: ${this.valor}`);
  },
};

// 3.6.6 Copia un producte amb spread, canvia’n el preu i comprova que l’original no s’ha modificat.

const producte = {
  nom: "champu",
  preu: 20,
};

const producte2 = { ...producte };

console.log(`Producte original: ${producte.preu}`);

producte2.preu = 100;
console.log("Preu modificat a la copia");
console.log(`Producte original: ${producte.preu}`);
console.log(`Producte copia: ${producte2.preu}`);

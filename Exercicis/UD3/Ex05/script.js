// 3.5.1 Empra find per obtenir la primera temperatura inferior a zero i controla el cas en què noexisteixi.
const temperatura = [213, 23, 4, 8, 56, -4];
const temp = temperatura.find((tem) => tem < 0);

if (temp) {
  console.log(`Primera temperatura inferior a 0ºC: ${temp}`);
} else {
  console.log("No hi ha cap temperatura inferior a 0ºC");
}
// 3.5.2 Comprova amb some si un array conté algun múltiple de 5.
const arr = [2, 5, 6, 7, 8];

console.log(`L'array conte un multiple de 5? ${arr.some((a) => a % 5 == 0)}`);
// 3.5.3 Comprova amb every si totes les contrasenyes d’un array tenen almenys vuit caràcters.
const contrasenyes = [
  "asdjadaswasdasd",
  "294178249087",
  "adksmjasokidj2o9ij9023i",
];

console.log(
  `Totes les contrasenyes tenen al manco 8 caracters? ${contrasenyes.every((contra) => contra.trim().length >= 8)}`,
);
// 3.5.4 Calcula amb reduce el total i la mitjana d’un array de despeses.
const despeses = [23, 54, 123, 6];
const total = despeses.reduce((acum, despesa) => acum + despesa, 0);
console.log(`Total: ${total}`);
console.log(`Mitjana: ${total / despeses.length}`);
// 3.5.5 Ordena una còpia d’un array de nombres de major a menor sense modificar l’original.
const original = [2, 5, 78, 1, 57, 325];
const copia = original.slice();
copia.sort((a, b) => b - a);
console.log(original);
console.log(copia);
// 3.5.6 A partir d’un array de paraules, troba la primera que comenci per vocal, comprova si totes tenen contingut i calcula el total de caràcters.
const arrParaules = ["holis", "adios", "Adios", " ."];

const primeraVocal = arrParaules.find((a) => a[0] === a[0].toUpperCase());
if (primeraVocal) {
  console.log(`Primera paraula que comenci amb vocal: ${primeraVocal}`);
} else {
  console.log("No hi ha cap paraula que comenci amb vocal");
}

console.log(
  `Totes tenen contingut: ${arrParaules.every((paraula) => Boolean(paraula.trim()))}`,
);
console.log(
  `Total caracters: ${arrParaules.reduce((acum, paraula) => acum + paraula.trim().length, 0)}`,
);

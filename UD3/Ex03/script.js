// 3.2.1 Crea una funció executarOperacio(a, b, callback) i prova-la amb callbacks per sumar, restar i calcular el màxim.

function executarOperacio(a, b, callback) {
  return callback(a, b);
}

const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
// const maxim = (a,b) => Math.max(a,b);
const maxim = (a, b) => (a > b ? a : b);

console.log(executarOperacio(3, 2, sumar));
console.log(executarOperacio(3, 2, restar));
console.log(executarOperacio(3, 2, maxim));

// 3.2.2 Crea un array amb cinc temperatures. Mostra-les amb for i torna-les a mostrar amb for...of.
const arr = [32, 64, 23, 12, -2];

for (let i = 0; i < arr.length; i++) console.log(arr[i]);

for (const a of arr) console.log(a);

// 3.2.3 Calcula manualment la suma, la mitjana, el valor màxim i el valor mínim d’un array de nombres.

let sum = 0;
let max = arr[0];
let min = arr[0];
for (const temp of arr) {
  sum += temp;
  if (max < temp) max = temp;
  if (min > temp) min = temp;
}

console.log("Suma:", sum);
console.log("Mitjana:", (sum / arr.length).toFixed(2));
console.log("Maxim:", max);
console.log("Minim:", min);

// 3.2.4 Crea una funció comptarMajorsQue(valors, limit) que retorni quants elements superen el límit.

function comptarMajorsQue(valors, limit) {
  let comptador = 0;

  for (const val of valors) {
    if (val > limit) comptador++;
  }

  return comptador;
}

console.log("Recompte majors que 20:", comptarMajorsQue(arr, 20));

// 3.2.5 Crea una funció transformarArray(valors, callback) que construeixi i retorni un array nou aplicant el callback a cada element.

function transformarArray(valors, callback) {
  const array = [];

  for (let i = 0; i < valors.length; i++) {
    array[i] = callback(valors[i]);
  }

  return array;
}

const doble = (a) => a * 2;
console.log(arr);
console.log(transformarArray(arr, doble));

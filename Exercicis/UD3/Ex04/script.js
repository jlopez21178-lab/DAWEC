// 3.4.1 Mostra amb forEach els elements d’un array de noms precedits per la seva posició..
const arr = ["Python", "Ruby", "Java", "C", "C++", "C#", "JS"];

arr.forEach((a, i) => console.log(`${i}. ${a}`));

// 3.4.2 A partir d’un array de preus, crea amb map un array amb un descompte del 15 %..
const preus = [2.99, 432.53, 24.6, 1.0];
const preusDescompte = preus.map((preu) => preu * (1 - 0.15));
// 3.4.3 A partir d’un array de paraules, conserva amb filter les que tenguin cinc caràcters o més.
const paraules = ["avadaskd", "alo", "holiwis"];
const filtrades = paraules.filter((a) => a.length >= 5);
// 3.4.4 Converteix un array de minuts en textos del tipus “2 h 15 min” mitjançant map.
const minuts = [16, 94, 61, 120];
const temps = minuts.map((min) => {
  let hores = 0;
  while (min >= 60) {
    hores++;
    min -= 60;
  }
  return `${hores}h i ${min}min`;
});
// 3.4.5 Encadena filter i map per obtenir el quadrat de tots els nombres positius d’un array.

const nums = [-36, 0, 162, -1];
const quadrat = nums.filter((num) => num > 0).map((num) => num ** 2);

// 3.4.6 Demana una paraula i filtra totes les cadenes d’un array que la contenguin, ignorant majúscules i minúscules.

const paraula = "alo";
const regex = new RegExp(paraula, "i");
const palabras = ["Alohomora", "holiwis", "avadakebrada", "hola"];
const coincidencies = palabras.filter((palabra) => palabra.match(regex));

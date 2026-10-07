let numero = prompt("Introduce un numero positivo: ");

function esPar(num) {
  return !(num % 2);
}

function esPrimo(num) {
  for (let i = 2; i < num; i++) {
    if (!(num % i)) return false;
  }

  return true;
}

function obtenerDivisoresPropios(num) {
  let divisores = " ";
  for (let i = 1; i < num; i++) {
    if (!(num % i)) divisores += `${i}, `;
  }

  return divisores.slice(0, divisores.length - 2);
}

function sumaDivisoresPropios(num) {
  let suma = 0;

  for (let i = 0; i < num; i++) {
    if (!(num % i)) suma += i;
  }

  return suma;
}

function clasificarNumero(num, suma) {
  if (num == suma) {
    return "perfecte";
  } else if (num < suma) {
    return "abundant";
  } else {
    return "deficient";
  }
}

function analizador(num) {
  num = Number(num);

  if (!Number.isFinite(num) || num < 0 || typeof num != "number") {
    console.log("No es un numero valido");
    return;
  }

  console.log(`Iniciando analizis del numero: ${num}`);

  let par = esPar(num);
  let prim = esPrimo(num);
  let divisors = obtenerDivisoresPropios(num);
  let sumaDivisors = sumaDivisoresPropios(num);
  let clasificacio = clasificarNumero(num, sumaDivisors);

  console.log(`Es ${par ? "par" : "senar"}`);
  console.log(`${prim ? "Es" : "No es"} prim`);
  console.log(`Divisors propis: ${divisors}`);
  console.log(`Suma de los divisores propios: ${sumaDivisors}`);
  console.log(`El numero ${num} es ${clasificacio}`);
}

analizador(numero);

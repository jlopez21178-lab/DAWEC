const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const hourIn = document.getElementById("hour_in").value;
  const hourOut = document.getElementById("hour_out").value;
  const discount = document.getElementById("discount");

  if (!esHoraValida(hourIn) || !esHoraValida(hourOut)) {
    console.error("Introdueix hores valides");
    return;
  }
  if (!discount.value) {
    console.error("Eligeix un tipus de descompte");
    return;
  }


  let minutes = calcularDurada(hourIn, hourOut);
  let importBase = calcularImportBase(minutes);
  let durada = formatarDurada(minutes);
  
  console.log("Resum de l'estacionament");
  console.log(`Entrada: ${hourIn}`);
  console.log(`Sortida: ${hourOut}`);
  console.log(`Durada: ${durada}`);
  console.log(`Import base: ${importBase.toFixed(2)}`);
  console.log(`Tipus de descompte: ${discount.selectedOptions[0].textContent}`);
  console.log(`Quantitat ahorrat: ${(importBase * discount.value).toFixed(2)}`);
  console.log(`Total: ${calcularImportFinal(importBase, aplicarDescompte)}`);
});

function esHoraValida(time) {
  // Si no existe o tiene mas characteres que 5 da error, 
  // porque el formato es xx : xx
  if (time.length > 5 || !time) return false;
  // Si no tiene el separador correspondiente
  if (time[2] != ":") return false;

  // Comprobar que las horas y minutos no superen sus los 24 y 60
  //  respectivamente, y que no sean numeros negativos
  const [hour, minute] = separarTiempo(time);
  if (hour > 23 || hour < 0) return false;
  if (minute > 59 || minute < 0) return false;

  return true;
}

function separarTiempo(time) {
  return [Number(time.slice(0, 2)), Number(time.slice(3))];
}

function convertirAMinuts(time) {
  const [hour, minute] = separarTiempo(time);
  return hour * 60 + minute;
}

function calcularDurada(timeIn, timeOut) {
  timeIn = convertirAMinuts(timeIn);
  timeOut = convertirAMinuts(timeOut);

  // Si el timeOut es menor o igual que el timeIn significa 
  // que el usuario ha estado o un dia, o lo dejo por la tarde
  // y lo recogio por la mañana se le añade un dia mas al timeOut
  if (timeOut <= timeIn) timeOut += 1440;

  return timeOut - timeIn;
}

function formatarDurada(minute) {
  let hores = 0;

  while (minute > 60) {
    hores++;
    minute -= 60;
  }

  return `${hores} h i ${minute} min`;
}

function calcularImportBase(minute) {
  let importBase = 0;


  if (minute > 30) {
    let primerTram = Math.min(minute, 120) - 30;
    importBase += primerTram * 0.3;

    if (minute > 120) {
      let segonTram = Math.min(minute, 300) - 120;
      importBase += segonTram * 0.2;

      if (minute > 300) {
        let tercerTram = minute - 300;
        importBase += tercerTram * 0.1;
      }
    }
  }

  return Math.min(importBase, 18.0);
}

function calcularImportFinal(baseImport, applyDiscount) {
  return applyDiscount(baseImport);
}

function aplicarDescompte(baseImport) {
  return (baseImport * (1 - discount.value)).toFixed(2);
}

// Se que hay que hacer una funcion para cada una, pero es feo y repeticion de codigo innecesario
// Igualmente aqui le dejo como serian

// function senseDescompte(baseImport) {
//   return baseImport;
// }
// function descompteElectric(baseImport) {
//   return baseImport * (1 - 0.2);
// }
// function descompteResident(baseImport) {
//   return baseImport * (1 - 0.3);
// }

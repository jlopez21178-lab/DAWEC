class Producte {
  constructor(id, nombre, precio, estoc = 1) {
    if (!Number.isInteger(id))
      throw new TypeError("El id a de ser un numero entero");

    if (!nombre?.trim()) throw new Error("Nombre no valido");
    if (precio < 0) throw new RangeError("El precio no puede ser negativo");
    if (estoc < 0) throw new RangeError("EL estoc no puede ser negativo");

    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.estoc = estoc;
  }

  hiHaEstoc(unitats = 0) {
    return this.estoc >= unitats;
  }

  valorEstoc() {
    return this.precio * this.estoc;
  }

  getEtiqueta() {
    return `${this.nombre} - ${this.precio.toFixed(2)}€`;
  }

  static desdeProducte(dades) {
    return new Producte(dades.id, dades.nombre, dades.precio, dades.estoc);
  }
}

function importarProductes(textJSON) {
  let errors = [];
  let productes = [];
  // a. Capturar errors de sintaxi amb try/catch.
  try {
    textJSON = JSON.parse(textJSON);

    // b. Comprovar que l’arrel és un array.
    if (!Array.isArray(textJSON)) throw new Error("L'arrel no es un array");

    // c. Validar cada registre: id enter i únic, nom no buit, preu > 0 i estoc enter ≥ 0.
    let existeix = [];
    for (let i = 0; i < textJSON.length; i++) {
      const t = textJSON[i];
      if (!Number.isInteger(t.id) || existeix.filter((id) => id == t.id) > 1)
        throw new Error("Dades no valides a la posicio" + i);
      existeix.push(t.id);

      if (!t.nom?.trim())
        throw new Error("Nom de producte no valid a la posicio " + i);

      if (t.preu <= 0 || t.estoc < 0)
        throw new RangeError(
          "No es permeten valors negatius a la posicio " + i,
        );

      // d. Convertir els registres vàlids en instàncies de Producte.
      productes.push(new Producte(t.id, t.nom, t.preu, t.estoc));
    }
  } catch (error) {
    // e. Afegir als errors la posició i el motiu dels registres descartats.
    errors.push(error);
  }

  return { productes, errors };
}
// f. Provar JSON mal format, arrel no array, identificadors duplicats i valors límit.
const benFormat =
  '[{"id": 1, "nom":"ratoli", "preu":39.4, "estoc": 5}, {"id": 2, "nom":"teclat", "preu":67, "estoc": 15}] ';

const malFormat =
  '[{"id": 1, nom:"ratoli", "preu":39.4, "estoc": 5}, {"id": 2, "nom":"teclat", "preu":67, "estoc": 15}] ';

const noArray = '{"id": 1, "nom":"ratoli", "preu":39.4, "estoc": 5}';

const idDuplicats =
  '[{"id": 2, "nom":"ratoli", "preu":39.4, "estoc": 5}, {"id": 2, "nom":"teclat", "preu":67, "estoc": 15}] ';

const valorsLimit =
  '[{"id": 1, "nom":"ratoli", "preu":0.1, "estoc": 0}, {"id": 2, "nom":"teclat", "preu":-1, "estoc": 15}] ';

console.log(importarProductes(benFormat));
// console.log(importarProductes(malFormat));
// console.log(importarProductes(noArray));
console.log(importarProductes(idDuplicats));
console.log(importarProductes(valorsLimit));

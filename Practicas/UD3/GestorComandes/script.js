// Pràctica UD03 - Gestor de comandes

// Construir en consola el nucli d’una aplicació de comandes.
// Ha d’estar separat en classes i funcions pures, i ha de poder exportar i importar l’estat en JSON.

// Model de dades
const textInicial =
  '[{"id":101,"client":"Aina","estat":"pendent","linies":[{"producte":"Teclat","preu":39.95,"quantitat":2},{"producte":"Ratolí","preu":24.5,"quantitat":1}]}, {"id":102,"client":"Biel","estat":"enviada","linies":[{"producte":"Monitor","preu":189.9,"quantitat":1}]}]';

// Requisits obligatoris (RO)
// ● Classe LiniaComanda amb producte, preu i quantitat; mètode subtotal().
// ● Classe Comanda amb id, client, estat i línies; mètodes total(), totalUnitats() i resum().
// ● Mètodes estàtics desDeObjecte per reconstruir totes les instàncies imbricades.
// ● Funció importarComandes(text): parse segur, validació i missatges d’error.
// ● afegirComanda, eliminarComanda i canviarEstat han de retornar arrays nous.
// ● Cerca per client, filtre per estat i ordenació per total sense mutar l’original.
// ● Informe amb facturació total, comanda més cara, nombre de comandes per estat i productes venuts.
// ● Exportació final amb JSON.stringify(..., null, 2).

// Fases (F)
// 1. Definiu i proveu LiniaComanda amb casos normals i incorrectes.
// 2. Definiu Comanda i comproveu els càlculs amb reduce.
// 3. Importeu el text inicial i reconstruïu instàncies.
// 4. Implementeu les operacions immutables una a una.
// 5. Genereu els informes amb map, filter, find, reduce i ordenació.
// 6. Exporteu, torneu a importar i verifiqueu que es conserven dades i comportament.

// Resultats de comprovació (RC)
// ● La comanda 101 suma 104,40 € i 3 unitats.
// ● La comanda 102 suma 189,90 € i és la més cara.
// ● La facturació total inicial és 294,30 €.
// ● L’array inicial no canvia després de canviar l’estat d’una comanda.
// ● Després d’exportar i importar, cada element torna a ser instanceof Comanda.

// Recorda: La tasca s'ha de lliurar en el termini previst.

// Ampliacions opcionals (AO)
// ● Aplicar un descompte percentual sense modificar les línies originals.
// ● Agrupar la facturació per client amb reduce.
// ● Evitar transicions d’estat il·lògiques: una comanda cancel·lada no pot passar a enviada.
// ● Crear un toJSON en Comanda per controlar exactament l’exportació.
// ● Implementar una funció clonarMitjançantJSON i explicar per què no és una còpia general segura.

// RO1
class LiniaComanda {
  constructor(producte, preu, quantitat) {
    this.isValid(producte, preu, quantitat);

    this.producte = producte;
    this.preu = preu;
    this.quantitat = quantitat;
  }

  isValid(producte, preu, quantitat) {
    if (!producte?.trim())
      throw new Error("El nom del producte no pot estar buit");
    if (preu < 0 || quantitat < 0)
      throw new RangeError("El preu/quantitat no poden ser negatius");
  }

  subtotal() {
    return this.preu * this.quantitat;
  }

  // RO3
  static desDeObjecte(objecte) {
    return LiniaComanda(objecte.producte, objecte.preu, objecte.quantitat);
  }
}

// RO2
class Comanda {
  constructor(id, client, estat, linies) {
    this.isValid(id, client, estat);

    this.id = id;
    this.client = client;
    this.estat = estat;
    this.linies = linies;
  }

  isValid(id, client, estat) {
    if (id < 0 || !Number.isInteger(id))
      throw new RangeError("L'id ha de ser un nombre positiu enter");
    if (!client?.trim() || !estat?.trim())
      throw new Error("El client i/o l'estat no pot estar buits");
  }

  total() {
    return this.linies.length > 1
      ? this.linies.reduce((total, linia) => (total += linia.subtotal()))
      : this.linies.subtotal();
  }

  totalUnitats() {
    return this.linies.length > 1
      ? this.linies.reduce((total, linia) => (total += linia.quantitat))
      : this.linies.quantitat;
  }

  resum() {
    return `Comanda: ${this.id} - ${this.estat}\nClient: ${this.client}\nQuantitat total: ${this.totalUnitats()}\nPreu total: ${this.total()}`;
  }

  // RO3
  static desDeObjecte(objecte) {
    return new Comanda(
      objecte.id,
      objecte.client,
      objecte.estat,
      objecte.linies,
    );
  }
}

// RO4
function importarComandes(text) {
  let comandes = null;

  try {
    comandes = JSON.parse(text);
  } catch (error) {
    console.error(error);
  }

  return comandes;
}

// RO5
function afegirComanda(llista, comanda) {
  return [llista, comanda];
}

function eliminarComanda(llista, comanda) {
  const index = cercarComanda(llista, comanda);

  let novaLlista = [];
  for (let i = 0; i < llista.length; i++)
    if (i != index) novaLlista.push(llista[i]);

  return novaLlista;
}

function canviarEstat(llista, comanda, estat) {
  return llista.map((c) =>
    c.id == comanda.id ? new Comanda(c.id, c.client, estat, c.linies) : c,
  );
}

function cercarComanda(llista, comanda) {
  return llista.findIndex((list) => list.id == comanda.id);
}

// F1
const linia = new LiniaComanda("Teclat", 10.99, 3);
console.log(linia);
console.log(`Subtotal: ${linia.subtotal()}`);

// F2
let comanda = new Comanda(1, "Aina", "pendent", linia);
console.log(`Total: ${comanda.total()}`);
console.log(`Unitats: ${comanda.totalUnitats()}`);
console.log(`Resum: ${comanda.resum()}`);

// F3
let lista = [
  new Comanda(1, "Aina", "pendent", linia),
  new Comanda(2, "Victor", "Finished", linia),
];

lista = canviarEstat(lista, comanda, "finished");

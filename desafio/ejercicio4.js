/**
 * Crea un dispensador de gaseosas que permite consultar el stock
 * @param {Array} unidades - Array con las unidades disponibles de cada gaseosa
 * @param {Array} gaseosas - Array con los nombres de las gaseosas
 * @returns {Function} - Función para consultar el stock de una gaseosa
 */
function dispenserGaseosas(unidades, gaseosas) {
  // Validar que ambos parámetros sean arrays
  if (!Array.isArray(unidades) || !Array.isArray(gaseosas)) {
    return "Ambos parámetros deben ser arrays";
  }
  
  // Validar que tengan la misma longitud
  if (unidades.length !== gaseosas.length) {
    return "Los arrays deben tener la misma longitud";
  }
  
  // Crear el objeto gaseosasEnStock
  const gaseosasEnStock = {};
  
  // Llenar el objeto con las gaseosas y sus unidades
  for (let i = 0; i < gaseosas.length; i++) {
    gaseosasEnStock[gaseosas[i]] = unidades[i];
  }
  
  // Retornar una función para consultar el stock
  return function consultarStock(gaseosa) {
    if (gaseosa in gaseosasEnStock) {
      if (gaseosasEnStock[gaseosa] > 0) {
        return `Sí, hay ${gaseosasEnStock[gaseosa]} unidades de ${gaseosa}`;
      } else {
        return `No hay stock de ${gaseosa}`;
      }
    } else {
      return `${gaseosa} no está en nuestro catálogo`;
    }
  };
}

// Ejemplo de uso
let unidades = [1, 2, 3, 4];
let gaseosas = ["cocacola", "sprite", "fanta", "seven up"];

console.log("Ejercicio 4 - SODA DISPENSER");
const consultar = dispenserGaseosas(unidades, gaseosas);
console.log("Stock de cocacola:", consultar("cocacola")); // Sí, hay 1 unidades de cocacola
console.log("Stock de fanta:", consultar("fanta")); // Sí, hay 3 unidades de fanta
console.log("Stock de pepsi:", consultar("pepsi")); // pepsi no está en nuestro catálogo
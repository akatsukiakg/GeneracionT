/**
 * Filtra un array de objetos para obtener solo las frutas
 * @param {Array} array - Array de objetos con frutas y verduras
 * @returns {Object} - Objeto con un array de nombres de frutas
 */
function filtrarFrutas(array) {
  // Validar que el parámetro sea un array
  if (!Array.isArray(array)) {
    return "El parámetro debe ser un array";
  }
  
  // Filtrar solo los objetos que tienen la propiedad 'fruta'
  const soloFrutas = array.filter(item => 'fruta' in item);
  
  // Extraer los nombres de las frutas
  const nombresFrutas = soloFrutas.map(item => item.fruta);
  
  // Retornar el objeto con el formato solicitado
  return { frutas: nombresFrutas };
}

// Ejemplo de uso
let frutasYVerduras = [
  {fruta:"banana"},
  {verdura:"apio"},
  {fruta:"manzana"},
  {fruta:"frutilla"},
  {verdura:"zanahoria"},
  {fruta:"kiwi"},
  {fruta:"sandia"},
  {fruta:"melon"},
  {verdura:"repollo"},
  {fruta:"mango"}
];

console.log("Ejercicio 3 - FROOTLOOP");
console.log(filtrarFrutas(frutasYVerduras));
// {frutas: ['banana', 'manzana', 'frutilla', 'kiwi', 'sandia', 'melon', 'mango']}
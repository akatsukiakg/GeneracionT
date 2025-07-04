/**
 * Agrega el año de nacimiento a un array de objetos con nombre y edad
 * @param {Array} personas - Array de objetos con nombre y edad
 * @returns {Array} - Array de objetos con nombre, edad y año de nacimiento
 */
function agregarAñoNacimiento(personas) {
  // Validar que el parámetro sea un array
  if (!Array.isArray(personas)) {
    return "El parámetro debe ser un array";
  }
  
  // Obtener el año actual
  const añoActual = new Date().getFullYear();
  
  // Agregar la propiedad añoNacimiento a cada objeto
  return personas.map(persona => {
    // Validar que el objeto tenga las propiedades requeridas
    if (!('nombre' in persona) || !('edad' in persona)) {
      return persona; // Devolver el objeto sin modificar si no cumple
    }
    
    // Crear una copia del objeto para no modificar el original
    const personaConAño = {...persona};
    
    // Calcular el año de nacimiento
    personaConAño.añoNacimiento = añoActual - persona.edad;
    
    return personaConAño;
  });
}

// Ejemplo de uso
const personas = [
  {nombre: "Juan", edad: 19},
  {nombre: "Mario", edad: 22}
];

console.log("Ejercicio 5 - AÑO DE NACIMIENTO");
console.log(agregarAñoNacimiento(personas));
// [{nombre: "Juan", edad: 19, añoNacimiento: 2005}, {nombre: "Mario", edad: 22, añoNacimiento: 2002}]
// (Asumiendo que el año actual es 2024)
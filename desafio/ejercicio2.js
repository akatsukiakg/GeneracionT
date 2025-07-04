/**
 * Compara dos números y retorna el mayor, o la primera y última letra de una palabra si son iguales
 * @param {number} num1 - Primer número a comparar
 * @param {number} num2 - Segundo número a comparar
 * @param {string} palabra - Palabra para extraer letras si los números son iguales
 * @returns {number|string} - El número mayor o las letras extraídas
 */
function biggestOne(num1, num2, palabra) {
  // Validar que los dos primeros parámetros sean números
  if (isNaN(num1) || isNaN(num2)) {
    return "Los dos primeros parámetros deben ser números";
  }
  
  // Validar que el tercer parámetro sea una cadena
  if (typeof palabra !== 'string' || palabra.length === 0) {
    return "El tercer parámetro debe ser una palabra válida";
  }
  
  // Comparar los números
  if (num1 > num2) {
    return num1;
  } else if (num2 > num1) {
    return num2;
  } else {
    // Si son iguales, retornar la primera y última letra
    return palabra[0] + palabra[palabra.length - 1];
  }
}

// Ejemplos de uso
console.log("Ejercicio 2 - THE BIGGEST ONE");
console.log("16, 2, \"Haz\":", biggestOne(16, 2, "Haz")); // 16
console.log("3, 3, \"Haz\":", biggestOne(3, 3, "Haz")); // Hz
console.log("5, 10, \"Programación\":", biggestOne(5, 10, "Programación")); // 10
/**
 * Evalúa el rendimiento de un alumno en un examen
 * @param {number} nota - Nota del alumno (entre 0 y 10)
 * @returns {string} - Evaluación del rendimiento
 */
function evaluarRendimiento(nota) {
  // Validar que la nota esté entre 0 y 10
  if (nota < 0 || nota > 10 || isNaN(nota)) {
    return "Nota inválida. Debe ser un número entre 0 y 10";
  }
  
  // Evaluar según los rangos especificados
  if (nota >= 0 && nota < 2) {
    return "Muy mal";
  } else if (nota >= 2 && nota < 5) {
    return "Mal";
  } else if (nota >= 5 && nota < 6) {
    return "Tan cerca pero tan lejos";
  } else if (nota >= 6 && nota < 8) {
    return "Bien!";
  } else {
    return "Messi?";
  }
}

// Ejemplos de uso
console.log("Ejercicio 1 - Evaluación de Rendimiento");
console.log("Nota 1:", evaluarRendimiento(1)); // Muy mal
console.log("Nota 3:", evaluarRendimiento(3)); // Mal
console.log("Nota 5.5:", evaluarRendimiento(5.5)); // Tan cerca pero tan lejos
console.log("Nota 7:", evaluarRendimiento(7)); // Bien!
console.log("Nota 9:", evaluarRendimiento(9)); // Muy bien!!
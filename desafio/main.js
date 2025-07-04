// Navegación entre ejercicios
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const ejercicioSections = document.querySelectorAll('.ejercicio-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Desactivar todos los botones
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activar el botón actual
            this.classList.add('active');
            
            // Ocultar todas las secciones
            ejercicioSections.forEach(section => section.style.display = 'none');
            
            // Mostrar la sección correspondiente
            const ejercicioNum = this.getAttribute('data-ejercicio');
            document.getElementById(`ejercicio${ejercicioNum}`).style.display = 'block';
        });
    });
});

// Funciones para probar los ejercicios
function probarEjercicio1() {
    const notaInput = document.getElementById('nota-input').value;
    const resultado = document.getElementById('resultado1');
    
    if (notaInput === '') {
        resultado.textContent = 'Por favor, ingresa una nota';
        return;
    }
    
    const nota = parseFloat(notaInput);
    const evaluacion = evaluarRendimiento(nota);
    
    resultado.textContent = `Resultado: ${evaluacion}`;
}

function probarEjercicio2() {
    const num1Input = document.getElementById('num1-input').value;
    const num2Input = document.getElementById('num2-input').value;
    const palabraInput = document.getElementById('palabra-input').value;
    const resultado = document.getElementById('resultado2');
    
    if (num1Input === '' || num2Input === '' || palabraInput === '') {
        resultado.textContent = 'Por favor, completa todos los campos';
        return;
    }
    
    const num1 = parseFloat(num1Input);
    const num2 = parseFloat(num2Input);
    const respuesta = biggestOne(num1, num2, palabraInput);
    
    resultado.textContent = `Resultado: ${respuesta}`;
}

// Configuración para el ejercicio 4
let stockGaseosas;
document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales
    let unidades = [1, 2, 3, 4];
    let gaseosas = ["cocacola", "sprite", "fanta", "seven up"];
    
    // Crear el dispensador
    stockGaseosas = dispenserGaseosas(unidades, gaseosas);
});

function probarEjercicio4() {
    const gaseosaInput = document.getElementById('gaseosa-input').value;
    const resultado = document.getElementById('resultado4');
    
    if (!stockGaseosas) {
        resultado.textContent = 'Error: El dispensador no está inicializado';
        return;
    }
    
    const respuesta = stockGaseosas(gaseosaInput);
    resultado.textContent = respuesta;
}

function probarEjercicio5() {
    const nombreInput = document.getElementById('nombre-input').value;
    const edadInput = document.getElementById('edad-input').value;
    const resultado = document.getElementById('resultado5');
    
    if (nombreInput === '' || edadInput === '') {
        resultado.textContent = 'Por favor, completa todos los campos';
        return;
    }
    
    const edad = parseInt(edadInput);
    const persona = {nombre: nombreInput, edad: edad};
    const respuesta = agregarAñoNacimiento([persona]);
    
    resultado.textContent = JSON.stringify(respuesta, null, 2);
}
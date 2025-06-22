// Función principal para calcular la jubilación
function calcularJubilacion() {
    // Obtener valores del formulario
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.getElementById('genero').value;
    
    // Validar que se hayan ingresado todos los datos
    if (!edad || !genero) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }
    
    // Validar que la edad sea válida
    if (edad < 1 || edad > 120) {
        alert('Por favor, ingresa una edad válida (entre 1 y 120 años).');
        return;
    }
    
    // Determinar si puede jubilarse según las reglas argentinas
    let puedeJubilarse = false;
    let edadJubilacion = 0;
    let añosRestantes = 0;
    
    if (genero === 'mujer') {
        edadJubilacion = 60;
        puedeJubilarse = edad >= 60;
        añosRestantes = Math.max(0, 60 - edad);
    } else if (genero === 'hombre') {
        edadJubilacion = 65;
        puedeJubilarse = edad >= 65;
        añosRestantes = Math.max(0, 65 - edad);
    }
    
    // Mostrar el resultado
    mostrarResultado(puedeJubilarse, edad, genero, edadJubilacion, añosRestantes);
}

// Función para mostrar el resultado
function mostrarResultado(puedeJubilarse, edad, genero, edadJubilacion, añosRestantes) {
    const resultadoDiv = document.getElementById('resultado');
    const resultContent = resultadoDiv.querySelector('.result-content');
    const resultTitle = resultadoDiv.querySelector('.result-title');
    const resultMessage = resultadoDiv.querySelector('.result-message');
    
    // Limpiar clases anteriores
    resultContent.classList.remove('can-retire', 'cannot-retire');
    
    if (puedeJubilarse) {
        // Puede jubilarse
        resultContent.classList.add('can-retire');
        resultTitle.textContent = '¡Felicitaciones! 🎉';
        
        const generoTexto = genero === 'mujer' ? 'mujer' : 'hombre';
        const añosJubilado = edad - edadJubilacion;
        
        if (añosJubilado === 0) {
            resultMessage.innerHTML = `
                Como ${generoTexto} de ${edad} años, <strong>ya puedes jubilarte</strong> en Argentina.<br>
                La edad mínima de jubilación para ${genero === 'mujer' ? 'mujeres' : 'hombres'} es ${edadJubilacion} años.<br>
                ¡Es hora de disfrutar tu merecido descanso!
            `;
        } else {
            resultMessage.innerHTML = `
                Como ${generoTexto} de ${edad} años, <strong>ya puedes jubilarte</strong> en Argentina.<br>
                La edad mínima de jubilación para ${genero === 'mujer' ? 'mujeres' : 'hombres'} es ${edadJubilacion} años.<br>
                Llevas ${añosJubilado} año${añosJubilado > 1 ? 's' : ''} en edad de jubilación.<br>
                ¡Disfruta tu jubilación!
            `;
        }
    } else {
        // No puede jubilarse aún
        resultContent.classList.add('cannot-retire');
        resultTitle.textContent = 'Aún no puedes jubilarte';
        
        const generoTexto = genero === 'mujer' ? 'mujer' : 'hombre';
        
        resultMessage.innerHTML = `
            Como ${generoTexto} de ${edad} años, <strong>aún no puedes jubilarte</strong> en Argentina.<br>
            La edad mínima de jubilación para ${genero === 'mujer' ? 'mujeres' : 'hombres'} es ${edadJubilacion} años.<br>
            Te faltan <strong>${añosRestantes} año${añosRestantes > 1 ? 's' : ''}</strong> para poder jubilarte.<br>
            ¡Sigue trabajando y ahorrando para tu futuro!
        `;
    }
    
    // Ocultar el formulario y mostrar el resultado con animación
    document.querySelector('.form-section').style.display = 'none';
    resultadoDiv.style.display = 'block';
    
    // Scroll suave hacia el resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}

// Función para reiniciar la calculadora
function reiniciar() {
    // Limpiar los campos del formulario
    document.getElementById('edad').value = '';
    document.getElementById('genero').value = '';
    
    // Ocultar el resultado y mostrar el formulario
    document.getElementById('resultado').style.display = 'none';
    document.querySelector('.form-section').style.display = 'block';
    
    // Scroll suave hacia arriba
    document.querySelector('.calculator-card').scrollIntoView({ behavior: 'smooth' });
    
    // Enfocar el primer campo
    document.getElementById('edad').focus();
}

// Permitir calcular presionando Enter en los campos
document.addEventListener('DOMContentLoaded', function() {
    const edadInput = document.getElementById('edad');
    const generoSelect = document.getElementById('genero');
    
    // Agregar event listeners para Enter
    edadInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularJubilacion();
        }
    });
    
    generoSelect.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularJubilacion();
        }
    });
    
    // Enfocar el primer campo al cargar la página
    edadInput.focus();
});

// Función para validar entrada numérica en tiempo real
document.getElementById('edad').addEventListener('input', function(e) {
    let value = e.target.value;
    
    // Remover caracteres no numéricos
    value = value.replace(/[^0-9]/g, '');
    
    // Limitar a 3 dígitos máximo
    if (value.length > 3) {
        value = value.slice(0, 3);
    }
    
    // Actualizar el valor del campo
    e.target.value = value;
});
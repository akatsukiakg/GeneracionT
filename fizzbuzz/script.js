// Función principal FizzBuzz 2.0
function fizzBuzz2(palabra1, palabra2, fizz_num, buzz_num, limite) {
    let resultado = [];
    
    for (let i = 1; i <= limite; i++) {
        let output = '';
        
        // Verificar si es múltiplo de fizz_num
        if (i % fizz_num === 0) {
            output += palabra1;
        }
        
        // Verificar si es múltiplo de buzz_num
        if (i % buzz_num === 0) {
            output += palabra2;
        }
        
        // Si no es múltiplo de ninguno, usar el número
        if (output === '') {
            output = i.toString();
        }
        
        resultado.push(output);
    }
    
    return resultado.join(', ');
}

// Función para generar el FizzBuzz desde la interfaz
function generarFizzBuzz() {
    // Obtener valores del formulario
    const palabra1 = document.getElementById('palabra1').value.trim();
    const palabra2 = document.getElementById('palabra2').value.trim();
    const fizz_num = parseInt(document.getElementById('fizz_num').value);
    const buzz_num = parseInt(document.getElementById('buzz_num').value);
    const limite = parseInt(document.getElementById('limite').value);
    
    // Validar que se hayan ingresado todos los datos
    if (!palabra1 || !palabra2) {
        alert('Por favor, ingresa ambas palabras antes de continuar.');
        return;
    }
    
    if (!fizz_num || !buzz_num || !limite) {
        alert('Por favor, completa todos los campos numéricos.');
        return;
    }
    
    // Validar rangos
    if (fizz_num < 1 || fizz_num > 50) {
        alert('El múltiplo para Palabra 1 debe estar entre 1 y 50.');
        return;
    }
    
    if (buzz_num < 1 || buzz_num > 50) {
        alert('El múltiplo para Palabra 2 debe estar entre 1 y 50.');
        return;
    }
    
    if (limite < 1 || limite > 1000) {
        alert('El límite debe estar entre 1 y 1000.');
        return;
    }
    
    // Generar el resultado
    const resultado = fizzBuzz2(palabra1, palabra2, fizz_num, buzz_num, limite);
    
    // Mostrar el resultado
    mostrarResultado(resultado, palabra1, palabra2, fizz_num, buzz_num, limite);
}

// Función para mostrar el resultado
function mostrarResultado(resultado, palabra1, palabra2, fizz_num, buzz_num, limite) {
    const resultadoDiv = document.getElementById('resultado');
    const configInfo = document.getElementById('config-info');
    const outputDiv = document.getElementById('fizzbuzz-output');
    
    // Configurar información de la configuración
    configInfo.innerHTML = `
        <strong>Configuración:</strong> 
        "${palabra1}" (múltiplos de ${fizz_num}), 
        "${palabra2}" (múltiplos de ${buzz_num}), 
        contando hasta ${limite}
    `;
    
    // Mostrar el resultado
    outputDiv.textContent = resultado;
    
    // Ocultar el formulario y mostrar el resultado
    document.querySelector('.form-section').style.display = 'none';
    resultadoDiv.style.display = 'block';
    
    // Scroll suave hacia el resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Guardar resultado para copiar
    window.ultimoResultado = resultado;
}

// Función para copiar el resultado al portapapeles
function copiarResultado() {
    if (window.ultimoResultado) {
        navigator.clipboard.writeText(window.ultimoResultado).then(function() {
            // Cambiar temporalmente el texto del botón
            const copyBtn = document.querySelector('.copy-btn');
            const textoOriginal = copyBtn.textContent;
            copyBtn.textContent = '✅ ¡Copiado!';
            copyBtn.style.background = 'linear-gradient(135deg, rgba(0, 255, 0, 0.4), rgba(0, 200, 0, 0.4))';
            
            setTimeout(() => {
                copyBtn.textContent = textoOriginal;
                copyBtn.style.background = 'linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 0, 0.2))';
            }, 2000);
        }).catch(function(err) {
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = window.ultimoResultado;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            alert('Resultado copiado al portapapeles');
        });
    }
}

// Función para reiniciar la aplicación
function reiniciar() {
    // Limpiar los campos del formulario (mantener valores por defecto)
    document.getElementById('palabra1').value = 'Fizz';
    document.getElementById('palabra2').value = 'Buzz';
    document.getElementById('fizz_num').value = '3';
    document.getElementById('buzz_num').value = '5';
    document.getElementById('limite').value = '100';
    
    // Ocultar el resultado y mostrar el formulario
    document.getElementById('resultado').style.display = 'none';
    document.querySelector('.form-section').style.display = 'block';
    
    // Scroll suave hacia arriba
    document.querySelector('.fizzbuzz-card').scrollIntoView({ behavior: 'smooth' });
    
    // Enfocar el primer campo
    document.getElementById('palabra1').focus();
    
    // Limpiar resultado guardado
    window.ultimoResultado = null;
}

// Función para validar entrada de texto (solo letras y números)
function validarTexto(input) {
    // Permitir letras, números y algunos caracteres especiales
    input.value = input.value.replace(/[^a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ]/g, '');
}

// Función para validar entrada numérica
function validarNumero(input, min, max) {
    let value = parseInt(input.value);
    
    if (isNaN(value) || value < min) {
        input.value = min;
    } else if (value > max) {
        input.value = max;
    }
}

// Event listeners cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listeners para validación en tiempo real
    const palabra1Input = document.getElementById('palabra1');
    const palabra2Input = document.getElementById('palabra2');
    const fizzNumInput = document.getElementById('fizz_num');
    const buzzNumInput = document.getElementById('buzz_num');
    const limiteInput = document.getElementById('limite');
    
    // Validación de texto para palabras
    palabra1Input.addEventListener('input', function() {
        validarTexto(this);
    });
    
    palabra2Input.addEventListener('input', function() {
        validarTexto(this);
    });
    
    // Validación de números
    fizzNumInput.addEventListener('input', function() {
        validarNumero(this, 1, 50);
    });
    
    buzzNumInput.addEventListener('input', function() {
        validarNumero(this, 1, 50);
    });
    
    limiteInput.addEventListener('input', function() {
        validarNumero(this, 1, 1000);
    });
    
    // Permitir generar con Enter en cualquier campo
    const inputs = [palabra1Input, palabra2Input, fizzNumInput, buzzNumInput, limiteInput];
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generarFizzBuzz();
            }
        });
    });
    
    // Enfocar el primer campo al cargar
    palabra1Input.focus();
});

// Función de demostración con valores predeterminados
function demostracionFizzBuzz() {
    console.log('=== Demostración FizzBuzz 2.0 ===');
    
    // Ejemplo 1: FizzBuzz clásico
    console.log('\n1. FizzBuzz Clásico (1-15):');
    console.log(fizzBuzz2('Fizz', 'Buzz', 3, 5, 15));
    
    // Ejemplo 2: Personalizado
    console.log('\n2. Ping-Pong (1-20, múltiplos de 2 y 7):');
    console.log(fizzBuzz2('Ping', 'Pong', 2, 7, 20));
    
    // Ejemplo 3: Otro personalizado
    console.log('\n3. Foo-Bar (1-25, múltiplos de 4 y 6):');
    console.log(fizzBuzz2('Foo', 'Bar', 4, 6, 25));
    
    console.log('\n=== Fin de la demostración ===');
}

// Ejecutar demostración en consola al cargar
demostracionFizzBuzz();
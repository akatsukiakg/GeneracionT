// Typer 3000 - funcionalidad principal
const words = [
  'californication',
  'plataforma5',
  'black',
  'summer',
  'flea',
  'aeroplane',
  'peppers',
  'unlimited',
  'arcadium',
  'love',
  'getaway',
  'stadium',
  'quixoticelixer',
  'quarter',
  'snow',
  'dylan',
  'zephyr',
  'funky',
  'chili'
];

// Referencias al DOM
const randomWordEl = document.getElementById('randomWord');
const textInput = document.getElementById('text');
const timeSpan = document.getElementById('timeSpan');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');
const mainContainer = document.querySelector('.main');

// Estado del juego
let palabraAleatoria = '';
let time = 10;
let score = 0;
let timeInterval = null;

// Devuelve una palabra aleatoria del arreglo
function randomWords(){
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function addToDOM(){
  palabraAleatoria = randomWords();
  randomWordEl.textContent = palabraAleatoria;
}

function updateScore(){
  score += 1;
  scoreEl.textContent = score;
}

function gameOver(){
  // Detener intervalo si sigue corriendo
  if(timeInterval) clearInterval(timeInterval);

  // Remover la sección principal para mostrar el resultado
  if(mainContainer) mainContainer.remove();

  // Mostrar pantalla de fin de juego
  endGameContainer.innerHTML = `
    <h2>Se acabó el tiempo</h2>
    <p>Puntaje final: <strong>${score}</strong></p>
    <button class="btn" id="restartBtn">Volver a jugar</button>
  `;

  const btn = document.getElementById('restartBtn');
  if(btn){
    btn.addEventListener('click', ()=>{
      // Recargar la página para reiniciar el juego de forma simple
      window.location.reload();
    });
  }
}

function actualizarTiempo(){
  timeSpan.textContent = `${time}s`;

  timeInterval = setInterval(()=>{
    time -= 1;
    timeSpan.textContent = `${time}s`;

    if(time <= 0){
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

// Evento para capturar el texto ingresado
textInput.addEventListener('input', (e)=>{
  const palabraIngresada = e.target.value.trim().toLowerCase();

  if(palabraIngresada === palabraAleatoria.toLowerCase()){
    // Acertó la palabra
    time += 3; // sumar 3 segundos
    e.target.value = '';
    updateScore();
    addToDOM();
  }
});

// Inicialización
addToDOM();
actualizarTiempo();

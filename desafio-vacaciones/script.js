let numSquares = 6;
let colors;
let pickedColor;

const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.getElementById('message');
const h1 = document.querySelector('h1');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');


init();

function init(){
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons(){
  modeButtons.forEach(btn => {
    btn.addEventListener('click', function(){
      modeButtons.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');

      numSquares = (this.textContent.trim().toLowerCase() === 'easy') ? 3 : 6;
      reset();
    });
  });
}

function setupSquares(){
  squares.forEach((square) => {
    square.addEventListener('click', function(){
      const clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor){
        messageDisplay.textContent = '¡Correcto!';
        resetButton.textContent = 'Play Again?';
        changeColors(pickedColor);
        h1.style.background = pickedColor;
      } else {

        this.style.background = getComputedStyle(document.body).backgroundColor || '#c4dafa';
        this.style.opacity = '0';
        messageDisplay.textContent = 'Intentalo Nuevamente';
      }
    });
  });
}

function reset(){

  colors = generateRandomColors(numSquares);

  pickedColor = pickColor();

  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'Nuevos Colores';
  messageDisplay.textContent = '';

  for(let i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = 'inline-block';
      squares[i].style.background = colors[i];
      squares[i].style.opacity = '1';
    } else {
      squares[i].style.display = 'none';
    }
  }

  h1.style.background = '#005187';
}

resetButton.addEventListener('click', function(){
  reset();
});

function changeColors(color){
  squares.forEach(square => {
    square.style.background = color;
    square.style.opacity = '1';
    square.style.display = 'inline-block';
  });
}

function pickColor(){
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(n){
  const arr = [];
  for(let i = 0; i < n; i++){
    arr.push(randomColor());
  }
  return arr;
}

function randomColor(){
    
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

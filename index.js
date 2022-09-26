console.log('Live reloading')

/* Variables declaration for: level in progress, automatic pattern, 
pattern entered and colors of the frames (respectively).*/
let level = 0;
let autoPattern = [];
let inputPattern = [];
let colors = ['red', 'aqua', 'blue', 'yellow'];

/* Obtaining objects for: start, title, container and the start over buttons (respectively).*/
const startBtn = document.querySelector('.btnStart');
const head = document.getElementById("upper-text");
const container = document.querySelector('.container');
const startOverBtn = document.querySelector('.btnStartOver');

//Function that starts the game.
function startGame() {
  startBtn.classList.add('hidden'); /*The start button is hidden.*/
  startOverBtn.classList.remove('hidden'); /*Making the start over button visible */
  nextLevel(); /*We go from level 0 which is the start of the game to level 1 where the game begins.*/
}

//Reset game function.
function resetGame(txt) { //Restore all the initial values and restart the game.
    alert(txt);
    level = 0;
    autoPattern = [];
    inputPattern = [];
    startBtn.classList.remove('hidden');
    startOverBtn.classList.add('hidden');
    head.textContent = 'Simon Game';
    container.classList.add('unclickable');
}

//If player wants to start over, we reset the game from first input
function startOver() { //Restore all the initial values and restart the game.
  level = 0;
  autoPattern = [];
  inputPattern = [];
  head.textContent = 'Simon Game';
  container.classList.add('unclickable');
  nextLevel();
}

//Function to execute the process of a turn.
function processTurn(frame) {
  const index = inputPattern.push(frame) - 1;

  if (inputPattern[index] !== autoPattern[index]) { //If the input pattern is different to the auto pattern the player will lose.
    resetGame('Game Over! You got the pattern wrong. Try again!');
    return;
  }

  if (inputPattern.length === autoPattern.length) { //If the patterns are the same, we proceed to the next level.
    inputPattern = [];
    setTimeout(() => { //Next level delay.
      nextLevel();
    }, 1000);
    return;
  }
}

/*Function to start player's turn.*/
function inputTurn(level) {
  container.classList.remove('unclickable'); /* We make the container clickable. */
}

/*Function for activating frame clicks during gameplay. */
function frameAction(color) {
  const tile = document.getElementById(color);

  tile.classList.add('action'); /* I call a CSS event to trigger it in a frame and recreate an auto keystoke.*/

  setTimeout(() => { /* Delay for auto keystroke. */
    tile.classList.remove('action'); /*I end the auto keystroke.*/
  }, 350);
}

/*Function to play the corresponding round or level.*/
function playLevel(nextPattern) {
  nextPattern.forEach((color, index) => { /*Iterator for each color and index combination and activate the keystrokes later.*/
    setTimeout(() => { /*Delay between auto keystrokes. */
      frameAction(color);
    }, (index + 1) * 550);
  });
}

/* Function to randomly add the next random keystroke in the next pattern.*/
function nextFrame() {
  const random = colors[Math.floor(Math.random() * 4)]; /*We obtain a random value from 0 to 3. */
  return random;
}

/* Function that starts the next level (in other words, 
  it starts the next sequence of clicks in the boxes).*/
function nextLevel() {
  level += 1; //Level increase.

  container.classList.add('unclickable'); //Container becomes unclikable again.
  head.textContent = `Level ${level} of 20`; //Change title text for current level.

  const nextPattern = [...autoPattern]; //All elements of the current automatic pattern are copied to the next pattern.
  nextPattern.push(nextFrame()); //The next automatic keystroke is added to the current pattern.
  playLevel(nextPattern);

  autoPattern = [...nextPattern]; //I send the following pattern to your main array.
  setTimeout(() => { //Delay to separate automatic and player patterns.
    inputTurn(level);
  }, level * 600 + 1000);
}

startBtn.addEventListener('click', startGame); //Start game event.

container.addEventListener('click', event => { //Clickable frames event listener.
  const { frame } = event.target.dataset;

  if (frame) {
    processTurn(frame);
  }
});

startOverBtn.addEventListener('click', startOver); // Manually restart the game
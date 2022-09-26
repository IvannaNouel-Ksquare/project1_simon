console.log('Live reloading')

/* Variables declaration for: level in progress, automatic pattern, boolean lost game, 
lost game pattern, pattern entered and colors of the frames (respectively).*/
let level = 0;
let lost = false;
let lostPattern = [];
let autoPattern = [];
let inputPattern = [];
let colors = ['red', 'aqua', 'blue', 'yellow'];

/* Obtaining objects for: start, title, container and the start over buttons (respectively).*/
const startBtn = document.querySelector('.btnStart');
const head = document.getElementById("upper-text");
const container = document.querySelector('.container');
const startOverBtn = document.querySelector('.btnStartOver');

//Objects and attributes for sound
let audioLabelR = document.createElement("audio");
audioLabelR.setAttribute("src", 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

let audioLabelG = document.createElement("audio");
audioLabelG.setAttribute("src", 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

let audioLabelB = document.createElement("audio");
audioLabelB.setAttribute("src", 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

let audioLabelY = document.createElement("audio");
audioLabelY.setAttribute("src", 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');


//Function that starts the game.
function startGame() {
  startBtn.innerText = 'Start';
  startBtn.classList.add('hidden'); /*The start button is hidden.*/
  startOverBtn.classList.remove('hidden'); /*Making the start over button visible */
  nextLevel(); /*We go from level 0 which is the start of the game to level 1 where the game begins.*/
}

//Reset game function.
function resetGame(txt) { //Restore all the initial values and restart the game to the last pattern played.
  if(txt !== ''){
    alert(txt);
  }
  level = 0;
  if (lost) { //Check if if the game is lost, if so, save the last pattern to play it again from the beginning.
    lostPattern = [...autoPattern];
  }
  autoPattern = [];
  inputPattern = [];
  startBtn.classList.remove('hidden');
  startOverBtn.classList.add('hidden');
  head.textContent = 'Simon Game';
  container.classList.add('unclickable');
}

//If player wants to start over, we reset the game from first input
function startOver() { //Restore all the initial values and restart the game without going to inicial state.
  level = 0;
  lost = true;
  lostPattern = [...autoPattern]
  autoPattern = [];
  inputPattern = [];
  container.classList.add('unclickable');
  nextLevel();
}

//Function to execute the process of a turn.
function processTurn(frame) {
  const index = inputPattern.push(frame) - 1;

  if (inputPattern[index] !== autoPattern[index]) { //If the input pattern is different to the auto pattern the player will lose.
    lost = true;
    resetGame('Game Over! You got the pattern wrong. Try again!');
    return;
  }

  if (inputPattern.length === autoPattern.length) { //If the patterns are the same, we proceed to the next level.
    inputPattern = [];
    if(autoPattern.length === 20){
      //If the player actually wins the game, they have the option to start over with a new pattern
      lost = false;
      level = 0;
      autoPattern = [];
      inputPattern = [];
      startBtn.classList.remove('hidden');
      startBtn.innerText = 'Start again?';
      startOverBtn.classList.add('hidden');
      head.textContent = 'Congratulations, you won the game, you are a true simon master';
      container.classList.add('unclickable');
      return;
    }else{
      setTimeout(() => { //Next level delay.
        nextLevel();
      }, 1000);
      return;
    }
  }
}

/*Function to start player's turn.*/
function inputTurn(level) {
  container.classList.remove('unclickable'); /* We make the container clickable. */
}

/*Function for activating frame clicks during gameplay. */
function frameAction(color) {
  const tile = document.getElementById(color);

  console.log(tile);
 
  
  switch (tile) {
    case red:
      
      audioLabelR.play();  
      break;
    case aqua:
      
      audioLabelG.play(); 
      break;
    case blue:
      
      audioLabelB.play(); 
      break;
    case yellow:
      
      audioLabelY.play();  

      break; 
  }

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
  container.classList.add('unclickable'); //Container becomes unclikable again..
  head.textContent = `Level ${level} of 20`; //Change title text for current level.
  
  if (lost) { //Check if the game is lost, if so, play with the lost pattern until it is completed.
    previousPattern();
    return;
  }

  const nextSequence = [...autoPattern]; //All elements of the current automatic pattern are copied to the next pattern.
  nextSequence.push(nextFrame()); //The next automatic keystroke is added to the current pattern.
  playLevel(nextSequence); //We proceed to play the next level.

  autoPattern = [...nextSequence]; //I send the following pattern to your main array.
  setTimeout(() => { //Delay to separate automatic and player patterns.
    inputTurn(level);
  }, level * 600 + 1000);
}

//Function to start the next level from the pattern of the last lost game.
function previousPattern() {
  const nextSequence = [...autoPattern]; //All elements of the current automatic pattern are copied to the next pattern.
  nextSequence.push(lostPattern.shift()); //The next automatic keystroke is added to the current pattern from lost one and I'm eliminating those of the lost pattern.
  playLevel(nextSequence); //We proceed to play the next level.

  autoPattern = [...nextSequence]; //I send the following pattern to your main array.
  setTimeout(() => { //Delay to separate automatic and player patterns.
    inputTurn(level);
  }, level * 600 + 1000);

  if (lostPattern.length === 0) { //I check if there are still elements of the missing pattern.
    lost = false;
  }
}

startBtn.addEventListener('click', startGame); //Start game event.

container.addEventListener('click', event => { //Clickable frames event listener.
  const { frame } = event.target.dataset;

  if (frame) {
    processTurn(frame);
  }
});

let redB = document.querySelector(".redSound");

    redB.addEventListener("click", () => {
      audioLabelR.play();  
    });

let yelB = document.querySelector(".yellowSound");

    yelB.addEventListener("click", () => {
      
      audioLabelY.play();  
    });

let blueB = document.querySelector(".blueSound");

    blueB.addEventListener("click", () => {
      
      audioLabelB.play();  
    });

let greenB = document.querySelector(".aquaSound");

    greenB.addEventListener("click", () => {
     
      audioLabelG.play();  
    });


startOverBtn.addEventListener('click', startOver); // Manually restart the game
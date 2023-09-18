// Make game start on any key press 

// Make game randomly choose button 

// Add class to show button added to pattern

// Add event to button for when clicked

// Check to see if button clicked was right

// If not, end game. Flash screen red and change text to Game over! Press any key to play again!

// If button was right, add new button to pattern and give visual feedback to show what the next pattern is

// Add audio to buttons and game


const baseDelay = 200;
const longDelay = 700;

let pattern = [];
let gameStart = false;
let btnActive = false;
let curLvl = 0;
let posInPattern = 0;


function randNum() {
    return Math.floor(Math.random() * 4) + 1;
}

function toggleClass(element, className, delay) {
    $(element).addClass(className);

    setTimeout(() => {
        $(element).removeClass(className);
    }, delay);
}

function playSound(soundName) {
    let audio = new Audio(`./audio/${soundName}.mp3`);
    audio.play(); 
}

function showPattern() {
    for (let i = 0; i < pattern.length; i++) {
        let btn = pattern[i];
        let currentDelay = (i * longDelay) + 1;

        setTimeout(() => {
           toggleClass(btn, "path", baseDelay); 
           playSound(btn.id);
        }, currentDelay);
    }
}

function nextLevel() {
    let nextLevelDelay = (pattern.length + 2) * longDelay;
    let nextBtn = $(`.btn-${randNum()}`)[0];
    btnActive = false;

    pattern.push(nextBtn);
    curLvl++;
    $("h1").text(`Level ${curLvl}`);
    
    setTimeout(() => {
        showPattern();
    }, longDelay + baseDelay);

    setTimeout(() => {
        posInPattern = 0;
        btnActive = true;
    }, nextLevelDelay);
    
}

function checkLogic(btn) {
    if(btn === pattern[posInPattern]){
        playSound(btn.id);
        posInPattern++;
    } else if (btn !== pattern[posInPattern]) {
        gameOver();
        return;
    }

    if(posInPattern === pattern.length){
        nextLevel();
    }
}

function gameOver() {
    gameStart = false;
    btnActive = false;
    pattern = [];
    curLvl = 0;
    posInPattern = 0;

    $("h1").text("Game over! Press any key to play again!");

    toggleClass("body", "game-over", baseDelay);
    playSound("wrong");
}

$(document).keypress(e => {
    if(gameStart === true) {
        return;
    }
    gameStart = true;
    nextLevel();
});

$(".btn").click(e => {
    let btn = e.target;
    if (gameStart === true && btnActive === true) {
        toggleClass(btn, "pressed", baseDelay);
        checkLogic(btn);
    }
});
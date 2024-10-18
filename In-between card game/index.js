const dealBtn = document.querySelector(".deal-btn");
const highBtn = document.querySelector(".high-btn");
const lowBtn = document.querySelector(".low-btn");
const foldBtn = document.querySelector(".fold-btn");
const inBetweenBtn = document.querySelector(".in-between-btn");
const playAgainBtn = document.querySelector(".play-again-btn");
const playingArea = document.querySelector(".playing-area");
const cardContainers = document.querySelectorAll(".card-container");
const resultTxt = document.querySelector(".result");
const playerCashTxt = document.querySelector(".player-cash");

const cardData = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": {"High": 14, "Low": 1}
}
const cards = Object.keys(cardData);

let selectedCards = [];
let selectedCardsValues = [];
let isAceHigh = true;
let curCard = 0;

let curPlayerCash = 20;
let winCash = 5;
let loseCash = 5;
let dupeCardLossCash = 10; 
let cashGoal = 50;

playerCashTxt.textContent = curPlayerCash;

function getRandomCards(amount){
    for (let i = 0; i < amount; i++) {
        let randomCard = cards[randNum(cards.length)];
        // let randomCard = "A";
        selectedCards.push(randomCard);
    }
}

function assignCardValues(){
    for(i = 0; i < selectedCards.length; i++){
        let card = selectedCards[i];
        let value;
        if(card === "A" && i === 0 && isAceHigh){
            value = cardData[card]["High"];
        } else if(card === "A" && i === 0 && !isAceHigh) {
            value = cardData[card]["Low"];
        } else if(card === "A"){
            value = cardData[card]["High"];
        } else {
            value = cardData[card]
        }

        selectedCardsValues.push(value);
    }
}

function randNum(max){
    return Math.floor(Math.random() * max);
}

function endGame(win){
    if(win === true){
        resultTxt.textContent = `CONGRATS!! You reached $${cashGoal} and beat the game! Refresh the page to play again!`;
    } else {
        resultTxt.textContent = "YOU SUCK!! You reached $0 and lost all of your money! Refresh the page to play again"
    }

    dealBtn.classList.add("hide");
    playAgainBtn.classList.add("hide");
}

function gameManager(won, duplicate){
    if(won === true && duplicate === false){
        curPlayerCash += winCash;
    } else if(duplicate === true){
        curPlayerCash -= dupeCardLossCash;
    } else if(!won && duplicate === false){
        curPlayerCash -= loseCash;
    }

    playerCashTxt.textContent = curPlayerCash;

    if(curPlayerCash >= cashGoal){
        endGame(true);
    }

    if(curPlayerCash <= 0){
        endGame(false);
    }
}

function gameLogic(){
    if(curCard === 2){
        inBetweenBtn.classList.remove("hide");
        foldBtn.classList.remove("hide");
    }

    if(curCard === 1){
        addCardToScreen();
        curCard++;
    }

    if(selectedCards[curCard] === "A" && curCard === 0){
        highBtn.classList.remove("hide");
        lowBtn.classList.remove("hide");
        addCardToScreen();
        curCard++;
    } else if(selectedCards[curCard] !== "A" && curCard === 0) {
        for (let i = 0; i < 2; i++) {
            addCardToScreen();
            curCard++;
        }
        inBetweenBtn.classList.remove("hide");
        foldBtn.classList.remove("hide");
    }
}

function finishHand(){
    let range = [selectedCardsValues[0], selectedCardsValues[1]];
    range.sort((a,b) => a - b);

    let least = range[0];
    let greatest = range[1];
    let lastCard = selectedCards[2];
    let lastCardValue = selectedCardsValues[selectedCardsValues.length - 1];

    inBetweenBtn.classList.add("hide");
    foldBtn.classList.add("hide");
    resultTxt.classList.remove("hide");
    playAgainBtn.classList.remove("hide");

    addCardToScreen();

    if(lastCardValue > least && lastCardValue < greatest){
        resultTxt.textContent = `Congrats, You Won $${winCash}!`;
        gameManager(true, false);
    } else if (lastCard === selectedCards[0] || lastCard === selectedCards[1]) {
        resultTxt.textContent = `DAMN, You Lost $${dupeCardLossCash} Because Of A Duplicate Card!`;
        gameManager(false, true);
    } else {
        resultTxt.textContent = `Womp Womp, You Lost $${loseCash}`;
        gameManager(false, false);
    }
}

function resetHand(){
    //Reseting Values
    selectedCards.length = 0;
    selectedCardsValues.length = 0;
    isAceHigh = true;
    curCard = 0;
    //Resetting Classes
    inBetweenBtn.classList.add("hide");
    foldBtn.classList.add("hide");
    dealBtn.classList.remove("hide");
    playAgainBtn.classList.add("hide");
    resultTxt.classList.add("hide");
    //Resetting HTML Elements
    cardContainers.forEach(card => {
        let cardImage = card.children[0];
        cardImage.src = "";
        card.classList.add("hide");
    });
}

function addCardToScreen(){
    let cardContainer = document.querySelector(`.card-${curCard}`);
    let image = cardContainer.children[0];
    
    image.classList.add("card-image");
    cardContainer.classList.remove("hide");
    image.src = `./imgs/${selectedCards[curCard]}.png`;
}

dealBtn.addEventListener("click", (e) => {
    getRandomCards(3);
    gameLogic();
    dealBtn.classList.add("hide");
});

playAgainBtn.addEventListener("click", (e) => {
    resetHand();
});

highBtn.addEventListener("click", (e) => {
    isAceHigh = true;
    highBtn.classList.add("hide");
    lowBtn.classList.add("hide");
    inBetweenBtn.classList.remove("hide");
    foldBtn.classList.remove("hide");
    gameLogic();
});

lowBtn.addEventListener("click", (e) => {
    isAceHigh = false;
    highBtn.classList.add("hide");
    lowBtn.classList.add("hide");
    inBetweenBtn.classList.remove("hide");
    foldBtn.classList.remove("hide");
    gameLogic();
});

inBetweenBtn.addEventListener("click", (e) => {
    assignCardValues();
    finishHand();
});

foldBtn.addEventListener("click", (e) => {
    resetHand();
});
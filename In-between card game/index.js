//The to do list

/* 
    So far I have created game logic for dealing cards and keeping track of the speicic logic neccesary to deal the correct amount of cards if the player is dealt an ace first or not dealt an ace first

    Make sure the card added to selected cards is an object that contains its value and key, and to make sure that the aces are of correct value

    Next we must make sure the player is able to declare high or low on the ace if that is the first card they are dealt

    We also have to finish functionality for the player to decide whether or not the next card they are dealt will be in between their current card set

    Add winning or losing result feedback on screen for player

    Next figure out a money system for the player, possibly start them with $20

    if they lose a bet on the card being in between they lose $5

    if they win they gain $5

    if the last card they are dealt is the same card as one they have previously been dealt they will instead lose $10 if they chose yes in between

    the goal is to reach $50

    if they reach 50 they win but if they hit 0 they lose
*/

const dealBtn = document.querySelector(".deal-btn");
const highBtn = document.querySelector(".high-btn");
const lowBtn = document.querySelector(".low-btn");
const inBetweenBtn = document.querySelector(".in-between");
const notInBetweenBtn = document.querySelector(".not-in-between");
const playingArea = document.querySelector(".playing-area");
const cardContainers = document.querySelectorAll(".card-container");

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
let isAceHigh = true;
let curCard = 0;

function getRandomCards(amount){
    for (let i = 0; i < amount; i++) {
        let randomCard = cards[randNum(cards.length)];
        // let randomCard = "A";
        selectedCards.push(randomCard);
    }
}

function randNum(max){
    return Math.floor(Math.random() * max);
}

function gameLogic(){
    if(curCard === 2){
        inBetweenBtn.classList.remove("hide");
        notInBetweenBtn.classList.remove("hide");
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
        notInBetweenBtn.classList.remove("hide");
    }
}

function addCardToScreen(){
    let cardContainer = cardContainers[curCard];

    console.log(cardContainer, curCard);
    let image = cardContainer.children[0];
    
    image.classList.add("card-image");
    image.src = `./imgs/${selectedCards[curCard]}.png`;
    
}

dealBtn.addEventListener("click", (e) => {
    getRandomCards(3);
    gameLogic();
    dealBtn.classList.add("hide");
});


highBtn.addEventListener("click", (e) => {
    isAceHigh = true;
    highBtn.classList.add("hide");
    lowBtn.classList.add("hide");
    inBetweenBtn.classList.remove("hide");
    notInBetweenBtn.classList.remove("hide");
    gameLogic();
});

lowBtn.addEventListener("click", (e) => {
    isAceHigh = false;
    highBtn.classList.add("hide");
    lowBtn.classList.add("hide");
    inBetweenBtn.classList.remove("hide");
    notInBetweenBtn.classList.remove("hide");
    gameLogic();
});

inBetweenBtn.addEventListener("click", (e) => {
    
});

notInBetweenBtn.addEventListener("click", (e) => {

})
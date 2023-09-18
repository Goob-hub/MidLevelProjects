let drumBtns = document.querySelectorAll(".drum");
let currentEl;

function toggleClass(className) {
    let elClassList = currentEl.classList;

    elClassList.add(className);
    setTimeout(() => {
        elClassList.remove(className);
    }, 200);
}

function playSound(btnOrKey) {
    let audio;
    
    if(typeof btnOrKey === 'string'){
        currentEl = document.querySelector(`.${btnOrKey}`);
    } else {
        currentEl = btnOrKey;
    }
    
    if(currentEl !== null){
        audio = new Audio(`./sounds/${currentEl.id}.mp3`);
        audio.play();
        toggleClass("pressed");
    }
    
}

for (let i = 0; i < drumBtns.length; i++) {
    let drumBtn = drumBtns[i];
    drumBtn.addEventListener("click", event => playSound(drumBtn));
}
    
document.addEventListener("keyup", event => playSound(event.key));




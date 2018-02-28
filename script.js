let round = 0;
let sequence = [];
let player = [];
let strict;
let colors = [1, 2, 3, 4];
let playerClickOff = false;
let audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

startGame();


//strict button config
function startConfig(){
    strict = document.querySelector('[data-difficulty="strict"]').checked;
}

// start game
function startGame(){
    document.querySelector('#start').onclick = function(){
    startConfig();
    sequence = [];
    player = [];
    playerClick();
    nextRound();
}
    document.querySelector('#restart').onclick = function(){
        restart();
    }
}

//restart button

//restart function
function restart(){
    startConfig();
    round = 0;
    sequence = [];
    player = [];
    playerClick();
    nextRound();
}


//increment round
function nextRound(){
    round ++;
    document.querySelector('#round').textContent = round;
    colorGen();
    animateColors();
   
    
}

//generate random color
function colorGen(){
    sequence.push(Math.floor(Math.random()  * 4) + 1);
}

//animate sequence
function animateColors(){
    let i = 0;
        let animationInt = setInterval(function(){
            animateEach(sequence[i])
            
            i++;
            
            if(i==sequence.length){
                clearInterval(animationInt);
            }
        }, 1000)
}

//animate each 
function animateEach(tile){
       let tileSelected = document.querySelector('[data-num='+ '"'+tile+'"'+']');
        tileSelected.classList.add('brighten');
        // playSound(tile);
    setTimeout(function(){
        tileSelected.classList.remove('brighten');
    }, 600)
}

//play sound function
function playSound(tile){
    switch (tile) {
        case 1:
            audio1.play();
            console.log('play');
            break;
        case 2:
            audio2.play();
            console.log('play');
            break;
        case 3:
            audio3.play();
            console.log('play');

            break;
        case 4:
            audio4.play();
                        console.log('play');

            break;
    }
}

//player click behavior
function playerClick(){
    let tiles = document.querySelectorAll('[data-num]');
    tiles.forEach(function(item){
        if (playerClickOff == false){
             item.addEventListener('click', function(){
             playerPush(this);
             playerClickOff = true;
        });
        }
    })
}

//player push function
function playerPush(item){
    let num = item.dataset.num;
    player.push(num);
  //  playSound(parseInt(num));
    compareAns();
}

//compare answers
function compareAns(){
        if (round <= 19){
            if (player[player.length-1] != sequence[player.length-1]){
        if (strict == true){
             //modal behavior
              document.querySelector('.modalBg').classList.toggle('shown');
              document.querySelector('.lose-modal').classList.toggle('shown');
            closeModal();
        } else {
              player = [];
              document.querySelector('.try-again-modal').classList.toggle('shown');
              document.querySelector('.modalBg').classList.toggle('shown');
            closeModal();
            console.log(document.querySelector('.try-again-modal').classList)
        }
        
    } else if (player.length === sequence.length){
     player = [];
     nextRound();
    }
        } else {
            document.querySelector('.win-modal').classList.toggle('shown');
            document.querySelector('.modalBg').classList.toggle('shown');
            closeModal();
        }
    
    
}

//close modal
function closeModal(){
    let modalBg = document.querySelector('.modalBg');
    let closeBtn = document.querySelectorAll('.btn');
    closeBtn.forEach(function(item){
        item.onclick = function(){
            this.parentNode.classList.toggle('shown');
            modalBg.classList.toggle('shown');
            if( round < 20 && strict == true){
               restart(); 
            } else if (round < 20) {
                animateColors();
            } else {
                restart();
            }
        }
    })
}
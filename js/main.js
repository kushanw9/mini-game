import { Enemy } from "./enemy.js";
import { Player } from "./player.js";


const gameOver = document.getElementById('game-over-window');
const gameOverLogo = document.getElementById('game-over-logo').setAttribute('src', 'img/assets/bg.png');
const playLogo=document.getElementById('btn-play').setAttribute('src', 'img/assets/pl.png');



////////////////////////////this logics belongs to player//////////////////////////////////////////

let run = false;
const player=new Player();
const enemy=new Enemy();

enemy.playerElm=player.playerElm;


/////////////////////////////// Player Controllers///////////////////////////////////////////////

document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space' && player.alive){
        player.jump = true;
    }else if (eventData.code === 'ArrowRight' && player.alive){
        player.transform(0);
        run = true;
        player.dx=4;


    }else if (eventData.code === 'ArrowLeft' && player.alive){
        player.transform(180);
        run = true;
        player.dx=-4;


    }
});

document.body.addEventListener('keyup', (eventData) => {
    if (eventData.code === 'ArrowRight'){
        run = false;
        player.dx=0;
    }else if (eventData.code === 'ArrowLeft'){
        run = false;
        player.dx=0;
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////// Replay ////////////////////////////////////////////////////////////////


document.body.addEventListener('click', (eventData) => {
    if (eventData?.target.classList.contains('touch')) {
        reset();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// document.body.addEventListener('click', ()=> document.body.requestFullscreen());



////////////////////////////// Finish and Reset ///////////////////////////////////////


export function finish() {
    gameOver.style.visibility = 'visible';
}

function reset() {
    enemy.kill=false;
    player.alive=true;
    gameOver.style.visibility = 'hidden';
    enemy.enemyElement.style.left = `${1200}px`;
    player.playerElm.style.left = `${75}px`;
    player.playerElm.style.transform=`translateX(-${50}%)`;
    player.gameOver=false;
    player.playerElm.style.width='180px'

}
////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////// Time Intervals/////////////////////////////////////////////////////

// Related to player

setInterval(()=> {
    if (player.jump){
        player.doJump();
    }
    if (run){
        player.doRun();
    }
}, 5);



setInterval(()=> {
    if(enemy.kill){
        player.drawDie();
    }
    else if (!player.jump && !run){
        player.drawIdle();
    }else if (player.jump){
        player.drawJump();
    }else if (!player.jump && run){
        player.drawRun();
    }
} , (50));

// Related to Enemy

setInterval(()=> {
    enemy.drawRun();

} , (50));

setInterval(()=> {
    if (enemy.kill && player.alive) {
        player.alive = false;
    }
    if (!enemy.kill) {
        enemy.doRun();
    } else {
        enemy.enemyElement.style.left='-250px';
    }

}, 15);


///////////////////////////////////////////////////////////////////////////////////
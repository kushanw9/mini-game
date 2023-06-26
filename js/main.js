import { Enemy } from "./enemy.js";
import { Player } from "./player.js";





const gameOver = document.getElementById('game-over-window');
const gameOverLogo = document.getElementById('game-over-logo').setAttribute('src', 'img/assets/game-over.png');
const playLogo=document.getElementById('btn-play').setAttribute('src', 'img/assets/play.png');





////////////////////////////this logics belongs to player//////////////////////////////////////////

let run = false;
export const player=new Player();
export const enemy=new Enemy();

enemy.playerElm=player.playerElm;



document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space' && player.alive){
        player.jump = true;
    }else if (eventData.code === 'ArrowRight' && player.alive){
        player.transform(0);
        run = true;
        player.dx=2;

     
    }else if (eventData.code === 'ArrowLeft' && player.alive){
        player.transform(180);
        run = true;
        player.dx=-2;

        
    }
});

document.body.addEventListener('keyup', (eventData) => {
    if (eventData.code === 'ArrowRight' && player.alive){
        run = false;
        player.dx=0;
    }else if (eventData.code === 'ArrowLeft' && player.alive){
        run = false;
        player.dx=0;
    }
});

// replay logic
document.body.addEventListener('click', (eventData) => {
    if (eventData?.target.classList.contains('touch')) {
        enemy.kill=false;
        player.alive=true;
        gameOver.style.visibility = 'hidden';
        enemy.enemyElement.style.left = `${1200}px`;
        player.playerElm.style.left = `${75}px`;
        player.playerElm.style.transform=`translateX(-${50}%)`;


        flag=true;
        eventData.target.classList.remove('touch')
    }
});

setInterval(()=> {
    if (player.jump){
        player.doJump();
    }
    if (run){
        player.doRun();
    }
}, 5);

let flag=true;

setInterval(()=> {
    if(enemy.kill){
        flag=false;


        player.drawDie();
    }
    else if (!player.jump && !run && flag){
        player.drawIdle();
    }else if (player.jump && flag){
        player.drawJump();
    }else if (!player.jump && run && flag){
        player.drawRun();
    }
} , (50));

// document.body.addEventListener('click', ()=> document.body.requestFullscreen());



//////////////////////////////this logics belongs to enemy///////////////////////////////////////

setInterval(()=> {
    enemy.drawRun();

} , (50));

setInterval(()=> {
    enemy.doRun();
    enemy.player=player.playerElm;
}, 15);





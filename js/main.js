import { Enemy } from "./enemy.js";
import { Player } from "./player.js";

const replay=document.createElement('button');
replay.classList.add('replay');

document.getElementById('background').append(replay);
replay.textContent='Replay';
document.body.requestFullscreen();



////////////////////////////this logics belongs to player//////////////////////////////////////////
let run = false;
const player=new Player();
export const enemy=new Enemy();



document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space'){
        player.jump = true;
    }else if (eventData.code === 'ArrowRight'){
        player.transfom(0);
        run = true;
        player.dx=2;
       // console.log(player.playerElm.style.left);
     
    }else if (eventData.code === 'ArrowLeft'){
        player.transfom(180);
        run = true;
        player.dx=-2;
        //console.log(player.playerElm.style.left);
        
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

// document.body.addEventListener('click', ()=> document.body.requestFullscreen());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////this logics belongs to enemy///////////////////////////////////////

setInterval(()=> {
    enemy.drawRun();
    
} , (50));

setInterval(()=> {
    enemy.doRun();
    enemy.player=player.playerElm;
}, 15);

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////Colision Detection///////////////////////////////////////////


//////////////////////////Replay////////////////////////////////////////////////

document.body.addEventListener('click', (eventData)=> {
    if (eventData?.target.classList.contains("replay")){
        enemy.kill=false;
        player.playerElm.style.visibility='visible';
        
    }
});




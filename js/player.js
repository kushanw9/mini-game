import {finish} from "./main.js";

export class Player {
    playerElm;
    jump = false;
    dx=0;
    i=1;
    j=1;
    k=1;
    d=1;
    angle=0;
    alive=true;
    gameOver=false;



    constructor(){
        // Loading the images of playerElm
        this.loadImages();

        //Setting the playerElm element to the background
        this.createPlayerElement();
    }

    loadImages() {
        for(let i = 1; i <= 12; i++){
            const image = new Image();
            image.src  = `img/player/Jump (${i}).png`;
        }
        for(let i = 1; i <= 10; i++){
            const image = new Image();
            image.src  = `img/player/Idle (${i}).png`;
        }
        for(let i = 1; i <= 7; i++){
            const image = new Image();
            image.src  = `img/player/Run (${i}).png`;
        }
        for(let i = 1; i <= 8; i++){
            const image = new Image();
            image.src  = `img/player/Dead (${i}).png`;
        }
    }

    createPlayerElement() {
        this.playerElm=document.createElement('div');
        this.playerElm.classList.add('box-player');
        document.getElementById('background').append(this.playerElm);
    }

    transform(dir){this.playerElm.style.transform = `rotateY(${dir}deg)`;}

    doJump(){
        if (this.alive) {
            let y  = Math.cos(this.angle * (Math.PI / 180));
            y *= 7;
            this.playerElm.style.top = (this.playerElm.offsetTop - y) + "px";
            this.angle++;
            if (this.angle >  180){
                this.jump = false;
                this.angle = 0;
            }
        }

    }

    doRun(){
        if (this.alive) {
            let x = this.playerElm.offsetLeft + this.dx;
            if ((x + this.playerElm.offsetWidth)> innerWidth) {
                x = innerWidth - this.playerElm.offsetWidth;
                this.dx=0;
            } else if (x <= -50) x = -50;
            this.playerElm.style.left = `${x}px`;
        }

    }

    drawIdle(){
        this.playerElm.style.backgroundImage = `url('img/player/Idle (${this.i++}).png')`;
        if(this.i === 10) this.i = 1;
    }

    drawJump(){
        this.playerElm.style.backgroundImage = `url('img/player/Jump (${this.k++}).png')`;
        if(this.k === 12) this.k = 1;
    }

    drawRun(){
        this.playerElm.style.backgroundImage = `url('img/player/Run (${this.j++}).png')`;
        if(this.j === 8) this.j = 1;
    }
    
    drawDie(){
        if (!this.alive && !this.gameOver) {
            this.playerElm.style.backgroundImage = `url('img/player/Dead (${this.d++}).png')`;
            this.playerElm.style.width='200px'
            if (this.d === 8) {
                this.playerElm.style.backgroundImage = `url('img/player/Dead (${7}).png')`;
                this.gameOver=true;
                this.d=1
                finish()



            }
        }


    }
}

import {enemy} from "./main.js";

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



    constructor(){
        // Loading the images of playerElm
        this.loadImages();

        //Setting the playerElm element to the background
        this.createPlayerElement();
    }

    loadImages() {
        for(let i = 1; i <= 12; i++){
            const image = new Image();
            image.src  = `img/Jump (${i}).png`;
        }
        for(let i = 1; i <= 10; i++){
            const image = new Image();
            image.src  = `img/Idle (${i}).png`;
        }
        for(let i = 1; i <= 10; i++){
            const image = new Image();
            image.src  = `img/Walk (${i}).png`;
        }
        for(let i = 1; i <= 8; i++){
            const image = new Image();
            image.src  = `img/Dead (${i}).png`;
        }
    }

    createPlayerElement() {
        this.playerElm=document.createElement('div');
        this.playerElm.classList.add('box-player');
        document.getElementById('background').append(this.playerElm);
    }

    transform(dir){this.playerElm.style.transform = `rotateY(${dir}deg)`;}

    doJump(){
        let y  = Math.cos(this.angle * (Math.PI / 180));
        y *= 5;
        this.playerElm.style.top = (this.playerElm.offsetTop - y) + "px";
        this.angle++;
        if (this.angle >  180){
            this.jump = false;
            this.angle = 0;  
        }
    }

    doRun(){
        let x = this.playerElm.offsetLeft + this.dx;
        if ((x + this.playerElm.offsetWidth)> innerWidth) {
            x = innerWidth - this.playerElm.offsetWidth;
            this.dx=0;
        } else if (x <= -50) x = -50;
        this.playerElm.style.left = `${x}px`; 
    }

    drawIdle(){
        this.playerElm.style.backgroundImage = `url('img/Idle (${this.i++}).png')`;
        if(this.i === 10) this.i = 1;
    }

    drawJump(){
        this.playerElm.style.backgroundImage = `url('img/Jump (${this.k++}).png')`;
        if(this.k === 12) this.k = 1;
    }

    drawRun(){
        this.playerElm.style.backgroundImage = `url('img/Walk (${this.j++}).png')`;
        if(this.j === 10) this.j = 1;
    }
    
    drawDie(){
        if (!this.alive) {
            this.playerElm.style.backgroundImage = `url('img/Dead (${this.d++}).png')`;
            if (this.d === 8) {

                this.playerElm.style.backgroundImage = `url('img/Dead (${7}).png')`;
                //this.alive=true;
                this.d=1
                enemy.kill = false;


            }
        }


    }
}

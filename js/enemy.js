export class Enemy {
    enemyElement;
    jump = false;
    run = false;
    dx = 0;
    j = 1;
    player = null;
    playerRadius = Math.ceil(Math.hypot(200, 200) / 2)-10;
    enemyRadius = Math.ceil(Math.hypot(200, 200) / 2)-10;
    kill = false;
  
    constructor() {
      this.loadImages();
      this.createEnemyElement();
    }
  
    loadImages() {
      for (let i = 1; i <= 12; i++) {
        const image = new Image();
        image.src = `img/Jump (${i}).png`;
      }
      for (let i = 1; i <= 10; i++) {
        const image = new Image();
        image.src = `img/Idle (${i}).png`;
      }
      for (let i = 1; i <= 10; i++) {
        const image = new Image();
        image.src = `img/Walk (${i}).png`;
      }
    }
  
    createEnemyElement() {
      this.enemyElement = document.createElement('div');
      this.enemyElement.classList.add('box-enemy');
      document.getElementById('background').append(this.enemyElement);
      this.enemyElement.style.left = `${1200}px`;
      this.enemyElement.style.transform = 'rotateY(180deg)';
    }
  
    drawRun() {
      this.enemyElement.style.backgroundImage = `url('img/Walk (${this.j++}).png')`;
      if (this.j === 10) this.j = 1;
    }
  
    doRun() {
      let x = this.enemyElement.offsetLeft - 2;
      if (x + this.enemyElement.offsetWidth > innerWidth) {
        x = innerWidth - this.enemyElement.offsetWidth;
      } else if (x <= -250) {
        x = 1200;
      }
      this.enemyElement.style.left = `${x}px`;

      // collision detection part
  
      if (this.player) {
        const playerRect = this.player.getBoundingClientRect();
        const enemyRect = this.enemyElement.getBoundingClientRect();
  
        if (
          playerRect.left < enemyRect.right &&
          playerRect.right > enemyRect.left &&
          playerRect.top < enemyRect.bottom &&
          playerRect.bottom > enemyRect.top
          ) {
            console.log(this.kill);

          this.kill = true;
          this.player.alive=false;
          console.log('Collision detected');
         
        }
      }
    }
  }
 




export class Enemy {
    enemyElement;
    j = 1;
    playerElm = null;
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
      this.enemyElement.style.backgroundImage = `url('img/enemy/Walk (${this.j++}).png')`;
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
        if (!this.kill) {
            this.checkCollision();
            console.log("Collision checking")
        }

    }

    checkCollision() {
        if (this.playerElm) {
            const playerRect = this.playerElm.getBoundingClientRect();
            const enemyRect = this.enemyElement.getBoundingClientRect();

            if (
                playerRect.left < enemyRect.right &&
                playerRect.right > enemyRect.left &&
                playerRect.top < enemyRect.bottom &&
                playerRect.bottom > enemyRect.top
            ) {
                this.kill = true;
                console.log("Player died")

            }
        }
    }
  }
 


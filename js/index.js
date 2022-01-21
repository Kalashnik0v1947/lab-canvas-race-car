const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ctx.fillRect(0,0,canvas.width ,canvas.height)
  // ctx.fillStyle = "#808080"
window.onload = () => {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  canvas.height = 700;
  canvas.width = 500;
  const img = new Image();
  img.src = "/images/car.png";
  img.onload = () => {};

  // ctx.fillStyle = "#008900"
  // ctx.fillRect(0,0,canvas.width ,canvas.height)
  // ctx.fillStyle = "#808080"
  // ctx.fillRect(50,0,canvas.width-100 ,canvas.height)
  // ctx.clearRect(65,0,15,canvas.height)
  // ctx.clearRect(420,0,15,canvas.height)

  class Player {
    constructor() {
      this.x = canvas.width / 2 - 25;
      this.y = 565;
      this.w = 158 / 3.5;
      this.h = 319 / 3.5;
      this.reverseX = false;
      this.reverseY = false
    }

    move(direction) {
      switch (direction) {
        case "ArrowLeft":
          this.x -= 25;
          break;
        case "ArrowRight":
          this.x += 25;
          break;
      }
    }
  }

  //Obstacles

  class Item {
    constructor(x, y, color) {
      this.x = Math.floor(Math.random() * (300 - 50 + 1) + 50);
      this.y = 0;
      this.w = Math.floor(Math.random() * (200 - 100 + 1) + 100);
      this.h = 30;
      this.color = color;
      (this.reverseX = false), (this.reverseY = false);
    }
    move() {
      this.y = this.y + 1;
    }
  }

  const ob1 = new Item();
  const obstacleArr = [];
  obstacleArr.push(ob1);

  function createObj() {
    obstacleArr.push(new Item());
  }

  let raceCar = new Player();
  let engine;
  let didCollide;

  class Speed {
    constructor() {
      (this.x = 244),
        (this.y = 0),
        (this.w = 8),
        (this.h = 32),
        (this.reverseX = false),
        (this.reverseY = false);
    }
    move() {
      this.y = this.y + 1;
    }
  }
  const speed1 = new Speed();
  const speedArr = [];
  speedArr.push(speed1);
  function createSpeed() {
    speedArr.push(new Speed());
  }

  let score = 0 
  function scoreCounter() {
    score += 10
    ctx.font = '24px serif'
    ctx.fillStyle = "white"
    ctx.fillText(`Your Score:${score}`,75,50)
  }
  scoreCounter();
 ;

  
  function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '48px serif';
    ctx.fillStyle = "white"
    ctx.fillText('Game Over',150, 350);
      }
let scoreInterval;

  function startGame() {
    setInterval(createObj, 2750);
    setInterval(createSpeed, 275);
    scoreInterval = setInterval(scoreCounter, 2000) 
    document.addEventListener("keydown", function (e) {
      switch (e.code) {
        case "ArrowLeft":
          raceCar.move("ArrowLeft");
          break;
        case "ArrowRight":
          raceCar.move("ArrowRight");
          break;
      }
    });
    animate();
  }

  function animate() {
    engine = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#008900"
    ctx.fillRect(0,0,canvas.width ,canvas.height)
    ctx.fillStyle = "#808080"
    ctx.fillRect(50,0,canvas.width-100 ,canvas.height)
    ctx.clearRect(65,0,15,canvas.height)
    ctx.clearRect(420,0,15,canvas.height)
    ctx.fillStyle = "black"
    ctx.fillText(`Your Score:${score}`,80,50)
    
    if(raceCar.w+158 / 3.5>= canvas.width){
      raceCar.reverseX = true
        } else if(raceCar.w<=0){
          raceCar.reverseX = false
        }

    for (let i = 0; i < speedArr.length; i++) {
      ctx.fillStyle = "white";
      speedArr[i].move();
      ctx.fillRect(speedArr[i].x, speedArr[i].y, speedArr[i].w, speedArr[i].h);
    }

    ctx.drawImage(img, raceCar.x, raceCar.y, raceCar.w, raceCar.h);

    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillStyle = "#870007";
      obstacleArr[i].move();
      ctx.fillRect(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].w,
        obstacleArr[i].h
      );
    }

    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillStyle = obstacleArr[i].color;
      obstacleArr[i].move();
      ctx.fillRect(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].w,
        obstacleArr[i].h
      );

      didCollide = detectCollision(raceCar, obstacleArr[i]);

      if (didCollide) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOver();
      }
      if (didCollide) {
        console.log("COLLISION");
        obstacleArr.splice(i, 1);
      }
    }
    function gameOver() {
      window.cancelAnimationFrame(engine);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black"
      ctx.fillRect(0,0,canvas.width ,canvas.height)
      ctx.fillStyle = "red"
      ctx.font = 'bold 48px serif';
      ctx.fillText('Game Over',145, 325)
      ctx.fillStyle = "white"
      ctx.fillText(`Final Score:${score}`,120,375)
      clearInterval(scoreInterval)
    }
  }
};

function detectCollision(raceCar, obj) {
  if (
    raceCar.x < obj.x + obj.w &&
    raceCar.x + raceCar.w > obj.x &&
    raceCar.y < obj.y + obj.h &&
    raceCar.y + raceCar.h > obj.y
  ) {
    return true;
  } else {
    return false;
  }
}

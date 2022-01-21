const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
      this.x = Math.floor(Math.random() * (500 - 50 + 1) + 50);
      this.y = 0;
      this.w = Math.floor(Math.random() * (500 - 50 + 1) + 50);
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

  // class Speed {
  //   constructor(){
  //   this.x = 242,
  //   this.y = 0,
  //   this.w = 8,
  //   this.h = 24,
  //   this.reverseX = false,
  //   this.reverseY = false
  // }
  // }
  // const speed1 = new Speed()
  // const speedArr = []
  // speedArr.push(speed1)
  // function createSpeed() {
  //   speedArr.push(new Speed());
  //   }

  // function scoreCounter() {
  //   for (let i = 10; i < Infinity; i++) {
  //     console.log(i)
  //      }
  // }

  function startGame() {
    setInterval(createObj, 1000);
    setInterval(scoreCounter, 2000);
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
    scoreCounter();
  }

  function animate() {
    engine = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

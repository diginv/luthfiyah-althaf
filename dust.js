//Dust Particles Simulation by bionicoz based on
//Basic Particle Animation
//Author: Brandon John-Freso
const generateDust = (id) => {
  try {
  var W, H,
    canvas, ctx, //ctx stands for context and is the "curso" of our canvas element.
    particleCount = 700,
    particles = []; //this is an array which will hold our particles Object/Class

  W = window.innerWidth ;
  H = window.innerHeight ;

  canvas = $(`#${id}`).get(0); //this "get(0) will pull the underlying non-jquery wrapped dom element from our selection

  // console.log(canvas)
  // return
  ctx = canvas.getContext("2d"); // settng the context to 2d rather than the 3d WEBGL
  ctx.globalCompositeOperation = "lighter";
  // console.log(ctx);

  function randomNorm(mean, stdev) {

    return Math.abs(Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*stdev)+mean;
  }

  //Setup particle class
  class Particle {
    constructor() {
      this.h = parseInt(0);
      this.s = parseInt(0);
      this.l = parseInt(100);
      this.a = 0.7 * Math.random();

      this.color = "hsla(" + this.h + "," + this.s + "%," + this.l + "%," + (this.a) + ")";
      this.shadowcolor = "hsla(" + this.h + "," + this.s + "%," + this.l + "%," + parseFloat(this.a - 0.55) + ")";



      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.direction = {
        "x": -1 + Math.random() * 2,
        "y": -1 + Math.random() * 2
      };
      //this.radius = 9 * ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+3);
      this.radius = randomNorm(0, 4);
      this.scale = 0.8 * Math.random() + 0.5;
      this.rotation = Math.PI / 4 * Math.random();

      this.grad = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
      this.grad.addColorStop(0, this.color);
      this.grad.addColorStop(1, this.shadowcolor);

      this.vx = (2 * Math.random() + 4) * .01 * this.radius;
      this.vy = (2 * Math.random() + 4) * .01 * this.radius;

      this.valpha = 0.01 * Math.random() - 0.02;

      this.move = function() {
        this.x += this.vx * this.direction.x;
        this.y += this.vy * this.direction.y;
        this.rotation += this.valpha;
        //this.radius*= Math.abs((this.valpha*0.01+1));
      };
      this.changeDirection = function(axis) {
        this.direction[axis] *= -1;
        this.valpha *= -1;
      };
      this.draw = function() {
        ctx.save();
        ctx.translate(this.x + -20 * this.radius, this.y +  -20 * this.radius);
        ctx.rotate(this.rotation);
        ctx.scale(1, this.scale);

        this.grad = ctx.createRadialGradient(0, 0, this.radius, 0, 0, 0);
        this.grad.addColorStop(1, this.color);
        this.grad.addColorStop(0, this.shadowcolor);
        ctx.beginPath();
        ctx.fillStyle = this.grad;
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();


      };
      this.boundaryCheck = function() {
        if (this.x >= W * 1.2) {
          this.x = W * 1.2;
          this.changeDirection("x");
        } else if (this.x <= -W * 0.2) {
          this.x = -W * 0.2;
          this.changeDirection("x");
        }
        if (this.y >= H * 1.2) {
          this.y = H * 1.2;
          this.changeDirection("y");
        } else if (this.y <= -H * 0.2) {
          this.y = -H * 0.2;
          this.changeDirection("y");
        }
      };
    }
  } //end particle class

  function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
  } //end clear canvas

  function createParticles() {
    for (var i = particleCount - 1; i >= 0; i--) {
      p = new Particle();
      particles.push(p);
    }
  } // end createParticles

  function drawParticles() {
    for (var i = particleCount - 1; i >= 0; i--) {
      p = particles[i];
      p.draw();
    }


  } //end drawParticles

  function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
      p = particles[i];
      p.move();
      p.boundaryCheck();

    }
  } //end updateParticles

  function initParticleSystem() {
    createParticles();
    drawParticles();
  }

  function animateParticles() {
    clearCanvas();
    drawParticles();
    updateParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticleSystem();
  requestAnimationFrame(animateParticles);
  } catch (err) {
    console.error(`Failed to load particle on ${id}: ${err.message}`)
  }
}

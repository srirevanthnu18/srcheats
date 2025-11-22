const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

const config = {
  count: 80,
  minRadius: 1,
  maxRadius: 3,
  minSpeed: 0.1,
  maxSpeed: 0.35,
  blur: 25,
  colors: [
    "rgba(61, 226, 255, 0.4)",
    "rgba(0, 162, 255, 0.35)",
    "rgba(123, 191, 255, 0.3)",
  ],
};

let particles = [];
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.radius = random(config.minRadius, config.maxRadius);
    this.x = initial ? Math.random() * width : random(-50, width + 50);
    this.y = initial ? Math.random() * height : random(-50, height + 50);
    this.speedX = random(-config.maxSpeed, config.maxSpeed);
    this.speedY = random(config.minSpeed * -1, config.maxSpeed);
    this.opacitySpeed = random(0.002, 0.008);
    this.opacity = Math.random();
    this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.opacity += this.opacitySpeed;
    if (this.opacity > 1 || this.opacity < 0.3) {
      this.opacitySpeed *= -1;
    }

    if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
      this.reset();
      if (this.speedY === 0) this.speedY = 0.05;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color.replace("0.", this.opacity.toFixed(2) + "");
    ctx.shadowBlur = config.blur;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < config.count; i += 1) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

function startParticles() {
  resizeCanvas();
  initParticles();
  animate();
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

startParticles();



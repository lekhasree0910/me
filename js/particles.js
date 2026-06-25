/* ==========================================
   LEKHASREE.AI
   INTERACTIVE WIND FLOW FIELD ENGINE
========================================== */

const particleCanvas = document.createElement("canvas");
particleCanvas.id = "particle-canvas";
document.body.appendChild(particleCanvas);

const ctx = particleCanvas.getContext("2d");

let particles = [];
let time = 0;

let mouse = {
    x: null,
    y: null,
    vx: 0,
    vy: 0,
    lastX: null,
    lastY: null
};

/* ==========================================
   RESIZE
========================================== */
function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    initParticles();
}

window.addEventListener("resize", resizeCanvas);

/* ==========================================
   MOUSE TRACKING WITH VELOCITY
========================================== */
window.addEventListener("mousemove", e => {
    if (mouse.lastX === null) {
        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;
    }
    
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Calculate cursor velocity
    mouse.vx = mouse.x - mouse.lastX;
    mouse.vy = mouse.y - mouse.lastY;
    
    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
});

// Decelerate mouse velocities on stop
setInterval(() => {
    mouse.vx *= 0.85;
    mouse.vy *= 0.85;
}, 50);

/* ==========================================
   PARTICLE CLASS (WIND RIBBON)
========================================== */
class WindParticle {
    constructor() {
        this.reset();
        // Stagger spawn positions across canvas
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
    }

    reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 1 - 0.5;
        this.size = Math.random() * 1.8 + 0.8; // Thicker lines
        this.speedLimit = Math.random() * 2 + 2;
        this.alpha = Math.random() * 0.4 + 0.35; // Higher minimum opacity
        this.maxHistory = Math.floor(Math.random() * 10) + 8; // Longer trails
        this.history = [];
        this.timeOffset = Math.random() * 100;
        this.hue = 38 + Math.floor(Math.random() * 12); // Gold to Amber hue
    }

    update() {
        // Calculate vector wind force at current position
        // Trignometric turbulence field
        const scale = 0.003;
        const angle = Math.sin(this.x * scale + time * 0.002 + this.timeOffset) * 
                      Math.cos(this.y * scale + time * 0.002) * Math.PI * 0.8 + 0.2; // slight bias left-to-right

        // Wind force vectors
        const windX = Math.cos(angle) * 1.8;
        const windY = Math.sin(angle) * 0.6;

        this.vx += windX * 0.08;
        this.vy += windY * 0.08;

        // Mouse interaction (gust force)
        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 180) {
                const force = (180 - dist) / 180;
                // Particles are pushed away and carry mouse velocity
                this.vx += (dx / dist) * force * 0.6 + mouse.vx * force * 0.25;
                this.vy += (dy / dist) * force * 0.6 + mouse.vy * force * 0.25;
            }
        }

        // Apply friction
        this.vx *= 0.96;
        this.vy *= 0.96;

        // Clamp speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.speedLimit) {
            this.vx = (this.vx / speed) * this.speedLimit;
            this.vy = (this.vy / speed) * this.speedLimit;
        }

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Record history for wind trails
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        // Handle screen boundary wrapping
        if (this.x < -20 || this.x > particleCanvas.width + 20 || 
            this.y < -20 || this.y > particleCanvas.height + 20) {
            this.reset();
            // Start wrap from opposite borders
            if (Math.random() > 0.4) {
                this.x = -10;
                this.y = Math.random() * particleCanvas.height;
            } else {
                this.y = this.vy > 0 ? -10 : particleCanvas.height + 10;
                this.x = Math.random() * particleCanvas.width;
            }
        }
    }

    draw() {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        
        // Premium gold color gradient stroke
        ctx.strokeStyle = `hsla(${this.hue}, 80%, 55%, ${this.alpha})`;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
}

/* ==========================================
   GENERATE PARTICLES
========================================== */
function initParticles() {
    particles = [];
    // Adjust density based on screen size
    const count = window.innerWidth > 768 ? 200 : 90;
    for (let i = 0; i < count; i++) {
        particles.push(new WindParticle());
    }
}

// Initial setup
resizeCanvas();

/* ==========================================
   ANIMATION LOOP
========================================== */
function animate() {
    time += 0.8;
    
    // Clear screen with a slight opacity fade to create light trails
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

/* ==========================================
   ROBOT ORBIT PARTICLES
========================================== */
/*const robotWrapper = document.querySelector(".robot-wrapper");
if (robotWrapper) {
    for (let i = 0; i < 18; i++) {
        const orbit = document.createElement("div");
        orbit.classList.add("orbit-particle");
        orbit.style.setProperty("--angle", `${i * 20}deg`);
        orbit.style.setProperty("--duration", `${6 + Math.random() * 6}s`);
        robotWrapper.appendChild(orbit);
    }
}

/* ==========================================
   SHOOTING STARS
========================================== */
function createStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = Math.random() * 50 + "%";
    star.style.left = Math.random() * 100 + "%";
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2500);
}

setInterval(createStar, 6000);

/* ==========================================
   PERFORMANCE FOCUS MODE
========================================== */
window.addEventListener("blur", () => {
    particles = [];
});

window.addEventListener("focus", () => {
    initParticles();
});

console.log("Interactive Flow Field Background Initialized.");
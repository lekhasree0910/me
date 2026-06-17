/* ==========================================
   LEKHASREE.AI
   ADVANCED PARTICLE ENGINE
========================================== */

const particleCanvas =
    document.createElement("canvas");

particleCanvas.id =
    "particle-canvas";

document.body.appendChild(
    particleCanvas
);

const ctx =
    particleCanvas.getContext("2d");

let particles = [];

let mouse = {

    x: null,
    y: null

};

/* ==========================================
   RESIZE
========================================== */

function resizeCanvas() {

    particleCanvas.width =
        window.innerWidth;

    particleCanvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* ==========================================
   MOUSE
========================================== */

window.addEventListener(
    "mousemove",
    e => {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    }
);

/* ==========================================
   PARTICLE CLASS
========================================== */

class Particle {

    constructor() {

        this.x =
            Math.random() *
            particleCanvas.width;

        this.y =
            Math.random() *
            particleCanvas.height;

        this.size =
            Math.random() * 2 + 1;

        this.speedY =
            Math.random() * 0.8 + 0.3;

        this.speedX =
            Math.random() * 0.4 - 0.2;

        this.opacity =
            Math.random();

    }

    update() {

        this.y -= this.speedY;

        this.x += this.speedX;

        if (this.y < -10) {

            this.y =
                particleCanvas.height + 10;

            this.x =
                Math.random() *
                particleCanvas.width;

        }

        if (mouse.x) {

            const dx =
                mouse.x - this.x;

            const dy =
                mouse.y - this.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 120) {

                this.x -= dx * 0.005;
                this.y -= dy * 0.005;

            }

        }

    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(212,175,55,${this.opacity})`;

        ctx.arc(

            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2

        );

        ctx.fill();

    }

}

/* ==========================================
   GENERATE PARTICLES
========================================== */

function initParticles() {

    particles = [];

    const count =
        window.innerWidth > 768
            ? 180
            : 80;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

initParticles();

/* ==========================================
   CONNECTION LINES
========================================== */

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                dx * dx + dy * dy;

            if (distance < 15000) {

                ctx.strokeStyle =
                    "rgba(212,175,55,.05)";

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

/* ==========================================
   ANIMATION
========================================== */

function animateParticles() {

    ctx.clearRect(

        0,
        0,
        particleCanvas.width,
        particleCanvas.height

    );

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();

/* ==========================================
   ROBOT ORBIT PARTICLES
========================================== */

const robotWrapper =
    document.querySelector(
        ".robot-wrapper"
    );

if (robotWrapper) {

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const orbit =
            document.createElement(
                "div"
            );

        orbit.classList.add(
            "orbit-particle"
        );

        orbit.style.setProperty(
            "--angle",
            `${i * 20}deg`
        );

        orbit.style.setProperty(
            "--duration",
            `${6 + Math.random() * 6}s`
        );

        robotWrapper.appendChild(
            orbit
        );

    }

}

/* ==========================================
   SHOOTING STARS
========================================== */

function createStar() {

    const star =
        document.createElement(
            "div"
        );

    star.className =
        "shooting-star";

    star.style.top =
        Math.random() * 50 + "%";

    star.style.left =
        Math.random() * 100 + "%";

    document.body.appendChild(
        star
    );

    setTimeout(() => {

        star.remove();

    }, 2500);

}

setInterval(
    createStar,
    5000
);

/* ==========================================
   PERFORMANCE MODE
========================================== */

window.addEventListener(
    "blur",
    () => {

        particles = [];

    }
);

window.addEventListener(
    "focus",
    () => {

        initParticles();

    }
);

console.log(
    "Particle Engine Loaded"
);
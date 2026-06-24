/* =====================================
   LEKHASREE.AI
   MAIN SCRIPT
===================================== */

gsap.registerPlugin(ScrollTrigger);

/* =====================================
   LOADER
===================================== */

const bootMessages = [
    "Initializing AI Core...",
    "Loading Neural Network...",
    "Connecting Cloud Infrastructure...",
    "Analyzing Candidate Profile...",
    "Loading Portfolio Modules...",
    "System Ready."
];

const bootText =
    document.getElementById("boot-text");

let bootIndex = 0;

function typeBootMessage() {

    if (bootIndex >= bootMessages.length) {

        setTimeout(() => {

            gsap.to("#loader", {

                opacity: 0,

                duration: 1,

                onComplete: () => {

                    document
                        .getElementById("loader")
                        .remove();

                }

            });

        }, 1000);

        return;

    }

    const p =
        document.createElement("p");

    p.textContent =
        bootMessages[bootIndex];

    bootText.appendChild(p);

    bootIndex++;

    setTimeout(
        typeBootMessage,
        500
    );
}

window.addEventListener(
    "load",
    typeBootMessage
);

/* =====================================
   TYPED JS
===================================== */

new Typed("#typed", {

    strings: [

        "Artificial Intelligence Engineer",

        "Machine Learning Enthusiast",

        "AWS Cloud Explorer",

        "NLP & Computer Vision Learner",

        "Future AI Innovator"

    ],

    typeSpeed: 50,

    backSpeed: 25,

    backDelay: 1800,

    loop: true

});

/* =====================================
   CURSOR
===================================== */

const cursor = document.querySelector(".cursor");
let cursorX = 0, cursorY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor update loop using linear interpolation
function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    
    if (cursor) {
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
    }
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hovered state for interactive elements
function setupCursorHovers() {
    const hoverables = document.querySelectorAll("a, button, .skill-node, .project-card, .featured-project, .social-card, .about-stat, .achievement");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            if (cursor) cursor.classList.add("hovered");
        });
        el.addEventListener("mouseleave", () => {
            if (cursor) cursor.classList.remove("hovered");
        });
    });
}
// Run setup after page load
window.addEventListener("load", setupCursorHovers);

/* =====================================
   HERO ANIMATION
===================================== */

gsap.from(".hero-tag", {

    y: 40,

    opacity: 0,

    duration: 1

});

gsap.from(".hero h1", {

    y: 80,

    opacity: 0,

    duration: 1.2,

    delay: 0.2

});

gsap.from(".typed-container", {

    opacity: 0,

    y: 30,

    duration: 1,

    delay: 0.5

});

gsap.from(".hero p", {

    opacity: 0,

    y: 30,

    duration: 1,

    delay: 0.8

});

gsap.from(".hero-buttons", {

    opacity: 0,

    y: 30,

    duration: 1,

    delay: 1

});

gsap.from(".robot", {

    scale: 0.7,

    opacity: 0,

    duration: 1.8,

    ease: "power4.out"

});

/* =====================================
   3D SECTION REVEAL FLOW
===================================== */

document.querySelectorAll(".section").forEach(section => {
    // Enable 3D rendering context
    section.style.perspective = "1200px";
    section.style.transformStyle = "preserve-3d";

    const title = section.querySelector(".section-title");
    const children = section.querySelectorAll(
        ".about-container, .skills-grid > *, .timeline-wrapper > *, .featured-project, .project-card, .achievement, .social-card, .contact-container > *"
    );

    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 40,
            rotationX: -15,
            transformOrigin: "top center",
            duration: 0.8,
            ease: "power2.out"
        });
    }

    if (children.length > 0) {
        gsap.from(children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 60,
            rotationX: -12,
            rotationY: -5,
            scale: 0.93,
            transformOrigin: "center center",
            stagger: 0.08,
            duration: 1,
            ease: "power3.out"
        });
    }
});

/* =====================================
   3D HOVER TILT & GLARE EFFECT
===================================== */

const tiltElements = document.querySelectorAll(
    ".project-card, .featured-project, .skill-node, .about-stat, .achievement, .social-card, .contact-left, .contact-right"
);

tiltElements.forEach(card => {
    // Dynamically insert transparent glare overlay
    const glare = document.createElement("div");
    glare.className = "card-glare";
    
    // Base inline styles for glare
    glare.style.position = "absolute";
    glare.style.inset = "0";
    glare.style.pointerEvents = "none";
    glare.style.borderRadius = "inherit";
    glare.style.zIndex = "3";
    glare.style.mixBlendMode = "overlay";
    glare.style.opacity = "0";
    
    if (window.getComputedStyle(card).position === "static") {
        card.style.position = "relative";
    }
    card.appendChild(glare);

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation degrees based on mouse position relative to card center
        const rotateY = ((x / rect.width) - 0.5) * 12; // Max 12deg tilt
        const rotateX = (0.5 - (y / rect.height)) * 12;

        // Animate tilt and glare using GSAP for bulletproof reset capability
        gsap.to(card, {
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });

        // Move the glare highlight to match cursor location
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 80%)`;
        
        gsap.to(glare, {
            opacity: 1,
            duration: 0.25,
            overwrite: "auto"
        });
    });

    card.addEventListener("mouseleave", () => {
        // Reset card orientation and fade out glare cleanly
        gsap.to(card, {
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
        });
        
        gsap.to(glare, {
            opacity: 0,
            duration: 0.6,
            overwrite: "auto"
        });
    });
});

/* =====================================
   COUNTER ANIMATION
===================================== */

const counters =
    document.querySelectorAll(
        ".stat h2"
    );

counters.forEach(counter => {

    ScrollTrigger.create({

        trigger: counter,

        start: "top 90%",

        once: true,

        onEnter: () => {

            const target =
                parseInt(
                    counter.innerText
                );

            let value = 0;

            const interval =
                setInterval(() => {

                    value++;

                    counter.innerText =
                        value + "+";

                    if (
                        value >= target
                    ) {

                        clearInterval(
                            interval
                        );

                    }

                }, 40);

        }

    });

});

/* =====================================
   PARTICLE ENGINE
===================================== */

const particleContainer =
    document.getElementById(
        "particles"
    );

function createParticle() {

    const particle =
        document.createElement(
            "div"
        );

    particle.classList.add(
        "gold-particle"
    );

    particle.style.left =
        Math.random() * 100 +
        "vw";

    particle.style.bottom =
        "-20px";

    particle.style.animationDuration =
        3 +
        Math.random() * 6 +
        "s";

    particleContainer.appendChild(
        particle
    );

    setTimeout(() => {

        particle.remove();

    }, 9000);

}

setInterval(
    createParticle,
    200
);

/* =====================================
   NAVBAR BLUR
===================================== */

window.addEventListener(
    "scroll",
    () => {

        const nav =
            document.querySelector(
                ".navbar"
            );

        if (
            window.scrollY > 40
        ) {

            nav.style.background =
                "rgba(0,0,0,.7)";

        } else {

            nav.style.background =
                "rgba(0,0,0,.35)";

        }

    }
);

/* =====================================
   ROBOT FOLLOW EFFECT
===================================== */

const robot =
    document.querySelector(
        ".robot"
    );

document.addEventListener(
    "mousemove",
    e => {

        const x =
            (e.clientX /
                window.innerWidth -
                0.5) *
            15;

        const y =
            (e.clientY /
                window.innerHeight -
                0.5) *
            15;

        robot.style.transform =
            `
            translate(-50%,-50%)
            rotateY(${x}deg)
            rotateX(${-y}deg)
        `;

    }
);

/* =====================================
   RECRUITER DASHBOARD
===================================== */

const dashboard =
    document.createElement("div");

dashboard.className =
    "dashboard-popup";

document.body.appendChild(
    dashboard
);

document.addEventListener(
    "keydown",
    e => {

        if (
            e.ctrlKey &&
            e.shiftKey &&
            e.key.toLowerCase() ===
            "a"
        ) {

            dashboard.classList.add(
                "show"
            );

        }

    }
);

document.addEventListener(
    "click",
    e => {

        if (
            e.target.id ===
            "closeDashboard"
        ) {

            dashboard.classList.remove(
                "show"
            );

        }

    }
);

/* =====================================
   SMOOTH ANCHORS
===================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                if (navLinks && navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                }
            }
        });
    });

console.log(
    "LEKHASREE.AI Initialized"
);


const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navLinks =
    document.querySelector(
        ".nav-links"
    );

menuToggle.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "active"
        );

    }
);
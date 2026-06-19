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

const cursor =
    document.querySelector(".cursor");

document.addEventListener(
    "mousemove",
    e => {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";

    }
);

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
   SECTION REVEAL
===================================== */

document
    .querySelectorAll(".section")
    .forEach(section => {

        gsap.from(section, {

            scrollTrigger: {

                trigger: section,

                start: "top 80%"

            },

            opacity: 0,

            y: 80,

            duration: 1

        });

    });

/* =====================================
   PROJECT CARDS
===================================== */

document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateY =
                    (x /
                        rect.width -
                        0.5) *
                    15;

                const rotateX =
                    (0.5 -
                        y /
                        rect.height) *
                    15;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";

            }
        );

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
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            e => {

                e.preventDefault();

                document
                    .querySelector(
                        link.getAttribute(
                            "href"
                        )
                    )
                    .scrollIntoView({

                        behavior:
                            "smooth"

                    });

            }
        );

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
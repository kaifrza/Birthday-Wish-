"use strict";

/* ==========================================================
   BIRTHDAY PROPOSAL APP
   Part 1 - Core Engine
========================================================== */

/* ==========================================
   DOM ELEMENTS
========================================== */

const scenes = document.querySelectorAll(".scene");

const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");
const scene4 = document.getElementById("scene4");
const scene5 = document.getElementById("scene5");
const scene6 = document.getElementById("scene6");

const startBtn = document.getElementById("startBtn");
const giftBox = document.getElementById("giftBox");
const nextBtn = document.getElementById("nextBtn");
const proposalBtn = document.getElementById("proposalBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const typewriter = document.getElementById("typewriter");
const letterContent = document.getElementById("letterContent");

const bgMusic = document.getElementById("bgMusic");

/* ==========================================
   STORY TEXT
========================================== */

const introText = [
  
  "Hey bro Dear Nasir Misbahi... 😊",
  
  "Before this beautiful day comes to an end...",
  
  "click on BEGIN and have your birthday wishes from me... your friend: KAIF RAZA"
  
];

const letterLines = [
  
  "Wishing you a day filled with happiness, laughter, and unforgettable moments.", 
  
  "Thank you for being such an amazing friend.",
  
  "May this new year of your life bring you good health, success, peace, and all the happiness you deserve.", 
  
  "Keep smiling, keep shining, and never stop chasing your dreams.Have a fantastic birthday and an incredible year ahead! 🎂🎁🎈"
  
];

/* ==========================================
   SCENE MANAGER
========================================== */

function hideScenes() {
  
  scenes.forEach(scene => {
    
    scene.classList.remove("active");
    
  });
  
}

function showScene(scene) {
  
  hideScenes();
  
  scene.classList.add("active");
  
}

/* ==========================================
   TYPEWRITER
========================================== */
function typeLines(element, lines, speed = 45, onComplete = null) {
  element.textContent = "";
  let line = 0;
  let char = 0;
  
  function write() {
    if (line >= lines.length) {
      // Typing khatam hone par callback run karo (agar diya hai)
      if (onComplete) onComplete();
      return;
    }
    const current = lines[line];
    if (char < current.length) {
      element.textContent += current.charAt(char);
      char++;
      
      // Auto-scroll logic
      element.scrollTop = element.scrollHeight;
      
      setTimeout(write, speed);
    }
    else {
      element.textContent += "\n\n";
      line++;
      char = 0;
      
      // Auto-scroll logic
      element.scrollTop = element.scrollHeight;
      
      setTimeout(write, 500);
    }
  }
  write();
}

/* ==========================================
   LETTER TYPEWRITER
========================================== */
function writeLetter() {
  // Pehle Continue button ko hide karo
  nextBtn.style.display = "none";
  
  // Same typeLines function use karo letterLines ke liye
  typeLines(letterContent, letterLines, 45, () => {
      // Jab typing complete ho jaye, tab button show karo
      nextBtn.style.display = "inline-block";
  });
}


/* ==========================================
   MUSIC
========================================== */

function playMusic() {
  
  if (!bgMusic) return;
  
  bgMusic.volume = .35;
  
  bgMusic.play().catch(() => {});
  
}

/* ==========================================
   START
========================================== */

window.addEventListener("load", () => {
  
  showScene(scene1);
  
  typeLines(typewriter, introText);
  
});

/* ==========================================
   BUTTON EVENTS
========================================== */

startBtn.addEventListener("click", () => {
  
  playMusic();
  
  showScene(scene2);
  
});

giftBox.addEventListener("click", () => {
  
  giftBox.classList.add("open");
  
  setTimeout(() => {
    
    showScene(scene3);
    
    writeLetter();
    
  }, 900);
  
});

nextBtn.addEventListener("click", () => {
  
  showScene(scene4);
  
});

proposalBtn.addEventListener("click", () => {
  
  showScene(scene5);
  
});



/* ==========================================================
   PART 2 - BACKGROUND EFFECTS
========================================================== */

/* ==========================================
   BACKGROUND ELEMENTS
========================================== */

const starsContainer = document.getElementById("stars");
const shootingContainer = document.getElementById("shooting-stars");

/* ==========================================
   RANDOM HELPER
========================================== */

function random(min, max) {
  
  return Math.random() * (max - min) + min;
  
}

/* ==========================================
   CREATE STARS
========================================== */

function createStars() {
  
  if (!starsContainer) return;
  
  const totalStars = 250;
  
  for (let i = 0; i < totalStars; i++) {
    
    const star = document.createElement("div");
    
    star.className = "star";
    
    const size = random(1, 3.5);
    
    star.style.width = size + "px";
    star.style.height = size + "px";
    
    star.style.left = random(0, 100) + "vw";
    star.style.top = random(0, 100) + "vh";
    
    star.style.animationDuration = random(2, 5) + "s";
    star.style.animationDelay = random(0, 5) + "s";
    
    star.style.opacity = random(.3, 1);
    
    starsContainer.appendChild(star);
    
  }
  
}

/* ==========================================
   SHOOTING STAR
========================================== */

function createShootingStar() {
  
  if (!shootingContainer) return;
  
  const star = document.createElement("div");
  
  star.className = "shooting-star";
  
  star.style.left = random(-20, 90) + "vw";
  star.style.top = random(0, 30) + "vh";
  
  shootingContainer.appendChild(star);
  
  let x = 0;
  let y = 0;
  
  const speed = random(10, 18);
  
  function animate() {
    
    x += speed;
    y += speed * 0.45;
    
    star.style.transform =
      `translate(${x}px,${y}px) rotate(-35deg)`;
    
    star.style.opacity = Math.max(0, 1 - x / 700);
    
    if (x < 700) {
      
      requestAnimationFrame(animate);
      
    }
    
    else {
      
      star.remove();
      
    }
    
  }
  
  requestAnimationFrame(animate);
  
}

setInterval(() => {
  
  createShootingStar();
  
}, 4500);

/* ==========================================
   FLOATING HEARTS
========================================== */

function createHeart() {
  
  const heart = document.createElement("div");
  
  heart.className = "floating-heart";
  
  heart.textContent = "❤️";
  
  heart.style.left = random(0, 100) + "vw";
  
  heart.style.bottom = "-40px";
  
  heart.style.fontSize = random(18, 34) + "px";
  
  heart.style.animationDuration = random(6, 10) + "s";
  
  document.body.appendChild(heart);
  
  let y = 0;
  
  function floatHeart() {
    
    y += 1.2;
    
    heart.style.transform =
      `translateY(-${y}px)`;
    
    heart.style.opacity =
      Math.max(.1, 1 - y / 500);
    
    if (y < 550) {
      
      requestAnimationFrame(floatHeart);
      
    }
    
    else {
      
      heart.remove();
      
    }
    
  }
  
  requestAnimationFrame(floatHeart);
  
}

setInterval(() => {
  
  createHeart();
  
}, 1500);

/* ==========================================
   CURSOR SPARKLES
========================================== */

document.addEventListener("mousemove", (event) => {
  
  for (let i = 0; i < 2; i++) {
    
    const sparkle = document.createElement("div");
    
    sparkle.style.position = "fixed";
    
    sparkle.style.left =
      event.clientX + random(-10, 10) + "px";
    
    sparkle.style.top =
      event.clientY + random(-10, 10) + "px";
    
    sparkle.style.width = "4px";
    sparkle.style.height = "4px";
    
    sparkle.style.borderRadius = "50%";
    
    sparkle.style.background = "white";
    
    sparkle.style.pointerEvents = "none";
    
    sparkle.style.zIndex = "9999";
    
    document.body.appendChild(sparkle);
    
    let opacity = 1;
    let scale = 1;
    
    function animate() {
      
      opacity -= 0.04;
      scale += 0.05;
      
      sparkle.style.opacity = opacity;
      
      sparkle.style.transform =
        `scale(${scale})`;
      
      if (opacity > 0) {
        
        requestAnimationFrame(animate);
        
      }
      
      else {
        
        sparkle.remove();
        
      }
      
    }
    
    requestAnimationFrame(animate);
    
  }
  
});

/* ==========================================
   GLOWING BACKGROUND
========================================== */

let backgroundAngle = 0;

function animateBackground() {
  
  backgroundAngle += 0.08;
  
  document.body.style.background =
    `radial-gradient(circle at ${
        50+Math.sin(backgroundAngle)*20
    }% ${
        15+Math.cos(backgroundAngle)*10
    }%,
    #2b4f81 0%,
    #182848 40%,
    #050816 100%)`;
  
  requestAnimationFrame(animateBackground);
  
}

/* ==========================================
   INITIALIZE
========================================== */

createStars();

animateBackground();

/* ==========================================================
   PART 3 - PROPOSAL & CELEBRATION
========================================================== */

/* ==========================================
   NO BUTTON TEXTS
========================================== */

const noMessages = [

"No 😅",

"Are you sure? ",

"Please... ",

"Think Again 😊",

"Still No? 😭",

"We'll Keep Hoping ",

"You're Too Fast 😂"

];

let noIndex = 0;

/* ==========================================
   MOVE NO BUTTON
========================================== */

function moveNoButton(){

    const parent = noBtn.parentElement;

    const maxX = parent.clientWidth - noBtn.offsetWidth;

    const maxY = parent.clientHeight - noBtn.offsetHeight;

    const x = Math.random() * Math.max(maxX,20);

    const y = Math.random() * Math.max(maxY,20);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

}

function escapeNoButton(){

    moveNoButton();

    noBtn.textContent =
    noMessages[
        noIndex % noMessages.length
    ];

    noIndex++;

}

noBtn.addEventListener("mouseenter",escapeNoButton);

noBtn.addEventListener("touchstart",(event)=>{

    event.preventDefault();

    escapeNoButton();

});

/* ==========================================
   HEART BURST
========================================== */

function heartBurst(){

    for(let i=0;i<40;i++){

        const heart=document.createElement("div");

        heart.textContent="❤️";

        heart.style.position="fixed";

        heart.style.left="50%";
        heart.style.top="50%";

        heart.style.fontSize=
        random(18,36)+"px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="9999";

        document.body.appendChild(heart);

        const angle=Math.random()*Math.PI*2;

        const distance=random(120,380);

        const x=Math.cos(angle)*distance;

        const y=Math.sin(angle)*distance;

        heart.animate(

        [

        {

        transform:

        "translate(-50%,-50%) scale(.3)",

        opacity:1

        },

        {

        transform:

        `translate(${x}px,${y}px) scale(1.4)`,

        opacity:0

        }

        ],

        {

        duration:1800,

        easing:"ease-out"

        }

        );

        setTimeout(()=>{

            heart.remove();

        },1800);

    }

}

/* ==========================================
   FIREWORKS
========================================== */

const canvas=document.getElementById("fireworks");

const ctx=canvas.getContext("2d");

function resizeCanvas(){

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

}

window.addEventListener("resize",resizeCanvas);

resizeCanvas();

let particles=[];

function createFirework(){

    const x=random(100,canvas.width-100);

    const y=random(80,canvas.height/2);

    const colors=[

    "#ff4d88",

    "#ffd93d",

    "#4dd0ff",

    "#7cff7c",

    "#ffffff",

    "#ff914d"

    ];

    const color=

    colors[
    Math.floor(
    Math.random()*colors.length
    )
    ];

    for(let i=0;i<70;i++){

        particles.push({

            x:x,

            y:y,

            dx:Math.cos(i)*random(1,6),

            dy:Math.sin(i)*random(1,6),

            life:100,

            color:color

        });

    }

}

function updateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let i=particles.length-1;i>=0;i--){

        const p=particles[i];

        p.x+=p.dx;

        p.y+=p.dy;

        p.dy+=0.03;

        p.life--;

        ctx.globalAlpha=p.life/100;

        ctx.fillStyle=p.color;

        ctx.beginPath();

        ctx.arc(

        p.x,

        p.y,

        3,

        0,

        Math.PI*2

        );

        ctx.fill();

        if(p.life<=0){

            particles.splice(i,1);

        }

    }

    ctx.globalAlpha=1;

    requestAnimationFrame(updateFireworks);

}

updateFireworks();

/* ==========================================
   CONFETTI
========================================== */

function confetti(){

    for(let i=0;i<120;i++){

        const piece=document.createElement("div");

        piece.style.position="fixed";

        piece.style.width="10px";

        piece.style.height="14px";

        piece.style.left=random(0,100)+"vw";

        piece.style.top="-20px";

        piece.style.background=

        `hsl(${random(0,360)},90%,60%)`;

        piece.style.pointerEvents="none";

        piece.style.zIndex="9999";

        document.body.appendChild(piece);

        const rotate=random(180,1080);

        piece.animate(

        [

        {

        transform:"translateY(0) rotate(0deg)",

        opacity:1

        },

        {

        transform:

        `translateY(${window.innerHeight+80}px)
         rotate(${rotate}deg)`,

        opacity:1

        }

        ],

        {

        duration:random(3000,5000),

        easing:"linear"

        }

        );

        setTimeout(()=>{

            piece.remove();

        },5000);

    }

}

/* ==========================================
   YES BUTTON
========================================== */

yesBtn.addEventListener("click",()=>{

    showScene(scene6);

    heartBurst();

    confetti();

    createFirework();

    const timer=setInterval(()=>{

        createFirework();

    },700);

    setTimeout(()=>{

        clearInterval(timer);

    },9000);

});

/* ==========================================
   SMALL SURPRISE
========================================== */

setInterval(()=>{

    if(document.querySelector("#scene6.active")){

        createFirework();

    }

},1800);

/* ==========================================
   END OF APP
========================================================== */
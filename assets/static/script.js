function updateLocalTime() {
  const timeElement = document.getElementById("local-time");
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}`;
}

updateLocalTime();

setInterval(updateLocalTime, 1000);

const linkButtons = document.querySelectorAll(".link-btn");

linkButtons.forEach((button, index) => {
  button.addEventListener("click", function (e) {
    this.classList.add("ripple");

    const ripple = document.createElement("span");
    ripple.classList.add("dynamic-ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
      this.classList.remove("ripple");
    }, 600);
  });

  button.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".link-icon");
    if (icon) {
      const rotation = Math.random() > 0.5 ? 10 : -10;
      icon.style.transform = `rotate(${rotation}deg) scale(1.1)`;
    }

    linkButtons.forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.classList.add("btn-dimmed");
      }
    });
  });

  button.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".link-icon");
    if (icon) {
      icon.style.transform = "";
    }

    linkButtons.forEach((otherButton) => {
      otherButton.classList.remove("btn-dimmed");
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

/*
const animatedElements = document.querySelectorAll('.link-btn, .intro-text');
animatedElements.forEach(el => observer.observe(el));
*/

const portrait = document.querySelector(".portrait");
const hero = document.querySelector(".hero");
const accents = document.querySelectorAll(".accent");

function addParallaxEffect() {
  document.addEventListener("mousemove", (e) => {
    if (!portrait) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const percentX = mouseX / windowWidth - 0.5;
    const percentY = mouseY / windowHeight - 0.5;

    const portraitMoveX = percentX * 15;
    const portraitMoveY = percentY * 15;
    portrait.style.transform = `translate(${portraitMoveX}px, ${portraitMoveY}px)`;

    accents.forEach((accent, index) => {
      const factor = (index + 1) * 2;
      const accentMoveX = percentX * factor * 10;
      const accentMoveY = percentY * factor * 10;
      accent.style.transform = `translate(${accentMoveX}px, ${accentMoveY}px) rotate(${
        percentX * 5
      }deg)`;
    });
  });
}

addParallaxEffect();

function animateAccents() {
  const accents = document.querySelectorAll(".accent");

  accents.forEach((accent, index) => {
    const xPos = Math.random() * 10 - 5;
    const yPos = Math.random() * 10 - 5;
    const rotation = Math.random() * 10 - 5;

    setInterval(() => {
      const newX = Math.random() * 8 - 4;
      const newY = Math.random() * 8 - 4;
      const newRotation = Math.random() * 6 - 3;

      accent.style.transition = "transform 3s ease-in-out";
      accent.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRotation}deg)`;
    }, 3000 + index * 500);
  });
}

function typewriterEffect() {
  const headline = document.querySelector(".headline");
  if (!headline) return;

  const text = headline.textContent;
  headline.textContent = "";
  headline.style.opacity = "1";
  headline.style.transform = "translateY(0)";

  let i = 0;
  const speed = 50;

  function type() {
    if (i < text.length) {
      headline.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 1000);
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  animateAccents();

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty("--cursor-x", `${x}px`);
    document.documentElement.style.setProperty("--cursor-y", `${y}px`);
  });
});

console.log(
  "%c👋 Hey there!",
  "font-size: 20px; font-weight: bold; color: #FF7A3D;"
);
console.log(
  "%cLooks like you're curious about how this works! 🔍",
  "font-size: 14px; color: #FF914D;"
);
console.log(
  "%cFeel free to reach out if you want to collaborate! ✨",
  "font-size: 14px; color: #FF7A3D;"
);
console.log(
  "%c- Kichu",
  "font-size: 12px; font-style: italic; color: #E0E0E0;"
);

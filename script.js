const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentNumber = document.getElementById("currentNumber");
const totalNumber = document.getElementById("totalNumber");
const progressFill = document.getElementById("progressFill");
const dotsContainer = document.getElementById("slideDots");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

let currentSlide = 0;
totalNumber.textContent = String(slides.length).padStart(2, "0");

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.className = "dot-button";
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll(".dot-button"));

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === currentSlide;
    slide.classList.toggle("active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });

  dots.forEach((dot, dotIndex) => {
    const active = dotIndex === currentSlide;
    dot.classList.toggle("active", active);
    if (active) dot.setAttribute("aria-current", "step");
    else dot.removeAttribute("aria-current");
  });

  currentNumber.textContent = String(currentSlide + 1).padStart(2, "0");
  progressFill.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
}

function nextSlide() { showSlide(currentSlide + 1); }
function previousSlide() { showSlide(currentSlide - 1); }

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", previousSlide);
startButton.addEventListener("click", nextSlide);
restartButton.addEventListener("click", () => showSlide(0));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    previousSlide();
  } else if (event.key === "Home") {
    showSlide(0);
  } else if (event.key === "End") {
    showSlide(slides.length - 1);
  }
});

// Basic touch navigation for phones and tablets.
let touchStartX = 0;
document.querySelector(".presentation").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.querySelector(".presentation").addEventListener("touchend", (event) => {
  const deltaX = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(deltaX) > 65) {
    if (deltaX < 0) nextSlide();
    else previousSlide();
  }
}, { passive: true });

showSlide(0);

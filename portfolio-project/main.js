const carousel = document.getElementById("image-outer-carousel");
const innerCarousel = document.getElementById("image-inner-carousel");
const previous = document.getElementById("previous-btn");
const next = document.getElementById("next-btn");
const form = document.getElementById("form");

let currentSlide = 0;
const slideWidth = innerCarousel.querySelector("img").offsetWidth;

const lightbox = document.createElement("div");

const slideCarousel = (direction) => {
  innerCarousel.style.transform = `translateX(${
    -currentSlide * slideWidth * direction
  }px)`;
  currentSlide =
    (currentSlide + direction + innerCarousel.querySelectorAll("img").length) %
    innerCarousel.querySelectorAll("img").length;
};

function ctaModal() {
  document.getElementById("consultation").addEventListener("click", () => {
    form.style.width = "100vw";
    form.style.minHeight = "100vh";
    form.style.backgroundColor = "#00000075";
    form.style.filter = "blur(100%)";
    console.log("clicked");
  });
}

function prevBtn() {
  previous.addEventListener("click", () => slideCarousel(0));
}

function nextBtn() {
  next.addEventListener("click", () => slideCarousel(0.5));
}
prevBtn();
nextBtn();
ctaModal();

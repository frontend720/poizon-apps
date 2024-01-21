const carousel = document.getElementById("image-outer-carousel");
const innerCarousel = document.getElementById("image-inner-carousel");
const previous = document.getElementById("previous-btn");
const next = document.getElementById("next-btn");

let currentSlide = 0;
const slideWidth = innerCarousel.querySelector("img").offsetWidth;

const slideCarousel = (direction) => {
  innerCarousel.style.transform = `translateX(${
    -currentSlide * slideWidth * direction
  }px)`;
  currentSlide =
    (currentSlide + direction + innerCarousel.querySelectorAll("img").length) %
    innerCarousel.querySelectorAll("img").length;
};

function prevBtn() {
  previous.addEventListener("click", () => slideCarousel(-1));
}

function nextBtn() {
  next.addEventListener("click", () => slideCarousel(1));
}

prevBtn();
nextBtn();

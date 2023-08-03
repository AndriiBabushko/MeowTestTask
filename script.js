// Burger menu logic
const burgerIcon = document.querySelector(".burger-icon");
const sidebar = document.querySelector(".sidebar");
const closeIcon = document.querySelector(".close-icon");

burgerIcon.addEventListener("click", function () {
    sidebar.classList.add("open");
});

closeIcon.addEventListener("click", function () {
    sidebar.classList.remove("open");
});


// Popular slider logic
const popularSliderContainer = document.querySelector('.most-popular-cards');
const popularSlideCount = popularSliderContainer.querySelectorAll('.popular-card').length;
let popularCurrentIndex = 0;

const updateSliderPosition = () => {
    const popularCard = document.querySelector('.popular-card');
    const styles = getComputedStyle(popularCard);
    const margins = parseInt(styles.marginLeft) + parseInt(styles.marginRight);
    const slideWidth = popularCard.offsetWidth + margins;
    const newPosition = -popularCurrentIndex * slideWidth;
    popularSliderContainer.style.transform = `translateX(${newPosition}px)`;
}

const nextSlide = () => {
    if (popularCurrentIndex < popularSlideCount - 1) {
        popularCurrentIndex++;
    } else {
        popularCurrentIndex = 0;
    }
    updateSliderPosition();
}

const prevSlide = () => {
  if (popularCurrentIndex > 0) {
    popularCurrentIndex--;
  } else {
    popularCurrentIndex = popularSlideCount - 1;
  }
  updateSliderPosition();
};

document
  .querySelector(".left-arrow-button")
  .addEventListener("click", prevSlide);
document
  .querySelector(".right-arrow-button")
  .addEventListener("click", nextSlide);

// Brands slider logic
const brandsSlider = document.querySelector(".popular-brands-slider");
const brandsSlides = document.querySelectorAll(".popular-brand-slide");
const indicatorsContainer = document.querySelector(".slider-indicators");
const indicators = [];

let slideIndex = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

initializeSlides();

const breakpoint = 992;
const slideWidth = brandsSlides[0].offsetWidth;
window.addEventListener("resize", () => {
  const windowWidth = window.innerWidth;
  if (windowWidth <= breakpoint) {
    brandsSlider.style.width = `${slideWidth}px`;
    brandsSlides.forEach((slide, index) => {
      removeListeners(slide, index);
      createListeners(slide, index);
      setPositionByIndex();
    });
  } else {
    brandsSlides.forEach((slide, index) => {
      removeListeners(slide, index);
    });
    brandsSlider.style.width = "";
  }
});
setPositionByIndex();

function initializeSlides() {
  brandsSlides.forEach((slide, index) => {
    removeListeners(slide, index);
    createListeners(slide, index);

    const indicator = document.createElement("div");
    indicator.classList.add("slider-indicator");
    indicators.push(indicator);
    indicatorsContainer.appendChild(indicator);

    indicator.addEventListener("click", () => {
      slideIndex = index;
      setPositionByIndex();
    });
  });
}

function createListeners(slide, index) {
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  slide.addEventListener("dragstart", dragStartEvent);
}

function removeListeners(slide, index) {
  slide.removeEventListener("touchstart", touchStart(index));
  slide.removeEventListener("touchend", touchEnd);
  slide.removeEventListener("touchmove", touchMove);
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  brandsSlider.style.transform = `translateX(${currentTranslate}px)`;
}

function touchStart(index) {
  return function (event) {
    slideIndex = index;
    startPosition = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    brandsSlider.classList.add("grabbing");
  };
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;

  const moveBy = currentTranslate - prevTranslate;

  if (moveBy < -100 && slideIndex < brandsSlides.length - 1) {
    slideIndex++;
  }

  if (moveBy > 100 && slideIndex > 0) {
    slideIndex--;
  }

  setPositionByIndex();

  brandsSlider.classList.remove("grabbing");
}

function dragStartEvent(e) {
  e.preventDefault();
}

function setPositionByIndex() {
  currentTranslate = slideIndex * -slideWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
  updateIndicators();
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === slideIndex);
  });
}
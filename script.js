// Burger menu logic


// Popular slider logic
const popularSliderContainer = document.querySelector('.most-popular-cards');
const popularSlideCount = popularSliderContainer.querySelectorAll('.popular-card').length;
let popularCurrentIndex = 0;

const updateSliderPosition = () => {
    const element = document.querySelector('.popular-card');
    const styles = getComputedStyle(element);
    const margins = parseInt(styles.marginLeft) + parseInt(styles.marginRight);
    const slideWidth = element.offsetWidth + margins;
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
}

document.querySelector('.left-arrow-button').addEventListener('click', prevSlide);
document.querySelector('.right-arrow-button').addEventListener('click', nextSlide);


// Brands slider logic
// Отримуємо елементи слайдера та індикаторів
const slider = document.querySelector('.popular-brands-slider');
const slides = document.querySelectorAll('.popular-brand-slide');
const indicatorsContainer = document.querySelector('.slider-indicators');

slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('slider-indicator');
    indicator.setAttribute('data-slide', index);
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.slider-indicator');

let currentIndex = 0;

function showSlide(index) {
    if (index < 0 || index >= slides.length) {
        return;
    }

    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
    });

    const activeIndicator = document.querySelector('.slider-indicator.active');
    if (activeIndicator) {
        activeIndicator.classList.remove('active');
    }
    indicators[index].classList.add('active');

    currentIndex = index;
}

function showNextSlide() {
    const nextIndex = currentIndex + 1;
    showSlide(nextIndex);
}

function showPrevSlide() {
    const prevIndex = currentIndex - 1;
    showSlide(prevIndex);
}

indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

showSlide(currentIndex);

// Встановлюємо обробники свайпів
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 0) {
        // Свайп вправо - показуємо попередній слайд
        showPrevSlide();
    } else if (deltaX < 0) {
        // Свайп вліво - показуємо наступний слайд
        showNextSlide();
    }
});


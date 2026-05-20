// Управление слайдами презентации
(function() {
    'use strict';

    var currentSlide = 0;
    var slides = [];
    var timerInterval = null;
    var seconds = 0;

    function init() {
        slides = document.querySelectorAll('.slide');
        if (slides.length === 0) return;

        // Показать первый слайд
        showSlide(0);

        // Навигация
        document.getElementById('prev-btn').addEventListener('click', prevSlide);
        document.getElementById('next-btn').addEventListener('click', nextSlide);

        // Точки навигации
        var dotsContainer = document.getElementById('dots');
        slides.forEach(function(_, i) {
            var dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            dot.addEventListener('click', function() {
                showSlide(parseInt(this.dataset.index));
            });
            dotsContainer.appendChild(dot);
        });

        // Клавиши
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                showSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                showSlide(slides.length - 1);
            }
        });

        // Touch/swipe support
        var touchStartX = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        });
        document.addEventListener('touchend', function(e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        });

        // Таймер
        document.getElementById('timer-toggle').addEventListener('click', function() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                this.textContent = '▶ Старт';
            } else {
                timerInterval = setInterval(function() {
                    seconds++;
                    updateTimerDisplay();
                }, 1000);
                this.textContent = '⏸ Стоп';
            }
        });

        updateSlideInfo();
    }

    function showSlide(index) {
        if (index < 0 || index >= slides.length) return;

        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');
        currentSlide = index;
        updateDots();
        updateSlideInfo();
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    function updateDots() {
        var dots = document.querySelectorAll('.dot');
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function updateSlideInfo() {
        var info = document.getElementById('slide-info');
        if (info) {
            info.textContent = (currentSlide + 1) + ' / ' + slides.length;
        }
    }

    function updateTimerDisplay() {
        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;
        var display = document.getElementById('timer-display');
        if (display) {
            display.textContent = 
                (mins < 10 ? '0' : '') + mins + ':' + 
                (secs < 10 ? '0' : '') + secs;
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();


window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (smoothScroll) {
            smoothScroll.preventDefault()
            const blockID = anchor.getAttribute('href').substr(1)
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        });
    }
    
    function countTimer(deadline) {      
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        function getTimeRemaining() {         
            
            let dateStop = new Date(deadline).getTime();   
            let dateNow = new Date().getTime(); 
            let timeRemaining = (dateStop - dateNow) / 1000;    
            let seconds = Math.floor(timeRemaining % 60);  
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);

            return {
                'timeRemaining': timeRemaining,
                'hours': hours,         
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function zeroZero(a) {
            if (a > 0 && a < 10 || a === 0) {
             return '0' + a;
            } else {
              return a;
            }
        };
        
        let trueUpdate = setInterval( () => {    
            let timer = getTimeRemaining();   

            timerHours.textContent = zeroZero(timer.hours);       
            timerMinutes.textContent = zeroZero(timer.minutes);
            timerSeconds.textContent = zeroZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(trueUpdate);
                timerHours.textContent = '00';       
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }, 1000);

    }
    countTimer('1 may 2020');
   
     const togglleMenu = () => {
         const menu = document.querySelector('menu');
         document.body.addEventListener('click', (event) => {
             let target = event.target;
             if (target && target.closest('.menu')) {
                 menu.classList.add('active-menu');
             } else if (target && (target.tagName === 'A' || !target.classList.contains('active-menu'))) {
                 menu.classList.remove('active-menu');
             }
         });
     };
     togglleMenu();
    
    const togglePopup = function () {
        let popup = document.querySelector(".popup"),
            popupBtn = document.querySelectorAll(".popup-btn"),
            popupClose = document.querySelector(".popup-close");

        popupBtn.forEach((function (requestAmimate) {
            requestAmimate.addEventListener("click", (function () {
                let requestAmimate, count = 0;
                popupOpacity = requestAnimationFrame((function animatePopup() {
                    requestAmimate = requestAnimationFrame(animatePopup);
                    count++;
                    if (screen.width < 768) {
                        cancelAnimationFrame(popupOpacity);
                        popup.style.display = "block";
                    }
                    else {
                    count < 11 && (
                        popup.style.display = "block", popup.style.opacity = 10 * count + "%")
                    }
                }))
            }))
        }));
        
        popup.addEventListener("click", (function (requestAmimate) {
            let popupClickOutside = requestAmimate.target;
            popupClickOutside = popupClickOutside.closest(".popup-content");    
            popup.style.display = popupClickOutside ? "block" : "none";
        }));
            
        popupClose.addEventListener("click", (function () {
            let requestAmimate, count = 10;
            requestAmimate = requestAnimationFrame((function animatePopup() {
                requestAmimate = requestAnimationFrame(animatePopup);
                count--;
                if (screen.width < 768) {
                    cancelAnimationFrame(requestAmimate);
                    popup.style.display = "none";
                } else {
                    count > 0 && (popup.style.opacity = 10 * count + "%", 1 === count && (popup.style.display = "none"))}
            }))
        }))
    };

     togglePopup();

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),  
            tab = tabHeader.querySelectorAll('.service-header-tab'),  
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {   
            for (let i = 0; i < tabContent.length; i++){
                if (index === i) {
                    tab[i].classList.add('active');   
                    tabContent[i].classList.remove('d-none');  
                } else {
                    tab[i].classList.remove('active'); 
                    tabContent[i].classList.add('d-none');   
                }
            }
        };
    
        tabHeader.addEventListener('click', (event) => {    
            let target = event.target;    
            target = target.closest('.service-header-tab');  
                    if(target){  
                    tab.forEach((item, i) => {   
                        if (item === target) {             
                            toggleTabContent(i);    
                        }
                    });
                }
        });
    };

    tabs();
      
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const dots = document.querySelector('.portfolio-dots');
        const slider = document.querySelector('.portfolio-content');

        for (let i = 0; i < slide.length; i++) {
            dots.insertAdjacentHTML('beforeend',
                `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
        }
        const dot = document.querySelectorAll('.dot');

        let currentSlide = 0;
        let interval;
        const prewSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prewSlide(slide, currentSlide, 'portfolio-item-active');
            prewSlide(dot, currentSlide, 'dot-active');

            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (evt) => {
            evt.preventDefault();
            let target = evt.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prewSlide(slide, currentSlide, 'portfolio-item-active');
            prewSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (evt) => {
            if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (evt) => {
            if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(4000);
    };
    slider();
    });






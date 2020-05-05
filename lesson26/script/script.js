

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

        let trueUpdate = setInterval(() => {
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
                    count > 0 && (popup.style.opacity = 10 * count + "%", 1 === count && (popup.style.display = "none"))
                }
            }))
        }))
    };

    togglePopup();

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
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
            if (target) {
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

    const commandPhoto = () => {
        const command = document.querySelectorAll('#command .row img');
        let a;
        command.forEach(photo => {
            photo.addEventListener('mouseenter', (event) => {
                a = event.target.src;
                let target = event.target;
                target.src = target.getAttribute('data-img');
            });
            photo.addEventListener('mouseout', (event) => {
                let target = event.target;
                target.src = a;
            });
        });
    };

    commandPhoto();

    const calculateNumber = () => {
        document.querySelectorAll('[type="number"]').forEach(((event) => {
            event.addEventListener("input", (function () {
                event.value = event.value.replace(/\D/, "")
            }))
        }))
    };

    calculateNumber();

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const calcSquare = document.querySelector('.calc-square');
        const calcCount = document.querySelector('.calc-count');
        const calcDay = document.querySelector('.calc-day');
        const totalValue = document.querySelector('#total');

        let intervlId;
        const renderTotal = (total) => {
            let startTotal = 0;

            clearInterval(intervlId);

            if (calcType.options[calcType.selectedIndex] === 0) {
                clearInterval(intervlId);
                startTotal = 0;
            }

            intervlId = setInterval(() => {
                startTotal += (100 + total.toString().length);
                totalValue.textContent = startTotal;
                if (startTotal >= total) {
                    totalValue.textContent = total;
                    clearInterval(intervlId);
                }
            }, 5);
        };

        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;

            }

            renderTotal(total);

            totalValue.textContent = total;
        };



        calcBlock.addEventListener('change', (evt) => {
            const target = evt.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }

        });
    };

    calc(100);

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...';
        const loadMessage = 'Загрузка...';
        const successMessage = 'Спасибо! Мы с вами свяжемся!';

        const bodyHtml = document.querySelector('body');
        const forms = document.querySelectorAll('form');
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status-message');

        const loader = () => {
            return (`<style>
                .preloader__container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  width: 100%;
                  overflow: hidden;
                  animation-delay: 1s;
                  background-color: rgba(0,0,0,0.33);
                  
                  position: fixed;
                  left: 0;
                  top: 0;
                      z-index: 999999;
                }
                .item-1 {
                  width: 20px;
                  height: 20px;
                  background: #f583a1;
                  border-radius: 50%;
                  margin: 7px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                @keyframes scale {
                  0% {
                    transform: scale(1);
                  }
                  50%,
                    75% {
                    transform: scale(2.5);
                  }
                  78%, 100% {
                    opacity: 0;
                  }
                }
                .item-1:before {
                  content: '';
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background-color: #eed968;
                  opacity: 0.7;
                  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
                  animation-delay: 200ms;
                  transition: 0.5s all ease;
                  transform: scale(1);
                }
                
                </style>
                <div class="preloader">
                  <div class="preloader__container">
                    <div class="item-1"></div>
                  </div>
                </div>`);
        };

        const removeStatusMessage = () => {
            const status = document.querySelector('.status-message');
            if (!status) return;
            setTimeout(() => {
                status.remove();
            }, 5000);
        };

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(body));
            });

        };
        forms.forEach(form => {
            form.addEventListener('input', (evt) => {
                let target = evt.target;
                if (target.name === 'user_phone') {
                    target.value = target.value.replace(/[^\+\d]/g, '');
                }

                if (target.name === 'user_name' || target.name === 'user_message') {
                    target.value = target.value.replace(/[^а-я ]/gi, '');
                }
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.style.cssText = `font-size: 2rem;
              color: #fff; `;
                const formData = new FormData(form);
                statusMessage.textContent = loadMessage;

                bodyHtml.insertAdjacentHTML(`beforeend`, loader());
                const loaderHtml = document.querySelector('.preloader');

                let body = {};
                for (let val of formData.entries()) {
                    body[val[0]] = val[1];
                }

                const outputData = () => {
                    statusMessage.style.cssText = `font-size: 2rem;
              color: green; `;
                    removeStatusMessage();
                    statusMessage.textContent = successMessage;
                    form.reset();
                    loaderHtml.remove();
                };

                const error = () => {
                    statusMessage.style.cssText = `font-size: 2rem;
              color: red; `;
                    removeStatusMessage();
                    statusMessage.textContent = errorMessage;
                    loaderHtml.remove();
                };


                postData(body)
                    .then(outputData)
                    .catch(error);

            });
        });
    };

    sendForm();
});





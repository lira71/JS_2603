
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    
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
   
     const toggleMenu = () => {

         const btnMenu = document.querySelector('.menu'); 
         const menu = document.querySelector('menu'); 
         const closeBtn = document.querySelector('.close-btn'); 
         const menuItems = menu.querySelectorAll('ul>li');

         const handlerMenu = () => {
          
             menu.classList.toggle('active-menu');
         };

         btnMenu.addEventListener('click', handlerMenu);
         closeBtn.addEventListener('click', handlerMenu);
         menuItems.forEach((elem) => { 
             elem.addEventListener('click', handlerMenu);
         });
        
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
     };

     toggleMenu();

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
        
      /* 
        popup.addEventListener("click", (function (requestAmimate) {
            let popupClickOutside = requestAmimate.target;
            popupClickOutside = popupClickOutside.closest(".popup-content");
            popup.style.display = popupClickOutside ? "block" : "none";
        }));
        
*/
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
});


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
            popupClickOutside = popupClickOutside.closest(".popup-content");    //метод closest будет подниматься ища класс popup-content, не найдя его даст нам null
            popup.style.display = popupClickOutside ? "block" : "none";
        }));
        

        
        /*
клик мимо попап без анимации
popup.addEventListener('click', (event) => {
    let target = event.target;
    if(target.classList.contains('popup-close')){
    popup.style.display ='none';
    } else {
    target = target.closest('.popup-content');
    if(!target){
    popup.style.display = 'none';
    }}
});



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

    
    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),     //родитель
            tab = tabHeader.querySelectorAll('.service-header-tab'),  //табы на которые будем кликать
            tabContent = document.querySelectorAll('.service-tab');
        
        //пишем отдельную функцию, которая будет менять наши блоки с контентом
        const toggleTabContent = (index) => {   //передаём в эту функцию индекс нашего таба
            for (let i = 0; i < tabContent.length; i++){
                if (index === i) {
                    tab[i].classList.add('active');   //тот таб, на который мы нажали с индексом i получает класс active (чтобы он подсвечивался синим)
                    tabContent[i].classList.remove('d-none');  //нажали на какой-то блок, например 0-й, его индекс передался и цикл начинает перебирать их все на соответствие с переданным. Сравнивает i и переданный индекс. куда нажмём, то и покажется, по индексу. Через класс-лист убираем свойство d-none, которое скрывает блоки
                } else {
                    tab[i].classList.remove('active'); //а у неактивных эелементов подсветку синим отключаем и класс убираем
                    tabContent[i].classList.add('d-none');   //а всему остальному добавляем d-none
                }
            }
        };
        
        
        
        
    //пишем обработчик события. Вешаем его на tabHeader. Используем делегирование
        tabHeader.addEventListener('click', (event) => {    //тут срелочная call-back функция
            let target = event.target;    //через terget получаем именно тот элемент на который мы кликнули
            target = target.closest('.service-header-tab');  //к нашему таргету будем присваивать метод closest. Он проверяет у элемента селектор (то что в скобочках, нам нужен этот класс)
            //Если у элемента есть нужный селектор, то этот метод возвращает нам обратно этот элемент. Если селектора нет, то метод поднимается выше, к родителю, и проверяет, есть ли там этот класс. Если и там нет, то поднимается ещё выше
//у нас есть спаны, если кликнуть на них, то табы не меняются, как это решить:
          //  while (target !== tabHeader) {        //когда таргет выходит за рамки тапхедер мы прерываем наш цикл
                
            


              //  if (target.classList.contains('service-header-tab')) {  //если мы кликнули по табу с нужным нам классом, то
                    //с помощью цикла будем проверять, на какой таб мы кликнули (их 3 одинаковых)
                    if(target){  //проверяем, есть ли в таргет хоть что-то
                    tab.forEach((item, i) => {   //callback функция принимает 2 аргумента
                        if (item === target) {             //если тот элемент, на который мы кликнули соответствует target, то
                            toggleTabContent(i);     //тот индекс, который мы будем получать из функции, мы будем сравнивать с индексом tabContent
                        }
                    });
                //    return;   //если класс соответствует нужному
                }
           //     target = target.parentNode;    //если кликнули мимо(в том числе и на спан), и то на что мы кликнули не имеет класс service-header-tab (см выше), то мы таргету присвоим класс его родителя
                //значит снова пойдёт проверка, не вышли ли мы на рамки tapheader и тд
           // }
        });


    };

    tabs();
    
    
});

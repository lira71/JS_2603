
'use strict';

const isNum = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const getRandomNum = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



const gameRandom = function(attemps) {
    const randomNum = getRandomNum(1, 100);
    console.log(randomNum);

    

    return (function checkNumber() {
       
        const userNumber = prompt('Угадай число от 1 до 100');

        if (isNum(userNumber)){
            let repeat = false;
            
                const num = +userNumber;
                if (num > randomNum) {
                    alert('Загаданное число меньше');
                    return checkNumber();
                }
                if (num < randomNum) {
                    alert('Загаданное число больше');
                    return checkNumber();
                }
                repeat = confirm('Вы молодец, угадали число!');
            
          
            console.log(repeat);

            if (repeat) gameRandom(attemps);
        } else {
            if (userNumber !== null){
                alert('Введи число!');
                checkNumber();
            }
        }
        alert('Заходи ещё!');
    }());
};

gameRandom();

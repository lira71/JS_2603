setInterval(function () {

    let currentDate = new Date();            
    let today = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let week = currentDate.getDay();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let weeks = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let newYear = '01, 01, 2021';
    
    function zeroZero(a) {                   
    
        if (a > 0 && a < 10 || a === 0) {
            return '0' + a;
        } else {
            return a;
        }
    };

    function helloDude(a) {                
    if (a >= 5 && a < 12) {
        return "Доброе утро";
    } else if (a >= 12 && a < 18) {
        return "Добрый день";
    } else if (a >= 18 && a < 24) {
        return "Добрый вечер";
    } else if (a >= 0 && a < 5) {
        return "Доброй ночи";
    }
    };

    function timeAmPm() {
        let amPm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? hour : 12; 

        let strTime = zeroZero(hour) + ':' + zeroZero(minute) + ' ' + amPm;
        return strTime;
    }

function getTimeRemaining(a) { 

    let dateStop = new Date(a).getTime();
    let dateNow = currentDate.getTime(); 
    let timeRemaining = (dateStop - dateNow) / 1000; 
    let dayToStop = Math.floor(timeRemaining / 60 / 60 / 24);
    return dayToStop;
}
    document.querySelector('body').innerHTML = helloDude(hour) + ' ' + ' Сегодня: ' + weeks[week] + ' ' + 'Текущее время: ' + timeAmPm() + ' ' + 'До Нового года осталось: ' + getTimeRemaining(newYear) + ' ' + 'дней/дня';

    return;
}, 1000);
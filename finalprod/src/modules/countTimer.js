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

};

export default countTimer;
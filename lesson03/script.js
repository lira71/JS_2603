let income = 'freelance';
let deposit = true;
let mission = 1000000;
let period = 7;

let money = +prompt('Ваш месячный доход?');
let budgetDay = money/30;

console.log(Math.floor(budgetDay));

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase().split(', ');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Период равен:' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать:' + ' ' + mission + ' ' + 'рублей');
console.log(addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдётся?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдётся?');

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц:' + ' ' + budgetMonth);

let monthMission = mission/budgetMonth;
console.log('Цель будет достигнута за:' + ' ' + Math.ceil(monthMission) + ' ' + 'месяцев/ца');

budgetDay = budgetMonth/30;
console.log('Бюджет на день:' + ' ' + Math.floor(budgetDay));

let freeMoney = budgetDay;

if (freeMoney >= 1200){
    console.log('У Вас высокий уровень дохода');
} else if (freeMoney >= 600 && freeMoney < 1200){
    console.log('У Вас средний уровень дохода');
} else if (freeMoney > 0 && freeMoney < 600){
    console.log('К сожалению, у Вас уровень дохода ниже среднего');
} else if (freeMoney < 0){
    console.log('Что-то пошло не так');
} else {
    console.log('Проверьте введённые данные');
}
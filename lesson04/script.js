let income = 'freelance';
let mission = 1000000;
let period = 7;
let money = +prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase().split(', ');
let deposit = confirm('Есть ли у вас депозит в банке?');

function showTypeOf(){
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
};
showTypeOf();

console.log('Период равен:' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать:' + ' ' + mission + ' ' + 'рублей');
console.log(addExpenses);

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдётся?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдётся?');

function getExpensesMonth(a, b){
    return a + b;
};
let gExpensesMonth = getExpensesMonth(amount1, amount2);
console.log('Обязательные расходы за месяц:' + ' ' + gExpensesMonth);

function getAccumulatedMonth(a, b){
    return a - b;
};
let accumulatedMonth = getAccumulatedMonth(money, gExpensesMonth);
console.log('Бюджет на месяц:' + ' ' + accumulatedMonth);

function getTargetMonth(a, b){
    return a/b;
 };
 let gTargetMonth = getTargetMonth(mission, accumulatedMonth);
console.log('Цель будет достигнута за:' + ' ' + Math.ceil(gTargetMonth) + ' ' + 'месяцев/ца');

budgetDay = accumulatedMonth/30;
console.log('Бюджет на день:' + ' ' + Math.floor(budgetDay));

let freeMoney = budgetDay;

function getStatusIncome(){
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
};
getStatusIncome();


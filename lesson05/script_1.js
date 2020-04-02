let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)     
};


let income = 'freelance';
let mission = 1000000;
let period = 7;
let money;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase().split(', ');
let deposit = confirm('Есть ли у вас депозит в банке?');


let start = function(){
    do {money = prompt('Ваш месячный доход?');}
    while (!isNumber(money));
};
start();


let showTypeOf = function(item){
    console.log(typeof item);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log('Период равен:' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать:' + ' ' + mission + ' ' + 'рублей');
console.log(addExpenses);

let expenses = [];
let getExpensesMonth = function(){
    let sum = 0;
    let question;
    
    for (let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            question = prompt('Во сколько это обойдётся?');
            sum += question;
        }
        while (!isNumber(question));
    }
        };
let expensesAmount = getExpensesMonth();
    
console.log(expensesAmount);


console.log('Обязательные расходы за месяц:' + ' ' + expensesAmount);


let getAccumulatedMonth = function(){
    return money - expensesAmount;
};
console.log('Бюджет на месяц:' + ' ' + getAccumulatedMonth());

let accumulatedMonth = getAccumulatedMonth();


let getTargetMonth = function(){

     return mission / accumulatedMonth
};


if (getTargetMonth()>=0){
    console.log('Цель будет достигнута за:' + ' ' + Math.ceil(getTargetMonth()) + ' ' + 'месяцев/ца');}
else {console.log('Цель не будет достигнута');}



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

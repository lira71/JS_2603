let money = 10000;
let income = 'freelance';
let addExpenses = 'Internet, Taxi, Communal payments';
let deposit = true;
let mission = 20000;
let period = 7;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен:' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать:' + ' ' + mission + ' ' + 'рублей');

let lowerExpenses = addExpenses.toLowerCase();
console.log(lowerExpenses.split(', '));

let budgetDay = money/30;
console.log(Math.floor(budgetDay));

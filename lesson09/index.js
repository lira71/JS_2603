//кнопка Рассчитать
const startControl = document.querySelector('#start');
console.log(startControl);

//кнопка +
const btnPlus = document.getElementsByTagName('button')[0];
console.log(btnPlus);

const btnExpenses = document.getElementsByTagName('button')[1];
console.log(btnExpenses);

//checkbox
const checkboxSel = document.querySelector('#deposit-check');
console.log(checkboxSel);

//поля для ввода возможных доходов
const incomeItem = document.querySelectorAll('.additional_income-item');
console.log(incomeItem);

//элементы в правой части все в одной переменной
const budgetTotal = document.querySelectorAll('.result-total');
console.log(budgetTotal);

//элементы в правой части по разным переменным
const budgetMV = document.querySelector('.budget_month-value');
console.log(budgetMV);

const budgetDV = document.querySelector('.budget_day-value');
console.log(budgetDV);

const expensesMV = document.querySelector('.expenses_month-value');
console.log(expensesMV);

const additionalIV = document.querySelector('.additional_income-value');
console.log(additionalIV);

const additionalEV = document.querySelector('.additional_expenses-value');
console.log(additionalEV);

const incomePV = document.querySelector('.income_period-value');
console.log(incomePV);

const targetMV = document.querySelector('.target_month-value');
console.log(targetMV);

//range
const rangeSel = document.querySelector('.period-select');
console.log(rangeSel);

//цель
const targetAm = document.querySelector('.target-amount');
console.log(targetAm);

//обязательные расходы
const expensesT = document.querySelector('.expenses-title');
console.log(expensesT);

const expensesAm = document.querySelector('.expenses-amount');
console.log(expensesAm);

//возможные расходы
const addExpItem = document.querySelector('.additional_expenses-item');
console.log(addExpItem);

//дополнительный доход
const incomeT = document.querySelector('.income-title');
console.log(incomeT);

const incomeA = document.querySelector('.income-amount');
console.log(incomeA);

//месячный доход
const salaryAm = document.querySelector('.salary-amount');
console.log(salaryAm);
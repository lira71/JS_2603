'use strict';
let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?', 50000);
        }
        while (isNaN(money) || money === '' || money === null)
    };

start();

let appData = {
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        expensesMonth: 0,
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 50000,
        period: 3,
        asking: function () {

        if(confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
            }
            while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);
            let cashIncome; 
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            }
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);
            appData.income[itemIncome] = cashIncome;

        }

            let addExpenses = prompt('Перечислите возможные расходы через запятую?');
            appData.addExpenses = addExpenses.split(',');
            
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {

                let itemExpenses;
                do {
                    itemExpenses = prompt('Введите обязательную статью расходов?');
                }
                while (!isNaN(itemExpenses) || itemExpenses === '' || itemExpenses === null);
                let cashExpenses;
                do {
                    cashExpenses = prompt('Во сколько это обойдётся?');
                }
                while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

                appData.expenses[itemExpenses] = cashExpenses;
            }
        },
        getExpensesMonth: function (){
            for (let key in appData.expenses) {
                appData.expenses += +appData.expenses[key];
            }
        },
        getExpensesMonth: function () {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth: function () {
            return appData.mission / appData.budgetMonth;
        },
        getStatusIncome: function () {
            
            if (appData.budgetDay >= 1200){
                console.log('У Вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
                console.log('У Вас средний уровень дохода');
            } else if (appData.budgetDay > 0 && appData.budgetDay < 600){
                console.log('К сожалению, у Вас уровень дохода ниже среднего');
            } else if (appData.budgetDay < 0){
                console.log('Что-то пошло не так');
            } else {
                console.log('Проверьте введённые данные');
            }
        },
        getInfoDeposit: function(){
            if(appData.deposit){
                
                do{
                    appData.percentDeposit = prompt('Какой годовой процент?');
                }
                while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);

                do{
                    appData.moneyDeposit = prompt('Какая сумма заложена?');
                }
                while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
            }
        },
        calcSavedMoney: function(){
           return appData.budgetMonth * appData.period;
        }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' ' + 'месяца');
} else {
    console.log('Цель не будет достигнута');
}

appData.getStatusIncome();

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());


let addExpensesConsole = appData.addExpenses.map(function(item){
    return item[0].toUpperCase() + item.slice(1)
});
console.log(addExpensesConsole);

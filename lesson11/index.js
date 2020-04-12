'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesAmount = document.querySelectorAll('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items');


let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        expensesMonth: 0,
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        

        start: function () {
        
            if (salaryAmount.value === ''){
                alert('Поле "Месячный доход" должно быть заполнено"!');
                return;
            }

            appData.budget = +salaryAmount.value;
            
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getIncomeMonth();
            appData.getBudget();
            appData.showResult();
        },

        showResult: function(){       

            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = Math.floor(appData.budgetDay);
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcPeriod();

            periodSelect.addEventListener('change', function(){
                incomePeriodValue.value = appData.calcPeriod();
            })
                
        },

        addExpensesBlock: function(){
            
            console.log(expensesItems.parentNode);         
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                expensesPlus.style.display = 'none';
            }
        },

        addIncomeBlock: function(){

            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                incomePlus.style.display = 'none';
            }
        },

        getExpenses: function(){
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },

        getIncome: function(){

            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    appData.income[itemIncome] = cashIncome;
                }

            });

        },


        getAddExpenses: function(){
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },

        getAddIncome: function(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },
        
        getExpensesMonth: function () {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },

        getIncomeMonth: function () {
            for (let key in appData.income) {
                appData.incomeMonth += +appData.income[key];
            }
        },

        getBudget: function() {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth: function () {
            return targetAmount.value / appData.budgetMonth;
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


        changeRange: function() {
            periodSelect.value = event.target.value;
            periodAmount.textContent = periodSelect.value;
          },

        calcPeriod: function(){
           return (+appData.budgetMonth) * +periodSelect.value;
        },


        changlePeriodSelect: function() {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = appData.calcPeriod();
        }


    };

     
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

 //ползунок и число под полоской

 let eventFunc = function(event){
    
    console.log(event.target.value);
    event =document.querySelector('.period-amount');
    event.innerHTML = periodSelect.value;
};
periodSelect.addEventListener('change', eventFunc); 


for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcPeriod());


let addExpensesConsole = appData.addExpenses.map(function(item){
    return item[0].toUpperCase() + item.slice(1)
});
console.log(addExpensesConsole);

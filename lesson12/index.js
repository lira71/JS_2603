'use strict';

let startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
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

    function disabledInputText() {
        let inpitText = document.querySelectorAll('[type="text"]:not(.result-total)');
      
        inpitText.forEach(function(element){
          element.disabled = true;
        });
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
      }

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
                startBtn.disabled = true;
                return;
            };

            this.budget = +salaryAmount.value;
            
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getIncomeMonth();
            this.getBudget();
            this.showResult();
            disabledInputText();
        },

        showResult: function(){       

            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.floor(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcPeriod();

            const _this = this;
            periodSelect.addEventListener('change', function(){
                incomePeriodValue.value = _this.calcPeriod.call(_this);
            })
                
        },

        addExpensesBlock: function(){
            
                    
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
            let _this = this;
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        },

        getIncome: function(){
            let _this = this;
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    _this.income[itemIncome] = cashIncome;
                }

            });

        },


        getAddExpenses: function(){
           
            this.addExpenses = [];
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    this.addExpenses.push(item);
                }
            });
        },

        getAddIncome: function(){
            this.addIncome = [];
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
        },
        
        getExpensesMonth: function () {
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        },

        getIncomeMonth: function () {
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        },

        getBudget: function() {
            this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        },
        getTargetMonth: function () {
            return targetAmount.value / this.budgetMonth;
        },
        getStatusIncome: function () {
            
            if (this.budgetDay >= 1200){
                console.log('У Вас высокий уровень дохода');
            } else if (this.budgetDay >= 600 && this.budgetDay < 1200){
                console.log('У Вас средний уровень дохода');
            } else if (this.budgetDay > 0 && this.budgetDay < 600){
                console.log('К сожалению, у Вас уровень дохода ниже среднего');
            } else if (this.budgetDay < 0){
                console.log('Что-то пошло не так');
            } else {
                console.log('Проверьте введённые данные');
            }
        },


        getInfoDeposit: function(){
            if(this.deposit){
                
                do{
                    this.percentDeposit = prompt('Какой годовой процент?');
                }
                while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);

                do{
                    this.moneyDeposit = prompt('Какая сумма заложена?');
                }
                while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
            }
        },


        calcPeriod: function(){
           return (+this.budgetMonth) * +periodSelect.value;
        },


        //changlePeriodSelect: function() {
        //    periodAmount.textContent = periodSelect.value;
        //    incomePeriodValue.value = this.calcPeriod();
        //}

        reset: function(){
            
    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    startBtn.disabled = false;   
  
    inputAll.forEach(function(element){
      element.value = '';    
    });
  
    inputText.forEach(function(element){
      element.disabled = false;
    });
  
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  
    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    incomeItems.forEach(function(element, i){  
      if (i !== 0) {
        element.remove();
      }
    });
    incomePlus.style.display = 'block';
  
    expensesItems.forEach(function(element, i){  
      if (i !== 0) {
        element.remove();
      }
    });
    expensesPlus.style.display = 'block';


        }


    };

 //ползунок и число под полоской

 let eventFunc = function(event){
    
    console.log(event.target.value);
    event =document.querySelector('.period-amount');
    event.innerHTML = periodSelect.value;
};

periodSelect.addEventListener('change', eventFunc); 


//for (let key in this) {
 //   console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
//}

//appData.getInfoDeposit();
//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcPeriod());


let addExpensesConsole = appData.addExpenses.map(function(item){
    return item[0].toUpperCase() + item.slice(1)
});
console.log(addExpensesConsole);


startBtn.addEventListener('click', appData.start.bind(appData));
cancelBtn.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
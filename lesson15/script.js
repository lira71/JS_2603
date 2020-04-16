'use strict';

const   startBtn = document.getElementById('start');
const   cancelBtn = document.getElementById('cancel');
const   btnPlus = document.getElementsByTagName('button');
const   incomePlus = btnPlus[0];
const   expensesPlus = btnPlus[1];
const   additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const   depositCheck = document.querySelector('#deposit-check');
const   budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const   budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const   accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0];
const   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const   incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const   targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const   salaryAmount = document.querySelector('.salary-amount');
const   incomeTitle = document.querySelector('.income-title');
const   incomeAmount = document.querySelector('.income-amount');
const   expensesTitle = document.querySelector('.expenses-title');
let     expensesItems = document.querySelectorAll('.expenses-items');
const   expensesAmount = document.querySelectorAll('.expenses-amount');
const   additionalExpenses = document.querySelector('.additional_expenses');
const   periodSelect = document.querySelector('.period-select');
const   periodAmount = document.querySelector('.period-amount');
const   additionalExpensesItem = document.querySelector('.additional_expenses-item');
const   targetAmount = document.querySelector('.target-amount');
let     incomeItems = document.querySelectorAll('.income-items');

class AppData { constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    }
    
    inputRefresh () {
        let inputString = document.querySelectorAll('[placeholder="Наименование"]');
        let inputNumber = document.querySelectorAll('[placeholder="Сумма"]');

        inputString.forEach(el => {
            el.addEventListener('input', () => {
                el.value = el.value.replace(/[^а-яА-ЯёЁ ,.!]/, '');
            });
        });
        inputNumber.forEach(el => {
            el.addEventListener('input', () => {
                el.value = el.value.replace(/[^0-9]/, '');
            });
        });
    }

    disabledInputText () {
        let inpitText = document.querySelectorAll('[type="text"]:not(.result-total)');

        inpitText.forEach((element) => {
            element.disabled = true;
        });
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    }

    start () {

        if (salaryAmount.value === '') {
            startBtn.disabled = true;
            return;
        }

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getIncomeMonth();
        this.getBudget();
        this.disabledInputText();
        this.showResult();
    }

    showResult () {

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        const _this = this;
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = _this.calcPeriod.call(_this);
        })

    }

    addExpensesBlock () {

        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
        appData.inputRefresh();
    }

    addIncomeBlock () {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
        appData.inputRefresh();
    }

    getExpenses () {
        let _this = this;
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome () {
        let _this = this;
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }

        });

    }

    getAddExpenses () {

        const addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item); 
            }
        });
    }

    getAddIncome () {

        const _this = this;
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getIncomeMonth () {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getBudget () {
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome () {

        if (this.budgetDay >= 1200) {
            console.log('У Вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            console.log('У Вас средний уровень дохода');
        } else if (this.budgetDay > 0 && this.budgetDay < 600) {
            console.log('К сожалению, у Вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            console.log('Что-то пошло не так');
        } else {
            console.log('Проверьте введённые данные');
        }
    }

    getInfoDeposit () {
        if (this.deposit) {

            do {
                this.percentDeposit = prompt('Какой годовой процент?');
            }
            while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
        }
    }

    calcPeriod () {
        return (+this.budgetMonth) * +periodSelect.value;
    }

    eventFunc (event) {

        console.log(event.target.value);
        event = document.querySelector('.period-amount');
        event.innerHTML = periodSelect.value;
    }

    reset () {

        let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
        let inputAll = document.querySelectorAll('input:not(.period-select)');
        startBtn.disabled = false;

        inputAll.forEach((element) => {
            element.value = '';
        });

        inputText.forEach((element) => {
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
        incomeItems.forEach((element, i) => {
            if (i !== 0) {
                element.remove();
            }
        });
        incomePlus.style.display = 'block';

        expensesItems.forEach((element, i) => {
            if (i !== 0) {
                element.remove();
            }
        });
        expensesPlus.style.display = 'block';

    }

    eventListeners () {
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('change', this.eventFunc);
    }
};

const appData = new AppData();
    
appData.eventListeners();

console.log(appData);

appData.inputRefresh();
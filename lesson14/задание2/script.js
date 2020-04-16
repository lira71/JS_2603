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

    inpitText.forEach(function (element) {
        element.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
}

function inputRefresh() {
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
inputRefresh();


const AppData = function () {
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
};

AppData.prototype.start = function () {

    if (salaryAmount.value === '') {
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
};

AppData.prototype.showResult = function () {

    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    const _this = this;
    periodSelect.addEventListener('change', function () {
        incomePeriodValue.value = _this.calcPeriod.call(_this);
    })

};


AppData.prototype.addExpensesBlock = function () {

    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    cloneExpensesItems.querySelector('.expenses-title').value = '';
    cloneExpensesItems.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
    inputRefresh();
};

AppData.prototype.addIncomeBlock = function () {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
    inputRefresh();
};

AppData.prototype.getExpenses = function () {
    let _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    let _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }

    });

};


AppData.prototype.getAddExpenses = function () {

    const addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item); //error
        }
    });
};

AppData.prototype.getAddIncome = function () {

    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        const itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getIncomeMonth = function () {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {

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
};


AppData.prototype.getInfoDeposit = function () {
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
};


AppData.prototype.calcPeriod = function () {
    return (+this.budgetMonth) * +periodSelect.value;
};

AppData.prototype.eventFunc = function (event) {

    console.log(event.target.value);
    event = document.querySelector('.period-amount');
    event.innerHTML = periodSelect.value;
};

AppData.prototype.reset = function () {

    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    startBtn.disabled = false;

    inputAll.forEach(function (element) {
        element.value = '';
    });

    inputText.forEach(function (element) {
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
    incomeItems.forEach(function (element, i) {
        if (i !== 0) {
            element.remove();
        }
    });
    incomePlus.style.display = 'block';

    expensesItems.forEach(function (element, i) {
        if (i !== 0) {
            element.remove();
        }
    });
    expensesPlus.style.display = 'block';

};


AppData.prototype.eventListeners = function () {
    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('change', this.eventFunc);
};

const appData = new AppData();
appData.eventListeners();

console.log(appData);

let addExpensesConsole = appData.addExpenses.map(function (item) {
    return item[0].toUpperCase() + item.slice(1)
});
console.log(addExpensesConsole);

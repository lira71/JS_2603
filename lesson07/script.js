

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)     
};



let money;

let start = function(){
    do {money = prompt('Ваш месячный доход?');}
    while (!isNumber(money));
};
start();




let appData = {
    income: {},
    addIncome: [],             //доп доходы
    expenses: {},
    expenses1: {},
    expenses2: {},               //доп расходы
    addExpenses: [],            //возможные расходы
    deposit: false,
    mission: 50000,
    period: 7,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let question, yourExpenses;
                
                for (let i=0; i < 2; i++){
            
               do{ yourExpenses = prompt('Введите обязательную статью расходов');

                question = +prompt('Во сколько это обойдётся?');}

                while(isNaN(question) || question === '' || question === null);

               
               appData.expenses[yourExpenses] = question;
                
                }
                
                
    },


    getExpensesMonth: function(){

for (let key in appData.expenses){
    
   
        appData.expensesMonth += appData.expenses[key];
  
    }
    return appData.expensesMonth;
},








    getBudget: function(){

        appData.budgetMonth = appData.money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },

    getTargetMonth: function(){

        return appData.mission / appData.budgetMonth;

    },







    getStatusIncome: function(){

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

    }

    
};



appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

//for (let kei1 in appData ){
//    console.log('Наша программа ключает в себя данные: ' + kei1 + appData[kei1]);
//};

console.log(appData.budgetDay);



console.log('expenses:', appData.expenses);


console.log('Период равен:' + ' ' + appData.period + ' ' + 'месяцев');
console.log('Цель заработать:' + ' ' + appData.mission + ' ' + 'рублей');
console.log(appData.addExpenses);




console.log('Обязательные расходы за месяц:' + ' ' + appData.expensesMonth);




if (appData.getTargetMonth()>=0){
    console.log('Цель будет достигнута за:' + ' ' + Math.ceil(appData.getTargetMonth()) + ' ' + 'месяцев/ца');}
else {console.log('Цель не будет достигнута');}

appData.getStatusIncome();


const allBooks = document.querySelector('.books');
const divBooks = document.querySelectorAll('.book');
const books6Ul = document.querySelectorAll('ul')[2];
const books5Ul = document.querySelectorAll('ul')[5];
const books2Ul = document.querySelectorAll('ul')[0];

divBooks[1].after(divBooks[0]);
divBooks[0].after(divBooks[4]);
divBooks[4].after(divBooks[3]);
divBooks[5].after(divBooks[2]);

document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

const adv1 = document.querySelector('.adv');
adv1.remove();

const trueTitle = document.querySelectorAll('a')[2];
trueTitle.innerHTML = 'Книга 3. this и Прототипы Объектов';

const newElement = document.createElement('li');
newElement.innerHTML = 'Глава 8: За пределами ES6';

books6Ul.append(newElement);

const books6Li = books6Ul.querySelectorAll('li');

books6Li[10].after(books6Li[9]);

const books2Li = books2Ul.querySelectorAll('li');
const books5Li = books5Ul.querySelectorAll('li');

books2Li[10].before(books2Li[2]);
books2Li[8].after(books2Li[7]);
books2Li[8].after(books2Li[4]);
books2Li[4].after(books2Li[5]);

books5Li[1].after(books5Li[9]);
books5Li[4].after(books5Li[2]);
books5Li[7].after(books5Li[5]);





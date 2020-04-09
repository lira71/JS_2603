const allBooks = document.querySelector('.books');
const divBooks = document.querySelectorAll('.book');
const books6Ul = document.querySelectorAll('ul')[2];
const books5Ul = document.querySelectorAll('ul')[5];
const books2Ul = document.querySelectorAll('ul')[0];


allBooks.prepend(divBooks[2]);     //6
allBooks.prepend(divBooks[5]);      //5
allBooks.prepend(divBooks[3]);    //4
allBooks.prepend(divBooks[4]);     //3
allBooks.prepend(divBooks[0]);     //2
allBooks.prepend(divBooks[1]);    //1

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

books5Ul.prepend(books5Li[10]);
books5Ul.prepend(books5Li[8]);
books5Ul.prepend(books5Li[5]);
books5Ul.prepend(books5Li[7]);
books5Ul.prepend(books5Li[6]);
books5Ul.prepend(books5Li[2]);
books5Ul.prepend(books5Li[4]);
books5Ul.prepend(books5Li[3]);
books5Ul.prepend(books5Li[9]);
books5Ul.prepend(books5Li[1]);
books5Ul.prepend(books5Li[0]);


books2Ul.prepend(books2Li[10]);
books2Ul.prepend(books2Li[2]);
books2Ul.prepend(books2Li[9]);
books2Ul.prepend(books2Li[7]);
books2Ul.prepend(books2Li[5]);
books2Ul.prepend(books2Li[4]);
books2Ul.prepend(books2Li[8]);
books2Ul.prepend(books2Li[6]);
books2Ul.prepend(books2Li[3]);
books2Ul.prepend(books2Li[0]);
books2Ul.prepend(books2Li[1]);






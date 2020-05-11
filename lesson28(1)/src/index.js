'use strict';
 
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import smoothScroll from './modules/smoothScroll';
import countTimer from './modules/countTimer';
import togglleMenu from './modules/togglleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import commandPhoto from './modules/commandPhoto';
import calculateNumber from './modules/calculateNumber';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

 //плавная прокрутка

 smoothScroll();

 //таймер

 countTimer('19 may 2020');

 //меню

 togglleMenu();

 //popup

 togglePopup();

 //табы

 tabs();

 //слайдеры

 slider();

 //фото команды

 commandPhoto();

 //запрет ввода букв

 calculateNumber();

 //калькулятор

 calc(100);

 //форма обратной связи

 sendForm();
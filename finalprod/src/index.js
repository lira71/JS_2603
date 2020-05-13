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

smoothScroll();

countTimer('25 may 2020');

togglleMenu();

togglePopup();

tabs();

slider();

commandPhoto();

calculateNumber();

calc(100);

sendForm();
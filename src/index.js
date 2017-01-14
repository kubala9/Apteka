import angular from 'angular';

import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-material-icons';
import 'angular-messages';
import 'ngStorage';

import routesConfig from './routes';

import {main} from './app/layout/main';
import {header} from './app/layout/header';
import {menu} from './app/layout/menu';
import {footer} from './app/layout/footer';

import './index.scss';

import {home} from './app/controllers/Home';

import Notyfikacje from './app/services/Notyfikacje';

import {obslugasprzedajacy} from './app/controllers/ObslugaSprzedajacy';
import Sprzedajacy from './app/services/Sprzedajacy';

import {obslugakupujacy} from './app/controllers/ObslugaKupujacy.js';
import Kupujacy from './app/services/Kupujacy';

import {obslugaproduktow} from './app/controllers/ObslugaProduktow.js';
import Produkt from './app/services/Produkt';

import {obslugazamowien} from './app/controllers/ObslugaZamowien.js';

import {obslugasprzedazy} from './app/controllers/ObslugaSprzedazy';
import Sprzedaz from './app/services/Sprzedaz';

angular
  .module('apteka', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'ngStorage'])
  .config(routesConfig)
  .component('apteka', main)
  .component('aptekaHeader', header)
  .component('aptekaMenu', menu)
  .component('aptekaFooter', footer)

    .service('Notyfikacje', Notyfikacje)

    .component('home', home)

    .component('obslugaSprzedajacy', obslugasprzedajacy)
    .service('Sprzedajacy', Sprzedajacy)

   .component('obslugaKupujacy', obslugakupujacy)
   .service('Kupujacy', Kupujacy)

    .component('obslugaProduktow', obslugaproduktow)
    .service('Produkt', Produkt)

    .component('obslugaZamowien', obslugazamowien)

    .component('obslugaSprzedazy', obslugasprzedazy)
    .service('Sprzedaz', Sprzedaz);


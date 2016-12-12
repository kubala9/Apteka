import angular from 'angular';

import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-material-icons';

import routesConfig from './routes';

import {main} from './app/layout/main';
import {header} from './app/layout/header';
import {menu} from './app/layout/menu';
import {footer} from './app/layout/footer';

import './index.scss';

import {home} from './app/controllers/Home';

import {obslugasprzedajacy} from './app/controllers/ObslugaSprzedajacy';
import Sprzedajacy from './app/services/Sprzedajacy';


angular
  .module('apteka', ['ui.router', 'ngMaterial', 'ngMdIcons'])
  .config(routesConfig)
  .component('apteka', main)
  .component('aptekaHeader', header)
  .component('aptekaMenu', menu)
  .component('aptekaFooter', footer)

    .component('home', home)

    .component('obslugaSprzedajacy', obslugasprzedajacy)
    .service('Sprzedajacy', Sprzedajacy);

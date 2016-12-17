export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('apteka', {
      url: '/',
      component: 'apteka',
      redirectTo: 'apteka.home'
    })
    .state('apteka.home', {
        url: 'home',
        component: 'home',
        data: {pageTitle: 'Home'}
    })
    .state('apteka.sprzedajacy', {
      url: 'sprzedający',
      component: 'obslugaSprzedajacy',
      data: {pageTitle: 'Sprzedający'}
    })
    .state('apteka.kupujacy', {
      url: 'kupujący',
      component: 'obslugaKupujacy',
      data: {pageTitle: 'Kupujący'}
    });
}

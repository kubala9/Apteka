export const menu = {
  template: require('./menu.html'),
  controller: ($rootScope, $scope, $state) => {
    "ngInject";

    $scope.currentNavItem = $state.current.name;

    $rootScope.$watch('zalogowany', () => {
      $scope.user = $rootScope.zalogowany;
    }, true);
  }
};

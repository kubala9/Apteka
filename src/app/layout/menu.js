export const menu = {
  template: require('./menu.html'),
  controller: ($scope, $state) => {
    "ngInject";

    $scope.currentNavItem = $state.current.name;
  }
};

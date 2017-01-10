export const header = {
  template: require('./header.html'),
  controller: ($rootScope, $scope) => {
    "ngInject";
    $scope.user = $rootScope.user;
  }
};

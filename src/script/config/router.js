'usr strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('main');

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'view/main.html',
      controller: 'mainCtrl'
    })
    .state('position', {
      url: '/position/:id',
      templateUrl: 'view/position.html',
      controller: 'positionCtrl'
    })
    .state('my', {
      url: '/my',
      templateUrl: 'view/my.html',
      controller: 'myCtrl'
    })
    .state('company', {
      url: '/company/:id',
      templateUrl: 'view/company.html',
      controller: 'companyCtrl'
    });

}]);

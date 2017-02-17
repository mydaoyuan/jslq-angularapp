'use strict';

angular.module('app').directive('navbar', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/navbar.html',
    scope: {
      navbartext: '='
    },
    link: function(scope) {
      scope.back = function() {
        window.history.back();
      }
    }
  }
}]);

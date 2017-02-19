'use strict';

angular.module('app').directive('searchBar', [function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'view/template/searchBar.html'
  }
}])

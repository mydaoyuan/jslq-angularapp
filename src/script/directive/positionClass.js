'use strict';

angular.module('app').directive('positionClass', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionClass.html',
    scope: {
      com: '=',
      isActive: '=',
      initial: '='
    },
    link: function(scope) {
      scope.showpositionlist = function(idx) {
        scope.isActive = idx;
        scope.positionlist = scope.com.positionClass[idx].positionList;
      }

    }
  }
}]);

'use strict';

angular.module('app').directive('appPositionlist', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionList.html',
    scope: {
      mydata: '='
    }
  }
}]);

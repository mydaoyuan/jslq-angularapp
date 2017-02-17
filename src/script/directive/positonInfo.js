'use strict';

angular.module('app').directive('positionInfo', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html',
    scope: {
      isActive: '=',
      isLogin: '=',
      posi: '='
    },
    link: function(scope) {
      scope.imgPath = scope.isActive ? 'image/star2.png' : 'image/star.png';
    }
  }
}]);

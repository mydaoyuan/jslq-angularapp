'use strict';

angular.module('app').directive('picker', [function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'view/template/picker.html',
    scope: {
      list: '=',
      isshow: '=',
      selectpicker: '&'
    },
    link: function(scope) {
      scope.hidesheet = function() {
        scope.isshow = false;
      }
    }
  }
}])

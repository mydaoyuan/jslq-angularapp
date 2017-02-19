'use strict';

angular.module('app').directive('tabbar', [function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'view/template/tabbar.html',
    scope: {
      list: '=',
      tabClick: '&'
    },
    link: function(scope) {
      scope.hclick = function(item) {
        scope.tabid = item.id;
        scope.tabClick(item);
      }
    }
  }
}])

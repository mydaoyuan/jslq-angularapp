'use strict';

angular.module('app').controller('searchCtrl', ['$scope', '$http', 'dict', function($scope, $http, dict) {
  $scope.name = '';
  $scope.search = function() {
    $http.get('data/positionList.json?name='+$scope.name).then(function(data) {
      $scope.lists = data.data;
    }).catch();
  }
  $scope.search();
  $scope.list = [
    {
      id: 'city',
      name: '城市'
    },
    {
      id: 'salary',
      name: '薪资'
    },
    {
      id: 'scale',
      name: '公司规模'
    }
  ]
  var tabid = '';
  $scope.click = function(id,name) {
    tabid = id;
    $scope.sheetlist = dict[id];
    $scope.sheetshow = true;
  }
  $scope.filterObj = {};
  $scope.sClick = function(id, name) {
    if(id) {
      angular.forEach($scope.list, function(item) {
        if(item.id === tabid) {
          item.name = name;
        }
      });
      $scope.filterObj[tabid+'Id'] = id;
    } else {
      delete($scope.filterObj[tabid+'Id']);
      angular.forEach($scope.list, function(item) {
        if(item.id === tabid) {
          switch (item.id) {
            case "city":
              item.name = "城市"
              break;
            case "salary":
              item.name = "薪资"
              break;
            case "scale":
              item.name = "公司规模"
              break;
            default:
          }
        }
      })
    }
  }
}])

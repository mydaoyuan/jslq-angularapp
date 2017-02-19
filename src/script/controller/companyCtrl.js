'use strict';

angular.module('app').controller('companyCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {
  $http.get('data/company.json?'+$state.params.id).then(function(data) {
    $scope.company = data.data;
    $scope.positionlist = $scope.company.positionClass[0].positionList;
  }).catch(function(err) {

  })
  $scope.name = 'hha'
}])

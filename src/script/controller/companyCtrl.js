'use strict';

angular.module('app').controller('companyCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {
  $http.get('data/company.json?'+$state.params.id).then(function(data) {
    $scope.company = data.data;
  }).catch(function(err) {

  })

  $timeout( function (){
    $scope.positionlist = $scope.company.positionClass[0].positionList;
  } , 0 , false);
}])

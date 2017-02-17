'use strict';

angular.module('app').controller('positionCtrl', ['$q', '$scope', '$http', '$state', function($q, $scope, $http, $state) {
  function getPosition() {
    var def = $q.defer();
    $http.get('data/position.json?'+$state.params.id).then(function(data) {
      $scope.position = data.data;
      def.resolve(data.data);
    }).catch(function(err) {
      def.reject(err);
    });

    return def.promise;
  }

  getPosition().then(function(obj) {
    $http.get('data/company.json?'+obj.id).then(function(data) {
      $scope.company = data.data;
    }).catch(function(err) {

    })
  })
}])

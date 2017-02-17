'use strict';

angular.module('app', ['ui.router']);

'usr strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  }).state('position', {
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
  }).state('company', {
    url: '/company/:id',
    templateUrl: 'view/company.html',
    controller: 'companyCtrl'
  });

  $urlRouterProvider.otherwise('main');
}]);

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

'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/positionList.json').then(function(data) {
    $scope.lists = data.data;
  }).catch();
}])

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

'use strict';

angular.module('app').directive('company', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/company.html',
    scope: {
      com: '='
    }
  }
}]);

'use strict';

angular.module('app').directive('appFoot', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}])

'use strict';

angular.module('app').directive('appHead', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html'
  }
}]);

'use strict';

angular.module('app').directive('navbar', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/navbar.html',
    scope: {
      navbartext: '='
    },
    link: function(scope) {
      scope.back = function() {
        window.history.back();
      }
    }
  }
}]);

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

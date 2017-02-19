'use strict';

angular.module('app', ['ui.router']);

angular.module('app').value('dict', {}).run(['$http', 'dict', function($http, dict) {
  $http.get('data/city.json').then(function(data) {
    dict.city = data.data;
  })
  $http.get('data/salary.json').then(function(data) {
    dict.salary = data.data;
  })
  $http.get('data/scale.json').then(function(data) {
    dict.scale = data.data;
  })
}])

'usr strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('main');

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'view/main.html',
      controller: 'mainCtrl'
    })
    .state('position', {
      url: '/position/:id',
      templateUrl: 'view/position.html',
      controller: 'positionCtrl'
    })
    .state('my', {
      url: '/my',
      templateUrl: 'view/my.html',
      controller: 'myCtrl'
    })
    .state('company', {
      url: '/company/:id',
      templateUrl: 'view/company.html',
      controller: 'companyCtrl'
    });

}]);

'use strict';

angular.module('app').controller('companyCtrl', ['$scope', '$http', '$state', '$timeout', function($scope, $http, $state, $timeout) {
  $http.get('data/company.json?'+$state.params.id).then(function(data) {
    $scope.company = data.data;
    $scope.positionlist = $scope.company.positionClass[0].positionList;
  }).catch(function(err) {

  })
  $scope.name = 'hha'
}])

'use strict';

angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/positionList.json').then(function(data) {
    $scope.lists = data.data;
  }).catch();
}])

angular
  .module('app')
  .controller('myCtrl', function($scope, $interval) {
    $scope.user = {
      name: '唐道远',
      value: 'heihei',
      header: ''
    }
    // 图片文件储存数组
    $scope.imgdata = {
      data: ''
    };
})

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

angular
  .module('app')
  .directive('fileModal', ['readPohotFile', function(readPohotFile) {
    return {
      restrict: 'A',
      scope: {
        imgdata: '='
      },
      link: function(scope, element, attrs) {
        element.bind('change', function(e) {
          var file = (e.srcElement || e.target).files[0];
          readPohotFile.readAsDataUrl(file, scope)
            .then(function(data) {
              scope.imgdata.header = data;
            })
        })
      }
    }
  }])

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

'use strict';

angular.module('app').directive('positionClass', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionClass.html',
    scope: {
      com: '=',
      isActive: '=',
      initial: '=',
      posi: '='
    },
    link: function(scope) {
      scope.showpositionlist = function(idx) {
        scope.isActive = idx;
        scope.posi = scope.com.positionClass[idx].positionList;
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
      mydata: '=',
      filterObj: '='
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

'use strict';

angular.module('app').directive('searchBar', [function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'view/template/searchBar.html'
  }
}])

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

angular
  .module('app')
  .factory('readPohotFile',["$q", function($q) {
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL  
    };
}]);

angular.module('app').filter('filterByObj', [function() {
  return function(list, obj) {
    var result = [];
    angular.forEach(list, function(item) {
      var isEqual = true;
      for(var e in obj) {
        if(item[e] !== obj[e]) {
          isEqual = false;
        }
      }
      if(isEqual) {
        result.push(item);
      }
    })
    return result;
  }
}])

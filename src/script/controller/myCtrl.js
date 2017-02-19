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

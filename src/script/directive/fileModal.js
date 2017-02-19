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

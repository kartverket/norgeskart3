angular.module('mapLayout')
  .controller('mapLayoutController', ['$scope', 
    function ($scope) {
      $scope.disableEmbed = function () {
        var URL = location.href.replace(/[\?|\&]type\=[0-9]+/, '');
        window.open(URL, '_blank');
      };
    }
  ]);

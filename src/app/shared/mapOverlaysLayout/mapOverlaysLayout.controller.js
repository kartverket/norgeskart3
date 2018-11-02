angular.module('mapOverlaysLayout')
  .controller('mapOverlaysLayoutController', ['$scope', 'mapOverlaysLayoutFactory', '$location',
    function ($scope, mapOverlaysLayoutFactory, $location) {

      $scope.showSearchOverlay = function () {
        return mapOverlaysLayoutFactory.getShowSearchOverlay();
      };

      $scope.isGeolocationDisabled = 'geolocation' in navigator === false || location.protocol !== 'https:';

      $scope.isModal = "modal" in $location.search() === true;

      $scope.getGeolocation = function () {
        navigator.geolocation.getCurrentPosition(mapOverlaysLayoutFactory.currentPosition);
      };

    }
  ]);

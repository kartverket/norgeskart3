angular.module('mapOverlaysLayout')
    .controller('mapOverlaysLayoutController', ['$scope', 'mapOverlaysLayoutFactory',
        function($scope, mapOverlaysLayoutFactory){

            $scope.showSearchOverlay = function () {
                return mapOverlaysLayoutFactory.getShowSearchOverlay();
            };

            $scope.isGeolocationDisabled = 'geolocation' in navigator === false || location.protocol !== 'https:' ? true : false;

            $scope.getGeolocation = function () {
              navigator.geolocation.getCurrentPosition(mapOverlaysLayoutFactory.currentPosition);
            };

        }
    ]);
angular.module('mapOverlaysLayout')
    .controller('mapOverlaysLayoutController', ['$scope', 'mapOverlaysLayoutFactory',
        function($scope, mapOverlaysLayoutFactory){

            $scope.showSearchOverlay = function () {
                return mapOverlaysLayoutFactory.getShowSearchOverlay();
            };

        }
    ]);
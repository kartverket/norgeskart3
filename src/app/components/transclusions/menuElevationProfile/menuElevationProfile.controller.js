angular.module('menuElevationProfile')
    .controller('menuElevationProfileController', [ '$scope',
        function($scope) {
            $scope.showElevationProfilePage1 = function () {
                $scope.menuElevationProfileLayout = 'page1';
            };
            $scope.showElevationProfilePage2 = function () {
                $scope.menuElevationProfileLayout = 'page2';
            };

            $scope.menuElevationProfileLayout = 'page1';




        }
    ]);
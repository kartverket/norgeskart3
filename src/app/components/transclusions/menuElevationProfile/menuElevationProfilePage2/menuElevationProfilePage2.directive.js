angular.module('menuElevationProfilePage2')
    .directive('menuElevationProfilePage2', [
        function() {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfilePage2/menuElevationProfilePage2.html',
                restrict: 'A',
                controller: 'menuElevationProfilePage2Controller',
                link: function () {
                    // scope.viewElevationProfile = function () {
                    //     scope.elevationImage = toolsElevationProfileFactory.getElevationImage();
                    // };
                }
            };
        }]
    );


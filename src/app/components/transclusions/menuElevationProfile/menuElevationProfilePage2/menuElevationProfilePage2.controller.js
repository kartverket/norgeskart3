angular.module('menuElevationProfilePage2')
    .controller('menuElevationProfilePage2Controller', [ '$scope','toolsElevationProfileFactory',
        function(scope, toolsElevationProfileFactory) {
            scope.viewElevationProfile = function () {
                scope.elevationImage = toolsElevationProfileFactory.getElevationImage();


            };

            // scope.getElevationImage = function () {
            //   return scope.elevationImage;
            // };

        }
    ]);
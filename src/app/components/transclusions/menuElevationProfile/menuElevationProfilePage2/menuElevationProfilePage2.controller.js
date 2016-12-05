angular.module('menuElevationProfilePage2')
    .controller('menuElevationProfilePage2Controller', [ '$scope','toolsElevationProfileFactory',
        function(scope, toolsElevationProfileFactory) {
            scope.viewElevationProfile = function () {
                scope.elevationImage = toolsElevationProfileFactory.getElevationImage();
            };

            scope.getElevationImage = function () {
              return scope.elevationImage;
            };

            scope.showImage = function () {
                $.featherlight(scope.elevationImage);
            };

            scope.downloadImage = function () {
                // window.open(scope.elevationImage);
                var a = document.createElement('a');
                a.href = scope.elevationImage;
                a.download = scope.elevationImage;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

        }
    ]);
angular.module('menuElevationProfile')
    .controller('menuElevationProfileController', [ '$scope', 'toolsElevationProfileFactory',
        function(scope, toolsElevationProfileFactory) {
            scope.allowGeneratingElevationProfile=false;
            scope.elevationProfileActive = false;
            scope.gpx = false;
            scope.imageExists = false;

            scope.setAllowGeneratingElevationProfile = function (value) {
                scope.allowGeneratingElevationProfile=value;
            };

            scope.setElevationProfileActive = function (value) {
                scope.elevationProfileActive = value;
            };

            scope.setImageExits = function (value) {
                scope.imageExists=value;
            };

            scope.updateGpx = function (gpx) {
                scope.gpx=gpx;
            };

            scope.calculateElevationProfile = function () {
                if (scope.gpx) {
                    document.getElementById("spinner2").style.backgroundColor = "rgba(0,0,0,0.4)";
                    document.getElementById("spinner2").style.transition = "0.8s";
                    scope.showSpinner = true;
                    toolsElevationProfileFactory.generateElevationProfile(scope.gpx).then(
                        function () {
                            document.getElementById("spinner2").style.backgroundColor = "transparent";
                            document.getElementById("spinner2").style.transition = "0.8s";
                            scope.showSpinner = false;
                            scope.imageExists=true;
                            scope.showElevationProfilePage2();
                        });
                }
                scope.elevationProfileActive = false;
            };

        }
    ]);
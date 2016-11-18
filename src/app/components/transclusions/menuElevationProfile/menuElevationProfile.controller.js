angular.module('menuElevationProfile')
    .controller('menuElevationProfileController', [ '$scope', 'toolsElevationProfileFactory',
        function(scope, toolsElevationProfileFactory) {
            scope.showElevationProfilePage1 = function () {
                scope.menuElevationProfileLayout = 'page1';
            };
            scope.showElevationProfilePage2 = function () {
                scope.menuElevationProfileLayout = 'page2';
            };

            scope.menuElevationProfileLayout = 'page1';
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
                if(!scope.allowGeneratingElevationProfile && scope.imageExists ){
                    scope.showElevationProfilePage2();
                    return;
                }
                if (scope.fileread) {
                    scope.gpx = scope.fileread;
                }
                if (scope.gpx) {
                    toolsElevationProfileFactory.generateElevationProfile(scope.gpx).then(
                        function () {
                            scope.imageExists=true;
                            scope.showElevationProfilePage2();
                        });
                }
                scope.elevationProfileActive = false;
            };

        }
    ]);
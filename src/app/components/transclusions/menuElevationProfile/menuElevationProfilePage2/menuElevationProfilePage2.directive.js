angular.module('menuElevationProfilePage2')
    .directive('menuElevationProfilePage2', [ 'toolsElevationProfileFactory',
        function(toolsElevationProfileFactory) {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfilePage2/menuElevationProfilePage2.html',
                restrict: 'A',
                link: function (scope) {
                    scope.viewElevationProfile = function () {
                        scope.elevationImage = toolsElevationProfileFactory.getElevationImage();
                    };

                    scope.viewElevationProfile();
                }
            };
        }]
    );


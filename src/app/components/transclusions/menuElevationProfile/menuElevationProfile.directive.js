angular.module('menuElevationProfile')
    .directive('menuElevationProfile', [
        function() {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfile.html',
                restrict: 'A',
                controller: 'menuElevationProfileController',
                link: function () {
                }
            };
        }]);
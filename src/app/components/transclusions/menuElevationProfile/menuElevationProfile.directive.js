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
        }])
    .directive("fileread", [function () {
    return {
        link: function (scope, element) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        scope.setAllowGeneratingElevationProfile(true);
                    });
                };
                var file=changeEvent.target.files[0];
                reader.readAsText(file);
            });
        }
    };
}]);

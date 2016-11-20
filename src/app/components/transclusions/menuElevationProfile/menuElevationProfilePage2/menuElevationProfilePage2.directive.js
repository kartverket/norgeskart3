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
                    // $( document ).ready(function() {
                    //
                    //     var imageString = "url('" + scope.elevationImage + "')";
                    //
                    //     var elementImage = document.getElementById("elevationImage");
                    //     elementImage.style.backgroundImage = imageString;
                    //     // $('elevationImage').css('background-image', 'url(' + scope.elevationImage + ')');
                    // });
                }
            };
        }]
    );


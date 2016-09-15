angular.module('mapOverlays')
    .directive('mapOverlays', [
        function() {
            return {
                templateUrl: 'components/overlays/mapOverlays/mapOverlays.html',
                controller: "mapOverlaysController",
                restrict: 'A',
                link: function(){

                }
            };
        }]);
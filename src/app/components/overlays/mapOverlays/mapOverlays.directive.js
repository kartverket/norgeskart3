angular.module('mapOverlays')
    .directive('mapOverlays', [
        function() {
            return {
                templateUrl: 'components/overlays/mapOverlays/mapOverlays.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
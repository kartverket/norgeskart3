angular.module('mapOverlays')
    .directive('mapOverlays', [
        function() {
            return {
                templateUrl: 'components/overlays/mapOverlays/mapOverlays.html',
                transclude: true,
                restrict: 'A',
                link: function(){

                }
            };
        }]);
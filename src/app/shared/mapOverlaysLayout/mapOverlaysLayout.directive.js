angular.module('mapOverlaysLayout')
    .directive('mapOverlaysLayout', [
        function() {
            return {
                templateUrl: 'shared/mapOverlaysLayout/mapOverlaysLayout.html',
                restrict: 'A',
                controller: 'mapOverlaysLayoutController',
                link: function(){

                }
            };
        }]);
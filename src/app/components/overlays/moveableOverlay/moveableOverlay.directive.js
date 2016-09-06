angular.module('moveableOverlay')
    .directive('moveableOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/moveableOverlay/moveableOverlay.html',
                transclude: true,
                restrict: 'A',
                link: function(){

                }
            };
        }]);
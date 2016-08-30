angular.module('mainMenuOverlay')
    .directive('mainMenuOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/mainMenuOverlay/mainMenuOverlay.html',
                transclude: true,
                restrict: 'A',
                link: function(){

                }
            };
        }]);
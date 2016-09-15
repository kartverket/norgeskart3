angular.module('mainMenuOverlay')
    .directive('mainMenuOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/mainMenuOverlay/mainMenuOverlay.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
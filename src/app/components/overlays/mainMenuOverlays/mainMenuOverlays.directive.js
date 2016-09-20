angular.module('mainMenuOverlays')
    .directive('mainMenuOverlays', [
        function() {
            return {
                templateUrl: 'components/overlays/mainMenuOverlays/mainMenuOverlays.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
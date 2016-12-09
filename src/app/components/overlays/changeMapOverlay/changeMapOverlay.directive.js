angular.module('changeMapOverlay')
    .directive('changeMapOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/changeMapOverlay/changeMapOverlay.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
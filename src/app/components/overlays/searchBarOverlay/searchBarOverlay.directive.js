angular.module('searchBarOverlay')
    .directive('searchBarOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/searchBarOverlay/searchBarOverlay.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
angular.module('searchBarOverlay')
    .directive('searchBarOverlay', [
        function() {
            return {
                templateUrl: 'components/overlays/searchBarOverlay/searchBarOverlay.html',
                transclude: true,
                restrict: 'A',
                link: function(){

                }
            };
        }]);
angular.module('menuShareMap')
    .directive('menuShareMap', [
        function() {
            return {
                templateUrl: 'components/transclusions/menuShareMap/menuShareMap.html',
                restrict: 'A',
                controller: 'menuShareMapController',
                link: function(){

                }
            };
        }]);
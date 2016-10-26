angular.module('mainMenuShareMap')
    .directive('mainMenuShareMap', [
        function() {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuShareMap/mainMenuShareMap.html',
                restrict: 'A',
                controller: 'mainMenuShareMapController',
                link: function(){}
            };
        }]);
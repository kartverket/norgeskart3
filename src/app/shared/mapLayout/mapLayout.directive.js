angular.module('mapLayout')
    .directive('mapLayout', [
        function() {
            return {
                templateUrl: 'shared/mapLayout/mapLayout.html',
                restrict: 'A',
                controller: 'mapLayoutController',
                link: function(){

                }
            };
        }]);
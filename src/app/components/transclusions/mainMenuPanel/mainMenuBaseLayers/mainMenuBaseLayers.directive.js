angular.module('mainMenuBaseLayers')
    .directive('mainMenuBaseLayers', ['ISY.MapAPI.Map',
        function(map) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuBaseLayers/mainMenuBaseLayers.html',
                restrict: 'A',
                link: function(scope){

                    scope.baseLayers = map.GetBaseLayers();


                }
            };
        }]);
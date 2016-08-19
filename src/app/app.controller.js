angular.module('mapApp')
    .controller('mapAppController', ['$scope','ISY.MapAPI.Map','mapAppFactory',
        function($scope, map, mapAppFactory){

            $scope.initMapPage = function () {
                var mapConfig = mapAppFactory.getMapConfig();
                map.Init('mapDiv', mapConfig);
            };


        }
    ]);
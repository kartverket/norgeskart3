angular.module('mainApp')
    .controller('mainAppController', ['$scope','ISY.MapAPI.Map','mainAppFactory',
        function($scope, map, mainAppFactory){

            $scope.initMainPage = function () {
                mainAppFactory.updateMapConfig();
                var mapConfig = mainAppFactory.getMapConfig();
                map.Init('mapDiv', mapConfig);
            };


        }
    ]);
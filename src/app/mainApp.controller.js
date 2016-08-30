angular.module('mainApp')
    .controller('mainAppController', ['$scope','ISY.MapAPI.Map','mainAppFactory','mapToolsFactory','ISY.EventHandler',
        function($scope, map, mainAppFactory, mapToolsFactory, eventHandler){

            function _initToolbar() {
                mapToolsFactory.initToolbar();
            }

            function _registerEvents(){
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapConfigLoaded, _initToolbar);
            }

            $scope.initMainPage = function () {
                _registerEvents();
                mainAppFactory.updateMapConfig();
                var mapConfig = mainAppFactory.getMapConfig();
                map.Init('mapDiv', mapConfig);

            };




        }
    ]);
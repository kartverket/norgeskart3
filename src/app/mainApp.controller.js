angular.module('mainApp')
    .controller('mainAppController', ['$scope','ISY.MapAPI.Map','mainAppFactory','mapToolsFactory','ISY.EventHandler','$timeout',
        function($scope, map, mainAppFactory, mapToolsFactory, eventHandler, $timeout){

            function _initToolbar() {
                mapToolsFactory.initToolbar();
            }

            function _registerEvents(){
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapConfigLoaded, _initToolbar);
            }

            $scope.initMainPage = function () {
                _registerEvents();
                mainAppFactory.updateMapConfig();
                $timeout(function() {
                    var mapConfig = mainAppFactory.getMapConfig();
                    map.Init('mapDiv', mapConfig);
                },1000);
            };




        }
    ]);
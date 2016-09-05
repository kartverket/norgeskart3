angular.module('mainApp')
    .controller('mainAppController', ['$scope','ISY.MapAPI.Map','mainAppFactory','toolsFactory','ISY.EventHandler','$timeout','isyTranslateFactory',
        function($scope, map, mainAppFactory, toolsFactory, eventHandler, $timeout, isyTranslateFactory){

            function _initToolbar() {
                toolsFactory.initToolbar();
            }

            function _registerEvents(){
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapConfigLoaded, _initToolbar);
            }

            $scope.initMainPage = function () {
                _registerEvents();
                map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
                mainAppFactory.updateMapConfig();
                $timeout(function() {
                    var mapConfig = mainAppFactory.getMapConfig();
                    map.Init('mapDiv', mapConfig);
                },1000);
            };




        }
    ]);
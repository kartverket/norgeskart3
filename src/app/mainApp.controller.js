angular.module('mainApp')
    .controller('mainAppController', ['$scope','ISY.MapAPI.Map','mainAppFactory','toolsFactory','ISY.EventHandler','isyTranslateFactory','$location','mainMenuPanelFactory',
        function($scope, map, mainAppFactory, toolsFactory, eventHandler, isyTranslateFactory, $location, mainMenuPanelFactory){

            function _initToolbar() {
                toolsFactory.initToolbar();
            }

            var _setSearch = function (obj) {
                if (!angular.equals(obj, $location.search())) {
                    var newSearch = angular.extend($location.search(), obj);
                    $location.search(newSearch);
                    mainMenuPanelFactory.setProjectById($location.search().project);
                }
            };

            function _viewChanged(obj) {
                // $scope.$apply(function () {
                    _setSearch(obj);
                // }, 0);

            }

            function _registerEvents(){
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapConfigLoaded, _initToolbar);
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapMoveend, _viewChanged);
                eventHandler.RegisterEvent(ISY.Events.EventTypes.ChangeLayers, _viewChanged);
            }

            $scope.initMainPage = function () {
                _registerEvents();
                map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
                map.SetImageInfoMarker("assets/img/pin-md-orange.png");
                mainAppFactory.updateMapConfig();
                var mapConfig = mainAppFactory.getMapConfig();
                map.Init('mapDiv', mapConfig);
            };


        }
    ]);
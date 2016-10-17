angular.module('mainApp')
    .controller('mainAppController', ['$scope','ISY.MapAPI.Map','mainAppFactory','toolsFactory','ISY.EventHandler','isyTranslateFactory','$location','mainMenuPanelFactory', 'localStorageFactory','$translate','$timeout',
        function($scope, map, mainAppFactory, toolsFactory, eventHandler, isyTranslateFactory, $location, mainMenuPanelFactory, localStorageFactory, $translate, $timeout){

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
                localStorageFactory.set("lat", $location.search().lat);
                localStorageFactory.set("lon", $location.search().lon);
                localStorageFactory.set("zoom", $location.search().zoom);
                $timeout(function() {
                    $scope.$apply(function () {
                        _setSearch(obj);
                    }, 0);
                },10);
            }

            function _loadingLayerEnd(obj) {
                localStorageFactory.set("lat", $location.search().lat);
                localStorageFactory.set("lon", $location.search().lon);
                localStorageFactory.set("zoom", $location.search().zoom);
                $timeout(function() {
                    $scope.$apply(function () {
                        _setSearch(obj);
                    },0);
                },5);
            }

            function _registerEvents(){
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapConfigLoaded, _initToolbar);
                eventHandler.RegisterEvent(ISY.Events.EventTypes.MapMoveend, _viewChanged);
                eventHandler.RegisterEvent(ISY.Events.EventTypes.ChangeLayers, _loadingLayerEnd);
            }

            function _initUrl() {
                var obj = $location.search();
                if (obj.zoom !== undefined && obj.lat !== undefined && obj.lon !== undefined){
                    if (localStorageFactory.get("zoom") !== null && localStorageFactory.get("lat") !== null && localStorageFactory.get("lon") !== null){
                        var center = {
                            "lon": localStorageFactory.get("lon"),
                            "lat": localStorageFactory.get("lat"),
                            "zoom": localStorageFactory.get("zoom")
                        };
                        map.SetCenter(center);
                    }
                }

                if (obj.layers !== undefined){
                    mainAppFactory.setInitLayersInUrl(obj.layers);
                }
                var newSearch = angular.extend($location.search(), obj);
                $location.search(newSearch);
            }

            $scope.initMapLayout = function(){
                _initActiveLanguage();
                var obj = $location.search();
                if (obj.type !== undefined){
                    if (obj.type === "1"){
                        $scope.showMapLayout();
                        return;
                    }
                }
                $scope.showMapOverlaysLayout();
            };

            function _initActiveLanguage() {
                var langId = localStorageFactory.get("activeLanguage");
                if (langId !== null){
                    isyTranslateFactory.setCurrentLanguage(langId);
                    map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
                    $translate.use(langId);
                }
            }

            function _initMapLayers() {
                var mapLayers = mainAppFactory.getInitLayersInUrl();
                if (mapLayers !== undefined){
                    var layers = mapLayers.split(",");
                    var overlayLayers = map.GetOverlayLayers();
                    var baseLayers = map.GetBaseLayers();
                    for (var i = 0; i < layers.length; i++){
                        for (var j = 0; j < overlayLayers.length; j++){
                            if (parseInt(layers[i], 10) === overlayLayers[j].id){
                                overlayLayers[j].isVisible = true;
                                map.ShowLayer(overlayLayers[j]);
                            }
                        }
                        for (var m = 0; m < baseLayers.length; m++){
                            if (parseInt(layers[i], 10) === baseLayers[m].id){
                                map.SetBaseLayer(baseLayers[m]);
                            }
                        }
                    }
                }
            }

            $scope.initMainPage = function () {
                _registerEvents();
                map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
                map.SetImageInfoMarker("assets/img/pin-md-orange.png");
                mainAppFactory.updateMapConfig();
                var mapConfig = mainAppFactory.getMapConfig();
                map.Init('mapDiv', mapConfig);
                _initUrl();
                _initMapLayers();
            };

            $( document ).ready(function() {
                $scope.initMainPage();
            });

            $scope.showMapLayout = function () {
                $scope.mapTypeLayout = "mapLayout";
            };

            $scope.showMapOverlaysLayout = function () {
                $scope.mapTypeLayout = "mapOverlaysLayout";
            };

            $scope.mapTypeLayout = "mapOverlaysLayout";

        }
    ]);
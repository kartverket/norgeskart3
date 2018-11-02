angular.module('mainApp')
  .controller('mainAppController', [
    '$scope',
    'ISY.MapAPI.Map',
    'mainAppFactory',
    'toolsFactory',
    'ISY.EventHandler',
    'isyTranslateFactory',
    '$location',
    'mainMenuPanelFactory',
    'localStorageFactory',
    '$translate',
    '$timeout',
    '$window',
    function ($scope, map, mainAppFactory, toolsFactory, eventHandler, isyTranslateFactory, $location, mainMenuPanelFactory, localStorageFactory, $translate, $timeout, $window) {
      
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
        $timeout(function () {
          $scope.$apply(function () {
            _setSearch(obj);
          }, 0);
        }, 10);
      }

      function _loadingLayerEnd(obj) {
        localStorageFactory.set("lat", $location.search().lat);
        localStorageFactory.set("lon", $location.search().lon);
        localStorageFactory.set("zoom", $location.search().zoom);
        $timeout(function () {
          $scope.$apply(function () {
            _setSearch(obj);
          }, 0);
        }, 5);
      }

      function _registerEvents() {
        eventHandler.RegisterEvent(ISY.Events.EventTypes.MapConfigLoaded, _initToolbar);
        eventHandler.RegisterEvent(ISY.Events.EventTypes.MapMoveend, _viewChanged);
        eventHandler.RegisterEvent(ISY.Events.EventTypes.ChangeLayers, _loadingLayerEnd);
      }

      $scope.resetMainAppFactory = function() {
        mainAppFactory.resetMainAppFactory();
      };

      $scope.reInitMap = function() {
        mainAppFactory.updateMapConfig();
        var mapConfig = mainAppFactory.getMapConfig();
        map.ReInit(mapConfig);
        _initUrl();
        _initMapLayers();
        
        $scope.$broadcast('initDraw');
        $scope.$broadcast('initBaseLayers');
        $scope.deactivateDrawFeatureTool($scope.GeoJSON);
      };

      function _initUrl() {
        var obj = $location.search();
        if (obj.zoom !== undefined && obj.lat !== undefined && obj.lon !== undefined) {
          if (localStorageFactory.get("zoom") !== null && localStorageFactory.get("lat") !== null && localStorageFactory.get("lon") !== null) {
            var center = {
              lon: localStorageFactory.get("lon"),
              lat: localStorageFactory.get("lat"),
              zoom: localStorageFactory.get("zoom")
            };
            if (((center.lon > 32.88) && (center.lat > -16.1)) && ((center.lon < 84.17) && (center.lat < 39.65))) {
              var tmp = center.lon;
              center.lon = center.lat;
              center.lat = tmp;
              center.epsg = 'EPSG:4258';
            }
            map.SetCenter(center);
          }
        }

        if (obj.layers !== undefined) {
          mainAppFactory.setInitLayersInUrl(obj.layers);
        }
        var newSearch = angular.extend($location.search(), obj);
        $location.search(newSearch);
      }

      $scope.initMapLayout = function () {
        _initActiveLanguage();
        var obj = $location.search();
        var hash = $location.hash().split('/');
        if (hash.length >= 3) {
          obj.zoom = hash[0];
          obj.lon = hash[1];
          obj.lat = hash[2];
          for (index = 3; index < hash.length; index += 1) {
            switch (hash[index].charAt(0)) {
              /*
              case '+':
                // AddLayer named
                showLayerNamed(extra.slice(1), layerIndex);
                layerIndex += 1;
                break;
              case '-':
                hideLayerNamed(extra.slice(1));
                break;
              case '*':
                var lid = extra.slice(1);
                if (lid.length) {
                  makeLayerAvailable(lid);
                } else {
                  //NK.compactMode = true;
                  NK.compactMode = false;
                }
                break;
              case '!':
                highlight(extra);
                break;
              case 'o':
                setOpacity(extra.slice(1));
                break;
              case 'm':
                setTimeout(
                  (function (boundParameters, boundCounter) {
                    return function () {
                      NK.functions.addLabeledMarker(boundParameters, boundCounter);
                    };
                  }(parms.slice(index + 1, index + 4), ++labeledMarkerCount)),
                  500
                );
                index += 3;
                break;
*/
              case 'l':
                obj.drawing = hash[index + 2];
                index += 2;
                break;
                /*
              case 'd':
                NK.functions.setDataLayer(parms.slice(index + 1, index + 3))
                index += 2;
                break;
                */
            }
          }
          $location.url($location.$$url.replace('#' + encodeURIComponent($location.hash()), ''));
          $location.search(obj);
        }
        if (obj.type !== undefined) {
          if (obj.type === "1") {
            $scope.showMapLayout();
            return;
          }
        }
        mainAppFactory.projectName();
        $scope.showMapOverlaysLayout();
      };

      function _initActiveLanguage() {
        var langId = localStorageFactory.get("activeLanguage");
        if (langId !== null) {
          isyTranslateFactory.setCurrentLanguage(langId);
          map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
          $translate.use(langId);
        }
      }

      function _initMapLayers() {
        var mapLayers = mainAppFactory.getInitLayersInUrl();
        if (mapLayers !== undefined) {
          var layers = mapLayers.split(",");
          var overlayLayers = map.GetOverlayLayers();
          var baseLayers = map.GetBaseLayers();
          for (var i = 0; i < layers.length; i++) {
            for (var j = 0; j < overlayLayers.length; j++) {
              if (parseInt(layers[i], 10) === overlayLayers[j].id) {
                overlayLayers[j].isVisible = true;
                map.ShowLayer(overlayLayers[j]);
              }
            }
            for (var m = 0; m < baseLayers.length; m++) {
              if (parseInt(layers[i], 10) === baseLayers[m].id) {
                map.SetBaseLayer(baseLayers[m]);
              }
            }
          }
        }
      }

      function _showMapMarker() {
        var parameters = $location.search();
        var marker = parameters['marker_lon'] && parameters['marker_lat'] ? [parameters['marker_lon'], parameters['marker_lat']] : undefined;
        if (marker) {
          map.ShowInfoMarker(marker);
        }
      }

      $scope.initMainPage = function () {
        _registerEvents();
        map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
        map.SetImageInfoMarker("assets/img/pin-md-orange.png");
        mainAppFactory.updateMapConfig();
        var mapConfig = mainAppFactory.getMapConfig();
        map.Init('mapDiv', mapConfig);
        map.AddZoom();
        map.AddScaleLine();
        _initUrl();
        _initMapLayers();
        _showMapMarker();
      };

      angular.element(document).ready(function () {
        $scope.initMainPage();
        $scope.deactivateDrawFeatureTool();
      });

      $scope.showMapLayout = function () {
        $scope.mapTypeLayout = "mapLayout";
      };

      $scope.showMapOverlaysLayout = function () {
        $scope.mapTypeLayout = "mapOverlaysLayout";
      };

      $scope.mapTypeLayout = "mapOverlaysLayout";

      $scope.isDrawActivated = function () {
        if ($scope.drawActivated) {
          return true;
        } else {
          $scope.drawActivated = true;
          return false;
        }
      };

      $scope.setGeoJSON = function (GeoJSON) {
        $scope.GeoJSON = GeoJSON;
      };

      $scope.drawActivated = false;

      $scope.initDrawFeatureTool = function () {
        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
        toolsFactory.activateTool(drawFeatureTool);
      };

      $scope.deactivateDrawFeatureTool = function () {
        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
        toolsFactory.deactivateTool(drawFeatureTool);
        $scope.drawActivated = false;
      };

      $scope.deactivateAddLayerFeatureTool = function () {
        var addLayerFeature = toolsFactory.getToolById("AddLayerFeature");
        toolsFactory.deactivateTool(addLayerFeature);
      };

      $scope.openNav = function () {
        var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
        if (isMobile.matches) {
          document.getElementById("mySidenav").style.width = "320px";
          document.getElementById("sideMenuPosition").style.width = "320px";
        } else {
          document.getElementById("mySidenav").style.width = "395px";
          document.getElementById("sideMenuPosition").style.width = "395px";
        }
        // document.getElementById("mySidenav").style.width = "395px";
        document.getElementById("mySidenav").style.overflowY = "auto";

        // document.getElementById("sideMenuPosition").style.width = "395px";
        mainAppFactory.setMainMenuStatus(true);
        localStorageFactory.set("mainMenuIsOpen", true);
      };

      $scope.closeNav = function () {
        if (document.getElementById("mySidenav") && document.getElementById("main")) {
          document.getElementById("mySidenav").style.width = "0";
          $timeout(function () {
            document.getElementById("sideMenuPosition").style.width = "0";
          }, 400);

          document.getElementById("mySidenav").style.overflowY = "hidden";

          localStorageFactory.set("mainMenuIsOpen", false);
          mainAppFactory.setMainMenuStatus(false);
        }
      };

      // $scope.openBaseMapNav = function () {
      //     var lengthDeselectBaseMaps = changeBaseMapPanelFactory.lengthDeselectBaseMaps();
      //     if (lengthDeselectBaseMaps === 3){
      //         document.getElementById('mySideBaseMapNav').style.minWidth="214px";
      //         document.getElementById("sideBasMapPosition").style.minWidth = "214px";
      //     }else{
      //         document.getElementById('mySideBaseMapNav').style.minWidth="146px";
      //         document.getElementById("sideBasMapPosition").style.minWidth = "146px";
      //     }
      //
      //
      //
      // };
      //
      // $scope.closeBaseMapNav = function () {
      //     document.getElementById('mySideBaseMapNav').style.minWidth="0";
      //     $timeout(function () {
      //         document.getElementById("sideBasMapPosition").style.minWidth = "0";
      //     }, 400);
      //
      // };

    }
  ]);

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

      function _initUrl() {
        var obj = $location.search();
        if (obj.zoom !== undefined && obj.lat !== undefined && obj.lon !== undefined) {
          if (localStorageFactory.get("zoom") !== null && localStorageFactory.get("lat") !== null && localStorageFactory.get("lon") !== null) {
            var center = {
              lon: parseFloat(localStorageFactory.get("lon")),
              lat: parseFloat(localStorageFactory.get("lat")),
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
        if (obj.geojson !== undefined) {
          localStorageFactory.set("geojson", obj.geojson);
        }
        if (obj.sosi !== undefined) {
          console.warn(obj.sosi);
          //addSOSILayer(url, true);
        }
        if (obj.bbox !== undefined) {
          console.warn(obj.bbox);
          //addBboxLayer(url);
        }
        if (obj.wms !== undefined) {
          localStorageFactory.set("wms", obj.wms);
        }
        if (obj.wfs !== undefined) {
          localStorageFactory.set("wfs", obj.wfs);
        }
        if (obj.wcs !== undefined) {
          console.error("Cannot display WCS directly. Use a Portrayal Service WMS with WCS as data layer.<br/>Syntax: /l/wms/[URL to portrayal]/d/wcs/[URL to data]");
        }

        if (obj.layers !== undefined) {
          mainAppFactory.setInitLayersInUrl(obj.layers);
        }
        var newSearch = angular.extend($location.search(), obj);
        $location.search(newSearch);
      }

      $scope.initMapLayout = function () {
        _initActiveLanguage();
        var SAFE_SEQUENCE = "\n\n"; // a separator that cannot occur in URL
        
        var obj = $location.search();
        var hash = $location.hash();
        var tokens = [], match;
        if (hash.indexOf("[") > -1) {
          var tokenRE = /\[.*?\]/g ;
          while(!!(match = tokenRE.exec(hash))) {
            tokens.push(match[0].slice(1,-1)); 
          }
          hash = hash.replace(tokenRE, SAFE_SEQUENCE);
        } else if (hash.indexOf("%5B") > -1) {
          var tokenRE2 = /\%5B.*?\%5D/g ;
          while(!!(match = tokenRE2.exec(hash))) { 
            tokens.push(match[0].slice(3,-3)); 
          }
          hash = hash.replace(tokenRE2, SAFE_SEQUENCE);
        }        
        var parms = hash.split("/");
        for (var p in parms) {
          if (parms[p] == SAFE_SEQUENCE) {
            parms[p] = tokens.shift(); // pop first
          }
        }    
        if (parms.length >= 3) {
          obj.zoom = parms[0];
          obj.lon = parms[1];
          obj.lat = parms[2];
          for (index = 3; index < parms.length; index += 1) {
            switch (parms[index].charAt(0)) {
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
                if (parms[index + 1] === 'wms') {
                  obj.wms = parms[index + 2];
                } else if (parms[index + 1] === 'wfs') {
                  obj.wfs = parms[index + 2];
                }
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
            if (!parseInt(layers[i], 10)) {
              $scope.$broadcast('addLayerFromWMS', layers[i]);
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

angular.module('searchLagTurkartPanel')
  .directive('searchLagTurkartPanel', ['toolsFactory', 'ISY.EventHandler', '$http', 'mainAppService', '$window', 'ISY.MapAPI.Map',
    function (toolsFactory, eventHandler, $http, mainAppService, $window, map) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchLagTurkartPanel/searchLagTurkartPanel.html',
        restrict: 'A',
        link: function (scope) {
          scope.activePosition.zoom = parseFloat(7);
          map.SetCenter(scope.activePosition);
          var extent = {};
          var mapLink = "";
          var retryMapCreation = true;
          scope.mapAvailable = false;
          scope.createMapButtonOn = true;
          scope.showLegend = false;
          scope.showTrips = false;
          scope.showSweden = false;

          eventHandler.RegisterEvent(ISY.Events.EventTypes.PrintBoxSelectReturnValue, _boxExtent);

          function _boxExtent(newExtent) {
            extent = newExtent;
          }

          var _activatePrintBoxSelect = function (scale, cols, rows) {
            var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
            printBoxSelectTool.additionalOptions.scale = scale;
            printBoxSelectTool.additionalOptions.cols = cols;
            printBoxSelectTool.additionalOptions.rows = rows;
            toolsFactory.activateTool(printBoxSelectTool);
          };

          scope.applyScale = function (scale) {
            scope.deactivatePrintBoxSelect();
            _activatePrintBoxSelect(scale, 4, 3);
            scope.scale = scale;
          };

          scope.scales = {
            25000: '1: 25 000',
            50000: '1: 50 000'
          };

          scope.scale = '25000';
          scope.tittel = "Turkart";

          _activatePrintBoxSelect(scope.scale, 4, 3);

          scope.orderMap = function () {
            if (!extent.bbox) {
              return;
            }
            scope.createMapButtonOn = false;
            scope.mapAvailable = false;
            var json = _createJson();
            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
            var urlLagTurkart = mainAppService.generateLagTurkartUrl();
            $http.post(urlLagTurkart, json, {headers:{'Content-Type': 'application/json'}}).then(
              function (response) {
                _mapReadyForDownload(response, urlLagTurkart);
              },
              function (response) {
                _mapCreationFailed(response);
              }
            );
            scope.showSpinner = true;
            document.getElementById("spinner1").style.backgroundColor = "rgba(0,0,0,0.4)";
            document.getElementById("spinner1").style.transition = "0.8s";
          };

          var _createJson = function () {
            return {
              map: {
                bbox: extent.bbox,
                center: extent.center,
                dpi: "300",
                layers: [{
                  baseURL: "http://wms.geonorge.no/skwms1/wms.toporaster4",
                  customParams: {
                    TRANSPARENT: "false"
                  },
                  imageFormat: "image/jpeg",
                  layers: ["toporaster"],
                  opacity: 1,
                  type: "WMS"
                }],
                projection: extent.projection,
                sone: extent.sone,
                biSone: extent.biSone
              },
              paging: 12,
              layout: "A4 landscape",
              scale: extent.scale,
              titel: scope.tittel,
              legend: scope.showLegend,
              trips: scope.showTrips,
              sweden: scope.showSweden,
              link: "http://www.norgeskart.no/#!?zoom=" + scope.activePosition.zoom + "&lat=" + Number(Math.round(scope.activePosition.lat + 'e' + 2) + 'e-' + 2) + "&lon=" + Number(Math.round(scope.activePosition.lon + 'e' + 2) + 'e-' + 2)
            };
          };

          var _mapCreationFailed = function () {
            if (retryMapCreation) {
              // console.log('Map creation failed. Retrying.');
              retryMapCreation = false;
              scope.orderMap();
            } else {
              console.warn('Retrying map creation failed. Try again later or contact Kartverket.');
              scope.createMapButtonOn = true;
            }
          };

          var _mapReadyForDownload = function (response, urlLagTurkart) {
            scope.mapAvailable = true;
            scope.createMapButtonOn = true;
            scope.showSpinner = false;
            document.getElementById("spinner1").style.backgroundColor = "transparent";
            document.getElementById("spinner1").style.transition = "0.8s";
            mapLink = urlLagTurkart.replace('turkart', '') + response.data.linkPdf;
          };

          scope.downloadMap = function () {
            $window.open(mapLink, '_blank');
          };

          var setMenuListMaxHeight = function () {
            $(document).ready(function () {
              var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
              if (isMobile.matches) {
                fixElementHeight(120);
              } else {
                fixElementHeight(220);
              }
            });
          };

          function fixElementHeight(moveUpFromBottom) {
            var bodyHeight = $window.innerHeight;
            var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
            var searchContentElements = document.getElementsByClassName("search-content");
            for (var i = 0; i < searchContentElements.length; i++) {
              var element = searchContentElements[i];
              element.style.maxHeight = menuListMaxHeight + 'px';
            }
          }

          $(document).ready(function () {
            $($window).resize(setMenuListMaxHeight);
            setMenuListMaxHeight();
          });
        }
      };
    }
  ]);

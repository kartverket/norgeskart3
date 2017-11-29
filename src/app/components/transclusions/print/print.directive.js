angular.module('print')
  .directive('print', ['toolsFactory', 'ISY.EventHandler', '$http', 'mainAppService', '$window', 'ISY.MapAPI.Map',
    function (toolsFactory, eventHandler, $http, mainAppService, $window, map) {
      return {
        templateUrl: 'components/transclusions/print/print.html',
        restrict: 'A',
        link: function (scope) {
          if (scope.activePosition && scope.activePosition.zoom) {
            scope.activePosition.zoom = parseFloat(12);
            map.SetCenter(scope.activePosition);
          }
          var extent = {};
          var mapLink = "";
          var retryMapCreation = true;
          scope.mapAvailable = false;
          scope.createMapButtonOn = true;
          scope.showLegend = false;
          scope.showTrips = false;

          function _boxExtent(newExtent) {
            extent = newExtent;
          }
          eventHandler.RegisterEvent(ISY.Events.EventTypes.PrintBoxSelectReturnValue, _boxExtent);

          var _activatePrintBoxSelect = function (scale, cols, rows) {
            var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
            printBoxSelectTool.additionalOptions.scale = scale;
            printBoxSelectTool.additionalOptions.cols = cols;
            printBoxSelectTool.additionalOptions.rows = rows;
            toolsFactory.activateTool(printBoxSelectTool);
          };
          var _deactivatePrintBoxSelect = function () {
            var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
            toolsFactory.deactivateTool(printBoxSelectTool);
          };
    
          scope.applyScale = function (scale) {
            _deactivatePrintBoxSelect();
            _activatePrintBoxSelect(scale, 1, 1);
            scope.scale = scale;
          };

          scope.scales = {
            10000: '1: 10 000',
            25000: '1: 25 000',
            50000: '1: 50 000',
            100000: '1: 100 000'
          };
          scope.scale = '25000';
          scope.tittel = "Print";

          scope.orderMap = function () {
            if (!extent.bbox) {
              return;
            }
            scope.createMapButtonOn = false;
            scope.mapAvailable = false;
            var json = _createJson();
            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
            var urlLagFargeleggingskart = mainAppService.generateLagFargeleggingskartUrl();
            $http.post(urlLagFargeleggingskart, json).then(
              function (response) {
                _mapReadyForDownload(response, urlLagFargeleggingskart);
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
                  baseURL: "http://wms.geonorge.no/skwms1/wms.toporaster3",
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
                biSone: ""
              },
              paging: 1,
              layout: "A4 landscape",
              scale: extent.scale,
              titel: scope.tittel,
              link: "http://www.norgeskart.no/geonorge"
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

          var _mapReadyForDownload = function (response, urlLagFargeleggingskart) {
            scope.mapAvailable = true;
            scope.createMapButtonOn = true;
            scope.showSpinner = false;
            document.getElementById("spinner1").style.backgroundColor = "transparent";
            document.getElementById("spinner1").style.transition = "0.8s";
            mapLink = urlLagFargeleggingskart.replace('getprint_f.py', '') + response.data.linkPdf;
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

          scope.$on('moveableOverlayChange', function (event, args) {
            if (args.id === 'Print') {
              _activatePrintBoxSelect(scope.scale, 1, 1);
            }
          });
        }
      };
    }
  ]);

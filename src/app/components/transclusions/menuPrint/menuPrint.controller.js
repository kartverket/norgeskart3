angular.module('menuPrint')
  .controller('menuPrintController', ['$scope', 'toolsFactory', 'toolsPrint', '$timeout', 'ISY.MapAPI.Map', 'mainAppService', 'mainAppFactory',
    function ($scope, toolsFactory, toolsPrint, $timeout, map, mainAppService, mainAppFactory) {

      $scope.printScales = {
        1: 100,
        2: 500,
        3: 1000,
        4: 5000,
        5: 10000,
        6: 25000,
        7: 50000,
        8: 100000,
        9: 250000,
        10: 500000
      };

      $scope.printCanceled = true;

      $scope.layouts = [{}];
      $scope.formats = [];

      $scope.initMainPrintProtocol = function () {
        document.getElementById("spinnerPrint").style.backgroundColor = "rgba(0,0,0,0.4)";
        document.getElementById("spinnerPrint").style.transition = "0.8s";
        $scope.showSpinner = true;
        var printCapabilities = toolsPrint.getPrintCapabilities('kv');
        printCapabilities.then(function (capabilities) {
            $timeout(function () {
              $scope.layouts = capabilities.layouts;
              $scope.selectedLayout = $scope.layouts[0];
              $scope.formats = capabilities.formats;
              $scope.selectedFormat = "pdf";
              $scope.dpiResolutions = $scope.selectedLayout.attributes[1].clientInfo.dpiSuggestions;
              $scope.selectedDpi = 130;
              $scope.showSpinner = false;
              setPrintBox();
            });
          },
          function (reject) {
            console.error('Init print rejected: ', reject);
            $scope.showSpinner = false;
          });
      };

      $scope.setLayoutType = function (layout) {
        $scope.selectedLayout = layout;
        setPrintBox();
      };

      $scope.setFormat = function (format) {
        $scope.selectedFormat = format;
      };

      $scope.setDpi = function (dpi) {
        $scope.selectedDpi = dpi;
      };

      $scope.setPrintScale = function (scale) {
        $scope.selectedPrintScale = scale;
        setPrintBox();
      };

      function setPrintBox() {
        var printBoxTool = toolsFactory.getToolById('PrintBox');
        toolsFactory.deactivateTool(printBoxTool);
        if (!$scope.selectedPrintScale && printBoxTool && printBoxTool.additionalOptions && printBoxTool.additionalOptions.scale) {
          $scope.selectedPrintScale = printBoxTool.additionalOptions.scale;
        } else {
          printBoxTool.additionalOptions.scale = $scope.selectedPrintScale;
        }
        printBoxTool.additionalOptions.pageWidth = $scope.selectedLayout.attributes[1].clientInfo.width;
        printBoxTool.additionalOptions.pageHeight = $scope.selectedLayout.attributes[1].clientInfo.height;

        toolsFactory.activateTool(printBoxTool);
      }

      function _downloadPrint(url) {
        var a = document.createElement('a');
        var printUrl = mainAppService.generatePrintDownloadUrl(url);
        a.href = printUrl;
        a.download = printUrl;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        $scope.printCanceled = true;
      }

      function _waitToGeneratePrint(url) {
        var statusPrint = toolsPrint.getStatusPrint(url);
        statusPrint.then(function (result) {
            $timeout(function () {
              if (result.done === false) {
                if (!$scope.printCanceled) {
                  _waitToGeneratePrint(url);
                }
              } else {
                $scope.showSpinner = false;
                _downloadPrint(result.downloadURL);
              }
            });
          },
          function (reject) {
            console.error('Wait to generere print rejected: ', reject);
            $scope.showSpinner = false;
          });
      }

      $scope.print = function () {
        var center = map.GetCenter();
        var visibleLayers = mainAppFactory.getVisibleLayers();
        visibleLayers.sort(function (x, y) {
          return x.isBaseLayer - y.isBaseLayer;
        });
        var printJson = {
          attributes: {
            map: {
              center: [center.lon, center.lat],
              dpi: $scope.selectedDpi,
              layers: [],
              projection: "EPSG:25833",
              rotation: 0,
              scale: $scope.selectedPrintScale
            },
            pos: [center.lon, center.lat],
            title: $scope.mapName || ''
          },
          layout: $scope.selectedLayout.name
        };
        //var mapConfig = mainAppFactory.getMapConfig();
        //printJson.attributes.map.projection = mapConfig.coordinate_system;
        $scope.printCanceled = false;
        $scope.showSpinner = true;
        for (var i = 0; i < visibleLayers.length; i++) {
          var printLayer = {};
          switch (visibleLayers[i].subLayers[0].source) {
            case 'WMS':
              printLayer = {
                baseURL: visibleLayers[i].subLayers[0].url[0],
                customParams: {
                  TRANSPARENT: "true"
                },
                imageFormat: "image/png",
                layers: [visibleLayers[i].subLayers[0].name],
                opacity: 0.7,
                type: visibleLayers[i].subLayers[0].source
              };
              break;
            case 'WMTS':
              printLayer = {
                baseURL: visibleLayers[i].subLayers[0].url[0],
                customParams: {
                  TRANSPARENT: "false"
                },
                imageFormat: "image/png",
                layer: visibleLayers[i].subLayers[0].name,
                opacity: 1,
                type: visibleLayers[i].subLayers[0].source,
                dimensions: null,
                requestEncoding: "KVP",
                dimensionParams: {},
                matrixSet: "EPSG:25833",
                matrices: [{
                    identifier: "EPSG:25833:0",
                    scaleDenominator: 77371428.57142858,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [1, 1]
                  },
                  {
                    identifier: "EPSG:25833:1",
                    scaleDenominator: 38685714.28571429,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [2, 2]
                  },
                  {
                    identifier: "EPSG:25833:2",
                    scaleDenominator: 19342857.142857146,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [4, 4]
                  },
                  {
                    identifier: "EPSG:25833:3",
                    scaleDenominator: 9671428.571428573,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [8, 8]
                  },
                  {
                    identifier: "EPSG:25833:4",
                    scaleDenominator: 4835714.285714286,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [16, 16]
                  },
                  {
                    identifier: "EPSG:25833:5",
                    scaleDenominator: 2417857.142857143,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [32, 32]
                  },
                  {
                    identifier: "EPSG:25833:6",
                    scaleDenominator: 1208928.5714285716,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [64, 64]
                  },
                  {
                    identifier: "EPSG:25833:7",
                    scaleDenominator: 604464.2857142858,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [128, 128]
                  },
                  {
                    identifier: "EPSG:25833:8",
                    scaleDenominator: 302232.1428571429,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [256, 256]
                  },
                  {
                    identifier: "EPSG:25833:9",
                    scaleDenominator: 151116.07142857145,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [512, 512]
                  },
                  {
                    identifier: "EPSG:25833:10",
                    scaleDenominator: 75558.03571428572,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [1024, 1024]
                  },
                  {
                    identifier: "EPSG:25833:11",
                    scaleDenominator: 37779.01785714286,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [2048, 2048]
                  },
                  {
                    identifier: "EPSG:25833:12",
                    scaleDenominator: 18889.50892857143,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [4096, 4096]
                  },
                  {
                    identifier: "EPSG:25833:13",
                    scaleDenominator: 9444.754464285716,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [8192, 8192]
                  },
                  {
                    identifier: "EPSG:25833:14",
                    scaleDenominator: 4722.377232142858,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [16384, 16384]
                  },
                  {
                    identifier: "EPSG:25833:15",
                    scaleDenominator: 2361.188616071429,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [32768, 32768]
                  },
                  {
                    identifier: "EPSG:25833:16",
                    scaleDenominator: 1180.5943080357144,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [65536, 65536]
                  },
                  {
                    identifier: "EPSG:25833:17",
                    scaleDenominator: 590.2971540178572,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [131072, 131072]
                  },
                  {
                    identifier: "EPSG:25833:18",
                    scaleDenominator: 295.1485770089286,
                    topLeftCorner: [-2500000,9045984],
                    tileSize:[ 256,256],
                    matrixSize: [262144, 262144]
                  }
                ],
              };
              break;
            default:
              break;
          }
          printJson.attributes.map.layers.push(printLayer);
        }

        var uploadPrintData = toolsPrint.uploadDataForPrint('kv', printJson);
        uploadPrintData.then(function (status) {
            $timeout(function () {
              $scope.refNum = status.ref.split("@")[0];
              _waitToGeneratePrint(status.statusURL);
            });
          },
          function (reject) {
            console.error('Rejected upload print data: ', reject);
            $scope.showSpinner = false;
          });

      };

      $scope.cancelPrint = function () {
        $scope.printCanceled = true;
        var cancelPrint = toolsPrint.cancelPrint($scope.refNum);
        cancelPrint.then(function () {
            $timeout(function () {
              $scope.showSpinner = false;
            });
          },
          function (reject) {
            console.error('Rejected cancel print: ', reject);
            $scope.showSpinner = false;
          });
      };

    }
  ]);

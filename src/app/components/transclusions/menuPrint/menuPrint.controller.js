angular.module("menuPrint")
  .controller("menuPrintController", ["$scope","toolsFactory","toolsPrint","$timeout","ISY.MapAPI.Map","mainAppService",
  function($scope,toolsFactory,toolsPrint,$timeout,map,mainAppService) {
    $scope.printScales = {
      1: 250,
      2: 500,
      3: 1000,
      4: 2500,
      5: 5000,
      6: 10000,
      7: 25000,
      8: 50000,
      9: 100000,
      10: 250000,
      11: 500000,
      12: 1000000,
      13: 2500000
    };

    $scope.printCanceled = true;
    $scope.layouts = [{}];
    $scope.formats = [];

    $scope.initMainPrintProtocol = function() {
      document.getElementById("spinnerPrint").style.backgroundColor = "rgba(0,0,0,0.4)";
      document.getElementById("spinnerPrint").style.transition = "0.8s";
      $scope.showSpinner = true;
      var printCapabilities = toolsPrint.getPrintCapabilities("kv");
      printCapabilities.then(
        function(capabilities) {
          $timeout(function() {
            $scope.layouts = capabilities.layouts;
            $scope.selectedLayout = $scope.layouts[0];
            $scope.formats = capabilities.formats;
            $scope.selectedFormat = "pdf";
            $scope.dpiResolutions = $scope.selectedLayout.attributes[1].clientInfo.dpiSuggestions;
            $scope.selectedDpi = 128;
            $scope.showSpinner = false;
            setPrintBox();
          });
        },
        function(reject) {
          console.error("Init print rejected: ", reject);
          $scope.showSpinner = false;
        }
      );
    };

    $scope.setLayoutType = function(layout) {
      $scope.selectedLayout = layout;
      setPrintBox();
    };

    $scope.setFormat = function(format) {
      $scope.selectedFormat = format;
    };

    $scope.setDpi = function(dpi) {
      $scope.selectedDpi = dpi;
    };

    $scope.setPrintScale = function(scale) {
      $scope.selectedPrintScale = scale;
      setPrintBox();
    };

    function setPrintBox() {
      var printBoxTool = toolsFactory.getToolById("PrintBox");
      toolsFactory.deactivateTool(printBoxTool);
      if (
        !$scope.selectedPrintScale &&
        printBoxTool &&
        printBoxTool.additionalOptions &&
        printBoxTool.additionalOptions.scale
      ) {
        $scope.selectedPrintScale = printBoxTool.additionalOptions.scale;
      } else {
        printBoxTool.additionalOptions.scale = $scope.selectedPrintScale;
      }
      printBoxTool.additionalOptions.pageWidth = $scope.selectedLayout.attributes[1].clientInfo.width;
      printBoxTool.additionalOptions.pageHeight = $scope.selectedLayout.attributes[1].clientInfo.height;

      toolsFactory.activateTool(printBoxTool);
    }

    function _downloadPrint(url) {
      var a = document.createElement("a");
      var printUrl = mainAppService.generatePrintDownloadUrl(url);
      a.href = printUrl;
      a.download = printUrl;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      $scope.printCanceled = true;
    }

    function _waitToGeneratePrint(url) {
      var statusPrint = toolsPrint.getStatusPrint(url);
      statusPrint.then(
        function(result) {
          $timeout(function() {
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
        function(reject) {
          console.error("Wait to generere print rejected: ", reject);
          $scope.showSpinner = false;
        }
      );
    }
    function removeKeys(obj, keys) {
      var index;
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          switch (typeof obj[prop]) {
            case "string":
              index = keys.indexOf(prop);
              if (index > -1) {
                delete obj[prop];
              }
              break;
            case "object":
              index = keys.indexOf(prop);
              if (index > -1) {
                delete obj[prop];
              } else {
                removeKeys(obj[prop], keys);
              }
              break;
          }
        }
      }
    }
    $scope.print = function() {
      var center = map.GetCenter();
      var layers = ISY.MapImplementation.OL3.olMap.getLayers().getArray(); //mainAppFactory.getVisibleLayers();
      layers = layers
        .filter(function(layer) {
          return layer.get("name") != "PrintBox";
        })
        .filter(function(layer) {
          return layer.getVisible() == true;
        })
        .sort(function(a, b) {
          return b.layerIndex - (a.layerIndex || Infinity);
        });

      var printJson = {
        attributes: {
          map: {
            center: [center.lon, center.lat],
            dpi: $scope.selectedDpi,
            layers: [],
            rotation: 0, // ToDo: calculate the angle so that north can be shown correctly
            projection: "EPSG:25833",
            scale: $scope.selectedPrintScale
          },
          pos:
            Number(Math.round(center.lon + "e" + 2) + "e-" + 2) + ", " +
            Number(Math.round(center.lat + "e" + 2) + "e-" + 2),
          scale_string: "1:" + $scope.selectedPrintScale,
          title: $scope.mapName || ""
        },
        layout: $scope.selectedLayout.name,
        outputFormat: $scope.selectedFormat,
        outputFilename: "norgeskart-utskrift"
      };
      //var mapConfig = mainAppFactory.getMapConfig();
      //printJson.attributes.map.projection = mapConfig.coordinate_system;
      $scope.printCanceled = false;
      $scope.showSpinner = true;
      for (var i = 0; i < layers.length; i++) {
        var printLayer = {};
        var customParams = {
          TRANSPARENT: "true"
        };
        var baseUrl = "";
        var sourceType = "VECTOR";
        if (layers[i].getProperties().config) {
          baseUrl = layers[i].getProperties().config.url[0];
          sourceType = layers[i].getProperties().config.source;
        } else if (layers[i].getSource().getUrl()) {
          baseUrl = layers[i].getSource().getUrl();
        }

        if (baseUrl.substr(0, 2) === "//") {
          baseUrl = "http:" + layers[i].getProperties().config.url[0];
        }
        var testUrl = baseUrl.split("?");
        if (testUrl.length > 1) {
          for (var b = 1; b < testUrl.length; b++) {
            var param = testUrl[b].split("=");
            customParams[param[0]] = param[1];
          }
          baseUrl = testUrl[0];
        }

        switch (sourceType) {
          case "WMS":
            printLayer = {
              baseURL: baseUrl,
              customParams: customParams,
              imageFormat: layers[i].getProperties().config.format,
              layers: [layers[i].getProperties().config.name],
              opacity: 1,
              type: layers[i].getProperties().config.source
            };
            if (layers[i].getProperties().config.styles) {
              printLayer.styles = [layers[i].getProperties().config.styles];
            }
            break;
          case "WMTS":
            var identifier = "";
            if (layers[i].getProperties().config.matrixPrefix) {
              identifier = layers[i].getSource().getMatrixSet() + ":";
            }
            printLayer = {
              baseURL: baseUrl,
              customParams: customParams,
              style: "default",
              imageFormat: layers[i].getProperties().config.format,
              layer: layers[i].getProperties().config.name,
              opacity: 1,
              type: layers[i].getProperties().config.source,
              dimensions: null,
              requestEncoding: "KVP",
              dimensionParams: {},
              matrixSet: layers[i].getSource().getMatrixSet(),
              matrices: [
                {
                  identifier: identifier + "0",
                  scaleDenominator: 77371428.57142858,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [1, 1]
                },
                {
                  identifier: identifier + "1",
                  scaleDenominator: 38685714.28571429,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [2, 2]
                },
                {
                  identifier: identifier + "2",
                  scaleDenominator: 19342857.142857146,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [4, 4]
                },
                {
                  identifier: identifier + "3",
                  scaleDenominator: 9671428.571428573,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [8, 8]
                },
                {
                  identifier: identifier + "4",
                  scaleDenominator: 4835714.285714286,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [16, 16]
                },
                {
                  identifier: identifier + "5",
                  scaleDenominator: 2417857.142857143,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [32, 32]
                },
                {
                  identifier: identifier + "6",
                  scaleDenominator: 1208928.5714285716,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [64, 64]
                },
                {
                  identifier: identifier + "7",
                  scaleDenominator: 604464.2857142858,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [128, 128]
                },
                {
                  identifier: identifier + "8",
                  scaleDenominator: 302232.1428571429,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [256, 256]
                },
                {
                  identifier: identifier + "9",
                  scaleDenominator: 151116.07142857145,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [512, 512]
                },
                {
                  identifier: identifier + "10",
                  scaleDenominator: 75558.03571428572,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [1024, 1024]
                },
                {
                  identifier: identifier + "11",
                  scaleDenominator: 37779.01785714286,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [2048, 2048]
                },
                {
                  identifier: identifier + "12",
                  scaleDenominator: 18889.50892857143,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [4096, 4096]
                },
                {
                  identifier: identifier + "13",
                  scaleDenominator: 9444.754464285716,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [8192, 8192]
                },
                {
                  identifier: identifier + "14",
                  scaleDenominator: 4722.377232142858,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [16384, 16384]
                },
                {
                  identifier: identifier + "15",
                  scaleDenominator: 2361.188616071429,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [32768, 32768]
                },
                {
                  identifier: identifier + "16",
                  scaleDenominator: 1180.5943080357144,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [65536, 65536]
                },
                {
                  identifier: identifier + "17",
                  scaleDenominator: 590.2971540178572,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [131072, 131072]
                },
                {
                  identifier: identifier + "18",
                  scaleDenominator: 295.1485770089286,
                  topLeftCorner: [-2500000, 9045984],
                  tileSize: [256, 256],
                  matrixSize: [262144, 262144]
                }
              ]
            };
            break;
          case "VECTOR":
            var geojson;
            if (layers[i].getSource().getFormat()) {
              // Assume GML
              // printLayer = {
              //   url: layers[i].getSource().getUrl(),
              //   opacity: 0.7,
              //   type: "GML"
              // };
              if (layers[i].getSource().getUrl()[0].split(".").slice(-1)[0] === 'geojson') {
                geojson = layers[i].getSource().getUrl()[0];
              } else {
                geojson = layers[i].getSource().getUrl() + '&outputFormat=json&srsName=urn:x-ogc:def:crs:EPSG:25833';
              }              
            } else {
              // Assume GeoJson - drawing
              if (layers[i].getProperties().options && layers[i].getProperties().options.GeoJSON) {
                geojson = layers[i].getProperties().options.GeoJSON;
              }
            }
              removeKeys(geojson, "style");
              printLayer = {
                geoJson: geojson,
                type: "geojson",
                style: {
                  "*": {
                    symbolizers: [
                      {
                        fillColor: "red",
                        pointRadius: 5,
                        type: "point"
                      },
                      {
                        type: "line",
                        strokeColor: "orange",
                        strokeOpacity: 1,
                        strokeWidth: 3,
                        strokeLinecap: "round",
                        strokeDashstyle: "dot"
                      },
                      {
                        type: "polygon",
                        fillColor: "#FF0000",
                        fillOpacity: 0,
                        strokeColor: "blue",
                        strokeOpacity: 1,
                        strokeWidth: 3,
                        strokeLinecap: "round"
                      }/* ToDo: Fix this error: With this style, geometries with empty properties will not show
                      {
                        type: "text",
                        label: "[measurement]",
                        haloRadius : "3",
                        strokeColor: "orange",
                        fillColor: "#FF0000"
                      } */
                    ]
                  },
                  "version": "2"
                }
              };
            break;
          default:
            console.warn("Unexpected Layer type to print, let's try it");
            printLayer = {
              baseURL: layers[i].getProperties().config.url[0],
              customParams: {
                TRANSPARENT: "true"
              },
              imageFormat: layers[i].getProperties().config.format,
              layers: [layers[i].getProperties().config.name],
              opacity: 0.7,
              type: layers[i].getProperties().config.source
            };
            break;
        }
        printJson.attributes.map.layers.push(printLayer);
      }

      var uploadPrintData = toolsPrint.uploadDataForPrint("kv", printJson);
      uploadPrintData.then(
        function(status) {
          $timeout(function() {
            $scope.refNum = status.ref.split("@")[0];
            _waitToGeneratePrint(status.statusURL);
          });
        },
        function(reject) {
          console.error("Rejected upload print data: ", reject);
          $scope.showSpinner = false;
        }
      );
    };

    $scope.cancelPrint = function() {
      $scope.printCanceled = true;
      var cancelPrint = toolsPrint.cancelPrint($scope.refNum);
      cancelPrint.then(
        function() {
          $timeout(function() {
            $scope.showSpinner = false;
          });
        },
        function(reject) {
          console.error("Rejected cancel print: ", reject);
          $scope.showSpinner = false;
        }
      );
    };
  }
]);

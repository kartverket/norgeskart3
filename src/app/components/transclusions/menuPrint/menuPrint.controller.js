angular.module('menuPrint')
    .controller('menuPrintController', ['$scope', 'toolsFactory', 'toolsPrint', '$timeout', 'ISY.MapAPI.Map', 'mainAppService', 'mainAppFactory',
        function ($scope, toolsFactory, toolsPrint, $timeout, map, mainAppService, mainAppFactory) {
            
            $scope.printScales = {
                1: 500,
                2: 1000,
                3: 5000,
                4: 10000,
                5: 25000,
                6: 50000,
                7: 100000,
                8: 250000,
                9: 500000
            };

            $scope.printCanceled = true;

            $scope.layouts = [{}];
            $scope.formats = [];

            $scope.initMainPrintProtocol = function () {
                document.getElementById("spinnerPrint").style.backgroundColor = "rgba(0,0,0,0.4)";
                document.getElementById("spinnerPrint").style.transition = "0.8s";
                $scope.showSpinner = true;
                var printCapabilities = toolsPrint.getPrintCapabilities('default');
                printCapabilities.then(function(capabilities){
                    $timeout(function(){
                        $scope.layouts = capabilities.layouts;
                        $scope.selectedLayout = $scope.layouts[0];
                        $scope.formats = capabilities.formats;
                        $scope.selectedFormat = "pdf";
                        $scope.dpiResolutions = $scope.selectedLayout.attributes[0].clientInfo.dpiSuggestions;
                        $scope.selectedDpi = 72;
                        $scope.showSpinner = false;
                        setPrintBoxSelect();
                    });
                },
                function(reject){
                    console.error('Init print rejected: ', reject);
                    $scope.showSpinner = false;
                });
            };

            $scope.setLayoutType = function(layout) {
                $scope.selectedLayout = layout;
                setPrintBoxSelect();
            };
            
            $scope.setFormat = function(format){
                $scope.selectedFormat = format;
            };

            $scope.setDpi = function(dpi){
                $scope.selectedDpi = dpi;
            };

            $scope.setPrintScale = function (scale) {
                $scope.selectedPrintScale = scale;
                setPrintBoxSelect();
            };

            function setPrintBoxSelect() {
                var printBoxSelectTool = toolsFactory.getToolById('PrintBoxSelect');
                toolsFactory.deactivateTool(printBoxSelectTool);
                if (!$scope.selectedPrintScale && printBoxSelectTool && printBoxSelectTool.additionalOptions && printBoxSelectTool.additionalOptions.scale) {
                    $scope.selectedPrintScale = printBoxSelectTool.additionalOptions.scale;
                } else {
                    printBoxSelectTool.additionalOptions.scale = $scope.selectedPrintScale;
                }
                printBoxSelectTool.additionalOptions.pageWidth = $scope.selectedLayout.attributes[0].clientInfo.width / 10;
                printBoxSelectTool.additionalOptions.pageHeight = $scope.selectedLayout.attributes[0].clientInfo.height / 10;
                printBoxSelectTool.additionalOptions.cols = 1;
                printBoxSelectTool.additionalOptions.rows = 1;

                toolsFactory.activateTool(printBoxSelectTool);
            }

            var temporaryJsonData = {
                attributes: {
                    map: {
                        center: [
                            1024129.35,
                            7826792.19
                        ],
                        dpi: 300,
                        layers: [
                            {
                                baseURL: "http://wms.geonorge.no/skwms1/wms.nrl",
                                customParams: { "TRANSPARENT": "true" },
                                imageFormat: "image/png",
                                layers: ["kraftstolpe_under_40m"],
                                opacity: 1,
                                type: "WMS"
                            },
                            {
                                baseURL: "http://wms.geonorge.no/skwms1/wms.toporaster3",
                                customParams: { "TRANSPARENT": "true" },
                                imageFormat: "image/png",
                                layers: ["toporaster"],
                                opacity: 1,
                                type: "WMS"
                            }
                            
                        ],
                        projection: "EPSG:25833",
                        rotation: 0,
                        scale: 500000
                    },
                },
                layout: "A4 portrait",
                title: ""
            };

            // var printJson = {
            //     attributes: {
            //         map: {
            //             center: [],
            //             dpi: 300,
            //             layers: [],
            //             projection: "EPSG:25833",
            //             rotation: 0,
            //             scale: 500000
            //         },
            //     },
            //     layout: "A4 portrait",
            //     name: ""
            // };

            function _downloadPrint(url){
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

            function _waitToGeneratePrint(url){
                var statusPrint = toolsPrint.getStatusPrint(url);
                statusPrint.then(function(result){
                    $timeout(function(){
                        if (result.done === false){
                            if (!$scope.printCanceled){
                                _waitToGeneratePrint(url);
                            }
                        } else {
                            $scope.showSpinner = false;
                            _downloadPrint(result.downloadURL);
                        }
                    });
                },
                function(reject){
                    console.error('Wait to generere print rejected: ', reject);
                    $scope.showSpinner = false;
                });
            }

            $scope.print = function() {
                var center = map.GetCenter();
                // var visibleLayers = mainAppFactory.getVisibleLayers();
                // console.log('Visible Layers', visibleLayers);
                var mapConfig = mainAppFactory.getMapConfig();
                $scope.printCanceled = false;
                $scope.showSpinner = true;
                temporaryJsonData.attributes.map.center = [center.lon, center.lat];
                temporaryJsonData.attributes.map.scale = $scope.selectedPrintScale;
                temporaryJsonData.layout = $scope.selectedLayout.name;
                temporaryJsonData.attributes.map.dpi = $scope.selectedDpi;
                temporaryJsonData.attributes.map.projection = mapConfig.coordinate_system;
                temporaryJsonData.title = $scope.mapName;
                // for (var i = 0; i < visibleLayers.length; i++) {
                //     var printLayer = {
                //         baseURL: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts', //visibleLayers[i].subLayers[0].url[0],
                //         customParams: { "TRANSPARENT": "true" },
                //         imageFormat: "image/png",
                //         layer: visibleLayers[i].subLayers[0].name,
                //         opacity: 1,
                //         type: "WMTS"
                //     };
                //     printJson.attributes.map.layers.push(printLayer);
                // }
                
                var uploadPrintData = toolsPrint.uploadDataForPrint('default', temporaryJsonData);
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

            $scope.cancelPrint = function(){
                $scope.printCanceled = true;
                var cancelPrint = toolsPrint.cancelPrint($scope.refNum);
                cancelPrint.then(function(){
                    $timeout(function(){
                        $scope.showSpinner = false;
                    });
                },
                function(reject){
                    console.error('Rejected cancel print: ', reject);
                    $scope.showSpinner = false;
                });
                
            };

        }]);

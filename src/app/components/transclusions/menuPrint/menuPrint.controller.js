angular.module('menuPrint')
    .controller('menuPrintController', ['$scope', 'toolsFactory',
        function ($scope, toolsFactory) {
            
            $scope.printZoomLevels = {
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

            $scope.templateTypes = {
                a0ligg: "A0  Liggende",
                a0staa: "A0  Stående",
                a1ligg: "A1  Liggende",
                a1staa: "A1  Stående",
                a2ligg: "A2  Liggende",
                a2staa: "A2  Stående",
                a3liggdynaleg: "A3 Liggende",
                a3staadynaleg: "A3 Stående",
                a4liggdynaleg: "A4 Liggende",
                a4staadynaleg: "A4 Stående"
            };

            var template = {
                a0ligg: {
                    height: 0.79,
                    width: 1.13
                },    
                a0staa: {
                    height: 1.13,
                    width: 0.78
                },
                a1ligg: {
                    height: 0.55,
                    width: 0.79
                },
                a1staa: {
                    height: 0.79,
                    width: 0.54
                },
                a2ligg: {
                    height: 0.38,
                    width: 0.55
                },
                a2staa: {
                    height: 0.54,
                    width: 0.37
                },
                a3liggdynaleg: {
                    height: 0.24,
                    width: 0.3
                },
                a3staadynaleg: {
                    height: 0.325,
                    width: 0.248
                },
                a4liggdynaleg: {
                    height: 0.164,
                    width: 0.207
                },
                a4staadynaleg: {
                    height: 0.205,
                    width: 0.164
                }
            };

            $scope.showGrid = false;
            $scope.showLegend = false;

            $scope.initMainPrintProtocol = function () {
                //Maltype
                var firstTemplateKey = Object.keys($scope.templateTypes)[0];
                $scope.selectedTemplateType = $scope.templateTypes[firstTemplateKey];

                setPrintBoxSelect();
            };

            $scope.setTemplateType = function (templateType) {
                $scope.selectedTemplateType = templateType;
                setPrintBoxSelect();
            };

            $scope.setPrintZoomLevel = function (zoomLevel) {
                $scope.selectedPrintZoomLevel = zoomLevel;
                setPrintBoxSelect();
            };

            function setPrintBoxSelect() {
                var printBoxSelectTool = toolsFactory.getToolById('PrintBoxSelect');
                toolsFactory.deactivateTool(printBoxSelectTool);
                if (!$scope.selectedPrintZoomLevel && printBoxSelectTool && printBoxSelectTool.additionalOptions && printBoxSelectTool.additionalOptions.scale) {
                    $scope.selectedPrintZoomLevel = printBoxSelectTool.additionalOptions.scale;
                } else {
                    printBoxSelectTool.additionalOptions.scale = $scope.selectedPrintZoomLevel;
                }
                var selectedTemplate = toolsFactory.val2key($scope.selectedTemplateType, $scope.templateTypes);
                printBoxSelectTool.additionalOptions.pageWidth = template[selectedTemplate].width * 100;
                printBoxSelectTool.additionalOptions.pageHeight = template[selectedTemplate].height * 100;
                printBoxSelectTool.additionalOptions.cols = 1;
                printBoxSelectTool.additionalOptions.rows = 1;

                toolsFactory.activateTool(printBoxSelectTool);
            }

        }]);

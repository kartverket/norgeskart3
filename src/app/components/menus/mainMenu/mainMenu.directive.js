angular.module('mainMenu')
    .directive('mainMenu', ['mapToolsFactory', 'mainMenuFactory',
        function(mapToolsFactory, mainMenuFactory) {
            return {
                templateUrl: 'components/menus/mainMenu/mainMenu.html',
                restrict: 'A',
                link: function(scope){


                    function _startDrawing (style) {
                        var addFeatureTool = mapToolsFactory.getToolById("AddLayerFeature");
                        mapToolsFactory.setAddFeatureType(style, "AddLayerFeature");
                        mapToolsFactory.activateTool(addFeatureTool);
                    }

                    scope.drawPoint = function () {
                        _startDrawing("Point");
                    };

                    scope.drawLine = function () {
                        _startDrawing("Line");
                    };

                    scope.drawPolygon = function () {
                        _startDrawing("Polygon");
                    };

                    scope.uploadGpx = function () {
                        // var data = '';
                        // mainMenuFactory.setGpxData(data);
                        mainMenuFactory.loadXml();
                        var getXml = mainMenuFactory.getXmlFile();
                        mainMenuFactory.setGpxData(getXml);
                        mainMenuFactory.uploadGpxFile();
                    };


                }
            };
        }]);
angular.module('mainMenu')
    .directive('mainMenu', ['mapToolsFactory',
        function(mapToolsFactory) {
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



                }
            };
        }]);
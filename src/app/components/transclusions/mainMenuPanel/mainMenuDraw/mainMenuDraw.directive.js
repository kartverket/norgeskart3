angular.module('mainMenuDraw')
    .directive('mainMenuDraw', [ 'toolsFactory', 'ISY.EventHandler', 'ISY.MapAPI.Map',
        function(toolsFactory, eventHandler, map) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuDraw/mainMenuDraw.html',
                restrict: 'A',
                link: function(scope){

                    /*
                     Measure tools start
                     */
                    function _startMeasure (style) {
                        var featureTool;
                        switch (style){
                            case "Line":
                                featureTool = toolsFactory.getToolById("MeasureLine");
                                toolsFactory.activateTool(featureTool);
                                break;
                            case "Polygon":
                                featureTool = toolsFactory.getToolById("Measure");
                                toolsFactory.activateTool(featureTool);
                                break;
                        }
                    }

                    scope.measureLine = function () {
                        _startMeasure("Line");
                    };

                    scope.measurePolygon = function () {
                        _startMeasure("Polygon");
                    };
                    /*
                     Measure tools end
                     */

                    /*
                     Draw start
                     */

                    var _setGeometryType = function(type){
                        drawFeatureTool.additionalOptions.type=type;
                        toolsFactory.deactivateTool(drawFeatureTool);
                        toolsFactory.activateTool(drawFeatureTool);
                    };

                    var getDrawing = function (geoJSON) {
                        console.log(geoJSON);
                    };
                    
                    scope.drawFeature = function (type) {
                        _setGeometryType(type);
                    };

                    scope.deactivateDrawFeature = function () {
                        toolsFactory.deactivateTool(drawFeatureTool);
                    };

                    map.RemoveInfoMarkers();
                    map.RemoveInfoMarker();
                    var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                    _setGeometryType('Point');
                    eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
                    /*
                     Draw end
                     */

                }
            };
        }]);
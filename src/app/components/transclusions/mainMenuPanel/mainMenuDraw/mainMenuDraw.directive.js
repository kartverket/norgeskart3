angular.module('mainMenuDraw')
    .directive('mainMenuDraw', [ 'toolsFactory', 'ISY.EventHandler', '$location','mainAppService', '$http',
        function(toolsFactory, eventHandler, $location,mainAppService,$http) {
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
                        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                        drawFeatureTool.additionalOptions.type=type;
                        _checkUrlForGeoJSON(drawFeatureTool);
                    };

                    var getDrawing = function (geoJSON) {
                        console.log(geoJSON);
                    };

                    var _checkUrlForGeoJSON = function (drawFeatureTool) {
                        var url=$location.url();
                        var params=url.split('?')[1].split('&');
                        for(var i =0; i<params.length; i++){
                            var param=params[i].split('=');
                            if(param[0]=='drawing') {
                                _getGeoJSON(drawFeatureTool, param[1]);
                                return;
                            }
                        }
                        _activateDrawFeatureTool(drawFeatureTool);
                    };

                    var _getGeoJSON = function (drawFeatureTool, hash) {
                        var drawingUrl=mainAppService.generateGeoJSONUrl(hash);
                        $http.get(drawingUrl).then(function(result){_addGeoJSONToOptions(result, drawFeatureTool);});
                    };

                    var _addGeoJSONToOptions = function(result,drawFeatureTool){
                        drawFeatureTool.additionalOptions.GeoJSON = result.data;
                        _activateDrawFeatureTool(drawFeatureTool);
                    };

                    var _activateDrawFeatureTool = function (drawFeatureTool) {
                        toolsFactory.deactivateTool(drawFeatureTool);
                        toolsFactory.activateTool(drawFeatureTool);
                    };

                    scope.drawFeature = function (type) {
                        _setGeometryType(type);
                    };

                    scope.removeInfomarkers();
                    _setGeometryType('Point');
                    eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
                    /*
                     Draw end
                     */

                }
            };
        }]);
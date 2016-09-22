angular.module('toolMainMenu')
    .directive('toolMainMenu', ['toolsFactory', 'toolsElevationProfileFactory', 'toolsEmergencyPosterFactory', 'ISY.EventHandler', 'ISY.MapAPI.Map',
        function(toolsFactory, toolsElevationProfileFactory, toolsEmergencyPosterFactory, eventHandler, map) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/toolMainMenu/toolMainMenu.html',
                restrict: 'A',
                link: function(scope){
                    /*
                     Private variables start
                     */
                    var _elevationProfileActive = false;
                    var _emergencyPosterActive = false;
                    /*
                     Private variables end
                     */

                    /*
                     Events start
                     */
                    function _addLayerFeatureEnd(geometry){
                        var coordinates, transformCoor;
                        if (_elevationProfileActive){
                            coordinates = geometry.getGeometry().getCoordinates();
                            var transformedCoord = [];
                            for (var i = 0; i < coordinates.length; i++){
                                transformCoor = map.TransformToGeographic([coordinates[i][0], coordinates[i][1]]);
                                transformedCoord.push(transformCoor);
                            }
                            toolsElevationProfileFactory.uploadCoordinates(transformedCoord);
                        }
                        if (_emergencyPosterActive){
                            coordinates = geometry.getGeometry().getCoordinates();
                            // transformCoor = map.TransformToGeographic(coordinates[0], coordinates[1]);
                            toolsEmergencyPosterFactory.setPosterPosition(coordinates);
                        }
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.AddLayerFeatureEnd, _addLayerFeatureEnd);

                    /*
                     Events end
                     */

                    /*
                     Drawing tools start
                     */
                    function _startDrawing (style) {
                        var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                        toolsFactory.setAddFeatureType(style, "AddLayerFeature");
                        toolsFactory.activateTool(addFeatureTool);
                    }

                    scope.drawPoint = function () {
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        _startDrawing("Point");
                    };

                    scope.drawLine = function () {
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        _startDrawing("Line");
                    };

                    scope.drawPolygon = function () {
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        _startDrawing("Polygon");
                    };
                    /*
                     Drawing tools end
                     */

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
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        _startMeasure("Line");
                        scope.closeNav();
                    };

                    scope.measurePolygon = function () {
                        _elevationProfileActive = false;
                        _emergencyPosterActive = false;
                        _startMeasure("Polygon");
                        scope.closeNav();
                    };
                    /*
                     Measure tools end
                     */

                    /*
                     Calculate elevation profile start
                     */

                    scope.drawLineElevation = function(){
                        _elevationProfileActive = true;
                        scope.elevationImage = undefined;
                        _startDrawing("Line");
                    };

                    scope.calculateElevationProfile = function () {
                        if (!_elevationProfileActive){
                            toolsElevationProfileFactory.loadXmlFile();
                        }
                        toolsElevationProfileFactory.generateElevationProfile();
                        scope.elevationImage = toolsElevationProfileFactory.getElevationImage();
                        _elevationProfileActive = false;
                    };
                    /*
                     Calculate elevation profile end
                     */

                    /*
                     Generate emergancy poster start
                     */

                    scope.drawEmergencyPoint = function () {
                        _emergencyPosterActive = true;
                        _startDrawing("Point");
                    };

                    scope.generateEmergencyPoster = function () {
                        var configPoster = toolsEmergencyPosterFactory.getEmergencyPosterConfig();
                        configPoster.locationName = "Trondheim";
                        configPoster.position1 = "63 grader 25 minutter 49 sekunder nord";
                        configPoster.position2 = "10 grader 23 minutter 32 sekunder  st";
                        configPoster.street = "i TRONDHEIM kommune";
                        configPoster.place = "Trondheim kommune";
                        configPoster.matrikkel = "402/375 i TRONDHEIM";
                        configPoster.utm = "32V 569481 N 7034305";
                        configPoster.posDez = "N63.4303 - 10.3922";

                        toolsEmergencyPosterFactory.updateEmergencyPosterConfig(configPoster);
                        scope.emergencyPoster = toolsEmergencyPosterFactory.generateEmergancyPoster();
                        // scope.emergencyPoster = toolsEmergencyPosterFactory.getEmergencyPoster();
                        _emergencyPosterActive = false;
                    };
                    /*
                     Generate emergancy poster end
                     */
                }
            };
        }]);
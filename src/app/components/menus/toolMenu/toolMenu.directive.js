angular.module('toolMenu')
    .directive('toolMenu', ['toolsFactory', 'toolsElevationProfileFactory', 'toolsEmergencyPosterFactory', 'ISY.EventHandler', 'ISY.MapAPI.Map',
        function(toolsFactory, toolsElevationProfileFactory, toolsEmergencyPosterFactory, eventHandler, map) {
            return {
                templateUrl: 'components/menus/toolMenu/toolMenu.html',
                restrict: 'A',
                link: function(scope){
                    /*
                     Private variables start
                    */
                    var _elevationProfileActive = false;
                    /*
                     Private variables end
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
                        _startDrawing("Point");
                    };

                    scope.drawLine = function () {
                        _elevationProfileActive = false;
                        _startDrawing("Line");
                    };

                    scope.drawPolygon = function () {
                        _elevationProfileActive = false;
                        _startDrawing("Polygon");
                    };
                    /*
                     Drawing tools end
                     */

                    /*
                     Calculate elevation profile start
                     */
                    function _elevationProfileGeometry(geometry){
                        if (_elevationProfileActive){
                            var coordinates = geometry.getGeometry().getCoordinates();
                            var transformedCoord = [];
                            for (var i = 0; i < coordinates.length; i++){
                                var transformCoor = map.TransformToGeographic([coordinates[i][0], coordinates[i][1]]);
                                transformedCoord.push(transformCoor);
                            }
                            toolsElevationProfileFactory.uploadCoordinates(transformedCoord);
                        }
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.AddLayerFeatureEnd, _elevationProfileGeometry);

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
                     Calculate elevation profile start
                     */

                    /*
                     Generate emergancy poster start
                     */
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
                    };
                    /*
                     Generate emergancy poster start
                    */
                }
            };
        }]);
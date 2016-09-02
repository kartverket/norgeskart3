angular.module('mainMenu')
    .directive('mainMenu', ['toolsFactory', 'toolsElevationProfFactory', 'toolsEmergencyPoster',
        function(toolsFactory, toolsElevationProfFactory, toolsEmergencyPoster) {
            return {
                templateUrl: 'components/menus/mainMenu/mainMenu.html',
                restrict: 'A',
                link: function(scope){
                    function _startDrawing (style) {
                        var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                        toolsFactory.setAddFeatureType(style, "AddLayerFeature");
                        toolsFactory.activateTool(addFeatureTool);
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

                    scope.calculateElevationProfile = function () {
                        toolsElevationProfFactory.loadXmlFile();
                        toolsElevationProfFactory.generateElevationProfile();
                        scope.elevationImage = toolsElevationProfFactory.getElevationImage();
                    };

                    scope.generateEmergencyPoster = function () {
                        var configPoster = toolsEmergencyPoster.getEmergencyPosterConfig();
                        configPoster.locationName = "Trondheim";
                        configPoster.position1 = "63 grader 25 minutter 49 sekunder nord";
                        configPoster.position2 = "10 grader 23 minutter 32 sekunder  st";
                        configPoster.street = "i TRONDHEIM kommune";
                        configPoster.place = "Trondheim kommune";
                        configPoster.matrikkel = "402/375 i TRONDHEIM";
                        configPoster.utm = "32V 569481 N 7034305";
                        configPoster.posDez = "N63.4303 - 10.3922";
                        toolsEmergencyPoster.updateEmergencyPosterConfig(configPoster);
                        toolsEmergencyPoster.generateEmergancyPoster();
                    };


                }
            };
        }]);
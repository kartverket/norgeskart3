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

                    scope.calculateElevationProfile = function () {
                        mainMenuFactory.loadXmlFile();
                        mainMenuFactory.generateElevationProfile();
                        scope.elevationImage = mainMenuFactory.getElevationImage();
                    };

                    scope.generateEmergencyPoster = function () {
                        var configPoster = mainMenuFactory.getEmergencyPosterConfig();
                        configPoster.locationName = "Trondheim";
                        configPoster.position1 = "63 grader 25 minutter 49 sekunder nord";
                        configPoster.position2 = "10 grader 23 minutter 32 sekunder  st";
                        configPoster.street = "i TRONDHEIM kommune";
                        configPoster.place = "Trondheim kommune";
                        configPoster.matrikkel = "402/375 i TRONDHEIM";
                        configPoster.utm = "32V 569481 N 7034305";
                        configPoster.posDez = "N63.4303 - 10.3922";
                        mainMenuFactory.updateEmergencyPosterConfig(configPoster);
                        mainMenuFactory.generateEmergancyPoster();
                    };


                }
            };
        }]);
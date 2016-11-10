angular.module('menuElevationProfile')
    .directive('menuElevationProfile', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfile.html',
                restrict: 'A',
                link: function(scope){
                    var _elevationProfileActive = false;

                    /*
                     Drawing tools start
                     */
                    function _startDrawing (style) {
                        var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                        toolsFactory.setAddFeatureType(style, "AddLayerFeature");
                        toolsFactory.activateTool(addFeatureTool);
                    }
                    /*
                     Drawing tools end
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
                }
            };
        }]);
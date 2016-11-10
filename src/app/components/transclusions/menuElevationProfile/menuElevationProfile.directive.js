angular.module('menuElevationProfile')
    .directive('menuElevationProfile', ['toolsFactory', 'ISY.EventHandler','toolsElevationProfileFactory',
        function(toolsFactory,eventHandler, toolsElevationProfileFactory) {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfile.html',
                restrict: 'A',
                link: function(scope){
                    var _elevationProfileActive = false;

                    /*
                     Events start
                     */
                    function _addLayerFeatureEnd(feature){
                        var multiLineString=new ol.geom.MultiLineString();
                        multiLineString.appendLineString(feature.getGeometry());
                        var newFeature = new ol.Feature({
                            geometry: multiLineString
                        });
                        if (_elevationProfileActive){
                            var gpxFormat=new ol.format.GPX();
                            var gpx=gpxFormat.writeFeatures([newFeature],{
                                featureProjection: 'EPSG:25833',
                                dataProjection: 'EPSG:4326'
                            });
                            toolsElevationProfileFactory.generateElevationProfile(gpx);
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
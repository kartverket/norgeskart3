angular.module('menuElevationProfilePage1')
    .directive('menuElevationProfilePage1', ['toolsFactory', 'ISY.EventHandler','$timeout',
        function(toolsFactory,eventHandler, $timeout) {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfilePage1/menuElevationProfilePage1.html',
                restrict: 'A',
                link: function (scope) {
                    scope.allowGeneratingElevationProfile=false;
                    function _initTab() {
                        $('#myElevationTabs a[data-target="#drawProfile"]').tab('show');
                    }

                    _initTab();

                    /*
                     Events start
                     */
                    function _addLayerFeatureEnd(feature) {
                        scope.setImageExits(false);
                        var multiLineString = new ol.geom.MultiLineString();
                        multiLineString.appendLineString(feature.getGeometry());
                        var newFeature = new ol.Feature({
                            geometry: multiLineString
                        });
                        if (scope.elevationProfileActive) {
                            var gpxFormat = new ol.format.GPX();
                            var gpx = gpxFormat.writeFeatures([newFeature], {
                                featureProjection: 'EPSG:25833',
                                dataProjection: 'EPSG:4326'
                            });
                            scope.updateGpx(gpx);
                        }
                        scope.allowGeneratingElevationProfile=true;
                        $timeout(scope.$apply(),0);
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.AddLayerFeatureEnd, _addLayerFeatureEnd);

                    /*
                     Events end
                     */

                    /*
                     Drawing tools start
                     */
                    function _startDrawing(style) {
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

                    scope.drawLineElevation = function () {
                        scope.setElevationProfileActive(true);

                        scope.elevationImage = undefined;
                        _startDrawing("Line");
                    };


                    scope.uploadGpxFile = function () {
                    };
                    /*
                     Calculate elevation profile end
                     */

                }
            };
        }]
    );



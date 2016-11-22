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
                        var multiLineString;
                        var newFeature = feature;
                        if(feature.getGeometry().getType() === 'LineString'){
                                multiLineString = new ol.geom.MultiLineString();
                                multiLineString.appendLineString(feature.getGeometry());
                                newFeature = new ol.Feature({
                                    geometry: multiLineString
                                });
                        }

                        if (scope.elevationProfileActive) {
                            var gpxFormat = new ol.format.GPX();
                            var gpx = gpxFormat.writeFeatures([newFeature], {
                                featureProjection: 'EPSG:25833',
                                dataProjection: 'EPSG:4326'
                            });
                            scope.updateGpx(gpx);
                        }
                        scope.allowGeneratingElevationProfile=true;
                        if(false){ $timeout(scope.$apply(),0);}
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.AddLayerFeatureEnd, _addLayerFeatureEnd);

                    /*
                     Events end
                     */

                    /*
                     Drawing tools start
                     */
                    function _startDrawing(style, features) {
                        var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                        addFeatureTool.additionalOptions['features'] = features;
                        toolsFactory.setAddFeatureType(style, "AddLayerFeature");
                        toolsFactory.activateTool(addFeatureTool);
                    }

                    /*
                     Drawing tools end
                     */


                    /*
                     Calculate elevation profile start
                     */

                    scope.drawLineElevation = function (features) {
                        scope.setElevationProfileActive(true);

                        scope.elevationImage = undefined;
                        _startDrawing("Line", features);
                    };


                    scope.uploadGpxFile = function () {
                    };
                    /*
                     Calculate elevation profile end
                     */

                    $("#clickInput").click(function () {
                        $("#files").click();
                    });

                    scope.removeGeometry = function () {
                        scope.deactivateDrawFeatureTool(scope.GeoJSON);
                        scope.deactivateAddLayerFeatureTool();
                        scope.setElevationProfileActive(false);
                    };


                }
            };
        }]
    )
    .directive("fileread", [function () {
        return {
            link: function (scope, element) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.updateGpx(loadEvent.target.result);
                            scope.setAllowGeneratingElevationProfile(true);
                            scope.drawLineElevation(loadEvent.target.result);
                        });
                    };
                    var file=changeEvent.target.files[0];
                    scope.filePath = changeEvent.target.value;
                    reader.readAsText(file);
                });
            }
        };
    }]);



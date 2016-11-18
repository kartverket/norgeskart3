angular.module('menuElevationProfile')
    .directive('menuElevationProfile', [
        function() {
            return {
                templateUrl: 'components/transclusions/menuElevationProfile/menuElevationProfile.html',
                restrict: 'A',
                controller: 'menuElevationProfileController',
                link: function () {
                    // scope.allowGeneratingElevationProfile=false;
                    // var _elevationProfileActive = false;
                    // var gpx;
                    //
                    // /*
                    //  Events start
                    //  */
                    // function _addLayerFeatureEnd(feature) {
                    //     var multiLineString = new ol.geom.MultiLineString();
                    //     multiLineString.appendLineString(feature.getGeometry());
                    //     var newFeature = new ol.Feature({
                    //         geometry: multiLineString
                    //     });
                    //     if (_elevationProfileActive) {
                    //         var gpxFormat = new ol.format.GPX();
                    //         gpx = gpxFormat.writeFeatures([newFeature], {
                    //             featureProjection: 'EPSG:25833',
                    //             dataProjection: 'EPSG:4326'
                    //         });
                    //     }
                    //     scope.allowGeneratingElevationProfile=true;
                    //     $timeout(scope.$apply(),0);
                    // }
                    //
                    // eventHandler.RegisterEvent(ISY.Events.EventTypes.AddLayerFeatureEnd, _addLayerFeatureEnd);
                    //
                    // /*
                    //  Events end
                    //  */
                    //
                    // /*
                    //  Drawing tools start
                    //  */
                    // function _startDrawing(style) {
                    //     var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
                    //     toolsFactory.setAddFeatureType(style, "AddLayerFeature");
                    //     toolsFactory.activateTool(addFeatureTool);
                    // }
                    //
                    // /*
                    //  Drawing tools end
                    //  */
                    //
                    //
                    // /*
                    //  Calculate elevation profile start
                    //  */
                    //
                    // scope.drawLineElevation = function () {
                    //     _elevationProfileActive = true;
                    //     scope.elevationImage = undefined;
                    //     _startDrawing("Line");
                    // };
                    //
                    // scope.calculateElevationProfile = function () {
                    //     if (scope.fileread) {
                    //         gpx = scope.fileread;
                    //     }
                    //     if (gpx) {
                    //         toolsElevationProfileFactory.generateElevationProfile(gpx).then(
                    //             function () {
                    //                 scope.elevationImage = toolsElevationProfileFactory.getElevationImage();
                    //             });
                    //     }
                    //     _elevationProfileActive = false;
                    // };
                    // scope.uploadGpxFile = function () {
                    // };
                    // /*
                    //  Calculate elevation profile end
                    //  */
                    // scope.viewElevationProfile = function () {
                    //     scope.elevationImage = toolsElevationProfileFactory.getElevationImage();
                    // };
                }
            };
        }]);

    // .directive("fileread", [function () {
    //     return {
    //         link: function (scope, element) {
    //             element.bind("change", function (changeEvent) {
    //                 var reader = new FileReader();
    //                 reader.onload = function (loadEvent) {
    //                     scope.$apply(function () {
    //                         scope.fileread = loadEvent.target.result;
    //                         scope.allowGeneratingElevationProfile=true;
    //                     });
    //                 };
    //                 var file=changeEvent.target.files[0];
    //                 reader.readAsText(file);
    //             });
    //         }
    //     };
    // }]);
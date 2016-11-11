angular
    .module('tools')
    .factory('toolsElevationProfileFactory', ['mainAppService','$http', '$q',
        function(mainAppService, $http, $q) {
            var elevationImage, gpxUrl;
            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side

            var _uploadGpxFile = function (gpx) {
                var deferred = $q.defer();
                $http.post(mainAppService.uploadGpxFileService(),gpx).then(
                    function (gpxUrlResult) {
                        console.log("Generate elevation in progress...");
                        elevationImage = undefined;
                        gpxUrl = gpxUrlResult.data;
                        _generateElevationChart(deferred);
                    },
                    function (error) {
                        console.log("_uploadGpxFile error: ", error);
                    }
                );
                return deferred;
            };

            var _generateElevationChart = function (deferred) {

                $http.get(mainAppService.generateElevationChartServiceUrl(gpxUrl)).then(
                    function (result) {
                        var dataXml=jQuery.parseXML(result.data);
                        var exception=dataXml.getElementsByTagName("wps:Exception");
                        if(exception.length > 0){
                            console.log('ERROR: Exception from WPS-server "' + exception[0].getAttribute('exceptionCode') + '"');
                            return;
                        }
                        var reference = dataXml.getElementsByTagName("wps:Reference")[0];
                        elevationImage = reference.getAttribute("xlink:href");
                        deferred.resolve(elevationImage);
                    },
                    function (error) {
                        console.log("_generateElevationChart error: ", error);
                    }
                );
            };

            return {

                generateElevationProfile: function (gpx) {
                    return _uploadGpxFile(gpx).promise;
                },

                getElevationImage: function () {
                    return elevationImage;
                }
            };
        }]);
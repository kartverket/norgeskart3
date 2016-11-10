angular
    .module('tools')
    .factory('toolsElevationProfileFactory', ['mainAppService','$http',
        function(mainAppService, $http) {
            var elevationImage, gpxUrl;
            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side

            var _uploadGpxFile = function (gpx) {
                $http.post(mainAppService.uploadGpxFileService(),gpx).then(
                    function (gpxUrlResult) {
                        console.log("Generate elevation in the progress...");
                        elevationImage = undefined;
                        gpxUrl = gpxUrlResult;
                        _generateElevationChart();
                    },
                    function (error) {
                        console.log("_uploadGpxFile error: ", error);
                    }
                );
            };

            var _generateElevationChart = function () {
                $http.get(mainAppService.generateElevationChartServiceUrl(gpxUrl)).then(
                    function (result) {
                        var dataXml=jQuery.parseXML(result.data);
                        var exception=dataXml.getElementsByTagName("Exception");
                        if(exception){
                            console.log('ERROR: Exception from WPS-server "' + exception[0].getAttribute('exceptionCode') + '"');
                            return;
                        }
                        var reference = dataXml.getElementsByTagName("Reference")[0];
                        elevationImage = reference.getAttribute("xlink:href");
                        console.log(elevationImage);
                    },
                    function (error) {
                        console.log("_generateElevationChart error: ", error);
                    }
                );
            };

            return {

                generateElevationProfile: function (gpx) {
                    _uploadGpxFile(gpx);
                },

                getElevationImage: function () {
                    return elevationImage;
                }
            };
        }]);
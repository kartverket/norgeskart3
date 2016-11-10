angular
    .module('tools')
    .factory('toolsElevationProfileFactory', ['mainAppService',
        function(mainAppService) {
            var xmlFile, elevationImage, gpxUrl;
            var coordinates = [];

            var _uploadGpxFile = function (gpx) {
                $.ajax({
                    type: "POST",
                    url: mainAppService.uploadGpxFileService(),
                    async: false,
                    data: gpx,
                    success: function (gpxUrlResult) {
                        console.log("Generate elevation in the progress...");
                        elevationImage = undefined;
                        gpxUrl = gpxUrlResult;

                    },
                    error: function (error) {
                        console.log("_uploadGpxFile error: ", error);
                    }
                });
            };

            var _generateElevationChart = function () {
                $.ajax({
                    type: "GET",
                    url: mainAppService.generateElevationChartServiceUrl(gpxUrl),
                    async: false,
                    success: function (result) {
                        var reference = result.getElementsByTagName("Reference")[0];
                        elevationImage = reference.getAttribute("xlink:href");
                        console.log(elevationImage);
                    },
                    error: function (error) {
                        console.log("_generateElevationChart error: ", error);
                    }
                });
            };

            return {

                loadXmlFile: function () {
                    $.ajax({
                        type: "GET",
                        url: "elevationProfile.xml",
                        async: false,
                        success: function (result) {
                            xmlFile = result;
                        },
                        error: function (error) {
                            console.log("Error load xml file: ", error);
                        }
                    });
                },

                generateElevationProfile: function (gpx) {
                    _uploadGpxFile(gpx);
                    _generateElevationChart();
                },

                getElevationImage: function () {
                    return elevationImage;
                },

                uploadCoordinates: function (data) {
                    coordinates = data;
                    _generateGpxFile();
                }
            };
        }]);
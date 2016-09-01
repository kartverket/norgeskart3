angular
    .module('mainMenu')
    .factory('mainMenuFactory', ['mainAppService',
        function(mainAppService) {

            var xmlFile;
            var elevationImage;
            var serializer_ = new XMLSerializer();
            var gpxUrl;

            var _uploadGpxFile = function () {
                var serializerXml = serializer_.serializeToString(xmlFile);
                $.ajax({
                    type: "POST",
                    url: mainAppService.uploadGpxFileService(),
                    async: false,
                    data: serializerXml,
                    success: function (gpxUrlResult) {
                        console.log("Generate elevation in the progress...");
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

            var emergencyPosterConfig = {
                'locationName': '',
                'position1': '',
                'position2': '',
                'street': '',
                'place':'',
                'matrikkel':'',
                'utm':'',
                'posDez':'',
                'map':''
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

                generateElevationProfile: function () {
                    _uploadGpxFile();
                    _generateElevationChart();
                },

                generateEmergancyPoster: function () {
                    mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
                },

                getElevationImage: function () {
                    return elevationImage;
                },

                getEmergencyPosterConfig: function () {
                    return emergencyPosterConfig;
                },

                updateEmergencyPosterConfig: function (config) {
                    emergencyPosterConfig = config;
                }


            };
        }]);

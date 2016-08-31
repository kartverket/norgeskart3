angular
    .module('mainMenu')
    .factory('mainMenuFactory', ['mainAppService',
        function(mainAppService) {

            var xmlFile;
            var elevationImage;
            var serializer_ = new XMLSerializer();

            return {

                loadXmlFile: function () {
                    $.ajax({
                        type: "GET",
                        url: "test.xml",
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
                    var serializerXml = serializer_.serializeToString(xmlFile);
                    $.ajax({
                        type: "POST",
                        url: mainAppService.uploadGpxFileService(),
                        async: false,
                        data: serializerXml,
                        success: function (gpxUrl) {
                            console.log("Generate elevation in the progress...");
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
                                    console.log("GenerateElevationProfile image error: ", error);
                                }
                            });
                        },
                        error: function (error) {
                            console.log("GenerateElevationProfile error: ", error);
                        }
                    });
                },

                getElevationImage: function () {
                    return elevationImage;
                }


            };
        }]);

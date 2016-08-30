angular
    .module('mainMenu')
    .factory('mainMenuFactory', ['mainAppService',
        function(mainAppService) {

            var gpxData = {};
            var xmlGpx;
            var gpxUrl;

            var serializer_ = new XMLSerializer();

            return {

                loadXml: function () {
                    $.ajax({
                        type: "GET",
                        url: "test.xml",
                        async: false,
                        success: function (result) {
                            console.log("xml file: ", result);
                            xmlGpx = result;
                        }
                    });
                },

                uploadGpxFile: function(){
                    var test = serializer_.serializeToString(gpxData);
                    $.ajax({
                        type: "POST",
                        url: mainAppService.uploadGpxFile(),
                        async: false,
                        data: test,
                        success: function (result) {
                            gpxUrl = result;
                            console.log("Gpx result ", result);
                        },
                        error: function (error) {
                            console.log("Gpx error: ", error);
                        }
                    });
                },

                setGpxData: function(data){
                    gpxData = data;
                },

                getXmlFile: function () {
                    return xmlGpx;
                },

                getGpxUrl: function () {
                    return gpxUrl;
                }



            };
        }]);

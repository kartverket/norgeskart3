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

            var _generateGpxFile = function () {
                var xmlString = '<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="OpenLayers" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"></gpx>';
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xmlString, "text/xml");
                var nodetrk = xmlDoc.createElement("trk");
                var elements = xmlDoc.getElementsByTagName("gpx");
                elements[0].appendChild(nodetrk);
                var nodename = xmlDoc.createElement("name");
                nodename.innerHTML = "Høydeprofil";
                var nodedesc = xmlDoc.createElement("desc");
                nodedesc.innerHTML = "No description available";
                var nodetrkseg = xmlDoc.createElement("trkseg");
                var elementtrk = xmlDoc.getElementsByTagName("trk");
                elementtrk[0].appendChild(nodename);
                elementtrk[0].appendChild(nodedesc);
                elementtrk[0].appendChild(nodetrkseg);

                var elementtrkseg = xmlDoc.getElementsByTagName("trkseg");

                for (var i = 0; i < coordinates.length; i++){
                    var nodetrkpt = xmlDoc.createElement("trkpt");
                    nodetrkpt.setAttribute("lon", coordinates[i][0]);
                    nodetrkpt.setAttribute("lat", coordinates[i][1]);
                    elementtrkseg[0].appendChild(nodetrkpt);
                }
                xmlFile = xmlDoc;
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
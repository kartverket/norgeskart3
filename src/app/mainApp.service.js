angular.module('mainApp')
    .service('mainAppService', ['$http',
            function(){
                var url = 'http://www.norgeskart.no/';
                // var urlGeonorge = 'http://ws.geonorge.no/';

                this.uploadGpxFileService = function () {
                    return url + 'ws/upload-gpx.py';
                };

                this.generateElevationChartServiceUrl = function (gpxFile) {
                    var serviceUrl = "http://openwps.statkart.no/skwms1/wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=";
                    return serviceUrl + "[gpx=" + gpxFile + "] ";
                };

                this.generateEmergencyPosterServiceUrl = function (config) {

                    var position1 = encodeURIComponent(config.position1);
                    var position2 = encodeURIComponent(config.position2);
                    var street = encodeURIComponent(config.street);
                    var place = encodeURIComponent(config.place);
                    var matrikkel = encodeURIComponent(config.matrikkel);
                    var utm = encodeURIComponent(config.utm);
                    var posDez = encodeURIComponent(config.posDez);

                    return "http://ws.geonorge.no/fop/fop?locationName=" + config.locationName + "&position1=" + position1 + "&position2=" + position2 +
                        "&street=" + street + "&place=" + place + "&matrikkel=" + matrikkel + "&utm=" + utm + "&posDez=" + posDez + "&" + "map=http%3A%2F%2Fopenwms.statkart.no%2Fskwms1%2Fwms.topo2%3Fservice%3DWMS%26request%3DGetMap%26CRS%3DEPSG%3A32633%26FORMAT%3Dimage%252Fjpeg%26BGCOLOR%3D0xFFFFFF%26TRANSPARENT%3Dfalse%26LAYERS%3Dtopo2_WMS%26VERSION%3D1.3.0%26WIDTH%3D1145%26HEIGHT%3D660%26BBOX%3D268879.734375%2C7041158.8671875%2C271524.265625%2C7042481.1328125";

                };

            }
        ]
    );

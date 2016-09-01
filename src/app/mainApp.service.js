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
                    var configUrl = config.locationName + "&position1=" + config.position1 + "&position2=" + config.position2 + "&street=" +
                        config.street + "&place=" + config.place + "&matrikkel=" + config.matrikkel + "&utm=" + config.utm + "&posDez=" + config.posDez + "&map=";

                    var encodeUrl = encodeURIComponent(configUrl);
                    console.log(encodeUrl);
                };

            }
        ]
    );

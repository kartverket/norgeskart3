angular.module('mainApp')
    .service('mainAppService', ['$http',
            function(){
                var url = 'http://www.norgeskart.no/';

                this.uploadGpxFileService = function () {
                    return url + 'ws/upload-gpx.py';
                };

                this.generateElevationChartServiceUrl = function (gpxFile) {
                    var serviceUrl = "http://openwps.statkart.no/skwms1/wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=";
                    return serviceUrl + "[gpx=" + gpxFile + "] ";
                };

            }
        ]
    );

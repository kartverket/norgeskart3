angular.module('mainApp')
    .service('mainAppService', ['$http',
            function(){
                var url = 'http://www.norgeskart.no/';
                var urlOpenWps = 'http://openwps.statkart.no/skwms1/';
                var urlOpenWms = 'http://openwms.statkart.no/skwms1/';
                // var urlGeonorge = 'http://ws.geonorge.no/';

                this.uploadGpxFileService = function () {
                    return url + 'ws/upload-gpx.py';
                };

                this.generateElevationChartServiceUrl = function (gpxFile) {
                    var serviceUrl = urlOpenWps + "wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=";
                    return serviceUrl + "[gpx=" + gpxFile + "] ";
                };

                this.generateMapLinkServiceUrl = function (config) {
                    var service = encodeURIComponent(config.service);
                    var request = encodeURIComponent(config.request);
                    var crs = encodeURIComponent(config.CRS);
                    var format = encodeURIComponent(config.FORMAT);
                    var bgcolor = encodeURIComponent(config.BGCOLOR);
                    var transparent = encodeURIComponent(config.TRANSPARENT);
                    var layers = encodeURIComponent(config.LAYERS);
                    var version = encodeURIComponent(config.VERSION);
                    var width = encodeURIComponent(config.WIDTH);
                    var height = encodeURIComponent(config.HEIGHT);
                    var bbox = encodeURIComponent(config.BBOX);

                    return urlOpenWms + "wms.topo2?service=" + service + "&request=" + request + "&CRS=" + crs + "&FORMAT=" + format + "&BGCOLOR=" + bgcolor + "&TRANSPARENT=" + transparent +
                            "&LAYERS=" + layers + "&VERSION=" + version + "&WIDTH=" + width + "&HEIGHT=" + height + "&BBOX=" + bbox;
                };

                this.generateEmergencyPosterServiceUrl = function (config) {

                    var position1 = encodeURIComponent(config.position1);
                    var position2 = encodeURIComponent(config.position2);
                    var street = encodeURIComponent(config.street);
                    var place = encodeURIComponent(config.place);
                    var matrikkel = encodeURIComponent(config.matrikkel);
                    var utm = encodeURIComponent(config.utm);
                    var posDez = encodeURIComponent(config.posDez);
                    var map = encodeURIComponent(config.map);

                    return "http://ws.geonorge.no/fop/fop?locationName=" + config.locationName + "&position1=" + position1 + "&position2=" + position2 +
                        "&street=" + street + "&place=" + place + "&matrikkel=" + matrikkel + "&utm=" + utm + "&posDez=" + posDez + "&map=" + map;

                };

            }
        ]
    );


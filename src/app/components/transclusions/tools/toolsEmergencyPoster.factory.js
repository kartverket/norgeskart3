angular
    .module('tools')
    .factory('toolsEmergencyPosterFactory', ['mainAppService', 'ISY.MapAPI.Map',
        function(mainAppService, map) {

            var emergencyPosterConfig = {
                locationName: '',
                position1: '',
                position2: '',
                street: '',
                place:'',
                matrikkel:'',
                utm:'',
                posDez:'',
                map:''
            };

            var emergencyMapConfig = {
                service: 'WMS',
                request: 'GetMap',
                CRS: 'EPSG:25833',
                FORMAT: 'image/jpeg',
                BGCOLOR: '0xFFFFFF',
                TRANSPARENT: 'false',
                LAYERS: 'topo2_WMS',
                VERSION: '1.3.0',
                WIDTH: '1145',
                HEIGHT: '660',
                BBOX: ''
            };

            var posterPosition;


            return {

                generateEmergancyPoster: function () {
                    map.SetCenter({
                        lon: posterPosition[0],
                        lat:posterPosition[1],
                        zoom: 10
                    });

                    var extent = map.GetExtent();
                    emergencyMapConfig.BBOX = extent[0] + "," + extent[1] + "," + extent[2] + "," + extent[3];
                    emergencyPosterConfig.map = mainAppService.generateMapLinkServiceUrl(emergencyMapConfig);

                    return mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
                },

                getEmergencyPosterConfig: function () {
                    return emergencyPosterConfig;
                },

                updateEmergencyPosterConfig: function (config) {
                    emergencyPosterConfig = config;
                },

                setPosterPosition: function (coor) {
                    posterPosition = coor;
                }

            };
        }]);

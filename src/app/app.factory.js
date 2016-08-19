angular.module('mapApp')
    .factory('mapAppFactory', [
        function(){

            var tempConfig = {
                "numZoomLevels": 18,
                "newMaxRes":  21664,
                "center": [
                    570130,7032300
                ],
                "groups": [],
                "zoom": 15,
                "layers": [
                    {
                        "id": "1992",
                        "isBaseLayer": true,
                        "subLayers": [
                            {
                                "title": "norges_grunnkart",
                                "source": "WMS",
                                "url": ["http://opencache.statkart.no/gatekeeper/gk/gk.open?LAYERS=norges_grunnkart"],
                                "gatekeeper": true,
                                "name": "norges_grunnkart",
                                "format": "image/png",
                                "coordinate_system": "EPSG:32632",
                                "id": "1992",
                                "tiled": true
                            }
                        ],
                        "visibleOnLoad": true
                    }
                ],
                "coordinate_system": "EPSG:32632",
                "extent": [
                    -2000000.0, 3500000.0, 3545984.0, 9045984.0
                ],
                "extentUnits": "m"
            };

            return {
                getMapConfig: function () {
                    return tempConfig;
                }
            };
        }]
    );
angular
    .module('mapOverlaysLayout')
    .factory('mapOverlaysLayoutFactory', ['ISY.MapAPI.Map',
        function (map) {

           var showSearchOverlay = true;
           var baseLayerName = '';

            return {
                setShowSearchOverlay: function (status) {
                        showSearchOverlay = status;
                },

                getShowSearchOverlay: function () {
                    return showSearchOverlay;
                },

                getSelectedBaseLayerName: function () {
                    return baseLayerName;
                },

                setBaseLayerByName: function (name) {
                    baseLayerName = name;
                },

                currentPosition: function (position) {
                    var fromEpsg = 'EPSG:4326';
                    var toEpsg = map.GetEpsgCode();
                    var geolocation = map.TransformCoordinates(fromEpsg, toEpsg, [position.coords.longitude, position.coords.latitude]);
                    map.SetCenter({
                        lon: geolocation[0],
                        lat: geolocation[1]
                    });
                    map.SetZoom(13);
                },

            };
    }
   ]);

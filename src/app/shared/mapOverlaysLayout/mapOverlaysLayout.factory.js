angular
    .module('mapOverlaysLayout')
    .factory('mapOverlaysLayoutFactory', [
        function () {

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
            };
    }
   ]);

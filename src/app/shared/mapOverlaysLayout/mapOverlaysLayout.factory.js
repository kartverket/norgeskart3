angular
    .module('mapOverlaysLayout')
    .factory('mapOverlaysLayoutFactory', [
        function() {

           var showSearchOverlay = true;


            return {
                setShowSearchOverlay: function (status) {
                        showSearchOverlay = status;
                },

                getShowSearchOverlay: function () {
                    return showSearchOverlay;
                }
            };


        }]);
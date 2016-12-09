angular
    .module('menuElevationProfile')
    .factory('menuElevationProfileFactory', [
        function() {

            var elevationProfileBtnIsActive = false;
            var elevationProfileActive = false;

            return {


                setElevationBtnActivity: function(value){
                    elevationProfileBtnIsActive = value;
                },

                getElevationBtnActivity: function () {
                    return elevationProfileBtnIsActive;
                },

                setElevationProfileActive: function (value) {
                    elevationProfileActive = value;
                },

                getElevationProfileActive: function () {
                    return elevationProfileActive;
                }

            };


        }]);
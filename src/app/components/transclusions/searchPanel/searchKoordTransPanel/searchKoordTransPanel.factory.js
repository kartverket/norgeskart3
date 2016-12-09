angular
    .module('searchKoordTransPanel')
    .factory('searchKoordTransPanelFactory', [
        function() {

            var keyCoord = '';
            var advancedCoordSystem = false;


            return {

                setLastSelectedCoorKey: function(key){
                    keyCoord = key;
                },

                getLastSelectedCoorKey: function () {
                    return keyCoord;
                },

                setAdvancedCoordSystem: function (value) {
                    advancedCoordSystem = value;
                },

                getAdvancedCoordSystem: function () {
                    return advancedCoordSystem;
                }

            };


        }]);
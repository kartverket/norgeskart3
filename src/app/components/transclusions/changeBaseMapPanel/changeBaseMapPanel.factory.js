angular
    .module('changeBaseMapPanel')
    .factory('changeBaseMapPanelFactory', [
        function() {

            var baseMaps = [
                {
                    "id": "land",
                    "title": "Land",
                    "symbol": "baseMap-land",
                    "isSelected" : false
                },
                {
                    "id": "raster",
                    "title": "Rasterkart",
                    "symbol": "baseMap-raster",
                    "isSelected" : false
                },
                {
                    "id": "aerial",
                    "title": "Flybilder",
                    "symbol": "baseMap-aerial",
                    "isSelected" : false
                }
            ];

            return {


                getAllBaseMaps: function(){
                    return baseMaps;
                },

                getSelectedBaseMap: function () {
                    for (var i = 0; i < baseMaps.length; i++){
                        if (baseMaps[i].isSelected){
                            return baseMaps[i];
                        }
                    }
                    return undefined;
                },

                setBaseMapById: function (id) {
                    if (id !== undefined){
                        for (var i = 0; i < baseMaps.length; i++){
                            baseMaps[i].isSelected = baseMaps[i].id.toLowerCase() === id.toLowerCase();
                        }
                    }
                },

                deactivateAllBaseMaps: function () {
                    for (var i = 0; i < baseMaps.length; i++){
                        baseMaps[i].isSelected = false;
                    }
                },

                lengthDeselectBaseMaps: function () {
                    var counter = 0;
                    for (var i = 0; i < baseMaps.length; i++){
                        if (!baseMaps[i].isSelected){
                            counter += 1;
                        }
                    }
                    return counter;
                }

            };


        }]);
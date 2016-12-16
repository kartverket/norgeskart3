angular
    .module('changeBaseLayerPanel')
    .factory('changeBaseLayerPanelFactory', [
        function() {

            var baseLayers = [
                {
                    "id": "land",
                    "title": "Land",
                    "symbol": "baseMap-land",
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


                getAllBaseLayers: function(){
                    return baseLayers;
                },

                getSelectedBaseLayer: function () {
                    for (var i = 0; i < baseLayers.length; i++){
                        if (baseLayers[i].isSelected){
                            return baseLayers[i];
                        }
                    }
                    return undefined;
                },

                setBaseLayerById: function (id) {
                    if (id !== undefined){
                        for (var i = 0; i < baseLayers.length; i++){
                            baseLayers[i].isSelected = baseLayers[i].id.toLowerCase() === id.toLowerCase();
                        }
                    }else{
                        this.deactivateAllBaseLayers();
                    }

                },

                deactivateAllBaseLayers: function () {
                    for (var i = 0; i < baseLayers.length; i++){
                        baseLayers[i].isSelected = false;
                    }
                }
            };


        }]);
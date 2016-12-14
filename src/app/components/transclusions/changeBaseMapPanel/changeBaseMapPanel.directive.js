angular.module('changeBaseMapPanel')
    .directive('changeBaseMapPanel', ['changeBaseMapPanelFactory','ISY.MapAPI.Map',
        function(changeBaseMapPanelFactory, map) {
            return {
                templateUrl: 'components/transclusions/changeBaseMapPanel/changeBaseMapPanel.html',
                restrict: 'A',
                link: function(scope){

                    scope.allBaseMaps = function () {
                        return changeBaseMapPanelFactory.getAllBaseMaps();
                    };

                    scope.toggleBaseMap = function (id) {
                        changeBaseMapPanelFactory.setBaseMapById(id);
                        var baseMapLayers = map.GetBaseLayers();
                        for (var i = 0; i < baseMapLayers.length; i++){
                            if (baseMapLayers[i].thumbnail === id){
                                map.SetBaseLayer(baseMapLayers[i]);
                            }
                        }
                    };

                    scope.activeBaseMap = function () {
                        return changeBaseMapPanelFactory.getSelectedBaseMap();
                    };

                    $(document).ready(function() {
                        var baseMapLayers = map.GetBaseLayers();
                        for (var i = 0; i < baseMapLayers.length; i++){
                            if (baseMapLayers[i].thumbnail !== '' && baseMapLayers[i].isVisible){
                                changeBaseMapPanelFactory.setBaseMapById(baseMapLayers[i].thumbnail);
                            }
                        }

                    });

                }
            };
        }]);
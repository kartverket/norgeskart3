angular.module('changeBaseLayerPanel')
    .directive('changeBaseLayerPanel', ['changeBaseLayerPanelFactory', 'ISY.MapAPI.Map',
        function (changeBaseLayerPanelFactory, map) {
            return {
                templateUrl: 'components/transclusions/changeBaseLayerPanel/changeBaseLayerPanel.html',
                restrict: 'A',
                link: function(scope){

                    scope.allBaseLayers = function () {
                        return changeBaseLayerPanelFactory.getAllBaseLayers();
                    };

                    scope.toggleBaseLayer = function (id) {
                        var baseMapLayers = map.GetBaseLayers();
                        for (var i = 0; i < baseMapLayers.length; i++){
                            if (baseMapLayers[i].thumbnail === id){
                                map.SetBaseLayer(baseMapLayers[i]);
                                changeBaseLayerPanelFactory.setBaseLayerById(id);
                            }
                        }
                    };

                    scope.activeBaseLayer = function () {
                        return changeBaseLayerPanelFactory.getSelectedBaseLayer();
                    };

                    _initBaseLayers = function(){
                        var baseMapLayers = map.GetBaseLayers();
                        for (var i = 0; i < baseMapLayers.length; i++) {
                            if (baseMapLayers[i].thumbnail !== '' && baseMapLayers[i].isVisible) {
                                changeBaseLayerPanelFactory.setBaseLayerById(baseMapLayers[i].thumbnail);
                            }
                        }
                    };

                    $(document).ready(function() {
                        _initBaseLayers();

                    });

                    scope.$on('initBaseLayers', function () {
                        _initBaseLayers();
                    });

                }
            };
        }]);
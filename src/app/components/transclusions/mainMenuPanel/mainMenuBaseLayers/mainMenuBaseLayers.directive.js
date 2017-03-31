angular.module('mainMenuBaseLayers')
    .directive('mainMenuBaseLayers', ['ISY.MapAPI.Map', 'changeBaseLayerPanelFactory','mapOverlaysLayoutFactory',
        function(map, changeBaseLayerPanelFactory,mapOverlaysLayoutFactory) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuBaseLayers/mainMenuBaseLayers.html',
                restrict: 'A',
                link: function(scope){

                    scope.baseLayers = map.GetBaseLayers();

                    scope.getBaseLayerStyle = function (baseLayer) {
                        if (baseLayer.isVisible){
                            return 'icon-radio-checked pointer-cursor';
                        }else{
                            return 'icon-radio-unchecked pointer-cursor';
                        }
                    };

                    scope.setAsBaseLayer = function (baseLayer) {
                        map.SetBaseLayer(baseLayer);
                        map.ZoomToLayer(baseLayer);
                        scope.baseLayers = map.GetBaseLayers();
                        mapOverlaysLayoutFactory.setBaseLayerByName(baseLayer.name);
                        if (baseLayer.thumbnail !== ""){
                            changeBaseLayerPanelFactory.setBaseLayerById(baseLayer.thumbnail);
                        }else{
                            changeBaseLayerPanelFactory.deactivateAllBaseLayers();
                        }
                    };

                }
            };
        }]);

angular.module('mainMenuBaseLayers')
    .directive('mainMenuBaseLayers', ['ISY.MapAPI.Map',
        function(map) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuBaseLayers/mainMenuBaseLayers.html',
                restrict: 'A',
                link: function(scope){

                    scope.baseLayers = map.GetBaseLayers();
                    console.log(scope.baseLayers);

                    scope.getBaseLayerStyle = function (baseLayer) {
                        if (baseLayer.isVisible){
                            return 'glyphicon glyphicon-ok-sign pointer-cursor';
                        }else{
                            return 'icon-radio-unchecked pointer-cursor';
                        }
                    };

                    scope.setAsBaseLayer = function (baseLayer) {
                        map.SetBaseLayer(baseLayer);
                        scope.baseLayers = map.GetBaseLayers();
                    };

                }
            };
        }]);
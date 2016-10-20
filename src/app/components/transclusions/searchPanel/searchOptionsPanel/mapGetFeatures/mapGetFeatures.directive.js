angular.module('mapGetFeatures')
    .directive('mapGetFeatures', ['ISY.EventHandler',
        function(eventHandler) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchOptionsPanel/mapGetFeatures/mapGetFeatures.html',
                restrict: 'A',
                link: function(scope){

                    scope.layers = [];

                    function _handleLoadingLayers(loadingLayers){
                        scope.layers = [];
                        for(var i = 0; i < loadingLayers.length; i++){
                            // console.log(loadingLayers[i]);
                            loadingLayers[i].show = false;
                            _addLoadingLayer(loadingLayers[i]);
                        }
                    }

                    function _getLoadingLayer(id){
                        for(var i = 0; i < scope.layers.length; i++){
                            var loadingLayer = scope.layers[i];
                            if(loadingLayer.id === id){
                                return loadingLayer;
                            }
                        }
                        return null;
                    }

                    function _addLoadingLayer(loadingLayer) {
                        scope.layers.push(loadingLayer);
                    }

                    function _loadResult(resultSet) {
                        var loadingLayer = _getLoadingLayer(resultSet.id);
                        if (loadingLayer !== null){
                            if(resultSet.exception){
                                loadingLayer.exception = resultSet.exception;
                                loadingLayer.hasException = true;
                            }
                            else {
                                if (resultSet.features !== undefined){
                                    if(resultSet.features.length > 0) {
                                        loadingLayer.features = resultSet.features;
                                        loadingLayer.hasFeatures = resultSet.showDialog;
                                    }
                                }
                            }

                            if(loadingLayer.hasFeatures){
                                loadingLayer.show = true;
                            }

                            for (var j = 0; j < scope.layers.length; j++){
                                scope.layers[j].open = false;
                            }

                            loadingLayer.isLoading = false;
                        }
                        // console.log(loadingLayer);
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.FeatureInfoStart, _handleLoadingLayers);
                    eventHandler.RegisterEvent(ISY.Events.EventTypes.FeatureInfoEnd, _loadResult);

                    scope.toggleLayer = function (layer) {
                        if (layer.open){
                            layer.open = false;
                        }else{
                            for (var i = 0; i < scope.layers.length; i++){
                                scope.layers[i].open = false;
                            }
                            layer.open = true;
                        }
                    };

                    scope.getFeatureName = function (index) {
                        return "#" + index+1;
                    };

                    scope.toggleFeature = function (layer, feature) {
                        if (feature.open){
                            feature.open = false;
                        }else{
                            for (var i = 0; i < layer.features.length; i++){
                                layer.features[i].open = false;
                            }
                            feature.open = true;
                        }
                    };

                }
            };
        }]);
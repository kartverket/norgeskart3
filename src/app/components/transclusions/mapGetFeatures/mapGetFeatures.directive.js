angular.module('mapGetFeatures')
    .directive('mapGetFeatures', ['ISY.EventHandler',
        function(eventHandler) {
            return {
                templateUrl: 'components/transclusions/mapGetFeatures/mapGetFeatures.html',
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

                                        //if (resultSet.features[0].attributes.length > 0){
                                        loadingLayer.features = resultSet.features;
                                        // loadingLayer.featureInfo = resultSet.featureInfoElement;
                                        // loadingLayer.featureInfoTitle = resultSet.featureInfoTitle;
                                        // loadingLayer.wms = resultSet.wms;
                                        loadingLayer.hasFeatures = resultSet.showDialog;
                                        // loadingLayer.hasFeatureInfoDetail = findFeatureInfoDetail(resultSet.featureInfoElement);
                                        // loadingLayer.openNewWindow = resultSet.openNewWindow;
                                        // loadingLayer.openParentWindow = resultSet.openParentWindow;
                                        // loadingLayer.windowWidth = resultSet.windowWidth;
                                        // loadingLayer.editable = resultSet.editable;
                                        // loadingLayer.attachment = resultSet.attachment;
                                        //}else if (resultSet.editable !== undefined){
                                        //    loadingLayer.editable = resultSet.editable;
                                        //}
                                    }
                                }
                            }

                            if(loadingLayer.hasFeatures){
                                loadingLayer.show = true;
                            }

                            loadingLayer.isLoading = false;
                        }
                        console.log(loadingLayer);
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.FeatureInfoStart, _handleLoadingLayers);
                    eventHandler.RegisterEvent(ISY.Events.EventTypes.FeatureInfoEnd, _loadResult);

                }
            };
        }]);
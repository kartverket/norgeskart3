angular.module('mapGetFeatures')
    .directive('mapGetFeatures', ['ISY.EventHandler',
        function(eventHandler) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchOptionsPanel/mapGetFeatures/mapGetFeatures.html',
                restrict: 'A',
                link: function(scope){

                    scope.layers = [];
                    scope.currentPage = 1;

                    function _handleLoadingLayers(loadingLayers){
                        scope.layers = [];
                        for(var i = 0; i < loadingLayers.length; i++){
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
                        scope.currentPage = 1;
                    };

                    scope.getFeatureName = function (index) {
                        var val = index + 1;
                        return "# " + val;
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

                    scope.isAnyLayerToShow = function () {
                        for (var i = 0; i < scope.layers.length; i++){
                            if (scope.layers[i].show){
                                return true;
                            }
                        }
                        return false;
                    };

                    scope.getVisibleFeatures = function (layer, index) {
                        var circleElement = document.getElementById("circle"+index);
                        if (layer !== undefined){
                            var numLength = getLength(layer.features.length);
                            if (numLength === 1){
                                circleElement.style.padding = "5px 8px 3px 8px";
                            }else{
                                circleElement.style.padding = "7px 7px 4px 7px";
                            }
                            return layer.features.length;
                        }else{
                            circleElement.style.padding = "5px 8px 3px 8px";
                            return 0;
                        }

                    };

                    function getLength(number) {
                        return number.toString().length;
                    }

                    scope.getIdByLayer = function (layer) {
                        console.log(layer);
                        return layer.id;
                    };

                    scope.pageChangeHandler = function (value) {
                        scope.currentPage = value;
                    };
                }
            };
        }]);
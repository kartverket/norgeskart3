angular.module('mainMenuGroupLayers')
    .directive('mainMenuGroupLayers', ['ISY.MapAPI.Map','mainMenuPanelFactory',
        function(map, mainMenuPanelFactory) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuGroupLayers/mainMenuGroupLayers.html',
                restrict: 'A',
                link: function(scope){

                    var overlayLayers = map.GetOverlayLayers();

                    scope.selectedProject = mainMenuPanelFactory.getSelectedProject();
                    scope.groupLayers = map.GetGroups();

                    var _updateGroupState = function(group){
                        if (group!==undefined){
                            var isyLayers = group.isyLayers || [];
                            group.isAllLayersSelected = true;
                            group.groupIsVisible = true;
                            group.isPartiallyVisible = false;
                            var bVisibleLayers = 0;
                            for (var i = 0; i < isyLayers.length; i++) {
                                if (!isyLayers[i].isVisible) {
                                    group.isAllLayersSelected = false;
                                    group.groupIsVisible = false;
                                }else{
                                    bVisibleLayers += 1;
                                }
                            }

                            if (bVisibleLayers !== isyLayers.length && bVisibleLayers !== 0){
                                group.isPartiallyVisible = true;
                            }
                        }
                    };

                    function _initGroups(){
                        overlayLayers.forEach(function(isyLayer){
                            isyLayer.groupId.forEach(function(catId){
                                var group = map.GetGroupById(catId);
                                if (group){
                                    group.isyLayers = group.isyLayers || [];
                                    group.isyLayers.push(isyLayer);
                                }
                            });
                        });
                        for(var c in scope.groupLayers){
                            _updateGroupState(scope.groupLayers[c]);
                        }
                    }

                    scope.getGroupStyleStatus = function (group) {
                        if (group.groupIsVisible){
                            return 'glyphicon glyphicon-ok-sign pointer-cursor';
                        }else if(group.isPartiallyVisible){
                            return 'glyphicon glyphicon-ok-circle pointer-cursor';
                        }else{
                            return 'icon-radio-unchecked pointer-cursor';
                        }
                    };

                    scope.getLayerStyleStatus = function (isyLayer) {
                        if (isyLayer.isVisible){
                            return 'glyphicon glyphicon-ok-sign pointer-cursor';
                        }else{
                            return 'icon-radio-unchecked pointer-cursor';
                        }
                    };

                    _initGroups();
                    console.log(scope.groupLayers);
                }
            };
        }]);
angular.module('mainMenuGroupLayers')
  .directive('mainMenuGroupLayers', ['ISY.MapAPI.Map', 'mainMenuPanelFactory',
    function (map, mainMenuPanelFactory) {
      return {
        templateUrl: 'components/transclusions/mainMenuPanel/mainMenuGroupLayers/mainMenuGroupLayers.html',
        restrict: 'A',
        link: function (scope) {

          var overlayLayers = map.GetOverlayLayers();

          scope.selectedProject = mainMenuPanelFactory.getSelectedProject();
          scope.groupLayers = map.GetGroups();

          var _updateGroupState = function (group) {
            if (group !== undefined) {
              var isyLayers = group.isyLayers || [];
              group.isAllLayersSelected = true;
              group.groupIsVisible = true;
              group.isPartiallyVisible = false;
              var bVisibleLayers = 0;
              for (var i = 0; i < isyLayers.length; i++) {
                if (!isyLayers[i].isVisible) {
                  group.isAllLayersSelected = false;
                  group.groupIsVisible = false;
                } else {
                  bVisibleLayers += 1;
                }
              }

              if (bVisibleLayers !== isyLayers.length && bVisibleLayers !== 0) {
                group.isPartiallyVisible = true;
              }
            }
          };

          var _updateGroupStateByLayer = function (layer, groupLayers) {
            groupLayers.forEach(function (group) {
              layer.groupId.forEach(function (layerCatId) {
                if (group.groupId === layerCatId) {
                  _updateGroupState(group);
                }
              });
            });
          };

          function _initGroups() {
            overlayLayers.forEach(function (isyLayer) {
              isyLayer.groupId.forEach(function (catId) {
                var group = map.GetGroupById(catId);
                if (group) {
                  group.isyLayers = group.isyLayers || [];
                  group.isyLayers.push(isyLayer);
                }
              });
            });
            for (var c in scope.groupLayers) {
              _updateGroupState(scope.groupLayers[c]);
            }
          }

          scope.removeGroups = function () {
            overlayLayers.forEach(function (isyLayer) {
              isyLayer.groupId.forEach(function (catId) {
                var group = map.GetGroupById(catId);
                if (group) {
                  group.isyLayers = [];
                }
              });
            });
            for (var c in scope.groupLayers) {
              scope.groupLayers[c].isOpen = false;
            }

          };

          scope.getGroupStyleStatus = function (group) {
            if (group.groupIsVisible) {
              return 'fa fa-check-square pointer-cursor';
            } else if (group.isPartiallyVisible) {
              return 'fa fa-check-square-o pointer-cursor';
            } else {
              return 'glyphicon glyphicon-unchecked pointer-cursor';
            }
          };

          scope.getLayerStyleStatus = function (isyLayer) {
            if (isyLayer.isVisible) {
              return 'fa fa-check-square pointer-cursor';
            } else {
              return 'glyphicon glyphicon-unchecked pointer-cursor';
            }
          };

          scope.checkMatrikkel = function (group) {
            if (group.name === 'matrikkel_data') {
              return true;
            } else {
              return false;
            }
          };

          scope.groupFilter = function (group) {
            if (group.groupIsVisible || group.isPartiallyVisible) {
              return group;
            }
          };
          scope.legendFilter = function (isyLayer) {
            if (isyLayer.isVisible && isyLayer.subLayers[0].legendGraphicUrl) {
              return isyLayer;
            }
          };
          scope.GetLegendGraphicUrl = function (isyLayer) {
            if (isyLayer.isVisible) {
              return isyLayer.subLayers[0].legendGraphicUrl;
            } else {
              return '';
            }
          };

          scope.toggleLayer = function (isyLayer) {
            if (!scope.onlyOneGroup || isyLayer.groupId.indexOf(999) > -1) {
              if (isyLayer.isVisible) {
                map.HideLayer(isyLayer);
                isyLayer.styles = undefined;
              } else {
                isyLayer.previewActive = false;
                map.ShowLayer(isyLayer);
              }
              _updateGroupStateByLayer(isyLayer, scope.groupLayers);
            }
          };

          scope.toggleGroup = function (group) {
            // console.log(group);
            if (!group.isAllLayersSelected) { //select all layers
              if (group.isyLayers !== undefined) {
                if (scope.onlyOneGroup && group.groupId !== 999) {
                  scope.groupLayers.forEach(function (groupLayer) {
                    if (groupLayer.groupId !== 999) {
                      for (var i = 0; i < groupLayer.isyLayers.length; i++) {
                        map.HideLayer(groupLayer.isyLayers[i]);
                        groupLayer.isyLayers[i].styles = undefined;
                        _updateGroupStateByLayer(groupLayer.isyLayers[i], scope.groupLayers);
                      }
                    }
                  });
                }
                for (var i = 0; i < group.isyLayers.length; i++) {
                  map.ShowLayer(group.isyLayers[i]);
                  _updateGroupStateByLayer(group.isyLayers[i], scope.groupLayers);
                }
              }
              // if (group.subCategories !== undefined) {
              //     group.subCategories.forEach(scope.selectLayers);
              // }
            } else { // deselect all layers
              if (group.isyLayers !== undefined) {
                for (var j = 0; j < group.isyLayers.length; j++) {
                  map.HideLayer(group.isyLayers[j]);
                  group.isyLayers[j].styles = undefined;
                  _updateGroupStateByLayer(group.isyLayers[j], scope.groupLayers);
                }
              }
              // if (group.subCategories !== undefined) {
              //     group.subCategories.forEach(scope.toggleGroup);
              // }
            }
          };

          function _resetGroups() {
            for (var i = 0; i < scope.groupLayers.length; i++) {
              if (scope.groupLayers[i].isyLayers !== undefined) {
                if (scope.groupLayers[i].isyLayers.length > 0) {
                  scope.groupLayers[i].isyLayers = [];
                }
              }
            }
          }

          _resetGroups();
          _initGroups();
          // console.log(scope.groupLayers);
        }
      };
    }
  ]);

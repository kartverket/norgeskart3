angular.module('mainMenuGroupLayers')
  .directive('mainMenuGroupLayers', ['ISY.MapAPI.Map', 'ISY.MapAPI.Groups', 'mainMenuPanelFactory', '$translate',
    function (map, mapGroups, mainMenuPanelFactory, $translate) {
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
            return group.name === 'matrikkel_data';
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

          scope.hasVisibleNRLLayers = function() {
            var overlayLayers = map.GetOverlayLayers();
            for (var i = 0; i < overlayLayers.length; i++) {
              var layer = overlayLayers[i];
              if (layer.isVisible) {
                // Check if this is an NRL layer
                var lowerName = layer.name ? layer.name.toLowerCase() : '';
                var isNRLLayer = lowerName.indexOf('luftfart') > -1 ||
                               lowerName.indexOf('hinder') > -1 ||
                               lowerName.indexOf('obstacle') > -1 ||
                               lowerName.indexOf('nrl') > -1;

                // Also check by groupId (typically 4 for NRL)
                if (!isNRLLayer && layer.groupId) {
                  isNRLLayer = layer.groupId.indexOf(4) > -1;
                }

                if (isNRLLayer) {
                  return true;
                }
              }
            }
            return false;
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
                // Check if this is an NRL layer and show warning
                _checkAndShowNRLWarning(isyLayer);
              }
              _updateGroupStateByLayer(isyLayer, scope.groupLayers);
            }
          };

          var _checkAndShowNRLWarning = function(isyLayer) {
            // Check if the layer belongs to NRL (Luftfartshindre) group
            // NRL layers typically have groupId 4 or name containing 'luftfart', 'hinder', 'obstacle'
            var isNRLLayer = false;

            // Check by name patterns
            if (isyLayer.name) {
              var lowerName = isyLayer.name.toLowerCase();
              isNRLLayer = lowerName.indexOf('luftfart') > -1 ||
                          lowerName.indexOf('hinder') > -1 ||
                          lowerName.indexOf('obstacle') > -1 ||
                          lowerName.indexOf('nrl') > -1;
            }

            // Check by groupId (typically 4 for NRL)
            if (!isNRLLayer && isyLayer.groupId) {
              isNRLLayer = isyLayer.groupId.indexOf(4) > -1;
            }

            if (isNRLLayer) {
              // Use the parent scope's showMessage function
              if (scope.$parent && scope.$parent.showMessage) {
                var translatedMessage = $translate.instant('nrl_warning_message');
                scope.$parent.showMessage(translatedMessage, 'warning');
              }
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
                var sortedLayers = JSON.parse(JSON.stringify(group.isyLayers));
                sortedLayers.sort(function (a, b) {
                  return a.order - b.order;
                });
                var getSortedLayer = function (id) {
                  return group.isyLayers.filter(function (el) {
                    return el.id == id;
                  })[0];
                };
                for (var i = 0; i < sortedLayers.length; i++) {
                  var tmpLayer = getSortedLayer(sortedLayers[i].id);
                  map.ShowLayer(tmpLayer);
                  _updateGroupStateByLayer(tmpLayer, scope.groupLayers);
                  // Check if showing NRL layers
                  if (i === 0) { // Only show warning once per group
                    _checkAndShowNRLWarning(tmpLayer);
                  }
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

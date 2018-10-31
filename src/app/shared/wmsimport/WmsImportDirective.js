angular.module('gnWmsImport', ['gn_ows', 'gn_alert', 'gn_map_service', 'gnConfig'])
  /**
   * @ngdoc directive
   * @name gn_viewer.directive:gnWmsImport
   *
   * @description
   * Panel to load WMS capabilities service and pick layers.
   * The server list is given in global properties.
   */
  .directive('gnWmsImport', [
    'gnOwsCapabilities',
    'gnMap',
    '$translate',
    '$timeout',
    //'gnSearchManagerService',
    //'Metadata',
    'localStorageFactory',
    function (gnOwsCapabilities, gnMap, $translate, $timeout, localStorageFactory) {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: 'shared/wmsimport/partials/wmsimport.html',
        scope: {
          map: '=gnWmsImportMap',
          url: '=?gnWmsImportUrl'
        },
        controller: ['$scope', function ($scope) {

          /**
           * Transform a capabilities layer into an ol.Layer
           * and add it to the map.
           *
           * @param {Object} getCapLayer
           * @return {*}
           */
          this.addLayer = function (getCapLayer) {
            if (!getCapLayer) {
              return;
            }
            
            getCapLayer.version =  "1.3.0"; //$scope.capability.version;
            angular.forEach($scope.url, function (url) {
              if (url.startsWith(getCapLayer.url)) {
                getCapLayer.url = url;
              }
            });
            var layer;
            if ($scope.format === 'wms') {
              layer = gnMap.addWmsToMapFromCap($scope.map, getCapLayer);
              return layer;
            } else if ($scope.format === 'wfs') {
              layer = gnMap.addWfsToMapFromCap($scope.map, getCapLayer, $scope.url);
              return layer;
            } else if ($scope.format === 'wmts') {
              return gnMap.addWmtsToMapFromCap($scope.map, getCapLayer, $scope.capability);
            }
          };
        }],
        link: function (scope, element, attrs, controller) {
          scope.loading = false;
          scope.format = attrs['gnWmsImport'] !== '' ? attrs['gnWmsImport'] : 'all';
          scope.serviceDesc = null;
          scope.catServicesList = [];
          scope.layerList = [];
          var type = scope.format.toUpperCase();

          scope.$on('addWMSfromSearch', function (event, args) {
            if (localStorageFactory.get("addLayers")) {
              scope.layerList = localStorageFactory.get("addLayers").split(",");
            }
            scope.format = (args.type.split(":")[1] ? args.type.split(":")[1] : args.type).toLowerCase();
            scope.setUrl({
              url: args.url,
              type: scope.format || type
            });
          });
          scope.$on('addLayerFromWMS', function (event, layer) {
            scope.layerList.push(layer);
          });

          scope.setUrl = function (srv) {
            scope.url = angular.isObject(srv) ? srv.url : srv;
            scope.url = scope.url.replace(/\[|\]/g, "");
            scope.url = scope.url.split(',');
            type = angular.isObject(srv) && srv.type || type;
            scope.serviceDesc = angular.isObject(srv) ? srv : null;
            scope.load();
          };

          scope.load = function () {
            if (scope.url) {
              scope.loading = true;
              scope.capabilities = [];
              for (var i = 0; i < scope.url.length; i++) {
                gnOwsCapabilities['get' + type.toUpperCase() + 'Capabilities'](scope.url[i])
                  .then(function (capability) {
                    scope.loading = false;
                    scope.capabilities.push(capability);
                  })
                  .then(function () {
                    angular.forEach(scope.layerList, function (value) {
                      var addedLayer;
                      for (var i = 0; i < scope.capabilities.length; i++) {
                        if (scope.format === 'wms') {
                          addedLayer = controller.addLayer(
                            scope.capabilities[i].layers.filter(function (el) {
                              if (el.Name === value || el.Title.toLowerCase() === value.toLowerCase()) {
                                el.isLayerActive = true;
                                return true;
                              } else {
                                return false;
                              }
                            })[0]
                          );
                        } else if (scope.format === 'wfs') {
                          addedLayer = controller.addLayer(
                            scope.capabilities[i].featureTypeList.featureType.filter(function (el) {
                              if (el.title === value) {
                                el.isLayerActive = true;
                                return true;
                              } else {
                                return false;
                              }
                            })[0]
                          );
                        }
                      }
                      addedLayer.setVisible(true);
                    });
                  });
              }
            }
          };

          // watch url as input
          /*
          scope.$watch('url', function (value) {
            if (value) {
              scope.setUrl({
                url: value,
                type: scope.format
              });
            }
          });
            */

          if (localStorageFactory.get("wms")) {
            scope.format = "wms";
            scope.setUrl(localStorageFactory.get("wms"));
          } else if (localStorageFactory.get("wfs")) {
            scope.format = "wfs";
            scope.setUrl(localStorageFactory.get("wfs"));
          }
        }
      };
    }
  ])

  /**
   * @ngdoc directive
   * @name gn_wmsimport.directive:gnCapTree
   */
  .directive('gnCapTree', [
    function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          collection: '='
        },
        template: "<div class='list-group' ng-repeat='member in collection'>"+
        "<gn-cap-tree-col collection='member.Layer' selection='selection'></gn-cap-tree-col>"+
        "<gn-cap-tree-col collection='member.featureTypeList.featureType' selection='selection'></gn-cap-tree-col>"+
        "</div>"
      };
    }
  ])

    /**
   * @ngdoc directive
   * @name gn_wmsimport.directive:gnCapTreeCol
   *
   * @description
   * Directive to manage a collection of nested layers from
   * the capabilities document. This directive works with
   * gnCapTreeElt directive.
   */
  .directive('gnCapTreeCol', [
    function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          collection: '='
        },
        template: "<ul class='list-group'><gn-cap-tree-elt ng-repeat='member in collection' member='member'></gn-cap-tree-elt></ul>"
      };
    }
  ])



  /**
   * @ngdoc directive
   * @name gn_wmsimport.directive:gnCapTreeElt
   *
   * @description
   * Directive to manage recursively nested layers from a capabilities
   * document. Will call its own template to display the layer but also
   * call back the gnCapTreeCol for all its children.
   */
  .directive('gnCapTreeElt', [
    '$compile', '$location',
    function ($compile, $location) {
      return {
        restrict: 'E',
        require: '^gnWmsImport',
        replace: true,
        scope: {
          member: '='
        },
        templateUrl: 'shared/wmsimport/partials/layeritem.html',
        link: function (scope, element, attrs, controller) {
          var select = function () {
            var addedLayer = controller.addLayer(scope.member);

            var addedLayers = $location.search().addLayers;
            if (addedLayers) {
              addedLayers = addedLayers.split(',');
            } else {
              addedLayers = [];
            }

            var layerName = scope.member.Name || scope.member.title;

            var i = addedLayers.indexOf(layerName);
            if (i != -1) {
              addedLayers.splice(i, 1);
            } else {
              addedLayers.push(layerName);
            }

            if (addedLayers && addedLayers.length > 0) {
              $location.search('addLayers', addedLayers.toString());
            } else {
              $location.search('addLayers', null);
            }

            addedLayer.getSource().on('imageloadstart',
              function () {
                scope.showSpinner = true;
                scope.$apply();
              });
            addedLayer.getSource().on('imageloadend',
              function () {
                scope.showSpinner = false;
                scope.$apply();
              });
            addedLayer.getSource().on('imageloaderror',
              function (tileEvent) {
                console.warn("imageloaderror : " + tileEvent.target.params_.LAYERS);
                scope.showSpinner = false;
                scope.$apply();
              });

            if (addedLayer.values_.legend) {
              scope.member.legend = addedLayer.values_.legend;
            } else {
              scope.member.legend = ngeo.LayerHelper.prototype.getWMSLegendURL(addedLayer.values_.url, addedLayer.values_.name);
            }
            scope.member.isLayerActive = addedLayer.getVisible();
          };
          if (angular.isArray(scope.member.Layer)) {
            element.append("<gn-cap-tree-col class='list-group' collection='member.Layer'></gn-cap-tree-col>");
            $compile(element.contents())(scope);
          }
          scope.handle = function (evt) {
            if (scope.member.Name || scope.member.title) {
              select();
              evt.stopImmediatePropagation();
            }
          };
          scope.showInfo = function (evt) {
            evt.stopImmediatePropagation();
            scope.member.showInfo = !scope.member.showInfo;
          };
          scope.isParentNode = function () {
            return angular.isDefined(scope.member.Layer);
          };
        }
      };
    }
  ]);

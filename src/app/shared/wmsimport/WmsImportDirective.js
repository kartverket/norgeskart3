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
            getCapLayer.version = $scope.capability.version;
            if ($scope.url !== getCapLayer.url) {
              getCapLayer.url = $scope.url;
            }
            var layer;
            if ($scope.format === 'wms') {
              layer = gnMap.addWmsToMapFromCap($scope.map, getCapLayer);
              gnMap.feedLayerMd(layer);
              return layer;
            } else if ($scope.format === 'wfs') {
              layer = gnMap.addWfsToMapFromCap($scope.map, getCapLayer,
                $scope.url);
              gnMap.feedLayerMd(layer);
              return layer;
            } else if ($scope.format === 'wmts') {
              return gnMap.addWmtsToMapFromCap($scope.map, getCapLayer,
                $scope.capability);
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
            scope.setUrl({
              url: args.url,
              type: args.type || type
            });
            scope.format = args.type;
          });
          scope.$on('addLayerFromWMS', function (event, layer) {
            scope.layerList.push(layer);
          });

          /*
          function addLinks(md, type) {
            angular.forEach(md.getLinksByType(type), function (link) {
              if (link.url) {
                scope.catServicesList.push({
                  title: md.title || md.defaultTitle,
                  uuid: md.getUuid(),
                  name: link.name,
                  desc: link.desc,
                  type: type,
                  url: link.url
                });
              }
            });
          }
          */
          // Get the list of services registered in the catalog
          /*
          if (attrs.servicesListFromCatalog) {
            // FIXME: Only load the first 100 services
            gnSearchManagerService.gnSearch({
              fast: 'index',
              _content_type: 'json',
              from: 1,
              to: 100,
              serviceType: 'OGC:WMS or OGC:WFS or OGC:WMTS'
            }).then(function (data) {
              angular.forEach(data.metadata, function (record) {
                var md = new Metadata(record);
                if (scope.format === 'all') {
                  addLinks(md, 'wms');
                  addLinks(md, 'wfs');
                } else {
                  addLinks(md, scope.format);
                }
              });
            });
          }
          */

          scope.setUrl = function (srv) {
            scope.url = angular.isObject(srv) ? srv.url : srv;
            scope.url = scope.url.replace(/\[|\]/g, "");
            type = angular.isObject(srv) && srv.type || type;
            scope.serviceDesc = angular.isObject(srv) ? srv : null;
            scope.load();
          };

          scope.load = function () {
            if (scope.url) {
              scope.loading = true;
              gnOwsCapabilities['get' + type.toUpperCase() + 'Capabilities'](scope.url)
                .then(function (capability) {
                  scope.loading = false;
                  scope.capability = capability;
                })
                .then(function () {
                  angular.forEach(scope.layerList, function (value) {
                    controller.addLayer(
                      scope.capability.layers.filter(function (el) {
                        return el.Name === value;
                      })[0]
                    );
                  });
                });
            }
          };

          // watch url as input
          scope.$watch('url', function (value) {
            if (value) {
              scope.setUrl({
                url: value,
                type: scope.format
              });
            }
          });

          if (localStorageFactory.get("wms")) {
            scope.format = "wms";
            scope.setUrl(localStorageFactory.get("wms"));
          } else if (localStorageFactory.get("wfs")) {
            scope.format = "wfs";
            scope.setUrl(localStorageFactory.get("wfs"));
          }
          if (localStorageFactory.get("addLayers")) {
            scope.layerList = localStorageFactory.get("addLayers").split(",");
          }

        }
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
        template: "<ul class='list-group'><gn-cap-tree-elt ng-repeat='member in collection' member='member'>" +
          '</gn-cap-tree-elt></ul>'
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
    '$compile',
    '$translate',
    'gnAlertService',
    function ($compile, $translate, gnAlertService) {
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
            scope.member.legend = addedLayer.values_.legend;
            scope.isLayerActive = addedLayer.getVisible();

            gnAlertService.addAlert({
              msg: $translate.instant('layerAdded', {
                layer:
                  (scope.member.Title || scope.member.title)
              }),
              type: 'success'
            });
          };
          if (angular.isArray(scope.member.Layer)) {
            element.append("<gn-cap-tree-col class='list-group' collection='member.Layer'></gn-cap-tree-col>");
            $compile(element.contents())(scope);
          }
          scope.handle = function (evt) {
            select();
            evt.stopImmediatePropagation();
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

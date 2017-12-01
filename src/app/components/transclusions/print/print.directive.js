angular.module('print')
  .directive('print', ['toolsFactory', 'ISY.EventHandler', '$http', 'mainAppService', '$window', 'ISY.MapAPI.Map',
    function (toolsFactory, eventHandler, $http, mainAppService, $window, map) {
      return {
        templateUrl: 'components/transclusions/print/print.html',
        restrict: 'A',
        link: function (scope) {
          if (scope.activePosition && scope.activePosition.zoom) {
            scope.activePosition.zoom = parseFloat(12);
            map.SetCenter(scope.activePosition);
          }
          var extent = {};
          var mapLink = "";
          var retryMapCreation = true;
          scope.mapAvailable = false;
          scope.createMapButtonOn = true;
          scope.showLegend = false;

          function _boxExtent(newExtent) {
            extent = newExtent;
          }
          eventHandler.RegisterEvent(ISY.Events.EventTypes.PrintBoxSelectReturnValue, _boxExtent);

          var _activatePrintBoxSelect = function (scale, cols, rows) {
            var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
            printBoxSelectTool.additionalOptions.scale = scale;
            printBoxSelectTool.additionalOptions.cols = cols;
            printBoxSelectTool.additionalOptions.rows = rows;
            toolsFactory.activateTool(printBoxSelectTool);
          };
          var _deactivatePrintBoxSelect = function () {
            var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
            toolsFactory.deactivateTool(printBoxSelectTool);
          };

          scope.applyScale = function (scale) {
            _deactivatePrintBoxSelect();
            _activatePrintBoxSelect(scale, 1, 1);
            scope.scale = scale;
          };

          scope.scales = {
            10000: '1: 10 000',
            25000: '1: 25 000',
            50000: '1: 50 000',
            100000: '1: 100 000'
          };
          scope.scale = '25000';
          scope.tittel = "Print";

          scope.orderMap = function () {
            _activatePrintBoxSelect(scope.scale, 1, 1);
            if (!extent.bbox) {
              return;
            }
            scope.olmap = ISY.MapImplementation.OL3.olMap;
            var view = scope.olmap.getView();
            var resolution = view.getResolution();
            var proj = view.getProjection();
            var encLayers = [];
            var encLegends;
            var attributions = [];
            var layers = scope.olmap.getLayers();
            pdfLegendsToDownload = [];

            var sortedZindexLayers = layers.getArray().sort(function (a, b) {
              return a.getZIndex() > b.getZIndex();
            });

            angular.forEach(sortedZindexLayers, function (layer) {
              if (layer.getVisible()) {
                var attribution = layer.attribution;
                if (attribution !== undefined &&
                  attributions.indexOf(attribution) === -1) {
                  attributions.push(attribution);
                }
                if (layer instanceof ol.layer.Group) {
                  var encs = encoders.layers['Group'].call(this, layer, proj);
                  encLayers = encLayers.concat(encs);
                } else {
                  var enc = encodeLayer(layer, proj, resolution);
                  if (enc && enc.layer) {
                    encLayers.push(enc.layer);
                    if (enc.legend) {
                      encLegends = encLegends || [];
                      encLegends.push(enc.legend);
                    }
                  }
                }
              }
            });

            scope.createMapButtonOn = false;
            scope.mapAvailable = false;

            var printJson = {
              attributes: {
                map: {
                  center: extent.center,
                  // bbox: extent.bbox,
                  dpi: "300",
                  layers: encLayers,
                  // legends: encLegends,
                  projection: extent.projection,
                  rotation: 0,
                  // sone: extent.sone,
                  // biSone: "",
                  // paging: 1,
                  scale: extent.scale,
                  // titel: scope.tittel,
                  // link: "http://www.norgeskart.no/geonorge/"
                }
              },
              layout: "A4 landscape"
            };

            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
            var printUrl = mainAppService.generatePrintUrl("/print/print/default/report.pdf");
            var startTime = new Date().getTime();
            scope.showSpinner = true;
            document.getElementById("spinner1").style.backgroundColor = "rgba(0,0,0,0.4)";
            document.getElementById("spinner1").style.transition = "0.8s";
            $http.post(printUrl, printJson).then(
              function (response) {
                scope.downloadWhenReady(response.data.statusURL, startTime);
              }
            );
          };

          var _mapCreationFailed = function () {
            if (retryMapCreation) {
              // console.log('Map creation failed. Retrying.');
              retryMapCreation = false;
              scope.orderMap();
            } else {
              console.warn('Retrying map creation failed. Try again later or contact Kartverket.');
              scope.createMapButtonOn = true;
            }
          };
          /*
          var updateWaitingMsg = function (startTime, data) {
            var elapsed = Math.floor((new Date().getTime() - startTime) / 100);
            var time = '';
            if (elapsed > 5) {
              time = (elapsed / 10) + " sec";
            }
            $('#messages').text('Waiting for report ' + time + ": " + data.ref);
          };
          */
          scope.downloadWhenReady = function (statusURL, startTime) {
            if ((new Date().getTime() - startTime) > 30000) {
              console.error('Gave up waiting after 30 seconds');
            } else {
              // updateWaitingMsg(startTime, data);
              setTimeout(function () {
                $http.get(mainAppService.generatePrintUrl(statusURL)).then(
                  function (response) {
                    if (!response.data.done) {
                      scope.downloadWhenReady(response.data.statusURL, startTime);
                    } else {
                      scope.mapReadyForDownload(response.data.downloadURL);
                    }
                  }, function error() {
                    _mapCreationFailed();
                  });
              }, 500);
            }
          };

          scope.mapReadyForDownload = function (downloadURL) {
            scope.mapAvailable = true;
            scope.createMapButtonOn = true;
            scope.showSpinner = false;
            document.getElementById("spinner1").style.backgroundColor = "transparent";
            document.getElementById("spinner1").style.transition = "0.8s";
            mapLink = mainAppService.generatePrintUrl(downloadURL);
          };

          scope.downloadMap = function () {
            $window.open(mapLink, '_blank');
          };

          var setMenuListMaxHeight = function () {
            $(document).ready(function () {
              var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
              if (isMobile.matches) {
                fixElementHeight(120);
              } else {
                fixElementHeight(220);
              }
            });
          };

          function fixElementHeight(moveUpFromBottom) {
            var bodyHeight = $window.innerHeight;
            var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
            var searchContentElements = document.getElementsByClassName("search-content");
            for (var i = 0; i < searchContentElements.length; i++) {
              var element = searchContentElements[i];
              element.style.maxHeight = menuListMaxHeight + 'px';
            }
          }

          $(document).ready(function () {
            $($window).resize(setMenuListMaxHeight);
            setMenuListMaxHeight();
          });
          /**
           * Object of methods that encode ol3 layers into print config objects.
           *
           * @type {{layers: {Layer: 'Layer', Group: 'Group',
           *    Vector: 'Vector', WMS: 'WMS',
           *    OSM: 'OSM', WMTS: 'WMTS'}, legends: {ga_urllegend: 'ga_urllegend',
           *    base: 'base'}}}
           */
          var encoders = {
            layers: {
              Layer: function (layer) {
                var enc = {
                  layer: layer.bodId,
                  opacity: layer.getOpacity()
                };
                return enc;
              },
              Group: function (layer, proj) {
                var encs = [];
                var subLayers = layer.getLayers();
                subLayers.forEach(function (subLayer) {
                  if (subLayer.visible) {
                    var enc = encoders.layers['Layer'].call(this, layer);
                    var layerEnc = encodeLayer(subLayer, proj);
                    if (layerEnc && layerEnc.layer) {
                      $.extend(enc, layerEnc);
                      encs.push(enc.layer);
                    }
                  }
                });
                return encs;
              },
              Vector: function (layer, features) {
                if (layer.values_.name === 'PrintBoxSelect') {
                  return;
                }
                var enc = encoders.layers['Layer'].call(this, layer);
                var format = new ol.format.GeoJSON();
                var encStyles = {};
                var encFeatures = [];
                var styleId = 0;

                angular.forEach(features, function (feature) {
                  var encStyle = {
                    id: styleId
                  };

                  var styles, featureStyle = feature.get('_style');
                  if (angular.isFunction(featureStyle)) {
                    styles = featureStyle(feature);
                  } else if (angular.isArray(featureStyle)) {
                    styles = featureStyle;
                  } else if (featureStyle) {
                    styles = [featureStyle];
                  } else {
                    styles = feature.getStyleFunction(); // was ol.style.defaultStyleFunction(feature);
                  }

                  var geometry = feature.getGeometry();

                  // Transform an ol.geom.Circle to a ol.geom.Polygon
                  if (geometry.getType() === 'Circle') {
                    var polygon = circleToPolygon(geometry);
                    feature = new ol.Feature(polygon);
                  }

                  var encJSON = format.writeFeatureObject(feature);
                  if (!encJSON.properties) {
                    encJSON.properties = {};
                  } else if (encJSON.properties.Style) {
                    delete encJSON.properties.Style;
                  }

                  encJSON.properties._gx_style = styleId;
                  encFeatures.push(encJSON);

                  if (styles && styles.length > 0) {
                    $.extend(encStyle, transformToPrintLiteral(feature, styles[0]));
                  }

                  encStyles[styleId] = encStyle;
                  styleId++;
                });
                angular.extend(enc, {
                  type: 'Vector',
                  styles: encStyles,
                  styleProperty: '_gx_style',
                  geoJson: {
                    type: 'FeatureCollection',
                    features: encFeatures
                  },
                  name: layer.bodId,
                  opacity: (layer.opacity !== null) ? layer.opacity : 1.0
                });
                return enc;
              },
              WMS: function (layer, config) {
                var enc = encoders.layers['Layer'].call(this, layer);
                var params = layer.getSource().getParams();
                var layers = params.LAYERS.split(',') || [];
                var styles = (params.STYLES !== undefined) ?
                  params.STYLES.split(',') :
                  new Array(layers.length).join(',').split(',');
                var url = layer.getSource() instanceof ol.source.ImageWMS ?
                  layer.getSource().getUrl() :
                  layer.getSource().getUrls()[0];
                angular.extend(enc, {
                  type: 'WMS',
                  baseURL: config.wmsUrl || url,
                  layers: layers,
                  styles: styles,
                  // legend: layer.get('legend'),
                  imageFormat: 'image/' + (config.format || 'png'),
                  customParams: {
                    EXCEPTIONS: 'XML',
                    TRANSPARENT: 'true',
                    CRS: 'EPSG:3857',
                    TIME: params.TIME
                  } // , singleTile: config.singleTile || false
                });
                return enc;
              },
              OSM: function (layer) {
                var enc = encoders.layers['Layer'].call(this, layer);
                angular.extend(enc, {
                  type: 'OSM',
                  baseURL: 'http://a.tile.openstreetmap.org/',
                  extension: 'png',
                  // Hack to return an extent for the base
                  // layer in case of undefined
                  maxExtent: layer.getExtent() || [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
                  resolutions: layer.getSource().tileGrid.getResolutions(),
                  tileSize: [
                    layer.getSource().tileGrid.getTileSize(),
                    layer.getSource().tileGrid.getTileSize()
                  ]
                });
                return enc;
              },
              WMTS: function (layer) {
                // sextant specific
                var enc = encoders.layers['Layer'].call(this, layer);
                var source = layer.getSource();
                var tileGrid = source.getTileGrid();
                var matrixSet = source.getMatrixSet();
                var matrices = new Array(tileGrid.getResolutions().length);
                for (var z = 0; z < tileGrid.getResolutions().length; ++z) {
                  var mSize = (ol.extent.getWidth(ol.proj.get('EPSG:3857').getExtent()) / tileGrid.getTileSize()) /
                    tileGrid.getResolutions()[z];
                  matrices[z] = {
                    identifier: tileGrid.getMatrixIds()[z],
                    scaleDenominator: tileGrid.getResolutions()[z],
                    tileSize: [tileGrid.getTileSize(), tileGrid.getTileSize()],
                    topLeftCorner: tileGrid.getOrigin(),
                    matrixSize: [mSize, mSize]
                  };
                }

                angular.extend(enc, {
                  type: 'WMTS',
                  baseURL: layer.getSource().getUrls()[0], // layer.get('url'),
                  layer: source.getLayer(),
                  version: source.getVersion(),
                  requestEncoding: 'KVP',
                  imageFormat: source.getFormat(),
                  style: source.getStyle(),
                  matrixSet: matrixSet,
                  matrices: matrices
                });

                return enc;
              }
            },
            legends: {
              base: function (layer) {
                if (!layer.get('legend')) {
                  return;
                }
                return {
                  name: layer.get('title') || layer.get('label'),
                  classes: [{
                    name: '',
                    icon: layer.get('legend')
                  }]
                };
              }
            }
          };

          // Encode ol.Layer to a basic js object
          var encodeLayer = function (layer, proj, resolution) {
            var encLayer, encLegend;
            var ext = proj.getExtent();
            var layerConfig = {};

            if (!(layer instanceof ol.layer.Group)) {
              var src = layer.getSource();
              var minResolution = layerConfig.minResolution || 0;
              var maxResolution = layerConfig.maxResolution || Infinity;

              if (resolution <= maxResolution &&
                resolution >= minResolution) {
                if (src instanceof ol.source.WMTS) {
                  encLayer = encoders.layers['WMTS'].call(this, layer, layerConfig, scope.olmap);
                } else if (src instanceof ol.source.OSM) {
                  encLayer = encoders.layers['OSM'].call(this, layer, layerConfig);
                } else if (src instanceof ol.source.ImageWMS ||
                  src instanceof ol.source.TileWMS) {
                  encLayer = encoders.layers['WMS'].call(this, layer, layerConfig, scope.olmap);
                } else if (src instanceof ol.source.Vector ||
                  src instanceof ol.source.ImageVector) {
                  if (src instanceof ol.source.ImageVector) {
                    src = src.getSource();
                  }
                  var features = [];
                  src.forEachFeatureInExtent(ext, function (feat) {
                    features.push(feat);
                  });

                  if (features && features.length > 0) {
                    encLayer = encoders.layers['Vector'].call(this, layer, features);
                  }
                }
              }
            }

            encLegend = encoders.legends['base'].call(
              this, layer, layerConfig
            );

            if (encLegend && encLegend.classes[0] && !encLegend.classes[0].icon) {
              encLegend = undefined;
            }
            return {
              layer: encLayer,
              legend: encLegend
            };
          };

          scope.$on('moveableOverlayChange', function (event, args) {
            if (args.id === 'Print') {
              _activatePrintBoxSelect(scope.scale, 1, 1);
            }
          });
        }
      };
    }
  ]);

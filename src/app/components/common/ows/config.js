(function () {
  var module = angular.module('gnConfig', []);

  module.value('gnConfig', {
    key: {
      isXLinkEnabled: 'system.xlinkResolver.enable',
      isXLinkLocal: 'system.xlinkResolver.localXlinkEnable',
      isSelfRegisterEnabled: 'system.userSelfRegistration.enable',
      isFeedbackEnabled: 'system.userFeedback.enable',
      isSearchStatEnabled: 'system.searchStats.enable',
      isHideWithHelEnabled: 'system.hidewithheldelements.enable'
    },
    'map.is3DModeAllowed': window.location.search.indexOf('with3d') !== -1
  });
  module.constant('gnViewerSettings', {});
  module.constant('gnSearchSettings', {});
  module.constant('gnGlobalSettings', function () {
    var defaultConfig = {
      'langDetector': {
        'fromHtmlTag': false,
        'regexp': '^\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+\/([a-z]{3})\/',
        'default': 'eng'
      },
      'nodeDetector': {
        'regexp': '^\/[a-zA-Z0-9_\-]+\/([a-zA-Z0-9_\-]+)\/[a-z]{3}\/',
        'default': 'srv'
      },
      'mods': {
        'header': {
          'enabled': true,
          'languages': {
            'eng': 'en',
            'dut': 'du',
            'fre': 'fr',
            'ger': 'ge',
            'kor': 'ko',
            'spa': 'es',
            'cze': 'cz',
            'cat': 'ca',
            'fin': 'fi',
            'ice': 'is',
            'ita': 'it',
            'rus': 'ru',
            'chi': 'zh'
          }
        },
        'home': {
          'enabled': true,
          'appUrl': '../../srv/{{lang}}/catalog.search#/home'
        },
        'search': {
          'enabled': true,
          'appUrl': '../../srv/{{lang}}/catalog.search#/search',
          'hitsperpageValues': [10, 50, 100],
          'paginationInfo': {
            'hitsPerPage': 20
          },
          'facetsSummaryType': 'details',
          'facetTabField': '',
          'facetConfig': [
            // {
            // key: 'createDateYear',
            // labels: {
            //   eng: 'Published',
            //   fre: 'Publication'
            // }}
          ],
          'filters': {},
          'sortbyValues': [{
            'sortBy': 'relevance',
            'sortOrder': ''
          }, {
            'sortBy': 'changeDate',
            'sortOrder': ''
          }, {
            'sortBy': 'title',
            'sortOrder': 'reverse'
          }, {
            'sortBy': 'rating',
            'sortOrder': ''
          }, {
            'sortBy': 'popularity',
            'sortOrder': ''
          }, {
            'sortBy': 'denominatorDesc',
            'sortOrder': ''
          }, {
            'sortBy': 'denominatorAsc',
            'sortOrder': 'reverse'
          }],
          'sortBy': 'relevance',
          'resultViewTpls': [{
            'tplUrl': '../../catalog/components/' +
              'search/resultsview/partials/viewtemplates/grid.html',
            'tooltip': 'Grid',
            'icon': 'fa-th'
          }],
          'resultTemplate': '../../catalog/components/' +
            'search/resultsview/partials/viewtemplates/grid.html',
          'formatter': {
            'list': [{
              'label': 'full',
              'url': '../api/records/{{md.getUuid()}}/' +
                'formatters/xsl-view?root=div&view=advanced'
            }]
          },
          'grid': {
            'related': ['parent', 'children', 'services', 'datasets']
          },
          'linkTypes': {
            'links': ['LINK', 'kml'],
            'downloads': ['DOWNLOAD'],
            'layers': ['OGC'],
            'maps': ['ows']
          }
        },
        'map': {
          'enabled': true,
          'appUrl': '../../srv/{{lang}}/catalog.search#/map',
          'is3DModeAllowed': true,
          'isSaveMapInCatalogAllowed': true,
          'bingKey': 'AnElW2Zqi4fI-9cYx1LHiQfokQ9GrNzcjOh_p_0hkO1yo78ba8zTLARcLBIf8H6D',
          'storage': 'sessionStorage',
          'map': '../../map/config-viewer.xml',
          'listOfServices': {
            'wms': [],
            'wmts': []
          },
          'useOSM': true,
          'context': '',
          'projection': 'EPSG:3857',
          'projectionList': [{
            'code': 'EPSG:4326',
            'label': 'WGS84 (EPSG:4326)'
          }, {
            'code': 'EPSG:3857',
            'label': 'Google mercator (EPSG:3857)'
          }],
          'searchMapLayers': [],
          'viewerMapLayers': [],
          'disabledTools': {
            'processes': true
          },
          'graticuleOgcService': {},
          'mapExtent': [0, 0, 0, 0],
          'mapBackgroundLayer': {}
        },
        'editor': {
          'enabled': true,
          'appUrl': '../../srv/{{lang}}/catalog.edit'
        },
        'admin': {
          'enabled': true,
          'appUrl': '../../srv/{{lang}}/admin.console'
        },
        'signin': {
          'enabled': true,
          'appUrl': '../../srv/{{lang}}/catalog.signin'
        },
        'signout': {
          'appUrl': '../../signout'
        }
      }
    };

    return {
      proxyUrl: '',
      locale: {},
      isMapViewerEnabled: false,
      requireProxy: [],
      gnCfg: angular.copy(defaultConfig),
      gnUrl: '',
      docUrl: 'http://geonetwork-opensource.org/manuals/trunk/',
      //docUrl: '../../doc/',
      modelOptions: {
        updateOn: 'default blur',
        debounce: {
          default: 300,
          blur: 0
        }
      },
      current: null,
      init: function (config, gnUrl, gnViewerSettings, gnSearchSettings) {
        // start from the default config to make sure every field is present
        // and override with config arg if required
        angular.merge(this.gnCfg, config, {});

        // secial case: languages (replace with object from config if available)
        this.gnCfg.mods.header.languages = angular.extend({
          mods: {
            header: {
              languages: {}
            }
          }
        }, config).mods.header.languages;

        this.gnUrl = gnUrl || '../';
        this.proxyUrl = this.gnUrl + '../proxy?url=';
        gnViewerSettings.mapConfig = this.gnCfg.mods.map;
        angular.extend(gnSearchSettings, this.gnCfg.mods.search);
        this.isMapViewerEnabled = this.gnCfg.mods.map.enabled;
        gnViewerSettings.bingKey = this.gnCfg.mods.map.bingKey;
        gnViewerSettings.owsContext = gnViewerSettings.owsContext ||
          this.gnCfg.mods.map.context;
      },
      getDefaultConfig: function () {
        return angular.copy(defaultConfig);
      },
      // this returns a copy of the default config without the languages object
      // this way, the object can be used as reference for a complete ui
      // settings page
      getMergeableDefaultConfig: function () {
        var copy = angular.copy(defaultConfig);
        copy.mods.header.languages = {};
        return copy;
      }
    };
  }());
  module
  .run([
    'gnSearchSettings',
    'gnViewerSettings',
    'gnMap',
    'gnGlobalSettings',
    '$location',
    function(searchSettings, viewerSettings, gnMap, gnGlobalSettings, $location) {

      // Load the context defined in the configuration
      viewerSettings.defaultContext = (viewerSettings.mapConfig.map || '../../map/config-viewer.xml');
      viewerSettings.owsContext = $location.search().map;

      // these layers will be added along the default context
      // (transform settings to be usable by the OwsContextService)
      var viewerMapLayers = viewerSettings.mapConfig.viewerMapLayers
      viewerSettings.additionalMapLayers =
        viewerMapLayers && viewerMapLayers.map ?
        viewerMapLayers.map(function (layer) {
          return {
            name: '{type=' + layer.type + ', name=' + layer.name + '}',
            title: layer.title,
            group: 'Background layers',
            server: [{
              service: 'urn:ogc:serviceType:WMS',
              onlineResource: [{
                href: layer.url
              }]
            }]
          }
        }) : [];

      // Keep one layer in the background
      // while the context is not yet loaded.
      viewerSettings.bgLayers = [
        gnMap.createLayerForType('osm')
      ];
      viewerSettings.servicesUrl =
        viewerSettings.mapConfig.listOfServices || {};

      // WMS settings
      // If 3D mode is activated, single tile WMS mode is
      // not supported by ol3cesium, so force tiling.
      if (viewerSettings.mapConfig.is3DModeAllowed) {
        viewerSettings.singleTileWMS = false;
        // Configure Cesium to use a proxy. This is required when
        // WMS does not have CORS headers. BTW, proxy will slow
        // down rendering.
        viewerSettings.cesiumProxy = true;
      } else {
        viewerSettings.singleTileWMS = true;
      }

      var bboxStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(255,0,0,1)',
          width: 2
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255,0,0,0.3)'
        })
      });
      searchSettings.olStyles = {
        drawBbox: bboxStyle,
        mdExtent: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'orange',
            width: 2
          })
        }),
        mdExtentHighlight: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'orange',
            width: 3
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,255,0,0.3)'
          })
        })

      };

      // Object to store the current Map context
      viewerSettings.storage = 'sessionStorage';

      // Start location. This is usually overriden
      // by context for large map and search records
      // extent for minimap
      var mapsConfig = viewerSettings.aoi || {
        center: [280274.03240585705, 6053178.654789996],
        zoom: 2
      };

      var viewerMap = new ol.Map({
        controls: [],
        view: new ol.View(mapsConfig)
      });

      var searchMap = new ol.Map({
        controls:[],
        layers: [],
        view: new ol.View(angular.extend({}, mapsConfig))
      });

      // initialize search map layers according to settings
      // (default is OSM)
      var searchMapLayers = viewerSettings.mapConfig.searchMapLayers;
      if (!searchMapLayers || !searchMapLayers.length) {
        searchMap.addLayer(new ol.layer.Tile({
          source: new ol.source.OSM()
        }));
      } else {
        searchMapLayers.forEach(function (layerInfo) {
          gnMap.createLayerForType(layerInfo.type, {
            name: layerInfo.name,
            url: layerInfo.url
          }, layerInfo.title, searchMap);
        });
      }

      // Map protocols used to load layers/services in the map viewer
      searchSettings.mapProtocols = {
        layers: [
          'OGC:WMS',
          'OGC:WMS-1.1.1-http-get-map',
          'OGC:WMS-1.3.0-http-get-map',
          'OGC:WFS'
          ],
        services: [
          'OGC:WMS-1.3.0-http-get-capabilities',
          'OGC:WMS-1.1.1-http-get-capabilities',
          'OGC:WFS-1.0.0-http-get-capabilities'
          ]
      };

      // Set custom config in gnSearchSettings
      angular.extend(searchSettings, {
        viewerMap: viewerMap,
        searchMap: searchMap
      });

    }]);
})();

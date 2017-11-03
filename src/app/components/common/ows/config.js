angular.module('gnConfig', [])

  .value('gnConfig', {
    "key": {
      isXLinkEnabled: 'system.xlinkResolver.enable',
      isXLinkLocal: 'system.xlinkResolver.localXlinkEnable',
      isSelfRegisterEnabled: 'system.userSelfRegistration.enable',
      isFeedbackEnabled: 'system.userFeedback.enable',
      isSearchStatEnabled: 'system.searchStats.enable',
      isHideWithHelEnabled: 'system.hidewithheldelements.enable'
    },
    'map.is3DModeAllowed': window.location.search.indexOf('with3d') !== -1
  })
  .constant('gnViewerSettings', {})
  .constant('gnSearchSettings', {})
  .constant('gnGlobalSettings', function () {
    var defaultConfig = {
      langDetector: {
        fromHtmlTag: false,
        regexp: '^\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+\/([a-z]{3})\/',
        default: 'eng'
      },
      nodeDetector: {
        regexp: '^\/[a-zA-Z0-9_\-]+\/([a-zA-Z0-9_\-]+)\/[a-z]{3}\/',
        default: 'srv'
      },
      mods: {
        header: {
          enabled: true,
          languages: {
            eng: 'en',
            dut: 'du',
            fre: 'fr',
            ger: 'ge',
            kor: 'ko',
            spa: 'es',
            cze: 'cz',
            cat: 'ca',
            fin: 'fi',
            ice: 'is',
            ita: 'it',
            rus: 'ru',
            chi: 'zh'
          }
        },
        home: {
          enabled: true,
          appUrl: '../../srv/{{lang}}/catalog.search#/home'
        },
        search: {
          enabled: true,
          appUrl: '../../srv/{{lang}}/catalog.search#/search',
          hitsperpageValues: [10, 50, 100],
          paginationInfo: {
            hitsPerPage: 20
          },
          facetsSummaryType: 'details',
          facetTabField: '',
          facetConfig: [
            // {
            // key: 'createDateYear',
            // labels: {
            //   eng: 'Published',
            //   fre: 'Publication'
            // }}
          ],
          filters: {},
          sortbyValues: [{
            sortBy: 'relevance',
            sortOrder: ''
          }, {
            sortBy: 'changeDate',
            sortOrder: ''
          }, {
            sortBy: 'title',
            sortOrder: 'reverse'
          }, {
            sortBy: 'rating',
            sortOrder: ''
          }, {
            sortBy: 'popularity',
            sortOrder: ''
          }, {
            sortBy: 'denominatorDesc',
            sortOrder: ''
          }, {
            sortBy: 'denominatorAsc',
            sortOrder: 'reverse'
          }],
          sortBy: 'relevance',
          resultViewTpls: [{
            tplUrl: '../../catalog/components/' +
              'search/resultsview/partials/viewtemplates/grid.html',
            tooltip: 'Grid',
            icon: 'fa-th'
          }],
          resultTemplate: '../../catalog/components/' +
            'search/resultsview/partials/viewtemplates/grid.html',
          formatter: {
            list: [{
              label: 'full',
              url: '../api/records/{{md.getUuid()}}/' +
                'formatters/xsl-view?root=div&view=advanced'
            }]
          },
          grid: {
            related: ['parent', 'children', 'services', 'datasets']
          },
          linkTypes: {
            links: ['LINK', 'kml'],
            downloads: ['DOWNLOAD'],
            layers: ['OGC'],
            maps: ['ows']
          }
        },
        map: {
          enabled: true,
          appUrl: '../../srv/{{lang}}/catalog.search#/map',
          is3DModeAllowed: true,
          isSaveMapInCatalogAllowed: true,
          bingKey: 'AnElW2Zqi4fI-9cYx1LHiQfokQ9GrNzcjOh_p_0hkO1yo78ba8zTLARcLBIf8H6D',
          storage: 'sessionStorage',
          map: '../../map/config-viewer.xml',
          listOfServices: {
            wms: [],
            wmts: []
          },
          useOSM: true,
          context: '',
          projection: 'EPSG:3857',
          projectionList: [{
            code: 'EPSG:4326',
            label: 'WGS84 (EPSG:4326)'
          }, {
            code: 'EPSG:3857',
            label: 'Google mercator (EPSG:3857)'
          }],
          searchMapLayers: [],
          viewerMapLayers: [],
          disabledTools: {
            processes: true
          },
          graticuleOgcService: {},
          mapExtent: [0, 0, 0, 0],
          mapBackgroundLayer: {}
        },
        editor: {
          enabled: true,
          appUrl: '../../srv/{{lang}}/catalog.edit'
        },
        admin: {
          enabled: true,
          appUrl: '../../srv/{{lang}}/admin.console'
        },
        signin: {
          enabled: true,
          appUrl: '../../srv/{{lang}}/catalog.signin'
        },
        signout: {
          appUrl: '../../signout'
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
  }())
  .run([
    'gnSearchSettings',
    'gnViewerSettings',
    'gnMap',
    'gnGlobalSettings',
    '$location',
    function (searchSettings, viewerSettings, gnMap, gnGlobalSettings, $location) {

      // Load the context defined in the configuration
      //viewerSettings.defaultContext = (viewerSettings.mapConfig.map || '../map/config-viewer.xml');
      viewerSettings.mapConfig = {
        enabled: true,
        appUrl: '../../srv/{{lang}}/catalog.search#/map',
        is3DModeAllowed: true,
        isSaveMapInCatalogAllowed: true,
        bingKey: 'AnElW2Zqi4fI-9cYx1LHiQfokQ9GrNzcjOh_p_0hkO1yo78ba8zTLARcLBIf8H6D',
        storage: 'sessionStorage',
        map: '../../map/config-viewer.xml',
        listOfServices: {
          wms: [],
          wmts: []
        },
        useOSM: true,
        context: '',
        projection: 'EPSG:3857',
        projectionList: [{
          code: 'EPSG:4326',
          label: 'WGS84 (EPSG:4326)'
        }, {
          code: 'EPSG:3857',
          label: 'Google mercator (EPSG:3857)'
        }],
        searchMapLayers: [],
        viewerMapLayers: [],
        disabledTools: {
          processes: true
        },
        graticuleOgcService: {},
        mapExtent: [0, 0, 0, 0],
        mapBackgroundLayer: {}
      };
      viewerSettings.owsContext = $location.search().map;

      // these layers will be added along the default context
      // (transform settings to be usable by the OwsContextService)
      var viewerMapLayers = viewerSettings.mapConfig.viewerMapLayers;
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
          };
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
        controls: [],
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

    }
  ])
  /**
   * @ngdoc service
   * @kind function
   * @name Metadata
   *
   * @description
   * The `Metadata` service is a metadata wrapper from the jeeves
   * json output of the search service. It also provides some functions
   * on the metadata.
   */
  .factory('Metadata', function () {
    function Metadata(k) {
      $.extend(true, this, k);
      var listOfArrayFields = ['topicCat', 'category', 'keyword',
        'securityConstraints', 'resourceConstraints', 'legalConstraints',
        'denominator', 'resolution', 'geoDesc', 'geoBox', 'inspirethemewithac',
        'status', 'status_text', 'crs', 'identifier', 'responsibleParty',
        'mdLanguage', 'datasetLang', 'type', 'link', 'crsDetails'
      ];
      // See below; probably not necessary
      var listOfJsonFields = ['keywordGroup', 'crsDetails'];
      var record = this;
      this.linksCache = [];
      $.each(listOfArrayFields, function (idx) {
        var field = listOfArrayFields[idx];
        if (angular.isDefined(record[field]) &&
          !angular.isArray(record[field])) {
          record[field] = [record[field]];
        }
      });
      // Note: this step does not seem to be necessary; TODO: remove or refactor
      $.each(listOfJsonFields, function (idx) {
        var field = listOfJsonFields[idx];
        if (angular.isDefined(record[field])) {
          try {
            record[field] = angular.fromJson(record[field]);
          } catch (e) {
            console.warn(e);
          }
        }
      });

      // Create a structure that reflects the transferOption/onlinesrc tree
      var links = [];
      angular.forEach(this.link, function (link) {
        var linkInfo = formatLink(link);
        var idx = linkInfo.group - 1;
        if (!links[idx]) {
          links[idx] = [linkInfo];
        } else if (angular.isArray(links[idx])) {
          links[idx].push(linkInfo);
        }
      });
      this.linksTree = links;
    }

    function formatLink(sLink) {
      var linkInfos = sLink.split('|');
      return {
        name: linkInfos[0],
        title: linkInfos[0],
        url: linkInfos[2],
        desc: linkInfos[1],
        protocol: linkInfos[3],
        contentType: linkInfos[4],
        group: linkInfos[5] ? parseInt(linkInfos[5]) : undefined,
        applicationProfile: linkInfos[6]
      };
    }

    Metadata.prototype = {
      getUuid: function () {
        return this['geonet:info'].uuid;
      },
      getId: function () {
        return this['geonet:info'].id;
      },
      isPublished: function () {
        return this['geonet:info'].isPublishedToAll === 'true';
      },
      isValid: function () {
        return this.valid === '1';
      },
      hasValidation: function () {
        return (this.valid > -1);
      },
      isOwned: function () {
        return this['geonet:info'].owner === 'true';
      },
      getOwnerId: function () {
        return this['geonet:info'].ownerId;
      },
      getGroupOwner: function () {
        return this['geonet:info'].owner;
      },
      getSchema: function () {
        return this['geonet:info'].schema;
      },
      publish: function () {
        this['geonet:info'].isPublishedToAll = this.isPublished() ?
          'false' : 'true';
      },

      getLinks: function () {
        return this.link;
      },
      getLinkGroup: function (layer) {
        var links = this.getLinksByType('OGC');
        for (var i = 0; i < links.length; ++i) {
          var link = links[i];
          if (link.name == layer.getSource().getParams().LAYERS) {
            return link.group;
          }
        }
      },
      /**
       * Get all links of the metadata of the given types.
       * The types are strings in arguments.
       * You can give the exact matching with # ('#OG:WMS') or just find an
       * occurence for the match ('OGC').
       * You can passe several types to find ('OGC','WFS', '#getCapabilities')
       *
       * If the first argument is a number, you do the search within the link
       * group (search only onlinesrc in the given transferOptions).
       *
       * @return {*} an Array of links
       */
      getLinksByType: function () {
        var ret = [];

        var types = Array.prototype.splice.call(arguments, 0);
        var groupId;

        var key = types.join('|');
        if (angular.isNumber(types[0])) {
          groupId = types[0];
          types.splice(0, 1);
        }
        if (this.linksCache[key] && !groupId) {
          return this.linksCache[key];
        }
        angular.forEach(this.link, function (link) {
          var linkInfo = formatLink(link);
          if (types.length > 0) {
            types.forEach(function (type) {
              if (type.substr(0, 1) == '#') {
                if (linkInfo.protocol == type.substr(1, type.length - 1) &&
                  (!groupId || groupId == linkInfo.group)) {
                  ret.push(linkInfo);
                }
              } else {
                if (linkInfo.protocol.indexOf(type) >= 0 &&
                  (!groupId || groupId == linkInfo.group)) {
                  ret.push(linkInfo);
                }
              }
            });
          } else {
            ret.push(linkInfo);
          }
        });
        this.linksCache[key] = ret;
        return ret;
      },
      getThumbnails: function () {
        var images = {
          list: []
        };
        if (angular.isArray(this.image)) {
          for (var i = 0; i < this.image.length; i++) {
            var s = this.image[i].split('|');
            var insertFn = 'push';
            if (s[0] === 'thumbnail') {
              images.small = s[1];
              insertFn = 'unshift';
            } else if (s[0] === 'overview') {
              images.big = s[1];
            }
            images.list[insertFn]({
              url: s[1],
              label: s[2]
            });
          }
        }
        return images;
      },
      /**
       * Return an object containing metadata contacts
       * as an array and resource contacts as array
       *
       * @return {{metadata: Array, resource: Array}}
       */
      getAllContacts: function () {
        if (angular.isUndefined(this.allContacts) &&
          angular.isDefined(this.responsibleParty)) {
          this.allContacts = {
            metadata: [],
            resource: []
          };
          for (var i = 0; i < this.responsibleParty.length; i++) {
            var s = this.responsibleParty[i].split('|');
            var contact = {
              role: s[0] || '',
              org: s[2] || '',
              logo: s[3] || '',
              email: s[4] || '',
              name: s[5] || '',
              position: s[6] || '',
              address: s[7] || '',
              phone: s[8] || ''
            };
            if (s[1] === 'resource') {
              this.allContacts.resource.push(contact);
            } else if (s[1] === 'metadata') {
              this.allContacts.metadata.push(contact);
            }
          }
        }
        return this.allContacts;
      },
      /**
       * Deprecated. Use getAllContacts instead
       */
      getContacts: function () {
        var ret = {};
        if (angular.isArray(this.responsibleParty)) {
          for (var i = 0; i < this.responsibleParty.length; i++) {
            var s = this.responsibleParty[i].split('|');
            if (s[1] === 'resource') {
              ret.resource = s[2];
            } else if (s[1] === 'metadata') {
              ret.metadata = s[2];
            }
          }
        }
        return ret;
      },
      getBoxAsPolygon: function (i) {
        // Polygon((4.6810%2045.9170,5.0670%2045.9170,5.0670%2045.5500,4.6810%2045.5500,4.6810%2045.9170))
        if (this.geoBox[i]) {
          var coords = this.geoBox[i].split('|');
          return 'Polygon((' +
            coords[0] + ' ' +
            coords[1] + ',' +
            coords[2] + ' ' +
            coords[1] + ',' +
            coords[2] + ' ' +
            coords[3] + ',' +
            coords[0] + ' ' +
            coords[3] + ',' +
            coords[0] + ' ' +
            coords[1] + '))';
        } else {
          return null;
        }
      },
      getOwnername: function () {
        if (this.userinfo) {
          var userinfo = this.userinfo.split('|');
          try {
            if (userinfo[2] !== userinfo[1]) {
              return userinfo[2] + ' ' + userinfo[1];
            } else {
              return userinfo[1];
            }
          } catch (e) {
            return '';
          }
        } else {
          return '';
        }
      },
      isWorkflowEnabled: function () {
        var st = this.mdStatus;
        var res = st &&
          //Status is unknown
          (!isNaN(st) && st != '0');

        //What if it is an array: gmd:MD_ProgressCode
        if (!res && Array.isArray(st)) {
          angular.forEach(st, function (s) {
            if (!isNaN(s) && s != '0') {
              res = true;
            }
          });
        }
        return res;
      }
    };
    return Metadata;
  });

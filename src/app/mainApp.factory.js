angular.module('mainApp')
  .factory('mainAppFactory', ['ISY.MapAPI.Map', '$location', 'ISY.Repository', '$translate', 'translations',
    function (map, $location, repository, $translate, translations) {
      var instance = "";
      var projectUrl;
      var beginLayersInURL;
      var projectsList;
      var projectConfig;
      var groupIds = [];
      var notDummyGroup = false;
      var projectNameUrl;
      var mainMenuIsOpen = false;
      var config = {
        instance: "norgeskart3",
        configurl: "//www.norgeskart.no/config/"
      };
      var listprojects = [];
      var mapConfig = {
        name: "default config",
        useCategories: true,
        showProgressBar: true,
        showMousePosition: true,
        comment: "",
        numZoomLevels: 18,
        newMaxRes: 21664,
        extent: [-2000000, 3500000, 3545984, 9045984],
        extentUnits: "m",
        proxyHost: "",
        searchHost: "",
        tokenHost: "",
        ticketHost: "",
        searchpointzoom: 12,
        groups: [],
        languages: {
          no: {},
          en: {}
        },
        layers: [{
          id: "1992",
          isBaseLayer: true,
          subLayers: [{
            title: "norges_grunnkart",
            source: "WMS",
            url: ["http://opencache.statkart.no/gatekeeper/gk/gk.open?LAYERS=norges_grunnkart"],
            gatekeeper: true,
            name: "norges_grunnkart",
            format: "image/png",
            coordinate_system: "EPSG:32632",
            id: "1992",
            tiled: true
          }],
          visibleOnLoad: false
        }],
        zoom: 3,
        center: [570130, 7032300],
        hoverOptions: {
          multiSelect: true,
          mmultiSelect: false
        },
        coordinate_system: "EPSG:32632",
        onlyOneGroup: false,
        isOffline: false
      };
      var defaultProjectConfig = {
        config: {
          project: {
            lat: 7197864,
            lon: 396722,
            mapepsg: "EPSG:25833",
            zoom: 4,
            mapbackgroundcolor: "#FFFFFF",
            displaycenterepsgcode: "EPSG:25833",
            displayCenter: "396722,7197864",
            displayprojectionepsgcode: "EPSG:25833",
            isygatekeeper: "https://www.norgeskart.no/ws/gatekeeper.py?key=73e029c3632c49bb1586fc57a60fb701kv",
            tickethost: "https://www.norgeskart.no/ws/esk.py?wms.ecc_enc",
            name: "seeiendom"
          },
          wmts: [{
            type: "map",
            gatekeeper: "true",
            name: "landkart",
            url: "https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?",
            params: {
              layers: "norgeskart_bakgrunn",
              format: "image/png"
            },
            matrixprefix: "true",
            guid: "0.norgeskart_bakgrunn",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "true"
            },
            thumbnail: "land"
          }, {
            type: "map",
            gatekeeper: "true",
            name: "flybilder",
            url: "http://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.nib_utm33_wmts_v2?|http://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.nib_utm33_wmts_v2?",
            params: {
              layers: "Nibcache_UTM33_EUREF89",
              format: "image/png"
            },
            matrixset: "default028mm",
            guid: "0.ortofoto",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            },
            thumbnail: "aerial"
          }, {
            type: "map",
            gatekeeper: "true",
            name: "rasterkart",
            url: "https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?",
            params: {
              layers: "toporaster3",
              format: "image/png"
            },
            matrixprefix: "true",
            guid: "0.toporaster3",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            },
            thumbnail: "raster"
          }, {
            type: "map",
            gatekeeper: "true",
            name: "gratone",
            url: "https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?",
            params: {
              layers: "norges_grunnkart_graatone",
              format: "image/png"
            },
            matrixprefix: "true",
            guid: "0.norges_grunnkart_graatone",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            }
          }, {
            type: "map",
            gatekeeper: "true",
            name: "enkel",
            url: "https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?",
            params: {
              layers: "norges_grunnkart",
              format: "image/png"
            },
            matrixprefix: "true",
            guid: "0.norges_grunnkart",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            }
          }, {
            type: "map",
            gatekeeper: "true",
            name: "terreng",
            url: "https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?",
            params: {
              layers: "terreng_norgeskart",
              format: "image/png"
            },
            matrixprefix: "true",
            guid: "0.terreng_norgeskart",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            }
          }, {
            type: "map",
            gatekeeper: "true",
            name: "sjokart",
            url: "https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?",
            params: {
              layers: "sjokartraster",
              format: "image/png"
            },
            matrixprefix: "true",
            guid: "0.sjokartraster",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            }
          }, {
            type: "map",
            name: "jan_mayen",
            url: "https://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_JanMayen_WMTS_25833/MapServer/WMTS?",
            params: {
              layers: "Basisdata_NP_Basiskart_JanMayen_WMTS_25833",
              format: "image/png"
            },
            matrixset: "default028mm",
            wmtsextent: "-393783.2540000008,7978220.98008712,-276963.7430000013,8084965.524000007",
            getcapabilities: "true",
            guid: "2.Basisdata_NP_Basiskart_JanMayen_WMTS_25833",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            }
          }, {
            type: "map",
            name: "svalbard",
            url: "https://geodata.npolar.no/arcgis/rest/services/Basisdata/NP_Basiskart_Svalbard_WMTS_25833/MapServer/WMTS?",
            params: {
              layers: "Basisdata_NP_Basiskart_Svalbard_WMTS_25833",
              format: "image/png"
            },
            matrixset: "default028mm",
            wmtsextent: "369976.3899489096,8221306.539890718,878234.7199568129,9010718.76990194",
            getcapabilities: "true",
            guid: "2.Basisdata_NP_Basiskart_Svalbard_WMTS_25833",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "false"
            }
          }],
          wms: [{
            type: "overlay",
            Layers: {
              Layer: {
                name: "cells",
                queryable: "false",
                title: "Elektron. Sjøkart"
              }
            },
            ticket: "true",
            name: "elektron_sjokart",
            url: "https://wms.geonorge.no/skwms1/wms.ecc_enc",
            params: {
              layers: "cells",
              format: "image/png"
            },
            guid: "0.cells",
            options: {
              isbaselayer: "true",
              singletile: "true",
              visibility: "false"
            }
          }, {
            type: "overlay",
            gatekeeper: "true",
            name: "adresser",
            url: "//wms.geonorge.no/skwms1/wms.matrikkel.seeiendom2",
            groupid: 1,
            maxResolution: 2,
            params: {
              layers: "matrikkel:MATRIKKELADRESSEWFS,matrikkel:VEGADRESSEWFS",
              format: "image/png"
            },
            guid: "1.matrikkeladresse",
            options: {
              isbaselayer: "false",
              singletile: "true",
              visibility: "false"
            }
          }, {
            type: "overlay",
            gatekeeper: "true",
            name: "bygninger",
            url: "//wms.geonorge.no/skwms1/wms.matrikkel.seeiendom2",
            groupid: 1,
            maxResolution: 2,
            params: {
              layers: "matrikkel:BYGNINGWFS",
              format: "image/png"
            },
            guid: "1.bygning",
            options: {
              isbaselayer: "false",
              singletile: "true",
              visibility: "false"
            }
          }, {
            type: "overlay",
            gatekeeper: "true",
            name: "teiger_og_grenser",
            url: "//wms.geonorge.no/skwms1/wms.matrikkel.seeiendom2",
            groupid: 1,
            maxResolution: 2,
            params: {
              layers: "matrikkel:TEIGGRENSEWFS,matrikkel:TEIGWFS",
              format: "image/png",
              styles: ",Matrikkelnummer"
            },
            guid: "1.teiggrense",
            options: {
              isbaselayer: "false",
              singletile: "true",
              visibility: "true"
            }
          }],
          maplayer: {
            index: 1,
            name: "matrikkel_data",
            groupid: 1
          },
          mapbounds: {
            mapbound: [{
              epsg: "EPSG:23031",
              extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
            }, {
              epsg: "EPSG:23032",
              extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
            }, {
              epsg: "EPSG:23033",
              extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
            }, {
              epsg: "EPSG:23034",
              extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
            }, {
              epsg: "EPSG:23035",
              extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
            }, {
              epsg: "EPSG:23036",
              extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
            }, {
              epsg: "EPSG:25831",
              extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
            }, {
              epsg: "EPSG:25832",
              extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
            }, {
              epsg: "EPSG:25833",
              extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
            }, {
              epsg: "EPSG:25834",
              extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
            }, {
              epsg: "EPSG:25835",
              extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
            }, {
              epsg: "EPSG:25836",
              extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
            }, {
              epsg: "EPSG:32631",
              extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
            }, {
              epsg: "EPSG:32632",
              extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
            }, {
              epsg: "EPSG:25833",
              extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
            }, {
              epsg: "EPSG:32634",
              extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
            }, {
              epsg: "EPSG:32635",
              extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
            }, {
              epsg: "EPSG:32636",
              extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
            }, {
              epsg: "EPSG:4326",
              extent: "-180, -90, 180, 90"
            }, {
              epsg: "EPSG:3857",
              extent: "-20037508.34, -20037508.34, 20037508.34, 20037508.34"
            }, {
              epsg: "EPSG:900913",
              extent: "-20037508.34, -20037508.34, 20037508.34, 20037508.34"
            }, {
              epsg: "EPSG:54009",
              extent: "-18000000.0, -9000000.0, 18000000.0, 9000000.0"
            }, {
              epsg: "EPSG:3006",
              extent: "-1200000.0, 4700000.0, 2600000.0, 8500000.0"
            }]
          }
        }
      };

      var getConfigCallback = function (configJson) {
        projectUrl = configJson.configurl;
        if ($location.search().application !== undefined || $location.search().instance !== undefined) {
          if ($location.search().application !== undefined) {
            instance = $location.search().application;
          } else {
            instance = $location.search().instance;
          }
        } else {
          instance = configJson.instance;
        }
        if (instance === undefined) {
          instance = '';
        }
        projectUrl += '/';
        var nameProject = projectName();
        if (nameProject.length > 0) {
          projectNameUrl = nameProject;
          projectUrl += nameProject.toLowerCase() + '.json';
        }
        getProjectsListCallback(listprojects);
      };

      // var setSearch = function (obj) {
      //     if (!angular.equals(obj, $location.search())) {
      //         var newSearch = angular.extend($location.search(), obj);
      //         $location.search(newSearch);
      //     }
      // };

      function getProjectsListCallback(project) {
        projectsList = project ? project : undefined;
        if (projectNameUrl === 'seeiendom') {
          getProjectCallback(defaultProjectConfig, false);
        } else if (projectsList === undefined || projectNameUrl !== undefined) {
          map.GetConfigResource(projectUrl, 'application/json', getProjectCallback);
        }
        // else{
        // headerAppFactory.setShowSimpleHeader(true);
        // giAppFactory.setListProjectsBody();
        // }
      }

      var _setDeafultProject = function () {
        var obj = $location.search();
        obj.project = "seeiendom";
        var newSearch = angular.extend($location.search(), obj);
        $location.search(newSearch);
      };

      var projectName = function () {
        var absUrl = $location.$$absUrl;
        if (absUrl.indexOf("project=") > -1) {
          var projectName = /project=([^&]+)&/.exec(absUrl);
          if (projectName === null) {
            projectName = /project=([^]+)/.exec(absUrl);
            if (projectName === null) {
              _setDeafultProject();
            }
          }
          return decodeURIComponent(projectName[1]);
        } else {
          _setDeafultProject();
          return 'seeiendom';
        }
      };

      var getProject = function () {
        getConfigCallback(config);
      };

      function getProjectCallback(project, isOffline) {
        projectConfig = project;
        if (projectConfig === undefined || project.config === undefined || project.config.mapbounds === undefined) {
          console.error("project and/or coordinateExtend is undefined. Check project config");
          // headerAppFactory.setShowSimpleHeader(true);
          // giAppFactory.setErrorBody();
          // $rootScope.$apply();
          return false;
        }

        mapConfig = new ISY.Repository.MapConfig(angular.copy(mapConfig));
        mapConfig.instance = instance;
        mapConfig.projectName = projectName().toLowerCase();
        mapConfig.isOffline = isOffline;

        if (project.config.project.isyauth !== undefined) {
          mapConfig.authHost = project.config.project.isyauth;
          mapConfig.authHost += "/authjson/";
          // TODO: Remove hardcoded "geoinnsyn" instance.
          // authorizationPageService.init(mapConfig.authHost, instance);
          // authorizationPageService.readToken();
          // bookmarkMenuService.init(mapConfig.authHost, instance);
        }
        if (project.config.project.isyattachment !== undefined) {
          mapConfig.attachmentHost = project.config.project.isyattachment;
        }
        if (project.config.project.isyproxy !== undefined) {
          mapConfig.proxyHost = project.config.project.isyproxy + '/?';
        }
        if (project.config.project.isypicklist !== undefined) {
          mapConfig.picklistHost = project.config.project.isypicklist;
          mapConfig.picklistHost += "/picklist/";
          // mapFeaturesService.init(mapConfig.picklistHost);
        }
        if (project.config.project.isygatekeeper !== undefined) {
          mapConfig.tokenHost = project.config.project.isygatekeeper;
        }
        if (project.config.project.tickethost !== undefined) {
          mapConfig.ticketHost = project.config.project.tickethost;
        }
        if (project.config.project.isysearch !== undefined) {
          mapConfig.searchHost = project.config.project.isysearch;
        }
        if (project.config.project.codelists !== undefined) {
          mapConfig.codelists = project.config.project.codelists;
        }

        var isyTokenIsSet = false;

        if ($location.search().isytoken !== undefined) {
          if ($location.search().isytoken !== '123') {
            mapConfig.zoom = parseFloat($location.search().zoom);
            mapConfig.center[0] = parseFloat($location.search().lon);
            mapConfig.center[1] = parseFloat($location.search().lat);
            isyTokenIsSet = true;
          }
        }
        if (!isyTokenIsSet) {
          mapConfig.zoom = project.config.project.zoom;
          mapConfig.center[0] = project.config.project.lon;
          mapConfig.center[1] = project.config.project.lat;
        }

        if ($location.search().search !== undefined) {
          mapConfig.search = $location.search().search;
          delete $location.search().search;
        }

        mapConfig.coordinate_system = project.config.project.mapepsg;
        mapConfig.mouseProjectionPrefix = project.config.project.displayprojectionprefix;
        mapConfig.headerTitle = project.config.project.headertitle;
        mapConfig.siteTitle = project.config.project.sitetitle;
        mapConfig.isy3dflyurl = project.config.project.isy3dflyurl;
        mapConfig.featureDict = project.config.featureDict;
        // if (project.config.project.isy3dflyurl === undefined){
        //     mainMenuButtonsOverlayFactory.showButton('3DView', false);
        // }else{
        //     mainMenuButtonsOverlayFactory.showButton('3DView', true);
        // }


        // var layout = getLayout(project.config.project.layout);
        // if (layout) {
        //     mapConfig.showMousePosition = layout.enablemousepositionctrl === 'true';
        // }
        updateMapConfigWithCoordinateAndExtend(project.config.mapbounds);
        //
        updateMapConfigWithGroups(project);
        updateMapConfigWithImageLayers(project);
        // updateMapConfigWithWfs(project);
        // updateLayersSortingIndex();
        registerTranslations(mapConfig.languages);
        repository.GetMapConfigFromJson(mapConfig);

        return true;
      }

      var getBound = function (coordinateAndExtent) {
        var bound;
        for (var i = 0; i < coordinateAndExtent.mapbound.length; i++) {
          bound = coordinateAndExtent.mapbound[i];
          if (bound.epsg === mapConfig.coordinate_system) {
            return bound;
          }
        }
        return undefined;
      };

      var updateMapConfigWithCoordinateAndExtend = function (coordinateAndExtend) {
        if (coordinateAndExtend === undefined) {
          return;
        }

        var bound = getBound(coordinateAndExtend);
        if (bound === undefined) {
          console.error("Coordinatesystem is not defined. Maybe missing in file app.config");
        } else {
          mapConfig.extent = bound.extent.toString().split(',').map(function (item) {
            return parseInt(item, 10);
          });
        }
      };

      var updateMapConfigWithGroups = function (project) {
        if (project.config.maplayer !== undefined) {
          if (project.config.maplayer.length !== undefined) {
            project.config.maplayer.forEach(function (group) {
              createGroup(group.groupid, group.name, group.namelng, group.display);
            });
          } else {
            createGroup(project.config.maplayer.groupid, project.config.maplayer.name, project.config.maplayer.namelng, project.config.maplayer.display);
          }
        }

      };

      var createGroup = function (groupId, groupNameLng1, groupNameLng2, visibleOnLoad) {
        var newGroup = new ISY.Repository.Category({
          groupId: groupId,
          name: groupNameLng1,
          parentId: groupNameLng2,
          visibleOnLoad: _getBoolean(visibleOnLoad)
        });
        groupIds.push(groupId);
        mapConfig.groups.push(newGroup);
        mapConfig.languages.en[newGroup.groupId] = groupNameLng1; // has to be fix with correct value!
        mapConfig.languages.no[newGroup.groupId] = groupNameLng2;
      };

      var updateMapConfigWithImageLayers = function (project) {
        if (project.config.wmts !== undefined) {
          if (project.config.wmts.length !== undefined) {
            project.config.wmts.forEach(function (wmts) {
              addWmts(wmts);
            });
          } else {
            addWmts(project.config.wmts);
          }
        }
        if (project.config.wms !== undefined) {
          if (project.config.wms.length !== undefined) {
            project.config.wms.forEach(function (wms) {
              addWms(wms);
            });
          } else {
            addWms(project.config.wms);
          }
        }
        if (project.config.vector !== undefined) {
          if (project.config.vector.length !== undefined) {
            project.config.vector.forEach(function (vector) {
              addVector(vector);
            });
          } else {
            addVector(project.config.vector);
          }
        }
      };

      var findGroupExistance = function (grpIds) {
        var notExistGroups = [];
        grpIds.forEach(function (grpId) {
          if (groupIds.indexOf(grpId) === -1) {
            notExistGroups.push(grpId);
          }
        });
        return notExistGroups;
      };

      var createNotExistGroup = function (grpIds, groupNameLng1, groupNameLng2) {
        var notExistGroups = findGroupExistance(grpIds);
        notExistGroups.forEach(function (grpId) {
          createGroup(grpId, groupNameLng1, groupNameLng2);
        });
      };

      var createDummyGroup = function () { //dummy category for layers without group id
        if (notDummyGroup === false) {
          createGroup(999, 'Other layers', 'Andre lag');
          notDummyGroup = true;
        }
      };

      var addWms = function (wms) {
        addLayer("WMS", wms);
      };

      var addWmts = function (wmts) {
        addLayer("WMTS", wmts);
      };

      var addVector = function (vector) {
        addLayer("VECTOR", vector);
      };

      var addLayer = function (sourceType, source) {

        var cat_ids = [999];
        if (source.groupid !== undefined) {
          cat_ids = source.groupid.toString().split(',').map(function (item) {
            return parseInt(item, 10);
          });
          createNotExistGroup(cat_ids, source.name, source.namelng);
        } else {
          if (source.options.isbaselayer === 'false') {
            createDummyGroup();
          }
        }

        //if (source.gatekeeper === 'true'){
        //    wmsSource = "WMS"; // WMS is default
        //}else{
        //    wmsSource = "proxyWms";
        //}
        // var thumbnailInfo = '';
        // var sourceName = source.name.toLocaleLowerCase();
        // if (sourceName.indexOf('raster') > -1 && source.options.isbaselayer === 'true'){
        //     thumbnailInfo = 'raster';
        // }
        //
        // if (sourceName.indexOf('land') > -1 && source.options.isbaselayer === 'true'){
        //     thumbnailInfo = 'land';
        // }
        //
        // if (sourceName.indexOf('fly') > -1 && source.options.isbaselayer === 'true'){
        //     thumbnailInfo = 'aerial';
        // }


        var newIsyLayer = new ISY.Domain.Layer({
          subLayers: [{
            title: source.name,
            name: source.params.layers || source.name,
            providerName: source.params.layers || source.name,
            source: sourceType,
            gatekeeper: source.gatekeeper === "true",
            ticket: source.ticket || false,
            url: getWmsUrl(source.url),
            format: source.params.format,
            coordinate_system: source.epsg || mapConfig.coordinate_system,
            extent: mapConfig.extent,
            extentUnits: mapConfig.extentUnits,
            matrixPrefix: source.matrixprefix === "true",
            matrixSet: source.matrixset,
            numZoomLevels: mapConfig.numZoomLevels,
            id: sourceType === 'VECTOR' ? mapConfig.layers.length + 8001 : mapConfig.layers.length + 1001,
            transparent: true,
            layerIndex: -1,
            legendGraphicUrl: source.legendurl,
            minScale: source.options.minscale,
            maxScale: source.options.maxscale,
            sortingIndex: -1,
            featureInfo: {
              supportsGetFeatureInfo: true,
              getFeatureInfoFormat: "application/vnd.ogc.gml",
              getFeatureInfoCrs: "",
              supportsGetFeature: true,
              getFeatureBaseUrl: "",
              getFeatureFormat: "application/json",
              getFeatureCrs: "EPSG:4326",
              includedFields: source.includedfields,
              featureDict: mapConfig.featureDict
            },
            tiled: source.options.singletile !== "true",
            crossOrigin: null,
            style: source.style,
            wmtsExtent: source.wmtsextent,
            getCapabilities: (source.getcapabilities === 'true'),
            styles: source.params.styles,
            minResolution: source.minresolution,
            maxResolution: source.maxresolution
          }],
          guid: source.guid,
          name: source.name,
          groupId: cat_ids,
          order: source.order,
          visibleOnLoad: (source.options.visibility === 'true'),
          id: sourceType === 'VECTOR' ? mapConfig.layers.length + 8001 : mapConfig.layers.length + 1001,
          isBaseLayer: (source.options.isbaselayer === 'true'),
          previewActive: false,
          opacity: 1,
          mapLayerIndex: -1,
          legendGraphicUrls: [],
          selectedLayerOpen: false,
          thumbnail: source.thumbnail
        });
        mapConfig.layers.push(newIsyLayer);
        mapConfig.languages.en[newIsyLayer.id] = source.name;
        mapConfig.languages.no[newIsyLayer.id] = source.namelng;
      };

      var _getBoolean = function (value) {
        switch (typeof value) {
          case "string":
            return value === "true";
          case "boolean":
            return value;
        }
        return false;
      };

      var getWmsUrl = function (url) {
        if (url.indexOf('|')) {
          return url.split('|');
        } else {
          return url;
        }
      };

      function registerTranslations(languages) {
        angular.extend(translations.en, languages.en);
        angular.extend(translations.no, languages.no);
        $translate.refresh();
      }

      var lastSelectedSearchPanel = 'searchOptionsPanel';

      return {
        getMapConfig: function () {
          return mapConfig;
        },
        updateMapConfig: function () {
          getProject();
        },
        projectName: function () {
          projectName();
        },
        setInitLayersInUrl: function (url) {
          beginLayersInURL = url;
        },
        getInitLayersInUrl: function () {
          return beginLayersInURL;
        },

        setMainMenuStatus: function (status) {
          mainMenuIsOpen = status;
        },

        isMainMenuOpen: function () {
          return mainMenuIsOpen;
        },

        setActiveSearchPanel: function (id) {
          lastSelectedSearchPanel = id;
        },

        getLastActiveSearchPanel: function () {
          return lastSelectedSearchPanel;
        }
      };
    }
  ]);

angular.module('mainApp')
    .factory('mainAppFactory', ['ISY.MapAPI.Map','$location','ISY.Repository','$translate','translations', '$timeout',
        function(map, $location, repository, $translate, translations, $timeout){

            var instance = "";
            var configUrl;
            var projectUrl;
            var beginLayersInURL;
            var projectsList;
            var projectConfig;
            var groupIds = [];
            var notDummyGroup = false;
            var projectNameUrl;
            var mapConfig =
            {
                "name": "default config",
                "useCategories": true,
                "showProgressBar": true,
                "showMousePosition": true,
                "comment": "",
                "numZoomLevels": 18,
                "newMaxRes":  21664,
                "extent": [-2000000, 3500000, 3545984, 9045984],
                "extentUnits": "m",
                "proxyHost": "",
                "searchHost": "",
                "tokenHost": "",
                "searchpointzoom": 12,
                "groups": [],
                "languages": {
                    "no": {},
                    "en": {}
                },
                "layers": [
                            {
                                "id": "1992",
                                "isBaseLayer": true,
                                "subLayers": [
                                    {
                                        "title": "norges_grunnkart",
                                        "source": "WMS",
                                        "url": ["http://opencache.statkart.no/gatekeeper/gk/gk.open?LAYERS=norges_grunnkart"],
                                        "gatekeeper": true,
                                        "name": "norges_grunnkart",
                                        "format": "image/png",
                                        "coordinate_system": "EPSG:32632",
                                        "id": "1992",
                                        "tiled": true
                                    }
                                ],
                                "visibleOnLoad": true
                            }
                ],
                "zoom": 3,
                "center": [570130,7032300],
                "hoverOptions": {
                    "multiSelect": true,
                    "mmultiSelect": false
                },
                "coordinate_system": "EPSG:32632",
                "onlyOneGroup": false,
                "isOffline": false
            };

            var getConfigCallback = function(configJson){
                configUrl = configJson.config.configurl;
                projectUrl = configJson.config.configurl;
                if ($location.search().application !== undefined || $location.search().instance !== undefined){
                    if ($location.search().application !== undefined){
                        instance = $location.search().application;
                    }else{
                        instance = $location.search().instance;
                    }

                }else{
                    instance = configJson.config.instance;
                }
                if (instance === undefined){
                    instance = '';
                }
                var projectsListUrl = projectUrl;
                projectsListUrl += '/api/v1/listprojects?application=' + instance;
                projectUrl += '/api/v1/project?application=' + instance + '&name=';
                var nameProject = projectName();
                if (nameProject.length > 0){


                    projectNameUrl = nameProject;

                    projectUrl += nameProject.toLowerCase();
                }

                // map.GetResource(projectUrl, 'application/json', getProjectCallback);
                map.GetResourceFromJson(projectsListUrl, 'application/json', getProjectsListCallback);

            };

            // var setSearch = function (obj) {
            //     if (!angular.equals(obj, $location.search())) {
            //         var newSearch = angular.extend($location.search(), obj);
            //         $location.search(newSearch);
            //     }
            // };

            function getProjectsListCallback(project){
                projectsList = project ? project : undefined;
                if (projectsList === undefined || projectNameUrl !== undefined) {
                    map.GetConfigResource(projectUrl, 'application/json', getProjectCallback);
                }
                // else{
                    // headerAppFactory.setShowSimpleHeader(true);
                    // giAppFactory.setListProjectsBody();
                // }
            }

            var _setDeafultProject = function () {
                var obj = $location.search();
                obj.project = "norgeskart";
                var newSearch = angular.extend($location.search(), obj);
                $location.search(newSearch);
                $timeout(function () {
                    window.location.reload();
                }, 0);
            };

            var projectName = function(){
                var absUrl = $location.$$absUrl;
                if (absUrl.indexOf("project=") > -1){
                    var projectName = /project=([^&]+)&/.exec(absUrl);
                    if (projectName === null){
                        projectName = /project=([^]+)/.exec(absUrl);
                        if (projectName === null){
                            _setDeafultProject();
                        }
                    }
                    return decodeURIComponent(projectName[1]);
                }else{
                    _setDeafultProject();
                }
            };

            var getProject = function() {
                //map.GetResource('config.xml', 'application/json', getConfigCallback);
                //map.GetConfigResource('config.xml', 'application/json', getConfigCallback);
                getConfigCallback(xml2json.parser($.ajax({
                    type: "GET",
                    url: "config.xml",
                    async: false
                }).responseText));
            };

            function getProjectCallback(project, isOffline) {
                projectConfig = project;
                if (projectConfig === undefined || project.config === undefined || project.config.mapbounds === undefined) {
                    console.log("project and/or coordinateExtend is undefined. Check project config");
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
                if (project.config.project.isysearch !== undefined) {
                    mapConfig.searchHost = project.config.project.isysearch;
                }
                if (project.config.project.codelists !== undefined) {
                    mapConfig.codelists = project.config.project.codelists;
                }

                var isyTokenIsSet = false;

                if ($location.search().isytoken !== undefined){
                    if ($location.search().isytoken !== '123'){
                        mapConfig.zoom = parseFloat($location.search().zoom);
                        mapConfig.center[0] = parseFloat($location.search().lon);
                        mapConfig.center[1] = parseFloat($location.search().lat);
                        isyTokenIsSet = true;
                    }
                }
                if (!isyTokenIsSet){
                    mapConfig.zoom = project.config.project.zoom;
                    mapConfig.center[0] = project.config.project.lon;
                    mapConfig.center[1] = project.config.project.lat;
                }

                if ($location.search().search !== undefined){
                    mapConfig.search = $location.search().search;
                    delete $location.search().search;
                }

                mapConfig.coordinate_system = project.config.project.mapepsg;
                mapConfig.mouseProjectionPrefix = project.config.project.displayprojectionprefix;
                mapConfig.headerTitle = project.config.project.headertitle;
                mapConfig.siteTitle = project.config.project.sitetitle;
                mapConfig.isy3dflyurl = project.config.project.isy3dflyurl;
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

            var getBound = function(coordinateAndExtent) {
                var bound;

                for (var i = 0; i < coordinateAndExtent.mapbound.length; i++){
                    bound = coordinateAndExtent.mapbound[i];
                    if (bound.epsg === mapConfig.coordinate_system){
                        return bound;
                    }
                }

                return undefined;

            };

            var updateMapConfigWithCoordinateAndExtend = function(coordinateAndExtend) {
                if (coordinateAndExtend === undefined) {
                    return;
                }

                var bound = getBound(coordinateAndExtend);
                if (bound === undefined) {
                    console.log("Coordinatesystem is not defined. Maybe missing in file app.config");
                } else {
                    mapConfig.extent = bound.extent.toString().split(',').map(function(item){
                        return parseInt(item, 10);
                    });
                }
            };

            var updateMapConfigWithGroups = function(project) {
                if (project.config.maplayer !== undefined){
                    if (project.config.maplayer.length !== undefined){
                        project.config.maplayer.forEach(function(group) {
                            createGroup(group.groupid, group.name, group.namelng, group.display);
                        });
                    }else{
                        createGroup(project.config.maplayer.groupid, project.config.maplayer.name, project.config.maplayer.namelng, project.config.maplayer.display);
                    }
                }

            };

            var createGroup = function(groupId, groupNameLng1, groupNameLng2, visibleOnLoad){
                var newGroup = new ISY.Repository.Category({
                    "groupId": groupId,
                    "name": groupNameLng1,
                    "parentId": groupNameLng2,
                    "visibleOnLoad": _getBoolean(visibleOnLoad)
                });
                groupIds.push(groupId);
                mapConfig.groups.push(newGroup);
                mapConfig.languages.en[newGroup.groupId] = groupNameLng1; // has to be fix with correct value!
                mapConfig.languages.no[newGroup.groupId] = groupNameLng2;
            };

            var updateMapConfigWithImageLayers = function(project) {
                if (project.config.wms !== undefined) {
                    if (project.config.wms.length !== undefined) {
                        project.config.wms.forEach(function (wms) {
                            addWms(wms);
                        });
                    } else {
                        addWms(project.config.wms);
                    }
                }
                if (project.config.wmts !== undefined){
                    if (project.config.wmts.length !== undefined) {
                        project.config.wmts.forEach(function (wmts) {
                            addWmts(wmts);
                        });
                    } else {
                        addWmts(project.config.wmts);
                    }
                }
                if (project.config.vector !== undefined){
                    if (project.config.vector.length !== undefined) {
                        project.config.vector.forEach(function (vector) {
                            addVector(vector);
                        });
                    } else {
                        addVector(project.config.vector);
                    }
                }
            };

            var findGroupExistance = function(grpIds){
                var notExistGroups = [];
                grpIds.forEach(function (grpId) {
                    if (groupIds.indexOf(grpId) === -1){
                        notExistGroups.push(grpId);
                    }
                });
                return notExistGroups;
            };

            var createNotExistGroup = function(grpIds, groupNameLng1, groupNameLng2){
                var notExistGroups = findGroupExistance(grpIds);
                notExistGroups.forEach(function(grpId){
                    createGroup(grpId, groupNameLng1, groupNameLng2);
                });
            };

            var createDummyGroup = function(){ //dummy category for layers without group id
                if (notDummyGroup === false){
                    createGroup(999, 'Other layers', 'Andre lag');
                    notDummyGroup = true;
                }
            };

            var addWms = function(wms){
                addLayer("WMS", wms);
            };

            var addWmts = function(wmts){
                addLayer("WMTS", wmts);
            };

            var addVector = function(vector){
                addLayer("VECTOR", vector);
            };

            var addLayer = function(sourceType, source) {

                var cat_ids = [999];
                if (source.groupid !== undefined){
                    cat_ids = source.groupid.toString().split(',').map(function(item){
                        return parseInt(item, 10);
                    });
                    createNotExistGroup(cat_ids, source.name, source.namelng);
                }else{
                    if (source.options.isbaselayer === 'false'){
                        createDummyGroup();
                    }
                }

                //if (source.gatekeeper === 'true'){
                //    wmsSource = "WMS"; // WMS is default
                //}else{
                //    wmsSource = "proxyWms";
                //}



                var newIsyLayer = new ISY.Domain.Layer({
                    "subLayers": [
                        {
                            "title": source.name,
                            "name": source.params.layers||source.name,
                            "providerName": source.params.layers||source.name,
                            "source": sourceType,
                            "gatekeeper": source.gatekeeper === "true",
                            "url": getWmsUrl(source.url),
                            "format": source.params.format,
                            "coordinate_system": source.epsg||mapConfig.coordinate_system,
                            "extent": mapConfig.extent,
                            "extentUnits": mapConfig.extentUnits,
                            "matrixPrefix": source.matrixprefix === "true",
                            "numZoomLevels": mapConfig.numZoomLevels,
                            "id": mapConfig.layers.length+1001,
                            "transparent": true,
                            "layerIndex": -1,
                            //"legendGraphicUrl": source.layers.layer.legendurl,
                            "minScale": source.options.minscale,
                            "maxScale": source.options.maxscale,
                            "sortingIndex": -1,
                            "featureInfo": {
                                "supportsGetFeatureInfo": true,
                                "getFeatureInfoFormat": "application/vnd.ogc.gml",
                                "getFeatureInfoCrs": "",
                                "supportsGetFeature": true,
                                "getFeatureBaseUrl": "",
                                "getFeatureFormat": "application/json",
                                "getFeatureCrs": "EPSG:4326"
                            },
                            "tiled": source.options.singletile !== "true",
                            "crossOrigin": null
                        }
                    ],
                    "guid": source.guid,
                    "name":source.name,
                    "groupId": cat_ids,
                    "visibleOnLoad": (source.options.visibility === 'true'),
                    "id":  mapConfig.layers.length+1001,
                    "isBaseLayer": (source.options.isbaselayer === 'true'),
                    "previewActive": false,
                    "opacity": 1,
                    "mapLayerIndex": -1,
                    "legendGraphicUrls": [],
                    "selectedLayerOpen": false
                });
                mapConfig.layers.push(newIsyLayer);
                mapConfig.languages.en[newIsyLayer.id] = source.name;
                mapConfig.languages.no[newIsyLayer.id] = source.namelng;
            };

            var _getBoolean = function(value){
                switch (typeof value){
                    case "string":
                        return value === "true" ? true : false;
                    case "boolean":
                        return value;
                }
                return false;
            };

            var getWmsUrl = function(url){
                if (url.indexOf('|')){
                    var urls = url.split('|');
                    return urls;
                } else {
                    return url;
                }
            };

            function registerTranslations(languages) {
                angular.extend(translations.en, languages.en);
                angular.extend(translations.no, languages.no);
                $translate.refresh();
            }

            return {
                getMapConfig: function () {
                    return mapConfig;
                },
                updateMapConfig: function() {
                    getProject();
                },
                setInitLayersInUrl: function (url) {
                    beginLayersInURL = url;
                },
                getInitLayersInUrl: function () {
                    return beginLayersInURL;
                }
            };
        }]
    );
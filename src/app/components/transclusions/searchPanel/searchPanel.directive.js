angular.module('searchPanel')
    .directive('searchPanel', ['$timeout','mainAppService', 'ISY.MapAPI.Map','ISY.EventHandler','$http',
        function($timeout, mainAppService, map, eventHandler, $http) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchPanel.html',
                restrict: 'A',
                controller: 'searchPanelController',
                link: function(scope){
                    scope.searchBarValueChanged = function () {
                        if (scope.searchBarModel === '') {
                            scope.cleanResults();
                            return;
                        }
                        var query = _getQuery();
                        if (_checkQueryForCoordinates(query)){
                            scope.initSearchOptions();
                            return;
                        }
                        _init(query);
                        scope.showSearchResultPanel();
                        _getResults(query);
                    };

                    scope.sourceDict = {
                        'ssr': 'Stedsnavn',
                        'adresse': 'Adresse',
                        'matrikkelveg': 'Vegnavn',
                        'matrikkeladresse': 'Adresse',
                        'coordGeo': 'Geografisk koordinat',
                        'coordUtm': 'UTM-koordinat',
                        'mouseClick': 'Klikk i kartet'

                    };

                    _mapEpsg='EPSG:25833';

                    _searchResults = {};

                    _unifiedResults = {};

                    _serviceDict = {};

                    _queryDict = {};

                    String.prototype.replaceAll = function(search, replacement) {
                        var target = this;
                        return target.replace(new RegExp(search, 'g'), replacement);
                    };

                    var _checkQueryForCoordinates = function(query){
                        scope.coordinate=true;
                        var epsg=query.split('@')[1];
                        query=query.replaceAll(',','.');
                        var queryParts = query.split(' ');
                        if (queryParts.length !=2){
                            return false;
                        }
                        if (epsg){
                            _showQueryPoint(queryParts[1].split('@')[0], queryParts[0], 'EPSG:' + epsg, 'coordUtm');
                            return true;
                        }
                        if(((queryParts[0] > 32.88) && (queryParts[1] > -16.1)) && ((queryParts[0] < 84.17) && (queryParts[1] < 39.65))){
                            epsg='EPSG:4326';
                            _showQueryPoint(queryParts[0], queryParts[1], epsg, 'coordGeo');
                            return true;
                        }
                        if(((queryParts[0] > -2465220.60) && (queryParts[1] > 4102904.86)) && ((queryParts[0] < 771164.64) && (queryParts[1] < 9406031.63))){
                            epsg='EPSG:25833';
                            _showQueryPoint(queryParts[1], queryParts[0], epsg, 'coordUtm');
                            scope.searchBarModel+='@' + _mapEpsg.split(':')[1];
                            return true;
                        }
                        return false;
                    };

                    var _showQueryPoint = function(lat, lon, epsg, source){
                        var queryPoint = {
                            name: scope.sourceDict[source],
                            point: _constructPoint(lat, lon, epsg, _mapEpsg),
                            format: 'Koordinat',
                            source: source,
                            kommune: ''
                        };
                        if(!scope.searchResults) {
                            scope.searchResults= {};
                        }
                        scope.searchResults['searchBar'] = queryPoint;
                        map.RemoveInfoMarkers();
                        map.RemoveInfoMarker();
                        map.ShowInfoMarker(queryPoint.point);
                        scope.mouseDown(queryPoint);
                        scope.showSearchOptionsPanel();
                    };

                    var _init = function (query) {
                        _resetResults();
                        scope.searchResults = undefined;
                        scope.activeSearchResult=undefined;
                        _populateServiceDict(query);
                        scope.coordinate=false;
                    };

                    var _getQuery = function () {
                        return scope.searchBarModel + '';
                    };

                    var _populateServiceDict = function (query) {
                        _serviceDict['ssr'] = {
                            url: mainAppService.generateSearchStedsnavnUrl(query),
                            format: 'xml',
                            source: 'ssr',
                            epsg: 'EPSG:32633',
                            nameID: 'stedsnavn',
                            latID: 'nord',
                            lonID: 'aust',
                            kommuneID: 'kommunenavn'
                        };
                        _serviceDict['matrikkelveg'] = {
                            url: mainAppService.generateSearchMatrikkelVegUrl(query),
                            format: 'json',
                            source: 'matrikkelveg',
                            epsg: 'EPSG:32632',
                            nameID: 'NAVN',
                            latID: 'LATITUDE',
                            lonID: 'LONGITUDE',
                            kommuneID: 'KOMMUNENAVN'
                        };
                        _serviceDict['matrikkeladresse'] = {
                            url: mainAppService.generateSearchMatrikkelAdresseUrl(query),
                            format: 'json',
                            source: 'matrikkeladresse',
                            epsg: 'EPSG:32632',
                            nameID: 'NAVN',
                            latID: 'LATITUDE',
                            lonID: 'LONGITUDE',
                            kommuneID: 'KOMMUNENAVN'
                        };
                        /*
                         serviceDict['adresse'] = {
                         url: mainAppService.generateSearchAdresseUrl(query),
                         format: 'json',
                         source: 'adresse',
                         epsg: 'EPSG:4326',
                         nameID: 'adressenavn',
                         latID: 'nord',
                         lonID: 'aust'
                         };*/
                    };

                    var _getResults = function () {
                        _cancelOldRequests();
                        scope.searchTimestamp = parseInt((new Date()).getTime(), 10);
                        for (var service in _serviceDict) {
                            _downloadSearchBarFromUrl(_serviceDict[service], scope.searchTimestamp);
                        }
                    };

                    var _cancelOldRequests = function () {
                        for (var service in _queryDict){
                            _queryDict[service].abort();
                        }
                    };

                    var _resetResults = function () {
                        _unifiedResults = {};
                        _searchResults = {};
                    };

                    var _readResults = function () {
                        var jsonObject;
                        for (var service in _searchResults) {
                            var searchResult = _searchResults[service];
                            jsonObject = _convertSearchResult2Json(searchResult.document, searchResult.source);
                            _iterateJsonObject(jsonObject, searchResult);
                        }
                    };

                    var _convertSearchResult2Json = function (document, source) {
                        switch (source) {
                            case('ssr'):
                                return xml.xmlToJSON(document).sokRes.stedsnavn ;
                            case('adresse'):
                                return document.adresser;
                            default:
                                return JSON.parse(document);
                        }
                    };

                    var _iterateJsonObject = function (jsonObject, searchResult) {
                        if (jsonObject) {
                            if (!jsonObject.length) {
                                jsonObject = [jsonObject];
                            }
                            for (var i = 0; i < jsonObject.length; i++) {
                                if (jsonObject[i][_serviceDict[searchResult.source].latID]) {
                                    _getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]);
                                }
                            }
                        }
                    };

                    var _getValuesFromJson = function (identifiersDict, jsonObject) {
                        var name = _removeNumberFromName(jsonObject[identifiersDict.nameID]);
                        var lat = jsonObject[identifiersDict.latID] + '';
                        var lon = jsonObject[identifiersDict.lonID] + '';
                        var kommune = jsonObject[identifiersDict.kommuneID];
                        var point = _constructPoint(lat, lon, identifiersDict.epsg, _mapEpsg);
                        _pushToUnifiedResults(name, kommune, point, identifiersDict.format, identifiersDict.source);
                    };

                    var _removeNumberFromName = function (name) {
                        var nameArray = name.split(' ');
                        var matches = nameArray[nameArray.length - 1].match(/\d+/g);
                        if (matches != null) {
                            return name.replace(nameArray[nameArray.length - 1], '').trim();
                        }
                        else {
                            return name.trim();
                        }
                    };

                    var _pushToUnifiedResults = function (name, kommune, point, format, source) {
                        name = _capitalizeName(name.toLowerCase());
                        kommune = _capitalizeName(kommune.toLowerCase());
                        var resultID = name + kommune;
                        _unifiedResults[resultID] = {
                            name: name,
                            point: point,
                            format: format,
                            source: source,
                            kommune: kommune
                        };
                    };

                    var _constructPoint = function (lat, lon, epsgFrom, epsgTo) {
                        return ol.proj.transform([lon, lat], epsgFrom, epsgTo);
                    };

                    var _capitalizeName = function (name) {
                        name = name.trim();
                        name = _capitalizeNamePart(name, ' ');
                        name = _capitalizeNamePart(name, '-');
                        return name;
                    };

                    var _capitalizeNamePart = function (name, separator) {
                        var nameArray = name.split(separator);
                        var newName = '';
                        for (var i = 0; i < nameArray.length; i++) {
                            newName += _capitalizeFirstLetter(nameArray[i]) + separator;
                        }
                        newName = _rtrim(newName, 1);
                        return newName;
                    };

                    var _capitalizeFirstLetter = function (string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    };

                    var _rtrim = function (str, length) {
                        return str.substr(0, str.length - length);
                    };

                    var _downloadSearchBarFromUrl = function (_serviceDict, timestamp) {
                        _queryDict[_serviceDict.source] = $.ajax({
                            type: "GET",
                            url: _serviceDict.url,
                            async: true,
                            success: function (document) {
                                if ((( document.length && document.length > 3) || (document.childNodes && document.childNodes[0].childNodes.length)) && scope.searchTimestamp == timestamp) {
                                    _successFullSearch(_serviceDict, document);
                                }
                            }/*,
                             error: function (searchError) {
                             console.log("Error downloading from " + _serviceDict.url, searchError);
                             }*/
                        });
                    };

                    var _successFullSearch = function (_serviceDict, document) {
                        _searchResults[_serviceDict.source] = {
                            document: document,
                            format: _serviceDict.format,
                            source:_serviceDict.source,
                            epsg: _serviceDict.epsg
                        };
                        _readResults();
                        _addResultsToMap();

                    };

                    var _addResultsToMap = function () {
                        var coordinates = [];
                        for (var result in _unifiedResults) {
                            coordinates.push(_unifiedResults[result].point);
                        }
                        if (coordinates.length > 0) {
                            map.RemoveInfoMarkers();
                            map.ShowInfoMarkers(coordinates);
                            $timeout(function () {
                                scope.searchResults = _unifiedResults;
                            }, 0);
                        }
                    };

                    scope.mouseOver = function (searchResult){
                        map.RemoveInfoMarker();
                        map.ShowInfoMarker(searchResult.point);
                    };

                    scope.mouseDown = function (searchResult){
                        var activePosition = {
                            lon: parseFloat(searchResult.point[0]),
                            lat: parseFloat(searchResult.point[1]),
                            epsg: _mapEpsg
                            //zoom: parseFloat(12)
                        };
                        activePosition.geographicPoint=_constructPoint(activePosition.lat, activePosition.lon, _mapEpsg, 'EPSG:4326');
                        map.SetCenter(activePosition);
                        map.RemoveInfoMarkers();
                        scope.activePosition=activePosition;
                        scope.activeSearchResult=searchResult;
                        if(scope.searchOptionsDict['elevationPoint'] ) {
                            scope.searchOptionsDict['elevationPoint'].text.value = undefined;
                        }
                        if (scope.searchBarModel.length < searchResult.name.length && !scope.coordinate && scope.activeSearchResult.source != 'mouseClick'){
                            scope.searchBarModel=searchResult.name;
                        }
                        scope.initSearchOptions();
                    };

                    scope.cleanResults = function (){
                        _init();
                        map.RemoveInfoMarkers();
                        map.RemoveInfoMarker();
                        scope.searchBarModel = "";

                    };

                    var showQueryPointFromMouseClick = function (coordinates) {
                        scope.coordinate=true;
                        scope.showSearchResultPanel();
                        scope.cleanResults();
                        _showQueryPoint(coordinates[1], coordinates[0], _mapEpsg, 'mouseClick');
                        scope.initSearchOptions();

                    };

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.MapClickCoordinate, showQueryPointFromMouseClick);

                    // Start searchOptions

                    var _clickableLinkClass = {
                        icon: 'search-options pointer-cursor',
                        text: 'pointer-cursor'
                    };

                    var _defaultClass = {
                        icon: 'search-options',
                        text: ''
                    };

                    var _downloadSearchOptionFromUrl = function (url, name) {
                        $http.get(url).then(function (response) {
                            _addSearchOptionToPanel(name, response.data);
                        });
                    };

                    var _fetchElevationPoint = function () {
                        var lat = scope.activePosition.lat;
                        var lon = scope.activePosition.lon;
                        var epsgNumber = scope.activePosition.epsg.split(':')[1];
                        var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
                        _downloadSearchOptionFromUrl(elevationPointUrl, 'elevationPoint');
                    };

                    var _fetchMatrikkelInfo = function () {
                        var lat = scope.activePosition.geographicPoint[1];
                        var lon = scope.activePosition.geographicPoint[0];
                        var matrikkelInfoUrl = mainAppService.generateMatrikkelInfoUrl(lat, lon, lat, lon);
                        _downloadSearchOptionFromUrl(matrikkelInfoUrl, 'seEiendom');
                    };

                    var _addKoordTransToSearchOptions = function () {
                        var name = 'koordTrans';
                        scope.searchOptionsDict[name] = _constructSearchOption(name, 'x,y', true, 'Se koordinater', {});
                    };

                    var _addSeHavnivaaToSearchOptions = function () {
                        var name= 'seHavnivaa';
                        var lat = scope.activePosition.geographicPoint[1];
                        var lon = scope.activePosition.geographicPoint[0];
                        var extra = {
                            url: mainAppService.generateSeHavnivaaUrl(lat, lon)
                        };
                        scope.searchOptionsDict[name] = _constructSearchOption(name, '🌊', true, 'Se havnivå', extra);
                        // var lat = scope.activePosition.geographicPoint[0];
                        // var lon = scope.activePosition.geographicPoint[1];
                        // var seHavnivaaUrl = mainAppService.generateSeHavnivaaUrl(lat, lon);
                        // _downloadSearchBarFromUrl(seHavnivaaUrl, 'seHavnivaa');
                    };

                    var _addLagTurkartToSearchOptions = function () {
                        var name= 'lagTurkart';
                        scope.searchOptionsDict[name] = _constructSearchOption(name, '🚶', true, 'Lage turkart', {});
                    };

                    var _addEmergencyPosterToSearchOptions = function () {
                        var name='lagNodplakat';
                        scope.searchOptionsDict[name] = _constructSearchOption(name, '🚑', true, 'Lage nødplakat', {});
                    };

                    var _addElevationPointToSearchOptions = function (jsonRoot, name) {
                        var stedsnavn=jsonRoot.Output[0].Data.LiteralData.Text;
                        var text = 'Se fakta om stedsnavnet "' + stedsnavn + '"';
                        var extra = {
                            url: mainAppService.generateFaktaarkUrl(jsonRoot.Output[3].Data.LiteralData.Text)
                        };
                        scope.searchOptionsDict['ssrFakta'] = _constructSearchOption('ssrFakta', '⚑', true, text, extra);
                        if(scope.activeSearchResult.source=='mouseClick'){
                            scope.searchBarModel=stedsnavn;
                        }

                        text = jsonRoot.Output[2].Data.LiteralData.Text.split('.')[0] + ' moh';
                        extra = {};
                        scope.searchOptionsDict[name] = _constructSearchOption(name, '↑', false, text, extra);
                    };

                    var _addMatrikkelInfoToSearchOptions = function (jsonRoot, name) {
                        if (jsonRoot[0]){
                            jsonRoot = jsonRoot[0];
                        }

                        if ((jsonRoot.MATRIKKELNR == 'Mnr mangler') ||( jsonRoot.MATRIKKELNR == 'Mnr vann mangler')) {
                            return;
                        }

                        var extra = {
                            kommunenr: jsonRoot.KOMMUNENR,
                            gardsnr: jsonRoot.GARDSNR,
                            bruksnr: jsonRoot.BRUKSNR,
                            festenr: jsonRoot.FESTENR,
                            seksjonsnr: jsonRoot.SEKSJONSNR,
                            eiendomstype: jsonRoot.EIENDOMSTYPE,
                            matrikkelnr: jsonRoot.MATRIKKELNR
                        };


                        extra.url = mainAppService.generateSeEiendomUrl(extra.kommunenr, extra.gardsnr, extra.bruksnr, extra.festenr, extra.seksjonsnr);
                        var text = 'Se eiendomsinformasjon for ' + extra.kommunenr + '-' + extra.matrikkelnr.replace(new RegExp(' ', 'g'), '');
                        scope.searchOptionsDict[name] = _constructSearchOption(name, '🏠', true, text, extra);

                    };

                    // var _addSeHavnivaaToSearchOptions = function (jsonRoot, name) {
                    //     scope.searchOptionsDict[name] = _constructSearchOption(name, '🌊', false, '', {});
                    // };

                    var _addSearchOptionToPanel = function (name, data) {
                        var jsonObject;
                        var jsonRoot;
                        switch (name) {
                            case('elevationPoint'):
                                jsonObject = xml.xmlToJSON(data);
                                jsonRoot = jsonObject.ExecuteResponse.ProcessOutputs;
                                if (!jsonRoot.Output[0].Data.LiteralData) {
                                    return;
                                }
                                _addElevationPointToSearchOptions(jsonRoot, name);
                                break;

                            case('seEiendom'):
                                jsonObject = xml.xmlToJSON(data);
                                if (!jsonObject.FeatureCollection) {
                                    return;
                                }
                                if (!jsonObject.FeatureCollection.featureMembers) {
                                    return;
                                }
                                jsonRoot = jsonObject.FeatureCollection.featureMembers.TEIGWFS;
                                _addMatrikkelInfoToSearchOptions(jsonRoot, name);
                                break;
                            // case('seHavnivaa'):
                            //     jsonObject = xml.xmlToJSON(data);
                            //     if (!jsonObject.tide.meta){
                            //         return;
                            //     }
                            //     jsonRoot = jsonObject.tide.locationlevel;
                            //     _addSeHavnivaaToSearchOptions(jsonRoot, name);
                        }
                    };

                    var _constructSearchOption = function (name, icon, clickable, text, extra) {
                        var searchOption = {
                            icon: {
                                value: icon,
                                class: _defaultClass.icon
                            },
                            text: {
                                value: text,
                                class: _defaultClass.text
                            },
                            name: name
                        };

                        if (clickable) {
                            searchOption.icon.class = _clickableLinkClass.icon;
                            searchOption.text.class = _clickableLinkClass.text;
                        }
                        for (var key in extra) {
                            searchOption[key] = extra[key];
                        }
                        return searchOption;
                    };

                    var _emptySearchOption = function () {
                        var searchOption = {
                            icon: {
                                value: '',
                                class: ''
                            },
                            text: {
                                value: '',
                                class: ''
                            },
                            name: ''
                        };

                        return searchOption;
                    };

                    scope.initSearchOptions = function () {

                        scope.searchOptionsOrder = ['seEiendom', 'ssrFakta', 'seHavnivaa', 'koordTrans', 'lagTurkart', 'lagNodplakat'];
                        for (var searchOption in scope.searchOptionsOrder){
                            scope.searchOptionsDict[scope.searchOptionsOrder[searchOption]] = _emptySearchOption();
                        }
                        _fetchElevationPoint();
                        _fetchMatrikkelInfo();
                        _addKoordTransToSearchOptions();
                        _addSeHavnivaaToSearchOptions();
                        _addLagTurkartToSearchOptions();
                        _addEmergencyPosterToSearchOptions();
                    };
                }
            };
        }]);
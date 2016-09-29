angular.module('searchPanel')
    .directive('searchPanel', ['$timeout','mainAppService', 'ISY.MapAPI.Map',
        function($timeout, mainAppService, map) {
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
                            return;
                        }
                        _init();
                        scope.showSearchResultPanel();
                        _getResults(query);
                    };

                    scope.sourceDict = {
                        'ssr': 'Stedsnavn',
                        'adresse': 'Adresse',
                        'matrikkelveg': 'Vegnavn',
                        'matrikkeladresse': 'Adresse',
                        'coord': 'Koordinat'

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
                        var epsg=query.split('@')[1];
                        query=query.replaceAll(',','.');
                        var queryParts = query.split(' ');
                        if (queryParts.length !=2){
                            return false;
                        }
                        if (epsg){
                            _showQueryPoint(queryParts[1].split('@')[0], queryParts[0], 'EPSG:' + epsg, _mapEpsg);
                            return true;
                        }
                        if(((queryParts[0] > 32.88) && (queryParts[1] > -16.1)) && ((queryParts[0] < 84.17) && (queryParts[1] < 39.65))){
                            epsg='EPSG:4326';
                            _showQueryPoint(queryParts[0], queryParts[1], epsg, _mapEpsg);
                            return true;
                        }
                        if(((queryParts[0] > -2465220.60) && (queryParts[1] > 4102904.86)) && ((queryParts[0] < 771164.64) && (queryParts[1] < 9406031.63))){
                            epsg='EPSG:25833';
                            _showQueryPoint(queryParts[1], queryParts[0], epsg, _mapEpsg);
                            scope.searchBarModel+='@' + _mapEpsg.split(':')[1];
                            return true;
                        }
                        return false;
                    };

                    var _showQueryPoint = function(lat, lon, epsg){
                        var queryPoint = {
                            name: 'Koordinat',
                            point: _constructPoint(lat, lon, epsg, _mapEpsg),
                            format: 'Koordinat',
                            source: 'coord',
                            kommune: '1804'
                        };
                        if(!scope.searchResults) {
                            scope.searchResults= {};
                        }
                        scope.searchResults['searchBar'] = queryPoint;
                        map.RemoveInfoMarker();
                        map.ShowInfoMarker(queryPoint.point);
                        scope.mouseDown(queryPoint, true);
                        scope.showSearchOptionsPanel();
                    };

                    var _init = function () {
                        _resetResults();
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

                    var _getResults = function (query) {
                        _populateServiceDict(query);
                        _cancelOldRequests();
                        scope.searchTimestamp = parseInt((new Date()).getTime(), 10);
                        for (var service in _serviceDict) {
                            _downloadFromUrl(_serviceDict[service], scope.searchTimestamp);
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

                    var _downloadFromUrl = function (_serviceDict, timestamp) {
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

                    scope.mouseDown = function (searchResult, coordinate){
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
                        if (scope.searchBarModel.length < searchResult.name.length && !coordinate){
                            scope.searchBarModel=searchResult.name;
                        }
                    };

                    scope.cleanResults = function (){
                        _init();
                        map.RemoveInfoMarkers();
                        map.RemoveInfoMarker();
                        scope.searchResults = undefined;
                        scope.activeSearchResult=undefined;
                        scope.searchBarModel = "";

                    };


                }
            };
        }]);
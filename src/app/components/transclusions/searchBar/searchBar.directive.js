angular.module('searchBar')
    .directive('searchBar', ['mainAppService', 'ISY.MapAPI.Map',
        function(mainAppService, map
        ) {

            this._searchResults = {};

            this._unifiedResults = {};

            this._serviceDict = {};

            var _getQuery = function (scope) {
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
                    lonID: 'aust'
                };
                _serviceDict['matrikkelveg'] = {
                    url: mainAppService.generateSearchMatrikkelVegUrl(query),
                    format: 'json',
                    source: 'matrikkelveg',
                    epsg: 'EPSG:32633',
                    nameID: 'NAVN',
                    latID: 'LATITUDE',
                    lonID: 'LONGITUDE'
                };
                _serviceDict['matrikkeladresse'] = {
                    url: mainAppService.generateSearchMatrikkelAdresseUrl(query),
                    format: 'json',
                    source: 'matrikkeladresse',
                    epsg: 'EPSG:32633',
                    nameID: 'NAVN',
                    latID: 'LATITUDE',
                    lonID: 'LONGITUDE'
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
                for (var service in _serviceDict) {
                    _downloadFromUrl(_serviceDict[service]);
                }
            };

            var _resetResults = function () {
                _unifiedResults = {};
            };

            var _readResults = function () {
                var jsonObject;
                for (var service in _searchResults) {
                    var searchResult = _searchResults[service];
                    jsonObject = _convertSearchResult2Json(searchResult.document, searchResult.source);
                    _iterateJsonObject(jsonObject, searchResult);
                }
                console.log(Object.keys(_unifiedResults).length);
                console.log(_unifiedResults);
            };

            var _convertSearchResult2Json = function (document, source) {
                switch (source){
                    case('ssr'):
                        return xml.xmlToJSON(document).sokRes.stedsnavn;
                    case('adresse'):
                        return document.adresser;
                    default:
                        return JSON.parse(document);
                }
            };

            var _iterateJsonObject = function (jsonObject, searchResult){
                if(jsonObject) {
                    for (var i = 0; i < jsonObject.length; i++) {
                        if (jsonObject[i][_serviceDict[searchResult.source].latID]) {
                            _getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]);
                        }
                    }
                }
            };

            var _getValuesFromJson = function(identifiersDict, jsonObject){
                var name = jsonObject[identifiersDict.nameID];
                var lat = jsonObject[identifiersDict.latID] + '';
                var lon = jsonObject[identifiersDict.lonID] + '';
                var point = _constructPoint(lat, lon, identifiersDict.epsg);
                _pushToUnifiedResults(name, point, identifiersDict.format, identifiersDict.source);
            };

            var _pushToUnifiedResults = function (name, point, format, source) {
                var concatinatedCoordinates=_concatinateCoordinates(point);
                _unifiedResults[concatinatedCoordinates] = {
                    name: _capitalizeFirstLetter(name.toLowerCase()),
                    point: point,
                    format: format,
                    source: source
                };
            };

            var _concatinateCoordinates = function (point) {
                return point[0].toString().split('.')[0] + point[1].toString().split('.')[0];
            };

            var _constructPoint = function (lat, lon, epsg) {
                return ol.proj.transform([lon, lat], epsg, 'EPSG:32633');
            };

            var _capitalizeFirstLetter = function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };

            var _downloadFromUrl = function (_serviceDict) {
                $.ajax({
                    type: "GET",
                    url: _serviceDict.url,
                    async: false,
                    success: function (document) {
                        _searchResults[_serviceDict.source] = {
                            document: document,
                            format: _serviceDict.format,
                            source: _serviceDict.source,
                            epsg: _serviceDict.epsg
                        };
                    },
                    error: function (searchError) {
                        console.log("Error load xml file: ", searchError);
                    }
                });
            };

            var _addResultsToMap = function(){
                var coordinates=[];
                for (var result in _unifiedResults) {
                    coordinates.push(_unifiedResults[result].point);
                }
                map.ShowInfoMarker(coordinates);
            };

            return {
                templateUrl: 'components/transclusions/searchBar/searchBar.html',
                transclude: true,
                restrict: 'A',
                link: function (scope) {
                    scope.searchBarValueChanged = function () {
                        var query = _getQuery(scope);
                        if (query.length < 4) {
                            return;
                        }
                        _resetResults();
                        _getResults(query);
                        _readResults();
                        _addResultsToMap();
                    };
                }
            };
        }]);
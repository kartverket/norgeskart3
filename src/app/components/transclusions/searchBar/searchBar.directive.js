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
                for (var service in _searchResults) {
                    if ([ 'matrikkelveg', 'matrikkeladresse' ].indexOf(_searchResults[service].source) > -1 ) {
                        _populateUnifiedResultsFromMatrikkelJson(_searchResults[service]);
                    }
                    else if (_searchResults[service].source == 'ssr'){
                        _populateUnifiedResultsFromStedsnavnXml(_searchResults[service]);
                    }
                    else if (_searchResults[service].source == 'adresse'){
                        _populateUnifiedResultsFromAdresseJson(_searchResults[service]);
                    }
                }
                console.log(Object.keys(_unifiedResults).length);
                console.log(_unifiedResults);
            };
/*
            var _populateUnifiedResultsFromAdresseJson = function (searchResult) {
                var jsonObject = searchResult.document.adresser;
                if(jsonObject) {
                    for (var i = 0; i < jsonObject.length; i++) {
                        _getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]);
                    }
                }
            };*/

            var _populateUnifiedResultsFromMatrikkelJson = function (searchResult) {
                var jsonObject = JSON.parse(searchResult.document);
                if(jsonObject) {
                    for (var i = 0; i < jsonObject.length; i++) {
                        if (jsonObject[i].LATITUDE) {
                            _getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]);
                        }
                    }
                }
            };

            var _populateUnifiedResultsFromStedsnavnXml = function (searchResult) {
                var jsonObject = xml.xmlToJSON(searchResult.document).sokRes.stedsnavn;
                if(jsonObject) {
                    for (var i = 0; i < jsonObject.length; i++) {
                        _getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]);
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
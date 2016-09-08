angular.module('searchBar')
    .directive('searchBar', ['mainAppService',
        //'ISY.MapAPI.Map',
        function(mainAppService
            //, map
        ) {

            var _getQuery = function (scope) {
                return scope.searchBarModel + '';
            };

            var _generateUrls = function (query) {
                var serviceDict = {};
                serviceDict['ssr'] = {
                    url: mainAppService.generateSearchStedsnavnUrl(query),
                    format: 'xml',
                    source: 'ssr',
                    epsg: 'EPSG:32633'
                };
/*                serviceDict['adresse'] = {
                    url: mainAppService.generateSearchAdresseUrl(query),
                    format: 'json',
                    source: 'adresse',
                    epsg: 'EPSG:4326'
                };*/
                serviceDict['matrikkelveg'] = {
                    url: mainAppService.generateSearchMatrikkelVegUrl(query),
                    format: 'json',
                    source: 'matrikkelveg',
                    epsg: 'EPSG:32633'
                };
                serviceDict['matrikkeladresse'] = {
                    url: mainAppService.generateSearchMatrikkelAdresseUrl(query),
                    format: 'json',
                    source: 'matrikkeladresse',
                    epsg: 'EPSG:32633'
                };

                return serviceDict;
            };

            var _getResults = function (query) {
                var serviceDict = _generateUrls(query);
                for (var service in serviceDict) {
                    _downloadFromUrl(serviceDict[service]);
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

            var _populateUnifiedResultsFromAdresseJson = function (searchResult) {
                var jsonObject = searchResult.document.adresser;
                for (var i = 0; i < jsonObject.length; i++) {
                    var name = jsonObject[i].adressenavn;
                    var lat = jsonObject[i].nord + '';
                    var lon = jsonObject[i].aust + '';
                    var point = _constructPoint(lat, lon, searchResult.epsg);
                    _pushToUnifiedResults(name, point, searchResult.format, searchResult.source);
                }
            };

            var _populateUnifiedResultsFromMatrikkelJson = function (searchResult) {
                var jsonObject = JSON.parse(searchResult.document);
                for (var i = 0; i < jsonObject.length; i++) {
                    if (jsonObject[i].hasOwnProperty('LATITUDE')) {
                        var name = jsonObject[i].NAVN;
                        var lat = jsonObject[i].LATITUDE + '';
                        var lon = jsonObject[i].LONGITUDE + '';
                        var point = _constructPoint(lat, lon, searchResult.epsg);
                        _pushToUnifiedResults(name, point, searchResult.format, searchResult.source);
                    }
                }
            };

            var _populateUnifiedResultsFromStedsnavnXml = function (searchResult) {
                var xmlDocument = searchResult.document;
                try {
                    var stedsnavn = xmlDocument.evaluate('/sokRes/stedsnavn/stedsnavn', xmlDocument);
                    _pushXml(stedsnavn, searchResult);
                }
                catch (e) {
                    _pushXmlIE(xmlDocument, searchResult);
                }
            };

            var _pushXml = function (stedsnavn, searchResult){
                var iteratorStedsnavn = stedsnavn.iterateNext();
                while (iteratorStedsnavn) {
                    _constructXmlResult(iteratorStedsnavn, searchResult);
                    iteratorStedsnavn = stedsnavn.iterateNext();
                }
            };

            var _pushXmlIE = function (xmlDocument, searchResult){
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.loadXML(xmlDocument.toString());
                var stedsnavn=doc.selectNodes('/sokRes/stedsnavn/stedsnavn');
                for (var i=0;i<stedsnavn.length;i++) {
                    _constructXmlResult(stedsnavn, searchResult);
                }
            };

            var _constructXmlResult = function(stedsnavn, searchResult){
                var name = stedsnavn.textContent;
                var lat = stedsnavn.parentNode.getElementsByTagName('nord')[0].textContent + '';
                var lon = stedsnavn.parentNode.getElementsByTagName('aust')[0].textContent + '';
                var point = _constructPoint(lat, lon, searchResult.epsg);
                _pushToUnifiedResults(name, point, searchResult.format, searchResult.source);
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

            this._searchResults = {};

            this._unifiedResults = {};

            var _downloadFromUrl = function (serviceDict) {
                $.ajax({
                    type: "GET",
                    url: serviceDict.url,
                    async: false,
                    success: function (document) {
                        _searchResults[serviceDict.source] = {
                            document: document,
                            format: serviceDict.format,
                            source: serviceDict.source,
                            epsg: serviceDict.epsg
                        };
                    },
                    error: function (searchError) {
                        console.log("Error load xml file: ", searchError);
                    }
                });
            };

/*
            var _addResultsToMap = function(){
                for (var result in _unifiedResults) {
                    map.InsertFeature(_unifiedResults[result].point);
                }
            };
*/

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
                        // _addResultsToMap();
                    };
                }
            };
        }]);

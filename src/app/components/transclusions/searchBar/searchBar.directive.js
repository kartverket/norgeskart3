angular.module('searchBar')
    .directive('searchBar', ['mainAppService',
        function(mainAppService) {

            var _getQuery = function (scope) {
                return scope.searchBarModel + '';
            };

            var _generateUrls = function (query) {
                var serviceDict = {};
                serviceDict['ssr'] = {
                    url: mainAppService.generateSearchStedsnavnUrl(query),
                    format: 'xml',
                    source: 'ssr'
                };
                serviceDict['veg'] = {
                    url: mainAppService.generateSearchVegUrl(query),
                    format: 'json',
                    source: 'veg'
                };
                serviceDict['adresse'] = {
                    url: mainAppService.generateSearchAdresseUrl(query),
                    format: 'json',
                    source: 'adresse'
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
                    if (_searchResults[service]['format'] == 'json') {
                        _populateUnifiedResultsFromJson(_searchResults[service]);
                    }
                    else {
                        _populateUnifiedResultsFromXml(_searchResults[service]);
                    }
                }
                console.log(_unifiedResults);
            };

            var _populateUnifiedResultsFromJson = function (searchResult) {
                var jsonObject = JSON.parse(searchResult['document']);
                for (var i = 0; i < jsonObject.length; i++) {
                    if (jsonObject[i].hasOwnProperty('LATITUDE')) {
                        var name = jsonObject[i]['NAVN'];
                        var lat = (jsonObject[i]['LATITUDE'] + '').split('.')[0];
                        var lon = (jsonObject[i]['LONGITUDE'] + '').split('.')[0];
                        _pushToUnifiedResults(name, lat, lon, searchResult['format'], searchResult['source']);
                    }
                }
            };

            var _populateUnifiedResultsFromXml = function (searchResult) {
                var xmlDocument = searchResult['document'];
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
                    _constructResult(iteratorStedsnavn, searchResult);
                    iteratorStedsnavn = stedsnavn.iterateNext();
                }
            };

            var _pushXmlIE = function (xmlDocument, searchResult){
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.loadXML(xmlDocument.toString());
                var stedsnavn=doc.selectNodes('/sokRes/stedsnavn/stedsnavn');
                for (var i=0;i<stedsnavn.length;i++) {
                    _constructResult(stedsnavn, searchResult);
                }
            };

            var _constructResult = function(stedsnavn, searchResult){
                var name = stedsnavn.textContent;
                var lat = (stedsnavn.parentNode.getElementsByTagName('nord')[0].textContent + '').split('.')[0];
                var lon = (stedsnavn.parentNode.getElementsByTagName('aust')[0].textContent + '').split('.')[0];
                _pushToUnifiedResults(name, lat, lon, searchResult['format'], searchResult['source']);
            };

            var _pushToUnifiedResults = function (name, lat, lon, format, source) {
                _unifiedResults[lat + lon] = {
                    name: _capitalizeFirstLetter(name.toLowerCase()),
                    lat: lat,
                    lon: lon,
                    format: format,
                    source: source
                };
            };

            var _capitalizeFirstLetter = function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };

            this._searchResults = {};

            this._unifiedResults = {};

            var _downloadFromUrl = function (serviceDict) {
                $.ajax({
                    type: "GET",
                    url: serviceDict['url'],
                    async: false,
                    success: function (document) {
                        _searchResults[serviceDict['source']] = {
                            document: document,
                            format: serviceDict['format'],
                            source: serviceDict['source']
                        };
                    },
                    error: function (searchError) {
                        console.log("Error load xml file: ", searchError);
                    }
                });
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
                        _getResults(query);
                        _resetResults();
                        _readResults();
                    };
                }
            };
        }]);
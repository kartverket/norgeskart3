angular.module('searchBar')
    .directive('searchBar', ['mainAppService',
        function(mainAppService) {

        var _getQuery =  function(scope) {
                return scope.searchBarModel + '';
        };

        var _generateUrls = function(query){
            return [
                [ mainAppService.generateSearchVegUrl(query), 'json', 'veg'],
                [ mainAppService.generateSearchAdresseUrl(query), 'json','adresse'],
                [ mainAppService.generateSearchStedsnavnUrl(query), 'xml','ssr']
                //[ mainAppService.generateSearchEiendomUrl(query), 'json']
            ];
        };

        var _getResults = function(query){
            var urls=_generateUrls(query);
            for (var i = 0; i < urls.length; i++){
                _downloadFromUrl(urls[i]);
            }
        };

        var _resetResults = function(){
            _unifiedResults = {};
        };

        var _showResults = function(){
            for (var i = 0; i < _searchResults.length; i++) {
                var resultType=_searchResults[i][1];
                if (resultType == 'json'){
                    _populateUnifiedResultsFromJson(JSON.parse(_searchResults[i][0]));
                }
                else {
                    _populateUnifiedResultsFromXml(_searchResults[i][0]);
                }
            }
            console.log(_unifiedResults);
        };

        var _populateUnifiedResultsFromJson = function (jsonObject){
            for (var i = 0; i < jsonObject.length; i++){
                if (jsonObject[i].hasOwnProperty('LATITUDE')) {
                    var name = jsonObject[i]['NAVN'];
                    var lat = (jsonObject[i]['LATITUDE'] + '').split('.')[0];
                    var lon = (jsonObject[i]['LONGITUDE'] + '').split('.')[0];
                    _pushToUnifiedResults(name, lat, lon);
                }
            }
        };

        var _populateUnifiedResultsFromXml = function (xmlDocument){
            var stedsnavn=xmlDocument.evaluate('/sokRes/stedsnavn/stedsnavn', xmlDocument);
            var iteratorStedsnavn=stedsnavn.iterateNext();
            while (iteratorStedsnavn){
                var name = iteratorStedsnavn.textContent;
                var lat = (iteratorStedsnavn.parentNode.getElementsByTagName('nord')[0].textContent + '').split('.')[0];
                var lon = (iteratorStedsnavn.parentNode.getElementsByTagName('aust')[0].textContent + '').split('.')[0];
                _pushToUnifiedResults(name, lat, lon);
                iteratorStedsnavn=stedsnavn.iterateNext();
            }
        };

        var _pushToUnifiedResults = function (name, lat, lon){
            _unifiedResults[lat + lon]={
                name : _capitalizeFirstLetter(name.toLowerCase()),
                lat  : lat,
                lon : lon
            };
        };

        var _capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        this._searchResults=[];

        this._unifiedResults={};

        var _downloadFromUrl = function (url) {
                $.ajax({
                    type: "GET",
                    url: url[0],
                    async: false,
                    success: function (searchResult) {
                        console.log(url[0]);
                        _searchResults.push( [ searchResult, url[1]] );
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
                link: function(scope){
                    scope.searchBarValueChanged = function () {
                        var query=_getQuery(scope);
                        if (query.length < 4){ return;}
                        _getResults(query);
                        _resetResults();
                        _showResults();
                    };
                }
            };
        }]);
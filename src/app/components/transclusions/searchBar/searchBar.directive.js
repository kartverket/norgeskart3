angular.module('searchBar')
    .directive('searchBar', ['mainAppService',
        function(mainAppService) {

        var _getQuery =  function(scope) {
                return scope.searchBarModel + '';
        };

        var _generateUrls = function(query){
            return [
                mainAppService.generateSearchVegUrl(query),
                mainAppService.generateSearchAdresseUrl(query),
                mainAppService.generateSearchStedsnavnUrl(query)
            ];
        };

        var _getResults = function(query){
            var urls=_generateUrls(query);
            for (var urlIndex = 0; urlIndex < urls.length; urlIndex++){
                //console.log(urls[urlIndex]);
                _downloadFromUrl(urls[urlIndex]);
            }
        };

        var _downloadFromUrl = function (url) {
                $.ajax({
                    type: "GET",
                    url: url,
                    async: true,
                    success: function (searchResult) {
                        xmlFile = searchResult;
                        //console.log(xmlFile);
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
                        //console.log("searchBar Value Changed to " + query);
                        if (query.length < 4){ return;}
                        _getResults(query);
                    };
                }
            };
        }]);
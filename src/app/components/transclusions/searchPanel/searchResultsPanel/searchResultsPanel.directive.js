angular.module('searchResultsPanel')
    .directive('searchResultsPanel', ['searchPanelFactory','mainAppService','$http',
        function(searchPanelFactory, mainAppService, $http) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchResultsPanel/searchResultsPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.husnummerChanged= function (searchResult, activeHusnummer) {
                        var query=searchResult.name + ' ' + activeHusnummer + ',' + searchResult.kommune;
                        var url=mainAppService.generateSearchMatrikkelAdresseUrl(query);
                        $http.get(url).then(function (response) {
                            _readResponse(response.data);
                        });
                    };

                    var _readResponse=function (jsonObject) {
                        jsonObject=jsonObject[0];
                        var source='matrikkeladresse';
                        var identifiersDict=searchPanelFactory.getServiceDict()[source];
                        var epsg = identifiersDict.epsg;
                        var lat = jsonObject[identifiersDict.latID] + '';
                        var lon = jsonObject[identifiersDict.lonID] + '';
                        var kommune=jsonObject[identifiersDict.kommuneID];
                        var name = jsonObject[identifiersDict.nameID];
                        var mapEpsg = searchPanelFactory.getMapEpsg();
                        var point=searchPanelFactory.constructPoint(lat, lon, epsg, mapEpsg);
                        var queryPoint = {
                            name: scope.capitalizeName(name.toLowerCase()),
                            point: point,
                            format: identifiersDict.format,
                            source: source,
                            kommune: scope.fixNames(kommune)
                        };
                        scope.showQueryPoint(queryPoint);
                    };

                    scope.getNextPlacenamePage = function () {
                        searchPanelFactory.increasePlacenamePage();
                        scope.resetResultsService('ssr');
                        scope.populateServiceDict(scope.searchBarModel);
                        scope.getResults(['ssr']);
                        scope.placenamePage++;
                    };

                    scope.getPreviousPlacenamePage = function () {
                        searchPanelFactory.decreasePlacenamePage();
                        scope.resetResultsService('ssr');
                        scope.populateServiceDict(scope.searchBarModel);
                        scope.getResults(['ssr']);
                        scope.placenamePage--;
                    };

                }
            };
        }]);
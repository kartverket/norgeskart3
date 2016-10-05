angular.module('searchResultsPanel')
    .directive('searchResultsPanel', ['searchPanelFactory',
        function(searchPanelFactory) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchResultsPanel/searchResultsPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.husnummerChanged= function (searchResult, activeHusnummer) {
                        var query=searchResult.name + ' ' + activeHusnummer + ',' + searchResult.kommune;
                        searchPanelFactory.getServiceDict(query);
                        console.log(query);
                    };
                }
            };
        }]);
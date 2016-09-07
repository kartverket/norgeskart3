angular.module('searchBar')
    .directive('searchBar', ['mainAppService',
        function(mainAppService) {
            return {
                templateUrl: 'components/transclusions/searchBar/searchBar.html',
                transclude: true,
                restrict: 'A',
                link: function(scope){
                    scope.searchBarValueChanged = function () {
                        var query=scope.searchBarModel + '';
                        console.log("searchBar Value Changed to " + query);
                        if (query.length < 4){ return;}
                        console.log(mainAppService.generateSearchVegUrl(query));
                        console.log(mainAppService.generateSearchAdresseUrl(query));
                        console.log(mainAppService.generateSearchStedsnavnUrl(query));
                    };
                }
            };
        }]);
angular.module('searchBar')
    .directive('searchBar', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchBar/searchBar.html',
                transclude: true,
                restrict: 'A',
                link: function(scope){


                    scope.testClick = function () {
                        console.log("test click clicked");
                    };
                }
            };
        }]);
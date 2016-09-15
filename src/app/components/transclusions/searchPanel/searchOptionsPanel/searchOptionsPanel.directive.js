angular.module('searchOptionsPanel')
    .directive('searchOptionsPanel', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchOptionsPanel/searchOptionsPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.mouseDown= function (searchOption) {
                        console.log(searchOption);
                    };
                }
            };
        }]);
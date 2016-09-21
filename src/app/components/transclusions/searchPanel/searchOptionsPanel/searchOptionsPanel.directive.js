angular.module('searchOptionsPanel')
    .directive('searchOptionsPanel', ['$window',
        function($window) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchOptionsPanel/searchOptionsPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.mouseDown= function (searchOption) {
                        if (searchOption.url){
                            $window.open(searchOption.url, '_blank');
                        }
                    };
                }
            };
        }]);
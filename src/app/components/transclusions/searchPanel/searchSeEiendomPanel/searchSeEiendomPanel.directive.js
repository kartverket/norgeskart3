angular.module('searchSeEiendomPanel')
    .directive('searchSeEiendomPanel', ['$window',
        function($window) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchSeEiendomPanel/searchSeEiendomPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.openEindomInformasjon = function () {
                        $window.open(scope.searchOptionsDict['seEiendom'].url, '_blank');

                    };
                }
            };
        }]);
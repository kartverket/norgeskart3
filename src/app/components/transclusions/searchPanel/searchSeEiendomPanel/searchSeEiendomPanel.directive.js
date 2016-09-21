angular.module('searchSeEiendomPanel')
    .directive('searchSeEiendomPanel', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchSeEiendomPanel/searchSeEiendomPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope._capitalizeFirstLetter = function (string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    };

                }
            };
        }]);
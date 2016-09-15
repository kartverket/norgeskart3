angular.module('mainMenuPanel')
    .directive('mainMenuPanel', [
        function() {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuPanel.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
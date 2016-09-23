angular.module('mainMenuSections')
    .directive('mainMenuSections', [
        function() {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
                restrict: 'A',
                link: function(){

                }
            };
        }]);
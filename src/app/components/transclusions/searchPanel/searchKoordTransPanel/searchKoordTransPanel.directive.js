angular.module('searchKoordTransPanel')
    .directive('searchKoordTransPanel', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchKoordTransPanel/searchKoordTransPanel.html',
                restrict: 'A',
                link: function(){
                }
            };
        }]);
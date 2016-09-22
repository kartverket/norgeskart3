angular.module('searchLagTurkartPanel')
    .directive('searchLagTurkartPanel', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagTurkartPanel/searchLagTurkartPanel.html',
                restrict: 'A',
                link: function(){
                }
            };
        }]);
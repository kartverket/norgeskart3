angular.module('mapGetFeatures')
    .directive('mapGetFeatures', [
        function() {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchOptionsPanel/mapGetFeatures/mapGetFeatures.html',
                restrict: 'A',
                link: function(){
                }
            };
        }]);
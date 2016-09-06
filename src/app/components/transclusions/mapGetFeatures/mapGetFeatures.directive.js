angular.module('mapGetFeatures')
    .directive('mapGetFeatures', [
        function() {
            return {
                templateUrl: 'components/transclusions/mapGetFeatures/mapGetFeatures.html',
                transclude: true,
                restrict: 'A',
                link: function(){

                }
            };
        }]);
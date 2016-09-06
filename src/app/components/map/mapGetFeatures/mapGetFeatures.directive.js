angular.module('mapGetFeatures')
    .directive('mapGetFeatures', [
        function() {
            return {
                templateUrl: 'components/map/mapGetFeatures/mapGetFeatures.html',
                transclude: true,
                restrict: 'A',
                link: function(){

                }
            };
        }]);
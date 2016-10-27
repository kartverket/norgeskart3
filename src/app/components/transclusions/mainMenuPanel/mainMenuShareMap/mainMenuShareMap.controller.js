angular.module('mainMenuShareMap')
    .controller('mainMenuShareMapController',[ '$location', '$scope','$window',
        function($location, $scope, $window){

            var getUrl = function () {
                return $location.absUrl();
            };

            var getEncodedUrl = function () {
                return encodeURIComponent(getUrl());
            };

            $scope.getMailUrl = function () {
                var url='mailto:?subject=norgeskart.no&body=' + getEncodedUrl();
                $window.open(url, '_self');
            };

            $scope.getTwitterUrl = function () {
                var url='http://twitter.com/share?url=' + getEncodedUrl();
                $window.open(url, '_blank');
            };

            $scope.getFacebookUrl = function () {
                var url='http://www.facebook.com/sharer.php?u=' + getEncodedUrl();
                $window.open(url, '_blank');
            };
        }
    ]);
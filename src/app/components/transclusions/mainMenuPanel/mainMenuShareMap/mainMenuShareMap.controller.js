angular.module('mainMenuShareMap')
    .controller('mainMenuShareMapController',[ '$location', '$scope',
        function($location, $scope){

            var getUrl = function () {
                return $location.absUrl();
            };

            var getEncodedUrl = function () {
                return encodeURIComponent(getUrl());
            };

            $scope.getMailUrl = function () {
                $scope.mailUrl='mailto:?subject=norgeskart.no&body=' + getEncodedUrl();
            };

            $scope.getTwitterUrl = function () {
                $scope.twitterUrl='http://twitter.com/share?url=' + getEncodedUrl();
            };

            $scope.getFacebookUrl = function () {
                $scope.facebookUrl='http://www.facebook.com/sharer.php?u=' + getEncodedUrl();
            };

            $scope.getIframe = function () {
                $scope.iframe='<iframe src="' + getUrl() + '&type=1' + '" width="134" height="108" title="" longdesc=""></iframe>';
            };
        }
    ]);
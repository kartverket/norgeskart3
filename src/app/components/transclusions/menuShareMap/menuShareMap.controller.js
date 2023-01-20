angular.module('menuShareMap')
  .controller('menuShareMapController', ['$location', '$scope', '$window',
    function ($location, $scope, $window) {

      var getUrl = function () {
        return $location.absUrl();
      };

      var getEncodedUrl = function () {
        return encodeURIComponent(getUrl());
      };

      $scope.getMailUrl = function () {
        var url = 'mailto:?subject=norgeskart.no&body=' + getEncodedUrl();
        $window.open(url, '_self');
      };

      $scope.getTwitterUrl = function () {
        var url = 'https://twitter.com/share?url=' + getEncodedUrl();
        $window.open(url, '_blank');
      };

      $scope.getFacebookUrl = function () {
        var url = 'https://www.facebook.com/sharer.php?u=' + getEncodedUrl();
        $window.open(url, '_blank');
      };

      $scope.getAbsoluteUrl = function () {
        return getUrl();
      };

      $scope.copyURL = function () {
        // standard way of copying
        var textArea = document.createElement('textarea');
        textArea.setAttribute('style', 'width:1px;border:0;opacity:0;');
        document.body.appendChild(textArea);
        textArea.value = getUrl();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      };
    }
  ]);

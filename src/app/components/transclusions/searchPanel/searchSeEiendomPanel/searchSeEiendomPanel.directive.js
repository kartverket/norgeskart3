angular.module('searchSeEiendomPanel')
  .directive('searchSeEiendomPanel', ['$window', 'searchPanelFactory', '$location',
    function ($window, searchPanelFactory, $location) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchSeEiendomPanel/searchSeEiendomPanel.html',
        restrict: 'A',
        controller: 'searchSeEiendomPanelController',
        link: function (scope) {
          scope.openEindomInformasjon = function () {
            $window.open(scope.searchOptionsDict['seEiendom'].url, '_blank');
            /*
                var eiendomUrl = scope.searchOptionsDict['seEiendom'].url;
                var iframeWidth = 0;
                var iframeHeight = 0;
                var bodyHeight = $window.innerHeight;
                var bodyWidth = $window.innerWidth;
                var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                if (isMobile.matches) {
                    iframeHeight = Math.floor(bodyHeight - 70);
                    iframeWidth = Math.floor(bodyWidth - 50);
                }else{
                    iframeHeight = Math.floor(bodyHeight - 300);
                    iframeWidth = Math.floor(bodyWidth - 300);
                }

                $.featherlight({iframe: eiendomUrl, iframeMaxWidth: '100%', iframeWidth: iframeWidth,
                    iframeHeight: iframeHeight});
            */
          };

          var setMenuListMaxHeight = function () {
            $(document).ready(function () {
              var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
              if (isMobile.matches) {
                fixElementHeight(120);
              } else {
                fixElementHeight(220);
              }
            });
          };

          function fixElementHeight(moveUpFromBottom) {
            var bodyHeight = $window.innerHeight;
            var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
            var searchContentElements = document.getElementsByClassName("search-content");
            for (var i = 0; i < searchContentElements.length; i++) {
              var element = searchContentElements[i];
              element.style.maxHeight = menuListMaxHeight + 'px';
            }
          }

          var _updateSelection = function(value) {
            $location.search()['showSelection'] = value === true ? 'true' : 'false';
            $location.search(angular.extend($location.search(), $location.search())).replace();
          };

          scope.eiendomMarkering = function () {
            searchPanelFactory.setShowEiendomMarkering(scope.showSelectionCheckbox);
            _updateSelection(scope.showSelectionCheckbox);
          };

          scope.selectResult = function (result) {
            var tmp = scope.searchOptionsDict.seEiendom.allResults;
            scope.searchOptionsDict.seEiendom = result;
            scope.searchOptionsDict.seEiendom.allResults = tmp;
            scope.showSelection();
            scope.fetchAddressInfoForMatrikkel();
          };

          var initSeEiendom = function () {
            scope.showSelectionCheckbox = searchPanelFactory.getShowEiendomMarkering();
            _updateSelection(scope.showSelectionCheckbox);
          };

          scope.hideEiendomMarkering = function () {
            searchPanelFactory.setShowEiendomMarkering(false);
          };


          initSeEiendom();

          $(document).ready(function () {
            $($window).resize(setMenuListMaxHeight);
            setMenuListMaxHeight();

          });

          scope.isGardsnrGreaterThanZero = function () {
            return parseInt(scope.searchOptionsDict['seEiendom'].gardsnr, 10) > 0;
          };
        }
      };
    }
  ]);

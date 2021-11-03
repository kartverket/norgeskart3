angular.module('searchStedsnavnPanel')
  .directive('searchStedsnavnPanel', ['toolsFactory', 'ISY.EventHandler', '$http', 'mainAppService', '$window', 'ISY.MapAPI.Map',
    function (toolsFactory, eventHandler, $http, mainAppService, $window, map) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchStedsnavnPanel/searchStedsnavnPanel.html',
        restrict: 'A',
        link: function (scope) {
          scope.generateStedsnavnUrl = function (stedsnummer) {
            $window.open( mainAppService.generateFaktaarkUrl(stedsnummer), '_blank');
          }
          scope.mouseOver = function (searchResult) {
            var coord = [searchResult['øst'], searchResult['nord']];
            map.RemoveInfoMarker();
            map.ShowInfoMarker(coord);
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

          scope.isIosDevice = function () {
            return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i));
          };
          $(document).ready(function () {
            $($window).resize(setMenuListMaxHeight);
            setMenuListMaxHeight();
          });
        }
      }
    }
  ])

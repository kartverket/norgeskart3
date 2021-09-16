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

        }
      }
    }
  ])

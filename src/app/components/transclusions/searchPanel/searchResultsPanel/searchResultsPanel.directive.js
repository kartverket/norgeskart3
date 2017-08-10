angular.module('searchResultsPanel')
  .directive('searchResultsPanel', ['searchPanelFactory', 'mainAppService', '$http', '$window',
    function (searchPanelFactory, mainAppService, $http, $window) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchResultsPanel/searchResultsPanel.html',
        restrict: 'A',
        link: function (scope) {
          scope.husnummerChanged = function (searchResult, activeHusnummer) {
            searchResult.activeHusnum = activeHusnummer;
            scope.activeHusnum = activeHusnummer;
            var query = searchResult.name + ' ' + activeHusnummer + ',' + searchResult.kommune;
            var url = mainAppService.generateSearchMatrikkelAdresseUrl(query);
            $http.get(url).then(function (response) {
              _readResponse(response.data);
            });
          };

          var _readResponse = function (jsonObject) {
            jsonObject = jsonObject[0];
            var source = 'matrikkeladresse';
            var identifiersDict = searchPanelFactory.getServiceDict()[source];
            var epsg = identifiersDict.epsg;
            var lat = jsonObject[identifiersDict.latID] + '';
            var lon = jsonObject[identifiersDict.lonID] + '';
            var kommune = jsonObject[identifiersDict.kommuneID];
            var name = jsonObject[identifiersDict.nameID];
            var mapEpsg = searchPanelFactory.getMapEpsg();
            var point = searchPanelFactory.constructPoint(lat, lon, epsg, mapEpsg);
            var queryPoint = {
              name: scope.capitalizeName(name.toLowerCase()),
              point: point,
              format: identifiersDict.format,
              source: source,
              kommune: scope.fixNames(kommune)
            };
            scope.showSearchOptionsPanel();
            scope.showQueryPoint(queryPoint);
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
      };
    }
  ]);

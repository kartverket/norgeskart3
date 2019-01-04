angular.module('searchLagNodplakatPanelPage2')
  .directive('searchLagNodplakatPanelPage2', ['$window', 'ISY.MapAPI.Map', 'mainAppService',
    function ($window, map, mainAppService) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchLagNodplakatPanel/searchLagNodplakatPanelPage2/searchLagNodplakatPanelPage2.html',
        restrict: 'A',
        link: function (scope) {
          scope.downloadEmergencyPoster = function () {
            $window.open(scope.generateEmergancyPoster());
          };

          var pixels = {
            width: 1145,
            height: 660
          };

          var _getUTMZoneFromGeographicPoint = function (lon, lat) {
            // From emergencyPoster.js
            var sone = "32V",
              localProj = "EPSG:32632";
            if (lat > 72) {
              if (lon < 21) {
                sone = "33X";
                localProj = "EPSG:32633";
              } else {
                sone = "35X";
                localProj = "EPSG:32635";
              }
            } else if (lat > 64) {
              if (lon < 6) {
                sone = "31W";
                localProj = "EPSG:32631";
              } else if (lon < 12) {
                sone = "32W";
                localProj = "EPSG:32632";
              } else if (lon < 18) {
                sone = "33W";
                localProj = "EPSG:32633";
              } else if (lon < 24) {
                sone = "34W";
                localProj = "EPSG:32634";
              } else if (lon < 30) {
                sone = "35W";
                localProj = "EPSG:32635";
              } else {
                sone = "36W";
                localProj = "EPSG:32636";
              }
            } else {
              if (lon < 3) {
                sone = "31V";
                localProj = "EPSG:32631";
              } else if (lon >= 12) {
                sone = "33V";
                localProj = "EPSG:32633";
              }
            }
            return {
              sone: sone,
              localProj: localProj
            };
          };

          var _round = function (value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
          };

          var geographicDecimalToSecondsMinutes = function (geographicOrdinal) {
            var degrees = parseInt(geographicOrdinal.toString().split('.')[0], 10);
            var decimals = geographicOrdinal - degrees;
            var minutes = decimals * 60;
            var minutesDecimals = minutes - minutes.toString().split('.')[0];
            minutes = _round(minutes.toString().split('.')[0], 0);
            var seconds = _round(minutesDecimals * 60, 0);
            if (seconds === 60) {
              minutes += 1;
              seconds = 0;
            }
            if (minutes === 60) {
              degrees += 1;
              minutes = 0;
            }
            return {
              degrees: degrees,
              minutes: minutes,
              seconds: seconds
            };
          };

          var geographicalText = function (geographicOrdinal) {
            var geographicDegreesSecondsMinutes = geographicDecimalToSecondsMinutes(geographicOrdinal);
            return geographicDegreesSecondsMinutes.degrees + ' grader ' +
              geographicDegreesSecondsMinutes.minutes + ' minutter ' +
              _round(geographicDegreesSecondsMinutes.seconds, 0) + ' sekunder';
          };

          var generateEmergencyPosterConfig = function () {
            var UTM = _getUTMZoneFromGeographicPoint(scope.activePosition.geographicPoint[0], scope.activePosition.geographicPoint[1]);
            var localUTMPoint = ol.proj.transform([scope.activePosition.geographicPoint[0], scope.activePosition.geographicPoint[1]], 'EPSG:4326', UTM.localProj);
            var street = '';
            if (!!scope.lagNodplakatDict.emergencyPosterPoint.matrikkelnr && scope.lagNodplakatConfirmRoad) {
              street = scope.lagNodplakatDict.emergencyPosterPoint.veg + ' i ' + scope.lagNodplakatDict.emergencyPosterPoint.kommune;
            }
            return {
              locationName: scope.lagNodplakatName,
              position1: geographicalText(scope.activePosition.geographicPoint[1]) + ' nord',
              position2: geographicalText(scope.activePosition.geographicPoint[0]) + ' øst',
              street: street,
              place: scope.activePlaceName,
              matrikkel: scope.lagNodplakatDict.emergencyPosterPoint.matrikkelnr + ' i ' + scope.lagNodplakatDict.emergencyPosterPoint.kommune,
              utm: 'Sone ' + UTM.sone + ' Ø ' + _round(localUTMPoint[0], 0) + ' N ' + _round(localUTMPoint[1], 0),
              posDez: 'N' + _round(scope.activePosition.geographicPoint[1], 4) + '° - Ø' + _round(scope.activePosition.geographicPoint[0], 4) + '°',
              map: ''
            };
          };

          var generateEmergencyMapConfig = function () {
            map.SetCenter(scope.activePosition);
            var extent = map.GetExtent();
            var meterWidth = extent[2] - extent[0];
            var pixelWidthPerHeight = pixels.width / pixels.height;
            var meterHeight = meterWidth / pixelWidthPerHeight;
            var mapCenter = map.GetCenter();
            var minx = mapCenter.lon - (meterWidth / 2);
            var miny = mapCenter.lat - (meterHeight / 2);
            var maxx = mapCenter.lon + (meterWidth / 2);
            var maxy = mapCenter.lat + (meterHeight / 2);
            return {
              service: 'WMS',
              request: 'GetMap',
              CRS: 'EPSG:32633',
              FORMAT: 'image/jpeg',
              BGCOLOR: '0xFFFFFF',
              TRANSPARENT: 'false',
              LAYERS: 'topo4_WMS',
              VERSION: '1.3.0',
              WIDTH: pixels.width,
              HEIGHT: pixels.height,
              BBOX: minx + ',' + miny + ',' + maxx + ',' + maxy
            };
          };

          var replaceNorwegianChars = function (emergencyPosterServiceUrl) {
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C2%B0/g, '%B0'); // °
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A6/g, '%E6'); // æ
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%B8/g, '%F8'); // ø
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A5/g, '%E5'); // å
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%86/g, '%C6'); // Æ
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%98/g, '%D8'); // Ø
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%85/g, '%C5'); // Å
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A9/g, '%E9'); // é
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%89/g, '%C9'); // É
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%84/g, '%C4'); // Ä
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%A4/g, '%E4'); // ä
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%96/g, '%D6'); // Ö
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%B6/g, '%F6'); // ö
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%9C/g, '%DC'); // Ü
            emergencyPosterServiceUrl = emergencyPosterServiceUrl.replace(/%C3%BC/g, '%FC'); // ü
            return emergencyPosterServiceUrl;
          };

            scope.generateEmergancyPoster = function () {
            if (!scope.lagNodplakatDict.emergencyPosterPoint) {
              alert('Service returned error.');
            }
            var emergencyPosterConfig = generateEmergencyPosterConfig();
            var emergencyMapConfig = generateEmergencyMapConfig();
            emergencyPosterConfig.map = mainAppService.generateMapLinkServiceUrl(emergencyMapConfig);
            var emergencyPosterServiceUrl = mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
            return replaceNorwegianChars(emergencyPosterServiceUrl);
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

          $(document).ready(function () {
            $($window).resize(setMenuListMaxHeight);
            setMenuListMaxHeight();
          });
        }
      };
    }
  ]);

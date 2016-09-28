angular.module('searchLagNodplakatPanelPage3')
    .controller('searchLagNodplakatPanelPage3Controller', ['mainAppService', 'ISY.MapAPI.Map', '$scope', '$sce',
    function(mainAppService, map, $scope, $sce) {

        var _getUTMZoneFromGeographicPoint = function(lon, lat) {
            // From emergencyPoster.js
            var sone = "32V", localProj = "EPSG:32632";
            if (lat > 72) {
                if (lon < 21) {
                    sone = "33X"; localProj = "EPSG:32633";
                } else {
                    sone = "35X"; localProj = "EPSG:32635";
                }
            } else if (lat > 64) {
                if (lon < 6) {
                    sone = "31W"; localProj = "EPSG:32631";
                } else if (lon < 12) {
                    sone = "32W"; localProj = "EPSG:32632";
                } else if (lon < 18) {
                    sone = "33W"; localProj = "EPSG:32633";
                } else if (lon < 24) {
                    sone = "34W"; localProj = "EPSG:32634";
                } else if (lon < 30) {
                    sone = "35W"; localProj = "EPSG:32635";
                } else {
                    sone = "36W"; localProj = "EPSG:32636";
                }
            } else {
                if (lon < 3) {
                    sone = "31V"; localProj = "EPSG:32631";
                } else if (lon >= 12) {
                    sone = "33V"; localProj = "EPSG:32633";
                }
            }
            return {'sone':sone, 'localProj': localProj};
        };

        var _round = function (value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        };

        var geographicDecimalToSecondsMinutes = function (geographicOrdinal) {
            var degrees = geographicOrdinal.toString().split('.')[0];
            var decimals = geographicOrdinal - degrees;
            var minutes = decimals * 60;
            var minutesDecimals = minutes - minutes.toString().split('.')[0];
            minutes = minutes.toString().split('.')[0];
            var seconds = minutesDecimals * 60;
            return {
                degrees: degrees,
                minutes: minutes,
                seconds: seconds
            };
        };

        var geographicalText = function (geographicOrdinal) {
            var geographicDegreesSecondsMinutes = geographicDecimalToSecondsMinutes(geographicOrdinal);
            return geographicDegreesSecondsMinutes.degrees + ' grader ' + geographicDegreesSecondsMinutes.minutes + ' minutter ' + _round(geographicDegreesSecondsMinutes.seconds, 0) + ' sekunder';
        };

        var UTM=_getUTMZoneFromGeographicPoint($scope.activePosition.geographicPoint[0], $scope.activePosition.geographicPoint[1]);

        var localUTMPoint = ol.proj.transform([$scope.activePosition.geographicPoint[0], $scope.activePosition.geographicPoint[1]], 'EPSG:4326', UTM.localProj);

        var emergencyPosterConfig = {
            'locationName': $scope.lagNodplakatName,
            'position1': geographicalText($scope.activePosition.geographicPoint[1]) + ' nord',
            'position2': geographicalText($scope.activePosition.geographicPoint[0]) + ' øst',
            'street': $scope.lagNodplakatDict.emergencyPosterPoint.veg + ' i ' + $scope.lagNodplakatDict.emergencyPosterPoint.kommune,
            'place': $scope.lagNodplakatDict.elevationPoint,
            'matrikkel': $scope.lagNodplakatDict.emergencyPosterPoint.matrikkelnr,
            'utm': 'Sone ' + UTM.sone + ' Ø ' + _round(localUTMPoint[0], 0) + ' N ' + _round(localUTMPoint[1], 0),
            'posDez': 'N' + _round($scope.activePosition.geographicPoint[1], 4) + '° - E' + _round($scope.activePosition.geographicPoint[0], 4) + '°',
            'map': ''
        };

        var emergencyMapConfig = {
            'service': 'WMS',
            'request': 'GetMap',
            'CRS': 'EPSG:32633',
            'FORMAT': 'image/jpeg',
            'BGCOLOR': '0xFFFFFF',
            'TRANSPARENT': 'false',
            'LAYERS': 'topo2_WMS',
            'VERSION': '1.3.0',
            'WIDTH': $(window).width(),
            'HEIGHT': $(window).height(),
            'BBOX': ''
        };

        $scope.generateEmergancyPoster = function () {
            var extent = map.GetExtent();
            emergencyMapConfig.BBOX = extent[0] + "," + extent[1] + "," + extent[2] + "," + extent[3];
            emergencyPosterConfig.map = mainAppService.generateMapLinkServiceUrl(emergencyMapConfig);
            var emergencyPosterServiceUrl = mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
            return $sce.trustAsResourceUrl(emergencyPosterServiceUrl);
        };
    }]);
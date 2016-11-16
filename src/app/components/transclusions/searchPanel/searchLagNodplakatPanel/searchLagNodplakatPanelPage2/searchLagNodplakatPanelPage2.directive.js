angular.module('searchLagNodplakatPanelPage2')
    .directive('searchLagNodplakatPanelPage2', [ '$window','ISY.MapAPI.Map', 'mainAppService',
        function($window, map, mainAppService) {
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
                        var sone = "32V", localProj = "EPSG:32632";
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
                        return {'sone': sone, 'localProj': localProj};
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



                    var generateEmergencyPosterConfig = function () {
                        var UTM = _getUTMZoneFromGeographicPoint(scope.activePosition.geographicPoint[0], scope.activePosition.geographicPoint[1]);
                        var localUTMPoint = ol.proj.transform([scope.activePosition.geographicPoint[0], scope.activePosition.geographicPoint[1]], 'EPSG:4326', UTM.localProj);
                        return {
                            'locationName': scope.lagNodplakatName,
                            'position1': geographicalText(scope.activePosition.geographicPoint[1]) + ' nord',
                            'position2': geographicalText(scope.activePosition.geographicPoint[0]) + ' øst',
                            'street': scope.lagNodplakatDict.emergencyPosterPoint.veg + ' i ' + scope.lagNodplakatDict.emergencyPosterPoint.kommune,
                            'place': scope.lagNodplakatDict.elevationPoint,
                            'matrikkel': scope.lagNodplakatDict.emergencyPosterPoint.matrikkelnr,
                            'utm': 'Sone ' + UTM.sone + ' Ø ' + _round(localUTMPoint[0], 0) + ' N ' + _round(localUTMPoint[1], 0),
                            'posDez': 'N' + _round(scope.activePosition.geographicPoint[1], 4) + '° - Ø' + _round(scope.activePosition.geographicPoint[0], 4) + '°',
                            'map': ''
                        };
                    };

                    var generateEmergencyMapConfig = function () {
                        map.SetCenter(scope.activePosition);
                        var extent = map.GetExtent();
                        var meterWidth = extent[2] - extent[0];
                        var pixelWidthPerHeight = pixels.width / pixels.height;
                        var meterHeight = meterWidth / pixelWidthPerHeight;
                        var mapCenter= map.GetCenter();
                        var minx = mapCenter.lon - (meterWidth / 2);
                        var miny = mapCenter.lat - (meterHeight / 2);
                        var maxx = mapCenter.lon + (meterWidth / 2);
                        var maxy = mapCenter.lat + (meterHeight / 2);
                        return {
                            'service': 'WMS',
                            'request': 'GetMap',
                            'CRS': 'EPSG:32633',
                            'FORMAT': 'image/jpeg',
                            'BGCOLOR': '0xFFFFFF',
                            'TRANSPARENT': 'false',
                            'LAYERS': 'topo2_WMS',
                            'VERSION': '1.3.0',
                            'WIDTH': pixels.width,
                            'HEIGHT': pixels.height,
                            'BBOX': minx + ',' + miny + ',' + maxx + ',' + maxy

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
                        return emergencyPosterServiceUrl;
                    };

                    scope.generateEmergancyPoster = function () {
                        var emergencyPosterConfig = generateEmergencyPosterConfig();
                        var emergencyMapConfig = generateEmergencyMapConfig();
                        emergencyPosterConfig.map = mainAppService.generateMapLinkServiceUrl(emergencyMapConfig);
                        var emergencyPosterServiceUrl = mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
                        return replaceNorwegianChars(emergencyPosterServiceUrl);
                    };
                }
            };
        }]);
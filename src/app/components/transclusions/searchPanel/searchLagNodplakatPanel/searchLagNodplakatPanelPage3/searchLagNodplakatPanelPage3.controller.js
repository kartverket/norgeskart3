angular.module('searchLagNodplakatPanelPage3')
    .controller('searchLagNodplakatPanelPage3Controller', ['mainAppService', 'ISY.MapAPI.Map', '$scope', '$sce',
    function(mainAppService, map, $scope, $sce) {

        var _round = function (value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        };

        var geographicDecimalToSecondsMinutes = function (geographicOrdinal) {
            var degrees=geographicOrdinal.toString().split('.')[0];
            var decimals=geographicOrdinal - degrees;
            var minutes=decimals * 60;
            var minutesDecimals=minutes - minutes.toString().split('.')[0];
            minutes=minutes.toString().split('.')[0];
            var seconds=minutesDecimals * 60;
            return {
                degrees: degrees,
                minutes: minutes,
                seconds: seconds
            };
        };

        var geographicalText = function (geographicOrdinal) {
            var geographicDegreesSecondsMinutes=geographicDecimalToSecondsMinutes(geographicOrdinal);
            return geographicDegreesSecondsMinutes.degrees + ' grader ' + geographicDegreesSecondsMinutes.minutes + ' minutter ' + _round(geographicDegreesSecondsMinutes.seconds,0) + ' sekunder';
        };

        var emergencyPosterConfig = {
            'locationName': $scope.lagNodplakatName,
            'position1': geographicalText($scope.activePosition.geographicPoint[1]) + ' nord',
            'position2': geographicalText($scope.activePosition.geographicPoint[0]) + ' øst',
            'street': $scope.lagNodplakatDict.emergencyPosterPoint.veg + ' i ' +  $scope.lagNodplakatDict.emergencyPosterPoint.kommune,
            'place': $scope.lagNodplakatDict.elevationPoint,
            'matrikkel': $scope.lagNodplakatDict.emergencyPosterPoint.matrikkelnr,
            'utm': 'Sone 33W Ø '+ _round($scope.activePosition.lon,0) +' N ' + _round($scope.activePosition.lat,0),
            'posDez': 'N' + _round($scope.activePosition.geographicPoint[0],4) + '° - E' + _round($scope.activePosition.geographicPoint[1],4) + '°',
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



        $scope.generateEmergancyPoster= function () {
            // map.SetCenter({
            //     'lon': $scope.activePosition.lon,
            //     'lat': $scope.activePosition.lat,
            //     'zoom': 10
            // });

            var extent = map.GetExtent();
            emergencyMapConfig.BBOX = extent[0] + "," + extent[1] + "," + extent[2] + "," + extent[3];
            emergencyPosterConfig.map = mainAppService.generateMapLinkServiceUrl(emergencyMapConfig);


            var emergencyPosterServiceUrl=mainAppService.generateEmergencyPosterServiceUrl(emergencyPosterConfig);
            console.log(emergencyPosterServiceUrl);
            return $sce.trustAsResourceUrl(emergencyPosterServiceUrl);
        };


        // var getEmergencyPosterConfig= function () {
        //     return emergencyPosterConfig;
        // };
        //
        //
        // var updateEmergencyPosterConfig= function (config) {
        //     emergencyPosterConfig = config;
        // };
        //
        //
        // var setPosterPosition = function (coor) {
        //     posterPosition = coor;
        // };

        //generateEmergancyPoster();


    }]);
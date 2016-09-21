angular.module('searchKoordTransPanel')
    .controller('searchKoordTransPanelController', [ '$scope','mainAppService','$http',
        function($scope, mainAppService,$http) {

            var _addSearchOptionToPanel = function (data) {
                $scope.activePosition.transLat = data.nord;
                $scope.activePosition.transLon = data.ost;
            };

            var _downloadFromUrl = function (url) {
                $http.get(url).then(function (response) {
                    _addSearchOptionToPanel(response.data);
                });
            };

            $scope._fetchKoordTrans = function () {
                var lat = $scope.activePosition.lat;
                var lon = $scope.activePosition.lon;
                var koordTransUrl = mainAppService.generateKoordTransUrl(lon, lat, $scope.activePosition.resSosiKoordSys);
                _downloadFromUrl(koordTransUrl);
            };

            $scope.activePosition.transLat = ($scope.activePosition.lat + '').split('.')[0];
            $scope.activePosition.transLon = ($scope.activePosition.lon + '').split('.')[0];
            $scope.activePosition.resSosiKoordSys = '23';

            $scope.coordinateSystems = {
                '84': 'EU89 - Geografisk grader (Lat/Lon)',
                '21': 'EU89, UTM-sone 31',
                '22': 'EU89, UTM-sone 32',
                '23': 'EU89, UTM-sone 33',
                '24': 'EU89, UTM-sone 34',
                '25': 'EU89, UTM-sone 35',
                '26': 'EU89, UTM-sone 36',
                '1': 'NGO1948, Gauss-K. Akse 1',
                '2': 'NGO1948, Gauss-K. Akse 2',
                '3': 'NGO1948, Gauss-K. Akse 3',
                '4': 'NGO1948, Gauss-K. Akse 4',
                '5': 'NGO1948, Gauss-K. Akse 5',
                '6': 'NGO1948, Gauss-K. Akse 6',
                '7': 'NGO1948, Gauss-K. Akse 7',
                '8': 'NGO1948, Gauss-K. Akse 8',
                '50': 'ED50 - Geografisk, grader',
                '31': 'ED50, UTM-sone 31',
                '32': 'ED50, UTM-sone 32',
                '33': 'ED50, UTM-sone 33',
                '34': 'ED50, UTM-sone 34',
                '35': 'ED50, UTM-sone 35',
                '36': 'ED50, UTM-sone 36'
                // 'what3words': 'what3words'
            };
        }
    ]);
angular.module('searchKoordTransPanel')
  .controller('searchKoordTransPanelController', ['$scope', 'mainAppService', '$http', 'searchKoordTransPanelFactory',
    function ($scope, mainAppService, $http, searchKoordTransPanelFactory) {

      var _round = function (value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
      };

      var _addSearchOptionToPanel = function (data) {
        if (($scope.activePosition.resSosiKoordSys == '50') || ($scope.activePosition.resSosiKoordSys == '84')) {
          $scope.activePosition.transLat = _round(data.nord, 7);
          $scope.activePosition.transLon = _round(data.ost, 7);
          var deg = Math.floor(data.ost);
          var rest = (data.ost - deg) * 60;
          $scope.activePosition.transLon2 = deg + '° ' + _round(rest, 7);
          var min = Math.floor(rest);
          var sec = (rest - min) * 60;
          $scope.activePosition.transLon3 = deg + '° ' + min + '\' ' + _round(sec, 5);
          deg = Math.floor(data.nord);
          rest = (data.nord - deg) * 60;
          $scope.activePosition.transLat2 = deg + '° ' + _round(rest, 7);
          min = Math.floor(rest);
          sec = (rest - min) * 60;
          $scope.activePosition.transLat3 = deg + '° ' + min + '\' ' + _round(sec, 5);
        } else {
          $scope.activePosition.transLat = _round(data.nord, 2);
          $scope.activePosition.transLat2 = '';
          $scope.activePosition.transLat3 = '';
          $scope.activePosition.transLon = _round(data.ost, 2);
          $scope.activePosition.transLon2 = '';
          $scope.activePosition.transLon3 = '';
        }
      };

      var _downloadFromUrl = function (url) {
        $http.get(url).then(function (response) {
          _addSearchOptionToPanel(response.data);
        });
      };

      $scope._fetchKoordTrans = function (key) {
        searchKoordTransPanelFactory.setLastSelectedCoorKey(key);
        $scope.activePosition.resSosiKoordSys = key;
        var lat = $scope.activePosition.geographicPoint[1];
        var lon = $scope.activePosition.geographicPoint[0];
        var koordTransUrl = mainAppService.generateKoordTransUrl(lon, lat, $scope.activePosition.resSosiKoordSys);
        _downloadFromUrl(koordTransUrl);
      };

      $scope.generateCoordinateSystems = function () {
        searchKoordTransPanelFactory.setAdvancedCoordSystem($scope.showAdvancedCoordinateSystems);
        if ($scope.showAdvancedCoordinateSystems) {
          /*$scope.coordinateSystems = {
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
          };*/
          $scope.coordinateSystems = {
            84: 'EU89_Lat_Lon',
            21: 'EU89_UTM_31',
            22: 'EU89_UTM_32',
            23: 'EU89_UTM_33',
            24: 'EU89_UTM_34',
            25: 'EU89_UTM_35',
            26: 'EU89_UTM_36',
            1: 'NGO1948_GaussK_1',
            2: 'NGO1948_GaussK_2',
            3: 'NGO1948_GaussK_3',
            4: 'NGO1948_GaussK_4',
            5: 'NGO1948_GaussK_5',
            6: 'NGO1948_GaussK_6',
            7: 'NGO1948_GaussK_7',
            8: 'NGO1948_GaussK_8',
            50: 'ED50',
            31: 'ED50_UTM_31',
            32: 'ED50_UTM_32',
            33: 'ED50_UTM_33',
            34: 'ED50_UTM_34',
            35: 'ED50_UTM_35',
            36: 'ED50_UTM_36'
          };
        } else {
          /*$scope.coordinateSystems = {
              '84': 'EU89 - Geografisk grader (Lat/Lon)',
              '21': 'EU89, UTM-sone 31',
              '22': 'EU89, UTM-sone 32',
              '23': 'EU89, UTM-sone 33',
              '24': 'EU89, UTM-sone 34',
              '25': 'EU89, UTM-sone 35',
              '26': 'EU89, UTM-sone 36'
          };*/
          $scope.coordinateSystems = {
            84: 'EU89_Lat_Lon',
            21: 'EU89_UTM_31',
            22: 'EU89_UTM_32',
            23: 'EU89_UTM_33',
            24: 'EU89_UTM_34',
            25: 'EU89_UTM_35',
            26: 'EU89_UTM_36'
          };

          // $scope.activePosition.transLat = _round($scope.activePosition.lat,2);
          // $scope.activePosition.transLon = _round($scope.activePosition.lon,2);
          // $scope.activePosition.resSosiKoordSys = '23';
        }
      };

      // $scope.activePosition.transLat = _round($scope.activePosition.lat,2);
      // $scope.activePosition.transLon = _round($scope.activePosition.lon,2);
      // $scope.activePosition.resSosiKoordSys = '23';
      // $scope.generateCoordinateSystems();

      var initCoordSystem = function () {
        var key = searchKoordTransPanelFactory.getLastSelectedCoorKey();
        $scope.showAdvancedCoordinateSystems = searchKoordTransPanelFactory.getAdvancedCoordSystem();
        if (key !== '') {
          $scope._fetchKoordTrans(key);
        } else {
          $scope.activePosition.transLat = _round($scope.activePosition.lat, 2);
          $scope.activePosition.transLon = _round($scope.activePosition.lon, 2);
          $scope.activePosition.resSosiKoordSys = '23';
        }

        $scope.generateCoordinateSystems();
      };

      initCoordSystem();

      $scope.getActiveCoorSystem = function () {
        return $scope.coordinateSystems[$scope.activePosition.resSosiKoordSys];
      };

    }
  ]);

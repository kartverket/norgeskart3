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
        var standard = mainAppService.getCoordinateSystems('standard');
        var extended = mainAppService.getCoordinateSystems('extended');
        angular.extend(extended, standard);
        if ($scope.showAdvancedCoordinateSystems) {
          $scope.coordinateSystems = extended;
        } else {
          $scope.coordinateSystems = standard;
        }
      };

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



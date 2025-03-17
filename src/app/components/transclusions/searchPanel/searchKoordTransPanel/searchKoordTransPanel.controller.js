angular.module('searchKoordTransPanel')
  .controller('searchKoordTransPanelController', ['$scope', 'mainAppService', '$http', 'searchKoordTransPanelFactory',
    function ($scope, mainAppService, $http, searchKoordTransPanelFactory) {

      var _round = function (value, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
      };

      if (!Math.sign) {
        Math.sign = function(x) {
          return ((x > 0) - (x < 0)) || +x;
        };
      }

      // The following code snippet are from http://www.movable-type.co.uk/scripts/latlong.html
      /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
      /* Geodesy representation conversion functions                        (c) Chris Veness 2002-2017  */
      /*                                                                                   MIT Licence  */
      /* www.movable-type.co.uk/scripts/latlong.html                                                    */
      /* www.movable-type.co.uk/scripts/geodesy/docs/module-dms.html                                    */
      /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
      /**
       * Converts decimal degrees to deg/min/sec format
       *  - degree, prime, double-prime symbols are added, but sign is discarded, though no compass
       *    direction is added.
       *
       * @private
       * @param   {number} deg - Degrees to be formatted as specified.
       * @param   {string} [format=dms] - Return value as 'd', 'dm', 'dms' for deg, deg+min, deg+min+sec.
       * @param   {number} [dp=0|2|4] - Number of decimal places to use – default 0 for dms, 2 for dm, 4 for d.
       * @returns {string} Degrees formatted as deg/min/secs according to specified format.
       */
      var decToDMS = function (deg, format, dp) {
        DmsSeparator = '';
        if (isNaN(deg)) {
          return null; // give up here if we can't make a number from deg
        }

        // default values
        if (format === undefined) {
          format = 'dms';
        }
        if (dp === undefined) {
          switch (format) {
            case 'd':
            case 'deg':
              dp = 7;
              break;
            case 'dm':
            case 'deg+min':
              dp = 7;
              break;
            case 'dms':
            case 'deg+min+sec':
              dp = 5;
              break;
            default:
              format = 'dms';
              dp = 0; // be forgiving on invalid format
          }
        }

        var sign = Math.sign(deg) === -1 ? '-' : ''; // remember the sign
        deg = Math.abs(deg); // (unsigned result ready for appending compass dir'n)

        var dms, d, m, s;
        switch (format) {
          default: // invalid format spec!
          case 'd':
          case 'deg':
            d = _round(deg, dp); // round degrees
            dms = sign + d; // + '°';
            break;
          case 'dm':
          case 'deg+min':
            d = Math.floor(deg); // get component deg
            m = _round(((deg * 60) % 60), dp); // get component min & round
            if (m == 60) {
              m = 0;
              d++;
            } // check for rounding up
            dms = sign + d + '°' + DmsSeparator + m + '′';
            break;
          case 'dms':
          case 'deg+min+sec':
            d = Math.floor(deg); // get component deg
            m = Math.floor((deg * 3600) / 60) % 60; // get component min
            s = _round((deg * 3600 % 60), dp); // get component sec & round
            if (s == 60) {
              s = _round((0), dp);
              m++;
            } // check for rounding up
            if (m == 60) {
              m = 0;
              d++;
            } // check for rounding up
            dms = sign + d + '°' + DmsSeparator + m + '′' + DmsSeparator + s + '″';
            break;
        }
        
        return dms;
      };
      // End snippet

      var _addSearchOptionToPanel = function (data) {
        if (($scope.activePosition.resSosiKoordSys == '50') || ($scope.activePosition.resSosiKoordSys == '84')) {
          $scope.activePosition.transLon = decToDMS(data.x, 'd');
          $scope.activePosition.transLat = decToDMS(data.y, 'd');
          $scope.activePosition.transLon2 = decToDMS(data.x, 'dm');
          $scope.activePosition.transLat2 = decToDMS(data.y, 'dm');
          $scope.activePosition.transLon3 = decToDMS(data.x, 'dms');
          $scope.activePosition.transLat3 = decToDMS(data.y, 'dms');
        } else {
          $scope.activePosition.transLat = _round(data.y, 4);
          $scope.activePosition.transLat2 = '';
          $scope.activePosition.transLat3 = '';
          $scope.activePosition.transLon = _round(data.x, 4);
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

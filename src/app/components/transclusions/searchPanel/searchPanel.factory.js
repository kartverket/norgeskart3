angular
  .module('searchPanel')
  .factory('searchPanelFactory', ['mainAppService',
    function (mainAppService) {

      var placenameHitsPerPage = 15;

      var placenamePage = 1;

      var mapEpsg = 'EPSG:25833';

      var availableUTMZones = ['25832', '25833', '25834', '25835', '25836', '32632', '32633', '32634', '32635', '32636'];

      var sourceDict = {
        ssr: 'Stedsnavn',
        adresse: 'Adresse',
        matrikkelveg: 'Vegnavn',
        matrikkeladresse: 'Adresse',
        coordGeo: 'Geografisk koordinat',
        coordUtm: 'UTM-koordinat',
        mouseClick: 'Klikk i kartet',
        matrikkelnummer: 'Gårds og bruksnummer'
      };

      var parseInput = function (input) {
        var parsedInput = {};
        var parsedQuery, reResult;
        var gbrnr = /^[ \t]*([A-Za-zæøåÆØÅ ]+[A-Za-zæøåÆØÅ]|[\d]+)[ \t]*[-/][ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*$/;
        var gbrnr2 = /^[ \t]*([A-Za-zæøåÆØÅ ]+[A-Za-zæøåÆØÅ]|[\d]+)[ \t]*[-/][ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*$/;
        var gbrnr3 = /^[ \t]*([A-Za-zæøåÆØÅ ]+[A-Za-zæøåÆØÅ]|[\d]+)[ \t]*[-/][ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*$/;
        var gbrnr4 = /^[ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*[ \t]*[,]([A-Za-zæøåÆØÅ ]*)$/;
        var gbrnr5 = /^[ \t]*([\d]+)[ \t]*[/][ \t]*([\d]+)[ \t]*[ \t]*$/;

        if (gbrnr.test(input)) {
          reResult = gbrnr.exec(input);
          parsedInput.municipality = reResult[1].trim();
          parsedInput.gnr = reResult[2];
          parsedInput.bnr = reResult[3];
          parsedInput.numbers = [parsedInput.gnr, parsedInput.bnr];
          parsedQuery = parsedInput.municipality + '-' + parsedInput.numbers.join('/');
        } else if (gbrnr2.test(input)) {
          reResult = gbrnr2.exec(input);
          parsedInput.municipality = reResult[1].trim();
          parsedInput.gnr = reResult[2];
          parsedInput.bnr = reResult[3];
          parsedInput.fnr = reResult[4];
          parsedInput.numbers = [parsedInput.gnr, parsedInput.bnr, parsedInput.fnr];
          parsedQuery = parsedInput.municipality + '-' + parsedInput.numbers.join('/');
        } else if (gbrnr3.test(input)) {
          reResult = gbrnr3.exec(input);
          parsedInput.municipality = reResult[1].trim();
          parsedInput.gnr = reResult[2];
          parsedInput.bnr = reResult[3];
          parsedInput.fnr = reResult[4];
          parsedInput.snr = reResult[5];
          parsedInput.numbers = [parsedInput.gnr, parsedInput.bnr, parsedInput.fnr, parsedInput.snr]; // snr confuses search engine not to output coordinates
          parsedQuery = parsedInput.municipality + '-' + parsedInput.numbers.join('/');
        } else if (gbrnr4.test(input)) {
          reResult = gbrnr4.exec(input);
          parsedInput.gnr = reResult[1];
          parsedInput.bnr = reResult[2];
          parsedInput.municipality = reResult[3].trim();
          parsedInput.numbers = [parsedInput.gnr, parsedInput.bnr];
          parsedQuery = parsedInput.municipality + '-' + parsedInput.numbers.join('/');
        } else if (gbrnr5.test(input)) {
          reResult = gbrnr5.exec(input);
          parsedInput.gnr = reResult[1];
          parsedInput.bnr = reResult[2];
          parsedInput.municipality = '';
          parsedInput.numbers = [parsedInput.gnr, parsedInput.bnr];
          parsedQuery = input;
        } else {
          parsedQuery = input;
        }
        return {parsedQuery: parsedQuery, parsedInput: parsedInput };
      };

      var generateServiceDict = function (query) {
        query = parseInput(query).parsedQuery;
        var serviceDict = {};
        serviceDict['ssr'] = {
          url: mainAppService.generateSearchStedsnavnUrl(query, placenamePage, placenameHitsPerPage),
          format: 'json',
          source: 'ssr',
          epsg: 'EPSG:4258',
          nameID: 'name',
          latID: 'lat',
          lonID: 'lon',
          kommuneID: 'kommune',
          husnummerID: 'HUSNR',
          husnummerBokstav: false,
          navnetypeID: 'navneobjekttype'
        };

        serviceDict['matrikkeladresse'] = {
          url: mainAppService.generateSearchMatrikkelAdresseUrl(query),
          format: 'json',
          source: 'matrikkeladresse',
          epsg: 'EPSG:4326',
          nameID: 'adressenavn',
          latID: 'lat',
          lonID: 'lon',
          kommuneID: 'kommunenavn',
          husnummerID: 'nummer',
          husnummerBokstav: 'bokstav',
          navnetypeID: "type"
        };
        serviceDict['matrikkelnummer'] = {
          url: mainAppService.generateSearchMatrikkelNummerUrl(query),
          format: 'json',
          source: 'matrikkelnummer',
          epsg: 'EPSG:25832',
          nameID: 'NAVN',
          latID: 'LATITUDE',
          lonID: 'LONGITUDE',
          kommuneID: 'KOMMUNENAVN',
          husnummerID: false,
          husnummerBokstav: false,
          navnetypeID: false
        };
        if ( /\d/.test(query) ) {
          serviceDict['adresse'] = {
            url: mainAppService.generateAdresseSokUrl(query),
            format: 'json',
            source: 'adresse',
            epsg: 'EPSG:4326',
            nameID: 'adressenavn',
            latID: 'lat',
            lonID: 'lon',
            kommuneID: 'kommunenavn',
            husnummerID: 'nummer',
            husnummerBokstav: "bokstav",
            navnetypeID: "type"
          };
        } else {
          serviceDict['matrikkelveg'] = {
            url: mainAppService.generateSearchMatrikkelVegUrl(query),
            format: 'json',
            source: 'matrikkelveg',
            epsg: 'EPSG:25832',
            nameID: 'NAVN',
            latID: 'LATITUDE',
            lonID: 'LONGITUDE',
            kommuneID: 'KOMMUNENAVN',
            husnummerID: 'HUSNUMMER',
            husnummerBokstav: false,
            navnetypeID: false
          };
        }
        return serviceDict;
      };

      var searchOptionsOrder = ['seEiendom', 'ssrFakta', 'koordTrans', 'lagTurkart', 'lagNodplakat'];
      var eiendomMarkering = false;

      return {
        getSourceDict: function () {
          return sourceDict;
        },
        parseInput: function (input) {
          return parseInput(input);
        },
        getServiceDict: function (query) {
          return generateServiceDict(query);
        },
        getAvailableUTMZones: function () {
          return availableUTMZones;
        },
        getSearchOptionsOrder: function () {
          return searchOptionsOrder;
        },
        getMapEpsg: function () {
          return mapEpsg;
        },
        getPlacenameHitsPerPage: function () {
          return placenameHitsPerPage;
        },
        resetPlacenamePage: function () {
          placenamePage = 1;
          return placenamePage;
        },
        decreasePlacenamePage: function () {
          if (placenamePage > 1) {
            placenamePage--;
          }
          return placenamePage;
        },
        increasePlacenamePage: function () {
          placenamePage++;
          return placenamePage;
        },
        getPlacenamePage: function () {
          return placenamePage;
        },

        setPlacenamePage: function (value) {
          placenamePage = value;
        },

        constructPoint: function (lat, lon, epsgFrom, epsgTo) {
          return ol.proj.transform([Number(lon), Number(lat)], epsgFrom, epsgTo);
        },

        setShowEiendomMarkering: function (value) {
          eiendomMarkering = value;
        },

        getShowEiendomMarkering: function () {
          return eiendomMarkering;
        }
      };
    }
  ]);

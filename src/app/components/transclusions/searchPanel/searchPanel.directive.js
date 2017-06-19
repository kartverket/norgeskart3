angular.module('searchPanel')
  .directive('searchPanel', ['$timeout', 'mainAppService', 'ISY.MapAPI.Map', 'ISY.EventHandler', '$http', 'searchPanelFactory', '$window', 'toolsFactory', '$location',
    function ($timeout, mainAppService, map, eventHandler, $http, searchPanelFactory, $window, toolsFactory, $location) {
      return {
        templateUrl: 'components/transclusions/searchPanel/searchPanel.html',
        restrict: 'A',
        controller: 'searchPanelController',
        link: function (scope) {
          scope.sourceDict = searchPanelFactory.getSourceDict();
          scope.mapEpsg = searchPanelFactory.getMapEpsg();

          _searchResults = {};
          _unifiedResults = {};
          _serviceDict = {};
          _queryDict = {};

          var _clickableLinkClass = {
            icon: 'search-options pointer-cursor',
            text: 'pointer-cursor'
          };

          var _defaultClass = {
            icon: 'search-options',
            text: ''
          };
          var _coordinate = function (value, min, sec) {
            var coordinate = {};
            if (typeof min !== "undefined") {
              coordinate = {
                deg: parseInt(value),
                min: parseFloat(min),
                sec: parseFloat(sec),
                value: parseInt(value) + parseFloat(min) / 60.0 + parseFloat(sec) / 3600.0
              };
            } else {
              coordinate = {
                value: value
              };
            }
            return coordinate;
          };
          var _constructSearchOption = function (name, icon, clickable, text, extra) {
            var searchOption = {
              icon: {
                value: icon,
                class: _defaultClass.icon
              },
              text: {
                value: text,
                class: _defaultClass.text
              },
              name: name
            };

            if (clickable) {
              searchOption.icon.class = _clickableLinkClass.icon;
              searchOption.text.class = _clickableLinkClass.text;
            }
            for (var key in extra) {
              searchOption[key] = extra[key];
            }
            return searchOption;
          };

          var _emptySearchOption = {
            icon: {
              value: '',
              class: ''
            },
            text: {
              value: '',
              class: ''
            },
            name: ''
          };

          var _getValueFromUrl = function (key) {
            if (!$location.url()) {
              return false;
            }
            var url = $location.url();
            var params = url.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
              var param = params[i].split('=');
              if (param[0] == key) {
                return param[1];
              }
            }
          };

          var _removeSearchFromUrl = function () {
            var hash = _getValueFromUrl('sok');
            var oldUrl = $location.url();
            $location.url(oldUrl.replace('sok=' + hash, ''));
          };

          var _setSearchInUrl = function (query) {
            _removeSearchFromUrl();
            var oldUrl = $location.url();
            $location.url(oldUrl + '&sok=' + query);
          };

          var _resetResults = function () {
            _unifiedResults = {};
            _searchResults = {};
          };

          var _getQuery = function () {
            return scope.searchBarModel + '';
          };

          var flipCoordinates = function (obj) {
            var tmp = obj.north;
            obj.north = obj.east;
            obj.east = tmp;
            return obj;
          };

          var _parseInput = function (input) {
            var parsedInput = {},
              reResult, what3words,
              decimalPairComma,
              decimalPairDot;

            // matches two numbers using either . or , as decimal mark. Numbers using . as decimal mark are separated by , or , plus blankspace. Numbers using , as decimal mark are separated by blankspace
            what3words = /^[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/;
            decimalPairComma = /^[ \t]*([0-9]+,[0-9]+|[0-9]+)[ \t]+([0-9]+,[0-9]+|[0-9]+)(?:@([0-9]+))?[ \t]*$/;
            decimalPairDot = /^[ \t]*([0-9]+\.[0-9]+|[0-9]+)(?:[ \t]+,|,)[ \t]*([0-9]+\.[0-9]+|[0-9]+)(?:@([0-9]+))?[ \t]*$/;

            input = input.replace(/Nord|NORD|North|NORTH|[nN]/g, 'N');
            input = input.replace(/Øst|ØST|East|EAST|[eEøØoO]/g, 'E');

            var interpretAsNorthEastOrXY = function (obj) {
              if (obj && typeof obj.first.value === 'number' && typeof obj.second.value === 'number') {
                obj.north = obj.first;
                delete obj.first;
                obj.east = obj.second;
                delete obj.second;
              }
              return obj;
            };
            if (typeof input === 'string') {
              if (what3words.test(input)) {
                parsedInput.phrase = input;
                parsedInput.w3w = true;
                return parsedInput;
              } else if (decimalPairComma.test(input)) {
                reResult = decimalPairComma.exec(input);
                parsedInput.first = {
                  value: parseFloat(reResult[1])
                };
                parsedInput.second = {
                  value: parseFloat(reResult[2])
                };
                if (reResult[3]) {
                  parsedInput.projectionHint = parseInt(reResult[3], 10);
                }
                return interpretAsNorthEastOrXY(parsedInput);
              } else if (decimalPairDot.test(input)) {
                reResult = decimalPairDot.exec(input);
                parsedInput.first = {
                  value: parseFloat(reResult[1])
                };
                parsedInput.second = {
                  value: parseFloat(reResult[2])
                };
                if (reResult[3]) {
                  parsedInput.projectionHint = parseInt(reResult[3], 10);
                }
                return interpretAsNorthEastOrXY(parsedInput);
              }
            }

            var digitsRegEx = /(-?\d*\.?)\d+/g;
            var nondigitsRegEx = /[nN]|[eEøØoO]+/g; //   /\D+/g;
            var separatorRegEx = /[,]+/g;
            var match;
            var alldigits = [];
            var nondigits = [];
            var separators = [];
            while ((match = separatorRegEx.exec(input)) !== null) {
              separators.push(match[0]);
            }
            if (separators.length > 1) {
              input = input.replace(new RegExp(/[,]/, 'g'), '.');
            }
            while ((match = digitsRegEx.exec(input)) !== null) {
              alldigits.push(match[0]);
            }
            while ((match = nondigitsRegEx.exec(input)) !== null) {
              nondigits.push(match[0]);
            }
            if (alldigits.length === 6) {
              parsedInput.north = _coordinate(alldigits[0], alldigits[1], alldigits[2]);
              parsedInput.east = _coordinate(alldigits[3], alldigits[4], alldigits[5]);
            } else if (alldigits.length === 4) {
              parsedInput.north = _coordinate(alldigits[0], alldigits[1], 0);
              parsedInput.east = _coordinate(alldigits[2], alldigits[3], 0);
            } else if (alldigits.length === 2) {
              parsedInput.north = _coordinate(alldigits[0]);
              parsedInput.east = _coordinate(alldigits[1]);
              if (nondigits[0] === 'N' && Math.round(parsedInput.north.value).toString().length > 6) {
                parsedInput = flipCoordinates(parsedInput);
              }
            }
            if (nondigits[0] === 'E') {
              parsedInput = flipCoordinates(parsedInput);
            }
            return parsedInput;
          };

          scope.contructQueryPoint = function (lat, lon, epsg, source, kommune) {
            return {
              name: '',
              point: searchPanelFactory.constructPoint(lat, lon, epsg, scope.mapEpsg),
              //format: _serviceDict[source].format,
              source: source,
              kommune: kommune
            };
          };

          scope.removeInfomarkers = function () {
            map.RemoveInfoMarkers();
            map.RemoveInfoMarker();
          };

          var _addMatrikkelInfoToSearchOptions = function (jsonRoot, name) {
            if (!jsonRoot[0]) {
              jsonRoot = [jsonRoot];
            }
            var matrikkelInfo = [];
            for (var i = 0; i < jsonRoot.length; i++) {
              if ((jsonRoot.MATRIKKELNR == 'Mnr mangler') || (jsonRoot.MATRIKKELNR == 'Mnr vann mangler')) {
                continue;
              }

              var extra = {
                kommunenr: jsonRoot[i].KOMMUNENR,
                gardsnr: jsonRoot[i].GARDSNR,
                bruksnr: jsonRoot[i].BRUKSNR,
                festenr: jsonRoot[i].FESTENR,
                seksjonsnr: jsonRoot[i].SEKSJONSNR,
                eiendomstype: jsonRoot[i].EIENDOMSTYPE,
                matrikkelnr: jsonRoot[i].MATRIKKELNR
              };

              extra.matrikkeladresse = extra.kommunenr + '-' + extra.gardsnr + '/' + extra.bruksnr;

              if (parseInt(extra.festenr, 10) > 0) {
                extra.matrikkeladresse += '/' + extra.festenr;
                if (parseInt(extra.seksjonsnr, 10) > 0) {
                  extra.matrikkeladresse += '/' + extra.seksjonsnr;
                }
              }

              extra.url = mainAppService.generateSeEiendomUrl(extra.kommunenr, extra.gardsnr, extra.bruksnr, extra.festenr, extra.seksjonsnr);
              var text = '' + extra.kommunenr + '-' + extra.matrikkelnr.replace(new RegExp(' ', 'g'), '');
              matrikkelInfo.push(_constructSearchOption(name, 'fa fa-home', true, text, extra));
            }

            var tmpResults;
            if (matrikkelInfo.length > 1) {
              tmpResults = matrikkelInfo.sort(function (a, b) {
                return a.matrikkeladresse.localeCompare(b.matrikkeladresse);
              });
            }

            scope.searchOptionsDict[name] = matrikkelInfo[0];
            if (tmpResults) {
              scope.searchOptionsDict[name].allResults = tmpResults;
            }
          };

          scope.fetchAddressInfoForMatrikkel = function () {
            scope.showFetchAdressSearch = true;
            var komunenr = scope.searchOptionsDict['seEiendom'].kommunenr;
            var gardsnr = scope.searchOptionsDict['seEiendom'].gardsnr;
            var bruksnr = scope.searchOptionsDict['seEiendom'].bruksnr;
            var festenr = scope.searchOptionsDict['seEiendom'].festenr;
            var sectionsnr = scope.searchOptionsDict['seEiendom'].seksjonsnr;
            var url = mainAppService.generateEiendomAddress(komunenr, gardsnr, bruksnr, festenr, sectionsnr);
            $http.get(url).then(function (response) {
              scope.showFetchAdressSearch = false;
              scope.vegaddresse = '';
              scope.kommuneNavn = '';
              scope.cityName = '';
              var addressNum = [];
              var responseData = response.data;
              for (var i = 0; i < responseData.length; i++) {
                var adressWithNum = responseData[i].VEGADRESSE2.split(" ");
                if (scope.vegaddresse === '') {
                  scope.vegaddresse = responseData[i].VEGADRESSE2.split(adressWithNum[adressWithNum.length - 1])[0];
                }
                if (scope.kommuneNavn === '') {
                  scope.kommuneNavn = responseData[i].KOMMUNENAVN;
                }
                if (scope.cityName === '' && responseData[i].VEGADRESSE !== "") {
                  scope.cityName = responseData[i].VEGADRESSE[1];
                }
                addressNum.push(adressWithNum[adressWithNum.length - 1]);
              }

              addressNum.sort(function (a, b) {
                if (a < b) {
                  return -1;
                }
                if (a > b) {
                  return 1;
                }
                return 0;
              });

              for (var j = 0; j < addressNum.length; j++) {
                if (addressNum[j] !== "") {
                  scope.vegaddresse += " " + addressNum[j];
                  if (j !== addressNum.length - 1) {
                    scope.vegaddresse += ",";
                  }
                }
              }
            });
          };
          var _addSearchOptionToPanel = function (name, data) {
            switch (name) {
              case ('elevationPoint'):
                scope.searchOptionsDict['ssrFakta'] = _constructSearchOption('ssrFakta', 'fa fa-flag', true, '"' + data.placename + '"', {
                  url: mainAppService.generateFaktaarkUrl(data.stedsnummer)
                });
                if (scope.activeSearchResult && scope.activeSearchResult.source == 'mouseClick') {
                  scope.searchBarModel = data.placename;
                }
                var elevationValue = data.elevation === false ? '-' : data.elevation.toFixed(1);
                scope.searchOptionsDict[name] = _constructSearchOption(name, '↑', false, elevationValue, {});
                break;

              case ('seEiendom'):
                var jsonObject = xml.xmlToJSON(data);
                if (!jsonObject.FeatureCollection) {
                  return;
                }
                if (!jsonObject.FeatureCollection.featureMembers) {
                  return;
                }
                var jsonRoot = jsonObject.FeatureCollection.featureMembers.TEIGWFS;
                _addMatrikkelInfoToSearchOptions(jsonRoot, name);

                scope.fetchAddressInfoForMatrikkel();
                if (searchPanelFactory.getShowEiendomMarkering()) {
                  scope.showSelection();
                }
                break;
            }
          };

          var _downloadSearchOptionFromUrl = function (url, name) {
            $http.get(url).then(function (response) {
              _addSearchOptionToPanel(name, response.data);
              scope.showMatrikelInfoSearch = false;
            });
          };

          var _fetchElevationPoint = function () {
            var lat = scope.activePosition.lat;
            var lon = scope.activePosition.lon;
            var epsgNumber = scope.mapEpsg.split(':')[1];
            var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
            _downloadSearchOptionFromUrl(elevationPointUrl, 'elevationPoint');
          };

          var _fetchMatrikkelInfo = function () {
            scope.showMatrikelInfoSearch = true;
            var lat = scope.activePosition.geographicPoint[1];
            var lon = scope.activePosition.geographicPoint[0];
            var matrikkelInfoUrl = mainAppService.generateMatrikkelInfoUrl(lat, lon, lat, lon);
            _downloadSearchOptionFromUrl(matrikkelInfoUrl, 'seEiendom');
          };

          var _addKoordTransToSearchOptions = function () {
            var name = 'koordTrans';
            scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-map-marker', true, 'Se koordinater', {});
          };

          var _addLagTurkartToSearchOptions = function () {
            var name = 'lagTurkart';
            scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-blind', true, 'Lage turkart', {});
          };

          var _addLagFargeleggingskartToSearchOptions = function () {
            var name = 'lagFargeleggingskart';
            scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-paint-brush', true, 'Lage fargeleggingskart', {});
          };

          var _addEmergencyPosterToSearchOptions = function () {
            var name = 'lagNodplakat';
            scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-ambulance', true, 'Lage nødplakat', {});
          };

          scope.initSearchOptions = function () {
            scope.searchOptionsOrder = searchPanelFactory.getSearchOptionsOrder();
            for (var searchOption in scope.searchOptionsOrder) {
              scope.searchOptionsDict[scope.searchOptionsOrder[searchOption]] = _emptySearchOption;
            }
            _fetchElevationPoint();
            _fetchMatrikkelInfo();
            _addKoordTransToSearchOptions();
            _addLagTurkartToSearchOptions();
            _addLagFargeleggingskartToSearchOptions();
            _addEmergencyPosterToSearchOptions();
          };

          scope.activatePosition = function (searchResult) {
            var activePosition = {
              lon: parseFloat(searchResult.point[0]),
              lat: parseFloat(searchResult.point[1])
              // epsg: scope.mapEpsg
            };
            var zoomTo = parseFloat(13);
            var activeZoom = parseFloat($location.search().zoom);
            if (scope.searchPanelLayout != "searchSeEiendomPanel" && activeZoom < zoomTo && searchResult.source != 'mouseClick') {
              activePosition.zoom = zoomTo;
            }
            activePosition.geographicPoint = searchPanelFactory.constructPoint(activePosition.lat, activePosition.lon, scope.mapEpsg, 'EPSG:4326');
            map.SetCenter(activePosition);
            map.RemoveInfoMarkers();
            scope.activePosition = activePosition;
            scope.activeSearchResult = searchResult;
            if (scope.searchOptionsDict['elevationPoint']) {
              scope.searchOptionsDict['elevationPoint'].text.value = undefined;
            }
            if (scope.searchBarModel.length < searchResult.name.length && !scope.coordinate && scope.activeSearchResult.source != 'mouseClick') {
              scope.searchBarModel = searchResult.name;
            }
            scope.initSearchOptions();
          };

          scope.showQueryPoint = function (queryPoint) {
            if (!scope.searchResults) {
              scope.searchResults = {};
            }
            scope.searchResults['searchBar'] = queryPoint;
            scope.removeInfomarkers();
            map.ShowInfoMarker(queryPoint.point);
            scope.activatePosition(queryPoint);
            if (queryPoint.source === 'coordGeo' || queryPoint.source === 'coordUtm') {
              scope.showSearchOptionsPanel();
            }
          };

          var _checkQueryForCoordinates = function (query) {
            scope.coordinate = true;
            var epsg = query.split('@')[1];
            var params = _parseInput(query.split('@')[0]);

            if (params.w3w) {
              _w3wSearch(params.phrase);
            } else if (typeof params.phrase === 'string') {
              return false;
            } else if (typeof params.north === 'undefined') {
              return false;
            }
            // var possibleProjections = mainAppService.isNotOutOfBounds(params);
            // console.error(JSON.stringify(possibleProjections));

            var availableUTMZones = searchPanelFactory.getAvailableUTMZones();
            if (availableUTMZones.indexOf(epsg) > -1) {
              scope.showQueryPoint(scope.contructQueryPoint(params.east.value, params.north.value, 'EPSG:' + epsg, 'coordUtm', ''));
              return true;
            }
            if (epsg) {
              var sosi = mainAppService.getSOSIfromEPSG(epsg);
              if (sosi) {
                var koordTransUrl = mainAppService.generateKoordTransUrl(params.north.value, params.east.value, '', sosi);
                $http.get(koordTransUrl).then(function (response) {
                  if (response.data.hasOwnProperty('errKode') && response.data.errKode !== 0) {
                    console.error(response.data);
                    return false;
                  } else {
                    scope.showQueryPoint(scope.contructQueryPoint(response.data.nord, response.data.ost, 'EPSG:4326', 'coordGeo', ''));
                    return true;
                  }
                });
              } else {
                return false;
              }
            } else {
              if (((params.north.value > 32.88) && (params.east.value > -16.1)) && ((params.north.value < 84.17) && (params.east.value < 39.65))) {
                epsg = 'EPSG:4258';
                scope.showQueryPoint(scope.contructQueryPoint(params.north.value, params.east.value, epsg, 'coordGeo', ''));
                return true;
              } else if (((params.east.value > 32.88) && (params.north.value > -16.1)) && ((params.east.value < 84.17) && (params.north.value < 39.65))) {
                epsg = 'EPSG:4258';
                scope.showQueryPoint(scope.contructQueryPoint(params.east.value, params.north.value, epsg, 'coordGeo', ''));
                return true;
              } else if (((params.north.value > -2465220.60) && (params.east.value > 4102904.86)) && ((params.north.value < 771164.64) && (params.east.value < 9406031.63))) {
                epsg = 'EPSG:25833';
                scope.showQueryPoint(scope.contructQueryPoint(params.east.value, params.north.value, epsg, 'coordUtm', ''));
                scope.searchBarModel += '@' + scope.mapEpsg.split(':')[1];
                return true;
              } else if (((params.north.value > -128551.4542) && (params.east.value > 6404024.705)) && ((params.north.value < 1148218.099) && (params.east.value < 8010780.591))) {
                epsg = 'EPSG:25833';
                SosiCode = 23;
                scope.showQueryPoint(scope.contructQueryPoint(params.east.value, params.north.value, epsg, 'coordUtm', ''));
                scope.searchBarModel += '@' + scope.mapEpsg.split(':')[1];
                return true;
              }
            }
            return false;
          };

          scope.resetResultsService = function (service) {
            _unifiedResults[service] = {};
            _searchResults[service] = {};
            scope.searchResults[service] = {};
          };

          scope.populateServiceDict = function (query) {
            _serviceDict = searchPanelFactory.getServiceDict(query);
          };

          var _init = function (query) {
            _resetResults();
            scope.searchResults = undefined;
            scope.activeSearchResult = undefined;
            scope.populateServiceDict(query);
            scope.coordinate = false;
            map.RemoveInfoMarker();
            scope.placenamePage = searchPanelFactory.resetPlacenamePage() + 1;
          };

          var _notSingleAddressHit = function () {
            var matrikkelKey = 'matrikkeladresse';
            if (_unifiedResults[matrikkelKey] && Object.keys(_unifiedResults[matrikkelKey]).length == 1 && !_unifiedResults['matrikkelveg'] && !_unifiedResults['ssr']) {
              var key = Object.keys(_unifiedResults[matrikkelKey])[0];
              var result = _unifiedResults[matrikkelKey][key];
              scope.showQueryPoint(scope.contructQueryPoint(result.point[1], result.point[0], scope.mapEpsg, result.source, result.kommune));
              scope.showSearchOptionsPanel();
              return false;
            }
            return true;
          };

          scope.addResultsToMap = function () {
            var coordinates = [];
            for (var source in _unifiedResults) {
              if (source == 'matrikkeladresse' && _unifiedResults['matrikkelveg'] && Object.keys(_unifiedResults['matrikkelveg']).length > 1) {
                continue;
              }
              for (var result in _unifiedResults[source]) {
                coordinates.push(_unifiedResults[source][result].point);
              }
            }
            if (coordinates.length > 0) {
              map.RemoveInfoMarkers();
              map.ShowInfoMarkers(coordinates);
              $timeout(function () {
                scope.searchResults = _unifiedResults;
              }, 0);
            }
          };
          var _getPlacenameHits = function (jsonObject) {
            scope.placenameHits = jsonObject.sokRes.totaltAntallTreff;
            scope.placenameItems = _generateArrayWithValues(parseInt(scope.placenameHits, 10));
            scope.placenamePageTotal = Math.ceil(scope.placenameHits / searchPanelFactory.getPlacenameHitsPerPage());
          };

          var _convertSearchResult2Json = function (document, source) {
            switch (source) {
              case ('ssr'):
                var jsonObject = xml.xmlToJSON(document);
                _getPlacenameHits(jsonObject);
                return jsonObject.sokRes.stedsnavn;
              case ('adresse'):
                return document.adresser;
              default:
                try {
                  return JSON.parse(document);
                } catch (e) {
                  return;
                }
            }
          };

          var _readResults = function () {
            var jsonObject;
            for (var service in _searchResults) {
              var searchResult = _searchResults[service];
              jsonObject = _convertSearchResult2Json(searchResult.document, searchResult.source);
              _iterateJsonObject(jsonObject, searchResult);
            }
          };

          var _successFullSearch = function (_serviceDict, document) {
            _searchResults[_serviceDict.source] = {
              document: document,
              format: _serviceDict.format,
              source: _serviceDict.source,
              epsg: _serviceDict.epsg
            };
            _readResults();
            if (_notSingleAddressHit()) {
              scope.addResultsToMap();
            }
          };

          var _downloadSearchBarFromUrl = function (_serviceDict, timestamp) {
            _queryDict[_serviceDict.source] = $.ajax({
              type: "GET",
              url: _serviceDict.url,
              async: true,
              success: function (document) {
                if (((document.length && document.length > 0) || (document.childNodes && document.childNodes[0].childNodes.length)) && scope.searchTimestamp == timestamp) {
                  _successFullSearch(_serviceDict, document);
                }
              }
              /*,
              error: function (searchError) {
                console.error("Error downloading from " + _serviceDict.url, searchError);
              }*/
            });
          };

          scope.getResults = function (searchServices) {
            _cancelOldRequests();
            scope.searchTimestamp = parseInt((new Date()).getTime(), 10);
            for (var serviceIndex = 0; serviceIndex < searchServices.length; serviceIndex++) {
              _downloadSearchBarFromUrl(_serviceDict[searchServices[serviceIndex]], scope.searchTimestamp);
            }
          };

          var _cancelOldRequests = function () {
            for (var service in _queryDict) {
              _queryDict[service].abort();
            }
          };

          scope.cleanResults = function () {
            _init();
            scope.removeInfomarkers();
            scope.searchBarModel = "";
            // scope.showSearchResultPanel();
            scope.deactivatePrintBoxSelect();
          };

          scope.searchBarValueChanged = function () {
            if (scope.searchBarModel === '') {
              scope.cleanResults();
              return;
            }
            var query = _getQuery();
            _setSearchInUrl(query);

            if (_checkQueryForCoordinates(query)) {
              scope.initSearchOptions();
              return;
            }
            _init(query);
            scope.showSearchResultPanel();
            scope.getResults(searchPanelFactory.getInitialSearchServices());
          };

          if (typeof $location.search().sok !== 'undefined') {
            scope.searchBarModel = $location.search().sok;
            scope.searchBarValueChanged();
          }

          var _w3wSearch = function (query) {
            $.ajax({
              url: mainAppService.generateWhat3WordsServiceUrl(),
              data: query,
              dataType: 'JSON',
              success: function (r) {
                if (!r.position) {
                  return;
                }
                scope.showQueryPoint(scope.contructQueryPoint(parseFloat(r.position[0]), parseFloat(r.position[1]), 'EPSG:4326', 'coordGeo', ''));
              }
            });
          };

          var _generateArrayWithValues = function (values) {
            return new Array(values);
          };

          scope.getNextPlacenamePage = function () {
            scope.placenamePage = searchPanelFactory.increasePlacenamePage() + 1;
            scope.resetResultsService('ssr');
            map.RemoveInfoMarker();
            scope.populateServiceDict(scope.searchBarModel);
            scope.getResults(['ssr']);
          };

          scope.getPreviousPlacenamePage = function () {
            scope.placenamePage = searchPanelFactory.decreasePlacenamePage() + 1;
            scope.resetResultsService('ssr');
            map.RemoveInfoMarker();
            scope.populateServiceDict(scope.searchBarModel);
            scope.getResults(['ssr']);
          };

          scope.pageChanged = function (newPage) {
            scope.placenamePage = newPage;
            searchPanelFactory.setPlacenamePage(newPage);
            scope.resetResultsService('ssr');
            map.RemoveInfoMarker();
            scope.populateServiceDict(scope.searchBarModel);
            scope.getResults(['ssr']);
          };

          var _iterateJsonObject = function (jsonObject, searchResult) {
            if (jsonObject) {
              if (!jsonObject.length) {
                jsonObject = [jsonObject];
              }
              for (var i = 0; i < jsonObject.length; i++) {
                if (jsonObject[i][_serviceDict[searchResult.source].latID]) {
                  _pushToUnifiedResults(_getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]));
                } else if (searchResult.source === 'matrikkelnummer') {
                  var extra = {
                    kommunenr: jsonObject[i].KOMMUNENR,
                    gardsnr: jsonObject[i].GARDSNR,
                    bruksnr: jsonObject[i].BRUKSNR,
                    festenr: jsonObject[i].FESTENR,
                    seksjonsnr: jsonObject[i].SEKSJONSNR
                  };
                  jsonObject[i].url = mainAppService
                    .generateSeEiendomUrl(extra.kommunenr, extra.gardsnr, extra.bruksnr, extra.festenr, extra.seksjonsnr);
                  _pushToUnifiedResults(_getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]));
                }
              }
            }
          };

          var _getValuesFromJson = function (identifiersDict, jsonObject) {
            var lat = jsonObject[identifiersDict.latID] + '';
            var lon = jsonObject[identifiersDict.lonID] + '';
            var point = searchPanelFactory.constructPoint(lat, lon, identifiersDict.epsg, scope.mapEpsg);
            var husnummer = identifiersDict.husnummerID !== false ? jsonObject[identifiersDict.husnummerID] : '';
            if (identifiersDict.husnummerBokstav && typeof jsonObject[identifiersDict.husnummerBokstav] === 'string') {
              husnummer += jsonObject[identifiersDict.husnummerBokstav];
            }
            var result = {
              name: jsonObject[identifiersDict.nameID],
              kommune: jsonObject[identifiersDict.kommuneID],
              point: point,
              format: identifiersDict.format,
              source: identifiersDict.source,
              husnummer: husnummer,
              navnetype: jsonObject[identifiersDict.navnetypeID],
              url: jsonObject.url
            };
            return result;
          };

          var _removeNumberFromName = function (name) {
            var nameArray = name.split(' ');
            var matches = nameArray[nameArray.length - 1].match(/\d+/g);
            if (matches != null) {
              return name.replace(nameArray[nameArray.length - 1], '').trim();
            } else {
              return name.trim();
            }
          };

          scope.fixNames = function (name) {
            return _removeNumberFromName(scope.capitalizeName(name.toLowerCase()));
          };

          var _pushToUnifiedResults = function (result) {
            if (result.kommune && result.name) {
              result.name = result.source != 'matrikkelnummer' ? scope.fixNames(result.name) : result.name;
              result.kommune = scope.capitalizeName(result.kommune.toLowerCase());
              var resultID = _createID(result);
              if (!_unifiedResults[result.source]) {
                _unifiedResults[result.source] = {};
              }
              _unifiedResults[result.source][resultID] = {
                name: result.name,
                point: result.point,
                format: result.format,
                source: result.source,
                kommune: result.kommune,
                id: resultID,
                url: result.url
              };
              if (result.husnummer) {
                _unifiedResults[result.source][resultID]['husnummer'] = result.husnummer;
              } else if (result.navnetype) {
                _unifiedResults[result.source][resultID]['navnetype'] = result.navnetype;
                switch (result.navnetype) {
                  case 'Nasjon':
                    _unifiedResults[result.source][resultID]['kommune'] = '';
                    break;
                  case 'Fylke':
                    _unifiedResults[result.source][resultID]['kommune'] = '';
                    break;
                  case 'Kommune':
                    _unifiedResults[result.source][resultID]['kommune'] = '';
                    break;
                  case 'By':
                  case 'Adm. bydel':
                  case 'Bydel':
                  case 'Tettsted':
                  case 'Tettbebyggelse':
                  case 'Grend':
                  case 'Fjellområde':
                  case 'Bygdelag (bygd)':
                  case 'Tettsteddel':
                    break;
                  case 'Adressenavn (veg/gate)':
                    break;
                  case 'Flyplass':
                  case 'Fengsel':
                  case 'Annen kulturdetalj':
                  case 'Stasjon':
                  case 'Kirke':
                  case 'Bru':
                  case 'Skole':
                  case 'Bruk (gardsbruk)':
                    break;
                  default:
                } // switch
              }
            }
          };

          var _createID = function (result) {
            return result.name + (result.point[0] + '').split('.')[0] + (result.point[1] + '').split('.')[0];
          };

          scope.capitalizeName = function (name) {
            name = name.trim();
            //name = _capitalizeNamePart(name, ' ');
            name = _capitalizeNamePart(name, '-');
            return name;
          };

          var _capitalizeNamePart = function (name, separator) {
            var nameArray = name.split(separator);
            var newName = '';
            for (var i = 0; i < nameArray.length; i++) {
              newName += _capitalizeFirstLetter(nameArray[i]) + separator;
            }
            newName = _rtrim(newName, 1);
            return newName;
          };

          var _capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          };

          var _rtrim = function (str, length) {
            return str.substr(0, str.length - length);
          };

          scope.mouseOver = function (searchResult) {
            scope.mouseHoverSearchResult = searchResult;
            map.RemoveInfoMarker();
            map.ShowInfoMarker(searchResult.point);
          };

          scope.openShowEiendom = function (searchResult) {
            $window.open(searchResult.url, '_blank');
          };

          scope.resetSearchPanel = function () {
            scope.showSearchOptionsPanel();
            scope.searchPanelLayout = '';
            searchPanelFactory.setShowEiendomMarkering(false);
          };

          var showQueryPointFromMouseClick = function (coordinates) {
            scope.coordinate = true;
            // scope.showSearchResultPanel();

            scope.cleanResults();
            scope.showQueryPoint(scope.contructQueryPoint(coordinates[1], coordinates[0], scope.mapEpsg, 'mouseClick', ''));
            scope.initLastSearchPanel();
          };

          eventHandler.RegisterEvent(ISY.Events.EventTypes.MapClickCoordinate, showQueryPointFromMouseClick);

          // Start searchOptions

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

          scope.showSelection = function () {
            var addLayerUrlTool = toolsFactory.getToolById("AddLayerUrl");
            if (!searchPanelFactory.getShowEiendomMarkering()) {
              addLayerUrlTool.additionalOptions.show = false;
            } else {
              addLayerUrlTool.additionalOptions.show = true;
              addLayerUrlTool.additionalOptions.url = mainAppService.generateMatrikkelWfsFilterUrl(scope.searchOptionsDict['seEiendom']);
              addLayerUrlTool.additionalOptions.geometryName = 'FLATE';
              addLayerUrlTool.additionalOptions.style = new ol.style.Style({
                fill: new ol.style.Fill({
                  color: 'rgba(255,255,102,0.6)'
                }),
                stroke: new ol.style.Stroke({
                  color: 'rgba(255,255,102,1)',
                  width: 1
                })
              });
            }
            if (addLayerUrlTool.additionalOptions.show === true) {
              scope.showSelectedPolygon = true;
            }

            toolsFactory.activateTool(addLayerUrlTool);
            toolsFactory.deactivateTool(addLayerUrlTool);
          };

          function showSelectedPolygonEnd() {
            scope.$apply(function () {
              scope.showSelectedPolygon = false;
            }, 0);
          }

          eventHandler.RegisterEvent(ISY.Events.EventTypes.AddLayerUrlEnd, showSelectedPolygonEnd);

          /*Map get feature info start*/

          scope.layers = [];
          scope.currentPage = 1;

          function _handleLoadingLayers(loadingLayers) {
            scope.layers = [];
            for (var i = 0; i < loadingLayers.length; i++) {
              loadingLayers[i].show = false;
              _addLoadingLayer(loadingLayers[i]);
            }
          }

          function _getLoadingLayer(id) {
            for (var i = 0; i < scope.layers.length; i++) {
              var loadingLayer = scope.layers[i];
              if (loadingLayer.id === id) {
                return loadingLayer;
              }
            }
            return null;
          }

          function _addLoadingLayer(loadingLayer) {
            scope.layers.push(loadingLayer);
          }

          function _loadResult(resultSet) {
            var loadingLayer = _getLoadingLayer(resultSet.id);
            if (loadingLayer !== null) {
              if (resultSet.exception) {
                loadingLayer.exception = resultSet.exception;
                loadingLayer.hasException = true;
              } else {
                if (resultSet.features !== undefined) {
                  if (resultSet.features.length > 0) {
                    loadingLayer.features = resultSet.features;
                    loadingLayer.hasFeatures = resultSet.showDialog;
                  }
                }
              }

              if (loadingLayer.hasFeatures) {
                loadingLayer.show = true;
              }
              var isFirstVisibleLayerOpen = false;
              for (var j = 0; j < scope.layers.length; j++) {
                if (scope.layers[j].show) {
                  if (!isFirstVisibleLayerOpen) {
                    scope.layers[j].open = true;
                    isFirstVisibleLayerOpen = true;
                  } else {
                    scope.layers[j].open = false;
                  }
                } else {
                  scope.layers[j].open = false;
                }
              }
              loadingLayer.isLoading = false;
            }
          }

          eventHandler.RegisterEvent(ISY.Events.EventTypes.FeatureInfoStart, _handleLoadingLayers);
          eventHandler.RegisterEvent(ISY.Events.EventTypes.FeatureInfoEnd, _loadResult);

          scope.toggleLayer = function (layer) {
            if (layer.open) {
              layer.open = false;
            } else {
              for (var i = 0; i < scope.layers.length; i++) {
                scope.layers[i].open = false;
              }
              layer.open = true;
            }
            scope.currentPage = 1;
          };

          scope.getFeatureName = function (index) {
            var val = index + 1;
            return "# " + val;
          };

          scope.toggleFeature = function (layer, feature) {
            if (feature.open) {
              feature.open = false;
            } else {
              for (var i = 0; i < layer.features.length; i++) {
                layer.features[i].open = false;
              }
              feature.open = true;
            }
          };

          scope.isAnyLayerToShow = function () {
            for (var i = 0; i < scope.layers.length; i++) {
              if (scope.layers[i].show) {
                return true;
              }
            }
            return false;
          };

          scope.getVisibleFeatures = function (layer) {
            if (layer !== undefined) {
              return layer.features.length;
            } else {
              return 0;
            }
          };

          scope.getIdByLayer = function (layer) {
            // console.log(layer);
            return layer.id;
          };

          scope.pageChangeHandler = function (value) {
            scope.currentPage = value;
          };

          /*Map get feature info end*/
        }
      };
    }
  ])

  .directive('caret', [
    function () {
      return {
        scope: {
          value: '=ngModel'
        },
        link: function (scope, element) {
          function setCaretPosition(elem, caretPos) {
            if (elem !== null) {
              if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
              } else {
                if (elem.setSelectionRange) {
                  elem.focus();
                  elem.setSelectionRange(caretPos, caretPos);
                } else {
                  elem.focus();
                }
              }
            }
          }
          scope.$watch('value', function (newValue) {
            if (newValue && newValue.indexOf('@') > -1 && !scope.searchBarCoordinateSystemIndicator) {
              scope.searchBarCoordinateSystemIndicator = true;
              setCaretPosition(element[0], newValue.indexOf('@'));
            } else if (newValue && newValue.indexOf('@') < 0) {
              scope.searchBarCoordinateSystemIndicator = false;
            }

          });
        }
      };
    }
  ]);

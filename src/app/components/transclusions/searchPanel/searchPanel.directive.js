angular.module('searchPanel')
    .directive('searchPanel', ['$timeout','mainAppService', 'ISY.MapAPI.Map','ISY.EventHandler','$http','searchPanelFactory',
        function($timeout, mainAppService, map, eventHandler, $http, searchPanelFactory) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchPanel.html',
                restrict: 'A',
                controller: 'searchPanelController',
                link: function(scope){
                    scope.searchBarValueChanged = function () {
                        if (scope.searchBarModel === '') {
                            scope.cleanResults();
                            return;
                        }
                        var query = _getQuery();
                        if (_checkQueryForCoordinates(query)){
                            scope.initSearchOptions();
                            return;
                        }
                        _init(query);
                        scope.showSearchResultPanel();
                        scope.getResults(searchPanelFactory.getInitialSearchServices());
                    };

                    scope.sourceDict = searchPanelFactory.getSourceDict();

                    _mapEpsg=searchPanelFactory.getMapEpsg();

                    _searchResults = {};

                    _unifiedResults = {};

                    _serviceDict = {};

                    _queryDict = {};

                    String.prototype.replaceAll = function(search, replacement) {
                        var target = this;
                        return target.replace(new RegExp(search, 'g'), replacement);
                    };

                    var _splitQuery = function (query) {
                        query=query.replaceAll(',','.');
                        return query.split(' ');
                    };

                    var _checkQueryForCoordinates = function(query){
                        scope.coordinate=true;
                        var epsg=query.split('@')[1];
                        var queryParts = _splitQuery(query);
                        if (queryParts.length !=2){
                            return false;
                        }
                        var availableUTMZones=searchPanelFactory.getAvailableUTMZones();
                        if (availableUTMZones.indexOf(epsg) > -1){
                            scope.showQueryPoint(scope.contructQueryPoint(queryParts[1].split('@')[0], queryParts[0], 'EPSG:' + epsg, 'coordUtm',''));
                            return true;
                        }
                        if(((queryParts[0] > 32.88) && (queryParts[1] > -16.1)) && ((queryParts[0] < 84.17) && (queryParts[1] < 39.65))){
                            epsg='EPSG:4258';
                            scope.showQueryPoint(scope.contructQueryPoint(queryParts[0], queryParts[1], epsg, 'coordGeo',''));
                            return true;
                        }
                        if(((queryParts[0] > -2465220.60) && (queryParts[1] > 4102904.86)) && ((queryParts[0] < 771164.64) && (queryParts[1] < 9406031.63))){
                            epsg='EPSG:25833';
                            scope.showQueryPoint(scope.contructQueryPoint(queryParts[1], queryParts[0], epsg, 'coordUtm',''));
                            scope.searchBarModel+='@' + _mapEpsg.split(':')[1];
                            return true;
                        }
                        return false;
                    };

                    scope.contructQueryPoint = function (lat, lon, epsg, source, kommune) {
                        return {
                            name: '',
                            point: searchPanelFactory.constructPoint(lat, lon, epsg, _mapEpsg),
                            //format: _serviceDict[source].format,
                            source: source,
                            kommune: kommune
                        };
                    };

                    scope.showQueryPoint = function(queryPoint){
                        if(!scope.searchResults) {
                            scope.searchResults= {};
                        }
                        scope.searchResults['searchBar'] = queryPoint;
                        scope.removeInfomarkers();
                        map.ShowInfoMarker(queryPoint.point);
                        scope.activatePosition(queryPoint);
                        scope.showSearchOptionsPanel();
                    };

                    scope.removeInfomarkers = function () {
                        map.RemoveInfoMarkers();
                        map.RemoveInfoMarker();
                    };

                    var _init = function (query) {
                        _resetResults();
                        scope.searchResults = undefined;
                        scope.activeSearchResult=undefined;
                        scope.populateServiceDict(query);
                        scope.coordinate=false;
                        map.RemoveInfoMarker();
                        scope.placenamePage=searchPanelFactory.resetPlacenamePage()+1;
                    };

                    var _getQuery = function () {
                        return scope.searchBarModel + '';
                    };

                    scope.populateServiceDict = function (query) {
                        _serviceDict = searchPanelFactory.getServiceDict(query);
                    };

                    scope.getResults = function (searchServices) {
                        _cancelOldRequests();
                        scope.searchTimestamp = parseInt((new Date()).getTime(), 10);
                        for (var serviceIndex =0; serviceIndex < searchServices.length; serviceIndex++) {
                            _downloadSearchBarFromUrl(_serviceDict[searchServices[serviceIndex]], scope.searchTimestamp);
                        }
                    };

                    var _cancelOldRequests = function () {
                        for (var service in _queryDict){
                            _queryDict[service].abort();
                        }
                    };

                    var _resetResults = function () {
                        _unifiedResults = {};
                        _searchResults = {};
                    };

                    scope.resetResultsService = function (service) {
                        _unifiedResults[service] = {};
                        _searchResults[service] = {};
                        scope.searchResults[service] = {};
                    };

                    var _readResults = function () {
                        var jsonObject;
                        for (var service in _searchResults) {
                            var searchResult = _searchResults[service];
                            jsonObject = _convertSearchResult2Json(searchResult.document, searchResult.source);
                            _iterateJsonObject(jsonObject, searchResult);
                        }
                    };

                    var _convertSearchResult2Json = function (document, source) {
                        switch (source) {
                            case('ssr'):
                                var jsonObject=xml.xmlToJSON(document);
                                _getPlacenameHits(jsonObject);
                                return jsonObject.sokRes.stedsnavn;
                            case('adresse'):
                                return document.adresser;
                            default:
                                return JSON.parse(document);
                        }
                    };

                    var _generateArrayWithValues = function (values) {
                        return new Array(values);
                    };

                    var _getPlacenameHits = function (jsonObject) {
                        scope.placenameHits = jsonObject.sokRes.totaltAntallTreff;
                        scope.placenameItems = _generateArrayWithValues(parseInt(scope.placenameHits, 10));
                        scope.placenamePageTotal = Math.ceil(scope.placenameHits / searchPanelFactory.getPlacenameHitsPerPage());
                    };

                    scope.getNextPlacenamePage = function () {
                        scope.placenamePage=searchPanelFactory.increasePlacenamePage() + 1;
                        scope.resetResultsService('ssr');
                        map.RemoveInfoMarker();
                        scope.populateServiceDict(scope.searchBarModel);
                        scope.getResults(['ssr']);
                    };

                    scope.getPreviousPlacenamePage = function () {
                        scope.placenamePage=searchPanelFactory.decreasePlacenamePage() + 1;
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
                                    _getValuesFromJson(_serviceDict[searchResult.source], jsonObject[i]);
                                }
                            }
                        }
                    };

                    var _getValuesFromJson = function (identifiersDict, jsonObject) {
                        var name = jsonObject[identifiersDict.nameID];
                        var lat = jsonObject[identifiersDict.latID] + '';
                        var lon = jsonObject[identifiersDict.lonID] + '';
                        var kommune = jsonObject[identifiersDict.kommuneID];
                        var point = searchPanelFactory.constructPoint(lat, lon, identifiersDict.epsg, _mapEpsg);
                        var husnummer = jsonObject[identifiersDict.husnummerID];
                        var navnetype = jsonObject[identifiersDict.navnetypeID];
                        var result={
                            name: name,
                            kommune: kommune,
                            point: point,
                            format: identifiersDict.format,
                            source: identifiersDict.source,
                            husnummer: husnummer,
                            navnetype: navnetype
                        };
                        _pushToUnifiedResults(result);
                    };

                    var _removeNumberFromName = function (name) {
                        var nameArray = name.split(' ');
                        var matches = nameArray[nameArray.length - 1].match(/\d+/g);
                        if (matches != null) {
                            return name.replace(nameArray[nameArray.length - 1], '').trim();
                        }
                        else {
                            return name.trim();
                        }
                    };

                    scope.fixNames = function (name) {
                        return _removeNumberFromName(scope.capitalizeName(name.toLowerCase()));
                    };

                    var _pushToUnifiedResults = function (result) {
                        result.name = scope.fixNames(result.name);
                        result.kommune = scope.capitalizeName(result.kommune.toLowerCase());
                        // var resultID = result.name + result.kommune;
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
                            id: resultID
                        };
                        if (result.husnummer) {
                            _unifiedResults[result.source][resultID]['husnummer']=result.husnummer;
                        }
                        else if (result.navnetype){
                            _unifiedResults[result.source][resultID]['navnetype']=result.navnetype;
                        }


                    };

                    var _createID= function (result) {
                        return result.name + (result.point[0] + '').split('.')[0]+ (result.point[1] + '').split('.')[0];
                    };

                    scope.capitalizeName= function (name) {
                        name = name.trim();
                        name = _capitalizeNamePart(name, ' ');
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

                    var _downloadSearchBarFromUrl = function (_serviceDict, timestamp) {
                        _queryDict[_serviceDict.source] = $.ajax({
                            type: "GET",
                            url: _serviceDict.url,
                            async: true,
                            success: function (document) {
                                if ((( document.length && document.length > 3) || (document.childNodes && document.childNodes[0].childNodes.length)) && scope.searchTimestamp == timestamp) {
                                    _successFullSearch(_serviceDict, document);
                                }
                            }/*,
                             error: function (searchError) {
                             console.log("Error downloading from " + _serviceDict.url, searchError);
                             }*/
                        });
                    };

                    var _successFullSearch = function (_serviceDict, document) {
                        _searchResults[_serviceDict.source] = {
                            document: document,
                            format: _serviceDict.format,
                            source:_serviceDict.source,
                            epsg: _serviceDict.epsg
                        };
                        _readResults();
                        if(_notSingleAddressHit()) {
                            scope.addResultsToMap();
                        }
                    };

                    var _notSingleAddressHit = function () {
                        var matrikkelKey='matrikkeladresse';
                        if(_unifiedResults[matrikkelKey] && Object.keys(_unifiedResults[matrikkelKey]).length==1 && !_unifiedResults['matrikkelveg'] && !_unifiedResults['ssr']){
                            var key=Object.keys(_unifiedResults[matrikkelKey])[0];
                            var result=_unifiedResults[matrikkelKey][key];
                            scope.showQueryPoint(scope.contructQueryPoint(result.point[1], result.point[0], _mapEpsg, result.source, result.kommune));
                            return false;
                        }
                        return true;
                    };

                    scope.addResultsToMap = function () {
                        var coordinates = [];
                        for (var source in _unifiedResults) {
                            if (source == 'matrikkeladresse' && _unifiedResults['matrikkelveg'] && Object.keys(_unifiedResults['matrikkelveg']).length>1){
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

                    scope.mouseOver = function (searchResult){
                        scope.mouseHoverSearchResult=searchResult;
                        map.RemoveInfoMarker();
                        map.ShowInfoMarker(searchResult.point);
                    };

                    scope.activatePosition = function (searchResult){
                        var activePosition = {
                            lon: parseFloat(searchResult.point[0]),
                            lat: parseFloat(searchResult.point[1]),
                            epsg: _mapEpsg
                        };
                        if (searchResult.source=='matrikkeladresse'){
                            activePosition.zoom=parseFloat(16);
                        }
                        activePosition.geographicPoint=searchPanelFactory.constructPoint(activePosition.lat, activePosition.lon, _mapEpsg, 'EPSG:4326');
                        map.SetCenter(activePosition);
                        map.RemoveInfoMarkers();
                        scope.activePosition=activePosition;
                        scope.activeSearchResult=searchResult;
                        if(scope.searchOptionsDict['elevationPoint'] ) {
                            scope.searchOptionsDict['elevationPoint'].text.value = undefined;
                        }
                        if (scope.searchBarModel.length < searchResult.name.length && !scope.coordinate && scope.activeSearchResult.source != 'mouseClick'){
                            scope.searchBarModel=searchResult.name;
                        }
                        scope.initSearchOptions();
                    };

                    scope.cleanResults = function (){
                        _init();
                        scope.removeInfomarkers();
                        scope.searchBarModel = "";
                        scope.showSearchResultPanel();
                        scope.deactivatePrintBoxSelect();
                    };

                    var showQueryPointFromMouseClick = function (coordinates) {
                        scope.coordinate=true;
                        scope.showSearchResultPanel();
                        scope.cleanResults();
                        scope.showQueryPoint(scope.contructQueryPoint(coordinates[1], coordinates[0], _mapEpsg, 'mouseClick',''));
                    };

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.MapClickCoordinate, showQueryPointFromMouseClick);

                    // Start searchOptions

                    var _clickableLinkClass = {
                        icon: 'search-options pointer-cursor',
                        text: 'pointer-cursor'
                    };

                    var _defaultClass = {
                        icon: 'search-options',
                        text: ''
                    };

                    var _downloadSearchOptionFromUrl = function (url, name) {
                        $http.get(url).then(function (response) {
                            _addSearchOptionToPanel(name, response.data);
                        });
                    };

                    var _fetchElevationPoint = function () {
                        var lat = scope.activePosition.lat;
                        var lon = scope.activePosition.lon;
                        var epsgNumber = scope.activePosition.epsg.split(':')[1];
                        var elevationPointUrl = mainAppService.generateElevationPointUrl(lat, lon, epsgNumber);
                        _downloadSearchOptionFromUrl(elevationPointUrl, 'elevationPoint');
                    };

                    var _fetchMatrikkelInfo = function () {
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
                        var name= 'lagTurkart';
                        scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-blind', true, 'Lage turkart', {});
                    };

                    var _addEmergencyPosterToSearchOptions = function () {
                        var name='lagNodplakat';
                        scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-ambulance', true, 'Lage nødplakat', {});
                    };

                    var _addElevationPointToSearchOptions = function (jsonRoot, name) {
                        var stedsnavn=jsonRoot.Output[0].Data.LiteralData.Text;
                        var text = '"' + stedsnavn + '"';
                        var extra = {
                            url: mainAppService.generateFaktaarkUrl(jsonRoot.Output[3].Data.LiteralData.Text)
                        };
                        scope.searchOptionsDict['ssrFakta'] = _constructSearchOption('ssrFakta', 'fa fa-flag', true, text, extra);
                        if(scope.activeSearchResult && scope.activeSearchResult.source=='mouseClick'){
                            scope.searchBarModel=stedsnavn;
                        }

                        text = jsonRoot.Output[2].Data.LiteralData.Text.split('.')[0] + ' ';
                        extra = {};
                        scope.searchOptionsDict[name] = _constructSearchOption(name, '↑', false, text, extra);
                    };

                    var _addMatrikkelInfoToSearchOptions = function (jsonRoot, name) {
                        if (jsonRoot[0]){
                            jsonRoot = jsonRoot[0];
                        }

                        if ((jsonRoot.MATRIKKELNR == 'Mnr mangler') ||( jsonRoot.MATRIKKELNR == 'Mnr vann mangler')) {
                            return;
                        }

                        var extra = {
                            kommunenr: jsonRoot.KOMMUNENR,
                            gardsnr: jsonRoot.GARDSNR,
                            bruksnr: jsonRoot.BRUKSNR,
                            festenr: jsonRoot.FESTENR,
                            seksjonsnr: jsonRoot.SEKSJONSNR,
                            eiendomstype: jsonRoot.EIENDOMSTYPE,
                            matrikkelnr: jsonRoot.MATRIKKELNR
                        };


                        extra.url = mainAppService.generateSeEiendomUrl(extra.kommunenr, extra.gardsnr, extra.bruksnr, extra.festenr, extra.seksjonsnr);
                        var text = '' + extra.kommunenr + '-' + extra.matrikkelnr.replace(new RegExp(' ', 'g'), '');
                        scope.searchOptionsDict[name] = _constructSearchOption(name, 'fa fa-home', true, text, extra);

                    };


                    var _addSearchOptionToPanel = function (name, data) {
                        var jsonObject;
                        var jsonRoot;
                        switch (name) {
                            case('elevationPoint'):
                                jsonObject = xml.xmlToJSON(data);
                                jsonRoot = jsonObject.ExecuteResponse.ProcessOutputs;
                                if (!jsonRoot.Output[0].Data.LiteralData) {
                                    return;
                                }
                                _addElevationPointToSearchOptions(jsonRoot, name);
                                break;

                            case('seEiendom'):
                                jsonObject = xml.xmlToJSON(data);
                                if (!jsonObject.FeatureCollection) {
                                    return;
                                }
                                if (!jsonObject.FeatureCollection.featureMembers) {
                                    return;
                                }
                                jsonRoot = jsonObject.FeatureCollection.featureMembers.TEIGWFS;
                                _addMatrikkelInfoToSearchOptions(jsonRoot, name);
                                break;
                        }
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

                    var _emptySearchOption = function () {
                        var searchOption = {
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

                        return searchOption;
                    };

                    scope.initSearchOptions = function () {

                        scope.searchOptionsOrder = searchPanelFactory.getSearchOptionsOrder();
                        for (var searchOption in scope.searchOptionsOrder){
                            scope.searchOptionsDict[scope.searchOptionsOrder[searchOption]] = _emptySearchOption();
                        }
                        _fetchElevationPoint();
                        _fetchMatrikkelInfo();
                        _addKoordTransToSearchOptions();
                        _addLagTurkartToSearchOptions();
                        _addEmergencyPosterToSearchOptions();
                    };

                }
            };
        }])

    .directive('caret', function() {
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

        return {
            scope: {value: '=ngModel'},
            link: function (scope, element) {
                scope.$watch('value', function (newValue) {
                    if (newValue && newValue.indexOf('@') > -1 && !scope.searchBarCoordinateSystemIndicator) {
                        scope.searchBarCoordinateSystemIndicator = true;
                        setCaretPosition(element[0], newValue.indexOf('@'));
                    }
                    else if (newValue && newValue.indexOf('@') < 0) {
                        scope.searchBarCoordinateSystemIndicator = false;
                    }
                });
            }
        };
    });
angular.module('mainMenuDraw')
    .directive('mainMenuDraw', [ 'toolsFactory', 'ISY.EventHandler', '$location','mainAppService', '$http','$filter',
        function(toolsFactory, eventHandler, $location,mainAppService,$http,$filter) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuDraw/mainMenuDraw.html',
                restrict: 'A',
                link: function(scope){

                    /*
                     Measure tools start
                     */
                    function _startMeasure (style) {
                        var featureTool;
                        switch (style){
                            case "Line":
                                featureTool = toolsFactory.getToolById("MeasureLine");
                                toolsFactory.activateTool(featureTool);
                                break;
                            case "Polygon":
                                featureTool = toolsFactory.getToolById("Measure");
                                toolsFactory.activateTool(featureTool);
                                break;
                        }
                    }

                    scope.measureLine = function () {
                        _startMeasure("Line");
                    };

                    scope.measurePolygon = function () {
                        _startMeasure("Polygon");
                    };
                    /*
                     Measure tools end
                     */

                    /*
                     Draw start
                     */
                    scope.geometryTypes=['Point', 'LineString', 'Polygon'];
                    scope.modeTypes=['draw', 'modify'];
                    scope.mode="draw";
                    scope.type='Point';
                    scope.color='#ffcc33';
                    scope.fillAlpha=50;
                    scope.pointNumber=64;
                    scope.pointRadius=7;
                    scope.pointRadius2=7;
                    scope.lineWidth=2;
                    scope.lineLength=15;
                    scope.lineSpace=0;
                    _colorDict ={
                        Point: {
                            color: scope.color
                        },
                        LineString: {
                            color: scope.color
                        },
                        Polygon: {
                            color: scope.color
                        }
                    };
                    _firstLoad=true;
                    _operation="";

                    scope.refreshStyle=function () {
                        var style=new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: hex2rgba(_colorDict.Polygon.color, scope.fillAlpha/100)
                            }),
                            stroke: new ol.style.Stroke({
                                color: _colorDict.LineString.color,
                                width: scope.lineWidth,
                                lineDash: [scope.lineLength, scope.lineSpace]
                            }),
                            image: new ol.style.RegularShape({
                                fill: new ol.style.Fill({
                                    color: _colorDict.Point.color
                                }),
                                points: scope.pointNumber,
                                radius: scope.pointRadius
                                //radius2: scope.pointRadius2
                            })}
                        );
                        return style;
                    };

                    var getDrawing = function (geoJSON) {
                        scope.setGeoJSON(geoJSON);
                        console.log(geoJSON);
                    };

                    var _checkUrlForGeoJSON = function () {
                        var drawingHash=_getValueFromUrl('drawing');
                        if(drawingHash){
                            _getGeoJSON(drawingHash);
                                return;
                            }
                        scope.activateDrawFeatureTool();
                    };

                    var _getValueFromUrl = function (key) {
                        var url=$location.url();
                        var params=url.split('?')[1].split('&');
                        for(var i =0; i<params.length; i++){
                            var param=params[i].split('=');
                            if(param[0]==key) {
                                return param[1];
                            }
                        }
                    };

                    var _getGeoJSON = function (hash) {
                        var drawingUrl=mainAppService.generateGeoJSONUrl(hash);
                        $http.get(drawingUrl).then(function(result){_setGeoJSONOnScope(result);});
                    };

                    var _setGeoJSONOnScope = function(result){
                        scope.setGeoJSON(result.data);
                        scope.activateDrawFeatureTool();
                    };

                    scope.activateDrawFeatureTool = function (overrideMode) {
                        if(overrideMode){
                            scope.mode=overrideMode;
                        }
                        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                        drawFeatureTool.additionalOptions = {
                            operation: _operation,
                            type: scope.type,
                            style: scope.refreshStyle(),
                            snap: scope.snap,
                            mode: scope.mode
                        };
                        if(scope.GeoJSON){
                            drawFeatureTool.additionalOptions.GeoJSON=scope.GeoJSON;
                        }
                        toolsFactory.deactivateTool(drawFeatureTool);
                        toolsFactory.activateTool(drawFeatureTool);
                    };

                    scope.drawFeature = function () {
                        scope.setColor();
                    };

                    scope.setColor = function (overrideMode) {
                       _colorDict[scope.type].color=scope.color;
                        scope.activateDrawFeatureTool(overrideMode);
                    };

                    scope.newButtonClick = function(){
                        scope.setGeoJSON('remove');
                        _removeDrawingFromUrl();
                        scope.activateDrawFeatureTool();
                    };

                    var _removeDrawingFromUrl = function () {
                        var hash=_getValueFromUrl('drawing');
                        var oldUrl=$location.url();
                        $location.url(oldUrl.replace('drawing=' + hash, ''));
                    };

                    scope.undoButtonClick = function(){
                        _operation='undo';
                        scope.activateDrawFeatureTool();
                        _operation="";
                    };

                    scope.downloadButtonClick=function () {
                        if(scope.GeoJSON=='remove'){
                            alert('Empty drawing');
                        }
                        else {
                            scope.saveToPc(scope.GeoJSON);
                        }
                    };

                    scope.saveButtonClick = function () {
                        var saveUrl=mainAppService.generateGeoJSONSaveUrl();
                        $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
                        $http.post(saveUrl,scope.GeoJSON).then(function(result){_setDrawingInUrl(result);});
                    };


                    var _setDrawingInUrl = function (result) {
                        var drawingUrl=result.data;
                        alert(drawingUrl);
                        var hashIndex=drawingUrl.split('/').length-1;
                        var hash = drawingUrl.split('/')[hashIndex].split('.')[0];
                        _removeDrawingFromUrl();
                        var oldUrl=$location.url();
                        $location.url(oldUrl + '&drawing=' + hash);
                        _checkUrlForGeoJSON();
                    };

                    scope.removeInfomarkers();
                    if(!scope.isDrawActivated()) {
                        eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
                    }
                    _checkUrlForGeoJSON();

                    function hex2rgba(hexRGB, alpha){
                        var r = parseInt(hexRGB.slice(1,3), 16);
                        g = parseInt(hexRGB.slice(3,5), 16);
                        b = parseInt(hexRGB.slice(5,7), 16);
                        //a = parseInt(hexRGB.slice(7,9), 16)/255;
                        return 'rgba('+r+', '+g+', '+b+', '+alpha+')';
                    }

                    /*
                     Draw end
                     */

                    scope.saveToPc = function (data, filename) {

                        if (!data) {
                            console.error('No data');
                            return;
                        }

                        if (!filename) {
                            var today = $filter('date')(new Date(),'yyyyMMddHHmmss');
                            filename = 'Norgeskart3.tegning.' + today + '.json';
                        }

                        if (typeof data === 'object') {
                            data = JSON.stringify(data, undefined, 2);
                        }

                        var blob = new Blob([data], {type: 'text/json'});

                        // FOR IE:

                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        }
                        else{
                            var e = document.createEvent('MouseEvents'),
                                a = document.createElement('a');

                            a.download = filename;
                            a.href = window.URL.createObjectURL(blob);
                            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                            e.initEvent('click', true, false, window,
                                0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            a.dispatchEvent(e);
                        }
                    };
                }
            };
        }]);
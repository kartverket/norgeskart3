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
                    scope.snap=true;
                    scope.selectionActive=false;
                    scope.pointTypes={ '●': 64,'▲': 3,'♦': 4};
                    scope.geometryTypes={
                        Point:'Point',
                        LineString: 'LineString',
                        Polygon: 'Polygon',
                        Text: 'Text'
                    };
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
                    scope.text="";
                    scope.fontSize=15;
                    scope.colorTextStrokeWidth=0;
                    scope.colorTextStroke='#000000';
                    scope.colorText='#000000';
                    _colorDict ={
                        Point: scope.color,
                        LineString:  scope.color,
                        Polygon: scope.color
                    };
                    _firstLoad=true;
                    _operation="";
                    _fontName='sans-serif,helvetica';
                    var drawFeatureTool = toolsFactory.getToolById("DrawFeature");

                    scope.refreshStyle=function () {
                        var style = new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: hex2rgba(_colorDict.Polygon, (100-scope.fillAlpha) / 100)
                                }),
                                stroke: new ol.style.Stroke({
                                    color: _colorDict.LineString,
                                    width: scope.lineWidth,
                                    lineDash: [scope.lineLength, scope.lineSpace]
                                }),
                                image: new ol.style.RegularShape({
                                    fill: new ol.style.Fill({
                                        color: _colorDict.Point
                                    }),
                                    points: scope.pointNumber,
                                    radius: scope.pointRadius
                                    //radius2: scope.pointRadius2
                                }),
                                text: new ol.style.Text({
                                        font: scope.fontSize + 'px ' + _fontName,
                                        text: scope.text,
                                        fill: new ol.style.Fill({
                                            color: scope.colorText
                                        })
                                    }
                                )
                            }
                        );
                        if(scope.colorTextStrokeWidth > 0){
                            style.getText().setStroke(new ol.style.Stroke({
                                color: scope.colorTextStroke,
                                width: scope.colorTextStrokeWidth
                            }));
                        }
                        return style;
                    };

                    var getDrawing = function (GeoJSON) {
                        scope.setGeoJSON(GeoJSON);
                        console.log(GeoJSON);
                    };

                    var getSelectedFeatureId = function (selectedFeatureId) {
                        var jsonObject = typeof scope.GeoJSON == 'object' ? scope.GeoJSON : JSON.parse(scope.GeoJSON);
                        for (var i = 0; i < jsonObject.features.length; i++) {
                            if (jsonObject.features[i].id == selectedFeatureId) {
                                scope.selectionActive=true;
                                scope.selectedFeatureId=selectedFeatureId;
                                _setDrawingPropertiesFromSelectedFeature(jsonObject.features[i]);
                                scope.$apply();
                                scope.activateDrawFeatureTool();
                                return;
                            }
                        }
                    };

                    var _setDrawingPropertiesFromSelectedFeature = function (feature) {
                        var featureStyle=feature.properties.style;
                        scope.type=feature.geometry.type;
                        switch(scope.type){
                            case('Point'):
                                if(featureStyle.text){
                                    scope.type='Text';
                                    scope.fontSize=parseInt(featureStyle.text.font.split('px')[0],10)||scope.fontSize;
                                    scope.text=featureStyle.text.text||scope.text;
                                    scope.colorText=featureStyle.text.fill.color||scope.colorText;
                                    if(featureStyle.text.stroke) {
                                        scope.colorTextStrokeWidth = featureStyle.text.stroke.width || scope.colorTextStrokeWidth;
                                        scope.colorTextStroke = featureStyle.text.stroke.color || scope.colorTextStroke;
                                    }
                                }
                                else {
                                    scope.color = featureStyle.regularshape.fill.color;
                                    scope.pointNumber = featureStyle.regularshape.points;
                                    scope.pointRadius = featureStyle.regularshape.radius;
                                }
                                break;

                            case('LineString'):
                                scope.color=featureStyle.stroke.color;
                                scope.lineWidth=featureStyle.stroke.width;
                                scope.lineLength=featureStyle.stroke.lineDash[0];
                                scope.lineSpace=featureStyle.stroke.lineDash[1];
                                break;

                            case('Polygon'):
                                scope.color=rgba2hex(featureStyle.fill.color);
                                scope.fillAlpha=100-parseInt(featureStyle.fill.color.split(',')[3].replace(')', '')*100,10)||scope.fillAlpha;
                                break;
                        }

                        _colorDict[scope.type]=scope.color;

                    };

                    scope.pointTypeChanged = function () {
                        var mode;
                        if(!scope.selectionActive){
                            mode='draw';
                        }
                        scope.activateDrawFeatureTool(mode);
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

                    scope.switchMode = function () {
                        if(scope.mode=='draw'){
                            scope.selectedFeatureId=undefined;
                            scope.selectionActive=false;
                        }
                        scope.activateDrawFeatureTool();
                    };

                    scope.activateDrawFeatureTool = function (overrideMode) {

                        if(overrideMode){
                            scope.mode=overrideMode;
                        }

                        if(scope.type!='Text'){
                            scope.text="";
                        }

                        drawFeatureTool.additionalOptions = {
                            operation: _operation,
                            type: scope.type,
                            style: scope.refreshStyle(),
                            snap: scope.snap,
                            mode: scope.mode,
                            selectedFeatureId: scope.selectedFeatureId,
                            selectionActive: scope.selectionActive
                        };
                        if(scope.GeoJSON){
                            drawFeatureTool.additionalOptions.GeoJSON=scope.GeoJSON;
                        }
                        toolsFactory.deactivateTool(drawFeatureTool);
                        toolsFactory.activateTool(drawFeatureTool);
                        if(scope.selectionActive){
                            if(scope.mode=='draw'){
                                scope.selectionActive=false;
                                scope.selectedFeatureId=undefined;
                            }
                        }
                    };

                    scope.drawFeature = function () {
                        scope.setColor();
                    };

                    scope.setColor = function (overrideMode) {
                       _colorDict[scope.type]=scope.color;
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

                    scope.deleteButtonClick = function(){
                        _operation='delete';
                        scope.activateDrawFeatureTool();
                        scope.selectedFeatureId=undefined;
                        scope.selectionActive=false;
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
                        eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureSelect, getSelectedFeatureId);
                    }
                    _checkUrlForGeoJSON();

                    function hex2rgba(hexRGB, alpha){
                        var r = parseInt(hexRGB.slice(1,3), 16);
                        g = parseInt(hexRGB.slice(3,5), 16);
                        b = parseInt(hexRGB.slice(5,7), 16);
                        //a = parseInt(hexRGB.slice(7,9), 16)/255;
                        return 'rgba('+r+', '+g+', '+b+', '+alpha+')';
                    }

                    var hexDigits = new Array
                    ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");


                    function rgba2hex(rgba){
                        rgba=rgba.replace('rgba','').replace('(','').replace(')','').split(',');
                        return "#" + hex(rgba[0]) + hex(rgba[1]) + hex(rgba[2]);

                    }

                    function hex(x) {
                        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
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
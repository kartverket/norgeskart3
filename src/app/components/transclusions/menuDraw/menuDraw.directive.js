angular.module('menuDraw')
  .directive('menuDraw', ['toolsFactory', 'ISY.EventHandler', '$location', 'mainAppService', '$http', '$filter', '$timeout',
    function (toolsFactory, eventHandler, $location, mainAppService, $http, $filter, $timeout) {
      return {
        templateUrl: 'components/transclusions/menuDraw/menuDraw.html',
        restrict: 'A',
        link: function (scope) {
          /*
          Draw start
          */
          var isGeoJsonConverted = true;
          scope.drawingHash = '';
          scope.snap = true;
          scope.selectionActive = false;
          scope.pointTypes = {
            Circle: 64,
            Triangle: 3,
            Diamond: 4
          };
          scope.colors = {
            black: '#000000',
            yellow: '#FFFF00',
            orange: '#FFA500',
            red: '#FF0000',
            purple: '#800080',
            blue: '#0000FF',
            darkgreen: '#006400',
            grey: '#808080'
          };
          scope.geometryTypes = [
            'Point',
            'LineString',
            'Polygon',
            'Text'
          ];

          scope.pointRadiusSizes = [{
              sizeType: "Small",
              size: 7
            },
            {
              sizeType: "Medium",
              size: 14
            },
            {
              sizeType: "Large",
              size: 21
            }
          ];

          scope.lineTypes = [{
              lineTypeId: "line",
              lineLength: 15,
              lineSpace: 0,
              lineType: "_____"
            },
            {
              lineTypeId: "dash",
              lineLength: 15,
              lineSpace: 15,
              lineType: "_ _ _ _"
            },
            {
              lineTypeId: "dot",
              lineLength: 2,
              lineSpace: 15,
              lineType: "......."
            }
          ];

          scope.lineWidthSizes = [{
              lineTypeId: 1,
              lineWidth: 2,
              sizeType: "Small"
            },
            {
              lineTypeId: 2,
              lineWidth: 4,
              sizeType: "Medium"
            },
            // {
            //     "lineTypeId": 3,
            //     "lineWidth": 6
            // },
            {
              lineTypeId: 4,
              lineWidth: 8,
              sizeType: "Large"
            }
          ];

          scope.polygonOpacities = [{
              opacityType: "0%",
              opacityValue: 0
            },
            {
              opacityType: "25%",
              opacityValue: 25
            },
            {
              opacityType: "50%",
              opacityValue: 50
            },
            {
              opacityType: "75%",
              opacityValue: 75
            },
            {
              opacityType: "100%",
              opacityValue: 100
            }
          ];

          scope.textHightSizes = [{
              textType: "Small",
              textHight: 10
            },
            {
              textType: "Medium",
              textHight: 15
            },
            {
              textType: "Large",
              textHight: 18
            }
          ];

          scope.modeTypes = ['draw', 'modify'];
          scope.mode = "draw";
          scope.type = 'Point';
          scope.color = '#FFA500';
          scope.fillAlpha = 50;
          scope.pointNumber = 64;
          scope.pointRadius = 7;
          scope.pointRadius2 = 7;
          scope.lineWidth = 2;
          scope.lineLength = 15;
          scope.lineSpace = 0;
          scope.text = "";
          scope.fontSize = 15;
          scope.colorTextStrokeWidth = 0;
          scope.colorTextStroke = '#000000';
          scope.colorText = '#000000';
          _colorDict = {
            Point: scope.color,
            LineString: scope.color,
            Polygon: scope.color,
            Text: scope.color
          };
          _deleteFeature = false;
          _fontName = 'sans-serif,helvetica';
          var drawFeatureTool = toolsFactory.getToolById("DrawFeature");

          scope.refreshStyle = function () {
            var style = new ol.style.Style({
              fill: new ol.style.Fill({
                color: hex2rgba(_colorDict.Polygon, (100 - scope.fillAlpha) / 100)
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
                  color: _colorDict.Text
                })
              })
            });
            scope.colorTextStrokeWidth = 10;
            if (scope.colorTextStrokeWidth > 0) {
              style.getText().setStroke(new ol.style.Stroke({
                color: 'rgba(255,255,255,1)',
                width: scope.colorTextStrokeWidth
              }));
            }
            return style;
          };

          var getDrawing = function (GeoJSON) {
            scope.setGeoJSON(GeoJSON);
            // console.log(GeoJSON);
          };

          var getSelectedFeatureId = function (selectedFeatureId) {
            var jsonObject = typeof scope.GeoJSON == 'object' ? scope.GeoJSON : JSON.parse(scope.GeoJSON);
            for (var i = 0; i < jsonObject.features.length; i++) {
              if (jsonObject.features[i].id == selectedFeatureId) {
                scope.selectionActive = true;
                scope.selectedFeatureId = selectedFeatureId;
                _setDrawingPropertiesFromSelectedFeature(jsonObject.features[i]);
                scope.$apply();
                scope.activateDrawFeatureTool();
                return;
              }
            }
          };

          var _setDrawingPropertiesFromSelectedFeature = function (feature) {
            var featureStyle = feature.properties.style;
            scope.type = feature.geometry.type;
            switch (scope.type) {
              case ('Point'):
                if (featureStyle.text) {
                  $('#myTabs a[data-target="#text"]').tab('show');
                  scope.type = 'Text';
                  scope.fontSize = parseInt(featureStyle.text.font.split('px')[0], 10) || scope.fontSize;
                  scope.text = featureStyle.text.text || scope.text;
                  scope.color = featureStyle.text.fill.color || scope.color;
                  if (featureStyle.text.stroke) {
                    scope.colorTextStrokeWidth = featureStyle.text.stroke.width || scope.colorTextStrokeWidth;
                    scope.colorTextStroke = featureStyle.text.stroke.color || scope.colorTextStroke;
                  }
                } else {
                  $('#myTabs a[data-target="#point"]').tab('show');
                  scope.color = featureStyle.regularshape.fill.color;
                  scope.pointNumber = featureStyle.regularshape.points;
                  scope.pointRadius = featureStyle.regularshape.radius;
                }
                break;

              case ('LineString'):
                $('#myTabs a[data-target="#line"]').tab('show');
                scope.color = featureStyle.stroke.color;
                scope.lineWidth = featureStyle.stroke.width;
                scope.lineLength = featureStyle.stroke.lineDash[0];
                scope.lineSpace = featureStyle.stroke.lineDash[1];
                break;

              case ('Polygon'):
                $('#myTabs a[data-target="#polygon"]').tab('show');
                scope.color = rgba2hex(featureStyle.fill.color);
                scope.fillAlpha = 100 - parseInt(featureStyle.fill.color.split(',')[3].replace(')', '') * 100, 10) || scope.fillAlpha;
                break;
            }

            _colorDict[scope.type] = scope.color;

          };

          scope.pointTypeChanged = function () {
            var mode;
            if (!scope.selectionActive) {
              mode = 'draw';
            }
            scope.activateDrawFeatureTool(mode);
          };

          var _checkUrlForGeoJSON = function () {
            var drawingHash = _getValueFromUrl('drawing');
            if (drawingHash) {
              _getGeoJSON(drawingHash);
              return true;
            }
            scope.activateDrawFeatureTool();
          };

          var _getValueFromUrl = function (key) {
            if (!$location.url()) {
              // console.log("URL not found");
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

          function _checkIfGeoJSONConverted(geoJson){
            isGeoJsonConverted = true;
            for (var i = 0; i < geoJson.features.length; i++) {
              var featureCrds = geoJson.features[i].geometry.coordinates;
              if (featureCrds.length === 2 && typeof featureCrds[0] === 'number') {
                if (featureCrds[1] > 90){
                  isGeoJsonConverted = false;
                  break;
                }
              } else {
                for (var j = 0; j < featureCrds.length; j++) {
                  if (featureCrds[j][1] > 90){
                    isGeoJsonConverted = false;
                    break;
                  }
                }
              }
              break;
            }
          }

          var _getGeoJSON = function (hash) {
            scope.drawingHash = hash;
            var drawingUrl = mainAppService.generateGeoJSONUrl(hash, false);
            $http.get(drawingUrl).then(function (result) {
              // console.log('Result: ', result.data);
              _checkIfGeoJSONConverted(result.data);
              _setGeoJSONOnScope(result);
            });
          };

          var _setGeoJSONOnScope = function (result) {
            scope.setGeoJSON(result.data);
            if (scope.drawActivated) {
              scope.activateDrawFeatureTool();
            } else {
              scope.activateDrawFeatureTool();
              scope.deactivateDrawFeatureTool();
            }
          };

          scope.switchMode = function (newMode) {
            scope.mode = newMode;
            if (scope.mode == 'draw') {
              scope.selectedFeatureId = undefined;
              scope.selectionActive = false;
            }
            scope.activateDrawFeatureTool();
          };

          scope.switchType = function (newType) {
            scope.type = newType;
            _colorDict[scope.type] = scope.color;
            scope.switchMode('draw');
          };

          scope.switchSymbol = function (newSymbol) {
            scope.pointNumber = scope.pointTypes[newSymbol];
            scope.activateDrawFeatureTool();
            scope.pointSymbol = newSymbol;
          };

          scope.activateDrawFeatureTool = function () {
            if (scope.type != 'Text') {
              scope.text = "";
            }
            if (!drawFeatureTool) {
              throw "No draw tool found";
            }

            drawFeatureTool.additionalOptions = {
              deleteFeature: _deleteFeature,
              type: scope.type,
              style: scope.refreshStyle(),
              snap: scope.snap,
              mode: scope.mode,
              selectedFeatureId: scope.selectedFeatureId,
              selectionActive: scope.selectionActive,
              showMeasurements: scope.showMeasurements,
              showNauticalMiles: scope.showNauticalMiles
            };

            if (scope.GeoJSON) {
              drawFeatureTool.additionalOptions.GeoJSON = scope.GeoJSON;
              drawFeatureTool.additionalOptions.drawingHash = scope.drawingHash
            }
            toolsFactory.deactivateTool(drawFeatureTool);
            toolsFactory.activateTool(drawFeatureTool);
            if (scope.selectionActive) {
              if (scope.mode == 'draw') {
                scope.selectionActive = false;
                scope.selectedFeatureId = undefined;
              }
            }
            scope.drawActivated = true;
          };

          scope.drawFeature = function () {
            scope.setColor();
          };

          scope.setColor = function (newColor) {
            scope.color = newColor;
            _colorDict[scope.type] = scope.color;
            scope.activateDrawFeatureTool();
          };

          scope.newButtonClick = function () {
            scope.setGeoJSON('remove');
            _removeDrawingFromUrl();
            scope.activateDrawFeatureTool();
          };

          var _removeDrawingFromUrl = function () {
            var hash = _getValueFromUrl('drawing');
            var oldUrl = $location.url();
            $location.url(oldUrl.replace('drawing=' + hash, ''));
            scope.drawingHash = '';
          };

          scope.deleteButtonClick = function () {
            _deleteFeature = true;
            scope.activateDrawFeatureTool();
            scope.selectedFeatureId = undefined;
            scope.selectionActive = false;
            _deleteFeature = false;
          };

          scope.saveToPCButtonClick = function () {
            if (scope.GeoJSON == 'remove') {
              alert('Empty drawing');
            } else {
              scope.saveToPc(scope.GeoJSON);
            }
          };

          function _showConvertInfo(){
            if (!isGeoJsonConverted) {
              scope.showConvertInfo = true;
              $timeout(function () {
                scope.showConvertInfo = false;
              }, 4000);
            }
          }

          scope.downloadButtonClick = function () {
            if (scope.drawingHash !== '') {
              var downloadUrl = mainAppService.generateGeoJSONUrl(scope.drawingHash, true);
              window.open(downloadUrl);
            }
          };

          scope.saveButtonClick = function () {
            _showConvertInfo();
            var saveUrl = mainAppService.generateGeoJSONSaveUrl();
            $http.defaults.headers.post = {}; //TODO: This is a hack. CORS pre-flight should be implemented server-side
            $http.post(saveUrl, scope.GeoJSON).then(function (result) {
              _setDrawingInUrl(result);
            });
          };

          var _setDrawingInUrl = function (result) {
            var drawingUrl = result.data;
            // alert(drawingUrl);
            var hashIndex = drawingUrl.split('/').length - 1;
            var hash = drawingUrl.split('/')[hashIndex].split('.')[0];
            _removeDrawingFromUrl();
            var oldUrl = $location.url();
            $location.url(oldUrl + '&drawing=' + hash);
            _checkUrlForGeoJSON();
          };

          // scope.removeInfomarkers();

          if (!scope.isDrawActivated()) {
            eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureEnd, getDrawing);
            eventHandler.RegisterEvent(ISY.Events.EventTypes.DrawFeatureSelect, getSelectedFeatureId);
          }

          function hex2rgba(hexRGB, alpha) {
            var r = parseInt(hexRGB.slice(1, 3), 16);
            var g = parseInt(hexRGB.slice(3, 5), 16);
            var b = parseInt(hexRGB.slice(5, 7), 16);
            //a = parseInt(hexRGB.slice(7,9), 16)/255;
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
          }

          var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

          function rgba2hex(rgba) {
            rgba = rgba.replace('rgba', '').replace('(', '').replace(')', '').split(',');
            return ("#" + hex(rgba[0]) + hex(rgba[1]) + hex(rgba[2])).toUpperCase();

          }

          function hex(x) {
            return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
          }

          /*
           Draw end
           */

          scope.saveToPc = function (data, filename) {
            if (!data) {
              // console.error('No data');
              return;
            }

            if (!filename) {
              var today = $filter('date')(new Date(), 'yyyyMMddHHmmss');
              filename = 'Norgeskart3.tegning.' + today + '.json';
            }

            if (typeof data === 'object') {
              data = JSON.stringify(data, undefined, 2);
            }

            var blob = new Blob([data], {
              type: 'text/json'
            });

            // FOR IE:
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
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

          // scope.closeMenuDraw = function () {
          //     mapOverlaysLayoutFactory.setShowSearchOverlay(true);
          //     moveableOverlayFactory.deactiveAllOverlay();
          //     scope.deactivateDrawFeatureTool(scope.GeoJSON);
          // };

          scope.setPointRadiusSize = function (type) {
            scope.pointRadius = type.size;
            scope.activePointType = type.sizeType;
            scope.activateDrawFeatureTool();
          };

          scope.setLineWidthSize = function (type) {
            scope.lineWidth = type.lineWidth;
            scope.activeLineWidthSize = type.lineTypeId;
            scope.activateDrawFeatureTool();
          };

          scope.setPolygonOpacity = function (type) {
            scope.fillAlpha = type.opacityValue;
            scope.activeOpacityType = type.opacityType;
            scope.activateDrawFeatureTool();
          };

          scope.setTextHight = function (type) {
            scope.fontSize = type.textHight;
            scope.activeTextHight = type.textType;
            scope.activateDrawFeatureTool();
          };

          scope.switchLineType = function (type) {
            scope.lineLength = type.lineLength;
            scope.lineSpace = type.lineSpace;
            scope.activeLineType = type.lineTypeId;
            scope.activateDrawFeatureTool();
          };

          function _initMenuDraw() {
            scope.setPointRadiusSize(scope.pointRadiusSizes[0]);
            scope.setLineWidthSize(scope.lineWidthSizes[0]);
            scope.setPolygonOpacity(scope.polygonOpacities[2]);
            scope.setTextHight(scope.textHightSizes[1]);
            scope.switchLineType(scope.lineTypes[0]);
            // scope.pointRadius = scope.pointRadiusSizes[0].size;
            // scope.activePointType = scope.pointRadiusSizes[0].sizeType;
            scope.pointSymbol = 'Circle';
            // scope.setColor('#FFA500');
            if (_checkUrlForGeoJSON()) {
              toolsFactory.deactivateTool(drawFeatureTool);
              scope.drawActivated = false;
            }
          }

          _initMenuDraw();

          scope.$on('initDraw', function(){
            _initMenuDraw();
          });

          // var setMenuListMaxHeight = function () {
          //     $(document).ready(function() {
          //         var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
          //         if (isMobile.matches) {
          //             fixElementHeight(120);
          //         }else{
          //             fixElementHeight(220);
          //         }
          //     });
          // };
          //
          // function fixElementHeight(moveUpFromBottom){
          //     var bodyHeight = $window.innerHeight;
          //     var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
          //     var searchContentElements = document.getElementsByClassName("movemenu");
          //     for (var i = 0; i < searchContentElements.length; i++){
          //         var element = searchContentElements[i];
          //         element.style.maxHeight = menuListMaxHeight + 'px';
          //     }
          // }
          //
          // $( document ).ready(function() {
          //     $($window).resize(setMenuListMaxHeight);
          //     setMenuListMaxHeight();
          // });
        }
      };
    }
  ]);

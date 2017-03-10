angular.module('mainApp')
  .directive('mainApp', ['toolsFactory', 'mainAppFactory',
    function (toolsFactory, mainAppFactory) {
      return {
        templateUrl: 'mainAppBody.html',
        controller: 'mainAppController',
        link: function (scope, element) {
          if (element.scope) {
            element = $(element);
          }

          var addFeatureTool = toolsFactory.getToolById("AddLayerFeature");
          var measureLine = toolsFactory.getToolById("MeasureLine");
          var measure = toolsFactory.getToolById("Measure");
          var pointSelectTool = toolsFactory.getToolById('PointSelect');
          var printBoxSelect = toolsFactory.getToolById('PrintBoxSelect');
          var drawFeature = toolsFactory.getToolById('DrawFeature');
          var addLayerUrl = toolsFactory.getToolById('AddLayerUrl');

          element.on('mousedown touchstart', function (event) {
            if (!addFeatureTool.isSelected && !measureLine.isSelected && !measure.isSelected && !printBoxSelect.isSelected && !drawFeature.isSelected && !addLayerUrl.isSelected) {
              toolsFactory.activateTool(pointSelectTool);
            }
            if (mainAppFactory.isMainMenuOpen()) {
              var elementsInPath = event.path;
              if (elementsInPath === undefined) {
                elementsInPath = _generatePath(event);
              }
              for (var i = 0; i < elementsInPath.length; i++) {
                if (elementsInPath[i].id === "mapDiv") {
                  scope.closeNav();
                }
              }
            }
          });


          function _generatePath(event) {
            var path = [];
            var currentElem = event.target;
            while (currentElem) {
              path.push(currentElem);
              currentElem = currentElem.parentElement;
            }
            if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
              path.push(document);
            }
            if (path.indexOf(window) === -1) {
              path.push(window);
            }
            return path;
          }


        }
      };
    }
  ]);

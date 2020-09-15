angular.module('moveableOverlay')
  .directive('moveableOverlay', ['moveableOverlayFactory', '$document', 'mapOverlaysLayoutFactory', 'toolsFactory', 'menuElevationProfileFactory',
    function (moveableOverlayFactory, $document, mapOverlaysLayoutFactory, toolsFactory, menuElevationProfileFactory) {
      return {
        templateUrl: 'components/overlays/moveableOverlay/moveableOverlay.html',
        controller: 'moveableOverlayController',
        restrict: 'A',
        transclude: true,
        link: function ($scope, element) {
          if (element.scope) {
            element = $(element);
          }

          var _addUnsavedDrawings = function () {
            var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
            drawFeatureTool.additionalOptions.GeoJSON = $scope.GeoJSON;
            toolsFactory.activateTool(drawFeatureTool);
          };

          $scope.closeOverlay = function () {
            mapOverlaysLayoutFactory.setShowSearchOverlay(true);
            _addUnsavedDrawings();
            moveableOverlayFactory.deactiveAllOverlay();
            menuElevationProfileFactory.setElevationBtnActivity(false);
            menuElevationProfileFactory.setElevationProfileActive(false);
            $scope.deactivateDrawFeatureTool($scope.GeoJSON);
            $scope.deactivateAddLayerFeatureTool();
            $scope.deactivateMoveableOverlay();
          };

          element.on('pointerdown mousedown touchstart', function (event) {
            if (event.target.id !== 'header1' && event.target.id !== 'header2' &&
              event.target.id !== 'header3' && event.target.id !== 'header4' &&
              event.target.id !== 'header5' && event.target.id !== 'header6') {
              return event;
            }
            event.preventDefault();
          });

        }
      };
    }
  ]);

angular.module('mainMenuPanel')
    .directive('mainMenuPanel', [ 'toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuPanel.html',
                restrict: 'A',
                controller: 'mainMenuPanelController',
                link: function(scope){
                    scope.deactivateDrawFeature = function () {
                        var drawFeatureTool = toolsFactory.getToolById("DrawFeature");
                        toolsFactory.deactivateTool(drawFeatureTool);
                    };
                }
            };
        }]);
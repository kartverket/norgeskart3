angular.module('mainMenu')
    .directive('mainMenu', ['mapToolsFactory',
        function(mapToolsFactory) {
            return {
                templateUrl: 'components/menus/mainMenu/mainMenu.html',
                restrict: 'A',
                link: function(scope){


                    scope.startDrawing = function () {
                        var addFeatureTool = mapToolsFactory.getToolById("AddLayerFeature");
                        mapToolsFactory.setAddFeatureType("Line", "AddLayerFeature");
                        mapToolsFactory.activateTool(addFeatureTool);
                    };


                }
            };
        }]);
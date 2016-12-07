angular.module('searchSeEiendomPanel')
    .directive('searchSeEiendomPanel', ['$window', 'toolsFactory', 'mainAppService',
        function($window, toolsFactory,mainAppService) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchSeEiendomPanel/searchSeEiendomPanel.html',
                restrict: 'A',
                link: function (scope) {
                    scope.openEindomInformasjon = function () {
                        $window.open(scope.searchOptionsDict['seEiendom'].url, '_blank');

                    };

                    scope.showSelection = function () {
                        var addLayerUrlTool = toolsFactory.getToolById("AddLayerUrl");
                        if (!scope.showSelectionCheckbox) {
                            toolsFactory.deactivateTool(addLayerUrlTool);
                            return;
                        }

                        addLayerUrlTool.additionalOptions.url = mainAppService.generateMatrikkelWfsFilterUrl(scope.searchOptionsDict['seEiendom']);
                        addLayerUrlTool.additionalOptions.geometryName = 'FLATE';
                        addLayerUrlTool.additionalOptions.style = new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,102,0.6)'
                            })
                        });

                        toolsFactory.activateTool(addLayerUrlTool);
                    };

                }
            };
        }]);
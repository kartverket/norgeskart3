angular.module('searchLagTurkartPanel')
    .directive('searchLagTurkartPanel', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagTurkartPanel/searchLagTurkartPanel.html',
                restrict: 'A',
                link: function(scope){
                    var _activatePrintBoxSelect = function(scale) {
                        var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                        printBoxSelectTool.additionalOptions.scale = scale;
                        toolsFactory.activateTool(printBoxSelectTool);
                    };

                    var _deactivatePrintBoxSelect = function() {
                        var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                        toolsFactory.deactivateTool(printBoxSelectTool);
                    };

                    scope.applyScale = function () {
                        _deactivatePrintBoxSelect();
                        _activatePrintBoxSelect(scope.scale);
                    };

                    scope.scales={
                        '25000': '1: 25 000',
                        '50000': '1: 50 000'
                    };

                    scope.scale='25000';

                    _activatePrintBoxSelect(scope.scale);
                }
            };
        }]);
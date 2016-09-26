angular.module('searchLagTurkartPanel')
    .directive('searchLagTurkartPanel', ['toolsFactory','ISY.EventHandler',
        function(toolsFactory, eventHandler) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagTurkartPanel/searchLagTurkartPanel.html',
                restrict: 'A',
                link: function(scope){
                    var _activatePrintBoxSelect = function(scale) {
                        var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                        printBoxSelectTool.additionalOptions.scale = scale;
                        toolsFactory.activateTool(printBoxSelectTool);
                    };

                    scope._deactivatePrintBoxSelect = function() {
                        var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                        toolsFactory.deactivateTool(printBoxSelectTool);
                    };

                    scope.applyScale = function () {
                        scope._deactivatePrintBoxSelect();
                        _activatePrintBoxSelect(scope.scale);
                    };

                    scope.scales={
                        '25000': '1: 25 000',
                        '50000': '1: 50 000'
                    };

                    scope.scale='25000';

                    _activatePrintBoxSelect(scope.scale);

                    function _boxExtent(extent){
                        console.log(extent);
                    }

                    eventHandler.RegisterEvent(ISY.Events.EventTypes.PrintBoxSelectReturnValue, _boxExtent);

                }
            };
        }]);
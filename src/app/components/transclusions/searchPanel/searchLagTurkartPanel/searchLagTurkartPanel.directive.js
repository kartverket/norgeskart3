angular.module('searchLagTurkartPanel')
    .directive('searchLagTurkartPanel', ['toolsFactory',
        function(toolsFactory) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagTurkartPanel/searchLagTurkartPanel.html',
                restrict: 'A',
                link: function(){
                    var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                    toolsFactory.activateTool(printBoxSelectTool);
                }
            };
        }]);
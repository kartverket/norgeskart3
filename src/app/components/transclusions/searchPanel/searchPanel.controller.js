angular.module('searchPanel')
    .controller('searchPanelController', ['$scope', 'toolsFactory',
        function($scope, toolsFactory){

            $scope.showSearchResultPanel = function () {
                $scope.searchPanelLayout = "searchResultsPanel";
            };

            $scope.showSearchOptionsPanel = function () {
                $scope.searchPanelLayout = "searchOptionsPanel";
            };

            $scope.searchPanelLayout = "searchResultsPanel";

            $scope.showSearchSeEiendomPanel = function () {
                $scope.activeSearchOptionOrder = ['kommunenr', 'gardsnr', 'bruksnr', 'festenr', 'seksjonsnr', 'eiendomstype', 'matrikkelnr'];
                $scope.activeSearchOption = $scope.searchOptionsDict['seEiendom'];
                $scope.searchPanelLayout = "searchSeEiendomPanel";
            };

            $scope.searchOptionsDict = {};

            $scope.showKoordTransPanel = function () {
                $scope.searchPanelLayout = "searchKoordTransPanel";
            };

            $scope.showLagTurKartPanel = function () {
                $scope.searchPanelLayout = "searchLagTurkartPanel";
            };

            $scope.showLagNodplakatPanel = function () {
                $scope.searchPanelLayout = "searchLagNodplakatPanel";
            };

            $scope.setSearchBarText = function(text) {
                $scope.searchBarModel = text;
            };

            $scope.deactivatePrintBoxSelect = function() {
                var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
                toolsFactory.deactivateTool(printBoxSelectTool);
            };
        }
    ]);
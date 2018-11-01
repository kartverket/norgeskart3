angular.module('searchPanel')
  .controller('searchPanelController', ['$scope', 'toolsFactory', 'ISY.MapAPI.Map', 'mainAppFactory', '$timeout', '$location',
    function ($scope, toolsFactory, map, mainAppFactory, $timeout, $location) {

      function _updateLocationPanel(panelName) {
        $location.search()['panel'] = panelName;
        $location.search(angular.extend($location.search(), $location.search()));
      }

      $scope.showSearchResultPanel = function () {
        $scope.deactivatePrintBoxSelect();
        $scope.searchPanelLayout = "searchResultsPanel";
        mainAppFactory.setActiveSearchPanel('searchResultsPanel');

      };

      $scope.showNoResultPanel = function() {
        $scope.deactivatePrintBoxSelect();
        $scope.searchPanelLayout = "searchNoResultPanel";
        $timeout(function () {
            $scope.$apply();
        }, 1);
      };

      $scope.showSearchOptionsPanel = function (previous) {
        $scope.deactivatePrintBoxSelect();
        $scope.deactivateAddLayerUrl();
        $scope.searchPanelLayout = "searchOptionsPanel";
        _updateLocationPanel("searchOptionsPanel");
        if (!previous) {
          mainAppFactory.setActiveSearchPanel('searchOptionsPanel');
        }
      };

      $scope.searchPanelLayout = "searchResultsPanel";

      $scope.showSearchSeEiendomPanel = function () {
        $scope.activeSearchOptionOrder = ['kommunenr', 'gardsnr', 'bruksnr', 'festenr', 'seksjonsnr', 'eiendomstype', 'matrikkelnr'];
        $scope.activeSearchOption = $scope.searchOptionsDict['seEiendom'];
        $scope.searchPanelLayout = "searchSeEiendomPanel";
        _updateLocationPanel("Seeiendom");
        mainAppFactory.setActiveSearchPanel('searchSeEiendomPanel');
      };

      $scope.searchOptionsDict = {};

      $scope.showKoordTransPanel = function () {
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchKoordTransPanel";
        _updateLocationPanel("Koordinater");
        mainAppFactory.setActiveSearchPanel('searchKoordTransPanel');
      };

      $scope.showLagTurKartPanel = function () {
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchLagTurkartPanel";
        _updateLocationPanel("Turkart");
        mainAppFactory.setActiveSearchPanel('searchLagTurkartPanel');
      };

      $scope.showLagFargeleggingskartPanel = function () {
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchLagFargeleggingskartPanel";
        _updateLocationPanel("Fargelegg");
        mainAppFactory.setActiveSearchPanel('searchLagFargeleggingskartPanel');
      };

      $scope.showLagNodplakatPanel = function () {
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchLagNodplakatPanel";
        _updateLocationPanel("Nodplakat");
        mainAppFactory.setActiveSearchPanel('searchLagNodplakatPanel');
      };

      $scope.setSearchBarText = function (text) {
        $scope.searchBarModel = text;
      };

      $scope.deactivatePrintBoxSelect = function () {
        var printBoxSelectTool = toolsFactory.getToolById("PrintBoxSelect");
        toolsFactory.deactivateTool(printBoxSelectTool);
      };

      $scope.deactivateAddLayerUrl = function () {
        var addLayerUrlTool = toolsFactory.getToolById("AddLayerUrl");
        addLayerUrlTool.additionalOptions.show = false;
        toolsFactory.activateTool(addLayerUrlTool);
        toolsFactory.deactivateTool(addLayerUrlTool);
      };

      $scope.initLastSearchPanel = function () {
        $scope.showSearchOptionsPanel('reset');
        $timeout(function () {
          if (mainAppFactory.getLastActiveSearchPanel() === 'searchResultsPanel') {
            mainAppFactory.setActiveSearchPanel('searchOptionsPanel');
          }
          $scope.searchPanelLayout = mainAppFactory.getLastActiveSearchPanel();
        }, 10);
      };

    }
  ]);

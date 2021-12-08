angular.module('searchPanel')
  .controller('searchPanelController', ['$scope', 'toolsFactory', 'ISY.MapAPI.Map', 'mainAppFactory', '$timeout', '$location', 'searchPanelFactory',
    function ($scope, toolsFactory, map, mainAppFactory, $timeout, $location, searchPanelFactory) {

      function _updateLocationPanel(panelName) {
        $location.search()['p'] = panelName;
        $location.search(angular.extend($location.search(), $location.search())).replace();
      }

      $scope.showSearchResultPanel = function () {
        $scope.deactivatePrintBoxSelect();
        $scope.searchPanelLayout = "searchResultsPanel";
        mainAppFactory.setActiveSearchPanel('searchResultsPanel');

      };

      $scope.showSearchOptionsPanel = function (previous) {
        $scope.deactivatePrintBoxSelect();
        $scope.deactivateAddLayerUrl();
        $scope.searchPanelLayout = "searchOptionsPanel";
        if (!previous) {
          mainAppFactory.setActiveSearchPanel('searchOptionsPanel');
          _updateLocationPanel("searchOptionsPanel");
        }else{
          if ($location.search()['p'] === undefined){
            _updateLocationPanel("searchOptionsPanel");
          }
        }
      };

      $scope.searchPanelLayout = "searchResultsPanel";

      $scope.showSearchSeEiendomPanel = function () {
        $scope.activeSearchOptionOrder = ['kommunenr', 'gardsnr', 'bruksnr', 'festenr', 'seksjonsnr', 'eiendomstype', 'matrikkelnr'];
        $scope.activeSearchOption = $scope.searchOptionsDict['seEiendom'];
        $scope.searchPanelLayout = "searchSeEiendomPanel";
        _updateLocationPanel("Seeiendom");
        mainAppFactory.setActiveSearchPanel('searchSeEiendomPanel');
        var showSelection = ($location.search().showSelection === undefined || $location.search().showSelection === 'false') ? false : true;
        searchPanelFactory.setShowEiendomMarkering(showSelection);
      };

      $scope.searchOptionsDict = {};

      $scope.showStedsnavnPanel = function () {
        if ($scope.searchBarModel) {
          var stedsnavn = $scope.searchOptionsDict["ssrFakta"].stedsnavn
          stedsnavn.forEach(function (item, i) {
            if(item.stedsnavn[0]['skrivemåte']=== $scope.searchBarModel || (item.stedsnavn[1] && item.stedsnavn[1]['skrivemåte']=== $scope.searchBarModel)){
              stedsnavn.splice(i, 1);
              stedsnavn.unshift(item);
            }
          });
          $scope.searchOptionsDict["ssrFakta"].stedsnavn = stedsnavn;
        }

        $scope.activeSearchOption = $scope.searchOptionsDict['ssrFakta'];
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchStedsnavnPanel";
        _updateLocationPanel("Stedsnavn");
        mainAppFactory.setActiveSearchPanel('searchStedsnavnPanel');
      };

      $scope.showKoordTransPanel = function () {
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchKoordTransPanel";
        _updateLocationPanel("Koordinater");
        mainAppFactory.setActiveSearchPanel('searchKoordTransPanel');
      };

      $scope.showLagTurKartPanel = function () {
        map.SetCenter($scope.activePosition);
        $scope.searchPanelLayout = "searchLagTurkartPanel";
        _updateLocationPanel("tur");
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

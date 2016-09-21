angular.module('mapOverlays')
    .controller('mapOverlaysController', ['$scope',
        function($scope){

            $scope.showSearchPanel = function () {
                $scope.mapOverlaysLayout = "searchPanelLayout";
            };

            $scope.showMainMenuPanel = function () {
                $scope.mapOverlaysLayout = "mainMenuPanelLayout";
            };

            $scope.mapOverlaysLayout = "searchPanelLayout";


            $scope.showSearchResultPanel = function () {
                $scope.searchPanelLayout = "searchResultsPanel";
            };

            $scope.showSearchOptionsPanel = function () {
                $scope.searchPanelLayout = "searchOptionsPanel";
            };


            $scope.searchPanelLayout = "searchResultsPanel";

            $scope.showSearchSeEiendomPanel = function () {
                $scope.searchPanelLayout = "searchSeEiendomPanel";
            };

        }
    ]);
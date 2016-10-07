angular.module('mainMenuPanel')
    .controller('mainMenuPanelController', ['$scope',
        function($scope){

            $scope.mainMenuPanelLayout = "mainMenuSections";

            $scope.showMainMenuBaseLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuBaseLayers";
            };

            $scope.showMainMenuSections = function () {
                $scope.mainMenuPanelLayout = "mainMenuSections";
            };

            $scope.showMainMenuGroupLayers = function () {
                $scope.mainMenuPanelLayout = "mainMenuGroupLayers";
            };

            $scope.showMainMenuDraw = function () {
                $scope.mainMenuPanelLayout = "mainMenuDraw";
            };

        }
    ]);
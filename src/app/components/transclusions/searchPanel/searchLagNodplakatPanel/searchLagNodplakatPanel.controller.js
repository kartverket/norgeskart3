angular.module('searchLagNodplakatPanel')
    .controller('searchLagNodplakatPanelController', [ '$scope',
        function($scope){
            $scope.showLagNodplakatPage1 = function () {
                $scope.searchLagNodplakatPanelLayout = 'page1';
            };
            $scope.showLagNodplakatPage2 = function () {
                $scope.searchLagNodplakatPanelLayout = 'page2';
            };
            $scope.showLagNodplakatPage3 = function () {
                $scope.searchLagNodplakatPanelLayout = 'page3';
            };

            $scope.searchLagNodplakatPanelLayout = 'page1';
        }
    ]);
angular.module('searchOptionsPanel')
    .controller('searchOptionsPanelController', ['$scope',
        function($scope){
            $scope.searchOptions = {};
            $scope.searchOptions['seEiendom'] = {
                icon: '🏠',
                text: 'Se eiendom',
                name: 'seEiendom'
            };
            $scope.searchOptions['ssrFakta'] = {
                icon: '⚑',
                text: 'Se fakta om stedsnavnet Sandvika',
                name: 'ssrFakta'
            };
            $scope.searchOptions['turKart'] = {
                icon: '🚶',
                text: 'Lage turkart',
                name: 'turKart'
            };
            $scope.searchOptions['nødplakat'] = {
                icon: '🚑',
                text: 'Lage Nødplakat',
                name: 'nødplakat'
            };
            $scope.searchOptions['seHavnivå'] = {
                icon: '🌊',
                text: 'Se havnivå',
                name: 'seHavnivå'
            };
        }
    ]);

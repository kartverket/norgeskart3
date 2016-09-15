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
                text: 'Se fakta om stedsnavnet',
                name: 'ssrFakta'
            };
            $scope.searchOptions['turKart'] = {
                icon: '🚶',
                text: 'Lage turkart',
                name: 'turKart'
            };
            $scope.searchOptions['nødplakat'] = {
                icon: '🚑',
                text: 'Lage nødplakat',
                name: 'nødplakat'
            };
            $scope.searchOptions['seHavnivå'] = {
                icon: '🌊',
                text: 'Se havnivå',
                name: 'seHavnivå'
            };
            $scope.searchOptions['seKoordinater'] = {
                icon: 'x,y',
                text: 'Se koordinater',
                name: 'seKoordinater'
            };
        }
    ]);

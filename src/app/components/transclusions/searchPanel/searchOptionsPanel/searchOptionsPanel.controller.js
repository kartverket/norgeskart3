angular.module('searchOptionsPanel')
    .controller('searchOptionsPanelController', ['$scope',
        function($scope){

            var _initSearchOptions= function() {

                $scope.searchOptions = [
                {
                    icon: '🏠',
                    text: 'Se eiendom',
                    name: 'seEiendom'
                },
                {
                    icon: '⚑',
                    text: 'Se fakta om stedsnavnet',
                    name: 'ssrFakta'
                },
                {
                    icon: '🚶',
                    text: 'Lage turkart',
                    name: 'turKart'
                },
                {
                    icon: '🚑',
                    text: 'Lage nødplakat',
                    name: 'nødplakat'
                },
                {
                    icon: '🌊',
                    text: 'Se havnivå',
                    name: 'seHavnivå'
                },
                {
                    icon: 'x,y',
                    text: 'Se koordinater',
                    name: 'seKoordinater'
                }
                ];};

                _initSearchOptions();

        }
    ]);

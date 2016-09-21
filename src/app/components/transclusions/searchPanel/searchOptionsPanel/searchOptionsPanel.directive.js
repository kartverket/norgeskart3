angular.module('searchOptionsPanel')
    .directive('searchOptionsPanel', ['$window',
        function($window) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchOptionsPanel/searchOptionsPanel.html',
                restrict: 'A',
                link: function(scope){
                    scope.mouseDown= function (searchOption) {
                        switch (searchOption.name){
                            case ('seEiendom'):
                                scope.showSearchSeEiendomPanel();
                                break;
                            case ('koordTrans'):
                                scope.showKoordTransPanel();
                                break;
                            default:
                                if (searchOption.url){
                                    $window.open(searchOption.url, '_blank');
                                }
                                break;
                        }
                    };
                }
            };
        }]);
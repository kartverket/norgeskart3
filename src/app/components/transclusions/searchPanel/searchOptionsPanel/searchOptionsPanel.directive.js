angular.module('searchOptionsPanel')
    .directive('searchOptionsPanel', ['$window','ISY.MapAPI.Map',
        function($window, map) {
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
                            case ('lagTurkart'):
                                var mapSwitched=false;
                                var baselayers=map.GetBaseLayers();
                                while (!mapSwitched) {
                                    for (var baselayer in baselayers) {
                                        if (baselayers[baselayer].name == 'Rasterkart') {
                                            map.SetBaseLayer(baselayers[baselayer]);
                                            mapSwitched=true;
                                        }
                                    }
                                }
                                scope.showLagTurKartPanel();
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
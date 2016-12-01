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
                            case ('lagNodplakat'):
                                scope.showLagNodplakatPanel();
                                break;
                            default:
                                if (searchOption.url){
                                    $window.open(searchOption.url, '_blank');
                                }
                                break;
                        }
                    };
                    var setMenuListMaxHeight = function () {
                        $(document).ready(function() {
                            var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                            if (isMobile.matches) {
                                fixElementHeight(120);
                            }else{
                                fixElementHeight(220);
                            }
                        });
                    };

                    function fixElementHeight(moveUpFromBottom){
                        var bodyHeight = $window.innerHeight;
                        var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
                        var searchContentElements = document.getElementsByClassName("search-content");
                        for (var i = 0; i < searchContentElements.length; i++){
                            var element = searchContentElements[i];
                            element.style.maxHeight = menuListMaxHeight + 'px';
                        }
                    }

                    $( document ).ready(function() {
                        $($window).resize(setMenuListMaxHeight);
                        setMenuListMaxHeight();
                    });
                }
            };
        }]);
angular.module('searchOptionsPanel')
    .directive('searchOptionsPanel', ['$window','ISY.MapAPI.Map','changeBaseLayerPanelFactory',
        function($window, map, changeBaseLayerPanelFactory) {
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
                                switchToLayer('rasterkart');
                                scope.showLagTurKartPanel();
                                break;
                            case ('lagNodplakat'):
                                scope.showLagNodplakatPanel();
                                break;
                          case ('ssrFakta'):
                                  // $window.open( mainAppService.generateFaktaarkUrl(searchOption.stedsnavn[0].stedsnummer), '_blank');
                                  scope.showStedsnavnPanel();
                                break;
                            default:
                                if (searchOption.url){
                                    var searchOptionUrl = searchOption.url;
                                    var iframeWidth = 0;
                                    var iframeHeight = 0;
                                    var bodyHeight = $window.innerHeight;
                                    var bodyWidth = $window.innerWidth;
                                    var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                                    if (isMobile.matches) {
                                        iframeHeight = Math.floor(bodyHeight - 70);
                                        iframeWidth = Math.floor(bodyWidth - 50);
                                    }else{
                                        iframeHeight = Math.floor(bodyHeight - 300);
                                        iframeWidth = Math.floor(bodyWidth - 300);
                                    }

                                    $.featherlight({iframe: searchOptionUrl, iframeMaxWidth: '100%', iframeWidth: iframeWidth,
                                        iframeHeight: iframeHeight});
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

                    function switchToLayer(layerName) {
                        var mapSwitched=false;
                        var baselayers = map.GetBaseLayers();
                        baselayers.sort(function (a, b) {
                            if (a.guid && b.guid) {
                                return a.guid - b.guid;
                            } else {
                                return 0;
                            }
                        });
    
                        while (!mapSwitched) {
                            for (var baselayer in baselayers) {
                                if (baselayers[baselayer].name == layerName) {
                                    map.SetBaseLayer(baselayers[baselayer]);
                                    changeBaseLayerPanelFactory.setBaseLayerById(baselayers[baselayer].thumbnail);
                                    mapSwitched=true;
                                }
                            }
                        }
                    }

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

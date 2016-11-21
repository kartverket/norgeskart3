angular.module('searchLagNodplakatPanelPage1')
    .directive('searchLagNodplakatPanelPage1', ['$window',
        function($window) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchLagNodplakatPanel/searchLagNodplakatPanelPage1/searchLagNodplakatPanelPage1.html',
                restrict: 'A',
                link: function(){
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
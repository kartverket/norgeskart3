angular.module('searchNoResults')
    .directive('searchNoResults', ['$window',
        function ($window) {
            return {
                templateUrl: 'components/transclusions/searchPanel/searchNoResults/searchNoResults.html',
                restrict: 'A',
                link: function (scope) {
                    

                    var setMenuListMaxHeight = function () {
                        $(document).ready(function () {
                            var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                            if (isMobile.matches) {
                                fixElementHeight(120);
                            } else {
                                fixElementHeight(220);
                            }
                        });
                    };

                    function fixElementHeight(moveUpFromBottom) {
                        var bodyHeight = $window.innerHeight;
                        var menuListMaxHeight = Math.floor(bodyHeight - moveUpFromBottom);
                        var searchContentElements = document.getElementsByClassName("search-content");
                        for (var i = 0; i < searchContentElements.length; i++) {
                            var element = searchContentElements[i];
                            element.style.maxHeight = menuListMaxHeight + 'px';
                        }
                    }

                    scope.isIosDevice = function () {
                        return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i));
                    };

                    $(document).ready(function () {
                        $($window).resize(setMenuListMaxHeight);
                        setMenuListMaxHeight();
                    });
                }
            };
        }
    ]);

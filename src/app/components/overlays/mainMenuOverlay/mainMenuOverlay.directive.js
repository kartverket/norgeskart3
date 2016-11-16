angular.module('mainMenuOverlay')
    .directive('mainMenuOverlay', ['localStorageFactory','$timeout','$window',
        function(localStorageFactory, $timeout, $window) {
            return {
                templateUrl: 'components/overlays/mainMenuOverlay/mainMenuOverlay.html',
                restrict: 'A',
                link: function(scope){

                    scope.openNav = function() {
                        var isMobile = $window.matchMedia("only screen and (max-width: 760px)");
                        if (isMobile.matches) {
                            document.getElementById("mySidenav").style.width = "320px";
                            document.getElementById("sideMenuPosition").style.width = "320px";
                        }else{
                            document.getElementById("mySidenav").style.width = "395px";
                            document.getElementById("sideMenuPosition").style.width = "395px";
                        }
                        // document.getElementById("mySidenav").style.width = "395px";
                        document.getElementById("mySidenav").style.overflowY = "auto";
                        document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";
                        document.getElementById("main").style.transition = "0.4s";

                        // document.getElementById("sideMenuPosition").style.width = "395px";

                        localStorageFactory.set("mainMenuIsOpen", true);
                    };

                    scope.closeNav = function() {
                        if(document.getElementById("mySidenav") && document.getElementById("main")) {
                            document.getElementById("mySidenav").style.width = "0";
                            $timeout(function () {
                                document.getElementById("sideMenuPosition").style.width = "0";
                            }, 400);

                            document.getElementById("mySidenav").style.overflowY = "hidden";
                            document.getElementById("main").style.backgroundColor = "transparent";
                            document.getElementById("main").style.transition = "0.4s";

                            localStorageFactory.set("mainMenuIsOpen", false);
                        }
                    };

                    function _initMainMenuOverlay() {
                        var isMainMenuOpen = localStorageFactory.get("mainMenuIsOpen");
                        if (isMainMenuOpen !== null){
                            if (isMainMenuOpen){
                                scope.openNav();
                            }else{
                                scope.closeNav();
                            }
                        }
                    }
                    $( document ).ready(function() {
                        _initMainMenuOverlay();
                    });
                }
            };
        }]);
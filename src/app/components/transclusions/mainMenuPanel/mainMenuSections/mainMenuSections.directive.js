angular.module('mainMenuSections')
    .directive('mainMenuSections', ['mainMenuPanelFactory','$location','ISY.MapAPI.Map','isyTranslateFactory','$translate', 'localStorageFactory', '$timeout', '$window',
        function(mainMenuPanelFactory, $location, map, isyTranslateFactory, $translate, localStorageFactory, $timeout, $window) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
                restrict: 'A',
                link: function(scope){
                    scope.projects = mainMenuPanelFactory.getAllProjects();
                    scope.languages = isyTranslateFactory.getAllLanguages();

                    scope.activateProject = function (project) {
                        scope.visibleLayersCount = 0;
                        if (project.isSelected){
                            scope.showMainMenuGroupLayers();
                        }else{
                            mainMenuPanelFactory.setProjectById(project.id);
                            var search = $location.search();
                            search['project'] = project.id;
                            search.layers = "";
                            setSearch(map.GetUrlObject(), search.layers);
                        }
                    };

                    var setSearch = function (obj, layers) {
                        if (!angular.equals(obj, $location.search())) {
                            var newSearch = angular.extend($location.search(), obj);
                            newSearch.layers = layers;
                            $location.search(newSearch);
                            $timeout(function () {
                                window.location.reload();
                            }, 0);
                        }
                    };

                    scope.getSelectedLanguageStyle = function (active) {
                        if (active){
                            return 'glyphicon glyphicon-ok-sign pointer-cursor';
                        }else{
                            return 'icon-radio-unchecked pointer-cursor';
                        }
                    };

                    scope.getUnselectLanguage = function () {
                        for (var i = 0; i < scope.languages.length; i++){
                            if (!scope.languages[i].active){
                                return scope.languages[i];
                            }
                        }
                        return "";
                    };

                    scope.changeLanguage = function () {
                        var langId = scope.getUnselectLanguage().id;
                        isyTranslateFactory.setCurrentLanguage(langId);
                        map.SetTranslateOptions(isyTranslateFactory.getTranslateOptionsByActiveLanguage());
                        $translate.use(langId);
                        localStorageFactory.set("activeLanguage", langId);
                    };

                    $( document ).ready(function() {
                        scope.visibleLayersCount = map.GetVisibleSubLayers().length;
                    });

                    scope.redirectKartverket = function () {
                        $window.open("http://kartverket.no/");
                    };

                    scope.sendFeedback = function () {
                        var url='mailto:post@kartverket.no?subject=norgeskart.no';
                        $window.open(url, '_self');
                    };

                    /*Print start*/
                    function printMap(){
                        var cnv = document.getElementsByClassName("print-mode")[0];
                        var scrollHeight = cnv.scrollHeight;
                        var scrollWidth = cnv.scrollWidth;

                        //A4 aspect ratio is 0.707070:1
                        var widthInRatio = scrollHeight * 0.707070;
                        //cnv.style.width = scrollWidth+"px";
                        if (scrollWidth > widthInRatio){
                            cnv.style.width = (scrollWidth)+"px";
                            cnv.style.height = scrollHeight+"px";
                        }
                    }

                    function afterPrint(){
                        var cnv = document.getElementsByClassName("print-mode")[0];
                        cnv.style.height = 100+"%";
                        cnv.style.width = 100+"%";
                        map.RedrawMap();
                    }

                    scope.printMap = function () {
                        var objPrintPreview = '<object id="printPrev" width="0" height="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>';
                        document.body.insertAdjacentHTML('beforeEnd', objPrintPreview);
                        try{
                            printPrev.ExecWB(7, 2);
                            printPrev.outerHTML = "";
                        }catch(err){
                            if (false){
                                console.log(err);
                            }
                        }




                        printMap();
                        window.print();
                        afterPrint();
                    };

                    window.matchMedia('print').addListener(function () {
                        printMap();
                        setTimeout(function(){
                            afterPrint();
                        }, 1);
                    });

                    $(window).on('beforeprint', function(){
                        printMap();
                    });

                    $(window).on('afterprint', function(){
                        afterPrint();
                    });
                    /*Print end*/
                }
            };
        }]);
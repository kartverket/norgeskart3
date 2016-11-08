angular.module('mainMenuSections')
    .directive('mainMenuSections', ['mainMenuPanelFactory','$location','ISY.MapAPI.Map','isyTranslateFactory','$translate', 'localStorageFactory', '$timeout',
        function(mainMenuPanelFactory, $location, map, isyTranslateFactory, $translate, localStorageFactory, $timeout) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
                restrict: 'A',
                link: function(scope){
                    scope.projects = mainMenuPanelFactory.getAllProjects();
                    scope.languages = isyTranslateFactory.getAllLanguages();

                    scope.activateProject = function (project) {
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

                    scope.getVisibleSubLayersCount = function () {
                        var visSubLayers = map.GetVisibleSubLayers();
                        var circleElements = document.getElementsByClassName("circle");
                        if (visSubLayers !== undefined){

                            var numLength = getLength(visSubLayers.length);
                            for(var i = 0; i < circleElements.length; i++){
                                if (numLength === 1){
                                    circleElements[i].style.padding = "5px 8px 3px 8px";
                                }else{
                                    circleElements[i].style.padding = "7px 7px 5px 7px";
                                }
                            }
                            return visSubLayers.length;
                        }else{
                            for (var j = 0; j < circleElements.length; j++){
                                circleElements[j].style.padding = "5px 8px 3px 8px";
                            }
                            return 0;
                        }
                    };

                    function getLength(number) {
                        return number.toString().length;
                    }
                }
            };
        }]);
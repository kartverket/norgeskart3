angular.module('mainMenuSections')
    .directive('mainMenuSections', ['mainMenuPanelFactory',
        function(mainMenuPanelFactory) {
            return {
                templateUrl: 'components/transclusions/mainMenuPanel/mainMenuSections/mainMenuSections.html',
                restrict: 'A',
                link: function(scope){
                    scope.projects = mainMenuPanelFactory.getAllProjects();

                    scope.activateProject = function (project) {
                        if (project.isSelected){
                            scope.showMainMenuGroupLayers();
                        }else{
                            mainMenuPanelFactory.setProjectById(project.id);
                        }
                    };
                }
            };
        }]);
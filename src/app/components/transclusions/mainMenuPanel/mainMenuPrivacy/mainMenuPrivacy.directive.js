angular.module('mainMenuPrivacy').directive('mainMenuPrivacy', ['isyTranslateFactory', 
    function (isyTranslateFactory) {
    return {
        templateUrl: 'components/transclusions/mainMenuPanel/mainMenuPrivacy/mainMenuPrivacy.html',
        restrict: 'A',
        link: function (scope) {
            
            scope.language = isyTranslateFactory.getCurrentLanguage();

        }
    };
}]);
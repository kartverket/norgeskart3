angular
  .module('isyTranslate')
  .controller('isyTranslateController', '$scope', '$translate', '$window', function ($scope, $translate, $window) {

    function setCurrentLanguage(lang) {
      $scope.currentLanguage = lang;
    }

    //console.log(setCurrentLanguage("en"));

    $scope.changeLanguage = function (lang) {
      $translate.use(lang).then(setCurrentLanguage);
    };

    //console.log(changeLanguage("en"));

    if ($window.ISY.currentLanguage && $window.ISY.currentLanguage.epiLanguage) {
      $translate.use($window.ISY.currentLanguage.epiLanguage).then(setCurrentLanguage);
    } else {
      $scope.currentLanguage = $translate.use();
    }
  });

angular.module('mainMenuFaq')
    .controller('mainMenuFaqController', ['$scope', 'isyTranslateFactory', 'mainAppService', '$http',
        function ($scope, isyTranslateFactory, mainAppService, $http) {

            $scope.initFaq = function(){
                $scope.spinnerIsVisible = true;
                $scope.failToLoadFaq = false;
                var currentLanguage = isyTranslateFactory.getCurrentLanguage();
                var languageId = currentLanguage.id || 'no';
                var url = mainAppService.generateFaqUrl(languageId);
                $http.get(url)
                .then(function(response){
                    $scope.faqItems = response.data;
                })
                .catch(function(response){
                    console.error('Faq error: ', response.status, response.data);
                    $scope.failToLoadFaq = true;
                })
                .finally(function(){
                    $scope.spinnerIsVisible = false;
                });
            };
            
        }
    ]);

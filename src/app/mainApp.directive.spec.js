describe ('mainApp test', function(){

    beforeEach(module('mainApp', 'mainAppBody.html'));
    var element,
        $scope;

    beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope.$new(true);
        element = $compile('<div mainapp></div>')($scope);
        $scope.$digest();
    }));

    it ('should be load', function(){
        expect($scope).toBeDefined();
    });

});

angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, factory) {
    
    $scope.medicines = [];
    
    
    $scope.keneth = function () {
        factory.getMedicines(2);
        $scope.medicines = factory.medicines;        
    }



})

.controller('ctrlUser', function ($scope, $state, factory) {
    $scope.user = {
        bien: 'hola'
    };

    $scope.hola = function () {

        factory.getUser(function (res) {
            $scope.user = res;
        });
    }

})
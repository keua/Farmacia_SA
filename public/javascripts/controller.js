angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, $window, factory) {
    
    $scope.medicines = [];
    $scope.data = {
        user: 201212124,
        pass: 1234
    };
    
    $scope.login = function (data) {
        if(!data.user || !data.pass)
            $window.alert('llene los campos');
        else{
            factory.login(data, function(res){
                if(res.name)$state.go('salePoint');                 
                else
                    $window.alert('Crendenciales incorrectas');
            });
        }
    }
})

.controller('ctrlUser', function ($scope, $state, factory) {
    $scope.user = {
        bien: 'hola'
    };
    console.log('estamos en salePoint');
    $scope.hola = function () {

        factory.getUser(function (res) {
            $scope.user = res;
        });
    }

})
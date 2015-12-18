angular.module('controllers', [])

.controller('ctrlHome', function($scope,$state, factory) {
    
        $scope.hola = function(){
            console.log('hola home');
        }
    
})

.controller('ctrlUser', function($scope, $state, factory) {
    $scope.user={bien: 'hola'};
    
    $scope.hola = function(){
        
        factory.getUser(function(res){
            $scope.user = res;
        });
    }
    
})
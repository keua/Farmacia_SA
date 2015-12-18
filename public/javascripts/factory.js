angular.module('factories', [])

.factory('factory', function($http) {
    var comun = {} ;
    comun.user = {};
    
    comun.getUser= function(callback){
        return $http.get('/user')
            .success(function(res){
                comun.user = res;
                callback(comun.user);
        });
    }
    
    return comun;
    
})
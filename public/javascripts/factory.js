angular.module('factories', [])

.factory('factory', function($http) {
    var comun = {} ;
    comun.medicines = [];
    comun.user = {};
    
    comun.getUser= function(callback){
        return $http.get('/user')
            .success(function(res){
                comun.user = res;
                callback(comun.user);
        });
    }
    
    comun.getMedicines = function(drugstore_id){
        return $http.get('/DrugstoreMedicine/'+drugstore_id)
            .success(function(res){
                angular.copy(res,comun.medicines);
                return comun.mediciness;
        });
    }
    
    return comun;
    
})
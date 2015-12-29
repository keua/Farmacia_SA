angular.module('factories', [])

.factory('factory', function($http) {
    var comun = {} ;
    comun.medicines = [];
    comun.employee = {};
    
    comun.login = function(data, callback){
        return $http.get('/Employee/'+data.user+'/'+data.pass)
            .success(function(res){
                comun.employee = res;
                callback(comun.employee);
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
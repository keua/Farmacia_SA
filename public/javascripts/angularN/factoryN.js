angular.module('factoriesN', [])

.factory('factoryN', function ($http, localStorageService) {
    var comun = {};
    comun.medicines = [];
    comun.operator = {};
    
    comun.drugstore = {};
    comun.orders = [];
    comun.listDrugstore = [];
    
    comun.login = function(email, password){
        console.log(email, password);
        localStorageService.set('operator', 1);
        return 1;
    }
    
     comun.logout = function () {
        comun.operator = {};
        localStorageService.set('operator', null);
    }
    
    comun.getOperator = function(){
        if (!comun.operator.name) {
            comun.operator = localStorageService.get('operator');
            return comun.operator;
        } else
            return comun.operator;
    }
     
    comun.getAllMedicines = function(){
        $http.get('http://192.168.43.152:8080/Health_Control_CallCenter/webresources/com.callcenter.medicamento')
        .success(function(res){
            angular.copy(res, comun.medicines);
        })
    }
    
    comun.getClient = function(nit){
        $http.get('some get direction')
            .success(function(res){
                return res;
        });
    }
    
    
    comun.createOrder = function(operator, client, total, medicines){
        var body = {
            usuario: operator,
            cliente: client.id,
            total: total
        }
        $http.post('some post to sale', body)
            .success(function(bill){
            console.log(bill);
            angular.forEach(medicines, function(medicine){
                medicine.factura = bill.id;
                $http.post('some post to detail to sale', medicine)
                    .success(function(res){
                          return res;
                });
            });
        });
    }
     
     

    return comun;
})
angular.module('factories', [])

.factory('factory', function ($http, localStorageService, $soap) {
    var comun = {};
    comun.medicines = [];
    comun.employee = {};
    comun.operator = {};
    comun.drugstore = {};
    comun.orders = [];
    comun.listDrugstore = [];  
    
    comun.soap = function(){
        //var base_url = "http://186.151.68.73:8080/Service1.asmx";
        //var base_url1 = "http://www.webservicex.net/BibleWebservice.asmx";
        //var soapParams = new SOAPClientParameters();
        
        //var base_url = "http://192.168.43.:8080/";
        
        /*$http.get('http://192.168.43.161:8000/productos-ws')
            .success(function(res){
                    console.log(res);            
            })
            .error(function(res){
                console.log(res);
        });*/
        
        //console.log($soap.post(base_url1,"GetBookTitles"));
        //console.log($soap.post(base_url,"consultar_clientes"));
		//var pl = new SOAPClientParameters();
		//SOAPClient.invoke(base_url, "consultar_clientes", pl, true, HelloWorld_callBack);
    }
    
    function HelloWorld_callBack(r)
	{
		console.log(r);
	}

    comun.login = function (data, callback) {
        return $http.get('/Employee/' + data.user + '/' + data.pass)
            .success(function (res) {
                comun.employee = res;
                comun.drugstore = res.drugstore;
                localStorageService.set('employee', res);
                localStorageService.set('drugstore', res.drugstore);
                callback(comun.employee);
            });
    }

    comun.getMedicines = function (drugstore_id) {
        return $http.get('/DrugstoreMedicine/' + drugstore_id)
            .success(function (res) {
                angular.copy(res, comun.medicines);
                return comun.medicines;
            });
    }

    comun.getMedicinesCallback = function (drugstore_id, callback) {
        return $http.get('/DrugstoreMedicine/' + drugstore_id)
            .success(function (res) {
                callback(res);
            });
    }

    comun.deleteMedicine = function (drugstore_id, medicine_id, index) {
        return $http.delete('/DrugstoreMedicine/' + drugstore_id + '/' + medicine_id)
            .success(function (res) {
                comun.medicines.splice(index, 1);
            });
    }

    ///DrugstoreMedicine/:drugstore_id/:medicine_id
    comun.updateMedicine = function (drugstore_id, medicine_id, body) {
        return $http.put('/DrugstoreMedicine/' + drugstore_id + '/' + medicine_id, body)
            .success(function (res) {
                var indice = comun.medicines.indexOf(medicine);
                comun.medicines[indice] = res
            });
    }

    comun.getDrugstore = function () {
        if (!comun.drugstore.id) {
            comun.drugstore = localStorageService.get('drugstore');
            return comun.drugstore;
        } else
            return comun.drugstore;
    }

    /*OBTENER EMPLEADO, DESLOGUEO Y FARMACIA*/
    comun.getEmployee = function (callback) {
        if (!comun.employee.name) {
            comun.employee = localStorageService.get('employee');
            return comun.employee;
        } else
            return comun.employee;
    }

    comun.logout = function () {
        comun.employee = {};
        comun.drugstore = {};
        localStorageService.set('employee', {});
        localStorageService.set('drugstore', {});
    }

    /*OBTENER CLIENTE*/
    comun.getClient = function (nit) {
        return $http.get('/Client/' + nit)
            .success(function (res) {
                return res;
            });
    }

    //'name', 'lastName', 'nit', 'phoneNumber', 'birth', 'address'
    comun.createClient = function (body) {
        return $http.post('/Client', body)
            .success(function (res) {
                return res;
            });
    }

    /*OBTENER TIPOS DE PAGO*/
    comun.getPayment = function () {
            return $http.get('/PaymentType')
                .success(function (res) {
                    return res;
                });
        }
        /* OBTENER TODAS LAS ORDENES */
    comun.getAllOrder = function () {
        return $http.get('/AllOrder')
            .success(function (res) {
                angular.copy(res, comun.orders);
                return res;
            });
    }

    /*CREAR FACTURAS*/
    comun.createBill = function (mount, client_id, employee_id, drugstore_id, medicines, payments) {
            console.log(medicines);
            console.log(employee_id);
            var body = {
                mount: mount,
                client_id: client_id,
                employee_id: employee_id,
                drugstore_id: drugstore_id,
                medicines: medicines,
                payments: payments
            }
            return $http.post('/Bill', body)
                .success(function (res) {
                    return res;
                });
        }
        /** --------------------------- Desarrollo JoseEstrada --------**/


    /*OBTENER Sucursales*/
    comun.getDrugstoreFromWS = function (callback) {
        return $http.get('/DrugstoreMedicine')
            .success(function (res) {
                return res;
            });
    }


    /*CREAR PEDIDOS*/
    comun.createOrder = function (totalAmount, isCanceled, dateEmited, client_id, operator_id, medicines, drugstore_id) {
            var body = {
                totalAmount: totalAmount,
                isCanceled: isCanceled,
                dateEmited: dateEmited,
                client_id: client_id,
                operator_id: operator_id,
                medicines: medicines,
                drugstore_id: drugstore_id
            }
            return $http.post('/Order', body)
                .success(function (res) {
                    return res;
                });
        }
        /*CALCENTER*/
    comun.loginCC = function (nombre, callback) {
        return $http.get('/Operator/' + nombre)
            .success(function (res) {
                comun.operator = res[0];
                localStorageService.set('operator', res[0]);
                callback(res[0]);
            });
    }

    /*OBTENER OPERADOR, DESLOGUEO Y FARMACIA*/
    comun.getOperator = function () {
        if (!comun.operator.id) {
            comun.operator = localStorageService.get('operator');
            return comun.operator;
        } else
            return comun.operator;
    }

    comun.logoutCC = function () {
        comun.employee = {};
        localStorageService.set('operator', {});
    }

    comun.deleteOrder = function (order, index) {
        return $http.delete('/OrderDelete/' + order.id)
            .success(function (res) {
                comun.orders.splice(index, 1);
            });
    }

    comun.details = function (order, callback) {
        return $http.get('/OrderMedicines/' + order.id)
            .success(function (res) {
                return callback(res);
            });
    }
    return comun;
})
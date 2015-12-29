angular.module('factories', [])

.factory('factory', function ($http, localStorageService) {
    var comun = {};
    comun.medicines = [];
    comun.employee = {};
    comun.drugstore = {};

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

    comun.deleteMedicine = function (drugstore_id, medicine_id) {
        return $http.delete('/DrugstoreMedicine/' + drugstore_id + '/' + medicine_id)
            .success(function (res) {
                console.log(res);
            });
    }

    ///DrugstoreMedicine/:drugstore_id/:medicine_id
    comun.updateMedicine = function (drugstore_id, medicine_id, body) {

        return $http.put('/DrugstoreMedicine/' + drugstore_id + '/' + medicine_id, body)
            .success(function (res) {
                console.log(res);
            });
    }

    comun.getEmployee = function () {
        if (!comun.employee.id) {
            comun.employee = localStorageService.get('employee');
            return comun.employee;
        } else
            return comun.employee;
    }

    comun.getDrugstore = function () {
        if (!comun.drugstore.id) {
            comun.drugstore = localStorageService.get('drugstore');
            return comun.drugstore;
        } else
            return comun.drugstore;
    }

    comun.logout = function () {
        comun.employee = {};
        comun.drugstore = {};
        localStorageService.set('employee', {});
        localStorageService.set('drugstore', {});
    }

    comun.getMedicines = function (drugstore_id) {
        return $http.get('/DrugstoreMedicine/' + drugstore_id)
            .success(function (res) {
                angular.copy(res, comun.medicines);
                return comun.mediciness;
            });
    }

    return comun;
})
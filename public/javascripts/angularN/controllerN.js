angular.module('controllersN', [])

.controller('ctrlIndexN', function ($scope, $state, $window, factoryN) {
    $scope.data = {};
    $scope.operator = factoryN.getOperator();
    
    if($scope.operator)
        $state.go('orderManagerN');
    
    $scope.login = function(){
        factoryN.login($scope.data.email, $scope.data.password);
        $state.go('orderManagerN');
    }
    
    
   
})

.controller('ctrlOrderN', function ($scope, $state, $window, factoryN, DTOptionsBuilder, DTColumnDefBuilder) {
    
     $scope.logout() = function(){
        factoryN.logout();
        $state.go('indexN');
    }
})

.controller('ctrlOrderManagerN', function ($scope, $state, $window, factoryN, DTOptionsBuilder, DTColumnDefBuilder) {
    
    var vm = this;

    vm.medicines = [];
    vm.listmedicine = [];
    
    $scope.operator = factoryN.getOperator();
    $scope.totoal = 0;
    
    $scope.data = {};
    $scope.drugstore = {};
    $scope.itemValue = [];
    
    if($scope.operator == null)
        $state.go('indexN');
    
    $scope.findClient = function () {
        if ($scope.data.client) {
            factory.getClient($scope.data.client).then(function (res) {
                console.log(res);
                if (res.status == 200 && res.data)
                    $scope.client = res.data;
                else
                    $window.alert('Cliente con NIT no identificado!!');
            });
        } else
            $window.alert('Ingrese el nit del cliente para realizar la compra');
    }
    
    $scope.sum = function (list, ls) {
            var total = 0;
            var i = 0;
            angular.forEach(list, function (item) {
                total += item * ls[i].PriceUnit;
                i++;
            });
            return total;
        }
    
    factoryN.getAllMedicines();
    vm.medicines = factoryN.medicines;
    /*OPCIONES DE TABLA--------------------------------*/
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3)
    ];

    //Definition of functions for salePoint view actions
    vm.addMedicine = addMedicine;
    vm.removeMedicine = removeMedicine;

    function addMedicine(medicine) {
        var indice = vm.listmedicine.indexOf(medicine);
        if (indice == -1) {
            vm.listmedicine.push(medicine);
        }
    }

    function removeMedicine(index, medicine) {
        vm.listmedicine.splice(index, 1);
    }
/*----------------------------------------------------*/    
    $scope.logout = function(){
        factoryN.logout();
        $state.go('indexN');
    }
   
})


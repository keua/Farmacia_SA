angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, $window, factory) {

    $scope.medicines = [];
    $scope.data = {
        user: 201212124,
        pass: 1234
    };

    if (factory.getEmployee().name)
        $state.go('salePoint');

    $scope.login = function (data) {
        if (!data.user || !data.pass)
            $window.alert('llene los campos');
        else {
            factory.login(data, function (res) {
                if (res.name) $state.go('salePoint');
                else
                    $window.alert('Crendenciales incorrectas');
            });
        }
    }
})

/*_________________________________________________________________________________________________________*/
.controller('ctrlSale', function ($scope, $state, $window, factory, DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    var drugstore = factory.getDrugstore();

    vm.medicines = [];
    vm.listmedicine = [];

    $scope.employee = factory.getEmployee();
    $scope.drugstore = drugstore;
    $scope.client = {};
    $scope.data = {};

    if (drugstore.id) {
        factory.getMedicines(drugstore.id);
        vm.medicines = factory.medicines;
    } else
        $state.go('index');

    $scope.logout = function () {
        factory.logout();
        $state.go('index');
    }

    $scope.goAdmin = function () {
        $state.go('admin');
    }

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



    //*****************************************************************************************************
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4)
    ];

    //Definition of functions for salePoint view actions
    vm.addMedicine = addMedicine;
    vm.removeMedicine = removeMedicine;

    function addMedicine(medicine) {
        var indice = vm.listmedicine.indexOf(medicine);
        if (indice == -1)
            vm.listmedicine.push(medicine);
    }

    function removeMedicine(index, medicine) {
        vm.listmedicine.splice(index, 1);
    }
})

.controller('ctrlAdmin', function ($scope, $state, $window, factory, DTOptionsBuilder, DTColumnDefBuilder) {

    var vm = this;
    var drugstore = factory.getDrugstore();

    vm.medicines = [];
    vm.listmedicine = [];

    $scope.employee = factory.getEmployee();
    $scope.data = {};

    if (drugstore.id) {
        factory.getMedicines(drugstore.id);
        vm.medicines = factory.medicines;
    } else
        $state.go('index');

    $scope.logout = function () {
            factory.logout();
            $state.go('index');
        }
        //*****************************************************************************************************
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4)
    ];

    vm.meicine2Add = _buildMedicine2Add(1);
    vm.addMedicine = addMedicine;
    vm.modifyMedicine = modifyMedicine;
    vm.removeMedicine = removeMedicine;

    function _buildMedicine2Add(id) {
        return {
            name: id,
            description: id,
            PriceUnit: id,
            quantity: id
        };
    }

    function addMedicine(med) {
        vm.medicines.push(angular.copy(vm.medicine2Add));
        vm.medicine2Add = _buildMedicine2Add(vm.medicine2Add.id + 1);
    }

    function modifyMedicine(index, medicine) {
        var indice = vm.medicines.indexOf(medicine);
        vm.medicines[indice].quantity = vm.medicine2Add.quantity;
        vm.medicines[indice].PriceUnit = vm.medicine2Add.PriceUnit;
        factory.updateMedicine(drugstore.id, medicine.id, vm.medicines[index]);
    }

    function removeMedicine(index, medicine) {
        factory.deleteMedicine(drugstore.id, medicine.id, index);
        vm.medicines.splice(index, 1);
    }
})
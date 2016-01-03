angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, $window, factory) {

    $scope.medicines = [];
    $scope.data = {
        user: 201212124,
        pass: 1234
    };
    
    if(factory.getEmployee().name)
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
    vm.medicines = [];
    vm.listmedicine = [];
    var drugstore = factory.getDrugstore();
    $scope.employee = factory.getEmployee();
    $scope.drugstore = drugstore;

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
    vm.dtColumnDefs1 = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5)
    ];

    vm.addMedicine = addMedicine;
    vm.removeMedicine = removeMedicine;

    function addMedicine(med) {

        vm.listmedicine.push(med);

    }

    function removeMedicine(index, medicine) {
        //factory.deleteMedicine(drugstore.id, medicine.id);
        vm.listmedicine.splice(index, 1);
    }

    $scope.goAdmin = function () {
        $state.go('admin');
    }

})

.controller('ctrlAdmin', function ($scope, $state, $window, factory, DTOptionsBuilder, DTColumnDefBuilder) {

    var vm = this;
    vm.medicines = [];
    var drugstore = factory.getDrugstore();
    $scope.employee = factory.getEmployee();

    if (drugstore.id) {
        factory.getMedicines(drugstore.id);
        vm.medicines = factory.medicines;
    } else
        $state.go('index');
    //****************************************************************************************************
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
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6)
    ];

    vm.medicine2Add = _buildMedicine2Add(1);
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

    function addMedicine() {
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

.controller('ctrlUser',function ($scope, $state, $window, factory, DTOptionsBuilder, DTColumnDefBuilder) {
    
    
})
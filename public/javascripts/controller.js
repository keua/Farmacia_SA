angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, $window, factory) {

    $scope.medicines = [];
    $scope.data = {
        user: 201212124,
        pass: 1234
    };

    if (factory.getEmployee())
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
    $scope.itemValue = [];

    if (drugstore.id) {
        factory.getMedicines(drugstore.id);
        vm.medicines = factory.medicines;
    } else
        $state.go('index');
    
    factory.getPayment().then(function(res) {
        $scope.data.paymentTypes = res.data;
    });
    
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
                if (res.status == 200 && res.data)
                    $scope.client = res.data;
                else
                    $window.alert('Cliente con NIT no identificado!!');
            });
        } else
            $window.alert('Ingrese el nit del cliente para realizar la compra');
    }

    $scope.sum = function(list, ls) {
        var total=0;
        var i = 0;        
          angular.forEach(list , function(item){
              total+= item*ls[i].PriceUnit;
              i++;
          });
          return total;
     }
     
    $scope.pay = function(itemValue,listmedicine){
        var total = 0;
        var i = 0;
        var fine = true;
        var payments = [];
        var medicines = [];
        //mount, client_id, employee_id, medicines, drugstore_id, payments
        if($scope.client.name){            
            if($scope.data.paymentType == null){
                $window.alert('Seleccione un tipo de pago válido!');
                return false;
            }       
            var type = JSON.parse( $scope.data.paymentType);
            angular.forEach(itemValue, function(item){
                //verifico que no sobrepase el stock de productos
                if(item > listmedicine[i].quantity){
                    fine = false;
                    return false;
                }
                aux = listmedicine[i];
                total += item * aux.PriceUnit;
                medicines.push(
                    {
                        medicine_id: aux.id,
                        quantity:    item
                    }
                );
                i++;
            });            
            
            payments.push({
                payment_id: type[0].id,
                mount: total,
                surcharge: total * type[0].surcharge
            });
            if(total > 0){
                if(fine){
                factory.createBill(total, $scope.client.id, $scope.employee.id, $scope.drugstore.id, listmedicine, payments).then(function(res) {
                    console.log(res);
                    vm.listmedicine = [];
                    $scope.client = {};
                    $scope.itemValue = [];
                    
                });
                }else
                    $window.alert('Algunas cantidades solicitads sobrepasan el stock de la tienda!!');
            }else
                $window.alert('El monto de compra no supera la cantidad de 1.00!!');
        }else
            $window.alert('Tiene que buscar un cliente para realizar el pago!!!');
        
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
    
    $scope.logout = function () {
            factory.logout();
            $state.go('index');
        }
    
    $scope.data = {};
    
    $scope.createClient = function(){
        factory.createClient($scope.data).then(function(res) {
            if(res.status == 200 && res.data){
                $window.alert('Cliente:  creado satisfactoriamente');
                $scope.data = {};
                
            }else
                $window.alert('Error al crear el nuevo cliente, verifique los datos!!');
                
        });        
    }
})
/*_________________________________________________________________________________________________________*/
.controller('ctrlOrder', function ($scope, $state, $window, factory, DTOptionsBuilder, DTColumnDefBuilder) {
    
    var vm = this;

    vm.medicines = [];
    vm.listmedicine = [];

    $scope.employee = factory.getEmployee();
    $scope.client = {};
    $scope.data = {};
    $scope.drugstore = {};
    $scope.itemValue = [];
    factory.getDrugstoreFromWS().then(function(res) {
        var drugstores = res.data;
        angular.forEach(drugstores, function(drugstore){
                if (drugstore.id) {
                    factory.getMedicines(drugstore.id).then(function (resp)
                        {                    
                            angular.forEach(resp.data, 
                            function(medicine)
                            {
                                Object.prototype.push = function( key, value ){
                                                             this[ key ] = value;
                                                             //console.log( this );
                                                             return this;
                                                        }
                               //medicine.push( "drugstore_id", drugstore.id );                                
                                medicine.push( "drugstore_name", drugstore.name );
                                vm.medicines.push(medicine);
                            })

                        });
                } else
                    $state.go('index');
              
            });
    });
    factory.getDrugstoreFromWS().then(function(res) 
    {
        $scope.data.DrugstoreTypes = res.data;
    });
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
                if (res.status == 200 && res.data)
                    $scope.client = res.data;
                else
                    $window.alert('Cliente con NIT no identificado!!');
            });
        } else
            $window.alert('Ingrese el nit del cliente para realizar la compra');
    }

    $scope.sum = function(list, ls) {
        var total=0;
        var i = 0;        
          angular.forEach(list , function(item){
              total+= item*ls[i].PriceUnit;
              i++;
          });
          return total;
     }
     
    $scope.pay = function(itemValue,listmedicine){
        var total = 0;
        var i = 0;
        var fine = true;
        var payments = [];
        var medicines = [];
        //mount, client_id, employee_id, medicines, drugstore_id, payments
        if($scope.client.name)
        {            
            if($scope.data.Drugstore == null){
                $window.alert('Seleccione una Sucursal de Entrega!');
                return false;
            } 
            var type = JSON.parse( $scope.data.Drugstore);      
            angular.forEach(itemValue, function(item)
            {
                if(item > listmedicine[i].quantity)
                {
                    fine = false;
                    return false;
                }
                aux = listmedicine[i];
                total += item * aux.PriceUnit;
                medicines.push(
                    {
                        medicine_id: aux.id,
                        quantity:    item
                    }
                );
                i++;
            });            
            if(total > 0)
            {
                if(fine)
                {
                    var dateNow = new Date();///.format('yyyy-MM-dd');//$filter('date')(new Date(), 'yyyy-MM-dd');
                    //totalAmount, isCanceled, dateEmited, client_id, operator_id, medicines,drugstore_id
                    factory.createOrder(total,false, dateNow, $scope.client.id, $scope.employee.id, medicines, type.id).then(function(salida)
                        {    
                            //console.log(salida);                            
                            vm.listmedicine = [];
                            $scope.client = {};
                            $scope.itemValue = [];
                        });
                }else
                    $window.alert('Algunas cantidades solicitads sobrepasan el stock de la tienda!!');
            }else
                $window.alert('El monto del pedido no supera la cantidad de 1.00!!');
        }else
            $window.alert('Debe ingresar un cliente para generar el pedido!!!');
        
    }

    //*****************************************************************************************************
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5)
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
angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'controllersN', 'factoriesN','datatables', 'LocalStorageModule', 'angularSoap'])

.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = "application/json";
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/index.html',
            controller: 'ctrlHome'
        })
        .state('indexCC', {
            url: '/indexCC',
            templateUrl: 'views/indexCC.html',
            controller: 'ctrlIndexCC'
        })
        .state('salePoint', {
            url: '/salePoint',
            templateUrl: 'views/salePoint.html',
            controller: 'ctrlSale as sale'
        })
        .state('orderManager', {
            url: '/orderManager',
            templateUrl: 'views/orderManager.html',
            controller: 'ctrlOrderManager as theOrder'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/adminMedicine.html',
            controller: 'ctrlAdmin as ShowCaseAdmin'
        })
        .state('UserRegister', {
            url: '/UserRegister',
            templateUrl: 'views/UserRegister.html',
            controller: 'ctrlUser as ShowCaseUser'
        })
        .state('Order', {
            url: '/Order',
            templateUrl: 'views/Order.html',
            controller: 'ctrlOrder as order'
        })
        /*CONSUMO DE LOS NOGUERAOS*/
        .state('indexN', {
            url: '/indexN',
            templateUrl: 'views/nogueras/indexN.html',
            controller: 'ctrlIndexN'
        })
        .state('OrderN', {
            url: '/OrderN',
            templateUrl: 'views/nogueras/OrderN.html',
            controller: 'ctrlOrderN as orderN'
        })
        .state('orderManagerN', {
            url: '/orderManagerN',
            templateUrl: 'views/nogueras/orderManagerN.html',
            controller: 'ctrlOrderManagerN as orderManagerN'
        })



    $urlRouterProvider.otherwise('index');
})
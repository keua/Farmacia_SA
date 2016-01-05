angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'datatables', 'LocalStorageModule'])

.config(function ($stateProvider, $urlRouterProvider) {
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
        });


    $urlRouterProvider.otherwise('index');
})
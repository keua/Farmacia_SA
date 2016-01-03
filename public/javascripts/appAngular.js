angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'datatables', 'LocalStorageModule'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/index.html',
            controller: 'ctrlHome'
        })
        .state('salePoint', {
            url: '/salePoint',
            templateUrl: 'views/salePoint.html',
            controller: 'ctrlSale as sale'
        })
        .state('orderManager', {
            url: '/orderManager',
            templateUrl: 'views/orderManager.html',
            controller: 'ctrlOrder as theOrder'
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
        });


    $urlRouterProvider.otherwise('index');
})
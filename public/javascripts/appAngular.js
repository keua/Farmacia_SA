angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'datatables','LocalStorageModule'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/index.html',
            controller: 'ctrlHome'
        })
        .state('salePoint', {
            url: '/salePoint',
            templateUrl: 'views/salePoint.html',
            controller: 'ctrlSale as showCase'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/adminMedicine.html',
            controller: 'ctrlAdmin'
        })
        .state('indexCC', {
            url: '/indexCC',
            templateUrl: 'views/indexCC.html',
            controller: 'ctrlHomeCC'
        })

        .state('HomeCC', {
            url: '/HomeCC',
            templateUrl: 'views/HomeCC.html',
            controller: 'ctrlAdminCC'
        });
    $urlRouterProvider.otherwise('index');
})

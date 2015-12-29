angular.module('appChaplist', ['ui.router', 'controllers', 'factories','LocalStorageModule'])

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
            controller: 'ctrlUser'
        });

    $urlRouterProvider.otherwise('index');
})
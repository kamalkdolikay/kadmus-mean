angular
    .module('user', ['ui.router'])
    .controller('main', main)
    .config(config)

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'main'
        })
        .state('home1', {
            url: '/dashoboard',
            templateUrl: 'home.html',
            controller: 'main'
        })

    $urlRouterProvider.otherwise('home')
    $locationProvider.html5Mode(true)
}

function main($scope, $http) {
    $scope.user = "hello";
}
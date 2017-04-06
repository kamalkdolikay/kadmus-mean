angular
    .module('dashboard', ['ui.router'])
    .controller('main', main)
    .config(config)

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/dashboard/user',
            templateUrl: 'home.html',
            controller: 'main'
        })

    $urlRouterProvider.otherwise('home')
    $locationProvider.html5Mode(true)
}

function main($scope, $http) {
    $scope.user = "hello";
}
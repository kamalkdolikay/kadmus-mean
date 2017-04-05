var app = angular.module('dashboard', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/dasboard/home',
            templateUrl: '/home.html',
            controller: 'main'
        })

    $urlRouterProvider.otherwise('home')
    $locationProvider.html5mode(true)

})

app.controller('main', function($scope, $http) {
    $scope.user = "hello";
    $scope.abc = function() {
        $http.get('/posts')
    }

})
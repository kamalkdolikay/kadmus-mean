var app = angular.module('user', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'main'
        })

    $urlRouterProvider.otherwise('home')

    $locationProvider.html5Mode(true)
})

app.controller('main', function($scope, $http) {
    $scope.user = "hello";
    $scope.abc = function() {
        $http.get('/posts')
    }

})
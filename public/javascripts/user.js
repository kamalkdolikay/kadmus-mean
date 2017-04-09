angular
    .module('user', ['ui.router'])
    .controller('main', main)
    .config(config)
    .factory('auth', auth)

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

function auth($window, $http) {
    var auth = {}
    auth.saveToken = function(token) {
        $window.localStorage['you-dont-own-me'] = token;
    };

    auth.getToken = function() {
        return $window.localStorage['you-dont-own-me'];
    };

    auth.logIn = function(user) {
        return $http.post('/login', user).then(function(data) {
            console.log(data);
            auth.saveToken(data.data.token);
        });
    };

    auth.logInJWT = function(user) {
        return $http.post('/login-jwt', user).then(function(data) {
            console.log(data);
            auth.saveToken(data.data.token);
        });
    };

    auth.currentUser = function() {
        var token = auth.getToken();
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload;
        }
    };

    auth.logOut = function() {
        $window.localStorage.removeItem('you-dont-own-me');
    };

    return auth;
}

function main($scope, $http, auth, $state) {
    $scope.user = "hello";
    $scope.logOut = auth.logOut;
    $scope.add = function() {
        auth.logIn($scope.form).catch(function(error) {
            console.log("error ", error)
            $scope.error = error;
        }).then(function() {
            $state.go('home1');
            console.log("getToken", auth.currentUser());
        });
    };

    $scope.addjwt = function() {
        auth.logInJWT($scope.form).catch(function(error) {
            console.log("error ", error);
            $scope.error = error;
        }).then(function() {
            $state.go('home1');
            console.log("getToken", auth.currentUser());
        });
    };
}
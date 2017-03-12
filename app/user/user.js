'use strict';

angular.module('TaskOverflowApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: 'user/user.html',
                controller: 'UserCtrl'
            })
            .when('/user/show/:userid*', {
                templateUrl: '/user/show.html',
                controller: 'UserShowCtrl'
            })
        ;
    }])

    .controller('UserCtrl', function ( $scope, $location, $http ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get('http://localhost:8080/user').
        then(function(response) {
            $scope.users = response.data;
        });
    })

    .controller('UserShowCtrl', function ( $scope, $location, $http, $routeParams ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get('http://localhost:8080/user/show/'+$routeParams.userid).
        then(function(response) {
            $scope.user = response.data;
        });
    });
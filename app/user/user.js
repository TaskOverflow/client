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
            .when('/user/edit/:profileid*', {
                templateUrl: '/user/edit.html',
                controller: 'UserEditCtrl'
            })
        ;
    }])

    .controller('UserCtrl', function ( $scope, $location, $http, Session, $rootScope ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get($rootScope.SERVER_URL+'user').
        then(function(response) {
            $scope.users = response.data;
        });
    })

    .controller('UserShowCtrl', function ( $scope, $location, $http, $routeParams, $window, $route, Session, $rootScope ) {
        $scope.bob = "Je m'appelle Bob.";

        $scope.isCurrentUser = function() {
            return Session.isCurrentUser($scope.user);
        };

        $http.get($rootScope.SERVER_URL+'user/show/'+$routeParams.userid).
        then(function(response) {
            $scope.user = response.data;
        });

        $scope.ban = function() {
            $http({
                url: $rootScope.SERVER_URL+'user/ban',
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                data : {
                    id: $scope.user.id,
                    username: $scope.user.username
                }
            }).then(function success(response) {
                $route.reload();
            }, function error(response) {

            });
        };

        $scope.hasRole = function(role) {
            return Session.hasRole(role);
        };
    })

    .controller('UserEditCtrl', function ( $scope, $location, $http, $routeParams, Session, $route, $window, $rootScope ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get($rootScope.SERVER_URL+'profile/show/'+$routeParams.profileid).
        then(function(response) {
            $scope.profile = response.data;
            $scope.user = {username: response.data.username};
        });

        $scope.isCurrentUser = function() {
            return Session.isCurrentUser($scope.user);
        };

        $scope.save = function() {
            $http({
                url: $rootScope.SERVER_URL+'profile/update',
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                data : {
                    id: $scope.profile.id,
                    firstname: $scope.profile.firstname,
                    lastname: $scope.profile.lastname,
                    email: $scope.profile.email,
                    image: $scope.profile.image,
                    username: $scope.user.username
                }
            }).then(function success(response) {
                $location.path('/user/show/'+$scope.profile.userid);
            }, function error(response) {
            });
        };
    });
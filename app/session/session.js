'use strict';

angular.module('TaskOverflowApp.session', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: '/session/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'session'
    })
    .when('/register', {
        templateUrl: '/session/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'session'
    })
    ;
}])

    .controller('LoginCtrl', function ( $scope, $location, $http, $window, $rootScope ) {
        var session = this;
        session.login = function() {
            $http.post($rootScope.SERVER_URL+'api/login', {
                username: session.username,
                password: session.password
            }).then(function success(response) {
                $window.sessionStorage.token = response.data.access_token;
                $window.sessionStorage.username = response.data.username;
                $window.sessionStorage.roles = response.data.roles;
                $window.sessionStorage.isLog = true;
                $http.post($rootScope.SERVER_URL+'user/userid', {
                    username: response.data.username
                }).then(function (response) {
                    $window.sessionStorage.userid = response.data.id;
                    $window.location.href ='/';
                });
            }, function error(response) {

            });
        }
    })
    .controller('RegisterCtrl', function ( $scope, $location, $http, $window, $rootScope ) {
        var session = this;
        session.register = function() {
            $http.post($rootScope.SERVER_URL+'user/save', {
                username: session.username,
                password: session.password
            }).then(function success(response) {
                $window.location.href = '/';
            }, function error(response) {

            });
        }
    })
    .controller('SessionCtrl', function ( $scope, $location, $http, $window, $rootScope, $interval, Features ) {
        var session = this;
        var services = ['question','user','tag','badge'];

        for(var i = 0 ; i < services.length ; ++i)
            Features.check(services[i]);

        $interval( function(services){
            console.log("Service availability update");
            for(var i = 0 ; i < services.length ; ++i)
                Features.check(services[i]);

        }.bind(null,services), 5000);

        session.userid = function () {
            return $window.sessionStorage.userid == undefined ? null : $window.sessionStorage.userid;
        };
        session.username = function () {
            return $window.sessionStorage.username == undefined ? null : $window.sessionStorage.username;
        };
        session.token = function () {
            return $window.sessionStorage.token == undefined ? null : $window.sessionStorage.token;
        };
        session.roles = function () {
            return $window.sessionStorage.roles == undefined ? null : $window.sessionStorage.roles;
        };
        session.isLog = function(){
            return $window.sessionStorage.isLog == undefined ? false : $window.sessionStorage.isLog=="true";
        };

        session.logout = function() {
            $window.sessionStorage.token = null;
            $window.sessionStorage.username = null;
            $window.sessionStorage.roles = null;
            $window.sessionStorage.userid = null;
            $window.sessionStorage.isLog = false;
            $window.location.href ='/';
        };

        session.isAvailable = function(feature) {
            return Features.isAvailable(feature);
        };

        session.isAvailable = function(feature) {
            return Features.isAvailable(feature);
        };

    })

    .service('Session', function( $location, $http, $window ){

        this.isCurrentUser = function(user) {
            return user != undefined && $window.sessionStorage.username == user.username;
        };

        this.getCurrentUser = function() {
            return $window.sessionStorage.username;
        };

        this.hasRole = function(role) {
            return $window.sessionStorage.roles.indexOf(role)!=-1;
        };

        this.isLoggedIn = function() {
            return $window.sessionStorage.isLog==undefined ? false : $window.sessionStorage.isLog=="true" ? true : false;
        };

    });
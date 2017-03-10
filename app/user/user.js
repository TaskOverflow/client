'use strict';

angular.module('TaskOverflowApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: 'user/user.html',
        controller: 'UserCtrl'
    });
}])

.controller('UserCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/user').
    then(function(response) {
        $scope.users = response.data;
    });
});
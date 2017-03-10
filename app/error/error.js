'use strict';

angular.module('TaskOverflowApp.error', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/error', {
        templateUrl: 'error/error.html',
        controller: 'ErrorCtrl'
    });
}])

.controller('ErrorCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/error').
    then(function(response) {
        $scope.errors = response.data;
    });
});
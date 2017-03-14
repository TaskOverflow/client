'use strict';

angular.module('TaskOverflowApp.error', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/error', {
        templateUrl: 'error/error.html',
        controller: 'ErrorCtrl'
    });
}])

.controller('ErrorCtrl', function ( $scope, $location, $http, $rootScope ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get($rootScope.SERVER_URL+'error').
    then(function(response) {
        $scope.errors = response.data;
    });
});
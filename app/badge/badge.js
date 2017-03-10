'use strict';

angular.module('TaskOverflowApp.badge', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/badge', {
        templateUrl: 'badge/badge.html',
        controller: 'BadgeCtrl'
    });
}])

.controller('BadgeCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/badge').
    then(function(response) {
        $scope.badges = response.data;
    });
});
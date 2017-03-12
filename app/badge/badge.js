'use strict';

angular.module('TaskOverflowApp.badge', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/badge', {
            templateUrl: 'badge/badge.html',
            controller: 'BadgeCtrl'
        })
        .when('/badge/show/:badgeid*', {
            templateUrl: '/badge/show.html',
            controller: 'BadgeShowCtrl'
        })
    ;
}])

.controller('BadgeCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/badge').
    then(function(response) {
        $scope.badges = response.data;
    });
})

.controller('BadgeShowCtrl', function ( $scope, $location, $http, $routeParams ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/badge/show/'+$routeParams.badgeid).
    then(function(response) {
        $scope.badge = response.data;
    });
});
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

.controller('BadgeCtrl', function ( $scope, $location, $rootScope ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get($rootScope.SERVER_URL+'badge').
    then(function(response) {
        $scope.badges = response.data;
    });
})

.controller('BadgeShowCtrl', function ( $scope, $location, $http, $routeParams, $rootScope ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get($rootScope.SERVER_URL+'badge/show/'+$routeParams.badgeid).
    then(function(response) {
        $scope.badge = response.data;
    });
});
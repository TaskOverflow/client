'use strict';

angular.module('TaskOverflowApp.tag', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tag', {
        templateUrl: 'tag/tag.html',
        controller: 'TagCtrl'
    });
}])

.controller('TagCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/tag').
    then(function(response) {
        $scope.tags = response.data;
    });
});
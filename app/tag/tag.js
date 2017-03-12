'use strict';

angular.module('TaskOverflowApp.tag', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/tag', {
        templateUrl: 'tag/tag.html',
        controller: 'TagCtrl'
    })
    .when('/tag/show/:tagid*', {
        templateUrl: '/tag/show.html',
        controller: 'TagShowCtrl'
    })
    ;
}])

.controller('TagCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $scope.tags1 = [];
    $scope.tags2 = [];

    $http.get('http://localhost:8080/tag').
    then(function(response) {
        $scope.tags = response.data;
        var side = false;
        for(var t = 0 ; t <  $scope.tags.length ; t++) {
            if(side)
                $scope.tags2.push($scope.tags[t]);
            else
                $scope.tags1.push($scope.tags[t]);
            side = !side;
        }
    });
})

.controller('TagShowCtrl', function ( $scope, $location, $http, $routeParams ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/tag/show/'+$routeParams.tagid).
    then(function(response) {
        $scope.tag = response.data;
    });
});
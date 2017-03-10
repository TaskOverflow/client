/**
 * Created by begarco on 08/02/2017.
 */

var app = angular.module('TaskOverflowApp');

app.controller('ErrorCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle 404."
});
/**
 * Created by begarco on 08/02/2017.
 */

var app = angular.module('TaskOverflowApp');

app.controller('QuestionCtrl', function ( $scope, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $http.get('http://localhost:8080/question').
    then(function(response) {
        $scope.questions = response.data;
    });
});
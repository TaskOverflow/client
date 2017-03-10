'use strict';

angular.module('TaskOverflowApp.question', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/question', {
        templateUrl: 'question/question.html',
        controller: 'QuestionCtrl',
        controllerAs: 'qctrl'
    });
}])

.controller('QuestionCtrl', function ( $scope, $translate, $location, $http ) {
    $scope.bob = "Je m'appelle Bob.";

    $scope.questions = null;
    $scope.carre = [1,2,3,4];
    $scope.carre[1] = 3;

    $http.get('http://localhost:8080/question').
    then(function(response) {
        $scope.questions = response.data;
        console.log($scope.questions);
    });

    this.showme = function() {
        console.log($scope.questions);
    }
});
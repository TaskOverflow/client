'use strict';

angular.module('TaskOverflowApp.question', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/question', {
                templateUrl: 'question/question.html',
                controller: 'QuestionCtrl'
            })
            .when('/question/show/:questionid*', {
                templateUrl: '/question/show.html',
                controller: 'QuestionShowCtrl'
            })
            .when('/question/editmessage/:messageid*', {
                templateUrl: '/question/editmessage.html',
                controller: 'MessageEditCtrl'
            })
        ;
    }])

    .controller('QuestionCtrl', function ( $scope, $location, $http ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get('http://localhost:8080/question').
        then(function(response) {
            $scope.questions = response.data;
        });
    })

    .controller('QuestionShowCtrl', function ( $scope, $location, $http, $routeParams ) {
        $scope.bob = "Je m'appelle Bob.";

        $scope.addCom = function() {
            console.log("commentaire ajouté");
            // "/comMessage/create?params="['questionId':a.question.id,'messageId':a.id]"
        };

        $http.get('http://localhost:8080/question/show/'+$routeParams.questionid).
        then(function(response) {
            $scope.question = response.data;
        });
    })

    .controller('MessageEditCtrl', function ( $scope, $location, $http ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get('http://localhost:8080/myMessage/edit/'+$routeParams.questionid).
        then(function(response) {
            $scope.questions = response.data;
        });
    })

;
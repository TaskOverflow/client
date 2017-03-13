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
        $scope.questions = [];

        $http.get('http://localhost:8080/question').
        then(function(response) {
            $scope.questions = response.data;
        });
    })

    .controller('QuestionShowCtrl', function ( $scope, $location, $http, $routeParams, $window, Session, $route ) {
        $scope.bob = "Je m'appelle Bob.";
        $scope.text = "";

        $scope.addCom = function() {
            console.log("commentaire ajouté");
            // "/comMessage/create?params="['questionId':a.question.id,'messageId':a.id]"
        };

        $http.get('http://localhost:8080/question/show/'+$routeParams.questionid).
        then(function(response) {
            $scope.question = response.data;
        });

        $scope.isCurrentUser = function() {
            return $scope.question!=undefined && Session.isCurrentUser($scope.question.user);
        };

        $scope.getCurrentUser = function() {
            return Session.getCurrentUser();
        };

        $scope.solve = function() {
            $http({
                url: 'http://localhost:8080/question/solve',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                data : {
                    qId: $scope.question.id
                },
                params : {
                    qId: $scope.question.id
                }
            }).then(function success(response) {
                $route.reload();
            }, function error(response) {
            });
        };

        $scope.addAnswer = function() {

            console.log($scope.question.text);
            $http({
                url: 'http://localhost:8080/answerMessage/add',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                data : {
                    question: {
                        id: $scope.question.id
                    },
                    user: {
                        id: $window.sessionStorage.userid
                    },
                    text: $scope.question.text
                },
                params : {
                    qId: $scope.question.id,
                    uId: $window.sessionStorage.userid,
                    text: $scope.question.text
                }
            }).then(function success(response) {
                console.log(response);
                $route.reload();
            }, function error(response) {
                console.log(response);
            });
        };

        $scope.isLoggedIn = function() {
            return Session.isLoggedIn();
        };


    })

    .controller('MessageEditCtrl', function ( $scope, $location, $http ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get('http://localhost:8080/myMessage/edit/'+$routeParams.questionid).
        then(function(response) {
            $scope.questions = response.data;
        });
    })

;
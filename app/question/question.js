'use strict';

angular.module('TaskOverflowApp.question', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/question', {
                templateUrl: 'question/question.html',
                controller: 'QuestionCtrl'
            })
            .when('/question/create', {
                templateUrl: '/question/create.html',
                controller: 'QuestionCreateCtrl'
            })
            .when('/question/show/:questionid*', {
                templateUrl: '/question/show.html',
                controller: 'QuestionShowCtrl'
            })
            .when('/question/editmessage/:messageid*', {
                templateUrl: '/question/edit.html',
                controller: 'MessageEditCtrl'
            })
        ;
    }])

    .controller('QuestionCtrl', function ( $scope, $location, $http, $rootScope, Features ) {
        $scope.bob = "Je m'appelle Bob.";
        $scope.questions = [];

        $http.get($rootScope.SERVER_URL+'question').
        then(function(response) {
            $scope.questions = response.data;
        });

        $scope.isAvailable = function(feature) {
            return Features.isAvailable(feature);
        };
    })

    .controller('QuestionCreateCtrl', function ( $scope, $location, $http, $routeParams, $window, Session, $route, $rootScope ) {
        $scope.bob = "Je m'appelle Bob.";

        $scope.create = function () {

            function selectedTags(elt) {
                return elt.selected;
            }

            var tags = $scope.tagList.filter(selectedTags);

            $http({
                url: $rootScope.SERVER_URL + 'question/save',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $window.sessionStorage.token
                },
                data: {
                    question : {
                        title: $scope.question.title,
                        tags : tags
                    }
                },
                params: {
                    username : Session.getCurrentUser(),
                    content : $scope.question.content
                }
            }).then(function success(response) {
                $location.path('/question/show/'+response.data.id);
            }, function error(response) {
                console.log(response);
            });
        };

        $http.get($rootScope.SERVER_URL + 'question/show/0').then(function (response) {
            $scope.question = response.data;
        });

        $http.get($rootScope.SERVER_URL + 'tag').then(function (response) {
            $scope.tagList = response.data;
            for(var t = 0 ; t < $scope.tagList.length ; t++) {
                $scope.tagList[t].selected=false;
            }
        });
    })

    .controller('QuestionShowCtrl', function ( $scope, $location, $http, $routeParams, $window, Session, $route, $rootScope ) {
        $scope.bob = "Je m'appelle Bob.";
        $scope.text = "";

        $scope.addCom = function(text,mess) {
            $http({
                url: $rootScope.SERVER_URL+'comMessage/add',
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                data : {
                    qId: $scope.question.id,
                    uId: $window.sessionStorage.userid,
                    text: text
                },
                params : {
                    qId: $scope.question.id,
                    uId: $window.sessionStorage.userid,
                    mId: mess,
                    content: text
                }
            }).then(function success(response) {
                $route.reload();
            }, function error(response) {
                console.log(response);
            });
        };

        $http.get($rootScope.SERVER_URL+'question/show/'+$routeParams.questionid).
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
                url: $rootScope.SERVER_URL+'question/solve',
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

        $scope.vote = function(qId, mId, inc) {
            $http({
                url: $rootScope.SERVER_URL+'myMessage/vote',
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                params : {
                    qId: $scope.question.id,
                    mId: mId,
                    inc: inc
                }
            }).then(function success(response) {
                $route.reload();
            }, function error(response) {
            });
        };

        $scope.addAnswer = function() {

            $http({
                url: $rootScope.SERVER_URL+'answerMessage/add',
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
                $route.reload();
            }, function error(response) {
                console.log(response);
            });
        };

        $scope.isLoggedIn = function() {
            return Session.isLoggedIn();
        };


    })

    .controller('MessageEditCtrl', function ( $scope, $location, $http, $rootScope, $routeParams, $window ) {
        $scope.bob = "Je m'appelle Bob.";

        $http.get($rootScope.SERVER_URL+'myMessage/edit/'+$routeParams.messageid).
        then(function(response) {
            $scope.message = response.data;
        });

        $scope.saveMessage = function() {
            console.log("coucou");
            $http({
                url: $rootScope.SERVER_URL+'myMessage/update',
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + $window.sessionStorage.token
                },
                data : {
                    id: $scope.message.id,
                    content: $scope.message.content
                }
            }).then(function success(response) {
                $location.path('/question/show/'+$scope.message.questionid);
            }, function error(response) {
                console.log(response);
            });

        };

    })

;
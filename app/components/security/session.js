/**
 * Created by begarco on 10/03/2017.
 */

'use strict';

angular.module('TaskOverflowApp.security', ['ngRoute'])

.service('SessionService', function ( $scope, $translate, $location, $http ) {

    this.username = null;
    this.userrole = null;
    this.usertoken = null;

    this.login = function () {

    };

    this.logout = function () {

    };

    this.isLoggedIn = function () {

    };

    this.isAuthorized = function (authorizedRole) {
        return authorizedRole == this.userrole;
    };

});
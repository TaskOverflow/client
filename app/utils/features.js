'use strict';

angular.module('TaskOverflowApp.utils', ['ngRoute'])

    .service('FeatureFlipping', function( $location, $http, $window, $rootScope ){

        this.checked = {};

        this.isOk = function(feature) {
            if(this.checked[feature]==undefined)
                this.check(feature);
            return $rootScope.FEATURES[feature] != undefined && $rootScope.FEATURES[feature].status;
        };
        
        this.check = function(feature) {
            this.checked[feature] = true;
            $http.get($rootScope.CONF_SERVER_URL+feature)
                .then(
                    function success(response) {
                        $rootScope.FEATURES[feature] = {
                            name: feature,
                            status: response.data.status=="ok"
                        }
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
        };

        this.debug = function () {
            console.log($rootScope.FEATURES);
        }

    })

    .service('CircuitBreaker', function( $location, $http, $window, $rootScope ){

        this.hello = function(user) {
            return user != undefined && $window.sessionStorage.username == user.username;
        };

    })

    .service('GracefulDegradation', function( $location, $http, $window, $rootScope ){

        this.hello = function(user) {
            return user != undefined && $window.sessionStorage.username == user.username;
        };

    })

    .service('Features', function( $location, $http, $window, $rootScope, FeatureFlipping, CircuitBreaker, GracefulDegradation ){

        this.isAvailable = function(feature) {
            return FeatureFlipping.isOk(feature);
        };

    })

;
'use strict';

angular.module('TaskOverflowApp.utils', ['ngRoute'])

    /**
    * Service that manages Feature Flipping
    */
    .service('FeatureFlipping', function( $location, $http, $window, $rootScope ){

        this.checked = {};

        /**
         * Give availability of a feature
         * @param feature
         * @returns {boolean} true if feature is ON
         */
        this.isOk = function(feature) {
            return $rootScope.FEATURES[feature] != undefined && $rootScope.FEATURES[feature].status;
        };

        /**
         * Check feature availability on configuration server
         * @param feature
         */
        this.check = function(feature) {
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
            this.checked[feature] = true;
        };

    })

    /**
     * Service that manages Circuit Breaker
     */
    .service('CircuitBreaker', function( $location, $http, $window, $rootScope ){

        this.checked = {};
        this.threshold = 3;

        /**
         * Give availability of a feature
         * @param feature
         * @returns {boolean} true if Circuit Breaker allow client to use a feature
         */
        this.isOk = function(feature) {
            return $rootScope.HEALTHCHECK[feature] == undefined ? true : $rootScope.HEALTHCHECK[feature].state!='OUVERT';
        };

        /**
         * Determine the state of the circuit for a feature
         * @param feature
         */
        this.transition = function(feature) {

            if($rootScope.HEALTHCHECK[feature]!=undefined) {
                if($rootScope.HEALTHCHECK[feature].timeout) {
                    switch ($rootScope.HEALTHCHECK[feature].state) {
                        case 'PASSANT':
                            if($rootScope.HEALTHCHECK[feature].error >= this.threshold)
                                this.toOuvert(feature);
                            break;
                        case 'OUVERT':
                            break;
                        case 'SEMIOUVERT':
                            if($rootScope.HEALTHCHECK[feature].error > 0)
                                this.toOuvert(feature);
                            else if($rootScope.HEALTHCHECK[feature].success >= this.threshold)
                                this.toPassant(feature);
                            break;
                    }
                }
            }

        };

        /**
         * Go in 'Passant' mode
         * @param feature
         */
        this.toPassant = function (feature) {
            $rootScope.HEALTHCHECK[feature].state = 'PASSANT';
            $rootScope.HEALTHCHECK[feature].error = 0;
            $rootScope.HEALTHCHECK[feature].success = 0;
            $rootScope.HEALTHCHECK[feature].timeout = true;
        };

        /**
         * Go in 'Ouvert' mode
         * @param feature
         */
        this.toOuvert = function (feature) {
            $rootScope.HEALTHCHECK[feature].state = 'OUVERT';
            $rootScope.HEALTHCHECK[feature].error = 0;
            $rootScope.HEALTHCHECK[feature].success = 0;
            $rootScope.HEALTHCHECK[feature].timeout = false;
            this.toSemiOuvert(feature);
        };

        /**
         * Go in 'Semi-Ouvert' mode
         * @param feature
         */
        this.toSemiOuvert = function (feature) {
            setTimeout(function() {
                $rootScope.HEALTHCHECK[feature].timeout = true;
                $rootScope.HEALTHCHECK[feature].state = 'SEMIOUVERT';
            }, 20000);
        };

        /**
         * Check feature availability on server
         * @param feature
         */
        this.check = function(feature) {
            this.checked[feature] = true;
            if($rootScope.HEALTHCHECK[feature]==undefined || ($rootScope.HEALTHCHECK[feature]!=undefined && $rootScope.HEALTHCHECK[feature].timeout==true)) {
                $http.get($rootScope.SERVER_URL + feature + '/healthcheck')
                    .then(
                        function success(response) {
                            $rootScope.HEALTHCHECK[feature] = {
                                name: feature,
                                success: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].success + 1 : 1,
                                error: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].error : 0,
                                state: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].state : 'PASSANT',
                                timeout: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].timeout : true
                            };
                            this.transition(feature);
                        }.bind(this),
                        function error(response) {
                            $rootScope.HEALTHCHECK[feature] = {
                                name: feature,
                                success: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].success : 0,
                                error: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].error + 1 : 1,
                                state: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].state : 'PASSANT',
                                timeout: $rootScope.HEALTHCHECK[feature] != undefined ? $rootScope.HEALTHCHECK[feature].timeout : true
                            };
                            this.transition(feature);
                        }.bind(this)
                    );
            }
        };

    })

    /**
     * Service which combines all services about availability
     */
    .service('Features', function( $location, $http, $window, $rootScope, FeatureFlipping, CircuitBreaker ){

        /**
         * Say if a service is available
         * @param feature
         * @returns {boolean}
         */
        this.isAvailable = function(feature) {
            return FeatureFlipping.isOk(feature) && CircuitBreaker.isOk(feature);
        };

        /**
         * Ask for an update
         * @param feature
         */
        this.check = function(feature) {
            FeatureFlipping.check(feature);
            CircuitBreaker.check(feature);
        };

    })

;
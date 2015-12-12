/*globals toastr, moment, sha1*/
(function() {
    'use strict';
    angular.module('app', ['ngRoute'])
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('sha1', sha1)
        .config(function($routeProvider) {
            var routeAuthoChecker = {
                    isAdmin: {
                        authenticate: function(routeAuthorizationChecker, constants) {
                            return routeAuthorizationChecker.isAuthorizedForRole(constants.ADMIN_ROLE);
                        }
                    },
                    isModerator: {
                        authenticate: function(routeAuthorizationChecker, constants) {
                            return routeAuthorizationChecker.isAuthorizedForRole(constants.MODERATOR_ROLE);
                        }
                    },
                    isModeratorOrAdmin: {
                        authenticate: function(routeAuthorizationChecker) {
                            return routeAuthorizationChecker.isModeratorOrAdmin();
                        }
                    },
                    isAuthenticated: {
                        authenticate: function(routeAuthorizationChecker) {
                            return routeAuthorizationChecker.isAuthenticated();
                        }
                    },
                    isNotAuthenticated: {
                        authenticate: function(routeAuthorizationChecker) {
                            return routeAuthorizationChecker.isNotAuthenticated();
                        }
                    }
                },
                CONTROLLER_VM_NAME = 'vm';

            $routeProvider
                .when('/tvSeries', {
                    templateUrl: '/partials/tv-series/list-tv-series',
                    controller: 'TvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .when('/users/register', {
                    templateUrl: '/partials/account/register',
                    controller: 'AuthenticationController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthoChecker.isNotAuthenticated
                })
                .when('/users/profile/:id/edit', {
                    templateUrl: '/partials/account/edit-profile',
                    controller: 'EditProfileController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthoChecker.isAuthenticated
                })
                .when('/users/profile/:id', {
                    templateUrl: '/partials/account/profile',
                    controller: 'ProfileController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthoChecker.isAuthenticated
                })
                .when('/administration', {
                    templateUrl: '/partials/account/administration',
                    controller: 'AdministrationController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthoChecker.isModeratorOrAdmin
                })
                .when('/', {
                    templateUrl: '/partials/home/home',
                    controller: 'HomeController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .otherwise({
                    templateUrl: '/partials/home/home',
                    controller: 'HomeController',
                    controllerAs: CONTROLLER_VM_NAME
                });
        })
        .run(function($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
                if (rejection === 'not authorized') {
                    $location.path('/');
                }
            });
        });
}());

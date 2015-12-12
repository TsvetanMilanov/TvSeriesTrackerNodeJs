/*globals angular*/
'use strict';
var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
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
    };

    $routeProvider
        .when('/users/register', {
            templateUrl: '/partials/account/register',
            controller: 'AuthenticationController',
            resolve: routeAuthoChecker.isNotAuthenticated
        })
        .when('/users/profile/:id/edit', {
            templateUrl: '/partials/account/edit-profile',
            controller: 'EditProfileController',
            resolve: routeAuthoChecker.isAuthenticated
        })
        .when('/users/profile/:id', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileController',
            resolve: routeAuthoChecker.isAuthenticated
        })
        .when('/administration', {
            templateUrl: '/partials/account/administration',
            controller: 'AdministrationController',
            resolve: routeAuthoChecker.isModeratorOrAdmin
        })
        .when('/', {
            templateUrl: '/partials/home/home',
            controller: 'HomeController'
        })
        .otherwise({
            templateUrl: '/partials/home/home',
            controller: 'HomeController'
        });
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

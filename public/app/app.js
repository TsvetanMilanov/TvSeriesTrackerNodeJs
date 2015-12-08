/*globals angular*/
'use strict';
var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    let routeAuthoChecker = {
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
            templateUrl: '/partials/register',
            controller: 'AuthenticationController',
            resolve: routeAuthoChecker.isNotAuthenticated
        })
        .when('/', {
            templateUrl: '/partials/home',
            controller: 'HomeController'
        })
        .otherwise({
            templateUrl: '/partials/home',
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

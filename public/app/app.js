/*globals angular*/
'use strict';
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'toastr']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/home',
            controller: 'HomeController'
        })
        .otherwise({
            templateUrl: '/partials/home',
            controller: 'HomeController'
        });
});

/*globals toastr, moment, sha1*/
(function() {
    'use strict';
    angular.module('app', ['ngRoute', 'angular-loading-bar', 'ngAnimate'])
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('sha1', sha1)
        .constant('baseUrl', 'http://tv-series-tracker.herokuapp.com')
        //.constant('baseUrl', 'http://localhost:4000')
        .config(function($routeProvider) {
            var routeAuthChecker = {
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
                CONTROLLER_VM_NAME = 'vm',
                PARTIALS_DIRECTORY = '/views/partials';

            $routeProvider
                .when('/reports/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/reports/report-details.html',
                    controller: 'ReportDetailsController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/reports/edit/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/reports/edit-report.html',
                    controller: 'EditReportController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/reports/handle/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/reports/handle-report.html',
                    controller: 'HandleReportController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/reports/:type/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/reports/add-report.html',
                    controller: 'AddReportController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/subscribe/:id', {
                    template: '',
                    controller: 'SubscribeForTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/unsubscribe/:id', {
                    template: '',
                    controller: 'UnsubscribeFromTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/myTvSeriesWithNewEpisodes', {
                    templateUrl: PARTIALS_DIRECTORY + '/profile/my-tv-series-withnew-episodes',
                    controller: 'MyTvSeriesWithNewEpisodesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/myTvSeries', {
                    templateUrl: PARTIALS_DIRECTORY + '/profile/my-tv-series',
                    controller: 'MyTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/episodes/:tvSeriesId/edit/:episodeId/setLastWatchedEpisode', {
                    template: '',
                    controller: 'SetLastWatchedEpisodeController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/episodes/:tvSeriesId/edit/:episodeId', {
                    templateUrl: PARTIALS_DIRECTORY + '/episodes/edit-episode',
                    controller: 'EditEpisodeController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/episodes/:id/add', {
                    templateUrl: PARTIALS_DIRECTORY + '/episodes/add-episode',
                    controller: 'AddEpisodeController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/episodes/:id/delete', {
                    template: '',
                    controller: 'DeleteEpisodeController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/episodes/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/episodes/episode-details',
                    controller: 'EpisodeDetailsController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .when('/tvSeries/:id/delete', {
                    template: '',
                    controller: 'DeleteTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/tvSeries/:id/episodes', {
                    templateUrl: PARTIALS_DIRECTORY + '/episodes/view-tv-series-episodes',
                    controller: 'TvSeriesEpisodesController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .when('/tvSeries/:id/edit', {
                    templateUrl: PARTIALS_DIRECTORY + '/tv-series/edit-tv-series',
                    controller: 'EditTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/tvSeries/add', {
                    templateUrl: PARTIALS_DIRECTORY + '/tv-series/add-tv-series',
                    controller: 'AddTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/tvSeries/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/tv-series/details-tv-series',
                    controller: 'DetailsTvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .when('/tvSeries', {
                    templateUrl: PARTIALS_DIRECTORY + '/tv-series/list-tv-series',
                    controller: 'TvSeriesController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .when('/users/register', {
                    templateUrl: PARTIALS_DIRECTORY + '/account/register',
                    controller: 'AuthenticationController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isNotAuthenticated
                })
                .when('/users/profile/:id/edit', {
                    templateUrl: PARTIALS_DIRECTORY + '/account/edit-profile',
                    controller: 'EditProfileController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/users/profile/:id', {
                    templateUrl: PARTIALS_DIRECTORY + '/account/profile',
                    controller: 'ProfileController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isAuthenticated
                })
                .when('/administration', {
                    templateUrl: PARTIALS_DIRECTORY + '/administration/administration',
                    controller: 'AdministrationController',
                    controllerAs: CONTROLLER_VM_NAME,
                    resolve: routeAuthChecker.isModeratorOrAdmin
                })
                .when('/', {
                    templateUrl: PARTIALS_DIRECTORY + '/home/home',
                    controller: 'HomeController',
                    controllerAs: CONTROLLER_VM_NAME
                })
                .otherwise({
                    templateUrl: PARTIALS_DIRECTORY + '/home/home',
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

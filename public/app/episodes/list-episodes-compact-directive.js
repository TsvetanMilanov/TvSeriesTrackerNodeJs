(function() {
    'use strict';

    function listEpisodesCompactDirective() {
        return {
            restrict: 'A',
            templateUrl: '/views/directives/episodes/list-episodes-compact-directive'
        };
    }

    angular.module('app')
        .directive('listEpisodesCompact', [listEpisodesCompactDirective]);
}());

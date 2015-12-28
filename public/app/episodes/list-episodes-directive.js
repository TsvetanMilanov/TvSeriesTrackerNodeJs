(function() {
    'use strict';

    function listEpisodesDirective() {
        return {
            restrict: 'A',
            templateUrl: '/views/directives/episodes/list-episodes-directive'
        };
    }

    angular.module('app')
        .directive('listEpisodes', [listEpisodesDirective]);
}());

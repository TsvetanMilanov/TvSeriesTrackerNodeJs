(function() {
    'use strict';

    function listTvSeriesCompactDirective() {
        return {
            restrict: 'A',
            templateUrl: '/views/directives/tv-series/list-tv-series-compact-directive'
        };
    }

    angular.module('app')
        .directive('listTvSeriesCompact', [listTvSeriesCompactDirective]);
}());

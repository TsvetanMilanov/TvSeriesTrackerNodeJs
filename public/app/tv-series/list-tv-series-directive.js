(function() {
    'use strict';

    function listTvSeriesDirective() {
        return {
            restrict: 'A',
            templateUrl: '/views/directives/tv-series/list-tv-series-directive'
        };
    }

    angular.module('app')
        .directive('listTvSeries', [listTvSeriesDirective]);
}());

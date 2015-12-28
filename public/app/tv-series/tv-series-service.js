(function() {
    'use strict';

    function tvSeriesService($http, data) {
        var TV_SERIES_URL = 'api/tvSeries';

        function addTvSeries(model) {
            return data.post(TV_SERIES_URL, model);
        }

        return {
            addTvSeries: addTvSeries
        };
    }

    angular.module('app')
        .factory('tvSeries', ['$http', 'data', 'requestHelper', 'identity', tvSeriesService]);
}());

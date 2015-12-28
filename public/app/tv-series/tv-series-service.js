(function() {
    'use strict';

    function tvSeriesService($http, data) {
        var TV_SERIES_URL = 'api/tvSeries';

        function addTvSeries(model) {
            return data.post(TV_SERIES_URL, model);
        }

        function deleteTvSeries(id) {
            return data.delete(TV_SERIES_URL + '/' + id);
        }

        return {
            addTvSeries: addTvSeries,
            deleteTvSeries: deleteTvSeries
        };
    }

    angular.module('app')
        .factory('tvSeries', ['$http', 'data', tvSeriesService]);
}());

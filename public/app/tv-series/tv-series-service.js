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

        function getById(id) {
            return data.get(TV_SERIES_URL + '/' + id);
        }

        function editTvSeries(id, model) {
            return data.put(TV_SERIES_URL + '/' + id, model);
        }

        function subscribe(model) {
            return data.post(TV_SERIES_URL + '/subscribe', model);
        }

        function unsubscribe(id) {
            return data.delete(TV_SERIES_URL + '/unsubscribe/' + id);
        }

        function getAll() {
            return data.get(TV_SERIES_URL);
        }

        function getLatestTvSeries() {
            return data.get(TV_SERIES_URL + '/latest');
        }

        return {
            getAll: getAll,
            getById: getById,
            getLatestTvSeries: getLatestTvSeries,
            addTvSeries: addTvSeries,
            deleteTvSeries: deleteTvSeries,
            editTvSeries: editTvSeries,
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    }

    angular.module('app')
        .factory('tvSeries', ['$http', 'data', tvSeriesService]);
}());

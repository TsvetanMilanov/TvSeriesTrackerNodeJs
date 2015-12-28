(function() {
    'use strict';

    function episodesService(data) {
        var EPISODES_URL = 'api/episodes';

        function getById(id) {
            return data.get(EPISODES_URL + '/' + id);
        }

        function getLatestEpisodes() {
            return data.get(EPISODES_URL + '/latest');
        }

        function addEpisode(episode) {
            return data.post(EPISODES_URL, episode);
        }

        function deleteEpisode(id) {
            return data.delete(EPISODES_URL + '/' + id);
        }

        function editEpisode(id, episode) {
            return data.put(EPISODES_URL + '/' + id, episode);
        }

        function setLastWatchedEpisode(model) {
            return data.post(EPISODES_URL + '/setLastWatchedEpisode', model);
        }

        function forTvSeries(id) {
            return data.get(EPISODES_URL + '/forTvSeries/' + id);
        }

        return {
            getById: getById,
            getLatestEpisodes: getLatestEpisodes,
            addEpisode: addEpisode,
            deleteEpisode: deleteEpisode,
            editEpisode: editEpisode,
            setLastWatchedEpisode: setLastWatchedEpisode,
            forTvSeries: forTvSeries
        };
    }

    angular.module('app')
        .factory('episodes', ['data', episodesService]);
}());

(function() {
    'use strict';

    function profileService(data) {
        var PROFILE_URL = 'api/profile';

        function getMyTvSeries() {
            return data.get(PROFILE_URL + '/myTvSeries');
        }

        function getMyLastAiredEpisodes() {
            return data.get(PROFILE_URL + '/myLastAiredEpisodes');
        }

        function getMyTvSeriesWithNewEpisodes() {
            return data.get(PROFILE_URL + '/myTvSeriesWithNewEpisodes');
        }

        return {
            getMyTvSeries: getMyTvSeries,
            getMyLastAiredEpisodes: getMyLastAiredEpisodes,
            getMyTvSeriesWithNewEpisodes: getMyTvSeriesWithNewEpisodes
        };
    }

    angular.module('app')
        .factory('profile', ['data', profileService]);
}());

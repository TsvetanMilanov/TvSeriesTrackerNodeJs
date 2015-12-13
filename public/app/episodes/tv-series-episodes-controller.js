(function() {
    'use strict';

    function TvSeriesEpisodesController($http, $routeParams, toastr, identity) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;

        $http.get(`/api/tvSeries/${id}`)
            .then(function(result) {
                vm.tvSeries = result.data.tvSeries;
            })
            .catch(function() {
                toastr.error('Can\'t find TV Series.');
            });

        $http.get(`/api/episodes/forTvSeries/${id}`)
            .then(function(episodes) {
                episodes = episodes.data;
                vm.episodes = episodes;

                var seasons = [];
                episodes
                    .map(s => s.seasonNumber)
                    .forEach(function(season) {
                        if (seasons.indexOf(season) === -1) {
                            seasons.push(season);
                        }
                    });

                vm.seasons = seasons;
            })
            .catch(function() {
                toastr.error('Can\'t load episodes for this TV Series.');
            });
    }

    angular.module('app')
        .controller('TvSeriesEpisodesController', ['$http', '$routeParams', 'toastr', 'identity', TvSeriesEpisodesController]);
}());

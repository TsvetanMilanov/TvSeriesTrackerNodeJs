(function() {
    'use strict';

    function TvSeriesEpisodesController($routeParams, toastr, identity, tvSeries, episodes) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;

        tvSeries.getById(id)
            .then(function(result) {
                vm.tvSeries = result.tvSeries;
            })
            .catch(function() {
                toastr.error('Can\'t find TV Series.');
            });

        episodes.forTvSeries(id)
            .then(function(episodes) {
                episodes = episodes;
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
        .controller('TvSeriesEpisodesController', ['$routeParams', 'toastr', 'identity', 'tvSeries', 'episodes', TvSeriesEpisodesController]);
}());

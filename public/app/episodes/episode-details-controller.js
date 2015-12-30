(function() {
    'use strict';

    function EpisodeDetailsController($routeParams, toastr, identity, tvSeries, episodes) {
        var vm = this,
            id = $routeParams.id;
        vm.identity = identity;
        vm.showButtonsBar = false;

        episodes.getById(id)
            .then(function(episode) {
                vm.showButtonsBar = true;
                episode = episode;

                episode.airDate = new Date(episode.airDate);

                vm.episode = episode;

                tvSeries.getById(episode.tvSeriesId)
                    .then(function(result) {
                        let tvSeries = result.tvSeries;

                        vm.tvSeries = tvSeries;
                    })
                    .catch(function() {
                        toastr.error('Can\'t load the onformation of the TV Series holder of this episode.');
                    });
            })
            .catch(function() {
                toastr.error('Can\'t load the details for this episode.');
            });
    }

    angular.module('app')
        .controller('EpisodeDetailsController', ['$routeParams', 'toastr', 'identity', 'tvSeries', 'episodes', EpisodeDetailsController]);
}());

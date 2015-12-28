(function() {
    'use strict';

    function EditEpisodeController($location, $routeParams, toastr, identity, tvSeries, episodes) {
        var vm = this,
            tvSeriesId = $routeParams.tvSeriesId,
            episodeId = $routeParams.episodeId;

        vm.identity = identity;

        tvSeries.getById(tvSeriesId)
            .then(function(response) {
                vm.tvSeries = response.tvSeries;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the TV Series information.');
            });

        episodes.getById(episodeId)
            .then(function(episode) {
                episode = episode;

                episode.airDate = new Date(episode.airDate);

                vm.episode = episode;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the informateion for the episode.');
            });

        vm.editEpisode = function(model) {
            episodes.editEpisode(episodeId, model)
                .then(function(episode) {
                    toastr.success('Episode edited.');
                    $location.path(`episodes/${episode._id}`);
                })
                .catch(function() {
                    toastr.error('Can\'t edit the episode. Please try again.');
                });
        };
    }

    angular.module('app')
        .controller('EditEpisodeController', ['$location', '$routeParams', 'toastr', 'identity', 'tvSeries', 'episodes', EditEpisodeController]);
}());

(function() {
    'use strict';

    function EditEpisodeController($http, $location, $routeParams, toastr, requestHelper, identity) {
        var vm = this,
            tvSeriesId = $routeParams.tvSeriesId,
            episodeId = $routeParams.episodeId,
            config = {
                headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
            };

        vm.identity = identity;

        $http.get(`/api/tvSeries/${tvSeriesId}`)
            .then(function(tvSeries) {
                vm.tvSeries = tvSeries.data;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the TV Series information.');
            });

        $http.get(`/api/episodes/${episodeId}`)
            .then(function(episode) {
                episode = episode.data;

                episode.airDate = new Date(episode.airDate);

                vm.episode = episode;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the informateion for the episode.');
            });

        vm.editEpisode = function(model) {
            $http.put(`/api/episodes/${episodeId}`, model, config)
                .then(function(episode) {
                    toastr.success('Episode edited.');
                    $location.path(`episodes/${episode.data._id}`);
                })
                .catch(function() {
                    toastr.error('Can\'t edit the episode. Please try again.');
                });
        };
    }

    angular.module('app')
        .controller('EditEpisodeController', ['$http', '$location', '$routeParams', 'toastr', 'requestHelper', 'identity', EditEpisodeController]);
}());

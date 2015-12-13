(function() {
    'use strict';

    function EpisodeDetailsController($http, $routeParams, toastr, identity) {
        var vm = this,
            id = $routeParams.id;
        vm.identity = identity;

        $http.get(`/api/episodes/${id}`)
            .then(function(episode) {
                episode = episode.data;

                episode.airDate = new Date(episode.airDate);

                vm.episode = episode;

                $http.get(`/api/tvSeries/${episode.tvSeriesId}`)
                    .then(function(tvSeries) {
                        tvSeries = tvSeries.data;

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
        .controller('EpisodeDetailsController', ['$http', '$routeParams', 'toastr', 'identity', EpisodeDetailsController]);
}());

(function() {
    'use strict';

    function HomeController(toastr, identity, tvSeries, episodes) {
        var vm = this;
        vm.identity = identity;

        tvSeries.getLatestTvSeries()
            .then(function(response) {
                vm.allTvSeries = response;
            })
            .catch(function(err) {
                toastr.error(err);
            });

        episodes.getLatestEpisodes()
            .then(function(response) {
                vm.episodes = response;
            })
            .catch(function(err) {
                toastr.error(err);
            });
    }

    angular.module('app')
        .controller('HomeController', ['toastr', 'identity', 'tvSeries', 'episodes', HomeController]);
}());

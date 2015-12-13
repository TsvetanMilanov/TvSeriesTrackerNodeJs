(function() {
    'use strict';

    function DetailsTvSeriesController($http, $routeParams, toastr, constants, identity) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;

        $http.get(`/api/tvSeries/${id}`)
            .then(function(tvSeries) {
                tvSeries = tvSeries.data;
                tvSeries.releaseDate = new Date(tvSeries.releaseDate);

                vm.tvSeries = tvSeries;

                if (tvSeries.lastAiredEpisodeId) {
                    $http.get(`/api/episodes/${tvSeries.lastAiredEpisodeId}`)
                        .then(function(lastAiredEpisode) {
                            vm.lastAiredEpisode = lastAiredEpisode.data;
                        });
                }
            })
            .catch(function() {
                toastr.error('Can\'t find information for this TV Series.');
            });
    }
    angular.module('app')
        .controller('DetailsTvSeriesController', ['$http', '$routeParams', 'toastr', 'constants', 'identity', DetailsTvSeriesController]);
}());

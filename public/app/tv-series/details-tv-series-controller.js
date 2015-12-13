(function() {
    'use strict';

    function DetailsTvSeriesController($http, $routeParams, toastr, constants, identity) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;

        $http.get(`/api/tvSeries/${id}`)
            .then(function(result) {
                result = result.data;
                let tvSeries = result.tvSeries;

                tvSeries.releaseDate = new Date(tvSeries.releaseDate);

                tvSeries.lastAiredEpisode = result.lastAiredEpisode;
                
                vm.tvSeries = tvSeries;
            })
            .catch(function() {
                toastr.error('Can\'t find information for this TV Series.');
            });
    }
    angular.module('app')
        .controller('DetailsTvSeriesController', ['$http', '$routeParams', 'toastr', 'constants', 'identity', DetailsTvSeriesController]);
}());

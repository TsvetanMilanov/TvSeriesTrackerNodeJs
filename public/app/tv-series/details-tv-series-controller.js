(function() {
    'use strict';

    function DetailsTvSeriesController($routeParams, toastr, constants, identity, tvSeries) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;
        vm.showButtonsBar = false;

        tvSeries.getById(id)
            .then(function(result) {
                let tvSeries = result.tvSeries;
                vm.showButtonsBar = true;

                tvSeries.releaseDate = new Date(tvSeries.releaseDate);

                tvSeries.lastAiredEpisode = result.lastAiredEpisode;

                vm.tvSeries = tvSeries;
            })
            .catch(function() {
                toastr.error('Can\'t find information for this TV Series.');
            });
    }
    angular.module('app')
        .controller('DetailsTvSeriesController', ['$routeParams', 'toastr', 'constants', 'identity', 'tvSeries', DetailsTvSeriesController]);
}());

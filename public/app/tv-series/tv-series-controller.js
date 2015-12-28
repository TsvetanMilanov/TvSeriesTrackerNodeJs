(function() {
    'use strict';

    function TvSeriesController(toastr, tvSeries) {
        var vm = this;

        tvSeries.getAll()
            .then(function(allTvSeries) {
                vm.allTvSeries = allTvSeries;
            })
            .catch(function() {
                toastr.error('Can\'t load TV Series.');
            });
    }

    angular.module('app')
        .controller('TvSeriesController', ['toastr', 'tvSeries', TvSeriesController]);
}());

(function() {
    'use strict';

    function AddTvSeriesController($location, toastr, tvSeries, identity) {
        var vm = this;
        vm.identity = identity;

        vm.addTvSeries = function(model) {
            tvSeries.addTvSeries(model)
                .then(function(tvSeries) {
                    toastr.success('TV Series added!');
                    $location.path(`tvSeries/${tvSeries._id}`);
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error(err);
                });
        };
    }

    angular.module('app')
        .controller('AddTvSeriesController', ['$location', 'toastr', 'tvSeries', 'identity', AddTvSeriesController]);
}());

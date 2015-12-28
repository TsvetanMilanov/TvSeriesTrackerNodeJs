(function() {
    'use strict';

    function EditTvSeriesController($location, $routeParams, toastr, identity, tvSeries) {
        var vm = this,
            id = $routeParams.id;
        vm.identity = identity;

        tvSeries.getById(id)
            .then(function(tvSeries) {
                tvSeries = tvSeries.tvSeries;

                // tvSeries.releaseDateString = tvSeries.releaseDate.toString();

                tvSeries.releaseDate = new Date(tvSeries.releaseDate);

                vm.tvSeries = tvSeries;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the information for the TV Series.');
            });

        vm.editTvSeries = function(model) {
            tvSeries.editTvSeries(id, model)
                .then(function(tvSeries) {
                    toastr.success('TV Series edited!');
                    $location.path(`tvSeries/${tvSeries._id}`);
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error(err);
                });
        };
    }

    angular.module('app')
        .controller('EditTvSeriesController', ['$location', '$routeParams', 'toastr', 'identity', 'tvSeries', EditTvSeriesController]);
}());

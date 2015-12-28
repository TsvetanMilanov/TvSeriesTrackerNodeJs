(function() {
    'use strict';

    function DeleteTvSeriesController($location, $routeParams, toastr, tvSeries) {
        tvSeries.deleteTvSeries($routeParams.id)
            .then(function() {
                toastr.success('TV Series deleted.');
                $location.path('/');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error(err);
            });
    }

    angular.module('app')
        .controller('DeleteTvSeriesController', ['$location', '$routeParams', 'toastr', 'tvSeries', DeleteTvSeriesController]);
}());

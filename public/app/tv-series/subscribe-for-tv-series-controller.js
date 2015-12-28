(function() {
    'use strict';

    function SubscribeForTvSeriesController($routeParams, $location, toastr, tvSeries) {
        tvSeries.subscribe({
                tvSeriesId: $routeParams.id
            })
            .then(function() {
                toastr.success('You have been subscribed for this TV Series.');
                $location.path('myTvSeries');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error(err);
            });
    }

    angular.module('app')
        .controller('SubscribeForTvSeriesController', ['$routeParams', '$location', 'toastr', 'tvSeries', SubscribeForTvSeriesController]);
}());

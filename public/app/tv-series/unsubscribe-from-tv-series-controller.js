(function() {
    'use strict';

    function UnsubscribeFromTvSeriesController($routeParams, $location, toastr, tvSeries) {
        var tvSeriesId = $routeParams.id;

        tvSeries.unsubscribe(tvSeriesId)
            .then(function() {
                toastr.success('You have been successfuly unsubscribed from this TV Series.');
                $location.path('myTvSeries');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t unsubscribe from this TV Series. Try again later.');
            });
    }

    angular.module('app')
        .controller('UnsubscribeFromTvSeriesController', ['$routeParams', '$location', 'toastr', 'tvSeries', UnsubscribeFromTvSeriesController]);
}());

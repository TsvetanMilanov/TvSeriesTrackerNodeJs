(function() {
    'use strict';

    function DetailsTvSeriesController($http, $routeParams, toastr, moment, constants, identity) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;

        $http.get(`/api/tvSeries/${id}`)
            .then(function(tvSeries) {
                tvSeries = tvSeries.data;
                tvSeries.displayDate = moment(tvSeries.releaseDate).format(constants.DEFAULT_DATE_FORMAT);
                vm.tvSeries = tvSeries;

                $http.get(`/api/episodes/${tvSeries.lastAiredEpisodeId}`)
                    .then(function(lastAiredEpisode) {
                        vm.lastAiredEpisode = lastAiredEpisode.data;
                    })
                    .catch(function() {
                        toastr.error('Can\'t load last aired episode.');
                    });
            })
            .catch(function() {
                toastr.error('Can\'t find information for this TV Series.');
            });
    }
    angular.module('app')
        .controller('DetailsTvSeriesController', ['$http', '$routeParams', 'toastr', 'moment', 'constants', 'identity', DetailsTvSeriesController]);
}());

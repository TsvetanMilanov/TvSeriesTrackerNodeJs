(function() {
    'use strict';

    function TvSeriesController($http, toastr) {
        var vm = this;

        $http.get('/api/tvSeries')
            .then(function(allTvSeries) {
                vm.allTvSeries = allTvSeries.data;
            })
            .catch(function() {
                toastr.error('Can\'t load TV Series.');
            });
    }

    angular.module('app')
        .controller('TvSeriesController', ['$http', 'toastr', TvSeriesController]);
}());

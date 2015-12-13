(function() {
    'use strict';

    function EditTvSeriesController($http, $location, $routeParams, toastr, requestHelper, identity) {
        var vm = this,
            id = $routeParams.id;
        vm.identity = identity;

        $http.get(`/api/tvSeries/${id}`)
            .then(function(tvSeries) {
                tvSeries = tvSeries.data;

                // tvSeries.releaseDateString = tvSeries.releaseDate.toString();

                tvSeries.releaseDate = new Date(tvSeries.releaseDate);

                vm.tvSeries = tvSeries;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the information for the TV Series.');
            });

        vm.editTvSeries = function(model) {
            $http.put(`/api/tvSeries/${id}`, model, {
                    headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
                })
                .then(function(tvSeries) {
                    toastr.success('TV Series edited!');
                    $location.path(`tvSeries/${tvSeries.data._id}`);
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error('Can\'t edit the TV Series please try again.');
                });
        };
    }

    angular.module('app')
        .controller('EditTvSeriesController', ['$http', '$location', '$routeParams', 'toastr', 'requestHelper', 'identity', EditTvSeriesController]);
}());

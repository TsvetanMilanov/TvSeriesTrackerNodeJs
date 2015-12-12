(function() {
    'use strict';

    function AddTvSeriesController($http, $location, toastr, requestHelper, identity) {
        var vm = this;
        vm.identity = identity;

        vm.addTvSeries = function(model) {
            $http.post('/api/tvSeries', model, {
                    headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
                })
                .then(function(tvSeries) {
                    toastr.success('TV Series added!');
                    $location.path(`tvSeries/${tvSeries.data._id}`);
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error('Can\'t save the new TV Series please try again.');
                });
        };
    }

    angular.module('app')
        .controller('AddTvSeriesController', ['$http', '$location', 'toastr', 'requestHelper', 'identity', AddTvSeriesController]);
}());

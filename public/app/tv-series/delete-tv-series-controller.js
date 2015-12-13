(function() {
    'use strict';

    function DeleteTvSeriesController($http, $location, $routeParams, toastr, requestHelper, identity) {
        var config = {
            headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
        };

        $http.delete(`/api/tvSeries/${$routeParams.id}`, config)
            .then(function() {
                toastr.success('TV Series deleted.');
                $location.path('/');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t delete the TV Series.');
            });
    }

    angular.module('app')
        .controller('DeleteTvSeriesController', ['$http', '$location', '$routeParams', 'toastr', 'requestHelper', 'identity', DeleteTvSeriesController]);
}());

(function() {
    'use strict';

    function UnsubscribeFromTvSeriesController($http, $routeParams, $location, toastr, requestHelper, identity) {
        var tvSeriesId = $routeParams.id,
            config = {
                headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
            };

        $http.delete(`/api/tvSeries/unsubscribe/${tvSeriesId}`, config)
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
        .controller('UnsubscribeFromTvSeriesController', ['$http', '$routeParams', '$location', 'toastr', 'requestHelper', 'identity', UnsubscribeFromTvSeriesController]);
}());

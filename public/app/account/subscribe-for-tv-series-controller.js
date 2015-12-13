(function() {
    'use strict';

    function SubscribeForTvSeriesController($http, $routeParams, $location, toastr, requestHelper, identity) {
        var config = {
            headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
        };

        $http.post('/api/profile/subscribe', {
                tvSeriesId: $routeParams.id
            }, config)
            .then(function() {
                toastr.success('You hav subscribed for this TV Series.');
                $location.path('myTvSeries');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t subscribe for this tv series. Try again later.');
            });
    }

    angular.module('app')
        .controller('SubscribeForTvSeriesController', ['$http', '$routeParams', '$location', 'toastr', 'requestHelper', 'identity', SubscribeForTvSeriesController]);
}());

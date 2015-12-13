(function() {
    'use strict';

    function MyTvSeriesController($http, toastr, requestHelper, identity) {
        var vm = this,
        config = {
            headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
        };

        $http.get('/api/profile/myTvSeries', config)
        .then(function(response) {
            response = response.data;

            vm.allTvSeries = response.allTvSeries;
            vm.lastWatchedEpisodes = response.lastWatchedEpisodes;

            $http.get('/api/profile/myLastAiredEpisodes', config)
            .then(function(response) {
                vm.lastAiredEpisodes = response.data;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the last aired episodes for your TV Series.');
            });
        })
        .catch(function(err) {
            console.log(err);
            toastr.error('Can\'t show your TV Series right now. Please try again later.');
        });
    }

    angular.module('app')
        .controller('MyTvSeriesController', ['$http', 'toastr', 'requestHelper', 'identity', MyTvSeriesController]);
}());

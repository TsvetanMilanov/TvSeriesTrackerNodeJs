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

            console.log(response);

            vm.allTvSeries = response.allTvSeries;
            vm.lastWatchedEpisodes = response.lastWatchedEpisodes;
        })
        .catch(function(err) {
            console.log(err);
            toastr.error('Can\'t show your TV Series right now. Please try again later.');
        });
    }

    angular.module('app')
        .controller('MyTvSeriesController', ['$http', 'toastr', 'requestHelper', 'identity', MyTvSeriesController]);
}());

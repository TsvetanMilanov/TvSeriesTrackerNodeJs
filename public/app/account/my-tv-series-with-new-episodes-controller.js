(function() {
    'use strict';

    function MyTvSeriesWithNewEpisodesController($http, toastr, requestHelper, identity) {
        var vm = this,
            config = {
                headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
            };

        $http.get('/api/profile/myTvSeriesWithNewEpisodes', config)
            .then(function(response) {
                vm.allTvSeries = response.data;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the information of your TV Series with new episodes.');
            });
    }

    angular.module('app')
        .controller('MyTvSeriesWithNewEpisodesController', ['$http', 'toastr', 'requestHelper', 'identity', MyTvSeriesWithNewEpisodesController]);
}());

(function() {
    'use strict';

    function SetLastWatchedEpisodeController($http, $routeParams, $location, toastr, requestHelper, identity) {
        var config = {
            headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
        };

        $http.post('/api/episodes/setLastWatchedEpisode', {
                userId: identity.currentUser._id,
                tvSeriesId: $routeParams.tvSeriesId,
                episodeId: $routeParams.episodeId
            }, config)
            .then(function() {
                toastr.success('Episode set as last watched.');
                $location.path('myTvSeries');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t set this episode to be last watched. Try again later.');
            });
    }

    angular.module('app')
        .controller('SetLastWatchedEpisodeController', ['$http', '$routeParams', '$location', 'toastr', 'requestHelper', 'identity', SetLastWatchedEpisodeController]);
}());

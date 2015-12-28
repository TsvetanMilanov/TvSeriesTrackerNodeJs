(function() {
    'use strict';

    function SetLastWatchedEpisodeController($routeParams, $location, toastr, identity, episodes) {
        episodes.setLastWatchedEpisode({
                userId: identity.currentUser._id,
                tvSeriesId: $routeParams.tvSeriesId,
                episodeId: $routeParams.episodeId
            })
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
        .controller('SetLastWatchedEpisodeController', ['$routeParams', '$location', 'toastr', 'identity', 'episodes', SetLastWatchedEpisodeController]);
}());

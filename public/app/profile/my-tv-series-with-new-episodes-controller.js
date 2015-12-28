(function() {
    'use strict';

    function MyTvSeriesWithNewEpisodesController(toastr, profile) {
        var vm = this;

        profile.getMyTvSeriesWithNewEpisodes()
            .then(function(response) {
                vm.allTvSeries = response;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the information of your TV Series with new episodes.');
            });
    }

    angular.module('app')
        .controller('MyTvSeriesWithNewEpisodesController', ['toastr', 'profile', MyTvSeriesWithNewEpisodesController]);
}());

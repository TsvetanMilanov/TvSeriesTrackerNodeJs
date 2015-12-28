(function() {
    'use strict';

    function MyTvSeriesController(toastr, profile) {
        var vm = this;

        profile.getMyTvSeries()
            .then(function(response) {
                vm.allTvSeries = response.allTvSeries;
                vm.lastWatchedEpisodes = response.lastWatchedEpisodes;

                profile.getMyLastAiredEpisodes()
                    .then(function(response) {
                        vm.lastAiredEpisodes = response;
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
        .controller('MyTvSeriesController', ['toastr', 'profile', MyTvSeriesController]);
}());

(function() {
    'use strict';

    function AddEpisodeController($location, $routeParams, toastr, identity, tvSeries, episodes) {
        var vm = this,
            id = $routeParams.id;

        vm.identity = identity;

        tvSeries.getById(id)
            .then(function(result) {
                vm.tvSeries = result.tvSeries;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the TV Series information.');
            });

        vm.addEpisode = function(model) {
            model.tvSeriesId = id;
            episodes.addEpisode(model)
                .then(function(episode) {
                    toastr.success('Episode added.');
                    $location.path(`episodes/${episode._id}`);
                })
                .catch(function() {
                    toastr.error('Can\'t save the new episode. Please try again.');
                });
        };
    }

    angular.module('app')
        .controller('AddEpisodeController', ['$location', '$routeParams', 'toastr', 'identity', 'tvSeries', 'episodes', AddEpisodeController]);
}());

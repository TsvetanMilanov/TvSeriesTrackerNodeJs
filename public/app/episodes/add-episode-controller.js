(function() {
    'use strict';

    function AddEpisodeController($http, $location, $routeParams, toastr, requestHelper, identity) {
        var vm = this,
            id = $routeParams.id,
            config = {
                headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
            };

        vm.identity = identity;

        $http.get(`/api/tvSeries/${id}`)
            .then(function(tvSeries) {
                vm.tvSeries = tvSeries.data;
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Can\'t load the TV Series information.');
            });

        vm.addEpisode = function(model) {
            model.tvSeriesId = id;
            $http.post('/api/episodes', model, config)
                .then(function(episode) {
                    toastr.success('Episode added.');
                    $location.path(`episodes/${episode.data._id}`);
                })
                .catch(function() {
                    toastr.error('Can\'t save the new episode. Please try again.');
                });
        };
    }

    angular.module('app')
        .controller('AddEpisodeController', ['$http', '$location', '$routeParams', 'toastr', 'requestHelper', 'identity', AddEpisodeController]);
}());

(function() {
    'use strict';

    function EpisodeDetailsController($http, $routeParams, toastr, moment, identity) {
        var vm = this,
            id = $routeParams.id;
        vm.identity = identity;

        $http.get(`/api/episodes/${id}`)
            .then(function(episode) {
                episode = episode.data;
                episode.displayDate = moment(episode.airDate).format('DD-MM-YYYY');
                vm.episode = episode;
            })
            .catch(function() {
                toastr.error('Can\'t load the details for this episode.');
            });
    }

    angular.module('app')
        .controller('EpisodeDetailsController', ['$http', '$routeParams', 'toastr', 'moment', 'identity', EpisodeDetailsController]);
}());

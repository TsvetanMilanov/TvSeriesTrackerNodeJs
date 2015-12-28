(function() {
    'use strict';

    function DeleteEpisodeController($routeParams, $location, toastr, episodes) {
        var id = $routeParams.id;

        episodes.deleteEpisode(id)
            .then(function() {
                toastr.success('Episode deleted.');
                $location.path('/');
            })
            .catch(function(err) {
                console.log(err);
                toastr.error('Episode not deleted. Please try again.');
            });
    }

    angular.module('app')
        .controller('DeleteEpisodeController', ['$routeParams', '$location', 'toastr', 'episodes', DeleteEpisodeController]);
}());

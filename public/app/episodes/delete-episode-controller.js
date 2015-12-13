(function() {
    'use strict';

    function DeleteEpisodeController($http, $routeParams, $location, toastr, requestHelper, identity) {
        var id = $routeParams.id,
            config = {
                headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
            };

        $http.delete(`/api/episodes/${id}`, config)
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
        .controller('DeleteEpisodeController', ['$http', '$routeParams', '$location', 'toastr', 'requestHelper', 'identity', DeleteEpisodeController]);
}());

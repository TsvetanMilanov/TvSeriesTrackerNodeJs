(function() {
    'use strict';

    function ProfileController($routeParams, $http, $location, toastr, moment, identity, constants, requestHelper) {
        var vm = this,
            userId = $routeParams.id;
        vm.identity = identity;

        $http.get(`/api/users/${userId}`, {
                headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
            })
            .then(function(data) {
                var user = data.data;
                user.registrationDate = moment(user.registrationDate).format(constants.DEFAULT_DATE_FORMAT);

                vm.currentUser = user;
            })
            .catch(function() {
                toastr.error('There was an error please try again later.');
                $location.path('/');
            });
    }

    angular.module('app')
        .controller('ProfileController', ['$routeParams', '$http', '$location', 'toastr', 'moment', 'identity', 'constants', 'requestHelper', ProfileController]);
}());

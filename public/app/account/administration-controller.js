(function() {
    'use strict';

    function AdministrationController($location, $http, toastr, identity, requestHelper) {
        var vm = this;
        vm.identity = identity;

        vm.getAllUsers = function() {
            var headers = requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token);

            if (!identity.isAdmin() && !identity.isModerator()) {
                toastr.error('You are not authorized to do that!!!');
                $location.path('/');
                return;
            }

            $http.get('/api/users', {
                    headers: headers
                })
                .then(function(data) {
                    vm.users = data.data;
                })
                .catch(function(err) {
                    toastr.error(`There was an error while trying to get all users. ${JSON.stringify(err.data)}`);
                    $location.path('/');
                });
        };

        vm.getBannedUsers = function() {
            var headers = requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token);

            if (!identity.isAdmin() && !identity.isModerator()) {
                toastr.error('You are not authorized to do that!!!');
                $location.path('/');
                return;
            }

            $http.get('/api/users/banned', {
                    headers: headers
                })
                .then(function(data) {
                    vm.users = data.data;
                })
                .catch(function(err) {
                    toastr.error(`There was an error while trying to get banned users. ${JSON.stringify(err)}`);
                    $location.path('/');
                });
        };
    }

    angular.module('app')
        .controller('AdministrationController', ['$location', '$http', 'toastr', 'identity', 'requestHelper', AdministrationController]);
}());

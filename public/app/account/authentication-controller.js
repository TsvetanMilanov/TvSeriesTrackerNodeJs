(function() {
    'use strict';

    function AuthenticationController($window, $http, $location, toastr, sha1, identity, constants) {
        var vm = this;
        vm.identity = identity;

        vm.loginUser = function(user) {
            var copiedUser = user;
            copiedUser.password = sha1(copiedUser.password);
            $http.put('/api/users/token', user)
                .then(function(data) {
                    var identityUser = data.data;

                    identity.currentUser = identityUser;
                    $window.localStorage.setItem(constants.CURRENT_USER_LOCAL_STORAGE_KEY, JSON.stringify(identityUser));
                    vm.identity = identity;

                    toastr.success('Login successful!');
                    $location.path('/');
                })
                .catch(function() {
                    toastr.error('Invalid username or password!');
                });
        };

        vm.logoutUser = function() {
            identity.currentUser = null;
            $window.localStorage.removeItem(constants.CURRENT_USER_LOCAL_STORAGE_KEY);
            vm.identity = identity;

            toastr.info('Logout successful!');
            $location.path('/');
        };

        vm.registerUser = function(userToRegister) {
            if (userToRegister.userName.length < constants.MIN_USERNAME_LENGTH || userToRegister.userName.length > constants.MAX_USERNAME_LENGTH) {
                toastr.error(`Username should be between ${constants.MIN_USERNAME_LENGTH} and ${constants.MAX_USERNAME_LENGTH} symbols long.`);
                return;
            }

            if (userToRegister.password.length < constants.MIN_PASSWORD_LENGTH) {
                toastr.error(`Password should be at least ${constants.MIN_PASSWORD_LENGTH} symbols long.`);
                return;
            }

            userToRegister.password = sha1(userToRegister.password);

            $http.post('/api/users', userToRegister)
                .then(function(data) {
                    toastr.success(`${data.data.userName} registered successfuly!`);
                    $location.path('/');
                })
                .catch(function() {
                    toastr.error('Cannot register user with this username. Try different username.');
                });
        };
    }

    angular.module('app')
        .controller('AuthenticationController', ['$window', '$http', '$location', 'toastr', 'sha1', 'identity', 'constants', AuthenticationController]);
}());

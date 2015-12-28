(function() {
    'use strict';

    function AuthenticationController($scope, $window, $location, toastr, identity, constants, account) {
        var vm = this;
        vm.identity = identity;

        vm.loginUser = function(user) {
            if (!user.userName) {
                toastr.info('Please enter your username.');
                return;
            }

            if (!user.password) {
                toastr.info('Please enter your password.');
                return;
            }

            account.login(user)
                .then(function(data) {
                    var identityUser = data;

                    identity.currentUser = identityUser;
                    $window.localStorage.setItem(constants.CURRENT_USER_LOCAL_STORAGE_KEY, JSON.stringify(identityUser));
                    vm.identity = identity;

                    $scope.loginForm.$setPristine();
                    user.password = undefined;

                    toastr.success('Login successful!');
                    $location.path('/');
                })
                .catch(function(err) {
                    console.log(err);
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

        vm.registerUser = function(userToRegister, agree) {
            if (!agree) {
                toastr.info('You must agree with the content of the Information box to register.');
                return;
            }

            if (userToRegister.userName.length < constants.MIN_USERNAME_LENGTH ||
                userToRegister.userName.length > constants.MAX_USERNAME_LENGTH) {
                toastr.error(`Username should be between ${constants.MIN_USERNAME_LENGTH} and ${constants.MAX_USERNAME_LENGTH} symbols long.`);
                return;
            }

            if (userToRegister.password.length < constants.MIN_PASSWORD_LENGTH) {
                toastr.error(`Password should be at least ${constants.MIN_PASSWORD_LENGTH} symbols long.`);
                return;
            }

            account.register(userToRegister)
                .then(function(data) {
                    toastr.success(`${data.userName} registered successfuly!`);
                    $location.path('/');
                })
                .catch(function() {
                    toastr.error('Cannot register user with this username. Try different username.');
                });
        };
    }

    angular.module('app')
        .controller('AuthenticationController', ['$scope', '$window', '$location', 'toastr', 'identity', 'constants', 'account', AuthenticationController]);
}());

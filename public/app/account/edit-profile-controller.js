(function() {
    'use strict';

    function EditProfileController($routeParams, $location, toastr, sha1, identity, constants, account) {
        var vm = this,
            idOfUserToEdit = $routeParams.id;

        vm.identity = identity;

        account.getById(idOfUserToEdit)
            .then(function(data) {
                var userToEdit = data;
                userToEdit.rolesJson = JSON.stringify(userToEdit.roles);
                userToEdit.password = undefined;

                vm.user = userToEdit;

                vm.editUser = function(editedUser) {
                    editedUser.roles = JSON.parse(editedUser.rolesJson);

                    if (editedUser.password) {
                        if (editedUser.password.length < constants.MIN_PASSWORD_LENGTH) {
                            toastr.info(`Password should be at least ${constants.MIN_PASSWORD_LENGTH} symbols.`);
                            return;
                        }

                        editedUser.password = sha1(editedUser.password);
                    }

                    if (editedUser.userName.length < constants.MIN_USERNAME_LENGTH ||
                        editedUser.userName.length > constants.MAX_USERNAME_LENGTH) {
                        toastr.info(`Username should be between ${constants.MIN_USERNAME_LENGTH} and ${constants.MAX_USERNAME_LENGTH} symbols.`);
                        return;
                    }

                    editedUser.registrationDate = new Date(editedUser.registrationDate);

                    account.edit(editedUser)
                        .then(function(data) {
                            var responseUser = data;
                            if (identity.currentUser.token == responseUser.token) {
                                identity.currentUser = responseUser;
                            }

                            vm.identity = identity;

                            toastr.success(`User ${responseUser.userName} edited successfully!`);
                            $location.path(`/users/profile/${responseUser._id}`);
                        })
                        .catch(function(err) {
                            toastr.error(`Something went wrong: ${err.message}`);
                            $location.path('/');
                        });
                };
            })
            .catch(function() {
                toastr.error('There was an error, try again later.');
                $location.path('/');
            });
    }

    angular.module('app')
        .controller('EditProfileController', ['$routeParams', '$location', 'toastr', 'sha1', 'identity', 'constants', 'account', EditProfileController]);
}());

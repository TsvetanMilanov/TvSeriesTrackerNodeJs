'use strict';

angular.module('app').controller('EditProfileController', function($scope, $http, $routeParams, $location, toastr, sha1, identity, requestHelper, constants) {
    $scope.identity = identity;
    var currentUser = identity.currentUser,
        idOfUserToEdit = $routeParams.id,
        headers = requestHelper.createJsonHeadersObjectWithBearer(currentUser.token);

    $http.get(`/api/users/${idOfUserToEdit}`, {
            headers: headers
        })
        .then(function(data) {
            var userToEdit = data.data;
            userToEdit.rolesJson = JSON.stringify(userToEdit.roles);
            userToEdit.password = undefined;

            $scope.user = userToEdit;

            $scope.editUser = function(editedUser) {
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

                $http.put(`/api/users/${editedUser._id}`, editedUser, {
                        headers: headers
                    })
                    .then(function(data) {
                        var responseUser = data.data;
                        if (identity.currentUser.token == responseUser.token) {
                            identity.currentUser = responseUser;
                        }

                        $scope.identity = identity;

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
});

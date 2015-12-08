/*globals app, toastr*/
'use strict';

app.controller('EditProfileController', function($scope, $http, $routeParams, $location, identity, requestHelper) {
    $scope.identity = identity;
    var currentUser = identity.currentUser,
        idOfUserToEdit = $routeParams.id;

    $http.get(`/api/users/${idOfUserToEdit}`, {
            headers: requestHelper.createJsonHeadersObjectWithBearer(currentUser.token)
        })
        .then(function(data) {
            var userToEdit = data.data;
            userToEdit.rolesJson = JSON.stringify(userToEdit.roles);
            userToEdit.password = undefined;

            $scope.user = userToEdit;

            $scope.editUser = function(editedUser) {
                editedUser.roles = JSON.parse(editedUser.rolesJson);
                console.log(editedUser);
            };
        })
        .catch(function() {
            toastr.error('There was an error, try again later.');
            $location.path('/');
        });
});

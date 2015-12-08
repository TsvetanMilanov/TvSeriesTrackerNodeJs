/*globals app, sha1, toastr*/
'use strict';
app.controller('AuthenticationController', function($scope, $window, $http, identity, constants) {
    $scope.identity = identity;

    $scope.loginUser = function(user) {
        let copiedUser = user;
        copiedUser.password = sha1(copiedUser.password);
        $http.put('/api/users/token', user)
            .then(function(data) {
                let identityUser = data.data;

                identity.currentUser = identityUser;
                $window.localStorage.setItem(constants.CURRENT_USER_LOCAL_STORAGE_KEY, JSON.stringify(identityUser));
                $scope.identity = identity;

                toastr.success('Login successful!');
            })
            .catch(function(err) {
                toastr.error(err.message);
            });
    };

    $scope.logoutUser = function() {
        identity.currentUser = null;
        $window.localStorage.removeItem(constants.CURRENT_USER_LOCAL_STORAGE_KEY);
        $scope.identity = identity;

        toastr.info('Logout successful!');
    };
});

/*globals app, toastr*/
'use strict';
app.controller('AdministrationController', function($scope, $location, $http, identity, requestHelper) {
    $scope.identity = identity;

    $scope.getAllUsers = function() {
        var headers = requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token);

        if (!identity.isAdmin()) {
            toastr.error('You are not authorized to do that!!!');
            $location.path('/');
            return;
        }

        $http.get('/api/users', {
                headers: headers
            })
            .then(function(data) {
                $scope.users = data.data;
            })
            .catch(function(err) {
                toastr.error(`There was an error while trying to get all users. ${err}`);
                $location.path('/');
            });
    };

    $scope.getBannedUsers = function() {
        var headers = requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token);

        if (!identity.isAdmin()) {
            toastr.error('You are not authorized to do that!!!');
            $location.path('/');
            return;
        }

        $http.get('/api/users/banned', {
                headers: headers
            })
            .then(function(data) {
                $scope.users = data.data;
            })
            .catch(function(err) {
                toastr.error(`There was an error while trying to get banned users. ${err}`);
                $location.path('/');
            });
    };
});

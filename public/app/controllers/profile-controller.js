/*globals app, toastr, moment */
'use strict';

app.controller('ProfileController', function($scope, $routeParams, $http, $location, identity, constants, requestHelper) {
    var userId = $routeParams.id;
    $scope.identity = identity;

    $http.get(`/api/users/${userId}`, {
            headers: requestHelper.createJsonHeadersObjectWithBearer(identity.currentUser.token)
        })
        .then(function(data) {
            var user = data.data;
            user.registrationDate = moment(user.registrationDate).format(constants.DEFAULT_DATE_FORMAT);

            $scope.currentUser = user;
        })
        .catch(function() {
            toastr.error('There was an error please try again later.');
            $location.path('/');
        });
});

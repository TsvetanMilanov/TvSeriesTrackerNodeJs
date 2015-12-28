(function() {
    'use strict';

    function ProfileController($routeParams, $location, toastr, moment, identity, constants, account) {
        var vm = this,
            userId = $routeParams.id;
        vm.identity = identity;

        account.getById(userId)
            .then(function(data) {
                var user = data;
                user.registrationDate = moment(user.registrationDate).format(constants.DEFAULT_DATE_FORMAT);

                vm.currentUser = user;
            })
            .catch(function() {
                toastr.error('There was an error please try again later.');
                $location.path('/');
            });
    }

    angular.module('app')
        .controller('ProfileController', ['$routeParams', '$location', 'toastr', 'moment', 'identity', 'constants', 'account', ProfileController]);
}());

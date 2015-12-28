(function() {
    'use strict';

    function AdministrationController($location, toastr, identity, constants, users, reports) {
        var vm = this;

        vm.identity = identity;
        vm.type = 0;

        function getReports(type) {
            return reports.get({
                type: type
            });
        }

        vm.setType = function(type) {
            vm.reports = [];
            vm.type = type;
        };

        vm.getAllReports = function() {
            getReports(vm.type)
                .then(function(reports) {
                    vm.reports = reports;
                });
        };

        vm.getHandledReports = function() {
            reports.get({
                    type: vm.type,
                    isHandled: true
                })
                .then(function(reports) {
                    vm.reports = reports;
                });
        };

        vm.getNotHandledReports = function() {
            reports.get({
                    type: vm.type,
                    isHandled: false
                })
                .then(function(reports) {
                    vm.reports = reports;
                });
        };

        vm.unhandleReport = function(id) {
            reports.unhandleReport(id)
                .then(function() {
                    toastr.success('Report unhandled.');
                    $location.path('/reports/' + id);
                })
                .catch(function(err) {
                    toastr.error(err);
                });
        };

        vm.getAllUsers = function() {
            if (!identity.isAdmin() && !identity.isModerator()) {
                toastr.error('You are not authorized to do that!!!');
                $location.path('/');
                return;
            }

            users.getAll()
                .then(function(data) {
                    vm.users = data;
                })
                .catch(function(err) {
                    toastr.error(`There was an error while trying to get all users. ${JSON.stringify(err)}`);
                    $location.path('/');
                });
        };

        vm.getBannedUsers = function() {
            if (!identity.isAdmin() && !identity.isModerator()) {
                toastr.error('You are not authorized to do that!!!');
                $location.path('/');
                return;
            }

            users.getBanned()
                .then(function(data) {
                    vm.users = data;
                })
                .catch(function(err) {
                    toastr.error(`There was an error while trying to get banned users. ${JSON.stringify(err)}`);
                    $location.path('/');
                });
        };
    }

    angular.module('app')
        .controller('AdministrationController', ['$location', 'toastr', 'identity', 'constants', 'users', 'reports', AdministrationController]);
}());

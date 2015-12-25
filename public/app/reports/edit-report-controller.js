(function() {
    'use strict';

    function EditReportController($routeParams, $location, toastr, reports) {
        var vm = this,
            id = $routeParams.id;

        reports.getById(id)
            .then(function(report) {
                vm.report = report;
            })
            .catch(function(err) {
                toastr.error(err);
            });

        vm.editReport = function() {
            reports.editReport(vm.report)
                .then(function(report) {
                    toastr.success('Report edited.');
                    $location.path('/reports/' + report._id);
                })
                .catch(function(err) {
                    toastr.error(err);
                });
        };
    }

    angular.module('app')
        .controller('EditReportController', ['$routeParams', '$location', 'toastr', 'reports', EditReportController]);
}());

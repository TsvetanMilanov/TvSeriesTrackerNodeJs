(function() {
    'use strict';

    function ReportDetailsController($routeParams, $location, toastr, reports) {
        var vm = this,
            id = $routeParams.id;

        reports.getById(id)
            .then(function(report) {
                vm.report = report;
            })
            .catch(function(err) {
                toastr.error(err);
            });
    }

    angular.module('app')
        .controller('ReportDetailsController', ['$routeParams', '$location', 'toastr', 'reports', ReportDetailsController]);
}());

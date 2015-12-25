(function() {
    'use strict';

    function HandleReportController($routeParams, $location, toastr, reports) {
        var vm = this,
            id = $routeParams.id;

        vm.handleReport = function(report) {
            reports.handleReport(id, report)
                .then(function() {
                    toastr.success('Report handled!');
                    $location.path('/administration');
                })
                .catch(function(err) {
                    toastr.error(err.message);
                });
        };
    }

    angular.module('app')
        .controller('HandleReportController', ['$routeParams', '$location', 'toastr', 'reports', HandleReportController]);
}());

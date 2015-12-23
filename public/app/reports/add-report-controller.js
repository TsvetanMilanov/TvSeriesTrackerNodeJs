(function() {
    'use strict';

    function AddReportController($routeParams, $location, toastr, reports, constants) {
        var vm = this,
            type = $routeParams.type,
            elementId = $routeParams.id;

        vm.saveReport = function(report, reportForm) {
            if (reportForm.$valid) {
                if (report.description.length < constants.MIN_REPORT_DESCRIPTION_LENGTH) {
                    toastr.info('The report description must be atleast ' + constants.MIN_REPORT_DESCRIPTION_LENGTH + ' symbols.');
                    return;
                }

                report.type = type;
                if (type == constants.REPORT_TYPE_TV_SERIES) {
                    report.tvSeriesId = elementId;
                } else {
                    report.episodeId = elementId;
                }

                reports.addReport(report)
                    .then(function() {
                        toastr.success('Report saved!');
                    }, function(err) {
                        toastr.error(err.message);
                    });
            } else {
                toastr.info('Please fill all the fields.');
            }
        };
    }

    angular.module('app')
        .controller('AddReportController', ['$routeParams', '$location', 'toastr', 'reports', 'constants', AddReportController]);
}());

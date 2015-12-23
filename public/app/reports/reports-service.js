(function() {
    'use strict';

    function reports(data) {
        function addReport(report) {
            return data.post('api/reports', report);
        }
        return {
            addReport: addReport
        };
    }

    angular.module('app')
        .factory('reports', ['data', reports]);
}());

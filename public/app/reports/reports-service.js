(function() {
    'use strict';

    function reports(data) {
        function addReport(report) {
            return data.post('api/reports', report);
        }

        function get(filter) {
            return data.get('api/reports', filter);
        }

        function handleReport(id, report) {
            return data.put('api/reports/handle/' + id, report);
        }

        return {
            get: get,
            addReport: addReport,
            handleReport: handleReport
        };
    }

    angular.module('app')
        .factory('reports', ['data', reports]);
}());

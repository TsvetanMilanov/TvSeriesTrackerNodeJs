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

        function getById(id) {
            return data.get('api/reports/' + id);
        }

        return {
            get: get,
            getById: getById,
            addReport: addReport,
            handleReport: handleReport
        };
    }

    angular.module('app')
        .factory('reports', ['data', reports]);
}());

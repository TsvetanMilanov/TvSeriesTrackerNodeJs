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

        function unhandleReport(id, report) {
            return data.put('api/reports/unhandle/' + id, report);
        }

        function getById(id) {
            return data.get('api/reports/' + id);
        }

        function editReport(report) {
            return data.put('api/reports', report);
        }

        function deleteReport(id) {
            return data.delete('api/reports/' + id);
        }

        return {
            get: get,
            getById: getById,
            addReport: addReport,
            handleReport: handleReport,
            unhandleReport: unhandleReport,
            editReport: editReport,
            deleteReport: deleteReport
        };
    }

    angular.module('app')
        .factory('reports', ['data', reports]);
}());

(function() {
    'use strict';

    function usersService(data) {
        var USERS_URL = 'api/users';

        function getAll() {
            return data.get(USERS_URL);
        }

        function getBanned() {
            return data.get(USERS_URL + '/banned');
        }

        return {
            getAll: getAll,
            getBanned: getBanned
        };
    }

    angular.module('app')
        .factory('users', ['data', usersService]);
}());

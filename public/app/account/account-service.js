(function() {
    'use strict';

    function accountService(sha1, data) {
        var ACCOUNT_URL = 'api/users';

        function login(user) {
            var copiedUser = user;
            copiedUser.password = sha1(copiedUser.password);

            return data.put(ACCOUNT_URL + '/token', copiedUser);
        }

        function register(user) {
            user.password = sha1(user.password);

            return data.post(ACCOUNT_URL, user);
        }

        function getById(id) {
            return data.get(ACCOUNT_URL + '/' + id);
        }

        function edit(user) {
            return data.put(ACCOUNT_URL + '/' + user._id, user);
        }

        return {
            login: login,
            register: register,
            getById: getById,
            edit: edit
        };
    }

    angular.module('app')
        .factory('account', ['sha1', 'data', accountService]);
}());

(function() {
    'use strict';

    function data($q, $http, identity, baseUrl) {
        function getAuthorizationHeader() {

            if (!identity.isAuthenticated()) {
                return {};
            }

            return {
                'Authorization': 'Bearer ' + identity.currentUser.token
            };
        }

        function getRequest(url, query) {
            var defered = $q.defer(),
                authHeader = getAuthorizationHeader();

            $http.get(baseUrl + '/' + url, {
                    headers: authHeader,
                    params: query
                })
                .then(function(response) {
                    defered.resolve(response.data);
                }, function(err) {
                    if (err.data.message) {
                        defered.reject(err.data.message);
                    } else {
                        defered.reject(err.data);
                    }
                });

            return defered.promise;
        }

        function postRequest(url, postData) {
            var defered = $q.defer();

            $http.post(baseUrl + '/' + url, postData, {
                    headers: getAuthorizationHeader()
                })
                .then(function(response) {
                    defered.resolve(response.data);
                }, function(err) {
                    if (err.data.message) {
                        defered.reject(err.data.message);
                    } else {
                        defered.reject(err.data);
                    }
                });

            return defered.promise;
        }

        function putRequest(url, putData) {
            var defered = $q.defer();

            $http.put(baseUrl + '/' + url, putData, {
                    headers: getAuthorizationHeader()
                })
                .then(function(response) {
                    defered.resolve(response.data);
                }, function(err) {
                    if (err.data.message) {
                        defered.reject(err.data.message);
                    } else {
                        defered.reject(err.data);
                    }
                });

            return defered.promise;
        }

        function deleteRequest(url) {
            var defered = $q.defer();

            $http.delete(baseUrl + '/' + url, {
                    headers: getAuthorizationHeader()
                })
                .then(function(response) {
                    defered.resolve(response.data);
                }, function(err) {
                    defered.reject(err.data);
                });

            return defered.promise;
        }

        return {
            get: getRequest,
            post: postRequest,
            put: putRequest,
            delete: deleteRequest
        };
    }

    angular.module('app')
        .factory('data', ['$q', '$http', 'identity', 'baseUrl', data]);
}());

'use strict';

angular.module('app').factory('requestHelper', function() {
    return {
        createJsonHeadersObjectWithBearer(token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        }
    };
});

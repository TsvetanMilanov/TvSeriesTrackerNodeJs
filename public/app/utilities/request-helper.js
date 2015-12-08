/*globals app*/
'use strict';

app.factory('requestHelper', function() {
    return {
        createJsonHeadersObjectWithBearer(token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        }
    };
});

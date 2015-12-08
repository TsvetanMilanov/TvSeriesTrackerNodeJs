/*globals app*/
'use strict';

app.factory('routeAuthorizationChecker', function($q, identity) {
    return {
        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        isNotAuthenticated: function() {
            if (!identity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function(role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    };
});

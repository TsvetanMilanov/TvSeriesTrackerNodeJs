/*globals app*/
'use strict';

app.factory('routeAuthorizationChecker', function($q, identity, constants) {
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
        isModeratorOrAdmin: function() {
            if (identity.isAuthorizedForRole(constants.ADMIN_ROLE) || identity.isAuthorizedForRole(constants.MODERATOR_ROLE)) {
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

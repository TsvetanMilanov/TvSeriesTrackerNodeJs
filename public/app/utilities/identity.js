'use strict';
angular.module('app').factory('identity', function($window, constants) {
    var user,
        localStorageUser = $window.localStorage.getItem(constants.CURRENT_USER_LOCAL_STORAGE_KEY);

    if (localStorageUser) {
        $window.bootstrappedUserObject = JSON.parse(localStorageUser);
    } else {
        $window.bootstrappedUserObject = undefined;
    }

    if ($window.bootstrappedUserObject) {
        user = $window.bootstrappedUserObject;
    }
    return {
        currentUser: user,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        },
        isAdmin: function() {
            return !!this.currentUser && this.currentUser.roles.indexOf(constants.ADMIN_ROLE) > -1;
        },
        isModerator: function() {
            return !!this.currentUser && this.currentUser.roles.indexOf(constants.MODERATOR_ROLE) > -1;
        }
    };
});

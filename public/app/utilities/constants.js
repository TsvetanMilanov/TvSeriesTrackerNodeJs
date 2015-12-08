/*globals app*/
'use strict';
app.factory('constants', function() {
    return {
        ADMIN_ROLE: 'admin',
        REGULAR_ROLE: 'regular',
        MODERATOR_ROLE: 'moderator',
        CURRENT_USER_LOCAL_STORAGE_KEY: 'currentUser'
    };
});

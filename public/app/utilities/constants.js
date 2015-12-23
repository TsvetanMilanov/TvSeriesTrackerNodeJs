'use strict';
angular.module('app').factory('constants', function() {
    return {
        ADMIN_ROLE: 'admin',
        REGULAR_ROLE: 'regular',
        MODERATOR_ROLE: 'moderator',
        CURRENT_USER_LOCAL_STORAGE_KEY: 'currentUser',
        MIN_USERNAME_LENGTH: 3,
        MAX_USERNAME_LENGTH: 20,
        MIN_PASSWORD_LENGTH: 6,
        MIN_TOKEN_LENGTH: 10,
        TOKEN_LENGTH: 200,
        DEFAULT_DATE_FORMAT: 'DD-MM-YYYY hh:mm:ss',
        REPORT_TYPE_TV_SERIES: 0,
        REPORT_TYPE_EPISODE: 1,
        MIN_REPORT_DESCRIPTION_LENGTH: 5
    };
});

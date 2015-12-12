'use strict';
let constants = require('./constants');

module.exports = {
    isUserRequestModelValid: function(model) {
        if (!model.userName ||
            !model.password) {
            return false;
        }

        if (model.userName.length < constants.MIN_USERNAME_LENGTH || model.userName.length > constants.MAX_USERNAME_LENGTH) {
            return false;
        }

        if (model.password.length < constants.MIN_PASSWORD_LENGTH) {
            return false;
        }

        return true;
    },
    isTvSeriesRequestModelValid: function(model) {
        if (!model.title) {
            return false;
        }

        if (model.title.length < constants.MIN_TITLE_LENGTH) {
            return false;
        }

        if (model.rating && model.rating < 0) {
            return false;
        }

        if (model.runtimeMinutes && model.runtimeMinutes < 0) {
            return false;
        }

        return true;
    }
};

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

        if (model.type != constants.REPORT_TYPE_EPISODE || model.type != constants.REPORT_TYPE_TV_SERIES) {
            return false;
        }

        return true;
    },
    isEpisodeRequestModelValid: function(model) {
        if (!model.title || !model.seasonNumber || !model.number || !model.tvSeriesId) {
            return false;
        }

        if (model.title.length < constants.MIN_TITLE_LENGTH) {
            return false;
        }

        if (model.seasonNumber < 0 || model.number < 0) {
            return false;
        }

        return true;
    },
    isReportCreateRequestModelValid: function(model) {
        if (!model.description ||
            !model.type ||
            (!model.episodeId && !model.tvSeriesId) ||
            !model.importance) {
            return false;
        }

        if (model.description.length < constants.MIN_REPORT_DESCRIPTION_LENGTH) {
            return false;
        }

        return true;
    },
    isReportEditRequestModelValid: function(model) {
        if (!model.description ||
            !model.type ||
            (!model.episodeId && !model.tvSeriesId) ||
            !model.importance ||
            !model.authorId ||
            !model.createdOn) {
            return false;
        }

        if (model.description.length < constants.MIN_REPORT_DESCRIPTION_LENGTH) {
            return false;
        }

        return true;
    }
};

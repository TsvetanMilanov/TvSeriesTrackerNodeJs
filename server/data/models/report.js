'use strict';
let mongoose = require('mongoose'),
    constants = require('./../../common/constants'),
    Schema = mongoose.Schema;

module.exports = function() {
    let schema = new Schema({
        description: {
            type: String,
            required: true,
            minlength: constants.MIN_REPORT_DESCRIPTION_LENGTH
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdOn: {
            type: Date,
            required: true,
            default: new Date(Date.now())
        },
        importance: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        type: {
            type: Number,
            required: true,
            min: constants.REPORT_TYPE_TV_SERIES,
            max: constants.REPORT_TYPE_EPISODE
        },
        episodeId: {
            type: Schema.Types.ObjectId,
            ref: 'Episode'
        },
        tvSeriesId: {
            type: Schema.Types.ObjectId,
            ref: 'TvSeries'
        },
        isHandled: {
            type: Boolean,
            required: true,
            default: false
        }
    });

    mongoose.model('Report', schema);
};

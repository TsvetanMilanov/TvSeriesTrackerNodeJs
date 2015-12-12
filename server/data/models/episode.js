'use strict';
let mongoose = require('mongoose'),
    constants = require('./../../common/constants'),
    Schema = mongoose.Schema;

module.exports = function() {
    let schema = new Schema({
        title: {
            type: String,
            required: true
        },
        airDate: {
            type: Date
        },
        seasonNumber: {
            type: Number,
            min: 0,
            required: true,
            default: 0
        },
        number: {
            type: Number,
            min: 0,
            required: true,
            default: 0
        },
        tvSeriesId: {
            type: Schema.Types.ObjectId,
            ref: 'TvSeries',
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        description: {
            type: String,
            maxLength: constants.TV_SERIES_DESCRIPTION_MAX_LENGTH
        }
    });

    mongoose.model('Episode', schema);
};

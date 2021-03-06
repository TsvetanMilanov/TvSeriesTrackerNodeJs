'use strict';
let mongoose = require('mongoose'),
    constants = require('./../../common/constants'),
    Schema = mongoose.Schema;

module.exports = function() {
    let schema = new Schema({
        title: {
            type: String,
            min: constants.MIN_TITLE_LENGTH,
            required: true
        },
        rating: {
            type: Number,
            min: 0
        },
        releaseDate: {
            type: Date
        },
        runtimeMinutes: {
            type: Number,
            min: 0
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

    mongoose.model('TvSeries', schema);
};

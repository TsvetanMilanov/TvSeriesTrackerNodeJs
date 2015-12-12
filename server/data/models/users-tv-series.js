'use strict';
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {
    let schema = new Schema({
        userId: {
            type: Schema.types.ObjectId,
            ref: 'User',
            required: true
        },
        tvSeriesId: {
            type: Schema.types.ObjectId,
            ref: 'TvSeries',
            required: true
        },
        lastWatchedEpisodeId: {
            type: Schema.types.ObjectId,
            ref: 'Episode',
            required: true
        }
    });

    mongoose.model('UsersTvSeries', schema);
};

'use strict';
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {
    let schema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tvSeriesId: {
            type: Schema.Types.ObjectId,
            ref: 'TvSeries',
            required: true
        },
        lastWatchedEpisodeId: {
            type: Schema.Types.ObjectId,
            ref: 'Episode',
            required: true
        }
    });

    mongoose.model('UsersTvSeries', schema);
};

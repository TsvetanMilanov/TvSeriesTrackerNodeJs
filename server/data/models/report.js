'use strict';
let mongoose = require('mongoose'),
    constants = require('./../../common/constants'),
    Schema = mongoose.Schema;

module.exports = function() {
    let schema = new Schema({
        description: {
            type: String,
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
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
        }
    });

    mongoose.model('Report', schema);
};

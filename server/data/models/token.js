'use strict';
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    constants = require('./../../common/constants');

module.exports = function() {
    let schema = new Schema({
        token: {
            type: String,
            required: true,
            minLength: constants.MIN_TOKEN_LENGTH
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    });

    mongoose.model('Token', schema);
};

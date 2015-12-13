'use strict';
let mongoose = require('mongoose'),
    UsersTvSeries = mongoose.connection.model('UsersTvSeries'),
    identity = require('./../common/identity'),
    constants = require('./../common/constants');

module.exports = {
    getMyTvSeries: function(req, res) {
        UsersTvSeries.find({
            userId: req.user._id
        }, function(err, tvSeries) {
            if (err) {
                console.log(err);
                res.status(400)
                .json({
                    message: 'Can\'t load the information for your TV Series.'
                });
                return;
            }

            res.json(tvSeries);
        });
    }
};

'use strict';
let mongoose = require('mongoose'),
    Episode = mongoose.connection.model('Episode'),
    identity = require('./../common/identity'),
    constants = require('./../common/constants');

module.exports = {
    getAll: function(req, res) {
        if (identity.isAuthorizedForRole(constants.ADMIN_ROLE) ||
            identity.isAuthorizedForRole(constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'You are not authorized to get this information!'
                });

            return;
        }

        Episode.find({}, function(err, episodes) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'Episodes not found!'
                    });
                return;
            }

            res.json(episodes);
        });
    }
};

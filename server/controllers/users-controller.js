'use strict';
let User = require('mongoose').model('User'),
    encryption = require('./../common/encryption');

module.exports = {
    createUser: function(req, res, next) {
        let modelValidator = require('./../common/model-validator'),
            user = req.body;

        if (!modelValidator.isUserRequestModelValid(user)) {
            res.status(400)
                .json({
                    message: 'Invalid user!'
                });

            return;
        }

        user.password = encryption.createHash(user.password);

        User.create(user, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            res.status(201)
                .json(data);
        });
    },
    getAllUsers: function(req, res, next) {
        User.find({}, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            res.json(data);
        });
    }
};

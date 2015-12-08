'use strict';
let User = require('mongoose').model('User'),
    Token = require('mongoose').model('Token'),
    encryption = require('./../common/encryption'),
    identity = require('./../common/identity');

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
    },
    loginUser: function(req, res, next) {
        let userName = req.body.userName,
            password = req.body.password,
            user,
            token;

        identity.authenticateUser(userName, password)
            .then(function(data) {
                user = data;
                if (user.token) {
                    return new Promise(function(resolve) {
                        resolve({
                            user: user,
                            token: {
                                token: user.token
                            }
                        });
                    });
                } else {
                    return identity.generateToken(user);
                }
            })
            .then(function(data) {
                user = data.user;
                token = data.token;

                user.token = token.token;
                user.save(function(err) {
                    if (err) {
                        next(err.message);
                        return;
                    }

                    res.json({
                        _id: user._id,
                        userName: user.userName,
                        token: token.token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        roles: user.roles
                    });
                });
            })
            .catch(function(err) {
                res.status(400)
                    .json(err);
            });
    }
};

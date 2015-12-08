'use strict';
let User = require('mongoose').model('User'),
    encryption = require('./../common/encryption'),
    identity = require('./../common/identity'),
    mapper = require('./../common/mapper'),
    constants = require('./../common/constants');

module.exports = {
    createUser: function(req, res) {
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
                res.status(400)
                    .json({
                        message: 'Invalid registration information.'
                    });

                return;
            }

            res.status(201)
                .json(data);
        });
    },
    getAllUsers: function(req, res, next) {
        if (!identity.isAuthorizedForRole(req.user, constants.ADMIN_ROLE)) {
            res.status(401)
                .json({
                    message: 'Your are not authorized to do this operaation!'
                });

            return;
        }

        User.find({}, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            res.json(data);
        });
    },
    getById: function(req, res, next) {
        let user = req.user,
            isAdmin = identity.isAuthorizedForRole(user, constants.ADMIN_ROLE),
            isModerator = identity.isAuthorizedForRole(user, constants.MODERATOR_ROLE);

        if ((user._id != req.params.id) && (!isAdmin && !isModerator)) {
            res.status(401)
                .json({
                    message: 'Your are not authorized to get this information!'
                });

            return;
        }

        User.findOne({
            _id: req.params.id
        }, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            res.json(mapper.mapToUserResponseModel(data));
        });
    },
    banUser: function(req, res, next) {
        let user = req.user,
            isAdmin = identity.isAuthorizedForRole(user, constants.ADMIN_ROLE),
            isModerator = identity.isAuthorizedForRole(user, constants.MODERATOR_ROLE);

        if (!isAdmin && !isModerator) {
            res.status(401)
                .json({
                    message: 'Your are not authorized to do this operation!'
                });

            return;
        }

        User.findOne({
            _id: req.params.id
        }, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            data.isBanned = true;
            data.save(function(err, bannedUser) {
                if (err) {
                    next(err.message);
                    return;
                }

                res.json(mapper.mapToUserResponseModel(bannedUser));
            });
        });
    },
    unBanUser: function(req, res, next) {
        let user = req.user,
            isAdmin = identity.isAuthorizedForRole(user, constants.ADMIN_ROLE),
            isModerator = identity.isAuthorizedForRole(user, constants.MODERATOR_ROLE);

        if (!isAdmin && !isModerator) {
            res.status(401)
                .json({
                    message: 'Your are not authorized to do this operation!'
                });

            return;
        }

        User.findOne({
            _id: req.params.id
        }, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            data.isBanned = false;
            data.save(function(err, bannedUser) {
                if (err) {
                    next(err.message);
                    return;
                }

                res.json(mapper.mapToUserResponseModel(bannedUser));
            });
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

                    res.json(mapper.mapToUserResponseModel(user));
                });
            })
            .catch(function(err) {
                console.log(err);
                res.status(400)
                    .json(err);
            });
    },
    editUser: function(req, res, next) {
        let user = req.body,
            currentUser = req.user,
            userId = req.params.id;

        User.findOne({
            _id: userId
        }, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            data.password = user.password || data.password;
            data.firstName = user.firstName || data.firstName;
            data.lastName = user.lastName || data.lastName;

            let isModerator = identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE);
            if ((user.userName && (data.userName != user.userName)) ||
                (user.isBanned && (data.isBanned != user.isBanned)) && (isModerator)) {
                data.isBanned = user.isBanned || data.isBanned;
                data.userName = user.userName || data.userName;
            }

            let isAdmin = identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE);
            if (((user.userName && (data.userName != user.userName)) ||
                    (user.roles && (data.roles != user.roles)) ||
                    (user.registrationDate && (data.registrationDate != user.registrationDate)) ||
                    (user.isBanned && (data.isBanned != user.isBanned)) ||
                    (user.token && (data.token != user.token))) && (!isAdmin)) {

                res.status(401)
                    .json({
                        message: 'You are not authorized to change this user properties.'
                    });
                return;
            }

            data.userName = user.userName || data.userName;
            data.roles = user.roles || data.roles;
            data.registrationDate = user.registrationDate || data.registrationDate;
            data.isBanned = user.isBanned || data.isBanned;
            data.token = user.token || data.token;

            data.save(function(err, savedUser) {
                if (err) {
                    next(err.message);
                    return;
                }

                res.json(mapper.mapToUserResponseModel(savedUser));
            });
        });
    }
};

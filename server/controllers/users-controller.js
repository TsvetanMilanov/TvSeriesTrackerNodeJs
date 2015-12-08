'use strict';
let User = require('mongoose').model('User'),
    encryption = require('./../common/encryption'),
    identity = require('./../common/identity'),
    mapper = require('./../common/mapper'),
    constants = require('./../common/constants'),
    comparer = require('./../common/comparer'),
    sha1 = require('sha1');

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
        if (!identity.isAuthorizedForRole(req.user, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(req.user, constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'Your are not authorized to do this operation!'
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
        let requestUser = req.body,
            currentUser = req.user,
            userId = req.params.id;

        User.findOne({
            _id: userId
        }, function(err, data) {
            let databaseUser = data;
            if (err) {
                next(err.message);
                return;
            }

            if (requestUser.password) {
                if (requestUser.password.length < constants.MIN_PASSWORD_LENGTH) {
                    res.status(400)
                        .json({
                            message: `Password must have at least ${constants.MIN_PASSWORD_LENGTH} symbols!`
                        });

                    return;
                }

                databaseUser.password = sha1(requestUser.password);
            }

            databaseUser.firstName = requestUser.firstName || databaseUser.firstName;
            databaseUser.lastName = requestUser.lastName || databaseUser.lastName;

            let isModerator = identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE);
            if (((requestUser.userName && (databaseUser.userName != requestUser.userName)) ||
                    (requestUser.isBanned && (databaseUser.isBanned != requestUser.isBanned))) && (isModerator)) {
                databaseUser.isBanned = requestUser.isBanned || databaseUser.isBanned;
                databaseUser.userName = requestUser.userName || databaseUser.userName;
            }

            let isAdmin = identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE);
            if (((requestUser.userName && (databaseUser.userName != requestUser.userName)) ||
                    (requestUser.registrationDate &&
                        (!comparer.compareDates(new Date(databaseUser.registrationDate), new Date(requestUser.registrationDate)))) ||
                    (requestUser.roles && (!comparer.compareArrays(databaseUser.roles, requestUser.roles))) ||
                    (databaseUser.isBanned != requestUser.isBanned) ||
                    (requestUser.token && (databaseUser.token != requestUser.token))) && (!isAdmin)) {
                res.status(401)
                    .json({
                        message: 'You are not authorized to change this user properties.'
                    });
                return;
            }

            if (requestUser.userName &&
                (requestUser.userName.length < constants.MIN_USERNAME_LENGTH ||
                    requestUser.userName.length > constants.MAX_USERNAME_LENGTH)) {
                res.status(400)
                    .json({
                        message: `Username should be between ${constants.MIN_USERNAME_LENGTH} and ${constants.MAX_USERNAME_LENGTH} symbols!`
                    });
                return;
            }

            databaseUser.userName = requestUser.userName || databaseUser.userName;
            databaseUser.roles = requestUser.roles || databaseUser.roles;
            databaseUser.registrationDate = requestUser.registrationDate || databaseUser.registrationDate;
            databaseUser.isBanned = requestUser.isBanned;
            databaseUser.token = requestUser.token || databaseUser.token;

            databaseUser.save(function(err, savedUser) {
                if (err) {
                    next(err.message);
                    return;
                }

                res.json(mapper.mapToUserResponseModel(savedUser));
            });
        });
    },
    getBannedUsers: function(req, res, next) {
        if (!identity.isAuthorizedForRole(req.user, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(req.user, constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'Your are not authorized to do this operaation!'
                });

            return;
        }

        User.find({
            isBanned: true
        }, function(err, data) {
            if (err) {
                next(err.message);
                return;
            }

            res.json(data);
        });
    }
};

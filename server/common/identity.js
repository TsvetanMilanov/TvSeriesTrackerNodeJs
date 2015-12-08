'use strict';
let passport = require('passport'),
    randToken = require('rand-token'),
    User = require('mongoose').model('User'),
    Token = require('mongoose').model('Token'),
    constants = require('./constants'),
    encryption = require('./encryption');

module.exports = {
    requiresAuthentication: function() {
        return passport.authenticate('bearer', {
            session: false
        });
    },
    authenticateUser: function(userName, password) {
        let promise = new Promise(function(resolve, reject) {
            User.findOne({
                userName,
                password: encryption.createHash(password)
            }, function(err, data) {
                if (err || !data) {
                    reject({
                        message: 'Invalid authentication data!'
                    });
                    return;
                }

                resolve(data);
            });
        });

        return promise;
    },
    generateToken: function(user) {
        let promise = new Promise(function(resolve, reject) {
            let token = {
                token: randToken.generate(constants.TOKEN_LENGTH)
            };

            token.userId = user._id;

            Token.create(token, function(err) {
                if (err) {
                    reject(err);
                    return;
                }
            });

            resolve({
                user, token
            });
        });

        return promise;
    },
    isAuthorizedForRole: function(user, role) {
        return user.roles.indexOf(role) > -1;
    }
};

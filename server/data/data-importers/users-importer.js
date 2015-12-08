'use strict';
let encryption = require('./../../common/encryption'),
    constants = require('./../../common/constants');

module.exports = {
    importUsers: function() {
        let promise = new Promise(function(resolve, reject) {
            let User = require('mongoose').model('User'),
                adminUser = {},
                regularUser = {},
                moderatorUser = {},
                bannedUser = {},
                usersToCreate;

            User.find()
                .then(function(data) {
                    if (data.length <= 0) {
                        adminUser.userName = 'admin';
                        adminUser.password = encryption.createHash('admin');
                        adminUser.roles = [constants.ADMIN_ROLE, constants.USER_ROLE];
                        adminUser.firstName = 'Admin';
                        adminUser.lastName = 'Admin';

                        regularUser.userName = 'regular';
                        regularUser.password = encryption.createHash('regular');
                        regularUser.roles = [constants.USER_ROLE];
                        regularUser.firstName = 'Regular';
                        regularUser.lastName = 'User';

                        moderatorUser.userName = 'moderator';
                        moderatorUser.password = encryption.createHash('moderator');
                        moderatorUser.roles = [constants.MODERATOR_ROLE, constants.USER_ROLE];
                        moderatorUser.firstName = 'Moderator';
                        moderatorUser.lastName = 'User';

                        bannedUser.userName = 'banned';
                        bannedUser.password = encryption.createHash('banned');
                        bannedUser.roles = [constants.USER_ROLE];
                        bannedUser.firstName = 'Banned';
                        bannedUser.lastName = 'User';

                        usersToCreate = [adminUser, moderatorUser, regularUser, bannedUser];

                        User.create(usersToCreate, function(err, data) {
                            if (err) {
                                reject(err);
                                return;
                            }

                            resolve(data);
                        });
                    }
                });
        });

        return promise;
    }
};

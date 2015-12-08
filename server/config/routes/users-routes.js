'use strict';
let express = require('express'),
    usersController = require('./../../controllers/users-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/banned', identity.requiresAuthentication(), usersController.getBannedUsers)
        .get('/:id', identity.requiresAuthentication(), usersController.getById)
        .get('/', identity.requiresAuthentication(), usersController.getAllUsers)
        .post('/', usersController.createUser)
        .put('/token', usersController.loginUser)
        .put('/ban/:id', identity.requiresAuthentication(), usersController.banUser)
        .put('/unBan/:id', identity.requiresAuthentication(), usersController.unBanUser)
        .put('/:id', identity.requiresAuthentication(), usersController.editUser);

    app.use('/api/users', router);
};
